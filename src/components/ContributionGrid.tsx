import { THRESHOLD } from '../data/items';
import { daysInMonth, isoDate, monthLabel, pad } from '../lib/date';

interface Props {
  today: Date;
  ratioByDate: Record<string, number>;
}

function levelFor(ratio: number | undefined): 0 | 1 | 2 | 3 {
  if (ratio === undefined) return 0;
  if (ratio >= 1) return 3;
  if (ratio >= THRESHOLD) return 2;
  if (ratio > 0) return 1;
  return 0;
}

const LEVEL_CLASS: Record<number, string> = {
  0: 'bg-surface-hi border-border',
  1: 'bg-gold-dim border-gold-dim',
  2: 'bg-gold border-gold',
  3: 'bg-green border-green',
};

export function ContributionGrid({ today, ratioByDate }: Props) {
  const y = today.getFullYear();
  const m = today.getMonth();
  const total = daysInMonth(y, m);
  const todayKey = isoDate(today);

  const cells = Array.from({ length: total }, (_, i) => {
    const day = i + 1;
    const key = `${y}-${pad(m + 1)}-${pad(day)}`;
    const ratio = ratioByDate[key];
    const lvl = levelFor(ratio);
    return { key, lvl, isToday: key === todayKey };
  });

  return (
    <div className="mt-6 rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-wide text-text-mute">
        Commit graph — {monthLabel(today)}
      </div>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, 13px)' }}>
        {cells.map((c) => (
          <div
            key={c.key}
            title={c.key}
            className={`h-[13px] w-[13px] rounded-sm border ${LEVEL_CLASS[c.lvl]} ${
              c.isToday ? 'outline outline-1 outline-text outline-offset-1' : ''
            }`}
          />
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-text-mute">
        <span>kosong</span>
        {[0, 1, 2, 3].map((lvl) => (
          <div key={lvl} className={`h-[11px] w-[11px] rounded-sm border ${LEVEL_CLASS[lvl]}`} />
        ))}
        <span>penuh</span>
      </div>
    </div>
  );
}
