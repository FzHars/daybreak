import { useCallback, useMemo, useState } from 'react';
import { ITEMS, THRESHOLD } from '../data/items';
import { isoDate, pad } from '../lib/date';
import { loadAllDays, saveDayState } from '../lib/storage';
import type { AllDaysData, MonthStat } from '../types';

export function useTracker() {
  const today = useMemo(() => new Date(), []);
  const todayKey = isoDate(today);

  const [allDays, setAllDays] = useState<AllDaysData>(() => loadAllDays());

  const todayState = allDays[todayKey] ?? {};

  const toggleItem = useCallback(
    (itemId: string) => {
      const current = allDays[todayKey] ?? {};
      const next = { ...current, [itemId]: !current[itemId] };
      const updatedAll = saveDayState(todayKey, next);
      setAllDays({ ...updatedAll });
    },
    [allDays, todayKey]
  );

  // rasio penyelesaian per tanggal, dipakai buat grafik & streak
  const ratioByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const [date, state] of Object.entries(allDays)) {
      const done = ITEMS.filter((it) => state[it.id]).length;
      map[date] = done / ITEMS.length;
    }
    return map;
  }, [allDays]);

  const streak = useMemo(() => {
    let count = 0;
    const cursor = new Date(today);
    // hari ini tidak memutus streak walau belum selesai — baru dicek mulai kemarin
    let firstIteration = true;
    while (true) {
      const key = isoDate(cursor);
      const ratio = ratioByDate[key];
      if (firstIteration && key === todayKey) {
        firstIteration = false;
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      if (ratio !== undefined && ratio >= THRESHOLD) {
        count++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [ratioByDate, today, todayKey]);

  const monthStat: MonthStat = useMemo(() => {
    const y = today.getFullYear();
    const m = today.getMonth();
    let total = 0;
    let hit = 0;
    for (let day = 1; day <= today.getDate(); day++) {
      const key = `${y}-${pad(m + 1)}-${pad(day)}`;
      total++;
      if ((ratioByDate[key] ?? 0) >= THRESHOLD) hit++;
    }
    return { hit, total, pct: total ? Math.round((hit / total) * 100) : 0 };
  }, [ratioByDate, today]);

  const importData = useCallback((data: AllDaysData) => {
    const merged = { ...loadAllDays(), ...data };
    for (const [date, state] of Object.entries(merged)) {
      saveDayState(date, state);
    }
    setAllDays(merged);
  }, []);

  return {
    today,
    todayKey,
    todayState,
    allDays,
    ratioByDate,
    streak,
    monthStat,
    toggleItem,
    importData,
  };
}
