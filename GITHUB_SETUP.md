# 🚀 Configurando o Repositório no GitHub

Guia passo a passo para criar e configurar seu repositório no GitHub.

## 📋 Pré-requisitos

- [x] Conta no GitHub
- [x] Git instalado localmente
- [x] Projeto Finmarket configurado

## 🎯 Passo a Passo

### 1. Criar Repositório no GitHub

1. **Acesse:** https://github.com/new

2. **Configure o repositório:**
   - **Nome:** `finmarket`
   - **Descrição:** `📈 Plataforma de notícias financeiras com análise de IA`
   - **Visibilidade:** 
     - ✅ Private (recomendado para desenvolvimento)
     - ⬜ Public (se quiser código aberto)
   - **NÃO** inicialize com:
     - ⬜ README
     - ⬜ .gitignore
     - ⬜ License
   
   (Já temos esses arquivos!)

3. **Clique em:** "Create repository"

### 2. Configurar Git Local

```bash
# Navegue até a pasta do projeto
cd finmarket

# Inicialize o repositório (se ainda não foi feito)
git init

# Configure seu nome e email (se ainda não configurou)
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"

# Verifique a configuração
git config --list
```

### 3. Preparar Arquivos

```bash
# Verifique o status
git status

# Adicione todos os arquivos
git add .

# Verifique o que será commitado
git status

# IMPORTANTE: Verifique se .env NÃO está sendo commitado
# Deve aparecer em "Untracked files" ou não aparecer
```

### 4. Primeiro Commit

```bash
# Faça o commit inicial
git commit -m "feat: initial commit with complete project structure

- Frontend React Native with Expo
- Backend FastAPI with OpenAI integration
- DevContainer configuration
- Complete documentation
- CI/CD pipelines
- Security policies"

# Verifique o commit
git log --oneline
```

### 5. Conectar ao GitHub

```bash
# Adicione o remote (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/finmarket.git

# Ou use SSH (recomendado)
git remote add origin git@github.com:SEU-USUARIO/finmarket.git

# Verifique o remote
git remote -v
```

### 6. Push para GitHub

```bash
# Renomeie a branch para main (se necessário)
git branch -M main

# Faça o push
git push -u origin main

# Se usar SSH pela primeira vez, pode pedir para confirmar
# Digite 'yes' e pressione Enter
```

### 7. Verificar no GitHub

1. Acesse: `https://github.com/SEU-USUARIO/finmarket`
2. Você deve ver todos os arquivos
3. O README.md será exibido automaticamente

## 🔐 Configurar Secrets

Para o CI/CD funcionar, configure os secrets:

1. **Vá para:** Settings → Secrets and variables → Actions

2. **Adicione os secrets:**
   - `OPENAI_API_KEY`: Sua chave da OpenAI
   - `NEWS_API_KEY`: Sua chave da NewsAPI (opcional)

3. **Clique em:** "New repository secret" para cada um

## 🛡️ Configurar Branch Protection

Proteja a branch main:

1. **Vá para:** Settings → Branches

2. **Clique em:** "Add branch protection rule"

3. **Configure:**
   - Branch name pattern: `main`
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1)
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators

4. **Salve as regras**

## 📝 Configurar Issues e PRs

### Habilitar Issues

1. **Vá para:** Settings → General
2. **Features:** ✅ Issues
3. **Salve**

### Configurar Labels

As labels padrão já funcionam, mas você pode adicionar:

```
enhancement     - Nova funcionalidade
bug             - Algo não está funcionando
documentation   - Melhorias na documentação
question        - Dúvidas
help wanted     - Precisa de ajuda
good first issue - Bom para iniciantes
```

## 🔄 Workflow de Desenvolvimento

### Criar Nova Feature

```bash
# Atualize a main
git checkout main
git pull origin main

# Crie uma branch
git checkout -b feature/nome-da-feature

# Faça suas mudanças
# ... código ...

# Commit
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push
git push origin feature/nome-da-feature
```

### Abrir Pull Request

1. **Vá para:** GitHub → Pull requests → New pull request
2. **Selecione:** base: `main` ← compare: `feature/nome-da-feature`
3. **Preencha o template**
4. **Clique em:** "Create pull request"

### Merge

1. **Aguarde:** CI passar
2. **Revise:** Código
3. **Aprove:** PR
4. **Merge:** Squash and merge (recomendado)
5. **Delete:** Branch após merge

## 🏷️ Versionamento

### Criar Release

```bash
# Atualize o CHANGELOG.md
# Atualize a versão no package.json

# Commit
git add .
git commit -m "chore: bump version to 1.0.0"

# Tag
git tag -a v1.0.0 -m "Release 1.0.0"

# Push
git push origin main --tags
```

### No GitHub

1. **Vá para:** Releases → Draft a new release
2. **Tag:** v1.0.0
3. **Title:** Release 1.0.0
4. **Description:** Copie do CHANGELOG.md
5. **Publish release**

## 👥 Adicionar Colaboradores

1. **Vá para:** Settings → Collaborators
2. **Clique em:** "Add people"
3. **Digite:** Username ou email
4. **Selecione:** Permissão (Write recomendado)
5. **Envie o convite**

## 📊 Configurar GitHub Pages (Opcional)

Para documentação:

1. **Vá para:** Settings → Pages
2. **Source:** Deploy from a branch
3. **Branch:** main / docs (se tiver)
4. **Salve**

## 🔔 Configurar Notificações

1. **Vá para:** Settings → Notifications
2. **Configure:**
   - ✅ Email notifications
   - ✅ Web notifications
   - Escolha eventos importantes

## 📈 Insights e Analytics

Explore:

- **Insights:** Veja estatísticas do repo
- **Network:** Visualize branches e forks
- **Contributors:** Veja contribuidores
- **Traffic:** Veja visualizações e clones

## 🆘 Problemas Comuns

### Erro: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/finmarket.git
```

### Erro: "failed to push some refs"

```bash
# Pull primeiro
git pull origin main --rebase

# Depois push
git push origin main
```

### Erro: "Permission denied (publickey)"

Configure SSH:

```bash
# Gere uma chave SSH
ssh-keygen -t ed25519 -C "seu.email@example.com"

# Copie a chave pública
cat ~/.ssh/id_ed25519.pub

# Adicione no GitHub: Settings → SSH and GPG keys → New SSH key
```

### Commitou .env por engano

```bash
# Remove do Git mas mantém local
git rm --cached backend/.env

# Commit
git commit -m "fix: remove .env from git"

# Push
git push origin main

# Adicione ao .gitignore se ainda não está
echo "backend/.env" >> .gitignore
git add .gitignore
git commit -m "chore: add .env to gitignore"
git push origin main
```

## ✅ Checklist Final

Antes de tornar o repo público:

- [ ] .env não está commitado
- [ ] Secrets configurados no GitHub
- [ ] README.md está completo
- [ ] LICENSE está presente
- [ ] CONTRIBUTING.md está claro
- [ ] CI/CD está funcionando
- [ ] Branch protection configurada
- [ ] Issues templates configurados
- [ ] PR template configurado
- [ ] Security policy configurada

## 🎉 Pronto!

Seu repositório está configurado! Agora você pode:

- ✅ Desenvolver features
- ✅ Abrir issues
- ✅ Criar pull requests
- ✅ Colaborar com outros
- ✅ Fazer releases

## 📚 Recursos

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

**🚀 Bom desenvolvimento!**
