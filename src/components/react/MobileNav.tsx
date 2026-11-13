import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { NavItem } from '@/data/site';

type Props = {
  items: NavItem[];
  siteName: string;
  donate: { label: string; href: string };
  labels: { open: string; close: string; description: string };
};

const panel: Variants = {
  hidden: { x: '100%' },
  show: {
    x: 0,
    transition: { type: 'spring', stiffness: 320, damping: 34, staggerChildren: 0.06, delayChildren: 0.12 },
  },
  exit: { x: '100%', transition: { type: 'spring', stiffness: 400, damping: 40 } },
};
const row: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 380, damping: 28 } },
};

/** Slide-in mobile menu: Radix Dialog + Accordion for sub-menus, animated with Motion. */
export default function MobileNav({ items, siteName, donate, labels }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <motion.button
            aria-label={labels.open}
            whileHover={{ scale: 1.08, rotate: -6 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex size-11 items-center justify-center rounded-full border-2 border-ink bg-ink text-white transition-colors hover:bg-white hover:text-ink"
          >
            <Menu className="size-5" />
          </motion.button>
        </Dialog.Trigger>

        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  variants={panel}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl"
                >
                  <motion.div variants={row} className="mb-8 flex items-center justify-between">
                    <Dialog.Title className="text-lg font-bold">{siteName}</Dialog.Title>
                    <Dialog.Close asChild>
                      <motion.button
                        aria-label={labels.close}
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.85 }}
                        className="inline-flex size-10 items-center justify-center rounded-full bg-cream transition-colors hover:bg-accent"
                      >
                        <X className="size-5" />
                      </motion.button>
                    </Dialog.Close>
                  </motion.div>
                  <Dialog.Description className="sr-only">{labels.description}</Dialog.Description>

                  <Accordion.Root type="single" collapsible className="divide-y divide-black/10">
                    {items.map((item) =>
                      item.children ? (
                        <motion.div key={item.label} variants={row}>
                          <Accordion.Item value={item.label}>
                            <Accordion.Header>
                              <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-lg font-semibold">
                                {item.label}
                                <ChevronDown className="size-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="accordion-content overflow-hidden">
                              <div className="pb-3">
                                {item.children.map((c) => (
                                  <motion.a
                                    key={c.href}
                                    href={c.href}
                                    whileTap={{ scale: 0.97 }}
                                    className="block rounded-lg px-3 py-2 text-ink/80 transition-[padding,background-color] duration-300 hover:bg-accent-soft hover:pl-5"
                                  >
                                    {c.label}
                                  </motion.a>
                                ))}
                              </div>
                            </Accordion.Content>
                          </Accordion.Item>
                        </motion.div>
                      ) : (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          variants={row}
                          whileTap={{ scale: 0.97 }}
                          className="block py-4 text-lg font-semibold transition-colors hover:text-brand"
                        >
                          {item.label}
                        </motion.a>
                      ),
                    )}
                  </Accordion.Root>

                  <motion.a variants={row} href={donate.href} className="btn-primary mt-8" onClick={() => setOpen(false)}>
                    {donate.label}
                  </motion.a>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </MotionConfig>
  );
}
