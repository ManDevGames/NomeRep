const STORAGE_KEY = 'shalinee-sen:utm'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>

/** Call once on page load: remembers the first UTM parameters of the visit so later leads can carry them. */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search)
    const found: UtmParams = {}
    for (const key of UTM_KEYS) {
      const value = params.get(key)
      if (value) found[key] = value.slice(0, 200)
    }
    if (Object.keys(found).length > 0 && !sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
    }
  } catch {
    // Storage unavailable — leads just go without UTM data.
  }
}

export function getUtm(): UtmParams {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as UtmParams
  } catch {
    return {}
  }
}
