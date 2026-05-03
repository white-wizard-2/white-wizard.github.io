# white-wizard.github.io

Personal GitHub Pages site: profile and skills, built with React, Vite, TypeScript, Tailwind CSS, and shadcn-style UI.

## Content

Edit **`src/data/site.ts`** for your name, bio, links, and skill categories.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deploy

1. Push to the `main` branch.
2. In the repository **Settings → Pages**, set **Build and deployment** source to **GitHub Actions**.
3. The workflow **Deploy to GitHub Pages** builds the site and publishes the `dist` output.

For a `username.github.io` repository, the site is served at the root URL (for example `https://white-wizard.github.io/`).
