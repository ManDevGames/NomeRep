import { FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Guide } from '@/types'

interface LeadGuideCardProps {
  guide: Guide
  onDownload: (guide: Guide) => void
}

export function LeadGuideCard({ guide, onDownload }: LeadGuideCardProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-charcoal-100 bg-cream-50 p-7 sm:p-8 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blush-100 text-rose-400">
          <FileText size={26} />
        </div>
        <span className="font-serif text-3xl text-charcoal-200">{guide.number}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-charcoal-900">{guide.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{guide.description}</p>
        <p className="mt-3 text-xs uppercase tracking-wide text-charcoal-400">{guide.pages} pages &middot; PDF</p>
      </div>
      <Button onClick={() => onDownload(guide)} variant="outline" className="mt-auto">
        <Download size={16} /> {guide.ctaLabel}
      </Button>
    </div>
  )
}
