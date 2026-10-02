/**
 * Segment på e-postlistan (exitplanen, E-post & CRM, 2026-10-02).
 *
 * VARFÖR: en båtägare, någon med fritidshus på en ö och en dagsturist vill ha
 * olika saker i november. Listan var en enda klump. Nu får den som prenumererar
 * frågan "Vad stämmer bäst?" direkt efter att adressen sparats, och svaret
 * sparas i email_subscribers.preferences.segment.
 *
 * Vi gissar aldrig segment ur källa eller beteende. Den som inte svarat har
 * inget segment och får de allmänna utskicken.
 */
export const MEJLSEGMENT = ['batagare', 'fritidshus', 'dagstur'] as const
export type Mejlsegment = (typeof MEJLSEGMENT)[number]

export const SEGMENT_ETIKETT: Record<Mejlsegment, string> = {
  batagare: 'Jag har egen båt',
  fritidshus: 'Jag har fritidshus i skärgården',
  dagstur: 'Jag åker ut över dagen eller helgen',
}

export function arSegment(v: unknown): v is Mejlsegment {
  return typeof v === 'string' && (MEJLSEGMENT as readonly string[]).includes(v)
}
