import { ui, type Dictionary } from './ui';

export const languages = ['hy', 'en', 'ru'] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = 'hy';

export const languageLabels: Record<Language, string> = { hy: 'ՀԱՅ', en: 'EN', ru: 'РУС' };
export const locales: Record<Language, string> = { hy: 'hy-AM', en: 'en-US', ru: 'ru-RU' };
export const ogLocales: Record<Language, string> = { hy: 'hy_AM', en: 'en_US', ru: 'ru_RU' };

/** All UI text for a language. */
export const useTranslations = (lang: Language): Dictionary => ui[lang];

/** Replace {placeholders} in a string. */
export const fill = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));

/** URL param for the `[...lang]` route segment: Armenian lives at the root. */
export const langParam = (lang: Language) => (lang === defaultLanguage ? undefined : lang);

/** `getStaticPaths` helper: one page per language. */
export const languagePaths = () => languages.map((lang) => ({ params: { lang: langParam(lang) }, props: { lang } }));

/**
 * Prefix an unprefixed site path with the language.
 * '/' → '/en/', '/#about' → '/en/#about', '/articles' → '/en/articles'
 */
export function localizePath(path: string, lang: Language) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLanguage ? clean : `/${lang}${clean}`;
}

/** Remove a language prefix from a pathname. */
export const stripLanguage = (pathname: string) => pathname.replace(/^\/(en|ru)(?=\/|$)/, '') || '/';
