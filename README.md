# Codefolio

Portfólio pessoal estático de Victor Castilho. O site apresenta perfil, experiência, formação e projetos publicados no GitHub em uma interface React responsiva.

## Stack

- React 19
- TypeScript
- Vite
- CSS
- GitHub Actions e GitHub Pages

## Desenvolvimento

```bash
git clone https://github.com/V1TER4/codefolio.git
cd codefolio
npm install
cp .env.example .env
npm run dev
```

O build completo pode ser gerado com:

```bash
npm run typecheck
npm run build
npm run preview
```

Durante o build, `scripts/fetch-github-projects.ts` consulta a API do GitHub e grava os dados em `src/data/generated/projects.json`. Se a API não estiver disponível, os dados já existentes são preservados.

## Personalização

- `src/data/profile.json`, `experience.json` e `education.json`: conteúdo do perfil;
- `src/data/site-config.ts`: usuário e configurações do site;
- `src/data/project-config.ts`: ordem, destaque, imagem e descrição dos projetos;
- `public/projects/`: imagens personalizadas.

No GitHub Actions, configure as variáveis `GITHUB_USERNAME`, `LINKEDIN_URL`, `EMAIL`, `PROFILE_LOCATION` e `PROFILE_EXPERIENCE`. O deploy publica somente o diretório `dist/` no GitHub Pages.

