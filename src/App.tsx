import { ITEMS } from './data/items';
import { useTracker } from './hooks/useTracker';
import { ChecklistItem } from './components/ChecklistItem';
import { StatsBar } from './components/StatsBar';
import { ContributionGrid } from './components/ContributionGrid';
import { BackupControls } from './components/BackupControls';
import { isoDate } from './lib/date';

function App() {
  const {
    today,
    todayState,
    allDays,
    ratioByDate,
    streak,
    monthStat,
    toggleItem,
    importData,
  } = useTracker();

  const doneCount = ITEMS.filter((it) => todayState[it.id]).length;
  const groups = [...new Set(ITEMS.map((i) => i.group))];

  return (
    <div className="mx-auto max-w-[720px] px-4 py-8">
      <div className="rounded-2xl bg-bg p-6">
        <div className="mb-1 flex items-end justify-between">
          <div className="font-mono text-[13px] uppercase tracking-wide text-gold">
            daybreak
          </div>
          <div className="font-mono text-[13px] text-text-mute">{isoDate(today)}</div>
        </div>
        <div className="mb-5 text-[22px] font-semibold">
          {doneCount}/{ITEMS.length} commit hari ini
        </div>

        <StatsBar streak={streak} monthPct={monthStat.pct} hit={monthStat.hit} total={monthStat.total} />

        {groups.map((group) => (
          <div key={group}>
            <div className="my-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-text-mute">
              {group}
              <span className="h-px flex-1 bg-border" />
            </div>
            {ITEMS.filter((it) => it.group === group).map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                done={!!todayState[item.id]}
                onToggle={toggleItem}
              />
            ))}
          </div>
        ))}

        <ContributionGrid today={today} ratioByDate={ratioByDate} />

        <div className="mt-4 text-center text-xs italic text-text-mute">
          &ge;6/8 = hari dianggap berhasil. Kecil tapi konsisten &gt; sempurna tapi bolong.
        </div>

        <BackupControls allDays={allDays} onImport={importData} />
      </div>
    </div>
  );
}

export default App;
