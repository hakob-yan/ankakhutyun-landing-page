import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Heart } from 'lucide-react';

type Props = { label: string; href: string };

/**
 * Eye-catching donate button for the hero (Motion):
 * flowing orange gradient, a shine sweeping across, a beating heart,
 * and little hearts floating up on hover / tap.
 */
export default function HeroDonate({ label, href }: Props) {
  const [bursts, setBursts] = useState<number[]>([]);

  const burst = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1200);
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.a
        href={href}
        onHoverStart={burst}
        onTapStart={burst}
        whileHover={{ scale: 1.07, y: -3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="relative isolate inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-bold text-ink shadow-lg shadow-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {/* flowing gradient background */}
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 overflow-hidden rounded-full"
          style={{
            backgroundImage: 'linear-gradient(110deg, #ff6700, #ff9340, #ffb589, #ff9340, #ff6700)',
            backgroundSize: '250% 100%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
        >
          {/* shine sweep */}
          <motion.span
            className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            initial={{ left: '-40%' }}
            animate={{ left: ['-40%', '140%'] }}
            transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.5 }}
          />
        </motion.span>

        {/* beating heart */}
        <motion.span
          aria-hidden
          className="inline-flex"
          animate={{ scale: [1, 1.3, 1, 1.2, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.4 }}
        >
          <Heart className="size-[18px] fill-current" />
        </motion.span>
        {label}

        {/* floating hearts on hover / tap */}
        <AnimatePresence>
          {bursts.map((id) =>
            [-22, 0, 22].map((dx, i) => (
              <motion.span
                key={`${id}-${i}`}
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 text-accent"
                initial={{ opacity: 1, x: dx, y: -10, scale: 0.4 }}
                animate={{ opacity: 0, x: dx * 1.6, y: -70 - i * 12, scale: 1, rotate: dx }}
                transition={{ duration: 1, ease: 'easeOut', delay: i * 0.08 }}
              >
                <Heart className="size-4 fill-current" />
              </motion.span>
            )),
          )}
        </AnimatePresence>
      </motion.a>
    </MotionConfig>
  );
}
