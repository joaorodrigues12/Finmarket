// Configuração da API
// Para desenvolvimento local, use: http://localhost:8000
// Para testar no celular, use o IP da sua máquina: http://SEU_IP:8000
const API_BASE_URL = 'http://localhost:8000';

class ApiService {
    async getNews(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_BASE_URL}/api/news?${queryParams}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar notícias');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }

    async getNewsSummary(newsId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/news/${newsId}/summary`);

            if (!response.ok) {
                throw new Error('Erro ao buscar resumo');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }

    async getMarketInsights(symbols = []) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/insights`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symbols }),
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar insights');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }
}

export default new ApiService();
