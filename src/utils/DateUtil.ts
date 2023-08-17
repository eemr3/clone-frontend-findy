export function calculateYears(date: Date, years: number): Date {
  return new Date(new Date(date).setFullYear(date.getFullYear() + years));
}

export function calculateMonths(date: Date, months: number): Date {
  return new Date(new Date(date).setMonth(date.getMonth() + months));
}

export function calculateDays(date: Date, days: number): Date {
  return new Date(new Date(date).setDate(date.getDate() + days));
}

export function isDate(date: string) {
  return new Date(date).toString() !== 'Invalid Date';
}
