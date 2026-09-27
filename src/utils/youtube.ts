/** Extracts the 11-character video id from any common YouTube URL format. */
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  )
  if (match) return match[1]
  return /^[A-Za-z0-9_-]{11}$/.test(url) ? url : null
}

export function getYouTubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export function getYouTubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
}
