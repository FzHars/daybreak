export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function monthLabel(d: Date): string {
  return d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

export function daysInMonth(year: number, monthIndex0: number): number {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}
