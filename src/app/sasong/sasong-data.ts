/**
 * sasong-data.ts — 4 säsonger (vår/sommar/höst/vinter) med generella tips.
 *
 * INGA per-månads-data, INGA påhittade events. Bara generella beskrivningar
 * av säsongen + säsongsspecifika tips som gäller hela skärgården.
 *
 * Strategi:
 *   1. Beskriv vad säsongen är (väder, känsla, vad förändras)
 *   2. Lista vad användaren bör tänka på den säsongen
 *   3. Filtrera öar baserat på island.facts.season (programmatisk lista)
 */

export interface Season {
  slug: 'var' | 'sommar' | 'host' | 'vinter'
  name: string
  /** Vilka månader täcker säsongen — för intro-text */
  monthsLabel: string
  emoji: string
  /** Färgtema för hero */
  color: string
  /** Hero-beskrivning, 1-2 meningar */
  tagline: string
  /** Längre intro-text, 2-3 paragrafer */
  intro: string[]
  /** Vad förändras den här säsongen */
  whatChanges: string[]
  /** Praktiska tips för säsongen */
  tips: { title: string; text: string }[]
  /** Söka efter dessa nyckelord i island.facts.season för att lista relevanta öar */
  seasonKeywords: string[]
  /** Vilka aktiviteter passar bäst — för intern länkning till /aktivitet/ */
  recommendedActivities: { slug: string; label: string }[]
}

