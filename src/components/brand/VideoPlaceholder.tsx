import { useState } from 'react'
import { Play } from 'lucide-react'
import { useLanguage } from '@/context/language'
import { getYouTubeEmbedUrl, getYouTubeId, getYouTubeThumbnail } from '@/utils/youtube'

interface VideoPlaceholderProps {
  /** What video belongs here, e.g. "60-sec intro video from Shalinee". */
  label: string
  /** Any YouTube URL. Shows a thumbnail that loads the player on tap. */
  youtubeUrl?: string
  /** A self-hosted video file (mp4/webm). */
  videoSrc?: string
  className?: string
}

export function VideoPlaceholder({ label, youtubeUrl, videoSrc, className = '' }: VideoPlaceholderProps) {
  const { t } = useLanguage()
  const [playing, setPlaying] = useState(false)
  const youtubeId = youtubeUrl ? getYouTubeId(youtubeUrl) : null
  const frame = `relative aspect-video w-full overflow-hidden rounded-3xl ${className}`

  if (youtubeId) {
    return (
      <div className={`${frame} bg-charcoal-900`}>
        {playing ? (
          <iframe
            src={getYouTubeEmbedUrl(youtubeId)}
            title={label}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`${t('Play', 'चलाएँ')}: ${label}`} className="group absolute inset-0">
            <img src={getYouTubeThumbnail(youtubeId)} alt="" loading="lazy" className="h-full w-full object-cover" />
            <PlayCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream-50/90 text-rose-500 group-hover:scale-105" />
          </button>
        )}
      </div>
    )
  }

  if (videoSrc) {
    return (
      <div className={`${frame} bg-charcoal-900`}>
        <video src={videoSrc} controls preload="metadata" aria-label={label} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`${frame} flex flex-col items-center justify-center gap-4 border border-dashed border-rose-200 bg-blush-50 p-6 text-center`}
    >
      <PlayCircle className="bg-rose-100 text-rose-500" />
      <span className="max-w-xs text-xs leading-relaxed text-charcoal-500">{label}</span>
    </div>
  )
}

function PlayCircle({ className = '' }: { className?: string }) {
  return (
    <span className={`flex h-16 w-16 items-center justify-center rounded-full shadow-soft transition-transform ${className}`}>
      <Play size={26} className="ml-1" fill="currentColor" aria-hidden="true" />
    </span>
  )
}
