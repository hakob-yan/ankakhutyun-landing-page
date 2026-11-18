# Անկախության սերունդ

Article website built with **Astro 7** (fully static output, no Node server), **Tailwind CSS 4**, and **React 19** islands.
The site has three languages: Armenian at `/`, English at `/en/`, and Russian at `/ru/`.
The design follows the Caridad "Children Aid" demo layout.

## Commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Dev server at http://localhost:4321               |
| `npm run build`   | Static build into `dist/` (upload to any static host) |
| `npm run preview` | Serve the built `dist/` locally                   |
| `npx astro check` | Type-check `.astro`/`.ts`/`.tsx` files            |

## Structure

```
src/
  content.config.ts        ← articles collection, loaded from the Django API at build time
  lib/articles-api.ts      ← build-time client for /api/public/articles (pagination, retries on 429)
  lib/articles.ts          ← article helpers (getArticles, articleUrl, toCard, readingMinutes)
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
    [...lang]/articles/search.astro     ← search (?q=…, filtered in the browser)
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
Articles are written and published in the admin panel. At build time the site fetches every **published**
article from the Django public API and pre-renders all pages (SSG):

- `/articles`, `/articles/page/2` … — 6 per page; the newest published article is shown large at the top of page 1
- `/articles/<slug>` — one page per article (Armenian), with Open Graph + JSON-LD `Article` data for SEO
- `/en/articles`, `/ru/articles` — the same Armenian articles with translated page text; they link to `/articles/<slug>`
- `/articles/search?q=…` — every article is in the page and filtered in the browser (works with no API at runtime)

Set the API address in `.env` (or the build environment). The default is `http://127.0.0.1:8000`:

```
ARTICLES_API_URL=https://api.example.com
```

**Keeping the site in sync with the admin.** When a change is visible to the public (publish, unpublish, edit or delete
of a published article), Django POSTs to every URL in its `LANDING_REFRESH_HOOK_URLS` setting:

- **dev:** `http://localhost:4321/__refresh-articles` — `astro dev` reloads the articles and open tabs refresh
  (`src/integrations/articles-refresh.mjs`). Optional shared secret: `ARTICLES_REFRESH_TOKEN` here = `LANDING_REFRESH_TOKEN` in Django.
- **production:** your static host's build hook (Netlify / Vercel / Cloudflare Pages) → the site is rebuilt and redeployed.

The build fails if the API is unreachable, so a broken API never ships an empty blog.

## ⚠️ Before going live
All images are loaded from caridad.vamtam.com. They are licensed theme and iStock assets.
Replace every URL in `src/data/site.ts` with your own images.
Also replace the placeholder contact details and social links in `site.ts`, and set `site` in `astro.config.mjs` to the real domain.
