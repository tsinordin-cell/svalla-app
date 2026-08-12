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
    slug: 'juni',
    month: 'Juni',
    monthIndex: 6,
    tagline: 'Skärgårdens uppvaknande — midsommar, ljusnätter och allt öppnar.',
    intro: 'Juni är månaden när skärgården vaknar. Restauranger, gästhamnar, kajakuthyrningar och naturreservat öppnar nästan samtidigt under de första veckorna. Vattnet är fortfarande lite kallt för bad men solen skiner länge, ljuset är fantastiskt och folkmassan har ännu inte anlänt. Midsommar är junihöjdpunkten och firas på ett tiotal öar med dans, mat och stockholmskt gäng.',
    // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
    weather: 'Medeltemperatur 16–21°C. Vattnet 14–17°C mot slutet av månaden. Långa dagar med solnedgång runt 22:00. Ibland regn men oftare sol. Myggen börjar mot slutet av juni.',
    openIslands: ['sandhamn', 'uto', 'grinda', 'moja', 'vaxholm', 'fjaderholmarna', 'finnhamn', 'ljustero', 'orno', 'dalaro', 'arholma', 'furusund'],
    activities: [
      'Midsommarfirande på Grinda, Sandhamn och Utö',
      'Kajakpaddling i lugnt vatten tidigt på säsongen',
      'Vandring i naturreservat medan grönska är på topp',
      'Segling och kappseglingssäsong öppnar i juni',
      'Första bad av säsongen vid soliga klippor',
      'Cykling på bilfria öar som Möja, Svartsjölandet och Utö',
    ],
    tips: [
      'Midsommarhelgen är extremt bokad — planera minst tre månader i förväg.',
      'Börja veckan efter midsommar om du vill ha lugn och öppna krogar utan kö.',
      'Vattnet är badbart mot slutet av juni, men ta med en tjockare badhandduk.',
      'Mygg börjar dyka upp i slutet av juni — ta med myggmedel till skogsutflykter.',
      'Waxholmsbolaget kör sommarschema från midsommar med täta avgångar.',
    ],
    avoid: 'Midsommarafton och dagen efter är skärgårdens mest folktäta dagar om året. Välj en annan vecka om du vill ha ro.',
    bestFor: 'Midsommar, familjer, segling, kajakpaddling, vandring',
  },
  {
    slug: 'juli',
    month: 'Juli',
    monthIndex: 7,
    tagline: 'Högsäsong i full blomning — varmt vatten, öppna krogar och liv på varje brygga.',
    intro: 'Juli är skärgårdens kärna. Vattnet är som varmast, alla restauranger och gästhamnar är öppna och det märks tydligt. Sandhamn och Grinda är fullbokade, båttrafiken är tät och bryggor fylls snabbt på lördagar. Men det finns ett sätt att navigera juli utan köerna: åk tidigt, välj öar utanför den mest kända stigen, och boka allt i förväg.',
    weather: 'Medeltemperatur 20–25°C. Vattnet 18–22°C — bästa badtemperatur. Långa ljusa kvällar. Risk för åskväder på eftermiddagar. Solen skiner i genomsnitt 8–9 timmar per dag.',
    openIslands: ['sandhamn', 'uto', 'grinda', 'moja', 'vaxholm', 'fjaderholmarna', 'finnhamn', 'ljustero', 'orno', 'dalaro', 'arholma', 'furusund', 'svartso', 'runmaro', 'namdo', 'nattaro', 'gallno', 'ingmarso', 'rodloga'],
    activities: [
      'Bad vid klippor och sandstränder — vattnet som varmast',
      'Segling med kaféstop i gästhamnar längs kusten',
      'Hummer- och räkfrukost på ölkrogarna',
      'Kajakpaddling i lugna vikar tidigt på morgonen',
      'Middag vid havet på klassiska värdshus',
      'Cykling på bilfria öar utan bilar och buller',
    ],
    tips: [
      'Boka restauranger minst 2–3 veckor i förväg i juli. Sandhamns Värdshus och Utö Värdshus är ofta fullbokade månader i förväg.',
      'Åk ut på tisdag till torsdag om möjligt — helgerna är extremt folktäta.',
      'Välj en gästhamn med dusch och el om du ankrar upp — Grinda och Finnhamn är bra val.',
      'Lägg in en dag på en liten, okänd ö. Möja, Gällnö och Nåttarö är fantastiska och utan samma turisttryck.',
      'Ta med solskydd, myggolja och ett lager extra kläder för kvällen.',
    ],
    avoid: 'Att åka ut på en oplanerad lördagsmorgon i juli utan bokning är garanterat stressigt. Planera alltid i förväg.',
    bestFor: 'Familjer med barn, segling, bad, matupplevelser, par',
  },
  {
    slug: 'augusti',
    month: 'Augusti',
    monthIndex: 8,
    tagline: 'Sensommaren och sista chansen — varmt, folkfyllt och fortfarande magiskt.',
    intro: 'Augusti är sommaren på upploppet. Vattnet är fortfarande varmt, alla krogar håller öppet, och det finns en underbar känsla av att ta vara på sista solstunderna. Mot slutet av månaden börjar turisttrycket lätta och priserna sjunker lite. En av sommarsäsongens bästa perioder är faktiskt de sista veckorna i augusti.',
    // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
    weather: 'Medeltemperatur 18–23°C. Vattnet 18–21°C i början, 16–18°C mot slutet. Risk för åskoväder. Dagarna börjar bli kortare — solnedgång runt 20:30 i slutet av månaden.',
    openIslands: ['sandhamn', 'uto', 'grinda', 'moja', 'vaxholm', 'fjaderholmarna', 'finnhamn', 'ljustero', 'orno', 'dalaro', 'arholma', 'furusund', 'svartso', 'runmaro', 'namdo', 'nattaro', 'gallno', 'ingmarso'],
    activities: [
      'Bad och solning — vattnet fortfarande varmt hela månaden',
      'Bärplockning — blåbär, hallon och smultron på topp i augusti',
      'Hummerfiskets öppnande mot slutet av månaden',
      'Segling med bättre väder än juli (färre åskväder)',
      'Kajakpaddling inför säsongsslut',
      'Sista middag på favorit-krogen innan höstschema',
    ],
    tips: [
      'Åk ut sista augustiveckan för de bästa kombinationerna: fullt öppet, men lite lugnare.',
      'Boka havsbastu — bastusäsongen börjar bli attraktiv mot slutet av månaden.',
      'Hummerfiske öppnar sista helgen i september — börja planera redan i augusti.',
      'Kolla in bilfria öar för en cykeldag — träden börjar bli gula i slutet av månaden.',
      'Natthimlen börjar bli mörkare igen — perfekt för stjärnskådning i yttre skärgården.',
    ],
    avoid: 'Allra sista augustihelgen är mer folkfylld igen när stockholmare vill ta en sista sommardag. Välj vardagar.',
    bestFor: 'Familjer, bad, bärplockning, avkoppling, sista-chansen-semester',
  },
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
    // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
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
