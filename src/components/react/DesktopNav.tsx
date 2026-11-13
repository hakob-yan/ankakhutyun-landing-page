import { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from '@/data/site';

type Props = { items: NavItem[]; currentPath: string; homePath: string };

const spring = { type: 'spring', stiffness: 420, damping: 32 } as const;

const dropdown: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { ...spring, staggerChildren: 0.04, delayChildren: 0.05 } },
};
const dropdownItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: spring },
};

/** Desktop dropdown menu (keyboard accessible, powered by Radix NavigationMenu + Motion). */
export default function DesktopNav({ items, currentPath, homePath }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === homePath) return currentPath === homePath;
    const base = href.split(/[?#]/)[0];
    return base !== homePath && currentPath.startsWith(base);
  };

  const linkCls =
    'group relative inline-flex items-center gap-1 px-4 py-2 text-[15px] font-medium text-ink transition-colors outline-none';

  /** Pill that slides between hovered items + underline for the active page. */
  const decorations = (label: string, active: boolean) => (
    <>
      <AnimatePresence>
        {hovered === label && (
          <motion.span
            layoutId="nav-hover-pill"
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
          />
        )}
      </AnimatePresence>
      {active && (
        <motion.span
          layoutId="nav-active-line"
          aria-hidden
          className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
          transition={spring}
        />
      )}
    </>
  );

  const hoverProps = (label: string) => ({
    onPointerEnter: () => setHovered(label),
    onFocus: () => setHovered(label),
  });

  return (
    <MotionConfig reducedMotion="user">
      <NavigationMenu.Root delayDuration={80} className="relative">
        <NavigationMenu.List className="isolate flex items-center gap-1" onPointerLeave={() => setHovered(null)}>
          {items.map((item) =>
            item.children ? (
              <NavigationMenu.Item key={item.label} className="relative" {...hoverProps(item.label)}>
                <NavigationMenu.Trigger className={linkCls}>
                  {decorations(item.label, isActive(item.href))}
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className="size-4 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-full left-0 z-50 pt-3">
                  <motion.ul
                    variants={dropdown}
                    initial="hidden"
                    animate="show"
                    style={{ transformOrigin: 'top left' }}
                    className="min-w-60 rounded-card bg-white p-3 shadow-xl ring-1 ring-black/5"
                  >
                    {item.children.map((child) => (
                      <motion.li key={child.href} variants={dropdownItem}>
                        <NavigationMenu.Link asChild>
                          <motion.a
                            href={child.href}
                            whileHover={{ x: 6 }}
                            transition={spring}
                            className="block rounded-xl px-4 py-2.5 text-[15px] text-ink transition-colors hover:bg-accent-soft"
                          >
                            {child.label}
                          </motion.a>
                        </NavigationMenu.Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={item.label} className="relative" {...hoverProps(item.label)}>
                <NavigationMenu.Link href={item.href} className={linkCls}>
                  {decorations(item.label, isActive(item.href))}
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ),
          )}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </MotionConfig>
  );
}
