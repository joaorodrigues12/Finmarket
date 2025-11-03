from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum


class SentimentType(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"


class CategoryType(str, Enum):
    ALL = "all"
    MARKET = "market"
    TECH = "tech"
    CRYPTO = "crypto"
    COMMODITIES = "commodities"


class NewsItem(BaseModel):
    id: int
    title: str
    summary: str
    sentiment: SentimentType
    category: CategoryType
    timestamp: datetime
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0)
    source: Optional[str] = None
    symbols: Optional[List[str]] = None


class NewsResponse(BaseModel):
    news: List[NewsItem]
    total: int
    page: int = 1
    page_size: int = 10


class InsightRequest(BaseModel):
    symbols: List[str] = Field(..., min_items=1, max_items=10)
    timeframe: Optional[str] = "1d"


class InsightResponse(BaseModel):
    summary: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    recommendations: Optional[List[str]] = None
    sentiment: SentimentType
    timestamp: datetime


class NewsSummaryRequest(BaseModel):
    content: str = Field(..., min_length=10)


class NewsSummaryResponse(BaseModel):
    summary: str
    sentiment: SentimentType
    confidence: float
    key_points: Optional[List[str]] = None


class HealthResponse(BaseModel):
    status: str
    version: str
    timestamp: datetime
