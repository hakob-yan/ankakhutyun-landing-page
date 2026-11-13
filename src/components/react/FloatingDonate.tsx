import { useEffect, useLayoutEffect, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimate,
  usePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { Heart } from 'lucide-react';

type Props = { label: string; href: string };

/** Same threshold as the header's white background (Header.astro), so both happen together. */
const SHOW_AFTER = 20;
/** The navbar donate button the floating one "takes off" from. */
const HEADER_BUTTON = '#header-donate';
/** The take-off flight plays only once per page visit; after that the button just pops in/out. */
let hasFlown = false;


/**
 * Floating "Donate" button. On the first scroll (when the navbar turns white), a copy of the navbar's
 * donate button is carried by a butterfly down to the bottom-right corner. Later it just pops in/out.
 * Built with Motion.
 */
export default function FloatingDonate({ label, href }: Props) {
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setScrolledEnough(window.scrollY > SHOW_AFTER);
    return scrollY.on('change', (y) => setScrolledEnough(y > SHOW_AFTER));
  }, [scrollY]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {scrolledEnough && <FlyingButton label={label} href={href} />}
      </AnimatePresence>
    </MotionConfig>
  );
}

/** Offset (and scale) that puts `el` exactly over the navbar button, or null if that button isn't visible (mobile). */
function offsetToHeaderButton(el: HTMLElement) {
  const header = document.querySelector<HTMLElement>(HEADER_BUTTON);
  const h = header?.getBoundingClientRect();
  if (!h || h.width === 0) return null;
  const f = el.getBoundingClientRect();
  return {
    x: h.left + h.width / 2 - (f.left + f.width / 2),
    y: h.top + h.height / 2 - (f.top + f.height / 2),
    scale: h.height / f.height,
  };
}

function FlyingButton({ label, href }: Props) {
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isPresent, safeToRemove] = usePresence();
  const [flying, setFlying] = useState(true);

  // "goes with the user": lags behind the scroll a little and springs back
  const { scrollY } = useScroll();
  const lag = useSpring(useTransform(useVelocity(scrollY), [-2500, 0, 2500], [-18, 0, 18], { clamp: true }), {
    stiffness: 260,
    damping: 18,
  });

  // ARRIVE: take off from the navbar button and swoop down to the corner
  useLayoutEffect(() => {
    const el = scope.current;
    const from = !hasFlown && !reduceMotion && offsetToHeaderButton(el);
    hasFlown = true;
    if (!from) {
      // already flown once, mobile (no navbar button) or reduced motion: simple pop-in
      animate(el, { opacity: [0, 1], y: [80, 0], scale: [0.6, 1] }, { type: 'spring', stiffness: 300, damping: 22 });
      setFlying(false);
      return;
    }
    // different easing on x and y draws a curved flight path instead of a straight line
    animate(
      el,
      { opacity: [1, 1], x: [from.x, 0], y: [from.y, 0], scale: [from.scale, 1.12, 1], rotate: [0, -8, 6, 0] },
      { duration: 1.3, x: { duration: 1.3, ease: 'easeOut' }, y: { duration: 1.3, ease: [0.6, 0, 0.9, 0.6] } },
    ).then(() => setFlying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LEAVE: slide down out of view
  useEffect(() => {
    if (isPresent) return;
    animate(scope.current, { opacity: 0, y: 80, scale: 0.6 }, { duration: 0.35, ease: 'easeIn' }).then(() => safeToRemove?.());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  return (
    <div ref={scope} style={{ opacity: 0 }} className="fixed right-4 bottom-4 z-30 sm:right-8 sm:bottom-8">
      <motion.div style={{ y: reduceMotion ? 0 : lag }} className="relative">
        {/* attention pulse ring (only once it has landed) */}
        {!flying && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
            transition={{ duration: 1.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 2.4 }}
          />
        )}

        <motion.a
          href={href}
          className="relative inline-flex items-center gap-2 rounded-full border-2 border-accent bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink shadow-xl shadow-accent/30 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <motion.span
            aria-hidden
            className="inline-flex"
            animate={{ scale: [1, 1.25, 1, 1.18, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.6 }}
          >
            <Heart className="size-4 fill-current" />
          </motion.span>
          {label}
        </motion.a>

        {!reduceMotion && <Butterfly carrying={flying} />}
      </motion.div>
    </div>
  );
}

/**
 * Small butterfly. While `carrying`, it holds on to the top of the button and flaps hard;
 * afterwards it flies loops around the button and lands on it for a moment.
 * Coordinates are relative to the button's top-left corner.
 */
function Butterfly({ carrying }: { carrying: boolean }) {
  const loop = {
    x: [10, -30, -70, -50, 0, 40, 70, 40, 10, 10],
    y: [-14, -60, -40, -95, -120, -85, -40, -30, -14, -14],
    rotate: [0, -25, -10, 15, 5, 25, 10, -10, 0, 0],
  };
  const flap = { duration: carrying ? 0.14 : 0.28, repeat: Infinity, ease: 'easeInOut' } as const;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 -ml-5 size-10"
      initial={false}
      animate={carrying ? { x: 0, y: -30, rotate: 0 } : loop}
      transition={
        carrying
          ? { type: 'spring', stiffness: 300, damping: 20 }
          : { duration: 7, ease: 'easeInOut', repeat: Infinity, times: [0, 0.1, 0.2, 0.32, 0.44, 0.56, 0.68, 0.8, 0.9, 1] }
      }
    >
      <svg viewBox="0 0 32 32" className="size-full drop-shadow-sm">
        {/* left wings */}
        <motion.g style={{ originX: '16px', originY: '16px' }} animate={{ scaleX: [1, 0.25, 1] }} transition={flap}>
          <path d="M16 15 C 10 3, 1 4, 3 12 C 4 16, 10 17, 16 15 Z" fill="#ff6700" />
          <path d="M16 17 C 9 18, 4 24, 8 28 C 12 30, 15 24, 16 17 Z" fill="#ff9340" />
          <circle cx="8" cy="10" r="1.6" fill="#fff0e8" />
        </motion.g>
        {/* right wings */}
        <motion.g style={{ originX: '16px', originY: '16px' }} animate={{ scaleX: [1, 0.25, 1] }} transition={flap}>
          <path d="M16 15 C 22 3, 31 4, 29 12 C 28 16, 22 17, 16 15 Z" fill="#ff6700" />
          <path d="M16 17 C 23 18, 28 24, 24 28 C 20 30, 17 24, 16 17 Z" fill="#ff9340" />
          <circle cx="24" cy="10" r="1.6" fill="#fff0e8" />
        </motion.g>
        {/* body + antennae */}
        <rect x="15" y="9" width="2" height="15" rx="1" fill="#33261d" />
        <path d="M16 10 C 15 6, 13 4, 11.5 3 M16 10 C 17 6, 19 4, 20.5 3" stroke="#33261d" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
