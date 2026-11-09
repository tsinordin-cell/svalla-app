// Skydd mot 404 vid databasavbrott (2026-11-08).
//
// Under Supabase-avbrottet 30 okt–3 nov svarade 12 av 13 ruttsidor 404 och platssidorna
// visade en nedskalad version: sidorna gjorde notFound() när databasen svarade med fel,
// och Next ersatte då den cachade, fungerande sidan med en 404. Google tolkar 404 som att
// sidan är borta, men 5xx som ett tillfälligt fel.
//
// Regeln: notFound() bara när raden verkligen saknas. Ett databasfel kastas vidare. För en
// cachad sida (revalidate) behåller Next då den senaste fungerande versionen; för en sida
// som inte finns i cachen blir det felsidan med status 500, inte 404.

/** Felkoder som betyder "finns inte", inte "databasen svarar inte". */
const INTE_HITTAD = new Set([
  'PGRST116', // .single() utan rad
  '22P02', // ogiltigt värde för kolumnens typ, t.ex. en sökväg som inte är ett UUID
])

export class Databasfel extends Error {
  constructor(var_: string, kod: string, meddelande: string) {
    super(`Databasfel (${var_}): ${kod} ${meddelande}`.trim())
    this.name = 'Databasfel'
  }
}

type SupabaseFel = { code?: string | null; message?: string | null } | null | undefined

/** Sant om felet är ett riktigt databasfel och inte bara "raden finns inte". */
export function arDatabasfel(fel: SupabaseFel): boolean {
  return !!fel && !INTE_HITTAD.has(fel.code ?? '')
}

/** Kastar Databasfel om Supabase svarade med ett riktigt fel. Anropa före notFound(). */
export function kastaVidDatabasfel(fel: SupabaseFel, var_: string): void {
  if (arDatabasfel(fel)) throw new Databasfel(var_, fel?.code ?? '', fel?.message ?? '')
}
