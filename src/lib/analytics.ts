/**
 * Thin analytics wrapper. Sends each event to GA4 (gtag) and the Meta Pixel (fbq)
 * when they are loaded (see Phase 10 / site.analytics); otherwise it's a no-op,
 * so components can call track() freely.
 */

export type AnalyticsEvent =
  | 'cta_primary_click'
  | 'quiz_start'
  | 'quiz_complete'
  | 'lead_submitted'
  | 'result_cta_click'
  | 'clarity_call_booked'
  | 'whatsapp_click'
  | 'workshop_checkout_click'

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/** Meta Pixel standard events for the moments that matter to ad optimisation. */
const pixelStandardEvents: Partial<Record<AnalyticsEvent, string>> = {
  lead_submitted: 'Lead',
  clarity_call_booked: 'Schedule',
  workshop_checkout_click: 'InitiateCheckout',
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  try {
    window.gtag?.('event', event, params)
    const standard = pixelStandardEvents[event]
    if (standard) window.fbq?.('track', standard, params)
    else window.fbq?.('trackCustom', event, params)
    if (import.meta.env.DEV) console.debug('[track]', event, params)
  } catch {
    // Analytics must never break the page.
  }
}
