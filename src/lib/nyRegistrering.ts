/**
 * Registreringar via Google och Apple slutar i /auth/callback (servern), där
 * track() inte finns. Callbacken sätter därför kakan NY_REGISTRERING_KAKA och
 * den här funktionen, som körs på nästa sida, skickar user_signup.
 *
 * track() skickar bara med samtycke till statistik. Utan samtycke ligger
 * kakan kvar tills den löper ut (en timme) eller besökaren godkänner, och
 * skickas då. Den tas bort så fort händelsen skickats, så den räknas en gång.
 */
import { track } from '@/lib/analytics-events'
import { hasAnalyticsConsent } from '@/components/CookieConsent'
import { NY_REGISTRERING_KAKA, franSokvag } from '@/lib/kontoLage'

export function rapporteraNyRegistrering(): void {
  try {
    if (typeof document === 'undefined') return
    const rad = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(`${NY_REGISTRERING_KAKA}=`))
    if (!rad) return
    if (!hasAnalyticsConsent()) return
    const varde = decodeURIComponent(rad.slice(NY_REGISTRERING_KAKA.length + 1))
    const [provider, fran] = varde.split('|')
    document.cookie = `${NY_REGISTRERING_KAKA}=; Max-Age=0; Path=/; SameSite=Lax`
    const p = provider === 'google' || provider === 'apple' ? provider : 'oauth'
    const f = franSokvag(fran)
    track('user_signup', { method: 'oauth', provider: p, ...(f ? { fran: f } : {}) })
  } catch { /* tyst */ }
}
