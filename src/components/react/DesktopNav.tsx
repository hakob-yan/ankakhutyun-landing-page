import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from '@/data/site';

type Props = { items: NavItem[]; currentPath: string };

/** Desktop dropdown menu (keyboard accessible, powered by Radix NavigationMenu). */
export default function DesktopNav({ items, currentPath }: Props) {
  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href.split(/[?#]/)[0]) && href.split(/[?#]/)[0] !== '/';

  const linkCls = (active: boolean) =>
    `group relative inline-flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-ink transition-colors hover:text-ink/70 ${
      active ? 'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-ink' : ''
    }`;

  return (
    <NavigationMenu.Root delayDuration={80} className="relative">
      <NavigationMenu.List className="flex items-center gap-1">
        {items.map((item) =>
          item.children ? (
            <NavigationMenu.Item key={item.label} className="relative">
              <NavigationMenu.Trigger className={linkCls(isActive(item.href))}>
                {item.label}
                <ChevronDown
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-0 z-50 pt-3 data-[motion^=from-]:animate-fade-up">
                <ul className="min-w-60 rounded-[20px] bg-white p-3 shadow-xl ring-1 ring-black/5">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavigationMenu.Link
                        href={child.href}
                        className="block rounded-xl px-4 py-2.5 text-[15px] text-ink transition-colors hover:bg-cream"
                      >
                        {child.label}
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={item.label}>
              <NavigationMenu.Link href={item.href} className={linkCls(isActive(item.href))}>
                {item.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
