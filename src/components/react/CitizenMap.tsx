import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { MAP_HEIGHT as H, MAP_WIDTH as W, marzIds, marzShapes, type MarzId } from '@/data/armenia-map';

/** A village already projected to map coordinates, with its name in the page language. */
export type MapVillage = { name: string; x: number; y: number };

type Props = {
  villages: Record<MarzId, MapVillage[]>;
  labels: {
    mapLabel: string;
    marzesLabel: string;
    allArmenia: string;
    scrollHint: string;
    villagesSoon: string;
    marzes: Record<MarzId, string>;
  };
};

/** How much of the map a zoomed-in marz fills, and the largest allowed zoom. */
const FILL = 0.6;
const MAX_ZOOM = 5;
/** Opacity of the other marzes while one marz is zoomed in. */
const SIBLING_OPACITY = 0.8;
/** SVG mask and filter ids (there is one map per page). */
const MASK_ID = 'cmap-fade';
const SHADOW_ID = 'cmap-shadow';

/** The scroll story: the whole country first, then each marz. */
const states: (MarzId | null)[] = [null, ...marzIds];
/** How far to scroll (in % of the screen height) to move on to the next marz. */
const STEP_SVH = 40;

/**
 * Going from one marz to another, the map first zooms out just enough to show both of them (they fill PASS_FILL of
 * the box), then zooms into the new marz after PASS_MS. Neighbouring marzes barely zoom out; distant ones more.
 * (Panning straight between two zoomed-in marzes made the faded neighbours flicker.)
 * PASS_MS must be at least the zoom duration, 0.45s (.cmap-zoom in citizen-of-independence.astro).
 */
const PASS_FILL = 0.85;
const PASS_MS = 500;

/** What the map shows: the whole country (null), one marz zoomed in, or the way from one marz to another. */
type View = MarzId | null | { from: MarzId; to: MarzId };

/** translate + scale that fits a box [x, y, w, h] in the map, filling `fill` of it. */
function fitBox([x, y, w, h]: readonly number[], fill: number) {
  const s = Math.min((W / w) * fill, (H / h) * fill, MAX_ZOOM);
  return { s, tx: W / 2 - s * (x + w / 2), ty: H / 2 - s * (y + h / 2) };
}

/** translate + scale for a view (identity for the whole country). */
function zoomTo(view: View) {
  if (!view) return { s: 1, tx: 0, ty: 0 };
  if (typeof view === 'string') return fitBox(marzShapes[view].box, FILL);
  // both marzes: the union of their boxes
  const [ax, ay, aw, ah] = marzShapes[view.from].box;
  const [bx, by, bw, bh] = marzShapes[view.to].box;
  const x = Math.min(ax, bx);
  const y = Math.min(ay, by);
  return fitBox([x, y, Math.max(ax + aw, bx + bw) - x, Math.max(ay + ah, by + bh) - y], PASS_FILL);
}

/**
 * Armenia map for the "Citizen of Independence" page, told as a scroll story.
 * The map and the full marz list are pinned on screen (sticky) inside a tall track; scrolling through the track
 * moves the highlight down the list, marz by marz, and the map zooms to the active marz with its villages blinking.
 * Clicking a marz (in the list or on the map) scrolls to its place in the story.
 */
