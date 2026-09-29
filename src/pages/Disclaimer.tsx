import { LegalPage } from '@/components/brand/LegalPage'
import type { LegalSection } from '@/components/brand/LegalPage'

// TODO: review with a professional before launch, and verify every helpline number.
const sections: LegalSection[] = [
  {
    title: { en: 'Coaching, not therapy', hi: 'Coaching, थेरेपी नहीं' },
    paragraphs: [
      {
        en: 'Shalinee Sen is a relationship coach. Coaching is not a substitute for therapy, psychiatric or medical care, or emergency support, and nothing on this site is a diagnosis or treatment.',
        hi: 'Shalinee Sen एक रिलेशनशिप कोच हैं। Coaching, थेरेपी, मनोचिकित्सा, मेडिकल देखभाल या इमरजेंसी मदद की जगह नहीं है, और इस साइट पर कुछ भी diagnosis या इलाज नहीं है।',
      },
      {
        en: 'Shalinee’s scientific background shapes how she thinks and works. Coaching does not make any medical or genetic claims.',
        hi: 'Shalinee की वैज्ञानिक पृष्ठभूमि उनके सोचने और काम करने के तरीके को आकार देती है। Coaching कोई मेडिकल या genetic दावा नहीं करती।',
      },
    ],
  },
  {
    title: { en: 'No guaranteed outcomes', hi: 'नतीजों की कोई गारंटी नहीं' },
    paragraphs: [
      {
        en: 'Every person and relationship is different. Coaching supports your own effort and choices; results cannot be promised.',
        hi: 'हर इंसान और हर रिश्ता अलग होता है। Coaching आपकी अपनी मेहनत और फ़ैसलों में साथ देती है; नतीजों का वादा नहीं किया जा सकता।',
      },
    ],
  },
  {
    title: { en: 'The quiz', hi: 'Quiz' },
    paragraphs: [
      {
        en: 'The Relationship Stress Quiz is for self-reflection only. It is not a clinical or psychological assessment.',
        hi: 'Relationship Stress Quiz सिर्फ़ आत्म-चिंतन के लिए है। यह कोई clinical या psychological जाँच नहीं है।',
      },
    ],
  },
  {
    title: { en: 'If you are in crisis', hi: 'अगर आप संकट में हैं' },
    paragraphs: [
      {
        en: 'If you are in danger or thinking about harming yourself, please call 112 (India emergency) right away, or go to your nearest hospital.',
        hi: 'अगर आप ख़तरे में हैं या ख़ुद को नुक़सान पहुँचाने का सोच रही हैं, तो कृपया तुरंत 112 (भारत इमरजेंसी) पर कॉल करें, या नज़दीकी अस्पताल जाएँ।',
      },
      {
        en: 'Tele-MANAS, the Government of India mental health helpline: 14416 (24×7, free). Women Helpline: 181. [Verify these numbers before publishing.]',
        hi: 'Tele-MANAS, भारत सरकार की मानसिक स्वास्थ्य helpline: 14416 (24×7, मुफ़्त)। Women Helpline: 181। [प्रकाशित करने से पहले ये नंबर जाँच लें।]',
      },
    ],
  },
]

export function Disclaimer() {
  return <LegalPage title={{ en: 'Disclaimer', hi: 'डिस्क्लेमर' }} sections={sections} />
}
