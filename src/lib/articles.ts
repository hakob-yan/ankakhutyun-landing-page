import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, localizePath, type Language } from '@/i18n';

export type Article = CollectionEntry<'articles'>;

/** Articles are written in Armenian and have one page each, at /articles/<slug> (no language prefix). */
export const ARTICLE_LANG: Language = 'hy';

export const articleSlug = (a: Article) => a.id;
export const articleUrl = (a: Article) => localizePath(`/articles/${a.id}`, ARTICLE_LANG);

/** All published articles, newest first. Shared by every language's list pages. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles');
  return all.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export const formatDate = (d: Date, lang: Language) =>
  new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

/** Plain object shape used by React islands (e.g. the carousel). Dates are formatted for the page's language. */
export const toCard = (a: Article, lang: Language) => ({
  href: articleUrl(a),
  title: a.data.title,
  date: formatDate(a.data.publishedAt, lang),
  image: a.data.coverImage,
});

/** Rough reading time (~200 words per minute) from the article's HTML. */
export const readingMinutes = (html = '') => {
  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};
