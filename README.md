# SyntheticFi Documentation Site

Static documentation built with [VitePress](https://vitepress.dev/), professional landing page, AI search UI, feedback widgets, and analytics dashboard.

## Local development

```bash
npm install
npm run docs:dev
```

## Build

```bash
npm run docs:build
npm run docs:preview
```

## Deploy (GitHub Pages)

1. Push to GitHub
2. **Settings → Pages → Source:** GitHub Actions
3. Workflow deploys on push to `main` / `master`

Set `VP_BASE_PATH` to match your repo name (default: `/SyntheticFi/`).

## Site features

| Feature | Location |
|---------|----------|
| **Landing page** | `/`, hero, AI search, doc sections, ticket form |
| **Guides** | `/core/*`, overview, getting started, FAQ, admin, what's new, troubleshooting |
| **API reference** | `/platform/*` |
| **Integrations** | `/integrations/*` |
| **Support ticket** | Home page + `/support/create-ticket` |
| **Feature requests** | `/support/feature-requests` |
| **Analytics dashboard** | `/admin/analytics` |
| **Floating feedback** | Every doc page (👍 👎 + comment) |

## Production notes

- **AI search**, Currently uses local doc index + smart routing. Swap `docSearch.ts` for your LLM/RAG API.
- **Analytics**, Stored in `localStorage` for demo. Wire `analytics.ts` to your backend (PostHog, Plausible, custom API).
- **Tickets & features**, Form submissions saved locally; connect to Zendesk, Linear, or your support API.

## Why VitePress?

Fast, markdown-native, easy to customize with Vue, and deploys anywhere static files are hosted. See the docs site itself for the full guide structure.
