import type { ValueTransformer } from 'typeorm';

/**
 * Postgres returns bigint as a string so precision beyond 2^53 survives. Rial
 * amounts stay many orders of magnitude below that, so reading them back as
 * numbers is safe and keeps money arithmetic in the services plain.
 */
export const bigintToNumber: ValueTransformer = {
  to: (value: number | null | undefined) =>
    value == null || !Number.isFinite(Number(value)) ? value : Math.trunc(Number(value)),
  from: (value: string | number | null): number | null => {
    if (value === null || value === undefined) {
      return null;
    }
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  },
};
