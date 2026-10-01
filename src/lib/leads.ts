import { site } from '@/config/site'
import { getUtm } from '@/lib/utm'
import type { UtmParams } from '@/lib/utm'

/**
 * Lead integration point.
 *
 * Every quiz and clarity-call submission goes through submitLead(). It POSTs the
 * lead as JSON to `site.leadWebhookUrl`. Anything that accepts a JSON POST works:
 *   - Google Sheets: an Apps Script web app (doPost(e) → JSON.parse(e.postData.contents)).
 *   - Zapier / Make / Pabbly webhooks, which can forward to a sheet, CRM or email.
 *   - WhatsApp tools such as Interakt, AiSensy or WATI, via their webhook or a Zapier step.
 *
 * The body is sent as text/plain so the browser skips the CORS preflight that
 * Apps Script and many no-code webhooks don't answer. While no URL is set, leads
 * are only logged to the console (the site still works; nothing is stored).
 */

export interface QuizLeadData {
  type: 'quiz'
  name: string
  whatsapp: string
  email?: string
  situation: string
  answers: Record<string, number>
  score: number
  stage: string
}

export interface ClarityCallLeadData {
  type: 'clarity_call'
  name: string
  whatsapp: string
  email: string
  quizScore?: string
  quizStage?: string
}

export type LeadData = QuizLeadData | ClarityCallLeadData

export type Lead = LeadData & {
  timestamp: string
  language: string
  page: string
  utm: UtmParams
}

/** Resolves true when the webhook accepted the lead (or none is configured). Never throws. */
export async function submitLead(data: LeadData): Promise<boolean> {
  const lead: Lead = {
    ...data,
    timestamp: new Date().toISOString(),
    language: document.documentElement.lang,
    page: window.location.pathname,
    utm: getUtm(),
  }

  if (!site.leadWebhookUrl) {
    console.info('[lead] No leadWebhookUrl set in src/config/site.ts — lead not sent:', lead)
    return true
  }

  try {
    const response = await fetch(site.leadWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(lead),
    })
    return response.ok || response.type === 'opaque'
  } catch (error) {
    console.error('[lead] Failed to send lead', error)
    return false
  }
}
