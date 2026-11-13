import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

export type HeroSlide = { src: string; srcSet: string; alt: string };

type Props = {
  slides: HeroSlide[];
  labels: { previous: string; next: string; pause: string; play: string; slide: string /* "Slide {n} of {total}" */ };
};

/** Time each slide stays on screen (ms). */
const DELAY = 6000;

/**
 * Full-bleed hero photo slider: Embla + Fade + Autoplay plugins,
 * slow "Ken Burns" zoom on the active photo (Motion), dots that double as a timer, pause button.
 */
export default function HeroSlider({ slides, labels }: Props) {
  const reduceMotion = useReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Fade(),
    Autoplay({ delay: DELAY, stopOnInteraction: false, playOnInit: !reduceMotion }),
  ]);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(!reduceMotion);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => void embla.off('select', onSelect).off('reInit', onSelect);
  }, [embla]);

  const goTo = useCallback(
    (fn: () => void) => {
      fn();
      embla?.plugins().autoplay?.reset(); // restart the timer after a manual change
    },
    [embla],
  );

  const togglePlay = () => {
    const autoplay = embla?.plugins().autoplay;
    if (!autoplay) return;
    if (playing) autoplay.stop();
    else autoplay.play();
    setPlaying(!playing);
  };

  const fill = (n: number) => labels.slide.replace('{n}', String(n)).replace('{total}', String(slides.length));
  const ctrl =
    'inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative size-full" role="region" aria-roledescription="carousel">
        <div className="size-full overflow-hidden" ref={emblaRef}>
          <div className="flex size-full touch-pan-y">
            {slides.map((s, i) => (
              <div
                key={s.src}
                className="relative size-full min-w-0 flex-[0_0_100%] overflow-hidden"
                role="group"
                aria-roledescription="slide"
                aria-label={fill(i + 1)}
                aria-hidden={i !== selected}
              >
                <motion.img
                  src={s.src}
                  srcSet={s.srcSet}
                  sizes="100vw"
                  alt={s.alt}
                  draggable={false}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                  className="size-full object-cover"
                  // slow zoom on the visible slide ("Ken Burns")
                  initial={false}
                  animate={{ scale: i === selected ? 1.08 : 1 }}
                  transition={{ duration: i === selected ? DELAY / 1000 + 2 : 0.01, ease: 'linear' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* dark fades at the top and bottom of the photos */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        {/* controls: prev · dots (timer) · next · pause */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-cream/85 p-1 shadow-lg backdrop-blur-md sm:top-6 sm:right-6">
          <button type="button" className={ctrl} aria-label={labels.previous} onClick={() => goTo(() => embla?.scrollPrev())}>
            <ArrowLeft className="size-4" />
          </button>
          <div className="flex items-center gap-1.5 px-1">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={fill(i + 1)}
                aria-current={i === selected}
                onClick={() => goTo(() => embla?.scrollTo(i))}
                className={`relative h-2 overflow-hidden rounded-full bg-ink/20 transition-[width] duration-300 ${i === selected ? 'w-8' : 'w-2 hover:bg-ink/40'}`}
              >
                {i === selected && (
                  <motion.span
                    key={`${selected}-${playing}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    initial={{ width: playing ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: playing ? DELAY / 1000 : 0, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
          <button type="button" className={ctrl} aria-label={labels.next} onClick={() => goTo(() => embla?.scrollNext())}>
            <ArrowRight className="size-4" />
          </button>
          <button type="button" className={ctrl} aria-label={playing ? labels.pause : labels.play} onClick={togglePlay}>
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}
