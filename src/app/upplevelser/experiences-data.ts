// ── GetYourGuide affiliate ────────────────────────────────────────────────
// Registrera konto på partner.getyourguide.com — tar 5 min, 8% provision.
// Lägg in ert partner_id nedan (t.ex. 'ABC123') så spåras alla bokningar automatiskt.
export const GYG_PARTNER_ID = '' // ← fyll i ert ID när ni fått det

/** Bygger GYG-länk med affiliate-tagg om partner_id är satt */
export function gygUrl(path: string): string {
  const base = `https://www.getyourguide.com${path}`
  if (!GYG_PARTNER_ID) return base
  const sep = path.includes('?') ? '&' : '?'
  return `${base}${sep}partner_id=${GYG_PARTNER_ID}`
}

// ── Typer ─────────────────────────────────────────────────────────────────

export type ExperienceCategory =
  | 'ribbåtstur'
  | 'fisketur'
  | 'kajak'
  | 'sup'
  | 'dykning'
  | 'segling'
  | 'naturtur'
  | 'kulturtur'
  | 'övrigt'

export type Experience = {
  slug: string
  islandSlug: string      // matchar slug i island-data.ts — EN ö per upplevelse
  islandName: string      // visningsnamn, t.ex. 'Sandhamn'
  name: string            // upplevelsens namn
  provider: string        // aktörens namn
  category: ExperienceCategory
  duration: string        // t.ex. '2 timmar' eller 'Heldag'
  price: string           // avläst hos operatören, aldrig uppfunnet
  description: string     // Svallarösten, max 2 meningar
  bookingUrl: string      // GYG-länk (via gygUrl()) eller direktlänk
  affiliateType: 'getyourguide' | 'direct' | 'external'
  season: string          // t.ex. 'Juni–Augusti'
  coverImage?: string

  /** Betyg hos operatören, t.ex. 4.9. Utelämnas om operatören inte publicerar betyg. */
  rating?: number
  /** Antal omdömen bakom betyget. */
  reviews?: number
  /**
   * VARJE pris i den här filen ska vara avläst hos operatören och datummärkt.
   * Uppfinn aldrig ett pris — en post utan verifierat pris hör inte hemma här.
   */
  priceCheckedAt: string  // ISO-datum, t.ex. '2026-08-06'
  priceSource: string     // URL till sidan priset lästes av på
}

