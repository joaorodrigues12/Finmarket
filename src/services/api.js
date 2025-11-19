// Configuração da API
// IMPORTANTE: Escolha a URL correta baseado em como você está testando:
// 
// 1. Emulador Android: use 10.0.2.2:8000
// 2. Emulador iOS: use localhost:8000
// 3. Celular físico: use o IP da sua máquina (ex: 192.168.1.100:8000)
//    Para descobrir seu IP:
//    - Windows: abra o CMD e digite: ipconfig
//    - Mac/Linux: abra o terminal e digite: ifconfig ou ip addr

// Descomente a linha apropriada para o seu caso:
const API_BASE_URL = 'http://10.0.2.2:8000'; // Emulador Android
// const API_BASE_URL = 'http://localhost:8000'; // Emulador iOS
// const API_BASE_URL = 'http://192.168.1.100:8000'; // Celular físico (substitua pelo seu IP)

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
