/**
 * Sidan för nytt samtal (/meddelanden/ny): vad raden under ett namn ska säga.
 *
 * 2026-11-26: förut stod "Skickas som förfrågan" under alla som inte följer
 * tillbaka, även när ett samtal redan fanns. Databasfunktionen starta_dm öppnar
 * då det befintliga samtalet i stället för att skicka en ny förfrågan, så texten
 * var fel. Här avgörs texten av samma sak som starta_dm går efter: ett
 * befintligt 1:1-samtal först, annars om personen följer tillbaka.
 */

export type SamtalStatus = 'active' | 'request' | 'declined'

export type BefintligtSamtal = {
  status: SamtalStatus
  created_by: string | null
  last_message_at: string | null
}

export type Etikett = { text: string; ton: 'acc' | 'neutral' } | null

type DeltagarRad = { conversation_id: string; user_id: string }
type SamtalRad = { id: string; status: string | null; created_by: string | null; last_message_at: string | null }

/**
 * Bygger en karta från person till det senaste 1:1-samtalet med den personen,
 * på samma sätt som starta_dm väljer samtal (senaste meddelandet först).
 */
export function samtalPerPerson(
  deltagare: DeltagarRad[],
  samtal: SamtalRad[],
  jag: string,
): Map<string, BefintligtSamtal> {
  const samtalById = new Map(samtal.map(s => [s.id, s]))
  const ut = new Map<string, BefintligtSamtal>()
  for (const d of deltagare) {
    if (d.user_id === jag) continue
    const s = samtalById.get(d.conversation_id)
    if (!s) continue
    const status = s.status === 'request' || s.status === 'declined' ? s.status : 'active'
    const ny: BefintligtSamtal = { status, created_by: s.created_by, last_message_at: s.last_message_at }
    const forra = ut.get(d.user_id)
    if (!forra || tid(ny.last_message_at) > tid(forra.last_message_at)) ut.set(d.user_id, ny)
  }
  return ut
}

function tid(iso: string | null): number {
  if (!iso) return -1
  const t = new Date(iso).getTime()
  return Number.isNaN(t) ? -1 : t
}

/**
 * Texten under namnet. null betyder ingen text: ni följer varandra och har
 * inget samtal än, så det första meddelandet går fram direkt.
 */
export function etikettFor(samtal: BefintligtSamtal | undefined, foljerTillbaka: boolean, jag: string): Etikett {
  if (samtal) {
    if (samtal.status === 'active') return { text: 'Ni har redan meddelanden', ton: 'neutral' }
    if (samtal.status === 'request') {
      return samtal.created_by === jag
        ? { text: 'Förfrågan skickad', ton: 'neutral' }
        : { text: 'Vill skriva till dig', ton: 'acc' }
    }
    // Avvisat. Den som skickade får inte veta att det blev nej (inkorgen visar
    // det inte heller), så avsändaren ser samma text som för en väntande förfrågan.
    return samtal.created_by === jag
      ? { text: 'Förfrågan skickad', ton: 'neutral' }
      : { text: 'Du avvisade förfrågan', ton: 'neutral' }
  }
  return foljerTillbaka ? null : { text: 'Skickas som förfrågan', ton: 'acc' }
}
