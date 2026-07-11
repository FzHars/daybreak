import type { TrackerItem } from '../types';

interface Props {
  item: TrackerItem;
  done: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistItem({ item, done, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      className={`w-full flex items-center gap-3 rounded-xl border px-3.5 py-3 mb-2 text-left transition-colors ${
        done
          ? 'bg-surface-hi border-green'
          : 'bg-surface border-border hover:border-gold-dim'
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          done ? 'bg-green border-green' : 'border-text-mute'
        }`}
      >
        {done && (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#12141a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className={`flex-1 text-[14.5px] ${done ? 'text-text-mute line-through' : 'text-text'}`}>
        {item.label}
      </span>
      <span className="font-mono text-xs text-text-mute">{item.time}</span>
    </button>
  );
}
