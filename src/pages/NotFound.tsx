import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <section className="section-space flex min-h-[70vh] items-center bg-cream-50">
      <div className="container-app flex flex-col items-center gap-6 text-center">
        <Compass size={40} className="text-rose-300" />
        <h1 className="text-3xl sm:text-4xl font-semibold">This page wandered off</h1>
        <p className="max-w-md text-base text-charcoal-500">
          We couldn&rsquo;t find what you were looking for. Let&rsquo;s get you back on track.
        </p>
        <Button to="/">Back to Home</Button>
      </div>
    </section>
  )
}
