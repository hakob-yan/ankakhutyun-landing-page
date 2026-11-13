import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { NavItem } from '@/data/site';

type Props = {
  items: NavItem[];
  siteName: string;
  donate: { label: string; href: string };
  labels: { open: string; close: string; description: string };
};

/** Slide-in mobile menu: Radix Dialog + Accordion for sub-menus. */
export default function MobileNav({ items, siteName, donate, labels }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={labels.open}
        className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-brand hover:text-ink"
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl">
          <div className="mb-8 flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold">{siteName}</Dialog.Title>
            <Dialog.Close
              aria-label={labels.close}
              className="inline-flex size-10 items-center justify-center rounded-full bg-cream hover:bg-brand"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{labels.description}</Dialog.Description>

          <Accordion.Root type="single" collapsible className="divide-y divide-black/10">
            {items.map((item) =>
              item.children ? (
                <Accordion.Item key={item.label} value={item.label}>
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-lg font-semibold">
                      {item.label}
                      <ChevronDown className="size-5 transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="pb-3">
                    {item.children.map((c) => (
                      <a key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-ink/80 hover:bg-cream">
                        {c.label}
                      </a>
                    ))}
                  </Accordion.Content>
                </Accordion.Item>
              ) : (
                <a key={item.label} href={item.href} className="block py-4 text-lg font-semibold">
                  {item.label}
                </a>
              ),
            )}
          </Accordion.Root>

          <a href={donate.href} className="btn-primary mt-8">
            {donate.label}
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
