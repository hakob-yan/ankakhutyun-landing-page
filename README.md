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
  content/articles/{hy,en,ru}/*.md ← articles per language; file name = URL slug (same name in every language)
  content.config.ts        ← article schema (title, description, date, category, image, author…)
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
    [...lang]/articles/[...path].astro  ← lists: /articles, /articles/page/2, /articles/category/history
    [...lang]/articles/[slug].astro     ← single article page
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

## Adding an article
Create `src/content/articles/hy/my-article.md`, then add translated copies with the **same file name** in `en/` and `ru/`:

```md
---
title: 'Վերնագիր'
description: 'Կարճ նկարագրություն'
date: 2026-11-13
category: history        # history | education | culture | society
image: 'https://…/photo.jpg'
author: 'Անուն Ազգանուն'
---

Article text in Markdown…
```

## ⚠️ Before going live
All images are loaded from caridad.vamtam.com. They are licensed theme and iStock assets.
Replace every URL in `src/data/site.ts` and in the article frontmatter with your own images.
Also replace the placeholder contact details and social links in `site.ts`, and set `site` in `astro.config.mjs` to the real domain.
