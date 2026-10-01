import type { Bilingual } from '@/context/language'

/*
 * Relationship Stress Score quiz. Every answer scores 0–3 (higher = more stress);
 * reverse-scored questions simply list their options in reverse. The total (0–21)
 * is converted to 0–100 and mapped to one of four stages.
 */

export type SituationId = 'relationship' | 'married' | 'separated' | 'single'

export const situations: { id: SituationId; label: Bilingual }[] = [
  { id: 'relationship', label: { en: 'In a relationship', hi: 'रिश्ते में हूँ' } },
  { id: 'married', label: { en: 'Married', hi: 'शादीशुदा हूँ' } },
  { id: 'separated', label: { en: 'Recently separated or broken up', hi: 'हाल ही में अलग हुई हूँ / breakup हुआ है' } },
  { id: 'single', label: { en: 'Single', hi: 'Single हूँ' } },
]

/** Whether questions should be phrased for someone without a current partner. */
export const isWithoutPartner = (s: SituationId | null) => s === 'separated' || s === 'single'

export interface QuizOption {
  label: Bilingual
  score: number
}

export interface QuizQuestion {
  id: string
  prompt: Bilingual
  /** Wording for people who are single or recently separated. */
  promptWithoutPartner?: Bilingual
  options: QuizOption[]
}

const frequency: QuizOption[] = [
  { label: { en: 'Rarely', hi: 'बहुत कम' }, score: 0 },
  { label: { en: 'Sometimes', hi: 'कभी-कभी' }, score: 1 },
  { label: { en: 'Often', hi: 'अक्सर' }, score: 2 },
  { label: { en: 'Almost always', hi: 'लगभग हमेशा' }, score: 3 },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: { en: 'How often do small disagreements turn into big fights?', hi: 'छोटी-छोटी असहमति कितनी बार बड़े झगड़ों में बदल जाती है?' },
    promptWithoutPartner: {
      en: 'In your last relationship, how often did small disagreements turn into big fights?',
      hi: 'आपके पिछले रिश्ते में, छोटी-छोटी असहमति कितनी बार बड़े झगड़ों में बदल जाती थी?',
    },
    options: frequency,
  },
  {
    id: 'q2',
    prompt: { en: "How often do you overthink your partner's messages, silence or mood?", hi: 'आप अपने partner के मैसेज, चुप्पी या mood पर कितनी बार overthinking करती हैं?' },
    promptWithoutPartner: {
      en: 'How often do you overthink messages, silences or moods, or replay past conversations?',
      hi: 'आप मैसेज, चुप्पी या mood पर कितनी बार overthinking करती हैं, या पुरानी बातें दोहराती रहती हैं?',
    },
    options: frequency,
  },
  {
    id: 'q3',
    prompt: { en: 'How emotionally connected do you feel to your partner these days?', hi: 'आजकल आप अपने partner से भावनात्मक रूप से कितना जुड़ा हुआ महसूस करती हैं?' },
    promptWithoutPartner: {
      en: 'How emotionally connected do you feel to the people closest to you these days?',
      hi: 'आजकल आप अपने सबसे क़रीबी लोगों से भावनात्मक रूप से कितना जुड़ा हुआ महसूस करती हैं?',
    },
    options: [
      { label: { en: 'Very connected', hi: 'बहुत जुड़ा हुआ' }, score: 0 },
      { label: { en: 'Mostly connected', hi: 'ज़्यादातर जुड़ा हुआ' }, score: 1 },
      { label: { en: 'A bit distant', hi: 'थोड़ा दूर' }, score: 2 },
      { label: { en: 'Very distant', hi: 'बहुत दूर' }, score: 3 },
    ],
  },
  {
    id: 'q4',
    prompt: { en: 'How often do you feel you give more than you receive?', hi: 'आपको कितनी बार लगता है कि आप जितना देती हैं, उतना पाती नहीं?' },
    options: frequency,
  },
  {
    id: 'q5',
    prompt: { en: 'How much does a past relationship or past hurt still affect you?', hi: 'कोई पुराना रिश्ता या पुरानी चोट आज भी आप पर कितना असर डालती है?' },
    options: [
      { label: { en: 'Not at all', hi: 'बिल्कुल नहीं' }, score: 0 },
      { label: { en: 'A little', hi: 'थोड़ा' }, score: 1 },
      { label: { en: 'Quite a lot', hi: 'काफ़ी ज़्यादा' }, score: 2 },
      { label: { en: 'It still feels very heavy', hi: 'आज भी बहुत भारी लगता है' }, score: 3 },
    ],
  },
  {
    id: 'q6',
    prompt: { en: 'How easily can you express your needs without fear of conflict?', hi: 'झगड़े के डर के बिना आप अपनी ज़रूरतें कितनी आसानी से कह पाती हैं?' },
    options: [
      { label: { en: 'Very easily', hi: 'बहुत आसानी से' }, score: 0 },
      { label: { en: 'Mostly', hi: 'ज़्यादातर' }, score: 1 },
      { label: { en: 'With difficulty', hi: 'मुश्किल से' }, score: 2 },
      { label: { en: 'I usually stay quiet', hi: 'मैं अक्सर चुप रह जाती हूँ' }, score: 3 },
    ],
  },
  {
    id: 'q7',
    prompt: { en: "How often do you feel lonely even when you're together?", hi: 'साथ होते हुए भी आप कितनी बार अकेलापन महसूस करती हैं?' },
    promptWithoutPartner: {
      en: "How often do you feel lonely, even when you're around people?",
      hi: 'लोगों के बीच होते हुए भी आप कितनी बार अकेलापन महसूस करती हैं?',
    },
    options: frequency,
  },
]

