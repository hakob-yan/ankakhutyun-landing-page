import { Heart } from 'lucide-react';

type Props = { label: string; href: string };

/** Donate button for the hero: solid amber with a soft shadow; hover colors come from .btn-primary. */
export default function HeroDonate({ label, href }: Props) {
  return (
    <a href={href} className="btn-primary px-8 font-bold shadow-[0_2px_4px_rgb(0_0_0/0.12),0_10px_24px_-8px_rgb(0_0_0/0.35)]">
      <Heart aria-hidden className="size-[18px] fill-current" />
      {label}
    </a>
  );
}
