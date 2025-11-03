from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime

from app.models.schemas import (
    NewsResponse,
    InsightRequest,
    InsightResponse,
    NewsSummaryRequest,
    NewsSummaryResponse,
    CategoryType,
    SentimentType
)
from app.services.news_service import news_service
from app.services.openai_service import openai_service
from app.core.logging import logger

router = APIRouter(prefix="/news", tags=["news"])


@router.get("", response_model=NewsResponse)
async def get_news(
    category: Optional[CategoryType] = Query(None, description="Filter by category"),
    limit: int = Query(10, ge=1, le=50, description="Number of news items"),
    page: int = Query(1, ge=1, description="Page number")
):
    """
    Get news with AI-powered analysis
    
    - **category**: Filter by category (market, tech, crypto, commodities)
    - **limit**: Number of items per page (1-50)
    - **page**: Page number
    """
    try:
        news_items = await news_service.get_news(category, limit, page)
        
        return NewsResponse(
            news=news_items,
            total=len(news_items),
            page=page,
            page_size=limit
        )
    except Exception as e:
        logger.error(f"Error in get_news endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{news_id}/summary")
async def get_news_summary(news_id: int):
    """
    Get detailed summary of specific news item
    
    - **news_id**: ID of the news item
    """
    try:
        summary = await news_service.get_news_summary(news_id)
        
        if not summary:
            raise HTTPException(status_code=404, detail="News not found")
        
        return summary
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_news_summary endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/analyze", response_model=NewsSummaryResponse)
async def analyze_news(request: NewsSummaryRequest):
    """
    Analyze custom news content with AI
    
    - **content**: News content to analyze
    """
    try:
        analysis = await openai_service.analyze_news(request.content)
        
        if not analysis:
            raise HTTPException(status_code=500, detail="Failed to analyze news")
        
        return NewsSummaryResponse(
            summary=analysis.get("summary", ""),
            sentiment=SentimentType(analysis.get("sentiment", "neutral")),
            confidence=analysis.get("confidence", 0.5),
            key_points=analysis.get("key_points")
        )
    except Exception as e:
        logger.error(f"Error in analyze_news endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