// ── Upplevelser ───────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [

  // ══════════════════════════════════════════════════════════════════════
  // Alla priser nedan är avlästa hos operatören 2026-08-06 och datummärkta.
  //
  // Den tidigare listan var till stora delar påhittad: 13 av 18 poster hade
  // en platshållare som operatör ("GetYourGuide / Stockholmsaktör"), och
  // NIO AV NIO kontrollerade priser var fel — sju för låga, ett med 69 %.
  // Två länkar pekade på produkter som inte längre finns.
  //
  // Posterna om fiske, fågelskådning, ostron och SUP är BORTTAGNA, inte
  // ersatta: det fanns ingen verklig produkt bakom dem. GetYourGuides
  // fiskekategori för Stockholm innehåller inga fisketurer.
  // ══════════════════════════════════════════════════════════════════════

  // ── Ribbåtstur ──────────────────────────────────────────────────────────
  {
    slug: 'rib-speedboat-skargarden',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Stockholm: 2-timmars tur med RIB Speed Boat i skärgården',
    provider: 'Via GetYourGuide',
    category: 'ribbåtstur',
    duration: '2 timmar',
    priceSource: 'https://www.getyourguide.com/stockholm-l50/stockholm-rib-speed-boat-tour-of-the-archipelago-t418650/',
    priceCheckedAt: '2026-08-06',
    price: 'från 1 590 SEK',
    rating: 4.9,
    reviews: 461,
    description: 'Två timmar rakt ut i skärgården i hög fart. Avgår från Stockholm city och kräver ingen förkunskap.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-rib-speed-boat-tour-of-the-archipelago-t418650/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'rib-battur-skargardso',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Stockholm: RIB-båttur och besök på en skärgårdsö',
    provider: 'Via GetYourGuide',
    category: 'ribbåtstur',
    duration: '2 timmar',
    priceSource: 'https://www.getyourguide.com/varmdo-municipality-l400/speed-boat-tour-and-archipelago-island-visit-t604814/',
    priceCheckedAt: '2026-08-06',
    price: 'från 1 950 SEK',
    rating: 4.5,
    description: 'RIB-tur som lägger till vid en ö så att du hinner sätta foten i land. Avgår från Värmdö.',
    bookingUrl: gygUrl('/varmdo-municipality-l400/speed-boat-tour-and-archipelago-island-visit-t604814/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },

  // ── Kajak ───────────────────────────────────────────────────────────────
  {
    slug: 'kajaktur-skargardsoarna-picknick',
    islandSlug: 'vaxholm',
    islandName: 'Vaxholm',
    name: 'Stockholm: Kajaktur på Skärgårdsöarna och picknick utomhus',
    provider: 'Via GetYourGuide',
    category: 'kajak',
    duration: '4–8 timmar',
    priceSource: 'https://www.getyourguide.com/stockholm-l50/stockholm-archipelago-kayak-tour-and-picnic-on-the-island-t332691/',
    priceCheckedAt: '2026-08-06',
    price: 'från 1 390 SEK',
    rating: 4.9,
    reviews: 266,
    description: 'Heldag i kajak mellan öarna med picknick på en klippa. Liten grupp och guide hela vägen.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-archipelago-kayak-tour-and-picnic-on-the-island-t332691/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'kajak-toast-on-the-water',
    islandSlug: 'vaxholm',
    islandName: 'Vaxholm',
    name: 'Kajakpaddling i skärgården & Toast on the Water i solnedgången',
    provider: 'Skärgårdens Kanotcenter, via GetYourGuide',
    category: 'kajak',
    duration: '3–4,5 timmar',
    priceSource: 'https://www.getyourguide.com/skargardens-kanotcenter-l165170/from-vaxholm-stockholm-archipelago-sunset-kayak-tour-t413685/',
    priceCheckedAt: '2026-08-06',
    price: 'från 1 090 SEK',
    rating: 4.5,
    reviews: 70,
    description: 'Kvällspaddling från Vaxholm med tilltugg på vattnet när solen går ner. Privat alternativ finns.',
    bookingUrl: gygUrl('/skargardens-kanotcenter-l165170/from-vaxholm-stockholm-archipelago-sunset-kayak-tour-t413685/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'sjalvstyrd-kajaktur-stockholm',
    islandSlug: 'vaxholm',
    islandName: 'Vaxholm',
    name: 'Stockholm: Självstyrd kajaktur för 1 eller 2 personer',
    provider: 'Via GetYourGuide',
    category: 'kajak',
    duration: '2 timmar',
    priceSource: 'https://www.getyourguide.com/sv-se/stockholm-l50/kanot-och-kajakturer-tc61/',
    priceCheckedAt: '2026-08-06',
    price: 'från 290 SEK',
    rating: 4.8,
    reviews: 415,
    description: 'Billigaste vägen ut i en kajak — du paddlar själv, utan guide. Bra första gång på vattnet.',
    bookingUrl: gygUrl('/sv-se/stockholm-l50/stockholm-sjalvstyrd-kajak-tur-t192339/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'hyr-kajak-sup-grinda',
    islandSlug: 'grinda',
    islandName: 'Grinda',
    name: 'Hyr kajak eller SUP på Grinda',
    provider: 'Grinda (hamnkontoret)',
    category: 'kajak',
    duration: '0–2 tim upp till 48 tim',
    priceSource: 'https://grinda.se/aktiviteter/',
    priceCheckedAt: '2026-08-06',
    price: 'från 270 kr (0–2 tim), 570 kr heldag, 770 kr per dygn',
    description: 'Uthyrning, inte guidad tur — du hämtar kajaken i hamnkontoret och paddlar på egen hand. Runt ön finns vikar du får helt för dig själv.',
    bookingUrl: 'https://grinda.se/aktiviteter/',
    affiliateType: 'direct',
    season: 'Maj–September',
  },

  // ── Segling ─────────────────────────────────────────────────────────────
  {
    slug: 'segling-tid-pa-o',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Stockholm: Segling i skärgårdslandskapet + tid på en ö',
    provider: 'Via GetYourGuide',
    category: 'segling',
    duration: '5–9 timmar',
    priceSource: 'https://www.getyourguide.com/stockholm-l50/stockholm-archipelago-island-tour-with-lunch-via-sailboat-t415640/',
    priceCheckedAt: '2026-08-06',
    price: 'från 1 650 SEK',
    rating: 4.9,
    description: 'Segling i liten grupp med tid i land på en ö, och upphämtning i staden. Ingen seglingsvana krävs.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-archipelago-island-tour-with-lunch-via-sailboat-t415640/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'dagsutflykt-segelbat',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Dagsutflykt med segelbåt i Stockholms skärgård',
    provider: 'Via GetYourGuide',
    category: 'segling',
    duration: 'Heldag',
    priceSource: 'https://www.getyourguide.com/stockholm-l50/full-day-stockholm-archipelago-sailing-tour-t10185/',
    priceCheckedAt: '2026-08-06',
    price: 'från 3 490 SEK',
    rating: 4.9,
    description: 'Hel dag ombord med skeppare. Det dyraste alternativet i listan, och det som tar dig längst ut.',
    bookingUrl: gygUrl('/stockholm-l50/full-day-stockholm-archipelago-sailing-tour-t10185/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },

  // ── Kulturtur och sightseeing ───────────────────────────────────────────
  {
    slug: 'guidad-skargardskryssning',
    islandSlug: 'vaxholm',
    islandName: 'Vaxholm',
    name: 'Stockholm: Guidad skärgårdskryssning',
    provider: 'Via GetYourGuide',
    category: 'kulturtur',
    duration: '2 timmar',
    priceSource: 'https://www.getyourguide.com/stockholm-l50/stockholm-archipelago-boat-tour-t811343/',
    priceCheckedAt: '2026-08-06',
    price: 'från 367 SEK',
    rating: 4.4,
    reviews: 5306,
    description: 'Listans mest bokade tur med bred marginal. Två timmar med guide, utan att du behöver planera något.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-archipelago-boat-tour-t811343/'),
    affiliateType: 'getyourguide',
    season: 'April–Oktober',
  },
  {
    slug: 'guidad-tur-klassisk-trabat',
    islandSlug: 'vaxholm',
    islandName: 'Vaxholm',
    name: 'Stockholm: Guidad tur i skärgården med klassisk träbåt',
    provider: 'Via GetYourGuide',
    category: 'kulturtur',
    duration: '105 minuter',
    priceSource: 'https://www.getyourguide.com/stockholm-l50/stockholm-guided-archipelago-tour-by-classic-wooden-boat-t1030725/',
    priceCheckedAt: '2026-08-06',
    price: 'från 375 SEK',
    rating: 4.7,
    reviews: 660,
    description: 'Samma vatten som kryssningen, men i en gammal träbåt. Högre betyg och knappt dyrare.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-guided-archipelago-tour-by-classic-wooden-boat-t1030725/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },

  // ── Naturtur ────────────────────────────────────────────────────────────
  {
    slug: 'skargardsdag-cykel-lunch-uto',
    islandSlug: 'uto',
    islandName: 'Utö',
    name: 'Skärgårdsdag – Cykel & Lunch',
    provider: 'Utö Värdshus',
    category: 'naturtur',
    duration: 'Heldag',
    priceSource: 'https://www.utovardshus.se/erbjudanden_paket/skargardsdag-cykel-lunch/',
    priceCheckedAt: '2026-08-06',
    price: '295 SEK/vuxen, 215 SEK/barn',
    description: 'Cykel för hela dagen och dagens lunch ingår. Du hämtar cykeln i Hamnboden och rullar genom gruvbyn ut mot havet.',
    bookingUrl: 'https://www.utovardshus.se/erbjudanden_paket/skargardsdag-cykel-lunch/',
    affiliateType: 'direct',
    season: 'Juni–September',
  },
]

export function getExperience(slug: string): Experience | undefined {
  return EXPERIENCES.find(e => e.slug === slug)
}

export function getExperiencesByIsland(islandSlug: string): Experience[] {
  return EXPERIENCES.filter(e => e.islandSlug === islandSlug)
}

export function getExperiencesByCategory(category: ExperienceCategory): Experience[] {
  return EXPERIENCES.filter(e => e.category === category)
}
