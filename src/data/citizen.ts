/**
 * "Citizen of Independence": the villages we visit, per marz.
 * Each village needs its name in every language and its coordinates (WGS84 decimal degrees, e.g. from Google Maps:
 * right-click the village → the first number is `lat`, the second `lon`).
 * Marz names are translated in src/i18n/ui.ts (citizen.marzes).
 *
 * Example:
 *   LO: [{ name: { hy: 'Օձուն', en: 'Odzun', ru: 'Одзун' }, lat: 41.0519, lon: 44.6175 }],
 */
import type { Language } from '@/i18n';
import type { MarzId } from '@/data/armenia-map';

/** `label`: which side of the dot the name goes on (default right); use it when names of close villages overlap. */
export type Village = { name: Record<Language, string>; lat: number; lon: number; label?: 'left' | 'right' };

export const villages: Record<MarzId, Village[]> = {
  // coordinates: OpenStreetMap
  AG: [
    { name: { hy: 'Ծաղկահովիտ', en: 'Tsaghkahovit', ru: 'Цахкаовит' }, lat: 40.6389, lon: 44.2225 },
    { name: { hy: 'Արագած', en: 'Aragats', ru: 'Арагац' }, lat: 40.4878, lon: 44.357, label: 'left' },
    { name: { hy: 'Շենավան', en: 'Shenavan', ru: 'Шенаван' }, lat: 40.4829, lon: 44.3848 },
    { name: { hy: 'Բյուրական', en: 'Byurakan', ru: 'Бюракан' }, lat: 40.3387, lon: 44.2689, label: 'left' },
    { name: { hy: 'Քուչակ', en: 'Kuchak', ru: 'Кучак' }, lat: 40.5172, lon: 44.3906 },
    { name: { hy: 'Կարբի', en: 'Karbi', ru: 'Карби' }, lat: 40.33, lon: 44.3764 },
  ],
  AR: [],
  AV: [],
  GR: [],
  KT: [],
  LO: [],
  SH: [],
  SU: [],
  TV: [],
  VD: [],
};
