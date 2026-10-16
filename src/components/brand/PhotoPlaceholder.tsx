import { useState } from 'react'
import { Camera } from 'lucide-react'
import { useSheetPhoto } from '@/lib/photos'

interface PhotoPlaceholderProps {
  /** What photo belongs here, e.g. "Shalinee – hero portrait, warm smile, 4:5". Also the alt text until `alt` is set. */
  label: string
  /** CSS aspect ratio, e.g. "4/5", "1/1", "3/2". */
  aspectRatio?: string
  className?: string
  /** Row `key` in the photo Google Sheet (`site.photoSheetUrl`). The sheet's link is used when set. */
  photoKey?: string
  /** A fixed photo URL; takes priority over the sheet. */
  src?: string
  alt?: string
  /** Pass true for the above-the-fold hero photo so it isn't lazy-loaded. */
  priority?: boolean
  /** Small spots like avatars: icon only, label kept for screen readers. */
  compact?: boolean
}

export function PhotoPlaceholder({ label, aspectRatio = '4/5', className = '', photoKey, src, alt, priority, compact }: PhotoPlaceholderProps) {
  const sheetPhoto = useSheetPhoto(src ? undefined : photoKey)
  const imageSrc = src ?? sheetPhoto?.src
  // A broken link (file deleted, not shared) shows the placeholder instead of a broken image.
  const [failedSrc, setFailedSrc] = useState<string>()

  if (imageSrc && imageSrc !== failedSrc) {
    return (
      <img
        src={imageSrc}
        alt={alt ?? sheetPhoto?.alt ?? label}
        onError={() => setFailedSrc(imageSrc)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ aspectRatio }}
        className={`object-cover ${compact ? '' : 'w-full rounded-3xl'} ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio }}
      className={`flex flex-col items-center justify-center border border-dashed border-rose-200 bg-blush-50 text-center ${
        compact ? '' : 'w-full gap-3 rounded-3xl p-6'
      } ${className}`}
    >
      {compact ? (
        <Camera size={18} className="text-rose-500" aria-hidden="true" />
      ) : (
        <>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <Camera size={20} aria-hidden="true" />
          </span>
          <span className="max-w-[16rem] text-xs leading-relaxed text-charcoal-500">{label}</span>
        </>
      )}
    </div>
  )
}
