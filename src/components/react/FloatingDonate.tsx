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
import { splashDelay } from '@/lib/splash';

type Props = { label: string; href: string };

/** Same threshold as the header's white background (Header.astro), so both happen together. */
const SHOW_AFTER = 20;
/** The navbar donate button the floating one "takes off" from. */
const HEADER_BUTTON = '#header-donate';
/** The take-off flight plays only once per page visit; after that the button just pops in/out. */
let hasFlown = false;


/**
 * Floating "Donate" button. On the first scroll (when the navbar turns white), the navbar's donate
 * button flies down to the bottom-right corner. Later it just pops in/out.
 * Built with Motion.
 */
export default function FloatingDonate({ label, href }: Props) {
  const [scrolledEnough, setScrolledEnough] = useState(false);
  // stay hidden while the intro logo (SplashLogo.astro) plays
  const [splashDone, setSplashDone] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const id = setTimeout(() => setSplashDone(true), splashDelay() * 1000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    setScrolledEnough(window.scrollY > SHOW_AFTER);
    return scrollY.on('change', (y) => setScrolledEnough(y > SHOW_AFTER));
  }, [scrollY]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {scrolledEnough && splashDone && <FlyingButton label={label} href={href} />}
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
        >
          <Heart aria-hidden className="size-4 fill-current" />
          {label}
        </motion.a>
      </motion.div>
    </div>
  );
}
