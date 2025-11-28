# Finmarket DevContainer

Este projeto está configurado com um ambiente de desenvolvimento em container para garantir consistência entre diferentes máquinas.

## 🚀 Início Rápido

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Como Usar

1. **Clone o repositório:**
   ```bash
   git clone <seu-repositorio>
   cd finmarket
   ```

2. **Abra no VS Code:**
   ```bash
   code .
   ```

3. **Reabra no Container:**
   - Pressione `F1` ou `Ctrl+Shift+P`
   - Digite: `Dev Containers: Reopen in Container`
   - Aguarde a construção do container (primeira vez pode demorar)

4. **Inicie os serviços:**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm start
   ```

## 📦 O que está incluído?

### Serviços

- **Node.js 20**: Para o frontend React Native/Expo
- **Python 3**: Para o backend FastAPI
- **Redis**: Para cache e filas
- **Expo CLI**: Para desenvolvimento mobile

### Portas Expostas

| Porta | Serviço | Descrição |
|-------|---------|-----------|
| 19000 | Expo Dev Server | Servidor de desenvolvimento Expo |
| 19001 | Expo Metro Bundler | Bundler do React Native |
| 19002 | Expo Dev Tools | Interface web do Expo |
| 8000 | FastAPI | API Backend |
| 8081 | Metro | Metro Bundler alternativo |
| 6379 | Redis | Cache e filas |

### Extensões VS Code

- ESLint
- Prettier
- Python
- Pylance
- Docker
- React Native Tools
- TypeScript

## 🔧 Configuração

### Variáveis de Ambiente

O script de setup cria automaticamente os arquivos `.env`, mas você precisa adicionar suas chaves de API:

**backend/.env:**
```env
OPENAI_API_KEY=sua_chave_aqui
NEWS_API_KEY=sua_chave_aqui
```

### Comandos Úteis

```bash
# Reconstruir o container
# No VS Code: Dev Containers: Rebuild Container

# Ver logs do Redis
docker-compose -f .devcontainer/docker-compose.yml logs redis

# Acessar o Redis CLI
docker-compose -f .devcontainer/docker-compose.yml exec redis redis-cli

# Limpar tudo e recomeçar
docker-compose -f .devcontainer/docker-compose.yml down -v
```

## 📱 Testando no Dispositivo Físico

1. Certifique-se de que seu dispositivo está na mesma rede
2. No terminal do Expo, pressione `a` para Android ou `i` para iOS
3. Escaneie o QR code com o app Expo Go

## 🐛 Troubleshooting

### Container não inicia
```bash
docker system prune -a
# Depois reabra no container
```

### Portas em uso
```bash
# Verifique processos usando as portas
lsof -i :8000
lsof -i :19000
```

### Dependências desatualizadas
```bash
# Frontend
npm install

# Backend
cd backend && pip install -r requirements.txt
```

## 📚 Recursos

- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Expo Documentation](https://docs.expo.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
