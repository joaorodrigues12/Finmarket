# 🤝 Guia de Contribuição - Finmarket

Obrigado por considerar contribuir com o Finmarket! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Features](#sugerir-features)

## 📜 Código de Conduta

Este projeto segue um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e colaborativo.

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
# Clone seu fork
git clone https://github.com/seu-usuario/finmarket.git
cd finmarket

# Adicione o repositório original como upstream
git remote add upstream https://github.com/original/finmarket.git
```

### 2. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 3. Faça suas Alterações

- Escreva código limpo e bem documentado
- Siga os padrões de código do projeto
- Adicione testes quando aplicável
- Atualize a documentação se necessário

### 4. Commit suas Mudanças

Use mensagens de commit claras e descritivas:

```bash
git add .
git commit -m "feat: adiciona filtro de data nas notícias"
```

**Padrão de commits:**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Manutenção, dependências, etc

### 5. Push para seu Fork

```bash
git push origin feature/nome-da-feature
```

### 6. Abra um Pull Request

- Vá para o repositório original no GitHub
- Clique em "New Pull Request"
- Selecione sua branch
- Preencha o template de PR

## 🛠️ Configuração do Ambiente

### Usando DevContainer (Recomendado)

1. Instale Docker Desktop e VS Code
2. Instale a extensão "Dev Containers"
3. Abra o projeto no VS Code
4. Pressione `F1` → "Dev Containers: Reopen in Container"
5. Aguarde a configuração automática

### Configuração Manual

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure suas API keys no .env
```

**Frontend:**
```bash
npm install
```

## 📝 Padrões de Código

### Python (Backend)

- Use Python 3.9+
- Siga PEP 8
- Use type hints
- Docstrings para funções públicas
- Máximo 88 caracteres por linha (Black)

**Exemplo:**
```python
from typing import List, Optional

async def get_news(
    category: Optional[str] = None,
    limit: int = 10
) -> List[NewsItem]:
    """
    Busca notícias com filtros opcionais.
    
    Args:
        category: Categoria das notícias
        limit: Número máximo de resultados
        
    Returns:
        Lista de notícias
    """
    # Implementação
    pass
```

### JavaScript/React Native (Frontend)

- Use ES6+
- Componentes funcionais com hooks
- Prettier para formatação
- ESLint para linting
- Nomes descritivos para variáveis

**Exemplo:**
```javascript
import React, { useState, useEffect } from "react";

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    // Implementação
  };

  return (
    // JSX
  );
}
```

### Estrutura de Arquivos

**Backend:**
```
backend/
├── app/
│   ├── api/routes/        # Endpoints
│   ├── core/              # Config
│   ├── models/            # Schemas
│   ├── services/          # Lógica
│   └── middleware/        # Middlewares
```

**Frontend:**
```
src/
├── screens/               # Telas
├── components/            # Componentes
├── services/              # APIs
├── navigation/            # Navegação
└── utils/                 # Utilitários
```

## 🔍 Processo de Pull Request

### Checklist antes de abrir PR

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (se aplicável)
- [ ] Documentação atualizada
- [ ] Commits seguem o padrão
- [ ] Branch está atualizada com main
- [ ] Sem conflitos de merge

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)
Cole aqui

## Checklist
- [ ] Código testado localmente
- [ ] Documentação atualizada
- [ ] Sem warnings no console
```

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Teste na versão mais recente
3. Colete informações do ambiente

### Template de Bug Report

```markdown
**Descrição do Bug**
Descrição clara do problema

**Como Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável

**Ambiente:**
- OS: [Windows/Mac/Linux]
- Node: [versão]
- Python: [versão]
- Expo: [versão]

**Logs**
Cole logs relevantes
```

## 💡 Sugerir Features

### Template de Feature Request

```markdown
**Problema que Resolve**
Descrição do problema ou necessidade

**Solução Proposta**
Como você imagina a feature

**Alternativas Consideradas**
Outras abordagens pensadas

**Contexto Adicional**
Screenshots, mockups, etc
```

## 🧪 Testes

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
npm test
```

## 📚 Recursos Úteis

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [OpenAI API Docs](https://platform.openai.com/docs)

## ❓ Dúvidas?

- Abra uma issue com a tag `question`
- Entre em contato com os mantenedores
- Consulte a documentação

## 🎉 Reconhecimento

Todos os contribuidores serão reconhecidos no README do projeto!

---

**Obrigado por contribuir! 🚀**
