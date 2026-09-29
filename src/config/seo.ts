import type { Bilingual } from '@/context/language'

/**
 * Title and meta description for every page. The page title is set on each
 * navigation (src/components/layout/RouteMeta.tsx); the sitemap is generated
 * from this list at build time (vite.config.ts).
 */
export interface PageMeta {
  title: Bilingual
  description: Bilingual
  /** Keep out of search results and the sitemap. */
  noindex?: boolean
}

export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: {
      en: 'Shalinee Sen | Relationship Coach – Heal Relationship Stress at the Root',
      hi: 'Shalinee Sen | रिलेशनशिप कोच – रिश्तों का तनाव जड़ से ठीक करें',
    },
    description: {
      en: 'Scientist-turned relationship coach Shalinee Sen helps women heal relationship stress at the root. Coaching in English, Hindi and Bengali. Book a free call.',
      hi: 'साइंटिस्ट से रिलेशनशिप कोच बनीं Shalinee Sen महिलाओं को रिश्तों का तनाव जड़ से ठीक करने में मदद करती हैं। English, हिंदी और বাংলা में coaching।',
    },
  },
  '/coaching': {
    title: { en: 'Heart Rewiring 1:1 Program | Shalinee Sen', hi: 'Heart Rewiring 1:1 Program | Shalinee Sen' },
    description: {
      en: '8 weeks of private coaching to heal relationship stress at the root, with reprogramming audios and WhatsApp support. Starts with a free Clarity Call.',
      hi: '8 हफ़्तों की निजी coaching, reprogramming audios और WhatsApp support के साथ। शुरुआत एक फ़्री Clarity Call से।',
    },
  },
  '/quiz': {
    title: { en: 'Free Relationship Stress Quiz | Shalinee Sen', hi: 'फ़्री Relationship Stress Quiz | Shalinee Sen' },
    description: {
      en: "What's your Relationship Stress Score? 7 honest questions, 2 minutes, and a personal result sent to your WhatsApp.",
      hi: 'आपका Relationship Stress Score क्या है? 7 सच्चे सवाल, 2 मिनट, और आपका personal result सीधे WhatsApp पर।',
    },
  },
  '/clarity-call': {
    title: { en: 'Book a Free Clarity Call | Shalinee Sen', hi: 'फ़्री Clarity Call बुक करें | Shalinee Sen' },
    description: {
      en: "A private, no-pressure 20-minute call to understand where you're stuck in your relationship and what could help.",
      hi: 'एक निजी, बिना दबाव की 20 मिनट की call, यह समझने के लिए कि आप रिश्ते में कहाँ अटकी हैं और क्या मदद कर सकता है।',
    },
  },
  '/workshop': {
    title: { en: 'Stop Overthinking in Love – Live Workshop | Shalinee Sen', hi: 'प्यार में Overthinking रोकें – Live Workshop | Shalinee Sen' },
    description: {
      en: 'A 90-minute live online workshop: why your mind overthinks in love, the triggers behind most fights, and a 5-minute calming technique.',
      hi: '90 मिनट की live online workshop: प्यार में मन overthinking क्यों करता है, झगड़ों के पीछे के triggers, और 5 मिनट की calming technique।',
    },
  },
  '/about': {
    title: { en: 'About Shalinee Sen | From DNA Scientist to Relationship Coach', hi: 'Shalinee Sen के बारे में | DNA साइंटिस्ट से रिलेशनशिप कोच तक' },
    description: {
      en: 'Former DNA scientist in Germany, now a relationship coach helping women heal at the root through subconscious reprogramming and counselling-based coaching.',
      hi: 'जर्मनी में पूर्व DNA साइंटिस्ट, अब एक relationship coach, जो subconscious reprogramming और counselling-based coaching से महिलाओं की मदद करती हैं।',
    },
  },
  '/stories': {
    title: { en: 'Client Stories | Shalinee Sen', hi: 'Clients की कहानियाँ | Shalinee Sen' },
    description: {
      en: 'Stories of change from women who worked with relationship coach Shalinee Sen, shared with their permission.',
      hi: 'रिलेशनशिप कोच Shalinee Sen के साथ काम करने वाली महिलाओं की बदलाव की कहानियाँ, उनकी अनुमति से।',
    },
  },
  '/privacy': {
    title: { en: 'Privacy Policy | Shalinee Sen', hi: 'प्राइवेसी पॉलिसी | Shalinee Sen' },
    description: { en: 'What data this site collects, how it is used, and how to opt out.', hi: 'यह साइट कौन-सा डेटा लेती है, उसका इस्तेमाल कैसे होता है, और मना कैसे करें।' },
  },
  '/terms': {
    title: { en: 'Terms | Shalinee Sen', hi: 'नियम व शर्तें | Shalinee Sen' },
    description: { en: 'Terms for coaching services, payments, rescheduling and refunds.', hi: 'Coaching सेवाओं, पेमेंट, reschedule और refund की शर्तें।' },
  },
  '/disclaimer': {
    title: { en: 'Disclaimer | Shalinee Sen', hi: 'डिस्क्लेमर | Shalinee Sen' },
    description: { en: 'Coaching is not therapy or medical care. Crisis and emergency information.', hi: 'Coaching, थेरेपी या मेडिकल देखभाल नहीं है। संकट और इमरजेंसी की जानकारी।' },
  },
  '/thank-you': {
    title: { en: 'Thank You | Shalinee Sen', hi: 'शुक्रिया | Shalinee Sen' },
    description: { en: 'Your Clarity Call request has been received.', hi: 'आपकी Clarity Call का अनुरोध मिल गया है।' },
    noindex: true,
  },
}

export const notFoundMeta: PageMeta = {
  title: { en: 'Page not found | Shalinee Sen', hi: 'पेज नहीं मिला | Shalinee Sen' },
  description: pageMeta['/'].description,
  noindex: true,
}
