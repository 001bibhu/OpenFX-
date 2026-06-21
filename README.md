# OpenFX Documentation Site

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

Set `VP_BASE_PATH` to match your repo name (default: `/OpenFX-/` for [001bibhu/OpenFX-](https://github.com/001bibhu/OpenFX-)).

## Publish on GitHub Pages (simple steps)

Your repo already includes a GitHub Actions workflow (`.github/workflows/deploy-docs.yml`) that builds and publishes the site automatically.

### 1. Push code to GitHub

```bash
git init
git add .
git commit -m "OpenFX documentation site"
git branch -M main
git remote add origin https://github.com/001bibhu/OpenFX-.git
git push -u origin main
```

If the repo already exists, just push your latest changes:

```bash
git add .
git commit -m "Add developer community and OpenFX docs"
git push
```

### 2. Turn on GitHub Pages (required — deploy fails without this)

1. Open your repo on GitHub: **https://github.com/001bibhu/OpenFX-**
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”)
4. If you already pushed before doing this, the first deploy will fail — that is normal. After enabling Pages, go to **Actions**, open the failed run, and click **Re-run all jobs**

### 3. Wait for the workflow

1. Go to the **Actions** tab in your repo
2. You should see **Deploy docs to GitHub Pages** running (triggered by your push)
3. When it finishes with a green checkmark, your site is live

### 4. Open your site

Because the repo is named `OpenFX-`, the URL will be:

**https://001bibhu.github.io/OpenFX-/**

The home page is at that URL. The developer community is at:

**https://001bibhu.github.io/OpenFX-/developer-community/**

### Troubleshooting

| Problem | Fix |
|---------|-----|
| Site shows 404 | Wait 2–5 minutes after the Action completes. Confirm Pages source is **GitHub Actions**. |
| Broken styles or images | The base path must match the repo name. This repo uses `/OpenFX-/` — already set in the workflow. |
| Action failed on **Deploy to GitHub Pages** | Enable Pages first: **Settings → Pages → Source: GitHub Actions**, then re-run the workflow. |
| Wrong URL path | If you rename the repo, update `VP_BASE_PATH` in `.github/workflows/deploy-docs.yml` to `/{repo-name}/`. |

### Moderator login (developer community)

On the community page, expand **Moderator login** and sign in with password `openfx-admin` to approve, reject, pin, or delete posts. Change this in `docs/.vitepress/utils/developerCommunity.ts` before going to production, or connect a real backend.

## Site features

| Feature | Location |
|---------|----------|
| **Landing page** | `/`, hero, AI search, doc sections, ticket form |
| **Guides** | `/core/*`, overview, getting started, FAQ, admin, what's new, troubleshooting |
| **API reference** | `/platform/*` |
| **Solutions** | `/integrations/*` |
| **Support ticket** | Home page + `/support/create-ticket` |
| **Developer community** | `/developer-community/` — posts, likes, moderator approval |
| **Analytics dashboard** | `/admin/analytics` |
| **Floating feedback** | Every doc page (👍 👎 + comment) |

## Production notes

- **AI search**, Currently uses local doc index + smart routing. Swap `docSearch.ts` for your LLM/RAG API.
- **Analytics**, Stored in `localStorage` for demo. Wire `analytics.ts` to your backend (PostHog, Plausible, custom API).
- **Tickets & features**, Form submissions saved locally; connect to Zendesk, Linear, or your support API.

## Why VitePress?

Fast, markdown-native, easy to customize with Vue, and deploys anywhere static files are hosted. See the docs site itself for the full guide structure.
