# 📰 Configuração da NewsAPI

## Como obter notícias reais

### 1. Criar conta na NewsAPI (Gratuito)

1. Acesse: https://newsapi.org/register
2. Preencha o formulário de registro
3. Confirme seu email
4. Copie sua API Key

### 2. Adicionar a chave no .env

Edite o arquivo `backend/.env`:

```env
NEWS_API_KEY=sua_chave_aqui
```

### 3. Reiniciar o servidor

O servidor detecta automaticamente e recarrega.

## Plano Gratuito

- ✅ 100 requisições por dia
- ✅ Notícias de até 1 mês atrás
- ✅ Acesso a milhares de fontes
- ✅ Sem cartão de crédito necessário

## Alternativas Gratuitas

Se não quiser usar NewsAPI, você pode integrar:

1. **Alpha Vantage** (https://www.alphavantage.co/)
   - Notícias financeiras
   - 500 requisições/dia grátis

2. **Finnhub** (https://finnhub.io/)
   - Notícias de ações
   - 60 requisições/minuto grátis

3. **Polygon.io** (https://polygon.io/)
   - Notícias de mercado
   - Plano gratuito disponível

## Sem API Key?

Sem problemas! O sistema funciona com dados mock quando a API não está configurada.

## Testando

Após configurar, teste:

```bash
python test_api.py
```

Ou acesse: http://localhost:8000/docs
