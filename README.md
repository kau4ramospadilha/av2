# FinEduca — Educação Financeira & Ativos Internacionais

Projeto acadêmico da disciplina **Sistemas para Internet**.  
Alunos: **Artur Ribeiro · Kauã Ramos · Davi Ryan**

## 📁 Estrutura do projeto

```
fineduca/
├── index.html                  ← Página inicial
├── pages/
│   ├── sobre.html              ← Equipe + Guia Git/Deploy
│   ├── modulos.html            ← Módulos de conteúdo
│   ├── investimentos.html      ← Investimentos básicos
│   └── internacionais.html     ← Ativos internacionais
├── css/
│   ├── base.css                ← Reset + variáveis + componentes globais
│   ├── home.css                ← Estilos da página inicial
│   ├── sobre.css               ← Estilos da página sobre
│   └── inner.css               ← Estilos de páginas internas
├── js/
│   ├── main.js                 ← Navbar, menu, reveal, acessibilidade
│   └── calculadora.js          ← Calculadora de juros compostos (Canvas)
├── assets/
│   ├── images/                 ← Fotos da equipe (local, sem links externos)
│   │   ├── artur.jpg
│   │   ├── kaua.jpg
│   │   └── davi.jpg
│   └── icons/
│       └── favicon.svg
└── server.py                   ← Backend Python/Flask (local apenas)
```

## 🚀 Como rodar localmente

### Site estático (sem backend)
Basta abrir `index.html` no navegador — **não precisa de servidor**.

### Com backend Python
```bash
pip install flask flask-cors
python server.py
# Acesse: http://localhost:5000
```

## 🌐 Deploy no GitHub Pages

Veja o guia completo em `pages/sobre.html#git` ou siga:

1. Crie um repositório público no GitHub chamado `fineduca`
2. Faça upload de todos os arquivos do projeto
3. Vá em **Settings → Pages → Source: main / root**
4. Aguarde 1-2 minutos e acesse: `https://SEU_USUARIO.github.io/fineduca/`

## ♿ Acessibilidade (WCAG 2.2)

- Contraste mínimo 4.5:1 em todos os textos (AA)
- Skip link para conteúdo principal (2.4.1)
- Foco visível em todos os elementos interativos (2.4.11)
- ARIA roles e labels em toda navegação (1.3.1)
- `aria-live` na calculadora para leitores de tela
- `prefers-reduced-motion` respeitado (2.3.3)
- Touch targets mínimos de 44×44px (2.5.8)

## 📱 Responsividade

Mobile-First com breakpoints:
- **< 640px** — mobile (1 coluna)  
- **640–1024px** — tablet (2 colunas)  
- **> 1024px** — desktop (layout completo)  
- **> 1600px** — TV/ultrawide (expandido)
