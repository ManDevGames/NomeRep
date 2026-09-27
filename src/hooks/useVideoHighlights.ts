import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/context/language'
import { VIDEOS_SHEET_CSV_URL, videoHighlights as fallbackVideos } from '@/data/videos'
import { parseCsv } from '@/utils/csv'
import { getYouTubeId } from '@/utils/youtube'
import type { VideoHighlight } from '@/types'

const CACHE_KEY = 'relationship-guide:video-highlights'

/**
 * Accepts any Google Sheets link. A normal share/edit link is turned into its CSV
 * export (works when the sheet is shared as "anyone with the link"); published
 * CSV links and non-Google URLs are used as-is.
 */
function toCsvUrl(link: string): string {
  const match = link.match(/docs\.google\.com\/spreadsheets\/d\/([\w-]+)/)
  if (!match || match[1] === 'e') return link
  const gid = link.match(/[#&?]gid=(\d+)/)?.[1]
  return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv${gid ? `&gid=${gid}` : ''}`
}

const LABELS = ['url', 'title', 'subtitle', 'title_hi', 'subtitle_hi', 'thumbnail']
const countLabels = (cells: (string | undefined)[]) =>
  cells.filter((c) => LABELS.includes(c?.trim().toLowerCase() ?? '')).length

/** Swaps rows and columns, padding short rows. */
function transpose(grid: string[][]): string[][] {
  const width = Math.max(0, ...grid.map((row) => row.length))
  return Array.from({ length: width }, (_, c) => grid.map((row) => row[c] ?? ''))
}

/**
 * Turns the sheet into videos. Labels are matched by name (case-insensitive):
 *   url | title | subtitle | title_hi | subtitle_hi | thumbnail
 * Either layout works: labels across the first row (one video per row), or
 * labels down the first column (one video per column). Entries without a url
 * or with a link that isn't a YouTube video are skipped, so blank rows/columns are fine.
 */
function videosFromCsv(text: string): VideoHighlight[] {
  const grid = parseCsv(text)
  // Whichever edge holds more labels is the header; ties (e.g. only "url" in A1) mean labels across the top.
  const labelsDownFirstColumn = countLabels(grid.map((row) => row[0])) > countLabels(grid[0] ?? [])
  const [header, ...rows] = labelsDownFirstColumn ? transpose(grid) : grid
  if (!header) return []

  const col = (name: string) => header.findIndex((h) => h.trim().toLowerCase() === name)
  const idx = {
    url: col('url'),
    title: col('title'),
    subtitle: col('subtitle'),
    titleHi: col('title_hi'),
    subtitleHi: col('subtitle_hi'),
    thumbnail: col('thumbnail'),
  }
  const cell = (row: string[], i: number) => (i >= 0 ? row[i]?.trim() || undefined : undefined)

  return rows.flatMap((row, i) => {
    const url = cell(row, idx.url)
    if (!url || !getYouTubeId(url)) return []
    return [
      {
        id: `sheet-${i}`,
        url,
        title: cell(row, idx.title) ?? '',
        subtitle: cell(row, idx.subtitle),
        titleHi: cell(row, idx.titleHi),
        subtitleHi: cell(row, idx.subtitleHi),
        thumbnail: cell(row, idx.thumbnail),
      },
    ]
  })
}

function loadCached(): VideoHighlight[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as VideoHighlight[]) : null
  } catch {
    return null
  }
}

/**
 * Video highlights in the active language. When a Google Sheet is configured,
 * it's fetched on every visit so edits go live without a redeploy; the last
 * good copy is cached for instant rendering, and `videos.ts` is the fallback
 * if the sheet is unreachable or empty.
 */
export function useVideoHighlights(): VideoHighlight[] {
  const { lang } = useLanguage()
  const [videos, setVideos] = useState<VideoHighlight[]>(() =>
    VIDEOS_SHEET_CSV_URL ? (loadCached() ?? fallbackVideos) : fallbackVideos,
  )

  useEffect(() => {
    if (!VIDEOS_SHEET_CSV_URL) return
    let cancelled = false

    fetch(toCsvUrl(VIDEOS_SHEET_CSV_URL), { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Sheet request failed: ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const fromSheet = videosFromCsv(text)
        if (cancelled || fromSheet.length === 0) return
        setVideos(fromSheet)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(fromSheet))
        } catch {
          // Storage unavailable — videos still show for this visit.
        }
      })
      .catch(() => {
        // Keep showing the cached or built-in videos.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(
    () =>
      lang === 'hi'
        ? videos.map((v) => ({ ...v, title: v.titleHi || v.title, subtitle: v.subtitleHi || v.subtitle }))
        : videos,
    [videos, lang],
  )
}
