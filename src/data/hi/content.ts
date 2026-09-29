import type { ReflectionPrompt } from '@/types'

export const reflectionPromptsHi: Record<string, Pick<ReflectionPrompt, 'prompt'>> = {
  r1: { prompt: 'मैंने यह पैटर्न सबसे पहले कब नोटिस किया?' },
  r2: { prompt: 'किन हालात में यह सबसे ज़्यादा उभरता है?' },
  r3: { prompt: 'अगर मैं अलग तरह से प्रतिक्रिया दूँ, तो मुझे किस बात का डर है?' },
  r4: { prompt: 'मुझे अपने रिश्तों से असल में क्या चाहिए?' },
  r5: { prompt: 'एक बेहतर प्रतिक्रिया कैसी दिखेगी?' },
}
