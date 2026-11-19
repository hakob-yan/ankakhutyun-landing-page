/**
 * Site-wide motion effects, powered by Motion (https://motion.dev):
 *  - scroll progress bar under the header
 *  - sections / cards fade-and-rise into view while scrolling (cards are staggered)
 * Everything is skipped for visitors who ask for reduced motion.
 */
import { animate, inView, scroll } from 'motion';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- scroll progress bar ---------- */
const progress = document.getElementById('scroll-progress');
if (progress) scroll(animate(progress, { scaleX: [0, 1] }, { ease: 'linear' }));

/* ---------- reveal on scroll ---------- */
function setupReveal() {
  const sections = 'main section';
  // Cards inside grids reveal one by one; other blocks reveal as a whole.
  const cards = document.querySelectorAll<HTMLElement>(`${sections} .grid > *`);
  const blocks = [...document.querySelectorAll<HTMLElement>(`${sections} .container-x > *`)].filter(
    (el) => !el.classList.contains('grid') && !el.querySelector('.grid') && !el.classList.contains('animate-fade-up'),
  );

  const reveal = (el: HTMLElement, delay: number) => {
    // Only hide things that are still below the fold, so nothing flickers on load.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    inView(
      el,
      () => {
        animate(el, { opacity: 1, y: 0 }, { type: 'spring', bounce: 0.25, duration: 0.8, delay });
      },
      { amount: 0.15 },
    );
  };

  blocks.forEach((el) => reveal(el, 0));
  cards.forEach((el) => {
    const index = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    reveal(el, (index % 4) * 0.1);
  });
}

if (!reduceMotion) {
  setupReveal();
}
