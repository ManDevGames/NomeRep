import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50">
      <div
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.35]"
        aria-hidden="true"
      />
      <div className="container-app relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col items-start gap-6 animate-fade-in-up">
          <span className="eyebrow">Free &middot; 5 minutes &middot; Private &middot; Personalized</span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] text-charcoal-900">
            Discover Your Relationship Pattern
            <span className="block text-rose-400">Free 5-Minute Assessment</span>
          </h1>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-charcoal-600">
            Understand the patterns shaping your relationships, discover what may be holding you back, and get
            practical guidance to start creating healthier connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button to="/assessment" size="lg">
              Take the Free Assessment <ArrowRight size={18} />
            </Button>
            <Button to="/programs" variant="outline" size="lg">
              Explore Relationship Programs
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center animate-fade-in">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="w-full max-w-md lg:max-w-lg"
      role="img"
      aria-label="Two soft interconnected organic shapes, representing two people and the pattern between them"
    >
      <defs>
        <radialGradient id="blushGrad" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f3d6d1" />
          <stop offset="100%" stopColor="#e8bab2" />
        </radialGradient>
        <radialGradient id="sageGrad" cx="60%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#cdd8c3" />
          <stop offset="100%" stopColor="#aec19f" />
        </radialGradient>
      </defs>
      <circle cx="240" cy="240" r="220" fill="#faf6ee" />
      <path
        d="M170 120c60-30 130 5 140 70 8 50-25 70-15 120 8 42-30 80-85 78-70-3-110-60-100-125 8-55 5-115 60-143z"
        fill="url(#blushGrad)"
        opacity="0.9"
      />
      <path
        d="M300 150c50-15 100 25 95 80-4 45 30 60 25 105-6 55-65 85-115 65-55-22-70-80-55-130 12-42-2-100 50-120z"
        fill="url(#sageGrad)"
        opacity="0.85"
      />
      <circle cx="240" cy="240" r="6" fill="#9c5c52" opacity="0.6" />
      <path
        d="M180 240c30-10 90-10 120 0"
        stroke="#9c5c52"
        strokeWidth="1.5"
        strokeDasharray="2 8"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
