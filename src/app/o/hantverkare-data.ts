/**
 * hantverkare-data.ts — hantverkare och sjötjänster per ö.
 *
 * SÄKERHETSREGEL, INBYGGD I TYPEN:
 * En post renderas aldrig förrän `verifierad` är ett objekt, alltså tills en
 * människa ringt eller mejlat och bekräftat uppgifterna. `getHantverkareForIsland()`
 * filtrerar bort allt annat. Det går alltså inte att av misstag publicera ett
 * telefonnummer ingen kontrollerat — även om posten ligger i filen.
 *
 * Varför så strikt: fel öppettid är irriterande, men fel telefonnummer till en
 * snickare skickar en husägare till någon annan och drabbar båda. Uppgifterna
 * gäller dessutom verkliga företag som inte bett oss publicera något.
 *
 * ARBETSGÅNG
 *   1. Kandidater samlas i Google Drive: 01_Levande/Hantverkare/
 *   2. Max eller Tom ringer och bekräftar
 *   3. Posten flyttas hit med verifierad: { av, datum }
 *
 * KÄLLKRAV: företagets egen webbplats, Bolagsverket eller allabolag.
 * Aldrig Google Maps, Eniro eller hitta.se som enda belägg.
 */

export type Yrke =
  | 'snickare' | 'elektriker' | 'rormokare' | 'malare' | 'murare'
  | 'taklaggare' | 'markarbete' | 'betong' | 'totalentreprenad'
  | 'batmekaniker' | 'dykare' | 'sjotransport' | 'brunnsborrning' | 'sotare'

export const YRKE_ETIKETT: Record<Yrke, string> = {
  snickare: 'Snickare',
  elektriker: 'Elektriker',
  rormokare: 'Rörmokare',
  malare: 'Målare',
  murare: 'Murare',
  taklaggare: 'Takläggare',
  markarbete: 'Markarbete',
  betong: 'Betong',
  totalentreprenad: 'Totalentreprenad',
  batmekaniker: 'Båtmekaniker',
  dykare: 'Dykare',
  sjotransport: 'Sjötransport',
  brunnsborrning: 'Brunnsborrning',
  sotare: 'Sotare',
}

/** Sätts av en människa efter kontakt. False betyder "renderas inte". */
export type Verifiering = false | { av: string; datum: string }

export type Hantverkare = {
  slug: string
  /** Registrerat firmanamn, inte smeknamn. */
  namn: string
  ort: string
  yrken: Yrke[]
  /**
   * Utelämnas hellre än gissas. Saknas numret på företagets egen sida
   * ska fältet vara undefined — inte hämtat från en katalogsajt.
   */
  telefon?: string
  epost?: string
  webb?: string
  orgnr?: string
  /** Ö-slugs. Företagets egen uppgift om var de arbetar, tills annat bekräftats. */
  oar: string[]
  /** URL till belägget. */
  kalla: string
  /** ISO-datum då källan lästes. */
  kallaLast: string
  verifierad: Verifiering
  noteringar?: string
}

export const HANTVERKARE: Hantverkare[] = [
  {
    slug: 'ljustero-snickarn',
    namn: "Ljusterö-Snickar'n Sören Larsson AB",
    ort: 'Ljusterö',
    yrken: ['snickare'],
    telefon: '070 747 23 80',
    epost: 'soren@ljusterosnickarn.se',
    webb: 'https://ljusterosnickarn.se',
    orgnr: '556971-5906',
    oar: ['ljustero'],
    // KÄLLA: https://ljusterosnickarn.se — företagets egen webbplats, läst 2026-09-14
    kalla: 'https://ljusterosnickarn.se',
    kallaLast: '2026-09-14',
    verifierad: false,
    noteringar: 'Litet företag. Fråga om kapacitet innan vi listar dem som förstahandsval.',
  },
  {
    slug: 'oct-entreprenad',
    namn: 'OCT-Entreprenad Trä & Betong AB',
    ort: 'Värmdö',
    yrken: ['totalentreprenad', 'snickare', 'markarbete', 'betong', 'sjotransport'],
    // Inget telefonnummer angivet på företagets kontaktsida — fältet lämnas tomt.
    epost: 'info@oct-entreprenad.com',
    webb: 'https://oct-entreprenad.com',
    orgnr: '556955-5856',
    oar: [
      'blido', 'finnhamn', 'grinda', 'gallno', 'husaro', 'ingmarso',
      'ljustero', 'yxlan', 'angso',
    ],
    // KÄLLA: https://oct-entreprenad.com/kontakt/ — egen kontaktsida, läst 2026-09-14
    kalla: 'https://oct-entreprenad.com/kontakt/',
    kallaLast: '2026-09-14',
    verifierad: false,
    noteringar:
      'Egna båtar och pråmar för material och personal — ovanligt, gör dem relevanta för yttre öar. ' +
      'Kontaktsidan visar info@ som text men länkarna pekar mot andra adresser; bekräfta vilken som gäller. ' +
      'Ölistan är företagets egen uppgift, inte verifierad av oss.',
  },
]

/**
 * Hantverkare att visa på en ösida.
 *
 * Returnerar BARA verifierade poster. Obekräftade ligger kvar i filen men
 * når aldrig gränssnittet — det är avsiktligt och ska inte "optimeras bort".
 */
export function getHantverkareForIsland(slug: string): Hantverkare[] {
  return HANTVERKARE.filter(h => h.verifierad !== false && h.oar.includes(slug))
}

/** Alla poster som väntar på att någon ringer. För internt bruk. */
export function getObekraftade(): Hantverkare[] {
  return HANTVERKARE.filter(h => h.verifierad === false)
}
