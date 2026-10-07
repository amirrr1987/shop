import type { ProductPriceMode } from './constants.js';

export function isSaleActive(
  salePrice: number | null | undefined,
  saleEndsAt: string | Date | null | undefined,
  compareAt?: number | null,
): boolean {
  if (
    salePrice == null ||
    !Number.isFinite(Number(salePrice)) ||
    Number(salePrice) < 0
  ) {
    return false;
  }
  if (compareAt != null && Number(salePrice) >= Number(compareAt)) {
    return false;
  }
  if (saleEndsAt != null && saleEndsAt !== '') {
    const t =
      typeof saleEndsAt === 'string' || saleEndsAt instanceof Date
        ? Date.parse(String(saleEndsAt))
        : NaN;
    if (!Number.isFinite(t) || t <= Date.now()) {
      return false;
    }
  }
  return true;
}

export function resolveUnitPrice(input: {
  price: number;
  priceMode: ProductPriceMode;
  salePrice: number | null | undefined;
  saleEndsAt: string | Date | null | undefined;
  variantPrice?: number | null;
}): { ok: false } | { ok: true; unitPrice: number } {
  if (input.priceMode === 'call') {
    return { ok: false as const };
  }
  const base =
    input.variantPrice != null ? Number(input.variantPrice) : Number(input.price);
  const unitPrice = isSaleActive(input.salePrice, input.saleEndsAt, base)
    ? Number(input.salePrice)
    : base;
  return { ok: true as const, unitPrice };
}