export default function CitizenMap({ villages, labels }: Props) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState<MarzId | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  /** Scroll geometry of the track: where it starts (page y, under the header) and how far it scrolls while pinned. */
  const geometry = () => {
    const track = trackRef.current!.getBoundingClientRect();
    const headerH = parseFloat(getComputedStyle(pinRef.current!).top) || 0;
    return { start: window.scrollY + track.top - headerH, range: track.height - (window.innerHeight - headerH) };
  };

  // follow the scroll: how far through the track we are picks the active state
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { start, range } = geometry();
      const progress = Math.min(Math.max((window.scrollY - start) / range, 0), 0.9999);
      setIndex(Math.floor(progress * states.length));
    };
    const onScroll = () => (frame ||= requestAnimationFrame(update));
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /** Scroll to the middle of a state's part of the track. */
  const goTo = (i: number) => {
    const { start, range } = geometry();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: start + ((i + 0.5) / states.length) * range, behavior: smooth ? 'smooth' : 'auto' });
  };

  const active = states[index];

  // the map follows `active`, but between two marzes it first zooms out to show both
  const [view, setView] = useState<View>(null);
  const viewRef = useRef<View>(null);
  viewRef.current = view;
  useEffect(() => {
    const cur = viewRef.current;
    // where we are coming from: the zoomed marz, or the marz we were on the way to
    const from = cur && (typeof cur === 'string' ? cur : cur.to);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!active || !from || from === active || reduceMotion) {
      setView(active);
      return;
    }
    setView({ from, to: active });
    const timer = window.setTimeout(() => setView(active), PASS_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  /** The marz the map is zoomed into (null for the whole country and on the way between marzes). */
  const zoomed = typeof view === 'string' ? view : null;
  /** The highlighted marz drawn on top: the zoomed one, or the one we are on the way to. */
  const focus = view && (typeof view === 'string' ? view : view.to);
  const { s, tx, ty } = zoomTo(view);
  const zoom = { transform: `translate(${tx}px, ${ty}px) scale(${s})` };

  // dots: the zoomed marz's villages, or every village when the whole country is shown (none on the way between marzes)
  const shown = zoomed ? villages[zoomed] : view ? [] : marzIds.flatMap((id) => villages[id]);
  const dots = shown.map((v) => ({ ...v, x: tx + s * v.x, y: ty + s * v.y }));

  const fill = (id: MarzId) => (id === active ? 'var(--color-accent)' : id === hovered ? 'var(--color-brand-dark)' : 'var(--color-sand)');

  return (
    // the track: one screen plus STEP_SVH of scrolling per state; everything inside stays pinned while it scrolls
    <div ref={trackRef} style={{ height: `calc(100svh + ${states.length * STEP_SVH}svh)` }}>
      <div
        ref={pinRef}
        className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center gap-4 lg:top-[4.5rem] lg:grid lg:h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-12"
      >
        {/* the map: no background, the marz shapes carry a soft shadow; overflow is clipped so a zoomed-in map stays in its box */}
        <div className="relative min-h-0 w-full overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={labels.mapLabel} className="cmap-map block h-auto w-full">
            <defs>
              {/* zoomed in: the neighbouring marzes fade out towards the edges of the box (white = visible, black = hidden) */}
              <radialGradient id={`${MASK_ID}-g`} cx="0.5" cy="0.5" r="0.7">
                <stop offset="0.45" stopColor="white" />
                <stop offset="0.72" stopColor="black" />
              </radialGradient>
              {/* soft shadow under the full map and under the active marz (not under the faded neighbours) */}
              <filter id={SHADOW_ID} x="-10%" y="-10%" width="120%" height="125%">
                <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#33261d" floodOpacity="0.16" />
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#33261d" floodOpacity="0.1" />
              </filter>
              <mask id={MASK_ID} maskUnits="userSpaceOnUse" x={-W * 0.2} y={-H * 0.2} width={W * 1.4} height={H * 1.4}>
                <rect width={W} height={H} fill={`url(#${MASK_ID}-g)`} />
                {/* whole country: this white layer covers the fade, so nothing is masked; it fades away when zooming in */}
                <rect
                  x={-W * 0.2}
                  y={-H * 0.2}
                  width={W * 1.4}
                  height={H * 1.4}
                  fill="white"
                  className="cmap-mask-full"
                  opacity={focus ? 0 : 1}
                />
              </mask>
            </defs>

            {/* every shape; when zoomed in they are faded and masked, and the active marz is drawn again on top */}
            <g mask={`url(#${MASK_ID})`}>
              <g filter={focus ? undefined : `url(#${SHADOW_ID})`}>
                <g className="cmap-zoom" style={zoom}>
                  {/* Yerevan: a city, not a marz; shown for context only */}
                  <path d={marzShapes.ER.d} className="cmap-shape" fill="var(--color-brand-soft)" opacity={focus ? SIBLING_OPACITY : 1} />
                  {marzIds.map((id, i) => (
                    <path
                      key={id}
                      d={marzShapes[id].d}
                      className="cmap-shape cursor-pointer"
                      fill={fill(id)}
                      opacity={focus && id !== focus ? SIBLING_OPACITY : 1}
                      onClick={() => goTo(i + 1)}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <title>{labels.marzes[id]}</title>
                    </path>
                  ))}
                </g>
              </g>
            </g>

            {/* the active marz, unmasked so it never fades at the edges; the group stays mounted so its zoom animates in step */}
            <g filter={`url(#${SHADOW_ID})`}>
              <g className="cmap-zoom" style={zoom}>
                {focus && (
                  <path d={marzShapes[focus].d} className="cmap-shape" fill={fill(focus)}>
                    <title>{labels.marzes[focus]}</title>
                  </path>
                )}
              </g>
            </g>

            {/* village dots sit outside the zoomed group so they keep their size; re-keyed to replay the fade-in */}
            <g key={zoomed ?? (view ? 'pass' : 'all')} className="cmap-dots" aria-hidden="true">
              {dots.map((v, i) => (
                <g key={`${v.name}-${i}`} transform={`translate(${v.x} ${v.y})`} style={{ ['--i' as string]: i }}>
                  <circle className="cmap-pulse" r={zoomed ? 9 : 6} />
                  <circle className="cmap-dot" r={zoomed ? 9 : 6} />
                  {zoomed && (
                    <text className="cmap-label" x={16} y={8}>
                      {v.name}
                    </text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* all marzes at once; the highlight follows the scroll */}
        <div>
          <nav aria-label={labels.marzesLabel}>
            <ol className="cmap-list">
              {states.map((id, i) => (
                <li key={id ?? 'all'}>
                  <button
                    type="button"
                    aria-current={i === index ? 'step' : undefined}
                    onClick={() => goTo(i)}
                    className={`cmap-item ${i === index ? 'is-active' : i < index ? 'is-done' : ''}`}
                  >
                    <span className="cmap-item-dot" aria-hidden="true" />
                    <span>{id ? labels.marzes[id] : labels.allArmenia}</span>
                    {id && villages[id].length > 0 && <span className="cmap-count">{villages[id].length}</span>}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* the active marz's villages (also the text version of the dots, which are hidden from screen readers) */}
          <div className="mt-4 min-h-14 lg:mt-6" aria-live="polite">
            {active === null ? (
              <p className="flex items-center gap-2 text-sm text-ink/60">
                <ArrowDown className="cmap-hint size-4 shrink-0" aria-hidden="true" />
                {labels.scrollHint}
              </p>
            ) : villages[active].length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {villages[active].map((v) => (
                  <li key={v.name} className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1 text-sm font-medium">
                    <span className="size-2 rounded-full bg-ink" aria-hidden="true" />
                    {v.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink/60">{labels.villagesSoon}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
