# Անկախության սերունդ

Article website built with **Astro 7** (server-rendered on each request by a small Node server), **Tailwind CSS 4**, and **React 19** islands.
The site has three languages: Armenian at `/`, English at `/en/`, and Russian at `/ru/`.
The design follows the Caridad "Children Aid" demo layout.

## Commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Dev server at http://localhost:4321               |
| `npm run build`   | Build the Node server into `dist/`                |
| `npm run preview` | Run the built server locally                      |
| `node dist/server/entry.mjs` | Run in production (`HOST`, `PORT`, `ARTICLES_API_URL`) |
| `npx astro check` | Type-check `.astro`/`.ts`/`.tsx` files            |

## Structure

```
src/
  lib/articles-api.ts      ← server-side client for /api/public/articles (called on every request)
  lib/articles.ts          ← article helpers (getArticlePage, getArticle, getLatestArticles, articleUrl, toCard, …)
  i18n/ui.ts               ← ALL interface text in hy / en / ru (nav, sections, FAQ, events, buttons…)
  i18n/index.ts            ← language helpers (localizePath, useTranslations, …)
  data/site.ts             ← navigation structure, contact info, stats, and ALL image URLs
  styles/global.css        ← Tailwind theme tokens (colors, fonts) and button/heading utilities
  layouts/BaseLayout.astro
  components/              ← Header, Footer, Logo, ArticleCard, PageHero, SearchForm
  components/home/         ← homepage sections (Hero, Support, GetInvolved, About, Programs, Events, …)
  components/react/        ← interactive islands (see below)
  pages/
    [...lang]/index.astro               ← homepage (/, /en/, /ru/)
    [...lang]/articles/[...path].astro  ← lists: /articles, /articles/page/2 … (newest article large on page 1)
    [...lang]/articles/[slug].astro     ← single article page, Armenian only: /articles/<slug>
    [...lang]/articles/search.astro     ← search (?q=…, title/excerpt match, filtered on the server)
    404.astro
```

### React islands (client-side interactive parts)
- `DesktopNav`: dropdown menu (Radix Navigation Menu)
- `MobileNav`: slide-in drawer with an accordion (Radix Dialog + Accordion)
- `Faq`: accordion (Radix Accordion)
- `ArticleCarousel`: slider (Embla Carousel)
- `Counter`: animated numbers (react-countup)
- `DonateWidget`: donation form UI. **Demo only.** No payment provider is connected.

## Articles (from the admin panel)
Articles are written and published in the admin panel. Every page is rendered on request, and the article data
comes straight from the Django public API (published articles only):

- `/articles`, `/articles/page/2` … — 6 per page; the newest published article is shown large at the top of page 1
- `/articles/<slug>` — one page per article (Armenian), with Open Graph + JSON-LD `Article` data for SEO
- `/en/articles`, `/ru/articles` — the same Armenian articles with translated page text; they link to `/articles/<slug>`
- `/articles/search?q=…` — published articles whose title or excerpt contain the query

There is no build step or hook to keep in sync: publish/unpublish in the admin, and the change shows up the next
time someone loads (or refreshes) a page. An unpublished article's URL returns 404 right away.

Set the API address in `.env` (dev) or the server's environment (production; read at runtime). The default is `http://127.0.0.1:8000`:

```
ARTICLES_API_URL=https://api.example.com
```

If the API is down, article pages return an error; the home page and footer still render, without the latest articles.
Django rate-limits the public API per IP (`PUBLIC_API_RATE`). All requests now come from this server's IP, so set the
limit above your expected traffic. Each page view makes 1–2 API calls; a search makes one call per 100 articles.

## ⚠️ Before going live
All images are loaded from caridad.vamtam.com. They are licensed theme and iStock assets.
Replace every URL in `src/data/site.ts` with your own images.
Also replace the placeholder contact details and social links in `site.ts`, and set `site` in `astro.config.mjs` to the real domain.
