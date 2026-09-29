import { Hero } from '@/components/home/Hero'
import { PainSection } from '@/components/home/PainSection'
import { RootProblemSection } from '@/components/home/RootProblemSection'
import { MethodSection } from '@/components/home/MethodSection'
import { MeetShalineeSection } from '@/components/home/MeetShalineeSection'
import { OffersSection, QuizBand, StoriesPreviewSection } from '@/components/home/OffersSection'
import { FAQSection } from '@/components/brand/FAQAccordion'
import type { FAQ } from '@/components/brand/FAQAccordion'
import { FinalCTA } from '@/components/brand/FinalCTA'

const faqs: FAQ[] = [
  {
    q: { en: 'Do I need my partner to join?', hi: 'क्या मेरे partner का साथ आना ज़रूरी है?' },
    a: {
      en: "No. Most women I work with start on their own, and that is completely okay. When one person's patterns shift, the whole relationship often begins to feel different. If your partner wants to join a session later, we can talk about that.",
      hi: 'नहीं। मेरे साथ काम करने वाली ज़्यादातर महिलाएँ अकेले ही शुरुआत करती हैं, और यह बिल्कुल ठीक है। जब एक इंसान के patterns बदलते हैं, तो अक्सर पूरा रिश्ता अलग महसूस होने लगता है। अगर बाद में आपका partner किसी session में जुड़ना चाहे, तो हम उस पर बात कर सकते हैं।',
    },
  },
  {
    q: { en: 'Is subconscious reprogramming the same as hypnosis?', hi: 'क्या subconscious reprogramming और hypnosis एक ही हैं?' },
    a: {
      en: "Not quite. You stay awake, aware and in control the whole time. We use calm, guided techniques and simple daily audios to help your mind let go of old emotional reactions. Nothing is done to you without your understanding and consent.",
      hi: 'पूरी तरह नहीं। आप पूरे समय जागी हुई, सजग और अपने control में रहती हैं। हम शांत, guided techniques और रोज़ के आसान audios से मन को पुरानी emotional प्रतिक्रियाएँ छोड़ने में मदद करते हैं। आपकी समझ और सहमति के बिना कुछ भी नहीं किया जाता।',
    },
  },
  {
    q: { en: 'How is this different from therapy?', hi: 'यह therapy से कैसे अलग है?' },
    a: {
      en: "I'm a relationship coach, not a therapist. Coaching is focused on where you are now and where you want to go, and it doesn't diagnose or treat mental health conditions. If you need clinical support, I'll gently say so and point you in the right direction.",
      hi: 'मैं एक relationship coach हूँ, therapist नहीं। Coaching इस पर ध्यान देती है कि आप अभी कहाँ हैं और कहाँ पहुँचना चाहती हैं; यह किसी मानसिक बीमारी का diagnosis या इलाज नहीं करती। अगर आपको clinical मदद की ज़रूरत हो, तो मैं प्यार से बताऊँगी और सही दिशा दिखाऊँगी।',
    },
  },
  {
    q: { en: 'How soon will I feel a difference?', hi: 'मुझे फ़र्क़ कितनी जल्दी महसूस होगा?' },
    a: {
      en: "Everyone moves at their own pace. Many women say they feel a little calmer and clearer within the first few sessions, and deeper shifts build over the weeks that follow. I can't promise a timeline, but I will walk with you at yours.",
      hi: 'हर किसी की अपनी रफ़्तार होती है। कई महिलाएँ बताती हैं कि पहले कुछ sessions में ही वे थोड़ा शांत और साफ़ महसूस करने लगती हैं, और गहरे बदलाव आने वाले हफ़्तों में आते हैं। मैं कोई समय-सीमा का वादा नहीं कर सकती, पर आपकी रफ़्तार से आपके साथ चलूँगी।',
    },
  },
  {
    q: { en: 'Is everything I share confidential?', hi: 'क्या मेरी हर बात गोपनीय रहेगी?' },
    a: {
      en: "Yes. What you share stays between us. I don't record sessions without your permission, and I never share your details with anyone, including your partner or family.",
      hi: 'हाँ। आप जो भी बताती हैं, वो हमारे बीच रहता है। आपकी अनुमति के बिना मैं sessions record नहीं करती, और आपकी जानकारी किसी से भी साझा नहीं करती, आपके partner या परिवार से भी नहीं।',
    },
  },
  {
    q: { en: 'Can we talk in Hindi or Bengali?', hi: 'क्या हम हिंदी या बांग्ला में बात कर सकते हैं?' },
    a: {
      en: 'Of course. Sessions are available in English, Hindi and Bengali, and you can switch between them whenever you like. Speak in whichever language your heart speaks.',
      hi: 'बिल्कुल। Sessions English, हिंदी और বাংলা में होते हैं, और आप जब चाहें भाषा बदल सकती हैं। जिस भाषा में आपका दिल बोलता है, उसी में बात कीजिए।',
    },
  },
  {
    q: { en: 'What happens on the free Clarity Call?', hi: 'फ़्री Clarity Call में क्या होता है?' },
    a: {
      en: "It's a relaxed 20-minute conversation. You tell me what's been happening, we look at the pattern underneath it, and together we see whether the Heart Rewiring Program is right for you. There's no pressure to sign up.",
      hi: 'यह 20 मिनट की एक सहज बातचीत है। आप बताती हैं कि क्या चल रहा है, हम उसके पीछे के pattern को देखते हैं, और साथ मिलकर समझते हैं कि Heart Rewiring Program आपके लिए सही है या नहीं। Join करने का कोई दबाव नहीं है।',
    },
  },
]

export function Home() {
  return (
    <>
      <Hero />
      <PainSection />
      <RootProblemSection />
      <MethodSection />
      <MeetShalineeSection />
      <StoriesPreviewSection />
      <OffersSection />
      <QuizBand />
      <FAQSection items={faqs} />
      <FinalCTA />
    </>
  )
}
