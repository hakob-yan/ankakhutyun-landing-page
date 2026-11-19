import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { lakeSevan, MAP_HEIGHT as H, MAP_WIDTH as W, marzIds, marzShapes, type MarzId } from '@/data/armenia-map';

/** A village already projected to map coordinates, with its name in the page language. */
export type MapVillage = { name: string; x: number; y: number; label: 'left' | 'right' };

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
/**
 * Opacity of the other marzes while one marz is zoomed in: 0 hides them.
 * Above 0 (e.g. 0.8) they stay visible, faded towards the edges of the box by the mask below.
 */
const SIBLING_OPACITY = 0.8;
/** SVG mask and filter ids (there is one map per page). */
const MASK_ID = 'cmap-fade';
const SHADOW_ID = 'cmap-shadow';

/** The scroll story: the whole country first, then each marz. */
const states: (MarzId | null)[] = [null, ...marzIds];
/** Length of each state's part of the track (in % of the screen height); scrollbar dragging moves this far per marz. */
const STEP_SVH = 40;
/**
 * Gestures while the map is pinned: one wheel flick, swipe or key press moves exactly one marz.
 * Wheel: after a step, wheel events are swallowed for STEP_LOCK_MS (about one zoom). After that a new step needs a new
 * intent: a fresh gesture (no wheel events for GESTURE_GAP_MS) or the wheel speeding up again. A trackpad's momentum
 * only slows down, so it never counts as a new flick, while a new flick during the momentum does.
 * A step needs WHEEL_MIN px of wheel movement; a swipe needs SWIPE_MIN px.
 */
const WHEEL_MIN = 25;
const STEP_LOCK_MS = 500;
const GESTURE_GAP_MS = 150;
const SWIPE_MIN = 40;

/**
 * Going from one marz to another, the map first zooms out just enough to show both of them (they fill PASS_FILL of
 * the box), then zooms into the new marz after PASS_MS. Neighbouring marzes barely zoom out; distant ones more.
 * (Panning straight between two zoomed-in marzes made the faded neighbours flicker.)
 * PASS_MS must be at least the zoom duration, 0.45s (.cmap-zoom in citizen-of-independence.astro).
 */
const PASS_FILL = 0.85;
const PASS_MS = 500;
/** Duration of one zoom (.cmap-zoom in citizen-of-independence.astro): the new marz lights up once it has arrived. */
const ZOOM_MS = 450;

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
 * The map and the full marz list are pinned on screen (sticky) inside a tall track; the scroll position in the track
 * picks the active marz, and the map zooms to it with its villages blinking.
 * While pinned, each wheel flick / swipe / arrow key steps exactly one marz (at the first and last one the page scrolls on).
 * Clicking a marz (in the list or on the map) jumps to it; clicking the active marz again goes back to the whole country.
 */
