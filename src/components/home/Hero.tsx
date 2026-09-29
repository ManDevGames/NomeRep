import { FlaskConical, Languages, Lock, Users } from 'lucide-react'
import { PrimaryCTA, SecondaryCTA } from '@/components/brand/CTA'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'

export function Hero() {
  const { t } = useLanguage()

  const trust = [
    { icon: FlaskConical, label: t('Ex-DNA Scientist, Germany', 'पूर्व DNA साइंटिस्ट, जर्मनी') },
    { icon: Users, label: t(`${site.stats.clientsHelped} women helped`, `${site.stats.clientsHelped} महिलाओं की मदद`) },
    { icon: Languages, label: 'English | हिंदी | বাংলা' },
    { icon: Lock, label: t('100% confidential', '100% गोपनीय') },
  ]

  return (
    <section className="bg-cream-50">
      <div className="container-app grid grid-cols-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col items-start gap-6 animate-fade-in-up">
          <span className="eyebrow">
            {t('Relationship Coach · Ex-DNA Scientist, Germany', 'रिलेशनशिप कोच · पूर्व DNA साइंटिस्ट, जर्मनी')}
          </span>
          <h1 className="text-[2.1rem] font-semibold leading-[1.12] sm:text-5xl lg:text-[3.3rem]">
            {t(
              'Tired of the same fights, the same pain, the same loneliness, even in your relationship?',
              'रिश्ते में होकर भी अकेलापन? वही झगड़े, वही दर्द, बार-बार?',
            )}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
            {t(
              'I help women heal relationship stress at the root, through subconscious reprogramming and compassionate counselling, so you can feel calm, secure and loved again.',
              'मैं महिलाओं को subconscious reprogramming और प्यार भरी counselling के ज़रिए रिश्तों का तनाव जड़ से ठीक करने में मदद करती हूँ, ताकि आप फिर से सुकून, सुरक्षा और प्यार महसूस कर सकें।',
            )}
          </p>
          <div className="flex w-full flex-col items-start gap-2 pt-1">
            <PrimaryCTA className="w-full sm:w-auto sm:px-8" />
            <SecondaryCTA
              label={{
                en: 'Not ready yet? Take the 2-min Relationship Stress Quiz',
                hi: 'अभी तैयार नहीं? 2 मिनट का Relationship Stress Quiz लें',
              }}
              className="text-sm sm:text-base"
            />
          </div>
          <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-3 border-t border-charcoal-100 pt-5 sm:flex sm:flex-wrap sm:gap-x-6">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-charcoal-600">
                <Icon size={16} className="shrink-0 text-sage-500" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-in lg:max-w-none">
          <PhotoPlaceholder
            label="Shalinee – hero portrait, warm genuine smile, soft natural light, 4:5"
            aspectRatio="4/5"
            priority
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-charcoal-100 bg-cream-50/95 p-4 shadow-card backdrop-blur sm:-left-6 sm:bottom-8 sm:right-auto sm:max-w-[16rem]">
            <p className="font-serif text-base font-semibold text-charcoal-900">{site.methodName}</p>
            <p className="mt-1 text-sm text-rose-400">Decode · Rewire · Rebuild</p>
          </div>
        </div>
      </div>
    </section>
  )
}
