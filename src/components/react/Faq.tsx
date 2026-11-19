import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

/** `link` (optional): web links open in a new tab, mailto: links do not. */
type Props = { items: { q: string; a: string; link?: { label: string; href: string } }[] };

/** FAQ accordion (Radix) — one item open at a time, animated height. */
export default function Faq({ items }: Props) {
  return (
    <Accordion.Root type="single" collapsible defaultValue="item-0" className="space-y-4">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="overflow-hidden rounded-card bg-white transition-shadow data-[state=open]:shadow-lg"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-semibold sm:px-8">
              {item.q}
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-accent-soft">
                <Plus className="size-5" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="accordion-content overflow-hidden">
            <div className="px-6 pb-6 sm:px-8">
              <p className="text-ink/75">{item.a}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  {...(item.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="link-arrow mt-4"
                >
                  {item.link.label} →
                </a>
              )}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
