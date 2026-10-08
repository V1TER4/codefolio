# Victor Castilho — Developer Showcase

Portfólio estático feito com React, Node.js, TypeScript e Vite. Os repositórios públicos são lidos pela API do GitHub durante o build; o navegador não chama a API em produção.

## Configuração

Copie `.env.example` para `.env` e preencha suas informações. O arquivo `.env` é ignorado pelo Git e não será publicado. O projeto usa apenas informações públicas e não precisa de token.

O username usado no script de build é `GITHUB_USERNAME`; para o frontend, o mesmo valor também fica disponível como `VITE_GITHUB_USERNAME`. O Vite exige o prefixo `VITE_` para variáveis usadas no navegador.

No GitHub Actions, crie estas **Repository variables** em Settings → Secrets and variables → Actions → Variables: `GITHUB_USERNAME`, `LINKEDIN_URL`, `EMAIL`, `PROFILE_LOCATION` e `PROFILE_EXPERIENCE`. O workflow repassa essas variáveis para o build do GitHub Pages.

Os dados mais extensos ficam em arquivos separados: `src/data/profile.json`, `src/data/experience.json` e `src/data/education.json`. Assim, textos longos e listas podem ser editados com facilidade sem transformar o `.env` em uma linha difícil de manter.

No GitHub Actions, esses arquivos JSON são enviados junto com o repositório. O workflow precisa apenas das variáveis simples de contato e do username.

Para destacar um repositório, adicione sua configuração em `src/data/project-config.ts`:

```ts
'nome-do-repositorio': {
  featured: true,
  order: 1,
  image: '/projects/nome-do-repositorio.png',
  description: 'Descrição personalizada opcional.',
  technologies: ['Tecnologia extra'],
},
```

A chave precisa ser o nome do repositório no GitHub, por exemplo `donation-system-web`, e não necessariamente o título visual do projeto. A correspondência ignora diferenças de maiúsculas, espaços e hífens.

Imagens personalizadas devem ficar em `public/projects/`; o caminho usado na configuração começa em `/projects/`.

## Desenvolvimento

```bash
npm install
npm run dev
```

`npm run build` executa `fetch:projects` e salva os dados em `src/data/generated/projects.json` antes do `vite build`. Se a API falhar ou atingir o limite, o build continua usando os dados existentes.

O workflow em `.github/workflows/deploy.yml` executa em pushes para `main` ou `master`, instala dependências, gera os projetos, cria o site estático e publica no GitHub Pages. Em Settings → Pages, selecione **GitHub Actions** como source.

O deploy usa Node 20, instala as dependências com `npm install`, executa `npm run build`, envia somente `dist/` como artifact e publica com `actions/deploy-pages`. O `base` do Vite é calculado automaticamente a partir de `GITHUB_REPOSITORY`, funcionando em repositórios de projeto no GitHub Pages.
