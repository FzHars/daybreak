import { useRef, useState } from 'react';
import { exportHistoryToPdf } from '../lib/pdfExport';
import { isoDate } from '../lib/date';
import type { AllDaysData } from '../types';

interface Props {
  allDays: AllDaysData;
  onImport: (data: AllDaysData) => void;
}

export function BackupControls({ allDays, onImport }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }

  function handleExportJson() {
    try {
      const blob = new Blob([JSON.stringify(allDays, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `daybreak-backup-${isoDate(new Date())}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Backup JSON berhasil didownload ✓');
    } catch (err) {
      console.error(err);
      showToast('Gagal bikin backup JSON');
    }
  }

  function handleExportPdf() {
    try {
      if (Object.keys(allDays).length === 0) {
        showToast('Belum ada data buat di-export');
        return;
      }
      exportHistoryToPdf(allDays);
      showToast('PDF riwayat berhasil didownload ✓');
    } catch (err) {
      console.error(err);
      showToast('Gagal bikin PDF');
    }
  }

  async function handleImportChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text) as AllDaysData;
      onImport(data);
      showToast(`Restore ${Object.keys(data).length} hari berhasil ✓`);
    } catch (err) {
      console.error(err);
      showToast('File tidak valid');
    } finally {
      ev.target.value = '';
    }
  }

  return (
    <div className="relative mt-3.5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleExportJson}
          className="flex-1 rounded-lg border border-border bg-surface px-2.5 py-2.5 font-mono text-[11px] uppercase tracking-wide text-text-mute transition-colors hover:border-gold-dim hover:text-text"
        >
          ⬇ Backup JSON
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 rounded-lg border border-border bg-surface px-2.5 py-2.5 font-mono text-[11px] uppercase tracking-wide text-text-mute transition-colors hover:border-gold-dim hover:text-text"
        >
          ⬆ Restore
        </button>
        <button
          type="button"
          onClick={handleExportPdf}
          className="flex-1 rounded-lg border border-border bg-surface px-2.5 py-2.5 font-mono text-[11px] uppercase tracking-wide text-text-mute transition-colors hover:border-gold-dim hover:text-text"
        >
          🖨 Riwayat PDF
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImportChange}
        />
      </div>

      {toast && (
        <div className="pointer-events-none absolute left-1/2 top-[-42px] -translate-x-1/2 rounded-lg border border-green bg-surface-hi px-4 py-2 text-xs text-text shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
