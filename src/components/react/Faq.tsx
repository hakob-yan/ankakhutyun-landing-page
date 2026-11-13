import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

type Props = { items: { q: string; a: string }[] };

/** FAQ accordion (Radix) — one item open at a time, animated height. */
export default function Faq({ items }: Props) {
  return (
    <Accordion.Root type="single" collapsible defaultValue="item-0" className="space-y-4">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="overflow-hidden rounded-[20px] bg-white transition-shadow data-[state=open]:shadow-lg"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-semibold sm:px-8">
              {item.q}
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-ink group-data-[state=open]:text-white">
                <Plus className="size-5" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="accordion-content overflow-hidden">
            <p className="px-6 pb-6 text-ink/75 sm:px-8">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
