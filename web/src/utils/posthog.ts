import posthog from 'posthog-js';
import { Cookies, getCookieConsentValue, resetCookieConsentValue } from 'react-cookie-consent';

export { usePostHog } from '@posthog/react';
export { posthog };

export const COOKIE_CONSENT_NAME = 'sb_cookie_consent';

/**
 * Checks whether user has explicitly given consent to cookies/analytics.
 */
export function hasConsent(): boolean {
  return getCookieConsentValue(COOKIE_CONSENT_NAME) === 'true';
}

/**
 * Checks whether user has already made any decision (accepted or declined).
 */
export function isConsentDecided(): boolean {
  const val = getCookieConsentValue(COOKIE_CONSENT_NAME);
  return val === 'true' || val === 'false';
}

/**
 * Returns the current consent status: 'accepted', 'declined', or 'undecided'.
 */
export function getConsentStatus(): 'accepted' | 'declined' | 'undecided' {
  const val = getCookieConsentValue(COOKIE_CONSENT_NAME);
  if (val === 'true') return 'accepted';
  if (val === 'false') return 'declined';
  return 'undecided';
}

/**
 * User consented to cookies: saves consent cookie and enables PostHog capturing.
 */
export function acceptCookies(): void {
  try {
    Cookies.set(COOKIE_CONSENT_NAME, 'true', { expires: 365, sameSite: 'lax' });
    posthog.opt_in_capturing();
  } catch (error) {
    console.warn('[PostHog] Failed to opt in capturing:', error);
  }
}

/**
 * User declined cookies: saves decline cookie and disables PostHog capturing.
 */
export function declineCookies(): void {
  try {
    Cookies.set(COOKIE_CONSENT_NAME, 'false', { expires: 365, sameSite: 'lax' });
    posthog.opt_out_capturing();
  } catch (error) {
    console.warn('[PostHog] Failed to opt out capturing:', error);
  }
}

/**
 * Saves granular cookie preferences: enables PostHog if analytics is true, otherwise opts out.
 */
export function saveCookiePreferences(analytics: boolean): void {
  if (analytics) {
    acceptCookies();
  } else {
    declineCookies();
  }
}

/**
 * Synchronizes PostHog's internal state with the saved consent cookie on startup.
 */
export function syncCookieConsent(): void {
  try {
    const consent = getCookieConsentValue(COOKIE_CONSENT_NAME);
    if (consent === 'true') {
      posthog.opt_in_capturing();
    } else if (consent === 'false') {
      posthog.opt_out_capturing();
    }
  } catch (error) {
    console.warn('[PostHog] Failed to sync consent:', error);
  }
}

/**
 * Resets cookie consent, allowing the modal to be shown again.
 */
export function resetCookieConsent(): void {
  try {
    resetCookieConsentValue(COOKIE_CONSENT_NAME);
    posthog.opt_out_capturing();
  } catch (error) {
    console.warn('[PostHog] Failed to reset cookie consent:', error);
  }
}

/**
 * Safely captures a custom PostHog event if user has not opted out.
 * Can be used in both React and non-React contexts.
 */
export function captureEvent(eventName: string, properties?: Record<string, unknown>): void {
  try {
    if (posthog.__loaded && !posthog.has_opted_out_capturing()) {
      posthog.capture(eventName, properties);
    }
  } catch (error) {
    console.warn('[PostHog] Failed to capture event:', eventName, error);
  }
}

/**
 * Identifies the currently logged-in user in PostHog.
 */
export function identifyUser(userId: string | number, traits?: Record<string, unknown>): void {
  try {
    if (posthog.__loaded && !posthog.has_opted_out_capturing()) {
      posthog.identify(String(userId), traits);
    }
  } catch (error) {
    console.warn('[PostHog] Failed to identify user:', error);
  }
}

/**
 * Resets the PostHog session upon logout to unlink future events from the previous user.
 * Preserves cookie consent choice if the user previously accepted cookies.
 */
export function resetUser(): void {
  try {
    posthog.reset();
    if (hasConsent()) {
      posthog.opt_in_capturing();
    }
  } catch (error) {
    console.warn('[PostHog] Failed to reset user:', error);
  }
}
