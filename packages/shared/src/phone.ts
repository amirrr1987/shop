/** Normalize Iranian mobile to `09xxxxxxxxx`, or null if invalid. */
export function normalizeIranMobile(raw: string): string | null {
  const digits = String(raw ?? '').replace(/\D/g, '');
  let normalized = digits;

  if (normalized.startsWith('0098')) {
    normalized = normalized.slice(4);
  } else if (normalized.startsWith('98') && normalized.length === 12) {
    normalized = normalized.slice(2);
  }

  if (normalized.length === 10 && normalized.startsWith('9')) {
    normalized = `0${normalized}`;
  }

  return /^09\d{9}$/.test(normalized) ? normalized : null;
}
