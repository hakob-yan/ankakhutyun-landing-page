# Անկախության սերունդ

Article website built with **Astro 7** (server-side rendering on Node), **Tailwind CSS 4**, and **React 19** islands.
The design follows the Caridad "Children Aid" demo layout.

## Commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Dev server at http://localhost:4321               |
| `npm run build`   | Production build into `dist/`                     |
| `npm start`       | Run the built SSR server (`HOST`/`PORT` env vars) |
| `npx astro check` | Type-check `.astro`/`.ts`/`.tsx` files            |

## Structure

```
src/
  content/articles/*.md    ← articles (Markdown + frontmatter); file name = URL slug
  content.config.ts        ← article schema (title, description, date, category, image, author…)
  data/site.ts             ← navigation, page text, stats, events, FAQ, and ALL image URLs
  styles/global.css        ← Tailwind theme tokens (colors, fonts) and button/heading utilities
  layouts/BaseLayout.astro
  components/              ← Header, Footer, ArticleCard, PageHero
  components/home/         ← homepage sections (Hero, Support, GetInvolved, About, Programs, Events, …)
  components/react/        ← interactive islands (see below)
  pages/
    index.astro            ← homepage
    articles/index.astro   ← list page: ?category=…  ?q=…  ?page=…  (rendered on the server)
    articles/[slug].astro  ← single article page
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
Create `src/content/articles/my-article.md`:

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
Also replace the placeholder contact details and social links in `site.ts`.
