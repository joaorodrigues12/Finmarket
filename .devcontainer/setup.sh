#!/bin/bash

echo "🚀 Setting up Finmarket development environment..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd /workspace
npm install

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd /workspace/backend
pip3 install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f /workspace/backend/.env ]; then
    echo "📝 Creating backend .env file..."
    cat > /workspace/backend/.env << EOF
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# News API Configuration
NEWS_API_KEY=your_news_api_key_here

# Application Settings
APP_NAME=Finmarket
DEBUG=True
LOG_LEVEL=INFO

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_DB=0

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
EOF
fi

# Create frontend .env if needed
if [ ! -f /workspace/.env ]; then
    echo "📝 Creating frontend .env file..."
    cat > /workspace/.env << EOF
EXPO_PUBLIC_API_URL=http://localhost:8000
EOF
fi

echo "✅ Setup complete!"
echo ""
echo "📚 Quick start commands:"
echo "  Frontend: npm start"
echo "  Backend:  cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "🌐 Access points:"
echo "  Expo Dev Tools: http://localhost:19002"
echo "  FastAPI Docs:   http://localhost:8000/docs"
echo "  Redis:          localhost:6379"
