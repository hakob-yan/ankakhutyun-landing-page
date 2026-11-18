import { useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'motion/react';
import { Plus } from 'lucide-react';
import type { BoardCard } from '@/data/board';

type Labels = { since: string; more: string; less: string };
type Props = { members: BoardCard[]; labels: Labels };

const ease = [0.22, 1, 0.36, 1] as const;

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const shadow = 'shadow-[0_1px_2px_rgb(51_38_29/0.06),0_12px_32px_-12px_rgb(51_38_29/0.2)]';
const shadowHover = 'hover:shadow-[0_2px_4px_rgb(51_38_29/0.08),0_24px_48px_-16px_rgb(51_38_29/0.28)]';

/** One board member: photo + name. "More" opens the bio inside the card (nothing flips or moves away). */
function MemberCard({ m, labels }: { m: BoardCard; labels: Labels }) {
  const [open, setOpen] = useState(false);
  const bioId = useId();
  const since = labels.since.replace('{year}', String(m.since));

  return (
    <motion.li
      variants={item}
      className={`group overflow-hidden rounded-card bg-white ring-1 ring-ink/8 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 ${shadow} ${shadowHover}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={m.photo}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-md">{m.role}</span>
      </div>

      <div className="border-t-4 border-accent p-6">
        <h3 className="text-xl">{m.name}</h3>
        <p className="mt-1 text-ink/60">{m.occupation}</p>
        <p className="mt-3 text-xs font-semibold tracking-wider text-ink/45 uppercase">{since}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={bioId}
              key="bio"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <p className="pt-4 leading-relaxed text-ink/75">{m.bio}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={bioId}
          onClick={() => setOpen((o) => !o)}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="border-b-2 border-accent pb-0.5">{open ? labels.less : labels.more}</span>
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-cream transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : undefined }}>
            <Plus className="size-3.5" />
          </span>
        </button>
      </div>
    </motion.li>
  );
}

/** Board members grid: cards fade up on scroll; each can open its bio in place. */
export default function BoardGrid({ members, labels }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.ul
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {members.map((m) => (
          <MemberCard key={m.id} m={m} labels={labels} />
        ))}
      </motion.ul>
    </MotionConfig>
  );
}
