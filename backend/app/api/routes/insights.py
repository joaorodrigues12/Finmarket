from fastapi import APIRouter, HTTPException
from datetime import datetime

from app.models.schemas import InsightRequest, InsightResponse, SentimentType
from app.services.openai_service import openai_service
from app.core.logging import logger

router = APIRouter(prefix="/insights", tags=["insights"])


@router.post("", response_model=InsightResponse)
async def get_market_insights(request: InsightRequest):
    """
    Generate AI-powered market insights for given symbols
    
    - **symbols**: List of stock symbols (1-10)
    - **timeframe**: Time period for analysis (default: 1d)
    """
    try:
        logger.info(f"Generating insights for symbols: {request.symbols}")
        
        insights = await openai_service.generate_market_insights(
            request.symbols,
            request.timeframe
        )
        
        if not insights:
            raise HTTPException(
                status_code=500, 
                detail="Failed to generate insights"
            )
        
        return InsightResponse(
            summary=insights.get("summary", ""),
            confidence=insights.get("confidence", 0.5),
            recommendations=insights.get("recommendations"),
            sentiment=SentimentType(insights.get("sentiment", "neutral")),
            timestamp=datetime.now()
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_market_insights endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
