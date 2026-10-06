import { LegalPage } from '@/components/brand/LegalPage'
import type { LegalSection } from '@/components/brand/LegalPage'
import { site } from '@/config/site'

// TODO: review with a professional before launch.
const sections: LegalSection[] = [
  {
    title: { en: 'What we collect', hi: 'हम कौन-सी जानकारी लेते हैं' },
    paragraphs: [
      {
        en: 'When you take the Relationship Stress Quiz: your first name, WhatsApp number, email (if you give it), your current situation, your answers, and your score and stage.',
        hi: 'जब आप Relationship Stress Quiz लेते हैं: आपका पहला नाम, WhatsApp नंबर, email, आपकी अभी की स्थिति, आपके जवाब, और आपका score व stage।',
      },
      {
        en: 'When you book a Clarity Call: your full name, WhatsApp number and email. Submitting also opens WhatsApp with these details, so you can send them to Shalinee.',
        hi: 'जब आप Clarity Call बुक करते हैं: आपका पूरा नाम, WhatsApp नंबर और email। Submit करने पर WhatsApp इन्हीं details के साथ खुलता है, ताकि आप इन्हें Shalinee को भेज सकें।',
      },
      {
        en: 'We also note which link or campaign brought you here (UTM parameters). If you accept cookies, Google Analytics and the Meta Pixel record how the site is used.',
        hi: 'हम यह भी देखते हैं कि आप किस link या campaign से यहाँ आए (UTM parameters)। अगर आप cookies स्वीकार करते हैं, तो Google Analytics और Meta Pixel यह दर्ज करते हैं कि साइट का उपयोग कैसे होता है।',
      },
    ],
  },
  {
    title: { en: 'How we use it', hi: 'हम इसका इस्तेमाल कैसे करते हैं' },
    paragraphs: [
      {
        en: 'To send your quiz result, arrange and prepare for your Clarity Call, reply to your messages, share helpful tips you agreed to receive, and understand which pages and campaigns help people find us. We never sell your personal data.',
        hi: 'आपका quiz result भेजने, आपकी Clarity Call तय करने और उसकी तैयारी करने, आपके मैसेज का जवाब देने, आपकी सहमति से काम की tips भेजने, और यह समझने के लिए कि कौन-से पेज और campaigns लोगों को हम तक पहुँचाते हैं। हम आपका निजी डेटा कभी नहीं बेचते।',
      },
    ],
  },
  {
    title: { en: 'WhatsApp messages and opting out', hi: 'WhatsApp मैसेज और मना करना' },
    paragraphs: [
      {
        en: 'We only message you on WhatsApp if you tick the consent box. You can opt out at any time by replying STOP, or by writing to us at the email below.',
        hi: 'हम आपको WhatsApp पर तभी मैसेज करते हैं जब आप सहमति वाले box पर tick करते हैं। आप कभी भी STOP लिखकर जवाब देकर, या नीचे दिए email पर लिखकर मना कर सकते हैं।',
      },
    ],
  },
  {
    title: { en: 'Where it is stored and who can see it', hi: 'यह कहाँ रखी जाती है और कौन देख सकता है' },
    paragraphs: [
      {
        en: 'Your details are sent securely to [service provider, e.g. Google Sheets / WhatsApp messaging tool] and are seen only by Shalinee and the people who help her run her practice. They are kept for [retention period] and then deleted.',
        hi: 'आपकी जानकारी सुरक्षित रूप से [service provider, जैसे Google Sheets / WhatsApp messaging tool] को भेजी जाती है, और सिर्फ़ Shalinee और उनकी practice चलाने में मदद करने वाले लोग इसे देखते हैं। इसे [अवधि] तक रखा जाता है और फिर मिटा दिया जाता है।',
      },
    ],
  },
  {
    title: { en: 'Your rights', hi: 'आपके अधिकार' },
    paragraphs: [
      {
        en: 'You can ask to see, correct or delete your data, or withdraw your consent, at any time, in line with applicable Indian law including the Digital Personal Data Protection Act, 2023.',
        hi: 'आप कभी भी अपना डेटा देखने, सुधारने या मिटाने, या अपनी सहमति वापस लेने के लिए कह सकते हैं, लागू भारतीय क़ानून (Digital Personal Data Protection Act, 2023 सहित) के अनुसार।',
      },
    ],
  },
  {
    title: { en: 'Contact', hi: 'संपर्क' },
    paragraphs: [
      {
        en: `For any privacy question or request, email ${site.contact.email}.`,
        hi: `प्राइवेसी से जुड़े किसी भी सवाल या अनुरोध के लिए ${site.contact.email} पर email करें।`,
      },
    ],
  },
]

export function Privacy() {
  return <LegalPage title={{ en: 'Privacy Policy', hi: 'प्राइवेसी पॉलिसी' }} sections={sections} />
}
