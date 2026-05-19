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
  price: string           // t.ex. 'från 695 kr/person'
  description: string     // Svallarösten, max 2 meningar
  bookingUrl: string      // GYG-länk (via gygUrl()) eller direktlänk
  affiliateType: 'getyourguide' | 'direct' | 'external'
  season: string          // t.ex. 'Juni–Augusti'
  coverImage?: string
}

// ── Upplevelser ───────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [

  // ── Ribbåtstur ──────────────────────────────────────────────────────────
  {
    slug: 'ribbatstur-sandhamn',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'RIB-safari i ytterskärgården',
    provider: 'GetYourGuide / Stockholmsaktör',
    category: 'ribbåtstur',
    duration: '2 timmar',
    price: 'från 695 kr/person',
    description: 'Susa ut mot öppet hav med ribbåt och guide — möjlighet att se säl och havsörn längs vägen. Avgår från Stockholm city, ingen förkunskap krävs.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-rib-speed-boat-tour-of-the-archipelago-t418650/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'ribbatstur-vaxholm',
    islandSlug: 'vaxholm',
    islandName: 'Vaxholm',
    name: 'RIB-tur — Vaxholm och fästningen',
    provider: 'GetYourGuide / Stockholmsaktör',
    category: 'ribbåtstur',
    duration: '1,5 timmar',
    price: 'från 495 kr/person',
    description: 'Se Vaxholms fästning och den inre skärgården från vattnet med guide ombord. Perfekt komplement till en dag i Vaxholm.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-archipelago-1-hour-tour-by-rib-speed-boat-t58521/'),
    affiliateType: 'getyourguide',
    season: 'Juni–Augusti',
  },
  {
    slug: 'ribbatstur-solnedgang',
    islandSlug: 'sandhamn',
    islandName: 'Stockholms skärgård',
    name: 'RIB-safari vid solnedgången',
    provider: 'GetYourGuide / Stockholmsaktör',
    category: 'ribbåtstur',
    duration: '2,5 timmar',
    price: 'från 895 kr/person',
    description: 'Upplev skärgårdens magiska kvällsljus från en ribbåt — guide berättar om naturen och historien längs vägen. Bäst i juni–juli när solen går ner sent.',
    bookingUrl: gygUrl('/varmdo-municipality-l400/speed-boat-tour-and-archipelago-island-visit-t604814/'),
    affiliateType: 'getyourguide',
    season: 'Juni–Augusti',
  },

  // ── Fisketur ────────────────────────────────────────────────────────────
  {
    slug: 'fisketur-havsoring-sandhamn',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Guidad fisketur — havsöring',
    provider: 'GetYourGuide / Fiskeguide',
    category: 'fisketur',
    duration: 'Halvdag (4 timmar)',
    price: 'från 890 kr/person',
    description: 'Fiska havsöring i ytterskärgårdens vatten med erfaren guide och all utrustning inkluderad. Avgår från Sandhamn tidigt på morgonen när fisken är som aktiv.',
    bookingUrl: gygUrl('/stockholm-l50/fishing-tours-tc302/'),
    affiliateType: 'getyourguide',
    season: 'April–Oktober',
  },
  {
    slug: 'fisketur-heldagsfiske',
    islandSlug: 'finnhamn',
    islandName: 'Finnhamn',
    name: 'Heldagsfiske i ytterskärgården',
    provider: 'GetYourGuide / Fiskeguide',
    category: 'fisketur',
    duration: 'Heldag (8 timmar)',
    price: 'från 1 490 kr/person',
    description: 'En hel dag på havet med allt inkluderat — utrustning, bete, lunch och guide med djup lokalkännedom. Fångst varierar med säsong: öring, gädda, abborre och torsk.',
    bookingUrl: gygUrl('/stockholm-l50/fishing-tours-tc302/'),
    affiliateType: 'getyourguide',
    season: 'Maj–Oktober',
  },
  {
    slug: 'fisketur-vinterfiske',
    islandSlug: 'uto',
    islandName: 'Utö',
    name: 'Vinterfiske på isen — Utö',
    provider: 'Utö Värdshus / Guide',
    category: 'fisketur',
    duration: '3 timmar',
    price: 'från 650 kr/person',
    description: 'Pimpla abborre och gädda på islagd skärgård med guide och all utrustning. Värm upp efteråt i bastuflotten — upplevelsen som skiljer Utö från alla andra.',
    bookingUrl: 'https://www.utovardshus.se/aktiviteter',
    affiliateType: 'direct',
    season: 'Januari–Mars (isförhållanden)',
  },

  // ── Kajak ───────────────────────────────────────────────────────────────
  {
    slug: 'kajaktur-grinda',
    islandSlug: 'grinda',
    islandName: 'Grinda',
    name: 'Kajaktur runt Grinda',
    provider: 'Grinda Wärdshus',
    category: 'kajak',
    duration: '3 timmar',
    price: 'från 595 kr/person',
    description: 'Paddla runt Grinda med guide och utforska grunden och vikarna som bara nås med kajak. Uthyrning och guidning från bryggan vid Grinda Wärdshus.',
    bookingUrl: 'https://grinda.se/aktiviteter',
    affiliateType: 'direct',
    season: 'Juni–Augusti',
  },
  {
    slug: 'havskajak-skargarden',
    islandSlug: 'finnhamn',
    islandName: 'Stockholms skärgård',
    name: 'Havskajak i Stockholms skärgård',
    provider: 'GetYourGuide / Kajakaktör',
    category: 'kajak',
    duration: 'Halvdag (4 timmar)',
    price: 'från 750 kr/person',
    description: 'Guidad kajaktur bland kobbar och skär med erfaren paddleguide — ingen förkunskap krävs. Utrusning och säkerhetsinstruktion ingår.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-archipelago-kayak-tour-and-picnic-on-the-island-t332691/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'kajak-solnedgang-sandhamn',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Kajakpaddling vid solnedgången',
    provider: 'GetYourGuide / Kajakaktör',
    category: 'kajak',
    duration: '2 timmar',
    price: 'från 550 kr/person',
    description: 'Paddla ut i kvällslugnet runt Sandhamns kobbar när turisterna gått hem. En av skärgårdens bästa kvällsupplevelser — lugn, vacker och prisvärd.',
    bookingUrl: gygUrl('/skargardens-kanotcenter-l165170/from-vaxholm-stockholm-archipelago-sunset-kayak-tour-t413685/'),
    affiliateType: 'getyourguide',
    season: 'Juni–Augusti',
  },

  // ── Naturtur ────────────────────────────────────────────────────────────
  {
    slug: 'naturtur-fagelskadning-landsort',
    islandSlug: 'oja',
    islandName: 'Landsort (Öja)',
    name: 'Fågelskådning på Landsort',
    provider: 'GetYourGuide / Naturguide',
    category: 'naturtur',
    duration: 'Halvdag',
    price: 'från 490 kr/person',
    description: 'Landsort är en av Sveriges viktigaste fågelstationer — guide visar dig sällsynta sträckfåglar under vår och höst. Kikare och artlista ingår.',
    bookingUrl: gygUrl('/stockholm-archipelago-l125283/'),
    affiliateType: 'getyourguide',
    season: 'Maj och September–Oktober',
  },
  {
    slug: 'naturtur-vandring-uto',
    islandSlug: 'uto',
    islandName: 'Utö',
    name: 'Guidad naturvandring — Utö',
    provider: 'Utö Värdshus',
    category: 'naturtur',
    duration: '3 timmar',
    price: 'från 395 kr/person',
    description: 'Gå med lokal guide längs Utös kust och gruvstigar — hör om öns historia som järnmalmsgruva och naturreservat. Perfekt för hela familjen.',
    bookingUrl: 'https://www.utovardshus.se/aktiviteter',
    affiliateType: 'direct',
    season: 'Maj–Oktober',
  },
  {
    slug: 'naturtur-skargarden-dag',
    islandSlug: 'vaxholm',
    islandName: 'Stockholms skärgård',
    name: 'Dagstur i skärgården med naturguide',
    provider: 'GetYourGuide / Naturguide',
    category: 'naturtur',
    duration: 'Heldag',
    price: 'från 990 kr/person',
    description: 'Utforska skärgårdens ekosystem med naturguide — flora, fauna, geologi och friluftsliv. Lunch på en enslig ö ingår i de flesta avgångar.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-archipelago-boat-tour-t811343/'),
    affiliateType: 'getyourguide',
    season: 'Juni–September',
  },

  // ── Segling ─────────────────────────────────────────────────────────────
  {
    slug: 'seglingskurs-nyborjare',
    islandSlug: 'sandhamn',
    islandName: 'Stockholms skärgård',
    name: 'Seglingskurs för nybörjare',
    provider: 'GetYourGuide / Seglingsaktör',
    category: 'segling',
    duration: 'Heldag',
    price: 'från 1 290 kr/person',
    description: 'Lär dig segla under en dag med certifierad instruktör — från grunderna i att hissa segel till att ta dig säkert in i hamn. Båt och utrustning ingår.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-archipelago-island-tour-with-lunch-via-sailboat-t415640/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'dagssegling-skargarden',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Dagssegling med guide i skärgården',
    provider: 'GetYourGuide / Seglingsaktör',
    category: 'segling',
    duration: 'Heldag',
    price: 'från 1 095 kr/person',
    description: 'Segla ut mot ytterskärgården på en klassisk trädäcksbåt med erfaren skipper. Du kan hjälpa till med seglandet eller bara njuta av utsikten — du bestämmer.',
    bookingUrl: gygUrl('/stockholm-l50/full-day-stockholm-archipelago-sailing-tour-t10185/'),
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },

  // ── Övrigt ──────────────────────────────────────────────────────────────
  {
    slug: 'havsbastu-uto',
    islandSlug: 'uto',
    islandName: 'Utö',
    name: 'Havsbastupaket med kvällsdopp',
    provider: 'Utö Värdshus',
    category: 'övrigt',
    duration: '2 timmar',
    price: 'från 450 kr/person',
    description: 'En av skärgårdens mest omtalade havsbastuupplevelser — basta, hoppa i, upprepa. Kvällspass med solnedgången är det bästa alternativet, boka i god tid.',
    bookingUrl: 'https://www.utovardshus.se/spa-och-bastu',
    affiliateType: 'direct',
    season: 'Maj–September',
  },
  {
    slug: 'skargardskryssning-dag',
    islandSlug: 'vaxholm',
    islandName: 'Stockholms skärgård',
    name: 'Klassisk skärgårdskryssning',
    provider: 'GetYourGuide / Strömma',
    category: 'övrigt',
    duration: 'Heldag',
    price: 'från 599 kr/person',
    description: 'Åk med klassisk ångbåt ut i skärgården och tillbaka — mellanlandning på en ö ingår. Den perfekta heldagen för den som vill uppleva skärgårdsidyllen utan att äga båt.',
    bookingUrl: gygUrl('/stockholm-l50/stockholm-guided-archipelago-tour-by-classic-wooden-boat-t1030725/'),
    affiliateType: 'getyourguide',
    season: 'Juni–Augusti',
  },
  {
    slug: 'ostron-bohuslan',
    islandSlug: 'grebbestad',
    islandName: 'Grebbestad (Bohuslän)',
    name: 'Ostron- och skaldjurstur — Bohuslän',
    provider: 'GetYourGuide / Bohuslänsaktör',
    category: 'övrigt',
    duration: '3 timmar',
    price: 'från 850 kr/person',
    description: 'Plocka ostron direkt ur havet med lokal guide och avnjut dem på klipporna med bubbel. En av Sveriges mest ikoniska matupplevelser vid havet.',
    bookingUrl: gygUrl('/grebbestad-l204661/'),
    affiliateType: 'getyourguide',
    season: 'September–April (bäst höst)',
  },
  {
    slug: 'sup-sandhamn',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Stand-up paddling runt Sandön',
    provider: 'GetYourGuide / SUP-aktör',
    category: 'sup',
    duration: '2 timmar',
    price: 'från 450 kr/person',
    description: 'Paddla SUP-bräda runt Sandöns stränder och klippor med guide — lugnt vatten och fantastisk utsikt. Inga förkunskaper krävs, utrustning ingår.',
    bookingUrl: gygUrl('/stockholm-l50/canoe-kayak-tours-tc61/'),
    affiliateType: 'getyourguide',
    season: 'Juni–Augusti',
  },
]

// ── Hjälpfunktioner ───────────────────────────────────────────────────────

export function getExperience(slug: string): Experience | undefined {
  return EXPERIENCES.find(e => e.slug === slug)
}

export function getExperiencesByIsland(islandSlug: string): Experience[] {
  return EXPERIENCES.filter(e => e.islandSlug === islandSlug)
}

export function getExperiencesByCategory(category: ExperienceCategory): Experience[] {
  return EXPERIENCES.filter(e => e.category === category)
}
