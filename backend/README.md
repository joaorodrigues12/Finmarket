# FinMarket AI Backend

Backend FastAPI com integração OpenAI para análise de notícias financeiras e insights de mercado.

## 🚀 Features

- ✅ Análise de notícias com IA (sentimento, resumo, pontos-chave)
- ✅ Insights de mercado personalizados
- ✅ Cache com Redis (opcional)
- ✅ Rate limiting
- ✅ Logging estruturado
- ✅ Documentação automática (Swagger/ReDoc)
- ✅ Tratamento de erros robusto
- ✅ CORS configurado para React Native

## 📋 Pré-requisitos

- Python 3.9+
- OpenAI API Key
- Redis (opcional, para cache)

## 🔧 Instalação

### 1. Clone e navegue até o diretório

```bash
cd backend
```

### 2. Crie ambiente virtual

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Instale dependências

```bash
pip install -r requirements.txt
```

### 4. Configure variáveis de ambiente

```bash
# Copie o arquivo de exemplo
copy .env.example .env

# Edite .env e adicione suas chaves
```

**Variáveis obrigatórias:**
- `OPENAI_API_KEY`: Sua chave da OpenAI
- `SECRET_KEY`: Chave secreta (gere com: `openssl rand -hex 32`)

## 🏃 Executando

### Desenvolvimento

```bash
python main.py
```

ou

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Produção

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 Documentação da API

Após iniciar o servidor, acesse:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔌 Endpoints

### Health Check
```
GET /api/health
```

### Notícias

**Listar notícias com análise de IA**
```
GET /api/news?category=tech&limit=10&page=1
```

**Resumo detalhado de notícia**
```
GET /api/news/{news_id}/summary
```

**Analisar conteúdo customizado**
```
POST /api/news/analyze
Body: {
  "content": "Texto da notícia..."
}
```

### Insights

**Gerar insights de mercado**
```
POST /api/insights
Body: {
  "symbols": ["AAPL", "GOOGL", "MSFT"],
  "timeframe": "1d"
}
```

## 🏗️ Estrutura do Projeto

```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── news.py          # Rotas de notícias
│   │   │   ├── insights.py      # Rotas de insights
│   │   │   └── health.py        # Health check
│   │   └── router.py            # Router principal
│   ├── core/
│   │   ├── config.py            # Configurações
│   │   └── logging.py           # Logging
│   ├── middleware/
│   │   ├── error_handler.py     # Tratamento de erros
│   │   └── rate_limit.py        # Rate limiting
│   ├── models/
│   │   └── schemas.py           # Schemas Pydantic
│   └── services/
│       ├── cache_service.py     # Cache Redis
│       ├── openai_service.py    # Integração OpenAI
│       └── news_service.py      # Lógica de notícias
├── logs/                        # Logs da aplicação
├── main.py                      # Entry point
├── requirements.txt             # Dependências
├── .env.example                 # Exemplo de variáveis
└── README.md                    # Este arquivo
```

## 🔐 Segurança

- Rate limiting: 60 requisições/minuto por IP
- CORS configurado
- Validação de entrada com Pydantic
- Tratamento de erros global
- Logs de segurança

## 🚀 Melhorias Futuras

- [ ] Autenticação JWT
- [ ] Integração com APIs de notícias reais (NewsAPI, Finnhub)
- [ ] WebSocket para notícias em tempo real
- [ ] Banco de dados (PostgreSQL)
- [ ] Testes automatizados
- [ ] Docker/Docker Compose
- [ ] CI/CD pipeline
- [ ] Monitoramento (Prometheus/Grafana)

## 📝 Notas

- O cache Redis é opcional. Se não estiver disponível, a API funciona normalmente sem cache.
- Os dados de notícias são mock. Integre com APIs reais para produção.
- Ajuste o modelo OpenAI em `.env` conforme necessidade (gpt-4, gpt-3.5-turbo, etc.)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado.
