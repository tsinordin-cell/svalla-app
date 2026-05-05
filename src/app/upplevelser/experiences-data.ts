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
  bookingUrl: string      // GetYourGuide-länk eller direktlänk
  affiliateType: 'getyourguide' | 'direct' | 'external'
  season: string          // t.ex. 'Juni–Augusti'
  coverImage?: string
}

export const EXPERIENCES: Experience[] = [
  {
    slug: 'ribbatstur-sandhamn',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Ribbåtstur i ytterskärgården',
    provider: 'Sandhamns Båtturer',
    category: 'ribbåtstur',
    duration: '2 timmar',
    price: 'från 695 kr/person',
    description: 'Susa ut mot öppet hav med ribbåt och guide — möjlighet att se säl och havsörn längs vägen. Avgår från KSSS-hamnen, ingen förkunskap krävs.',
    bookingUrl: 'https://www.getyourguide.com/sandhamn-l97423/',
    affiliateType: 'getyourguide',
    season: 'Maj–September',
  },
  {
    slug: 'fisketur-sandhamn',
    islandSlug: 'sandhamn',
    islandName: 'Sandhamn',
    name: 'Guidad fisketur — havsöring',
    provider: 'Sandhamns Fiskeguider',
    category: 'fisketur',
    duration: 'Halvdag (4 timmar)',
    price: 'från 890 kr/person',
    description: 'Fiska havsöring i ytterskärgårdens vatten med erfaren guide och all utrustning inkluderad. Avgår från Sandhamn tidigt på morgonen när fisken är aktiv.',
    bookingUrl: 'https://www.getyourguide.com/sandhamn-l97423/',
    affiliateType: 'getyourguide',
    season: 'April–Oktober',
  },
  {
    slug: 'kajaktur-grinda',
    islandSlug: 'grinda',
    islandName: 'Grinda',
    name: 'Kajaktur runt Grinda',
    provider: 'Grinda Outdoor',
    category: 'kajak',
    duration: '3 timmar',
    price: 'från 595 kr/person',
    description: 'Paddla runt Grinda med guide och utforska de omgivande grunden och vikarna som bara nås med kajak. Uthyrning och guidning från Grinda Wärdshus brygga.',
    bookingUrl: 'https://grinda.se/aktiviteter',
    affiliateType: 'external',
    season: 'Juni–Augusti',
  },
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
    bookingUrl: 'https://www.utovardshus.se/aktiviteter',
    affiliateType: 'direct',
    season: 'Maj–September',
  },
  {
    slug: 'ribbatstur-vaxholm',
    islandSlug: 'vaxholm',
    islandName: 'Vaxholm',
    name: 'Ribbåtstur — Vaxholm och fästningen',
    provider: 'Vaxholm Båtturer',
    category: 'ribbåtstur',
    duration: '1,5 timmar',
    price: 'från 495 kr/person',
    description: 'Se Vaxholms fästning och den inre skärgården från vattnet med guide ombord. Avgår från Vaxholms gästhamn, perfekt som komplement till en dag i Vaxholm.',
    bookingUrl: 'https://www.getyourguide.com/vaxholm-l97424/',
    affiliateType: 'getyourguide',
    season: 'Juni–Augusti',
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
