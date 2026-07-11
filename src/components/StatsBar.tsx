interface Props {
  streak: number;
  monthPct: number;
  hit: number;
  total: number;
}

export function StatsBar({ streak, monthPct, hit, total }: Props) {
  const stats = [
    { value: `${streak}🔥`, label: 'streak hari' },
    { value: `${monthPct}%`, label: 'bulan ini' },
    { value: `${hit}/${total}`, label: 'hari berhasil' },
  ];

  return (
    <div className="flex gap-3 mb-5">
      {stats.map((s) => (
        <div key={s.label} className="flex-1 rounded-xl border border-border bg-surface px-3.5 py-3">
          <div className="font-mono text-2xl font-bold leading-none text-gold">{s.value}</div>
          <div className="mt-1 text-[11px] uppercase tracking-wide text-text-mute">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