export default function CitizenMap({ villages, labels }: Props) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;
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
      const progress = Math.min(Math.max((window.scrollY - start) / range, 0), 1);
      setIndex(Math.round(progress * (states.length - 1)));
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

  /**
   * Jump to a state's place in the track: the first state at its start, the last at its end (so leaving the story
   * at either end moves the page at once). The jump is instant on purpose: the map and the list are pinned, so it
   * looks the same, and a smooth scroll would pass through (and animate) every marz in between.
   */
  const goTo = (i: number) => {
    const { start, range } = geometry();
    window.scrollTo({ top: start + (i / (states.length - 1)) * range, behavior: 'instant' });
  };

  // gestures: step one marz at a time while the map is pinned
  useEffect(() => {
    const last = states.length - 1;
    /** Is the map pinned (or about to be: at the top of the page it sits a few px before its pinned position)? */
    const pinned = () => {
      const { start, range } = geometry();
      return window.scrollY >= start - 40 && window.scrollY <= start + range + 1;
    };
    /** Is there a state in this direction? (no: the page scrolls on, out of the story) */
    const canStep = (dir: number) => dir !== 0 && indexRef.current + dir >= 0 && indexRef.current + dir <= last;
    const step = (dir: number) => {
      indexRef.current += dir;
      goTo(indexRef.current);
    };

    // wheel / trackpad: one flick = one step
    let lastStep = -Infinity; // time of the last step
    let lastEvent = -Infinity; // time of the previous wheel event
    let armed = true; // a new intent was seen: the next WHEEL_MIN px make a step
    let sum = 0;
    const recent: number[] = []; // sizes of the last few wheel events, to tell a new flick from momentum
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch zoom
      const now = performance.now();
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const size = Math.abs(dy);
      const fresh = now - lastEvent > GESTURE_GAP_MS;
      const average = recent.length ? recent.reduce((a, b) => a + b, 0) / recent.length : 0;
      lastEvent = now;
      recent.push(size);
      if (recent.length > 4) recent.shift();

      const locked = now - lastStep < STEP_LOCK_MS;
      if (!locked && (!pinned() || !canStep(Math.sign(dy)))) return; // outside the story or at its ends: the page scrolls
      e.preventDefault();
      if (locked) return; // the step's own momentum
      // a new intent: a fresh gesture, the wheel speeding up (a new flick during momentum), or mouse-wheel notches
      // (large and not shrinking; momentum always shrinks)
      if (fresh || size > average * 1.5 + 2 || (size >= 40 && size >= average)) armed = true;
      if (!armed) return; // still momentum
      sum = Math.sign(sum) === Math.sign(dy) ? sum + dy : dy;
      if (Math.abs(sum) >= WHEEL_MIN) {
        step(Math.sign(sum));
        lastStep = now;
        armed = false;
        sum = 0;
      }
    };

    // touch: one swipe = one step (the direction is decided on the first move, so the ends can still scroll natively)
    let touchY = 0;
    let swipe = 0;
    let mode: 'native' | 'pending' | 'step' = 'native';
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      swipe = 0;
      mode = e.touches.length === 1 && pinned() ? 'pending' : 'native';
    };
    const onTouchMove = (e: TouchEvent) => {
      if (mode === 'native') return;
      swipe = touchY - e.touches[0].clientY; // > 0: swiping up = next marz
      if (mode === 'pending' && swipe !== 0) mode = canStep(Math.sign(swipe)) ? 'step' : 'native';
      if (mode !== 'native' && e.cancelable) e.preventDefault();
    };
    const onTouchEnd = () => {
      if (mode === 'step' && Math.abs(swipe) >= SWIPE_MIN) step(Math.sign(swipe));
      mode = 'native';
    };

    // keyboard (not while typing in a field)
    const keys: Record<string, number> = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 };
    const onKey = (e: KeyboardEvent) => {
      const dir = keys[e.key];
      const target = e.target as HTMLElement;
      if (!dir || e.altKey || e.ctrlKey || e.metaKey || target.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === ' ' && (e.shiftKey || target.closest('button, a'))) return; // space presses buttons
      if (!pinned() || !canStep(dir)) return;
      e.preventDefault();
      step(dir);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const active = states[index];
  /** Click on a marz: go to it, or back to the whole country if it is already the active one. */
  const toggle = (i: number) => goTo(i === index ? 0 : i);

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
  /** The marz drawn on top, unfaded: the zoomed one, or (on the way) the one we are leaving. */
  const focus = view && (typeof view === 'string' ? view : view.from);

  // the amber highlight: the marz we are leaving keeps it while zooming out; the new marz gets it only once the
  // zoom into it has finished (nothing is lit while zooming in)
  const [lit, setLit] = useState<MarzId | null>(null);
  useEffect(() => {
    if (!view) return setLit(null);
    if (typeof view !== 'string') return setLit(view.from);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setLit(view);
    setLit(null);
    const timer = window.setTimeout(() => setLit(view), ZOOM_MS);
    return () => window.clearTimeout(timer);
  }, [view]);
  const { s, tx, ty } = zoomTo(view);
  const zoom = { transform: `translate(${tx}px, ${ty}px) scale(${s})` };

  // dots: the zoomed marz's villages, or every village when the whole country is shown (none on the way between marzes)
  const shown = zoomed ? villages[zoomed] : view ? [] : marzIds.flatMap((id) => villages[id]);
  const dots = shown.map((v) => ({ ...v, x: tx + s * v.x, y: ty + s * v.y }));

  const fill = (id: MarzId) => (id === lit ? 'var(--color-accent)' : id === hovered ? 'var(--color-brand-dark)' : 'var(--color-sand)');

  /** What opens under a state: the scroll hint (whole country), the marz's villages, or "villages soon". */
  const details = (id: MarzId | null) =>
    id === null ? (
      <p className="flex items-center gap-2 text-sm text-ink/60">
        <ArrowDown className="cmap-hint size-4 shrink-0" aria-hidden="true" />
        {labels.scrollHint}
      </p>
    ) : villages[id].length > 0 ? (
      <ul className="flex flex-wrap gap-1.5">
        {villages[id].map((v) => (
          <li key={v.name} className="inline-flex items-center gap-1.5 rounded-full bg-sand px-2.5 py-0.5 text-sm font-medium">
            <span className="cmap-chip-dot" aria-hidden="true" />
            {v.name}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-ink/60">{labels.villagesSoon}</p>
    );

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
                      pointerEvents={focus && id !== focus && !SIBLING_OPACITY ? 'none' : undefined}
                      onClick={() => toggle(i + 1)}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <title>{labels.marzes[id]}</title>
                    </path>
                  ))}
                  {/* Lake Sevan, over Gegharkunik (clicks pass through to it) */}
                  <path d={lakeSevan} className="cmap-lake" opacity={focus && focus !== 'GR' ? SIBLING_OPACITY : 1} />
                </g>
              </g>
            </g>

            {/* the active marz, unmasked so it never fades at the edges; the group stays mounted so its zoom animates in step */}
            <g filter={`url(#${SHADOW_ID})`}>
              <g className="cmap-zoom" style={zoom}>
                {focus && (
                  <path
                    d={marzShapes[focus].d}
                    className="cmap-shape cursor-pointer"
                    fill={fill(focus)}
                    onClick={() => toggle(states.indexOf(focus))}
                  >
                    <title>{labels.marzes[focus]}</title>
                  </path>
                )}
                {focus === 'GR' && <path d={lakeSevan} className="cmap-lake" />}
              </g>
            </g>

            {/* village dots sit outside the zoomed group so they keep their size; re-keyed to replay the fade-in.
                Whole country: small grey dots. Zoomed into a marz: blinking blue dots with names. */}
            <g key={zoomed ?? (view ? 'pass' : 'all')} className={`cmap-dots ${zoomed ? 'is-zoomed' : ''}`} aria-hidden="true">
              {dots.map((v, i) => (
                <g key={`${v.name}-${i}`} transform={`translate(${v.x} ${v.y})`} style={{ ['--i' as string]: i }}>
                  {zoomed && <circle className="cmap-pulse" r={9} />}
                  <circle className="cmap-dot" r={zoomed ? 9 : 5} />
                  {zoomed && (
                    <text className="cmap-label" x={v.label === 'left' ? -16 : 16} y={8} textAnchor={v.label === 'left' ? 'end' : 'start'}>
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
                    aria-expanded={i === index}
                    onClick={() => toggle(i)}
                    className={`cmap-item ${i === index ? 'is-active' : i < index ? 'is-done' : ''}`}
                  >
                    <span className="cmap-item-dot" aria-hidden="true" />
                    <span>{id ? labels.marzes[id] : labels.allArmenia}</span>
                    {id && villages[id].length > 0 && <span className="cmap-count">{villages[id].length}</span>}
                  </button>
                  {/* desktop: the active row opens like an accordion and lists its villages */}
                  <div className={`cmap-panel ${i === index ? 'is-open' : ''}`} aria-hidden={i !== index}>
                    <div>{details(id)}</div>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* phones: the list is a set of chips, so the active marz's villages go under it instead */}
          <div className="mt-4 min-h-14 lg:hidden" aria-live="polite">
            {details(active)}
          </div>
        </div>
      </div>
    </div>
  );
}
