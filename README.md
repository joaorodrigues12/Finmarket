# 📈 FinMarket - Plataforma de Notícias Financeiras com IA

Aplicativo mobile de notícias financeiras com análise de sentimento e insights gerados por Inteligência Artificial.

## 🚀 Tecnologias

### Frontend (React Native + Expo)
- React Native 0.79.5
- Expo SDK 54
- React Navigation
- Expo Vector Icons

### Backend (FastAPI + OpenAI)
- FastAPI 0.104.1
- OpenAI SDK 1.3.0
- Python 3.9+
- Redis (opcional, para cache)

## 📋 Funcionalidades

- ✅ Notícias financeiras em tempo real
- ✅ Análise de sentimento com IA (Positivo/Negativo/Neutro)
- ✅ Resumos automáticos gerados por IA
- ✅ Insights de mercado personalizados
- ✅ Filtros por categoria (Mercado, Tech, Cripto, Commodities)
- ✅ Fontes de notícias identificadas
- ✅ Interface moderna e responsiva
- ✅ Pull-to-refresh para atualizar

## 🔧 Instalação

### Opção 1: DevContainer (Recomendado) 🐳

A forma mais fácil de começar! Tudo configurado automaticamente.

**Pré-requisitos:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

**Passos:**

1. Clone o repositório:
   ```bash
   git clone <seu-repositorio>
   cd Finmarket
   ```

2. Abra no VS Code:
   ```bash
   code .
   ```

3. Reabra no Container:
   - Pressione `F1` ou `Ctrl+Shift+P`
   - Digite: `Dev Containers: Reopen in Container`
   - Aguarde a construção (primeira vez demora ~5 min)

4. Configure as API Keys em `backend/.env`:
   ```env
   OPENAI_API_KEY=sua_chave_aqui
   NEWS_API_KEY=sua_chave_aqui
   ```

5. Inicie os serviços:
   ```bash
   # Terminal 1 - Backend
   cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   
   # Terminal 2 - Frontend
   npm start
   ```

📚 **Mais detalhes:** [.devcontainer/README.md](.devcontainer/README.md)

---

### Opção 2: Instalação Manual

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd Finmarket
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
copy .env.example .env

# Editar .env e adicionar suas chaves:
# - OPENAI_API_KEY (obrigatório)
# - NEWS_API_KEY (opcional, para notícias reais)

# Rodar servidor
python main.py
```

O backend estará rodando em: http://localhost:8000

### 3. Configurar Frontend

```bash
# Voltar para raiz do projeto
cd ..

# Instalar dependências
npm install

# Rodar app
npm start
```

## 🔑 Configuração de API Keys

### OpenAI (Obrigatório)

1. Acesse: https://platform.openai.com/api-keys
2. Crie uma nova chave
3. Adicione no `backend/.env`:
   ```
   OPENAI_API_KEY=sk-sua-chave-aqui
   ```

### NewsAPI (Opcional - para notícias reais)

1. Acesse: https://newsapi.org/register
2. Registre-se gratuitamente
3. Adicione no `backend/.env`:
   ```
   NEWS_API_KEY=sua-chave-aqui
   ```

**Sem NewsAPI:** O app funciona com notícias mock realistas.

## 📱 Testando no Celular

### Android/iOS com Expo Go

1. Instale o Expo Go no seu celular
2. Descubra o IP da sua máquina:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

3. Edite `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://SEU_IP:8000';
   ```

4. Certifique-se que o backend está rodando
5. Escaneie o QR code do Expo

## 🏗️ Estrutura do Projeto

```
Finmarket/
├── backend/                    # Backend FastAPI
│   ├── app/
│   │   ├── api/               # Rotas da API
│   │   ├── core/              # Configurações
│   │   ├── models/            # Schemas Pydantic
│   │   ├── services/          # Lógica de negócio
│   │   └── middleware/        # Middlewares
│   ├── main.py                # Entry point
│   ├── requirements.txt       # Dependências Python
│   └── .env                   # Variáveis de ambiente
│
├── src/                       # Frontend React Native
│   ├── screens/               # Telas do app
│   │   ├── noticias.js       # Tela de notícias
│   │   ├── homegraphics.js   # Tela de gráficos
│   │   └── Perfil.js         # Tela de perfil
│   ├── services/              # Serviços
│   │   └── api.js            # Cliente API
│   ├── navigation/            # Navegação
│   └── componets/             # Componentes
│
├── App.js                     # App principal
├── package.json               # Dependências Node
└── README.md                  # Este arquivo
```

## 🔌 Endpoints da API

### Notícias
```
GET  /api/news?category=tech&limit=10
GET  /api/news/{id}/summary
POST /api/news/analyze
```

### Insights
```
POST /api/insights
Body: { "symbols": ["AAPL", "GOOGL"], "timeframe": "1d" }
```

### Health Check
```
GET /api/health
```

**Documentação completa:** http://localhost:8000/docs

## 🎨 Customização

### Alterar modelo de IA

Edite `backend/.env`:
```env
OPENAI_MODEL=gpt-3.5-turbo  # Mais rápido e barato
# ou
OPENAI_MODEL=gpt-4-turbo-preview  # Mais preciso
```

### Alterar cores do app

Edite os estilos em `src/screens/noticias.js`:
```javascript
styles = StyleSheet.create({
  container: { backgroundColor: "#0A1033" },
  // ...
})
```

## 🐛 Troubleshooting

### Backend não inicia
- Verifique se Python 3.9+ está instalado
- Certifique-se que todas as dependências foram instaladas
- Verifique se a porta 8000 está livre

### App não conecta ao backend
- Verifique se o backend está rodando
- Confirme o IP correto em `src/services/api.js`
- Certifique-se que celular e PC estão na mesma rede

### Erro de OpenAI API
- Verifique se a chave está correta no `.env`
- Confirme que tem créditos na conta OpenAI
- Teste a chave em: https://platform.openai.com/playground

### App carregando infinito
- Verifique os logs do backend
- Reduza o número de notícias processadas
- Use gpt-3.5-turbo para respostas mais rápidas

## 📊 Custos Estimados

### OpenAI (gpt-3.5-turbo)
- ~$0.002 por requisição
- 100 requisições/dia = ~$0.20/dia
- ~$6/mês

### NewsAPI (Plano Gratuito)
- 100 requisições/dia
- Grátis para sempre

## 🚀 Próximas Features

- [ ] Autenticação de usuários
- [ ] Favoritar notícias
- [ ] Notificações push
- [ ] Gráficos de ações em tempo real
- [ ] Portfólio de investimentos
- [ ] Modo escuro/claro
- [ ] Compartilhar notícias
- [ ] Histórico de leitura

## 📝 Scripts Úteis

```bash
# Frontend
npm start          # Iniciar Expo
npm run android    # Rodar no Android
npm run ios        # Rodar no iOS
npm run web        # Rodar no navegador

# Backend
python main.py              # Iniciar servidor
python test_api.py          # Testar endpoints
uvicorn main:app --reload   # Modo desenvolvimento
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React Native, FastAPI e OpenAI

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Consulte a documentação da API: http://localhost:8000/docs
- Veja os guias em `backend/QUICKSTART.md` e `backend/NEWSAPI_SETUP.md`

---

**Nota:** Lembre-se de nunca commitar suas chaves de API. O arquivo `.env` está no `.gitignore` por segurança.
