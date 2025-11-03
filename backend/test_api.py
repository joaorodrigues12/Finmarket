"""
Simple script to test the API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"


def test_health():
    """Test health endpoint"""
    print("\n=== Testing Health Endpoint ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


def test_news():
    """Test news endpoint"""
    print("\n=== Testing News Endpoint ===")
    response = requests.get(f"{BASE_URL}/news?limit=3")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Total news: {data['total']}")
    if data['news']:
        print(f"First news: {data['news'][0]['title']}")


def test_insights():
    """Test insights endpoint"""
    print("\n=== Testing Insights Endpoint ===")
    payload = {
        "symbols": ["AAPL", "GOOGL", "MSFT"],
        "timeframe": "1d"
    }
    response = requests.post(f"{BASE_URL}/insights", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


def test_analyze():
    """Test news analysis endpoint"""
    print("\n=== Testing News Analysis Endpoint ===")
    payload = {
        "content": "Apple anuncia novos produtos com tecnologia de IA avançada. As ações subiram 5% após o anúncio."
    }
    response = requests.post(f"{BASE_URL}/news/analyze", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


if __name__ == "__main__":
    print("FinMarket AI API - Test Script")
    print("=" * 50)
    
    try:
        test_health()
        test_news()
        test_insights()
        test_analyze()
        
        print("\n" + "=" * 50)
        print("All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("\nERROR: Could not connect to API.")
        print("Make sure the server is running on http://localhost:8000")
    except Exception as e:
        print(f"\nERROR: {e}")
