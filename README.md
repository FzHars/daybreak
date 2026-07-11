# 🌅 Daybreak

**A privacy-first daily habit tracker anchored around Fajr prayer.**
No login. No server. No database. All your data stays in your browser.

🇬🇧 English | [🇮🇩 Bahasa Indonesia](./README.id.md)

---

## Why Daybreak

Most habit trackers push you to sign up, hand over your data, and pay a subscription just to check a box. Daybreak does the opposite: open the app, start checking things off. Your data never leaves your device.

The structure follows five daily prayer times as natural anchors for the day — a rhythm many people already live by — combined with a developer-familiar GitHub-style contribution graph to visualize consistency over time.

## Features

- ✅ Daily checklist with customizable items and time slots
- 🔥 Streak tracking (consecutive days hitting your target)
- 📊 Monthly contribution graph (GitHub-style)
- 📄 Export full history as a **PDF report**
- 💾 Export/import as **JSON** for manual backup
- 🔒 No accounts, no tracking, no backend — 100% client-side

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) for PDF export
- `localStorage` for persistence — no database, no API

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Deploy

Output is fully static (`dist/`), so it can be deployed anywhere that serves static files.

**Recommended: Cloudflare Pages** (free tier allows commercial use, unlimited bandwidth):

```bash
npm run build
npx wrangler pages deploy dist
```

Or connect the repo via the Cloudflare dashboard: **Workers & Pages → Create Application → Pages → Connect to Git**, with build command `npm run build` and output directory `dist`.

> Avoid Vercel's Hobby plan if this is meant to be used publicly — its Terms of Service restrict the free tier to personal/non-commercial use.

Security headers (CSP, X-Frame-Options, etc.) are pre-configured in `public/_headers` and apply automatically on Cloudflare Pages.

## Customizing your checklist

Edit `src/data/items.ts` — add, remove, or reorder items. Everything else (grouping, rendering, stats) adapts automatically.

```ts
{ id: 'subuh', label: 'Fajr prayer', time: '04:30', group: 'Dawn' }
```

## Project structure

```
daybreak/
├── public/
│   └── _headers                  # CSP & security headers (Cloudflare Pages)
├── src/
│   ├── components/
│   │   ├── ChecklistItem.tsx     # single checklist row
│   │   ├── StatsBar.tsx          # streak / monthly % cards
│   │   ├── ContributionGrid.tsx  # GitHub-style contribution graph
│   │   └── BackupControls.tsx    # export JSON / import / export PDF
│   ├── data/items.ts             # daily checklist config — edit here
│   ├── hooks/useTracker.ts       # core state: streak, stats, toggling
│   ├── lib/
│   │   ├── storage.ts            # localStorage wrapper with error handling
│   │   ├── date.ts
│   │   └── pdfExport.ts          # PDF history report generator
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Tailwind + theme tokens
├── index.html
└── package.json
```

## Data & privacy

All data lives in your browser's `localStorage` — nothing is ever sent to a server. This means:
- ✅ Nobody but you can see your data
- ⚠️ Clearing your browser cache/storage deletes it — **export a JSON backup regularly**
- ⚠️ Data doesn't sync across devices (by design, for now)

## License

MIT — see [LICENSE](./LICENSE).
