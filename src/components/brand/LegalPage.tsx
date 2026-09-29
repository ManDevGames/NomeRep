import { useLanguage } from '@/context/language'
import type { Bilingual } from '@/context/language'

export interface LegalSection {
  title: Bilingual
  paragraphs: Bilingual[]
}

interface LegalPageProps {
  title: Bilingual
  intro?: Bilingual
  sections: LegalSection[]
}

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app max-w-3xl">
        <span className="eyebrow">{t('Legal', 'क़ानूनी जानकारी')}</span>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{t(title)}</h1>
        <p className="mt-4 text-sm text-charcoal-500">{t('Last updated: [date]', 'आख़िरी अपडेट: [तारीख़]')}</p>
        {intro && <p className="mt-6 text-base leading-relaxed text-charcoal-700">{t(intro)}</p>}

        <div className="mt-10 flex flex-col gap-9">
          {sections.map((s) => (
            <div key={s.title.en}>
              <h2 className="text-xl font-semibold text-charcoal-900 sm:text-2xl">{t(s.title)}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.en} className="mt-3 text-base leading-relaxed text-charcoal-600">
                  {t(p)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
