export const CURRENCY_UNITS = ['rial', 'toman', 'k-toman'] as const;

export type CurrencyUnit = (typeof CURRENCY_UNITS)[number];

export const CURRENCY_UNIT_LABELS_FA: Record<CurrencyUnit, string> = {
  rial: 'ریال',
  toman: 'تومان',
  'k-toman': 'هزار تومان',
};

const CURRENCY_UNIT_FACTORS: Record<CurrencyUnit, number> = {
  rial: 1,
  toman: 10,
  'k-toman': 10_000,
};

/** Convert a display-unit amount to integer rials. */
export function toRial(amount: number, unit: CurrencyUnit): number {
  if (unit === 'k-toman') {
    return Math.round(amount * 10_000);
  }
  return Math.round(amount * CURRENCY_UNIT_FACTORS[unit]);
}

/** Convert integer rials to a display-unit amount (may be decimal for k-toman). */
export function fromRial(rial: number, unit: CurrencyUnit): number {
  return rial / CURRENCY_UNIT_FACTORS[unit];
}

export function formatNumber(n: number): string {
  return n.toLocaleString('fa-IR');
}

export function formatMoney(rial: number, unit: CurrencyUnit): string {
  return `${formatNumber(fromRial(rial, unit))} ${CURRENCY_UNIT_LABELS_FA[unit]}`;
}
