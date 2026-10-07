export function resolveShippingCost(
  method: { price: number; freeAbove: number | null },
  subtotal: number,
): number {
  return method.freeAbove != null && subtotal >= method.freeAbove
    ? 0
    : method.price;
}
