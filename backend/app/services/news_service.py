from typing import List, Optional
from datetime import datetime
from app.models.schemas import NewsItem, CategoryType, SentimentType
from app.services.openai_service import openai_service
from app.services.search_service import search_service
from app.core.logging import logger


class NewsService:
    """Service for news management"""
    
    # Mock news data - Replace with real API integration
    MOCK_NEWS = [
        {
            "title": "Mercados globais em alta com dados econômicos positivos",
            "content": "Os mercados globais registraram ganhos significativos hoje, impulsionados por dados econômicos melhores que o esperado. O índice S&P 500 subiu 1.2%, enquanto o Nasdaq avançou 1.5%.",
            "category": "market",
            "symbols": ["SPY", "QQQ"]
        },
        {
            "title": "Big Tech lidera ganhos com inovações em IA",
            "content": "Empresas de tecnologia lideram os ganhos do mercado após anúncios de novos produtos baseados em inteligência artificial. Apple, Microsoft e Google apresentaram avanços significativos.",
            "category": "tech",
            "symbols": ["AAPL", "MSFT", "GOOGL"]
        },
        {
            "title": "Bitcoin ultrapassa marca de $50k com otimismo institucional",
            "content": "O Bitcoin ultrapassou a marca de $50,000 pela primeira vez em meses, impulsionado por crescente interesse institucional e aprovação de ETFs.",
            "category": "crypto",
            "symbols": ["BTC"]
        },
        {
            "title": "Petróleo em queda com aumento de produção",
            "content": "Os preços do petróleo caíram 2% após anúncios de aumento na produção da OPEC+. Analistas preveem pressão adicional nos próximos meses.",
            "category": "commodities",
            "symbols": ["USO", "XLE"]
        },
        {
            "title": "Fed mantém taxas de juros estáveis",
            "content": "O Federal Reserve decidiu manter as taxas de juros inalteradas, sinalizando uma abordagem cautelosa em relação à inflação e crescimento econômico.",
            "category": "market",
            "symbols": ["SPY", "TLT"]
        },
    ]
    
    async def get_news(
        self, 
        category: Optional[CategoryType] = None,
        limit: int = 10,
        page: int = 1
    ) -> List[NewsItem]:
        """Get news with AI analysis"""
        try:
            logger.info(f"Fetching news - category: {category}, limit: {limit}")
            
            # Limit to max 3 items for faster response
            limit = min(limit, 3)
            
            # Search real news from external API
            if category and category != CategoryType.ALL:
                real_news = await search_service.search_by_category(category.value)
            else:
                real_news = await search_service.search_financial_news(page_size=limit)
            
            # If no real news, use mock data
            if not real_news:
                news_data = self.MOCK_NEWS
                if category and category != CategoryType.ALL:
                    news_data = [n for n in news_data if n["category"] == category.value]
                
                start_idx = (page - 1) * limit
                end_idx = start_idx + limit
                news_data = news_data[start_idx:end_idx]
                
                real_news = [
                    {
                        "title": n["title"],
                        "content": n["content"],
                        "source": "Mock Data",
                        "url": "",
                        "published_at": datetime.now().isoformat()
                    }
                    for n in news_data
                ]
            
            # Analyze each news with AI
            news_items = []
            for idx, news in enumerate(real_news[:limit]):
                content = news.get("content") or news.get("description", "")
                analysis = await openai_service.analyze_news(content)
                
                if analysis:
                    # Determine category from content if not specified
                    news_category = category if category and category != CategoryType.ALL else CategoryType.MARKET
                    
                    news_item = NewsItem(
                        id=idx + 1,
                        title=news.get("title", ""),
                        summary=analysis.get("summary", content[:150]),
                        sentiment=SentimentType(analysis.get("sentiment", "neutral")),
                        category=news_category,
                        timestamp=datetime.fromisoformat(news.get("published_at", datetime.now().isoformat()).replace("Z", "+00:00")),
                        confidence=analysis.get("confidence", 0.8),
                        source=news.get("source", "Unknown")
                    )
                    news_items.append(news_item)
            
            logger.info(f"Returned {len(news_items)} news items")
            return news_items
            
        except Exception as e:
            logger.error(f"Error fetching news: {e}")
            return []
    
    async def get_news_summary(self, news_id: int) -> Optional[dict]:
        """Get detailed summary of specific news"""
        try:
            if news_id <= 0 or news_id > len(self.MOCK_NEWS):
                return None
            
            news = self.MOCK_NEWS[news_id - 1]
            analysis = await openai_service.analyze_news(news["content"])
            
            return {
                "id": news_id,
                "title": news["title"],
                "content": news["content"],
                "analysis": analysis
            }
            
        except Exception as e:
            logger.error(f"Error getting news summary: {e}")
            return None


news_service = NewsService()
