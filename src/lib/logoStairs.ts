/**
 * The three stair shapes of the logo (public/logo_yellow_bg.svg), read at build time.
 * Used by the stair animations (StairsSpinner.astro, the floating donate button), so
 * changing the logo file updates them too. All coordinates are in the logo's 336×336 viewBox.
 */
import logo from '../../public/logo_yellow_bg.svg?raw';

/** Each stair: <path d="…" transform="translate(x,y)"/>. */
export const stairs = [...logo.matchAll(/<path\s+d="([^"]+)"[^>]*?transform="([^"]+)"/g)].map(([, d, transform]) => ({
  d,
  transform,
}));

/** Transform of the group that scales the stairs to 75% around the center. */
export const stairsGroupTransform = logo.match(/<g\s+transform="([^"]+)"/)?.[1];

/** Center of the logo; the stairs spin around this point. */
export const LOGO_CENTER = 168;
