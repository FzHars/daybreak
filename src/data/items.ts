import type { TrackerItem } from '../types';

export const ITEMS: TrackerItem[] = [
  { id: 'subuh',    label: 'Sholat Subuh',     time: '04:30',        group: 'Fajr — titik nol' },
  { id: 'olahraga', label: 'Olahraga ringan',   time: '04:40',        group: 'Fajr — titik nol' },
  { id: 'jepang',   label: 'Bahasa Jepang',     time: '05:00–06:00',  group: 'Fajr — titik nol' },
  { id: 'kucing',   label: 'Main sama kucing',  time: '06:00',        group: 'Pagi — buka sesi' },
  { id: 'coding',   label: 'Deep work coding',  time: '07:00–11:30',  group: 'Pagi — buka sesi' },
  { id: 'dzuhur',   label: 'Sholat Dzuhur',     time: '12:00',        group: 'Siang' },
  { id: 'ashar',    label: 'Sholat Ashar',      time: '15:30',        group: 'Sore — tutup sesi' },
  { id: 'english',  label: 'English practice',  time: '15:30–17:00',  group: 'Sore — tutup sesi' },
];

// >= threshold dianggap "hari berhasil"
export const THRESHOLD = 0.75;
