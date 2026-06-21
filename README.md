# OpenFX Documentation

Documentation site for [OpenFX](https://www.openfx.com/), cross-border FX liquidity and payment infrastructure for institutions.

**Live site:** [https://001bibhu.github.io/OpenFX-/](https://001bibhu.github.io/OpenFX-/)

Built with [VitePress](https://vitepress.dev/). Includes a landing page, AI search, developer community, support tickets, feature ideas, and an admin analytics dashboard.

## Local development

```bash
npm install
npm run docs:dev
```

Open [http://localhost:5173/](http://localhost:5173/).

## Build and preview

```bash
npm run docs:build
npm run docs:preview
```

## Deploy to GitHub Pages

This repo deploys automatically via GitHub Actions (`.github/workflows/deploy-docs.yml`) on push to `main`.

1. **Settings → Pages → Source:** GitHub Actions
2. Push to `main`
3. Site publishes to **https://001bibhu.github.io/OpenFX-/**

The workflow sets `VP_BASE_PATH=/OpenFX-/`. If you rename the repo, update that value in `.github/workflows/deploy-docs.yml`.

## Site map

| Section | Path |
|---------|------|
| Home | `/` |
| Guides | `/core/*` |
| API reference | `/platform/*` |
| Solutions | `/integrations/*` |
| Developer community | `/developer-community/` |
| Feature ideas | `/feature-ideas/` |
| Support | `/support/*` |
| Admin analytics | `/admin/analytics` |

## Production notes

- **AI search** uses a local doc index and rule-based routing. Replace `docs/.vitepress/utils/docSearch.ts` with your LLM or RAG API for production.
- **Analytics, tickets, and feature ideas** are stored in `localStorage` for demo purposes. Wire `docs/.vitepress/utils/analytics.ts` and related forms to your backend before production.
- **Community moderation** uses a demo password in `docs/.vitepress/utils/developerCommunity.ts`. Replace with real auth before production.
