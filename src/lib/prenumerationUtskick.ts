/**
 * Skickar välkomst- och bekräftelsemejlen för nyhetsbrevet med en gemensam
 * timgräns för hela sajten (lib/prenumeration.ts, VALKOMST_PER_TIMME).
 * Resend skickar också bekräftelse- och återställningsmejlen för konton, så
 * en flod av anmälningar får inte tömma dagskvoten. Bara för servern.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { sendEmail } from './email'
import { logger } from './logger'
import { valkomstTillaten } from './prenumeration'

type Mall = 'newsletter_welcome' | 'prenumeration_bekrafta'

export async function skickaPrenumerationsmejl(
  service: SupabaseClient,
  email: string,
  template: Mall,
  vars?: Record<string, string>,
): Promise<boolean> {
  const { count, error } = await service
    .from('email_log')
    .select('id', { count: 'exact', head: true })
    .in('template', ['newsletter_welcome', 'prenumeration_bekrafta'])
    .gte('sent_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
  if (error || !valkomstTillaten(count)) {
    logger.warn('prenumeration', 'mejl hoppat över: timgränsen nådd eller räkningen misslyckades', { template, count, fel: error?.message })
    return false
  }
  try {
    const r = await sendEmail({ template, to: email, vars })
    if (!r.ok) {
      logger.error('prenumeration', 'mejlet gick inte iväg', { template, fel: r.error })
      return false
    }
    await service.from('email_log').insert({
      email, template, sent_at: new Date().toISOString(), resend_id: r.id ?? null,
    }).then(() => {}, () => {})
    return true
  } catch (e) {
    logger.error('prenumeration', 'mejlet kastade', { template, fel: e instanceof Error ? e.message : String(e) })
    return false
  }
}
