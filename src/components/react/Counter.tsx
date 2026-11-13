import { useRef } from 'react';
// named import: the default export is CommonJS and breaks under Node SSR
import { useCountUp } from 'react-countup';

type Props = { end: number; suffix?: string; separator?: string };

/** Number that counts up once hydrated (use with client:visible so it starts on scroll). */
export default function Counter({ end, suffix = '', separator = ' ' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // years like 1991 should not get a thousands separator
  const sep = end >= 1900 && end <= 2100 ? '' : separator;
  useCountUp({ ref, end, suffix, separator: sep, duration: 2.2 });
  // server renders the final value so it's correct without JS
  return <span ref={ref}>{`${end}${suffix}`}</span>;
}
