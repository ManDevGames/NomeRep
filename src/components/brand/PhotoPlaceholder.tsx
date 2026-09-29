import { Camera } from 'lucide-react'

interface PhotoPlaceholderProps {
  /** What photo belongs here, e.g. "Shalinee – hero portrait, warm smile, 4:5". Also the alt text until `alt` is set. */
  label: string
  /** CSS aspect ratio, e.g. "4/5", "1/1", "3/2". */
  aspectRatio?: string
  className?: string
  /** Once the real photo exists, pass it here and the placeholder is replaced. */
  src?: string
  alt?: string
  /** Pass true for the above-the-fold hero photo so it isn't lazy-loaded. */
  priority?: boolean
}

export function PhotoPlaceholder({ label, aspectRatio = '4/5', className = '', src, alt, priority }: PhotoPlaceholderProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ aspectRatio }}
        className={`w-full rounded-3xl object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio }}
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-rose-200 bg-blush-50 p-6 text-center ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-400">
        <Camera size={20} aria-hidden="true" />
      </span>
      <span className="max-w-[16rem] text-xs leading-relaxed text-charcoal-500">{label}</span>
    </div>
  )
}
