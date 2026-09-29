import { PrimaryCTA, SecondaryCTA } from '@/components/brand/CTA'
import { useLanguage } from '@/context/language'
import type { Bilingual } from '@/context/language'

interface FinalCTAProps {
  title?: Bilingual
  subtitle?: Bilingual
}

export function FinalCTA({ title, subtitle }: FinalCTAProps) {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-blush-100">
      <div className="container-app flex flex-col items-center gap-5 text-center">
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
          {t(
            title ?? {
              en: 'Your next relationship, or this one, can feel different.',
              hi: 'आपका अगला रिश्ता, या यही रिश्ता, अलग महसूस हो सकता है।',
            },
          )}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
          {t(
            subtitle ?? {
              en: 'The first step is free, private and just 20 minutes.',
              hi: 'पहला क़दम फ़्री है, पूरी तरह निजी है, और बस 20 मिनट का है।',
            },
          )}
        </p>
        <div className="mt-2 flex flex-col items-center gap-2">
          <PrimaryCTA placement="final" />
          <SecondaryCTA />
        </div>
      </div>
    </section>
  )
}
