# Política de Segurança

## 🔒 Versões Suportadas

| Versão | Suportada          |
| ------ | ------------------ |
| 1.0.x  | :white_check_mark: |
| < 1.0  | :x:                |

## 🚨 Reportando uma Vulnerabilidade

A segurança do Finmarket é levada a sério. Se você descobriu uma vulnerabilidade de segurança, por favor, siga estas diretrizes:

### Como Reportar

**NÃO** abra uma issue pública para vulnerabilidades de segurança.

Em vez disso:

1. **Email:** Envie um email para [security@finmarket.com] com:
   - Descrição detalhada da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Sugestões de correção (se houver)

2. **GitHub Security Advisory:** Use o recurso de Security Advisory do GitHub:
   - Vá para a aba "Security"
   - Clique em "Report a vulnerability"
   - Preencha o formulário

### O que Esperar

- **Confirmação:** Você receberá uma confirmação em até 48 horas
- **Avaliação:** Avaliaremos a vulnerabilidade em até 7 dias
- **Correção:** Trabalharemos em uma correção prioritariamente
- **Divulgação:** Coordenaremos a divulgação pública com você

### Recompensas

Atualmente não oferecemos recompensas monetárias, mas:
- Seu nome será creditado no CHANGELOG
- Você será mencionado no release notes
- Reconhecimento público (se desejar)

## 🛡️ Práticas de Segurança

### API Keys

**NUNCA** commite API keys no repositório:

```bash
# Verifique antes de commitar
git diff

# Use .env para chaves sensíveis
echo "OPENAI_API_KEY=sk-..." >> backend/.env

# .env está no .gitignore
```

### Variáveis de Ambiente

Sempre use variáveis de ambiente para dados sensíveis:

```python
# ✅ Correto
api_key = os.getenv("OPENAI_API_KEY")

# ❌ Errado
api_key = "sk-proj-abc123..."
```

### Dependências

Mantenha dependências atualizadas:

```bash
# Backend
pip list --outdated
pip install --upgrade package-name

# Frontend
npm outdated
npm update
```

### Auditoria

Execute auditorias regularmente:

```bash
# Frontend
npm audit
npm audit fix

# Backend
pip-audit
```

## 🔐 Configurações de Segurança

### Backend

1. **CORS:** Configure origens permitidas
   ```python
   CORS_ORIGINS = ["https://seu-dominio.com"]
   ```

2. **Rate Limiting:** Implemente rate limiting
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   ```

3. **HTTPS:** Use HTTPS em produção
   ```python
   # Redirecione HTTP para HTTPS
   ```

### Frontend

1. **Validação:** Valide todas as entradas
2. **Sanitização:** Sanitize dados do usuário
3. **Armazenamento:** Use AsyncStorage com cuidado

## 📋 Checklist de Segurança

Antes de fazer deploy:

- [ ] Todas as API keys estão em variáveis de ambiente
- [ ] .env não está commitado
- [ ] CORS configurado corretamente
- [ ] Rate limiting implementado
- [ ] HTTPS habilitado
- [ ] Dependências atualizadas
- [ ] Auditoria de segurança executada
- [ ] Logs não expõem dados sensíveis
- [ ] Validação de entrada implementada
- [ ] Autenticação/Autorização configurada

## 🚫 Vulnerabilidades Conhecidas

Nenhuma vulnerabilidade conhecida no momento.

Histórico de vulnerabilidades corrigidas:
- Nenhuma até o momento

## 📚 Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [React Native Security](https://reactnative.dev/docs/security)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)

## 📞 Contato

Para questões de segurança:
- Email: security@finmarket.com
- GitHub Security Advisory: [Link]

---

**Obrigado por ajudar a manter o Finmarket seguro! 🔒**
