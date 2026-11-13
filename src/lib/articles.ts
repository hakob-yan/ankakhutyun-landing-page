import { getCollection, type CollectionEntry } from 'astro:content';
import { categoryLabel } from '@/data/site';
import { locales, localizePath, type Language } from '@/i18n';

export type Article = CollectionEntry<'articles'>;

/** Articles live in src/content/articles/<lang>/<slug>.md, so the id is "<lang>/<slug>". */
export const articleLang = (a: Article) => a.id.split('/')[0] as Language;
export const articleSlug = (a: Article) => a.id.split('/').slice(1).join('/');

/** Published articles in one language, newest first. */
export async function getArticles(lang: Language): Promise<Article[]> {
  const all = await getCollection('articles', ({ id, data }) => !data.draft && id.startsWith(`${lang}/`));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (d: Date, lang: Language) =>
  new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

export const articleUrl = (a: Article) => localizePath(`/articles/${articleSlug(a)}`, articleLang(a));

/** Plain object shape used by React islands (e.g. the carousel). */
export const toCard = (a: Article) => ({
  href: articleUrl(a),
  title: a.data.title,
  date: formatDate(a.data.date, articleLang(a)),
  category: categoryLabel(a.data.category, articleLang(a)),
  image: a.data.image,
});

/** Rough reading time (~200 words per minute). */
export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 200));
