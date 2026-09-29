import { site } from '@/config/site'

/**
 * Thin analytics wrapper. GA4 and the Meta Pixel load only when their IDs are set
 * in site.analytics AND the visitor has accepted the consent banner. Until then
 * track() is a no-op, so components can call it freely.
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
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

/** The Pixel stub that queues calls until fbevents.js loads and sets callMethod. */
type PixelStub = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  loaded: boolean
  version: string
  push: PixelStub
}

const CONSENT_KEY = 'shalinee-sen:analytics-consent'

export const analyticsConfigured = Boolean(site.analytics.ga4Id || site.analytics.metaPixelId)

export type Consent = 'granted' | 'denied'

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Choice applies to this visit only.
  }
  if (value === 'granted') {
    loadAnalytics()
    trackPageView()
  }
}

let loaded = false

/** Injects GA4 and the Meta Pixel. Safe to call repeatedly; does nothing without IDs or consent. */
export function loadAnalytics() {
  if (loaded || !analyticsConfigured || getConsent() !== 'granted') return
  loaded = true
  const { ga4Id, metaPixelId } = site.analytics

  if (ga4Id) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`
    document.head.appendChild(script)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', ga4Id, { send_page_view: false })
  }

  if (metaPixelId) {
    // Standard Meta Pixel bootstrap: queue calls until fbevents.js arrives.
    const fbq = Object.assign(
      (...args: unknown[]) => {
        if (fbq.callMethod) fbq.callMethod(...args)
        else fbq.queue.push(args)
      },
      { queue: [] as unknown[], loaded: true, version: '2.0' },
    ) as PixelStub
    fbq.push = fbq
    window.fbq = fbq
    window._fbq = fbq
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
    window.fbq('init', metaPixelId)
  }
}

export function trackPageView() {
  try {
    window.gtag?.('event', 'page_view', { page_location: window.location.href, page_path: window.location.pathname, page_title: document.title })
    window.fbq?.('track', 'PageView')
    if (import.meta.env.DEV) console.debug('[track] page_view', window.location.pathname)
  } catch {
    // Analytics must never break the page.
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
