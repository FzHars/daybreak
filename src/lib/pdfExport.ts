import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ITEMS, THRESHOLD } from '../data/items';
import type { AllDaysData } from '../types';

/**
 * Bikin PDF dari seluruh riwayat yang sudah terekam di localStorage.
 * Semua diproses di browser (client-side), tidak ada data yang
 * dikirim ke server manapun — konsisten dengan prinsip no-backend app ini.
 */
export function exportHistoryToPdf(allDays: AllDaysData) {
  const dates = Object.keys(allDays).sort(); // ascending

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Daybreak — Riwayat Tracker', 14, 18);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Diunduh: ${new Date().toLocaleString('id-ID')}`, 14, 24);
  doc.text(`Total hari terekam: ${dates.length}`, 14, 29);

  const head = [['Tanggal', ...ITEMS.map((i) => i.label), 'Selesai', 'Status']];

  const body = dates.map((date) => {
    const state = allDays[date];
    const doneItems = ITEMS.filter((it) => state[it.id]);
    const ratio = doneItems.length / ITEMS.length;
    const status = ratio >= THRESHOLD ? 'Berhasil' : ratio > 0 ? 'Sebagian' : 'Kosong';
    return [
      date,
      ...ITEMS.map((it) => (state[it.id] ? 'v' : '-')),
      `${doneItems.length}/${ITEMS.length}`,
      status,
    ];
  });

  autoTable(doc, {
    head,
    body,
    startY: 35,
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: { fillColor: [30, 33, 43] },
    didParseCell: (data) => {
      // warnai kolom Status
      if (data.section === 'body' && data.column.index === body[0].length - 1) {
        const val = data.cell.raw;
        if (val === 'Berhasil') data.cell.styles.textColor = [46, 125, 50];
        else if (val === 'Sebagian') data.cell.styles.textColor = [180, 130, 30];
        else data.cell.styles.textColor = [150, 150, 150];
      }
    },
  });

  const successDays = dates.filter((d) => {
    const state = allDays[d];
    const ratio = ITEMS.filter((it) => state[it.id]).length / ITEMS.length;
    return ratio >= THRESHOLD;
  }).length;

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY ?? 40;
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(
    `Ringkasan: ${successDays} dari ${dates.length} hari mencapai target (>= 6/8 checklist).`,
    14,
    finalY + 10
  );

  doc.save(`daybreak-riwayat-${new Date().toISOString().slice(0, 10)}.pdf`);
}
