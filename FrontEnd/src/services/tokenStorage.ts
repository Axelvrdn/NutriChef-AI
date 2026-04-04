const ACCESS_TOKEN_KEY = "nutriflow_access_token";
const REFRESH_TOKEN_KEY = "nutriflow_refresh_token";
const EXPIRES_AT_KEY = "nutriflow_expires_at";

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function setCookie(name: string, value: string, maxAge: number): void {
  if (!isBrowser()) return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function removeCookie(name: string): void {
  if (!isBrowser()) return;
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export function storeAuthTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
  if (!isBrowser()) return;
  const expiresAt = String(Date.now() + expiresIn * 1000);
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  window.localStorage.setItem(EXPIRES_AT_KEY, expiresAt);

  setCookie(ACCESS_TOKEN_KEY, accessToken, expiresIn);
  setCookie(REFRESH_TOKEN_KEY, refreshToken, ONE_WEEK_SECONDS);
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearAuthTokens(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(EXPIRES_AT_KEY);
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
}
