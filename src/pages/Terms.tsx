import { LegalPage } from '@/components/brand/LegalPage'
import type { LegalSection } from '@/components/brand/LegalPage'
import { site } from '@/config/site'

// TODO: review with a professional before launch.
const sections: LegalSection[] = [
  {
    title: { en: 'Coaching services', hi: 'Coaching सेवाएँ' },
    paragraphs: [
      {
        en: `${site.coachName} offers relationship coaching: a free Clarity Call, the ${site.programName}, and live workshops. Coaching is not therapy, counselling for mental illness, or medical care, and it does not diagnose or treat any condition.`,
        hi: `${site.coachName} relationship coaching देती हैं: फ़्री Clarity Call, ${site.programName}, और live workshops। Coaching थेरेपी, मानसिक बीमारी की counselling या मेडिकल देखभाल नहीं है, और यह किसी स्थिति का diagnosis या इलाज नहीं करती।`,
      },
      {
        en: 'Results depend on many things, including your own effort and circumstances, so no specific outcome can be guaranteed.',
        hi: 'नतीजे कई बातों पर निर्भर करते हैं, जिनमें आपकी अपनी मेहनत और परिस्थितियाँ शामिल हैं, इसलिए किसी ख़ास नतीजे की गारंटी नहीं दी जा सकती।',
      },
    ],
  },
  {
    title: { en: 'Payments', hi: 'पेमेंट' },
    paragraphs: [
      {
        en: 'Prices are set in Indian Rupees and shown on the relevant page or shared after your Clarity Call. You can view them in other currencies on the site; converted amounts are approximate. Payment is accepted from India and from abroad, in Indian Rupees or your local currency, and is processed securely by [payment provider, e.g. Razorpay / Instamojo]. Where instalments are offered, the schedule is agreed before you start.',
        hi: 'क़ीमतें भारतीय रुपये में तय हैं और संबंधित पेज पर दी गई हैं या Clarity Call के बाद बताई जाती हैं। साइट पर आप इन्हें दूसरी मुद्राओं में भी देख सकते हैं; बदली गई राशि अनुमानित होती है। भारत और विदेश, दोनों जगह से भारतीय रुपये या आपकी अपनी मुद्रा में पेमेंट किया जा सकता है। पेमेंट [payment provider, जैसे Razorpay / Instamojo] से सुरक्षित रूप से होते हैं। जहाँ किस्तों का विकल्प है, वहाँ शुरू करने से पहले उनका समय तय होता है।',
      },
    ],
  },
  {
    title: { en: 'Rescheduling', hi: 'समय बदलना' },
    paragraphs: [
      {
        en: 'Please give at least 24 hours’ notice to reschedule a session. Sessions missed without notice may not be rescheduled.',
        hi: 'Session का समय बदलने के लिए कृपया कम से कम 24 घंटे पहले बताएँ। बिना बताए छूटे sessions दोबारा तय न हो पाएँ, ऐसा हो सकता है।',
      },
    ],
  },
  {
    title: { en: 'Refunds', hi: 'Refund' },
    paragraphs: [
      {
        en: '[Refund policy for the 1:1 program and for workshops, to be confirmed.]',
        hi: '[1:1 program और workshops की refund policy, तय होनी बाकी है।]',
      },
    ],
  },
  {
    title: { en: 'Your materials', hi: 'आपकी सामग्री' },
    paragraphs: [
      {
        en: 'Reprogramming audios, the workbook and other materials are for your personal use only and may not be shared or resold.',
        hi: 'Reprogramming audios, workbook और बाकी सामग्री सिर्फ़ आपके निजी उपयोग के लिए है; इन्हें साझा करना या बेचना मना है।',
      },
    ],
  },
  {
    title: { en: 'Contact', hi: 'संपर्क' },
    paragraphs: [
      {
        en: `Questions about these terms? Email ${site.contact.email}.`,
        hi: `इन शर्तों के बारे में सवाल? ${site.contact.email} पर email करें।`,
      },
    ],
  },
]

export function Terms() {
  return <LegalPage title={{ en: 'Terms of Service', hi: 'सेवा की शर्तें' }} sections={sections} />
}
