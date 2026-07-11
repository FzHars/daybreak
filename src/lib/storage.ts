import type { AllDaysData, DayState } from '../types';

// Semua data disimpan di SATU key localStorage (bukan per-hari) supaya
// baca/tulis selalu satu operasi utuh — lebih aman dari korup data
// dibanding banyak key terpisah.
const STORAGE_KEY = 'daybreak:v1';

export function loadAllDays(): AllDaysData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    return parsed as AllDaysData;
  } catch (err) {
    console.error('Gagal baca data tracker dari localStorage:', err);
    return {};
  }
}

export function saveAllDays(data: AllDaysData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    // localStorage bisa gagal karena private/incognito mode atau kuota penuh
    console.error('Gagal simpan data tracker ke localStorage:', err);
    return false;
  }
}

export function saveDayState(isoDate: string, state: DayState): AllDaysData {
  const all = loadAllDays();
  all[isoDate] = state;
  saveAllDays(all);
  return all;
}

export function isStorageAvailable(): boolean {
  try {
    const testKey = '__daybreak_storage_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
