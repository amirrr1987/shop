export const AUTH_CLIENT_HEADER = 'x-shop-client';

export type AuthClient = 'web' | 'panel';

/** Storefront cookies (localhost:3000). */
export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

/** Admin panel cookies (localhost:5173) — separate so sessions do not clash on localhost. */
export const ACCESS_TOKEN_COOKIE_PANEL = 'access_token_panel';
export const REFRESH_TOKEN_COOKIE_PANEL = 'refresh_token_panel';

export function resolveAuthClient(headerValue: unknown): AuthClient {
  const raw = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  if (typeof raw === 'string' && raw.trim().toLowerCase() === 'panel') {
    return 'panel';
  }
  return 'web';
}

export function accessCookieName(client: AuthClient): string {
  return client === 'panel' ? ACCESS_TOKEN_COOKIE_PANEL : ACCESS_TOKEN_COOKIE;
}

export function refreshCookieName(client: AuthClient): string {
  return client === 'panel' ? REFRESH_TOKEN_COOKIE_PANEL : REFRESH_TOKEN_COOKIE;
}
