export interface TrackerItem {
  id: string;
  label: string;
  time: string;
  group: string;
}

// state per hari: id item -> selesai atau tidak
export type DayState = Record<string, boolean>;

// seluruh data: "YYYY-MM-DD" -> DayState
export type AllDaysData = Record<string, DayState>;

export interface MonthStat {
  hit: number;
  total: number;
  pct: number;
}
