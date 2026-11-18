import { fetchAllArticles, fetchArticle, fetchArticlePage, type ApiArticle } from '@/lib/articles-api';
import { defaultLanguage, languages, locales, localizePath, type Language } from '@/i18n';

/** A published article from the API, with dates parsed. `content` is only set by getArticle(). */
export type Article = Omit<ApiArticle, 'publishedAt' | 'updatedAt'> & { publishedAt: Date; updatedAt: Date };

const toArticle = (a: ApiArticle): Article => ({ ...a, publishedAt: new Date(a.publishedAt), updatedAt: new Date(a.updatedAt) });

/** Articles are written in Armenian and have one page each, at /articles/<slug> (no language prefix). */
export const ARTICLE_LANG: Language = 'hy';

export const articleUrl = (a: Article) => localizePath(`/articles/${a.slug}`, ARTICLE_LANG);

/**
 * Language of a `[...lang]` route param ('en', 'ru', or undefined for Armenian at the root), or null
 * for anything else. On-demand pages use it to 404 unknown prefixes like /foo/articles.
 */
export function routeLanguage(param: string | undefined): Language | null {
  if (param === undefined) return defaultLanguage;
  return (languages as readonly string[]).includes(param) && param !== defaultLanguage ? (param as Language) : null;
}

/** One page of published articles, newest first, or null if the page is past the end. */
export async function getArticlePage(page: number, limit: number) {
  const data = await fetchArticlePage(page, limit);
  return data && { totalPages: data.totalPages, items: data.results.map(toArticle) };
}

/** The newest `n` articles for the home page and footer. Never throws: if the API is down the page still renders. */
export async function getLatestArticles(n: number): Promise<Article[]> {
  try {
    return (await getArticlePage(1, n))?.items ?? [];
  } catch (err) {
    console.error(`[articles] latest articles unavailable: ${(err as Error).message}`);
    return [];
  }
}

/** All published articles (without content), newest first. */
export const getArticles = async () => (await fetchAllArticles()).map(toArticle);

/** One published article with content, or null if it doesn't exist or isn't published. */
export async function getArticle(slug: string) {
  const a = await fetchArticle(slug);
  return a && toArticle(a);
}

export const formatDate = (d: Date, lang: Language) =>
  new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

/** Plain object shape used by React islands (e.g. the carousel). Dates are formatted for the page's language. */
export const toCard = (a: Article, lang: Language) => ({
  href: articleUrl(a),
  title: a.title,
  date: formatDate(a.publishedAt, lang),
  image: a.coverImage,
});

/** Rough reading time (~200 words per minute) from the article's HTML. */
export const readingMinutes = (html = '') => {
  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};
