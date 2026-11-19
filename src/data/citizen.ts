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

export type Village = { name: Record<Language, string>; lat: number; lon: number };

export const villages: Record<MarzId, Village[]> = {
  AG: [],
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
