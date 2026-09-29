import { useLanguage } from '@/context/language'

export function RootProblemSection() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="eyebrow">{t("Why advice alone doesn't work", 'सिर्फ़ सलाह से बात क्यों नहीं बनती')}</span>
          <h2 className="text-3xl font-semibold leading-[1.2] sm:text-4xl lg:text-[2.75rem]">
            {t(
              "Sometimes the problem isn't the relationship. It's the old programming running it.",
              'कई बार समस्या रिश्ता नहीं होता, बल्कि वो पुरानी programming होती है जो उसे चला रही है।',
            )}
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-charcoal-600 sm:text-lg">
            <p>
              {t(
                'Most of our emotional reactions come from the subconscious mind. It learned how love works long ago, from what we saw and felt as children, and from the times we were hurt.',
                'हमारी ज़्यादातर भावनात्मक प्रतिक्रियाएँ subconscious mind से आती हैं। उसने बहुत पहले सीख लिया था कि प्यार कैसा होता है: बचपन में जो देखा और महसूस किया, और जब-जब हमें चोट लगी।',
              )}
            </p>
            <p>
              {t(
                "That's why you can know exactly what to do, and still react the same way. You tell yourself you won't overthink this time, and then the silence comes and your mind races again.",
                'इसीलिए आपको पता होता है कि क्या करना चाहिए, फिर भी आप वैसे ही react कर देती हैं। आप ख़ुद से कहती हैं कि इस बार overthinking नहीं करूँगी, और फिर जैसे ही चुप्पी आती है, मन फिर दौड़ने लगता है।',
              )}
            </p>
            <p>
              {t(
                'Lasting change happens when you work at the level where the pattern lives. Not by trying harder, but by gently changing what drives the reaction.',
                'असली और टिकाऊ बदलाव तब आता है जब आप उस गहराई पर काम करती हैं जहाँ यह pattern रहता है। ज़्यादा कोशिश करके नहीं, बल्कि उस चीज़ को धीरे से बदलकर जो इस reaction को चलाती है।',
              )}
            </p>
          </div>
        </div>

        <Iceberg />
      </div>
    </section>
  )
}

function Iceberg() {
  const { t } = useLanguage()
  const above = t({ en: 'What you see', hi: 'जो दिखता है' })
  const aboveLines = [t('Fights, silence,', 'झगड़े, चुप्पी,'), t('overthinking', 'overthinking')]
  const below = t({ en: 'What drives it', hi: 'जो इसे चलाता है' })
  const belowLines = [t('Old fears, beliefs,', 'पुराने डर, मान्यताएँ,'), t('past hurts', 'पुरानी चोटें')]

  return (
    <figure className="mx-auto w-full max-w-md">
      <svg
        viewBox="0 0 400 380"
        className="w-full"
        role="img"
        aria-label={`${above}: ${aboveLines.join(' ')}. ${below}: ${belowLines.join(' ')}.`}
      >
        <rect x="0" y="130" width="400" height="250" rx="24" className="fill-sage-100" />
        <path d="M0 130 Q 50 122 100 130 T 200 130 T 300 130 T 400 130" className="fill-none stroke-sage-300" strokeWidth="2" />
        <polygon points="110,28 164,130 56,130" className="fill-cream-100 stroke-rose-200" strokeWidth="2" strokeLinejoin="round" />
        <path
          d="M56 130 L164 130 L236 186 L262 272 L204 346 L86 356 L24 282 L16 190 Z"
          className="fill-rose-100 stroke-rose-200"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <text x="190" y="64" className="fill-rose-400 text-[13px] font-semibold uppercase tracking-wider">
          {above}
        </text>
        {aboveLines.map((line, i) => (
          <text key={line} x="190" y={90 + i * 22} className="fill-charcoal-800 text-[17px]">
            {line}
          </text>
        ))}

        <text x="140" y="214" textAnchor="middle" className="fill-rose-500 text-[13px] font-semibold uppercase tracking-wider">
          {below}
        </text>
        {belowLines.map((line, i) => (
          <text key={line} x="140" y={242 + i * 24} textAnchor="middle" className="fill-charcoal-900 text-[17px]">
            {line}
          </text>
        ))}
      </svg>
    </figure>
  )
}
