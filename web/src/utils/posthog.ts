import posthog from 'posthog-js';
export { usePostHog } from '@posthog/react';
export { posthog };

/**
 * Safely captures a custom PostHog event.
 * Can be used in both React and non-React contexts.
 */
export function captureEvent(eventName: string, properties?: Record<string, unknown>): void {
  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    console.warn('[PostHog] Failed to capture event:', eventName, error);
  }
}

/**
 * Identifies the currently logged-in user in PostHog.
 */
export function identifyUser(userId: string | number, traits?: Record<string, unknown>): void {
  try {
    posthog.identify(String(userId), traits);
  } catch (error) {
    console.warn('[PostHog] Failed to identify user:', error);
  }
}

/**
 * Resets the PostHog session upon logout to unlink future events from the previous user.
 */
export function resetUser(): void {
  try {
    posthog.reset();
  } catch (error) {
    console.warn('[PostHog] Failed to reset user:', error);
  }
}
