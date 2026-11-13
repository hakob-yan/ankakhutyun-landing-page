import { MotionConfig, motion, type Variants } from 'motion/react';

type Props = { /** one entry per line */ title: string[]; subtitle: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
// each line slides up from behind a mask
const word: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

/** Hero title + subtitle over the photos, animated in with Motion. */
export default function HeroHeading({ title, subtitle }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div initial="hidden" animate="show" variants={container} className="text-white">
        <h1 className="text-[min(2.25rem,9vw)] leading-[1.05] font-bold text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.35)] sm:text-5xl lg:text-6xl">
          {title.map((line, i) => (
            // each line on its own row, sliding up from behind a mask
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={word} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-3 flex items-center gap-3 sm:mt-4">
          {/* orange line that draws in before the subtitle */}
          <motion.span
            aria-hidden
            className="h-1 w-8 shrink-0 origin-left rounded-full bg-accent sm:w-12"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } } }}
          />
          <motion.p
            className="max-w-[30rem] text-base font-medium text-balance text-white/95 [text-shadow:0_1px_12px_rgb(0_0_0/0.4)] sm:text-xl"
            variants={{
              // only transform / opacity / blur: these never change the text's size, so nothing re-wraps or jumps
              hidden: { opacity: 0, x: -16, filter: 'blur(6px)' },
              show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
