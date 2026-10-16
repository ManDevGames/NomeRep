import { useEffect, useState } from 'react'
import { site } from '@/config/site'

/**
 * Site photos managed from a Google Sheet.
 *
 * The sheet has one row per photo slot with the columns `key`, `link` and (optionally) `alt`.
 * `key` matches the `photoKey` prop on <PhotoPlaceholder>; `link` is a Google Drive share link
 * (or any direct image URL). Change a link in the sheet and the site shows the new photo on
 * the next page load, no redeploy needed. See PLACEHOLDERS.md → "Photos" for the setup.
 */

export interface SheetPhoto {
  src: string
  alt?: string
}

export type PhotoMap = Record<string, SheetPhoto>

const CACHE_KEY = 'shalinee-sen:photos'

/**
 * Accepts the sheet's normal browser URL (shared as "Anyone with the link can view")
 * or a "Publish to web" CSV link, and returns a URL that downloads the first tab as CSV.
 */
export function sheetCsvUrl(url: string): string {
  if (url.includes('/pub')) return url
  const id = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)?.[1]
  if (!id) return url
  const gid = url.match(/[#&?]gid=(\d+)/)?.[1]
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv${gid ? `&gid=${gid}` : ''}`
}

/** Turns any Google Drive file link into a URL an <img> can display. Other URLs pass through. */
export function driveImageUrl(link: string, width = 1600): string {
  const trimmed = link.trim()
  if (!/drive\.google\.com|docs\.google\.com/.test(trimmed)) return trimmed
  const id = trimmed.match(/\/d\/([a-zA-Z0-9_-]{10,})/)?.[1] ?? trimmed.match(/[?&]id=([a-zA-Z0-9_-]{10,})/)?.[1]
  return id ? `https://lh3.googleusercontent.com/d/${id}=w${width}` : trimmed
}

/** Minimal CSV parser: quoted fields, escaped quotes ("") and newlines inside quotes. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        quoted = false
      } else {
        field += ch
      }
    } else if (ch === '"') {
      quoted = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += ch
    }
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

export function parsePhotoSheet(csv: string): PhotoMap {
  const [header, ...rows] = parseCsv(csv)
  if (!header) return {}
  const col = (name: string) => header.findIndex((h) => h.trim().toLowerCase() === name)
  const keyCol = col('key')
  const linkCol = col('link')
  const altCol = col('alt')
  if (keyCol < 0 || linkCol < 0) {
    console.warn('[photos] The photo sheet needs "key" and "link" columns in its first row.')
    return {}
  }

  const photos: PhotoMap = {}
  for (const row of rows) {
    const key = row[keyCol]?.trim()
    const link = row[linkCol]?.trim()
    if (!key || !link) continue
    const alt = altCol >= 0 ? row[altCol]?.trim() : undefined
    photos[key] = { src: driveImageUrl(link), alt: alt || undefined }
  }
  return photos
}

function loadCached(): PhotoMap {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as PhotoMap) : {}
  } catch {
    return {}
  }
}

// Last known photos, so repeat visitors see images at once while the sheet is re-read.
let photos: PhotoMap = site.photoSheetUrl ? loadCached() : {}
let request: Promise<void> | null = null
const listeners = new Set<() => void>()

function fetchPhotos(): Promise<void> {
  request ??= fetch(sheetCsvUrl(site.photoSheetUrl), { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.text()
    })
    .then((csv) => {
      photos = parsePhotoSheet(csv)
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(photos))
      } catch {
        // Storage full or blocked: photos still show for this visit.
      }
      listeners.forEach((notify) => notify())
    })
    .catch((error) => {
      console.error('[photos] Could not load the photo sheet. Is it shared as "Anyone with the link"?', error)
    })
  return request
}

/** The photo for a sheet key, or undefined while loading / when the row is empty. */
export function useSheetPhoto(key: string | undefined): SheetPhoto | undefined {
  const [, rerender] = useState(0)

  useEffect(() => {
    if (!key || !site.photoSheetUrl) return
    const notify = () => rerender((n) => n + 1)
    listeners.add(notify)
    void fetchPhotos()
    return () => {
      listeners.delete(notify)
    }
  }, [key])

  return key ? photos[key] : undefined
}
