import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Play, X } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'
import { getYouTubeEmbedUrl, getYouTubeId, getYouTubeThumbnail } from '@/utils/youtube'
import type { VideoHighlight } from '@/types'

interface ResolvedVideo extends VideoHighlight {
  youtubeId: string
  thumbnailSrc: string
}

// Seconds each card takes to scroll past; keeps speed constant regardless of video count.
const SECONDS_PER_CARD = 6
// Ensures the track is wide enough to loop seamlessly even with only a few videos.
const MIN_CARDS_PER_LOOP = 6

export function VideoHighlightsSection() {
  const { videos: videoHighlights } = useContent()
  const { t } = useLanguage()
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const videos = useMemo<ResolvedVideo[]>(
    () =>
      videoHighlights.flatMap((v) => {
        const youtubeId = getYouTubeId(v.url)
        if (!youtubeId) return []
        return [{ ...v, youtubeId, thumbnailSrc: v.thumbnail ?? getYouTubeThumbnail(youtubeId) }]
      }),
    [videoHighlights],
  )
  // Looked up by id so the player title follows a language switch while it's open.
  const activeVideo = videos.find((v) => v.id === activeVideoId) ?? null

  if (videos.length === 0) return null

  // One "loop" is the list repeated until it fills the track; rendering it twice
  // and translating by -50% creates the seamless infinite scroll.
  const repeats = Math.ceil(MIN_CARDS_PER_LOOP / videos.length)
  const loop = Array.from({ length: repeats }, () => videos).flat()
  const track = [...loop, ...loop]
  const duration = loop.length * SECONDS_PER_CARD

  return (
    <section className="section-space overflow-hidden">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('Watch', 'देखें')}
          title={t('Our Work Highlights', 'हमारे काम की झलकियाँ')}
          subtitle={t(
            'Short conversations on the patterns that shape how we love, argue and reconnect.',
            'उन पैटर्न पर छोटी-छोटी बातचीत, जो तय करते हैं कि हम कैसे प्यार करते हैं, कैसे झगड़ते हैं और फिर कैसे जुड़ते हैं।',
          )}
        />
      </div>

      <div className="video-marquee group relative mt-12">
        <div
          className="video-marquee-track flex w-max gap-6 px-3 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{ animationDuration: `${duration}s`, animationPlayState: activeVideo ? 'paused' : undefined }}
        >
          {track.map((video, i) => (
            <VideoCard
              key={`${video.id}-${i}`}
              video={video}
              onPlay={() => setActiveVideoId(video.id)}
              // Only the first copy is reachable by keyboard / screen readers.
              hidden={i >= videos.length}
            />
          ))}
        </div>
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideoId(null)} />
    </section>
  )
}

function VideoCard({ video, onPlay, hidden }: { video: ResolvedVideo; onPlay: () => void; hidden: boolean }) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      aria-label={`${t('Play video', 'वीडियो चलाएँ')}: ${video.title}`}
      className="group/card w-[280px] sm:w-[340px] shrink-0 text-left"
    >
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-charcoal-100 shadow-soft transition-shadow duration-300 group-hover/card:shadow-lift">
        <img
          src={video.thumbnailSrc}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 dark:from-black/50 via-transparent to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-50/90 text-rose-400 shadow-lift backdrop-blur-sm transition-transform duration-300 group-hover/card:scale-110">
            <Play size={22} className="ml-0.5 fill-current" />
          </span>
        </span>
      </div>
      <div className="mt-4 px-1">
        {video.subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-400">{video.subtitle}</p>
        )}
        <p className="mt-1 font-serif text-lg font-semibold leading-snug text-charcoal-900">{video.title}</p>
      </div>
    </button>
  )
}

function VideoLightbox({ video, onClose }: { video: ResolvedVideo | null; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!video) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [video, onClose])

  if (!video) return null

  return createPortal(
    <div className="keep-light-palette fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-charcoal-900/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        className="relative z-10 w-full max-w-4xl animate-fade-in-up"
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-serif text-lg font-semibold text-cream-50 line-clamp-1">{video.title}</p>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={t('Close video', 'वीडियो बंद करें')}
            className="rounded-full p-2 text-cream-100 hover:bg-cream-50/10 transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lift">
          <iframe
            src={getYouTubeEmbedUrl(video.youtubeId)}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
