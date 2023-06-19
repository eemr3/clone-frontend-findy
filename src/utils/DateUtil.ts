export function calculateYears(date: Date, years: number): Date {
  date.setFullYear(date.getFullYear() + years);
  return date;
}

export function calculateMonths(date: Date, months: number): Date {
  date.setMonth(date.getMonth() + months);
  return date;
}

export function calculateDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}

export function isDate(date: string) {
  return new Date(date).toString() !== 'Invalid Date';
}