import json
from typing import Dict, List, Optional
from openai import OpenAI
from app.core.config import settings
from app.core.logging import logger
from app.models.schemas import SentimentType
from app.services.cache_service import cache_service


class OpenAIService:
    """Service for OpenAI API interactions"""
    
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
        self.max_tokens = settings.OPENAI_MAX_TOKENS
        self.temperature = settings.OPENAI_TEMPERATURE
    
    async def analyze_news(self, content: str) -> Optional[Dict]:
        """Analyze news content and extract sentiment"""
        cache_key = cache_service._generate_key("news_analysis", content)
        cached = cache_service.get(cache_key)
        
        if cached:
            return cached
        
        try:
            logger.info("Analyzing news with OpenAI")
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": """Você é um analista financeiro especializado. 
                        Analise a notícia e retorne um JSON com:
                        - summary: resumo conciso em português (max 150 caracteres)
                        - sentiment: "positive", "negative" ou "neutral"
                        - confidence: número entre 0 e 1
                        - key_points: lista de 2-3 pontos principais
                        
                        Retorne APENAS o JSON, sem texto adicional."""
                    },
                    {
                        "role": "user",
                        "content": f"Analise esta notícia:\n\n{content}"
                    }
                ],
                temperature=self.temperature,
                max_tokens=self.max_tokens,
            )
            
            content_response = response.choices[0].message.content.strip()
            
            # Remove markdown code blocks if present
            if content_response.startswith("```"):
                content_response = content_response.split("```")[1]
                if content_response.startswith("json"):
                    content_response = content_response[4:]
            
            result = json.loads(content_response)
            
            # Validate sentiment
            if result.get("sentiment") not in ["positive", "negative", "neutral"]:
                result["sentiment"] = "neutral"
            
            cache_service.set(cache_key, result)
            logger.info("News analysis completed")
            
            return result
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error: {e}")
            return self._fallback_analysis(content)
        except Exception as e:
            logger.error(f"OpenAI analysis error: {e}")
            return self._fallback_analysis(content)
    
    async def generate_market_insights(
        self, 
        symbols: List[str], 
        timeframe: str = "1d"
    ) -> Optional[Dict]:
        """Generate market insights for given symbols"""
        cache_key = cache_service._generate_key(
            "market_insights", 
            {"symbols": symbols, "timeframe": timeframe}
        )
        cached = cache_service.get(cache_key)
        
        if cached:
            return cached
        
        try:
            logger.info(f"Generating insights for {symbols}")
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": """Você é um analista de mercado experiente.
                        Forneça insights sobre as ações mencionadas e retorne um JSON com:
                        - summary: análise geral do mercado (max 200 caracteres)
                        - sentiment: "positive", "negative" ou "neutral"
                        - confidence: número entre 0 e 1
                        - recommendations: lista de 2-3 recomendações práticas
                        
                        Retorne APENAS o JSON, sem texto adicional."""
                    },
                    {
                        "role": "user",
                        "content": f"Analise as seguintes ações para o período {timeframe}: {', '.join(symbols)}"
                    }
                ],
                temperature=self.temperature,
                max_tokens=self.max_tokens,
            )
            
            content_response = response.choices[0].message.content.strip()
            
            # Remove markdown code blocks if present
            if content_response.startswith("```"):
                content_response = content_response.split("```")[1]
                if content_response.startswith("json"):
                    content_response = content_response[4:]
            
            result = json.loads(content_response)
            
            # Validate sentiment
            if result.get("sentiment") not in ["positive", "negative", "neutral"]:
                result["sentiment"] = "neutral"
            
            cache_service.set(cache_key, result, ttl=180)  # 3 minutes
            logger.info("Market insights generated")
            
            return result
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error: {e}")
            return self._fallback_insights(symbols)
        except Exception as e:
            logger.error(f"OpenAI insights error: {e}")
            return self._fallback_insights(symbols)
    
    def _fallback_analysis(self, content: str) -> Dict:
        """Fallback analysis when OpenAI fails"""
        return {
            "summary": content[:150] + "..." if len(content) > 150 else content,
            "sentiment": "neutral",
            "confidence": 0.5,
            "key_points": ["Análise automática indisponível"]
        }
    
    def _fallback_insights(self, symbols: List[str]) -> Dict:
        """Fallback insights when OpenAI fails"""
        return {
            "summary": f"Monitorando {', '.join(symbols)}. Análise detalhada temporariamente indisponível.",
            "sentiment": "neutral",
            "confidence": 0.5,
            "recommendations": ["Aguarde análise detalhada"]
        }


openai_service = OpenAIService()