const MAX_SCORE = quizQuestions.length * 3

export function toPercentScore(answers: Record<string, number>): number {
  const total = Object.values(answers).reduce((sum, n) => sum + n, 0)
  return Math.round((total / MAX_SCORE) * 100)
}

export type StageId = 'steady-ground' | 'early-strain' | 'emotional-disconnect' | 'heart-overload'

export interface Stage {
  id: StageId
  name: Bilingual
  range: string
  description: Bilingual
  underneath: Bilingual
  nextStep: Bilingual
}

export const stages: Stage[] = [
  {
    id: 'steady-ground',
    name: { en: 'Steady Ground', hi: 'मज़बूत ज़मीन' },
    range: '0–25',
    description: {
      en: "Your relationship life has a fairly steady foundation right now. There may be the odd rough day, but you mostly feel safe, heard and able to talk things through. That's something to be proud of, and something worth protecting.",
      hi: 'अभी आपके रिश्तों की नींव काफ़ी मज़बूत है। कभी-कभार मुश्किल दिन आते होंगे, पर ज़्यादातर आप सुरक्षित महसूस करती हैं, आपकी बात सुनी जाती है, और आप बातें सुलझा पाती हैं। यह गर्व की बात है, और इसे सँभालकर रखना ज़रूरी है।',
    },
    underneath: {
      en: "You likely have healthy ways of calming yourself and reconnecting after a disagreement. Small stresses can still pile up quietly if they're not spoken about.",
      hi: 'शायद आपके पास ख़ुद को शांत करने और असहमति के बाद फिर से जुड़ने के सेहतमंद तरीके हैं। फिर भी, अनकहे छोटे तनाव चुपचाप जमा हो सकते हैं।',
    },
    nextStep: {
      en: 'Keep nurturing what works. If one area still feels heavy, a Clarity Call can help you look at it before it grows.',
      hi: 'जो अच्छा चल रहा है, उसे सींचती रहिए। अगर कोई एक बात अब भी भारी लगती है, तो Clarity Call में उसे बढ़ने से पहले समझा जा सकता है।',
    },
  },
  {
    id: 'early-strain',
    name: { en: 'Early Strain', hi: 'शुरुआती तनाव' },
    range: '26–50',
    description: {
      en: "Things aren't falling apart, but something feels off. Small fights, a little overthinking, a sense of drifting. These early signs are easy to brush aside, and this is exactly the best time to pay attention to them.",
      hi: 'सब कुछ बिखर नहीं रहा, पर कुछ ठीक नहीं लगता। छोटे झगड़े, थोड़ी overthinking, दूरी का एहसास। इन शुरुआती संकेतों को नज़रअंदाज़ करना आसान है, और ठीक यही समय है इन पर ध्यान देने का।',
    },
    underneath: {
      en: 'Old emotional patterns are probably starting to switch on under stress: needing reassurance, holding back what you feel, or bracing for conflict. They are learned responses, and they can be gently changed.',
      hi: 'तनाव में शायद पुराने emotional patterns जागने लगे हैं: बार-बार भरोसा चाहना, अपनी भावनाएँ दबा लेना, या झगड़े के लिए पहले से तैयार रहना। ये सीखी हुई प्रतिक्रियाएँ हैं, और इन्हें प्यार से बदला जा सकता है।',
    },
    nextStep: {
      en: 'Understanding your pattern now can save months of hurt later. A free Clarity Call is a simple place to start.',
      hi: 'अभी अपना pattern समझ लेना आगे के महीनों का दर्द बचा सकता है। फ़्री Clarity Call शुरुआत का आसान तरीका है।',
    },
  },
  {
    id: 'emotional-disconnect',
    name: { en: 'Emotional Disconnect', hi: 'भावनात्मक दूरी' },
    range: '51–75',
    description: {
      en: "You're carrying a lot. Conversations may feel tense or empty, you may feel unseen, and your mind probably doesn't switch off easily. It's exhausting to feel lonely in something that's meant to feel close.",
      hi: 'आप बहुत कुछ उठाए चल रही हैं। बातचीत में तनाव या ख़ालीपन हो सकता है, आप ख़ुद को अनदेखा महसूस कर सकती हैं, और मन शायद आसानी से शांत नहीं होता। जिस रिश्ते में नज़दीकी होनी चाहिए, उसी में अकेलापन महसूस करना बहुत थका देता है।',
    },
    underneath: {
      en: 'Your subconscious is likely running old protective patterns, such as overthinking, people-pleasing or shutting down, that once kept you safe but now keep you stuck in the same loop.',
      hi: 'आपका subconscious शायद पुराने बचाव वाले patterns चला रहा है, जैसे overthinking, सबको ख़ुश रखना या चुप हो जाना। कभी इन्होंने आपको सुरक्षित रखा था, पर अब ये आपको उसी चक्र में बाँधे हुए हैं।',
    },
    nextStep: {
      en: "This is the stage where working at the root makes the biggest difference. Let's talk about your result on a free Clarity Call.",
      hi: 'यही वो stage है जहाँ जड़ पर काम करने से सबसे बड़ा फ़र्क़ पड़ता है। चलिए, फ़्री Clarity Call पर आपके result के बारे में बात करते हैं।',
    },
  },
  {
    id: 'heart-overload',
    name: { en: 'Heart Overload', hi: 'दिल पर भारी बोझ' },
    range: '76–100',
    description: {
      en: "Your heart is under real strain right now. The fights, the worry or the loneliness may feel constant, and you might be wondering how much longer you can keep going like this. What you feel makes sense, and you don't have to carry it alone.",
      hi: 'अभी आपके दिल पर सच में बहुत बोझ है। झगड़े, चिंता या अकेलापन शायद लगातार महसूस होता है, और आप सोचती होंगी कि ऐसे कब तक चलेगा। आप जो महसूस करती हैं, वो समझ में आता है, और आपको यह अकेले नहीं उठाना है।',
    },
    underneath: {
      en: "Deep-rooted fears and past hurts are probably being triggered again and again, keeping your mind and body on high alert. That isn't a flaw in you. It's programming that can be calmed and rewired.",
      hi: 'गहरे बैठे डर और पुरानी चोटें शायद बार-बार जाग रही हैं, जिससे आपका मन और शरीर हमेशा चौकन्ना रहता है। यह आपकी कमी नहीं है। यह programming है, जिसे शांत किया और बदला जा सकता है।',
    },
    nextStep: {
      en: "You deserve support, soon. Book a free Clarity Call and we'll look at what's happening together. If you ever feel unsafe, please call 112 or someone you trust right away.",
      hi: 'आप सहारे की हक़दार हैं, और जल्दी। फ़्री Clarity Call बुक करें, हम साथ मिलकर देखेंगे कि क्या चल रहा है। अगर कभी भी असुरक्षित महसूस हो, तो तुरंत 112 पर या किसी भरोसेमंद इंसान को कॉल करें।',
    },
  },
]

export function stageFor(score: number): Stage {
  if (score <= 25) return stages[0]
  if (score <= 50) return stages[1]
  if (score <= 75) return stages[2]
  return stages[3]
}
