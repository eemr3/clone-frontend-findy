import { string } from "yup";

export const { format: formatDateISO } = Intl.DateTimeFormat('sv-SE', {
  dateStyle: 'short',
});

export const { format: formatDateBR } = Intl.DateTimeFormat("pt-br", {
  timeZone: 'UTC'
});


export function getCountryNames(code: string): string {
  if (code.length != 2)
    return '';

  const countryName = new Intl.DisplayNames(['pt-br'], { type: 'region' });
  return countryName.of(code) ?? '';
}