import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export type CarouselArticle = {
  href: string;
  title: string;
  date: string;
  category: string;
  image: string;
};

/** Swipeable article slider (Embla). */
export default function ArticleCarousel({ articles }: { articles: CarouselArticle[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', loop: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    update();
    embla.on('select', update).on('reInit', update);
  }, [embla, update]);

  const btn =
    'inline-flex size-12 items-center justify-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30';

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex touch-pan-y">
          {articles.map((a) => (
            <article key={a.href} className="min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3">
              <a href={a.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold">
                    {a.category}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold transition-colors group-hover:text-ink/70">{a.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{a.date}</p>
                <span className="link-arrow mt-4 text-sm">Կարդալ ավելին</span>
              </a>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <button type="button" className={btn} onClick={() => embla?.scrollPrev()} disabled={!canPrev} aria-label="Նախորդը">
          <ArrowLeft className="size-5" />
        </button>
        <button type="button" className={btn} onClick={() => embla?.scrollNext()} disabled={!canNext} aria-label="Հաջորդը">
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
