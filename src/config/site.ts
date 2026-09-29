import type { Bilingual } from '@/context/language'

/**
 * Every editable business value for the site lives here. Pages and components
 * read from this file — never hard-code a number, price, link or contact detail.
 *
 * Values in [square brackets] are placeholders waiting for Shalinee's real details.
 * An empty string ('') means "not set yet"; features that depend on it hide or fall back.
 */

export interface SiteTestimonial {
  id: string
  /** Full first name, or initials for privacy (e.g. "P.K."). */
  name: string
  city: Bilingual
  before: Bilingual
  after: Bilingual
  /** Optional photo URL — only with the client's written permission. */
  photo?: string
}

export const site = {
  coachName: 'Shalinee Sen',
  tagline: { en: 'Relationship Coach', hi: 'रिलेशनशिप कोच' } as Bilingual,
  positioning: {
    en: 'Scientist-turned-Relationship Coach who helps you heal relationship stress at the root, through subconscious reprogramming and compassionate counselling, so you can feel calm, secure and loved again.',
    hi: 'साइंटिस्ट से रिलेशनशिप कोच बनीं Shalinee, subconscious reprogramming और प्यार भरी counselling के ज़रिए रिश्तों के तनाव को जड़ से ठीक करने में आपकी मदद करती हैं, ताकि आप फिर से सुकून, सुरक्षा और प्यार महसूस कर सकें।',
  } as Bilingual,
  methodName: 'Heart Rewiring Method™',
  programName: 'Heart Rewiring 1:1 Program',

  /** Public site URL, used for canonical links and social previews. */
  siteUrl: 'https://[your-domain].com',

  contact: {
    // TODO: replace with Shalinee's WhatsApp number (country code + number, digits only).
    // This is the number the previous site used, kept so the button keeps working until then.
    whatsappNumber: '919311088577',
    whatsappMessage: {
      en: "Hi Shalinee, I'd like to know about 1:1 coaching",
      hi: 'नमस्ते Shalinee जी, मुझे 1:1 coaching के बारे में जानना है',
    } as Bilingual,
    email: '[hello@your-domain.com]',
  },

  social: {
    instagram: 'https://instagram.com/[handle]',
    youtube: 'https://youtube.com/@[channel]',
  },

  /** Calendly / Cal.com link. Empty = the clarity-call form redirects to /thank-you instead. */
  bookingUrl: '',

  stats: {
    clientsHelped: '[X]+',
    yearsExperience: '[X]+',
  },

  prices: {
    program: '₹[XX,XXX]',
    workshop: '₹[499]',
  },
  /** Shows the "EMI / 2 instalments available" line on the program pricing card. */
  programEmiAvailable: true,

  workshop: {
    title: { en: 'Stop Overthinking in Love', hi: 'प्यार में Overthinking रोकें' } as Bilingual,
    /** ISO date-time for the countdown, e.g. '2026-11-15T19:00:00+05:30'. Empty hides the countdown. */
    dateISO: '',
    dateLabel: { en: '[Date · Time IST]', hi: '[तारीख़ · समय IST]' } as Bilingual,
    /** Razorpay / Instamojo payment link. */
    paymentUrl: '',
  },

  /** Where quiz and clarity-call leads are POSTed (Google Sheets script, Zapier, AiSensy, WATI…). */
  leadWebhookUrl: '',

  analytics: {
    ga4Id: '',
    metaPixelId: '',
  },

  /** Keep false until real testimonials with written permission are in `testimonials` below. */
  showTestimonials: false,

  testimonials: [
    {
      id: 'sample-1',
      name: 'SAMPLE – replace with real testimonial',
      city: { en: 'Kolkata', hi: 'कोलकाता' },
      before: {
        en: 'We fought about the smallest things and I cried myself to sleep most nights.',
        hi: 'छोटी-छोटी बातों पर झगड़े होते थे और ज़्यादातर रातें मैं रोते-रोते सोती थी।',
      },
      after: {
        en: 'Now I can say what I feel without it turning into a fight. Home feels calm again.',
        hi: 'अब मैं बिना झगड़े के अपनी बात कह पाती हूँ। घर में फिर से सुकून है।',
      },
    },
    {
      id: 'sample-2',
      name: 'SAMPLE – replace with real testimonial',
      city: { en: 'Pune', hi: 'पुणे' },
      before: {
        en: 'I checked his phone, his last-seen, everything. My mind never switched off.',
        hi: 'मैं उसका फ़ोन, last seen, सब चेक करती थी। दिमाग़ कभी शांत नहीं होता था।',
      },
      after: {
        en: 'The overthinking has quietened. I trust myself, and that changed how I trust him.',
        hi: 'Overthinking अब काफ़ी शांत है। मुझे ख़ुद पर भरोसा है, और इसी से उस पर भरोसा भी बदला।',
      },
    },
    {
      id: 'sample-3',
      name: 'SAMPLE – replace with real testimonial',
      city: { en: 'Delhi', hi: 'दिल्ली' },
      before: {
        en: 'A year after my divorce I was still replaying every conversation in my head.',
        hi: 'Divorce के एक साल बाद भी मैं हर बात दिमाग़ में दोहराती रहती थी।',
      },
      after: {
        en: "I've finally let go. I feel like myself again, and I'm open to what's next.",
        hi: 'आख़िरकार मैंने छोड़ दिया है। मैं फिर से ख़ुद जैसी महसूस करती हूँ, और आगे के लिए तैयार हूँ।',
      },
    },
  ] as SiteTestimonial[],
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}
