# Backend FastAPI + OpenAI - Estrutura Sugerida

## Estrutura de Pastas
```
backend/
├── main.py
├── requirements.txt
├── .env
├── models/
│   └── schemas.py
├── services/
│   ├── openai_service.py
│   └── news_service.py
└── routers/
    └── news.py
```

## requirements.txt
```
fastapi==0.104.1
uvicorn==0.24.0
openai==1.3.0
python-dotenv==1.0.0
pydantic==2.5.0
httpx==0.25.0
```

## .env
```
OPENAI_API_KEY=sua_chave_aqui
NEWS_API_KEY=sua_chave_aqui (opcional)
```

## main.py
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import news

app = FastAPI(title="FinMarket AI API")

# CORS para React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "FinMarket AI API"}
```

## models/schemas.py
```python
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class NewsItem(BaseModel):
    id: int
    title: str
    summary: str
    sentiment: str  # positive, negative, neutral
    category: str
    timestamp: datetime
    confidence: Optional[float] = None

class NewsResponse(BaseModel):
    news: List[NewsItem]
    total: int

class InsightRequest(BaseModel):
    symbols: List[str]

class InsightResponse(BaseModel):
    summary: str
    confidence: float
    recommendations: Optional[List[str]] = None
```

## services/openai_service.py
```python
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class OpenAIService:
    @staticmethod
    async def generate_news_summary(raw_news: str) -> dict:
        """Gera resumo e análise de sentimento de notícias"""
        try:
            response = client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {
                        "role": "system",
                        "content": "Você é um analista financeiro especializado. Analise a notícia e retorne um resumo conciso e o sentimento (positive, negative, neutral)."
                    },
                    {
                        "role": "user",
                        "content": f"Analise esta notícia: {raw_news}"
                    }
                ],
                temperature=0.7,
            )
            
            content = response.choices[0].message.content
            # Parse do conteúdo para extrair sentimento
            # Implementar lógica de parsing aqui
            
            return {
                "summary": content,
                "sentiment": "neutral",  # Extrair do conteúdo
                "confidence": 0.85
            }
        except Exception as e:
            print(f"Erro OpenAI: {e}")
            return None

    @staticmethod
    async def generate_market_insights(symbols: List[str]) -> dict:
        """Gera insights do mercado baseado em símbolos"""
        try:
            response = client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {
                        "role": "system",
                        "content": "Você é um analista de mercado. Forneça insights sobre as ações mencionadas."
                    },
                    {
                        "role": "user",
                        "content": f"Analise as seguintes ações: {', '.join(symbols)}"
                    }
                ],
                temperature=0.7,
            )
            
            return {
                "summary": response.choices[0].message.content,
                "confidence": 0.85
            }
        except Exception as e:
            print(f"Erro OpenAI: {e}")
            return None

openai_service = OpenAIService()
```

## routers/news.py
```python
from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from models.schemas import NewsResponse, InsightRequest, InsightResponse, NewsItem
from services.openai_service import openai_service
from datetime import datetime

router = APIRouter()

@router.get("/news", response_model=NewsResponse)
async def get_news(
    category: Optional[str] = Query(None),
    limit: int = Query(10, le=50)
):
    """Retorna notícias geradas/analisadas por IA"""
    try:
        # Aqui você pode:
        # 1. Buscar notícias de uma API externa (NewsAPI, Alpha Vantage)
        # 2. Processar com OpenAI
        # 3. Retornar dados enriquecidos
        
        # Exemplo mock
        news_items = [
            NewsItem(
                id=1,
                title="Mercado em alta com expectativas positivas",
                summary="Análise gerada por IA indica tendência de alta...",
                sentiment="positive",
                category="market",
                timestamp=datetime.now(),
                confidence=0.87
            )
        ]
        
        return NewsResponse(news=news_items, total=len(news_items))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/news/{news_id}/summary")
async def get_news_summary(news_id: int):
    """Retorna resumo detalhado de uma notícia específica"""
    # Implementar lógica
    pass

@router.post("/insights", response_model=InsightResponse)
async def get_market_insights(request: InsightRequest):
    """Gera insights do mercado usando IA"""
    try:
        insights = await openai_service.generate_market_insights(request.symbols)
        
        if not insights:
            raise HTTPException(status_code=500, detail="Erro ao gerar insights")
        
        return InsightResponse(**insights)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## Como rodar
```bash
# Instalar dependências
pip install -r requirements.txt

# Rodar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints disponíveis
- GET `/api/news` - Lista notícias com análise de IA
- GET `/api/news/{id}/summary` - Resumo detalhado
- POST `/api/insights` - Insights do mercado

## Próximos passos
1. Integrar com APIs de notícias reais (NewsAPI, Finnhub)
2. Implementar cache para reduzir custos da OpenAI
3. Adicionar autenticação JWT
4. Implementar rate limiting
5. Adicionar WebSocket para notícias em tempo real
