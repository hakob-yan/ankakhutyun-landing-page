/**
 * Site-wide data that is not language-specific (images, navigation, stats). Contacts live in src/data/contacts.ts.
 * Translated text lives in src/i18n/ui.ts.
 *
 * IMAGES: for now every image is loaded from the reference demo site
 * (caridad.vamtam.com). These are licensed theme/stock (iStock) assets.
 * Replace each URL with your own photo before the site goes public.
 */
import { localizePath, useTranslations, type Language } from '@/i18n';

const REF = 'https://caridad.vamtam.com/wp-content/uploads';

export const images = {
  // decorative shapes / doodles
  headerBg: `${REF}/2021/04/Group-header-1-1.svg`,
  kid: `${REF}/2021/04/kid.svg`,
  sun: `${REF}/2021/04/sun-1.svg`,
  shape: `${REF}/2021/03/shape-01.svg`,
  dots: `${REF}/2021/04/Group-35.svg`,
  sunCard: `${REF}/2021/04/sun-vs.svg`,
  appleCard: `${REF}/2021/04/apple-vs-02.svg`,

  // photos
  hero: `${REF}/2021/04/iStock-501227330-2.jpg`,
  help: `${REF}/2021/04/iStock-924659944.jpg`,
  involved1: `${REF}/2021/04/iStock-626891352.jpg`,
  involved2: `${REF}/2021/04/iStock-1286721700.jpg`,
  involved3: `${REF}/2021/04/iStock-499888635.jpg`,
  about: `${REF}/2021/04/iStock-175188027.jpg`,
  card1: `${REF}/2021/04/iStock-463374569.jpg`,
  card4: `${REF}/2021/04/iStock-493698580.jpg`,
  events: `${REF}/2021/04/iStock-1172438359.jpg`,

  // partner logos
  partners: [
    `${REF}/2021/04/scuola-1.svg`,
    `${REF}/2021/04/envato-1.svg`,
    `${REF}/2021/04/salute.svg`,
    `${REF}/2021/04/Skole.svg`,
  ],
} as const;

export const categorySlugs = ['history', 'education', 'culture', 'society'] as const;
type CategorySlug = (typeof categorySlugs)[number];

export const categoryLabel = (slug: string, lang: Language) =>
  useTranslations(lang).categories[slug as CategorySlug] ?? slug;

/** /articles, /articles/category/history, /articles/page/2 … (localized) */
export function articlesPath(lang: Language, category?: string, page = 1) {
  const parts = ['/articles', category && `category/${category}`, page > 1 && `page/${page}`].filter(Boolean);
  return localizePath(parts.join('/'), lang);
}

export type NavItem = { label: string; href: string; children?: NavItem[] };

export function getNav(lang: Language): NavItem[] {
  const t = useTranslations(lang).nav;
  const p = (path: string) => localizePath(path, lang);
  return [
    { label: t.home, href: p('/') },
    {
      label: t.about,
      href: p('/#about'),
      children: [
        { label: t.mission, href: p('/#about') },
        { label: t.whatWeDo, href: p('/#programs') },
        { label: t.faq, href: p('/#faq') },
        { label: t.partners, href: p('/#partners') },
      ],
    },
    {
      label: t.articles,
      href: articlesPath(lang),
      children: [
        { label: t.allArticles, href: articlesPath(lang) },
        ...categorySlugs.map((slug) => ({ label: categoryLabel(slug, lang), href: articlesPath(lang, slug) })),
      ],
    },
    { label: t.events, href: p('/#events') },
    {
      label: t.join,
      href: p('/#get-involved'),
      children: [
        { label: t.volunteer, href: p('/#get-involved') },
        { label: t.support, href: p('/#support') },
        { label: t.contact, href: p('/#contact') },
      ],
    },
  ];
}

export const stats = [
  { value: 1991, suffix: '' },
  { value: 350, suffix: '+' },
  { value: 12000, suffix: '+' },
];

/** Card visuals for the "How we help" section; text comes from ui.programs.items (same order). */
export const programCards = [
  { category: 'history', image: images.card1, variant: 'photo' as const },
  { category: 'education', image: images.sunCard, variant: 'doodle' as const },
  { category: 'culture', image: images.appleCard, variant: 'doodle' as const },
  { category: 'society', image: images.card4, variant: 'photo' as const },
];
