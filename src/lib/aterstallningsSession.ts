/**
 * Kommer sessionen från en länk som nyss öppnades (2026-11-20)?
 *
 * Sidan /nytt-losenord får bara visa formuläret när inloggningen kommer från
 * själva återställningslänken. Mätt fel: länken begärdes på datorn och öppnades
 * på telefonen, där koden inte gick att växla. Telefonen hade en gammal session
 * sparad, sidan nöjde sig med den och sparandet föll. Hade telefonen varit
 * inloggad på ett annat konto hade det kontots lösenord bytts.
 *
 * Åtkomstbeviset innehåller hur och när inloggningen gjordes (fältet amr). En
 * session från länken är några sekunder gammal och gjord med återställning
 * eller engångskod, aldrig med lösenord eller Google. Tiden i amr är när
 * inloggningen gjordes och ändras inte när beviset förnyas.
 */
export const MAX_ALDER_SEKUNDER = 15 * 60
const VANLIG_INLOGGNING = new Set(['password', 'oauth', 'sso/saml', 'anonymous', 'web3'])

type Amr = { method?: string; timestamp?: number }

function nyttolast(bevis: string): { amr?: Amr[] } | null {
  const del = bevis.split('.')[1]
  if (!del) return null
  try {
    const b64 = del.replace(/-/g, '+').replace(/_/g, '/')
    const fylld = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
    const text = typeof atob === 'function' ? atob(fylld) : Buffer.from(fylld, 'base64').toString('binary')
    return JSON.parse(decodeURIComponent(Array.from(text, c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')))
  } catch {
    return null
  }
}

export function sessionKommerFranLank(bevis: string | null | undefined, nu: Date = new Date()): boolean {
  if (!bevis) return false
  const amr = nyttolast(bevis)?.amr
  if (!Array.isArray(amr) || amr.length === 0) return false
  // Senaste inloggningssättet avgör.
  const senaste = [...amr].sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))[0]!
  if (!senaste.method || typeof senaste.timestamp !== 'number') return false
  if (VANLIG_INLOGGNING.has(senaste.method)) return false
  const alder = nu.getTime() / 1000 - senaste.timestamp
  return alder >= -60 && alder <= MAX_ALDER_SEKUNDER
}
