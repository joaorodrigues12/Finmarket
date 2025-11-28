# 🚀 Quick Start Guide

## Setup Rápido (5 minutos)

### 1. Instalar dependências

```bash
cd backend
setup.bat
```

### 2. Configurar API Key

Edite o arquivo `.env` e adicione sua chave OpenAI:

```env
OPENAI_API_KEY=sk-your-key-here
SECRET_KEY=generate-with-openssl-rand-hex-32
```

### 3. Rodar o servidor

```bash
run.bat
```

Ou manualmente:

```bash
python main.py
```

### 4. Testar

Abra o navegador em: http://localhost:8000/docs

Ou rode o script de teste:

```bash
python test_api.py
```

## 📱 Conectar com React Native

No arquivo `src/services/api.js` do frontend, a URL já está configurada:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

**Para testar no celular:**

1. Descubra seu IP local:
   ```bash
   ipconfig
   ```

2. Altere no `api.js`:
   ```javascript
   const API_BASE_URL = 'http://SEU_IP:8000';
   ```

3. Certifique-se que o backend está rodando com:
   ```bash
   python main.py
   ```

## 🧪 Testando Endpoints

### Health Check
```bash
curl http://localhost:8000/api/health
```

### Listar Notícias
```bash
curl http://localhost:8000/api/news?limit=5
```

### Gerar Insights
```bash
curl -X POST http://localhost:8000/api/insights \
  -H "Content-Type: application/json" \
  -d '{"symbols": ["AAPL", "GOOGL"]}'
```

## 🐛 Troubleshooting

**Erro: ModuleNotFoundError**
- Certifique-se que o venv está ativado
- Reinstale: `pip install -r requirements.txt`

**Erro: OpenAI API Key**
- Verifique se a chave está correta no `.env`
- Teste a chave em: https://platform.openai.com/api-keys

**Erro: Port already in use**
- Mude a porta no `.env`: `API_PORT=8001`

**Redis não disponível**
- Não é problema! O cache é opcional
- A API funciona normalmente sem Redis

## 📊 Monitorando

Logs são salvos em: `logs/app.log`

```bash
# Ver logs em tempo real (Windows)
Get-Content logs\app.log -Wait -Tail 50
```

## 🎯 Próximos Passos

1. ✅ Backend rodando
2. ✅ Frontend conectado
3. 🔄 Integrar APIs de notícias reais
4. 🔄 Adicionar autenticação
5. 🔄 Deploy em produção

## 💡 Dicas

- Use `gpt-3.5-turbo` para economizar (mais rápido e barato)
- Configure cache Redis para reduzir chamadas à OpenAI
- Ajuste rate limiting em `app/middleware/rate_limit.py`
- Monitore custos em: https://platform.openai.com/usage

## 📚 Documentação Completa

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- README completo: [README.md](README.md)
