export type SeasonGuide = {
  slug: string
  month: string              // visningsnamn, t.ex. "September"
  monthIndex: number         // 1–12
  tagline: string
  intro: string
  weather: string
  openIslands: string[]      // slugar till öar som typiskt är öppna
  activities: string[]
  tips: string[]
  avoid: string
  bestFor: string
}

export const SEASON_GUIDES: SeasonGuide[] = [
  {
    slug: 'september',
    month: 'September',
    monthIndex: 9,
    tagline: 'Höstens bästa hemlighet — lugnt, vackert och utan turister.',
    intro: 'September är skärgårdens bäst bevarade hemlighet. Turisterna är borta, vattnet fortfarande varmt (17–19°C), och öarna visar sina vackraste färger. Restauranger är öppna men utan kö, gästhamnar halvtomma och naturupplevelsen i topp. Många stamgäster anser att september är den bästa månaden av alla.',
    weather: 'Medeltemperatur 14–17°C. Vattnet 17–19°C — fortfarande bra för bad. Vackra solnedgångar. Risk för höststormar mot slutet av månaden — följ SMHI.',
    openIslands: ['sandhamn', 'uto', 'grinda', 'moja', 'vaxholm', 'fjaderholmarna', 'finnhamn'],
    activities: [
      'Bad och klipphopp — vattnet är fortfarande varmt',
      'Kajakpaddling i lugnt väder',
      'Svamp- och bärplockning i reservaten',
      'Vandring med höstfärger',
      'Matupplevelser — restaurangerna tar emot gäster utan väntetid',
    ],
    tips: [
      'Boka inte i förväg — det finns alltid plats i september.',
      'Ta med lager-på-lager-kläder. Morgnar och kvällar är kyliga, mitt på dagen kan vara 20°C.',
      'Utö och Grinda håller öppet hela september — bra bas för längre vistelse.',
      'Svamp är i säsong — ta med en korg och en svampbok.',
      'Waxholmsbolaget kör fortfarande täta avgångar i september.',
    ],
    avoid: 'Helger i mitten av september kan fortfarande vara folktäta — välj en vardag för verklig ro.',
    bestFor: 'Par, vuxna par, fotografi, mat, höstvandring',
  },
  {
    slug: 'oktober',
    month: 'Oktober',
    monthIndex: 10,
    tagline: 'Stormigt, vackert och nästan helt tomt — skärgård för den som söker äventyr.',
    intro: 'Oktober är skärgårdens ärligaste månad. Inte för alla — men för den som uppskattar vind, tomma hamnar och dramatiska landskap är det magiskt. Löven brinner i orange och rött, havets färg fördjupas och du kan stå ensam på en klippa med utsikt mot öppet hav. Många öar stänger i oktober — men de som håller öppet erbjuder en helt annan upplevelse.',
    weather: 'Medeltemperatur 8–12°C. Vattnet 12–14°C — för de flesta för kallt att bada. Starka vindar och snabb väderväxling. Ta med vindtäta kläder.',
    openIslands: ['vaxholm', 'sandhamn', 'uto', 'fjaderholmarna'],
    activities: [
      'Höstvandring med dramatiska landskap',
      'Besök på Vaxholms Kastell (utan kö)',
      'Luncher och middagar på öppna värdshus',
      'Fotografi — höstljuset i skärgården är exceptionellt',
      'Kajak för erfarna paddlare i lugna vikar',
    ],
    tips: [
      'Kontrollera vilka restauranger och hamnar som håller öppet — det varierar år till år.',
      'Vaxholm och Utö är säkraste valen i oktober — öppet hela hösten.',
      'Packa ull och regnkläder. Oktobervädret kan slå om på timmar.',
      'Waxholmsbolaget kör glesare tidtabell — planera resan i förväg.',
      'Hotell och boende är billigare än sommarsäsong. Bra tillfälle för ett längre besök.',
    ],
    avoid: 'Undvik yttre skärgården vid storm. Inre skärgårdens skyddade sund är säkrare.',
    bestFor: 'Naturälskare, fotografer, höstvandring, lugn och ro',
  },
  {
    slug: 'november',
    month: 'November',
    monthIndex: 11,
    tagline: 'Vinter i skärgården — för den som vill ha den helt för sig själv.',
    intro: 'November är inte för alla — och det är precis vad som gör det speciellt. En dag i november-skärgården är en upplevelse som få turister känner till. Vaxholm med sin historia, Utö med sin havsbastu och Fjäderholmarna med sin rökeriet håller öppet. Resten av skärgården är ditt.',
    weather: 'Medeltemperatur 3–7°C. Mörkt tidigt — solnedgång runt 15:30. Möjlighet till frost och is mot slutet av månaden. Regn och blåst är vanligt.',
    openIslands: ['vaxholm', 'uto', 'fjaderholmarna'],
    activities: [
      'Havsbastu på Utö — bäst i november när kontrasten är störst',
      'Historisk stadspromenad i Vaxholm',
      'Lunch på Fjäderholmarnas Krog eller Rökeriet',
      'Vintervandring i tomma naturreservat',
      'Fotografering av vinterskärgård',
    ],
    tips: [
      'Boka havsbastu på Utö i förväg — populärt även vintertid.',
      'Waxholm nås enkelt med SL hela vintern — buss eller båt.',
      'Klä dig för kyla — vindchill vid havet kan göra 5°C kännas som -5°C.',
      'Kombinera Fjäderholmarna med en promenad — 30 minuter från stan, annorlunda i vintermörker.',
      'Skärgårdsrestauranger med öppna eldstäder är en annan upplevelse än sommaren.',
    ],
    avoid: 'Planera inte längre båtturer — isläggning och storm kan stoppa trafiken utan förvarning.',
    bestFor: 'Havsbastu, historia, lugn, par, vinterfotografering',
  },
]

export function getSeasonGuide(slug: string): SeasonGuide | undefined {
  return SEASON_GUIDES.find(g => g.slug === slug)
}
