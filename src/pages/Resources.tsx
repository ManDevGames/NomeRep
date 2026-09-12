import { BookOpen } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LeadGuidesSection } from '@/components/home/LeadGuidesSection'
import { ReflectionSection } from '@/components/home/ReflectionSection'
import { FAQSection } from '@/components/home/FAQSection'

const blogPosts = [
  {
    title: 'Why the same relationship problem keeps showing up',
    excerpt: 'A look at how relationship patterns form early and quietly repeat across very different relationships.',
    readTime: '6 min read',
  },
  {
    title: 'The difference between a boundary and a wall',
    excerpt: 'Boundaries are meant to bring people closer, not shut them out. Here’s how to tell the two apart.',
    readTime: '5 min read',
  },
  {
    title: 'What secure communication actually sounds like',
    excerpt: 'Real examples of how to say hard things without attacking or withdrawing.',
    readTime: '7 min read',
  },
]

export function Resources() {
  return (
    <>
      <section className="section-space bg-cream-50 pb-0 sm:pb-0 lg:pb-0">
        <div className="container-app">
          <SectionHeading
            eyebrow="Resources"
            title="Tools for understanding yourself and your relationships"
            subtitle="Free guides, reflection prompts, and articles to support you between sessions and programs."
          />
        </div>
      </section>

      <LeadGuidesSection />
      <ReflectionSection />

      <section className="section-space bg-cream-50" id="blog">
        <div className="container-app">
          <SectionHeading eyebrow="Blog" title="From the journal" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className="flex flex-col gap-4 rounded-3xl border border-charcoal-100 bg-cream-100 p-7 shadow-soft"
              >
                <BookOpen size={22} className="text-rose-400" />
                <h3 className="text-lg font-semibold text-charcoal-900">{post.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal-600">{post.excerpt}</p>
                <p className="mt-auto text-xs text-charcoal-400">{post.readTime}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
