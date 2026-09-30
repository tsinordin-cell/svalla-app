/**
 * Behörighet för cron-rutterna (2026-09-29).
 *
 * FYND: /api/email/cron och /api/notifications/social-visits godkände alla
 * anrop vars User-Agent innehöll "vercel-cron". User-Agent sätts av klienten,
 * så vem som helst kunde starta utskicken med
 *   curl -A vercel-cron https://svalla.se/api/email/cron
 * (RESONERAT, inte provat — ett prov hade skickat riktiga mejl.)
 *
 * Vercel skickar automatiskt "Authorization: Bearer <CRON_SECRET>" till
 * cron-rutter när miljövariabeln CRON_SECRET finns. Därför:
 *  - Finns CRON_SECRET: bara rätt Bearer släpps in. User-Agent räcker inte.
 *  - Saknas CRON_SECRET: det gamla beteendet ligger kvar (annars slutar
 *    cronen gå), men varje anrop loggar en varning. Att sätta CRON_SECRET i
 *    Vercel är en bestående inställning och kräver Toms ja (regel 6).
 */
export function cronBehorig(req: Request, secret: string | undefined = process.env.CRON_SECRET): boolean {
  const auth = req.headers.get('authorization') || ''
  if (secret) return auth === `Bearer ${secret}`
  const ua = (req.headers.get('user-agent') || '').toLowerCase()
  const ok = ua.includes('vercel-cron')
  if (ok) console.warn('[cron] CRON_SECRET saknas — anropet släpptes in på User-Agent, som går att förfalska')
  return ok
}
