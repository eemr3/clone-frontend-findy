export function cleanOffMask(value: string): string {
  return value?.replace(/\D/g, "")
}

export function maskPhone(value: string): string {
  value = value?.replace(/\D/g, "")
  return value?.replace(/^(\d{2})(\d{4}|\d{5})(\d{4}$)/, "($1) $2-$3")
}

export function getMaxLength(mask: string): number {
  return mask === "PHONE" ? 15 /* 10 */ : 524288
}