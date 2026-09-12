import { Link } from 'react-router-dom'
import { Instagram, MessageCircle } from 'lucide-react'

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Assessment', to: '/assessment' },
      { label: 'Relationship Patterns', to: '/patterns' },
      { label: 'Programs', to: '/programs' },
      { label: '1:1 Reprogramming', to: '/reprogramming' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Free Guides', to: '/resources#guides' },
      { label: 'Reflection', to: '/resources#reflection' },
      { label: 'Blog', to: '/resources#blog' },
      { label: 'FAQ', to: '/resources#faq' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/about#contact' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-charcoal-100 bg-cream-100">
      <div className="container-app py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="font-serif text-xl font-semibold text-charcoal-900">
              Relationship Guide
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
              A calm place to understand your relationship patterns and build healthier connections.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/relationshipguide"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Relationship Guide on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-rose-300 hover:text-rose-400"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/919311088577"
                target="_blank"
                rel="noreferrer"
                aria-label="Message Relationship Guide on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-sage-300 hover:text-sage-500"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-charcoal-800">{col.heading}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-charcoal-500 hover:text-rose-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-charcoal-200/70 pt-8">
          <p className="text-xs leading-relaxed text-charcoal-400 max-w-3xl">
            This platform provides educational and self-reflection resources and is not a substitute for emergency
            or medical care. If you are in crisis or need immediate support, please contact a licensed mental
            health professional or local emergency services.
          </p>
          <p className="mt-4 text-xs text-charcoal-400">
            &copy; {new Date().getFullYear()} Relationship Guide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
