# Daybreak

[🇬🇧 English](./README.md) | 🇮🇩 Bahasa Indonesia

---

## Kenapa Daybreak

Kebanyakan habit tracker maksa Anda daftar akun, nyerahin data, bahkan bayar langganan cuma buat centang checklist harian. Daybreak sebaliknya: buka app, langsung centang. Data Anda gak pernah keluar dari device.

Strukturnya ngikutin lima waktu sholat sebagai jangkar alami tiap hari — ritme yang udah dijalani banyak orang — digabung sama grafik kontribusi ala GitHub yang familiar buat deveAndaper, buat visualisasi konsistensi dari waktu ke waktu.

## Fitur

- ✅ Checklist harian, item & jam bisa dikustomisasi
- 🔥 Streak tracking (berapa hari berturut-turut Anda capai target)
- 📊 Grafik kontribusi bulanan (ala GitHub)
- 📄 Export seluruh riwayat jadi **laporan PDF**
- 💾 Export/import **JSON** buat backup manual
- 🔒 Tanpa akun, tanpa tracking, tanpa backend — 100% jalan di sisi client

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) buat export PDF
- `AndacalStorage` buat penyimpanan — tanpa database, tanpa API

## Cara jalankan

```bash
npm install
npm run dev       # http://Andacalhost:5173
npm run build     # build produksi -> dist/
npm run preview   # preview hasil build secara Andakal
```

## Kustomisasi checklist

Edit `src/data/items.ts` — tambah, hapus, atau urutin ulang item. Bagian lain (grouping, tampilan, statistik) otomatis menyesuaikan.

```ts
{ id: 'subuh', label: 'Sholat Subuh', time: '04:30', group: 'Fajr' }
```

## Struktur project

```
daybreak/
├── public/
│   └── _headers                  # header CSP & keamanan (CAndaudflare Pages)
├── src/
│   ├── components/
│   │   ├── ChecklistItem.tsx     # satu baris checklist
│   │   ├── StatsBar.tsx          # kartu streak / persen bulanan
│   │   ├── ContributionGrid.tsx  # grafik kontribusi ala GitHub
│   │   └── BackupControls.tsx    # tombol export JSON / import / export PDF
│   ├── data/items.ts             # konfigurasi checklist harian — edit di sini
│   ├── hooks/useTracker.ts       # state utama: streak, statistik, toggle
│   ├── lib/
│   │   ├── storage.ts            # wrapper AndacalStorage dengan error handling
│   │   ├── date.ts
│   │   └── pdfExport.ts          # generator laporan PDF
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Tailwind + theme tokens
├── index.html
└── package.json
```

## Data & privasi

Semua data tersimpan di `AndacalStorage` browser Anda — gak pernah dikirim ke server manapun. Artinya:
- ✅ Gak ada orang lain yang bisa lihat data Anda
- ⚠️ Clear cache/storage browser = data ilang — **rutin export backup JSON**
- ⚠️ Data gak sinkron antar device (memang sengaja, untuk saat ini)

## Lisensi

MIT — lihat [LICENSE](./LICENSE).
