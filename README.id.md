# 🌅 Daybreak

**Tracker kebiasaan harian yang mengutamakan privasi, berpatokan pada waktu sholat Subuh.**
Tanpa login. Tanpa server. Tanpa database. Semua data tetap di browser lo.

[🇬🇧 English](./README.md) | 🇮🇩 Bahasa Indonesia

---

## Kenapa Daybreak

Kebanyakan habit tracker maksa lo daftar akun, nyerahin data, bahkan bayar langganan cuma buat centang checklist harian. Daybreak sebaliknya: buka app, langsung centang. Data lo gak pernah keluar dari device.

Strukturnya ngikutin lima waktu sholat sebagai jangkar alami tiap hari — ritme yang udah dijalani banyak orang — digabung sama grafik kontribusi ala GitHub yang familiar buat developer, buat visualisasi konsistensi dari waktu ke waktu.

## Fitur

- ✅ Checklist harian, item & jam bisa dikustomisasi
- 🔥 Streak tracking (berapa hari berturut-turut lo capai target)
- 📊 Grafik kontribusi bulanan (ala GitHub)
- 📄 Export seluruh riwayat jadi **laporan PDF**
- 💾 Export/import **JSON** buat backup manual
- 🔒 Tanpa akun, tanpa tracking, tanpa backend — 100% jalan di sisi client

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) buat export PDF
- `localStorage` buat penyimpanan — tanpa database, tanpa API

## Cara jalanin

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build produksi -> dist/
npm run preview   # preview hasil build secara lokal
```

## Deploy

Output-nya pure static (`dist/`), jadi bisa dideploy ke mana aja yang bisa serve file statis.

**Rekomendasi: Cloudflare Pages** (free tier boleh dipakai komersial, bandwidth unlimited):

```bash
npm run build
npx wrangler pages deploy dist
```

Atau connect repo lewat dashboard Cloudflare: **Workers & Pages → Create Application → Pages → Connect to Git**, dengan build command `npm run build` dan output directory `dist`.

> Hindari Vercel Hobby plan kalau tujuannya buat publik — ToS-nya membatasi free tier cuma buat penggunaan personal/non-komersial.

Header keamanan (CSP, X-Frame-Options, dll) udah dikonfigurasi di `public/_headers` dan otomatis aktif di Cloudflare Pages.

## Kustomisasi checklist

Edit `src/data/items.ts` — tambah, hapus, atau urutin ulang item. Bagian lain (grouping, tampilan, statistik) otomatis menyesuaikan.

```ts
{ id: 'subuh', label: 'Sholat Subuh', time: '04:30', group: 'Fajr' }
```

## Struktur project

```
daybreak/
├── public/
│   └── _headers                  # header CSP & keamanan (Cloudflare Pages)
├── src/
│   ├── components/
│   │   ├── ChecklistItem.tsx     # satu baris checklist
│   │   ├── StatsBar.tsx          # kartu streak / persen bulanan
│   │   ├── ContributionGrid.tsx  # grafik kontribusi ala GitHub
│   │   └── BackupControls.tsx    # tombol export JSON / import / export PDF
│   ├── data/items.ts             # konfigurasi checklist harian — edit di sini
│   ├── hooks/useTracker.ts       # state utama: streak, statistik, toggle
│   ├── lib/
│   │   ├── storage.ts            # wrapper localStorage dengan error handling
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

Semua data tersimpan di `localStorage` browser lo — gak pernah dikirim ke server manapun. Artinya:
- ✅ Gak ada orang lain yang bisa lihat data lo
- ⚠️ Clear cache/storage browser = data ilang — **rutin export backup JSON**
- ⚠️ Data gak sinkron antar device (memang sengaja, untuk saat ini)

## Lisensi

MIT — lihat [LICENSE](./LICENSE).
