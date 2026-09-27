import type { VideoHighlight } from '@/types'

/**
 * Google Sheet that controls the video highlights. When set, edits in the sheet
 * go live on the next page load — no code change or redeploy.
 * Paste the sheet's normal share link (shared as "Anyone with the link can view")
 * or a "Publish to web" CSV link. Labels: url | title | subtitle | title_hi | subtitle_hi | thumbnail
 * — across the first row (one video per row) or down column A (one video per column).
 * Leave empty to use the list below.
 */
export const VIDEOS_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/189RXZdqvjc7-rvEZYiRifQiu08XoTgBn770Rm9VAK90/edit?usp=sharing'

// Backup list: shown when no sheet is set, or if the sheet can't be reached.
// Paste any YouTube link into `url`; `thumbnail` is optional (an image URL or a
// file in /public, e.g. '/thumbs/intro.jpg'). `titleHi` / `subtitleHi` are
// optional Hindi versions shown when the site is in Hindi.
export const videoHighlights: VideoHighlight[] = [
  {
    id: 'v1',
    title: 'Why we repeat the same relationship patterns',
    subtitle: 'Understanding the loop',
    titleHi: 'एक ही रिलेशनशिप पैटर्न हम बार-बार क्यों दोहराते हैं',
    subtitleHi: 'इस चक्र को समझें',
    url: 'https://www.youtube.com/watch?v=_0fx-UAzPSU',
  },
  {
    id: 'v2',
    title: 'How to have a hard conversation calmly',
    subtitle: 'Communication',
    titleHi: 'मुश्किल बातचीत शांति से कैसे करें',
    subtitleHi: 'बातचीत',
    url: 'https://youtu.be/4xQYG_UYUHM?si=39veki3449-U-0Qx',
  },
  {
    id: 'v3',
    title: 'Setting boundaries without guilt',
    subtitle: 'Boundaries',
    titleHi: 'बिना अपराध-बोध के सीमाएँ कैसे तय करें',
    subtitleHi: 'सीमाएँ',
    url: 'https://www.youtube.com/watch?v=_ofLi0cegjg',
  },
  {
    id: 'v4',
    title: 'What a secure relationship actually looks like',
    subtitle: 'Personal growth',
    titleHi: 'एक सुरक्षित रिश्ता असल में कैसा दिखता है',
    subtitleHi: 'निजी विकास',
    url: 'https://www.youtube.com/watch?v=YY-zNTvqg3s',
  },
]
