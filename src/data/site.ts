/**
 * Site-wide data that is not language-specific (images, navigation). Contacts live in src/data/contacts.ts.
 * Translated text lives in src/i18n/ui.ts.
 *
 * IMAGES: for now every image is loaded from the reference demo site
 * (caridad.vamtam.com). These are licensed theme/stock (iStock) assets.
 * Replace each URL with your own photo before the site goes public.
 */
import { localizePath, useTranslations, type Language } from '@/i18n';
import { VOLUNTEER_FORM_URL } from '@/data/contacts';
import hero1 from '@/assets/hero/01-first-pic.jpg';
import hero2 from '@/assets/hero/02-second-pic.jpg';
import hero3 from '@/assets/hero/03-third-pic.jpg';
import hero4 from '@/assets/hero/04-fourth-pic.jpg';
import hero5 from '@/assets/hero/05-fifth-pic.jpg';
import donate from '@/assets/donate/Donate.webp';

/** Home hero slider photos (own photos, optimized at build time). Alt texts: ui.hero.slides (same order). */
export const heroSlides = [hero1, hero2, hero3, hero4, hero5];

/** /donation page photo (own photo, optimized at build time). */
export const donateImage = donate;

const REF = 'https://caridad.vamtam.com/wp-content/uploads';

export const images = {
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

/** /blog, /blog/page/2 … (localized). There is one list of all posts, no category filters. */
export function blogPath(lang: Language, page = 1) {
  const parts = ['/blog', page > 1 && `page/${page}`].filter(Boolean);
  return localizePath(parts.join('/'), lang);
}

/** `external`: opens in a new tab (links to other websites, e.g. the volunteer form). */
export type NavItem = { label: string; href: string; external?: boolean; children?: NavItem[] };

/** Extra <a> attributes for links that leave the site. */
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function getNav(lang: Language): NavItem[] {
  const t = useTranslations(lang).nav;
  const p = (path: string) => localizePath(path, lang);
  return [
    {
      label: t.about,
      href: p('/team'),
      children: [
        { label: t.team, href: p('/team') },
        { label: t.board, href: p('/board') },
      ],
    },
    {
      label: t.programs,
      href: p('/power-of-independence'),
      children: [
        { label: t.power, href: p('/power-of-independence') },
        { label: t.podcast, href: p('/podcast') },
      ],
    },
    {
      label: t.resources,
      href: blogPath(lang),
      children: [
        { label: t.blog, href: blogPath(lang) },
        { label: t.annualReports, href: p('/annual-report') },
        { label: t.faq, href: p('/#faq') },
      ],
    },
    {
      label: t.join,
      href: p('/donation'),
      children: [
        { label: t.donate, href: p('/donation') },
        { label: t.volunteer, href: VOLUNTEER_FORM_URL, external: true },
        { label: t.contact, href: p('/#contact') },
      ],
    },
  ];
}

