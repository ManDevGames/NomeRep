import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CounselorCard } from '@/components/counselors/CounselorCard'
import { CounselorProfileModal } from '@/components/counselors/CounselorProfileModal'
import { counselors as allCounselors } from '@/data/counselors'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'
import { formatInr } from '@/utils/format'
import type { IndianLanguage } from '@/types'

const steps = [
  {
    title: { en: 'Understand your pattern', hi: 'अपने पैटर्न को समझें' },
    description: {
      en: 'Your counselor helps you see the relationship pattern clearly, without judgment.',
      hi: 'आपके काउंसलर बिना किसी परख के आपको अपना रिलेशनशिप पैटर्न साफ़-साफ़ देखने में मदद करते हैं।',
    },
  },
  {
    title: { en: 'Identify recurring triggers', hi: 'बार-बार उभरने वाले ट्रिगर पहचानें' },
    description: {
      en: 'Together, you’ll map the specific situations that activate old responses.',
      hi: 'आप साथ मिलकर उन ख़ास हालात को पहचानेंगे, जिनमें पुरानी प्रतिक्रियाएँ जाग उठती हैं।',
    },
  },
  {
    title: { en: 'Work through relationship challenges', hi: 'रिश्तों की मुश्किलों पर साथ मिलकर काम करें' },
    description: {
      en: 'Bring real, current situations into sessions and work through them as they arise.',
      hi: 'अपनी ज़िंदगी की असली, अभी चल रही स्थितियाँ सेशन में लाएँ और जैसे-जैसे वे सामने आएँ, उन्हें सुलझाएँ।',
    },
  },
  {
    title: { en: 'Build healthier responses', hi: 'बेहतर प्रतिक्रिया देना सीखें' },
    description: {
      en: 'Practice new ways of communicating and responding, with support along the way.',
      hi: 'बात करने और प्रतिक्रिया देने के नए तरीकों का अभ्यास करें — हर क़दम पर किसी के साथ के साथ।',
    },
  },
  {
    title: { en: 'Create a personalized action plan', hi: 'अपने लिए एक ख़ास एक्शन प्लान बनाएँ' },
    description: {
      en: 'Leave with a concrete plan tailored to your relationships and your pace.',
      hi: 'आख़िर में आपके पास अपने रिश्तों और अपनी रफ़्तार के हिसाब से बना एक ठोस प्लान होगा।',
    },
  },
]

const languages: IndianLanguage[] = Array.from(new Set(allCounselors.flatMap((c) => c.languages)))
const startingPrice = Math.min(...allCounselors.map((c) => c.pricePerSessionInr))

export function Reprogramming() {
  const { counselors, languageLabel } = useContent()
  const { t } = useLanguage()
  const [activeCounselorId, setActiveCounselorId] = useState<string | null>(null)
  const [languageFilter, setLanguageFilter] = useState<IndianLanguage | 'All'>('All')
  const activeCounselor = counselors.find((c) => c.id === activeCounselorId) ?? null

  const filteredCounselors = useMemo(() => {
    if (languageFilter === 'All') return counselors
    return counselors.filter((c) => c.languages.includes(languageFilter))
  }, [languageFilter, counselors])

  return (
    <>
      <section className="section-space bg-blush-50">
        <div className="container-app grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Relationship Reprogramming &mdash; 1:1</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-charcoal-900">
              {t('Sometimes you don’t need more information.', 'कभी-कभी आपको और जानकारी की ज़रूरत नहीं होती।')}
            </h1>
            <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-charcoal-600">
              {t(
                'You need someone to help you understand what’s happening in your relationship and work through it with you.',
                'ज़रूरत होती है किसी ऐसे की, जो आपके रिश्ते में चल रही बातों को समझने में मदद करे और उन्हें सुलझाने में आपके साथ रहे।',
              )}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="#counselors" size="lg">
                {t('Talk to a Counselor', 'काउंसलर से बात करें')} <ArrowRight size={18} />
              </Button>
              <Button href="#how-it-works" variant="outline" size="lg">
                {t('How 1:1 Reprogramming Works', '1:1 रीप्रोग्रामिंग कैसे काम करती है')}
              </Button>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-charcoal-500">
              <MessageCircle size={16} className="text-sage-500" /> {t('Prefer to chat first?', 'पहले बात करना चाहते हैं?')}{' '}
              <a
                href="https://wa.me/919311088577"
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 underline underline-offset-2"
              >
                {t('Message us on WhatsApp', 'WhatsApp पर मैसेज करें')}
              </a>{' '}
              {t('before booking.', 'और फिर बुक करें।')}
            </p>
          </div>
          <div className="rounded-3xl border border-charcoal-100 bg-cream-50 p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wide text-charcoal-500">
              {t('Sessions starting from', 'सेशन की शुरुआती क़ीमत')}
            </p>
            <p className="mt-2 text-4xl font-semibold text-charcoal-900">{formatInr(startingPrice)}</p>
            <p className="mt-1 text-sm text-charcoal-500">
              {t('per session · video, audio or chat', 'प्रति सेशन · वीडियो, ऑडियो या चैट')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream-50" id="how-it-works">
        <div className="container-app">
          <SectionHeading
            eyebrow={t('How it works', 'यह कैसे काम करता है')}
            title={t('How 1:1 Reprogramming Works', '1:1 रीप्रोग्रामिंग कैसे काम करती है')}
          />
          <ol className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
            {steps.map((step, i) => (
              <li
                key={step.title.en}
                className="flex gap-5 rounded-3xl border border-charcoal-100 bg-cream-100 p-6 shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 font-semibold text-rose-500">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-charcoal-900">{t(step.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{t(step.description)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space bg-sage-50" id="counselors">
        <div className="container-app">
          <SectionHeading
            eyebrow={t('1:1 support', '1:1 सपोर्ट')}
            title={t('Find the Right Counselor for You', 'अपने लिए सही काउंसलर चुनें')}
            subtitle={t(
              'Demo profiles for this prototype — filter by the language you’re most comfortable speaking in.',
              'इस प्रोटोटाइप के लिए डेमो प्रोफ़ाइल — जिस भाषा में आप सबसे सहज हैं, उसके हिसाब से चुनें।',
            )}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {(['All', ...languages] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  languageFilter === lang
                    ? 'bg-charcoal-900 text-cream-50'
                    : 'bg-cream-50 text-charcoal-600 hover:bg-blush-100'
                }`}
              >
                {lang === 'All' ? t('All', 'सभी') : languageLabel(lang)}
              </button>
            ))}
          </div>

          {filteredCounselors.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCounselors.map((counselor) => (
                <CounselorCard
                  key={counselor.id}
                  counselor={counselor}
                  onViewProfile={(c) => setActiveCounselorId(c.id)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-charcoal-500">
              {t('No counselors found for this language yet.', 'इस भाषा में अभी कोई काउंसलर उपलब्ध नहीं है।')}
            </p>
          )}
        </div>
      </section>

      <CounselorProfileModal counselor={activeCounselor} onClose={() => setActiveCounselorId(null)} />
    </>
  )
}
