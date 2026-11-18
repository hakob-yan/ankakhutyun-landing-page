import { useState, type PointerEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react';
import { ArrowUpRight, Mail, X } from 'lucide-react';
import { siFacebook, siInstagram } from 'simple-icons';
import type { TeamCard } from '@/data/team';

type Labels = { leadership: string; members: string; more: string; close: string };
type Props = { members: TeamCard[]; labels: Labels };

const spring = { type: 'spring', stiffness: 260, damping: 26 } as const;

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 48, rotate: -2, scale: 0.96 },
  show: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: spring },
};

/** 3D tilt that follows the pointer, plus a soft light spot. */
function useTilt(max = 8) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const lx = useTransform(px, (v) => `${v * 100}%`);
  const ly = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${lx} ${ly}, rgba(255,255,255,0.45), transparent 55%)`;

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };
  return { style: { rotateX, rotateY, transformPerspective: 900 }, glare, onPointerMove, onPointerLeave };
}

function MemberCard({ m, lead, more, onOpen }: { m: TeamCard; lead?: boolean; more: string; onOpen: () => void }) {
  const tilt = useTilt(lead ? 5 : 8);
  return (
    <motion.li variants={card} className={lead ? '' : 'h-full'}>
      <motion.button
        type="button"
        onClick={onOpen}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        style={tilt.style}
        whileTap={{ scale: 0.98 }}
        className={`group relative flex h-full w-full cursor-pointer overflow-hidden rounded-card bg-white text-left shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
          lead ? 'flex-col sm:flex-row' : 'flex-col'
        }`}
      >
        <div className={`relative overflow-hidden bg-cream ${lead ? 'aspect-square sm:aspect-auto sm:w-1/2' : 'aspect-[4/5]'}`}>
          {/* orange blob that grows behind the photo on hover */}
          <span
            aria-hidden
            className="absolute -right-10 -bottom-10 size-40 rounded-full bg-accent/80 transition-transform duration-500 ease-out group-hover:scale-[3.5]"
          />
          <motion.img
            layoutId={`photo-${m.id}`}
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="relative size-full object-cover mix-blend-normal transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: tilt.glare }} />
        </div>

        <div className={`flex flex-1 flex-col p-6 ${lead ? 'justify-center sm:p-10' : ''}`}>
          <p className="mb-2 text-xs font-semibold tracking-wider text-accent uppercase">{m.role}</p>
          <motion.h3 layoutId={`name-${m.id}`} className={lead ? 'text-2xl lg:text-3xl' : 'text-xl'}>
            {m.name}
          </motion.h3>
          {lead && <p className="mt-4 line-clamp-4 text-ink/70">{m.bio}</p>}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
            <span className="border-b-2 border-accent pb-0.5">{more}</span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </motion.button>
    </motion.li>
  );
}

const Icon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
    <path d={path} />
  </svg>
);

/** Team page: leadership row + member grid, cards open a detail dialog with a shared-photo transition. */
export default function TeamGrid({ members, labels }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = members.find((m) => m.id === openId);
  const leads = members.filter((m) => m.lead);
  const rest = members.filter((m) => !m.lead);

  const heading = (text: string) => (
    <motion.h2
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={spring}
      className="mb-10 flex items-center gap-4 text-2xl lg:text-3xl"
    >
      <span className="h-1 w-10 rounded-full bg-accent" aria-hidden />
      {text}
    </motion.h2>
  );

  const listProps = { variants: grid, initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } } as const;

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        {leads.length > 0 && (
          <section className="mb-20 lg:mb-28">
            {heading(labels.leadership)}
            <motion.ul {...listProps} className="grid gap-8 lg:grid-cols-2">
              {leads.map((m) => (
                <MemberCard key={m.id} m={m} lead more={labels.more} onOpen={() => setOpenId(m.id)} />
              ))}
            </motion.ul>
          </section>
        )}

        <section>
          {heading(labels.members)}
          <motion.ul {...listProps} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((m) => (
              <MemberCard key={m.id} m={m} more={labels.more} onOpen={() => setOpenId(m.id)} />
            ))}
          </motion.ul>
        </section>

        <Dialog.Root open={!!active} onOpenChange={(o) => !o && setOpenId(null)}>
          <AnimatePresence>
            {active && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: spring }}
                      exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2 } }}
                      className="pointer-events-auto relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-card bg-white shadow-2xl sm:grid-cols-2"
                    >
                      <div className="relative overflow-hidden bg-cream">
                        <motion.img
                          layoutId={`photo-${active.id}`}
                          src={active.photo}
                          alt={active.name}
                          className="aspect-square size-full object-cover sm:aspect-auto"
                        />
                      </div>
                      <div className="flex flex-col p-7 sm:p-9">
                        <Dialog.Close asChild>
                          <motion.button
                            aria-label={labels.close}
                            whileHover={{ rotate: 90 }}
                            whileTap={{ scale: 0.85 }}
                            className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-white/90 shadow transition-colors hover:bg-accent"
                          >
                            <X className="size-5" />
                          </motion.button>
                        </Dialog.Close>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                          className="mb-2 text-xs font-semibold tracking-wider text-accent uppercase"
                        >
                          {active.role}
                        </motion.p>
                        <Dialog.Title asChild>
                          <motion.h3 layoutId={`name-${active.id}`} className="text-2xl lg:text-3xl">
                            {active.name}
                          </motion.h3>
                        </Dialog.Title>
                        <Dialog.Description asChild>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.22 } }}
                            className="mt-5 leading-relaxed text-ink/75"
                          >
                            {active.bio}
                          </motion.p>
                        </Dialog.Description>
                        {(active.email || active.facebook || active.instagram) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.3 } }}
                            className="mt-auto flex gap-2 pt-8"
                          >
                            {active.email && (
                              <a href={`mailto:${active.email}`} aria-label="Email" className="inline-flex size-10 items-center justify-center rounded-full bg-cream transition-colors hover:bg-accent">
                                <Mail className="size-4" />
                              </a>
                            )}
                            {active.facebook && (
                              <a href={active.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="inline-flex size-10 items-center justify-center rounded-full bg-cream transition-colors hover:bg-accent">
                                <Icon path={siFacebook.path} />
                              </a>
                            )}
                            {active.instagram && (
                              <a href={active.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="inline-flex size-10 items-center justify-center rounded-full bg-cream transition-colors hover:bg-accent">
                                <Icon path={siInstagram.path} />
                              </a>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </div>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </LayoutGroup>
    </MotionConfig>
  );
}
