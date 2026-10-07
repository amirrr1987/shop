/**
 * Formats a rial amount with the active store/customer display unit.
 * Prefer `const { formatPrice } = useCurrency()` in `<script setup>` when possible.
 */
export function formatPrice(amount: number) {
  return useCurrency().formatPrice(amount)
}
