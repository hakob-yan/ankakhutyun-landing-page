import { useState } from 'react';

const AMOUNTS = [5000, 10000, 25000, 50000];
const GOAL = 5_000_000;
const RAISED = 3_150_000;

const fmt = (n: number) => `${n.toLocaleString('hy-AM')} ֏`;

/**
 * Donation form UI (demo only — no payment provider is connected yet).
 * Hook the submit handler up to your payment gateway (e.g. Idram, ArCa, Stripe).
 */
export default function DonateWidget() {
  const [amount, setAmount] = useState<number>(10000);
  const [custom, setCustom] = useState('');
  const [sent, setSent] = useState(false);
  const total = custom ? Number(custom) || 0 : amount;
  const pct = Math.min(100, Math.round((RAISED / GOAL) * 100));

  if (sent) {
    return (
      <div className="rounded-[20px] bg-white p-8 text-center shadow-xl">
        <p className="text-2xl font-bold">Շնորհակալություն 💛</p>
        <p className="mt-3 text-ink/70">Սա ցուցադրական ձև է․ վճարային համակարգը դեռ միացված չէ։</p>
        <button className="btn-outline mt-6" onClick={() => setSent(false)}>Վերադառնալ</button>
      </div>
    );
  }

  return (
    <form
      className="min-w-0 rounded-[20px] bg-white p-6 shadow-xl sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="flex justify-between text-sm font-medium">
        <span>Հավաքվել է {fmt(RAISED)}</span>
        <span className="text-ink/60">Նպատակ՝ {fmt(GOAL)}</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 font-semibold">Ընտրեք գումարը</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AMOUNTS.map((a) => (
            <button
              type="button"
              key={a}
              aria-pressed={!custom && amount === a}
              onClick={() => {
                setAmount(a);
                setCustom('');
              }}
              className="rounded-full border-2 border-ink/15 px-3 py-2.5 text-sm font-semibold transition-colors hover:border-ink aria-pressed:border-brand aria-pressed:bg-brand"
            >
              {fmt(a)}
            </button>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-2.5 focus-within:border-ink">
          <span className="font-semibold">֏</span>
          <input
            type="number"
            min={100}
            inputMode="numeric"
            placeholder="Այլ գումար"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full min-w-0 bg-transparent outline-none"
          />
        </label>
      </fieldset>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input required placeholder="Անուն *" className="w-full min-w-0 rounded-full border-2 border-ink/15 px-5 py-2.5 outline-none focus:border-ink" />
        <input required type="email" placeholder="Էլ. հասցե *" className="w-full min-w-0 rounded-full border-2 border-ink/15 px-5 py-2.5 outline-none focus:border-ink" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-semibold">
          Ընդամենը՝ <span className="text-xl">{fmt(total)}</span>
        </p>
        <button type="submit" className="btn-dark" disabled={total <= 0}>
          Նվիրաբերել
        </button>
      </div>
    </form>
  );
}
