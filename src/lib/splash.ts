/** When the intro logo (SplashLogo.astro) has finished, in seconds since the page started loading. */
export const SPLASH_END = 1.8;

/**
 * Seconds left until the intro logo finishes, or 0 if it isn't playing on this page load
 * (no hero on the page, an internal page-to-page click, or reduced motion).
 * Hero content waits this long before animating in.
 */
export function splashDelay(): number {
  if (typeof window === 'undefined') return 0;
  if (!document.querySelector('.splash')) return 0;
  if (document.documentElement.classList.contains('splash-seen')) return 0;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  return Math.max(0, SPLASH_END - performance.now() / 1000);
}
