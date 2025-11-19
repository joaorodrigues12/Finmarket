#!/bin/bash

# Finmarket Setup Script
# This script helps you set up the development environment

set -e

echo "🚀 Finmarket Setup Script"
echo "=========================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Check prerequisites
print_message "Checking prerequisites..." "$YELLOW"

if ! command_exists node; then
    print_message "❌ Node.js not found. Please install Node.js 18+" "$RED"
    exit 1
fi

if ! command_exists python3; then
    print_message "❌ Python not found. Please install Python 3.9+" "$RED"
    exit 1
fi

if ! command_exists git; then
    print_message "❌ Git not found. Please install Git" "$RED"
    exit 1
fi

print_message "✅ All prerequisites found!" "$GREEN"
echo ""

# Setup Backend
print_message "Setting up Backend..." "$YELLOW"

cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    print_message "Creating Python virtual environment..." "$YELLOW"
    python3 -m venv venv
fi

# Activate virtual environment
print_message "Activating virtual environment..." "$YELLOW"
source venv/bin/activate || . venv/Scripts/activate

# Install dependencies
print_message "Installing Python dependencies..." "$YELLOW"
pip install -r requirements.txt

# Create .env if not exists
if [ ! -f ".env" ]; then
    print_message "Creating .env file..." "$YELLOW"
    cp .env.example .env
    print_message "⚠️  Please edit backend/.env and add your API keys!" "$YELLOW"
fi

cd ..

print_message "✅ Backend setup complete!" "$GREEN"
echo ""

# Setup Frontend
print_message "Setting up Frontend..." "$YELLOW"

# Install dependencies
print_message "Installing Node dependencies..." "$YELLOW"
npm install

print_message "✅ Frontend setup complete!" "$GREEN"
echo ""

# Summary
print_message "🎉 Setup Complete!" "$GREEN"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure API Keys:"
echo "   Edit backend/.env and add:"
echo "   - OPENAI_API_KEY=your_key_here"
echo "   - NEWS_API_KEY=your_key_here (optional)"
echo ""
echo "2. Start Backend:"
echo "   cd backend"
echo "   source venv/bin/activate  # or venv\\Scripts\\activate on Windows"
echo "   uvicorn app.main:app --reload"
echo ""
echo "3. Start Frontend (in another terminal):"
echo "   npm start"
echo ""
echo "4. Access:"
echo "   - Frontend: http://localhost:19002"
echo "   - Backend API: http://localhost:8000/docs"
echo ""
print_message "📚 Read QUICKSTART.md for more details!" "$YELLOW"