export const SEASONS: Season[] = [
  {
    slug: 'var',
    name: 'Vår',
    monthsLabel: 'mars–maj',
    emoji: '🌸',
    color: '#7ba05b',
    tagline: 'Tystaste säsongen i skärgården — lugn, fågelliv och första vårsolen.',
    intro: [
      'Våren i skärgården är ett av Sveriges bäst bevarade hemligheter. Innan turistsäsongen drar igång i juni är öarna nästan folktomma, bryggorna lugna och naturen vaknar med fågelliv, vitsippor och blå sippa.',
      'Vädret är ombytligt — soliga 12-grader i april kan följas av kall vind och regn dagen efter. Vattnet är fortfarande iskallt (4–8 °C), så bad är för de tappra. Men för den som söker tystnad, vandringsstigar utan folk och första solbadet på en klippa är våren oslagbar.',
      'Många restauranger och säsongsboenden öppnar i maj. Färjor går oftast på lågsäsongstrafik fram till midsommar — kolla aktuella tidtabeller hos Waxholmsbolaget.',
    ],
    whatChanges: [
      'Färjor: lågsäsongstrafik fram till mitten av juni',
      'Restauranger: många öppnar i slutet av april eller början av maj',
      'Boende: lättare att få plats, ofta lägre priser',
      'Naturen: vitsippa, blå sippa, fågelkonsert i tidig morgon',
      'Vattentemperatur: 4–8 °C — för kallt för bad utan våtdräkt',
    ],
    tips: [
      { title: 'Klä dig i lager', text: 'Vädret växlar snabbt på våren. Tunn jacka + vindjacka + mössa är minimum, även soliga dagar.' },
      { title: 'Boka inte i förväg', text: 'Lågsäsong = möjligt att vara spontan. Däremot — kolla att restaurangen är öppen innan du åker.' },
      { title: 'Perfekt för vandring', text: 'Mygg och flugor har inte vaknat än, marken är torr och utsikter är klara.' },
      { title: 'Fågelvänner — ta kikaren', text: 'Vårfågelträcken passerar skärgården i april–maj. Tärnor, lommar och vitkindade gäss.' },
    ],
    seasonKeywords: ['vår', 'maj', 'april', 'mars', 'helår', 'året om', 'året runt'],
    recommendedActivities: [
      { slug: 'vandring', label: 'Vandring' },
      { slug: 'kajak', label: 'Kajak' },
    ],
  },
  {
    slug: 'sommar',
    name: 'Sommar',
    monthsLabel: 'juni–augusti',
    emoji: '☀️',
    color: '#c96e2a',
    tagline: 'Skärgårdens högsäsong — bad, segling, krogliv och solnedgångar.',
    intro: [
      'Sommaren är skärgårdens hjärta. Alla restauranger, hamnar, butiker och attraktioner är öppna. Färjor går med högsta frekvens, dagsturer från Stockholm täcker större delen av Stockholms skärgård och Bohusläns kustsamhällen är fulla av semesterfirare.',
      'Vattentemperaturen kryper upp över 18 °C i juli — bra för bad i klippvik eller på sandstrand. Solnedgången sker sent (efter 22:00 i juli) vilket ger långa kvällar på bryggan eller i naturhamnar.',
      'Nackdelen: trängsel. Sandhamn, Grinda, Smögen och Marstrand kan vara överfulla i juli. För dem som vill ha lugn — välj en yttre eller mindre känd ö, eller besök i juni eller sena augusti.',
    ],
    whatChanges: [
      'Färjor: högsta frekvens, fler avgångar, Cinderella-båtarna går',
      'Restauranger: alla öppna, längsta öppettider, oftast bokningskrav på populära krogar',
      'Boende: dyrast och svårast att få — boka månader i förväg',
      'Bad: vattnet 16–22 °C, sandstränder och klippvikar',
      'Trängsel: populära öar har många besökare i juli',
    ],
    tips: [
      { title: 'Boka tidigt', text: 'Boende, restauranger och gästhamnar är ofta fullbokade i juli. Boka 2–6 månader i förväg.' },
      { title: 'Undvik trängsel — välj juni eller augusti', text: 'Vädret är ofta lika fint men öarna är märkbart lugnare. Vattnet är till och med varmare i augusti.' },
      { title: 'Solskydd och vatten', text: 'Skärgården reflekterar mycket sol från vatten och klippor. Solhatt, solglasögon och 1–2 L vatten är minimum för dagsturer.' },
      { title: 'Yttre öar för lugn', text: 'Sandhamn, Grinda och Möja är livliga. Vill du ha lugn — välj Rödlöga, Nämdö, Bullerö eller Landsort.' },
    ],
    seasonKeywords: ['sommar', 'juni', 'juli', 'augusti', 'maj-september', 'maj–september', 'helår', 'året om'],
    recommendedActivities: [
      { slug: 'kajak', label: 'Kajak' },
      { slug: 'vandring', label: 'Vandring' },
    ],
  },
  {
    slug: 'host',
    name: 'Höst',
    monthsLabel: 'september–november',
    emoji: '🍂',
    color: '#a8612e',
    tagline: 'Skärgårdens vackraste säsong — varma färger, lugna bryggor och svamp i skogen.',
    intro: [
      'Hösten är den underskattade säsongen. Trafiken har dragit sig tillbaka efter augusti, vädret är ofta stabilt och färgerna i lövskogen — speciellt på öar med björk och asp — är spektakulära. September är ofta en av årets vackraste månader i Stockholms skärgård.',
      'Vattnet är fortfarande varmt från sommaren (15–18 °C i september) men svalnar snabbt. Restauranger och boende börjar stänga successivt under september–oktober. I november är det mest helår-verksamheter kvar.',
      'Höst är perfekt för dem som söker en lugn skärgårdsupplevelse med samma vackra natur som på sommaren, men utan trängsel. Svampplockning, vandring och kajakpaddling i stilla vatten är säsongens höjdpunkter.',
    ],
    whatChanges: [
      'Färjor: lågsäsongstrafik från mitten av september',
      'Restauranger: stänger successivt, många stängda i oktober',
      'Boende: lättare att boka, ofta sänkta priser',
      'Vatten: 15 °C i september, 10 °C i oktober, kallt i november',
      'Natur: höstfärger i löv, svamp i skog, klar luft',
    ],
    tips: [
      { title: 'Kolla att stället är öppet', text: 'Många restauranger och boenden stänger i september eller oktober. Ring eller maila innan du åker.' },
      { title: 'Klä dig varmare än du tror', text: 'Vinden över öppet vatten är kallare än på fastlandet. Lägg på ett extra lager.' },
      { title: 'Svampplockning i september', text: 'Björk- och granskog på öar som Möja, Svartsö och Nämdö har bra svampställen. Allemansrätten gäller.' },
      { title: 'Mörkare kvällar', text: 'Solen går ner före 18:00 i oktober — planera dagen så du är hemma innan det blir mörkt.' },
    ],
    seasonKeywords: ['höst', 'september', 'oktober', 'november', 'helår', 'året om', 'året runt'],
    recommendedActivities: [
      { slug: 'vandring', label: 'Vandring' },
      { slug: 'kajak', label: 'Kajak' },
    ],
  },
  {
    slug: 'vinter',
    name: 'Vinter',
    monthsLabel: 'december–februari',
    emoji: '❄️',
    color: '#4a6b85',
    tagline: 'Skärgården i sitt rena tillstånd — tystnad, snö, is och bastubad.',
    intro: [
      'Vintern i skärgården är en helt annan upplevelse. De flesta öar är stängda för turism — endast de med året-runt-verksamhet och fastboende är aktiva. Sandhamn, Vaxholm, Möja och Marstrand har vinteröppet hela året eller delvis.',
      'Är det en kall vinter kan delar av innerskärgården frysa till. Skridskoåkning på fjärdar och isfiske från fastfrusen brygga är klassiska skärgårdsvintervaktiviteter, men kräver lokalkännedom — gå aldrig ut på okänd is utan vägledning.',
      'För dem som vill uppleva skärgården i full tystnad är vintern ovärderlig. Bastubad i isvak, vinterpromenad på frusen brygga och vintersolnedgång över snötäckta klippor är minnesvärda upplevelser.',
    ],
    whatChanges: [
      'Färjor: minimal trafik — endast skolskjuts och pendlartrafik på vissa linjer',
      'Restauranger: nästan alla stängda, undantag på året-runt-öar',
      'Boende: vandrarhem och hotell med helår-verksamhet, t.ex. Sandhamns Seglarhotell',
      'Is: i kalla vintrar fryser delar av innerskärgården — kräver lokal kunskap',
      'Bastu: havsbastu med isvak är vinterns höjdpunkt på Sandhamn och vissa andra öar',
    ],
    tips: [
      { title: 'Endast helår-öar', text: 'Välj Sandhamn, Vaxholm, Möja eller Marstrand — andra öar har inga öppna verksamheter alls.' },
      { title: 'Aldrig okänd is', text: 'Tjockleken på isen varierar kraftigt även inom samma fjärd. Gå inte ut utan lokal vägledning eller säkerhetsutrustning.' },
      { title: 'Klä dig som för -15 °C', text: 'Vinden över öppet vatten + snö = mycket kallare än stadens vinter. Tjock dunjacka, mössa, vantar, ordentliga skor.' },
      { title: 'Bastu + havsdopp', text: 'Sandhamns Seglarhotell, vissa vandrarhem och privata bastuklubbar arrangerar vinterbastubad. Boka i förväg.' },
    ],
    seasonKeywords: ['vinter', 'december', 'januari', 'februari', 'helår', 'året om', 'året runt'],
    recommendedActivities: [
      { slug: 'vandring', label: 'Vandring' },
    ],
  },
]

export function getSeason(slug: string): Season | undefined {
  return SEASONS.find(s => s.slug === slug)
}
