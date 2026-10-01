import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { VideoPlaceholder } from '@/components/brand/VideoPlaceholder'
import { useLanguage } from '@/context/language'

export function MeetShalineeSection() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app grid grid-cols-1 items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <PhotoPlaceholder label="Shalinee – candid working portrait, 1:1" aspectRatio="1/1" className="mx-auto max-w-md" />

        <div className="flex flex-col items-start gap-5">
          <span className="eyebrow">{t('Meet your coach', 'मिलिए अपनी कोच से')}</span>
          <h2 className="text-3xl font-semibold leading-[1.2] sm:text-4xl">
            {t('From DNA research labs in Germany to healing hearts', 'जर्मनी की DNA research labs से, दिलों को सँवारने तक')}
          </h2>
          {/* TODO: replace with Shalinee's own words */}
          <div className="flex flex-col gap-4 text-base leading-relaxed text-charcoal-600 sm:text-lg">
            <p>
              {t(
                'For years I worked as a DNA scientist in Germany, studying how living systems change. Somewhere along the way I realised that the deepest change people long for isn’t in their cells. It’s in their hearts and their relationships.',
                'कई साल मैंने जर्मनी में DNA साइंटिस्ट के तौर पर काम किया, यह समझते हुए कि जीवित systems कैसे बदलते हैं। इसी सफ़र में मुझे एहसास हुआ कि लोग जिस बदलाव के लिए सबसे ज़्यादा तरसते हैं, वो उनकी cells में नहीं, उनके दिल और रिश्तों में होता है।',
              )}
            </p>
            <p>
              {t(
                'Today I bring that scientific way of thinking together with subconscious reprogramming and counselling-based coaching. I work with people across India and abroad, in English, Hindi and Marathi.',
                'आज मैं उसी वैज्ञानिक सोच को subconscious reprogramming और counselling-based coaching के साथ जोड़ती हूँ। मैं भारत और विदेश के लोगों के साथ English, हिंदी और मराठी में काम करती हूँ।',
              )}
            </p>
          </div>
          <Link to="/about" className="inline-flex min-h-12 items-center gap-1.5 font-medium text-rose-500 hover:text-rose-400">
            {t('Read my story', 'मेरी कहानी पढ़ें')} <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container-app mt-20 flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">{t('A message from Shalinee', 'Shalinee का एक संदेश')}</h2>
        <VideoPlaceholder label="60-sec intro video from Shalinee" className="max-w-3xl" />
      </div>
    </section>
  )
}
