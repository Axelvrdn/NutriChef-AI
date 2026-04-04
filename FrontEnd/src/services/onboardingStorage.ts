const ONBOARDING_PENDING_KEY = "nutriflow_onboarding_pending";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function markOnboardingPending(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(ONBOARDING_PENDING_KEY, "true");
}

export function clearOnboardingPending(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ONBOARDING_PENDING_KEY);
}

export function isOnboardingPending(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(ONBOARDING_PENDING_KEY) === "true";
}
