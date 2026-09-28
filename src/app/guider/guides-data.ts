export type GuideCategory = "Praktisk" | "Transport" | "Aktivitet" | "Mat" | "Säsong" | "Region"

export type TransactionalTopic =
  | 'hyra-bat' | 'segelkurs' | 'teambuilding' | 'kajak'
  | 'camping' | 'familj' | 'barn' | 'natur' | 'mat'
  | 'gotland' | 'bohuslan' | 'stockholm' | 'aland' | 'oland'

// ── Geografisk region-arkitektur ────────────────────────────────────────────
export type GuideRegion =
  'stockholm' | 'goteborg' | 'gotland' | 'oland' |
  'hogakusten' | 'sydkusten' | 'utlandet' | 'sverige'

export const ALL_REGIONS: GuideRegion[] = [
  'stockholm', 'goteborg', 'gotland', 'oland', 'hogakusten', 'sydkusten', 'utlandet', 'sverige',
]

export const REGION_LABELS: Record<GuideRegion, string> = {
  stockholm:  'Stockholms skärgård',
  goteborg:   'Göteborg & Bohuslän',
  gotland:    'Gotland',
  oland:      'Öland',
  hogakusten: 'Höga Kusten',
  sydkusten:  'Sydkusten & Halland',
  utlandet:   'Åland & Utlandet',
  sverige:    'Praktiska guider',
}

export const REGION_EMOJIS: Record<GuideRegion, string> = {
  stockholm:  '🏝',
  goteborg:   '🌊',
  gotland:    '🏰',
  oland:      '🌾',
  hogakusten: '🏔',
  sydkusten:  '⚓',
  utlandet:   '🗺',
  sverige:    '📖',
}

// URL-slug för /guider/[region]/ sidorna
export const REGION_URL_SLUG: Record<GuideRegion, string> = {
  stockholm:  'stockholm',
  goteborg:   'goteborg',
  gotland:    'gotland',
  oland:      'oland',
  hogakusten: 'hoga-kusten',
  sydkusten:  'sydkusten',
  utlandet:   'utlandet',
  sverige:    'sverige',
}

export const URL_SLUG_TO_REGION: Record<string, GuideRegion> = {
  'stockholm':   'stockholm',
  'goteborg':    'goteborg',
  'gotland':     'gotland',
  'oland':       'oland',
  'hoga-kusten': 'hogakusten',
  'sydkusten':   'sydkusten',
  'utlandet':    'utlandet',
  'sverige':     'sverige',
}

// Guide slug → region mapping
const GUIDE_REGION_MAP: Record<string, GuideRegion> = {
  // ── Stockholms skärgård ─────────────────────────────────────────
  'midsommar-skargarden-2026':            'stockholm',
  'waxholmsbolaget-guide':                'stockholm',
  'skargard-utan-bat':                    'stockholm',
  'vad-kostar-skargarden':                'stockholm',
  'badtemperatur-skargard':               'stockholm',
  'sl-kort-skargarden':                   'stockholm',
  'dykning-snorkling-skargard':           'stockholm',
  'skargard-host':                        'stockholm',
  'sandhamn-vs-grinda':                   'stockholm',
  'naturhamnar-guide':                    'stockholm',
  'norrtelje-guide':                      'stockholm',
  'fjaderholmarna-guide':                 'stockholm',
  'weekend-i-skargarden':                 'stockholm',
  'basta-oar-stockholms-skargard':        'stockholm',
  'vaxholm-guide-komplett':               'stockholm',
  'landsort-guide':                       'stockholm',
  'hyrbat-guide':                         'stockholm',
  'pendelbat-guide':                      'stockholm',
  'seglingsklubbar-guide':                'stockholm',
  'ingmarso-guide':                       'stockholm',
  'arholma-guide':                        'stockholm',
  'dalaro-guide':                         'stockholm',
  'barplockning-skargarden':              'stockholm',
  'solnedgang-skargarden':                'stockholm',
  'ankra-sova-bat':                       'stockholm',
  'moja-guide':                           'stockholm',
  'grinda-guide':                         'stockholm',
  'finnhamn-guide':                       'stockholm',
  'nattaro-guide':                        'stockholm',
  'orno-guide':                           'stockholm',
  'romantisk-weekend-skargarden':         'stockholm',
  'svampplockning-skargarden':            'stockholm',
  'pingst-skargarden':                    'stockholm',
  'foretagsevent-skargarden':             'stockholm',
  'digital-detox-skargarden':             'stockholm',
  'grinda-vs-finnhamn':                   'stockholm',
  'stockholm-archipelago-trail':          'stockholm',
  'sup-paddleboard-skargarden':           'stockholm',
  'o-luffa-guide':                        'stockholm',
  'camping-talta-skargarden':             'stockholm',
  'havsbastu-skargarden':                 'stockholm',
  '20-bastustallen-skargarden-boka':      'stockholm',
  'barnfamilj-skargarden':                'stockholm',
  'uto-komplett-guide':                   'stockholm',
  'sandhamn-komplett-guide':              'stockholm',
  'vinter-i-skargarden':                  'stockholm',
  'fiske-i-skargarden':                   'stockholm',
  'cykling-skargarden':                   'stockholm',
  'kraftskiva-skargarden':           'stockholm',
  'juli-skargarden-2026-oar':             'stockholm',
  'juli-skargarden-2026-aktiviteter':     'stockholm',
  'juli-skargarden-2026-mat':             'stockholm',
  'semestervecka-skargarden':             'stockholm',
  'sommarlov-skargarden-barn':            'stockholm',
  'barnvanliga-bad-skargarden':           'stockholm',
  'barnvanliga-batresor-skargarden':      'stockholm',
  'barnvanliga-restauranger-skargarden':  'stockholm',
  'barnvanliga-aktiviteter-skargarden':   'stockholm',
  'klippbad-skargarden':                  'stockholm',
  'sandstrand-skargarden':                'stockholm',
  'hemliga-badplatser-skargarden':        'stockholm',
  'bad-med-bastu-skargarden':             'stockholm',
  'uto-vs-sandhamn':                      'stockholm',
  'inre-vs-yttre-skargard':               'stockholm',
  'sensommar-skargarden-2026':            'stockholm',
  'september-skargarden-2026':            'stockholm',
  'jul-skargarden-2026':                  'stockholm',
  'nyar-skargarden-2026':                 'stockholm',
  'pask-skargarden-2027':                 'stockholm',
  'valborg-skargarden-2027':              'stockholm',
  'skargard-instagramguide':              'stockholm',
  'wellness-retreat-skargarden':          'stockholm',
  'brollop-skargarden':                   'stockholm',
  // ── Göteborg & Bohuslän ─────────────────────────────────────────
  'rakfrukost-skargard':                  'goteborg',
  'hummersafari-bohuslan':                'goteborg',
  'midsommar-bohuslan':                   'goteborg',
  'marstrand-guide':                      'goteborg',
  'smogen-guide':                         'goteborg',
  'bohuslan-skargard-guide':              'goteborg',
  'kosterarna-guide':                     'goteborg',
  'fjallbacka-guide':                     'goteborg',
  'lysekil-guide':                        'goteborg',
  'kraftskiva-bohuslan-2026':             'goteborg',
  'juli-bohuslan-2026':                   'goteborg',
  'barnvanliga-oar-bohuslan':             'goteborg',
  'basta-badplatser-bohuslan':            'goteborg',
  'marstrand-vs-smogen':                  'goteborg',
  'host-bohuslan-2026':                   'goteborg',
  'kajakpaddling-bohuslan':               'goteborg',
  'snorkling-kosterhavet':                'goteborg',
  'ostronstangning-bohuslan':             'goteborg',
  'grebbestad-kraftskiva-2026':           'goteborg',
  'grebbestad-guide':                     'goteborg',
  'stromstad-guide':                      'goteborg',
  'tjorn-guide':                          'goteborg',
  'orust-guide':                          'goteborg',
  'sensommar-bohuslan-2026':              'goteborg',
  // ── Gotland ─────────────────────────────────────────────────────
  'gotland-guide':                        'gotland',
  'kraftskiva-gotland-2026':              'gotland',
  'juli-gotland-2026':                    'gotland',
  'barnfamilj-gotland':                   'gotland',
  'basta-badplatser-gotland':             'gotland',
  'gotland-vs-bohuslan':                  'gotland',
  'host-gotland-2026':                    'gotland',
  'vandring-gotland':                     'gotland',
  'cykling-gotland':                      'gotland',
  'hyra-stuga-gotland':                   'gotland',
  'faro-guide':                           'gotland',
  'visby-sommar-guide':                   'gotland',
  'camping-gotland':                      'gotland',
  'gotland-med-barn':                     'gotland',
  'camping-bohuslan':                     'goteborg',
  'fiskelage-bohuslan':                   'goteborg',
  'camping-stockholm-skargard':           'stockholm',
  // ── Öland ───────────────────────────────────────────────────────
  'oland-guide':                          'oland',
  'kraftskiva-oland-2026':                'oland',
  'cykling-oland':                        'oland',
  'borgholm-guide':                       'oland',
  // ── Höga Kusten ─────────────────────────────────────────────────
  'surstrommning-guide':                  'hogakusten',
  'hoga-kusten-guide':                    'hogakusten',
  'ulvon-guide':                          'hogakusten',
  // ── Sydkusten & Halland ─────────────────────────────────────────
  'karlskrona-guide':                     'sydkusten',
  'varberg-guide':                        'sydkusten',
  'hano-guide':                           'sydkusten',
  'bastad-guide':                         'sydkusten',
  // ── Åland & Utlandet ────────────────────────────────────────────
  'aland-guide':                          'utlandet',
  'bornholm-guide':                       'utlandet',
  // ── Praktiska guider (sverige = inget specifikt område) ─────────
  'packlista-skargarden':                 'sverige',
  'allemansratten-pa-sjon':               'sverige',
  'batkorkort-guide':                     'sverige',
  'hund-i-skargarden':                    'sverige',
  'kraftskiva-recept-meny':               'sverige',
  'gotland-vs-oland':                     'sverige',
  'sjomatkrogar-guide':                   'sverige',
  'vad-gora-regn-skargarden':             'sverige',
  'hyra-stuga-skargarden':                'sverige',
  'missat-sista-baten':                   'sverige',
  'dagstur-vs-overnight-skargarden':      'sverige',
  'stockholm-vs-bohuslan-skargard':       'sverige',
  // ── Batch H: Transaktionella guider ───────────────────────────────────────
  'hyra-bat-utan-korkort-stockholm':      'stockholm',
  'aw-pa-bat-stockholm':                  'stockholm',
  'konferens-skargard-stockholm':         'stockholm',
  'kajak-vaxholm':                        'stockholm',
  'hyra-kajak-stockholm':                 'stockholm',
  'hyra-elektrisk-bat-stockholm':         'stockholm',
  'glamping-skargard':                    'stockholm',
  'segeldag-foretag-stockholm':           'stockholm',
  'teambuilding-kajak-stockholm':         'stockholm',
  'cykeluthyrning-gotland':               'gotland',
  'kursgard-skargard-stockholm':          'stockholm',
  'kickoff-ideer-skargard':              'stockholm',
  'hyra-stuga-marstrand-bohuslan':        'goteborg',
  'workshop-skargard-stockholm':          'stockholm',
  'teambuilding-skargard-stockholm':      'stockholm',
  'segelkurs-stockholm':                  'stockholm',
  'dagstur-marstrand':                    'goteborg',
  'yttre-garden-guide':                   'stockholm',
  // ── Batch J: SEO-gap-guider – säsong, region, tematiska ─────────────────
  // Säsong
  'juni-skargarden-2026':               'stockholm',
  'folkfria-oar-juli':                  'stockholm',
  'oktober-skargarden':                 'stockholm',
  'host-oland-2026':                    'oland',
  'host-hoga-kusten-2026':              'hogakusten',
  'vinter-gotland-2026':                'gotland',
  'vinter-bohuslan-2026':               'goteborg',
  'isbad-vinterbad-sverige':            'sverige',
  // Öland expansion
  'badplatser-oland':                   'oland',
  'barnfamilj-oland':                   'oland',
  'vandring-oland':                     'oland',
  'hyra-stuga-oland':                   'oland',
  'hyra-bil-oland':                     'oland',
  'camping-oland':                      'oland',
  'mat-oland':                          'oland',
  // Höga Kusten expansion
  'kajak-hoga-kusten':                  'hogakusten',
  'vandring-skuleskogen':               'hogakusten',
  'barnfamilj-hoga-kusten':             'hogakusten',
  'camping-hoga-kusten':                'hogakusten',
  // Bohuslän transaktionella
  'hyra-bat-goteborg':                  'goteborg',
  'hyra-bat-marstrand':                 'goteborg',
  'hyra-kajak-bohuslan':                'goteborg',
  'segelkurs-goteborg':                 'goteborg',
  'teambuilding-goteborg-skargard':     'goteborg',
  'aw-pa-bat-goteborg':                 'goteborg',
  'konferens-bohuslan':                 'goteborg',
  // Gotland expansion
  'flyga-till-gotland':                 'gotland',
  'hyra-bil-gotland':                   'gotland',
  // Blekinge
  'blekinge-skargard-guide':            'sydkusten',
  // Stockholm – nya öar
  'nacka-skargard-guide':               'stockholm',
  'svartloga-guide':                    'stockholm',
  'ljustero-guide':                     'stockholm',
  'runmaro-guide':                      'stockholm',
  'blido-guide':                        'stockholm',
  // Bohuslän – nya ö-guider
  'karingon-guide':                     'goteborg',
  'gullholmen-guide':                   'goteborg',
  // Tematiska
  'skargard-pa-budget':                 'sverige',
  'camping-kust-sverige':               'sverige',
  'vattensport-guide':                  'sverige',
  'skargard-solo':                      'sverige',
  'skargard-seniorer':                  'sverige',
  'nationalparkerna-havet':             'sverige',
  'skargard-tillganglighet':            'sverige',
  'batsaerhet-guide':                   'sverige',
  'fiske-host':                         'sverige',
  'vandring-host-skargard':             'sverige',
  // Jämförelse
  'skargard-vs-fjall':                  'sverige',
  'bohuslan-vs-hoga-kusten':            'sverige',
  'gotland-vs-bornholm':                'gotland',
  // ── Batch K: Kvarvarande SEO-gap-guider ─────────────────────────────────
  'varmdo-guide':                       'stockholm',
  'vinterbastu-isbastu':                'sverige',
  'fagelskadning-skargarden':           'stockholm',
  'snorkling-stockholm':                'stockholm',
  'vinter-oland-2026':                  'oland',
  'skridskor-havet':                    'sverige',
  'julmarknad-havet':                   'sverige',
  'fjallalternativet-kust':             'sverige',
  'ekologisk-semester-skargard':        'sverige',
  'skargard-med-husbil':                'sverige',
  'hundstrand-sverige':                 'sverige',
  'hyra-husbil-gotland':                'gotland',
  'aspo-sturko-guide':                  'sydkusten',
  'trysunda-guide':                     'hogakusten',
  'skafto-guide':                       'goteborg',
  'holmon-guide':                       'hogakusten',
  'klattring-bohuslan':                 'goteborg',
  'strandridning-kust':                 'sverige',
  'vegansk-mat-skargarden':             'sverige',
  'restauranger-havsvy-stockholm':      'stockholm',
  'vandring-var-kust':                  'sverige',
  // ── Batch L: SEO-gap-guider – aug–okt säsong ─────────────────────────────
  'host-stockholms-skargard-2026':      'stockholm',
  'hummerpremiar-bohuslan':        'goteborg',
  'surstrommingspremiar-2026':          'hogakusten',
  'michelin-havet-guide':               'sverige',
  'sandhamn-vaxholm-grinda-host':       'stockholm',
  'camping-host-skargard':              'stockholm',
  // ── Batch M: Höst/planering SEO-artiklar ─────────────────────────────────
  'havsbastu-guide':                    'sverige',
  'hostlov-vid-havet-2026':             'sverige',
  'november-skargard':                  'stockholm',
  'host-blekinge-skargard':             'sydkusten',
  'host-skane-kusten':                  'sydkusten',
  'weekendresa-host-havet':             'sverige',
  'host-roslagen':                      'stockholm',
  'planera-host-resa-havet':            'sverige',
  'ostgota-skargard':                   'sydkusten',
  'nattkryssning-skargarden':           'stockholm',
  // ── Batch N: Gap-analys-guider 2026-08-18 ────────────────────────────────
  'island-hopping-stockholms-skargard': 'stockholm',
  'hund-skargarden':                    'sverige',
  'barnfamilj-stockholms-skargard':     'stockholm',
  'romantisk-skargard':                 'sverige',
  'var-stockholms-skargard-2027':       'stockholm',
}

export function getGuideRegion(slug: string): GuideRegion {
  return GUIDE_REGION_MAP[slug] ?? 'sverige'
}

export function getGuidesByRegion(region: GuideRegion): GuideMeta[] {
  return GUIDES.filter(g => getGuideRegion(g.slug) === region)
}
// ───────────────────────────────────────────────────────────────────────────

export type FAQItem = { q: string; a: string }

export type GuideMeta = {
  slug: string
  title: string
  excerpt: string
  category: GuideCategory
  emoji: string
  readTime: string
  featured?: boolean
  fullContent?: boolean
  faqs?: FAQItem[]
  topics?: TransactionalTopic[]
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "midsommar-skargarden-2026",
    title: "Midsommar i skärgården 2026 – 15 alternativ",
    excerpt: "8 destinationer på ostkusten och 7 på västkusten. Kollektivtrafik, vad du gör och var du äter – komplett planeringsguide.",
    category: "Säsong",
    emoji: "🌸",
    readTime: "14 min",
    featured: true,
    fullContent: true,
    faqs: [
      { q: 'Vad kostar det att fira midsommar på Sandhamn?', // KÄLLA: Strömma/Cinderellabåtarna, från 255 kr enkel resa (verifierat 2026-08-05). Boendespannet är uppskattning (2026-08).
      a: 'Cinderellabåtarna (Strömma) kostar från 255 kr per enkel resa. Boende på Sandhamn kostar uppskattningsvis 1 500–3 000 kr/natt per rum under midsommar. Räkna med att boka minst 3–4 månader i förväg för boende.' },
      { q: 'Behöver man boka biljett till Cinderellabåten på midsommaraftonen?', a: 'Ja, absolut. Cinderellabåten kör med full kapacitet midsommaraftonen och biljetter tar slut veckor i förväg. Boka via Waxholmsbolagets app eller hemsida så snart du bestämt dig.' },
      { q: 'Vilken ö är bäst för midsommar med barn?', a: 'Grinda är det bästa valet för barnfamiljer — kort restid (1h 45min), sandstrand, grunt vatten och ett genuint midsommarfirande med majstång. Alternativt Vaxholm (1h) om barnen tröttnar snabbt på resor.' },
      { q: 'Hur tidigt ska man boka boende inför midsommar i skärgården?', a: 'Minst 3–4 månader i förväg för Sandhamn, Utö och Grinda. Vaxholm och Möja är lättare att boka 4–6 veckor i förväg. Dagsturerna kräver bara biljettbokning — inget boende.' },
      { q: 'Kan man åka på dagstur utan övernattning på midsommar?', a: 'Ja, dagsturen fungerar utmärkt. Fjäderholmarna (25 min), Vaxholm (1h) och Grinda (1h 45min) är perfekta för dagstur. Kom tidigt — båtarna är fulla från lunch.' },
      { q: 'Är det skillnad på midsommar i Stockholm vs Bohuslän?', a: 'Bohuslän har klippor, räksmörgåsar och västkustkaraktär. Stockholm har de klassiska skärgårdsöarna med majstång och Waxholmsbolaget. Bohuslän är bättre för klippbad; Stockholm för öhoppning och segelbåtsatmosfär.' },
    ],
  },
  {
    slug: "packlista-skargarden",
    title: "Packlista för segling och skärgården – säkerhet och kläder",
    excerpt: "Packlista för segling och skärgården: flytväst, mobil i vattentätt fodral, säkerhetssele, klädombyte och solskydd – enligt Transportstyrelsen och sjöräddarna.",
    category: "Praktisk",
    emoji: "🎒",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/pa-sjon/anvand-flytvast/ — "Samtliga ombord ska ha en flytväst i rätt storlek. Var noga med att flytvästen du använder är CE-märkt."; "Barn och vuxna som inte kan simma ska använda räddningsväst." samt https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/infor-batturen/utrustning/ — "Flytväst ska finnas till alla ombordvarande och vara påtagen utom när det inte finns risk att falla i vattnet."
      { q: "Behöver man flytväst i skärgården?", a: "Transportstyrelsen råder att alla ombord har en CE-märkt flytväst i rätt storlek och att den är påtagen utom när det inte finns risk att falla i vattnet. Barn och vuxna som inte kan simma ska använda räddningsväst." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/infor-batturen/utrustning/ — "säkerhetssele med två linor som kan krokas fast"; "segelsömnadsutrustning"; "radarreflektor"; "typgodkända lanternor (gångljus och ankarlanterna)" samt https://www.sjoraddning.se/artiklar/sa-blir-du-saker-pa-batturen-sjoraddarnas-basta-tips — "Ankare, tillräckligt med tamp, verktygslåda, brandsläckare, första förband, en extra dunk bränsle och hela segel."; "varma kläder, vatten, sjösjuketabletter och nödproviant"
      { q: "Vad ska man packa för segling?", a: "Utöver flytväst till alla och en mobil i vattentätt fodral tar Transportstyrelsens lista upp säkerhetssele med två linor för arbete på däck i hårt väder, segelsömnadsutrustning, radarreflektor och lanternor. Sjöräddningssällskapet nämner hela segel, sjösjuketabletter, varma kläder och nödproviant." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du får ta med dig handbagage som väger under 30 kg."; "Du får ta med en vanlig cykel ombord i mån av plats. Att ta med cykeln kostar inget extra"; "Du får ta med hundar och mindre sällskapsdjur gratis."; "Hundar ska hållas kopplade ombord"; "Allt annat bagage klassas som gods och kostar extra att ta med."
      { q: "Vad får man ta med på Waxholmsbåten?", a: "Handbagage under 30 kg ingår. En vanlig cykel får följa med utan extra kostnad i mån av plats, och hundar reser gratis men ska vara kopplade. Annat bagage räknas som gods och kostar extra." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/infor-batturen/forbered-dig-infor-din-battur/ — "Packa klädombyte och något att äta och dricka i en vattentät väska, om något skulle hända."; "Ta för vana att alltid ha din fulladdade mobiltelefon lättåtkomlig i ett vattentätt fodral runt halsen."
      { q: "Vad ska man ha i den vattentäta väskan?", a: "Transportstyrelsen råder dig att packa klädombyte och något att äta och dricka i en vattentät väska, och att ha en fulladdad mobil i vattentätt fodral runt halsen så att du kan larma." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/lagar-och-regler-for-fritidsbatar/sjovardighet-for-fritidsbatsforare/ — "Det är befälhavarens ansvar att se till att båten är sjövärdig." samt https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/infor-batturen/utrustning/ — "Exempelvis båtens storlek, framdrivningssätt, egenskaper och installationer är viktiga. Färdens längd, årstiden och vädret är andra faktorer." samt https://www.sjoraddning.se/artiklar/sa-blir-du-saker-pa-batturen-sjoraddarnas-basta-tips — "De vanligaste orsakerna till att man slår larm är motor- och propellerhaveri, bränslebrist, grundstötning och tamp i propellern."
      { q: "Vad ska man tänka på med packning om man åker med egen båt?", a: "Det är befälhavarens ansvar att båten är sjövärdig. Vilken utrustning som behövs beror enligt Transportstyrelsen på båtens storlek och framdrivning, färdens längd, årstiden och vädret. Sjöräddningssällskapet påminner om en extra dunk bränsle, eftersom bränslebrist är en av de vanligaste orsakerna till larm." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "På de flesta större öarna finns cykeluthyrning." samt https://svenskalivraddningssallskapet.se/flytvastar/ — "Då kan du enkelt låna eller hyra en flytväst billigt i våra depåer."
      { q: "Kan man hyra utrustning på öarna?", a: "Waxholmsbolaget skriver att det finns cykeluthyrning på de flesta större öarna. Flytvästar kan du låna eller hyra i Svenska Livräddningssällskapets flytvästdepåer. Annan uthyrning har vi inte kunnat bekräfta generellt – kolla med den ö eller hamn du ska till." },
    ],
  },
  {
    slug: "allemansratten-pa-sjon",
    title: "Allemansrätten på sjön – vad som gäller på vattnet",
    excerpt: "Var får du ankra, tälta och elda? Vad gäller om toalettavfall? Enkla svar på de vanligaste frågorna om allemansrätten till sjöss.",
    category: "Praktisk",
    emoji: "⚓",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      { q: 'Hur länge får man ankra på samma plats?', a: 'Allemansrätten ger rätt att ankra eller lägga till på en plats i 1–2 nätter utan att be om lov. Vill du stanna längre bör du fråga markägaren. I naturreservat kan det finnas specifika regler som gäller framför allemansrätten.' },
      { q: 'Är det gratis att ankra i naturhamnar?', a: 'Ja, ankring i naturhamnar är i regel gratis via allemansrätten. Du betalar inget kajplatsavgift som du gör i gästhamnar. I vissa naturreservat finns dock avgiftspliktiga lägesplatser — kolla Länsstyrelsens webbplats för specifika reservat.' },
      { q: 'Var får man tälta i skärgården?', a: 'Du får tälta en eller ett par nätter på de flesta platser via allemansrätten. Undantag: naturreservat med tältförbud, privat tomtmark och strandskyddszon närmast bebyggelse. Kolla alltid skyltning på plats.' },
      // KÄLLA: Transportstyrelsen, Toalettavfall från fritidsbåtar (transportstyrelsen.se/sv/sjofart/fritidsbatar/batliv-miljo/avfall-fran-fritidsbat/toalettavfall/, läst 2026-08-25): "Huvudprincipen är att utsläpp av toalettavfall inte får ske inom Sveriges sjöterritorium" och det gäller "alla sjöar och vattendrag i Sverige". Sjöterritoriet räknas från baslinjen, inte från land. "Förbudet gäller alla fritidsbåtar, förutom de som är k-märkta." Ingen undantagsregel för renat avfall.
      { q: 'Vad gäller för toalettavfall på båt?', a: 'Sedan 1 april 2015 är det förbjudet att släppa ut toalettavfall från fritidsbåtar i hela Sveriges sjöterritorium — det räknas upp till 12 sjömil från baslinjen, alltså långt utanför de yttersta öarna — och i alla svenska sjöar och vattendrag. Förbudet gäller allt toalettavfall, även renat, och alla fritidsbåtar utom k-märkta. Tanken töms på en pump-out-station i gästhamn eller vid en mottagningsstation i land. Disk- och tvättvatten omfattas inte av förbudet.' },
    ],
  },
  {
    slug: "waxholmsbolaget-guide",
    title: "Waxholmsbolaget – biljetter, cykel, zoner och båt till Vaxholm",
    excerpt: "Waxholmsbolaget (ibland Vaxholmsbolaget): så köper du biljett, hur taxorna fungerar, när du får ta med cykel och hur båten till Vaxholm går.",
    category: "Transport",
    emoji: "⛴",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Att ta med cykeln kostar inget extra, men vill du ta med en cykelkärra kostar detta 120 kronor."; "Elcyklar och elsparkcyklar ska placeras utomhus på däck."; "Lådcykel, tandemcykel eller andra skrymmande cyklar räknas som gods och kostar 120 kronor att ta med."; "Personalen ombord avgör om det finns plats för din cykel"; "Är det redan fullt med cyklar ombord får du lämna din cykel vid bryggan."
      { q: "Får man ta med cykel på Waxholmsbåten?", a: "Ja. En vanlig cykel kostar inget extra och tas med i mån av plats – personalen avgör, och är det fullt får du lämna cykeln vid bryggan. Cykelkärra, lådcykel och tandemcykel kostar 120 kr enligt Waxholmsbolaget (läst 26 september 2026). Elcyklar och elsparkcyklar ställs utomhus på däck." },
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/Enkelbiljetter/enkelbiljett-180-minuter — "Du kan inte köpa tur-och returbiljett i appen."; "Ombord kan du köpa en enkel eller tur-och retur-biljett med Visa/Mastercard."; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/kop-biljett-i-sl-appen-och-res-med-waxholmsbolaget — "Sök resa för att se vilken taxa du ska betala."; "Välj rätt taxa och betala biljetten med Swish eller betalkort."; "Biljettläsaren skriver ut en pappersbiljett som du sedan lämnar till matrosen vid avstigning."
      { q: "Hur köper man biljett till Waxholmsbolaget?", a: "Enkelbiljetter köper du i SL-appen: sök först resan för att se vilken taxa som gäller, välj sedan rätt taxa under rubriken Waxholmsbolaget och betala med Swish eller betalkort. Tur och retur går inte att köpa i appen, men ombord kan du köpa både enkel och tur och retur med Visa/Mastercard. Blippa appbiljetten ombord och lämna pappersbiljetten till matrosen när du går av." },
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/Enkelbiljetter/enkelbiljett-180-minuter — "Enkelbiljetterna finns i sex olika priser som kallas taxegrupper. Priset på din biljett beror på hur lång resa du ska göra."; "Om du söker din resa i reseplaneraren dyker priset upp automatiskt i sökresultatet."; https://sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar — "Mellan Strömkajen, Vaxholm och 42 andra bryggor däremellan kan du alltid resa på alla SL-biljetter."
      { q: "Har Waxholmsbolaget zoner?", a: "Priset styrs av taxegrupper: Waxholmsbolagets enkelbiljett finns i sex prisnivåer, och priset beror på hur lång resa du gör. Vilken taxa din resa har visas när du söker den i reseplaneraren. Mellan Strömkajen, Vaxholm och 42 bryggor däremellan gäller dessutom alla SL-biljetter." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme och under sommaren går det turer många gånger om dagen, och övrig tid på året går det flera per dag."; "titta i tabell 2 som är en samlingstabell för alla avgångar mellan just Stockholm och Vaxholm"; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd."
      { q: "Hur tar man båt till Vaxholm?", a: "Båten till Vaxholm går från Strömkajen och tar en timme. På sommaren går det turer många gånger om dagen, resten av året flera per dag. Alla avgångar Stockholm–Vaxholm finns i Waxholmsbolagets tabell 2, och på sträckan gäller alla SL-biljetter." },
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Alla SL-biljetter gäller mellan 44 bryggor i Waxholmsbolagets trafik"; "Detta avser linje 17, 18 och 19."; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/sa-galler-sl-biljetten-pa-baten — "Under lågsäsong kan du resa med Waxholmsbolaget med SL:s periodbiljetter som gäller för 30 dagar eller längre."; "Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april"
      { q: "Gäller SL-biljetten på Waxholmsbolagets båtar?", a: "Delvis. Alla sorters SL-biljetter gäller året runt mellan 44 bryggor från Strömkajen till Vaxholm med omnejd. Under lågsäsong, 14 september–29 april, gäller SL:s periodbiljetter på 30 dagar eller längre i hela Waxholmsbolagets trafik. På linje 17, 18 och 19 mot södra skärgården via Baggensstäket gäller inte SL-biljetter." },
      // KÄLLA: https://waxholmsbolaget.se/om-oss — "Waxholmsbolaget, Waxholms Ångfartygs AB, grundades 1869."; "Waxholmsbolaget ansvarar för den kollektiva skattesubventionerade sjötrafiken i Stockholms skärgård."
      { q: "Heter det Waxholmsbolaget eller Vaxholmsbolaget?", a: "Bolaget heter Waxholmsbolaget, med W, och det formella namnet är Waxholms Ångfartygs AB. Det grundades 1869 och ansvarar för den kollektiva sjötrafiken i Stockholms skärgård. Vaxholmsbolaget är en stavning som ibland används för samma bolag." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/tidtabeller — "Waxholmsbolaget byter tidtabell fyra gånger om året, men vissa linjer går bara delar av en period."; https://waxholmsbolaget.se/reseplanering/kartor — "Tänk på att vissa linjer bara går under sommarhalvåret."; "Nord/Sydlinjen (linje 40) är en sommarlinje"; https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "övrig tid på året går det flera per dag"
      { q: "Kör Waxholmsbolaget hela året?", a: "Ja, men tidtabellen byts fyra gånger om året och vissa linjer går bara under sommarhalvåret, till exempel Nord/Sydlinjen (linje 40). Båten till Vaxholm går året runt, med flera turer per dag utanför sommaren." },
    ],
  },
  {
    slug: "skargard-utan-bat",
    title: "Skärgårdsbåt och bilfärjor – Stockholms skärgård utan egen båt",
    excerpt: "Skärgårdsbåt med Waxholmsbolaget, SL:s pendelbåtar och bilfärjor i Stockholms skärgård: så når du öarna utan egen båt, med och utan bil.",
    category: "Transport",
    emoji: "🚌",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/om-oss — "Under sommaren trafikerar vi 299 bryggor"; "Därför kan du ibland behöva resa en bit med buss eller tåg innan du byter till våra båtar"
      { q: "Kan man besöka skärgården utan egen båt?", a: "Ja. Waxholmsbolaget sköter den kollektiva sjötrafiken i Stockholms skärgård och trafikerar 299 bryggor sommartid. Ibland åker du först en bit med buss eller tåg och byter till båten vid en brygga på fastlandet, till exempel Stavsnäs eller Årsta brygga." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/ — "Vaxholmsleden går mellan Vaxholm och Rindö i Stockholms skärgård."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/oxdjupsleden/ — "Oxdjupsleden går mellan Rindö och Stenslätten på Värmdö i Stockholms skärgård."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/tynningoleden/ — "Tynningöleden går mellan Lagnö på Värmdö och Tynningö i Stockholms skärgård."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/ — "Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation."
      { q: "Vilka bilfärjor finns i Stockholms skärgård?", a: "Trafikverkets avgiftsfria vägfärjor i Stockholms skärgård är bland andra Ljusteröleden (Östanå–Ljusterö), Vaxholmsleden (Vaxholm–Rindö), Oxdjupsleden (Rindö–Stenslätten på Värmdö), Tynningöleden (Lagnö–Tynningö), Furusundsleden (Furusund–Yxlan) och Blidöleden (Yxlan–Blidö). Tidtabeller finns på varje leds sida hos Trafikverket och i appen Trafikinfo Färjerederiet." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Ljusteröleden går mellan Östanå och Ljusterö i Stockholms skärgård. Färjeledens längd är 1100 meter och överfartstiden är sju minuter. Resan med vägfärjan är avgiftsfri."; https://waxholmsbolaget.linjetidtabeller.se/ — "9 Stockholm - Vaxholm - Ljusterö"
      { q: "Hur fungerar Ljusterö färja?", a: "Trafikverkets vägfärja på Ljusteröleden går mellan Östanå och Ljusterö. Överfarten tar sju minuter och är avgiftsfri. Utan bil kan du också ta Waxholmsbolagets linje 9 Stockholm–Vaxholm–Ljusterö." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/uto — "Till Årsta brygga kommer du med pendeltåg och sedan buss."; "från Årsta brygga i Haninge går det att resa till Utö sju till åtta gånger om dagen sommartid"; "Under sommaren finns det turer med båt hela vägen från Stockholm."
      { q: "Hur tar man sig till Utö utan bil?", a: "Ta pendeltåg och sedan buss till Årsta brygga i Haninge. Därifrån går Waxholmsbolagets båt till Utö sju till åtta gånger om dagen sommartid och lite mer sällan resten av året. Under sommaren går det även båtar hela vägen från Stockholm." },
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Alla SL-biljetter gäller mellan 44 bryggor i Waxholmsbolagets trafik"; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/sa-galler-sl-biljetten-pa-baten — "Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april"; "Under lågsäsong kan du resa med Waxholmsbolaget med SL:s periodbiljetter som gäller för 30 dagar eller längre."
      { q: "Gäller SL-kortet på båtarna i skärgården?", a: "Alla sorters SL-biljetter gäller året runt på Waxholmsbolagets båtar mellan 44 bryggor från Strömkajen till Vaxholm med omnejd. Längre ut behöver du en Waxholmsbolaget-biljett för den delen av resan, utom under lågsäsong 14 september–29 april, då SL:s periodbiljetter på 30 dagar eller längre gäller i hela trafiken." },
    ],
  },
  {
    slug: "vad-kostar-skargarden",
    title: "Vad kostar en dag i skärgården?",
    excerpt: "Biljetter, mat, boende – en realistisk budget för olika restyper.",
    category: "Praktisk",
    emoji: "💰",
    readTime: "5 min",
    fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar en dagstur till Grinda?', a: 'Båtbiljett tur/retur ca 400 kr. Lunch på Grinda Wärdshus ca 200–350 kr. Kajakhyrning ca 200–350 kr. Räkna totalt ca 800–1 100 kr per vuxen för en bekväm dagstur.' },
      { q: 'Vad kostar en natt i skärgården?', a: 'Vandrarhemsrum ca 350–550 kr/person. Stugor ca 800–2 500 kr/natt beroende på standard och ö. Hotellrum (Sandhamns Värdshus, Waxholms Hotell) ca 1 500–3 500 kr/natt. Tältning via allemansrätten kostar inget.' },
      { q: 'Är mat dyrare i skärgården?', a: 'Ja, räkna med 20–40% påslag jämfört med Stockholm. En enkel lunch med dryck kostar ca 175–250 kr, räksmörgås ca 185–275 kr. Ta med matsäck för att hålla nere kostnaderna – det finns picknickplatser på alla öar.' },
      { q: 'Kan man uppleva skärgården gratis?', a: 'Ja. Allemansrätten ger fri tillgång till mark och vatten. Många öar (Arholma, Möja, Svartlöga) har fria vandringsleder, badplatser och naturhamnar. Enda kostnaden är biljetten dit – och den ryms i SL-abonnemanget om du åker rätt linje.' },
    ],
  },
  {
    slug: "badtemperatur-skargard",
    title: "Badtemperatur i Stockholms skärgård – när är det badsäsong?",
    excerpt: "Här hittar du badtemperatur och vattentemperatur i Stockholms skärgård: SMHI:s mätstationer, kommunernas badvattenprover och när badsäsongen gäller.",
    category: "Aktivitet", emoji: "🌡", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/vattenprov-badtemperatur/vattentemperatur-och-kvalitet-pa-badvatten-pa-ostkusten.html — "Prognos på vattentemperatur kommer från Copernicus och uppdateras dagligen."; https://www.smhi.se/data/hav-och-havsmiljo/havstemperatur — "Havstemperatur mäts med instrument placerade på bojar i havet, mätstationer vid kusten och färjor som trafikerar Sveriges omgivande hav."
      { q: "Var hittar man badtemperatur i Stockholms skärgård?", a: "Vid badplatsen: Havs- och vattenmyndighetens webbplats Badplatser och badvatten visar en prognos på vattentemperaturen från Copernicus som uppdateras dagligen, bland annat för Eriksöbadet i Vaxholm och Torpesand på Värmdö. Ute till havs: SMHI mäter havstemperatur på bojar, kuststationer och färjor en gång i timmen." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/oceanografi/haven-runt-sverige/temperatur-i-havet — "På sommaren är temperaturen runt 20 grader i söder, men svalare i norr."; "Temperaturen inomskärs och längs grunda stränder är oftast högre än längre ut till havs."
      { q: "Hur varm är vattentemperaturen i Stockholms skärgård på sommaren?", a: "Den varierar från dag till dag, så kolla aktuell prognos för din badplats. SMHI:s exempelkarta visar runt 20 grader i södra Sverige på sommaren. Inomskärs och vid grunda stränder är vattnet oftast varmare än längre ut till havs." },
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/fakta-om-badvatten.html — "21 juni - 15 augusti"; "Vid EU-bad ska vattenprover tas minst 3-4 gånger per badsäsong."
      { q: "När är det badsäsong i Stockholm?", a: "I Stockholms län är den officiella badsäsongen 21 juni–15 augusti. Då tar kommunerna vattenprover vid EU-baden, minst tre–fyra gånger per säsong. I Västra Götaland är säsongen 21 juni–20 augusti." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/oceanografi/haven-runt-sverige/uppvallning — "Det betyder till exempel för den svenska ostkusten vindar mellan väst och syd."; "Det uppvällande vattnet har temperaturen 5-10 grader och vattnet i utsjön är varmare än kustvattnet."
      { q: "Varför blir vattnet plötsligt kallt i skärgården?", a: "Det kallas uppvällning. När det blåser från land förs det varma ytvattnet ut och kallt vatten underifrån kommer upp. På ostkusten händer det vid vindar mellan väst och syd, och vattnet som väller upp håller 5–10 grader." },
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/vattenprov-badtemperatur/vattentemperatur-och-kvalitet-pa-badvatten-pa-vastkusten.html — "Sandön, Smögen"; https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html — "De största kontrolleras vid ett flertal tillfällen varje säsong med hänsyn till säkerhet och vattenkvalitet."
      { q: "Var hittar man badtemperatur på Smögen?", a: "Havs- och vattenmyndighetens lista över badplatser på västkusten har med Sandön på Smögen, med en prognos för vattentemperaturen. Sotenäs kommun kontrollerar de största badplatserna flera gånger varje säsong." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/oceanografi/haven-runt-sverige/temperatur-i-havet — "från sköna badtemperaturer på sommaren till så kallt vatten att det fryser till is"; "På våren börjar solen värma upp havets ytskikt."; "Havet är nu varmare än luften och solen börjar stå lägre och tillför inte mycket ny värme."; "Under vintern då dagarna är korta kyls ytvattnet av så mycket att det kan bildas is."
      { q: "När är bästa tiden att resa till skärgården – och vad är speciellt med varje årstid?", a: "För bad är sommaren bäst: då har havsytan badtemperaturer. På våren värmer solen upp havets ytskikt, på hösten är havet varmare än luften men stormarna blandar upp kallt vatten, och på vintern kan det bildas is – då är det säsong för vinterbad." },
    ],
  },
  {
    slug: "sl-kort-skargarden",
    title: "SL-kortet i skärgården – vad gäller?",
    excerpt: "Var är SL-kortet giltigt, var räcker det inte och vad kostar tilläggsbiljetten?",
    category: "Transport",
    emoji: "🎫",
    readTime: "4 min",
    fullContent: true,
    faqs: [
      // KÄLLA: waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor; sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar; läst 2026-09-19
      { q: 'Gäller SL-biljetten till skärgårdsöarna?', a: 'Till Vaxholm och de 44 bryggorna i "SL-området" — ja, alla SL-biljetter, året runt. Till öar längre ut (Grinda, Sandhamn, Utö) behövs Waxholmsbolaget-biljett för sträckan utanför området under högsäsong 30 april–13 september. Har du en SL-periodbiljett på 30 dagar eller mer gäller den i hela Waxholmsbolagets trafik 14 september–29 april.' },
      // KÄLLA: waxholmsbolaget.se reseplaneraren, sökning lördag 2026-09-26, läst 2026-09-19: Strömkajen–Vaxholm taxa 3 (104/64 kr), Strömkajen–Södra Grinda taxa 4 (125/79 kr), Stavsnäs–Sandhamn taxa 3 (104/64 kr), Årsta brygga–Gruvbryggan taxa 3 (104/64 kr). Operatören: "Priset kan variera beroende på vilken rutt båten tar." Barnregler: waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor.
      { q: 'Hur mycket kostar Waxholmsbolaget utöver SL-biljetten?', a: 'Enkelbiljetten har sex taxegrupper, 61–186 kr för vuxen. Exempel ur Waxholmsbolagets reseplanerare (september 2026): Strömkajen–Grinda 125 kr, Stavsnäs–Sandhamn 104 kr, Årsta brygga–Utö 104 kr; rabatterat pris för 7–19 år är 79 respektive 64 kr. Barn under 7 år åker gratis med betalande vuxen. Priset kan variera med rutten — det exakta visas när du söker resan.' },
      { q: 'Finns det ett kombinerat kort för SL och Waxholmsbolaget?', a: 'Sedan juni 2026 finns en kombinationsbiljett i SL-appen: ett köp för SL-resan och båten, giltig 180 minuter. Den kostar samma som två separata biljetter — vinsten är enkelheten. Waxholmsbolagets periodbiljetter (5 dagar, 30 dagar, ungdom 6 månader) laddas på ett SL-kort ombord.' },
      { q: 'Gäller SL-kortet på Styrsöbolaget i Göteborg?', a: 'Styrsöbolaget i Göteborg är en del av Västtrafik, inte SL. Västtrafik-kortet gäller på Styrsöbolagets båtar till sydskärgården. SL-kortet gäller inte i Göteborg.' },
    ],
  },
  {
    slug: "dykning-snorkling-skargard",
    title: "Dykning i Stockholms skärgård – dykutrustning, dykplatser och vrak",
    excerpt: "Dykning i Stockholms skärgård görs i torrdräkt. Här finns dykplatser i Stockholm som vraken vid Dalarö, reglerna för vrak och snorkelleder utan certifikat.",
    category: "Aktivitet", emoji: "🤿", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://vrakdykarpensionatet.se/ — "Alla kurser görs i torrdräkt av säkerhetsskäl."; https://vrakdykarpensionatet.se/ — "I Östersjön dyker vi i torrdräkt. Har du ingen egen kan du hyra, och vi erbjuder torrdräktskurs för dig som vill lära dig."; https://www.smhi.se/kunskapsbanken/oceanografi/haven-runt-sverige/temperatur-i-havet — "Sommartid ligger termoklinen normalt på 20–30 meters djup."
      { q: "Vilken dykutrustning är bäst lämpad för dykning i Stockholms skärgård?", a: "Torrdräkt. Dykcentret Vrakdykarpensionatet i Dalarö dyker i torrdräkt i Östersjön och gör alla sina kurser i torrdräkt av säkerhetsskäl. Du kan hyra torrdräkt och gå en torrdräktskurs. Enligt SMHI ligger termoklinen, gränsen mot det kalla djupvattnet, normalt på 20–30 meters djup på sommaren." },
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/ — "I Dalaröområdet finns ett 30-tal registrerade fartygslämningar från 1600- till 1900-talet."; https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/ — "All dykning inom Dalarö skeppsvraksområde ska ske från en båt."
      { q: "Var finns dykplatser i Stockholm?", a: "Området kring Dalarö i Haninge har ett 30-tal registrerade fartygslämningar från 1600- till 1900-talet, och tre av vraken är tillgängliga i Dalarö skeppsvraksområde. Där dyker du från båt, med en dykarrangör som ansöker via Dalarö Dykpark." },
      // KÄLLA: https://www.raa.se/kulturarv/arkeologi-fornlamningar-och-fynd/arkeologi/marinarkeologi/ — "För skeppsvrak gäller lagskyddet om förlisningen har skett före 1850."; https://www.raa.se/om-riksantikvarieambetet/fragor-och-svar/fornlamningar/ — "det är även straffbart med böter eller i allvarliga fall fängelse"; https://www.lansstyrelsen.se/download/18.d135c3f188ba3e920d68d9/1686922364647/01FS%202023-15.pdf — "Förbud gäller mot att dyka, ankra och nyttja undervattensfarkoster"
      { q: "Får man dyka på vrak i Stockholms skärgård?", a: "Vrak som förliste före 1850 är fornlämningar och skyddas av lagen. Den som skadar en fornlämning kan dömas till böter eller fängelse. Vid vissa vrak, till exempel Anna Maria utanför Dalarö, har Länsstyrelsen förbjudit dykning utan tillstånd." },
      // KÄLLA: https://vrakdykarpensionatet.se/ — "Vi erbjuder Prova-på-dyk i pool för dig som aldrig dykt förut. Vill du lära dig på riktigt har vi PADI Open Water-kursen som ger dig ett internationellt dykcertifikat."
      { q: "Behöver man dykcertifikat för att dyka i Stockholm?", a: "För ett prova-på-dyk i pool behövs inget certifikat. Vrakdykarpensionatet i Dalarö har prova-på-dyk och PADI Open Water-kursen, som ger ett internationellt dykcertifikat." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/snorkelleder/ — "Som till exempel på Björnö och Nåttarö där vi är stolta över våra snorkelleder."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/snorkelleder/ — "De skyltade undervattenslederna är ca 200 meter långa och går som mest på tre meters djup."
      { q: "Var kan man snorkla i Stockholms skärgård?", a: "Skärgårdsstiftelsen har skyltade snorkelleder på Björnö och Nåttarö. De är ungefär 200 meter långa och går som djupast på tre meter." },
    ],
  },
  {
    slug: "rakfrukost-skargard",
    title: "Räkfrukost i skärgården – räkor, säsong och var du köper dem",
    excerpt: "Räkfrukost i skärgården: vilka räkor det är, när de är som bäst, var du köper färska räkor på Smögen, i Göteborg och Nynäshamn och hur du håller dem kalla.",
    category: "Mat", emoji: "🦐", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/gostas-fisk-och-skaldjur/ — "Nytt för i år är att butiken har sin alldeles egna uteservering där man kan få både räkmackor"; https://www.nynasrokeri.se/ — "Upplev vår välbesökta servering som har öppet året runt."
      { q: "Var kan man äta räkfrukost i skärgården?", a: "Vi har inte hittat någon krog som på sin egen webbplats 2026 skriver att den serverar räkfrukost, så fråga krogen direkt. Göstas Fiskbutik på Smögen har uteservering med räkmackor, och Nynäs Rökeri i Nynäshamn har servering året runt." },
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/gostas-fisk-och-skaldjur/ — "Vid Smögenbryggans början hittar du Göstas Fiskbutik där du kan handla färska skaldjur och fisk från en välfylld fiskdisk."; https://www.goteborg.com/platser/feskekorka — "flera olika fiskdiskar"; https://www.nynasrokeri.se/ — "köp hem från Fiskaffären"
      { q: "Var köper man färska räkor i skärgården?", a: "Till exempel på Göstas Fiskbutik i början av Smögenbryggan, i fiskhallen Feskekörka i Göteborg och på Nynäs Rökeris fiskaffär i Nynäshamn." },
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/varldens-basta-skaldjur/ — "Räkorna är som finast under hösten och in på vintersäsongen"
      { q: "När är räkorna som bäst?", a: "Räkor går att äta året om, men enligt Turistrådet Västsverige är de som finast under hösten och in på vintern." },
      // KÄLLA: https://www.havochvatten.se/hav/fiske--fritid/arter/arter-och-naturtyper/raka.html — "I Sveriges omgivande vatten finns nordhavsräka (Pandalus borealis) i Norska rännan, Skagerrak, Koster- och Gullmarsfjorden."
      { q: "Vilken sorts räkor fiskas i Sverige?", a: "Nordhavsräka (Pandalus borealis). Den finns i Norska rännan, Skagerrak och Koster- och Gullmarsfjorden och lever på mjukbottnar på 50 till 500 meters djup." },
      // KÄLLA: https://www.livsmedelsverket.se/livsmedel-och-innehall/tillagning-forvaring-hallbarhet/forvaring-av-kyld-mat/ — "Ha 4 °C i kylskåpet, då håller maten längre och risken för att bli matförgiftad minskar."
      { q: "Hur förvarar man räkor?", a: "Kallt. Livsmedelsverket rekommenderar 4 °C i kylskåpet och att kylvaror som färsk fisk ställs in i kylen så fort som möjligt." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "sjomatkrogar-guide",
    title: "Värdshus i skärgården – sjökrogar i Stockholm och på västkusten",
    excerpt: "Värdshus i skärgården och sjökrogar i Stockholm: Sandhamn, Grinda, Utö och Nåttarö, plus restaurang vid havet på västkusten från Käringön till Väderöarna.",
    category: "Mat", emoji: "🦞", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Mitt på ön ligger Grinda Wärdshus, en självklar samlingspunkt där du kan äta, bo eller bara njuta av utsikten över vattnet."; https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens."; https://www.lidovardshus.se/ — "Värdshus, stugor, pensionat och gästhamn."; https://www.vaderoarna.com/ — "Längst ut i det bohuslänska havsbandet ligger Väderöarnas Värdshus."
      { q: "Vilka värdshus finns i skärgården?", a: "I Stockholms skärgård finns bland annat Sandhamns Värdshus, Grinda Wärdshus, Utö Värdshus och Lidö Värdshus. I Bohuslän ligger Väderöarnas Värdshus på Storö längst ut i havsbandet. Alla har både mat och boende." },
      // KÄLLA: https://fjaderholmarnaskrog.se/ — "FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027."; https://nattaro.se/mat_pa_on/nattaro-krog/ — "Krogen hittar du intill ångbåtsbryggan och gästhamnen."; https://sandhamn.com/sv/matdryck — "Havet finns utanför fönstret."
      { q: "Vilka sjökrogar finns i Stockholms skärgård?", a: "Till exempel Fjäderholmarnas Krog, restaurangen på Sandhamn Seglarhotell, Nåttarö Krog intill ångbåtsbryggan och värdshusen på Sandhamn, Grinda och Utö. Kolla säsongen på krogens egen sida, eftersom flera stänger efter sommaren." },
      // KÄLLA: https://grebys.se/ — "Restaurangen har en avslappnad atmosfär och utsikt över hamnen."; https://tanumstrand.se/restaurant/sjoboden-udden/ — "Längst ut på bryggan året om hittar du Sjöboden Udden."; https://www.vaderoarna.com/ — "Våra båtar med plats för 12 passagerare vardera avgår från Hamburgsund"
      { q: "Var hittar man restaurang vid havet på västkusten?", a: "Bland annat Petersons Krog på Käringön, Grebys vid hamnen i Grebbestad, Sjöboden Udden längst ut på bryggan vid TanumStrand, Smögens Hafvsbad på Smögen och Väderöarnas Värdshus, dit värdshusets egna båtar går från Hamburgsund." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt"; https://www.sandhamns-vardshus.se/ — "Annan tid på året är restaurangen främst öppen helger."; https://www.petersonskrog.se/ — "Vår säsong sträcker sig från påsk till jul varje år"
      { q: "Är sjökrogarna i skärgården öppna på vintern?", a: "Några. Utö Värdshus, Väderöarnas Värdshus och Smögens Hafvsbad har öppet året runt, och Sandhamns Värdshus restaurang har främst öppet helger utanför sommaren. Petersons Krog på Käringön har säsong från påsk till jul." },
      // KÄLLA: https://www.vaderoarna.com/restaurang/ — "Antalet platser i restaurangen är begränsat och vi rekommenderar därför att du bokar bord i förväg för att säkra din plats."; https://tanumstrand.se/restaurant/sjoboden-udden/ — "INGEN BORDSBOKNING – DROP IN."; https://nattaro.se/mat_pa_on/nattaro-krog/ — "Bordsbokning sker endast med förbokad fast 3-rätters meny för hela sällskapet. (minst 10p)"
      { q: "Behöver man boka bord på krogarna i skärgården?", a: "Det beror på krogen. Väderöarnas Värdshus har få platser och rekommenderar att du bokar i förväg. Sjöboden Udden tar bara drop-in, och Nåttarö Krog bokar bara bord för sällskap om minst tio personer med fast meny." },
    ],
  },
  {
    slug: "hummersafari-bohuslan",
    title: "Hummersafari i Bohuslän – guide och säsonger",
    excerpt: "När öppnar hummerpremiären, var fiskar du och hur bokar du en guidad safari?",
    category: "Aktivitet",
    emoji: "🦀",
    readTime: "6 min",
    fullContent: true,
    faqs: [
      { q: 'När är hummerpremiären 2026?', a: 'Hummerpremiären 2026 är den 21 september (första måndagen efter 20 september). Fisket öppnar kl. 07.00. Fiskesäsongen löper till 30 november.' },
      { q: 'Kan vem som helst delta i hummerfiske?', a: 'Svenska medborgare och stadigvarande bosatta får fiska hummer utan licens. Högst sex hummertinor per fritidsfiskare, minimimått 9 cm carapaxlängd (från ögonhålans bakkant till huvudsköldens bakkant), rombärande hummer släpps tillbaka och fångsten får inte säljas.' // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html (läst 2026-09-21)
       },
      { q: 'Var är bäst att fiska hummer i Bohuslän?', a: 'Kungshamn, Smögen, Lysekil, Fjällbacka och Grebbestad är klassiska hummerstäder med aktiva fiskare. Hummern lever på 5–50 meters djup längs klippkusten. De bästa fångstplatserna hålls ofta hemliga av lokala fiskare.' },
      { q: 'Hur bokar man en guidad hummersafari?', a: 'Boka via lokala fiskare och båtuthyrare i Bohuslän – exempelvis i Smögen, Kungshamn och Lysekil. Flera aktörer erbjuder paket med guidat fiske och hummerfrukost ombord. Boka i god tid – premiärveckans turer är fullbokade redan i juni.' },
    ],
  },
  {
    slug: "surstrommning-guide",
    title: "Surströmming – guide till den svenska traditionen",
    excerpt: "Historia, smakupplevelsen, hur du beställer och var du avnjuter den.",
    category: "Mat",
    emoji: "🐟",
    readTime: "5 min",
    fullContent: true,
    faqs: [
      { q: 'När är surströmmingspremiären?', a: 'Surströmmingspremiären firas traditionellt den tredje torsdagen i augusti. 2026 är det 20 augusti. Från och med den dagen är det tillåtet att sälja årets surströmming, och festivaler arrangeras längs norrlandskusten.' },
      { q: 'Hur äter man surströmming?', a: 'Traditionellt på tunnbröd med mandelpotatis, rödlök, crème fraîche och gräslök. Öppna burken utomhus (och helst under vatten) – trycket inne i burken kan spruta fiskspad. Serveras med kall öl eller snaps.' },
      { q: 'Var kan man köpa surströmming?', a: 'På välsorterade mataffärer och livsmedelsbutiker i norra Sverige från premiären i augusti. ICA och Coop har ofta surströmming i hela landet från slutet av augusti. Online-beställning fungerar via specialbutiker.' },
      { q: 'Varför luktar surströmming så starkt?', a: 'Fisken fermenteras i 6–12 månader i saltlake, vilket skapar flyktiga svavelföreningar. Lukten är betydligt starkare än smaken – de flesta som faktiskt smakar upplever att det är mer hanterbart än ryktet säger.' },
    ],
  },
  {
    slug: "skargard-host",
    title: "Skärgården på hösten – höstlov och bästa tiden att resa",
    excerpt: "Skärgården på hösten och höstlovet: hösttidtabeller, SL-biljett i hela skärgården och öar med trafik året om. Plus vad som skiljer varje årstid åt.",
    category: "Säsong",
    emoji: "🍂",
    readTime: "6 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/tidtabeller — "Waxholmsbolaget byter tidtabell fyra gånger om året"; https://www.waxholmsbolaget.se/nyheter-och-trafikinfo/forlang-sommaren-i-skargarden — "Ni blir färre som är ute och reser"; https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"
      { q: "När är bästa tiden att resa till skärgården – och vad är speciellt med varje årstid?", a: "Det beror på vad du vill göra. På våren öppnar säsongsverksamheter och klassiska fartyg börjar gå, på sommaren går flest båtar, på hösten blir resenärerna färre och SL-biljetter för 30 dagar gäller i hela Waxholmsbolagets trafik, och på vintern har bland annat Grinda, Sandhamn, Utö och Nämdö trafik året om." },
      // KÄLLA: https://www.waxholmsbolaget.se/nyheter-och-trafikinfo/forlang-sommaren-i-skargarden — "Packa en matsäck och åk ut över dagen."; https://skargardsstiftelsen.se/omraden/bjorno/ — "ett uppskattat utflyktsmål året om"; https://skargardsstiftelsen.se/boka-boende/ — "Stugor och lägenheter på Utö är öppna under perioden 1 maj-2 november."
      { q: "Vad kan man göra i skärgården på höstlovet?", a: "Åka ut över dagen med matsäck eller stanna en helg. Björnö är ett utflyktsmål året om med markerade vandringsleder, på Grinda och Nämdö finns etapper av Stockholm Archipelago Trail, och på Utö går Skärgårdsstiftelsens stugor att hyra till 2 november." },
      // KÄLLA: https://www.waxholmsbolaget.se/nyheter-och-trafikinfo/dags-for-hosttidtabell — "Hösttidtabellerna gäller mellan 17 augusti och lördagen den 12 december."; https://www.waxholmsbolaget.se/nyheter-och-trafikinfo/dags-for-hosttidtabell — "Övergången till hösttabellerna innebär att trafiken anpassas till er som ska resa till skola och jobb."
      { q: "Kör Waxholmsbolaget på hösten?", a: "Ja. Hösttidtabellerna gäller från 17 augusti till och med lördagen den 12 december. Trafiken anpassas då efter resor till skola och jobb, så sök din resa i reseplaneraren innan du åker." },
      // KÄLLA: https://www.waxholmsbolaget.se/nyheter-och-trafikinfo/lagsasongen-igang — "Från den 14 september till den 29 april 2027 kan du som har en SL-biljett som gäller för 30 dagar eller längre resa i hela Waxholmsbolagets trafik."
      { q: "Gäller SL-kortet i skärgården på hösten?", a: "Ja, om biljetten gäller i 30 dagar eller längre. Från den 14 september till den 29 april 2027 gäller sådana SL-biljetter i hela Waxholmsbolagets trafik." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "övrig tid på året går det flera per dag"; https://www.waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://skargardsstiftelsen.se/omraden/namdo/ — "hit kan du åka med skärgårdsbåt året om"
      { q: "Vilka öar kan man besöka i skärgården på hösten?", a: "Vaxholm har flera avgångar om dagen hela året. Grinda, Sandhamn, Utö och Nämdö har båttrafik året om, och Björnö naturreservat är ett utflyktsmål året om." },
    ],
  },
  {
    slug: "midsommar-bohuslan",
    title: "Midsommarfirande på västkusten – midsommar i Bohuslän",
    excerpt: "Midsommarfirande på västkusten: här listar arrangörerna midsommar i Bohuslän – Orust, Smögen, Tjörn och Göteborgs skärgård – plus trafiken på midsommar.",
    category: "Säsong", emoji: "🌼", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/orust/sommar/fira-midsommar-pa-orust/ — "Gullholmen - Midsommarafton 19 Juni"; https://www.vastsverige.com/sotenas/produkter/midsommarfirande/ — "Smögen vid Badhusparken"; https://www.vastsverige.com/sotenas/produkter/midsommarfirande/ — "Kolla alltid med respektive förening/arrangör vad som gäller just hos dem."
      { q: "Var firar man midsommar i Bohuslän?", a: "Firandena ordnas av lokala föreningar på många orter. Till midsommar 2026 listade Visit Orust bland annat Ellös, Gullholmen, Käringön, Henån och Mollösund, och Visit Smögen och Sotenäs listar Smögen vid Badhusparken, Kungshamn och Hunnebostrand. Kolla alltid med arrangören, eftersom programmen ändras." },
      // KÄLLA: https://www.vastsverige.com/bohuslan/se-och-gora/midsommar/ — "Planera för ett midsommarfirande med dans runt midsommarstången, roliga lekar och picknick i det gröna."; https://www.goteborg.com/guider/midsommar-i-goteborg/ — "Här samlar vi information om var du kan fira midsommar i och runt om Göteborg."
      { q: "Var hittar man midsommarfirande på västkusten?", a: "På vastsverige.com, som har en egen midsommarsida för Bohuslän och Göteborgs skärgård, och på kommunernas turistsidor, till exempel Visit Orust, Visit Smögen, Visit Tjörn, Inom Tanum och Visit Öckerö. För Göteborg samlar goteborg.com firandena." },
      // KÄLLA: https://www.vastsverige.com/svenska-traditioner/ — "Midsommarafton firas alltid på en fredag mellan 19 och 25 juni."; https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253/ — "midsommardagen den lördag som infaller under tiden den 20-26 juni"
      { q: "När är midsommarafton?", a: "Midsommarafton är alltid en fredag mellan 19 och 25 juni. Midsommardagen är enligt lagen om allmänna helgdagar den lördag som infaller 20–26 juni." },
      // KÄLLA: https://www.vasttrafik.se/info/helgdagar/ — "Vid storhelger och aftnar kör vi oftast enligt tidtabellen som gäller för lördagar och söndagar."; https://www.vasttrafik.se/info/helgdagar/ — "Midsommarafton Lördag med nattrafik"
      { q: "Hur går Västtrafik på midsommar?", a: "Västtrafik kör oftast enligt helgtidtabell på storhelger. I Västtrafiks tabell för 2026 gick trafiken på midsommarafton som en lördag med nattrafik och på midsommardagen som en söndag. Sök resan i reseplaneraren." },
      // KÄLLA: https://www.vastsverige.com/visitockero/midsommariskargarden/ — "Fira midsommar i Göteborgs skärgård 2026"; https://www.vastsverige.com/visitockero/midsommariskargarden/ — "Midsommarafton på Fotö fotbollsplan"; https://www.vastsverige.com/visitockero/midsommariskargarden/ — "Arrangör: Vrångö fritidsförening"
      { q: "Finns det midsommarfirande i Göteborgs skärgård?", a: "Ja. Visit Öckerö publicerar en midsommarguide varje år. Till midsommar 2026 fanns firanden bland annat på Fotö, Björkö, Rörö, Knippla, Hyppeln, Öckerö, Hälsö och Vrångö." },
    ],
  },
  { slug: "sandhamn-vs-grinda", title: "Sandhamn vs Grinda – vilken ö passar dig?", excerpt: "Två skärgårdsklassiker med helt olika karaktär. En ärlig jämförelse.", category: "Region", emoji: "⚖", readTime: "5 min", fullContent: true, faqs: [{ q: 'Vad är skillnaden mellan Sandhamn och Grinda?', a: 'Sandhamn är mer levande med krogar, butiker och en liten stad. Grinda är lugnare och naturrikare – perfekt för familjer. Sandhamn är dyrare och fullpackat på helger i juli.' }, { q: 'Vilken ö passar barnfamiljer bäst – Sandhamn eller Grinda?', a: 'Grinda passar barnfamiljer bättre: lugnt, sandstrand och naturleder. Sandhamn ger mer aktivitet och restauranger men är trängre och dyrare.' }] },
  {
    slug: "gotland-vs-oland",
    title: "Gotland vs Öland – stor semesterguide",
    excerpt: "Kalkstenraukar mot Alvaret, rosévin mot glasbruken. Vilken ö är rätt för dig?",
    category: "Region",
    emoji: "🗺",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      { q: 'Vilken är bättre – Gotland eller Öland?', a: 'Det beror på vad du söker. Gotland är bäst för historia, matscen och Visby-stämning. Öland är bättre för cykling, barnfamiljer med bil och ett lugnare tempo. Gotland kräver färja; Öland nås direkt med bil via Ölandsbron.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Är Gotland dyrare än Öland?', a: 'Ja, Gotland är generellt dyrare. Färjan kostar 400–900 kr/person, boende i Visby är 20–30% dyrare än Ölands alternativ. Öland är ett prisvärdare val, särskilt för barnfamiljer med bil.' },
      { q: 'Vilket är bäst för barnfamiljer?', a: 'Öland har ett litet övertag: bilfri tillgång via Ölandsbron, Böda sand (20 km sandstrand) och cykelbanor längs hela ön. Gotland har också mycket för barn men kräver mer planering med färja och bil.' },
      { q: 'Hur lång är säsongen?', a: 'Gotland har en kort intensiv säsong (maj–september) med juli som absolut högsäsong. Öland är tillgängligt hela året via bron och har öppna sevärdheter även under höst och vinter.' },
    ],
  },
  {
    slug: "marstrand-guide",
    title: "Marstrand – Carlstens fästning, färjan och Marstrandsön",
    excerpt: "Marstrand och Carlstens fästning: öppettider och inträde, Marstrandsfärjan från Koön, buss 302, gästhamnen, Match Cup Sweden och promenaden runt ön.",
    category: "Region",
    emoji: "🏰",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://carlsten.se/ — "Eftersom biltrafik är förbjuden på Marstrandsön får du som åker bil eller buss ta personfärjan från Koön till Marstrandsön. Färjeöverfarten tar bara ett par minuter."
      { q: "Hur tar man sig till Marstrand?", a: "Med bil eller buss till färjeläget på Koön och sedan med Marstrandsfärjan över till Marstrandsön. Biltrafik är förbjuden på Marstrandsön, och överfarten tar bara ett par minuter. Västtrafiks buss 302 går från Kungälv resecentrum och Ytterby station till Marstrands färjeläge." },
      // KÄLLA: https://carlsten.se/oppettider-och-priser/ — "Vuxen: 120 kr/person"; https://carlsten.se/oppettider-och-priser/ — "Barn 5-15 år: 60 kr/barn"; https://carlsten.se/oppettider-och-priser/ — "Barn under 5 år i målsmans sällskap: Fri entré"
      { q: "Vad kostar det att besöka Carlstens fästning?", a: "Enligt fästningens prislista för 2026 (läst 27 september 2026) kostar inträdet 120 kr för vuxna och 60 kr för barn 5–15 år. Barn under fem år i sällskap med vuxen och hundar går in gratis. Under Fästningsspelen gäller andra priser." },
      // KÄLLA: https://carlsten.se/oppettider-och-priser/ — "3 april – 31 maj 2026"; https://carlsten.se/oppettider-och-priser/ — "Öppet alla dagar"; https://carlsten.se/oppettider-och-priser/ — "Ring 0303-611 67 innan ditt besök för aktuella öppettider."
      { q: "När är Carlstens fästning i Marstrand öppen?", a: "Fästningen har säsongsöppet. Under 2026 var den öppen på helger i april, maj och september och alla dagar under sommaren. Utanför sommaren ber fästningen besökare att ringa innan. Aktuella tider står på carlsten.se." },
      // KÄLLA: https://www.vastsverige.com/en/kungalv/products/marstrand/ — "during the GKSS Match Cup Sweden, in the first week of July"; https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026 — "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand."
      { q: "När seglas Match Cup Sweden i Marstrand?", a: "GKSS Match Cup Sweden avgörs i Marstrand första veckan i juli. År 2026 seglades den 29 juni–4 juli." },
      // KÄLLA: https://grandmarstrand.se/restaurang-tenan/ — "Restaurang Grand Tenan"; https://www.hamnkrogenmarstrand.se/ — "Lilla varvsgatan 20"; https://marstrands.se/en/about-us — "OTTO'S VARDAGSRUM & KÖK"
      { q: "Var kan man äta i Marstrand?", a: "Bland annat på Grand Hotel Marstrands restaurang Grand Tenan, på Hamnkrogen Marstrand på Lilla Varvsgatan och på Marstrands Havshotells restaurang Otto's Vardagsrum & Kök. Kolla öppettider på respektive webbplats, eftersom de varierar med säsongen." },
      // KÄLLA: https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Endast fordon i nyttotrafik får färjas över till Marstrandsön."; https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/ — "vid större evenemang sommartid kan det vara svårt att få parkeringsplats"
      { q: "Kan man ta bilen till Marstrand?", a: "Bara till Koön. Marstrandsön är bilfri och bara fordon i nyttotrafik får färjas över. Kungälvs kommun har besöksparkeringar på Koön, men vid större evenemang på sommaren kan det vara svårt att hitta plats." },
    ],
  },
  {
    slug: "smogen-guide",
    title: "Smögen – hur lång är Smögenbryggan? Att göra, karta och buss",
    excerpt: "Hur lång är Smögenbryggan och är Smögen en stad? Svar med källor, plus att göra i Smögen: Hållöfärjan, Soteleden, bad, buss 860 och en karta i ord.",
    category: "Region", emoji: "🦐", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogen/ — "På den nästan 800 meter långa bryggan ligger sjöbodarna tätt och inhyser både butiker, caféer och restauranger."; https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ — "Idag är Smögens hamn en välbesökt gästhamn som med sin 1 km långa"
      { q: "Hur lång är Smögenbryggan?", a: "Nästan 800 meter enligt Västsverige, den regionala turistorganisationen. På en annan sida avrundar de till 1 km. Längs bryggan ligger sjöbodar med butiker, caféer och restauranger." },
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/mer-om-sotenas/ — "Här ligger orterna Smögen, Kungshamn, Hunnebostrand, Bovallstrand, Malmön, Väjern och Hovenäset."; https://www.vastsverige.com/sotenas/produkter/smogen/ — "När du kör över Smögenbron från centralorten Kungshamn"
      { q: "Är Smögen en stad?", a: "Nej. Smögen är ett av flera samhällen i Sotenäs kommun, tillsammans med bland annat Kungshamn, Hunnebostrand och Bovallstrand. Kommunens centralort är Kungshamn, på andra sidan Smögenbron." },
      // KÄLLA: https://hallofarjan.se/ — "Restiden till Hållö är cirka 10 minuter."; https://www.vastsverige.com/sotenas/produkter/smogen/ — "Du kan också åka på sälsafari eller följa med en lokal fiskare ut på djuphavsfiske."; https://www.vastsverige.com/sotenas/produkter/smogen/ — "Tjugo minuter öster om Smögen ligger Nordens Ark"
      { q: "Vad finns att göra i Smögen?", a: "Promenera Smögenbryggan, ta Hållöfärjan till naturreservatet på Hållö (cirka 10 minuter), åk på sälsafari eller kryssning genom Sotekanalen, vandra en etapp av Soteleden eller besök Nordens Ark tjugo minuter österut." },
      // KÄLLA: https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014486000000/ — "Tidtabell linje 860 Smögen - Kungshamn - Uddevalla - Trollhättan"; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf — "Munkedal station"
      { q: "Hur tar man sig till Smögen med buss?", a: "Med Västtrafiks buss 860, som går Smögen–Kungshamn–Uddevalla–Trollhättan och bland annat stannar vid Munkedal station. Linjen går inte till Göteborg, så därifrån byter du längs vägen. Sök hela resan i Västtrafiks reseplanerare." },
      // KÄLLA: https://www.sotenas.se/kommunpolitik/kommunfakta/vanligafragorundersommaren.4.f8e9d9b1639b7a2e6f3b71c.html — "Smögen – Sandö, Vallevik och herr- och dambadet vid Makrillviken"; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "Släta klippavsatser lockar ner dig i det klara, blåa vattnet vid Marmorbassängen på Hållös västsida."
      { q: "Kan man bada vid Smögen?", a: "Ja. Kommunens badplatser på Smögen är Sandö, Vallevik och herr- och dambadet vid Makrillviken. På Hållö, dit Hållöfärjan går från Smögenbryggan, finns klippbad vid Marmorbassängen på västsidan." },
      // KÄLLA: https://www.sotenas.se/kommunpolitik/kommunfakta/vanligafragorundersommaren.4.f8e9d9b1639b7a2e6f3b71c.html — "Man får alltså inte övernatta, campa eller tälta utomhus på exempelvis Smögen eller Ramsvik."; https://www.sotenas.se/kommunpolitik/kommunfakta/vanligafragorundersommaren.4.f8e9d9b1639b7a2e6f3b71c.html — "Mellan 15 juni och 15 augusti är det endast tillåtet att campa på våra campingplatser."; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "tälta eller ställa upp husvagn"
      { q: "Får man tälta eller campa på Smögen?", a: "Nej, inte utomhus på Smögen. Sotenäs kommun hänvisar till campingplatserna, och mellan 15 juni och 15 augusti är det bara där du får campa. På Hållö är tältning förbjuden enligt reservatsföreskrifterna." },
    ],
  },
  {
    slug: "naturhamnar-guide",
    title: "Naturhamnar i Stockholms skärgård – regler, toalett och platser",
    excerpt: "Naturhamnar i Stockholms skärgård: vad en naturhamn är, hur länge du får ankra, vad som gäller för toalett och eld, och var reservaten har naturhamnar.",
    category: "Praktisk", emoji: "⚓", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://sxk.se/bojar-hamnar-och-farleder/hamnar/naturhamnar — "Naturhamnar är vikar och platser som SXK:s medlemmar funnit vägen till och vill rekommendera andra att använda. Det gör att de varierar i utseende och standard"; "I vissa naturhamnar har SXK placerat ut svajbojar"
      { q: "Vad är en naturhamn?", a: "En naturhamn är en vik eller plats där båtfolk ankrar eller förtöjer utan att ligga i en anlagd gästhamn. Svenska Kryssarklubben beskriver naturhamnar som vikar och platser som medlemmarna hittat och vill rekommendera till andra, och skriver att de därför varierar i utseende och standard. I vissa har SXK lagt ut svajbojar, på andra ställen finns bergöglor." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Man brukar använda sig av samma princip som för tältning, och det är något enstaka dygn."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "för längre tid än två dygn i följd förankra båt vid samma strand"
      { q: "Hur länge får man ligga för ankar i en naturhamn?", a: "Det finns ingen fast regel i allemansrätten. Naturvårdsverket skriver att man brukar följa samma princip som för tältning – något enstaka dygn. Vill du ligga längre vid någon annans strand ska du fråga markägaren. I många naturreservat, till exempel Grinda, Finnhamn och Huvudskär, är det förbjudet att ligga förankrad vid samma strand mer än två dygn i följd." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Du får endast elda på anvisade platser eller i grill på ben."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html — "göra upp öppen eld"
      { q: "Får man grilla i en naturhamn?", a: "Det beror på var du ligger. I Granholmens, Fjärdlångs och Huvudskärs naturreservat är öppen eld förbjuden. På Grinda, Finnhamn och Nåttarö får du elda på anvisade platser. I Nämdöskärgårdens nationalpark får du elda på anvisade platser eller i grill på ben. Läs föreskrifterna på Länsstyrelsens sida för reservatet innan du tänder." },
      // KÄLLA: https://sxk.se/bojar-hamnar-och-farleder/bojar-mooring-buoys/bojbestammelser — "Enbart medlemskap i SXK ger inte rätt att begagna klubbens bojar."; https://sxk.se/bojar-hamnar-och-farleder/hamnar/uthamnar — "Uthamnarna är tillgängliga för alla båtturister, även för icke SXK-medlemmar."
      { q: "Får vem som helst förtöja vid Kryssarklubbens blå bojar?", a: "Nej. Båten ska vara registrerad i SXK:s båtregister, föra årets bojflagga och ha tydligt namn – bara medlemskap räcker inte. Du får ligga högst 24 timmar. SXK:s uthamnar, som Norrviken på Runmarö, är däremot öppna för alla båtturister." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/batliv-miljo/avfall-fran-fritidsbat/toalettavfall/ — "Det är förbjudet att släppa ut toalettavfall i vattnet."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Använd toalett i land eller en hink med tättslutande lock om båten saknar toalett med avloppstank."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html — "Flera torrdass och sopmajor finns i området."
      { q: "Finns det toalett i naturhamnar?", a: "Bara på vissa platser. Länsstyrelsen anger torrdass i bland annat Finnhamns, Nåttarös, Huvudskärs och Svenska Högarnas reservat. Det är förbjudet att släppa ut toalettavfall från fritidsbåtar. Saknar båten toalett med avloppstank rekommenderar Naturvårdsverket en hink med tättslutande lock, och saknas toalett i land ska du gå långt från vatten, hus och stigar och gräva ner avföringen." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Naturhamnar vid Djupfladen, Söder-Långholm och Korsholm."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/granholmen.html — "Munkhamnen är en utmärkt och välbesökt naturhamn."; https://skargardsstiftelsen.se/omraden/trasko-storo/ — "Det finns flera naturhamnar i Träsköfladen"; https://skargardsstiftelsen.se/omraden/lido/ — "den välbesökta naturhamnen Österhamn"
      { q: "Var finns naturhamnar i Stockholms skärgård?", a: "Länsstyrelsen och Skärgårdsstiftelsen pekar själva ut naturhamnar i bland annat Grinda (Hästholmssundet), Granholmen (Munkhamnen), Finnhamn (Djupfladen, Söder-Långholm och Korsholm), Nåttarö (Östermarsfladen), Huvudskär, Fjärdlång, Lidö (Österhamn), Träskö-Storö (Träsköfladen) och Nämdöskärgårdens nationalpark. Reglerna för ankring, eld och hund skiljer sig mellan områdena." },
    ],
  },
  {
    slug: "bohuslan-skargard-guide",
    title: "Bohuslän – skärgården, Kustvägen och norra Bohuslän",
    excerpt: "Bohuslän är ett landskap, ingen egen region. Om Bohusläns skärgård från Marstrand till Koster, Kustvägen i norra Bohuslän och hur du tar dig ut till öarna.",
    category: "Region",
    emoji: "🌊",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://ext-geodatakatalog-forv.lansstyrelsen.se/PlaneringsKatalogen/GetMetaDataById?id=922a99d3-802c-4acc-b32c-cb0ae5e79861_C — "Gränser för landskapen Bohuslän, Dalsland och Västergötland."; https://www.lansstyrelsen.se/vastra-gotaland/om-oss/om-lansstyrelsen-vastra-gotaland.html — "Då bildades storlänet Västra Götalands län."; https://www.vgregion.se/om-vgr/ — "Västra Götalandsregionen ansvarar för hälso- och sjukvård, kultur, kollektivtrafik och regional utveckling i Västra Götaland."
      { q: "Är Bohuslän en region?", a: "Nej, Bohuslän är ett landskap. Det hörde till Göteborgs och Bohus län fram till 1998, då Västra Götalands län bildades. Regionen är Västra Götalandsregionen, som ansvarar för bland annat sjukvård och kollektivtrafik." },
      // KÄLLA: https://www.lansstyrelsen.se/download/18.8cd5a1b19362fb4fc2757/1732533960034/V%C3%A4gvisning%20till%20bes%C3%B6ksm%C3%A5l%20med%20h%C3%B6ga%20natur-%20och%20kulturv%C3%A4rden.pdf — "Den berör delar av länsvägar 171,174 och 163"; https://www.lansstyrelsen.se/download/18.8cd5a1b19362fb4fc2757/1732533960034/V%C3%A4gvisning%20till%20bes%C3%B6ksm%C3%A5l%20med%20h%C3%B6ga%20natur-%20och%20kulturv%C3%A4rden.pdf — "Idag går den norr om Lysekil och är länets enda turistväg."
      { q: "Vad är Kustvägen i Bohuslän?", a: "Kustvägen Bohuslän är den skyltade turistvägen i norra Bohuslän, norr om Lysekil. Den följer delar av länsvägarna 171, 174 och 163, och längs vägen står märket för turistväg med prästkragar." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/om-oss/om-lansstyrelsen-vastra-gotaland.html — "Naturen i länet bjuder på en unik skärgård i Bohuslän"; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "Kosterhavet är Sveriges första marina nationalpark."; https://www.vastsverige.com/tanum/se--gora/grebbestad/ — "centret för Sveriges produktion av vilda ostron"
      { q: "Vad är Bohuslän känt för?", a: "Skärgården och fiskelägena, Kosterhavet som är Sveriges första marina nationalpark, och skaldjur. Grebbestad är centrum för Sveriges produktion av vilda ostron." },
      // KÄLLA: https://www.vastsverige.com/tanum/se--gora/grebbestad/ — "Grebbestad är en populär sommarort i norra Bohuslän"; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "Året runt avgår Kosterbåtarna från Strömstad. Resan tar ungefär 45 minuter."
      { q: "Vad finns i norra Bohuslän?", a: "Bland annat Fjällbacka, Väderöarna, Grebbestad, Strömstad och Kosterhavets nationalpark. Kosterbåtarna går året runt från Strömstad och resan tar ungefär 45 minuter." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/kosteroarna.html — "Hit tar du dig med både tåg och buss. Tidtabeller finns hos Västtrafik."; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Tuvesvik är platsen där färjan (linje 381) till Gullholmen, Härmanö och Käringön avgår."
      { q: "Hur tar man sig till Bohuslän utan bil?", a: "Med tåg och buss. Till Strömstad går både tåg och buss, och tidtabellerna finns hos Västtrafik. Ut till öarna går reguljära båtlinjer, till exempel linje 381 från Tuvesvik till Käringön och Gullholmen." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Hummerpremiären infaller klockan 07.00 den första måndagen efter 20 september varje år."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Fritidsfiskare får fiska till och med 30 november."
      { q: "När är hummerpremiären i Bohuslän?", a: "Hummerpremiären är klockan 07.00 den första måndagen efter 20 september varje år. Fritidsfiskare får fiska hummer till och med 30 november." },
    ],
  },
  {
    slug: "norrtelje-guide",
    title: "Norrtälje – porten till skärgården: öar i Norrtälje skärgård",
    excerpt: "Norrtälje skärgård med öar som Lidö, Arholma, Yxlan och Blidö: så tar du dig till Norrtälje, båtarna från hamnen och vad handelsområdet Norrtälje Porten är.",
    category: "Region", emoji: "⛵", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.norrteljeporten.se/ — "NorrteljePorten har ett varierat utbud av butiker och varuhus."; "Både Biltema och Stora Coop har mindre serveringar."; "4 timmars parkering med p-skiva."
      { q: "Vad är Norrtälje Porten?", a: "Norrtälje Porten (NorrteljePorten) är ett handelsområde i Norrtälje med butiker och varuhus, bland annat Stora Coop och Biltema. Där gäller fyra timmars parkering med p-skiva." },
      // KÄLLA: https://www.norrtalje.se/info/trafik-gator-parker/resa-parkera-och-ladda/kollektivtrafik/ — "Buss från Norrtälje busstation till Tekniska Högskolan (Östra station) tar 70 minuter och har hållplatsen Arninge för byte till Roslagsbanan."
      { q: "Hur tar man sig till Norrtälje?", a: "Med SL-buss från Tekniska högskolan (Östra station) i Stockholm till Norrtälje busstation. Resan tar 70 minuter enligt Norrtälje kommun, och vid Arninge kan du byta till Roslagsbanan." },
      // KÄLLA: https://blidosundsbolaget.se/norra-batlinjen/ — "Upplev norra skärgården med Norra båtlinjen – en heldagsresa från Norrtälje hamn till vackra Lidö eller Arholma."; https://www.norrtalje.se/info/trafik-gator-parker/resa-parkera-och-ladda/kollektivtrafik/ — "Färjorna körs av Trafikverkets färjerederi och är inte en del av Waxholmsbolagets trafik. Resan är kostnadsfri eftersom det är en del av statlig väg."
      { q: "Vilka öar kan man nå från Norrtälje?", a: "Sommartid går Norra båtlinjen från Norrtälje hamn till Lidö och Arholma. Yxlan och Blidö når du med buss eller bil och Trafikverkets avgiftsfria vägfärjor." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/lido.html — "Lidö naturreservat med omgivande öar ligger vid inloppet till Norrtäljeviken."; "Kommun: Norrtälje"; https://blidosundsbolaget.se/norra-batlinjen/ — "Att åka med Norra båtlinjen till Lidö tar lite drygt en och en halv timme"
      { q: "Vilken ö ligger utanför Norrtälje?", a: "Lidö ligger vid inloppet till Norrtäljeviken och hör till Norrtälje kommun. Dit tar det lite drygt en och en halv timme med Norra båtlinjen från Norrtälje." },
      // KÄLLA: https://www.norrtalje.se/info/jobb-och-foretag/besoksnaringsstrategi/norra-batlinjen/ — "Under sommarmånaderna tar du dig enkelt ut i skärgården med Norra Båtlinjen, Nord/Sydlinjen och S/S Blidösund."; https://www.norrtalje.se/info/trafik-gator-parker/resa-parkera-och-ladda/kollektivtrafik/ — "På öar där det finns fastboende finns året runt trafik."
      { q: "Hur kommer man ut i Norrtälje skärgård med båt?", a: "Under sommarmånaderna går Norra båtlinjen, Nord/Sydlinjen och S/S Blidösund från Norrtälje hamn. Året runt finns kollektivtrafik till sjöss till öar med fastboende, med tider hos Waxholmsbolaget." },
    ],
  },
  {
    slug: "fjaderholmarna-guide",
    title: "Fjäderholmarna – båt från Stockholm och att göra på ön",
    excerpt: "Fjäderholmarna ligger i Stockholms inlopp. Så tar du båt till Fjäderholmarna från Strandvägen eller Slussen, när ön har säsong och vad du kan göra där.",
    category: "Region",
    emoji: "⛴",
    readTime: "6 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Vi tar dig dit på 30 minuter från centrala Stockholm."; http://www.fjaderholmslinjen.se/valkommen/index.asp — "Resan tar ca 25 minuter."; https://www.kungligaslotten.se/vara-besoksmal/kungl.-nationalstadsparken/infor-besoket/hitta-hit.html — "Gustafs taxibåt"; https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/ — "Kommer du med egen båt är du välkommen att nyttja öns gästhamn."
      { q: "Hur tar man sig till Fjäderholmarna?", a: "Med båt. Strömma går från Strandvägen (vissa turer via Nacka Strand) och tar 30 minuter. Fjäderholmslinjen går från Slussen och tar ungefär 25 minuter. Djurgårdsförvaltningen listar också Waxholmsbolaget och en taxibåt, och med egen båt kan du lägga till i gästhamnen." },
      // KÄLLA: https://www.kungligaslotten.se/vara-besoksmal/kungl.-nationalstadsparken/infor-besoket/hitta-hit.html — "Strömma Kanalbolaget www.stromma.se"; http://www.fjaderholmslinjen.se/valkommen/index.asp — "Fjäderholmslinjen går under perioden 1 maj till 13 september 2026."; https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "1 maj – 18 juni & 17 augusti – 13 september:"
      { q: "Vilken båt går till Fjäderholmarna?", a: "Strömma Kanalbolaget, Fjäderholmslinjen och Waxholmsbolaget är de båtbolag som Kungliga Djurgårdens förvaltning hänvisar till. Strömma och Fjäderholmslinjen körde 1 maj–13 september 2026." },
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Enkel resa: 170 kr | Tur och retur: 205 kr"; http://www.fjaderholmslinjen.se/valkommen/index.asp — "Vi accepterar Visa/Mastercard, ej kontanter."
      { q: "Kostar det att åka till Fjäderholmarna?", a: "Ja, båten kostar. Strömmas sida angav 170 kr enkel resa och 205 kr tur och retur när vi läste den 28 september 2026. Fjäderholmslinjen tar bara kort, inte kontanter." },
      // KÄLLA: https://www.kungligaslotten.se/vara-besoksmal/kungl.-nationalstadsparken/fjaderholmarna.html — "Sol och bad vid klipporna."; https://www.kungligaslotten.se/vara-besoksmal/kungl.-nationalstadsparken/fjaderholmarna.html — "På ön finns en permanent utställning med allmogebåtar."; https://www.rodavillan.nu/ — "På Röda Villan hyr vi ut bouleklot för spel på våra banor."
      { q: "Vad kan man göra på Fjäderholmarna?", a: "Äta på någon av restaurangerna, titta på hantverk i Hantverkslängan och Verkstadslängan, besöka utställningen med allmogebåtar, spela boule och sola och bada vid klipporna." },
      // KÄLLA: https://www.kungligaslotten.se/artiklar-film-360/kungliga-parker/2025-06-09-fjaderholmarnas-historia.html — "Fjäderholmarna kan besökas säsongen maj till mitten av september."; https://fjaderholmarnaskrog.se/ — "FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027."; https://fjaderholmarnaskrog.se/ — "NU SERVERA JULBORD MELLAN 20/11"
      { q: "När är Fjäderholmarna öppet?", a: "Säsongen är maj till mitten av september. År 2026 var det säsongsöppet till och med 13 september. Fjäderholmarnas Krog öppnar för sommaren igen 1 maj 2027 och serverar julbord från 20 november." },
      // KÄLLA: https://www.kungligaslotten.se/vara-besoksmal/kungl.-nationalstadsparken/fjaderholmarna.html — "Fjäderholmarna ligger i Lidingö stad och ingår sedan 1995 i Kungliga Nationalstadsparken."; https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/ — "De bildar en lummig oas just i brytningspunkten mellan Djurgården, Nacka och Lidingö."
      { q: "Är Fjäderholmarna i Stockholm?", a: "Öarna ligger i Stockholms inlopp mellan Djurgården, Nacka och Lidingö, men de hör till Lidingö stad och är en del av Kungliga nationalstadsparken." },
    ],
  },
  {
    slug: "weekend-i-skargarden",
    title: "En hel weekend i skärgården – så planerar du",
    excerpt: "Vad packar du, var bor du och hur strukturerar du dagarna för maximal upplevelse?",
    category: "Praktisk", emoji: "🏕", readTime: "9 min", fullContent: true, topics: ['teambuilding'],
    faqs: [
      { q: 'Hur planerar man bäst en skärgårdsweekend?', a: 'Bestäm destination och boendeform först (värdshus, vandrarhem eller tält). Boka boende minst 2–3 månader i förväg för sommarsäsongen. Köp båtbiljetter i god tid. Ha en plan B om väder eller båt krånglar.' },
      { q: 'Vad ska man packa för en skärgårdsweekend?', a: 'Vattentäta kläder för båtresan, lager-på-lager eftersom havsklimatet är oförutsägbart, solskydd, myggolja för kvällar, skor som tål klippor och vatten. Ta med matsäck om du planerar dagstur till öar utan service.' },
      { q: 'Vilka öar passar bäst för en helg i Stockholms skärgård?', a: 'Sandhamn och Utö ger full service med restauranger och boende. Grinda är perfekt för barnfamiljer. Finnhamn och Arholma passar den som vill ha mer vildmarkskänsla med vandrarhem och natur.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Hur mycket kostar en skärgårdsweekend?', a: 'Räkna med 500–1 500 kr/person i transport, 800–2 000 kr/natt i boende och 300–600 kr/dag i mat. En helg för två med värdshusboende kostar totalt ca 3 000–6 000 kr beroende på destination.' },
    ],
  },
  {
    slug: "basta-oar-stockholms-skargard",
    title: "Bästa öarna i Stockholms skärgård – 15 öar och hur du åker dit",
    excerpt: "Bästa öarna i Stockholms skärgård? 15 öar i Stockholms skärgård som Waxholmsbolaget och RUFS 2050 lyfter fram, med båtresan dit och vad som finns på varje ö.",
    category: "Region", emoji: "🏝", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal — "Här finns information om platser som du kan resa till med Waxholmsbolagets trafik, både sevärdheter i skärgården och några utvalda öar."
      { q: "Vilka är de bästa öarna i Stockholms skärgård?", a: "Det finns ingen officiell rangordning. Waxholmsbolaget lyfter fram Vaxholm, Grinda, Gällnö, Möja, Ljusterö, Norröra och Söderöra, Utö, Sandhamn, Nämdö, Landsort och Rödlöga som resmål. Välj efter om du vill ha kort resa, sandstrand, cykling eller ytterskärgård." },
      // KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c37487ba/1732515932045/Sk%C3%A4rg%C3%A5rdsfakta%20%E2%80%93%20Grafiska%20kartor%202019.pdf — "I Stockholms skärgård finns omkring 30 000 öar, varav cirka 200 är bebodda."
      { q: "Hur många öar finns i Stockholms skärgård?", a: "Enligt Länsstyrelsen finns omkring 30 000 öar i Stockholms skärgård, och cirka 200 av dem är bebodda." },
      // KÄLLA: https://explorearchipelago.se/sv/sthlm/inre-skargarden/fjaderholmarna — "En kort båtresa på 20 minuter från centrala Stockholm"; https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"
      { q: "Vilken ö i Stockholms skärgård är lättast att nå?", a: "Fjäderholmarna ligger 20 minuter med båt från centrala Stockholm. Vaxholm ligger en timme från Strömkajen, med flera turer per dag året runt." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/namdo — "den är både bilfri och till viss del ett naturreservat"; https://www.waxholmsbolaget.se/reseplanering/resmal/rodloga — "Här finns en liten by, men inga vägar"; https://explorearchipelago.se/sv/sthlm/sodra-skargarden/orno — "hit går det bilfärja från Dalarö året om"
      { q: "Vilka öar i Stockholms skärgård är bilfria?", a: "Waxholmsbolaget beskriver Nämdö som bilfri, och på Rödlöga finns inga vägar, bara stigar. Ornö har däremot bilfärja från Dalarö." },
      // KÄLLA: https://www.regionstockholm.se/4a88f4/siteassets/om-region-stockholm/om-region-stockholm/styrande-dokument/regional-utveckling/regional-utvecklingsplan-for-stockholm-rufs-2050.pdf — "För kärnöarna säkerställs en bastrafik som gör det möjligt att resa till och från fastlandets replipunkter varje dag, året runt."; https://www.lansstyrelsen.se/download/18.1b1d393819324610c37487ba/1732515932045/Sk%C3%A4rg%C3%A5rdsfakta%20%E2%80%93%20Grafiska%20kartor%202019.pdf — "Landsort och Gräskö är utpekade som kärnöar"
      { q: "Vilka öar i Stockholms skärgård kan man åka till året runt?", a: "Region Stockholms kärnöar ska ha kollektivtrafik varje dag året runt: Arholma, Tjockö, Ramsö, Gällnö, Runmarö, Nämdö, Svartsö, Ingmarsö, Möja, Sandhamn, Ornö, Utö, Landsort och Gräskö." },
    ],
  },
  {
    slug: "vaxholm-guide-komplett",
    title: "Vaxholm – den kompletta guiden",
    excerpt: "Fästning, restauranger, shopping och hur du tar dig dit med Waxholmsbolaget.",
    category: "Region",
    emoji: "🏰",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      // KÄLLA: SL 2025 (pendelbåt 83 upphörde som SL-linje 29 april 2025, trafiken drivs av Waxholmsbolaget, alla SL-biljetter gäller) + Waxholmsbolagets egen linjeförteckning (waxholmsbolaget.linjetidtabeller.se, läst 2026-08-25): linjen heter 4, inte 4A - A är en tabellbeteckning. Strömkajen-Vaxholm trafikeras av flera linjer.
      { q: 'Hur tar man sig till Vaxholm?', a: 'Waxholmsbolagets båt från Strömkajen tar ungefär en timme — restiden varierar med antal angöringar. Alla SL-biljetter gäller sedan 30 april 2025, då pendelbåt 83 lades ned som SL-linje. SL-buss 670 från Tekniska Högskolan T-bana tar ca 50 min. Med bil via E18 och Vaxholmsvägen tar det ca 40 min.' },
      { q: 'Är SL-kortet giltigt till Vaxholm?', a: 'SL-kortet gäller för bussresan (linje 670), men INTE på Waxholmsbolagets pendelbåt. Pendelbåten kräver separat biljett via Waxholmsbolagets app eller hemsida.' },
      { q: 'Vad gör man i Vaxholm på en dag?', a: 'Besök Vaxholms fästning (museum, guidade turer), promenera längs Hamngatan med sina trävillor, ät lunch på Waxholms Hotell med havsvy och utforska de lokala butikerna. Räkna med 4–6 timmar för en bekväm dagstur.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      // KÄLLA: vaxholmsfastning.se/historik (2026-08-25) + SFV — blockhus i början av 1500-talet (Svante Nilsson Sture), Gustav Vasas nya och kraftigare fästning 1548, nuvarande kastell 1833–1863. Mysingen ligger i SÖDRA skärgården (mellan Muskö, Utö och Ornö, NE) — Vaxholms kastell blickar ut över Kodjupet och Oxdjupet.
      { q: 'Är Vaxholms fästning värd ett besök?', a: 'Ja. Kastellet är ett av Stockholms läns bäst bevarade historiska monument — platsen befästes i början av 1500-talet, den kraftigare fästningen kom 1548 på Gustav Vasas order, i nuvarande form byggt 1833–1863 — och vaktar det smala Kodjupet in mot Stockholm. Nås med en liten roddbåt från hamnen. Öppen maj–september.' },
      { q: 'Kan man äta gott i Vaxholm?', a: 'Ja. Waxholms Hotell har en av skärgårdens bästa restauranger med havsvy. Hembygdsgårdens café serverar traditionell skärgårdsmat. Det finns även flera bagerier och caféer längs Hamngatan.' },
    ],
  },
  {
    slug: "landsort-guide",
    title: "Landsort – Landsorts fyr, färjan från Ankarudden och Öja",
    excerpt: "Landsort på ön Öja är Stockholms skärgårds sydligaste utpost. Så tar du båten från Ankarudden, besöker Landsorts fyr och fågelstationen och bor på ön.",
    category: "Region", emoji: "🏮", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/landsort — "Båtarna till Landsort går från Ankaruddens brygga. Den ligger strax söder om Nynäshamn, och det går SL-trafik mellan Nynäshamn och Ankarudden."; https://waxholmsbolaget.se/reseplanering/resmal/landsort — "Turen mellan Ankarudden och Landsort tar ungefär 35 minuter"
      { q: "Hur tar man sig till Landsort?", a: "Ta SL-buss från Nynäshamn till Ankarudden på Torö. Därifrån går Waxholmsbolagets båt till Landsort, och resan tar ungefär 35 minuter. Sök hela resan på sl.se eller hos Waxholmsbolaget." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/landsort — "båten kan lägga till vid tre olika bryggor på ön beroende på hur vinden blåser"; https://waxholmsbolaget.se/reseplanering/resmal/landsort — "titta i tabell 29"
      { q: "Var går färjan till Landsort från?", a: "Båten, linje 29 hos Waxholmsbolaget, går från Ankaruddens brygga strax söder om Nynäshamn. Den kan lägga till vid tre olika bryggor på Öja beroende på vinden, så fråga personalen ombord var du ska stå när du åker tillbaka." },
      // KÄLLA: https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/landsort--den-aldsta-svenskbyggda-fyren/ — "Den nuvarande fyren byggdes 1686 och anses vara den första fyr, som på mark som idag tillhör Sverige, är byggd av svenskar."; https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/landsort--den-aldsta-svenskbyggda-fyren/ — "en fyr byggdes år 1669"
      { q: "Är Landsorts fyr Sveriges äldsta?", a: "Sjöfartsverket, som äger fyren, kallar Landsort den äldsta svenskbyggda fyren. Det nuvarande tornet byggdes 1686, och en fyr fanns på platsen redan 1669." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Egenligen är det bara fyren och lotsstationen som heter Landsort, själva ön heter Öja, men i dagligt tal kallar de flesta hela ön för Landsort."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "Öja-Landsorts naturreservat omfattar den kända ön Öja med fyrplatsen Landsort."
      { q: "Är Landsort och Öja samma ö?", a: "Ja. Ön heter Öja, och egentligen är det bara fyren och lotsstationen som heter Landsort. I dagligt tal kallar de flesta hela ön för Landsort. Ön och vattnet runt den är naturreservatet Öja–Landsort." },
      // KÄLLA: https://www.landsortsvandrarhem.se/ — "Vandrarhemmet är öppet året runt."; https://nynashamn.se/uppleva/skargard--batliv/landsort — "På den norra delen av ön finns en sommaröppen gästhamn och Landsorts Stugor för uthyrning året runt."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "tälta och elda annat än på anvisade platser."
      { q: "Kan man övernatta på Landsort?", a: "Ja. Landsorts Vandrarhem nedanför fyren har öppet året runt, och Landsorts Stugor hyr ut stugor året runt på norra delen av ön. Tälta får du bara på anvisade platser i reservatet." },
      // KÄLLA: http://www.landsort.com/saltboden/index.html — "Här kan du handla livsmedel"; http://www.landsort.com/saltboden/index.html — "Vi har öppet dagligen juni-augusti,"; http://www.landsort.com/saltboden/index.html — "samt helger i maj och september."
      { q: "Finns det affär på Landsort?", a: "Ja. Saltboden Kök & Proviant i byn är handelsbod, servering och pub, där du kan handla livsmedel. Saltboden har öppet dagligen juni–augusti och helger i maj och september." },
    ],
  },
  {
    slug: "hyrbat-guide",
    title: "Hyra båt i skärgården – allt du behöver veta",
    excerpt: "Licenskrav, priser, bästa hyrbåtsbolagen och vad du bör fråga innan du bokar.",
    category: "Praktisk",
    emoji: "⛵",
    readTime: "8 min",
    fullContent: true,
    topics: ['hyra-bat'],
    faqs: [
      { q: 'Behöver man båtkörkort för att hyra båt?', a: 'Det finns inget lagkrav på båtkörkort i Sverige för de flesta fritidsbåtar. Men hyrbåtsbolag kräver vanligen att du kan uppvisa behörighet – antingen SBF/SSRS förarintyg eller ett krav om att du genomgår en introduktion. Fråga alltid det specifika bolaget.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar det att hyra båt i skärgården?', a: 'En enkel motorbåt kostar ca 900–1 800 kr/dag. En lite större övernattningsbåt kostar 2 000–4 500 kr/dag. Segelkryssare med 4–6 bäddar kostar 3 500–8 000 kr/dag. Boka tidigt för sommarsäsongen – de bästa båtarna är fullbokade månader i förväg.' },
      { q: 'Vad ingår vanligtvis i hyrbåtspriset?', a: 'Flytvästar, navigationshjälpmedel och grundutrustning brukar ingå. Bränsle är vanligen separat (du tankar upp och betalar igen vid återlämning). Kontrollera om försäkring med självriskreducering ingår – det är ofta värt att köpa till.' },
      { q: 'Var hyres båt bäst ut i Stockholm?', a: 'Populära hyrbåtsbolag i Stockholm är Båtbörsen (Djurgårdsbrunnsviken), Sealifecenter (Nacka), Bosses Båtuthyrning (Norra Djurgården) och flera bolag i Vaxholm. I Göteborg är Sjöstaden och Hisingen bra utgångspunkter.' },
    ],
  },
  {
    slug: "pendelbat-guide",
    title: "Pendelbåtar i Stockholm – SL:s pendelbåtslinjer och biljetter",
    excerpt: "Pendelbåtar i Stockholm: SL:s båtar på linje 80, 82, 84 och 89 – var de går, hur du köper biljett och tar med cykel, plus Waxholmsbolaget på SL-biljett.",
    category: "Transport",
    emoji: "⛴",
    readTime: "5 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://sl.se/reseplanering/var-trafik/pendelbatarna — "Det finns fyra båtlinjer som ingår i SL-trafiken och du använder samma biljetter som i övrig trafik."; "Linje 84 går mellan Ålstäket på Värmdö och Strömkajen"; "Linje 89 går mellan Tappström och Klara Mälarstrand"; "Linje 80 går mellan Ropsten och Nybroplan"; "Djurgårdsfärjan går mellan Räntmästartrappan/Slussen och Allmänna gränd på Djurgården, via Skeppsholmen."; "Vissa avgångar fortsätter från Ropsten till Storholmen."
      { q: "Vilka pendelbåtar finns i Stockholm?", a: "I SL-trafiken ingår fyra pendelbåtslinjer: 80 (Nybroplan–Ropsten, vissa turer vidare till Storholmen), 82 Djurgårdsfärjan (Slussen–Skeppsholmen–Allmänna gränd), 84 (Ålstäket–Strömkajen) och 89 (Tappström på Ekerö–Klara Mälarstrand)." },
      // KÄLLA: https://sl.se/reseplanering/var-trafik/pendelbatarna — "Samtliga SL-biljetter gäller på de här båtlinjerna. Det går bra att köpa en enkelbiljett med ditt betalkort."; "På Djurgårdsfärjan linje 82 blippar du din biljett på biljettläsaren innan du stiger ombord på färjan."; "På de andra båtlinjerna blippar du din biljett i samband med att du stiger ombord – biljettläsarna finns ombord."
      { q: "Hur köper man biljett till SL:s pendelbåtar?", a: "Alla SL-biljetter gäller på pendelbåtarna, och du kan köpa en enkelbiljett med betalkort. På Djurgårdsfärjan (linje 82) blippar du biljetten på biljettläsaren innan du går ombord. På linje 80, 84 och 89 blippar du när du stiger ombord – biljettläsarna sitter på båten." },
      // KÄLLA: https://sl.se/reseplanering/var-trafik/pendelbatarna — "Båtarna som kör mellan Nybroplan och Ropsten har plats för 30 cyklar ombord, och de som kör mellan Ropsten och Storholmen har plats för 15 cyklar."; "20 cyklar får plats ombord på linjens ordinarie båtar."; "30 cyklar får plats ombord under den isfria tiden"; "eftersom Djurgårdsfärjan är en linje som många reser med händer det att du inte får plats att ta med cykeln ombord"
      { q: "Får man ta med cykel på SL:s pendelbåtar?", a: "Ja, i mån av plats på alla fyra linjerna. Linje 80 tar 30 cyklar på båtarna Nybroplan–Ropsten och 15 på Ropsten–Storholmen, linje 84 tar 20 och linje 89 tar 30 under isfri tid. På Djurgårdsfärjan händer det att cykeln inte får plats eftersom många reser med linjen." },
      // KÄLLA: https://sl.se/reseplanering/var-trafik/pendelbatarna — "Samtliga SL-biljetter gäller på de här båtlinjerna."; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Alla SL-biljetter gäller mellan 44 bryggor i Waxholmsbolagets trafik"; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/sa-galler-sl-biljetten-pa-baten — "Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april"
      { q: "Gäller SL-biljetten på pendelbåtarna och Waxholmsbolaget?", a: "Alla SL-biljetter gäller på SL:s pendelbåtar. På Waxholmsbolagets båtar gäller alla sorters SL-biljetter året runt mellan 44 bryggor från Strömkajen till Vaxholm med omnejd. Under lågsäsong, 14 september–29 april, gäller SL:s periodbiljetter på 30 dagar eller längre i hela Waxholmsbolagets trafik." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"; "titta i tabell 2 som är en samlingstabell för alla avgångar mellan just Stockholm och Vaxholm"
      { q: "Hur lång tid tar båten till Vaxholm?", a: "Enligt Waxholmsbolaget tar båtresan från Strömkajen till Vaxholm en timme. Alla avgångar Stockholm–Vaxholm finns samlade i bolagets tabell 2, och sträckan ligger inom området där alla SL-biljetter gäller." },
    ],
  },
  {
    slug: "seglingsklubbar-guide",
    title: "Seglingsklubbar i Stockholm och skärgården",
    excerpt: "Hitta rätt klubb, kurser och community för dig som vill börja segla.",
    category: "Aktivitet", emoji: "⛵", readTime: "5 min", fullContent: true, topics: ['segelkurs'],
    faqs: [
      { q: 'Vilka är de största segelklubbarna i Stockholm?', a: 'KSSS (Kungliga Sällskapet Segel-Sällskapet) i Saltsjöbaden är Sveriges mest kända. Djurgårdens Segelsällskap, Lidingö Segelsällskap och Stockholms Segelsällskap är andra stora aktörer med kurser och flottor tillgängliga.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Hur går man med i en segelklubb?', a: 'De flesta klubbar tar emot nya medlemmar via ansökan på deras hemsida. Avgiften varierar från 500 kr/år för junior-/provmedlemskap till 3 000–5 000 kr/år för full access. Många klubbar har väntelista för båtplats.' },
      { q: 'Behöver man egen båt för att gå med i segelklubb?', a: 'Nej. Många segelklubbar har gemensamma skolbåtar du kan hyra eller använda under kurser. Det är faktiskt en av de bästa anledningarna att gå med i en klubb – du lär dig segla utan att äga båt.' },
    ],
  },
  // ── Batch C: destinationer + praktiska guider ──────────────────────────────
  {
    slug: "aland-guide",
    title: "Åland valuta, språk och färja – guide till Mariehamn och Åland",
    excerpt: "Åland har euro som valuta, men många ställen tar svenska kronor. Svar på vilken valuta Åland har, i vilket örike Mariehamn ligger och hur färjorna går.",
    category: "Region",
    emoji: "🏝",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://visitaland.com/info/kort-och-gott-om-aland/ — "Valuta: Euro"; https://visitaland.com/info/sjalvstyrelsen-aland-100/ — "2002: Åland bytte från finska mark till den gemensamma europeiska valutan euro."
      { q: "Vilken valuta har Åland?", a: "Euro, precis som i resten av Finland. Åland bytte från finska mark till euro år 2002." },
      // KÄLLA: https://www.eckerolinjen.se/viktig-reseinformation — "På Åland kan du betala med euro men även med svenska kronor på många ställen samt bank- och kreditkort med Visa-funktion."
      { q: "Kan man betala med svenska kronor på Åland?", a: "På många ställen, ja. Enligt Eckerö Linjen kan du betala med euro men också med svenska kronor på många ställen, och med bank- och kreditkort med Visa-funktion. Valutan på Åland är ändå euro." },
      // KÄLLA: https://visitaland.com/resa/planera-resa/ — "Mariehamn är Ålands enda stad och den mest centrala ankomsthamnen."; https://visitaland.com/info/kort-och-gott-om-aland/ — "Staden Mariehamn har ca 11.700 invånare"; https://www.regeringen.ax/aland-omvarlden — "Som ett självstyrt örike har Åland en särskild position"
      { q: "I vilket örike ligger Mariehamn?", a: "Mariehamn ligger på Åland, det självstyrda öriket i Finland. Mariehamn är Ålands enda stad och har cirka 11 700 invånare." },
      // KÄLLA: https://www.regeringen.ax/aland-omvarlden/alands-status-internationellt — "Åland är ett självstyrt landskap i Finland. Självstyrelsen tillkom i sin ursprungliga form via beslut i Nationernas förbund år 1921."
      { q: "Tillhör Åland Finland?", a: "Ja. Åland är ett självstyrt landskap i Finland. Självstyrelsen kom till genom ett beslut i Nationernas förbund år 1921, och Åland har eget lagting och egen landskapsregering." },
      // KÄLLA: https://visitaland.com/resa/planera-resa/ — "Från Stockholm reser du med Viking Line och Tallink Silja direkt till Mariehamn."; https://www.eckerolinjen.se/turlista — "M/S Eckerö trafikerar dagligen mellan Grisslehamn i Roslagen och Eckerö på Åland, resan tar endast 2 timmar enkel väg."; https://visitaland.com/resa/planera-resa/ — "Arlanda → 30 min flyg"
      { q: "Hur tar man sig till Åland från Stockholm?", a: "Viking Line och Tallink Silja går direkt från Stockholm till Mariehamn. Från Grisslehamn går Eckerö Linjen till Eckerö på 2 timmar, och från Kapellskär går Finnlines till Långnäs. Flyget från Arlanda tar cirka 30 minuter." },
      // KÄLLA: https://visitaland.com/resa/planera-resa/ — "Medborgare i Norden och länder som omfattas av Schengenavtalet behöver inte pass för att resa till Åland, men bör ta med legitimation."; https://www.eckerolinjen.se/viktig-reseinformation — "alla resenärer måste kunna legitimera sig med ett giltigt identitetsbevis med fotografi"
      { q: "Behöver man pass för att åka till Åland?", a: "Nej, inte som medborgare i ett nordiskt land eller ett Schengenland. Ta ändå med legitimation med foto, eftersom till exempel Eckerö Linjen kräver att alla resenärer kan legitimera sig." },
      // KÄLLA: https://visitaland.com/info/kort-och-gott-om-aland/ — "Åland är enligt grundlag enspråkigt svenskt"
      { q: "Vilket språk talas på Åland?", a: "Svenska. Åland är enligt sin grundlag enspråkigt svenskt." },
    ],
  },
  {
    slug: "gotland-guide",
    title: "Gotland – Sveriges största ö, öar vid Gotland och södra Gotland",
    excerpt: "Gotland är Sveriges största ö. Öar vid Gotland som Fårö, Gotska Sandön och Karlsöarna, tips för södra och västra Gotland och färjan till Visby.",
    category: "Region",
    emoji: "🏰",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "Fårösundsleden går mellan Fårösund på norra Gotland och Broa på Fårö."; https://www.lansstyrelsen.se/gotland/besoksmal/nationalparker/gotska-sandons-nationalpark.html — "Nationalparken Gotska Sandön är med sitt läge, 37 kilometer norr om Fårö, Östersjöns ensligaste plats."; https://gotland.com/besoka-uppleva/upptack-vastra-gotland/ — "Utanför Gotlands västkust ligger Stora och Lilla Karlsö"
      { q: "Vilka öar ligger vid Gotland?", a: "Fårö ligger norr om Gotland och nås med den avgiftsfria vägfärjan från Fårösund. Gotska Sandön är nationalpark 37 kilometer norr om Fårö. Utanför västkusten ligger Stora och Lilla Karlsö." },
      // KÄLLA: https://www.scb.se/hitta-statistik/statistik-efter-amne/boende-bebyggelse-och-mark/markanvandning/strandnara-markanvandning/pong/statistiknyhet/kust-strander-och-oar-2013/ — "Sveriges största ö är Gotland, som har en landyta på nästan 300 000 hektar (3 000 km2) och en omkrets på 800 kilometer. Sveriges näst största ö är Öland."
      { q: "Vad är Sveriges största ö?", a: "Gotland. Enligt SCB har Gotland en landyta på nästan 3 000 kvadratkilometer och en omkrets på 800 kilometer. Näst störst är Öland." },
      // KÄLLA: https://www.scb.se/hitta-statistik/statistik-efter-amne/boende-bebyggelse-och-mark/markanvandning/strandnara-markanvandning/pong/statistiknyhet/kust-strander-och-oar-2013/ — "som har en landyta på nästan 300 000 hektar (3 000 km2) och en omkrets på 800 kilometer"; https://gotland.com/article/cykla-pa-gotland/ — "Leden är totalt 540 km lång varav 16 km är separat cykelväg."
      { q: "Hur bred är Gotland?", a: "Bredden anges inte i de källor vi har läst. SCB anger landytan till nästan 3 000 kvadratkilometer och omkretsen till 800 kilometer, och cykelleden runt ön är 540 kilometer lång enligt gotland.com." },
      // KÄLLA: https://gotland.com/besoka-uppleva/upptack-sodra-gotland/ — "På Gotlands sydspets har du en storslagen utsikt över Storsudret och Östersjön."; https://gotland.com/besoka-uppleva/upptack-sodra-gotland/ — "Här hittar du Museum Lars Jonsson, naturum Gotland, café och en fantastisk trädgård."
      { q: "Vad finns att se på södra Gotland?", a: "Gotland.com tipsar bland annat om Närsholmen, sandstranden Herta, vikingagården Stavgard, Lau kyrka, Hoburgen på sydspetsen, museigårdarna och Vamlingbo prästgård med naturum Gotland." },
      // KÄLLA: https://gotland.com/besoka-uppleva/upptack-vastra-gotland/ — "Längs Gotlands västkust samsas fantastiska sandstränder med klippor och martallar."; https://gotland.com/besoka-uppleva/upptack-vastra-gotland/ — "Högklint är en av Gotlands högsta klintar"
      { q: "Vad finns på västra Gotland?", a: "Sandstränder, klippor och martallar, till exempel naturreservatet Södra hällarna, Högklint, skeppssättningarna i Gnisvärd, Tofta strand, Koviks fiskeläge och Ekstakusten." },
      // KÄLLA: https://gotland.com/gotland-convention-bureau/resa-till-och-fran-on/ — "Ta färjan från Nynäshamn eller Oskarshamn – överfarten tar cirka tre timmar"; https://gotland.com/gotland-convention-bureau/resa-till-och-fran-on/ — "Till Gotland flyger du dagligen från Arlanda med SAS"
      { q: "Hur tar man sig till Gotland?", a: "Med Destination Gotlands färja från Nynäshamn eller Oskarshamn till Visby. Överfarten tar cirka tre timmar. Det går också att flyga, till exempel från Arlanda." },
      // KÄLLA: https://gotland.com/besoka-uppleva/friluftsliv-natur/tio-raukomraden-pa-gotland/ — "En rauk är en stor stenformation som Östersjöns vågor mejslat fram under tusentals år."; https://gotland.com/article/gotlands-natur/ — "områdena Digerhuvud och Langhammars på Fårö och naturreservatet Folhammar på östra Gotland bjuder på flest"
      { q: "Vad är raukar och var hittar man dem?", a: "Raukar är stenformationer som Östersjöns vågor har format. Flest finns vid Digerhuvud och Langhammars på Fårö och i Folhammars naturreservat på östra Gotland." },
    ],
  },
  {
    slug: "oland-guide",
    title: "Öland – guide till solens och vindarnas ö",
    excerpt: "Stora Alvaret och världsarvet, Trollskogen, Bödakusten, Borgholm och Solliden. Det vi kan belägga om Öland – med källor.",
    category: "Region",
    emoji: "🌾",
    readTime: "6 min",
    fullContent: true,
    // KÄLLA: Riksantikvarieämbetet (https://www.raa.se/kulturarv/varldsarv/varldsarv-i-sverige/sodra-olands-odlingslandskap/) — världsarv år 2000, drygt 56 000 hektar; Länsstyrelsen Kalmar, Trollskogen (https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html) — gammal tallskog med stormvridna träd, naturum vid parkeringen (läst 2026-09-21). Tidigare FAQ (borttagen 2026-09-21) påstod "fågelsjön Hornborga" på Öland — Hornborgasjön ligger i Västergötland — samt "buss 101", "Sveriges längsta sandstrand 20 km", "bron 6 km, norra Öland vid Färjestaden" utan källa.
    faqs: [
      { q: 'Hur tar man sig till Öland?', a: 'Med bil över Ölandsbron mellan Kalmar och Färjestaden. Kollektivt: tåg till Kalmar och sedan buss över bron med Kalmar länstrafik – sök resan i deras reseplanerare.' },
      { q: 'Behöver man bil på Öland?', a: 'Ön är lång och smal och kollektivtrafiken täcker inte allt. Utan bil är Borgholm och busslinjerna ramen; med bil eller cykel når du alvaret, Trollskogen och byarna.' },
      { q: 'Vad är Alvaret?', a: 'Stora Alvaret är ett flackt kalkstenslandskap som dominerar världsarvet Södra Ölands odlingslandskap, uppfört på Unescos lista år 2000. Området omfattar drygt 56 000 hektar med åkerjord, betade marker, byar, fornborgar och vattenområden. Håll dig på stigarna – vegetationen är känslig.' },
      { q: 'Vad är Trollskogen?', a: 'Ett naturreservat på Ölands nordostligaste udde med gammal tallskog med stormvridna träd och mäktiga ekar. Trolleken är Ölands äldsta ek, 800–900 år. Naturum Trollskogen ligger vid parkeringen.' },
    ],
  },
  {
    slug: "kosterarna-guide",
    title: "I vilket landskap ligger Kosteröarna? Kosterfjorden och Nordkoster",
    excerpt: "Kosteröarna ligger i norra Bohuslän utanför Strömstad. Här är Kosterfjorden och hur djup den är, var Nordkoster ligger, båten dit och reglerna på öarna.",
    category: "Region", emoji: "🌊", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/stromstad/produkter/kosteroarna/ — "nästan uppe vid den norska gränsen i norra Bohuslän"; https://www.stromstad.se/kommunochpolitik/omstromstad/kommundelar/koster.4.6d6bc8de16d1ab3015f2050f.html — "Kosteröarna ligger cirka tio kilometer utanför Strömstad."; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/kosteroarna.html — "Kommun: Strömstad"
      { q: "I vilket landskap ligger Kosteröarna?", a: "I Bohuslän, i landskapets nordligaste del nära norska gränsen. Öarna hör till Strömstads kommun i Västra Götalands län och ligger cirka tio kilometer utanför Strömstad." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/geologi — "Ned till berggrunden är Kosterrännan cirka 450 meter djup men med ett sedimentlager på cirka 200 meter så är vattendjupet 247 meter på det djupaste stället idag."
      { q: "Hur djup är Kosterfjorden?", a: "Kosterfjorden är 247 meter djup på det djupaste stället, i Kosterrännan. Ned till berggrunden är rännan omkring 450 meter djup, men ett ungefär 200 meter tjockt sedimentlager fyller botten." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/geologi — "Koster och skärgården väster om Kosterfjorden består av uråldriga gnejser."; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "över Kosterfjordens djupränna"
      { q: "Var ligger Kosterfjorden?", a: "Mellan Kosteröarna och fastlandskusten. Koster och skärgården ligger väster om fjorden och kustbandet med Bohusgranit öster om den. Båten från Strömstad passerar över fjordens djupränna." },
      // KÄLLA: https://www.vastsverige.com/stromstad/produkter/vandra-pa-kosteroarna/ — "Sommartid är linfärjan mellan Långegärde på Sydkoster och Västra bryggan på Nordkoster bemannad dagligen."; https://www.vastsverige.com/stromstad/produkter/kosteroarna/ — "Den södra ön är ungefär dubbelt så stor som den norra."
      { q: "Var ligger Nordkoster?", a: "Nordkoster är den norra av Kosteröarnas två huvudöar, alldeles intill Sydkoster. Linfärjan Kosterlänken går mellan Långegärde på Sydkoster och Västra bryggan på Nordkoster." },
      // KÄLLA: https://www.vasttrafik.se/info/kosterbatarna/ — "Kosterbåtarna - linje 899"; https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/besok-parken/hitta-hit — "De avgår från Strömstad året runt och resan tar ungefär 45 minuter."; https://www.vastsverige.com/stromstad/artikel/fragor--svar-kosteroarna/ — "Biljetter kan ej förbokas!"
      { q: "Hur tar man sig till Kosteröarna?", a: "Med Kosterbåtarna, Västtrafiks linje 899, från Ångbåtskajen vid Norra hamnen i Strömstad. Båten går alla dagar året runt och resan tar ungefär 45 minuter. Biljetter kan inte förbokas." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/kosteroarna.html — "Öarna är nästan helt bilfria och enklast tar du dig runt till fots eller med hyrd cykel."; https://www.vastsverige.com/stromstad/artikel/fragor--svar-kosteroarna/ — "Cykeluthyrning finns vid angöringsbryggorna på Sydkoster: Ekenäs brygga och Långegärde brygga."
      { q: "Är Kosteröarna bilfria?", a: "Nästan. Enligt Länsstyrelsen är öarna nästan helt bilfria, och du tar dig enklast runt till fots eller med hyrd cykel. Cyklar hyrs ut vid Ekenäs och Långegärde på Sydkoster." },
      // KÄLLA: https://www.vastsverige.com/stromstad/produkter/vandra-pa-kosteroarna/ — "Nordkoster har en mer vild och karg karaktär än Sydkoster."; https://www.stromstad.se/kommunochpolitik/omstromstad/kommundelar/koster.4.6d6bc8de16d1ab3015f2050f.html — "Av Kosteröarnas 300 bofasta bor 240 på Sydkoster."
      { q: "Vad är skillnaden på Nord- och Sydkoster?", a: "Sydkoster är ungefär dubbelt så stor och där bor de flesta av öarnas bofasta. Nordkoster har en vildare och kargare natur med ljunghedar, klapperstensfält och Kosters högsta punkt vid fyrarna på Högen." },
      // KÄLLA: https://www.vastsverige.com/stromstad/artikel/fragor--svar-kosteroarna/ — "Det är lätt att tro att Nord- och sydkoster ingår i nationalparken, men så är faktiskt inte fallet"
      { q: "Ingår Kosteröarna i Kosterhavets nationalpark?", a: "Till största delen inte. Nord- och Sydkoster är naturreservat, och bara en liten del av Sydkoster ligger i nationalparken, som omger öarna." },
    ],
  },
  {
    slug: "missat-sista-baten",
    title: "Missat sista båten – vad gör du nu?",
    excerpt: "Råd, alternativ och lugn i en stressig situation. Övernattning, taxi och hur du tar dig hem om du missar sista avgången.",
    category: "Praktisk", emoji: "⚠️", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'Vad gör jag om jag missar sista båten?', a: 'Kolla om det finns charterbåtar (ringa Waxholmsbolaget eller lokala taxibåtsoperatörer). Kolla om ön har övernattning (vandrarhem, camping, gästhamn). Kontakta Sjöräddningssällskapet SSRS bara i nödläge – de räddar liv, inte missen.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Kan man beställa taxibåt i skärgården?', a: 'Ja, de flesta öar i Stockholms skärgård har taxibåtsoperatörer. Det är dyrt – räkna med 1 000–3 000 kr beroende på avstånd – men möjligt. Sök på "taxibåt + öns namn" eller fråga vid gästhamnen.' },
      { q: 'Hur undviker jag att missa sista båten?', a: 'Kontrollera Waxholmsbolagets tidtabell innan du åker ut, inte bara när du åker hem. Sätt en påminnelse i telefonen 2 timmar innan sista avgång. Kom ihåg att sista båten kan gå redan kl 17–18 på vardagar utanför högsäsong.' },
    ],
  },
  {
    slug: "batkorkort-guide",
    title: "Båtkörkort i Sverige – krav, förarintyg och kustskepparexamen",
    excerpt: "Båtkörkort i Sverige krävs inte för båtar under 12 × 4 meter, men vattenskoter kräver förarbevis. Så fungerar förarintyg, båtkort och kustskepparexamen.",
    category: "Praktisk", emoji: "🎓", readTime: "7 min", fullContent: true, topics: ['hyra-bat'],
    faqs: [
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ — "Det finns idag inga krav på körkort om du har ett fritidsfartyg/en fritidsbåt som är kortare än tolv meter och smalare än fyra meter. Undantaget är vattenskoter (som per definition är en fritidsbåt) där det krävs förarbevis."
      { q: "Krävs båtkörkort i Sverige?", a: "Nej, inte för en fritidsbåt som är kortare än tolv meter och smalare än fyra meter. Undantaget är vattenskoter, där det krävs förarbevis. Förarintyg och andra båtintyg är frivilliga för vanliga fritidsbåtar." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ — "Den som är befälhavare på (kör, framför) ett större fritidsfartyg/fritidsskepp med en längd som överstiger 12 meter och en bredd som överstiger 4 meter ska ha skepparexamen, kustskepparexamen eller högre nautisk kompetens."; https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/vattenskoter/ — "För att kunna utbilda sig och få köra vattenskoter krävs det även att man har fyllt 15 år."
      { q: "Vilka båtar kräver båtkörkort – vad är kraven?", a: "Kör du en fritidsbåt som är längre än 12 meter och bredare än 4 meter ska du ha skepparexamen, kustskepparexamen eller högre nautisk kompetens. För vattenskoter krävs förarbevis, och du måste ha fyllt 15 år. Andra fritidsbåtar har inget krav." },
      // KÄLLA: https://batlivsutbildning.se/produkt/kustskepparintyg/ — "Förhandskrav:"; "Ha fyllt 15 år"; "Båtpraktikintyg, dag eller mörker. (Kan tas före eller efter Kustskepparprovet)"
      { q: "Vad krävs för kustskepparexamen?", a: "NFB:s kustskepparintyg kräver att du redan har förarintyg och har fyllt 15 år. För att intyget ska bli giltigt behöver du också ett båtpraktikintyg för dag eller mörker, som kan tas före eller efter provet." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/Fritidsbatar/Kunskap-och-kompetens/Utbildning-for-fritidsbat/ — "Nämnden för båtlivsutbildning (NFB) bär det administrativa ansvaret för krav på, kunskapskontroll för samt registrering av vissa intyg för fritidsbåtförare."; "Intygen kan föras in i NFB:s blåa intygsbok."
      { q: "Finns det ett båtkort i Sverige?", a: "Det finns inget statligt båtkort för fritidsbåtar. Intygen, till exempel förarintyg och kustskepparintyg, administreras och registreras av Nämnden för båtlivsutbildning (NFB) och kan föras in i NFB:s blåa intygsbok." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/Fritidsbatar/Kunskap-och-kompetens/Utbildning-for-fritidsbat/ — "Utbildningar som leder till intygen anordnas av olika studieförbund. För mer information vänd dig till Nämnden för båtlivsutbildning (NFB)."; "Ger de grundläggande kunskaperna i navigation och reglerna för hur man uppträder på sjön."
      { q: "Hur tar man förarintyg för båt?", a: "Utbildningarna anordnas av olika studieförbund, och Nämnden för båtlivsutbildning (NFB) ger mer information om intygen. Förarintyget ger grundläggande kunskaper i navigation och i reglerna för hur man uppträder på sjön." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/vattenskoter/ — "För att framföra vattenskoter krävs förarbevis för vattenskoter. För att kunna utbilda sig och få köra vattenskoter krävs det även att man har fyllt 15 år. Även en giltig legitimation ska medtas vid framförande av vattenskoter."; "Du ansöker i vår e-tjänst Vattenskoterwebben."
      { q: "Behöver man körkort för vattenskoter?", a: "Ja. Du behöver ett förarbevis för vattenskoter och måste ha fyllt 15 år. Förarbeviset söker du i Transportstyrelsens e-tjänst Vattenskoterwebben efter en godkänd utbildning, och ombord ska du ha med dig både förarbeviset och en giltig legitimation." },
    ],
  },
  {
    slug: "ingmarso-guide",
    title: "Ingmarsö – krog, boende och båten till norra och södra Ingmarsö",
    excerpt: "Ingmarsö ligger mitt i Stockholms skärgård. Så tar du dig till norra och södra Ingmarsö, och här finns krogen, bageriet, B&B, gästhamnen och Brottö.",
    category: "Region", emoji: "🌿", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/ingmarso — "Ingmarsö ligger i mellersta skärgården och är en levande ö med mycket att göra året om."; https://www.osteraker.se/kommunpolitik/kommunfakta.4.592cfecd176fc0db8783272.html — "Öar: Här finns 1 100 öar, däribland Ljusterö, Finnhamn, Husarö och Ingmarsö."
      { q: "Var ligger Ingmarsö?", a: "Ingmarsö ligger i mellersta delen av Stockholms skärgård och hör till Österåkers kommun. Ön har båtförbindelse med Åsättra på Ljusterö och med Stockholm via Vaxholm." },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA"; https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA"; https://www.ingmarso.se/hittahit — "De flesta turer ansluter till buss 626 från Danderyds Sjukhus"
      { q: "Hur tar man sig till norra Ingmarsö?", a: "Med Waxholmsbolagets linje 10 från Åsättra på Ljusterö, där du kan parkera bilen, eller med linje 12 från Stockholm via Vaxholm. De flesta turer från Åsättra ansluter till buss 626 från Danderyds sjukhus." },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ"; https://www.ingmarso.se/%C3%A4ta-och-sova — "Central belägen på Södra Ingmarsö med gångavstånd till krog, affär och bageri."
      { q: "Vad är skillnaden mellan norra och södra Ingmarsö?", a: "Det är öns två bryggor. Till norra Ingmarsö går båtarna från Åsättra och linje 12 från Stockholm. Till södra Ingmarsö går linje 13 via Boda, och där ligger gästhamnen, krogen och affären." },
      // KÄLLA: https://www.ingmarsokrog.com/ — "Ingmarsö Krog ligger precis invid havet, ett stenkast från södra ångbåtsbryggan."; https://www.ingmarsobageri.com/ — "På uteserveringen i vår trädgård kan ni slå er ner för att äta frukost, lunch middag, pizza eller fika."
      { q: "Finns det krog på Ingmarsö?", a: "Ja. Ingmarsö Krog ligger vid vattnet intill södra ångbåtsbryggan och har säsongsöppet. Ingmarsö bageri serverar också frukost, lunch, middag och pizza. Kolla öppettiderna på deras egna sidor." },
      // KÄLLA: https://www.ingmarsokrog.com/ — "Knappt 1 km från Ingmarsö Krog ligger Ingmarsö B&B."; https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/ingmarso — "Vill du stanna över natten finns det stugor att hyra och ett bed & breakfast på den norra sidan av ön."; https://www.ingmarso.se/%C3%A4ta-och-sova — "Central belägen på Södra Ingmarsö med gångavstånd till krog, affär och bageri."
      { q: "Vilket boende finns på Ingmarsö?", a: "Ingmarsö B&B på Norrgården, knappt 1 km från krogen, och stugor att hyra. Kommer du med egen båt finns gästhamnen på södra Ingmarsö." },
    ],
  },
  {
    slug: "arholma-guide",
    title: "Arholma – norra ytterskärgårdens utpost",
    excerpt: "Startpunkten för Stockholm Archipelago Trail. Arholma är en av skärgårdens vackraste öar – och en av de svårast att nå.",
    category: "Region", emoji: "🗺", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Arholma?', a: 'Med Waxholmsbolaget från Strömkajen – resan tar ca 3–3,5 timmar. Det är en av de längsta båtresorna i Stockholms skärgård. Alternativt kan du köra bil till Björkö eller Furusund och ta kortare färja därifrån.' },
      { q: 'Vad är Arholma känt för?', a: 'Arholma är startpunkt för Stockholm Archipelago Trail (270 km) och en av norra ytterskärgårdens vildaste och vackraste öar. Fyren, de dramatiska klipporna mot öppet hav och den genuina stämningen är höjdpunkterna.' },
      { q: 'Kan man övernatta på Arholma?', a: 'Ja, det finns vandrarhem (STF) och tältplatser. Arholma är inte en lyxdestination – det är en vandrar- och naturö. Boka vandrarhem i god tid under sommaren.' },
    ],
  },
  {
    slug: "hoga-kusten-guide",
    title: "Höga Kusten – guide till UNESCO-världsarvet",
    excerpt: "Världens högsta kust, Skuleskogen och djupa fjärdar. Komplett guide till sommarsemester längs Höga Kusten.",
    category: "Region",
    emoji: "🏔",
    readTime: "9 min",
    fullContent: true,
    faqs: [
      { q: 'Varför är Höga Kusten ett UNESCO-världsarv?', a: 'Höga Kusten har världens högsta landhöjning efter istiden – upp till 286 meter. Den dramatiska topografin med höga klippor, djupa fjärdar och isostatisk landhöjning är unik i världen.' },
      { q: 'Hur tar man sig till Höga Kusten?', a: 'Med tåg (SJ) till Kramfors eller Härnösand, sedan buss längs kusten. Med bil via E4 och sedan länsvägar. Från Stockholm är det ca 4–5 timmar med bil.' },
      // KÄLLA: sverigesnationalparker.se, Skuleskogens nationalpark (läst 2026-08-15): Slåttdalsskrevan 200 m lång, 30 m djup, 7 m bred
      { q: 'Vad ska man göra på Höga Kusten?', a: 'Vandra i Skuleskogen (Nationalpark), besök Slåttdalskrevan (30 m djup klippspricka), kör Höga Kustenleden, bada i fjärdarna och se solnedgången från Skuleberget (295 m).' },
      { q: 'Är Höga Kusten bra för familjer?', a: 'Ja, om barnen gillar natur och vandring. Skuleskogen har lättare stigar och Ångermanälvens mynning erbjuder fantastiska badplatser. Området är mindre turistifierat än kusterna längre söderut.' },
    ],
  },
  {
    slug: "fjallbacka-guide",
    title: "Fjällbacka – centrum, Kungsklyftan och skärgården i Tanum",
    excerpt: "Fjällbacka är ett litet fiskeläge i Tanums kommun, inte en stad. Här är Fjällbacka centrum, Kungsklyftan, Väderöarna och hur du tar dig dit med bil eller buss.",
    category: "Region", emoji: "🪨", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/fjallbacka2/ — "Fjällbacka är ett litet fiskeläge i Tanums kommun, i norra Bohuslän."; https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html — "Ungefär 950 personer bor i Fjällbacka året runt."
      { q: "Är Fjällbacka en stad?", a: "Nej. Fjällbacka är ett litet fiskeläge och ett av de äldre kustsamhällena i Tanums kommun. Ungefär 950 personer bor där året runt, och på somrarna mångdubblas befolkningen." },
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "Från E6, Vid Grindmotet tag av väg 163 mot Fjällbacka."; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014487500000/ — "Tanumshede - Fjällbacka - Dingle - Håby"
      { q: "Var ligger Fjällbacka?", a: "I Tanums kommun i norra Bohuslän. Med bil tar du av från E6 vid Grindmotet och kör väg 163 mot Fjällbacka. Västtrafiks buss 875 går Tanumshede – Fjällbacka – Dingle – Håby." },
      // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html — "Butiker, restauranger och kaféer ligger tätt utmed de tre gatustråken, som utgår från Ingrid Bergmans torg."; https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "Berget ligger i centrum av samhället och nås genom trappor från Ingrid Bergmans Torg."
      { q: "Vad finns i Fjällbacka centrum?", a: "Centrum ligger vid foten av Vetteberget kring Ingrid Bergmans torg. Butiker, restauranger och kaféer ligger längs de tre gatustråk som utgår från torget, och därifrån går trappor upp på Vetteberget." },
      // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html — "är en 200 meter lång spricka i granitberget. Klovan når man från hamnområdet."; https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "har fått sitt nuvarande namn efter ett besök av Oscar II år 1887"; https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "Här spelade man in filmscener från Ronja Rövardotter."
      { q: "Vad är Kungsklyftan i Fjällbacka?", a: "En 200 meter lång spricka i granitberget mellan Stora och Lilla Vetteberget, med fastkilade klippblock. Du når den från hamnområdet. Den fick sitt namn efter Oscar II:s besök 1887, och här spelades scener in till Ronja Rövardotter." },
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/fjallbacka2/ — "som är född i Fjällbacka och har orten som skådeplats i flera av sina kriminalromaner"
      { q: "Var bor Camilla Läckberg i Fjällbacka?", a: "Det som är offentligt belagt är att Camilla Läckberg är född i Fjällbacka och att flera av hennes kriminalromaner utspelar sig där. Var hon bor i dag framgår inte av kommunens eller turistorganisationens sidor, och privata adresser tar vi inte upp." },
      // KÄLLA: https://www.tanum.se/download/18.1f59ec0b16b105f1fbea570c/1562757718543/Fjallbacka_Informationsblad_SE_Skrivare.pdf — "Från 1958 bodde hon många somrar på Dannholmen i den yttersta skärgården, strax väster om Fjällbacka."; https://www.tanum.se/download/18.1f59ec0b16b105f1fbea570c/1562757718543/Fjallbacka_Informationsblad_SE_Skrivare.pdf — "Efter hennes död 1982 spreds askan i havet kring ön"
      { q: "Vad har Fjällbacka med Ingrid Bergman att göra?", a: "Ingrid Bergman bodde många somrar från 1958 på Dannholmen strax väster om Fjällbacka. Efter hennes död 1982 spreds askan i havet kring ön. En staty restes på torget, som döptes om till Ingrid Bergmans torg." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html — "Det går turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund."; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html — "Under tiden 1 mars – 31 augusti gå iland på öar och skar"
      { q: "Hur kommer man till Väderöarna från Fjällbacka?", a: "Det går turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund. Tänk på att många öar ingår i fågel- och sälskyddsområden där du inte får gå i land 1 mars–31 augusti." },
    ],
  },
  {
    slug: "lysekil-guide",
    title: "Lysekil – vad göra, färjan till Fiskebäckskil och gästhamnar",
    excerpt: "Vad kan man göra i Lysekil? Havets Hus, Stångehuvud, bad och Gamlestan – plus färjan till Fiskebäckskil, bilfärjan Gullmarsleden och bryggor för båt.",
    category: "Region", emoji: "🐟", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.havetshus.se/besok-oss/hitta-hit/ — "Från E6 söder, efter Uddevallabron, ta av vid trafikmotet Torp och välj väg 161."; https://www.havetshus.se/besok-oss/hitta-hit/ — "trafikeras av bla linje 841 från Göteborg/Uddevalla"; https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ — "överfartstiden är tio minuter. Resan med vägfärjan är avgiftsfri."
      { q: "Hur tar man sig till Lysekil?", a: "Med bil från E6 norrifrån via väg 162. Söderifrån tar du väg 161 från trafikmotet Torp och sedan den avgiftsfria vägfärjan Gullmarsleden, som tar tio minuter. Med kollektivtrafik går Västtrafiks linje 841 från Göteborg och Uddevalla." },
      // KÄLLA: https://www.vastsverige.com/lysekil/aktiviteter3/skargardsliv/ — "Här simmar hajar, sjöhästar, rockor och många andra arter som lever längs Bohuskusten."; https://www.havetshus.se/besok-oss/vanliga-fragor/ — "följ med på sälsafari (juni-augusti)"
      { q: "Vad finns på Havets Hus i Lysekil?", a: "Havets Hus är ett akvarium med arter från Västerhavet, bland annat hajar, sjöhästar och rockor. Där finns också restaurang, butik och äventyrsgolf, och i juni–augusti sälsafari. Räkna med minst en timme." },
      // KÄLLA: https://www.lysekil.se/bygga-bo-och-miljo/flytta-hit/res-och-pendla — "den elektrifierade passagerarfärjan Elise som varje dag, året runt, trafikerar sträckan Fiskebäckskil och Lysekils stad"; https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/ — "847 Lysekil - Skaftö"
      { q: "Går det en färja mellan Lysekil och Fiskebäckskil?", a: "Ja. Passagerarfärjan Elise går varje dag året runt mellan Lysekil och Fiskebäckskil på Skaftö. Den kör som Västtrafiks linje 847. Bilfärjan över Gullmarsfjorden, Gullmarsleden, går i stället mellan Finnsbo och Skår." },
      // KÄLLA: https://www.havetshus.se/besok-oss/hitta-hit/ — "Havets Hus ligger i centrala Lysekil, precis på kajkanten"; https://www.vastsverige.com/lysekil/produkter/stangehuvud-naturreservat/ — "Från Södra hamnen i Lysekil till Stångehuvud är det 1,5 kilometer."; https://www.vastsverige.com/lysekil/aktiviteter3/badplatser-i-lysekil/ — "Strax utanför Lysekils centrum ligger Gullmarsbaden med en större sandstrand."; https://www.vastsverige.com/lysekil/produkter/gamlestan/ — "Lysekils äldsta stadsdel"; https://www.vastsverige.com/lysekil/produkter/vasterhavspromenaden/ — "Tag med badkläder och passa på att ta ett dopp vid en av alla stegar som finns längs med promenaden."; https://www.lysekil.se/bygga-bo-och-miljo/flytta-hit/res-och-pendla — "trafikerar sträckan Fiskebäckskil och Lysekils stad"
      { q: "Vad kan man göra i Lysekil?", a: "Besöka akvariet Havets Hus på kajen, gå i naturreservatet Stångehuvud, bada vid Pinnevik, Gullmarsbaden eller längs Västerhavspromenaden och se Gamlestan, stadens äldsta del. Med passagerarfärjan Elise kan du åka över till Fiskebäckskil." },
      // KÄLLA: https://www.lysekil.se/bygga-bo-och-miljo/flytta-hit/res-och-pendla — "passagerarfärjan Elise som varje dag, året runt, trafikerar sträckan Fiskebäckskil och Lysekils stad"; https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ — "Gullmarsleden går mellan Finnsbo, Lysekil och Skår, Uddevalla i Gullmarsfjorden. Färjeledens längd är 1850 meter och överfartstiden är tio minuter. Resan med vägfärjan är avgiftsfri."
      { q: "Finns det bilfärja mellan Lysekil och Fiskebäckskil?", a: "Nej. Mellan Lysekil och Fiskebäckskil går passagerarfärjan Elise (Västtrafik linje 847). Med bil korsar du Gullmarsfjorden med Trafikverkets avgiftsfria vägfärja Gullmarsleden mellan Finnsbo och Skår. Överfarten tar tio minuter." },
      // KÄLLA: https://www.lysekil.se/kultur-och-fritid/gasthamnar-och-husbilsparkeringar — "Om du vill komma rätt in i staden med krogar och rikt musikliv välj Havsbadet, Norra hamnen eller Fiskhamnen."; https://www.svenskagasthamnar.se/norra-vastkusten/lysekil-norra-hamnen/ — "Längst ut vid den nya pontonbryggan finns det gästplatser"
      { q: "Var kan man lägga till med båt i Lysekil?", a: "Lysekils kommun har fem gästhamnar. Havsbadet, Norra hamnen och Fiskhamnen ligger inne i staden. I Norra hamnen finns gästplatserna längst ut på pontonbryggan, på gångavstånd till centrum och Havets Hus." },
    ],
  },
  {
    slug: "bornholm-guide",
    title: "Bornholm från Sverige – färja från Ystad, Hammershus och rökerier",
    excerpt: "Bornholm är en dansk ö 37 km från Sverige, med färja från Ystad på 1 timme och 20 minuter. Om ön var svensk, om man kan se den från Sverige och vad man gör där.",
    category: "Region", emoji: "🇩🇰", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://bornholm.info/en/ferry/ — "Just 1 hour and 20 minutes later you will be exploring Bornholm."; https://bornholm.info/en/ferry/ — "The crossing on the conventional ferries (ropax ferries) takes 2½ hours."
      { q: "Hur tar man sig till Bornholm från Sverige?", a: "Med Bornholmslinjens färja från Ystad till Rønne. Snabbfärjan tar 1 timme och 20 minuter och den konventionella färjan 2½ timme. Till Ystad går Skånetrafikens pågatåg från Malmö C, Hyllie och Triangeln. Ta med giltig fotolegitimation, eftersom det är tillfälliga ID-kontroller vid gränserna." },
      // KÄLLA: https://bornholm.info/en/the-printzenskold-stones/ — "In 1658, after a revenge war at Roskildefreden, Denmark had to cede Bornholm to Sweden, which later the same year triggered a rebellion on the island."; https://bornholm.info/en/the-printzenskold-stones/ — "Bornholm rebels won Bornholm back from the Swedish troops"
      { q: "Tillhör Bornholm Sverige?", a: "Nej, Bornholm är danskt. Vid freden i Roskilde 1658 fick Danmark avstå ön till Sverige, men samma år gjorde bornholmarna uppror och tog tillbaka ön från de svenska trupperna. Minnesstenar i Storegade i Rønne visar var den svenske befälhavaren Johan Printzensköld sköts." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/stenshuvuds-nationalpark — "vid klart väder kan du se den danska ön Bornholm, som en blå skugga vid horisonten i sydöst"; https://bornholm.info/en/rytterknaegten/ — "in clear weather you can even see the small island Christiansø and Sweden"
      { q: "Kan man se Bornholm från Sverige?", a: "Ja, i klart väder. Från norra toppen av Stenshuvud på Österlen, 97 meter över havet, syns Bornholm som en blå skugga vid horisonten i sydost. Från Rytterknægten på Bornholm kan man på samma sätt se Sverige." },
      // KÄLLA: https://bornholm.info/fakta-om-bornholm/ — "Korteste afstand til Sverige er 37 km."; https://bornholm.info/en/travel-to-bornholm/ — "You can also travel by ferry from Ystad in Sweden in just 1 hour and 20 minutes"
      { q: "Vilken dansk ö ligger utanför Ystad?", a: "Bornholm. Kortaste avståndet mellan ön och Sverige är 37 km, och färjan från Ystad till Rønne tar 1 timme och 20 minuter med snabbfärja." },
      // KÄLLA: https://bornholm.info/en/hammershus/ — "The largest castle ruin in Northern Europe"; https://bornholm.info/en/round-churches-on-bornholm/ — "Four of Denmark’s seven medieval round churches are located on Bornholm."; https://bornholm.info/en/bornholm-smokehouses/ — "Today there are 10 smokehouses on Bornholm, that still are working."
      { q: "Vad är Bornholm känt för?", a: "Bland annat Hammershus, Nordeuropas största borgruin, fyra av Danmarks sju medeltida rundkyrkor och rökerierna. Det första rökeriet öppnade i Gudhjem 1866, och i dag är tio i drift. Den bornholmska rätten Sol over Gudhjem är rökt sill med rå äggula, rädisor, vårlök och rågbröd." },
      // KÄLLA: https://bornholm.info/fakta-om-bornholm/ — "Cykelveje: I alt 235 km"; https://bornholm.info/en/bornholms-cycling-guide-biking-holidays-on-bornholm/ — "Bicycle route: National route 10 – Bornholm Rundt"
      { q: "Hur långa är cykelvägarna på Bornholm?", a: "Enligt Destination Bornholm finns totalt 235 km cykelvägar. Nationell cykelrutt 10, Bornholm Rundt, går runt hela ön i fyra etapper." },
    ],
  },
  {
    slug: "dalaro-guide",
    title: "Dalarö – porten till södra Stockholms skärgård",
    excerpt: "Historisk fortstäning, levande hamnmiljö och startpunkt för Ornö- och Utö-turer. Guide till Dalarö.",
    category: "Region", emoji: "⚓", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: SL:s tryckta tidtabeller v839.pdf ("839 Handens station-Dalarö (-Smådalarö)", 36-39 min) och v869.pdf ("869 Globen-Dalarö", ca 51 min till Dalarö torg) samt v834.pdf ("834 Handens station-Svartbäcken (-Tyresta by)" - passerar varken Slussen, Stavsnäs eller Dalarö). Läst 2026-08-25. En tidigare version av den här raden sa att 869 utgår från Gullmarsplan; ändhållplatsen är Slakthuset (Globen).
      { q: 'Hur tar man sig till Dalarö?', a: 'Med SL-buss 839 från Handens station (36–39 min), eller buss 869 från Slakthuset vid Globen (ca 51 min) — båda vanliga SL-linjer som ingår i SL-taxan. Räkna med drygt en timme från centrala Stockholm inklusive anslutningen. Eller med Waxholmsbolagets båt från Strömkajen. Med bil via Nynäsvägen och Dalarövägen, ca 45 km söder om Stockholm.' },
      { q: 'Vad är Dalarö känt för?', a: 'Dalarö har en av södra skärgårdens bästa hamnmiljöer med gamla trävillor och ett genuint fiskeläge. Dalaröskansen (1600-talets fästningsverk) och det kulturhistoriska centrumet gör Dalarö till ett av södra skärgårdens mest välbevarade samhällen.' },
      { q: 'Kan man ta båt till Utö och Ornö från Dalarö?', a: 'Ja, Dalarö är en av startpunkterna för båttrafik söderut i skärgården. Waxholmsbolaget kör till Ornö och Utö via Dalarö. Bra alternativ till Nynäshamn om du bor i Nacka eller Haninge.' },
    ],
  },
  {
    slug: "barplockning-skargarden",
    title: "Lingon och blåbär – säsong och var du plockar i Stockholm",
    excerpt: "När kan man plocka lingon och blåbär, och var hittar man dem i Stockholm? Säsong enligt myndigheterna, Länsstyrelsens bärmarker och allemansrättens regler.",
    category: "Aktivitet", emoji: "🫐", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/uppsala/besoksmal/naturreservat/valkror.html — "om sensommaren kan du plocka både blåbär, lingon och med lite tur hjortron" samt https://esf-klimatdata.slu.se/Berry_forecast.aspx — "Prognos för tidpunkt för blomning och bärmognad"
      { q: "När kan man plocka lingon?", a: "På sensommaren. Vi har inte hittat någon myndighet som anger ett exakt datum för Stockholms län, men Länsstyrelsen i grannlänet Uppsala skriver om ett reservat där att du om sensommaren kan plocka både blåbär, lingon och med lite tur hjortron. Exakt när varierar mellan år och platser – SLU publicerar en prognos för bärmognad." },
      // KÄLLA: https://www.lansstyrelsen.se/orebro/besoksmal/utflyktsguide/hostens-naturreservat.html — "brukar det också finnas gott om blåbär under sensommaren" samt https://www.nrm.se/fakta-om-naturen/vaxter/landvaxter/varvaxter/blabar — "i södra Sverige börjar den blomma i andra halvan av april" samt https://esf-klimatdata.slu.se/Berry_forecast.aspx — "Prognos för tidpunkt för blomning och bärmognad"
      { q: "När är blåbärssäsongen i Stockholm?", a: "Det finns ingen officiell uppgift för just Stockholm. Länsstyrelserna i Uppsala och Örebro län beskriver blåbärsplockning på sensommaren, och Naturhistoriska riksmuseet skriver att blåbär i södra Sverige börjar blomma i andra halvan av april. Se SLU:s prognos för bärmognad för ett ungefärligt datum." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/koffertberget.html — "Här finns också goda förutsättningar för lingon och blåbärsplockning." samt https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norrangsskogen.html — "blocken är väl övervuxna med lingon, blåbär och mossa" samt https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/palamalm.html — "I högre områden som är torrare hittar vi lingon, ljung, mjölon och renlav."
      { q: "Var kan man plocka lingon i Stockholm?", a: "Länsstyrelsen Stockholm beskriver bärmarker i bland annat Koffertberget norr om Rimbo (\"goda förutsättningar för lingon och blåbärsplockning\"), Norrängsskogen på Singö, Käringboda i Nynäshamn, Kappsta på Lidingö och Nackareservatet. Lingon växer ofta i torrare, högre partier och blåbär där marken är fuktigare." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/karingboda.html — "Ta med korgen och plocka fina blåbär" samt https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kappsta.html — "Plocka glittrande blåbär" samt https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nackareservatet-i-nacka.html — "Skogarna är rika på bär och svamp." samt https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "liksom ljung, lingon- och blåbärsris"
      { q: "Var finns bra blåbärsställen nära Stockholm?", a: "Länsstyrelsen lyfter fram blåbär i Käringboda i Nynäshamn (\"Ta med korgen och plocka fina blåbär\"), Kappsta på Lidingö och Nackareservatet, där skogarna enligt Länsstyrelsen är rika på bär och svamp. I skärgården beskriver Länsstyrelsen lingon- och blåbärsris på hällmarkerna i Nämdöskärgårdens nationalpark." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/plocka-blommor-bar-och-svamp/ — "Markägaren får inte hindra dig från att plocka bär och svamp på marker där allemansrätten gäller." samt https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hemfridzon/ — "Allemansrätten gäller därför inte inom hemfridszonen." samt https://www.naturvardsverket.se/4ac148/globalassets/media/publikationer-pdf/ovriga-pub/allemansratten/978-91-620-8685-5.pdf (Naturvårdsverkets folder Allemansrätten – Bärplockning) — "Självklart är det förbjudet att ta bär, frukt, grönsaker och liknande i trädgårdar eller odlingar."
      { q: "Får man plocka bär på privat mark i skärgården?", a: "Ja, där allemansrätten gäller. Bären tillhör markägaren, men markägaren får inte hindra dig från att plocka. Bär i trädgårdar och odlingar får du inte ta, och allemansrätten gäller inte inom hemfridszonen närmast ett hus." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/skyddade-omraden/ — "Bärplockning är ofta tillåten, även om du ibland bara får plocka så mycket som du kan äta på plats."
      { q: "Får man plocka bär i naturreservat?", a: "Ofta, men reglerna skiljer sig mellan områden. Naturvårdsverket skriver att du ibland bara får plocka så mycket som du kan äta på plats. Läs föreskrifterna hos Länsstyrelsen eller på skylten vid entrén innan du plockar." },
      // KÄLLA: https://www.livsmedelsverket.se/livsmedel-och-innehall/bakterier-virus-parasiter-och-mogelsvampar1/parasiter/ravens-dvargbandmask/ — "Risken för att smittas av rävens dvärgbandmask genom att plocka och äta vildväxande bär i skogen bedöms vara mycket låg."; "Skölj alltid grönsaker och skölj bort synlig jord från frukt och bär."
      { q: "Behöver man skölja vilda bär?", a: "Livsmedelsverket bedömer att risken att smittas av rävens dvärgbandmask via vilda bär är mycket låg, men råder dig att skölja bort synlig jord från bär och tvätta händerna före måltid." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "solnedgang-skargarden",
    title: "Bästa solnedgång i Stockholm – platser i stan och skärgården",
    excerpt: "Var kan man se solnedgången i Stockholm? Skinnarviksberget, Monteliusvägen och skärgårdskrogar med kvällssol, plus åt vilket håll solen går ner och vägen hem.",
    category: "Aktivitet", emoji: "🌅", readTime: "4 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.visitstockholm.com/see-do/activities/sunny-walks-with-stunning-views/ — "the Skinnarviksberget is the place to be for a Stockholm-sunset"; https://www.visitstockholm.com/see-do/attractions/guide-to-the-best-views/ — "Monteliusvägen (and Ivar Los park) – Both popular places for weekend walks and sunset picnics"; https://www.visitstockholm.com/o/solstugan/ — "enjoy a summer sunset with a beautiful view of Lake Mälaren"
      { q: "Var kan man se solnedgången i Stockholm?", a: "Visit Stockholm pekar ut Skinnarviksberget på Södermalm som platsen för en solnedgång i Stockholm, oavsett årstid. Monteliusvägen och Ivar Los park nämns som platser för picknick i solnedgången, och restaurangen Solstugan för solnedgång över Mälaren på sommaren." },
      // KÄLLA: https://grinda.se/mat-fest/wardshuset/ — "Med sol från morgon till kväll och en glittrande utsikt över Saxarfjärden är terassen en destination i sig."; https://www.waxholmshotell.se/matochdryck — "Perfekt för en drink i solnedgången"; https://nattaro.se/mat_pa_on/nattaro-krog/ — "eller festa till det med en trerätters middag framför solnedgången på krogens veranda"; https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang — "Generella beräkningar av solens upp- och nedgång förutsätter en fri horisont"
      { q: "Var ser man solnedgången i Stockholms skärgård?", a: "Tre krogar nämner själva solnedgången eller kvällssolen: Grinda Wärdshus, vars terrass har sol från morgon till kväll, Nyckelbaren på Waxholms Hotell i Vaxholm, och Nåttarö Krog, som har en veranda för middag framför solnedgången. Ute på öarna behöver du fri sikt mot det håll där solen går ner." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang/vad-ar-ett-solbanediagram — "för att tillslut gå ner i omkring nordväst (≈ 315°)"; https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang/vad-ar-ett-solbanediagram — "För orter som ligger på samma breddgrad har solen nämligen samma bana över himlen."
      { q: "Åt vilket håll går solen ner i skärgården på sommaren?", a: "Kring midsommar går solen ner i ungefär nordväst, inte rakt i väster. SMHI:s exempel gäller Norrköping, men solen följer samma bana på alla orter på ungefär samma breddgrad." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang/vad-ar-ett-solbanediagram — "Exempelvis ligger Sandhamn, Stockholms skärgård, cirka en grad öster om Stockholm. Där går solen alltså upp cirka fyra minuter tidigare än i Stockholm."; https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang — "man inte skall förvänta sig att solen exakt (inom en minut) kommer att gå upp eller ned efter de tider vi människor har räknat fram"
      { q: "När går solen ner i Stockholms skärgård?", a: "Det beror på datum och plats. Solen når samma läge fyra minuter tidigare för varje längdgrad österut. På Sandhamn, ungefär en grad öster om Stockholm, går solen till exempel upp cirka fyra minuter tidigare än i Stockholm. Räkna inte med att solen följer de beräknade tiderna på minuten." },
      // KÄLLA: https://www.sjoraddning.se/artiklar/regler-lanternor-pa-fritidsbat-det-har-galler — "Oavsett storlek på båten så ska lanternorna vara på från solnedgång till soluppgång."; https://www.sjoraddning.se/artiklar/regler-lanternor-pa-fritidsbat-det-har-galler — "Är din båt mindre än 7 meter och har en maxfart på 7 knop ska du ha ett vitt runtlysande ljus."
      { q: "Måste båten ha lanternor när man åker hem efter solnedgången?", a: "Ja. Oavsett båtens storlek ska lanternorna vara tända från solnedgång till soluppgång. En båt under sju meter som går högst sju knop behöver minst ett vitt runtlysande ljus." },
    ],
  },
  {
    slug: "ankra-sova-bat",
    title: "Ankra båt – så ankrar du och sover ombord i skärgården",
    excerpt: "Ankra båt i skärgården: var du får ankra, hur länge, hur du ankrar steg för steg så att ankaret håller, ankarljus, toalett ombord och regler i naturreservat.",
    category: "Praktisk", emoji: "⚓", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Det finns inga regler om minsta avstånd, utan det är risken att störa markägare och boende som avgör hur nära ett hus du får vara."
      { q: "Var får man ankra med båt?", a: "Enligt allemansrätten får du ankra och tillfälligt förtöja vid en strand som inte hör till någons tomt och som inte är skyddad, till exempel för fågellivet. Det finns inget fast minsta avstånd till hus; det är risken att störa de boende som avgör." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Man brukar använda sig av samma princip som för tältning, och det är något enstaka dygn."; https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Du får ankra eller lägga till med fartyg på samma plats upp till två dygn i följd."
      { q: "Hur länge får man ligga för ankar på samma plats?", a: "Allemansrätten har ingen fast gräns, men man brukar följa samma princip som för tältning: något enstaka dygn. Vill du ligga längre vid någon annans strand ska du fråga markägaren. I till exempel Nämdöskärgårdens nationalpark är gränsen två dygn i följd." },
      // KÄLLA: https://sxk.se/vastkustkretsen/var-verksamhet/naturhamnar-bojar-hak/ankra-pa-svaj — "Därefter firar man sakta ut lina/kätting motsvarande 4–10 gånger djupet."; https://sxk.se/vastkustkretsen/var-verksamhet/naturhamnar-bojar-hak/ankra-pa-svaj — "Idealiskt är jämn och slät botten på djup kring 4–8 meter."; https://sxk.se/vastkustkretsen/var-verksamhet/naturhamnar-bojar-hak/ankra-pa-svaj — "Bra ankarbottnar är sand eller fast lera."
      { q: "Hur ankrar man en båt?", a: "Gå sakta upp mot vinden och stanna över platsen, låt ankaret glida ner, fira ut lina eller kätting motsvarande 4–10 gånger djupet och ge ankaret tid att sjunka ner. Backa sedan sakta och kontrollera mot fasta punkter i land att båten ligger kvar. SXK anger jämn botten på kring 4–8 meters djup med sand eller fast lera som idealiskt." },
      // KÄLLA: https://sxk.se/vastkustkretsen/var-verksamhet/naturhamnar-bojar-hak/ankra-pa-svaj — "Enligt de internationella sjövägsreglerna skall ankrade båtar och fartyg markera med en ankar-boll (dagersignal) eller runtlysande vitt ljus (mörkersignal) att de ligger för ankar."; https://sxk.se/vastkustkretsen/var-verksamhet/naturhamnar-bojar-hak/ankra-pa-svaj — "så är ankarljuset bra för säkerheten"
      { q: "Måste man ha ankarljus när man ankrar båten?", a: "Enligt de internationella sjövägsreglerna ska en ankrad båt visa ett runtlysande vitt ljus på natten. SXK skriver att det finns ett undantag på inre svenska vatten, men att ankarljuset är bra för säkerheten." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/batliv-miljo/avfall-fran-fritidsbat/toalettavfall/ — "Det är förbjudet att släppa ut toalettavfall i vattnet."; https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/batliv-miljo/avfall-fran-fritidsbat/toalettavfall/ — "Varje fritidsbåtshamn är skyldig att se till att båtägare kan lämna sitt avfall på land."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Använd en hink med tättslutande lock om båten saknar toalett med avloppstank."
      { q: "Vad gör man med toaletten när man sover på båten?", a: "Det är förbjudet att släppa ut toalettavfall från fritidsbåtar. Töm i en fritidsbåtshamn eller vid en tömningsstation. Saknar båten toalett med avloppstank kan du använda en hink med tättslutande lock." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "I nationalparker och naturreservat kan det till exempel finnas särskilda regler om att elda, tälta eller förtöja en båt."; https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "I vissa särskilt känsliga områden är det förbjudet att ankra"; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Vid fågel- eller sälskyddsområden får du inte stiga iland under en viss tid av året."
      { q: "Får man ankra i naturreservat och fågelskyddsområden?", a: "Det beror på föreskrifterna. I naturreservat och nationalparker kan det finnas särskilda regler för att förtöja, och i vissa känsliga områden är ankring förbjuden. Vid fågel- och sälskyddsområden får du inte gå i land under delar av året, och ibland inte vara på vattnet nära land." },
    ],
  },
  // ── Batch B: ö-guider + tematiska guider ───────────────────────────────────
  {
    slug: "moja-guide",
    title: "Möja – guide till skärgårdens egna stad",
    excerpt: "Möja har butik, krog, cyklar och natur. Så tar du dig dit, vad du gör och varför Möja är mitt i skärgårdslivet.",
    category: "Region", emoji: "🏝", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: Waxholmsbolagets tabell 14A Stockholm-Vaxholm-Sollenkroka-Möja och 12A/13A till Ingmarsö. Snabbaste direktbåt Strömkajen-Möja (Berg) i hösttabellen är 3 tim 05, de flesta 3 tim 55 - 4 tim 30, långsammaste 5 tim 50. Ingmarsö: snabbast 2 tim 37, i dag 3 tim 15 - 3 tim 25. Ingen tur i någon tabell ligger på 2 tim eller 1 tim 45. Snabbast till Möja är buss 434 Slussen-Sollenkroka och båt därifrån, ca 2 tim 10 totalt. Läst 2026-08-25.
      { q: 'Hur tar man sig till Möja?', a: 'Snabbast är buss 434 från Slussen till Sollenkroka brygga och båt därifrån – drygt två timmar totalt. Direktbåten från Strömkajen via Vaxholm tar betydligt längre: i höst- och vårtabellen är snabbaste turen 3 tim 05 och de flesta ligger på 3 tim 30 till 4 tim 30. Sommartid finns en direktbåt på 2 tim 35. Möja är en av skärgårdens folkrikaste öar med ca 500 bofasta och daglig båtförbindelse. Du kan också ta buss till Stavsnäs och korta resan.' },
      { q: 'Vad kan man göra på Möja?', a: 'Möja är en av de få öar i skärgården med riktig service: Systembolaget (öppet sommartid), matbutik, restaurang och cykelhyra. Cykla runt ön, bada i naturhamnarna och se solnedgången från Möjatorget.' },
      { q: 'Kan man övernatta på Möja?', a: 'Ja, det finns vandrarhem, stugor och gästhamn. Möja är en av de bästa öarna för övernattning i Stockholms skärgård – lagom avlägsen men med ordentlig service. Boka i god tid för juli.' },
      { q: 'Är Möja bilfri?', a: 'Möja är inte helt bilfri – bofasta har bilar, men turister tar sig dit med båt och cyklar på ön. Det finns cykelhyra vid bryggan. Öns vägar lämpar sig utmärkt för cykling.' },
    ],
  },
  {
    slug: "grinda-guide",
    title: "Grinda – Södra eller Norra Grinda, Grinda Wärdshus och strand",
    excerpt: "Grinda i mellanskärgården: båten från Strömkajen, om du ska gå av vid Södra eller Norra Grinda, Grinda Wärdshus, stränderna, campingen och stugbyn.",
    category: "Region",
    emoji: "🌿",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://grinda.se/hittahit/ — "Södra Grinda är mest trafikerad och det är lika långt (eller kort) att gå från båda, ca 10 -15 min, till Wärdshuset som ligger mitt på Grinda."; https://grinda.se/boende/camping/ — "Den enklaste vägen hit är att kliva av Waxholmsbåten vid Norra Grinda"; https://grinda.se/boende/stugby/ — "Lättast går du i land på Södra Grinda och då är stugbyn endast några hundra meter bort."
      { q: "Grinda södra eller norra – vilken brygga ska man välja?", a: "Södra Grinda har flest avgångar och ligger närmast stugbyn. Norra Grinda ligger närmast campingen. Till Grinda Wärdshus mitt på ön är det lika långt från båda, ungefär 10–15 minuters promenad." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme."; https://grinda.se/hittahit/ — "Från Stockholm tar resan drygt en timme, från norra Värmdö bara tio minuter."
      { q: "Hur lång är resan till Grinda?", a: "Med Waxholmsbolaget från Strömkajen via Vaxholm tar resan ungefär en och en halv timme (tabell 11). Grinda Wärdshus anger att resan från Stockholm tar drygt en timme." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Norra och södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella."
      { q: "Går det båt till Grinda på vintern?", a: "Ja. Grinda har trafik året om, och både norra och södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella. På sommaren går det flera turer varje dag." },
      // KÄLLA: https://grinda.se/hittahit/ — "till Wärdshuset som ligger mitt på Grinda"; https://grinda.se/mat-fest/wardshuset/ — "Det anrika huset har blickat ut över Saxarfjärden sedan 1906"
      { q: "Var ligger Grinda Wärdshus?", a: "Mitt på ön, med utsikt över Saxarfjärden. Det tar ungefär 10–15 minuter att gå dit från både Södra och Norra Grinda. Värdshuset har funnits sedan 1906." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan. Ytterligare ett fint bad finns vid Källviken."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Torrdass finns vid alla badplatser"
      { q: "Finns det strand på Grinda?", a: "Ja. Det finns barnvänliga bad vid både den södra och den norra ångbåtsbryggan och ett bad vid Källviken, som har anpassade ingångar. Torrdass finns vid alla badplatser." },
      // KÄLLA: https://grinda.se/boende/stugby/ — "Vi har 27 olika stugor i vår charmiga stugby."; https://grinda.se/boende/camping/ — "Ingen platsbokning behövs"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Tältning är endast tillåten på tältplatsen nära norra bryggan."
      { q: "Kan man övernatta på Grinda?", a: "Ja. Grinda Wärdshus har hotell, stugby med 27 stugor och Grinda Sea Lodge. Du kan också tälta på campingen vid Norra Grinda utan att boka plats. Tältning är bara tillåten där." },
    ],
  },
  {
    slug: "finnhamn-guide",
    title: "Finnhamn – guide till norra skärgårdens pärla",
    excerpt: "Vandrarhem, naturhamn och storslagna vyer mot ytterskärgården. Så planerar du ett Finnhamn-besök.",
    category: "Region", emoji: "⛺", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Finnhamn?', a: 'Med Waxholmsbolaget linje 11 från Strömkajen – resan tar ca 2 timmar. Finnhamn är en av de vackraste och mest välbesökta öarna i norra Stockholms skärgård.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Var bor man på Finnhamn?', a: 'STF Finnhamns vandrarhem erbjuder stugor och rum med havsvy. Det finns också gästhamn för seglare. Vandrarhemsboende kostar ca 400–900 kr/natt. Boka i god tid – Finnhamn är fullbokat i juli.' },
      { q: 'Vad kan man göra på Finnhamn?', a: 'Vandra längs stigen mot ytterskärgården, bada i de klara vikarna, paddla kajak och äta på värdshuset. Utsikten från höjdpunkterna mot öppet hav är en av skärgårdens vackraste.' },
      { q: 'Är Finnhamn bilfri?', a: 'Ja, Finnhamn är bilfri och nås enbart med båt. Det är en del av dess charm – ön är en reträttplats från vardagsbruset utan bilar och trängsel.' },
    ],
  },
  {
    slug: "nattaro-guide",
    title: "Nåttarö camping – tälta på Nåttarö och båten från Nynäshamn",
    excerpt: "Nåttarö camping har dygnscamping med dass och duschar. Här är reglerna för att tälta på Nåttarö, båten 30 minuter från Nynäshamn, stränderna och stugorna.",
    category: "Region", emoji: "🏕", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/nattaro — "Med Waxholmsbolagets fartyg Utö Express från Nynäshamns Fiskehamn. Restiden är 30 minuter."
      { q: "Hur åker man till Nåttarö från Nynäshamn?", a: "Med Waxholmsbolagets båt Utö Express från Nynäshamns fiskehamn. Restiden är 30 minuter. Kolla tidtabellen i Waxholmsbolagets reseplanerare, eftersom trafiken byter tidtabell flera gånger om året." },
      // KÄLLA: https://nattaro.se/boende/ — "max sju nätter. (betalas på expeditionen)"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "tälta mer än två dygn i följd annat än på anvisad plats"
      { q: "Får man tälta på Nåttarö?", a: "Ja, på dygnscampingen, där du får stanna högst sju nätter och betalar på expeditionen. Utanför anvisad plats förbjuder reservatets föreskrifter tältning mer än två dygn i följd." },
      // KÄLLA: https://nattaro.se/boende/ — "Enklare camping med dass i anslutning till tältplatsen."; https://nattaro.se/boende/ — "Duschar och diskrum på promenadavstånd."; https://nattaro.se/boende/ — "max sju nätter. (betalas på expeditionen)"
      { q: "Finns det camping på Nåttarö?", a: "Ja. Nåttarö Gård & Resort har en dygnscamping med dass vid tältplatsen och duschar och diskrum på promenadavstånd. Du får stanna högst sju nätter och betalar på expeditionen." },
      // KÄLLA: https://nattaro.se/boende/ — "Även dygnscampingen för er som vill tälta ligger centralt placerat på ön."; https://nattaro.se/expeditionen/ — "Vi ligger ca 300 m från ångbåtsbryggan i anslutning till stugbyn."
      { q: "Var ligger tältplatsen på Nåttarö?", a: "Dygnscampingen ligger centralt på ön. Expeditionen, där du betalar, ligger vid stugbyn några hundra meter från ångbåtsbryggan." },
      // KÄLLA: https://nattaro.se/mat_pa_on/nattaro-krog/ — "Krogen hittar du intill ångbåtsbryggan och gästhamnen."; https://nynashamn.se/uppleva/skargard--batliv/nattaro — "så är allt säsongsöppet under sommarperioden"
      { q: "Finns det restaurang på Nåttarö?", a: "Ja. Nåttarö Krog ligger intill ångbåtsbryggan och gästhamnen, och på ön finns även Sixtens bodega och Nåttarö Handelsbod. Allt är säsongsöppet, så kolla aktuella tider på nattaro.se." },
    ],
  },
  {
    slug: "orno-guide",
    title: "Ornö – det stora, stilla alternativet",
    excerpt: "Ornö är en av Stockholms skärgårds största öar men utan turistmassor. Vandrarleder, naturhamnar och tystnad.",
    category: "Region", emoji: "🌲", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Ornö?', a: 'Med Waxholmsbolaget från Dalarö eller Nynäshamn – resan tar ca 30–60 minuter. Ornö nås med bilfärja från Dalarö, vilket är ovanligt praktiskt för en skärgårdsö av denna storlek.' },
      { q: 'Är Ornö bilfri?', a: 'Nej – Ornö är en av de få skärgårdsöar med bilfärjeförbindelse. Du kan ta bilen över, vilket gör den unik och extra tillgänglig. Ön är 15 km lång med välmarkerade vandringsleder.' },
      { q: 'Vad kan man göra på Ornö?', a: 'Ornö erbjuder vidsträckt vandring i naturreservaten, bad i ostörda vikar och genuint skärgårdsliv. Det finns restaurang, vandrarhem och gästhamn. Ön saknar turistifiering vilket gör den till en pärla för den som vill ha lugn.' },
    ],
  },
  {
    slug: "hund-i-skargarden",
    title: "Hund på Waxholmsbåt – Waxholmsbolagets regler och Sandhamn",
    excerpt: "Hund på Waxholmsbåt reser gratis men ska vara kopplad, högst två djur. Waxholmsbolagets regler för hund, vad som gäller i Sandhamn och ö för ö.",
    category: "Praktisk", emoji: "🐕", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du får ta med hundar och mindre sällskapsdjur gratis. Ombord på båten finns det skyltar som visar var det finns platser för dig som reser med husdjur. Hundar ska hållas kopplade ombord"
      { q: "Får man ta med hund på Waxholmsbåten?", a: "Ja. Hundar reser gratis och ska vara kopplade ombord. Ombord finns skyltar som visar var platserna för dig som reser med husdjur finns." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/resevillkor — "Du får bara ta med djur i de delar av fartyget som inte har förbudsskylt. Du får ta med dig som mest två djur om de inte sitter i väska/bur."
      { q: "Hur många hundar får man ha med på Waxholmsbolaget?", a: "Högst två djur, om de inte sitter i väska eller bur. Djuren får bara vara i de delar av fartyget som inte har förbudsskylt." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/resevillkor — "Hundar och mindre sällskapsdjur får du ta med gratis."
      { q: "Kostar det något att ta med hund på Waxholmsbolaget?", a: "Nej. Enligt Waxholmsbolagets resevillkor får du ta med hundar och mindre sällskapsdjur gratis." },
      // KÄLLA: https://www.varmdo.se/byggabomiljo/boendemiljo/djur/reglergallandehundar.4.18c983316e0536cb18bb92f.html — "Hundar ska hållas kopplade i kommunen på offentliga platser och hundar får inte"; https://www.sandhamn.com/sv/hundhotellet — "och är även välkommen i restaurangen."
      { q: "Får man ha med hund i Sandhamn?", a: "Ja, men i Värmdö kommun, där Sandhamn ligger, ska hunden vara kopplad på offentliga platser och får inte vara på allmänna badplatser. Sandhamn Hotell & Restaurang tar emot hundar på rummet och i restaurangen." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Du kan åka till Sandhamn med båt från Stavsnäs och då tar resan drygt en timme."; https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."
      { q: "Hur tar man sig till Sandhamn med hund?", a: "Med Waxholmsbolagets båt från Stavsnäs, som går året runt och tar drygt en timme. På sommaren går det även båtar från Strömkajen. Hunden reser gratis och ska vara kopplad." },
    ],
  },
  {
    slug: "romantisk-weekend-skargarden",
    title: "Weekend i skärgården – romantisk weekend i Stockholms skärgård",
    excerpt: "Weekend i skärgården för två: värdshuspaket på Grinda och Utö, bastuflotte på Sandhamn, spa på Smådalarö och båtarna ut för en romantisk skärgårdsweekend.",
    category: "Praktisk", emoji: "❤️", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://grinda.se/boende/ — "precis intill hittar du Wärdshuset"; https://www.sandhamn.com/sv/om-oss — "Här bor du nära havet, med restaurang, spa, gym och pool inom några steg."; https://sandhamns-vardshus.se/boende — "På Missionshuset finns det 5 dubbelrum med gemensamma badrum."; https://www.utovardshus.se/ — "rum & hotellstugor"; https://www.smadalarogard.se/ — "Ett av Sveriges största spahotell i Stockholms skärgård"
      { q: "Var kan man bo på en romantisk weekend i Stockholms skärgård?", a: "Några boenden vi har kontrollerat hösten 2026: Grinda Wärdshus med hotellrum intill Wärdshuset, Sandhamn Seglarhotell med spa och bastuflottar, Missionshuset B&B hos Sandhamns Värdshus, Utö Värdshus med rum och hotellstugor och Smådalarö Gård Hotell & Spa. Ordningen är ingen rangordning." },
      // KÄLLA: https://www.grindawardshus.se/ — "Boendepaket med logi hotellrum, 3-rättersmiddag samt frukostbuffé."; https://www.utovardshus.se/erbjudanden_paket/fredagskvall-i-skargarden/ — "Logi i dubbelrum/hotellstuga en natt"; https://www.utovardshus.se/erbjudanden_paket/fredagskvall-i-skargarden/ — "Värdshusets frukostbuffé"
      { q: "Finns det weekendpaket i skärgården med middag och frukost?", a: "Ja. Grinda Wärdshus Wärdshuspaket innehåller hotellrum, trerättersmiddag och frukostbuffé. Utö Värdshus paket Fredagskväll i skärgården innehåller en natt i dubbelrum eller hotellstuga, drink, tvårättersmiddag och frukostbuffé. Priserna står i hotellens egna bokningar." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme."; https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Du kan åka till Sandhamn med båt … från Stavsnäs … och då tar resan drygt en timme."; https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Du kan inte boka plats ombord på våra fartyg"; https://grinda.se/hittahit/ — "På Cinderella kan du förboka och garantera din plats ombord."
      { q: "Hur tar man sig ut en weekend i skärgården utan egen båt?", a: "Med Waxholmsbolaget: till Grinda från Strömkajen på ungefär en och en halv timme, till Sandhamn från Stavsnäs på drygt en timme och till Utö från Årsta brygga. Plats på Waxholmsbolagets båtar går inte att boka, men på Cinderellabåtarna kan man förboka." },
      // KÄLLA: https://www.sandhamn.com/sv/spa — "Värmen från den vedeldade bastun, ett dopp i havet och en stund i den friska skärgårdsluften."; https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Grindastigen som tar dig förbi Klubbudden, öns högsta punkt"; https://waxholmsbolaget.se/reseplanering/resmal/uto — "cykel finns att hyra på ön"; https://grinda.se/mat-fest/ — "Det anrika huset har blickat ut över Saxarfjärden sedan 1906"
      { q: "Vad kan man göra en skärgårdsweekend för två?", a: "Till exempel bada bastu på en vedeldad bastuflotte och doppa sig i havet på Sandhamn, gå Grindastigen till Klubbudden på Grinda, hyra cykel på Utö eller äta middag med utsikt över Saxarfjärden på Grinda Wärdshus." },
      // KÄLLA: https://www.sandhamn.com/sv/om-oss — "Vi håller öppet året runt"; https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt"; https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://www.utovardshus.se/oppettider/ — "Stängt för säsongen. Öppnar Midsommar 2027."
      { q: "Kan man åka på weekend i skärgården på hösten eller vintern?", a: "Ja. Sandhamn Seglarhotell och Utö Värdshus har öppet året runt, och till Sandhamn går det båtar året runt. Kolla däremot öppettiderna, eftersom flera sommarbarer och krogar stänger efter säsongen." },
    ],
  },
  {
    slug: "svampplockning-skargarden",
    title: "Svampplockning i skärgården – öar och regler",
    excerpt: "Utö, Möja, Själbottna och Bogesund – där Länsstyrelsen själv tipsar om svamp. Plus vad allemansrätten tillåter och vad du gör om du är osäker på en svamp.",
    category: "Aktivitet", emoji: "🍄", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: Länsstyrelsen Stockholm, Utö, Möja-Björndalen, Själbottna-Östra Lagnö, Bogesundslandet (lästa 2026-09-21). Tidigare svar nämnde Ornö, Nåttarö och Ljusterö utan källa.
      { q: 'Vilka öar i Stockholms skärgård är bra för svampplockning?', a: 'Länsstyrelsen nämner svampen uttryckligen för Utös naturreservat ("ta med svampkorgen" på hösten), Möja-Björndalen ("svamputflykter"), Själbottna-Östra Lagnö ("rika på bär och svamp") och Bogesundslandet vid Vaxholm.' },
      // KÄLLA: Naturvårdsverket, Plocka blommor, bär och svamp (läst 2026-09-21); Länsstyrelsen Stockholm, föreskrifter Finnhamn, Grinda, Gällnö, Kårklö, Nämdö — "ta bort vedlevande svampar" förbjudet (lästa 2026-09-21). Tidigare svar sa att plockning är tillåten "även i naturreservat" utan förbehåll.
      { q: 'Får man plocka svamp i naturreservat?', a: 'Allemansrätten ger dig rätt att plocka svamp, men i naturreservat gäller reservatets föreskrifter. I flera skärgårdsreservat, bland annat Finnhamn, Grinda och Gällnö, är det förbjudet att ta vedlevande svamp. Läs skylten eller föreskrifterna på Länsstyrelsens webbplats innan du plockar.' },
      // KÄLLA: Livsmedelsverket, Svamp (läst 2026-09-21); Giftinformationscentralen, Svamp (läst 2026-09-21)
      { q: 'Vad gör jag om jag har ätit en svamp jag är osäker på?', a: 'Vid allvarliga symtom: ring 112 och begär Giftinformation. I mindre akuta fall: ring Giftinformationscentralen på 010-456 67 00, dygnet runt. Spara svampen så att den kan artbestämmas.' },
    ],
  },
  {
    slug: "pingst-skargarden",
    title: "Pingst i skärgården – båtarna, öarna och Kristi himmelsfärd",
    excerpt: "Pingst i skärgården: när pingst och Kristi himmelsfärd infaller, hur Waxholmsbolagets båtar går på röda dagar och vilka öar som har båt året om på våren.",
    category: "Säsong", emoji: "🌷", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253/ — "pingstdagen sjunde söndagen efter påskdagen"; https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/pingst — "Pingsten är en rörlig helg som infaller 50 dagar efter påsk."
      { q: "När är pingst?", a: "Pingstdagen är den sjunde söndagen efter påskdagen, alltså 50 dagar efter påsk. Datumet flyttar sig därför varje år med påsken." },
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/pingst — "sedan 2005 är annandag pingst inte längre en ledig dag eftersom nationaldagen istället infördes som helgdag."
      { q: "Är annandag pingst ledig?", a: "Nej. Sedan 2005 är annandag pingst inte längre en ledig dag, eftersom nationaldagen blev helgdag i stället. Den finns inte med bland de allmänna helgdagarna i lagen." },
      // KÄLLA: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253/ — "Kristi himmelsfärdsdag sjätte torsdagen efter påskdagen"; https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kristi-himmelsfardsdag — "Eftersom himmelsfärdshelgen ligger i maj förknippas den med trevliga vårkänslor."
      { q: "När är Kristi himmelsfärdsdag?", a: "Kristi himmelsfärdsdag är den sjätte torsdagen efter påskdagen och ligger i maj. Eftersom den alltid är en torsdag blir fredagen efter en klämdag." },
      // KÄLLA: https://waxholmsbolaget.se/artikel/helgtrafik — "Kristi himmelfärdsdag torsdag 14 maj: trafiken går som en söndag"; https://waxholmsbolaget.se/artikel/helgtrafik — "Onsdag 13 maj: trafiken går som en fredag"
      { q: "Hur går Waxholmsbolagets båtar på Kristi himmelsfärdsdag?", a: "Som en söndag. År 2026 gick båtarna på Kristi himmelsfärdsdag som en söndag och dagen före som en fredag. Waxholmsbolagets sida om helgtrafik visar vilken tabell som gäller varje röd dag." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"; https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja."; https://waxholmsbolaget.se/reseplanering/resmal/uto — "lämpar sig väl för en dagstur året om"; https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "övrig tid på året går det flera per dag"
      { q: "Vilka öar kan man åka till med båt i pingst?", a: "Vaxholm, Grinda, Sandhamn, Möja och Utö har båttrafik året om. Till Sandhamn åker du på våren från Stavsnäs och till Utö från Årsta brygga, eftersom båtarna från Stockholm bara går dit på sommaren." },
    ],
  },
  {
    slug: "foretagsevent-skargarden",
    title: "Företagsevent i Stockholms skärgård – fest, kickoff och aktivitet",
    excerpt: "Företagsevent i Stockholms skärgård: fest på charterbåt, kickoff på Utö eller Grinda, segling, kajak och RIB. Skärgårdsevent för upp till 250 personer.",
    category: "Praktisk", emoji: "🏢", readTime: "6 min", fullContent: true, topics: ['teambuilding'],
    faqs: [
      // KÄLLA: https://out.se/ — "match racing – en katt och råtta lek som väcker tävlingsinstinkten hos alla"; https://kanotcenter.com/sv/grupper-foretagsevent-stockholm/ — "från kajakäventyr och bastubad året runt till uteservering med catering från lokala restauranger"; https://www.utovardshus.se/konferens/konferensaktiviteter/ — "FEMKAMP | SKÄRGÅRDSKAMPEN - ALL IN ONE"; https://grinda.se/konferens/aktiviteter/ — "äventyr på höghöjdsbanan"
      { q: "Vad kan man göra på ett företagsevent i Stockholms skärgård?", a: "Till exempel segling och kappsegling med Out eller Sailing Events, guidad kajak och bastu med Skärgårdens Kanotcenter, eller femkamp, sälsafari med RIB-båt och fiske från Utö Värdshus. På Grinda finns också höghöjdsbana." },
      // KÄLLA: https://www.stromma.com/en-se/stockholm/groups-charter/fleet/ — "Rent M/S Angantyr for parties, dinners, transport, or mingles - perfect for 20-80 people."; https://www.stromma.com/en-se/stockholm/groups-charter/fleet/ — "Rent S/S Stockholm for parties, dinners, weddings, transports, or mingles - perfect for 130-250 people."; https://www.siggestagard.se/konferens/ — "Logen är vår största lokal med plats för upp till 250 personer."; https://www.smadalarogard.se/konferens-event/ — "hela 7 meter i takhöjd och plats för 150 personer"
      { q: "Var kan man ha företagsfest i Stockholms skärgård?", a: "Ombord på en chartrad skärgårdsbåt från Strömma, som finns för allt från 20 till 250 personer. På land har bland annat Grinda Wärdshus, Siggesta Gård (Logen, upp till 250 personer) och Smådalarö Gård (Werket, 150 personer) lokaler för fest." },
      // KÄLLA: https://www.utovardshus.se/konferens/ — "För kick-off eller teamdag. När aktiviteten är en större del av helheten."; https://grinda.se/mat-fest/festvaning-catering/ — "Middagar, bröllop, kick off eller stor släktmiddag."; https://www.sandhamn.com/sv/konferensskargarden — "MÖTEN. KAJAK. UTOMHUSFIKA."; https://www.siggestagard.se/konferens/ — "Välj mellan upplevelser som Westernfest, sommarkickoff i Orangeriet eller en kickoff med julbord"
      { q: "Var kan man ha kickoff i skärgården?", a: "Utö Värdshus har upplägg för kickoff och teamdag och 200 bäddar. Grinda Wärdshus ordnar kickoffer, hotellet på Sandhamn har en vårkickoff med kajak, och Siggesta Gård på Värmdö har kickoffer med bland annat westernfest." },
      // KÄLLA: https://www.stromma.com/en-se/stockholm/groups-charter/fleet/ — "perfect for 130-250 people"; https://kanotcenter.com/sv/grupper-foretagsevent-stockholm/ — "Från teambuilding till evenemang för upp till 100 personer – vi tar hand om alla detaljer."; https://www.utovardshus.se/konferens/konferensaktiviteter/ — "Antal personer: 8-100. Minimidebitering 10 pers."; https://www.utovardshus.se/konferens/konferensaktiviteter/ — "Antal personer: Max 12 passagerare"
      { q: "Hur stor grupp fungerar för ett skärgårdsevent?", a: "Det beror på plats och aktivitet. Strömmas största båtar tar 130–250 personer, Skärgårdens Kanotcenter tar grupper upp till 100 och Utös femkamp passar 8–100 personer. Stridsbåten till Utö tar högst 12 passagerare." },
      // KÄLLA: https://www.stromma.com/en-se/stockholm/groups-charter/fleet/ — "Prebooking is free of charge"; https://www.utovardshus.se/konferens/ — "Vi återkommer inom 24 timmar."
      { q: "Vad kostar ett företagsevent i skärgården?", a: "Priset beror på gruppstorlek, aktivitet och transport, och arrangörerna lämnar offert. Strömma tar till exempel inte betalt för att förboka en charterbåt. Begär offert från flera och räkna med båttransporten." },
    ],
  },
  {
    slug: "digital-detox-skargarden",
    title: "Digital detox i skärgården – öar utan uppkoppling",
    excerpt: "Öar med dålig täckning, inga tv-apparater och naturlig tystnad. En guide för dig som vill koppla bort ordentligt.",
    category: "Praktisk", emoji: "📵", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Vilka öar har sämst mobiluppkoppling i skärgården?', a: 'Ytterskärgårdens öar som Arholma, Landsort, Svenska Högarna och Svartlöga har dålig eller obefintlig täckning. Längre ut du kommer, desto bättre digital detox. Tänk på att ha offlinemaps nedladdade.' },
      { q: 'Vad gör man utan telefon i skärgården?', a: 'Precis det du glömt att du gillar: simma, läsa, laga mat på spritkök, se stjärnorna utan ljusföroreningar och ha riktiga samtal. Skärgårdsnaturen kräver inget underhållning – den är sin egna.' },
      { q: 'Finns det digital-detox-retreats i skärgården?', a: 'Ja, flera anläggningar erbjuder "disconnect"-paket utan wifi i rummen. Kolla kursgårdar och vandrarhem i ytter skärgården. Förmånerna: du sover bättre, äter bättre och mår bättre. Forskning visar 3 dagar i natur minskar kortisolnivåerna markant.' },
    ],
  },
  {
    slug: "grinda-vs-finnhamn",
    title: "Grinda eller Finnhamn? Båt från Stockholm, bad och värdshus",
    excerpt: "Grinda eller Finnhamn? Så tar du dig till Grinda från Stockholm och till Finnhamn, om Cinderella går dit, Grinda Wärdshus, bad, boende och regler på öarna.",
    category: "Region", emoji: "⚖", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Du kan åka till Grinda från Strömkajen, via Vaxholm. Resan från Strömkajen tar ungefär en och en halv timme."; https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/ — "6. Södra Grinda (1,5 tim)"
      { q: "Hur tar man sig till Grinda från Stockholm?", a: "Med Waxholmsbolaget från Strömkajen via Vaxholm. Resan tar ungefär en och en halv timme, och det går båt året om (linje 11). Under Cinderellabåtarnas säsong går Strömmas båt också från Strandvägen till Södra Grinda." },
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/ — "7. Gällnö (1 tim 45 min)"; "10. Sandhamn (2,5 timme)"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Reguljär båttrafik året runt med Waxholmsbolaget."
      { q: "Går Cinderellabåtarna till Finnhamn?", a: "Nej. I Strömmas tidtabell för 2026 stannade Cinderellabåtarna vid Nacka Strand, Gåshaga, Vaxholm, Södra Grinda, Gällnö, Eknö, Telegrafholmen och Sandhamn, men inte vid Finnhamn. Till Finnhamn går Waxholmsbolagets båtar året runt." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-grinda/ — "Det är idag Grinda Wärdshus med restaurang och boende."; https://grinda.se/aktiviteter/ — "Grinda hotell har 30 dubbelrum i smakfull interiör."; https://grinda.se/boende/stugby/ — "Vi har 27 olika stugor i vår charmiga stugby."
      { q: "Vad finns på Grinda Wärdshus?", a: "Grinda Wärdshus ligger mitt på ön och har restaurang och boende. Hotellet har 30 dubbelrum, och det finns också en stugby med 27 stugor och en camping nära Norra Grinda." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan. Ytterligare ett fint bad finns vid Källviken."; https://stockholmarchipelagotrail.com/sv/section/etapp-finnhamn/ — "den fina badstranden i Paradisviken"
      { q: "Var kan man bada på Grinda och Finnhamn?", a: "På Grinda finns barnvänliga bad vid både södra och norra ångbåtsbryggan och ett bad i Källviken. På Finnhamn finns flera badplatser, bland annat badstranden i Paradisviken, som du når på grusvägen från bryggan." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Kommun: Värmdö"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Kommun: Österåker"; "Markägare: Skärgårdsstiftelsen"; https://stockholmarchipelagotrail.com/sv/section/etapp-finnhamn/ — "Finnhamn är samlingsnamnet för de tre öarna; Idholmen, Stora och Lilla Jolpan som alla är sammanbundna."
      { q: "Vad är skillnaden mellan Grinda och Finnhamn?", a: "Grinda ligger i Värmdö kommun och har Grinda Wärdshus med hotell, stugby och camping. Finnhamn består av tre sammanbundna öar i Österåkers kommun, med vandrarhem, stugor, tältplats, café och krog. Båda är naturreservat som ägs av Skärgårdsstiftelsen." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Tältning är endast tillåten på tältplatsen nära norra bryggan."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "på Idholmen, Stora och Lilla Jolpan tälta på annat än anvisad plats"
      { q: "Får man tälta på Grinda och Finnhamn?", a: "Ja, men bara på anvisad plats. På Grinda är tältning bara tillåten på tältplatsen nära norra bryggan. På Finnhamn får du tälta på Idholmen, Stora och Lilla Jolpan endast på anvisad plats." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; "Torrdass finns vid alla badplatser"; https://stockholmarchipelagotrail.com/sv/section/etapp-finnhamn/ — "På Finnhamn finns några möjligheter om du har barnvagn, begränsad rörlighet eller sitter i rullstol."
      { q: "Vilken ö passar barnfamiljer?", a: "Grinda har barnvänliga bad vid båda ångbåtsbryggorna och torrdass vid alla badplatser. På Finnhamn leder en grusväg från bryggan till badstranden i Paradisviken, och den går att använda med barnvagn. Vilken ö som passar bäst beror på hur ni vill bo." },
    ],
  },
  // ── Batch A: nya fullContent-guider ────────────────────────────────────────
  {
    slug: "stockholm-archipelago-trail",
    title: "Stockholm Archipelago Trail (SAT) – alla etapper och SAT Arholma",
    excerpt: "SAT Stockholm: 270 km vandringsled över 20 öar från SAT Arholma i norr till Landsort i söder. Alla etapper, båtarna till leden och regler för tält och eld.",
    category: "Aktivitet",
    emoji: "🥾",
    readTime: "9 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/fragor-svar/ — "Stockholm Archipelago Trail är en vandringsled genom Stockholms skärgård. Leden är ca 270 km lång med ett 20-tal etapper på skärgårdsöar. Vandringsleden är förkortad ibland till SAT."
      { q: "Vad är SAT i Stockholm?", a: "SAT står för Stockholm Archipelago Trail, en vandringsled på cirka 270 kilometer med ett 20-tal etapper på öar i Stockholms skärgård, från Arholma i norr till Landsort i söder. Du når alla etapper med de reguljära skärgårdsbåtarna." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-arholma/ — "Du åker till Arholma från Simpnäs året om. Under sommaren kan du även åka från Norrtälje och Stockholm, då via Vaxholm."; https://stockholmarchipelagotrail.com/sv/fragor-svar/ — "Från Norrtälje kan du åka kommunalt till Simpnäs där båten till Arholma går."
      { q: "Hur tar man sig till SAT Arholma?", a: "Båt till Arholma går från Simpnäs året om, och du kan åka kommunalt från Norrtälje till Simpnäs. På sommaren går det också båt från Norrtälje och från Stockholm via Vaxholm. Etappen är 13,4 km och börjar vid kajen." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/ — "Leden har 20 etapper på 20 öar från Arholma i norr till Landsort i söder."; https://stockholmarchipelagotrail.com/sv/section/ — "Visar 22 etapper"; "Etapp Ornö Medel 34.1 km"
      { q: "Hur lång är Stockholm Archipelago Trail och hur många etapper finns det?", a: "Leden är 270 km lång och har 20 etapper på 20 öar. På ledens webbplats listas 22 delar, eftersom roddbåtarna mellan Finnhamn och Ingmarsö och förbindelseleden mellan Utö och Ålö räknas med. Längst är Ornö med 34,1 km." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/fragor-svar/ — "Då samtliga etapper är fristående från varandra så kan du välja etapperna i den ordning du vill. Du kan göra en eller flera."
      { q: "Måste man gå hela leden på en gång?", a: "Nej. Etapperna är fristående, så du kan gå dem i vilken ordning du vill, en eller flera. Vill du gå hela leden i ett svep börjar du på Arholma eller Landsort." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/fragor-svar/ — "På många av öarna så kan du tälta på de campingplatser som finns."; "Sandhamn, Svartsö, Ornö, Möja och Brottö har ingen campingplats."
      { q: "Får man tälta längs Stockholm Archipelago Trail?", a: "På många öar finns campingplatser. I naturreservat är reglerna striktare, men i regel får du tälta en natt om du inte stör. Tälta aldrig nära hus. Sandhamn, Svartsö, Ornö, Möja och Brottö saknar campingplats." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/fragor-svar/ — "Vi rekommenderar varmt tiden mellan den 5 – 17 augusti. Då går fortfarande Nordsydlinjen samtidigt som det är mycket färre människor i skärgården."
      { q: "När är bästa tiden att vandra SAT?", a: "Ledens webbplats rekommenderar 5–17 augusti, när Nordsydlinjen fortfarande går men det är färre människor ute, och sista veckan i juni. Därefter nämns resten av säsongen fram till slutet av september, och maj fram till midsommar." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/ — "Etapp Utö Utmanande 18.4 km"; "Etapp Ålö Utmanande 13.2 km"; "Etapp Nåttarö Utmanande 9.5 km"; "Etapp Sandhamn Lätt 8.1 km"; "Etapp Möja Lätt 13.8 km"; "Etapp Rånö Lätt 12 km"
      { q: "Hur svår är leden?", a: "Varje etapp har en svårighetsgrad: lätt, medel eller utmanande. Utö, Ålö och Nåttarö räknas som utmanande, medan till exempel Sandhamn, Möja och Rånö är lätta. De flesta etapper har svårighetsgraden medel." },
    ],
  },
  {
    slug: "sup-paddleboard-skargarden",
    title: "SUP i Stockholm – hyra SUP i stan och i skärgården",
    excerpt: "SUP i Stockholm: här kan du hyra SUP i stan, i Vaxholm, på Grinda och i Nynäshamn. Plus vad som gäller för flytväst, leash och vind när du paddlar.",
    category: "Aktivitet", emoji: "🏄", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://langholmenkajak.se/pages/hyra-sup-stockholm — "Visste du att du också kan hyra SUP från vår uthyrning i Tantolunden?"; https://www.soderkajak.se/uthyrning/hyra-sup — "SUP-UTHYRNING I VINTERVIKEN"; https://hellasgarden.se/aktiviteter/sup-stand-up-paddle/ — "Hos oss på Hellasgården kan du hyra kajak, kanadensare och SUP."; https://grinda.se/aktiviteter/ — "I hamnkontoret kan du hyra kajak, SUP och handla olika båtartiklar"
      { q: "Var kan man hyra SUP i Stockholm?", a: "I stan hyr bland andra Långholmen kajak ut SUP på Långholmen och i Tantolunden, Söderkajak i Vinterviken och Hellasgården i Nacka. I skärgården finns SUP-uthyrning i Vaxholm, på Resarö, på Grinda och vid Nickstabadet i Nynäshamn." },
      // KÄLLA: https://www.soderkajak.se/uthyrning/hyra-sup — "Du checkar in hos oss och får rätt utrustning - SUP-bräda, paddel och flytväst."; https://hellasgarden.se/aktiviteter/sup-stand-up-paddle/ — "I din bokning ingår flytväst."
      { q: "Vad kostar det att hyra SUP i Stockholm?", a: "Priset skiljer sig mellan uthyrarna och ändras mellan säsongerna. Se uthyrarens egen prislista när du bokar. Hos flera av dem ingår flytväst i hyran, till exempel hos Söderkajak och Hellasgården." },
      // KÄLLA: https://www.vaxholmkanot.se/sida/?ID=487749 — "flytväst är alltid obligatorisk"; https://hellasgarden.se/aktiviteter/sup-stand-up-paddle/ — "Du måste bära flytväst."; https://www.sjoraddning.se/artiklar/5-proffstips-att-bli-en-battre-stapaddlare — "Glöm heller inte flytvästen."; https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/pa-sjon/anvand-flytvast/ — "Flytvästen ökar chanserna till överlevnad väsentligt."
      { q: "Behöver man flytväst när man paddlar SUP?", a: "Uthyrarna kräver det. Hos Vaxholms Kanotsällskap och Hellasgården är flytväst obligatorisk. Sjöräddningssällskapet skriver att du inte ska glömma flytvästen, och Transportstyrelsen att flytvästen ökar chanserna att överleva väsentligt." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/surfa-och-paddla — "Stand up paddleboard (SUP) är ett enkelt sätt att komma ut på vattnet."; https://langholmenkajak.se/pages/hyra-sup-stockholm — "När man börjar paddla kan det kännas bra att stå på knä då man får bättre balans ju lägre tyngdpunkt man har på brädan."
      { q: "Är SUP svårt att lära sig?", a: "Nynäshamns kommun kallar SUP ett enkelt sätt att komma ut på vattnet. Långholmen kajak rekommenderar att du börjar på knä, eftersom balansen blir bättre med lägre tyngdpunkt, och ställer dig upp med fötterna brett isär efter en stund." },
      // KÄLLA: https://www.sjoraddning.se/artiklar/5-proffstips-att-bli-en-battre-stapaddlare — "paddla gärna i grupp, meddela någon på land om din rutt, och var vaksam på andra farkoster på sjön"; https://www.sjoraddning.se/artiklar/5-proffstips-att-bli-en-battre-stapaddlare — "Använd alltid leash, som är ett säkerhetskoppel mellan benet och brädan."
      { q: "Är det säkert att paddla SUP ensam?", a: "Sjöräddningssällskapet råder dig att paddla i grupp, berätta för någon på land vilken rutt du tar och hålla koll på vädret, eftersom en SUP är känslig för vind. Använd alltid leash så att brädan inte driver iväg." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du får ta med dig handbagage som väger under 30 kg."; https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Allt annat bagage klassas som gods och kostar extra att ta med."
      { q: "Får man ta med SUP på Waxholmsbåten?", a: "Waxholmsbolaget anger inga särskilda regler för SUP-brädor. Handbagage under 30 kg som du bär själv är fritt, medan annat bagage räknas som gods och kostar extra. Fråga kundtjänst innan du reser." },
    ],
  },
  {
    slug: "o-luffa-guide",
    title: "Ö-luffa i Stockholms skärgård – guide till båtluffarkortet",
    excerpt: "Waxholmsbolagets båtluffarkort låter dig hoppa på och av obegränsat i 30 dagar. Planera din fleröarsresa med konkreta ruttförslag.",
    category: "Transport", emoji: "⛴", readTime: "8 min", fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad är Waxholmsbolagets båtluffarkort?', a: 'Båtluffarkortet ger obegränsad resa med Waxholmsbolagets alla linjer under 30 dagar. Kortet kostar ca 1 700 kr och är lönsamt om du planerar att besöka fler än 3–4 öar. Köps på waxholmsbolaget.se.' },
      { q: 'Vilka öar passar bäst för ö-luffning?', a: 'Klassisk ö-luffarroute: Strömkajen → Vaxholm → Grinda → Finnhamn → Möja → Arholma (norr) eller Strömkajen → Dalarö → Nåttarö → Ornö → Utö (söder). Du kan röra dig fritt och anpassa efter väder.' },
      { q: 'Var övernattnar man när man ö-luffar?', a: 'STF-vandrarhem på Finnhamn, Arholma, Utö och Tyresta. Tältplatser på Nåttarö och Gällnö. Gästhamnar för seglare. Ö-luffning med tält är billigast – räkna med 150–250 kr/natt för tältplats.' },
    ],
  },
  {
    slug: "camping-talta-skargarden",
    title: "Camping och tälta i skärgården – komplett guide",
    excerpt: "Var du får tälta, bästa anläggningarna, allemansrättens gränser och vad du måste ta med. Konkreta råd för 13+ platser.",
    category: "Praktisk",
    emoji: "⛺",
    readTime: "9 min",
    fullContent: true,
    faqs: [
      { q: 'Får man tälta var som helst i skärgården?', a: 'Enligt allemansrätten får du tälta kortvarigt (1–2 nätter) på mark som inte tillhör trädgård eller brukas aktivt. Håll avstånd till närmaste bostad, lämna ingen skräp och följ eventuella lokala regler.' },
      { q: 'Vilka öar i skärgården är bäst för tälta?', a: 'Nåttarö, Gällnö, Östra Lagnö och Ornö är klassiker för tältare. Nåttarö har en etablerad tältplats med toalett och sophantering – perfekt för familjer. Ytterskärgårdens klippöar ger mer vildmarkskänsla.' },
      { q: 'Behöver man eld-/grillplats i skärgården?', a: 'Öppen eld är förbjudet på klipphäll och vid högt brandindex. Använd alltid medförd spritkök eller kol i upphöjd grill. Eldförbud gäller ofta juni–augusti. Kolla SMHI och länsstyrelsens information före resan.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar det att campa i skärgården?', a: 'Viltcampning (allemansrätten) är gratis. Anvisade tältplatser kostar 100–250 kr/natt/tält. Campingplatser med service kostar 300–500 kr/natt.' },
    ],
  },
  {
    slug: "20-bastustallen-skargarden-boka",
    title: "Bastu i Stockholms skärgård – 20 bastuställen att boka 2026",
    excerpt: "Bastu i Stockholms skärgård: Skärgårdsstiftelsens bastur på Ostholmen, Nämdö och Träskö-Storö, bastu på öarna och bastuflotte i skärgården – så bokar du.",
    category: "Aktivitet", emoji: "🧖", readTime: "10 min", fullContent: true, featured: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "I Möjaskärgården, på Träskö-Storö och på Nämdö finns Skärgårdsstiftelsens bastur som är öppna för allmänheten."; https://finnhamn.se/butik/boka-bastu/ — "Den är belägen intill stranden vid butik och krog och tar upp till 15 personer."; https://www.utogasthamn.se/gasthamnen/ — "Hos oss finns dusch, bastu och toaletter."
      { q: "Var finns bastu i Stockholms skärgård?", a: "Skärgårdsstiftelsen har bastur öppna för alla i Möjaskärgården, på Träskö-Storö och på Nämdö. Dessutom finns bastu bland annat på Finnhamn, i Utö gästhamn, på Grinda, Nåttarö och Arholma, på Bullerö i nationalparken och på bastuflottar vid Sandhamn, Gustavsberg, Lidingö och Stocksund." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "Alla Skärgårdsstiftelsens bastur är bokningsfria! Först till kvarn gäller."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "1 timme"
      { q: "Hur bokar man Skärgårdsstiftelsens bastu?", a: "Det går inte. Alla Skärgårdsstiftelsens bastur är bokningsfria och först till kvarn gäller. Du får basta en timme." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "50 kr/vuxen, betalas med Swish."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "Ostholmen: 123 345 63 99"
      { q: "Vad kostar det att basta i Skärgårdsstiftelsens bastu?", a: "När vi läste stiftelsens sida den 28 september 2026 var bastuavgiften 50 kr per vuxen, och den betalas med Swish. Varje bastu har ett eget Swishnummer, till exempel Ostholmen 123 345 63 99." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/mojaskargarden/ — "Det finns flera naturhamnar och på Ostholmens östra sida finns en bastu."; https://explorearchipelago.se/sv/sthlm/mellersta-skargarden/mojaskargarden/skargardsstiftelsens-bastu-pa-ostholmen — "Skärgårdsstiftelsens bastu öppen för allmänheten. Avgiften betalas med Swish."
      { q: "Var ligger bastun på Ostholmen?", a: "Ostholmen ligger i Möjaskärgården, ögruppen öster om Möja. Bastun ligger på Ostholmens östra sida och är öppen för alla mot avgift med Swish." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "Våra bastur öppnar på Valborgsmässoafton, 30 april 2026."; https://explorearchipelago.se/sv/sthlm/mellersta-skargarden/mojaskargarden/skargardsstiftelsens-bastu-pa-ostholmen — "Bastun är öppen från 30 april till och med 31 oktober."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "När eldningsförbud råder är vedeldade bastur stängda."
      { q: "När är Skärgårdsstiftelsens bastur öppna?", a: "Basturna öppnade på valborgsmässoafton, 30 april 2026, och är enligt Upptäck Skärgården öppna till och med 31 oktober. Vid eldningsförbud är de stängda." },
      // KÄLLA: https://www.sandhamn.com/sv/spa/bastuflottar — "Lägg enkelt till en privat bastuflotte som tillval när du bokar din vistelse online eller via receptionen."; https://nautilus.se/hyra-bat/hyr-bastuflotte/ — "Hyr vår bastu på vattnet i Gustavsberg!"; https://www.bastuflottestockholm.se/bastuflotte-i-stockholm — "Bastuflotten utgår från Hustegavägen 1 på Lidingö."; https://nautilus.se/hyra-bat/hyr-bastuflotte-till-event-i-stockholm/ — "Vi kör fram flotten till den brygga i Stockholms Skärgård som du önskar."
      { q: "Var kan man hyra bastuflotte i skärgården?", a: "Till exempel på Sandhamn Seglarhotell, hos Nautilus i Gustavsberg, från Hustegavägen på Lidingö och Bastuflotten ReLaxa i Stocksund. Nautilus kan också köra ut en flotte till en brygga du väljer." },
    ],
  },
  {
    slug: "havsbastu-skargarden",
    title: "Bastu i skärgården – bastuflotte i Sandhamn och Stockholm",
    excerpt: "Bastu i skärgården: hyr bastuflotte på Sandhamn, i Gustavsberg eller från Lidingö, eller basta vedeldat i Vaxholm och på Bullerö. Så bokar du.",
    category: "Aktivitet", emoji: "🧖", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.sandhamn.com/ — "på våra vedeldade bastuflottar vid vattnet"; https://nautilus.se/hyra-bat/hyr-bastuflotte/ — "Bokas i pass om 2 timmar."; https://www.bastuflottestockholm.se/bastuflotte-i-stockholm — "Bastuflotten utgår från Hustegavägen 1 på Lidingö."; https://www.bastuflotten.com/ — "Bastuflotten ReLaxa tar dig till restauranger i närheten av Stocksunds Hamn"
      { q: "Var kan man hyra bastuflotte i Stockholms skärgård?", a: "Exempel vi har kontrollerat på uthyrarnas egna sidor: Sandhamn Seglarhotells vedeldade bastuflottar, Nautilus bastuflotte i Gustavsberg som bokas i pass om två timmar, bastuflottan som utgår från Hustegavägen på Lidingö och Bastuflotten ReLaxa i Stocksund." },
      // KÄLLA: https://www.sandhamn.com/sv/spa/bastuflottar — "Lägg enkelt till en privat bastuflotte som tillval när du bokar din vistelse online eller via receptionen."; https://www.sandhamn.com/sv/spa/bastuflottar — "90 minuter för er själva."; https://www.sandhamn.com/sv/spa/bastuflottar — "För övriga privata pass och gruppbokningar, kontakta reception@sandhamn.com eller 08-574 504 00."
      { q: "Finns det bastuflotte i Sandhamn?", a: "Ja. Sandhamn Seglarhotell har vedeldade bastuflottar vid vattnet. Hotellgäster kan lägga till en privat bastuflotte i 90 minuter när de bokar vistelsen, och andra privata pass och gruppbokningar går via receptionen." },
      // KÄLLA: https://nautilus.se/hyra-bat/hyr-bastuflotte/ — "Max antal besökare är 8 personer."; https://www.bastuflottestockholm.se/bastuflotte-i-stockholm — "Vi åker ut med max 12 gäster ombord. Står vi fastsurrade vid bryggan kan man vara upp till 20 gäster."
      { q: "Hur många får plats på en bastuflotte?", a: "Det skiljer sig mellan uthyrarna. Bastun på vattnet i Gustavsberg tar högst åtta personer. Bastuflottan från Lidingö åker ut med högst 12 gäster och tar upp till 20 när den ligger vid bryggan." },
      // KÄLLA: https://kanotcenter.com/sv/bastu-stockholm-skargard/ — "Vi tillhandahåller ved på plats, så att du kan ta hand om elden"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero — "Bastun är öppen för alla och går inte att boka."; https://www.sandhamn.com/sv/spa/bastuflottar — "Njut av vedeldad bastu och ett dopp i havet"
      { q: "Var finns vedeldad bastu i Stockholms skärgård?", a: "Bland annat vid Kanotcentret i Vaxholm, där du eldar själv med ved som finns på plats, och på Bullerö i Nämdöskärgårdens nationalpark, där bastun är öppen för alla och inte går att boka. Sandhamns bastuflottar är också vedeldade." },
      // KÄLLA: https://www.bastuflotten.com/bastuflotten-relaxa-aktiviteter/vinterbastu/ — "Säsong: November-april"; https://www.bastuflotten.com/bastuflotten-relaxa-aktiviteter/vinterbastu/ — "Denna tid på året bastar ni stillaliggande i hamnen"; https://kanotcenter.com/sv/bastu-stockholm-skargard/ — "Ta ett uppfriskande dopp i havet, året runt"
      { q: "Kan man basta i skärgården på vintern?", a: "Ja. Bastuflotten ReLaxa har vinterbad med bastu från november till april, då flotten ligger still i hamnen. Vid Kanotcentret i Vaxholm kan du doppa dig i havet året runt." },
    ],
  },
  {
    slug: "barnfamilj-skargarden",
    title: "Skärgården med barn – sandstrand och båt i Stockholm och Göteborg",
    excerpt: "Skärgården med barn: sandstrand i skärgården kring Stockholm och Göteborg, gratis resor för barn under sju år, barnvagn på båten och råd om flytväst.",
    category: "Praktisk",
    emoji: "👨‍👩‍👧",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; https://skargardsstiftelsen.se/omraden/uto/ — "Rävstavik och Barnens bad erbjuder långgrunda sandstränder som passar barnfamiljer"; https://goteborg.com/guider/sommarparlor-i-goteborgs-skargard — "Tärnstigen är en kortare, tillgänglig led för barnvagn och rullstol."
      { q: "Vilka öar i skärgården passar med barn?", a: "I Stockholms skärgård har till exempel Grinda barnvänliga bad vid båda ångbåtsbryggorna och Utö långgrunda sandstränder. I Göteborg är de södra öarna bilfria, och Vrångö har sandstranden Nötholmen och en promenadslinga som går med barnvagn." },
      // KÄLLA: https://goteborg.com/guider/sommarparlor-i-goteborgs-skargard — "För dig med småbarn är Nötholmen ett bra alternativ tack vare långrund sandstrand och stora gräsytor."; https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "Det finns gott om barnvänliga, långgrunda sandstränder."
      { q: "Var finns sandstrand i skärgården för små barn?", a: "I Göteborgs skärgård har Nötholmen på Vrångö långgrund sandstrand och stora gräsytor, och Strandtången på Hyppeln är en långgrund sandstrand. I Stockholms skärgård har Nåttarö gott om långgrunda sandstränder, och på Utö finns Rävstavik och Barnens bad." },
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris — "Barn som är under 7 år gamla reser utan avgift med annan betalande resenär."; https://www.vasttrafik.se/resa-med-oss/fore-resan/aldersgranser/ — "Fritt antal barn under sju år reser gratis med vuxen som har giltig biljett."
      { q: "Reser barn gratis på skärgårdsbåtarna?", a: "Ja, de minsta. På Waxholmsbolaget reser barn under 7 år utan avgift med en betalande resenär. I Västtrafik, där Göteborgs skärgårdsbåtar ingår, reser hur många barn under sju år som helst gratis med en vuxen som har giltig biljett." },
      // KÄLLA: https://www.waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du som reser med barn under 7 år får ta med barnvagn utan kostnad."; https://www.waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Du kan inte boka plats ombord på våra fartyg"
      { q: "Får man ta med barnvagn på båten?", a: "Ja. På Waxholmsbolaget tar du med barnvagn utan kostnad när du reser med barn under 7 år, och ställer den på barnvagnsplatserna. Plats kan inte bokas – du kliver ombord vid bryggan." },
      // KÄLLA: https://svenskalivraddningssallskapet.se/flytvastar/ — "100N-västar kallas ofta för räddningsvästar och är det bästa alternativet för barn och vuxna som inte kan simma."; https://svenskalivraddningssallskapet.se/flytvastar/ — "Barn ska alltid använda grenband."
      { q: "Vilken flytväst ska barn ha i skärgården?", a: "Svenska Livräddningssällskapet rekommenderar 100N-västar, räddningsvästar, för barn och för den som inte kan simma. Barn ska alltid använda grenband, och uppblåsbara västar rekommenderas inte för barn under 40 kilo." },
    ],
  },
  {
    slug: "uto-komplett-guide",
    title: "Bil till Utö? Båt, tidtabell och Utö runt – resa till Utö",
    excerpt: "Bil till Utö: kör till Årsta brygga, parkera och ta båten därifrån. Så reser du till Utö, var tidtabellen finns och vad som finns på ön.",
    category: "Region",
    emoji: "🏝",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Bil: Nynäsvägen (väg 73) söderut. Skyltad avfart mot Årsta brygga."; https://www.utovardshus.se/kontakt/hitta-hit/ — "Den absolut vanligaste resvägen är däremot passagerarfärjan som avgår från Årsta Brygga i Årsta Havsbad."; https://www.utovardshus.se/kontakt/hitta-hit/ — "Väl vid bryggan finns en parkeringsplats som betalas via appen"
      { q: "Kan man ta bil till Utö?", a: "Du kör till Årsta brygga i Årsta havsbad (Nynäsvägen, väg 73, söderut och skyltad avfart) och parkerar där. Parkeringen betalas i appen Easypark. Sedan tar du passagerarfärjan till Utö." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/uto — "Men från Årsta brygga i Haninge går det att resa till Utö sju till åtta gånger om dagen sommartid"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Waxholmsbåt året om till Gruvbryggan. På sommaren går även turer från Strömkajen i Stockholm."; https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/uto-alo/ — "Till Ålö kommer du med båt från Nynäshamn."
      { q: "Var går båten till Utö?", a: "Waxholmsbolagets båt går året om från Årsta brygga i Haninge till Gruvbryggan på Utö, sommartid sju till åtta gånger om dagen. På sommaren går det också båt från Strömkajen i Stockholm. Från Nynäshamn går båten till grannön Ålö, som har bro till Utö." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/uto — "Du hittar tider genom att använda söktjänsten på startsidan eller titta i tabell 21. Nord/Sydlinjens tider hittar du i tabell 40."; https://kund.printhuset-sthlm.se/wa/h21.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"
      { q: "Var hittar jag Utö tidtabell?", a: "Båten Årsta brygga–Utö står i Waxholmsbolagets tabell 21. Den tryckta tabellen gäller 2 april–18 juni och 17 augusti–12 december 2026. Nord/Sydlinjen, som går via Utö på sommaren, står i tabell 40." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Kollektivtrafik: Pendeltåg till Västerhaninge. Buss till Årsta brygga."; https://kund.printhuset-sthlm.se/sl/h846.pdf — "Tidtabellen är anpassad till pendeltåg från Stockholm vid Västerhaninge station."
      { q: "Hur reser man till Utö utan bil?", a: "Ta pendeltåget till Västerhaninge och buss 846 till Årsta brygga. Bussens tider är anpassade till pendeltåget från Stockholm. Därifrån går Waxholmsbolagets båt till Utö." },
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/uto — "Utö runt"; https://skargardsstiftelsen.se/omraden/uto/ — "Här finns milslånga grusvägar och stigar som passar både vandrare och cyklister"; https://skargardsstiftelsen.se/omraden/uto/ — "Utö är också en del av Stockholm Archipelago Trail"
      { q: "Finns det en led Utö runt?", a: "Ja, leden Utö runt är utmärkt på Upptäck Skärgårdens besökskarta. Utö har långa grusvägar och stigar för vandring och cykling, och ön är en del av Stockholm Archipelago Trail." },
    ],
  },
  {
    slug: "sandhamn-komplett-guide",
    title: "Sandhamn – Trouville strand, båtar dit och vad du kan göra",
    excerpt: "Trouville är Sandhamns strand, en lång sandstrand cirka 20 minuter från hamnen. Att göra på Sandhamn, båtar dit, KSSS gästhamn, museet, mat och boende.",
    category: "Region",
    emoji: "⛵",
    readTime: "6 min",
    fullContent: true,
    faqs: [
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/h433.pdf — "Slussen–Djurö"; https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Waxholmsbolaget trafikerar Sandhamn hela året"; https://battaxi.se/sandhamnslinjen-2/ — "mellan Stavsnäs och Sandhamn på endast 30 minuter"
      { q: "Hur tar man sig till Sandhamn?", a: "Åk SL-buss 433 från Slussen till Stavsnäs vinterhamn och ta båten därifrån. Waxholmsbolaget trafikerar Sandhamn hela året, och Stavsnäs Båttaxis direktbåt Sandhamnslinjen tar 30 minuter. Sommartid går också Strömmas Cinderella II från Strandvägen." },
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html — "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida."; "Trouville ligger omkring 20 minuters promenad från hamnen."; "Toaletter sommartid"; "Badet ägs och sköts av Eknö hemman."; "Ingen provtagning av badvatten utförs av Värmdö kommun."
      { q: "Finns det en strand på Sandhamn?", a: "Ja. Trouville är en lång strand med vit sand på Sandöns södra sida, omkring 20 minuters promenad från hamnen. Där finns toaletter sommartid. Stranden ägs och sköts av Eknö hemman, och Värmdö kommun tar inga badvattenprover där." },
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html — "Trouville ligger omkring 20 minuters promenad från hamnen."; "Toaletter sommartid"
      { q: "Hur långt är det till Trouville strand från hamnen på Sandhamn?", a: "Omkring 20 minuters promenad. Trouville är en lång strand med vit sand på Sandöns södra sida, och där finns toaletter sommartid." },
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html — "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn, passerar sandstranden Trouville"; https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "I de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum som drivs av föreningen Sandhamns vänner."; "Det pampiga gula tullhuset av sten som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752."
      { q: "Vad kan man göra på Sandhamn?", a: "Bada på Trouville, gå den cirka 8 km långa stigen runt Sandön, besöka Sandhamns vänners museum i Bryggstugan och Tullvaktstugan och se tullhuset från 1752 i hamnen." },
      // KÄLLA: https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "M/S CINDERELLA II"; "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN"; "Strandvägen - kajplats 14"; "30/4 - 4/6"; "7/9 - 27/9"
      { q: "Går det båt från Strandvägen till Sandhamn?", a: "Ja, sommartid. Strömmas M/S Cinderella II går från Strandvägen, kajplats 14, via bland annat Vaxholm och Grinda till Sandhamn. Säsongen 2026 är 30 april–27 september, och tidtabellen för nästa år publiceras på stromma.com." },
      // KÄLLA: https://www.sandhamn.com/sv/om-oss — "Vi håller öppet året runt"; https://sandshotell.se/ — "Hotellet har 15 dubbelrum, 3 enkelrum så totalt 33 bäddar"; https://sandhamns-vardshus.se/boende — "Missionshuset är öppet året runt för bokning"
      { q: "Kan man övernatta på Sandhamn?", a: "Ja. Sandhamn Seglarhotell har öppet året runt. Sands Hotell har 33 bäddar, och Sandhamns Värdshus hyr ut rum i Missionshuset B&B som går att boka året runt." },
    ],
  },
  {
    slug: "vinter-i-skargarden",
    title: "Stockholms skärgård på vintern – båtar, öppna hamnar och öar",
    excerpt: "Stockholms skärgård på vintern: vilka öar båtarna går till året runt, vintertidtabellen, SL-biljett på båten och om gästhamnarna är öppna vintertid.",
    category: "Säsong", emoji: "❄️", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://www.waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja."; https://skargardsstiftelsen.se/omraden/namdo/ — "hit kan du åka med skärgårdsbåt året om"; https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt"
      { q: "Vilka öar kan man åka till i Stockholms skärgård på vintern?", a: "Waxholmsbolagets båtar går året runt bland annat till Vaxholm, Möja, Sandhamn och Utö. Nämdö och Grinda går också att nå året om. På Utö har Utö Värdshus öppet året runt. Mycket annan service är säsongsöppen." },
      // KÄLLA: https://www.ksss.se/hamnar/sandhamn/aktuellt — "Mellan oktober och april är strömmen påslagen på brygga B och C"; https://www.ksss.se/hamnar/sandhamn/aktuellt — "Vatten på bryggorna och servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september."; https://www.ksss.se/hamnar/lokholmen — "Man är givetvis varmt välkommen att förtöja här ändå"
      { q: "Är gästhamnarna öppna vintertid?", a: "Ofta går det att förtöja, men service är avstängd. I KSSS gästhamn i Sandhamn är ström påslagen på brygga B och C mellan oktober och april, medan vatten och servicehus bara är öppna maj till september. På Lökholmen är el och vatten avstängda från oktober till maj, men du får förtöja och betalar via QR-kod." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Under vintertidtabellen (december till april) har vissa fartyg bara försäljning av varma och kalla drycker ombord."; https://waxholmsbolaget.se/reseplanering/tidtabeller — "Waxholmsbolaget byter tidtabell fyra gånger om året, men vissa linjer går bara delar av en period."
      { q: "Går Waxholmsbåtarna på vintern?", a: "Ja, men med vintertidtabell från december till april. Waxholmsbolaget byter tidtabell fyra gånger om året och vissa linjer går bara delar av perioden. Under vintertidtabellen säljer vissa fartyg bara drycker ombord." },
      // KÄLLA: https://waxholmsbolaget.se/nyheter-och-trafikinfo/lagsasongen-igang — "Från den 14 september till den 29 april 2027 kan du som har en SL-biljett som gäller för 30 dagar eller längre resa i hela Waxholmsbolagets trafik."
      { q: "Gäller SL-kortet på Waxholmsbåtarna på vintern?", a: "Under lågsäsongen gäller SL-biljetter för 30 dagar eller längre i hela Waxholmsbolagets trafik, i år från den 14 september till den 29 april 2027." },
      // KÄLLA: https://www.sjoraddning.se/artiklar/om-is-och-dess-svagheter — "Generellt sett är isen svagare i skärgårdar och hav än de är i insjöar."; https://www.sjoraddning.se/artiklar/saker-pa-isen — "Ha alltid sällskap på isen."; https://www.sjoraddning.se/artiklar/saker-pa-isen — "Vill man till exempel åka långfärdsskridskor och är nybörjare ska man inte tveka att ta kontakt med en skridskoklubb."
      { q: "Kan man åka skridskor i skärgården på vintern?", a: "När isen bär, men isen är generellt svagare i skärgårdar och hav än i insjöar. Åk aldrig ensam, ha isdubbar och ombyte med dig och kontakta en skridskoklubb om du är nybörjare." },
    ],
  },
  {
    slug: "fiske-i-skargarden",
    title: "Fiske i Stockholms skärgård – havsöring, fiskar och fiskeregler",
    excerpt: "Fiske i Stockholms skärgård: vilka fiskar som finns, regler för havsöring, fritt handredskapsfiske, minimimått och de 62 vikarna med fiskeförbud på våren.",
    category: "Aktivitet", emoji: "🎣", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/djur/fiske.html — "I havet längs kusten och i de fem stora sjöarna får du fiska fritt med handredskap utan fiskekort."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/fiskeregler-for-fritidsfiske.html — "Allemansrätten gäller inte fiske."
      { q: "Behöver man fiskekort för att fiska i Stockholms skärgård?", a: "Nej, inte med handredskap. I havet längs kusten får du fiska fritt med handredskap utan fiskekort. För insjöar och vattendrag behöver du tillstånd från fiskerättsägaren. Det fria fisket bygger inte på allemansrätten, som inte gäller fiske." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/oring---minimimatt-fredningstid-och-fangstbegransningar.html — "Generellt gäller 50 centimeter som minimimått i Östersjöns samtliga delområden."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/oring---minimimatt-fredningstid-och-fangstbegransningar.html — "gäller en fångstbegränsning på 1 icke fenklippt öring per dygn"; https://www.lansstyrelsen.se/stockholm/djur/fiske.html — "14 fredningsområden i vissa åmynningar, där fiskeförbud råder på hösten när öringen går upp i vattendragen för att leka"
      { q: "Får man fiska havsöring i Stockholms skärgård?", a: "Ja, men minimimåttet är 50 cm och du får behålla högst en öring per dygn som inte är fenklippt. Vissa åmynningar är fredade på hösten när öringen vandrar upp för att leka." },
      // KÄLLA: https://parker.stockholm/fiske/fiskemojligheter/ — "I Saltsjön finns dels dessa sötvattensarter och dels fiskar som är mer bundna till havet, exempelvis strömming, lax, havsöring, sik och till och med torsk och plattfisk."; https://parker.stockholm/fiske/fiskemojligheter/ — "Ett 30-tal fiskarter gör området till ett av de artrikaste i mellersta Sverige."
      { q: "Vilka fiskar finns i Stockholms skärgård?", a: "Sötvattensarter som gädda, abborre och gös och fiskar som hör till havet, som strömming, lax, havsöring, sik, torsk och plattfisk. I Stockholmsområdet finns ett 30-tal fiskarter." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/djur/fiske.html — "Därför finns det 62 vikar i Stockholms skärgård där fiskeförbud råder under våren. Nio av dessa områden har fiskeförbud året runt."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/fiskeregler-for-fritidsfiske.html — "Fredningsområden och de regler som gäller i dessa hittar du i kartan på svenskafiskeregler.se."
      { q: "Var är det fiskeförbud i Stockholms skärgård?", a: "I 62 vikar är det fiskeförbud på våren, och i nio av dem gäller förbudet året runt. I 14 åmynningar är det fiskeförbud på hösten. Länsstyrelsen har kartor över områdena, och på svenskafiskeregler.se finns en karta med fredningsområden." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/gadda---minimimatt-fredningstid-och-fangstbegransningar-i-ostersjon.html — "Vid fiske med handredskap och ryssjor gäller en fångstbegränsning för gös och gädda till sammantaget tre fiskar."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/gadda---minimimatt-fredningstid-och-fangstbegransningar-i-ostersjon.html — "Maximimått: 75 cm"
      { q: "Hur många gäddor får man behålla i skärgården?", a: "Högst tre gäddor och gösar sammanlagt när du fiskar med handredskap eller ryssja, och gäddor över 75 cm ska släppas tillbaka." },
    ],
  },
  {
    slug: "cykling-skargarden",
    title: "Cykla i Stockholms skärgård – cykelleder och cykelhyra",
    excerpt: "Cykla i Stockholms skärgård: ta med cykel på Waxholmsbolaget eller hyr cykel på Sandhamn, Utö, Möja, Ingmarsö eller Arholma. Cykelleder och regler.",
    category: "Aktivitet", emoji: "🚴", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "I reservatet finns informationstavla, cykelled, rast- och övernattningsstuga och båtluffarled." https://skargardsstiftelsen.se/omraden/uto/ — "Cykla längs grusvägarna, vandra genom skogar och öppna betesmarker" https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/ — "Ingmarsö är lättillgängligt tack vare grusvägarna på ön."
      { q: "Var kan man cykla i Stockholms skärgård?", a: "På öar med grusvägar som Utö, Möja och Ingmarsö, och på cykelleden i Gällnö naturreservat. Länsstyrelsen listar också cykelled i Utö naturreservat. Cykel kan du hyra på bland annat Utö, Möja, Ingmarsö, Arholma och Sandhamn." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du får ta med en vanlig cykel ombord i mån av plats. Att ta med cykeln kostar inget extra, men vill du ta med en cykelkärra kostar detta 120 kronor."
      { q: "Kan man ta med cykel på Waxholmsbolaget?", a: "Ja, en vanlig cykel följer med utan extra kostnad, i mån av plats. Personalen ombord avgör och kan neka när det är fullt. Cykelkärra kostar 120 kronor, och lådcykel och tandem räknas som gods (120 kronor)." },
      // KÄLLA: https://www.utogasthamn.se/uto-cykeluthyrning/ — "Du betalar dagsavgiften av din cykel i Hamnboden"; "Under högsäsong kan du även hyra din cykel på Båtshaket på Ålö."
      { q: "Var hyr man cykel på Utö?", a: "I Utö gästhamns Cykelboden vid Gruvbryggan – du betalar i Hamnboden. Under högsäsong kan du även hyra på Båtshaket på Ålö. Hyran gäller per dag, inte 24 timmar." },
      // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "Möjas grus landsväg är perfekt för en cykeltur och det finns hyrcyklar båda i norr och söder."
      { q: "Kan man hyra cykel på Möja?", a: "Ja. Enligt Möja turistförening finns hyrcyklar både i norr och söder: Möja Hamncafé (Kyrkviken), Möja vandrarhem (Berg) och Jeppes (Långvik)." },
      // KÄLLA: https://sandhamnsguiderna.se/ — "Cyklar, cykelkärror och skrindor finns att hyra hos Sandhamnsguiderna."; "Sandhamnsguidernas aktivitetsbod  hittar du vid hamnen." https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."
      { q: "Kan man hyra cykel på Sandhamn?", a: "Ja. Sandhamnsguiderna hyr ut cyklar, cykelkärror och skrindor från sin aktivitetsbod vid hamnen under sommarveckorna. Du kan också ta med egen cykel på Waxholmsbolagets båt, som går till Sandhamn året runt." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "I reservatet finns informationstavla, cykelled, rast- och övernattningsstuga och båtluffarled." https://skargardsstiftelsen.se/omraden/alorano/ — "Runt ön finns också klippbad, naturhamnar och fina vandrings- och cykelvägar." https://www.svenskaturistforeningen.se/aktiviteter/cykling/ — "Kustlinjen – en klassiker på ostkusten mellan Öregrund och Västervik. Hela leden är 560 km"
      { q: "Vilka cykelleder finns i Stockholms skärgård?", a: "Länsstyrelsen anger en cykelled i Gällnö naturreservat och listar cykelled i Utö naturreservat, och Skärgårdsstiftelsen anger cykelvägar på Ålö. För längre turer går STF:s Kustlinjen, 560 km mellan Öregrund och Västervik, bland annat genom Roslagen." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/friluftsliv-och-allemansratt.html — "Att köra motordrivet fordon som bil, motorcykel, snöskoter, fyrhjuling eller elcykel ingår inte i allemansrätten."; "Det går bra att cykla skonsamt i naturen." https://www.svenskaturistforeningen.se/aktiviteter/cykling/ — "enligt allemansrätten får du cykla både i naturen och på enskilda vägar"
      { q: "Får man cykla med elcykel i naturen?", a: "Elcykel ingår inte i allemansrätten, enligt Länsstyrelsen i Stockholm – den räknas som motordrivet fordon. Vanlig cykel får du använda i naturen och på enskilda vägar om du väljer väg så att marken inte skadas." },
    ],
  },
  // ── Batch D: Kräftskiva-serien 2026 ─────────────────────────────────────────
  {
    slug: "kraftskiva-skargarden",
    title: "Kräftpremiär 2026 och kräftskiva i Stockholms skärgård",
    excerpt: "Kräftpremiär 2026 var av tradition första onsdagen i augusti. När är kräftskiva 2026, när får man fiska kräftor och vilka skärgårdsöar har krog och båt?",
    category: "Säsong", emoji: "🦀", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "1982 ändrades det till klockan 17 den första onsdagen i augusti"; "en tradition som lever kvar trots att förbudet upphävdes för mer än två årtionden sedan"; "Från slutet av 1800-talet fram till år 1994 rådde förbud mot kräftfiske från november till början av augusti."
      { q: "När är kräftpremiären 2026?", a: "Av tradition första onsdagen i augusti klockan 17, vilket 2026 var onsdag 5 augusti. Någon officiell premiär finns inte längre – förbudet mot kräftfiske upphävdes 1994, men dagen lever kvar som tradition." },
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "Augusti är kräftskivornas tid."; "i dag ordnas många fester, kräftskivor, i augusti"; "Vill man vara petig med traditionen infaller kräftpremiären första veckan i augusti."
      { q: "När är kräftskiva 2026?", a: "Det finns ingen fastställd dag. Kräftskivor hålls i augusti – enligt Institutet för språk och folkminnen är augusti kräftskivornas tid, och traditionens kräftpremiär infaller första veckan i augusti (2026 onsdag 5 augusti)." },
      // KÄLLA: https://vattern.org/kraftfiske-i-vattern-2026/ — "28 augusti kl. 17:00 – 30 augusti kl. 17:00"; "4 september kl. 17:00 – 6 september kl. 17:00"; "11 september kl. 17:00 – 13 september kl. 17:00" https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/signalkrafta---regler-for-fiske-och-hantering.html — "Det är bara i Vättern som allmänheten får fiska kräftor. I alla andra sjöar och vattendrag måste du ha fiskerättsinnehavarens tillstånd."
      { q: "När är kräftsäsongen 2026 – när får man fiska kräftor?", a: "Allmänheten får bara fiska kräftor i Vättern; i alla andra sjöar och vattendrag krävs tillstånd från fiskerättsinnehavaren. I Vättern var fiskehelgerna 2026 28–30 augusti, 4–6 september och 11–13 september, från fredag klockan 17 till söndag klockan 17." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens." https://skargardsstiftelsen.se/omraden/grinda/ — "Mitt på ön ligger Grinda Wärdshus, en självklar samlingspunkt där du kan äta, bo eller bara njuta av utsikten över vattnet." https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/eldning/ — "Du gör allemansrätt när du använder en fast grillplats, eller väljer grus eller sand som underlag."
      { q: "Var kan man ha kräftskiva i Stockholms skärgård?", a: "Antingen på en ö med krog, till exempel Grinda med Grinda Wärdshus eller Utö med Utö Värdshus – om krogen ordnar kräftskiva står på dess egen sida – eller på egen hand enligt allemansrätten, med fast grillplats eller grus eller sand som underlag om ni grillar." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/eldning/ — "Undvik även att elda på berghällar och större stenblock. De kan nämligen spricka och skadas permanent."
      { q: "Får man elda på klipporna i skärgården?", a: "Naturvårdsverket avråder: berghällar och större stenblock kan spricka och skadas permanent. Använd en fast grillplats eller grus eller sand som underlag, och kolla eldningsförbud hos länsstyrelsen eller kommunen." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du får ta med dig handbagage som väger under 30 kg."
      { q: "Får man ta med kylbox på Waxholmsbåten?", a: "Ja, som handbagage om det väger under 30 kg. Allt annat bagage räknas som gods och kostar extra." },
    ],
  },
  {
    slug: "kraftskiva-bohuslan-2026",
    title: "Kräftskiva i Bohuslän 2026 – klippor och kräftor vid Västerhavet",
    excerpt: "Bohuslän är kräftornas hemort. Guide till kräftskiva vid Västkusten – från Grebbestad till Smögen – med restauranger, traditioner och praktiska tips.",
    category: "Säsong", emoji: "🦞", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Var är bäst att hålla kräftskiva i Bohuslän?', a: 'Grebbestad är landets kräftcentrum. Smögen och Fjällbacka erbjuder kräftskiva med dramatisk klippscenery. Lokala restauranger längs hela kusten håller kräftfester i augusti – ring och boka i juni.' },
      { q: 'Är Bohusläns kräftor bättre än andras?', a: 'Ja – Bohuslänska kräftor från Västerhavet anses av kräftexperter som Sveriges bästa. Saltare och fylligare kött tack vare det klara Västerhavsvattnets kvalitet. Säsongen är kort – premiären 5 aug till september.' },
    ],
  },
  {
    slug: "kraftskiva-gotland-2026",
    title: "Kräftor på Gotland – kräftpremiär 2026 och kräftskiva",
    excerpt: "Kräftor på Gotland: hela ön är skyddsområde för flodkräfta och okokta kräftor utifrån är förbjudna. Kräftpremiär 2026, fiskeregler och tips för kräftskivan.",
    category: "Säsong", emoji: "🏰", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "1982 ändrades det till klockan 17 den första onsdagen i augusti"; "Vill man vara petig med traditionen infaller kräftpremiären första veckan i augusti."; "Från slutet av 1800-talet fram till år 1994 rådde förbud mot kräftfiske från november till början av augusti."
      { q: "När är kräftpremiären 2026?", a: "Traditionen säger första veckan i augusti. Från 1982 började kräftfisket klockan 17 den första onsdagen i augusti, vilket 2026 var onsdagen den 5 augusti. Förbudet upphävdes 1994, så i dag är det fiskerättsinnehavaren som bestämmer när det får fiskas." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/signalkrafta---regler-for-fiske-och-hantering.html — "Det är bara i Vättern som allmänheten får fiska kräftor. I alla andra sjöar och vattendrag måste du ha fiskerättsinnehavarens tillstånd."; "Öland, Gotland, norra Bohuslän, västra Värmland och Dalsland ligger utanför hanteringsområdet."
      { q: "Får man fiska kräftor på Gotland?", a: "Bara med tillstånd från den som äger fiskerätten. Enligt Havs- och vattenmyndigheten får allmänheten fiska kräftor fritt bara i Vättern. Gotland ligger dessutom utanför hanteringsområdet för signalkräfta, där signalkräfta som huvudregel inte får fiskas eller hanteras okokt." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/djur/hotade-arter/hotade-djur-och-vaxter/sotvatten/flodkrafta.html — "År 2007 beslöt Länsstyrelsen att inrätta hela Gotlands län som skyddsområde för flodkräfta"; "saluhålla, sälja, köpa eller transportera okokta kräftor som inte härrör från området,"
      { q: "Får man ta med kräftor till Gotland?", a: "Kokta ja, okokta nej. Hela Gotlands län är skyddsområde för flodkräfta, och där är det förbjudet att saluhålla, sälja, köpa eller transportera okokta kräftor som inte kommer från området." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/djur/hotade-arter/hotade-djur-och-vaxter/sotvatten/flodkrafta.html — "Under 2023 utrotades de sista kända förekomsterna av signalkräfta på Gotland."; "Idag har kräftpest rapporterats från alla större vattensystem söder om Dalälven utom på Gotland och Öland"
      { q: "Finns det signalkräftor på Gotland?", a: "Enligt Länsstyrelsen har signalkräfta hittats på ett fåtal platser, men de bar inte på kräftpest, och under 2023 utrotades de sista kända förekomsterna. Kräftpest har inte rapporterats från Gotland." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/friluftsliv-i-sjoar-och-vattendrag.html — "Desinficeringen är kostnadsfri."; "Om du bara använder utrustningen i havet så behöver du inte desinficera den."
      { q: "Måste man desinficera kanoten eller båten på Gotland?", a: "Ja, om den har använts i sjöar eller vattendrag utanför Gotlands län och du ska använda den i öns sötvatten. Vid Lojstasjöarna kan du få utrustningen desinficerad kostnadsfritt. Använder du den bara i havet behövs ingen desinficering." },
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "Augusti är kräftskivornas tid."; "i dag ordnas många fester, kräftskivor, i augusti"
      { q: "När har man kräftskiva 2026?", a: "I augusti. Kräftskivorna börjar kring kräftpremiären första veckan i augusti och hålls sedan under hela månaden." },
    ],
  },
  {
    slug: "kraftskiva-oland-2026",
    title: "Kräftskiva på Öland 2026 – regler för kräftor och praktiska tips",
    excerpt: "Kräftskiva på Öland 2026: ön är skyddsområde för flodkräfta, och okokta kräftor utifrån får inte säljas eller transporteras. Regler, köp av kräftor och resan.",
    category: "Säsong", emoji: "🌾", readTime: "4 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/kalmar/djur/hotade-arter/hotade-djur-och-vaxter/flodkrafta.html — "saluhålla, sälja, köpa eller transportera okokta kräftor som inte härrör från området,"; "du inte får flytta levande kräftor till Öland eller mellan olika vatten på ön"
      { q: "Får man ta med kräftor till Öland?", a: "Kokta ja, okokta nej. Öland är skyddsområde för flodkräfta, och där är det förbjudet att saluhålla, sälja, köpa eller transportera okokta kräftor som inte kommer från området. Levande kräftor får inte flyttas till Öland." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/signalkrafta---regler-for-fiske-och-hantering.html — "Det är bara i Vättern som allmänheten får fiska kräftor. I alla andra sjöar och vattendrag måste du ha fiskerättsinnehavarens tillstånd."; "Öland, Gotland, norra Bohuslän, västra Värmland och Dalsland ligger utanför hanteringsområdet."
      { q: "Får man fiska kräftor på Öland?", a: "Bara med tillstånd från den som äger fiskerätten. Enligt Havs- och vattenmyndigheten får allmänheten bara fiska kräftor fritt i Vättern. Öland ligger dessutom utanför hanteringsområdet för signalkräfta, där signalkräfta som huvudregel inte får fiskas eller hanteras okokt." },
      // KÄLLA: https://www.nissesfisk.se/ — "Från vårt eget kök kommer det dagligen sillinläggningar, nykokta skaldjur, smarriga färdigrätter och goda pajer."; https://www.bodafisk.se/ — "Hos oss hittar ni både rökt fisk, färsk fisk, skaldjur och hemmagjorda såser!"; https://www.lansstyrelsen.se/kalmar/djur/hotade-arter/hotade-djur-och-vaxter/flodkrafta.html — "saluhålla, sälja, köpa eller transportera okokta kräftor som inte härrör från området,"
      { q: "Var köper man kräftor på Öland?", a: "De två fiskaffärer vi har kontrollerat anger skaldjur, inte kräftor specifikt: Nisses Fisk i Borgholm gör nykokta skaldjur i eget kök och Böda Fisk i Böda hamn säljer skaldjur – fråga dem om kräftor. Okokta kräftor utifrån får inte säljas, köpas eller transporteras på ön." },
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "Vill man vara petig med traditionen infaller kräftpremiären första veckan i augusti."; "1982 ändrades det till klockan 17 den första onsdagen i augusti"; "Från slutet av 1800-talet fram till år 1994 rådde förbud mot kräftfiske från november till början av augusti."
      { q: "När är kräftpremiären?", a: "Traditionen säger första veckan i augusti. Från 1982 började kräftfisket klockan 17 den första onsdagen i augusti, och även om förbudet upphävdes 1994 lever dagen kvar som tradition." },
      // KÄLLA: https://www.oland.se/resa/cykelfarjan — "Eftersom det råder cykel- och gångförbud på Ölandsbron"; https://kalmarlanstrafik.se/trafiken/bat/cykelfarjan-dessi/ — "Under perioden 15 juni – 16 augusti kan du resa med färjan m/s Dessi mellan Kalmar och Färjestaden"
      { q: "Kan man cykla över Ölandsbron?", a: "Nej, det är cykel- och gångförbud på bron. Under sommaren går cykelfärjan Dessi mellan Kalmar och Färjestaden, enligt Kalmar länstrafik 15 juni–16 augusti." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/eldning/ — "Använd en fast grillplats, eller välj grus eller sand som underlag."; "Om det är torrt i skog och mark kan länsstyrelsen eller kommunen besluta om eldningsförbud."; "Samla skräp och matrester i en påse och ta med den hem."
      { q: "Var kan man ha kräftskiva på Öland?", a: "Vi har inte hittat någon krog på Öland som på sin egen webbplats annonserar kräftskiva. Firar du utomhus: grilla på en fast grillplats eller på grus eller sand, kolla om det är eldningsförbud och ta med skräpet hem." },
    ],
  },
  {
    slug: "grebbestad-kraftskiva-2026",
    title: "Kräftskiva 2026 i Grebbestad – kräftskiva på västkusten",
    excerpt: "När har man kräftskiva 2026? Kräftpremiären var 5 augusti. Om kräftskiva på västkusten, havskräftor, fiskeregler och kräftkok i Grebbestad.",
    category: "Region", emoji: "🦐", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "Augusti är kräftskivornas tid."; https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "1982 ändrades det till klockan 17 den första onsdagen i augusti"
      { q: "När har man kräftskiva 2026?", a: "Det finns ingen bestämd dag, men augusti är kräftskivornas tid. Kräftpremiären räknas traditionellt till den första onsdagen i augusti, vilket 2026 var den 5 augusti." },
      // KÄLLA: https://www.vastsverige.com/en/bohuslan/seafood-safaris/crayfish-and-langoustine/ — "In West Sweden we have langoustine, which come from the sea and are available year round, as well as crayfish, a lake creature that can only be caught in late summer."; https://www.vastsverige.com/en/bohuslan/seafood-safaris/crayfish-and-langoustine/ — "in the coastal regions most people prefer it to crayfish"
      { q: "Vilka kräftor äter man på västkusten?", a: "På västkusten finns både havskräftor från havet, som går att köpa året runt, och sötvattenskräftor som bara fångas på sensommaren. Enligt Västsveriges turistråd föredrar de flesta längs kusten havskräftan." },
      // KÄLLA: https://tanumstrand.se/restaurant/sjoboden-udden/ — "Lördagar kokas det levande kräfta på beställning"; https://tanumstrand.se/attgora/kraftkok/ — "Vi väljer därför att ha uppehåll i kräftkoket under sommarperioden från midsommar till mitten på augusti."; https://www.vastsverige.com/tanum/se--gora/grebbestad/ — "Det är också här du hittar den populära bryggpromenaden med flera restauranger som serverar färsk fisk, räkor, ostron, hummer, krabba och havskräftor."
      { q: "Var kan man äta kräftor i Grebbestad?", a: "TanumStrand har kräftkok med havskräftor på lördagar i Sjöboden Udden längst ut på bryggan, som drop-in, med uppehåll från midsommar till mitten av augusti. Längs bryggpromenaden finns flera restauranger som serverar havskräftor." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/havskrafta---minimimatt-och-redskapsbegransningar.html — "Det är tillåtet att fritidsfiska havskräfta året runt."; https://www.vastsverige.com/tanum/se--gora/grebbestad/ — "Bästa tiden för skaldjur är höst och vinter då vattnet är kallt och friskt."
      { q: "När är kräftsäsongen för havskräfta?", a: "Havskräfta får fritidsfiskas året runt, i första hand med burar och högst sex burar per person. Turistorganisationen i Tanum skriver att höst och vinter är skaldjurens tid, när vattnet är kallt." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/signalkrafta---regler-for-fiske-och-hantering.html — "Det är bara i Vättern som allmänheten får fiska kräftor."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/signalkrafta---regler-for-fiske-och-hantering.html — "Som huvudregel får signalkräfta inte fiskas eller hanteras okokt utanför hanteringsområdet."
      { q: "Får man fiska kräftor i sjöarna i Bohuslän?", a: "Bara med tillstånd från den som har fiskerätten – fritt kräftfiske för allmänheten finns bara i Vättern. Norra Bohuslän ligger utanför hanteringsområdet för signalkräfta, och där får signalkräfta som huvudregel inte fiskas eller hanteras okokt." },
      // KÄLLA: https://www.vastsverige.com/tanum/service/res-hit/ — "Lokala bussar stannar vid tågstationen, så du kan ta dig vidare inom kommunen."; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014487800000/ — "Tanumshede - Grebbestad - Sportshopen"
      { q: "Hur tar man sig till Grebbestad?", a: "Med lokaltåget på Bohusbanan till Tanumshede och vidare med lokalbuss, till exempel Västtrafiks linje 878 Tanumshede–Grebbestad. Med bil går E6 genom Tanums kommun." },
    ],
  },
  {
    slug: "kraftskiva-recept-meny",
    title: "Kräftskiva recept och meny – allt du behöver 2026",
    excerpt: "Hur du kokar kräftor, klassisk kräftskivemeny, snapsvisor och dekoration. Komplett guide för en lyckad kräftskiva hemma eller ute i naturen.",
    category: "Praktisk", emoji: "🍽", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Hur kokar man kräftor?', a: 'Koka vatten med 3 msk salt och rikligt med dill per liter vatten. Lägg i levande kräftor och koka 6–8 minuter beroende på storlek. Lägg i lagen och kyl ner med lock. Bäst serverade kylt dagen efter att de dragit i lagen.' },
      { q: 'Vad serverar man till kräftskiva?', a: 'Klassisk meny: färsk dill, mandelpotatis, gräddfil, aioli, rostat bröd/knäckebröd och mjuk ost (lagrad). Snaps (aquavit), pilsner och lättdricka. Dessert: gräddtårta eller sommarfrukt.' },
      { q: 'Hur många kräftor per person behöver man?', a: 'Räkna med ca 500–800g kräftor per person som förrätt, 1–1,5 kg som huvudrätt. Kräftor är mättande trots att de verkar lättviktiga. Beställ lite extra – det är svårt att skatta rätt och kräftor försvinner fort.' },
    ],
  },
  // ── Batch D: Juli-serien 2026 ────────────────────────────────────────────────
  {
    slug: "juli-skargarden-2026-oar",
    title: "Juli i Stockholms skärgård 2026 – öar att besöka",
    excerpt: "Grinda, Möja, Sandhamn, Utö, Ornö och Nåttarö i juli: hur du tar dig dit med båt eller färja, vad som finns på ön och vad som gäller för biljetterna.",
    category: "Säsong", emoji: "☀️", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Du kan inte boka plats ombord på våra fartyg"; https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Då gör vi allt vi kan för att sätta in extra fartyg så att alla får plats."
      { q: "Måste man boka båten ut i skärgården i juli?", a: "Nej, det går inte att boka plats på Waxholmsbolagets båtar. Du går ombord vid bryggan. När många vill åka, till exempel vid midsommar, sätter Waxholmsbolaget in extra fartyg." },
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd."; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Ombord kan du köpa alla sorters Waxholmsbolaget-biljetter."
      { q: "Gäller SL-kortet på skärgårdsbåtarna?", a: "Bara mellan Strömkajen och Vaxholm med omnejd. Längre ut behöver du en Waxholmsbolaget-biljett för resten av resan, och den kan du köpa ombord. På båtarna mot södra skärgården via Baggensstäket gäller inte SL-biljetter." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/uto — "från Årsta brygga i Haninge går det att resa till Utö sju till åtta gånger om dagen sommartid"
      { q: "Hur tar man sig till Utö?", a: "Med Waxholmsbolagets båt från Årsta brygga i Haninge, som du når med pendeltåg och buss. På sommaren går båten sju till åtta gånger om dagen, och det går också båtar hela vägen från Stockholm." },
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/orno — "Ornö är södra skärgårdens största ö, och hit går det bilfärja från Dalarö året om."; https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/orno — "Här finns kyrka, mataffär, museum, krog och deli."
      { q: "Kan man ta bilen till Ornö?", a: "Ja. Det går bilfärja från Dalarö till Ornö året om. Öns centrum är Kyrkviken på östra sidan, med kyrka, mataffär, museum och krog." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/nattaro — "Med Waxholmsbolagets fartyg Utö Express från Nynäshamns Fiskehamn. Restiden är 30 minuter."; https://nynashamn.se/uppleva/skargard--batliv/nattaro — "Eftersom det inte finns några permanent boende på ön så är allt säsongsöppet under sommarperioden."
      { q: "Hur tar man sig till Nåttarö?", a: "Med Waxholmsbolagets Utö Express från fiskehamnen i Nynäshamn. Resan tar 30 minuter. Ingen bor permanent på ön, så krog, kiosker och handelsbod har bara öppet på sommaren." },
    ],
  },
  {
    slug: "juli-skargarden-2026-aktiviteter",
    title: "Juli i skärgården 2026 – aktiviteter: kajak, SUP, bad och bastu",
    excerpt: "Aktiviteter i Stockholms skärgård i juli: var du hyr kajak och SUP, snorkelleder, cykel på bilfria öar, bastu vid havet och vad som gäller vid eldningsförbud.",
    category: "Säsong", emoji: "🌊", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/snorkelleder/ — "Som till exempel på Björnö och Nåttarö där vi är stolta över våra snorkelleder."; https://skargardsstiftelsen.se/omraden/uto/ — "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis."; https://www.lansstyrelsen.se/stockholm/djur/fiske.html — "I havet längs kusten och i de fem stora sjöarna får du fiska fritt med handredskap utan fiskekort."
      { q: "Vad kan man göra i skärgården i juli?", a: "Paddla kajak eller SUP, snorkla längs Skärgårdsstiftelsens skyltade leder på Björnö och Nåttarö, cykla på öar som Utö och Möja, vandra, basta och fiska med handredskap utan fiskekort." },
      // KÄLLA: https://nattaro.se/aktiviteter/kajak/ — "Kajakerna finns att hyra i hamnkontoret i gästhamnen."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "kajak- och cykeluthyrning"; https://kanotcenter.com/sv/kajakuthyrning-stockholm-skargard/dagligen/ — "Uthyrning av kajak, kanot och SUP för några timmar eller en hel dag"
      { q: "Var kan man hyra kajak i Stockholms skärgård?", a: "Till exempel på Nåttarö (i hamnkontoret i gästhamnen), på Finnhamn, i Gruvbyn på Utö, hos Fejan Outdoor och hos Skärgårdens Kanotcenter vid Vaxholm." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero — "Bastun är öppen för alla och går inte att boka."; https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Du kan inte boka plats ombord på våra fartyg"
      { q: "Kan man boka aktiviteter spontant i skärgården på sommaren?", a: "Mycket kräver ingen bokning: fritt fiske med handredskap, snorkelleder, vandring och den öppna bastun på Bullerö, som inte går att boka. Uthyrning av kajak och SUP bokas hos respektive uthyrare. Plats på Waxholmsbolagets båtar går inte att boka." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du får ta med en vanlig cykel ombord i mån av plats."; https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Elcyklar och elsparkcyklar ska placeras utomhus på däck."
      { q: "Får man ta med cykel på Waxholmsbåten?", a: "Ja, en vanlig cykel får följa med i mån av plats utan extra kostnad. Personalen avgör om det finns plats, och elcyklar ska stå utomhus på däck." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/att-besoka-skyddad-natur/grilla/ — "Under torrperioder vår- och sommartid kan du utgå från att eldningsförbud är utfärdat."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/att-besoka-skyddad-natur/grilla/ — "Använd grill på ben eller anvisad eldstad, använd inte engångsgrill."
      { q: "Får man grilla i skärgården i juli?", a: "Bara om det inte råder eldningsförbud. Skärgårdsstiftelsen skriver att du under torrperioder på sommaren kan utgå från att eldningsförbud är utfärdat. Använd grill på ben eller anvisad eldstad och aldrig engångsgrill." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/snorkelleder/ — "De skyltade undervattenslederna är ca 200 meter långa och går som mest på tre meters djup."
      { q: "Var kan man snorkla i Stockholms skärgård?", a: "Skärgårdsstiftelsen har skyltade snorkelleder på Björnö och Nåttarö. De är ungefär 200 meter långa och som mest tre meter djupa." },
    ],
  },
  {
    slug: "juli-skargarden-2026-mat",
    title: "Juli i skärgården 2026 – mat, krogar och att grilla själv",
    excerpt: "Mat i skärgården i juli: krogar på Fjäderholmarna, Vaxholm, Grinda, Sandhamn och Utö, servering på båten, bordsbokning och reglerna för att grilla själv.",
    category: "Säsong", emoji: "🍤", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.rokeriet-fjaderholmarna.se/ — "1 Maj-13 Sep"; https://www.waxholmshotell.se/matochdryck — "är öppen maj till augusti!"; https://grinda.se/mat-fest/ — "Det anrika huset har blickat ut över Saxarfjärden sedan 1906"; https://www.sandhamns-vardshus.se/ — "Öppet varje dag från mitten av juni till mitten på september."; https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens."
      { q: "Vilka restauranger finns i Stockholms skärgård på sommaren?", a: "Bland annat Rökeriet och Fjäderholmarnas Krog på Fjäderholmarna, Verandan och sommarkrogen Kabyssen på Waxholms Hotell, Grinda Wärdshus, Sandhamns Värdshus och Sandhamn Seglarhotell samt Utö Värdshus. Många har bara öppet på sommaren, så kolla krogens egen sida." },
      // KÄLLA: https://grinda.se/oppettider/ — "Under säsong kan våra öppettider variera med kort varsel."; https://www.sandhamns-vardshus.se/ — "Boka gärna bord."
      { q: "Måste man boka bord i skärgårdsrestaurangerna på sommaren?", a: "Det finns ingen gemensam regel, men flera krogar ber om bokning. Grinda skriver att öppettiderna kan ändras med kort varsel och ber gästerna boka bord, och Sandhamns Värdshus skriver \"Boka gärna bord\"." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/att-besoka-skyddad-natur/grilla/ — "Använd grill på ben eller anvisad eldstad, använd inte engångsgrill."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/att-besoka-skyddad-natur/grilla/ — "Under torrperioder vår- och sommartid kan du utgå från att eldningsförbud är utfärdat."
      { q: "Får man grilla i skärgården på sommaren?", a: "Bara när det inte är eldningsförbud. Använd grill på ben eller en anvisad eldstad, aldrig engångsgrill, och gör aldrig upp eld direkt på berghällar. Under torrperioder kan du enligt Skärgårdsstiftelsen utgå från att det är eldningsförbud." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Det finns servering ombord på de allra flesta av våra fartyg."
      { q: "Finns det mat på Waxholmsbåtarna?", a: "Ja, det finns servering på de allra flesta av Waxholmsbolagets fartyg. I reseplaneraren och tidtabellen ser du om din båt har kafeteria eller restaurang." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "flera restauranger, livsmedelsaffär, kafé"; https://www.konsummoja.se/ — "Den stora butiken på Möja och som har öppet året runt."; https://grinda.se/mat-fest/ — "Nedanför Grinda Wärdshus ligger vår mysiga Lanthandel med tillhörande cafédel."; https://skargardsstiftelsen.se/omraden/finnhamn/ — "en gårdsbutik med grönsaker och produkter från de egna ekologiska odlingarna"
      { q: "Var kan man handla mat i skärgården?", a: "På Utö finns en livsmedelsaffär, på Möja har Coop Berg öppet året runt, på Grinda finns en lanthandel nedanför Wärdshuset och på Finnhamn en gårdsbutik på Idholmens gård." },
    ],
  },
  {
    slug: "semestervecka-skargarden",
    title: "En vecka i Stockholms skärgård – komplett dag-för-dag-guide",
    excerpt: "Sju dagar, sju öar och ett program som täcker allt från Vaxholm till Utö. Dag-för-dag-itinerary för den perfekta skärgårdssemestern.",
    category: "Praktisk", emoji: "🗓", readTime: "10 min", fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Hur planerar man en vecka i skärgården utan bil?', a: 'Använd Waxholmsbolagets båtluffarkort (ca 1 700 kr) för obegränsad åkning. Planera öar med vandrarhem längs en nord-sydlig rutt. Förslag: Strömkajen → Vaxholm → Grinda → Sandhamn → Utö → Nynäshamn (tur och retur med SL).' },
      { q: 'Hur mycket kostar en vecka i skärgården totalt?', a: 'Räkna med 8 000–15 000 kr per person för en vecka med vandrarhem/stuga, mat och transport. Med tält och eget matsäck kan du klara dig på 3 000–5 000 kr. Det är Sverige – skärgårdsresan är billigare än utlandsresan.' },
    ],
  },
  {
    slug: "sommarlov-skargarden-barn",
    title: "Sommarlov i skärgården med barn – 14 dagar i Stockholms skärgård",
    excerpt: "Skärgården med barn på sommarlovet: 14 dagar i Stockholms skärgård med Vaxholm, Grinda, Nåttarö och Utö, barnbiljetter och tips för klassresan.",
    category: "Praktisk", emoji: "👦", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "Det finns gott om barnvänliga, långgrunda sandstränder."; https://www.utovardshus.se/upptack-uto/ — "det finns både barnsits och cykelkärra att hyra"
      { q: "Vilka öar i Stockholms skärgård passar för barn på sommarlovet?", a: "Grinda har barnvänliga bad vid båda ångbåtsbryggorna, Nåttarö har långgrunda sandstränder och Utö har Barnens bad och cykeluthyrning med barnsits. Vaxholm och Fjäderholmarna ligger nära staden." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Invid ångbåtsbryggan finns en snorkelled"; https://www.vaxholmsfastning.se/besoksinfo/ — "För barn i åldern 4 -15 år pågår bl.a. dagligen en avgiftsfri barnaktivitet."
      { q: "Hur håller man barn sysselsatta i skärgården?", a: "Bad från sandstränder och klippor, snorkelleden vid ångbåtsbryggan på Nåttarö, cykling på Utö och de avgiftsfria barnaktiviteterna på Vaxholms Fästnings Museum är några exempel." },
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser/Enkelbiljetter/enkelbiljett-180-minuter — "går att köpa som gruppbiljett för upp till 100 personer"; https://www.waxholmsbolaget.se/biljetter-och-priser/Enkelbiljetter/enkelbiljett-180-minuter — "Måndag till fredag under perioden 1 september – 30 maj kan barn- och ungdomsgrupper få grupprabatt"
      { q: "Kan man göra klassresa till Stockholms skärgård?", a: "Ja. Waxholmsbolaget säljer gruppbiljetter för upp till 100 personer, och barn- och ungdomsgrupper kan få grupprabatt vid lägerskola och studiebesök måndag–fredag 1 september–30 maj." },
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris — "Barn som är under 7 år gamla reser utan avgift med annan betalande resenär."; https://www.waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du som reser med barn under 7 år får ta med barnvagn utan kostnad."
      { q: "Vad kostar skärgårdsbåten för barn?", a: "Barn under 7 år åker gratis med Waxholmsbolaget tillsammans med en betalande resenär. Från 7 år tills man fyller 20 betalar man ungdomspris. Barnvagn är gratis med barn under 7 år." },
      // KÄLLA: https://sl.se/biljetter/sortiment-och-regler/skolungdom/lovbiljett — "Biljetten gäller även för resa med Waxholmsbolagets båtar under lågsäsong (alltså alla lov förutom sommarlovet)."
      { q: "Gäller lovbiljetten på Waxholmsbåtarna på sommarlovet?", a: "Nej. SL:s lovbiljett gäller på Waxholmsbolagets båtar under alla lov utom sommarlovet." },
    ],
  },
  {
    slug: "vad-gora-regn-skargarden",
    title: "Vad göra i skärgården när det regnar – tips för en regndag",
    excerpt: "Regndag i skärgården? Museer, fästningar och bastu i Stockholms skärgård, och vad du kan göra i Bohuslän när det regnar: akvarium, museer och naturum.",
    category: "Praktisk", emoji: "🌧", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vaxholmsfastning.se/besoksinfo/ — "Öppettider maj-sept och allmän information säsongen 2026"; https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "I de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum"; https://grinda.se/aktiviteter/ — "Hyr en kajak, Stand Up Paddle boards eller bastu:"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero/ — "Det går inte att boka bastun så du kan behöva samsas med andra."
      { q: "Vad kan man göra i Stockholms skärgård en regndag?", a: "Besök Vaxholms Fästnings Museum på Kastellet, som har säsongsöppet maj–september, eller Sandhamns museum i Bryggstugan och Tullvaktstugan. Du kan också basta: på Grinda går bastun att hyra och på Bullerö finns en allmän bastu som inte går att boka." },
      // KÄLLA: https://www.havetshus.se/besok-oss/hitta-hit/ — "Havets Hus ligger i centrala Lysekil"; https://www.uddevalla.se/uppleva-och-gora/sevardheter/bohuslans-museum.html — "Fri entré."; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/nordiska-akvarellmuseet — "Nordiska Akvarellmuseet i Skärhamn öppnade sommaren 2000"; https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand/ — "Carlstens fästning är öppen för besök."; https://www.vitlyckemuseum.se/ — "Vitlycke museum - porten till världsarvet"; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "Här finns också ett klappakvarium där du kan få se några av Kosterhavets invånare."
      { q: "Vad finns att göra i Bohuslän när det regnar?", a: "Inomhus finns bland annat akvariet Havets Hus i Lysekil, Vitlycke museum vid Tanums hällristningar, Bohusläns museum i Uddevalla (fri entré), Nordiska Akvarellmuseet i Skärhamn, Carlstens fästning på Marstrand och naturum Kosterhavet." },
      // KÄLLA: https://grinda.se/aktiviteter/ — "Boka bastu"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero/ — "I närheten av båtbryggan och byn på Bullerö finns en bastu som är öppen för allmänheten."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero/ — "Barn och ungdomar upp till 17 år bastar gratis."
      { q: "Kan man basta i skärgården när det regnar?", a: "Ja. På Grinda kan du hyra bastu via Grinda Wärdshus. På Bullerö i Nämdöskärgårdens nationalpark finns en bastu nära båtbryggan som är öppen för allmänheten; den går inte att boka, ved finns vid bastun och barn upp till 17 år bastar gratis." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/meteorologi/aska/skydd-mot-blixten — "Badning och simning under åskväder ska undvikas eftersom det kan inträffa att blixten ibland slår ned i vatten."; https://www.smhi.se/kunskapsbanken/meteorologi/aska/skydd-mot-blixten — "Det är oftast relativt säkert att hålla sig inomhus under åskväder"
      { q: "Kan man bada eller vara i båt när det åskar?", a: "SMHI avråder. Blixten slår oftast ner i det som sticker upp, till exempel personer i båtar och vid stranden, och bad och simning ska undvikas eftersom blixten ibland slår ner i vatten. Inomhus är det oftast relativt säkert." },
      // KÄLLA: https://www.vaxholmsfastning.se/ — "Under vinterhalvåret håller vi endast öppet i samband med särskilda evenemang och lovaktiviteter."
      { q: "Är Vaxholms fästning öppen när det regnar på hösten och vintern?", a: "Museet på Vaxholms kastell har säsongsöppet maj–september. Under vinterhalvåret är det bara öppet vid särskilda evenemang och lovaktiviteter, så kolla programmet på museets sida." },
    ],
  },
  {
    slug: "juli-bohuslan-2026",
    title: "Bohusbåten och juli i Bohuslän 2026 – ångaren, orter och bad",
    excerpt: "Bohusbåten är i praktiken ångaren Bohuslän. Hennes kusttur i juli 2026, fästningsspelen i Marstrand och fakta om Smögen, Fjällbacka och Grebbestad i juli.",
    category: "Säsong", emoji: "🪨", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.goteborg.com/platser/sallskapet-angbaten — "Sällskapet Ångbåten bedriver båttrafik sommartid med Ångaren Bohuslän."; https://www.vastsverige.com/en/foretagprodukter/goteborg/angaren-bohuslan/ — "For over forty years she sailed between Gothenburg and Kungshamn 6 days a week"
      { q: "Vad är Bohusbåten?", a: "Svalla har inte hittat någon båtlinje som heter Bohusbåten. Den som söker menar troligen ångaren Bohuslän, byggd 1914, som Sällskapet Ångbåten kör på sommarturer från Stenpiren i Göteborg. Hon gick i över fyrtio år mellan Göteborg och Kungshamn." },
      // KÄLLA: https://steamboat.se/wp-content/uploads/2026/07/Turlista-2026-Angaren-BOHUSLAN-v2.pdf — "KUSTTUREN 9 – 13 juli"; https://steamboat.se/sv_se/bohuslan/ — "Torsdag 9 juli går BOHUSLÄN på en kusttur längs Ångarens ursprungliga linje mellan Göteborg och Kungshamn."
      { q: "Går ångaren Bohuslän längs Bohuskusten i juli?", a: "Ja, 2026 gjorde hon en kusttur 9–13 juli: Göteborg–Kungshamn via Gullholmen, Kungshamn–Fjällbacka, en rundtur i Fjällbacka skärgård och sedan Fjällbacka–Lysekil och Lysekil–Göteborg. Nästa års turlista publiceras på steamboat.se." },
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogen/ — "Vill du uppleva Smögen utan att behöva trängas med tusentals sommarturister? Kom hit under våren eller tidig höst"
      { q: "Hur undviker man trängsel i Bohuslän i juli?", a: "Västsverige råder den som vill slippa trängas med tusentals sommarturister på Smögen att komma på våren eller tidig höst i stället. Svalla har ingen källa för vilka tider i juli som har minst folk." },
      // KÄLLA: https://steamboat.se/sv_se/bohuslan/ — "Träbåtsfestivalen i Skärhamn infaller i år 3 till 5 juli."; https://carlsten.se/ — "Välkommen till de årliga Fästningsspelen på Carlstens fästning lördag – söndag 25-26 juli kl 12-18 2026"
      { q: "Vad händer i Bohuslän i juli 2026?", a: "Ångaren Bohuslän gjorde en kusttur 9–13 juli, Träbåtsfestivalen i Skärhamn hölls 3–5 juli och fästningsspelen på Carlstens fästning i Marstrand hölls 25–26 juli." },
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogen/ — "På den nästan 800 meter långa bryggan ligger sjöbodarna tätt och inhyser både butiker, caféer och restauranger."
      { q: "Hur lång är Smögenbryggan?", a: "Enligt Västsverige är Smögenbryggan nästan 800 meter lång, med sjöbodar som rymmer butiker, caféer och restauranger." },
    ],
  },
  {
    slug: "juli-gotland-2026",
    title: "När är Medeltidsveckan på Gotland 2026? Juli på Gotland",
    excerpt: "När är Medeltidsveckan på Gotland 2026? Den var 2–9 augusti (vecka 32) och 2027 blir den 8–15 augusti. Plus Gotlandsveckan, Vikingaveckan och juli på Gotland.",
    category: "Säsong", emoji: "🌻", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.medeltidsveckan.se/en/about-medieval-week/ — "Medieval Week lasts for eight days, from Sunday to Sunday, August 2-9, 2026."
      { q: "När är Medeltidsveckan på Gotland 2026?", a: "Medeltidsveckan 2026 pågick 2–9 augusti, från söndag till söndag. Datumet kommer från arrangörens webbplats medeltidsveckan.se." },
      // KÄLLA: https://www.medeltidsveckan.se/om-medeltidsveckan/ — "Festivalen varar åtta dagar från söndag veckan 31 till söndag vecka 32."; https://gotland.com/medeltidsveckan/ — "Välkommen till Medeltidsveckan 2026, 2-9 augusti!"
      { q: "Vilken vecka är Medeltidsveckan på Gotland 2026?", a: "Vecka 32. Festivalen varar åtta dagar, från söndagen i vecka 31 till söndagen i vecka 32 – 2026 var det 2–9 augusti." },
      // KÄLLA: https://gotland.com/events/medeltidsveckan-2026/ — "Medeltidsveckan pågår i åtta dagar, från söndag till söndag, 8-15 augusti, 2027."
      { q: "När är Medeltidsveckan 2027?", a: "8–15 augusti 2027, från söndag till söndag. Datumet står i Region Gotlands evenemangskalender på gotland.com, där Medeltidsveckan är arrangör." },
      // KÄLLA: https://gotland.com/stora-evenemang-pa-gotland/ — "STORA EVENEMANG PÅ GOTLAND 2026"; "22-26/6: Almedalsveckan"; "2-9/8: Medeltidsveckan"
      { q: "När är Gotlandsveckan 2026?", a: "Det finns inget evenemang som heter Gotlandsveckan i Region Gotlands lista över stora evenemang. De två stora veckorna 2026 var Almedalsveckan 22–26 juni och Medeltidsveckan 2–9 augusti." },
      // KÄLLA: https://www.stavgard.se/vikingavecka.html — "Vecka 31 2026"; "29 juli - 1 augusti"; https://www.stavgard.se/ — "Stavgard är en unik plats på Gotland, beläget på sydöstra sidan i Burs socken."
      { q: "När är Vikingaveckan på Gotland 2026?", a: "Stavgard vikingagård i Burs socken på sydöstra Gotland höll sin Vikingavecka 29 juli–1 augusti 2026, i vecka 31 – dagarna före Medeltidsveckan." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Drygt 3 timmar med färja"; "Cirka 30 minuter med flyg"; https://www.destinationgotland.se/ — "Se turlistan för Gotlandsfärjan mellan Nynäshamn, Oskarshamn och Visby."
      { q: "Hur tar man sig till Gotland i juli?", a: "Med Gotlandsfärjan från Nynäshamn eller Oskarshamn till Visby, som enligt Region Gotland tar drygt tre timmar, eller med flyg, som tar cirka 30 minuter. Se Destination Gotlands turlista för avgångar." },
      // KÄLLA: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser — "Stranden ligger i den norra delen av Tofta strand som sammanlagt är cirka en kilometer lång. Badplatsen är relativt långgrund."; "Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand."; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/allmant-om-region-gotlands-badplatser — "På flera ställen är det dessutom badförbud som exempelvis i hela Visby hamn samt flera av lanthamnarna."
      { q: "Var kan man bada på Gotland i juli?", a: "Till exempel på Tofta strand, som är cirka en kilometer lång och relativt långgrund, och Ekeviken på Fårö, en cirka 900 meter lång långgrund sandstrand. Bada inte i hamnarna – i hela Visby hamn är det badförbud." },
    ],
  },
  // ── Batch E: Barnvänligt-serien ──────────────────────────────────────────────
  {
    slug: "barnvanliga-oar-bohuslan",
    title: "Barnvänliga öar i Bohuslän – att göra med barn på västkusten",
    excerpt: "Öar i Bohuslän med barnbad, sandstrand och naturum – och vad man kan göra i Bohuslän med barn på Koster, Skaftö, Käringön, Åstol och Marstrand.",
    category: "Praktisk", emoji: "🏖", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "Här finns också ett klappakvarium där du kan få se några av Kosterhavets invånare."
      { q: "Vad kan man göra i Bohuslän med barn?", a: "På Sydkoster finns Naturum Kosterhavet med klappakvarium och fri entré, och vid Rörvik en markerad snorkelled. I Lysekil visar Havets Hus arter från Västerhavet, bland annat småfläckig rödhaj. Åstol har ett barnbad med rutschkana, och på Carlstens fästning på Marstrandsön hålls guidade turer i juni–augusti." },
      // KÄLLA: https://www.vastsverige.com/skafto/se--gora/upplev-havet/ — "Dessa personfärjor går i reguljär trafik (Västtrafik linje 847) året om alla dagar i veckan Östersidan-Fiskebäckskil-Lysekil."
      { q: "Vilka öar finns utanför Lysekil?", a: "Skaftö ligger strax utanför Lysekil, med Fiskebäckskil och Grundsund. Personfärjorna på Västtrafiks linje 847 går året runt mellan Lysekil, Fiskebäckskil och Östersidan. I Lysekils skärgård ligger också Stora Kornö, där naturreservatet Kalven på Kornö bara nås med egen båt eller taxibåt." },
      // KÄLLA: https://www.vastsverige.com/se-och-gora/batupplevelser/guide-till-skona-brygghang/ — "den lilla ön utan bilar, cyklar eller mopeder"
      { q: "Vilka öar i Bohuslän är bilfria?", a: "Käringön utanför Orust har varken bilar, cyklar eller mopeder. Sydkoster är nästan helt bilfri, och på Marstrandsön är biltrafik förbjuden – dit tar man personfärjan från Koön." },
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Åstols badplats har ett barnbad med en rutschkana, en liten sandstrand och klippor."
      { q: "Vilka öar i Bohuslän har barnbad eller långgrund sandstrand?", a: "Åstol utanför Tjörn har ett barnbad med rutschkana, en liten sandstrand och klippor. På Marstrandsön ligger Barnbadet med sandstrand, badstegar och trampolin. Sandtångens badplats på Hyppeln i Öckerö kommun har en långgrund sandstrand." },
      // KÄLLA: https://svenskalivraddningssallskapet.se/flytvastar/ — "För små barn som leker i eller nära vatten är en räddningsväst ett bra komplement till ständig uppsikt och ökar säkerheten."
      { q: "Behöver barn flytväst vid klippbad?", a: "Svenska Livräddningssällskapet skriver att räddningsvästar är bäst för barn och för den som inte kan simma. För små barn som leker i eller nära vattnet är en räddningsväst ett komplement till att en vuxen hela tiden håller uppsikt." },
      // KÄLLA: https://www.vasttrafik.se/resa-med-oss/fore-resan/aldersgranser/ — "Fritt antal barn reser gratis med resenär som har giltig biljett."
      { q: "Reser barn gratis på Västtrafiks båtar och färjor?", a: "Barn under 7 år reser gratis, i obegränsat antal, med någon som har giltig biljett. Ungdomar under 20 år får 25 procent rabatt på ordinarie biljettpris." },
    ],
  },
  {
    slug: "barnfamilj-gotland",
    title: "Barn på Gotland – Gotland med barn: grottor, bad och färja",
    excerpt: "Gotland med barn: Lummelundagrottans barntur, Villa Villekulla, minitåget runt ringmuren och stränder dit buss 10 går. Så reser barn på Gotland och till ön.",
    category: "Praktisk", emoji: "🏰", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://gotland.com/guide/barnens-gotland/ — "Det finns två djurparker på Gotland, Gotlands djurpark i Eskelhem och Stenkyrka Djurpark"; https://gotland.com/guide/barnens-gotland/ — "Det finns två olika tåg och de utgår från Skeppsbron i hamnen och utanför ringmuren vid Österport."; https://gotland.com/activities/kneippbyn-sommarland-och-vattenland/ — "I hjärtat av Sommarland ligger det riktiga Villa Villekulla"
      { q: "Vad kan man göra på Gotland med barn?", a: "Gotland.com tipsar bland annat om Lummelundagrottan, Gotlands Museum, Villa Villekulla i Kneippbyns sommarland, minitågen runt Visby ringmur, djurparkerna i Eskelhem och Stenkyrka, gotlandsrussen på Lojsta hed och museijärnvägen mellan Dalhem och Roma." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Oavsett vilken hamn du reser från så är restiden drygt tre timmar."; https://www.destinationgotland.se/priser-bokningsinfo/biljettyper-och-rabatter/rabatter/ — "Barn 0-12 år reser till rabatterat pris på personbiljetten. Rabatten varierar beroende på ålder."
      { q: "Hur tar man sig till Gotland med barn?", a: "Med Destination Gotlands färja från Nynäshamn eller Oskarshamn, restiden är drygt tre timmar, eller med flyg. Barn upp till 12 år reser till rabatterat pris på färjan och rabatten beror på åldern." },
      // KÄLLA: https://lummelundagrottan.se/grottan/guidade-visningar/visningsturen/ — "Ålder: alla åldrar"; https://lummelundagrottan.se/grottan/guidade-visningar/visningsturen/ — "Tidsåtgång: ca 40 minuter"; https://gotland.com/activities/barnturen-i-lummelundagrottan/ — "5-10 år, vuxna väntar utanför."
      { q: "Kan små barn gå in i Lummelundagrottan?", a: "Ja. Visningsturen är för alla åldrar och tar cirka 40 minuter. Det finns också en barntur för barn mellan 5 och 10 år där vuxna väntar utanför. Grottan har säsongsöppet, så kolla öppettiderna på lummelundagrottan.se." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Det finns kollektivtrafik på Gotland året runt, under sommaren utökas antalet turer på vissa linjer."; https://gotland.com/resa-hit-runt/ — "Det finns bilfri cykelväg längs med länsväg 140 från Visby till Klintehamn och längs länsväg 149 från Visby till Lummelunda."; https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "Bra bussförbindelse med buss 10 från Visby."
      { q: "Behöver man bil med barn på Gotland?", a: "Det går att klara sig utan. Bussar går året runt och fler turer går på sommaren. Buss 10 går från Visby till Tofta och Björkhaga, och det finns bilfri cykelväg från Visby till Klintehamn och till Lummelunda. Cyklar får följa med bussen i mån av plats mot en avgift." },
      // KÄLLA: https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "Fin långgrund sandstrand med brygga och rullstolsramp. Bra familjebad med pool, SUP- och kajakuthyrning, grillplats, kiosk och restaurang."; https://gotland.com/companies/sudersand/ — "Idealisk för barnfamiljer med mjuk len sand och långgrunt vatten."
      { q: "Vilka stränder på Gotland passar barn?", a: "Gotland.com kallar Björkhaga ett bra familjebad, med långgrund sandstrand, pool och grillplats. Sudersand på Fårö beskrivs som idealisk för barnfamiljer med långgrunt vatten. Tofta har pool, kiosker och butik, och buss 10 går dit från Visby." },
    ],
  },
  {
    slug: "barnvanliga-bad-skargarden",
    title: "Barnvänliga badplatser i Stockholms skärgård – bada med barn",
    excerpt: "Bada med barn i Stockholms skärgård: långgrunda sandstränder på Nåttarö och i Vaxholm, bad vid bryggan på Grinda, Fjäderholmarna och råd om flytväst.",
    category: "Praktisk", emoji: "🏊", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/fjaderholmarna — "Badar gör du från klippor med utsikt över Stockholms inlopp och vid de små sandstränderna."; "Fjäderholmarna är säsongsöppet mellan april och september."; https://www.visitstockholm.se/o/fjaderholmarnas-bad/ — "Åk till badvänliga klippor på Stockholms närmaste skärgårdsö"; https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "ÅTER MAJ 2027"
      { q: "Kan man bada med barn på Fjäderholmarna?", a: "Ja, men det är klippbad och små sandstränder. Explore Archipelago skriver att du badar från klippor med utsikt över Stockholms inlopp och vid de små sandstränderna, och Visit Stockholm kallar klipporna badvänliga. Ingen av källorna kallar stränderna långgrunda. Fjäderholmarna har säsongsöppet april–september, och Strömmas båt går igen från maj 2027." },
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "Det finns gott om barnvänliga, långgrunda sandstränder."; https://www.destinationvaxholm.se/sv/badplatser — "En långgrund, barnvänlig sandstrand."
      { q: "Var finns sandstrand i skärgården för små barn?", a: "Haninge kommun skriver att det finns gott om barnvänliga, långgrunda sandstränder på Nåttarö, där Storsand är mest känd. I Vaxholm beskriver Destination Vaxholm Fridhemsbadet på Bogesund som en långgrund, barnvänlig sandstrand." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."
      { q: "Vilket bad på Grinda passar barn?", a: "Enligt Länsstyrelsen finns barnvänliga bad vid både den södra och den norra ångbåtsbryggan, med torrdass vid badplatserna. Ett tredje bad finns i Källviken." },
      // KÄLLA: https://svenskalivraddningssallskapet.se/flytvastar/ — "För små barn som leker i eller nära vatten är en räddningsväst ett bra komplement till ständig uppsikt och ökar säkerheten."; "Barn ska alltid använda grenband."
      { q: "Behöver barn flytväst när de badar?", a: "Svenska Livräddningssällskapet skriver att en räddningsväst är ett bra komplement till ständig uppsikt när små barn leker i eller nära vatten. För barn som inte kan simma rekommenderar de en räddningsväst på 100 Newton, och barn ska alltid ha grenband." },
      // KÄLLA: https://www.destinationvaxholm.se/sv/badplatser — "Eriksöbadet erbjuder barnvänlig sandstrand med tillgång till klippor, brygga och toalett."; "Familjevänlig badplats med sandstrand, brygga och omklädningshytter."; https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"; https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Inför varje badsäsong kontrollerar dykare sjöbotten vid alla badbryggor."
      { q: "Var finns en barnvänlig strand nära Stockholm?", a: "I Vaxholm, en timme med båt från Strömkajen, beskriver Destination Vaxholm flera barnvänliga sandstränder: Johannesbergsbadet och Eriksöbadet på Vaxön, Fridhemsbadet på Bogesund och Överbybadet på Resarö. Vaxholms stad låter dykare kontrollera botten vid badbryggorna inför varje säsong." },
      // KÄLLA: https://www.osteraker.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.367d658917909e8fc2b985.html — "Barn och hundar bör vara extra försiktiga."; https://www.destinationvaxholm.se/sv/badplatser — "Eftersom vattnet är djupt är det inte lämpligt för ej simkunniga."
      { q: "Vad ska man tänka på när man badar med barn?", a: "Håll uppsikt hela tiden. Svenska Livräddningssällskapet skriver att en räddningsväst är ett bra komplement till ständig uppsikt när små barn leker i eller nära vatten. Undvik att bada när vattnet är tydligt grumligt eller färgat av alger – Österåkers kommun skriver att barn bör vara extra försiktiga. Välj bad som kommunen beskriver som långgrunda om barnet inte kan simma; vid djupa bad som Norrbergsbadet i Vaxholm avråder Destination Vaxholm för den som inte är simkunnig." },
    ],
  },
  {
    slug: "barnvanliga-batresor-skargarden",
    title: "Båttur med barn i Stockholms skärgård – biljetter och barnvagn",
    excerpt: "Båt med barn i Stockholm: vad barn betalar på Waxholmsbolaget, SL och Cinderellabåtarna, barnvagn ombord och båttur med barn till Vaxholm och Grinda.",
    category: "Transport", emoji: "⛴", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://sl.se/reseplanering/var-trafik/pendelbatarna — "Djurgårdsfärjan går mellan Räntmästartrappan/Slussen och Allmänna gränd på Djurgården, via Skeppsholmen."; https://sl.se/aktuellt/puls/upptack-stockholm-med-pendelbat — "Väljer du att hoppa av vid Allmänna gränd ligger ett flertal kända besöksmål bara några hundra meter bort, exempelvis Gröna Lund, Abbamuseet, Skansen och Vasamuseet."; https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"
      { q: "Vilken båttur i Stockholm passar med barn?", a: "För en kort första tur: SL:s pendelbåtar med vanlig SL-biljett, till exempel Djurgårdsfärjan från Slussen till Allmänna gränd, där Gröna Lund, Skansen och Vasamuseet ligger några hundra meter bort. Vill ni längre ut i skärgården tar Waxholmsbolagets båt från Strömkajen till Vaxholm en timme, och med SL-biljett får en vuxen ta med sex barn mellan 7 och 11 år utan kostnad." },
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris — "Barn som är under 7 år gamla reser utan avgift med annan betalande resenär."; https://sl.se/reseplanering/att-resa-med-sl/barns-resor-och-res-med-barn — "Du som är över 18 år och har en SL-biljett får ta med dig sex barn som fyllt 7 men inte 12 år utan kostnad"
      { q: "Åker barn gratis på Waxholmsbåten?", a: "Barn under 7 år reser utan avgift med en annan resenär som betalar. Från 7 år och tills man fyller 20 reser man till ungdomspris. Mellan Strömkajen och Vaxholm gäller även SL-biljett, och då får en vuxen ta med sex barn mellan 7 och 11 år utan kostnad." },
      // KÄLLA: https://www.waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du som reser med barn under 7 år får ta med barnvagn utan kostnad."; "Cykelkärra räknas inte som en barnvagn."
      { q: "Får man ta med barnvagn på Waxholmsbolagets båtar?", a: "Ja. Reser du med barn under 7 år följer barnvagnen med utan kostnad. Är barnet äldre, eller har du inget barn med dig, betalar du för vagnen. En cykelkärra räknas inte som barnvagn." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme."; https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"
      { q: "Hur lång tid tar båten till Vaxholm och Grinda?", a: "Enligt Waxholmsbolaget tar båten från Strömkajen till Vaxholm en timme och till Grinda ungefär en och en halv timme." },
      // KÄLLA: https://www.waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Du kan inte boka plats ombord på våra fartyg"; https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "När du har bokat en viss avgång har du förtur på den"
      { q: "Måste man boka båtturen i Stockholms skärgård i förväg?", a: "Inte på Waxholmsbolagets båtar – där kan du inte boka plats, utan går till bryggan och kliver ombord som i annan kollektivtrafik. Strömmas båt till Fjäderholmarna bokas däremot i förväg, och en bokad avgång ger förtur." },
      // KÄLLA: https://svenskalivraddningssallskapet.se/flytvastar/ — "100N-västar kallas ofta för räddningsvästar och är det bästa alternativet för barn och vuxna som inte kan simma."; "Barn ska alltid använda grenband."; "Uppblåsbara västar är tekniskt mer avancerade och rekommenderas inte till barn under 40 kilo"
      { q: "Vilken flytväst ska barn ha i båt?", a: "Svenska Livräddningssällskapet skriver att en räddningsväst på 100 Newton är det bästa alternativet för barn, att barn alltid ska ha grenband och att uppblåsbara västar inte rekommenderas till barn under 40 kilo." },
    ],
  },
  {
    slug: "barnvanliga-restauranger-skargarden",
    title: "Barnvänliga restauranger i skärgården – krogar med barnmeny",
    excerpt: "Barnvänlig restaurang i skärgården? Krogar som själva visar barnmeny: Grinda Wärdshus, Fjäderholmarnas Krog, Sandhamns Värdshus och Smådalarö Gård.",
    category: "Mat", emoji: "🍽", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://grinda.se/mat-fest/wardshuset/grinda-wardshus-menyer/ — "Till barnen / For the children:"; https://sandhamns-vardshus.se/meny/barnmeny — "Barnmeny / Childrens menu"; https://www.smadalarogard.se/restauranger/brasserie-branneri/barnmeny/ — "Barnmenyn serveras i vår restaurang Brasserie & Bränneri samt i Bloms Bar för barn till och med 12 år."
      { q: "Vilka restauranger i skärgården har barnmeny?", a: "Grinda Wärdshus, Fjäderholmarnas Krog, Sandhamns Värdshus och Smådalarö Gård visar alla barnmeny eller barnrätter på sina egna webbplatser. Kolla aktuell meny och öppettider hos krogen innan ni åker." },
      // KÄLLA: https://grinda.se/mat-fest/wardshuset/grinda-wardshus-menyer/ — "Pancakes with vanilla ice cream & strawberry jam."; https://grinda.se/mat-fest/lanthandel-cafe/ — "Blöjor och klämmisar."
      { q: "Finns det en barnvänlig restaurang på Grinda?", a: "Grinda Wärdshus har en del på menyn som heter Till barnen, med pannkakor med vaniljglass och köttbullar. I Grinda Lanthandel finns blöjor, klämmisar och ett lekskåp med spel." },
      // KÄLLA: https://www.fjaderholmarnaskrog.se/menyforslag-krogen — "BARNMENY"; https://www.fjaderholmarnaskrog.se/boka-online-2 — "Glöm ej att även boka plats för eventuella barn i ert sällskap."
      { q: "Har Fjäderholmarnas Krog barnmeny?", a: "Ja, krogen har en barnmeny för 2026 med bland annat köttbullar, hamburgare, pannkakor och vaniljglass. Boka plats även för barnen när du bokar bord." },
      // KÄLLA: https://sandhamns-vardshus.se/meny/barnmeny — "Puben, restaurangen, uteserveringen"
      { q: "Finns det barnmeny på Sandhamns Värdshus?", a: "Ja. Barnmenyn serveras i puben, restaurangen och på uteserveringen och har bland annat fish and chips, piratbiff och plättar med sylt och grädde." },
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du som reser med barn under 7 år får ta med barnvagn utan kostnad."
      { q: "Får man ta med barnvagn på skärgårdsbåten?", a: "Ja. På Waxholmsbolagets båtar får du ta med barnvagn utan kostnad om du reser med barn under 7 år." },
    ],
  },
  {
    slug: "barnvanliga-aktiviteter-skargarden",
    title: "Barnvänliga aktiviteter i skärgården – 20 tips",
    excerpt: "Klipphopp, kajak, sandslott och naturupptäckter. Allt barn kan göra i skärgården – organiserat och spontant. Guide för alla åldrar.",
    category: "Aktivitet", emoji: "🎯", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka aktiviteter är bäst för barn i Stockholms skärgård?', a: 'Klipphopp (från ca 8 år), kayak för barn (7+ år), snorkling med mask och snorkel, krabbbfångst vid stenarna, naturupplevelser med bärplockning och insektsfångst. Skärgårdens natur är aktivitetsparken – inget behöver bokas.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar aktiviteter för barn i skärgården?', a: 'Badning, klipphopp och naturutflykter är gratis. Kajakhyrning kostar ca 100–200 kr/timme. Organiserade barnaktiviteter på öarna kostar 100–300 kr/barn. Budgetsemestern i skärgården är faktiskt möjlig.' },
    ],
  },
  // ── Batch E: Bad-serien ────────────────────────────────────────────────────────
  {
    slug: "basta-badplatser-bohuslan",
    title: "Badplatser i Bohuslän 2026 – klippor, sand och öar",
    excerpt: "Från Seläter och Furholmen vid Strömstad till Hållös Marmorbassäng och Stångehuvud i Lysekil – badplatserna längs Bohuslänskusten, med fakta från kommunerna.",
    category: "Aktivitet", emoji: "🌊", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: Strömstads kommun badplatser; Sotenäs kommun badplatser Smögen och Kungshamn; Länsstyrelsen Västra Götaland Hållöarkipelagen, Ramsvikslandet, Stångehuvud, Tjurpanneområdet (alla lästa 2026-09-21) — se guide-content.ts. Tidigare svar nämnde Varberg och Tylösand, som ligger i Halland.
      { q: 'Vilka badplatser finns i Bohuslän?', a: 'Några med fakta från kommun eller Länsstyrelse: Seläter, Furholmen och Styrsö vid Strömstad, naturreservatet Capri, Tjurpannan vid Grebbestad, Badberget i Fjällbacka, Marmorbassängen på Hållö, Sandö och Vallevik på Smögen, Ramsvikslandet, Stångehuvud och Pinnevik i Lysekil, och föreningsbaden på Orust.' },
      // KÄLLA: Strömstads kommun, badplatser (läst 2026-09-21) — Seläter sandstrand, hopptorn, vattenrutschkana; Furholmen sandstrand 10 min båt från norra hamnen. Sotenäs kommun — Sandö sandstrand med handikapptrappa, omklädningsrum
      { q: 'Var finns sandstrand i Bohuslän?', a: 'Seläter nordväst om Strömstad har sandstrand, hopptorn och vattenrutschkana. Furholmen, tio minuter med båt från Strömstads norra hamn, har sandstrand och klippor. På Smögen är Sandö kommunens sandstrand med bryggor och omklädningsrum.' },
      // KÄLLA: Havs- och vattenmyndigheten, badplatser i Strömstads kommun (läst 2026-09-21) — provsvar per bad, prognos på vattentemperatur från Copernicus för kustbad
      { q: 'Hur varmt är vattnet i Bohuslän?', a: 'Det varierar från dag till dag. Havs- och vattenmyndigheten visar provsvar och, för kustbad, en prognos på vattentemperaturen för varje registrerad badplats – kolla där innan du åker.' },
    ],
  },
  {
    slug: "basta-badplatser-gotland",
    title: "Bästa stränderna på Gotland? Stränder och badplatser 2026",
    excerpt: "Gotland stränder från Visby till Fårö: långgrunda sandstränder, badplatser med buss och ramp, hundregler och var du ser badtemperatur och vattenkvalitet.",
    category: "Aktivitet", emoji: "🏖", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "Idealisk för barnfamiljer med mjuk len sand och långgrunt vatten."; "Här finns restauranger, strandbarer, kiosker, pool, after beach, padelbanor, livsmedelsbutik och mycket mer."; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser — "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand"
      { q: "Vilka är de bästa stränderna på Gotland?", a: "Det finns ingen officiell rangordning. Vilken strand som passar beror på vad du vill ha: gotland.com beskriver Sudersand på Fårö som idealisk för barnfamiljer, Tofta har restauranger, pool och butik, och Norsta Aurar på Fårö är enligt Region Gotland cirka fem kilometer lång." },
      // KÄLLA: https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "Bussförbindelse till Snäck och Gustavsvik med buss 4."; "Bra bussförbindelse med buss 10 från Visby och stor parkering."; "Bra bussförbindelse från Visby med buss 20 och 22."; "Under sommaren finns bussförbindelse med buss 20."; "Under sommaren finns bussförbindelse med buss 11/13."
      { q: "Kan man ta bussen till stränderna på Gotland?", a: "Ja, till flera. Buss 4 går till Snäck och Gustavsvik, buss 10 till Tofta och Björkhaga, buss 20 och 22 till Slite och på sommaren buss 20 till Sudersand och buss 11/13 till Ljugarn." },
      // KÄLLA: https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "den funtionsanpassade stranden Gustavsvik (badrullstol finns att låna hos Visby Gustavsvik)"; "Funktionsanpassad badplats med ramp, badrullstol finns att låna genom Slite intresseförening"; "Fin långgrund sandstrand med brygga och rullstolsramp."; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser — "Det finns en badlyft på bryggan för att smidigt kunna hjälpa personer med funktionsvariationer ner i vattnet."; "Här badar du från bryggans stegar eller den tillgängliga rampen som slingrar sig ner i vattnet."
      { q: "Vilka badplatser på Gotland är tillgängliga med rullstol?", a: "Gustavsvik är funktionsanpassad och badrullstol lånas hos Visby Gustavsvik. Slite har ramp och badrullstol att låna, Björkhaga har rullstolsramp och Kallisbadet i Visby har ramp och badlyft på bryggan." },
      // KÄLLA: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser — "Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand."; "Badplatsen Herta är en cirka 400 meter lång, långgrund, sandstrand."; "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand"; "Badplatsen Skalasand på Fårö är en drygt 800 meter lång, långgrund, sandstrand."; "Badplatsen Sandviken är en drygt kilometerlång, långgrund, sandstrand"; "Badplatsen Ireviken (eller Ihreviken) är en cirka 400 meter lång, långgrund, sandstrand"; "Slite bad är en drygt 200 meter lång, långgrund, sandstrand"; "Stranden ligger i den norra delen av Tofta strand som sammanlagt är cirka en kilometer lång. Badplatsen är relativt långgrund."
      { q: "Vilka stränder på Gotland är långgrunda?", a: "Enligt Region Gotland är bland annat Ekeviken, Norsta Aurar och Skalasand på Fårö, Herta i När, Sandviken i Östergarn, Ireviken och Slite bad långgrunda sandstränder. Tofta strand är relativt långgrund." },
      // KÄLLA: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/allmant-om-region-gotlands-badplatser — "Enligt regionens Allmänna lokala ordningsföreskrifter får hundar under perioden 1 maj – 30 september inte vistas på vissa utpekade badplatser."; "Under perioden 1 mars–20 augusti får hunden inte springa lös på stranden"; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser — "Badplatsen Gustavsvik är en drygt 200 meter lång, långgrund, sandstrand med inslag av grus. Marken vid denna badplats ägs av Region Gotland. Hundförbud gäller vid badplatsen 1 maj – 30 september."; "Slite bad är en drygt 200 meter lång, långgrund, sandstrand där marken ägs av Region Gotland. Hundförbud gäller vid badplatsen 1 maj – 30 september."; "Badplatsen Norderstrand är en cirka 200 meter lång, mycket långgrund, strand med grov sand och stenbotten där badandet i huvudsak sker från brygga. Marken vid badplatsen ägs av Region Gotland och hundförbud gäller vid badplatsen 1 maj – 30 september"
      { q: "Får man ha med hund på stranden på Gotland?", a: "Mellan 1 maj och 30 september får hundar inte vara på vissa utpekade badplatser, till exempel Gustavsvik, Norderstrand och Slite bad. Mellan 1 mars och 20 augusti får hunden inte springa lös på stranden." },
      // KÄLLA: https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "På Bad Gotland kan du se aktuell badtemperatur, lufttemperatur och eventuell algblomning."; https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-pa-gotland.html — "Klicka på badplatsen för att få mer information om till exempel den senaste provtagningen och badplatsens klassificering."
      { q: "Var ser man badtemperatur och vattenkvalitet på Gotland?", a: "Aktuell badtemperatur och eventuell algblomning visas på Bad Gotland, som gotland.com länkar till. Provresultat och klassning för varje badplats finns på Havs- och vattenmyndighetens webbplats." },
    ],
  },
  {
    slug: "klippbad-skargarden",
    title: "Klippbad i Stockholms skärgård – klippor att bada och hoppa från",
    excerpt: "Klippbad i Stockholms skärgård och nära Stockholm, med bil, buss eller båt. Var du kan hoppa från klippor och Livräddningssällskapets råd innan du hoppar.",
    category: "Aktivitet", emoji: "🪨", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/torpesand.html — "En ca 120 meter lång sandstrand samt ett klippbad beläget i Björnö naturreservat."
      { q: "Var finns klippbad i Stockholms skärgård?", a: "Utan båt når du bland annat klippbadet vid Torpesand i Björnö naturreservat, Brännholmens klippor på Östra Lagnö (Ljusterö), Eriksö badplats och Norrbergsbadet i Vaxholm och Hamnviken i Nynäshamn. Med reguljär båt finns klippor vid Källviken på Grinda, på Finnhamn, Stora Kalholmens östra sida, Slottsudden på Nåttarö, runt Utö och på Arholma." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bjorno.html — "Buss från Slussen mot Björkviks brygga, hållplats Björkviks gård."
      { q: "Finns det klippbad nära Stockholm utan båt?", a: "Ja. Till Torpesand i Björnö naturreservat på Ingarö går buss från Slussen mot Björkviks brygga, hållplats Björkviks gård. Till Brännholmens klippor i Östra Lagnö på Ljusterö kommer du med bil eller SL-buss via färjan. I Vaxholm finns klippbad vid Eriksö, Norrbergsbadet och Norrhamnsbadet, och i Nynäshamn längs Strandvägen och vid Hamnviken." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/bada — "Bonus är de höga klipporna varifrån det går alldeles utmärkt att hoppa. Egen båt eller egen bil krävs för att ta sig hit."
      { q: "Var kan man hoppa från klippor i Stockholm?", a: "Nynäshamns kommun skriver att det går bra att hoppa från de höga klipporna vid Rassa vikar (Käringboda), dit du behöver egen båt eller bil. Kommunen anger inte djupet. Vill du hoppa från ett hopptorn finns det vid Eriksö badplats i Vaxholm och Nickstabadet i Nynäshamn." },
      // KÄLLA: https://svenskalivraddningssallskapet.se/wp-content/uploads/2026/06/badvett.pdf — "Hoppa och dyka bara om det är tillräckligt djupt."
      { q: "Hur hoppar man säkert från klippor?", a: "Svenska Livräddningssällskapets badvett säger: hoppa och dyka bara om det är tillräckligt djupt, gå försiktigt på brygga, klippa eller bassängkant, undvik att simma under brygga eller hopptorn och ha alltid sällskap med dig när du badar. Ingen av källorna i guiden anger vattendjup vid klippbaden, så kontrollera djupet själv först." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Du gör allemansrätt när stranden, klippan eller bryggan du lånar ligger långt ifrån någons hus."
      { q: "Får man bada från vilken klippa som helst?", a: "Enligt Naturvårdsverket gör du allemansrätt när klippan eller stranden du använder ligger långt från någons hus. Du får inte bada på någons tomt, och i naturreservat gäller reservatets regler." },
    ],
  },
  {
    slug: "sandstrand-skargarden",
    title: "Sandstrand i skärgården – sandstränder i Stockholms skärgård",
    excerpt: "Sandstrand i skärgården: sandstränder i Stockholms skärgård på Sandhamn, Nåttarö, Utö och Grinda, och stränder nära Stockholm med bil, buss eller tåg.",
    category: "Aktivitet", emoji: "🏝", readTime: "4 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand och Skarsand är de största sandstränderna."
      { q: "Finns det sandstrand i Stockholms skärgård?", a: "Ja. På öarna finns bland annat Trouville med vit sand på Sandhamns södra sida, Storsand och Skarsand på Nåttarö, Rävstavik och Barnens bad på Utö och Storsand på Ålö. Utan båt når du till exempel Torpesand och Stora Sandarna på Ingarö, Grisslinge havsbad, Nickstabadet i Nynäshamn och Solbrännan i Österåker." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand i öster är en av skärgårdens längsta sandstränder med stora sanddyner."
      { q: "Var finns den längsta sandstranden i Stockholms skärgård?", a: "Länsstyrelsen skriver att Storsand på Nåttarös östra sida är en av skärgårdens längsta sandstränder, med stora sanddyner. Av baden på fastlandet är Nickstabadet i Nynäshamn cirka 600 meter långt, enligt Havs- och vattenmyndigheten." },
      // KÄLLA: https://www.osteraker.se/upplevagora/badplatser.106.44fe6fa019e40e754cd685a.html — "När du kliver av vid Österskärs station har du fem minuters promenad längs Österskärsvägen fram till badet vid Trälhavet."
      { q: "Vilka sandstränder nära Stockholm når man utan båt?", a: "Solbrännan (Österskärs havsbad) ligger fem minuters promenad från Roslagsbanans Österskärs station. Stora Sandarna på Ingarö ligger cirka 500 meter från busshållplats, och till Schweizerbadet på Dalarö är närmaste busshållplats Schweizerparken. Torpesand i Björnö naturreservat har buss från Slussen." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Rävstavik och Barnens bad erbjuder långgrunda sandstränder som passar barnfamiljer"
      { q: "Vilka stränder i Stockholms skärgård är långgrunda och passar barn?", a: "Skärgårdsstiftelsen skriver att Rävstavik och Barnens bad på Utö har långgrunda sandstränder som passar barnfamiljer. Schweizerbadet på Dalarö, Nickstabadet i Nynäshamn och Fridhemsbadet vid Karlsudd i Vaxholm beskrivs också som långgrunda." },
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn — "Ingen provtagning av badvatten utförs av Värmdö kommun."
      { q: "Hur vet jag om vattnet är bra att bada i?", a: "Havs- och vattenmyndighetens sida för varje badplats visar kommunens senaste provsvar och om det pågår algblomning. Alla stränder provtas inte – Värmdö kommun tar till exempel inga prover vid Trouville på Sandhamn." },
      // KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/backby/ — "Hundar får inte vistas på allmän badplats mellan 15 maj och 15 september."
      { q: "Får man ha med hund på sandstranden?", a: "Det beror på kommunen. I Norrtälje får hundar inte vara på allmänna badplatser mellan 15 maj och 15 september. I Nynäshamn får hundar vara på kommunens anlagda badplatser, till exempel Nickstabadet, bara september–maj." },
    ],
  },
  {
    slug: "hemliga-badplatser-skargarden",
    title: "Bada i skärgården – badklippor och vikar i Stockholms skärgård",
    excerpt: "Bada i skärgården: badplatser i Stockholms skärgård som kommunerna och Skärgårdsstiftelsen tipsar om, med egen båt eller skärgårdsbåt, och reglerna.",
    category: "Aktivitet", emoji: "🗺", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/stora-kalholmen/ — "Hit tar du dig med Waxholmsbolagets skärgårdsbåtar från Strömkajen i Stockholm eller via Åsättra på Ljusterö."; https://skargardsstiftelsen.se/omraden/gallno-karklo/ — "Hit tar du dig enkelt med Waxholmsbåt från Stockholm."; https://skargardsstiftelsen.se/omraden/lido/ — "Hit tar du dig med reguljär skärgårdsbåt från Räfsnäs året runt."; https://skargardsstiftelsen.se/omraden/ostra-lagno/ — "Hit tar du dig med bil eller SL-buss via färjan till Ljusterö."
      { q: "Var kan man bada i Stockholms skärgård utan egen båt?", a: "Till exempel på Stora Kalholmen och Gällnö, dit Waxholmsbolagets båtar går, på Lidö med skärgårdsbåt från Räfsnäs, vid Östra Lagnö på Ljusterö som du når med SL-buss, och längs Strandvägen och vid Lövhagen i Nynäshamn." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/bada — "klipporna på utsidan av Skvallerhamn. Egen båt krävs."; https://nynashamn.se/uppleva/skargard--batliv/bada — "Egen båt krävs för att ta sig hit."; https://skargardsstiftelsen.se/omraden/boskapso/ — "Boskapsö saknar reguljär båttrafik och nås enklast med egen båt eller kajak."; https://skargardsstiftelsen.se/omraden/trasko-storo/ — "Hit tar du dig med egen båt."; https://skargardsstiftelsen.se/omraden/jungfruskar/ — "Jungfruskär nås med egen båt eller taxibåt från Nämdöområdet."
      { q: "Vilka badplatser i skärgården når man bara med egen båt?", a: "Bland annat Skvallerhamn på Järflotta och Sandskär (Picklahej) utanför Nynäshamn, Boskapsö öster om Nämdö, Träskö-Storö, samt Jungfruskär och Vidinge, dit det också går taxibåt." },
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten.html — "Här redovisas vattenkvalitet, temperatur, algblomning, klassificering och annan information om din specifika badplats."; https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser.html — "Nedan kan du läsa om Vaxholms stads badplatser på respektive ö."
      { q: "Hur hittar man badställen i Stockholms skärgård?", a: "Kommunernas badplatssidor, som Vaxholms och Nynäshamns, beskriver badplatserna och vägen dit. Havs- och vattenmyndighetens sida Badplatser och badvatten visar vattenkvalitet, temperatur och algblomning, och Skärgårdsstiftelsen beskriver baden i sina områden." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Vid fågel- eller sälskyddsområden får du inte stiga iland under en viss tid av året."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Förbuden märks ofta ut med gula eller röd/gula skyltar."
      { q: "Får man bada från vilken ö eller klippa som helst?", a: "Du får gå i land och bada vid stränder som inte hör till en tomt och inte är skyddade för fågelliv. Vid fågel- och sälskyddsområden är det landstigningsförbud under en del av året, ofta utmärkt med gula eller rödgula skyltar." },
      // KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser.html — "Under badsäsongen sker vattenprovtagningar var tredje vecka och detta görs mellan 20 juni och 15 augusti i Stockholms län"; https://www.havochvatten.se/badplatser-och-badvatten.html — "Kommunerna står för provtagning och insamling av data som ligger till grund för informationen."
      { q: "När testas badvattnet i Stockholms skärgård?", a: "I Stockholms län tas vattenprover var tredje vecka mellan 20 juni och 15 augusti. Resultaten från kommunernas provtagning finns på Havs- och vattenmyndighetens sida Badplatser och badvatten." },
    ],
  },
  {
    slug: "bad-med-bastu-skargarden",
    title: "Finnhamn bastu och Utö bastu – bad och bastu i skärgården",
    excerpt: "Finnhamn bastu vid stranden bokas på finnhamn.se och tar 15 personer. Utö bastu finns i gästhamnen och vid inloppet. Plus Grinda, Nåttarö och Bullerö.",
    category: "Aktivitet", emoji: "🧖", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://finnhamn.se/butik/boka-bastu/ — "Finnhamn har fått en ny fin bastu under våren 2023."; https://finnhamn.se/butik/boka-bastu/ — "Den är belägen intill stranden vid butik och krog och tar upp till 15 personer."
      { q: "Finns det bastu på Finnhamn?", a: "Ja. Finnhamn fick en ny bastu våren 2023. Den ligger intill stranden vid butiken och krogen och tar upp till 15 personer. Under den bokade tiden har du tillgång till bastun, omklädningsrummet och verandan." },
      // KÄLLA: https://finnhamn.se/boende/ — "Bastun bokas genom vår hemsida, du finner bokningen på förstasidan."; https://finnhamn.se/butik/boka-bastu/ — "Man kan boka bastun privat genom att boka upp samtliga 15 platser."; https://finnhamn.se/butik/boka-bastu/ — "Avbokning av er bastutid skall ske senast kl 18:00 dagen innan."
      { q: "Hur bokar man bastu på Finnhamn?", a: "Du bokar bastun på finnhamn.se, där bokningen ligger på förstasidan. Vill ni ha den för er själva bokar ni alla 15 platserna. Avbokning ska ske senast klockan 18 dagen innan." },
      // KÄLLA: https://www.utogasthamn.se/gasthamnen/ — "Hos oss finns dusch, bastu och toaletter."; https://www.utogasthamn.se/gasthamnen/ — "Ligger du med båten över natten ingår detta i hamnavgiften."; https://www.explorearchipelago.com/sthlm/sodra-skargarden/uto/aktiv-skargard-bastu — "Vi har fyra badtunnor och bastu precis vid inloppet till Utö."
      { q: "Finns det bastu på Utö?", a: "Ja. Utö gästhamn har dusch, bastu och toaletter, och för båtgäster som ligger över natten ingår det i hamnavgiften. Vid inloppet till Utö har Aktiv Skärgård fyra badtunnor och en bastu." },
      // KÄLLA: https://www.utogasthamn.se/oppet-och-kontakt/ — "Om du vill besöka gästhamnen under lågsäsong och få tillgång till toalett, dusch och bastu – kontakta receptionen på Utö Värdshus"
      { q: "Kan man basta på Utö utanför sommaren?", a: "Utö gästhamn hänvisar till receptionen på Utö Värdshus för den som vill ha tillgång till toalett, dusch och bastu under lågsäsong." },
      // KÄLLA: https://grinda.se/aktiviteter/ — "Hyr en kajak, Stand Up Paddle boards eller bastu:"; https://nattaro.se/aktiviteter/basta-pa-var-o/ — "På Nåttarö kan du välja på två olika bastumiljöer."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero — "Bastun är öppen för alla och går inte att boka."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero — "Här finns också en badstege om du vill ta ett dopp i havet."
      { q: "Var finns bastu och havsbad i Stockholms skärgård?", a: "Förutom på Finnhamn och Utö finns bastu att hyra på Grinda, två bastur på Nåttarö och en bastu som är öppen för alla på Bullerö i Nämdöskärgårdens nationalpark. Bullerö-bastun går inte att boka, och där finns en badstege ner i havet." },
    ],
  },
  // ── Batch F: Beslutsguider ────────────────────────────────────────────────────
  {
    slug: "uto-vs-sandhamn",
    title: "Utö vs Sandhamn – vilken ö passar dig?",
    excerpt: "Utö är lugnt med gruvhistoria och havsbastu. Sandhamn är segling och folkfest. En ärlig jämförelse av skärgårdens två mest älskade öar.",
    category: "Region", emoji: "⚖", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Vad är skillnaden mellan Utö och Sandhamn?', a: 'Sandhamn är seglarsocieteten, restauranger och sommarfest – mer folklig och social. Utö är naturen, järngruvhistorian, havsbastun och cyklingen – lugnare och mer familjeorienterat. Sandhamn är skärgårdens Stureplan; Utö är natursemestern.' },
      { q: 'Vilken ö är bäst för barnfamiljer – Utö eller Sandhamn?', a: 'Utö vinner klart för barnfamiljer. Sandstränder (Barnens bad, Stora Sand), cykelvägar, havsbastu och ett mer avslappnat tempo. Sandhamn är bättre för vuxna och par som söker seglarliv och restauranger.' },
      { q: 'Hur tar man sig till Utö respektive Sandhamn?', a: 'Sandhamn nås med Waxholmsbolaget via Stavsnäs (buss 833 från Slussen) – ca 1,5 h totalt. Utö nås via Nynäshamn med båt (ca 1 h) eller via Dalarö. Sandhamn är generellt lite lättare att nå.' },
    ],
  },
  {
    slug: "marstrand-vs-smogen",
    title: "Marstrand vs Smögen – Bohusläns rivaler",
    excerpt: "Marstrand är fästning och regatta. Smögen är räkor och klippliv. Vilket Bohuslän passar dig bäst?",
    category: "Region", emoji: "⚖", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'Vad är skillnaden på Marstrand och Smögen?', a: 'Marstrand har Carlstens fästning, Sverige Race och ett mer urbant promenadstråk. Smögen är mer autentiskt fiskläge med Smögenbryggan, räkor och klippbad. Marstrand lockar regattafans; Smögen lockar räkälskare och klipphoppar.' },
      { q: 'Vilket är enklast att ta sig till – Marstrand eller Smögen?', a: 'Marstrand är lättast – ca 6 mil norr om Göteborg, bil till Koön + 5 min bilbåt (gratis). Smögen är ca 15 mil norr om Göteborg med Västtrafik buss eller bil via rv171. Marstrand vinner på tillgänglighet.' },
    ],
  },
  {
    slug: "gotland-vs-bohuslan",
    title: "Gotland vs Bohuslän – stor semesterjämförelse 2026",
    excerpt: "Östersjöns kalkstensö mot Västerhavets klippkust. En grundlig jämförelse av Sveriges två hetaste sommardestinationer.",
    category: "Region", emoji: "🗺", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Gotland eller Bohuslän – vad väljer man?', a: 'Välj Gotland för en sammanhängande öupplevelse med medeltidsstad, sandstränder och raukar. Välj Bohuslän för klippliv, skaldjur, hav och flexibiliteten att hoppa mellan platser längs kusten. Gotland kräver mer planering och längre resa.' },
      { q: 'Är Gotland eller Bohuslän dyrare?', a: 'Gotland är generellt dyrare, speciellt juli (Medeltidsveckan). Boende i Visby kan kosta 50–100% mer än liknande standard i Bohuslän. Bohuslän är mer prisvärt och varierat i utbud.' },
    ],
  },
  {
    slug: "inre-vs-yttre-skargard",
    title: "Yttre skärgården vs inre skärgård – skillnaden i Stockholm",
    excerpt: "Yttre skärgården är öppet hav med glest spridda öar och kala hällar. Så skiljer sig Stockholms yttre skärgård från inre skärgården och mellanskärgården.",
    category: "Praktisk", emoji: "🧭", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.nacka.se/boende-miljo/natur-och-parker/sjoar-och-kustvatten/tre-sorters-skargard/ — "Ytterskärgården är ett stort område där det öppna havet bryts av glest spridda öar och kala hällar."
      { q: "Vad är yttre skärgården?", a: "Yttre skärgården, eller ytterskärgården, är den del av skärgården där det öppna havet bryts av glest spridda öar och kala hällar. Den ligger längst ut, utanför mellanskärgården." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "Svenska Högarna är en ögrupp i Norrtälje kommun, längst österut i Stockholms ytterskärgård."; https://skargardsstiftelsen.se/omraden/gronskar/ — "Grönskär är en av skärgårdens yttersta utposter, belägen öster om Sandhamn där havet tar vid mot Östersjön."; https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Det är ett utmärkt resmål för alla som vill göra en utflykt till den yttre skärgården."; https://skargardsstiftelsen.se/omraden/namdo/ — "Nämdö ligger i Värmdös ytterskärgård."
      { q: "Vilka öar ligger i Stockholms yttre skärgård?", a: "Till exempel Svenska Högarna, som ligger längst österut, Grönskär öster om Sandhamn och ögruppen Huvudskär i söder. Waxholmsbolaget räknar Sandhamn som ett resmål i yttre skärgården, och Skärgårdsstiftelsen placerar Nämdö i Värmdös ytterskärgård." },
      // KÄLLA: https://www.nacka.se/boende-miljo/natur-och-parker/sjoar-och-kustvatten/tre-sorters-skargard/ — "Innerskärgården liknar ett insjölandskap med vikar, odlingsmarker och skog."; https://www.nacka.se/boende-miljo/natur-och-parker/sjoar-och-kustvatten/tre-sorters-skargard/ — "Mellanskärgården präglas av både stora fjärdar och en rad större öar."
      { q: "Vad är skillnaden mellan inre och yttre skärgård?", a: "Inre skärgården liknar ett insjölandskap med vikar, odlingsmark och skog och får mycket sötvatten från Mälaren. Yttre skärgården är öppet hav med glest spridda öar och kala hällar. Däremellan ligger mellanskärgården med stora fjärdar och större öar." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Du kan åka till Sandhamn med båt från Stavsnäs och då tar resan drygt en timme."; https://waxholmsbolaget.se/reseplanering/resmal/landsort — "Turen mellan Ankarudden och Landsort tar ungefär 35 minuter"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "Ögruppen kan bara nås med egen båt, taxi- eller charterbåt."
      { q: "Hur tar man sig till yttre skärgården?", a: "Till Sandhamn går Waxholmsbolagets båt från Stavsnäs året runt, drygt en timme. Till Landsort går båten från Ankarudden, ungefär 35 minuter. Svenska Högarna nås bara med egen båt, taxibåt eller charterbåt." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Naturen är typisk för mellanskärgården."; https://skargardsstiftelsen.se/omraden/finnhamn/ — "Trots sitt läge i mellanskärgården är ön lätt att nå med reguljär skärgårdstrafik från Stockholm."
      { q: "Ligger Grinda och Finnhamn i inre eller yttre skärgården?", a: "Ingen av dem. Länsstyrelsen beskriver Grindas natur som typisk för mellanskärgården, och Skärgårdsstiftelsen skriver att Finnhamn ligger i mellanskärgården." },
    ],
  },
  {
    slug: "dagstur-vs-overnight-skargarden",
    title: "Dagstur eller övernattning i skärgården – vad väljer du?",
    excerpt: "Dagstur ger mer flexibilitet. Övernattning ger solnedgång och morgondopp. Guide till hur du avgör vad som passar din resa.",
    category: "Praktisk", emoji: "🌙", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'Vad får man ut mer av – dagstur eller övernattning?', a: 'Övernattning ger solnedgång, morgonstillheten och upplevelsen av ön när turisterna har åkt. Det är den verkliga skärgårdsupplevelsen. Dagstur passar om du är tidsbegränsad men ger inte alls samma känsla.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar övernattning i skärgården?', a: 'Vandrarhem: 400–800 kr/natt. Värdshus: 1 200–3 000 kr/natt. Tältplats: 100–250 kr/natt. Tält under stjärnorna med eget matsäck är absolut billigast och ger den bästa upplevelsen.' },
    ],
  },
  {
    slug: "stockholm-vs-bohuslan-skargard",
    title: "Stockholms skärgård vs Bohuslän – vilken vinner?",
    excerpt: "30 000 öar mot klippkust och Västerhavet. En objektiv jämförelse av Sveriges två stora skärgårdar.",
    category: "Region", emoji: "🏆", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vad är störst – Stockholms skärgård eller Bohuslän?', a: 'Stockholms skärgård är störst med ca 30 000 öar och kobbar som sträcker sig 15 mil ut i Östersjön. Bohuslän har ca 8 000 öar längs 400 km kust mot Västerhavet. Mer öar, men Bohuslän har vildare klippkaraktär.' },
      { q: 'Vilken skärgård passar bäst för segling?', a: 'Båda är fantastiska. Stockholms skärgård erbjuder tusentals naturhamnar och skyddade vatten. Bohusläns Västerhavet ger mer utmanande seglatvågor och vind – bättre för erfarna. Sandhamn och KSSS är seglingens hjärta i Sverige.' },
    ],
  },
  // ── Batch F: Säsongsmotorer höst/vinter ──────────────────────────────────────
  {
    slug: "sensommar-skargarden-2026",
    title: "Sensommar i skärgården 2026 – aug–sep när allt stämmer",
    excerpt: "Sensommaren är skärgårdens bästa tid. Havet är varmt, folk har åkt hem och naturen glöder i gyllene ljus. Guide till aug–sep 2026.",
    category: "Säsong", emoji: "🍂", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Varför är sensommaren bästa tid i skärgården?', a: 'Havet är som varmast (20–23°C) i aug–sep. Turistsäsongen är över men de flesta restauranger är öppna. Ljuset är vackrare, naturen börjar skifta och du har öarna nästan för dig själv. Priset: ca 20–30% lägre boende.' },
      { q: 'Vilka öar är öppna i sensommaren?', a: 'Sandhamn, Utö, Grinda och Vaxholm håller öppet till september. Fjäderholmarna stänger normalt efter Alla hjärtans dag. Yttre skärgårdsöar utan service är alltid öppna – det är bara naturen som räknas.' },
    ],
  },
  {
    slug: "september-skargarden-2026",
    title: "September i skärgården 2026 – varför det är årets bästa månad",
    excerpt: "September är skärgårdens bäst bevarade hemlighet. Varmt hav, inga turister och höstens färger. Komplett guide till september 2026.",
    category: "Säsong", emoji: "🍁", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Kan man bada i skärgården i september?', a: 'Ja – havstemperaturen i Östersjön är 17–20°C i september. Det är faktiskt varmare än Medelhavet. Sensommarbadet utan trängsel är en av skärgårdens bästa hemligheter.' },
      { q: 'Vilka aktiviteter är bäst i september i skärgården?', a: 'Svampplockning, fiske (havsöringen är aktiv), vandring med höstfärger och stillasittande klippbad utan sällskap. Hummersäsongen öppnar 21 september i Bohuslän – fantastisk anledning till en västkusttripp.' },
    ],
  },
  {
    slug: "host-bohuslan-2026",
    title: "Hummerpremiär 2026 och höst i Bohuslän – ostron och skaldjur",
    excerpt: "Hummerpremiär 2026 var 21 september kl. 07.00. Om hösten i Bohuslän: regler för hummerfiske, ostronsäsongen i Grebbestad, skaldjur och vandring vid kusten.",
    category: "Säsong", emoji: "🦪", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Premiär för hummerfisket 2026 är den 21 september kl. 07.00."; "Hummerpremiären infaller klockan 07.00 den första måndagen efter 20 september varje år."
      { q: "När är hummerpremiären 2026?", a: "Hummerpremiären 2026 var måndag 21 september klockan 07.00. Premiären är alltid klockan 07.00 den första måndagen efter 20 september." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Nästa år (2027) infaller hummerpremiären istället den 27 september."
      { q: "När är hummerpremiären 2027?", a: "Hummerpremiären 2027 blir måndag 27 september, enligt Havs- och vattenmyndigheten." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Fritidsfiskare får fiska till och med 30 november."; "Yrkesfiskare får fiska till och med den 31 december."; "Som fritidsfiskare får du använda högst sex hummertinor samtidigt."
      { q: "Hur länge får man fiska hummer?", a: "Fritidsfiskare får fiska hummer från premiären till och med 30 november, yrkesfiskare till och med 31 december. En fritidsfiskare får ha högst sex hummertinor." },
      // KÄLLA: https://ostronakademien.se/ — "Ostronets Dag i Grebbestad firas numera alltid lördag v37!"; https://tanumstrand.se/attgora/skaldjur/ — "En tumregel är att äta skaldjur bara under månader med bokstaven “R”  i namnet. Alltså september till april."
      { q: "När öppnar ostronsäsongen i Bohuslän?", a: "Säsongen inleds med Ostronets dag i Grebbestad, som numera alltid firas på lördagen i vecka 37. En gammal regel är att äta skaldjur under månaderna med R, alltså september till april." },
      // KÄLLA: https://www.vastsverige.com/sotenas/evenemang/hummerpremiar/ — "I Sotenäs finns flera boendeanläggningar och turistfiskebåtar som arrangerar Hummersafari och Hummerpaket."; https://klemmingsdyk.se/ostronsafari/ — "Vi kör ostronsafari från april-juni och slutet på augusti-november, fredagar och lördagar."; https://www.vastsverige.com/lysekil/leder/skafto-kuststigen/ — "Alla sträckningar totalt ger 20,3 km"
      { q: "Vad händer i Bohuslän på hösten?", a: "Hummerpremiären i september, ostronsäsongen med ostronsafari i Grebbestad, hummersafari och hummerpaket i bland annat Sotenäs och Tanum, och vandring på Bohusleden eller kortare kustleder som Kuststigen på Skaftö." },
    ],
  },
  {
    slug: "host-gotland-2026",
    title: "Kantareller på Gotland – svamp och höst på Gotland 2026",
    excerpt: "Finns det kantareller på Gotland? Ja, kantarellen finns i hela landet. Här är regler för svampplockning på Gotland, tryffel, raukar och höstens evenemang.",
    category: "Säsong", emoji: "🍄", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://artfakta.se/taxa/3213/information — "Mest frekvent rapporterad från de södra delarna men finns utbredd i hela landet ända upp till Norrbotten."; https://www.nrm.se/fakta-om-naturen/vaxter/svampar/kantareller — "Kantarell finns i nästan hela landet"; https://artfakta.se/taxa/3213/information — "Bildar mykorrhiza med gran, asp, björk, bok, lind, ek och hassel i både barr- och lövskog."
      { q: "Finns det kantareller på Gotland?", a: "Ja. SLU Artdatabanken anger att kantarellen är utbredd i hela landet, ända upp till Norrbotten, och Naturhistoriska riksmuseet skriver att den finns i nästan hela landet. Den växer i barr- och lövskog tillsammans med bland annat gran, björk, ek och hassel." },
      // KÄLLA: https://artfakta.se/taxa/3213/information — "Bildar mykorrhiza med gran, asp, björk, bok, lind, ek och hassel i både barr- och lövskog."
      { q: "Var hittar man kantareller på Gotland?", a: "Myndigheterna pekar inte ut några kantarellställen. Kantarellen lever ihop med träd som gran, asp, björk, bok, lind, ek och hassel, i både barr- och lövskog, så det är där du ska leta." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/plocka-blommor-bar-och-svamp/ — "Markägaren får inte hindra dig från att plocka bär och svamp på marker där allemansrätten gäller."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/plocka-blommor-bar-och-svamp/ — "Kolla upp vad som gäller i skyddade områden, som nationalparker och naturreservat, där kan särskilda regler gälla."
      { q: "Får man plocka svamp på Gotland?", a: "Ja, enligt allemansrätten får du plocka svamp som inte är fridlyst, även på någon annans mark. I naturreservat kan särskilda regler gälla, så läs länsstyrelsens föreskrifter för reservatet." },
      // KÄLLA: https://artfakta.se/taxa/3213/information — "Kan förväxlas med narrkantarell som vanligen är mer tunnköttig och har tätt sittande skivor på undersidan av hatten."; https://artfakta.se/taxa/3213/information — "Hattundersida med grenade åsar som löper ner på foten."
      { q: "Vad kan kantarell förväxlas med?", a: "Framför allt med narrkantarell, som oftast är tunnare i köttet och har tätt sittande skivor under hatten. Kantarellen har grenade åsar som löper ner på foten." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/plocka-blommor-bar-och-svamp/ — "Naturvårdsverkets bedömning är att du behöver få tillstånd av markägaren om du ska plocka tryffel"; https://gotland.com/guide/host-pa-gotland/ — "Gotlands tryffelmånad sträcker sig från mitten av oktober till 15 november"
      { q: "Får man plocka tryffel på Gotland?", a: "Naturvårdsverket bedömer att du behöver markägarens tillstånd, eftersom tryffel oftast måste grävas upp. Gotlands tryffelmånad pågår från mitten av oktober till 15 november." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Oavsett vilken hamn du reser från så är restiden drygt tre timmar."; https://gotland.com/resa-hit-runt/ — "Cirka 30 minuter med flyg"
      { q: "Hur tar man sig till Gotland på hösten?", a: "Med Destination Gotlands färjor från Nynäshamn eller Oskarshamn, med en restid på drygt tre timmar, eller med flyg, som tar ungefär 30 minuter." },
    ],
  },
  // ── Batch F: Regionala djupguider ────────────────────────────────────────────
  {
    slug: "karlskrona-guide",
    title: "Karlskrona UNESCO-världsarv – Örlogsstaden Karlskrona",
    excerpt: "Karlskrona är UNESCO-världsarv sedan 1998 som Örlogsstaden Karlskrona. Här är varför, vilka platser som ingår, vad du kan besöka och hur du tar dig dit.",
    category: "Region", emoji: "⚓", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/orlogsstaden-karlskrona/ — "Karlskrona är ett utomordentligt väl bevarat exempel på en europeiskt planerad örlogsstad inspirerad av anläggningar i andra länder."; "Karlskrona är den bäst bevarade och mest kompletta av dem som finns kvar."
      { q: "Varför är Karlskrona ett UNESCO-världsarv?", a: "UNESCO:s världsarvskommitté motiverade beslutet med att Karlskrona är ett utomordentligt väl bevarat exempel på en europeiskt planerad örlogsstad, och att den är den bäst bevarade och mest kompletta av de örlogsbaser som finns kvar." },
      // KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/varldsarvet-karlskrona.html — "Karlskrona skrevs in på den prestigefyllda världsarvslistan den 3 december 1998 och blev därmed Sveriges nionde världsarv."
      { q: "När blev Karlskrona världsarv?", a: "Örlogsstaden Karlskrona skrevs in på UNESCO:s världsarvslista den 3 december 1998 och blev då Sveriges nionde världsarv." },
      // KÄLLA: https://www.karlskrona.se/kultur-fritid-och-turism/varldsarv/ — "Den civila staden: Stadsplan, äldre bebyggelse på Trossö, Björkholmen samt Stumholmen"; "Örlogsvarvet och örlogshamnen"; "Befästningarna Kungsholms fort, Drottningskärs kastell, Kurrholmen, Godnatt, Koholmen, Ljungskär och Mjölnareholmen"; "Skärva herrgård, Lyckeby kronokvarn med dammen och stenbron"
      { q: "Vad ingår i världsarvet Örlogsstaden Karlskrona?", a: "Den civila staden på Trossö, Björkholmen och Stumholmen, örlogsvarvet och örlogshamnen, befästningar som Kungsholms fort och Drottningskärs kastell, samt Skärva herrgård och Lyckeby kronokvarn." },
      // KÄLLA: https://www.visitkarlskrona.se/en/experience/guided-tours — "Unfortunately the guided tours to The old Navy Yard are cancelled until further notice, due to the current security situation in Europe."; https://www.karlskrona.se/varldsarvet-orlogsstaden-karlskrona/karta/karta-over-varldsarvet/repslagarbanan/ — "På grund av det rådande världsläget kan man ej besöka Lindholmen och Repslagarbanan."
      { q: "Kan man besöka örlogsvarvet i Karlskrona?", a: "Inte just nu. De guidade turerna till det gamla örlogsvarvet är inställda tills vidare på grund av säkerhetsläget, och Lindholmen med Repslagarbanan går inte att besöka." },
      // KÄLLA: https://www.visitkarlskrona.se/sv/resa — "Från Malmö: Tåg 2 h 45 min eller bil 2 h 30 min."; "Från Göteborg: Tåg 4 h 30 min eller bil 4 h."; "Från Stockholm: Flyg 1 h (Ronneby flygplats)."; "Från Gdynia, Polen: Färja (Stena Line) 10 h."
      { q: "Hur tar man sig till Karlskrona?", a: "Enligt Visit Karlskrona tar tåget från Malmö ungefär 2 h 45 min och från Göteborg 4 h 30 min. Från Stockholm kan du flyga till Ronneby på ungefär en timme, och från Gdynia i Polen går Stena Lines färja." },
    ],
  },
  {
    slug: "varberg-guide",
    title: "Varberg guide – fästning, kallbadhus och surf på Hallandskusten",
    excerpt: "Varberg guide: fästningen från 1600-talet med Bockstensmannen, kallbadhuset från 1903, strandpromenaden till Apelviken, surfställen och hur du tar dig dit.",
    category: "Region", emoji: "🏄", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://museumhalland.se/varbergs-fastning/ — "Hallands kulturhistoriska museum ligger på Varbergs fästning"; https://visitvarberg.se/uppleva/strandpromenaden — "Från Varbergs fästning längs med havet, hela vägen ner till Apelviken, slingrar sig den 5 km långa Strandpromenaden."; https://visitvarberg.se/uppleva/varldsarvet-grimeton — "2004 blev Grimeton Radiostation upptagen på UNESCO:s världsarvslista"
      { q: "Vad kan man göra i Varberg?", a: "Besöka Varbergs fästning med Hallands kulturhistoriska museum och Bockstensmannen, bada och basta i kallbadhuset, gå den cirka 5 km långa strandpromenaden till Apelviken, surfa och åka ut till världsarvet Grimeton radiostation." },
      // KÄLLA: https://visitvarberg.se/uppleva/surfing — "Apelviken passar för både den lite mer oerfarne surfaren och den erfarne och så även Träslövsläge strax söderut där en pir gör det lättare att ta sig ut"; "Tänk på att aldrig surfa ensam"
      { q: "Var kan man surfa i Varberg?", a: "Visit Varberg nämner Apelviken, som passar både ovana och vana surfare, Träslövsläge strax söderut där en pir gör det lättare att ta sig ut, och Kåsa med snabbare vågor. Surfa aldrig ensam och kolla väder och strömmar först." },
      // KÄLLA: https://visitvarberg.se/uppleva/varbergs-fastning — "påbörjades år 1588 en ombyggnation av fästningen."; "Varbergs fästning stod färdig år 1618 och var då ett av Europas modernaste försvarsverk."; https://museumhalland.se/varbergs-fastning/ — "Varbergs fästning är ett statligt byggnadsminne som förvaltas av Statens fastighetsverk."
      { q: "Hur gammal är Varbergs fästning?", a: "Den första stenborgen på berget stod färdig runt år 1300. Ombyggnaden till fästning började 1588, och fästningen stod färdig 1618. Den är i dag ett statligt byggnadsminne som förvaltas av Statens fastighetsverk." },
      // KÄLLA: https://visitvarberg.se/uppleva/kallbadhuset — "Det nuvarande kallbadhuset är från 1903 och det tredje i ordningen."; "Därför finns det en bastu för damerna och en för herrarna."; "med utsikt över Kattegatt - året runt"
      { q: "Vad är Varbergs kallbadhus?", a: "Ett nakenbad på pålar en bit ut i havet, byggt 1903 och det tredje i ordningen på platsen. Det har en damsida och en herrsida med var sin bastu och är öppet för bad året runt." },
      // KÄLLA: https://varberg.se/varbergvaxer/vasterport/tidslinje-for-vasterport — "Stena kör sin sista tur från Varberg."; https://hallandshamnar.se/nyheter--press/nyheter/2026-02-03-stena-line-avvecklar-farjelinjen-halmstad---grena.html — "Stena Line har meddelat att bolaget avvecklar färjelinjen mellan Halmstad och Grenå per den 30 april 2026."
      { q: "Går det färja från Varberg till Danmark?", a: "Nej. Stena Line körde sin sista tur från Varberg 31 januari 2020 och flyttade linjen till Halmstad. Enligt Hallands Hamnar avvecklades även Halmstad–Grenå per den 30 april 2026." },
    ],
  },
  {
    slug: "borgholm-guide",
    title: "Borgholm centrum – att göra i Borgholm, sevärdheter och marknad",
    excerpt: "Borgholm centrum med gågator, hamn och sandstrand. Att göra i Borgholm på Öland: slottet, Solliden, bad, skördefestens marknad och hur du tar dig dit.",
    category: "Region", emoji: "🏰", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.oland.se/borgholm-stad — "Du kan besöka Borgholms slott, promenera i stadskärnan, njuta av restauranger och caféer eller upptäcka närliggande stränder och natur."; https://www.oland.se/borgholm-stad — "Blå Rör, Sjöstugan, Kapelludden, och Strand Hotells Badstrand intill gästhamnen."
      { q: "Vad finns att göra i Borgholm?", a: "Du kan besöka Borgholms slott och Sollidens slott, promenera i stadskärnan med butiker, restauranger och kaféer och bada vid Kapelludden, Sjöstugan eller Blå Rör. På sommaren är det konserter och evenemang." },
      // KÄLLA: https://www.borgholmsslott.se/om-oss/historia/ — "Den ursprungliga borgen byggdes redan på 1100-talet."; https://www.oland.se/borgholm-stad — "Sollidens slott – kungafamiljens sommarresidens"; https://www.oland.se/borgholm-stad — "Borgholms Stadsmuseum är en av Borgholms vackraste gårdar med rötter i tidigt 1800-tal."
      { q: "Vilka sevärdheter finns i Borgholm?", a: "Borgholms slott, en ruin på en klippkant över Kalmarsund med rötter i 1100-talet, och Sollidens slott, kungafamiljens sommarresidens strax söder om staden. I centrum finns också Borgholms Stadsmuseum och kallbadhuset i hamnen." },
      // KÄLLA: https://api.scb.se/OV0104/v2beta/api/v2/tables/TAB5357/data?lang=sv&valueCodes[Region]=0885TC102&valueCodes[ContentsCode]=000003F7&valueCodes[Tid]=2023&outputFormat=html — "0885TC102 Borgholm 4 280"; https://api.scb.se/OV0104/v2beta/api/v2/tables/TAB5357/data?lang=sv&valueCodes[Region]=0840TB104&valueCodes[ContentsCode]=000003F7&valueCodes[Tid]=2023&outputFormat=html — "0840TB104 Färjestaden 6 674"
      { q: "Är Borgholm Ölands största stad?", a: "Borgholm kallas stad, men Färjestaden är större. Enligt SCB bodde 4 280 personer i tätorten Borgholm och 6 674 i Färjestaden år 2023." },
      // KÄLLA: https://skordefest.nu/om-skordefesten/ — "Varje höst i slutet av september (vecka 39)"; https://skordefest.nu/aktivitet/marknader/ — "Torgmarknad, skördetåg, musik, fyrverkeri, dockparad, handel, restauranger och caféer."; https://skordefest.nu/om-skordefesten/ — "Öland Spirar på våren i maj (vecka 19)"
      { q: "När är Borgholms marknad?", a: "Den stora marknaden i Borgholm är torgmarknaden under Ölands skördefest i slutet av september (vecka 39). I maj (vecka 19) är det Öland Spirar, med försäljning på torget i Borgholm." },
      // KÄLLA: https://www.oland.se/borgholm-stad — "Kör via Ölandsbron från Kalmar till Färjestaden och vidare norrut till Borgholm – cirka 40 minuter (ca 40 km)"; https://www.oland.se/borgholm-stad — "går från Kalmar och Färjestaden till Borgholm"
      { q: "Hur tar man sig till Borgholm?", a: "Med bil kör du över Ölandsbron från Kalmar till Färjestaden och sedan norrut, ungefär 40 km och 40 minuter. KLT har regelbundna bussar från Kalmar och Färjestaden till Borgholm." },
    ],
  },
  {
    slug: "tjorn-guide",
    title: "Akvarellmuseet Tjörn – museum och att göra på Tjörn",
    excerpt: "Akvarellmuseet på Tjörn ligger vid vattnet i Skärhamn. Här är museets utställningar och verkstad, fler museer på Tjörn och vad mer att göra på Tjörn.",
    category: "Region", emoji: "🎨", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.akvarellmuseet.org/ — "Södra Hamnen 6"; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/nordiska-akvarellmuseet — "Kör väg 169 till Skärhamn. Följ skyltar mot Nordiska Akvarellmuseet."; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/nordiska-akvarellmuseet — "Gångväg cirka 12 minuter."
      { q: "Var ligger Akvarellmuseet på Tjörn?", a: "Nordiska Akvarellmuseet ligger på Södra Hamnen 6 i Skärhamn. Kör väg 169 till Skärhamn och följ skyltarna, eller åk buss till hållplatsen Kommunhuset och gå cirka 12 minuter." },
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/nordiska-akvarellmuseet — "Nordiska Akvarellmuseet i Skärhamn öppnade sommaren 2000"; https://www.akvarellmuseet.org/besok — "I vår öppna verkstad kan både barn och vuxna prova på akvarell."
      { q: "Vad är Nordiska Akvarellmuseet?", a: "Ett museum i Skärhamn för akvarellkonst som öppnade sommaren 2000. Varje år visas flera utställningar med konstnärer från hela världen som arbetar med vattenfärgstekniker. Barn och vuxna kan också prova på akvarell i den öppna verkstaden." },
      // KÄLLA: https://www.akvarellmuseet.org/besok — "museet har öppet alla årstider (med undantag för de veckor vi håller stängt för utställningsbyte)"; https://www.akvarellmuseet.org/ — "Under sommaren har vi öppet dagligen."
      { q: "Är Akvarellmuseet öppet hela året?", a: "Ja, museet har öppet alla årstider utom de veckor det stänger för utställningsbyte. På sommaren är det öppet varje dag. Se aktuella tider på akvarellmuseet.org." },
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/konst-och-kultur/kulturarv-och-museer — "Museer på Tjörn"; https://www.tjorn.se/kultur-fritid-och-turism/konst-och-kultur/kulturarv-och-museer — "Skärhamns sjöfartsmuseum"; https://www.tjorn.se/kultur-fritid-och-turism/konst-och-kultur/kulturarv-och-museer — "Klädesholmens Museum ”Sillebua”"
      { q: "Vilka museum finns på Tjörn?", a: "Utöver Nordiska Akvarellmuseet listar Tjörns kommun hembygdsmuseet i Bräcke, Klädesholmens museum Sillebua, Skärhamns sjöfartsmuseum, hembygdsmuseet Gröna Boden på Åstol och Villa Solfrid i Klövedal." },
      // KÄLLA: https://www.akvarellmuseet.org/besok — "På Tjörn finns även Skulptur i Pilane"; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Till exempelvis Dyrön, Åstol, Härön och Tjörnekalv går regelbunden färjetrafik"; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "De största är Låka i Höviksnäs, Kårevik i Rönnäng och Gråskär i Skärhamn."; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/turistbyra — "Vill du ut på cykelvägarna?"
      { q: "Vad finns att göra på Tjörn?", a: "Förutom Akvarellmuseet kan du besöka Skulptur i Pilane och Pilane gravfält, gå vandringslederna vid Sundsby säteri, ta färjan till Åstol, Dyrön eller Härön, bada vid Låka, Kårevik eller Gråskär och hyra cykel på turistbyrån i Skärhamn." },
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/tjorn/ — "En knapp timmes bilfärd norr om Göteborg möts du av den imponerande Tjörnbron som tar dig från Stenungsund, via Stenungsön till Tjörn."; https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag — "Närmaste tågstation ligger i Stenungsund."; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014620800000/ — "Tjörn - Stenungsund/Göteborg"
      { q: "Hur tar man sig till Tjörn?", a: "Med bil över Tjörnbron från Stenungsund, en knapp timme från Göteborg. Med kollektivtrafik åker du Västtrafiks expressbuss mellan Tjörn och Stenungsund/Göteborg. Det finns inga tåg på Tjörn, och närmaste tågstation ligger i Stenungsund." },
    ],
  },
  {
    slug: "visby-sommar-guide",
    title: "Visby sommarguide – ringmuren, gamla stan och Medeltidsveckan",
    excerpt: "Visby på sommaren: ringmuren och gamla stan innanför murarna, kyrkoruinerna, bilförbudet i innerstaden, Medeltidsveckan vecka 32, bad och färjan till Visby.",
    category: "Region", emoji: "🏛", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/hansestaden-visby/ — "Den är 3,6 kilometer lång och utgör Nordeuropas bäst bevarade stadsmur."; https://www.raa.se/om-riksantikvarieambetet/fragor-och-svar/visby-ringmur/ — "Visby ringmur började troligen byggas omkring 1250."
      { q: "Hur lång är Visby ringmur?", a: "Riksantikvarieämbetet anger att ringmuren är 3,6 kilometer lång. Den började troligen byggas omkring 1250 och är Nordeuropas äldsta bevarade stadsmur." },
      // KÄLLA: https://gotland.com/guide/halvdagsturen-visby/ — "Att gå runt hela ringmuren tar ca 1 timme."; https://gotland.com/gotlands-officiella-besoksguide/artiklar-guider/visby-pa-4-timmar — "det går bra att gå runt den eller innanför den"
      { q: "Hur lång tid tar det att gå runt Visby ringmur?", a: "Ungefär en timme enligt gotland.com. Du kan gå både på utsidan och längs insidan av muren." },
      // KÄLLA: https://gotland.com/events/medeltidsveckan-2026/ — "Festivalen varar i åtta dagar från 8-15 augusti 2027, söndag veckan 31 till söndag vecka 32."
      { q: "När är Medeltidsveckan i Visby?", a: "Medeltidsveckan pågår i åtta dagar vecka 32 i början av augusti. Nästa gång är den 8–15 augusti 2027." },
      // KÄLLA: https://gotland.se/trafik-gator-och-parker/trafikregler-och-trafiksakerhet/motorfordonsforbud-i-visby-innerstad-sommartid — "På sommaren är det varje år motorfordonsförbud i Visby innerstad från lördagen vecka 24 till och med vecka 35."
      { q: "Får man köra bil i Visby gamla stan på sommaren?", a: "Bara behörig trafik. Region Gotland har varje sommar motorfordonsförbud i Visby innerstad från lördagen vecka 24 till och med vecka 35. Färd till och från bostaden, även hotell, räknas som behörig trafik." },
      // KÄLLA: https://www.raa.se/om-riksantikvarieambetet/fragor-och-svar/visby-ringmur/ — "Visby ringmur utgör tillsammans med kyrkoruinerna, packhusen och den medeltida stadsplanen i Visby grunden för världsarvet Hansestaden Visby som 1995 fördes in på UNESCO:s lista över världsarv."
      { q: "Varför är Visby världsarv?", a: "Hansestaden Visby fördes in på Unescos världsarvslista 1995. Ringmuren, kyrkoruinerna, packhusen och den medeltida stadsplanen är grunden för världsarvet." },
      // KÄLLA: https://www.destinationgotland.se/resa/ — "Res från Nynäshamn eller Oskarshamn och låt Gotland börja redan till havs. På omkring tre timmar är du framme i Visby"
      { q: "Hur tar man sig till Visby?", a: "Med Destination Gotlands färja från Nynäshamn eller Oskarshamn. Överfarten tar omkring tre timmar, och du kan resa till fots, med cykel eller med bil." },
    ],
  },
  {
    slug: "camping-gotland",
    title: "Camping på Gotland – campingplatser, tälta och Fårö camping",
    excerpt: "Camping på Gotland: Tofta, Kneippbyn och Sudersand på Fårö med tält, husvagn och campingstugor, plus vad som gäller när du vill tälta på Gotland.",
    category: "Region", emoji: "⛺", readTime: "7 min", fullContent: true,
    topics: ['camping', 'gotland', 'familj'],
    faqs: [
      // KÄLLA: https://gotland.com/besoka-uppleva/hitta-boende/camping/ — "Här hittar du campingplatser på Gotland."; https://www.toftacamping.se/ — "Husvagn, husbil, stugor och tält"; https://kneippbyn.se/boende/camping/ — "Här finns campingplatser för husvagn, husbil och tält"; https://www.sudersand.se/sv/boenden/camping — "Vi har platser för husbilar, husvagnar och tält."
      { q: "Vilka campingplatser finns på Gotland?", a: "Gotland.com har en sökbar lista över campingplatser på hela ön. Tre exempel är Tofta Camping vid Tofta strand, Kneippbyn strax söder om Visby och Sudersand Resort på Fårö. Alla tre har platser för tält, husvagn och husbil." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt.html — "Att tälta med ett par, tre tält under något dygn ingår i allemansrätten."; https://gotland.se/trafik-gator-och-parker/parkera-och-ladda/husbil-stallplatser-terrangkorning — "Camping i tält, husvagn, husbil, bil eller övernattning utomhus får inte ske på offentlig plats"; https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt.html — "Det kan exempelvis vara förbjudet att tälta, elda, cykla eller att ha hunden okopplad."
      { q: "Får man tälta på Gotland?", a: "Ja. Enligt Länsstyrelsen Gotland ingår det i allemansrätten att tälta med två eller tre tält under något dygn. För stora grupper eller flera dygn behöver du markägarens lov. Du får inte tälta på offentlig plats, och i vissa naturreservat är tältning förbjuden." },
      // KÄLLA: https://www.sudersand.se/sv/boenden/camping/taltcamping — "Här finns över 120 tältplatser."; https://www.sudersand.se/ — "campa året runt på Sudersand"; https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "Resan med vägfärjan är avgiftsfri."
      { q: "Finns det camping på Fårö?", a: "Ja, Sudersand Resort på Fårö har över 120 tältplatser inom 100 meter från sandstranden, platser med el för husvagn och husbil, och campingstugor. Enligt campingen går det att campa där året runt. Till Fårö åker du med den avgiftsfria vägfärjan från Fårösund." },
      // KÄLLA: https://www.toftacamping.se/husvagnscamping/ — "För husvagn och husbil finns Ängen, Havsnära Grön, Havsnära Blå och Havsnära Gul."; https://gotland.se/trafik-gator-och-parker/parkera-och-ladda/husbil-stallplatser-terrangkorning — "På dessa platser är det tillåtet att övernatta, men det finns ingen annan service."; https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt.html — "Att köra med husbil eller husvagn i naturen är alltså inte tillåtet."
      { q: "Var kan man campa på Gotland med husvagn eller husbil?", a: "På campingplatserna, till exempel Tofta Camping, Kneippbyn och Sudersand, och på Region Gotlands avgiftsbelagda ställplatser för husbil. Du får inte ställa upp husvagn eller husbil i naturen, och camping på offentlig plats är förbjuden." },
      // KÄLLA: https://www.toftacamping.se/ — "Här finns olika boendemöjligheter fördelat på campingtomter, campingstugor, tält och studios med hotellstandard."; https://www.sudersand.se/sv/boenden/stugor — "Välj mellan familjestugor, parstugor och campingstugor!"; https://kneippbyn.se/boende/camping/ — "Här finns flera olika boendealternativ, inklusive stugor, campingtomter och platser för husvagn, husbil och tält."
      { q: "Var hittar man campingstuga på Gotland?", a: "Både Tofta Camping och Sudersand Resort har campingstugor. Sudersand har över 100 stugor med 2–6 bäddar, och Kneippbyn har också stugor." },
      // KÄLLA: https://www.toftacamping.se/husvagnscamping/ — "1/5 – 15/9."; https://kneippbyn.se/boende/camping/ — "Vill du boka camping på Gotland 2027?"; https://www.sudersand.se/sv/boenden/camping/taltcamping — "Tältplatser med el är bokningsbara medan platser utan el endast är för"
      { q: "När ska man boka camping på Gotland?", a: "Det finns ingen generell regel. Tofta Camping har husvagnscampingen öppen 1 maj–15 september, och Kneippbyn tog i september 2026 redan emot bokningar för 2027. Tältplatser utan el på Sudersand kan inte bokas utan är drop-in." },
    ],
  },
  {
    slug: "camping-bohuslan",
    title: "Camping i Bohuslän – Kosteröarna, Havstenssund och Grebbestad",
    excerpt: "Camping i Bohuslän: den enda tältplatsen på Kosteröarna, campingar nära Havstenssund och Grebbestad, Kungshamn, Tjörn och Orust – och var du får tälta fritt.",
    category: "Region", emoji: "⛺", readTime: "7 min", fullContent: true,
    topics: ['camping', 'bohuslan', 'familj'],
    faqs: [
      // KÄLLA: https://www.lyths.se/ — "Kosteröarna är naturreservat och det är endast tillåtet att tälta på Nordkosters tältplats när den är öppen på sommaren."; https://www.lyths.se/ — "Obs! Förbokning krävs då vi har ett begränsat antal platser."
      { q: "Var kan man campa på Kosteröarna?", a: "Bara på Lyths tältplats på Nordkoster, som är Kosteröarnas enda campingplats. Platserna är få, så du måste förboka. All annan tältning på Nord- och Sydkoster är förbjuden." },
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/havstenssund/ — "Havstenssund har i dagsläget inget kommersiellt boende att erbjuda. Närliggande campingar är Saltviks camping och Edsviks camping."
      { q: "Finns det camping i Havstenssund?", a: "Nej, i Havstenssund finns i dag inget kommersiellt boende. De närmaste campingarna är Saltviks Camping och Edsviks Camping, som i dag heter First Camp Edsvik – Grebbestad. Båda ligger längs vägen från Grebbestad mot Havstenssund." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/ — "Du får tälta något enstaka dygn i naturen, men tänk på att välja en tältplats långt bort från bostadshus"; https://www.vastsverige.com/kosterhavets-nationalpark/boende/talta-i-kosterhavet/ — "OBS! I Kosterhavets nationalpark får man tälta högst två dygn på samma plats."
      { q: "Får man tälta fritt på klipporna i Bohuslän?", a: "Allemansrätten låter dig tälta något enstaka dygn i naturen, långt från bostadshus. I nationalparker och naturreservat gäller särskilda regler. I Kosterhavets nationalpark får du tälta högst två dygn på samma plats, och på Kosteröarna bara på campingen." },
      // KÄLLA: https://firstcamp.se/destinationer/solvik-kungshamn/camping — "På First Camp Solvik – Kungshamn kan du boka boende för husvagn, husbil eller tält."; https://saltvikscamping.se/ — "Välj bland våra tomter i olika storlekar för husvagn, husbil och tält"; https://www.havologi.se/boende/ — "Tältplatsen ligger på ett grönområde mellan klipporna."; https://www.stockencamping.se/ — "Till oss kan man komma och tälta, bo i husvagn eller husbil"
      { q: "Vilka campingar i Bohuslän har tältplatser?", a: "Några exempel är First Camp Solvik i Kungshamn, Saltviks Camping och First Camp Edsvik vid Grebbestad, Hav & Logi vid Skärhamn på Tjörn och Stocken camping på Orust. Alla har platser för tält." },
      // KÄLLA: https://www.grebbestadfjorden.com/ — "En fyrstjärnig camping som håller öppet året runt."
      { q: "Finns det camping i Grebbestad som har öppet året runt?", a: "Ja. GrebbestadFjorden är en fyrstjärnig camping som har öppet året runt och som också har stugor, hotell, vandrarhem och glamping." },
    ],
  },
  {
    slug: "gotland-med-barn",
    title: "Att göra på Gotland med barn – aktiviteter och Visby med barn",
    excerpt: "Att göra på Gotland med barn: Kneippbyn och Villa Villekulla, Lummelundagrottans barntur, minitåget runt ringmuren i Visby, raukar, russ och långgrunda stränder.",
    category: "Region", emoji: "👨‍👩‍👧‍👦", readTime: "8 min", fullContent: true,
    topics: ['barn', 'gotland', 'familj'],
    faqs: [
      // KÄLLA: https://gotland.com/guide/barnens-gotland/ — "Här kan ni upptäcka de spännande raukarna, klappa ulliga lamm, bada vid långa sandstränder, fascineras av de stora skatterna på Gotlands museum, se vilda hästar i Lojsta och gå i Pippis fotspår i Visby."
      { q: "Vad finns det att göra på Gotland med barn?", a: "Gotland.com tipsar bland annat om Kneippbyns sommar- och vattenland med Villa Villekulla, Lummelundagrottan, Gotlands Museum, Gotlandståget, två djurparker, gotlandsrussen på Lojsta hed, raukarna och de långa sandstränderna." },
      // KÄLLA: https://gotland.com/guide/barnens-gotland/ — "På Trampolinparken i Fårösund kan barnen hoppa året runt"; https://gotland.com/guide/barnens-gotland/ — "Museet erbjuder också guidade stadsvandringar varje dag under sommaren. Öppet året runt."; https://gotland.com/guide/barnens-gotland/ — "På gång just nu - Evenemangstips för hela familjen!"
      { q: "Vilka aktiviteter för barn finns på Gotland året runt?", a: "Gotlands Museum i Visby har öppet året runt, och Trampolinparken i Fårösund har också öppet året runt. Gotland.com har dessutom en evenemangskalender med barnaktiviteter under hela året." },
      // KÄLLA: https://gotland.com/guide/barnens-gotland/ — "Tågresan tar ungefär 25 minuter och under tiden ni åker får ni lyssna på en förinspelad guidning."
      { q: "Vad kan man göra i Visby med barn?", a: "Åka minitåg runt ringmuren (ungefär 25 minuter med förinspelad guidning), besöka Gotlands Museum, gå i Pippis fotspår med Pippikartan från Turistbyrån, besöka Fenomenalen och bada vid Kallis eller Norderstrand. Kneippbyn ligger strax söder om Visby." },
      // KÄLLA: https://gotland.com/guide/barnens-gotland/ — "Gotland är en ö full av upplevelser för hela familjen."; https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "Idealisk för barnfamiljer med mjuk len sand och långgrunt vatten."
      { q: "Är Gotland bra för barnfamiljer?", a: "Region Gotlands turistsajt beskriver ön som full av upplevelser för hela familjen. Flera stränder är långgrunda, och Sudersand på Fårö beskrivs som idealisk för barnfamiljer. Naturreservaten Furillen och Folhammar är anpassade för barnvagn." },
      // KÄLLA: https://lummelundagrottan.se/ — "Ett besök i Lummelundagrottan är en upplevelse för alla åldrar."; https://gotland.com/activities/barnturen-i-lummelundagrottan/ — "5-10 år, vuxna väntar utanför."; https://gotland.com/guide/barnens-gotland/ — "För de äldre tonårsbarnen är det längre grottäventyret ett tips."
      { q: "Hur gammal ska man vara för Lummelundagrottan?", a: "Lummelundagrottan beskrivs som en upplevelse för alla åldrar. Barnturen är för barn 5–10 år, och det längre grottäventyret tipsas för äldre tonåringar." },
      // KÄLLA: https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/ — "Bra bussförbindelse med buss 10 från Visby"; https://lummelundagrottan.se/ — "BUSS 61 trafikerar Visby – Lummelunda – Stenkyrka –Lärbro."; https://lummelundagrottan.se/ — "Det finns en bra cykelväg hela vägen från Visby."
      { q: "Behöver man bil på Gotland med barn?", a: "Inte till allt. Buss 10 går från Visby till Tofta och Björkhaga, buss 61 till Lummelundagrottan och buss 20 till Sudersand på sommaren, och till Lummelundagrottan går en cykelväg från Visby. Till andra delar av ön behöver ni planera resan i Region Gotlands tidtabeller eller ta bil eller cykel." },
    ],
  },
  {
    slug: "camping-stockholm-skargard",
    title: "Camping i Stockholms skärgård – Finnhamn camping och tälta",
    excerpt: "Finnhamn camping, Grinda och Nåttarö: här kan du tälta i skärgården. Så fungerar camping i Stockholms skärgård, allemansrätten, reservatsregler och båten ut.",
    category: "Aktivitet", emoji: "⛺", readTime: "8 min", fullContent: true,
    topics: ['camping', 'stockholm', 'natur'],
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Eldplatser finns vid tältplatsen på södra Jolpan, nära vandrarhemmet och på Idholmen."; "på Idholmen, Stora och Lilla Jolpan tälta på annat än anvisad plats"
      { q: "Finns det camping på Finnhamn?", a: "Ja. På södra Stora Jolpan på Finnhamn finns en anvisad tältplats med eldplatser. På Idholmen, Stora och Lilla Jolpan får du bara tälta på den anvisade platsen." },
      // KÄLLA: https://grinda.se/boende/camping/ — "Upplev den genuina skärgårdskänslan på Grindas natursköna campingplats, vackert belägen på Norra Grinda."; https://nattaro.se/boende/ — "Även dygnscampingen för er som vill tälta ligger centralt placerat på ön."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/talt-och-lagerplatser/ — "På Upptäckskärgården.se går det söka efter tältplatser i hela skärgården."
      { q: "Var kan man campa i Stockholms skärgård?", a: "Till exempel på tältplatsen på Finnhamn, på campingen på norra Grinda och på dygnscampingen på Nåttarö. Skärgårdsstiftelsen hänvisar till Upptäckskärgården.se för att hitta fler tältplatser." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "Du får tälta något enstaka dygn i naturen"; "I allmänhet är det inte tillåtet att tälta annat än på särskilt angivna platser. Det kan också vara tältförbud i hela området."
      { q: "Får man tälta var som helst i skärgården?", a: "Allemansrätten låter dig tälta något enstaka dygn i naturen, långt från bostadshus. I naturreservat och nationalparker är det i allmänhet bara tillåtet på särskilt angivna platser, och det kan vara tältförbud i hela området." },
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/omraden/stockholms-skargard/ — "Hos STF hittar du hotell, vandrarhem och pensionat i flera delar av skärgården"; "STF Finnhamns Vandrarhem"; "STF Gällnö Vandrarhem"
      { q: "Har STF camping i Stockholms skärgård?", a: "STF:s boenden i Stockholms skärgård är hotell, vandrarhem och pensionat, till exempel STF Finnhamns Vandrarhem och STF Gällnö Vandrarhem. För att tälta får du använda tältplatser som Finnhamns eller allemansrätten." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Reguljär båttrafik året runt med Waxholmsbolaget."; https://grinda.se/boende/camping/ — "Den enklaste vägen hit är att kliva av Waxholmsbåten vid Norra Grinda"; https://www.waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd."
      { q: "Kan man ta Waxholmsbåten till campingen?", a: "Ja. Finnhamn har reguljär båttrafik året runt med Waxholmsbolaget, och till Grindas camping kliver du av vid Norra Grinda. SL-biljetten gäller bara mellan Strömkajen och Vaxholm med omnejd." },
      // KÄLLA: https://grinda.se/boende/camping/ — "Ingen platsbokning behövs"; https://nattaro.se/boende/ — "max sju nätter. (betalas på expeditionen)"
      { q: "Behöver man boka tältplats i skärgården?", a: "Inte på Grinda, där ingen platsbokning behövs. På Nåttarös dygnscamping betalar du på expeditionen och får stanna högst sju nätter." },
    ],
  },
  {
    slug: "fiskelage-bohuslan",
    title: "Smögen, Fjällbacka, Grebbestad – fiskelägen i Bohuslän",
    excerpt: "Fiskelägen i Bohuslän: Smögen, Fjällbacka, Grebbestad, Lysekil och Käringön – och hur du tar dig mellan dem längs kustvägen med bil, buss och båt.",
    category: "Region", emoji: "🎣", readTime: "7 min", fullContent: true,
    topics: ['bohuslan', 'mat', 'natur'],
    faqs: [
      // KÄLLA: https://www.vastsverige.com/en/road-trips/northern-bohuslan/ — "From Strömstad and the Koster Islands, this route follows the coast south through Grebbestad, Fjällbacka, and Smögen to Fiskebäckskil and Lysekil."; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014486000000/ — "Tidtabell linje 860 Smögen - Kungshamn - Uddevalla - Trollhättan"; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014487500000/ — "Tidtabell linje 875 Tanumshede - Fjällbacka - Dingle - Håby"; https://www.vastsverige.com/sotenas/produkter/smogen/ — "När du kör över Smögenbron från centralorten Kungshamn kommer du först till samhällets norra del, Hasselön."
      { q: "Hur tar man sig mellan Smögen och Fjällbacka?", a: "Med bil kör du via Kungshamn och Smögenbron. Västsverige beskriver en bilresa längs kusten från Grebbestad via Fjällbacka till Smögen och vidare till Fiskebäckskil och Lysekil. Med buss finns ingen direktlinje som vi har hittat: linje 860 går från Smögen mot Uddevalla och linje 875 mellan Tanumshede, Fjällbacka, Dingle och Håby. Sök resan i Västtrafiks reseplanerare." },
      // KÄLLA: https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014486000000/ — "Tidtabell linje 860 Smögen - Kungshamn - Uddevalla - Trollhättan"; "Håby kyrka A"; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014487500000/ — "Grebbestad busstation A"; "Håby kyrka A"
      { q: "Går det buss mellan Smögen och Grebbestad?", a: "Inte direkt, enligt Västtrafiks linjer. Linje 860 går Smögen–Kungshamn–Uddevalla–Trollhättan och linje 875 Tanumshede–Fjällbacka–Dingle–Håby med hållplats i Grebbestad. Båda stannar vid Håby kyrka. Om ett byte fungerar i tid ser du i Västtrafiks reseplanerare." },
      // KÄLLA: https://bransch.trafikverket.se/TrvSeFiler/Samhallsekonomiskt_beslutsunderlag/Region_Vast/Region%20V%C3%A4st/3%20Investering/VVA2288%20V%C3%A4g%20171%20Gl%C3%A4borg-Kungshamn%2080-100/vva2288_vag_171_glaborg_-_kungshamn%2C_80-100km_h_kort.pdf — "Väg 162, 171 och 174 är en vägsträcka mellan Gläborg och Kungshamn."; "Trafikmängden ökar med cirka 50 procent under sommarhalvåret på grund av turistnäring."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ — "Resan med vägfärjan är avgiftsfri."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ — "Resan är avgiftsfri."
      { q: "Hur är kustvägen i Bohuslän att köra?", a: "Trafikverket beskriver vägen mellan Gläborg och Kungshamn (väg 162, 171 och 174) som smal, med kurvor och backar, och trafiken ökar med ungefär 50 procent på sommarhalvåret. Vägfärjorna i Hamburgsund och över Gullmarsfjorden är avgiftsfria." },
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogen/ — "Är du morgonpigg kan du vara med när fiskebåtarna landar sina fångster som du senare kan köpa i någon av fiskaffärerna på Smögen."
      { q: "Kan man köpa färsk räka direkt från båten i Smögen?", a: "Tidigt på morgonen kan du se fiskebåtarna landa sin fångst vid Smögen. Fångsten säljs sedan i fiskaffärerna på Smögen." },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Tuvesvik är platsen där färjan (linje 381) till Gullholmen, Härmanö och Käringön avgår."; "Båtresan tar cirka 35 minuter från Tuvesvik till Käringön."; "Nej, Käringön är bilfri. Du parkerar bilen i Tuvesvik och fortsätter med personfärja."; "I Västtrafiks reseplanerare och hemsida hittar du tidtabeller och information om biljetter med färjan från Tuvesvik till Gullholmen och Käringön."
      { q: "Hur tar man sig till Käringön?", a: "Med Västtrafiks personfärja, linje 381, från Tuvesvik på Orust. Resan tar ungefär 35 minuter. Käringön är bilfri, så bilen parkeras i Tuvesvik." },
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/ — "Bästa tiden för skaldjur är höst och vinter då vattnet är kallt och friskt. En gammal regel är att endast månader med bokstaven R i namnet är så kallade skaldjursmånader."
      { q: "När är det säsong för skaldjur i Bohuslän?", a: "Enligt Västsverige är skaldjuren som bäst på hösten och vintern, när vattnet är kallt. En gammal regel säger att bara månader med bokstaven R i namnet är skaldjursmånader." },
    ],
  },
  // ── Batch G: Resterande guider – alla serier ──────────────────────────────────
  {
    slug: "jul-skargarden-2026",
    title: "Jul i skärgården 2026 – julbord, julmarknader och jultrafik",
    excerpt: "Jul i skärgården 2026: julbord på Sandhamn, Utö och Fjäderholmarna, Vaxholms julmarknad 5–6 december och hur Waxholmsbolagets båtar går i december.",
    category: "Säsong", emoji: "🎄", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.sandhamn.com/sv/kalender/julbord — "26 november - 24 december 2026"; https://www.utovardshus.se/julbord/ — "Julbord 2026"; https://www.utovardshus.se/julbord/ — "27 november – 19 december"; https://www.rokeriet-fjaderholmarna.se/julbord — "Julbordet hålls från 20 november till 20 december 2026"; https://www.stromma.com/sv-se/stockholm/julbord/julbordskryssningar-i-stockholms-skargard/ — "Från november 2026"
      { q: "Var finns julbord i skärgården 2026?", a: "Bland annat på Sandhamn Hotell & Restaurang (26 november–24 december 2026), Utö Värdshus (27 november–19 december 2026) och Rökeriet på Fjäderholmarna (20 november–20 december 2026). Strömma har också julbordskryssningar från november 2026." },
      // KÄLLA: https://www.destinationvaxholm.se/events/vaxholms-julmarknad-2026 — "Den andra helgen i advent, 5 – 6 december, är det åter dags för Vaxholms traditionsenliga julmarknad."; https://www.destinationvaxholm.se/events/vaxholms-julmarknad-2026 — "lördag 5 december 2026"
      { q: "När är Vaxholms julmarknad 2026?", a: "Lördag 5 och söndag 6 december 2026, den andra helgen i advent, på Rådhustorget i Vaxholm." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Waxholmsbåt året om till Gruvbryggan."
      { q: "Vilka öar i skärgården kan man åka till i december?", a: "Waxholmsbolaget går året runt till bland annat Sandhamn, Vaxholm, Grinda, Finnhamn och Utö. Restauranger och butiker på öarna har egna öppettider, så kolla dem innan du åker." },
      // KÄLLA: https://waxholmsbolaget.se/artikel/helgtrafik — "I samband med storhelger som till exempel jul, påsk och midsommar går båtarna lite annorlunda än den veckodag som helgen eller klämdagen infaller på."; https://waxholmsbolaget.se/nyheter-och-trafikinfo/dags-for-hosttidtabell — "Hösttidtabellerna gäller mellan 17 augusti och lördagen den 12 december."
      { q: "Hur går Waxholmsbåtarna i jul?", a: "Vid storhelger som jul går båtarna som en annan veckodag än den dag det är. Waxholmsbolaget publicerar en lista på sidan om helgtrafik. Hösttidtabellerna gäller till och med lördag 12 december 2026." },
      // KÄLLA: https://www.rokeriet-fjaderholmarna.se/julbord — "Resan från Strandvägen till Fjäderholmarna tar ca 25 minuter, med stopp vid Nacka Strand."; https://www.rokeriet-fjaderholmarna.se/julbord — "Båtbiljetter tur & retur bokas separat via Strömma."
      { q: "Hur tar man sig till julbordet på Fjäderholmarna?", a: "Med Strömmas båt från Strandvägen, som stannar vid Nacka Strand. Resan tar ungefär 25 minuter, och båtbiljetten bokas separat hos Strömma." },
    ],
  },
  {
    slug: "nyar-skargarden-2026",
    title: "Nyår i skärgården 2026–2027 – fyrverk, öar och stämning",
    excerpt: "Nyårsfirande i skärgården med fyrverkeri reflekterade i havet. Öppna öar, hotell och tips för nyårsnatten ute bland kobbar och klippor.",
    category: "Säsong", emoji: "🎆", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Var firar man nyår i skärgården 2026?', a: 'Sandhamns Värdshus och Waxholms Hotell är klassiska nyårsmiddagsalternativ – boka månader i förväg. Alternativet är en privatstuga på en ö med utsikt mot himlen och egna fyrverkerier.' },
      { q: 'Hur tar man sig till skärgården på nyårsnatten?', a: 'Waxholmsbolaget kör specialtidtabell kring nyår. Kolla tidtabellen i förväg – sista båten kan gå tidigt på kvällen. Övernattning rekommenderas starkt för nyårsfirande i skärgården.' },
    ],
  },
  {
    slug: "pask-skargarden-2027",
    title: "Påskpaket 2027 och påsk 2027 i skärgården – datum och båtar",
    excerpt: "Påsk 2027: påskdagen är 28 mars. Läget för påskpaket 2027 i skärgården, hur båtarna går under påskweekend 2027 och vilka öar som har trafik året runt.",
    category: "Säsong", emoji: "🐣", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253/ — "annandag påsk dagen efter påskdagen"; https://www.bromolla.se/utbildning-barnomsorg/grundskola/lasarstider/ — "Långfredag:26 mars 2027"; https://www.bromolla.se/utbildning-barnomsorg/grundskola/lasarstider/ — "Annandag påsk: 29 mars 2027"
      { q: "När är påsk 2027?", a: "Påskdagen är söndag 28 mars 2027. Långfredag är 26 mars och annandag påsk 29 mars, så påskweekend 2027 är 26–29 mars. Påskafton är lördag 27 mars och skärtorsdag torsdag 25 mars." },
      // KÄLLA: https://www.smadalarogard.se/erbjudanden/sasongens-paket/pasklyx/ — "Detta paket är ej bokningsbart just nu."; https://www.utovardshus.se/erbjudanden/ — "PAKET & ERBJUDANDEN"
      { q: "Finns det påskpaket 2027 i skärgården?", a: "Inte ännu. När vi läste paket- och erbjudandesidorna hos bland annat Utö Värdshus och Smådalarö Gård i september 2026 fanns inget påskpaket för 2027 publicerat. Smådalarö Gårds påskpaket för 2026 finns kvar men är markerat som ej bokningsbart. Bevaka hotellens egna sidor." },
      // KÄLLA: https://waxholmsbolaget.se/artikel/helgtrafik — "Skärtorsdag 2 april: trafiken går som en fredag"; https://waxholmsbolaget.se/artikel/helgtrafik — "Långfredag 3 april: trafiken går som en söndag"
      { q: "Hur går Waxholmsbåtarna under påskweekend 2027?", a: "Listan för påsken 2027 var inte publicerad i september 2026. Påsken 2026 gick båtarna på skärtorsdagen som en fredag, på långfredagen som en söndag, på påskafton som en lördag och på påskdagen och annandag påsk som en söndag. Kolla Waxholmsbolagets sida om helgtrafik före resan." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"; https://waxholmsbolaget.se/reseplanering/resmal/uto — "lite mer sällan övrig tid på året"
      { q: "Vilka öar i Stockholms skärgård kan man åka till i påsk?", a: "Waxholmsbolaget har trafik året runt till bland annat Vaxholm, Sandhamn (från Stavsnäs), Grinda och Utö (från Årsta brygga), men med färre turer än på sommaren." },
      // KÄLLA: https://www.sandhamns-vardshus.se/ — "Öppet året runt."; https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt"; https://fjaderholmarnaskrog.se/ — "FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027."
      { q: "Är restaurangerna i skärgården öppna i påsk?", a: "Vissa. Puben på Sandhamns Värdshus har öppet året runt och Utö Värdshus har öppet året runt enligt Skärgårdsstiftelsen. Andra öppnar senare, till exempel Fjäderholmarnas Krog som öppnar för sommaren den 1 maj 2027. Kolla öppettiderna hos varje ställe." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/meteorologi/arstider/var — "Den meteorologiska definitionen av vår är att dygnsmedeltemperaturen ska vara stigande och över 0,0°C men under 10,0°C."; https://www.smhi.se/kunskapsbanken/meteorologi/arstider/var — "Ofta kommer bakslag med kyliga nordliga vindar och snöfall i både april och maj."
      { q: "Vad är det för väder i påsk i skärgården?", a: "Vårväder. SMHI definierar meteorologisk vår som stigande dygnsmedeltemperatur mellan 0 och 10 grader, och skriver att bakslag med kyliga nordliga vindar och snöfall är vanliga i april och maj. Ta med varma kläder." },
    ],
  },
  {
    slug: "valborg-skargarden-2027",
    title: "Valborg i skärgården 2027 – vårfirande vid havet",
    excerpt: "Valborg den 30 april är en av skärgårdens festligaste kvällar. Brasor, sång och sommarens förkänning ute på öarna.",
    category: "Säsong", emoji: "🔥", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'Hur firar man valborg i skärgården?', a: 'Traditionellt med brasa vid havet, snaps och sång. Många öar håller gemensamma valborgsfiranden med eld och musik. Vaxholm och Fjäderholmarna brukar ha program. Ta med egna granris och visselpipor.' },
      { q: 'Är det möjligt att åka ut i skärgården på valborg?', a: 'Ja – Waxholmsbolaget kör normaltrafik den 30 april och kvällstidtabell kan ha extra avgångar. Säkrast att övernatta – att hinna sista båten hem kan vara knepigt om firandet drar ut.' },
    ],
  },
  {
    slug: "kajakpaddling-bohuslan",
    title: "Kajak i Bohuslän – paddla kajak på västkusten och hyra kajak",
    excerpt: "Kajak i Bohuslän: var du kan paddla kajak på västkusten, kajakuthyrning i Marstrand och Grebbestad, regler i Kosterhavets nationalpark och säkerhet.",
    category: "Aktivitet", emoji: "🛶", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: http://www.marstrandskajaker.se/sv/uthyrning/ — "I hyran ingår kajak, flytväst, paddel, kapell och sjökort."; https://www.nautopp.com/hyra-kajak-bohuslan — "Hyra kajak i Grebbestad - Äventyret börjar vid bryggan, 0 meter från havet."
      { q: "Var kan man hyra kajak i Bohuslän?", a: "Till exempel hos Marstrandskajaker i Marstrand, där flytväst, paddel, kapell och sjökort ingår i hyran, och hos Nautopp Kajakcenter i Grebbestad, som hyr ut havskajaker från bryggan i småbåtshamnen." },
      // KÄLLA: https://www.vastsverige.com/kosterhavets-nationalpark/aktiviteter-i-kosterhavet/kajak-i-kosterhavet/ — "Här i norra Bohuslän kan du paddla kajak i genuin skärgård, från Grebbestad i söder till Strömstad i norr."; https://www.vastsverige.com/bohuslan/naturupplevelser/paddla/paddla-kajak/ — "Bohuslän erbjuder ett pärlband med smidiga startplatser"
      { q: "Var kan man paddla kajak på västkusten?", a: "Längs hela Bohusläns kust finns startplatser. I norra Bohuslän kan du paddla i Kosterhavet från Grebbestad till Strömstad, och längre söderut runt Marstrand och Ramsvikslandet." },
      // KÄLLA: http://www.marstrandskajaker.se/ — "Marstrandskajaker har tillverkat, sålt och hyrt ut kajaker sedan 1979."; http://www.marstrandskajaker.se/sv/uthyrning/ — "Höst, vinter och vår: efter bokning och överenskommelse"
      { q: "Kan man hyra kajak i Marstrand?", a: "Ja. Marstrandskajaker har hyrt ut kajaker sedan 1979. Utanför sommaren hyr de ut efter bokning, och du ska kunna simma och lämna en färdbeskrivning." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "övernatta eller ankra på samma plats mer än två dygn. På Nord- och Sydkoster är övernattning förbudet, förutom på campingplatsen på Nordkoster."; https://www.vastsverige.com/kosterhavets-nationalpark/boende/talta-i-kosterhavet/ — "I de angränsande naturreservaten Norra Långön, Saltö och Västra Rossö är inte tältning tillåten."
      { q: "Får man tälta när man paddlar i Kosterhavet?", a: "Ja, men högst två dygn på samma plats. På Nord- och Sydkoster får du bara övernatta på campingen på Nordkoster, och i reservaten Norra Långön, Saltö och Västra Rossö är tältning inte tillåten." },
      // KÄLLA: https://www.vastsverige.com/bohuslan/naturupplevelser/paddla/kajakkurser/ — "Här lär du dig tekniken som gör paddlingen både roligare och säkrare, oavsett om du är nybörjare eller vill utveckla dina färdigheter."; https://www.sjoraddning.se/artiklar/bli-en-sakrare-paddlare — "Tänk även på att klä dig efter vattentemperaturen och inte efter lufttemperaturen."
      { q: "Behöver man erfarenhet för att paddla kajak i Bohuslän?", a: "Nej, men nybörjare bör gå en kurs eller en guidad tur. Ha alltid flytväst, klä dig efter vattentemperaturen, undvik farleder och paddla helst i grupp." },
    ],
  },
  {
    slug: "vandring-gotland",
    title: "Vandringsleder på Gotland – vandra Klintkustleden och Östkustleden",
    excerpt: "Vandringsleder på Gotland: Klintkustleden 30 km, Östkustleden, Pilgrimsleden och kortare turer från Visby med buss. Vandring på Gotland – leder och regler.",
    category: "Aktivitet", emoji: "🥾", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/langre-vandringsleder-pa-gotland.html — "Leden är 30 km lång och förvaltas av länsstyrelsen."; https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/langre-vandringsleder-pa-gotland.html — "Leden är ca 60 km lång och förvaltas av Svenska Kyrkan."; https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/langre-vandringsleder-pa-gotland.html — "Leden är 17 kilometer lång och förvaltas av länsstyrelsen."
      { q: "Vilka vandringsleder finns på Gotland?", a: "Länsstyrelsen listar fyra längre leder: Klintkustleden (30 km) på nordvästkusten, Östkustleden längs östkusten, Pilgrimsleden S:t Olavsleden (ca 60 km) från Visby till Hellvi och Torsburgenleden (17 km). Region Gotland har dessutom flera kortare leder, rundleder och Gotlandspromenader." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/klintkustleden.html — "För närvarande är leden 30 km lång och markerad med orange band eller brickor."; https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/klintkustleden.html — "arbetar med att förlänga leden ända till Kappelshamn"
      { q: "Hur lång är Klintkustleden på Gotland?", a: "Klintkustleden är 30 km lång och går från Björkume naturreservat till Hallshuk på nordvästkusten. Den är markerad med orange band eller brickor, och Länsstyrelsen arbetar med att förlänga den till Kappelshamn." },
      // KÄLLA: https://gotland.com/article/vandra-fran-visby-till-hogklint/ — "Högklint cirka 7 kilometer söder om Visby"; https://gotland.com/guide/vandra-fran-gnisvard-till-tofta/ — "Hit tar du dig med buss 10"; https://gotland.com/article/vandra-pilgrimsleden-fran-roma-kungsgard-till-dalhem/ — "dit kan du ta buss 11 från Visby"
      { q: "Var kan man vandra på Gotland utan bil?", a: "Från Visby kan du gå till Högklint, ca 7 km söderut, och ta buss 10 tillbaka. Med buss 10 kommer du också till Gnisvärd och stranden mot Tofta, och med buss 11 till Roma Kungsgård där pilgrimsleden mot Dalhem börjar." },
      // KÄLLA: https://gotland.com/companies/ostkustleden/ — "I dag är leden 78 km lång och därmed Gotlands längsta vandringsled"; https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/langre-vandringsleder-pa-gotland.html — "Leden är 73 km lång och förvaltas av Föreningen Östkustleden."
      { q: "Vilken är den längsta vandringsleden på Gotland?", a: "Östkustleden, som går från Närsholmen till Anga prästänge. Gotland.com kallar den Gotlands längsta vandringsled och anger 78 km, medan Länsstyrelsen anger 73 km." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/klintkustleden.html — "Gå aldrig nära klintkanten på grund av rasrisken."; https://www.lansstyrelsen.se/gotland/besoksmal/friluftsliv-och-allemansratt/klintkustleden.html — "De flesta serviceställen och toaletter är stängda under vintersäsongen."
      { q: "Vad ska man tänka på när man vandrar på Gotland?", a: "Gå aldrig nära klintkanten på grund av rasrisken, ta med vatten och mat och tänk på brandfaran när det är torrt. De flesta serviceställen och toaletter längs Klintkustleden är stängda på vintern, och mobiltäckningen är dålig på några platser." },
    ],
  },
  {
    slug: "cykling-gotland",
    title: "Hur lång tid tar det att cykla runt Gotland? Cykelsemester",
    excerpt: "Gotlandsleden runt ön är 540 km. Så lång tid tar det att cykla runt Gotland, cykelleder, hyrcykel och cykel på färjan – allt för din cykelsemester på Gotland.",
    category: "Aktivitet", emoji: "🚴", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://gotland.com/article/cykla-pa-gotland/ — "Gotlandsleden är en skyltad cykelled som tar dig runt ön på mindre bilvägar och cykelvägar. Leden är totalt 540 km lång varav 16 km är separat cykelväg."
      { q: "Hur lång tid tar det att cykla runt Gotland?", a: "Det beror på dagsetapperna. Gotlandsleden, den skyltade cykelleden runt ön, är 540 km. Med 50 km om dagen blir det knappt 11 cykeldagar, med 70 km knappt 8 och med 90 km 6 dagar – plus vilodagar. Region Gotland anger ingen rekommenderad tid." },
      // KÄLLA: https://www.scb.se/hitta-statistik/statistik-efter-amne/boende-bebyggelse-och-mark/markanvandning/strandnara-markanvandning/pong/statistiknyhet/kust-strander-och-oar-2013/ — "Sveriges största ö är Gotland, som har en landyta på nästan 300 000 hektar (3 000 km2) och en omkrets på 800 kilometer."
      { q: "Hur långt och brett är Gotland?", a: "SCB anger att Gotland är Sveriges största ö med en landyta på nästan 3 000 km² och en omkrets på 800 kilometer. Cykelleden runt ön är 540 km. Officiella mått på längd och bredd har vi inte hittat hos Region Gotland, SCB eller Lantmäteriet." },
      // KÄLLA: https://gotland.com/article/cykla-pa-gotland/ — "Det finns bilfri cykelväg längs med länsväg 140 från Visby till Klintehamn och längs länsväg 149 från Visby till Lummelunda."
      { q: "Vilka cykelleder finns på Gotland?", a: "Gotlandsleden går runt hela ön på mindre bilvägar och cykelvägar. Dessutom finns bilfri cykelväg längs länsväg 140 från Visby till Klintehamn och längs länsväg 149 från Visby till Lummelunda." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Det finns möjlighet att hyra cykel i Visby och flera andra platser på ön."; https://rentbike.se/sv/visby-cykeluthyrning — "All cykeluthyrning måste bokas online senast dagen innan."; https://visbyhyrcykel.com/ — "Vi finns precis utanför hamnterminalen när man stiger av båten och uppe vid österport."
      { q: "Var hyr man cykel på Gotland?", a: "I Visby och på flera andra platser på ön. I Visby hamn finns bland andra Rentbike vid Skeppsbron, där all hyra bokas online senast dagen innan, och Visby Hyrcykel utanför hamnterminalen och vid Österport. Kolla priser och öppettider hos uthyraren." },
      // KÄLLA: https://www.destinationgotland.se/allt-om-resan/infor-resan/ — "Elcyklar och cyklar behöver checkas in som fordon. Dessa bokas som cykel."; "Cyklar och mopeder hänvisas till inpasseringen för fordon."
      { q: "Får man ta med cykel på färjan till Gotland?", a: "Ja. Cykeln bokas som cykel hos Destination Gotland, och det gäller även elcyklar. Cyklar går ombord via inpasseringen för fordon." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Får man ta med cykel på bussen?"; "Ja, i mån av plats mot en avgift."
      { q: "Får man ta med cykel på bussen på Gotland?", a: "Ja, i mån av plats och mot en avgift. Det gör det möjligt att korta en etapp och ta bussen tillbaka." },
    ],
  },
  {
    slug: "cykling-oland",
    title: "Cykla på Öland – Ölandsleden, alvaret och cykelfärjan",
    excerpt: "Cykla på Öland: Ölandsleden är 367,9 km och går från fyr till fyr längs hela ön. Om att cykla Öland runt, leder på alvaret, cykelfärjan och cykel på bussen.",
    category: "Aktivitet", emoji: "🚲", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.oland.se/resa/cykelfarjan — "Eftersom det råder cykel- och gångförbud på Ölandsbron"; https://www.oland.se/cykla — "Det går också att ta med cykeln på bussen i mån av plats."
      { q: "Får man cykla över Ölandsbron?", a: "Nej. Det är förbjudet att gå och cykla på Ölandsbron. Under sommaren kan du ta cykelfärjan Dessi mellan Kalmar och Färjestaden, och året runt kan cykeln följa med på bussen i mån av plats." },
      // KÄLLA: https://www.borgholm.se/cykel-och-vandringsleder/ — "Ölandsleden 367,9 km"; https://www.morbylanga.se/uppleva-och-gora/idrott-motion-natur-och-friluftsliv/cykel-vandringsleder-och-naturreservat/ — "Från fyr till fyr sträcker sig denna cykelled"
      { q: "Hur lång är Ölandsleden?", a: "Ölandsleden är 367,9 km enligt Borgholms kommun. Den går från fyr till fyr genom hela ön, och du kan välja att cykla bara delar av den." },
      // KÄLLA: https://kalmar.se/trafik-och-resor/buss-bat-och-tag/bat.html — "Dessi är Kalmarsundstrafikens cykel- och passagerarfärja mellan Kalmar (Tullhamnen) och Färjestadens hamn. Resan tar cirka 30 minuter."; https://kalmarlanstrafik.se/trafiken/bat/cykelfarjan-dessi/ — "En (1) cykel får tas med per person och biljett."
      { q: "Hur tar man med cykeln på färjan till Öland?", a: "Cykelfärjan Dessi går mellan Tullhamnen i Kalmar och Färjestadens hamn på sommaren, och resan tar cirka 30 minuter. En cykel per person och biljett får följa med, och det finns plats för upp till 50 cyklar." },
      // KÄLLA: https://www.oland.se/cykla — "Ölandsleden som slingrar sig längs med hela ön"; https://www.borgholm.se/cykel-och-vandringsleder/ — "Ölandsleden 367,9 km"; https://www.morbylanga.se/uppleva-och-gora/idrott-motion-natur-och-friluftsliv/cykel-vandringsleder-och-naturreservat/olandsleden/ — "Söker ni en ordentlig utmaning så kan ni cykla hela leden men annars så går det lika bra att välja ut specifika delar"
      { q: "Kan man cykla Öland runt?", a: "Ja, längs Ölandsleden, som går längs hela ön från fyr till fyr. Borgholms kommun anger längden till 367,9 km. Du kan cykla hela leden eller bara delar av den." },
      // KÄLLA: https://www.morbylanga.se/uppleva-och-gora/idrott-motion-natur-och-friluftsliv/cykel-vandringsleder-och-naturreservat/ — "En cyklingsbar vandringsled på alvaret från Karlevi till Möckelmossen. Längd: 13 km."; https://www.morbylanga.se/uppleva-och-gora/idrott-motion-natur-och-friluftsliv/cykel-vandringsleder-och-naturreservat/stora-alvarleden/ — "Har man med sig cykel kan den behöva ledas bitvis."
      { q: "Var kan man cykla på alvaret på Öland?", a: "Stora Alvarleden i Mörbylånga kommun är en vandringsled på alvaret mellan Karlevi och Möckelmossen som går att cykla, 13 km. Vägen är av mycket enkel standard, så cykeln kan behöva ledas en bit ibland." },
      // KÄLLA: https://www.oland.se/cykla/cykeluthyrning — "Här finns även möjligheten att hyra på en plats och lämna på en annan. De flesta cykeluthyrare ligger i anslutning till busshållplatser."
      { q: "Var hyr man cykel på Öland?", a: "oland.se har en lista över cykeluthyrare på ön. Hos en del kan du hyra på en plats och lämna på en annan, och de flesta ligger nära en busshållplats." },
    ],
  },
  {
    slug: "snorkling-kosterhavet",
    // KÄLLA: kosterhavet.se (Länsstyrelsen) — omkring 6 000 arter, närmare 300 bara här i Sverige (läst 2026-09-14). "Europas artrikaste marina miljö" är obelagt, borttaget.
    title: "Snorkla i Kosterhavet – snorkelled, korallrev och nationalparken",
    excerpt: "Snorkla i Kosterhavet: snorkelleder vid Rörvik på Sydkoster och i Hasslebukten på Saltö, fakta om Kosterhavets korallrev, naturum, regler och Kosterbåtarna.",
    category: "Aktivitet", emoji: "🤿", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/aktiviteter/snorkelleder — "Det finns två snorkelleder i området. En vid Rörvik på Sydkoster och en i Hasslebukten på Saltö."; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "Dyk eller snorkla i tareskogar och ålgräsängar"
      { q: "Var kan man snorkla i Kosterhavet?", a: "Kosterhavets nationalpark har två snorkelleder: en vid Rörvik på Sydkoster och en i Hasslebukten på Saltö. Du kan också snorkla i tareskogar och ålgräsängar i hela nationalparken." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/aktiviteter/snorkelleder — "Snorkellederna är cirka 200 meter långa och ligger på 1–1,5 meters djup."; https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/aktiviteter/snorkelleder — "På botten ligger åtta informationsskyltar som berättar om vad du kan se längs vägen."
      { q: "Hur lång är snorkelleden på Koster?", a: "Snorkellederna är cirka 200 meter långa och ligger på 1–1,5 meters djup. Du följer en lina på botten, och åtta skyltar under vattnet berättar vad du kan se. Skyltarna är markerade med bojar med flagga." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "Här finns rev av kallvattenskoraller som utgör en livsmiljö för hundratals djurarter."; https://www.sverigesnationalparker.se/globalassets/kosterhavet/dokument/sv/kosterhavet-under-ytan-sv.pdf — "I Säcken norr om Strömstad finns Sveriges enda levande korallrev."; https://www.vastsverige.com/kosterhavets-nationalpark/artiklar/kosterhavet-under-ytan/ — "Sveriges enda korallrev ligger i Kosterhavet, på 85 meters djup?"
      { q: "Finns det korallrev i Kosterhavet?", a: "Ja. I Kosterhavet finns rev av kallvattenskorallen ögonkorall, och i Säcken norr om Strömstad finns Sveriges enda levande korallrev. Revet ligger djupt – Västsverige anger 85 meter – så du ser det inte när du snorklar." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/besok-parken/hitta-hit — "De avgår från Strömstad året runt och resan tar ungefär 45 minuter."; https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/besok-parken/hitta-hit — "Hit finns det vägförbindelse och du kan ta dig dit med egen bil eller kollektivt."
      { q: "Hur tar man sig till Kosterhavet för att snorkla?", a: "Ta Kosterbåtarna från Strömstad. De går året runt och resan tar ungefär 45 minuter. Till snorkelleden på Saltö finns vägförbindelse, så dit kan du åka bil eller kollektivt." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/aktiviteter/snorkelleder — "Det kan vara bra att ha ett par fenor och om vattnet är kallt är det bra med våtdräkt. Tänk på att inte snorkla ensam eller att åtminstone ha någon på land som håller uppsikt."
      { q: "Behöver man våtdräkt för att snorkla i Kosterhavet?", a: "Nationalparken rekommenderar våtdräkt om vattnet är kallt och gärna fenor. Snorkla inte ensam, eller ha någon på land som håller uppsikt." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "plocka ostron."; https://www.sverigesnationalparker.se/globalassets/kosterhavet/dokument/sv/kosterhavet-under-ytan-sv.pdf — "Observera att det inte är tillåtet att plocka ostron i Kosterhavet."
      { q: "Får man plocka ostron i Kosterhavet?", a: "Nej. Det är förbjudet att plocka ostron i Kosterhavets nationalpark." },
    ],
  },
  {
    slug: "ostronstangning-bohuslan",
    title: "Ostronplockning i Bohuslän – ostron säsong och ostronsafari",
    excerpt: "Ostronplockning på västkusten: regler för att plocka ostron, när det är säsong för ostron och ostronsafari i Grebbestad och Lysekil, med Livsmedelsverkets råd.",
    category: "Aktivitet", emoji: "🦪", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/ostron----minimimatt-och-fiskemetoder.html — "Det krävs i regel markägarnas tillstånd för att plocka ostron."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/ostron----minimimatt-och-fiskemetoder.html — "inom 200 meter från fastlandet eller från en ö av minst 100 meters längd"; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/fiskeregler-for-fritidsfiske.html — "Allemansrätten gäller inte fiske."
      { q: "Får man plocka ostron själv på västkusten?", a: "I regel krävs markägarens tillstånd. Fiske efter ostron är förbehållet den som äger fiskerätten inom 200 meter från fastlandet eller från en ö som är minst 100 meter lång, och allemansrätten gäller inte fiske. Det enklaste är att följa med på en ostronsafari." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/ostron----minimimatt-och-fiskemetoder.html — "Det är tillåtet att fiska ostron året om i svenska vatten."; https://tanumstrand.se/attgora/skaldjur/ — "Alltså september till april."; https://ostronakademien.se/ — "Ostronets Dag i Grebbestad firas numera alltid lördag v37!"
      { q: "När är det säsong för ostron i Bohuslän?", a: "Ostron får fiskas året om i svenska vatten. Enligt tumregeln äter man skaldjur under månaderna med R, alltså september till april. I Grebbestad inleds säsongen med Ostronets dag, som numera firas på lördagen i vecka 37." },
      // KÄLLA: https://klemmingsdyk.se/ostronsafari/ — "Här fiskar du ostron med hjälp av vattenkikare och håv."; https://klemmingsdyk.se/ostronsafari/ — "2026 kör vi ostronsafari varje fredag och lördag mellan den 18/4-27/6 och 29/8-31/10."; https://www.lysekilsostronomusslor.se/ — "Ostron och musselturen startar i Norra Hamnen i Lysekil."
      { q: "Var kan man gå på ostronsafari på västkusten?", a: "I Grebbestad kör Bröderna Klemmings Dykhjälp ostronsafari, där du fiskar ostron med vattenkikare och håv. Hösten 2026 går den fredagar och lördagar 29 augusti–31 oktober. I Lysekil kör Lysekils Ostron & Musslor en båttur förbi ostronbankarna från Norra hamnen." },
      // KÄLLA: https://www.lysekilsostronomusslor.se/ — "Mellan 1 mars och 30 november avgår turen fredagar och lördagar kl 12.30."; https://www.lysekilsostronomusslor.se/ — "Turen utgår från Norra hamnen i Lysekil och tar ca 3 timmar."; https://www.lysekilsostronomusslor.se/ — "Vi lägger till på Käringeholmen där vi bjuder på tillagade musslor och ostron som öppnas och avnjuts vid strandkanten."
      { q: "Kan man gå på ostronsafari i Lysekil?", a: "Ja, Lysekils Ostron & Musslor kör en ostron- och musseltur med träyachten Signe. Turen går fredagar och lördagar mellan 1 mars och 30 november, tar cirka 3 timmar och avslutas med ostron och musslor på Käringeholmen." },
      // KÄLLA: https://www.livsmedelsverket.se/livsmedel-och-innehall/oonskade-amnen/marina-algtoxiner/ — "Ät inte musslor och ostron som plockats direkt från hav och strand om dessa inte är kontrollerade."; https://www.livsmedelsverket.se/livsmedel-och-innehall/oonskade-amnen/marina-algtoxiner/ — "Marina algtoxiner kan inte kokas bort."
      { q: "Är det farligt att äta ostron man plockat själv?", a: "Livsmedelsverket avråder från att äta okontrollerade ostron som plockats direkt från hav och strand. De kan innehålla algtoxiner, som inte känns på smaken och inte går att koka bort, samt bakterier och virus." },
      // KÄLLA: https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/kostrad-vuxna/fisk/musslor-och-ostron/ — "Att äta råa ostron eller musslor innebär därför en större risk att bli magsjuk av norovirus än om du äter dem upphettade."; https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/kostrad-vuxna/fisk/musslor-och-ostron/ — "Vid gratinering av musslor och ostron behöver de gratineras i 10 minuter för att virus ska förstöras."
      { q: "Hur äter man ostron säkrast?", a: "Råa ostron ger större risk för magsjuka av norovirus än upphettade. Om du gratinerar ostron ska de gratineras i 10 minuter för att virus ska förstöras. Algtoxiner förstörs däremot inte av värme." },
    ],
  },
  {
    slug: "hyra-stuga-skargarden",
    title: "Hyra stuga i skärgården – hyra skärgårdsstuga eller skärgårdshus",
    excerpt: "Hyra stuga i skärgården: Skärgårdsstiftelsen hyr ut stugor veckovis, STF har egna hus och öarnas stugbyar bokas direkt. Så hittar du en skärgårdsstuga.",
    category: "Praktisk", emoji: "🏡", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/ — "Boka ett naturnära boende i Skärgårdsstiftelsens egen regi."; https://skargardsstiftelsen.se/omraden/uto/ — "erbjuder Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis"; https://nattaro.se/boende/ — "På Nåttarö har vi 50 stycken semesterstugor"
      { q: "Var kan man hyra stuga i skärgården?", a: "I Stockholms skärgård hyr Skärgårdsstiftelsen ut stugor och hus i egen regi, bland annat på Utö, Gålö, Fjärdlång och Örskär. STF har boenden på flera öar, och stugbyar som Nåttarö och Grinda bokas direkt på sina egna webbplatser." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/galo/ — "Skärgårdsstiftelsen har även flera stugor som går att hyra veckovis från vår till höst."; https://skargardsstiftelsen.se/omraden/fjardlang/ — "Skärgårdsstiftelsen hyr ut det pittoreska torpet Norrötorpet som går att hyra veckovis från maj till september."
      { q: "Kan man hyra skärgårdsstuga av Skärgårdsstiftelsen?", a: "Ja. Skärgårdsstiftelsen hyr ut stugor och hus veckovis, till exempel på Utö och Gålö och torpet Norrötorpet på Fjärdlång. Bokningen görs via \"Boka boende\" på skargardsstiftelsen.se." },
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/ — "Boka ett eget hus"; https://www.svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/ — "stugor nära badviken, gästhamnen och handelsboden"
      { q: "Var kan man hyra skärgårdshus med STF?", a: "På STF:s sidor för bland annat Finnhamn, Gällnö, Möja och Stora Kalholmen finns valet \"Boka ett eget hus\". På Gällnö ligger STF:s stugor nära badviken, gästhamnen och handelsboden." },
      // KÄLLA: https://nattaro.se/boende/ — "Klicka här för prislista 2027"; https://grinda.se/boende/stugby/ — "Boka stuga"
      { q: "Vad kostar det att hyra stuga i skärgården?", a: "Det varierar mellan uthyrarna, och vi anger inga priser här. Nåttarö och Grinda har prislistor och onlinebokning på sina egna webbplatser, och Skärgårdsstiftelsen visar pris när du bokar." },
      // KÄLLA: https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson.-vad-ska-jag-tanka-pa — "Betala inte hyra i förskott"; https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson.-vad-ska-jag-tanka-pa — "Be om fastighetens beteckning eller adress och sök hos Lantmäteriet."
      { q: "Vad ska man tänka på när man hyr stuga av en privatperson?", a: "Konsumentverket råder dig att kontrollera uthyrarens namn och telefonnummer, att inte betala hyran i förskott, att kontrollera adressen hos Lantmäteriet, att be om referenser och att ta reda på reglerna för avbokning." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/fjardlang/ — "På närliggande ön Myggskären går det att övernatta gratis året runt i våra öppna bodar"; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/oppna-bodar-och-raststugor/ — "Hit är du välkommen att stanna högst två nätter."
      { q: "Kan man övernatta gratis i en stuga i skärgården?", a: "Ja, i Skärgårdsstiftelsens öppna bodar, till exempel på Myggskären vid Fjärdlång, går det att övernatta gratis året runt. Bodarna går inte att förboka, du får stanna högst två nätter och det är först till kvarn som gäller." },
    ],
  },
  {
    slug: "hyra-stuga-gotland",
    title: "Hyra stuga på Gotland 2026 – stugbyar och så bokar du boende",
    excerpt: "Hyra stuga på Gotland 2026: stugbyar och campingar med stugor i Visby, Tofta, Ljugarn, Fårö och Burgsvik, paket med färjan och hur du bokar boende på Gotland.",
    category: "Praktisk", emoji: "🏘", readTime: "4 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.destinationgotland.se/boende/ — "Hitta rätt stuga eller lägenhet för din Gotlandsvistelse, nära havet, naturen eller mitt i Visby. Resan tur och retur med Gotlandsfärjan ingår."; https://kneippbyn.se/boende/semesterstugor/ — "Välkommen till Kneippbyn Resort Visby, vackert beläget vid havet strax söder om Visby"; https://visbystrandby.se/sv/ — "Stugbyn erbjuder flera varianter av stugor."; https://www.toftacamping.se/stugor/ — "Stugorna hyrs ut dygns- eller veckovis, minimum är två dygn."; https://semesterby.se/ — "bo bekvämt i stugor eller campingområdet"; https://www.sudersand.se/sv/boenden — "Vi har över 100 fantastiska stugor med 2 till 6 bäddar på anläggningen."; https://gotland.com/besoka-uppleva/hitta-boende/ — "Här hittar du allt från enkla campingstugor till större och lyxigare hus/stugor."
      { q: "Var kan man hyra stuga på Gotland 2026?", a: "Destination Gotland säljer stugor och lägenheter i paket med färjeresan tur och retur. Du kan också boka direkt hos stugbyar och campingar med stugor, till exempel Kneippbyn söder om Visby, Visby Strandby, Tofta Camping, Ljugarn Semesterby och Sudersand Resort på Fårö. Gotland.com har en lista över stugor och stugbyar." },
      // KÄLLA: https://gotland.com/om-gotland-com/ — "Gotland.com är en icke-kommersiell sajt som ägs och drivs av Region Gotland."; https://semesterby.se/ — "Resepaketet inkluderar boende i Stuga på Ljugarn Semesterby samt personbiljett tur och retur med Gotlandsfärjan."; https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson.-vad-ska-jag-tanka-pa — "Ta reda på vilka av- och ombokningsregler som gäller"
      { q: "Hur bokar man boende på Gotland 2026?", a: "Antingen som paket med färjan hos Destination Gotland eller en stugby som säljer paket, direkt på stugbyns egen webbplats, eller via listan Hitta boende på gotland.com, som ägs och drivs av Region Gotland. Kolla avboknings- och ombokningsreglerna innan du betalar." },
      // KÄLLA: https://www.sudersand.se/sv — "Men vet du att du kan bo i stuga, villa och till och med campa året runt på Sudersand?"; https://gotland.com/besoka-uppleva/hitta-boende/ — "Gotland bjuder på många härliga boendemöjligheter, året om och runtom hela ön."
      { q: "Kan man hyra stuga på Gotland året runt?", a: "Ja, på vissa ställen. Sudersand Resort på Fårö skriver att man kan bo i stuga och villa året runt, och gotland.com listar boende året om över hela ön. Flera stugbyar tar redan emot bokningar för 2027." },
      // KÄLLA: https://visbystrandby.se/sv/ — "Bo vid havet, 2 km från Visby Innerstad."; https://www.toftacamping.se/ — "Här finns olika boendemöjligheter fördelat på campingtomter, campingstugor, tält och studios med hotellstandard."; https://semesterby.se/ — "Ljugarn Semesterby är en charmig semesterort på Gotlands östkust."; https://www.sudersand.se/sv/boenden — "Välj mellan familjestugor, parstugor och campingstugor!"; https://www.fideaventyrsby.se/ — "Sju mil söder om Visby, längst in i Burgsviken, hittar man Fide Äventyrsby & Camping"
      { q: "Vilka stugbyar finns på Gotland?", a: "Några som vi har kontrollerat på deras egna sidor: Kneippbyn Resort och Visby Strandby vid Visby, Tofta Camping på västkusten, Ljugarn Semesterby på östkusten, Sudersand Resort på Fårö och Fide Äventyrsby & Camping i Burgsviken på södra Gotland." },
      // KÄLLA: https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson.-vad-ska-jag-tanka-pa — "Betala inte hyra i förskott"; "Det är generellt sätt tryggare att hyra av ett företag som förmedlar boende."
      { q: "Vad ska man tänka på när man hyr stuga av en privatperson?", a: "Konsumentverket råder dig att kontrollera uthyrarens namn och telefonnummer, inte betala i förskott, kolla adressen hos Lantmäteriet, be om referenser, inte låta dig stressas och ta reda på avbokningsreglerna. Det är generellt tryggare att hyra via ett företag som förmedlar boende." },
      // KÄLLA: https://gotland.com/gotland-convention-bureau/resa-till-och-fran-on/ — "Ta färjan från Nynäshamn eller Oskarshamn – överfarten tar cirka tre timmar – eller flyg direkt från Stockholm och landa i Visby på runt 40 minuter."
      { q: "Hur tar man sig till Gotland?", a: "Med färja från Nynäshamn eller Oskarshamn till Visby, cirka tre timmar, eller med flyg från Stockholm, runt 40 minuter." },
    ],
  },
  {
    slug: "faro-guide",
    title: "Fårö – Bergmans ö, raukar och Sudersand på norra Gotland",
    excerpt: "Fårö är Bergmans ö på norra Gotland. Så tar du avgiftsfria färjan från Fårösund, hittar raukar vid Langhammars och Digerhuvud, Sudersand och Bergmancenter.",
    category: "Region", emoji: "🎬", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://gotland.com/article/bergman-island-2/ — "He came to live and work there for al – most 40 years."; https://gotland.com/article/bergman-island-2/ — "Ingmar Bergman died at the age of 89 at his home on Fårö and is buried in Fårö Church Cemetery"
      { q: "Varför kallas Fårö Bergmans ö?", a: "Ingmar Bergman kom till Fårö 1960 för att hitta inspelningsplats till Såsom i en spegel, byggde sedan hus på ön och bodde och arbetade där i nästan 40 år. Han dog i sitt hem på Fårö och är begravd på Fårö kyrkogård." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "Färjeledens längd är 1300 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri."; https://gotland.com/besoka-uppleva/upptack-norra-gotland/ — "Färjan till Fårö går varje hel och halv timme från Fårösund året runt"
      { q: "Hur tar man sig till Fårö från Gotland?", a: "Med Fåröfärjan (Fårösundsleden) från Fårösund på norra Gotland till Broa på Fårö. Överfarten tar sex minuter och är avgiftsfri. Färjan går varje hel och halv timme året runt och oftare på sommaren." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/langhammars.html — "Raukarna finns även avbildade på baksidan av den svenska 200 kronorssedeln."; https://gotland.com/besoka-uppleva/friluftsliv-natur/tio-raukomraden-pa-gotland/ — "Digerhuvud är Sveriges största raukområde och sträcker sig 3500 meter längs Fårös västra kust."
      { q: "Var finns raukarna på Fårö?", a: "I naturreservaten Langhammars på nordligaste Fårö, Digerhuvud längs nordvästra kusten och Gamla hamn nordväst om Fårö kyrka. Langhammars raukar finns på baksidan av 200-kronorssedeln, och Digerhuvud är enligt Gotlands besöksguide Sveriges största raukområde." },
      // KÄLLA: https://www.ingmarbergman.se/verk/skammen — "Skammen var den första filmen som Bergman spelade in på Fårö efter att han bosatt sig på ön."
      { q: "Spelades Bergmans Skammen in vid Sudersand?", a: "Skammen spelades in på Fårö hösten 1967 och var den första filmen Bergman gjorde på ön efter att han bosatt sig där. Stiftelsen Ingmar Bergman anger inte vilka platser på Fårö som användes, så vi kan inte bekräfta att det var vid Sudersand." },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/langhammars.html — "Langhammars ligger på nordligaste Fårö"
      { q: "Vad är Gotlands nordligaste punkt?", a: "Gotlands norra spets är Fårö, och Länsstyrelsen beskriver raukreservatet Langhammars som beläget på nordligaste Fårö. Den exakta nordligaste udden anges inte av källorna." },
      // KÄLLA: https://bergmancenter.se/besok-oss — "Bergmancenter ligger mitt på Fårö nära Fårö kyrka, 7 km från färjeläget Broa och är enkelt att hitta till."
      { q: "Var ligger Bergmancenter på Fårö?", a: "Mitt på Fårö nära Fårö kyrka, sju kilometer från färjeläget i Broa. Där finns basutställningen om Bergman och Fårö, en biograf med 64 platser, ett referensbibliotek och Kafé Smultronstället." },
    ],
  },
  {
    slug: "ulvon-guide",
    title: "Ulvön guide – surströmmingens hemort i Höga Kusten",
    excerpt: "Ulvön i Höga Kusten är surströmmingens heliga land och en av Norrlands vackraste öar. Guide till transport, mat och upplevelserna.",
    category: "Region", emoji: "🐟", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Ulvön?', a: 'Med M/S Ulvön eller privata båtoperatörer från Ullånger eller Docksta längs Höga Kusten. Resan tar ca 45–60 minuter. Ön trafikeras under sommarsäsongen och vissa helger utanför säsong.' },
      { q: 'Vad är surströmming och varför är Ulvön berömt?', a: 'Surströmming är fermenterad östersjöströmming – en svensk tradition i 500 år. Ulvöns surströmmingsfabrik är en av de sista aktiva. Traditionell avsmakningssätt: tunnbröd, mandelpotatis och rödlök ute i det fria.' },
    ],
  },
  {
    slug: "grebbestad-guide",
    title: "Fisketur i Grebbestad – ostron, ostronsafari och hummerfiske",
    excerpt: "Fisketur i Grebbestad: krabb-, hummer- och havsöringsfiske. Ostron i Grebbestad med ostronsafari 2026, Ostronets dag, parkering och resan dit.",
    category: "Region", emoji: "🦞", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.skargardsidyllen.se/fisketurer/ — "Fisketurerna varar vanligtvis 2 timmar inklusive en lättare fika vid en läsida."; https://www.skargardsidyllen.se/fisketurer/ — "Med våra egna båtar erbjuder vi mindre sällskap om 2-5 personer"; https://www.skargardsidyllen.se/kontakt/ — "Vårt huvudcenter i Grönemad, Grebbestad har öppet året om"
      { q: "Kan man åka på fisketur i Grebbestad?", a: "Ja. Skärgårdsidyllen, med huvudcenter i Grönemad i Grebbestad, har fisketurer där du vittjar krabb- eller hummertinor beroende på säsong. Turerna varar vanligtvis 2 timmar inklusive fika. Egna båtar tar 2–5 personer och med samarbetspartner upp till 12." },
      // KÄLLA: https://tanumstrand.se/attgora/ostron/ — "I samband med att vi har våra kräftkok i Sjöboden Udden har vi också ha ostronsmakning."; https://ostronakademien.se/ — "Ostronets Dag i Grebbestad firas numera alltid lördag v37!"
      { q: "Var kan man äta ostron i Grebbestad?", a: "TanumStrand har ostronsmakning i Sjöboden Udden i samband med sina kräftkok och serverar ostron igen från Ostronets dag i september. På Ostronets dag, lördagen i vecka 37, serverar restauranger och pubar i Grebbestad ostron." },
      // KÄLLA: https://klemmingsdyk.se/ostronsafari/ — "2026 kör vi ostronsafari varje fredag och lördag mellan den 18/4-27/6 och 29/8-31/10."; https://klemmingsdyk.se/ostronsafari/ — "Norra edsvik 8, 2km norr om Grebbestad"
      { q: "När går ostronsafari i Grebbestad 2026?", a: "Bröderna Klemmings Dykhjälp kör ostronsafari fredagar och lördagar 18 april–27 juni och 29 augusti–31 oktober 2026. Turen tar 4 timmar och startar vid deras center på Norra Edsvik, 2 km norr om Grebbestad. Bokning sker via e-post." },
      // KÄLLA: https://www.vastsverige.com/tanum/se--gora/grebbestad/ — "Bästa tiden för skaldjur är höst och vinter då vattnet är kallt och friskt. En gammal regel är att endast månader med bokstaven R i namnet är så kallade skaldjursmånader."
      { q: "När är säsongen för ostron i Grebbestad?", a: "Västsveriges turistsida rekommenderar höst och vinter för skaldjur, när vattnet är kallt. Enligt en gammal regel är bara månader med bokstaven R i namnet skaldjursmånader." },
      // KÄLLA: https://www.vastsverige.com/tanum/service/res-hit/ — "Lokala bussar stannar vid tågstationen, så du kan ta dig vidare inom kommunen."; https://www.vastsverige.com/tanum/service/res-hit/ — "Långtidsparkeringar i tätorterna Grebbestad, Fjällbacka och Hamburgsund ligger cirka 10 minuter promenad från centrum."
      { q: "Hur tar man sig till Grebbestad?", a: "Med lokaltåg på Bohusbanan till stationen strax utanför Tanumshede och sedan lokalbuss, som stannar vid stationen. Sök resan i Västtrafiks reseplanerare. Med bil finns långtidsparkeringar cirka 10 minuters promenad från centrum." },
    ],
  },
  // KÄLLA: Länsstyrelsen Västra Götaland, Kosterhavets nationalpark (2009) (läst 2026-09-14)
  { slug: "stromstad-guide", title: "Strömstad guide – nära norska gränsen och Kosterfjorden", excerpt: "Strömstad är Sveriges nordligaste kuststad och porten till Kosterhavets nationalpark och norska Strömstads-arkipelagen.", category: "Region", emoji: "🏴", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Strömstad?', a: 'Med tåg (Bohusbanan) från Göteborg ca 2 timmar, eller bil via E6 ca 17 mil norr om Göteborg. Strömstad är startpunkten för färjan till Kosteröarna.' }, { q: 'Kan man besöka Norge från Strömstad?', a: 'Ja – norska gränsen är 15 km bort. Norska Kosterfjordarkipelagen och Hvaler skärgård nås med båt.' }] },
  { slug: "hano-guide", title: "Hanö guide – Blekinges ytterskärgård och ostindiefararen", excerpt: "Hanö är Blekinges mest dramatiska ö med rik historia kring engelska sjömän och ostindiefararnas tid. Guide till den lilla pärlans hemligheter.", category: "Region", emoji: "⚓", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Hanö?', a: 'Med reguljär båt från Sölvesborg i Blekinge – ca 1 timme. Bilfri ö med sommartrafik.' }, { q: 'Vad är Hanö känt för?', a: 'Brittiska flottan använde Hanö 1810–1814 under Napoleonkrigen. Engelska sjömäns gravstenar, ett gammalt fyrtorn och dramatisk klippmiljö.' }] },
  {
    slug: "bastad-guide",
    title: "Båstad guide – Båstad tenniscenter, Hovs hallar och Hallands Väderö",
    excerpt: "Båstad tenniscenter är Båstad Sportcenter med Båstad Tennissällskap. Här finns också Nordea Open, Hovs hallar, Skåneleden och båten till Hallands Väderö.",
    category: "Region", emoji: "🎾", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.skaneleden.se/plats/bastad-sportcenterbastad-tennis-sallskap — "Tennisverksamheten är naturligtvis den största av våra verksamheter och drivs av Båstad Tennissällskap (tidigare BMTS)"; https://bastadts.se/bts — "Med 14 utomhusbanor och 7 inomhusbanor, gym, logi och restaurang erbjuder vi tennis och gemenskap året runt."
      { q: "Vad är Båstad tenniscenter?", a: "Tennisanläggningen i Båstad är Båstad Sportcenter, där tennisen drivs av Båstad Tennissällskap. Klubben har 14 utomhusbanor och 7 inomhusbanor och dessutom gym, logi och restaurang, så det går att spela tennis året runt." },
      // KÄLLA: https://book.bastad.com/sv/adventure/895-nordea-open?type=events — "Tillgänglig från: juli"; https://book.bastad.com/sv/adventure/895-nordea-open?type=events — "Nordea Open är en efterlängtad årlig professionell tennisturnering för herrar"
      { q: "När spelas tennisturneringen i Båstad?", a: "Nordea Open spelas i juli på Båstad tennisstadion. Det är en årlig professionell turnering för herrar på grus." },
      // KÄLLA: https://www.skaneleden.se/etapp/16-bastad-hovs-hallar — "16 Båstad - Hovs hallar"; https://www.lansstyrelsen.se/skane/besoksmal/naturreservat/bastad/bjarekusten-med-hovs-hallar.html — "för den som tar sig hit väntar grottlika bergsformationer och högresta raukar"; https://www.lansstyrelsen.se/skane/besoksmal/naturreservat/bastad/hallands-vadero.html — "Runt ön ses ofta knubbsälar ligga och vila på klipporna."
      { q: "Vad kan man göra i Båstad utöver tennis?", a: "Vandra Skåneleden från Båstad till Hovs hallar, där klippkusten har raukar och grottlika bergsformationer, eller åk båt till naturreservatet Hallands Väderö och se sälar." },
      // KÄLLA: https://www.skaneleden.se/etapp/16-bastad-hovs-hallar — "16 km"; https://www.skaneleden.se/etapp/16-bastad-hovs-hallar — "4-5 timmar"
      { q: "Hur långt är det att vandra från Båstad till Hovs hallar?", a: "Skåneledens etapp 16 mellan Båstad och Hovs hallar är 16 km. Den är klassad som röd (utmanande) och tar 4–5 timmar." },
      // KÄLLA: https://www.lansstyrelsen.se/skane/besoksmal/naturreservat/bastad/hallands-vadero.html — "På sommaren går de från Torekov och Båstad till Sandhamn på ön, övrig tid på året måste du beställa båttur."
      { q: "Hur kommer man till Hallands Väderö?", a: "Med Väderötrafikens turbåtar, som på sommaren går från Torekov och Båstad till Sandhamn på ön. Resten av året måste du beställa båttur." },
      // KÄLLA: https://www.lansstyrelsen.se/skane/besoksmal/naturreservat/bastad/bjarekusten-med-hovs-hallar.html — "Kommun: Båstad"; https://bastad.com/artiklar/hallands-vadero-forever — "Dessutom heter den Hallands Väderö, fast den ligger i Skåne."; https://www.lansstyrelsen.se/skane/besoksmal/naturreservat/bastad/bjarekusten-med-hovs-hallar.html — "Förvaltare: Länsstyrelsen Skåne"
      { q: "Ligger Båstad i Skåne eller Halland?", a: "Båstad ligger i Skåne. Kommunens naturreservat, som Bjärekusten med Hovs hallar, förvaltas av Länsstyrelsen Skåne, och även Hallands Väderö ligger i Skåne trots namnet." },
    ],
  },
  {
    slug: "skargard-instagramguide",
    title: "Fotoplatser i skärgården – Sandhamn, Arholma och drönarregler",
    excerpt: "Fotoplatser i Stockholms skärgård med källa: Sandhamn, Arholma båk, Utö och Grinda. Plus regler för fågelskydd, drönare och spridningstillstånd för Instagram.",
    category: "Aktivitet", emoji: "📸", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/arholma/ — "erbjuder en fantastisk utsikt över Ålands hav"; https://skargardsstiftelsen.se/omraden/fjardlang/ — "Tysta Klint, där du belönas med vidsträckt utsikt över öar och hav"; https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Klubbudden, öns högsta punkt"
      { q: "Var kan man fotografera i Stockholms skärgård?", a: "Några platser där Skärgårdsstiftelsen och Waxholmsbolaget själva beskriver utsikten eller landmärket: Arholma båk med utsikt över Ålands hav, Tysta Klint på Fjärdlång, utkikstornet på Björnö, Klubbudden på Grinda och hamnen och stränderna på Sandhamn." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Du kan åka till Sandhamn med båt från Stavsnäs och då tar resan drygt en timme."; https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn — "Trouville ligger omkring 20 minuters promenad från hamnen."
      { q: "Hur tar man sig till Sandhamn för att fotografera?", a: "Med Waxholmsbolaget från Stavsnäs året runt, drygt en timmes resa. På sommaren går det också båt från Strömkajen. Stranden Trouville ligger omkring 20 minuters promenad från hamnen." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang/gryning-och-skymning — "I södra Sverige är den borgerliga skymningen som allra kortast kring vår och höstdagjämningarna, knappt 40 minuter. På sommaren är den där omkring 1 timme lång."; https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang/vad-ar-ett-solbanediagram — "Där går solen alltså upp cirka fyra minuter tidigare än i Stockholm."
      { q: "När är ljuset bäst för foto i skärgården?", a: "Runt solnedgång och soluppgång. Den borgerliga skymningen efter solnedgången varar i södra Sverige omkring en timme på sommaren och knappt 40 minuter kring dagjämningarna. I Sandhamn går solen upp cirka fyra minuter tidigare än i Stockholm." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/luftfart/luftfartyg-och-luftvardighet/dronare/dronarflygguiden/ — "Start- och landningsförbud kan råda i Naturreservat och nationalparker."; https://www.transportstyrelsen.se/sv/luftfart/luftfartyg-och-luftvardighet/dronare/dronarflygguiden/ — "Kom ihåg att du måste ha drönarkort om din drönare väger 250 gram eller mer."; https://www.transportstyrelsen.se/sv/luftfart/Luftfartyg-och-luftvardighet/dronare/flyga-dronare-i-luftrummet/ — "Maxhöjd: 120 meter."
      { q: "Får man flyga drönare i naturreservat i skärgården?", a: "Det beror på reservatet. Start- och landningsförbud kan gälla i naturreservat och nationalparker, och Länsstyrelsen beslutar om tillstånd. Kolla också LFV:s drönarkarta. Drönarkort krävs från 250 gram, och maxhöjden i öppna kategorin är 120 meter." },
      // KÄLLA: https://www.lantmateriet.se/spridningstillstand/ — "Om du har fotograferat eller filmat från luftfartyg som till exempel drönare, flygplan, helikopter eller luftballong och vill dela, publicera eller sälja dina bilder behöver du ansöka om spridningstillstånd."; https://www.lantmateriet.se/spridningstillstand/ — "Att ansöka om spridningstillstånd är kostnadsfritt."
      { q: "Behöver man tillstånd för att lägga ut drönarbilder på Instagram?", a: "Ja, i regel. Lantmäteriet kräver spridningstillstånd för att dela, publicera eller sälja foton och filmer tagna från drönare. Ansökan är kostnadsfri, och för bilder av havet kan tillstånd från Sjöfartsverket också behövas." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb eller befara vattenområdet inom 100 meter från ovan nämnda öar"; https://www.lansstyrelsen.se/stockholm/besoksmal/friluftsliv-och-allemansratt.html — "Dessa områden får bara besökas vissa tider på året."
      { q: "Får man gå i land på fågelskär för att fotografera?", a: "Inte i fågel- och sälskyddsområden under skyddsperioden. På Arholma är det till exempel förbjudet att gå i land på Rödkobben och Nollekobb eller åka närmare än 100 meter mellan 1 april och 31 juli. Områdena finns i Naturvårdsverkets kartverktyg Skyddad natur." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "wellness-retreat-skargarden", title: "Wellness och retreat i skärgården – lugn och återhämtning", excerpt: "Skärgården är den perfekta platsen för wellness och mindful-semestern. Yoga, meditationsleder och stillahavsanläggningar bland öarna.", category: "Praktisk", emoji: "🧘", readTime: "6 min", fullContent: true, faqs: [{ q: 'Finns det wellnessretreat i skärgården?', a: 'Ja – Utö Värdshus, Sommarro Spa och flera privata retreats erbjuder yoga, meditation och detoxpaket bland öarna.' }, { q: 'Vad ingår i ett skärgårdsretreat?', a: 'Yoga morgon och kväll, naturpromenader, ren mat, havsbastu. Pris: 2 000–5 000 kr/natt allt inkl.' }] },
  {
    slug: "brollop-skargarden",
    title: "Bröllop i skärgården – bröllop i Stockholms skärgård",
    excerpt: "Bröllop i skärgården: lokaler i Stockholms skärgård som tar emot bröllop och bröllopsfest, vigsel med havsutsikt, hindersprövning och båt för gästerna.",
    category: "Praktisk", emoji: "💍", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://grinda.se/campaign/brollop-pa-grinda/ — "Oavsett om ni önskar ett litet och intimt bröllop eller en storslagen fest sent in på morgontimmarna är ni i trygga händer."; https://www.kastellet.com/event-och-fest/brollop/ — "Planerar ni bröllop i Stockholms skärgård?"; https://www.utovardshus.se/gift-er-hos-oss/ — "Efter en känslofylld vigsel beger ni er vidare till Utö Värdshus för firande."
      { q: "Var kan man ha bröllop i Stockholms skärgård?", a: "Bland lokalerna som själva erbjuder bröllop finns Grinda Wärdshus och Grinda Sea Lodge, Utö Värdshus, Vaxholms Kastell och Badholmen samt Sands Hotell i Sandhamn. Rederiet Strömma ordnar också bröllop ombord på båt." },
      // KÄLLA: https://grinda.se/campaign/brollop-pa-grinda/ — "Max: 50 personer (med tält max 150 personer)"; https://www.stromma.com/en-se/stockholm/groups-charter/your-event/wedding/ — "Floating Private Party Venue for 60-120 People"; https://sandshotell.se/fest-event/ — "för bröllopsmiddagen kan vi duka för upp till 40 personer"
      { q: "Kan man ha bröllopsfest i skärgården för många gäster?", a: "Ja. Grinda Wärdshus anger högst 50 personer i ett av paketen, eller 150 med tält. Strömmas festbåt M/S Gustafsberg VII tar 60–120 personer. Mindre lokaler som Sands Hotell dukar för upp till 40." },
      // KÄLLA: https://www.varmdo.se/omsorgochhjalp/giftasigvigsel.4.28a80d9d13dcb0f021b409.html — "Hemma, på stranden eller i en luftballong är alla platser som fungerar, så länge vigselförrättaren först går med på det."; https://grinda.se/campaign/brollop-sea-lodge-2026/ — "Vigseln äger rum utomhus på en klippa eller vid strandkanten."
      { q: "Får man ha vigsel utomhus med havsutsikt?", a: "Ja. En borgerlig vigsel kan hållas på en plats som paret väljer, till exempel på stranden, om vigselförrättaren går med på det. På Grinda Sea Lodge hålls vigseln utomhus på en klippa eller vid strandkanten." },
      // KÄLLA: https://www.skatteverket.se/privat/folkbokforing/aktenskap/forevigselnhindersprovning.4.76a43be412206334b89800020477.html — "Hindersprövningen gäller i fyra månader och giltighetstiden går inte att förlänga."
      { q: "Hur länge gäller hindersprövningen?", a: "I fyra månader, och giltighetstiden går inte att förlänga. Ansökan till Skatteverket är avgiftsfri." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/samhalle/livshandelser/vigselforrattare.html — "Du kontaktar vigselförrättaren för att beställa en tid för vigsel."; https://www.lansstyrelsen.se/stockholm/samhalle/livshandelser/vigselforrattare.html — "Som vigselförrättare har du ingen rätt att ta ut en avgift från brudparet."
      { q: "Hur hittar man en vigselförrättare för bröllop i skärgården?", a: "Länsstyrelsen utser borgerliga vigselförrättare och har en lista per kommun. Ni kontaktar vigselförrättaren själva. Vigselförrättaren får inte ta betalt, men kan be om ersättning för resan om vigseln hålls på en annan plats än kommunens." },
    ],
  },
  {
    slug: "orust-guide",
    title: "Orust – Sveriges tredje eller fjärde största ö? Guide till ön",
    excerpt: "Är Orust en ö och Sveriges tredje största ö? Ja, en ö – trea enligt kommunen, fyra i SCB:s statistik där Södertörn räknas. Plus vägen dit, färjor och varv.",
    category: "Region", emoji: "⛵", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.orust.se/jobb-och-foretagande/foretag-stod-och-radgivning/fakta-om-naringslivet — "Orust, beläget på västkusten i Västra Götalands län, är Sveriges tredje största ö"; https://www.scb.se/contentassets/7edbcfbb3a87470387d8c95868ecaf04/mi0812_2020a01_sm_mi50sm2301.pdf — "Orust Västra Götalands län 34 400"; "Södertörn Stockholms län 120 700"; "Enligt SCB:s metod och definition är landområdet Södertörn helt omgivet av vatten och därmed en ö i statistiken."
      { q: "Är Orust Sveriges tredje största ö?", a: "Det beror på hur Södertörn räknas. Orust kommun skriver att Orust är Sveriges tredje största ö. I SCB:s statistik ligger Orust på fjärde plats med 34 400 hektar, efter Gotland, Öland och Södertörn, eftersom SCB räknar Södertörn som en ö. Räknas Södertörn som halvö är Orust trea." },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/orust/ — "Med ett antal fjordar och smala sund skiljs Orust, som är Sveriges fjärde största ö och den största på västkusten, från fastlandet i öster och med ön Tjörn i söder"; https://www.orust.se/kommun-och-politik/kommunfakta/havet-baten-och-miljon — "Mitt i Bohuslän, mellan broarna Skåpesund och Nötesund, ligger västkustens största ö Orust som också är en kommun"
      { q: "Är Orust en ö?", a: "Ja. Fjordar och smala sund skiljer Orust från fastlandet i öster och från Tjörn i söder. Man kör dit över Nötesundsbron eller Skåpesundsbron. Orust är också namnet på kommunen, som omfattar fler öar." },
      // KÄLLA: https://www.orust.se/trafik-och-gator/bil-buss-bat-och-tag — "När du passerat Nötesundsbron är du i Orust kommun."; "Nils Ericson-terminalen, Göteborg."; "Orust har inga tågstationer."
      { q: "Hur tar man sig till Orust?", a: "Med bil via väg 160: norrifrån över Nötesundsbron och söderifrån via Tjörnbroarna och Skåpesundsbron. Västtrafiks bussar går till Orust från Göteborg (Nils Ericson-terminalen), Stenungsund och Uddevalla. Orust har ingen tågstation." },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Tuvesvik är platsen där färjan (linje 381) till Gullholmen, Härmanö och Käringön avgår."; "tar ca 35 minuter till Käringön och 5 minuter till Härmanö/Gullholmen"
      { q: "Hur kommer man till Käringön och Gullholmen?", a: "Med Västtrafiks personfärja linje 381 från Tuvesvik på Orust. Resan tar cirka 35 minuter till Käringön och 5 minuter till Gullholmen. Öarna är bilfria, så bilen parkeras i Tuvesvik." },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/orust/ — "Orust är sedan lång tid tillbaka ett centrum för båtbyggande"; "I slutet av augusti varje år inträffar Skandinaviens största segelbåtmässa i Ellös på Orust."; https://www.hallberg-rassy.com/sv/nyheter/oeppet-varv — "går av stapeln i Hallberg-Rassys hamnområde i Ellös på Orust"
      { q: "Vad är Orust känt för?", a: "För båtbyggeriet. Hallberg-Rassy har sitt varv i Ellös och ordnar där båtmässan Öppet Varv i slutet av augusti varje år. Kustsamhällen som Mollösund, Hälleviksstrand och Stocken är gamla fiskelägen." },
    ],
  },
  {
    slug: "sensommar-bohuslan-2026",
    title: "Sensommar 2026 i Bohuslän – hummerpremiär, ostron och kräftor",
    excerpt: "Sensommar 2026 i Bohuslän: kräftpremiären i augusti, ostronsafari och Ostronets dag i september, hummerpremiären 21 september och vad du kan göra vid kusten.",
    category: "Säsong", emoji: "🍂", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Premiär för hummerfisket 2026 är den 21 september kl. 07.00."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Hummerpremiären infaller klockan 07.00 den första måndagen efter 20 september varje år."
      { q: "När var hummerpremiären 2026?", a: "Hummerpremiären 2026 var måndag 21 september klockan 07.00. Premiären infaller varje år klockan 07.00 den första måndagen efter 20 september." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Nästa år (2027) infaller hummerpremiären istället den 27 september."
      { q: "När är hummerpremiären 2027?", a: "Hummerpremiären 2027 blir måndag 27 september." },
      // KÄLLA: https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "Från början startade kräftfisket den 7 augusti klockan 17 men 1982 ändrades det till klockan 17 den första onsdagen i augusti."; https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva — "Vill man vara petig med traditionen infaller kräftpremiären första veckan i augusti."
      { q: "När är kräftpremiären?", a: "Enligt traditionen den första onsdagen i augusti klockan 17, så som kräftfisket startade från 1982. Förbudet mot kräftfiske är upphävt, men Isof skriver att den som vill följa traditionen håller kräftpremiären första veckan i augusti." },
      // KÄLLA: https://tanumstrand.se/attgora/skaldjur/ — "Alltså september till april."; https://ostronakademien.se/ — "Ostronets Dag i Grebbestad firas numera alltid lördag v37!"
      { q: "När börjar ostronsäsongen i Bohuslän?", a: "En tumregel är att äta skaldjur under månaderna med R, alltså september till april. I Grebbestad inleds säsongen med Ostronets dag, som numera firas på lördagen i vecka 37." },
      // KÄLLA: https://klemmingsdyk.se/ostronsafari/ — "2026 kör vi ostronsafari varje fredag och lördag mellan den 18/4-27/6 och 29/8-31/10."; https://www.vastsverige.com/sotenas/artiklar/varldens-basta-skaldjur/ — "Båtar tar dig med på kräftfiske, hummerfisket och krabbfiske."; https://www.bohusleden.se/ — "Välkommen till Bohusledens 27 etapper"
      { q: "Vad kan man göra i Bohuslän på sensommaren?", a: "Gå på ostronsafari i Grebbestad (hösten 2026 fredagar och lördagar 29 augusti–31 oktober), följa med ut på kräft-, hummer- eller krabbfiske i Sotenäs, paddla kajak eller vandra en etapp av Bohusleden." },
    ],
  },

  // ── Batch H: Transaktionella guider – hög kommersiellt värde ──────────────
  {
    slug: "hyra-bat-utan-korkort-stockholm",
    title: "Hyra båt utan körkort i Stockholm – vilka båtar får man köra?",
    excerpt: "Hyra båt utan körkort i Stockholm: vilka båtar får man köra utan körkort? Alla fritidsbåtar under 12 × 4 meter utom vattenskoter. Regler och uthyrare.",
    category: "Praktisk", emoji: "⚡", readTime: "6 min", fullContent: true, topics: ['hyra-bat'],
    faqs: [
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ — "Det finns idag inga krav på körkort om du har ett fritidsfartyg/en fritidsbåt som är kortare än tolv meter och smalare än fyra meter. Undantaget är vattenskoter (som per definition är en fritidsbåt) där det krävs förarbevis."
      { q: "Får man köra båt utan körkort?", a: "Ja, om båten är en fritidsbåt som är kortare än tolv meter och smalare än fyra meter. Större fritidsskepp kräver skepparexamen, kustskepparexamen eller högre nautisk kompetens, och vattenskoter kräver förarbevis." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/Fritidsbatar/Kunskap-och-kompetens/Utbildning-for-fritidsbat/ — "Om båten är större än 12 gånger 4 meter krävs skepparexamen, kustskepparexamen eller examen från nautisk linje vid sjöbefälsskola eller annan av Sjöfartsverket bestämd utbildning."
      { q: "Vilka båtar får man köra utan körkort?", a: "Alla fritidsbåtar under 12 × 4 meter utom vattenskoter. Det är storleken som avgör, inte motorstyrkan eller om båten är en motorbåt, segelbåt eller elbåt. Vattenskoter kräver förarbevis och att föraren har fyllt 15 år. Är båten större än 12 × 4 meter krävs skepparexamen, kustskepparexamen eller motsvarande." },
      // KÄLLA: https://www.nynasboat.se/sv — "Du behöver varken båtkörkort eller tidigare erfarenhet!"
      { q: "Var kan man hyra båt utan körkort i Stockholm?", a: "Dyvik Marina (hyrbat.se) cirka 4 mil norr om Stockholm och Nynäs Boat i Nynäshamn hyr ut motorbåtar utan krav på förarbevis, enligt deras egna webbplatser (lästa 2026-09-26)." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/vattenskoter/ — "För att framföra vattenskoter krävs förarbevis för vattenskoter. För att kunna utbilda sig och få köra vattenskoter krävs det även att man har fyllt 15 år."
      { q: "Finns det en åldersgräns för att köra båt?", a: "Transportstyrelsen anger en åldersgräns för vattenskoter: föraren ska ha förarbevis och ha fyllt 15 år. För vanliga fritidsbåtar anger myndigheten ingen åldersgräns, men uthyrare kan ha egna krav." },
      // KÄLLA: https://www.sightseeingride.com/en/tours/private-tour/ — "Rent your own boat with our captain & guide."
      { q: "Kan man hyra elbåt utan körkort i Stockholm?", a: "Vid vår genomgång 2026-09-26 hittade vi elbåtar att hyra i Stockholm bara med kapten, hos Sightseeing Ride och Strömma. Då behöver du inget eget körkort. En uthyrare av självkörda elbåtar i Stockholm hittade vi inte." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "aw-pa-bat-stockholm", title: "AW på båt Stockholm – charterbåtar och paket 2026", excerpt: "AW på båt är Stockholms populäraste sätt att fira. Guide till charterbåtar, operatörer, priser och hur du bokar den perfekta after work på vattnet.", category: "Aktivitet", emoji: "🥂", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vad kostar AW på båt i Stockholm?', a: 'Charter av en båt för AW kostar 800–2 500 kr/person beroende på paket. Inkluderar normalt dryck, mat och kapten. Minst 20–30 personer krävs vanligen för charter.' }, { q: 'Hur bokar man AW på båt i Stockholm?', a: 'Kontakta Strömma Charter, Cinderella Event eller lokala charterbåtsbolag. Boka 4–8 veckor i förväg för juni–aug. Fredag eftermiddag är populärast.' }] },
  {
    slug: "konferens-skargard-stockholm",
    title: "Konferens i Stockholms skärgård – skärgårdskonferens med boende",
    excerpt: "Konferens i Stockholms skärgård med möteslokal och boende: Grinda, Utö och Sandhamn med båt, Djurönäset och Siggesta med bil. Så tar ni er till skärgården.",
    category: "Praktisk", emoji: "🏢", readTime: "6 min", fullContent: true, topics: ['teambuilding'],
    faqs: [
      // KÄLLA: https://www.utovardshus.se/konferens/ — "Möten, måltider och boende på samma plats"; https://grinda.se/konferens/lokaler/ — "Vi tar emot sällskap på 2 – 70 personer."; https://www.djuronaset.com/konferens/ — "Här samlas boende, möteslokaler, restauranger, aktiviteter och spa på en och samma destination."
      { q: "Var kan man ha konferens i Stockholms skärgård?", a: "På öarna finns bland annat Grinda Wärdshus, Utö Värdshus och hotellet på Sandhamn, dit man åker båt. Med bil eller buss når man Djurönäset, Siggesta Gård, Smådalarö Gård, Skåvsjöholm och Waxholms Hotell. Alla erbjuder möteslokaler och boende enligt sina egna webbplatser." },
      // KÄLLA: https://www.siggestagard.se/konferens/ — "med kapacitet för upp till 525 personer"; https://www.djuronaset.com/konferens/ — "företagsevent med upp till 450 deltagare"; https://www.smadalarogard.se/konferens-event/ — "Vi erbjuder 10 möteslokaler för grupper upp till 200 personer"; https://www.utovardshus.se/konferens/ — "2-100 personer"
      { q: "Vilken skärgårdskonferens i Stockholm tar stora grupper?", a: "Siggesta Gård på Värmdö har en lokal för upp till 525 personer, och Djurönäset tar företagsevent med upp till 450 deltagare. Smådalarö Gård har möteslokaler för upp till 200 personer. På öarna tar Utö Värdshus grupper på 2–100 personer och Grinda Wärdshus 2–70." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme."; https://www.utovardshus.se/hitta-hit/ — "Båtresan tar cirka 35–50 minuter."; https://www.djuronaset.com/kontakt/ — "SL buss nr 433/434 går direkt från Slussen och stannar vid Djurönäset hållplats ca 100 meter från receptionen. Resan tar ca 55 minuter"
      { q: "Hur tar man sig till en konferens i skärgården?", a: "Till Grinda går Waxholmsbolagets båt från Strömkajen, ungefär en och en halv timme. Till Utö kör man till Årsta brygga och tar båten därifrån, 35–50 minuter. Djurönäset nås med SL-buss 433 eller 434 från Slussen på omkring 55 minuter. Flera anläggningar hjälper till att boka taxibåt." },
      // KÄLLA: https://grinda.se/konferens/ — "Priset varierar beroende av säsong & tillgänglighet."; https://www.utovardshus.se/konferens/ — "Vi återkommer inom 24 timmar."
      { q: "Vad kostar konferens i skärgården?", a: "Det beror på säsong, gruppstorlek och upplägg. Grinda Wärdshus skriver att priset varierar med säsong och tillgänglighet, och Utö Värdshus skickar ett förslag efter förfrågan. Begär offert från flera anläggningar och räkna med transporten." },
      // KÄLLA: https://grinda.se/campaign/hyr-grinda-wardshus/ — "Från oktober till sista april så har du en unik möjlighet att hyra hela Grinda Wärdshus"; https://www.djuronaset.com/konferens/ — "Villa Djuröhäll – Hyr ett eget nyrenoverat hotell. Max 40 personer."; https://www.smadalarogard.se/konferens-event/ — "Hyr hela hotellet"
      { q: "Kan man hyra en hel konferensanläggning i skärgården?", a: "Ja. Från oktober till sista april hyr Grinda Wärdshus ut hela wärdshuset till ett sällskap åt gången. Djurönäset hyr ut Villa Djuröhäll för högst 40 personer, och Smådalarö Gård erbjuder att hyra hela hotellet." },
    ],
  },
  {
    slug: "kajak-vaxholm",
    title: "Hyra kajak i Vaxholm – kajak, kanot och SUP, rutter och buss",
    excerpt: "Hyra kajak i Vaxholm: tre uthyrare med kajak, kanot och SUP, maj–september. Var de finns, hur du tar dig dit och turerna från Vaxholm som klubben föreslår.",
    category: "Aktivitet", emoji: "🛶", readTime: "6 min", fullContent: true, topics: ['kajak'],
    faqs: [
      // KÄLLA: https://www.vaxholmkanot.se/sida/?ID=487749 — "HYR KAJAK, SUP ELLER KANOT I VAXHOLM!"; https://kanotcenter.com/sv/kontakt/ — "Resarövägen 10, 185 51 Resarö, Sverige"; https://www.kayakomat.com/sv/location/628e1ae0c5365312a173dc54 — "Kajak och SUP-uthyrning på KAYAKOMAT Vaxholm, Norrhamnsplan"
      { q: "Var kan man hyra kajak i Vaxholm?", a: "Hos Vaxholms Kanotsällskap på Eriksö, hos Skärgårdens Kanotcenter på Resarö och i Kayakomats obemannade uthyrning vid Norrhamnsplan. Alla tre bokas på respektive webbplats." },
      // KÄLLA: https://www.vaxholmkanot.se/sida/?ID=487749 — "vi erbjuder ett brett sortiment av kanoter/kajaker, kanadensare och SUP"; https://kanotcenter.com/sv/kajakuthyrning-stockholm-skargard/dagligen/ — "Uthyrning av kajak, kanot och SUP för några timmar eller en hel dag"; https://www.kayakomat.com/sv/location/628e1ae0c5365312a173dc54 — "Välj mellan singelkajak, tandemkajak eller SUP-bräda"
      { q: "Kan man hyra kanot i Vaxholm?", a: "Ja. Vaxholms Kanotsällskap och Skärgårdens Kanotcenter hyr ut kanoter (kanadensare) förutom kajaker och SUP. Kayakomat har bara kajak och SUP." },
      // KÄLLA: https://www.vaxholmkanot.se/sida/?ID=487749 — "från Maj till september"; https://kanotcenter.com/sv/kajakuthyrning-stockholm-skargard/dagligen/ — "Maj – september:"; https://www.kayakomat.com/sv/location/628e1ae0c5365312a173dc54 — "Du får en kod via e-post och SMS inför din bokning."
      { q: "När har kajakuthyrningen i Vaxholm öppet?", a: "De bemannade uthyrningarna har säsong från maj till september. Kayakomat är obemannad och bokas på nätet; du får en kod via e-post och sms." },
      // KÄLLA: https://www.vaxholmkanot.se/sida/?ID=487749 — "Prislista (SEK)"; https://kanotcenter.com/sv/kajakuthyrning-stockholm-skargard/dagligen/ — "fullständig prislista"
      { q: "Vad kostar det att hyra kajak i Vaxholm?", a: "Det beror på uthyrare, båttyp och hyrtid. Vaxholms Kanotsällskap och Skärgårdens Kanotcenter har aktuella prislistor på sina webbplatser, och hos Kayakomat ser du priset när du bokar." },
      // KÄLLA: https://www.vaxholmkanot.se/sida/?ID=486971 — "Paddla till Tenöbadet där ni kan bada eller fika."; https://www.vaxholmkanot.se/sida/?ID=486971 — "Paddla söderut mot Tenösund, Tynningö, Ramsö och Rindö."; https://www.vaxholmkanot.se/sida/?ID=486971 — "Paddla norrut, upplev våra fina vikar och sund kring Kullö, Resarö, Svavelsö och Edholma"; https://kanotcenter.com/sv/rutter/vaxholm/ — "14 km, plus alternativ för vandring"
      { q: "Vilka kajakrutter finns från Vaxholm?", a: "Vaxholms Kanotsällskap föreslår bland annat en enkel tur till Tenöbadet, Lilla Vaxholmsturen vid Bogesund och dagsturer söderut mot Tynningö och Rindö eller norrut kring Resarö och Edholma. Skärgårdens Kanotcenter har en rutt runt Vaxholm på 14 km." },
      // KÄLLA: https://www.vaxholmkanot.se/sida/?ID=487749 — "Du som hyr behöver kunna simma 200 meter och flytväst är alltid obligatorisk."
      { q: "Behöver man kunna simma för att hyra kajak i Vaxholm?", a: "Ja, hos Vaxholms Kanotsällskap måste du kunna simma 200 meter, och flytväst är alltid obligatorisk." },
    ],
  },
  { slug: "hyra-kajak-stockholm", title: "Hyra kajak Stockholms skärgård – operatörer och priser", excerpt: "Komplett guide till kajakhyrning i Stockholms skärgård. Var du hyr, vad det kostar, vilka rutter som passar och vad du behöver veta om säkerhet.", category: "Aktivitet", emoji: "🚣", readTime: "7 min", fullContent: true, topics: ['kajak'], faqs: [{ q: 'Vad kostar det att hyra kajak i Stockholms skärgård?', a: 'Enkelbåt: 300–500 kr/halvdag, 500–800 kr/heldag. Kanadensare: 400–700 kr/halvdag. Leverans till ö möjlig hos vissa operatörer.' }, { q: 'Behöver man kunna kajaka för att hyra?', a: 'Nybörjare välkomna – uthyrarna ger en grundläggande genomgång (30 min). Välj lugna inre skärgårdsrutter. Yttre skärgård kräver mer erfarenhet.' }] },
  // UPPSKATTNING: spann över flera uthyrare på orten, ej hämtat per aktör (2026-09). Sägs ut för läsaren som "enligt vår marknadsöversikt".
  {
    slug: "hyra-elektrisk-bat-stockholm",
    title: "Hyra elbåt i Stockholm – med kapten, regler och alternativ",
    excerpt: "Hyra elbåt i Stockholm: Strömma och Sightseeing Ride hyr ut elbåtar med kapten. Självkörda elbåtar i Stockholm hittade vi inte – här är alternativen.",
    category: "Praktisk", emoji: "⚡", readTime: "5 min", fullContent: true, topics: ['hyra-bat'],
    faqs: [
      // KÄLLA: https://www.sightseeingride.com/en/tours/private-tour/ — "Rent your own boat with our captain & guide."
      { q: "Var kan man hyra elbåt i Stockholm?", a: "Vid vår genomgång 2026-09-26 hyrde två verksamheter ut elbåtar med kapten i Stockholm: Sightseeing Ride (öppen elbåt för upp till 34 personer och täckt elbåt för upp till 48, avgång vid Skeppsbron) och Strömma (E/S Prins Daniel för upp till 108 personer). En uthyrare av självkörda elbåtar i Stockholm hittade vi inte." },
      // KÄLLA: https://goboatmalmo.se/sv/goboat-malmo — "Inget båtcertifikat eller tidigare erfarenhet krävs"
      { q: "Kan man hyra en elbåt och köra själv i Stockholm?", a: "Vi hittade ingen sådan uthyrare i Stockholm 2026-09-26. GoBoats svenska webbplats leder i dag till GoBoat Malmö, där du kör elbåten själv utan krav på båtcertifikat. I Göteborg hyr Let's Boat ut självkörda elbåtar. Nära Stockholm kan du köra en bensindriven hyrbåt utan förarbevis, till exempel hos Dyvik Marina eller Nynäs Boat." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ — "Det finns idag inga krav på körkort om du har ett fritidsfartyg/en fritidsbåt som är kortare än tolv meter och smalare än fyra meter. Undantaget är vattenskoter (som per definition är en fritidsbåt) där det krävs förarbevis."
      { q: "Behöver man körkort för att köra elbåt?", a: "Nej, inte om båten är kortare än tolv meter och smalare än fyra meter. Enligt Transportstyrelsen är det storleken som avgör. Undantaget är vattenskoter, som kräver förarbevis." },
      // KÄLLA: https://www.stromma.com/en-se/stockholm/groups-charter/fleet/transportsightseeing-boats/es-prins-daniel/ — "The boat accommodates a maximum of 108 people."
      { q: "Hur många får plats på en hyrd elbåt i Stockholm?", a: "Det beror på båten. Strömmas elbåt E/S Prins Daniel tar högst 108 personer. Sightseeing Rides öppna elbåt tar upp till 34 personer och den täckta upp till 48." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/pa-sjon/var-nykter-pa-sjon/ — "Den fasta gränsen för sjöfylleri är 0,2 promille. Regeln gäller alla fartyg som kan framföras i minst 15 knop eller har ett skrov som är minst tio meter."
      { q: "Får man dricka alkohol när man kör elbåt?", a: "Gränsen 0,2 promille gäller båtar som kan köras i minst 15 knop eller har ett skrov på minst tio meter. I alla båtar är det förbjudet att vara så påverkad att man inte kan sköta det som har betydelse för säkerheten." },
    ],
  },
  {
    slug: "glamping-skargard",
    title: "Glamping i skärgården 2026 – Sandhamn, Utö, Vaxholm och Grinda",
    excerpt: "Glamping i skärgården: finns det på Sandhamn, Utö, i Vaxholm eller på Grinda? Svar ö för ö och glampingtälten i Stockholms skärgård som finns på riktigt.",
    category: "Praktisk", emoji: "⛺", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/sandhamn — "Stannar du över natten finns både Seglarhotellet och Sands hotell att välja på."; https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Camping är inte tillåten."
      { q: "Finns det glamping på Sandhamn?", a: "Vi har inte hittat någon glamping på Sandhamn. Explore Archipelago nämner Seglarhotellet och Sands hotell som boenden, och camping är inte tillåten på ön. Närmaste glamping vi har hittat i Värmdö kommun är Siggesta Gård." },
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/uto — "vill du bo över kan du välja mellan allt från glampingtält till stugor och vandrarhem"; http://www.utogasthamn.se/camping/ — "enskilda personer behöver därför inte boka plats"
      { q: "Finns det glamping på Utö?", a: "Explore Archipelago skriver att du kan bo i allt från glampingtält till stugor och vandrarhem på Utö, men vi har inte kunnat bekräfta säsongen 2026 på någon anläggnings egen sida. Utö Värdshus har hotell, hotellstugor och vandrarhem, och Utö campingplats tar emot tält utan förbokning." },
      // KÄLLA: https://www.vaxholmsbedandbreakfast.se/en/se/tree-glamping — "Number: Up to 5 people plus guide"; https://www.vaxholmsbedandbreakfast.se/en/se/tree-glamping — "it is therefore carried out on request"; https://www.destinationvaxholm.se/sv/boende — "Tur då att här finns både hotell, B&B, camping och vandrarhem med sköna sängar och fin service."
      { q: "Finns det glamping i Vaxholm?", a: "Vaxholms Bed & Breakfast har en guidad övernattning i trädtält på en obebodd ö. Den görs för ett sällskap i taget, upp till fem personer plus guide, och bokas på förfrågan. Någon fast glampinganläggning listar Destination Vaxholm inte." },
      // KÄLLA: https://grinda.se/boende/ — "Ta med dig eget tält och slå upp det i vårt stora campingområde. Här behöver du inte boka plats."
      { q: "Finns det glamping på Grinda?", a: "Nej, Grinda Wärdshus boendesida listar hotell, stugby, Sea Lodge och camping, men ingen glamping. På campingen tar du med eget tält och behöver inte boka plats." },
      // KÄLLA: https://www.lidovardshus.se/glamping — "Tältet är inrett med riktiga sängar som är bäddade när man kommer, städning ingår"; https://galohavsbad.se/bo/glamping/ — "Tälten ligger med utsikt över havet"; https://marholmen.se/boende/glamping/ — "har vi byggt upp fem canvastält"; https://www.siggestagard.se/hotell/hotellpaket/glamping-i-stockholms-skargard — "Varje glampingvistelse inkluderar tillgång till vår vedeldade skogsbastu."; https://fejanoutdoor.se/ — "Vi har stängt och öppnar igen sommaren 2027."
      { q: "Var finns glamping i Stockholms skärgård?", a: "Glampingtält finns bland annat hos Lidö värdshus, Fejan Outdoor, Gålö Havsbad, Sälstationen på Gålö, Marholmen och Siggesta Gård på Värmdö. Lidö och Fejan öppnar sitt boende igen sommaren 2027." },
      // KÄLLA: https://www.siggestagard.se/hotell/hotellpaket/glamping-i-stockholms-skargard — "Glampingsäsongen på Siggesta Gård sträcker sig från 1 maj till 26 september."; https://marholmen.se/boende/glamping/ — "Glampingsäsongen 2026 äger rum den 18 juni – 16 augusti"
      { q: "När har glampingen i skärgården öppet?", a: "Det skiljer sig. Siggesta Gårds glampingsäsong är 1 maj–26 september, och Marholmens glamping hade säsong 18 juni–16 augusti 2026. Kontrollera alltid säsongen hos anläggningen." },
      // KÄLLA: https://www.lidovardshus.se/glamping — "Tältet är inrett med riktiga sängar som är bäddade när man kommer, städning ingår och frukostbuffé ingår och äts på värdshuset"
      { q: "Vad kostar glamping i skärgården?", a: "Priserna står på respektive anläggnings webbplats och ändras mellan säsonger, så vi anger inga belopp här. Jämför vad som ingår: hos Lidö värdshus ingår till exempel bäddade sängar, städning och frukostbuffé." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "segeldag-foretag-stockholm", title: "Segeldag för företag Stockholm – paket och operatörer", excerpt: "En segeldag är företagseventets höjdpunkt. Guide till arrangörer, priser, vad som ingår och hur du bokar en minnesvärd segeldag i Stockholms skärgård.", category: "Aktivitet", emoji: "🏆", readTime: "6 min", fullContent: true, topics: ['segelkurs', 'teambuilding'], faqs: [{ q: 'Vad kostar segeldag för företag i Stockholm?', a: 'Räkna med 1 500–3 000 kr/person för en heldag med mat, professionell besättning och tävlingsmoment. Normalt min 10 personer per båt, 2–5 båtar för medelstora grupper.' }, { q: 'Behöver deltagarna kunna segla?', a: 'Nej – professionell besättning sköter seglingen. Deltagarna lär sig grunderna och tävlar mot varandra. Det är teambuilding, inte segelkurs.' }] },
  { slug: "teambuilding-kajak-stockholm", title: "Teambuilding kajak Stockholm – paket och arrangörer", excerpt: "Kajakpaddling som teambuilding ger samarbete, utmaning och skärgårdsupplevelse i ett. Guide till arrangörer, paket och vad du kan förvänta dig.", category: "Aktivitet", emoji: "🤝", readTime: "6 min", fullContent: true, topics: ['teambuilding', 'kajak'], faqs: [{ q: 'Vad kostar teambuilding med kajak i Stockholm?', a: 'Paket med instruktör, utrustning och program kostar 600–1 200 kr/person. Halvdagar är vanligast (3–4 timmar). Möjlighet att kombinera med lunch eller after work.' }, { q: 'Passar kajak för alla som teambuilding?', a: 'Kajak passar de flesta – det kräver ingen tidigare erfarenhet. Säg till arrangören om deltagare har begränsad rörlighet. Kanadensare (tvasitsiga) är lättare för nybörjare.' }] },
  {
    slug: "cykeluthyrning-gotland",
    title: "Hyra cykel i Visby – pris, elcykel och cykeluthyrning på Gotland",
    excerpt: "Hyra cykel i Visby och på Gotland: uthyrarna i Visby hamn, pris från egna prislistor 2026, elcykel, färjan och cykelvägar ut från Visby.",
    category: "Aktivitet", emoji: "🚴", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://gotlandscykeluthyrning.com/ — "Från 140 kr/ dygn."; https://fixyobike.com/elcykeluthyrning — "1 dag: 295 kr"
      { q: "Vad kostar det att hyra cykel i Visby?", a: "Enligt uthyrarnas egna prislistor, lästa den 27 september 2026, kostar en cykel hos Gotlands Cykeluthyrning i Visby hamn från 140 kr per dygn. Hos Fix Yo Bike kostar en citycykel 295 kr för en dag. Priserna kan ändras, så kontrollera hos uthyraren innan du bokar." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Det finns möjlighet att hyra cykel i Visby och flera andra platser på ön."; https://visbyhyrcykel.com/ — "Vi finns precis utanför hamnterminalen när man stiger av båten och uppe vid österport."
      { q: "Var kan man hyra cykel på Gotland?", a: "I Visby och på flera andra platser på ön. I Visby hamn finns Gotlands Cykeluthyrning på Skeppsbron 2 och Visby Hyrcykel precis utanför hamnterminalen. Visby Hyrcykel har också ett utlämningsställe vid Österport. Gotland.com har en lista över öns cykeluthyrningar." },
      // KÄLLA: https://visbyhyrcykel.com/ — "Vi finns precis utanför hamnterminalen när man stiger av båten"; https://gotlandscykeluthyrning.com/produkter/7-vaxlad-elcykel/ — "Vi ligger ca 400m från terminalen i riktning mot småbåtshamnen."
      { q: "Finns det cykeluthyrning i Visby hamn?", a: "Ja. Visby Hyrcykel finns precis utanför hamnterminalen, och Gotlands Cykeluthyrning ligger ungefär 400 meter från terminalen i riktning mot småbåtshamnen." },
      // KÄLLA: https://gotlandscykeluthyrning.com/produkter/ — "7-växlad Elcykel Pris från 320 kr"; https://fixyobike.com/elcykeluthyrning — "Elcykel Ecoride"; https://fixyobike.com/elcykeluthyrning — "1 dag: 600 kr"
      { q: "Var kan man hyra elcykel i Visby?", a: "Både Gotlands Cykeluthyrning i Visby hamn och Fix Yo Bike i Visby hyr ut elcyklar. Hos GCU kostar elcykeln från 320 kr och hos Fix Yo Bike 600 kr för en dag, enligt prislistorna som lästes den 27 september 2026. Priserna kan ändras." },
      // KÄLLA: https://gotlandscykeluthyrning.com/produkter/7-vaxlad-elcykel/ — "Vi brukar dock säga 3-5 mil när man kör på full effekt. Räckvidden påverkas stort av exempelvis vikt, vind och hur man cyklar."
      { q: "Hur långt kommer man på en hyrd elcykel?", a: "Gotlands Cykeluthyrning skriver att de brukar räkna med 3–5 mil på full effekt, men att räckvidden påverkas mycket av vikt, vind och hur man cyklar." },
      // KÄLLA: https://gotlandscykeluthyrning.com/produkter/7-vaxlad-elcykel/ — "Därför rekommenderar vi att förboka via vår hemsida. Man kan även hyra cykel på plats i mån av tillgång."
      { q: "Måste man boka hyrcykel i förväg?", a: "Gotlands Cykeluthyrning rekommenderar förbokning via webbplatsen eftersom det är högt tryck under högsäsong, men du kan också hyra på plats i mån av tillgång." },
    ],
  },
  { slug: "kursgard-skargard-stockholm", title: "Kursgård i skärgården Stockholm – konferens och retreat", excerpt: "Kursgårdar i Stockholms skärgård erbjuder avskildhet och fokus. Guide till anläggningar, priser och hur du bokar kursgård för grupp eller företag.", category: "Praktisk", emoji: "🏫", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka kursgårdar finns i Stockholms skärgård?', a: 'Finnhamn STF, Grinda Wärdshus och Utö Värdshus har kursgårdskapacitet med mötesrum och övernattning. Finns även privatdrivna retreat-anläggningar på mindre öar.' }, { q: 'Vad kostar kursgård i skärgården?', a: 'Halvdagspaket: ca 600–900 kr/person. Heldagskonferens med lunch: 1 000–1 500 kr/person. Övernattning tillkommer med 1 000–2 500 kr/person per natt.' }] },
  { slug: "kickoff-ideer-skargard", title: "Kick-off idéer skärgård – aktiviteter och arrangörer", excerpt: "Skärgårds-kick-offen med rätt aktiviteter är årets höjdpunkt. 15 konkreta idéer, från segling och kajak till matlagning och havsbastu.", category: "Aktivitet", emoji: "🎯", readTime: "7 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka aktiviteter passar bäst för kick-off i skärgården?', a: 'Toppaktiviteter: segel-regatta, kajaktävling, havsfiske, matlagning med lokala råvaror, havsbastubad, och kvällsmingel ombord på charterbåt. Kombinera 2–3 aktiviteter för en heldagsupplevelse.' }, { q: 'Hur tidigt bör man boka kick-off i skärgården?', a: 'Boka 3–6 månader i förväg för juni–aug. Populära arrangörer och anläggningar tar slut snabbt. Var ute i januari–februari för sommarkick-off.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "hyra-stuga-marstrand-bohuslan",
    title: "Hyra stuga i Marstrand – stugor och hus i Bohuslän",
    excerpt: "Hyra stuga i Marstrand eller hus i Bohuslän? Stuga vid Marstrand på campingen, uthyrare i Bovallstrand, Orust och Grebbestad och råd kring privata annonser.",
    category: "Praktisk", emoji: "🏡", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Marstrandsön är en bilfri ö men vissa kan ansöka om specialöverfart under ordinarie tider."; "Endast fordon i nyttotrafik får färjas över till Marstrandsön."; https://www.vastsverige.com/kungalv/produkter/farja-koon-marstrand/ — "Marstrandsfärjan avgår regelbundet dygnet runt och tar endast två minuter."
      { q: "Kan man ta bilen till Marstrand?", a: "Nej, inte till själva Marstrandsön. Ön är bilfri och bara fordon i nyttotrafik får följa med färjan. Marstrandsfärjan från Koön tar två minuter och går regelbundet dygnet runt. Sena kvällar och nätter behöver den förbeställas." },
      // KÄLLA: https://www.vastsverige.com/kungalv/produkter/marstrands-familjecamping/ — "Dessutom kan du hyra stugor."; https://marstrandscamping.se/ — "Det tar endast 15 min att promenera till färjan som tar dig över till den bilfria ön Marstrand."
      { q: "Var kan man hyra stuga i Marstrand?", a: "Den stuguthyrare vid Marstrand som vi har kunnat kontrollera är Marstrands Familjecamping, som hyr ut stugor för fyra och sex personer. Därifrån är det ungefär 15 minuters promenad till färjan över till Marstrandsön. På själva ön hyrs stugor och hus ut privat." },
      // KÄLLA: https://marstrandscamping.se/stugor-for-6-personer/ — "Vinterbonad stuga 26 kvm."; "6 bäddar, separat sovrum med 4 bäddar"; "Dusch/wc"
      { q: "Kan man hyra hus i Marstrand?", a: "Vi har inte hittat något företag som hyr ut hela hus på Marstrandsön och som går att kontrollera. Närmast kommer Marstrands Familjecampings vinterbonade stuga för sex personer, 26 kvm med egen dusch och toalett. Hela hus hyrs ut privat via annonser." },
      // KÄLLA: https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson.-vad-ska-jag-tanka-pa — "Se till så att du har uthyrarens namn och telefonnummer och att det stämmer med uppgifterna i annonsen."; "Betala inte hyra i förskott"; "Be om fastighetens beteckning eller adress och sök hos Lantmäteriet."; "Det är generellt sätt tryggare att hyra av ett företag som förmedlar boende."
      { q: "Vad ska man tänka på när man hyr stuga i Marstrand eller Bohuslän via Blocket?", a: "Svalla går inte i god för privata annonser. Konsumentverket råder dig att kontrollera att uthyrarens namn och telefonnummer stämmer med annonsen, att inte betala hyran i förskott, att kontrollera adressen hos Lantmäteriet, att be om referenser och att inte låta dig stressas. Det är generellt tryggare att hyra av ett företag som förmedlar boende." },
      // KÄLLA: https://rumostuga.se/ — "Med ca 100 objekt runt om i kommunen har vi dom flesta typer av hus, stugor och lägenheter."; https://rumostuga.se/objekt?city=bovallstrand — "Smögen Kungshamn Hunnebostrand Bovallstrand"; https://www.novasol.se/sverige/vastra-gotaland/bovallstrand — "Du bokar din stuga i Bovallstrand tryggt i vetskap om att din bokning hanteras direkt genom NOVASOL och inte mot en privatperson."
      { q: "Finns det stugor att hyra i Bovallstrand?", a: "Ja. Smögen Rum & Stuga förmedlar hus, stugor och lägenheter i Sotenäs, bland annat i Bovallstrand, och NOVASOL förmedlar stugor och semesterlägenheter i Bovallstrand. Hos NOVASOL hanteras bokningen av företaget och inte av privatpersonen." },
      // KÄLLA: https://marstrandscamping.se/ — "Vi är med i SCR och alla våra gäster skall ha giltigt campingkort"
      { q: "Behöver man campingkort för att hyra stuga på camping?", a: "På SCR-anslutna campingar som Marstrands Familjecamping ska alla gäster ha giltigt campingkort, även de som hyr stuga." },
    ],
  },
  { slug: "workshop-skargard-stockholm", title: "Workshop i skärgården Stockholm – lokaler och paket", excerpt: "Workshop i skärgård ger fokus, kreativitet och teamkänsla. Guide till lokaler, arrangörer och hur du planerar en effektiv workshop ute på öarna.", category: "Praktisk", emoji: "✏️", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka öar i Stockholms skärgård passar för workshop?', a: 'Grinda, Utö, Finnhamn och Sandhamn har välbyggda lokaler för 10–60 personer. Transport med Waxholmsbolaget ingår i paket hos många arrangörer.' }, { q: 'Behöver man ta med egen teknik till workshop i skärgården?', a: 'De flesta konferensanläggningar har projektor, whiteboard och wifi. Dubbelkolla med anläggningen – mobilt nätverk är ofta svagt i yttre skärgården.' }] },
  {
    slug: "teambuilding-skargard-stockholm",
    title: "Teambuilding i Stockholms skärgård – företagsevent och segling",
    excerpt: "Teambuilding i Stockholms skärgård: arrangörer för segling och kajak, företagsevent med konferens på Grinda och Utö, och vad som gäller för grupper på sjön.",
    category: "Aktivitet", emoji: "🤝", readTime: "6 min", fullContent: true, topics: ['teambuilding'],
    faqs: [
      // KÄLLA: https://seglingstockholm.se/vara-tjanster/ — "Vi erbjuder kappsegling, konferens, matchrace, kickoff, utbildning eller stillsam skärgårdssegling med erfarna instruktörer ombord."; https://grinda.se/konferens/aktiviteter/ — "På och kring Grinda arrangerar vi även teamaktiviteter, tävlingsaktiviteter och fartfyllda äventyr på höghöjdsbanan."
      { q: "Vilka teambuilding-aktiviteter finns i Stockholms skärgård?", a: "Arrangörerna erbjuder bland annat segling med skeppare, till exempel matchrace och kappsegling, och guidade kajakturer. På Grinda finns även fisketurer, stand up paddle, sälsafari och en höghöjdsbana." },
      // KÄLLA: https://kanotcenter.com/sv/grupper-foretagsevent-stockholm/ — "Från teambuilding till evenemang för upp till 100 personer"; https://www.siggestagard.se/konferens/konferensaktiviteter/segling-i-stockholms-skargard — "Hyra av segelbåtar, varje båt tar upp till 12 deltagare"; https://www.utovardshus.se/konferens/ — "200 bäddar i flera boendeformat"
      { q: "Hur många kan delta i teambuilding i skärgården?", a: "Det beror på arrangören. Skärgårdens Kanotcenter tar emot grupper på upp till 100 personer. Vid kappsegling på Siggesta Gård tar varje båt upp till 12 deltagare, och Utö Värdshus har 200 bäddar för grupper som stannar över natten." },
      // KÄLLA: https://www.destinationvaxholm.se/sv/se-gora/segla-paddla-fiska-bada-och-annan-vattensport — "Ansvarig skeppare finns alltid med ombord för säkerhet och vägledning. Ingen tidigare seglingserfarenhet krävs."; https://www.sailingevents.se/aktiviteter/teambuilding/ — "Våra erfarna skeppare vägleder deltagarna hela tiden, vilket gör att ni inte behöver ha några förkunskaper alls."
      { q: "Behöver man kunna segla för teambuilding med segling?", a: "Nej. Hos både Out Seglingsevenemang och Sailing Events finns en skeppare ombord som vägleder, och ingen i gruppen behöver ha seglat förut." },
      // KÄLLA: https://grinda.se/konferens/ — "Skärgårdskonferensen är inte som andra möten"; https://www.utovardshus.se/konferens/ — "14 mötesrum för olika typer av grupper"; https://www.siggestagard.se/konferens/konferensaktiviteter/segling-i-stockholms-skargard — "Seglings- och teambuildingaktivitet i Stockholms skärgård."
      { q: "Var kan man ha företagsevent i Stockholms skärgård?", a: "Till exempel på Grinda, där Grinda Wärdshus har konferens och ordnar aktiviteter, eller på Utö Värdshus, som har 14 mötesrum. Siggesta Gård på Värmdö har konferens med segling och kajak." },
      // KÄLLA: https://www.naturvardsverket.se/vagledning-och-stod/allemansratten/organiserad-verksamhet/ — "Allemansrätten är dock knuten till den enskilde individen, inte till grupper. Därför har du som arrangör av organiserade aktiviteter i naturen ett särskilt ansvar."
      { q: "Gäller allemansrätten för en grupp från jobbet?", a: "Allemansrätten gäller den enskilda personen, inte gruppen. Den som arrangerar en gruppaktivitet har därför ett särskilt ansvar, bland annat att välja plats och tid så att det inte blir skador och att ta reda på om det behövs tillstånd." },
    ],
  },
  { slug: "segelkurs-stockholm", title: "Segelkurs Stockholm skärgård – kurser, skolor och priser", excerpt: "Börja segla i Stockholms skärgård. Guide till segelskolor, kurstyper, kustskepparexamen och vad en segelkurs i Stockholm faktiskt kostar 2026.", category: "Aktivitet", emoji: "⛵", readTime: "7 min", fullContent: true, topics: ['segelkurs'], faqs: [{ q: 'Vad kostar segelkurs i Stockholm?', // KÄLLA: stockholmssegelsallskap.se (helgkurs 4 400 kr), gkss.se (5 100–6 600 kr), sngruppen.se (kustskeppare från 2 995 kr) — avlästa 2026-08-11
      a: 'Nybörjarhelgkurs hos Stockholms Segelsällskap: 4 400 kr (2 700 kr för studerande); GKSS motsvarande kurser 5 100–6 600 kr. Kustskepparintygskurs: från 2 995 kr plus litteratur, båtpraktik ingår. Kustskepparexamen krävs för att charterbåtar ska låta dig hyra utan besättning.' }, { q: 'Vilka segelskolor finns i Stockholm?', a: 'KSSS (Kungliga Segel Sällskapet), SXK Stockholm, och privata aktörer som Stockholm Sailing har kurser maj–september. Boka i mars för populära sommarveckor.' }] },
  {
    slug: "dagstur-marstrand",
    title: "Hur tar man sig till Marstrand? Dagstur till Marstrand",
    excerpt: "Hur tar man sig till Marstrand? Buss från Göteborg eller bil till Koön och sedan färjan. Dagstur till Marstrand: kartor, fästningen och leden runt ön.",
    category: "Region", emoji: "🏰", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://carlsten.se/ — "Eftersom biltrafik är förbjuden på Marstrandsön får du som åker bil eller buss ta personfärjan från Koön till Marstrandsön. Färjeöverfarten tar bara ett par minuter."
      { q: "Hur tar man sig till Marstrand?", a: "Med bil eller buss till färjeläget på Koön och sedan med personfärjan över till Marstrandsön. Biltrafik är förbjuden på Marstrandsön, och överfarten tar bara ett par minuter." },
      // KÄLLA: https://www.vastsverige.com/kungalv/leder/marstrand-vandringsleder/ — "Med Marstrands Express (MEXP) tar du dig från Nils Ericson Terminalen i Göteborg till Marstrands färjeläge på knappt en timme."; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014630200000/ — "Tidtabell linje 302 Marstrand - Ytterby - Kungälv"
      { q: "Hur tar man sig till Marstrand från Göteborg med buss?", a: "Marstrands Express (MEXP) går från Nils Ericson Terminalen i Göteborg till hållplatsen Marstrands färjeläge på knappt en timme enligt Turistrådet Västsverige. Från Kungälv resecentrum och Ytterby station går även Västtrafiks linje 302. Sök resan i Västtrafiks reseplanerare." },
      // KÄLLA: https://www.vastsverige.com/kungalv/leder/marstrand-vandringsleder/ — "Vid Kungälvsmotet tag avfart 86 och följ väg 168 (skyltat Marstrand)."; https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Endast fordon i nyttotrafik får färjas över till Marstrandsön."
      { q: "Kan man köra bil till Marstrand?", a: "Bara till Koön. Du följer väg 168 från Kungälvsmotet till Koön, parkerar där och tar personfärjan. Marstrandsön är bilfri, och bara fordon i nyttotrafik får färjas över." },
      // KÄLLA: https://www.vastsverige.com/kungalv/produkter/farja-koon-marstrand/ — "Marstrandsfärjan avgår regelbundet dygnet runt och tar endast två minuter. Sena kvällar och nätter behöver färjan förbeställas"; https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "På www.marstrandsfarja.se kan du köpa biljett, se tidtabeller och se trafikinformation."
      { q: "Hur ofta går färjan till Marstrand?", a: "Marstrandsfärjan går regelbundet dygnet runt och överfarten tar två minuter. Sena kvällar och nätter måste den förbeställas. Tidtabellen finns på marstrandsfarja.se." },
      // KÄLLA: https://www.vastsverige.com/kungalv/leder/marstrand-vandringsleder/ — "Karta för utskrift/nedladdning"; https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/ — "Använd kartan eller listan nedanför för att hitta information om biljettpriser, placering och övrig information om parkeringsplatserna."
      { q: "Finns det en karta över Marstrand?", a: "Ja. Turistrådet Västsverige har en ledkarta och en karta för utskrift över Marstrandsön, och Kungälvs kommun har en karta över besöksparkeringarna på Koön och Marstrand." },
      // KÄLLA: https://www.vastsverige.com/kungalv/leder/marstrand-vandringsleder/ — "Vandringsleden runt hela ön är cirka 5 kilometer lång och tar en timme utan stopp"; https://www.vastsverige.com/kungalv/leder/marstrand-vandringsleder/ — "längre fram vid Strandverket finns ett bad anpassat för barn"
      { q: "Vad kan man göra i Marstrand?", a: "Besöka Carlstens fästning, gå leden runt Marstrandsön (cirka 5 km, ungefär en timme utan stopp) förbi Nålsögat och Skallens fyr, bada vid Strandverket och vandra på Koöns leder." },
      // KÄLLA: https://carlsten.se/oppettider-och-priser/ — "120 kr/person"; https://carlsten.se/oppettider-och-priser/ — "60 kr/barn"; https://carlsten.se/oppettider-och-priser/ — "Barn under 5 år i målsmans sällskap:"
      { q: "Vad kostar inträdet till Carlstens fästning?", a: "Enligt fästningens prislista för 2026 (läst 27 september 2026) kostar inträdet 120 kr för vuxna och 60 kr för barn 5–15 år. Yngre barn i sällskap med vuxen går in gratis." },
    ],
  },
  // Batch I – Yttre Gården
  {
    slug: "yttre-garden-guide",
    title: "Yttre Gården i Nynäshamn – stränder, skog och hur du tar dig dit",
    excerpt: "Yttre Gården i Nynäshamn är en ö ca två km sydost om staden, med gammal tallskog och sandstränder. Så tar du dig dit med båt eller kajak och det här gäller.",
    category: "Region", emoji: "🪨", readTime: "5 min", fullContent: true, topics: ['kajak'],
    faqs: [
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "som ligger ca två km sydost om Nynäshamn"
      { q: "Var ligger Yttre Gården i Nynäshamn?", a: "Yttre Gården är en ö ungefär två kilometer sydost om Nynäshamn. Marken ägs av Fortifikationsverket." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/batliv — "I Nynäshamns gästhamn finns möjlighet att hyra mindre motorbåtar"; https://www.kayakomat.com/sv/location/62b4ecb11cfae6aacec5e0ef — "Flytväst ingår"
      { q: "Hur tar man sig till Yttre Gården?", a: "Med egen eller hyrd båt eller med kajak. Vi har inte hittat någon reguljär båtlinje dit. I Nynäshamns gästhamn går det att hyra mindre motorbåtar, och Kayakomat vid Nickstabadet i Nynäshamn hyr ut kajaker med flytväst." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/turbatar — "Waxholmsbolaget (båt till Nåttarö, Aspö, Rånö, Ålö och Landsort)"
      { q: "Går det båt till Yttre Gården från Nynäshamn?", a: "Vi har inte hittat någon reguljär båtlinje. Nynäshamns kommun listar Waxholmsbolagets båtar från fiskehamnen till Nåttarö, Aspö, Rånö, Ålö och Landsort, men inte till Yttre Gården." },
      // KÄLLA: https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/skyddsvarda-statliga-skogar/ — "inventeringar som Naturvårdsverket och länsstyrelserna redovisade 2004"
      { q: "Är Yttre Gården ett naturreservat?", a: "Vi har inte hittat något reservatsbeslut. Södra halvan av ön är utpekad som skyddsvärd statlig skog i den inventering som Naturvårdsverket och länsstyrelserna redovisade 2004. Kontrollera Naturvårdsverkets karta Skyddad natur före besöket." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/ — "Du får tälta något enstaka dygn i naturen, men tänk på att välja en tältplats långt bort från bostadshus och att visa hänsyn till markägaren."
      { q: "Får man tälta på Yttre Gården?", a: "Vi har inte hittat några särskilda regler för ön, så allemansrätten gäller: du får tälta något enstaka dygn och ska visa hänsyn till markägaren." },
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Det är såväl sandtstränder som klapperstensstränder omväxlande med klippstränder."
      { q: "Finns det sandstrand på Yttre Gården?", a: "Ja. Naturvårdsverket beskriver sandstränder, klapperstensstränder och klippstränder omväxlande, och ett sandparti med en klipphäll ytterst på sydvästra delen av ön som används mycket av båtfolk." },
    ],
  },

  // ── Batch J: SEO-gap-guider ────────────────────────────────────────────────
  // Säsong
  {
    slug: "juni-skargarden-2026",
    title: "Juni i skärgården 2026 – båtar, midsommar, öar och regler",
    excerpt: "Juni i skärgården: så gick båtarna vid midsommar 2026, när midsommar infaller, var du ser badtemperaturen och vad som gäller för fågelskydd och grillning.",
    category: "Säsong", emoji: "🌿", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/artikel/helgtrafik — "Midsommarafton fredag 19 juni: trafiken går som en lördag"; "Midsommardagen lördag 20 juni: trafiken går som en söndag"
      { q: "Hur går Waxholmsbåtarna på midsommarafton?", a: "Vid storhelger går båtarna enligt en annan veckodags tidtabell. Midsommarafton fredag 19 juni 2026 gick trafiken som en lördag, och midsommardagen som en söndag. Waxholmsbolaget listar vad som gäller varje år på sin sida om helgtrafik." },
      // KÄLLA: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253/ — "midsommardagen den lördag som infaller under tiden den 20-26 juni"; https://waxholmsbolaget.se/artikel/helgtrafik — "Midsommarafton fredag 19 juni: trafiken går som en lördag"
      { q: "När är midsommar?", a: "Midsommarafton 2026 var fredag 19 juni. Enligt lagen om allmänna helgdagar är midsommardagen lördagen under perioden 20–26 juni, och midsommarafton är dagen före." },
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten.html — "Här redovisas vattenkvalitet, temperatur, algblomning, klassificering och annan information om din specifika badplats."
      { q: "Kan man bada i skärgården i juni?", a: "Det beror på vattnet just det året, och ingen källa anger en typisk junitemperatur. Havs- och vattenmyndighetens sida Badplatser och badvatten visar temperatur, vattenkvalitet och algblomning för varje registrerad badplats, med data från kommunerna." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/att-besoka-skyddad-natur/grilla/ — "Anvisade eldstäder eller egen grill får inte användas om det råder eldningsförbud i kommunen. Under torrperioder vår- och sommartid kan du utgå från att eldningsförbud är utfärdat."
      { q: "Får man grilla i skärgården i juni?", a: "Bara om det inte råder eldningsförbud. Skärgårdsstiftelsen skriver att du under torrperioder vår- och sommartid kan utgå från att eldningsförbud är utfärdat, och då får varken anvisade eldstäder eller egen grill användas." },
      // KÄLLA: https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/djur--och-vaxtskyddsomraden/ — "Den vanligaste förbudsperioden för fågel är 1 april till 15 juli."; "Skyddsperioden bör anpassas efter arten/arternas behov på respektive plats."
      { q: "Får man gå i land på fågelskär i juni?", a: "Inte i fågelskyddsområden under förbudsperioden. Den vanligaste perioden är 1 april till 15 juli, men den anpassas efter arterna på varje plats. Kolla föreskrifterna hos Länsstyrelsen innan du lägger till." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/uto — "Men från Årsta brygga i Haninge går det att resa till Utö sju till åtta gånger om dagen sommartid"; "Till Årsta brygga kommer du med pendeltåg och sedan buss."
      { q: "Varifrån går båten till Utö?", a: "Från Årsta brygga i Haninge går båten till Utö sju till åtta gånger om dagen sommartid. Dit kommer du med pendeltåg och buss. På sommaren finns också turer hela vägen från Stockholm." },
    ],
  },
  {
    slug: "folkfria-oar-juli",
    title: "Folkfria öar i juli? Öar längre ut i Stockholm och Bohuslän",
    excerpt: "Folkfria öar i juli går inte att lova. Här är Rödlöga, Svartlöga, Arholma, Blidö, Möja, Käringön och Gullholmen, med båtar, restider och reservatsregler.",
    category: "Säsong", emoji: "🏝", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/ — "Du vet väl att Skärgårdsstiftelsens alla områden står öppna för dig året om."; "ett 30-tal naturreservat från Örskär i norr till Nåttarö i söder"; https://waxholmsbolaget.se/reseplanering/resmal/rodloga — "Det här är så långt ut i havsbandet du kommer med reguljär trafik."
      { q: "Finns det folkfria öar i juli?", a: "Det går inte att lova, eftersom ingen källa mäter hur många som är på en ö en viss dag. Däremot står Skärgårdsstiftelsens ett 30-tal naturreservat öppna året om, och öar som Rödlöga ligger så långt ut man kommer med reguljär trafik." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/rodloga — "Det här är så långt ut i havsbandet du kommer med reguljär trafik."; "Resan tar fyra timmar. Det går en eller två turer till Rödlöga varje dag."
      { q: "Hur långt ut kommer man med Waxholmsbolaget?", a: "Enligt Waxholmsbolaget är Rödlöga så långt ut i havsbandet man kommer med reguljär trafik. På sommaren går båten direkt från Strömkajen, resan tar fyra timmar och det går en eller två turer om dagen." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/arholma/ — "Hit reser du med buss eller bil till Simpnäs och fortsätter sedan med passbåt till ön. Under sommaren går även reguljära skärgårdsbåtar från Stockholm."
      { q: "Hur tar man sig till Arholma?", a: "Med buss eller bil till Simpnäs och sedan passbåt över till ön. På sommaren går även skärgårdsbåtar från Stockholm." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård."; "överfartstiden är fyra minuter"; https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård."
      { q: "Kan man ta bilen till Blidö?", a: "Ja. Trafikverkets avgiftsfria vägfärjor går mellan Furusund och Yxlan och mellan Yxlan och Blidö. Varje överfart tar fyra minuter." },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Båtresan tar cirka 35 minuter från Tuvesvik till Käringön."; "Nej, Käringön är bilfri. Du parkerar bilen i Tuvesvik och fortsätter med personfärja."
      { q: "Hur tar man sig till Käringön?", a: "Med Västtrafiks personfärja linje 381 från Tuvesvik på Orust. Resan tar ungefär 35 minuter. Käringön är bilfri, så bilen parkeras i Tuvesvik." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "för längre tid än två dygn i följd tälta på samma plats, annat än inom anlagd tältplats"; "medföra okopplad hund"; "under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb"
      { q: "Får man tälta på Arholma?", a: "I Arholma-Idö naturreservat får du inte tälta mer än två dygn i följd på samma plats utanför anlagd tältplats, och hunden ska vara kopplad. Mellan 1 april och 31 juli är det förbjudet att gå i land på Rödkobben och Nollekobb." },
    ],
  },
  {
    slug: "oktober-skargarden",
    title: "Höstfärger och oktober i skärgården – båtar och vad som är öppet",
    excerpt: "Oktober i skärgården: var du ser höstfärger i lövskogen, vilka Waxholmsbåtar som går enligt hösttidtabellen och vad som faktiskt har öppet i oktober 2026.",
    category: "Säsong", emoji: "🍁", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "På Västerholmen är inslaget av lövskog stort och här växer bland annat lind, ask alm och ek."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "De vanligaste trädslagen är björk och al."
      { q: "Var ser man höstfärger i skärgården?", a: "Där det växer lövskog. Gällnö har ädellövskog med bland annat lind, ask, alm och ek på Västerholmen, stigarna på Finnhamn går genom lövskogar och Öja vid Landsort är till stor del bevuxen med björk och al." },
      // KÄLLA: https://waxholmsbolaget.linjetidtabeller.se/ — "Stockholm - Vaxholm - Grinda - Boda - Sollenkroka Gäller:2026-08-17till2026-12-12"; https://waxholmsbolaget.linjetidtabeller.se/ — "Stockholm - Vaxholm - Norrsund - Rödlöga Gäller:2026-08-17till2026-11-01"
      { q: "Går Waxholmsbåtarna i oktober?", a: "Ja. Höstens linjetidtabeller gäller 17 augusti–12 december 2026. Linjerna från Stockholm till Rödlöga, Arholma och Blidösundet slutar dock 1 november 2026." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"; https://www.waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://grinda.se/oppettider/ — "till 3.e helgen i oktober"; https://www.sandhamns-vardshus.se/ — "Öppet året runt."
      { q: "Vilka öar i Stockholms skärgård är öppna i oktober?", a: "Vaxholm, Grinda, Möja och Sandhamn har båttrafik året runt, och till Utö går båtar från Årsta brygga. På Grinda har stugbyn öppet till tredje helgen i oktober, och på Sandhamn har värdshusets pub öppet året runt." },
      // KÄLLA: https://www.grindawardshus.se/ — "Tredje helgen i oktober har vi vårt återkommande tema och event Eld!"; https://www.grindawardshus.se/ — "Lördagen den 24 oktober fylls ön av öl"; https://www.vaxholm.se/alla-nyheter/nyhetsarkiv/2026-09-18-kulturnatt-i-vaxholm-9-oktober — "Missa inte årets Kulturnatt i Vaxholm fredag 9 oktober."
      { q: "Vad händer i skärgården i oktober 2026?", a: "Tredje helgen i oktober har Grinda Wärdshus eventet Eld, och lördag 24 oktober har värdshuset Oktoberfest. I Vaxholm är det Kulturnatt fredag 9 oktober." },
      // KÄLLA: https://explorearchipelago.se/sv/sthlm/mellersta-skargarden/trasko-storo/skargardsstiftelsens-bastu-pa-trasko-storo — "Basturna är öppna från 30 april till och med 31 oktober."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu/ — "Alla Skärgårdsstiftelsens bastur är bokningsfria!"
      { q: "Kan man basta i skärgården i oktober?", a: "Ja. Skärgårdsstiftelsens bastur i Möjaskärgården, på Träskö-Storö och på Nämdö är öppna till och med 31 oktober och går inte att boka." },
    ],
  },
  { slug: "host-oland-2026", title: "Höst på Öland 2026 – alvaret och kusten i höstskrud", excerpt: "Öland på hösten är ett helt annat landskap än sommaren. Tystnad, fågelflyttning och alvaret i gulbrunt ljus. Guide till höstens Öland.", category: "Säsong", emoji: "🌾", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad är det bästa med Öland på hösten?', a: 'Alvaret skiftar till gyllengult och brunt, fågelflyttningen är på topp i oktober, och ön är i princip turistfri. Perfekt för vandring, fågelskådning och stillhet.' }, { q: 'Är Öland öppet på hösten?', a: 'Ja – Ölandsbron är öppen året runt. Många restauranger och attraktioner stänger efter sommarens slut. Borgholms slott och Ekoparken är bäst att boka före besök.' }] },
  {
    slug: "host-hoga-kusten-2026",
    title: "Höga Kusten på hösten 2026 – Skuleskogen och världsarvet",
    excerpt: "Höga Kusten på hösten: leder i höstfärger, Skuleskogen, Skuleberget och resan dit. Och Höstljus 2026 – var och när ljusfestivalen faktiskt äger rum.",
    category: "Säsong", emoji: "🏔", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/parkerochgronomraden/aretruntiparkerna/hostljus.4.19a41f3a17567e789efe52.html — "Varje år i slutet av oktober startar ljusfestivalen Höstljus. Under tre veckor lyser ljuskonstverk upp staden"; https://www.sofiero.se/arets-hostljus — "Höstljus 2026 på Sofiero, 25 oktober - 8 november"; https://www.sofiero.se/arets-hostljus — "Sofiero slott och slottsträdgård – en del av Helsingborgs stad"
      { q: "När är Höstljus 2026?", a: "Höstljus arrangeras inte i Höga Kusten. I Umeå startar ljusfestivalen Höstljus varje år i slutet av oktober och pågår i tre veckor. På Sofiero i Helsingborg pågår Höstljus 2026 den 25 oktober–8 november." },
      // KÄLLA: https://www.hogakusten.com/sv/hojdpunkter/10-basta-hostvandringarna — "Omneleden är en 6 km lång led med start vid det barnvänliga badet Omnebadet eller vid Omne by."; https://www.hogakusten.com/sv/host — "Under hösten finns goda chanser att hitta både svamp och bär längs stigarna."
      { q: "Vad kan man göra i Höga Kusten på hösten?", a: "Vandra, till exempel Omneleden, Lotsstigen eller i Skuleskogen från Entré Väst till Skrattabborrtjärn, gå upp på Skuleberget och plocka svamp och bär längs stigarna." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken — "Hösten är en väldigt fin tid att besöka Skuleskogen."; https://www.sverigesnationalparker.se/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken — "Det finns inget vatten vid entréerna"
      { q: "Är det bra att besöka Skuleskogen på hösten?", a: "Sveriges nationalparker beskriver hösten som en fin tid med höstfärger och färre besökare, men det blir kallare, regnar mer och dagarna blir kortare. Ta med vatten, eftersom det inte finns vatten vid entréerna." },
      // KÄLLA: https://www.hogakusten.com/sv/planera-resan/resa-hit-har — "Y-buss går via flera hållplatser på sträckan Örnsköldsvik-Stockholm samt sträckan Sollefteå-Kramfors-Stockholm."; https://www.hogakusten.com/sv/planera-resan/resa-hit-har — "Inom Höga Kusten kan du även resa med Norrtåg."
      { q: "Hur tar man sig till Höga Kusten på hösten?", a: "Med Y-buss från Stockholm till bland annat hållplatsen Skuleberget Naturum, med tåg (SJ söderifrån och Norrtåg inom området) eller med flyg till Kramfors eller Örnsköldsvik. På plats kör DinTur lokalbussarna." },
      // KÄLLA: https://www.lansstyrelsen.se/vasternorrland/besoksmal/varldsarvet-hoga-kusten.html — "Grunden till detta är den geologiskt sett snabba och stora landhöjningen efter den senaste inlandsisen."; https://www.lansstyrelsen.se/vasternorrland/besoksmal/varldsarvet-hoga-kusten.html — "sedan dess har landet höjts 286 meter i förhållande till havsytan"
      { q: "Varför är Höga Kusten världsarv?", a: "På grund av den snabba och stora landhöjningen efter den senaste inlandsisen. Sedan området blev isfritt för ungefär 10 500 år sedan har landet höjts 286 meter." },
    ],
  },
  {
    slug: "vinter-gotland-2026",
    title: "Gotland på vintern 2026 – Visby i vinter och vad som har öppet",
    excerpt: "Gotland på vintern: färjan och flyget året runt, Visby i vinter med museum, julmarknad och restauranger, skidspår när det snöar och vad som har öppet.",
    category: "Säsong", emoji: "❄️", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.gotland.se/farjetrafik — "Färjorna är höghastighetsfartyg med en restid på drygt tre timmar."; https://gotland.com/gotland-convention-bureau/resa-till-och-fran-on/ — "Med året-runt-trafik mellan Gotland och fastlandet är resan enkel och smidig oavsett årstid."; https://gotland.com/gotland-convention-bureau/resa-till-och-fran-on/ — "Till Gotland flyger du dagligen från Arlanda med SAS, med en restid på cirka 40–45 minuter."
      { q: "Hur tar man sig till Gotland på vintern?", a: "Gotlandsfärjan går året runt från Nynäshamn och Oskarshamn till Visby, och resan tar drygt tre timmar. Det går också flyg dagligen från Arlanda, cirka 40–45 minuter. Se Destination Gotlands turlista för dagens avgångar." },
      // KÄLLA: https://gotland.com/guide/sportlov-pa-gotland-2026/ — "Raukarna är lika spännande året runt."; https://gotland.com/guide/sportlov-pa-gotland-2026/ — "Om det finns snö går det vissa dagar att hyra skidor och åka på Svaidestugan och VOK-stugan."; https://gotland.com/guide/tips-pa-saker-att-gora-pa-gotland-i-januari/ — "Runt om på ön finns många iordningställda grillplatser där du kan grilla året om."
      { q: "Vad kan man göra på Gotland på vintern?", a: "Gå runt i Visby innanför ringmuren, besöka Gotlands Museum, se raukarna, vandra och grilla på iordningställda grillplatser. När det finns snö kan du åka skidor strax utanför Visby eller åka pulka vid Nordergravar." },
      // KÄLLA: https://gotland.com/besoka-uppleva/upptack-visby/ — "Visby är förmodligen Sveriges krogtätaste stad, här finns ett fantastiskt utbud av restauranger, caféer och barer, året runt."; https://gotland.com/guide/tips-pa-saker-att-gora-pa-gotland-i-januari/ — "Med appen Öppet Gotland får du lätt reda på vilka caféer, restauranger, butiker mm som har öppet just nu."
      { q: "Har restaurangerna i Visby öppet på vintern?", a: "Ja, många. Gotland.com skriver att Visby har restauranger, caféer och barer året runt. Vilka som har öppet en viss dag ser du i appen Öppet Gotland." },
      // KÄLLA: https://gotland.com/jul-pa-gotland/ — "Under adventshelgerna hittar du de mysiga julbodarna på Stora torget."; https://gotland.com/jul-pa-gotland/ — "Välkommen till en historisk julstämning i S:t Nicolai ruin 4-6 december 2026."
      { q: "Vad händer i Visby i vinter?", a: "Under adventshelgerna står julbodar på Stora torget, och på första advent är det julskyltning och julmarknad. Den 4–6 december 2026 är det medeltida julmarknad i S:t Nicolai kyrkoruin." },
      // KÄLLA: https://www.gotlandsmuseum.se/ — "Öppet alla dagar"; https://gotland.com/besoka-uppleva/friluftsliv-natur/topp-tio-pa-gotland/ — "Öppet året runt."
      { q: "Har Gotlands Museum öppet på vintern?", a: "Ja. Museet i Visby har öppet året runt, och enligt museets egen webbplats alla dagar. Kolla aktuella tider på gotlandsmuseum.se." },
      // KÄLLA: https://www.destinationgotland.se/allt-om-resan/infor-resan/anslutningstrafik-till-gotlandsfarjan/ — "Kollektivtrafiken kan ta dig över hela ön året runt. Tidtabeller och biljetter finns att hitta i appen Gotlands Kollektivtrafik."
      { q: "Går bussarna på Gotland på vintern?", a: "Ja. Kollektivtrafiken går över hela ön året runt. Tidtabeller och biljetter finns i appen Gotlands Kollektivtrafik." },
    ],
  },
  {
    slug: "vinter-bohuslan-2026",
    title: "Vinter i Bohuslän 2026 – vinterbad, bastu och öppet året runt",
    excerpt: "Vinter i Bohuslän 2026: vinterbad med bastu i Strömstad, Grebbestad och Smögen, hotell med vinteröppet, julmarknad i Marstrand och båtarna ut till öarna.",
    category: "Säsong", emoji: "🌊", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.stromstad-bad.se/kallbadhus/ — "VINTERBAD MED BASTU"; https://tanumstrand.se/attgora/havsbastu/ — "Bastun på bryggan, erbjuder härliga kontraster mellan varmt och kallt – året runt!"; https://www.havetshus.se/besok-oss/oppettider/ — "Öppet dagligen 2/1 till 30/12*"; https://marstrandsmarknad.com/ — "JULMARKNAD · 28–29 NOVEMBER 2026"
      { q: "Vad kan man göra i Bohuslän på vintern?", a: "Du kan vinterbada med bastu, till exempel i Kallbadhuset i Strömstad eller i TanumStrands havsbastu, besöka akvariet Havets Hus i Lysekil som har öppet dagligen hela året utom några helgdagar, och gå på Marstrands julmarknad den 28–29 november 2026." },
      // KÄLLA: https://marstrandsmarknad.com/ — "Marstrandsfärjan går mellan Koön och Marstrandsön var 15:e minut, året runt."; https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "även på vintern är det flera dagliga avgångar"; https://www.vasttrafik.se/info/kosterbatarna/ — "Kosterbåtarna kör mellan Strömstad och Kosteröarna."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ — "Resan med vägfärjan är avgiftsfri."
      { q: "Hur tar man sig till Bohusläns öar på vintern?", a: "Marstrandsfärjan går var femtonde minut året runt, båten till Käringön och Gullholmen har flera dagliga avgångar även på vintern, och Kosterbåtarna kör mellan Strömstad och Kosteröarna. Trafikverkets vägfärjor, som Gullmarsleden och Malöleden, är avgiftsfria." },
      // KÄLLA: https://www.stromstad-bad.se/kallbadhus/ — "Uppehåll under juni-juli-augusti"; https://tanumstrand.se/attgora/havsbastu/ — "Ta ett skönt och uppfriskande havsdopp året runt och sätt dig sen i vår havsbastu."; https://www.smogenshafvsbad.se/spa/ — "En kort promenad från hotellet finner du vår bastu i den fina viken Glommen."; https://www.vastsverige.com/tanum/vinter/vinterbada/ — "Bastu och tunnor måste förbokas"
      { q: "Var kan man vinterbada med bastu i Bohuslän?", a: "Exempel: Kallbadhuset i Strömstad har vinterbad med bastu utanför sommaren, TanumStrand i Grebbestad har en havsbastu på bryggan året runt, Smögens Hafvsbad har en havsbastu i viken Glommen och Väderöarnas Värdshus har bastu och badtunnor som förbokas." },
      // KÄLLA: https://www.smogenshafvsbad.se/ — "76 hotellrum, en stor restaurang, spa och konferens öppet hela året"; https://www.vaderoarna.com/ — "Våra båtar avgår från Hamburgsund året runt."; https://tanumstrand.se/vintern-pa-tanumstrand/ — "Skärgårdspaket (höst, vinter, vår)"; https://www.grebbestadfjorden.com/ — "En fyrstjärnig camping som håller öppet året runt."
      { q: "Vilka hotell i Bohuslän har öppet på vintern?", a: "Smögens Hafvsbad har hotell, restaurang, spa och konferens öppet hela året, och Väderöarnas Värdshus har öppet året runt med båtar från Hamburgsund. TanumStrand har paket för höst, vinter och vår, och campingen GrebbestadFjorden håller öppet året runt." },
      // KÄLLA: https://tanumstrand.se/vintern-pa-tanumstrand/ — "Vintern är högsäsong för havets delikatesser."; https://tanumstrand.se/vintern-pa-tanumstrand/ — "Testa Grebbestad ostron, plockade direkt i havet utanför oss ihop med ett glas bubbel."
      { q: "Kan man äta ostron i Bohuslän på vintern?", a: "Ja. TanumStrand i Grebbestad skriver att vintern är högsäsong för havets delikatesser och serverar på vintern Grebbestadostron plockade i havet utanför anläggningen." },
    ],
  },
  {
    slug: "isbad-vinterbad-sverige",
    title: "Isbad i Sverige – isbad i Göteborg, Stockholm och Malmö",
    excerpt: "Isbad i Sverige: var du kan vinterbada, bland annat isbad i Göteborg vid Hamnbadet i Frihamnen, och vad Livräddningssällskapet och 1177 säger om säkerhet.",
    category: "Aktivitet", emoji: "🧊", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://goteborg.se/wps/portal/enheter/jubileumsparken/aktiviteter-i-parken/bada — "Under resterande delar av året är en av saltvattenbassängerna (simbassängen) öppen för bad."; https://goteborg.se/wps/portal/enheter/jubileumsparken/aktiviteter-i-parken/basta — "Den är öppen för alla, året om och kostnadsfri."; https://www.vastsverige.com/visitockero/se--gora/badochbastuiskargarden/ — "Badstege i året runt"
      { q: "Var kan man isbada i Göteborg?", a: "Hamnbadet i Jubileumsparken i Frihamnen har en saltvattenbassäng som är öppen för vinterbad utanför sommaren, och bredvid ligger Göteborgs Stads bastu som är gratis och öppen året om. I skärgården ligger badstegarna vid Hästen på Hönö och Hjälvik på Öckerö i året runt." },
      // KÄLLA: https://www.goteborg.com/platser/allmanna-badet-i-jubileumsparken — "simbassängen håller öppet året runt för den som vill vinterbada"; https://hellasgarden.se/aktiviteter/bastu/ — "Här badar våra gäster året om!"; https://ribersborgskallbadhus.se/ — "Kallbad & Bastu"; https://www.vastsverige.com/en/things-to-do/winter-swimming/cold-bathing/ — "lies Govik, all three with swimming ladders all year round"
      { q: "Var kan man isbada i Sverige?", a: "Exempel på platser som själva skriver att de har vinterbad: Hamnbadet i Jubileumsparken i Göteborg, Hellasgården i Nacka där gästerna badar i Källtorpssjön året om, och Ribersborgs Kallbadhus i Malmö med kallbad och bastu. Längs västkusten finns badstegar som ligger i året runt, till exempel vid Lysekil." },
      // KÄLLA: https://www.sjoraddning.se/artiklar/kroppens-reaktion-pa-kallt-vatten — "Du kommer inte att kunna kontrollera andningen och du kommer inte att kunna hålla andan."; "i 0-gradigt vatten kan det räcka med 10 minuter innan du börjar domna bort"; https://www.vastsverige.com/visitockero/se--gora/badochbastuiskargarden/ — "Bada inte själv"; "Gå i med fötterna först"; "Bada där du bottnar"
      { q: "Är isbad farligt?", a: "Det kan vara det. Kallt vatten ger en köldchock som gör att du inte kan kontrollera andningen eller hålla andan, och i noll grader kan armar och ben domna bort efter tio minuter. Bada aldrig ensam, gå i med fötterna först och bada där du bottnar." },
      // KÄLLA: https://www.vastsverige.com/visitockero/se--gora/badochbastuiskargarden/ — "Bada i dagsljus"; "Se alltid efter vart du tar dig upp innan du tar dig i vattnet"; "En termos varm dryck"; https://www.1177.se/Vastra-Gotaland/olyckor--skador/brannskador-och-koldskador/koldskador/ — "Byt till torra kläder. Det är också bra att dricka varm dryck."
      { q: "Vad ska man tänka på vid vinterbad för första gången?", a: "Bada i sällskap, i dagsljus och nykter. Se efter var du ska ta dig upp innan du går i, ha mössa och tofflor, och ta med badrock, varm dryck och varma kläder att byta om till. Ta dig sedan inomhus eller i lä och byt till torra kläder." },
      // KÄLLA: https://svenskalivraddningssallskapet.se/wp-content/uploads/2026/06/Isvett.pdf — "Kärnis ska vara minst 10 cm tjock."; "Ha alltid sällskap på och vid isen."; https://www.sjoraddning.se/artiklar/om-is-och-dess-svagheter — "En 20 cm tjock is kan vara mindre hållbar än en is på 5 cm."; "Samma sak gäller vid broar, bryggor och vass."
      { q: "Hur tjock ska isen vara för isbad i en isvak?", a: "Svenska Livräddningssällskapet anger att kärnisen ska vara minst 10 cm tjock. Sjöräddningssällskapet påpekar att tjockleken inte säger allt och att isen ofta är svag vid bryggor, sund och uddar. Ha alltid sällskap och räddningsutrustning med dig." },
    ],
  },
  // Öland
  {
    slug: "badplatser-oland",
    title: "Bästa stranden på Öland? Sandstränder och badplatser på Öland",
    excerpt: "Bästa stranden på Öland? Sandstränder och badplatser på norra och södra Öland, från Bödabukten och Byrum till Haga Park och Näsby – med hundregler.",
    category: "Aktivitet", emoji: "🏖", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.oland.se/tio-utflyktsparlor/boda — "Här väntar Böda Sand, en av Sveriges finaste stränder"
      { q: "Vilken är den bästa stranden på Öland?", a: "Det finns ingen officiell rangordning. Ölands Turism kallar Böda Sand på norra Öland \"en av Sveriges finaste stränder\", och Havs- och vattenmyndigheten har gett Böda Sand bedömningen utmärkt badvattenkvalitet de senaste fyra åren. Vill du surfa beskriver HaV Haga Park på södra Öland som en av Sveriges bästa platser för vind- och kitesurf." },
      // KÄLLA: https://www.oland.se/sol-och-bad — "Ölands avlånga form erbjuder två kuststräckor med olika karaktär, nämligen Kalmarsund och Östersjön som båda består av fina sandstränder!"
      { q: "Var finns sandstrand på Öland?", a: "Enligt Ölands Turism har både Kalmarsundskusten och Östersjökusten sandstränder. Långa sandstränder finns bland annat i Bödabukten, vid Byrum-Sandvik och Kesnäsviken på norra Öland, i Köpingebukten och vid Ekerum nära Borgholm, och vid Saxnäs, Möllstorp, Eriksöre och Näsby i Mörbylånga kommun." },
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-borgholms-kommun/byrum-sandvik.html — "Badplatsen Byrum-Sandvik är belägen på norra Öland."
      { q: "Vilka badplatser finns på norra Öland?", a: "På norra Öland finns bland annat Bödabukten med Böda Sand, Byrum-Sandvik på västra sidan, Kesnäsviken och Kårehamn på östkusten samt Byxelkrok och Djupvik, där stranden mest är grus och sten." },
      // KÄLLA: https://www.oland.se/tio-utflyktsparlor/sodra-udden — "På södra Öland möts vi av många fina platser, inte minst Ottenby, Eketorps borg, Grönhögen och Ölands sydligaste radby, Näsby."
      { q: "Vilka badplatser finns på södra Öland?", a: "Kring Färjestaden finns bland annat Möllstorp, Talludden, Granudden och Eriksöre, och Ölands Turism räknar även Haga Park till södra Öland. I och kring Mörbylånga finns Kleva, Norra viken och Kalvhagen. Längst i söder ligger Grönhögens strandbad och Näsby, som kommunen håller öppet från början av juni till slutet av augusti." },
      // KÄLLA: https://www.oland.se/tio-utflyktsparlor/boda — "Badplatserna Fagerör, Homrevet, Lyckesand och Böda Sand utgör tillsammans Bödabukten. Den nästan två mil långa sandstranden har också kallats för Ölands Riviera"
      { q: "Hur lång är stranden vid Böda på Öland?", a: "Badplatserna Fagerör, Homrevet, Lyckesand och Böda Sand utgör tillsammans Bödabukten på norra Öland, och enligt Ölands Turism är sandstranden där nästan två mil lång. Själva badplatsen Böda Sand är ett EU-bad med minst 1 500 meter sandstrand, enligt Havs- och vattenmyndigheten." },
      // KÄLLA: https://www.borgholm.se/badplatser/ — "Du får inte ha med dig hund till allmänna badplatser mellan 1 juni och 31 augusti, enligt kommunens lokala ordningsföreskrifter."
      { q: "Får man ha med hund på badplatserna på Öland?", a: "Inte på de allmänna badplatserna under sommaren: i Borgholms kommun är det förbjudet 1 juni–31 augusti och i Mörbylånga kommun 15 maj–31 augusti. Båda kommunerna har särskilda hundbad, till exempel vid Klinta bodar i Köpingsvik och vid Haga Park." },
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-borgholms-kommun/boda-sand.html — "Här ser du det senaste resultatet från kommunens provtagning av bakterier i vattnet och kontroll för att se om det pågår en algblomning."
      { q: "Hur vet jag om det är algblomning vid en badplats på Öland?", a: "Havs- och vattenmyndighetens sida för varje badplats visar kommunens senaste provsvar och om det pågår algblomning. Borgholms kommun tar tre prover per sommar vid varje strandbad, och svaren kommer 3–4 dagar efter provtagningen." },
    ],
  },
  {
    slug: "barnfamilj-oland",
    title: "Öland med barn – sandstränder, borgar och utflykter för familjen",
    excerpt: "Öland med barn: långgrunda sandstränder vid Böda och Färjestaden, Trollskogens barnvagnsstigar, Eketorps borg, Solliden och hur ni tar er till ön.",
    category: "Praktisk", emoji: "👨‍👩‍👧", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://eketorpsborg.se/ — "genom att delta i våra aktiviteter som brödbak, bågskytte och olika kamplekar"; https://www.sollidensslott.se/ — "Skattjakt, hemliga kojor, inte-nudda-marken-väg, och käpphästbana"; https://www.borgholmsslott.se/barnaktiviteter/ — "Borgholms Slott är ett besöksmål för hela familjen."; https://www.olandsdjurpark.com/ — "386 90 Färjestaden"
      { q: "Vad kan man göra med barn på Öland?", a: "Till exempel Barnens Eketorp med brödbak, bågskytte och kamplekar, Barnens Solliden med skattjakt och kojor i slottsparken, barnaktiviteterna på Borgholms slott och aktivitetsleden i Trollskogen. Sommartid finns också Ölands Djur- och Nöjespark i Färjestaden." },
      // KÄLLA: https://www.oland.se/tio-utflyktsparlor/boda — "Den nästan två mil långa sandstranden har också kallats för Ölands Riviera"; https://www.morbylanga.se/uppleva-och-gora/idrott-motion-natur-och-friluftsliv/badplatser/ — "Barnvänlig långgrund sandstrand belägen i centrala Färjestaden."
      { q: "Var finns barnvänliga stränder på Öland?", a: "Bödabukten på nordöstra Öland är en sandstrand på nästan två mil, och vid Böda Sand är botten sand. På södra Öland beskriver Mörbylånga kommun stranden i centrala Färjestaden som barnvänlig och långgrund." },
      // KÄLLA: https://www.oland.se/resa/buss-tag-taxi — "Kalmar Läns Trafik trafikerar med buss i Kalmar och på Öland."; https://www.oland.se/resa/buss-tag-taxi — "Direktbuss i båda riktningarna året runt."; https://www.oland.se/resa/cykelfarjan — "Eftersom det råder cykel- och gångförbud på Ölandsbron"
      { q: "Hur tar man sig till Öland utan bil?", a: "Ta tåget till Kalmar och sedan Kalmar Läns Trafiks buss ut på Öland. Silverlinjen kör också direktbuss mellan Öland/Kalmar och Stockholm. Sommartid går cykelfärjan Dessi mellan Kalmar och Färjestaden, eftersom man inte får cykla eller gå på Ölandsbron." },
      // KÄLLA: https://www.olandsdjurpark.com/ — "Djurparksvägen 1"; https://www.olandsdjurpark.com/ — "Nöjesparken är ett riktigt äventyr för barnfamiljer under sommaren."
      { q: "Var ligger Ölands djurpark?", a: "Ölands Djur- och Nöjespark ligger vid Djurparksvägen i Färjestaden på södra Öland. Parken håller öppet på sommaren och har djurpark, nöjesfält och vattenland." },
      // KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Leden lämpar sig bra för barnvagn, rollator och mindre permobil."; https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Det går bra att ta sig fram med barnvagn, rollator och rullstol med ledsagare."
      { q: "Kan man gå i Trollskogen med barnvagn?", a: "Ja. Enligt Länsstyrelsen fungerar Knysselnackestigen, en grusad slinga på cirka en kilometer, bra med barnvagn. Även Kolkyrkestigen och Murgrönestigen går att ta sig fram på med barnvagn." },
    ],
  },
  // KÄLLA: Länsstyrelsen Kalmar, naturreservat Trollskogen — beslut 1998, 266 ha (läst 2026-09-14)
  {
    slug: "vandring-oland",
    title: "Vandring på Öland – Signaturled Öland, etapper och vandringsleder",
    excerpt: "Vandring på Öland: Signaturled Öland i fem etapper med karta och boende, leder på Stora alvaret, i Trollskogen och Ottenby och naturupplevelser på Öland.",
    category: "Aktivitet", emoji: "🥾", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Genom det karga och vackra landskapet på Södra Öland löper Signaturled Öland, eller Mörbylångaleden som den också kallas."; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Total längd: 84 km"; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Leden börjar vid Ölands Turistbyrå i Färjestaden och går ända ner till Ölands södra spets."
      { q: "Vad är Signaturled Öland?", a: "Signaturled Öland är STF:s namn på Mörbylångaleden, en av Svenska Turistföreningens signaturleder. Den är 84 km lång, har fem etapper och går från Ölands Turistbyrå i Färjestaden ner mot Ölands södra spets genom världsarvet på södra Öland." },
      // KÄLLA: https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Etapp 1: Färjestaden–Skogsby"; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Etapp 4: Kastlösa–Gammalsby"; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Vid varje etappslut väntar ett boende."
      { q: "Vilka etapper har Signaturled Öland?", a: "Enligt STF: Färjestaden–Skogsby (17 km), Skogsby–Mörbylånga (18 km), Mörbylånga–Kastlösa (13,5 km), Kastlösa–Gammalsby (22 km) och Gammalsby–Ottenby (12 km). Varje etapp tar ungefär en dag, och vid varje etappslut finns ett boende." },
      // KÄLLA: https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Karta och mer information: Mörbylånga.se"; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Den här kartan är ett planeringsverktyg och bör inte ersätta fysisk karta och kompass."; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Leden är markerad med röda träpilar."
      { q: "Var hittar man en karta över Signaturled Öland?", a: "STF:s sida om leden har en karta och hänvisar till Mörbylånga kommun för karta och mer information. Kartan är ett planeringsverktyg och ersätter inte fysisk karta och kompass. Leden är markerad med röda träpilar." },
      // KÄLLA: https://www.oland.se/vandra — "Totalt finns det över 140 km vandringsleder"; https://www.morbylanga.se/uppleva-och-gora/idrott-motion-natur-och-friluftsliv/cykel-vandringsleder-och-naturreservat/ — "En cyklingsbar vandringsled på alvaret från Karlevi till Möckelmossen. Längd: 13 km."; https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "I Trollskogen finns fyra färgmarkerade vandringsleder."
      { q: "Vilka vandringsleder finns på Öland?", a: "Förutom Signaturled Öland finns över 140 km vandringsleder i världsarvet på södra Öland, till exempel Stora Alvarleden (13 km) mellan Karlevi och Möckelmossen. I Trollskogen på norra Öland finns fyra färgmarkerade leder som startar vid naturum." },
      // KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/ottenby.html — "Ottenby är vida berömt som fågelskådarnas besöksmål."; https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Här vandrar du genom gammal tallskog med stormvridna träd."; https://www.lansstyrelsen.se/kalmar/besoksmal/varldsarvet-sodra-olands-odlingslandskap.html — "Stora alvaret är 260 km² stort."
      { q: "Vilka naturupplevelser finns på Öland?", a: "Ottenby på Ölands södra udde är enligt Länsstyrelsen vida berömt som fågelskådarnas besöksmål, med fågelstation och fyren Långe Jan. Trollskogen i norr har gammal tallskog med stormvridna träd, och Stora alvaret på södra Öland är 260 km²." },
      // KÄLLA: https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Tåg till Kalmar och därefter buss med Kalmar Länstrafik"; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Långtidsparkering för bilburna finns inte i Färjestaden."; https://www.svenskaturistforeningen.se/guider-tips/leder/signaturled-oland/ — "Bussar åter från Ottenby (hållplats Ås kyrka) går endast vardagar under högsäsong."
      { q: "Hur tar man sig till Signaturled Öland?", a: "Ta tåget till Kalmar och bussen med Kalmar Länstrafik till Färjestaden. Det finns ingen långtidsparkering i Färjestaden. Bussarna tillbaka från Ottenby (hållplats Ås kyrka) går bara vardagar under högsäsong." },
      // KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/ottenby.html — "Tälta eller ställa upp husvagn."; https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "I naturreservatet får du inte:"; https://www.oland.se/vandra/morbylangaleden/signaturled-oland — "Här finns grillplatser och vindskydd för övernattning."
      { q: "Får man tälta när man vandrar på Öland?", a: "Det beror på var. I naturreservaten Trollskogen och Ottenby är det förbjudet att tälta. Längs Signaturled Öland finns boende vid varje etappslut, och vid Penåsa rastplats finns vindskydd för övernattning." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "hyra-stuga-oland",
    title: "Hyra stuga på Öland 2026 – stugbyar, förmedlare och Blocket",
    excerpt: "Hyra stuga på Öland 2026: stugförmedlare, stugbyar och campingar med stugor, och Konsumentverkets och Polisens råd när du hyr privat via Blocket.",
    category: "Praktisk", emoji: "🏡", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson-vad-ska-jag-tanka-pa — "Se till så att du har uthyrarens namn och telefonnummer och att det stämmer med uppgifterna i annonsen."; https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson-vad-ska-jag-tanka-pa — "Betala inte hyra i förskott"
      { q: "Kan man hyra stuga på Öland via Blocket?", a: "Ja, många privatpersoner annonserar själva på annonssajter som Blocket. Hyr du privat bör du enligt Konsumentverket ha uthyrarens namn och telefonnummer, kontrollera att uppgifterna stämmer med annonsen och inte betala hyran i förskott." },
      // KÄLLA: https://polisen.se/utsatt-for-brott/polisanmalan/bedragerier/bedragerier/annonsbedrageri/ — "Kräv ett skriftligt hyreskontrakt."; https://polisen.se/utsatt-for-brott/polisanmalan/bedragerier/bedragerier/annonsbedrageri/ — "Betala inte pengar via anonyma betalningstjänster."
      { q: "Hur undviker man bedrägeri när man hyr stuga privat?", a: "Sök själv fram uthyrarens telefonnummer och ring upp, kräv ett skriftligt kontrakt och betala inte via anonyma betalningstjänster. Har du blivit lurad: kontakta banken först och gör sedan en polisanmälan." },
      // KÄLLA: https://www.oland.se/boende/stugbokning — "Nedan hittar du flera stugförmedlare att välja bland."; https://www.oland.se/bo — "bokaoland.se - bokningsplattform för boende, aktiviteter & paket"
      { q: "Var hittar man stuga att hyra på Öland 2026?", a: "Oland.se listar sex stugförmedlare: fritiden.se, novasol.se, stugknuten.se, stugnet.se, stugsidan.se och stugsommar.se. Där listas också stugbyar och campingar med stugor, och bokaoland.se är en bokningsplattform för boende." },
      // KÄLLA: https://www.oland.se/bo — "Under sommaren och vid större evenemang blir många boenden snabbt fullbokade, särskilt i populära områden och under högsäsong. Det är därför bra att vara ute i god tid."
      { q: "Hur långt i förväg ska man boka stuga på Öland?", a: "I god tid. Enligt oland.se blir många boenden snabbt fullbokade på sommaren och vid större evenemang, särskilt under högsäsong." },
      // KÄLLA: https://www.konsumentverket.se/fragor-och-svar/3151162/hyra-stuga-av-privatperson-vad-ska-jag-tanka-pa — "Det är generellt sätt tryggare att hyra av ett företag som förmedlar boende."
      { q: "Är det tryggare att hyra hus på Öland via en förmedlare?", a: "Enligt Konsumentverket är det generellt tryggare att hyra av ett företag som förmedlar boende. Där finns ofta en trygghetsgaranti, och en tvist kan prövas hos ARN." },
      // KÄLLA: https://www.oland.se/bo — "Ja, många boenden håller öppet året runt."
      { q: "Kan man hyra stuga på Öland året runt?", a: "Ja, enligt oland.se har många boenden öppet året runt. Kontrollera säsongen hos varje stugby eller camping." },
    ],
  },
  {
    slug: "hyra-bil-oland",
    title: "Hyra bil Öland – hyrbil i Kalmar, Borgholm och på flygplatsen",
    excerpt: "Hyra bil på Öland: biluthyrning finns på OKQ8 i Borgholm och hyrbil på Kalmar Öland Airport och i Kalmar. Så hämtar du bilen och kör över Ölandsbron.",
    category: "Praktisk", emoji: "🚗", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.okq8.se/hitta-station/borgholm/borgholm-storgatan/ — "OKQ8 - Borgholm Storgatan"; https://www.okq8.se/hitta-station/borgholm/borgholm-storgatan/ — "Biluthyrning"; https://www.oland.se/resa/flyg — "På flygplatsen finns även de större hyrbilsfirmorna representerade."
      { q: "Var kan man hyra bil på Öland?", a: "På Öland har OKQ8:s station på Storgatan i Borgholm biluthyrning. Fler hyrbilsfirmor finns på fastlandet: på Kalmar Öland Airport och i Kalmar, där du hämtar bilen och kör över Ölandsbron." },
      // KÄLLA: https://kalmarolandairport.se/pa-flygplatsen/hyrbil/ — "Hyrbilsföretagen finns representerade i ankomsthallen."; https://kalmarolandairport.se/pa-flygplatsen/hyrbil/ — "Parkeringen för hyrbilar ligger 100 meters gångväg från terminalen och är skyltad från utgången."
      { q: "Finns det hyrbil på Kalmar Öland Airport?", a: "Ja. Avis, Europcar, Hertz och SIXT finns i ankomsthallen. Hyrbilsparkeringen ligger cirka 100 meter från terminalen, och nyckeln lämnas i företagets box i ankomsthallen." },
      // KÄLLA: https://www.okq8.se/hitta-station/borgholm/borgholm-storgatan/ — "Storgatan 77"; https://www.okq8.se/hitta-station/borgholm/borgholm-storgatan/ — "Släputhyrning"
      { q: "Var finns biluthyrning i Borgholm?", a: "OKQ8 på Storgatan 77 i Borgholm har biluthyrning och släputhyrning. Biluthyrningens öppettider står på stationens sida hos OKQ8." },
      // KÄLLA: https://www.okq8.se/hitta-station/farjestaden/farjestaden-algutsrum/ — "På vår station kan du bland annat Tanka, Övriga tjänster."
      { q: "Kan man hyra bil i Färjestaden?", a: "Vi har inte hittat någon biluthyrning i Färjestaden. OKQ8:s station där har tankning men ingen biluthyrning. Närmast finns hyrbilar i Kalmar och på flygplatsen, eller på OKQ8 i Borgholm." },
      // KÄLLA: https://www.oland.se/resa/buss-tag-taxi — "Kalmar Läns Trafik trafikerar med buss i Kalmar och på Öland."; https://www.oland.se/cykla/cykeluthyrning — "De flesta cykeluthyrare ligger i anslutning till busshållplatser."
      { q: "Behöver man hyrbil på Öland?", a: "Det beror på resan. Kalmar Läns Trafik kör buss i Kalmar och på Öland, och på regionbussarna får du ta med cykel i mån av plats. Du kan också hyra cykel på ön." },
      // KÄLLA: https://www.oland.se/alska-oland-varsamt — "Det får man inte, varken i reservaten eller utanför. Här gäller Terrängkörningslagen."
      { q: "Får man köra ut på alvaret eller stranden med bil?", a: "Nej. Terrängkörningslagen gäller, både i reservaten och utanför. Parkera bara på platser som är tydligt markerade som parkeringsplatser." },
    ],
  },
  // KÄLLA: Böda Sand, https://www.bodasand.se/om-oss/ (1350 platser, 125 stugor, 2 mil sandstrand); Ottenby Vandrarhem & Camping, https://ottenbyvandrarhem.se/ ; Länsstyrelsen Kalmar, Bödakustens östra, Trollskogen, Neptuni åkrar (tältförbud) — alla lästa 2026-09-21. Tidigare svar påstod att Böda Sand "är fullt i juli till mitten av juni" och nämnde Kapelludden utan läsbar källa.
  { slug: "camping-oland", title: "Camping på Öland 2026 – från Böda till Ottenby", excerpt: "Böda Sand vid den två mil långa sandstranden, Ottenby nära södra udden – och var du inte får tälta. Med fakta från campingarna och Länsstyrelsen.", category: "Praktisk", emoji: "⛺", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka campingplatser finns på Öland?', a: 'Två vi kunnat belägga hos operatören: Böda Sand på nordöstra Öland, som med 1 350 platser och 125 stugor kallar sig Sveriges största camping, och Ottenby Vandrarhem & Camping, öns sydligaste, sex kilometer från Ölands södra udde.' }, { q: 'Får man tälta fritt på Öland?', a: 'Allemansrätten gäller, men inte fullt ut i naturreservaten. I bland annat Bödakustens östra, Trollskogen och Neptuni åkrar är tält förbjudet, liksom eld. Kolla reservatets föreskrifter hos Länsstyrelsen Kalmar innan du slår upp tältet.' }, { q: 'Var ligger Ölands längsta sandstrand?', a: 'Enligt Länsstyrelsen i naturreservatet Bödakustens östra på nordöstra Öland, mellan Trollskogen och Böda camping. Stranden är badstrand, men tält och eld är förbjudet i reservatet.' }] },
  {
    slug: "mat-oland",
    title: "Restauranger på Öland – mat, gårdsbutiker och Skördefesten",
    excerpt: "Mat på Öland: restauranger i Borgholm, Djupvik, Sandvik och Färjestaden, kroppkakor, gårdsbutiker, fiskaffärer och Skördefesten – kontrollerat i september 2026.",
    category: "Mat", emoji: "🍽", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skordefest.nu/alla-deltagare/lundgrens-garage/ — "Välkommen till vår härliga inne- och uteservering mitt i centrala Borgholm."; https://www.elise.bar/ — "Restaurangen ligger som en välbevarad hemlighet i Djupvik, cirka två mil norr om Borgholm på Öland."; https://sandviksbrygga.se/ — "Mitt i hamnen vid Kalmarsund"; https://olandschoklad.se/olandschoklad/ — "i vårt hamncafé i Färjestaden (södra hamnplan)"; https://www.bodafisk.se/ — "Böda Fisk består av fiskaffär, restaurang och hamngrill med pizza."
      { q: "Vilka restauranger finns på Öland?", a: "Några restauranger vi har kontrollerat på deras egna webbplatser 2026 är Brasseriet Tack o Bock, Hotell Borgholms Matsal och Lundgrens Garage i Borgholm, Elise i Djupvik, Sandviks Brygga i Sandvik, Böda Fisk i Böda hamn och ÖlandsChoklads hamncafé i Färjestaden. oland.se har listor per område och månad." },
      // KÄLLA: https://www.oland.se/kroppkakor — "De görs med råriven och kokt potatis med rimmat fläsk- och lökfyllning, svampfyllning för vegetariskt alternativ och servera med smör, grädde och lingonsylt."; https://www.oland.se/restauranger-sodra-oland — "Ölands landskapsrätt - kroppkakor?"; https://www.oland.se/alla-smaker — "framförallt är Öland känt för sina örter"
      { q: "Vad är typisk mat på Öland?", a: "Kroppkakor är Ölands landskapsrätt. De görs av råriven och kokt potatis med fyllning av rimmat fläsk och lök och serveras med smör, grädde och lingonsylt. Öland är också känt för sina örter, bönor och potatis." },
      // KÄLLA: https://olandschoklad.se/olandschoklad/ — "Öppet året om!"; https://www.hotellborgholm.com/oppetider/ — "1 oktober till 18 oktober Torsdag till Lördag från 18:00"; "26 november till 19 december Julbord"
      { q: "Var kan man äta på Öland på hösten och vintern?", a: "Många krogar har bara sommaröppet. ÖlandsChoklads hamncafé i Färjestaden har öppet året om, och Hotell Borgholms Matsal har enligt hotellets öppettider för 2026 öppet in i oktober och julbord i november–december. Kolla alltid öppettiderna på restaurangens egen sida." },
      // KÄLLA: https://www.oland.se/alla-smaker — "På Öland odlas potatis och många andra grönsaker, stora mängder bönor av både traditionella sorter men också nya."; "framförallt är Öland känt för sina örter"
      { q: "Vad är Öland känt för inom mat?", a: "Enligt Ölands turistorganisation odlas potatis, många andra grönsaker och stora mängder bönor på Öland, och ön är framför allt känd för sina örter. Betesdjuren på strandängarna är också en viktig del av jordbruket." },
      // KÄLLA: https://skordefest.nu/om-skordefesten/ — "Varje höst i slutet av september (vecka 39), bjuder Ölands Skördefest på drygt 900 aktiviteter över hela ön."; https://skordefest.nu/ — "Ölands Skördefest pågår 24-27/9 2026."
      { q: "När är Ölands Skördefest?", a: "Skördefesten hålls varje år i slutet av september, vecka 39. År 2026 pågår den 24–27 september, och invigningen var den 23 september." },
      // KÄLLA: https://www.oland.se/en/smaker/gardsbutik — "Opening hours may vary from daily to only being open a few days a month."
      { q: "Har gårdsbutikerna på Öland öppet varje dag?", a: "Nej, inte alla. Ölands turistorganisation skriver att en del har öppet varje dag och andra bara några dagar i månaden. Kolla med butiken innan du åker." },
    ],
  },
  // Höga Kusten
  // UPPSKATTNING: spann över flera uthyrare på orten, ej hämtat per aktör (2026-09). Sägs ut för läsaren som "enligt vår marknadsöversikt".
  {
    slug: "kajak-hoga-kusten",
    title: "Kajak Höga kusten – hyra kajak, turer och säkerhet",
    excerpt: "Kajak i Höga kusten: var du hyr kajak i Bönhamn, vid Skuleberget och i Lunde, turförslag för kajakpaddling i Höga kusten, dagsdistanser och säkerhetsråd.",
    category: "Aktivitet", emoji: "🛶", readTime: "7 min", fullContent: true, topics: ['kajak'],
    faqs: [
      // KÄLLA: http://www.bonhamnkajak.se/ — "Vi hyr ut kajaker i Bönhamn, Nordingrå."; https://www.hogakusten.com/sv/hoga-kusten-kajakcenter — "Höga Kusten Kajakcenter ligger vid vackra Norrfjärden vid Skuleberget och drivs av FriluftsByn."; https://hogakustenkajak.se/ — "Ramö 124"
      { q: "Var hyr man kajak i Höga kusten?", a: "Bland annat hos Bönhamn Kajak i Nordingrå, Höga Kusten Kajakcenter vid Norrfjärden nedanför Skuleberget (drivs av FriluftsByn) och Höga Kusten Kajak i Lunde. Bönhamn Kajak har begränsade öppettider 2026, så ring innan. Priser och tider finns hos respektive uthyrare." },
      // KÄLLA: https://www.hogakusten.com/sv/runt-norrfjarden — "Tack vare det skyddade läget är turen lättare och passar även dig som inte har så stor erfarenhet."; https://hogakustenkajakcenter.se/hyr-kajak-i-hoga-kusten/ — "Är du helt ny till kajakpaddling så rekommenderar vi vår Kajakkurs"
      { q: "Passar kajakpaddling i Höga kusten för nybörjare?", a: "Ja, på rätt ställe. Höga Kusten Turism beskriver turen runt Norrfjärden som lättare tack vare det skyddade läget, och den passar även den som inte har så stor erfarenhet. Höga Kusten Kajakcenter har kajakkurser för nybörjare från juli till mitten av augusti." },
      // KÄLLA: https://www.hogakusten.com/sv/mjalton-runt — "Mjältön runt är en heldagstur som går runt Sveriges högsta ö."; https://www.hogakusten.com/sv/skeppsmalen-norrfallsviken — "Fortsätt mot Trysunda och övernatta på vandrarhemmet."
      { q: "Vilka kajakturer finns i Höga kusten?", a: "Höga Kusten Turism föreslår bland annat Runt Norrfjärden, Bönhamn–Högbonden, Mjältön runt (en heldagstur runt Sveriges högsta ö) och den längre turen Skeppsmalen–Norrfällsviken via Trysunda och Ulvön." },
      // KÄLLA: https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/paddling — "Lätt: Mindre van paddlare, lätt paddling i lugnt tempo, ca 10-20 km/dag eller 2-4 tim/dag."
      { q: "Hur långt kan man paddla kajak på en dag?", a: "Höga Kusten Turism hänvisar till Friluftsfrämjandets gradering: en mindre van paddlare klarar ungefär 10–20 km per dag, en van paddlare 15–30 km och en säker paddlare 20–40 km." },
      // KÄLLA: https://www.hogakusten.com/en/plan-your-trip/safe-secure/safety-at-sea — "Make sure you check the maritime weather forecast, plan your route, have your mobile phone with you at all times and check that you and everyone with you always wears a lifejacket."
      { q: "Vad ska man tänka på när man paddlar i Höga kusten?", a: "Kolla sjöväderprognosen, till exempel SMHI:s Sjörapporten, ha alltid flytväst, planera så att du är framme innan mörkret, berätta för någon om rutten och ha mobilen i ett vattentätt fodral. Kontakta gärna en lokal uthyrare för aktuella råd." },
    ],
  },
  // KÄLLA: sverigesnationalparker.se, Skuleskogens nationalpark — Slåttdalsberget ca 280 m ö.h., Slåttdalsskrevan 200 m lång och 30 m djup (läst 2026-08-15)
  {
    slug: "vandring-skuleskogen",
    title: "Skuleskogen leder – vandring från Entré Väst, Syd och Nord",
    excerpt: "Skuleskogens leder från Entré Väst, Syd och Nord: sträckor till Slåttdalsskrevan, Kuststigen, stugor, tältregler och hur du hittar till nationalparken.",
    category: "Aktivitet", emoji: "🏔", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/vasternorrland/besoksmal/skuleskogens-nationalpark.html — "Mer än 30 kilometer markerade leder tar dig runt i området"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken — "Kuststigen mellan Entré Syd och Nord är en enklare led som passar för vandring med hund eller mindre barn."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken — "Vandringsleden Höga Kustenleden passerar rakt igenom nationalparken."
      { q: "Vilka leder finns i Skuleskogen?", a: "Nationalparken har mer än 30 kilometer markerade leder från tre entréer. Från Entré Väst går leder till Nylandsruten, Skrattabborrtjärn och Slåttdalsskrevan. Kuststigen mellan Entré Syd och Entré Nord är den enklaste leden. Höga Kustenleden passerar rakt igenom parken." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/att-gora-i-parken/sevardheter/slattdalsberget-med-slattdalsskrevan — "Från Entré Väst är det en vandring på cirka 6 kilometer"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/att-gora-i-parken/sevardheter/slattdalsberget-med-slattdalsskrevan — "Från Entré Syd är det cirka 3,5 kilometer"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/att-gora-i-parken/aktiviteter/langre-vandring-fran-vast — "Svårighet: Krävande"
      { q: "Hur långt är det till Slåttdalsskrevan?", a: "Cirka 3,5 kilometer från Entré Syd, cirka 4,5 kilometer från Entré Nord och cirka 6 kilometer från Entré Väst. Sträckan från Entré Väst klassas som krävande." },
      // KÄLLA: https://www.hogakusten.com/sv/skuleskogens-nationalpark — "Från och med sommaren 2023 är Slåttdalsskrevan stängd för vandrare på grund av säkerhetsrisk."; https://www.hogakusten.com/sv/skuleskogens-nationalpark — "Det finns numer en nybyggd led runt skrevan med fina utsiktsplatser och fotoplatser."
      { q: "Kan man gå genom Slåttdalsskrevan?", a: "Nej. Enligt Höga Kustens turistorganisation är skrevan stängd för vandrare sedan sommaren 2023 på grund av säkerhetsrisk. En nybyggd led går runt skrevan med utsiktsplatser." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken/hitta-hit — "Cirka fem kilometer norr om Skuleberget och naturum Höga Kusten är det skyltat mot Skuleskogens nationalpark, Entré Väst."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken/hitta-hit — "Med linje 50, som endast går på vardagar, kan du åka till hållplats Skuleskogen Entré V E4."; https://www.lansstyrelsen.se/vasternorrland/besoksmal/skuleskogens-nationalpark.html — "Entré Väst snöröjs och är tillgänglig året runt."
      { q: "Hur hittar man till Skuleskogen Entré Väst?", a: "Kör E4 mellan Örnsköldsvik och Härnösand. Cirka fem kilometer norr om Skuleberget är det skyltat mot Entré Väst, tre kilometer upp från E4. Buss 50 går vardagar till hållplatsen Skuleskogen Entré V E4. Entré Väst snöröjs och är öppen året runt." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken/overnatta-i-parken — "I Skuleskogens nationalpark finns det sex övernattningsstugor med enkel standard. De är öppna året runt och går inte att boka."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken/overnatta-i-parken — "Max två nätter per besökare gäller i stugorna."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken/regler-i-parken — "maximalt tre nätter på samma plats under tiden 1 maj–30 september"
      { q: "Får man tälta och sova i stugorna i Skuleskogen?", a: "Ja. Sex övernattningsstugor är öppna året runt, kostar inget och går inte att boka, och du får stanna högst två nätter. Mellan 1 maj och 30 september får du bara tälta på anvisade platser och högst tre nätter på samma plats." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/att-gora-i-parken/sevardheter/naturum-hoga-kusten — "Det är cirka en mil från nationalparkernas entréer Syd och Väst."; https://www.lansstyrelsen.se/vasternorrland/besoksmal/naturreservat/skuleberget.html — "Den runda grottan på bergets östra sida har under lång tid utgjort bergets främsta attraktion."
      { q: "Finns det en ravin på Skuleberget?", a: "Skrevan många söker efter, Slåttdalsskrevan, ligger i Skuleskogens nationalpark, cirka en mil från naturum vid Skuleberget. På Skuleberget finns i stället Kungsgrottan på bergets östra sida." },
    ],
  },
  { slug: "barnfamilj-hoga-kusten", title: "Höga Kusten med barnfamilj – klippor, bad och naturäventyr", excerpt: "Höga Kusten med barn är en naturupplevelse utöver det vanliga. Guide till barnvänliga aktiviteter, badplatser och boende längs Höga Kusten.", category: "Praktisk", emoji: "👦", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vad passar barn att göra i Höga Kusten?', a: 'Bada vid Barstabadet (sandstrand), utforska Skuleskogen med guidning, besök Nordingrå kyrka och Rotsidan naturreservat. Höga Kustenleden på lättare sträckor fungerar för äldre barn.' }, { q: 'Hur tar man sig till Höga Kusten med familj?', a: 'Bil via E4 är smidigast – parkera vid Skuleskogen infartsparkeringen. Tåg till Kramfors och sedan buss/taxi fungerar men är krångligare med barnvagn och packad bil.' }] },
  {
    slug: "camping-hoga-kusten",
    title: "Camping Höga kusten – bästa campingplatser vid havet och regler",
    excerpt: "Camping Höga kusten: campingplatser vid havet från Härnösand till Örnsköldsvik, vad som skiljer dem åt, camping i Bönhamn och regler för tält i Skuleskogen.",
    category: "Praktisk", emoji: "⛺", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.hogakusten.com/sv/boende/havsnara-campingar — "Här nedan har vi listat havsnära campingar och ställplatser."
      { q: "Vilka campingar ligger vid havet i Höga Kusten?", a: "Bland annat Camping Sälsten i Härnösand, Hörsångs Camping & Havsbad, Barsta Camping i Nordingrå, Måvikens Camping, Norrfällsvikens Camping & Stugby, Skuleberget Havscamping och Gullviks Havsbad utanför Örnsköldsvik. Höga Kustens turistorganisation har en lista över havsnära campingar." },
      // KÄLLA: https://www.maviken.com/ — "VI HAR DROP-IN PÅ SAMTLIGA CAMPINGPLATSER"; https://www.gullvikshavsbad.se/camping — "Avsluta dagen med ett dopp i vår uppvärmda pool eller en simtur i havet."; https://www.norrfallsvikenscamping.com/innehall.htm — "Våra fina husvagnsplatser nere vid havet är bokningsbara och vår vedeldade bastu finns öppen."; https://www.campingsalsten.se/ — "Ställplats med el utan tillgång till servicehus"
      { q: "Vilken är bästa campingen i Höga kusten?", a: "Det finns ingen officiell rangordning. Det beror på vad du vill ha: Måvikens Camping har drop-in och betalautomat året runt, Gullviks Havsbad har uppvärmd pool och sandstrand, Norrfällsviken har husvagnsplatser nere vid havet och vedeldad bastu, och Camping Sälsten har ställplatser med el även på vintern." },
      // KÄLLA: https://bonhamn.se/var-gasthamn/ — "Service öppet från juni till slutet av augusti."; https://www.svenskagasthamnar.se/bottenhavet/bonhamn/ — "10 st/ 300 m"; https://www.barstacamping.com/ — "Barsta hamn är ett litet fiskeläge i Nordingrå socken"
      { q: "Finns det camping i Bönhamn?", a: "Nej, vi har inte hittat någon campingplats i Bönhamn. Bönhamn är ett fiskeläge med gästhamn för båtar, där hamnföreningens servicehus har öppet från juni till slutet av augusti. Svenska Gästhamnar anger tio ställplatser cirka 300 meter från hamnen, men det har vi inte kunnat bekräfta hos hamnföreningen, så fråga dem först. Barsta Camping ligger också i Nordingrå." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken/regler-i-parken/ — "tälta på andra ställen än anvisade platser och maximalt tre nätter på samma plats under tiden 1 maj–30 september"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken/overnatta-i-parken/ — "Max två nätter per besökare gäller i stugorna."
      { q: "Får man tälta i Skuleskogens nationalpark?", a: "Ja, men 1 maj–30 september bara på anvisade platser och högst tre nätter på samma plats. Tältplatserna ligger vid övernattningsstugorna, vid Kälsvikens stränder och vid Salsvikens utlopp. Stugorna är gratis, går inte att boka och du får sova där högst två nätter." },
      // KÄLLA: https://www.hogakusten.com/sv/hogakustenleden — "Höga Kusten-ledens 9 etapper är gjorda så att det inom varje etapp finns minst en möjlighet till övernattning under tak"
      { q: "Hur lång är Höga Kusten-leden och var sover man?", a: "Leden är 135 km lång och har nio etapper, från Hornöberget till Örnsköldsvik. På varje etapp finns minst ett ställe att sova under tak, från raststuga till vandrarhem och hotell." },
    ],
  },
  // Bohuslän transaktionella
  {
    slug: "hyra-bat-goteborg",
    title: "Hyra båt i Göteborg – motorbåt, segelbåt, roddbåt och charter",
    excerpt: "Hyra båt i Göteborg: elbåt vid Lilla Bommen, roddbåt i Delsjön, båtcharter med Strömma eller Styrsöbolaget och motor- och segelbåtar via marknadsplats.",
    category: "Praktisk", emoji: "⛵", readTime: "7 min", fullContent: true, topics: ['hyra-bat'],
    faqs: [
      // KÄLLA: https://letsboat.se/ — "Upplev Göteborg från vattnet i en elbåt du styr själv!"
      { q: "Var kan man hyra båt i Göteborg?", a: "Vid vår genomgång 2026-09-26: självkörda elbåtar hos Let's Boat vid Lilla Bommen, roddbåtar hos Sportfiskarna i Stora Delsjön, båtcharter med besättning hos Styrsöbolaget, Strömma och Börjessons, samt motor- och segelbåtar från privatpersoner och företag via marknadsplatsen Ship O'Hoi." },
      // KÄLLA: https://www.ship-ohoi.com/sv/hyra/baat/plats/goteborg — "Göteborg · Daycruiser"
      { q: "Kan man hyra motorbåt i Göteborg?", a: "En uthyrningsfirma med egna motorbåtar att köra själv hittade vi inte. På marknadsplatsen Ship O'Hoi fanns vid vår läsning 2026-09-26 RIB-båtar och daycruisers i Göteborg, en del med kapten. BohusCharter förmedlar större motoryachter med hemmahamn i Långedrag och Eriksberg, med pris på offert." },
      // KÄLLA: https://letsboat.se/ — "Ni behöver ingen licens eller körkort för att hyra hos oss på Let´s Boat"
      { q: "Kan man hyra båt utan körkort i Göteborg?", a: "Ja. Let's Boat hyr ut självkörda elbåtar vid Lilla Bommen utan krav på licens eller körkort. Den som hyr måste vara 18 år. Enligt Transportstyrelsen krävs inget körkort för fritidsbåtar under 12 × 4 meter." },
      // KÄLLA: https://www.ship-ohoi.com/sv/hyra/baat/plats/goteborg — "Göteborg · Segelbåt · Med kapten"
      { q: "Kan man hyra segelbåt i Göteborg?", a: "Ja, via marknadsplatsen Ship O'Hoi fanns vid vår läsning segelbåtar i Göteborg, både att segla själv och med kapten. Villkoren sätts av respektive uthyrare." },
      // KÄLLA: https://www.sportfiskarna.se/fiske/fiskevatten/fiske-i-goteborg/hyr-roddbat-i-delsjon/ — "Eftersom Stora Delsjön är en vattentäkt är inte bensinmotor tillåten, men om du har egen elmotor går det bra att använda den."
      { q: "Var kan man hyra roddbåt i Göteborg?", a: "Sportfiskarna hyr ut roddbåtar vid sitt regionkontor vid Stora Delsjön. Båten bokas via iFiske.se. Bensinmotor är inte tillåten eftersom sjön är en vattentäkt, men egen elmotor går bra." },
      // KÄLLA: https://styrsobolaget.se/hyr-en-egen-bat-och-kryssa-vart-du-vill-i-goteborgs-sodra-skargard/ — "Fartyget hyrs ut i minst 3 timmar och ni kan välja att anordna ert evenemang vilken tid som helst på dygnet."
      { q: "Var bokar man båtcharter i Göteborg?", a: "Styrsöbolaget hyr ut M/S Kungsö för beställningsturer i minst tre timmar. Strömma hyr ut bland annat M/S S:t Erik för 30–296 personer, och Börjessons Charterbåtar har två passagerarfartyg för charter." },
      // KÄLLA: https://styrsobolaget.se/kollektivtrafik-till-sjoss-med-vasttrafik/ — "Spårvagnslinje 11 kör hela året till Saltholmen."
      { q: "Hur tar man sig ut i Göteborgs skärgård utan egen båt?", a: "Styrsöbolaget kör fyra linjer i södra skärgården på uppdrag av Västtrafik, i huvudsak från Saltholmen. Spårvagnslinje 11 går året runt till Saltholmen." },
    ],
  },
  {
    slug: "hyra-bat-marstrand",
    title: "Hyra båt Marstrand – båtuthyrning, Uddevalla och Ljungskile",
    excerpt: "Hyra båt i Marstrand: motorbåt, segelbåt och kajak. Vi går igenom kraven, tar oss till Koön och visar var du kan hyra båt i Uddevalla och Ljungskile.",
    category: "Praktisk", emoji: "⛵", readTime: "6 min", fullContent: true, topics: ['hyra-bat'],
    faqs: [
      // KÄLLA: https://www.swedecharter.com/batuthyrning-marstrand — "Vi erbjuder fullutrustade båtar i flera olika storlekar att hyra per dag eller veckovis ut från Marstrand."; https://www.goteborg.com/platser/marstrandskajaker — "Kajakuthyrningen Marstrandskajaker ligger i gästhamnen på Koön"
      { q: "Var kan man hyra båt i Marstrand?", a: "Swede Charter i Marstrand hyr ut motorbåtar och segelbåtar per dag eller vecka och har också båtar med skeppare. Kajak och SUP hyr du hos Marstrandskajaker i gästhamnen på Koön. Kontakta uthyrarna direkt för lediga båtar och priser." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ — "Det finns idag inga krav på körkort om du har ett fritidsfartyg/en fritidsbåt som är kortare än tolv meter och smalare än fyra meter."; https://www.swedecharter.com/batuthyrning-marstrand — "För alla båtar exklusive Whaly 440 Exclusive och Whaly 440 Classic ställer vi även krav på minst förarintyg."
      { q: "Behöver man båtkörkort för att hyra båt i Marstrand?", a: "Lagen kräver inget körkort för fritidsbåtar som är kortare än tolv meter och smalare än fyra meter, men uthyraren får ställa egna krav. Swede Charter kräver att du har fyllt 18 år, och för alla båtar utom Whaly 440 kräver de minst förarintyg." },
      // KÄLLA: https://hafsten.se/aktiviteter/batuthyrning — "Utforska Havstensfjorden med kanot, dubbelkajak eller varför inte med en trampbåt?"; https://upplevelsebolaget.com/sv/kajakuthyrning/ — "Paddla direkt från vårt center på Gustafsberg vid Byfjordens södra strand"
      { q: "Kan man hyra båt i Uddevalla?", a: "Hafsten Resort & Camping i Uddevalla hyr ut kanoter, dubbelkajaker, trampbåtar och roddbåtar vid Havstensfjorden, och Upplevelsebolaget hyr ut kajaker från Gustafsberg. Någon uthyrning av motorbåtar i centrala Uddevalla har vi inte hittat." },
      // KÄLLA: https://anfasterod.se/aktiviteter/havet/ — "Vi hyr ut ekor av varierande storlek med aktersnurra och sjökort. Flytväst ingår så klart!"
      { q: "Kan man hyra båt i Ljungskile?", a: "Ja. Anfasteröd Gårdsvik vid Ljungskileviken hyr ut ekor med aktersnurra och sjökort, och flytväst ingår. De hyr också ut kajaker och kanadensare." },
      // KÄLLA: https://www.marstrandskajaker.se/sv/uthyrning/ — "I hyran ingår kajak, flytväst, paddel, kapell och sjökort."; https://www.marstrandskajaker.se/sv/uthyrning/ — "Höst, vinter och vår: efter bokning och överenskommelse"
      { q: "Kan man hyra kajak i Marstrand?", a: "Ja. Marstrandskajaker hyr ut kajaker och SUP-brädor. I hyran ingår kajak, flytväst, paddel, kapell och sjökort. Utanför sommaren hyr de ut efter bokning och överenskommelse." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "hyra-kajak-bohuslan",
    title: "Hyra kajak i Bohuslän – kajakuthyrning och kanot på västkusten",
    excerpt: "Kajak i Bohuslän: kajakuthyrning i Marstrand, på Tjörn, vid Smögen och i Grebbestad, var du hyr kanot, vad som ingår och vad uthyrarna kräver av dig.",
    category: "Aktivitet", emoji: "🛶", readTime: "7 min", fullContent: true, topics: ['kajak'],
    faqs: [
      // KÄLLA: http://www.marstrandskajaker.se/ — "Marstrandskajaker har tillverkat, sålt och hyrt ut kajaker sedan 1979."; https://kajaktivtjorn.se/sv/ — "Här hittar ni olika förslag på paddlingsvägar när ni hyr hos oss."; https://smogenskajakaventyr.se/ — "Adress: Dinglevägen 61D i Väjern"; https://www.nautopp.com/hyra-kajak-bohuslan — "Hyra kajak i Grebbestad - Äventyret börjar vid bryggan, 0 meter från havet."
      { q: "Var kan man hyra kajak i Bohuslän?", a: "Bland annat hos Marstrandskajaker i Marstrand, Kajaktiv Tjörn i Bleket och ArcAdventure i Myggenäs på Tjörn, Anfasteröd Gårdsvik i Ljungskile, Smögens KajakÄventyr i Väjern, Ramsvik Stugby & Camping på Sotenäs och Nautopp Kajakcenter i Grebbestad. Priser och lediga tider står på uthyrarnas egna sidor." },
      // KÄLLA: https://anfasterod.se/aktiviteter/havet/ — "Vi har enmanskajaker, dubbelkajaker och kanadensare i olika storlekar till uthyrning, med eller utan guide."; https://www.ramsvik.nu/aktiviteter/outdoor/kajakpaddling-pa-ramsvik/ — "Vi har några havskajaker och kanoter (kanadensare) till uthyrning. Paddlar och flytvästar ingår."
      { q: "Kan man hyra kanot och paddla kanot i Bohuslän?", a: "Ja. Anfasteröd Gårdsvik i Ljungskile hyr ut kanadensare i olika storlekar, med eller utan guide, och Ramsvik Stugby & Camping på Sotenäs har några kanadensare att hyra. Båda ligger vid havet." },
      // KÄLLA: http://www.marstrandskajaker.se/sv/uthyrning/ — "I hyran ingår kajak, flytväst, paddel, kapell och sjökort."; https://smogenskajakaventyr.se/uthyrning/ — "I uthyrningspriset för kajak ingår: kajak, paddel, sittbrunnskapell, flytväst, sjökort, svamp att torka ur kajaken med & pump."
      { q: "Vad ingår när man hyr kajak på västkusten?", a: "Det varierar. Hos Marstrandskajaker ingår kajak, flytväst, paddel, kapell och sjökort. Hos Smögens KajakÄventyr ingår kajak, paddel, sittbrunnskapell, flytväst, sjökort, svamp och pump." },
      // KÄLLA: http://www.marstrandskajaker.se/sv/uthyrning/ — "Simkunnighet ser vi som en självklarhet."; http://www.marstrandskajaker.se/sv/uthyrning/ — "Allmän färdbeskrivning skall alltid lämnas till Marstrandskajaker."; https://smogenskajakaventyr.se/uthyrning/ — "För att hyra på egen hand behöver ni kunskap om kamraträddning samt erfarenhet av att paddla i havsmiljö."
      { q: "Behöver man erfarenhet för att hyra kajak i Bohuslän?", a: "Det beror på uthyraren. Marstrandskajaker förutsätter att du kan simma och vill ha en färdbeskrivning. För självservicen hos Smögens KajakÄventyr behöver du kunna kamraträddning och ha paddlat på havet; nybörjare rekommenderas en guidad tur." },
      // KÄLLA: https://www.vastsverige.com/bohuslan/naturupplevelser/paddla/paddla-kajak/ — "Bohuslän erbjuder ett pärlband med smidiga startplatser och längs hela kusten finns flera kajakföretag som erbjuder allt från guidade turer till uthyrning och kurser."; https://www.vastsverige.com/kosterhavets-nationalpark/aktiviteter-i-kosterhavet/kajak-i-kosterhavet/ — "Här i norra Bohuslän kan du paddla kajak i genuin skärgård, från Grebbestad i söder till Strömstad i norr."
      { q: "Var kan man paddla kajak i Bohuslän?", a: "Längs hela kusten finns startplatser och kajakföretag. I norra Bohuslän kan du paddla från Grebbestad till Strömstad. Leder och regler finns i vår guide till kajakpaddling i Bohuslän." },
    ],
  },
  { slug: "segelkurs-goteborg", title: "Segelkurs Göteborg – skolor, kurser och kustskepparexamen", excerpt: "Göteborg är en av Sveriges bästa städer att lära sig segla. Guide till segelskolor, kurstyper och vad en segelkurs i Göteborg kostar 2026.", category: "Aktivitet", emoji: "⛵", readTime: "7 min", fullContent: true, topics: ['segelkurs'], faqs: [{ q: 'Vilka segelskolor finns i Göteborg?', a: 'GKSS (Göteborgs Kungliga Segel Sällskap), Seglarskolan Göteborg och privata aktörer erbjuder kurser från maj–september. Kustskepparexamen är väl etablerad i Göteborg.' }, { q: 'Vad kostar segelkurs i Göteborg?', // KÄLLA: gkss.se vuxenkurser 2026 (Långedrag/Marstrand 5 100–6 600 kr), sngruppen.se (kustskeppare från 2 995 kr, distans) — avlästa 2026-08-11
      a: 'Nybörjarkurs hos GKSS (Långedrag eller Marstrand): 5 100–6 600 kr. Kustskepparintygskurs: från 2 995 kr plus litteratur, kan läsas på distans. Bohuslän är ett idealiskt kustskepparvatten med sin archipelag-karaktär.' }] },
  { slug: "teambuilding-goteborg-skargard", title: "Teambuilding Göteborg skärgård – aktiviteter och arrangörer", excerpt: "Göteborgs sydskärgård och Bohuslän erbjuder utmärkta förutsättningar för teambuilding. Guide till aktiviteter, arrangörer och paket 2026.", category: "Aktivitet", emoji: "🤝", readTime: "7 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka teambuilding-aktiviteter finns nära Göteborg?', a: 'Sydskärgårdens öar (Styrsö, Brännö, Asperö) erbjuder seglatur, kajakpaddling och havsfiske. Marstrand och Tjörn har specialiserade teamevent-arrangörer med hela paket.' }, { q: 'Hur tar sig en grupp ut i skärgården från Göteborg?', a: 'Västtrafik-färja från Saltholmen till Styrsö (ca 30 min). Charterbåt för grupper bokas hos lokala operatörer – de hämtar gruppen vid valfri kaj i Göteborg.' }] },
  {
    slug: "aw-pa-bat-goteborg",
    title: "AW på båt i Göteborg – båtcharter, elbåtar och AW-turer",
    excerpt: "Båtcharter i Göteborg för AW: båtar med besättning för 8–273 personer, elbåtar utan körkort från Lilla Bommen och båtar ut i Göteborgs skärgård.",
    category: "Aktivitet", emoji: "🥂", readTime: "4 min", fullContent: true, topics: ['teambuilding'],
    faqs: [
      // KÄLLA: https://borjessons.se/ — "Start från kaj i Göteborg som passar er"; https://eyc.nu/ — "Vi hämtar er från centrala Göteborg, Malmö eller Köpenhamn och tar emot upp till 48 personer per tur."; https://www.stromma.com/sv-se/goteborg/grupper-foretag/flotta/vara-fartyg/ — "Våra fartyg i Göteborgs skärgård har plats för sällskap från 48 personer upp till cirka 260 personer."; https://styrsobolaget.se/hyr-en-egen-bat-och-kryssa-vart-du-vill-i-goteborgs-sodra-skargard/ — "Fartyget hyrs ut i minst 3 timmar"
      { q: "Var hittar man båtcharter i Göteborg?", a: "Styrsöbolaget hyr ut M/S Kungsö, Börjessons Charterbåtar har två båtar, Strömma hyr ut skärgårdsfartyg och Partypaddan, och Event Yacht Charter kör RIB och motoryachter. Börjessons startar från den kaj i Göteborg som passar gruppen, och Event Yacht Charter hämtar i centrala Göteborg." },
      // KÄLLA: https://styrsobolaget.se/hyr-en-egen-bat-och-kryssa-vart-du-vill-i-goteborgs-sodra-skargard/ — "Max antal passagerare: 273 (inomskärstrafik)"; https://borjessons.se/ — "P/F Lyrön – Vår största båt tar upp till 148 personer (80 sittande vid bord)."; https://www.stromma.com/sv-se/goteborg/grupper-foretag/flotta/vara-fartyg/partypaddan/ — "Maxkapacitet: 65 pers."; https://www.goteborg.com/platser/event-yacht-charter — "turer för grupper på 8–48 personer"
      { q: "Vilka båtar kan man hyra för AW i Göteborg?", a: "Styrsöbolaget hyr ut M/S Kungsö (upp till 273 passagerare) i minst tre timmar. Börjessons Charterbåtar har två båtar för upp till 148 respektive 73 personer, och Strömma hyr ut Partypaddan för högst 65 personer. Event Yacht Charter kör RIB och motoryachter för grupper på 8–48 personer." },
      // KÄLLA: https://www.stromma.com/sv-se/goteborg/grupper-foretag/flotta/vara-fartyg/partypaddan/ — "Inget utskänkningstillstånd, egen mat och dryck får medtagas (vid charter)."; https://letsboat.se/bokningsvillkor/ — "Det är förbjudet att köra elbåten under påverkan av alkohol och/eller droger."; https://styrsobolaget.se/hyr-en-egen-bat-och-kryssa-vart-du-vill-i-goteborgs-sodra-skargard/ — "Serveringstillstånd finns ombord."
      { q: "Får man ta med egen dryck på AW-båten?", a: "Det beror på båten. Partypaddan saknar utskänkningstillstånd, och vid charter får ni ta med egen mat och dryck. På Let's Boats elbåtar får ni ta med dryck, även alkohol, men den som kör får inte vara påverkad. M/S Kungsö har serveringstillstånd ombord." },
      // KÄLLA: https://letsboat.se/ — "Ni behöver ingen licens eller körkort för att hyra hos oss på Let´s Boat"; https://letsboat.se/ — "Ni kan vara så många som upp till 12 personer samtidigt."
      { q: "Behöver man båtkörkort för att hyra båt till AW i Göteborg?", a: "Nej, inte hos Let's Boat, som hyr ut elbåtar för upp till 12 personer från Lilla Bommen. På charterbåtarna kör rederiets egen besättning." },
      // KÄLLA: https://styrsobolaget.se/hyr-en-egen-bat-och-kryssa-vart-du-vill-i-goteborgs-sodra-skargard/ — "Fartyget hyrs ut i minst 3 timmar och ni kan välja att anordna ert evenemang vilken tid som helst på dygnet."; https://borjessons.se/ — "Cirka 3 timmar lång – kan anpassas med stopp på öar, guidning & restaurangbesök"
      { q: "Hur lång är en båtcharter i Göteborg?", a: "Styrsöbolaget hyr ut M/S Kungsö i minst tre timmar, vid vilken tid på dygnet som helst. Börjessons skärgårdskryssning är cirka tre timmar och kan förlängas med stopp på öar, guidning eller restaurangbesök." },
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "Båtarna avgår som regel en gång i timmen till de större öarna Asperö, Brännö, Köpstadsö, Styrsö, Donsö och Vrångö."; https://www.goteborg.com/guider/ta-dig-till-skargarden — "Under sommaren trafikerar M/S Kungsö rutten från Stenpiren i centrala Göteborg direkt till Hönö Klåva"
      { q: "Hur åker man båt i Göteborgs skärgård utan att chartra?", a: "Med Styrsöbolagets reguljära båtar. Öarna i södra skärgården är bilfria, och båtarna går som regel en gång i timmen till de större öarna Asperö, Brännö, Köpstadsö, Styrsö, Donsö och Vrångö. På sommaren går M/S Kungsö dessutom från Stenpiren direkt till Hönö Klåva." },
    ],
  },
  {
    slug: "konferens-bohuslan",
    title: "Konferens i Bohuslän – konferens vid havet på västkusten",
    excerpt: "Konferens i Bohuslän vid havet: konferensanläggningar på västkusten från Stenungsund till Grebbestad, kontrollerade på egna sidor, och tips för aktiviteter.",
    category: "Praktisk", emoji: "🏢", readTime: "5 min", fullContent: true, topics: ['teambuilding'],
    faqs: [
      // KÄLLA: https://www.hafsten.se/konferens/ — "precis vid havet och nära Uddevalla"; https://strandflickorna.com/konferenser/ — "I över 30 år har vi välkomnat konferensgäster till vår inspirerande miljö vid havet i Lysekil."; https://www.vann.se/ — "mitt i ett naturreservat vid Gullmarsfjorden i Bohuslän på Västkusten"
      { q: "Vilka konferensanläggningar finns i Bohuslän?", a: "Några exempel vid havet är Hafsten Resort nära Uddevalla, Pater Noster på Hamneskär, Smögens Hafvsbad, Stenungsbaden Yacht Club, Strandflickorna i Lysekil, TanumStrand i Grebbestad och Vann vid Gullmarsfjorden. Västsverige.com listar fler." },
      // KÄLLA: https://www.smogenshafvsbad.se/konferens/ — "Vår största konferenslokal ”Hållö” platsar upp till 2oo pers."; https://www.smogenshafvsbad.se/konferens/ — "Vår minsta konferenslokal ”Soten” platsar upp till 25 pers."; https://www.hafsten.se/konferens/ — "konferera i lokaler med havsutsikt"
      { q: "Var kan man ha konferens vid havet på västkusten?", a: "Till exempel på Smögens Hafvsbad, där lokalerna rymmer från 25 upp till 200 personer, eller på Hafsten, som har konferenslokaler med havsutsikt och boende i stugor." },
      // KÄLLA: https://www.stenungsbaden.se/konferens/ — "ett saltstänkt spahotell vid havet, bara en kort resa från Göteborg"; https://www.vann.se/ — "en timmes bilresa norrut från Göteborg"
      { q: "Finns det konferens i Bohuslän nära Göteborg?", a: "Ja. Stenungsbaden Yacht Club i Stenungsund beskriver sig som ett spahotell vid havet en kort resa från Göteborg, och Vann vid Gullmarsfjorden anger en timmes bilresa från Göteborg." },
      // KÄLLA: https://www.hafsten.se/konferens/ — "I alla paket ingår konferenslokal, fika och lunch."
      { q: "Vad kostar konferens i Bohuslän?", a: "Det varierar mellan anläggningarna och med paketen, så begär offert direkt. Hos Hafsten ingår till exempel konferenslokal, fika och lunch i alla paket." },
      // KÄLLA: https://paternoster.se/ — "internationellt prisbelönat hotell med 9 rum"; https://paternoster.se/ — "reservera hela hotellet för ert sällskap"
      { q: "Kan man hyra en hel anläggning för konferens vid havet?", a: "Ja, till exempel fyrhotellet Pater Noster på Hamneskär, som har nio rum och där hela hotellet kan reserveras för ett sällskap." },
    ],
  },
  // Gotland
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "flyga-till-gotland", title: "Flyga till Gotland – guide till flyg vs färja", excerpt: "Flyg eller färja till Gotland? Guide till flygbolag, flygtider, priser och när det lönar sig att flyga istället för att ta färjan.", category: "Transport", emoji: "✈️", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka flygbolag flyger till Gotland?', a: 'BRA (Braathens) och SAS flyger från Arlanda till Visby – ca 45 min flygtid. BRA flyger även från Göteborg och Malmö. Flyg är snabbare men dyrare och passar sällan familjer med bil.' }, { q: 'Vad är skillnaden mellan flyg och färja till Gotland?', a: 'Flyg: 45 min, inget fordon, ca 600–1 500 kr enkel. Färja: Destination Gotland från Nynäshamn (3 h) eller Oskarshamn (3,5 h), kan ta med bil, 800–2 500 kr beroende på säsong.' }] },
  { slug: "hyra-bil-gotland", title: "Hyra bil Gotland – guide till biluthyrning i Visby 2026", excerpt: "Bil är det bästa sättet att uppleva Gotland utanför Visby. Guide till biluthyrning på Gotland, priser 2026 och var du hämtar bilen.", category: "Praktisk", emoji: "🚗", readTime: "5 min", fullContent: true, faqs: [{ q: 'Var hyr man bil på Gotland?', a: 'Hertz, Europcar och lokala bolag finns vid Visby hamn och flygplats. Pris: ca 500–1 200 kr/dag i sommar. Boka månader i förväg – juli är ofta fullt bokat.' }, { q: 'Behöver man hyra bil på Gotland?', a: 'Beror på. Visby centrum är lätt att gå. Men norra Gotland (Fårö, Slite, raukar) och södra (Hoburgen, Burgsvik) kräver bil eller cykel. Elcyklar är populärt alternativ.' }] },
  // Blekinge
  {
    slug: "blekinge-skargard-guide",
    title: "Ö utanför Karlskrona – öarna i Blekinge skärgård och färjorna",
    excerpt: "Öar utanför Karlskrona och vilka som nås med färja i Blekinge: gratis vägfärja till Aspö, båt till Hasslö och östra skärgården, och båten till Hanö.",
    category: "Region", emoji: "⚓", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Resan med vägfärjan är avgiftsfri."; https://www.blekingetrafiken.se/reseinformation/skargardstrafik/ — "Från Handelshamnen finns båtpendel året runt till Hasslö, Sturkö och Trummenäs."; https://www.blekingetrafiken.se/reseinformation/skargardstrafik/ — "Mellan Nogersund och Hanö finns skärgårdstrafik året runt."
      { q: "Vilka öar nås med färja i Blekinge?", a: "Aspö nås med Trafikverkets avgiftsfria vägfärja från Karlskrona. Hasslö, Sturkö och Trummenäs har båtpendel året runt från Handelshamnen, östra skärgården (bland annat Stenshamn, Ungskär och Långören) har skärgårdsbåt, och Hanö nås med M/F Vitaskär från Nogersund året runt." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Aspöleden går mellan Karlskrona och Aspö i Karlskrona skärgård. Färjeledens längd är 6700 meter och överfartstiden är cirka 25 minuter. Resan med vägfärjan är avgiftsfri."
      { q: "Vilken ö utanför Karlskrona når man med gratis färja?", a: "Aspö. Vägfärjan på Aspöleden går från Handelshamnen, överfarten tar cirka 25 minuter och resan är avgiftsfri. Tidtabellen finns hos Trafikverket och i appen Trafikinfo Färjerederiet." },
      // KÄLLA: https://www.visitblekinge.se/en/karlskrona/sturko — "Accessible by road bridge – no ferry needed"; https://www.visitkarlskrona.se/sv/tjuko-stenhuggaron — "då ön har broförbindelse"; https://www.visitkarlskrona.se/sv/senoren-ta-med-familjen-ut-pa-promenadtrim — "Ön har broförbindelse med fastlandet."
      { q: "Vilka öar utanför Karlskrona har bro?", a: "Sturkö, Tjurkö och Senoren nås med bil eller buss över bro. Sturkö är Blekinges största ö och ligger 15 kilometer sydost om Karlskrona." },
      // KÄLLA: https://www.blekingetrafiken.se/reseinformation/skargardstrafik/ — "Från Fisktorget börjar säsongen i maj och sträcker sig hela vägen till slutet av september."; https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlskrona/ — "Du köper din biljett när du går ombord och betalar med Swish eller betalkort."
      { q: "Var hittar man tidtabellen för skärgårdsbåtarna i Karlskrona?", a: "På Blekingetrafikens sida om Karlskrona skärgård, per linje. Sommarbåtarna från Fisktorget går från maj till slutet av september, och båtpendeln från Handelshamnen går året runt. Biljett på sommarbåtarna köps ombord med Swish eller betalkort." },
      // KÄLLA: https://www.blekingetrafiken.se/reseinformation/skargardstrafik/ — "Gå ombord på M/F Vitaskär i Nogersund och 25 minuter senare befinner du dig på sköna Hanö."; https://www.blekingetrafiken.se/reseinformation/skargardstrafik/solvesborg/ — "Under sommaren, när biljettkiosken i Nogersund är öppen, köper du alltid din biljett där före avgång."
      { q: "Hur tar man sig till Hanö?", a: "Med M/F Vitaskär från Nogersund i Sölvesborgs kommun. Båten går året runt och resan tar 25 minuter. På sommaren köper du biljett i kiosken i Nogersund före avgång." },
      // KÄLLA: https://unesco.se/vetenskap/biosfaromraden/sveriges-biosfaromraden/biosfaromrade-blekinge-arkipelag/ — "I juni 2011 utsåg Unesco Blekinge Arkipelag som biosfärområde."; https://www.karlskrona.se/kommun-och-politik/hallbara-karlskrona/ekologisk-hallbarhet2/biosfaromrade-blekinge-arkipelag/ — "Här finns världsarvet örlogsstaden"
      { q: "Är Blekinge skärgård ett Unesco-område?", a: "Ja. Unesco utsåg Blekinge Arkipelag till biosfärområde i juni 2011. Det omfattar större delen av skärgården och kusten i Karlskrona, Ronneby och Karlshamn. I Karlskrona finns dessutom världsarvet Örlogsstaden." },
    ],
  },
  // Stockholm nya öar
  // KÄLLA: Länsstyrelsen Stockholm, Nackareservatet i Nacka — 754 ha varav 104 ha vatten (läst 2026-09-14). Stod "Nacka naturreservat (400 ha)".
  { slug: "nacka-skargard-guide", title: "Nacka skärgård – naturreservat och paddling nära Stockholm", excerpt: "Nacka skärgård är Stockholms närmaste vildmark. Naturreservat, kajak, vandring och bad bara 20 minuter från city. Guide till Nacka.", category: "Region", emoji: "🌿", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Nacka skärgård från Stockholm?', a: 'Buss från Slussen eller Sickla direkt till Nacka (10–20 min). Eller med Saltsjöbanan till Igelboda + 20 min promenad. Kajak direkt från Nacka Strand.' }, { q: 'Vad finns att göra i Nacka skärgård?', a: 'Vandring i Nackareservatet (754 ha), kajak längs Baggensfjärden, bad vid Järlasjön och Erstaviksbadet, och MTB-leder. Allt nära Stockholm utan att behöva ta färja.' }] },
  {
    slug: "svartloga-guide",
    title: "Svartlöga – butik, båt och karta över ön i norra skärgården",
    excerpt: "Svartlöga saknar butik men har en sommarkiosk. Här är båten till Svartlöga med linje 26 och 28, beställningsbryggan, en karta i ord och vad som finns på ön.",
    category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/ytterskargarden/svartloga — "Här finns ingen affär, servering eller tillfälligt boende."; https://www.norrtalje.se/globalassets/kultur-och-fritid/riksintressen/svartloga---rodloga.pdf — "På Svartlöga ligger ett före detta posthus som idag tjänar som kiosk under sommarmånaderna."; https://www.norrtalje.se/globalassets/kultur-och-fritid/riksintressen/svartloga---rodloga.pdf — "På Rödlöga finns en handelsbod som har öppet under sommarhalvåret."
      { q: "Finns det en butik på Svartlöga?", a: "Nej, det finns ingen affär, servering eller tillfälligt boende på Svartlöga. Det före detta posthuset används som kiosk under sommarmånaderna, och på grannön Rödlöga finns en handelsbod som har öppet under sommarhalvåret." },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — "26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA"; https://kund.printhuset-sthlm.se/wa/h28.pdf — "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA"; https://kund.printhuset-sthlm.se/wa/h26.pdf — "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång"
      { q: "Hur tar man sig till Svartlöga med båt?", a: "Med Waxholmsbolaget. Linje 26 går från Strömkajen i Stockholm via Vaxholm och Norrsund på Blidö till Svartlöga och Rödlöga, och linje 28 går från Furusund. Från Svartlöga beställer du resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst minst en timme före avgång." },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — "Strömkajen (Stockholm) 08.45"; https://kund.printhuset-sthlm.se/wa/h26.pdf — "Svartlöga 12.40b"
      { q: "Hur lång tid tar båten till Svartlöga från Stockholm?", a: "Knappt fyra timmar. I höstens tidtabell för linje 26 går morgonbåten från Strömkajen 08.45 och är vid Svartlöga 12.40. Tiderna ändras när tidtabellen byts, så kontrollera din avgång." },
      // KÄLLA: https://www.norrtalje.se/globalassets/kultur-och-fritid/riksintressen/svartloga---rodloga.pdf — "Riksintresset omfattar byarna Svartlöga och Rödlöga i Stockholms norra ytterskärgård i jämnhöjd med Yxlan och Blidö."; https://stockholmslansmuseum.se/besoksmal/svartloga/ — "Byn ligger samlad ovanför hamnen på öns sydöstra sida."
      { q: "Var ligger Svartlöga på kartan?", a: "I Stockholms norra ytterskärgård, utanför Blidö och i höjd med Yxlan, med Rödlöga längre österut. Waxholmsbryggan ligger på norra sidan och byn ovanför hamnen på sydöstra sidan." },
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/ytterskargarden/svartloga — "Ön har dock flera platser som är lämpliga att tälta på."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "Om ni är flera personer med flera tält krävs markägarens tillstånd."
      { q: "Får man tälta på Svartlöga?", a: "Ön har flera platser som passar för tält, och allemansrätten tillåter att du tältar något enstaka dygn långt från bostadshus. Är ni flera med flera tält krävs markägarens tillstånd." },
    ],
  },
  {
    slug: "ljustero-guide",
    title: "Ljusterö – färjan, Ljusterö torg och hur många som bor där",
    excerpt: "Ljusterö i Österåker nås med gratis bilfärja från Östanå, SL-buss eller båt. Om Ljusterö torg, bad, golf, Östra Lagnö och hur många som bor på Ljusterö.",
    category: "Region", emoji: "🌲", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.osteraker.se/kommunpolitik/kommunfakta.4.592cfecd176fc0db8783272.html — "Cirka 1 900 personer bor på Ljusterö och närliggande öar."; https://www.scb.se/hitta-statistik/redaktionellt/antalet-befolkade-oar-utan-fastlandsforbindelse-minskar/ — "Ljusterö Österåker 1 487 1 663 176"; https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Under sommarsäsongen vistas det nästan 20 000 personer på ön."
      { q: "Hur många bor på Ljusterö?", a: "Enligt Österåkers kommun bor cirka 1 900 personer på Ljusterö och närliggande öar. SCB räknade 1 663 folkbokförda på Ljusterö år 2020. På sommaren vistas nästan 20 000 personer på ön." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "Med bil: E18 Norrtäljevägen, därefter väg 276 förbi Åkersberga mot Östanå färjeläge där bilfärjan går mot Ljusterö."; https://skargardsstiftelsen.se/omraden/ostra-lagno/ — "Hit tar du dig med bil eller SL-buss via färjan till Ljusterö."; https://waxholmsbolaget.se/reseplanering/resmal/ljustero-och-saxarfjarden — "För att hitta reselaternativ kan du söka på turer från Strömkajen till Linanäs."
      { q: "Hur tar man sig till Ljusterö från Stockholm?", a: "Med bil kör du E18 och väg 276 förbi Åkersberga till Östanå färjeläge och tar vägfärjan över. Utan bil åker du SL-buss via färjan, eller Waxholmsbolagets båt från Strömkajen till Linanäs (tabell 9)." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Ljusteröleden går mellan Östanå och Ljusterö i Stockholms skärgård. Färjeledens längd är 1100 meter och överfartstiden är sju minuter. Resan med vägfärjan är avgiftsfri."
      { q: "Kostar färjan till Ljusterö något?", a: "Nej. Ljusteröleden mellan Östanå och Ljusterö är Trafikverkets vägfärja och resan är avgiftsfri. Överfarten är 1 100 meter och tar sju minuter." },
      // KÄLLA: https://tunaborgen.se/vara-fastigheter/ljustero-torg/ — "Bland hyresgästerna finns bland annat livsmedelsbutik, restauranger, frisör, veterinär samt den berömda glasskiosken"; https://www.tempo.se/butiker/tempo-ljustero-torget/ — "Apoteksombud"
      { q: "Vad finns på Ljusterö torg?", a: "Ljusterö torg är öns servicecentrum med livsmedelsbutik, restauranger, frisör, veterinär och glasskiosk. Matbutiken Tempo Ljusterö Torget är också apoteksombud och PostNord-ombud." },
      // KÄLLA: https://www.ljusterogolf.se/ — "18-hål | Driving range | Restaurang | Padel | Båtplatser"; https://www.ljusterogolf.se/ — "Endast 5 minuter från färjan"
      { q: "Finns det golf på Ljusterö?", a: "Ja. Ljusterö Golfklubb har en 18-hålsbana, driving range, padelbanor och båtplatser på Väsbyvägen 36, enligt klubben fem minuter från färjan." },
      // KÄLLA: https://www.osteraker.se/upplevagora/badplatser.106.44fe6fa019e40e754cd685a.html — "På Ljusterö kan du bada vid Linanäsbadet, som har en barnvänlig strand och flytbryggor med en storslagen utsikt över Saxarfjärden."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "Brännholmen är udden vid nordöstra spetsen av reservatet och här kan du bada, tälta och fiska."
      { q: "Var kan man bada på Ljusterö?", a: "Kommunens badplats är Linanäsbadet, med barnvänlig strand och flytbryggor mot Saxarfjärden. I naturreservatet Östra Lagnö kan du bada från klipporna på Brännholmen." },
    ],
  },
  { slug: "runmaro-guide", title: "Runmarö – lugn och genuint skärgårdsliv i Stockholms ytterskärgård", excerpt: "Runmarö är en av Stockholms skärgårds bäst bevarade hemligheter. Inga turister, genuint liv och vacker natur. Guide till Runmarö.", category: "Region", emoji: "⛵", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Runmarö?', a: 'Waxholmsbolaget via Stavsnäs – ta buss 834 från Slussen till Stavsnäs, sedan Waxholmsbåten. Restid totalt ca 1,5–2 timmar. Inga bilar tillåts på ön.' }, { q: 'Vad är Runmarö känt för?', a: 'En av skärgårdens tystare och mer genuina öar med gott om naturhamnvikar, vandringsstigar och sommarboende utan krögare eller turistshoppar. Perfekt för seglare och friluftsmänniskor.' }] },
  { slug: "blido-guide", title: "Blidö – norra skärgårdens gröna ö med bilfärja", excerpt: "Blidö nås med bilfärja och erbjuder en avkopplande mix av skog, bad och genuint skärgårdsliv. Guide till Blidö i norra Stockholms skärgård.", category: "Region", emoji: "🌿", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Blidö?', a: 'Bilfärja från Simpnäs (Trafikverket, gratis) – ca 5 min överfart. Ta E18 norrut mot Norrtälje, sedan skyltning mot Simpnäs. Passar utmärkt med bil för camping eller stugvistelse.' }, { q: 'Vad kan man göra på Blidö?', a: 'Vandring i Blidöns naturreservat, bad vid Söderhamnsudde, fiske och cykling. August Strindberg bodde på Blidö – hans minne finns bevarat i liten utställning på ön.' }] },
  // Bohuslän nya öar
  {
    slug: "karingon-guide",
    title: "Käringön – färja från Tuvesvik, karta, mat och boende",
    excerpt: "Käringön (ibland stavat Kärringön) är en bilfri ö väster om Orust. Om färjan till Käringön från Tuvesvik, tidtabell, karta, gästhamn, mat och boende.",
    category: "Region", emoji: "🏘", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Båtresan tar cirka 35 minuter från Tuvesvik till Käringön."; "Biljettautomat finns vid färjeläget, det går även bra att köpa biljett ombord på båten eller via Västtrafiks app ToGo."; https://www.vastsverige.com/orust/produkter/karingon/ — "Båtresan mellan alla klippor och kobbar tar inte mer än 40 minuter"
      { q: "Hur tar man sig till Käringön? Går det färja till Käringön?", a: "Med Västtrafiks personfärja linje 381 från Tuvesvik på västra Orust. Resan tar cirka 35–40 minuter. Bilen parkerar du i Tuvesvik, och biljett köper du i automaten vid färjeläget, ombord eller i appen To Go." },
      // KÄLLA: https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014638100000/ — "Tidtabell linje 381 Käringön - Gullholmen - Tuvesvik"; https://www.vasttrafik.se/reseplanering/hallplatser/9021014015746000/ — "Visa avgångstavla"; https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Den reguljära färjan gör det möjligt att besöka Käringön året runt, även på vintern är det flera dagliga avgångar."
      { q: "Var hittar jag tidtabellen för färjan till Käringön?", a: "Hos Västtrafik. Färjan är linje 381 (Käringön–Gullholmen–Tuvesvik), och tidtabellen läggs ut som PDF för en period i taget på Västtrafiks linjesida. På Västtrafiks hållplatssida för Käringön finns också en avgångstavla. Färjan går året runt, med flera avgångar om dagen även på vintern." },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Nej, Käringön är bilfri. Du parkerar bilen i Tuvesvik och fortsätter med personfärja."; "Du betalar parkeringen med kort eller sms."
      { q: "Får man ta bilen till Käringön?", a: "Nej. Käringön är bilfri och färjan tar bara passagerare. Du parkerar i Tuvesvik och betalar parkeringen med kort eller sms." },
      // KÄLLA: https://www.vasttrafik.se/reseplanering/hallplatser/9021014015746000/ — "Här visas karta för Käringön, Orust läge A, B."; https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn — "Kartan kan du använda för att få information om service i gästhamnen."; "Koordinater 58° 06,8 N, 11° 22,1 E."
      { q: "Finns det en karta över Käringön?", a: "Västtrafiks hållplatssida för Käringön visar färjeläget på en karta, och Orust kommun har en karta över gästhamnen med information om service. Gästhamnens koordinater är 58° 06,8 N, 11° 22,1 E." },
      // KÄLLA: https://www.petersonskrog.se/ — "Vår säsong sträcker sig från påsk till jul varje år"; https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Säsongen är lång och sträcker sig från Påsk och fram till mitten av december."; "Matbutiken som idag är en ICA ToGo, har öppet hela året"
      { q: "Finns det restauranger på Käringön?", a: "Ja, bland annat Petersons Krog vid färjeläget, Simsons restaurang och vincafé, Käringöns Brygga och Crêperiet på Lotshotellet. Säsongen är i stort sett påsk till december, och matbutiken har öppet året runt." },
    ],
  },
  {
    slug: "gullholmen-guide",
    title: "Hur tar man sig till Gullholmen? Färja från Tuvesvik och karta",
    excerpt: "Hur tar man sig till Gullholmen? Med färja linje 381 från Tuvesvik på Orust. Här är bilvägen, bussen, parkeringen, kartor och Hermanö naturreservat.",
    category: "Region", emoji: "🐚", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Tuvesvik är platsen där färjan (linje 381) till Gullholmen, Härmanö och Käringön avgår."; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Båtresan tar cirka 5 minuter från Tuvesvik till Gullholmen."; https://www.orust.se/trafik-och-gator/bil-buss-bat-och-tag — "Gullholmen och Käringön är bilfria öar som du kan ta dig till med färja."
      { q: "Hur tar man sig till Gullholmen?", a: "Du åker till Tuvesvik på Orusts västra sida med bil eller buss och tar sedan Västtrafiks personfärja, linje 381. Överfarten till Gullholmen tar ungefär fem minuter. Gullholmen är bilfri, så bilen blir kvar i Tuvesvik." },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Endast personfärja."; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Biljettautomat finns vid färjeläget, det går även bra att köpa biljett ombord på båten eller via Västtrafiks app ToGo."; https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014638100000/ — "Tidtabell linje 381 Käringön - Gullholmen - Tuvesvik"
      { q: "Går det färja till Gullholmen, och var går den från?", a: "Ja. Färjan går från Tuvesvik på Orust och är en personfärja som Västtrafik trafikerar (linje 381 Käringön–Gullholmen–Tuvesvik). Biljett köper du i automaten vid färjeläget, ombord eller i appen To Go. Tider finns i Västtrafiks reseplanerare." },
      // KÄLLA: https://www.vastsverige.com/orust/leder/harmano-gullholmen-vandringsleder/ — "Efter 13 km når du Varekil, ta vänster mot Ellös. Efter ytterligare 15 km sväng vänster mot Gullholmen. Följ sedan skyltar mot Tuvesvik."; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Du betalar parkeringen med kort eller sms. Det finns ingen kontantbetalning."; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Kom i god tid då parkering för besökare ligger längre bort från färjan."
      { q: "Hur kommer man till Gullholmen med bil?", a: "Ta väg 160 från E6 mot Tjörn och Orust, sväng vänster mot Ellös i Varekil och sedan vänster mot Gullholmen, och följ skyltarna mot Tuvesvik. Där parkerar du och betalar med kort eller sms. Besöksparkeringen ligger en bit från färjan." },
      // KÄLLA: https://www.vastsverige.com/orust/leder/harmano-gullholmen-vandringsleder/ — "Med Orust Express och 371 tar man sig med buss från Stenungsunds station till Tuvesvik. Turen tar ca 1 timma."; https://www.vastsverige.com/orust/leder/harmano-gullholmen-vandringsleder/ — "Det går även att ta sig med buss från Henåns bussterminal till Tuvesvik. Turen tar ca 40 min."; https://www.orust.se/trafik-och-gator/bil-buss-bat-och-tag — "Orust har inga tågstationer. Närmaste tågstation finns i Stenungsund eller i Uddevalla."
      { q: "Hur kommer man till Gullholmen med buss?", a: "Från Stenungsunds station går Orust Express och buss 371 till Tuvesvik på ungefär en timme. Från Henåns bussterminal tar bussen ungefär 40 minuter. Orust har ingen tågstation, så tåget tar dig till Stenungsund eller Uddevalla." },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "Länk till karta med vägbeskrivning"; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "Visa interaktiv karta"; https://www.vastsverige.com/orust/leder/harmano-gullholmen-vandringsleder/ — "Karta för utskrift/nedladdning"; https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn — "Koordinater 58° 10,8 N, 11° 24,4 E."
      { q: "Var finns en karta över Gullholmen?", a: "Länsstyrelsens sida om Härmanö har en karta med vägbeskrivning och en interaktiv karta, och Visit Orust har en karta över vandringslederna som går att skriva ut. Gästhamnens koordinater är 58° 10,8 N, 11° 24,4 E." },
      // KÄLLA: https://www.vastsverige.com/orust/leder/harmano-gullholmen-vandringsleder/ — "Längd: 2,5 - 5 km"; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "Prova vid Skottarn, Gullholmsbaden, Grindebacken eller Härmanö huvud."; https://www.orust.se/uppleva-och-gora/idrott-motion-och-friluftsliv/vandringsleder/harmano-vandringsled — "För fågelskådare är Hermanö ett eldorado."; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "medföra lös hund"
      { q: "Vad finns att göra på Hermanö?", a: "Härmanö (Hermanö) är ett naturreservat med vandringsleder på 2,5–5 km, bad vid bland annat Skottarn, Gullholmsbaden, Grindebacken och Härmanö huvud, och fågelskådning. I reservatet får du inte campa, göra upp eld eller ha hunden lös." },
    ],
  },
  // Tematiska
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "skargard-pa-budget", title: "Skärgård på budget – semester vid havet för under 500 kr/dag", excerpt: "Skärgård behöver inte kosta skjortan. Guide till hur du upplever det bästa av svensk kust och skärgård utan att tömma plånboken.", category: "Praktisk", emoji: "💰", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur gör man en billig skärgårdsresa?', a: 'Åk med SL-biljett till yttre hållplatser (Stavsnäs, Muskö) och Waxholmsbåt. Packa mat hemifrån, tälta med allemansrätt, och välj inre skärgårdens gratis stränder.' }, { q: 'Vad kostar en dag i skärgården utan att bo där?', a: 'Dagstur med Waxholmsbåt: 200–350 kr tur/retur. Medta matsäck. Totalt budget: 200–500 kr/dag beroende på var du åker. Undvik turistrestaurangerna på populäraste öarna.' }] },
  {
    slug: "camping-kust-sverige",
    title: "Camping vid havet – havsnära camping och strandcamping i Sverige",
    excerpt: "Camping vid havet i Sverige: havsnära camping från Öland och Gotland till Bohuslän och Höga Kusten, plus reglerna för friluftscamping och husbil vid stranden.",
    category: "Praktisk", emoji: "⛺", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.bodasand.se/ — "vår två mil långa och krispigt vita sandstrand"; https://www.kcsaxnas.se/ — "bara ett stenkast från stranden!"; https://www.toftacamping.se/ — "Här bor du granne med havet, endast 15 min från Visby."
      { q: "Var finns camping vid havet i Sverige?", a: "Längs hela kusten. Några exempel: Böda Sand på Öland har camping vid en två mil lång sandstrand, KronoCamping Saxnäs ligger ett stenkast från stranden vid Kalmarsund, och Tofta Camping på Gotland ligger vid havet 15 minuter från Visby." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "Du får tälta något enstaka dygn i naturen, men tänk på att välja en tältplats långt bort från bostadshus och att visa hänsyn till markägaren."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "I allmänhet är det inte tillåtet att tälta annat än på särskilt angivna platser."
      { q: "Vad är friluftscamping – får man tälta fritt vid havet?", a: "Med allemansrätten får du tälta något enstaka dygn i naturen, en bit bort från bostadshus och med hänsyn till markägaren. En eller två nätter är en bra tumregel. I naturreservat och nationalparker får du oftast bara tälta på anvisade platser." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/husvagn-husbil-och-taktalt-i-naturen/ — "Du får inte heller parkera eller ställa upp en husbil, husvagn eller en bil med taktält i naturen så som i skog, på stränder, i hagar, parker eller på gräsmattor."
      { q: "Får man ställa husbilen på stranden?", a: "Nej. Du får inte parkera eller ställa upp husbil, husvagn eller bil med taktält i naturen, till exempel på stränder. Använd en campingplats eller en ställplats." },
      // KÄLLA: https://gotland.com/resa-hit-runt/ — "Det finns gott om campingplatser och ställplatser på Gotland."; https://www.toftacamping.se/ — "Här bor du granne med havet, endast 15 min från Visby."; https://gotland.se/trafik-gator-och-parker/parkera-och-ladda/husbil-stallplatser-terrangkorning — "Camping i tält, husvagn, husbil, bil eller övernattning utomhus får inte ske på offentlig plats"
      { q: "Finns det havsnära camping på Gotland?", a: "Ja. Enligt Gotlands besöksguide finns det gott om campingplatser och ställplatser på ön. Tofta Camping ligger vid havet och har campingtomter, stugor och tältplatser. Camping på offentlig plats är förbjuden om marken inte är upplåten för det." },
      // KÄLLA: https://nattaro.se/boende/ — "Även dygnscampingen för er som vill tälta ligger centralt placerat på ön."; https://skargardsstiftelsen.se/omraden/gallno-karklo/ — "Torsviken är ett populärt mål med sandstrand, tältplats och naturhamn."
      { q: "Var kan man tälta vid havet i Stockholms skärgård?", a: "Till exempel på dygnscampingen på Nåttarö eller på tältplatsen vid Torsviken på Gällnö, dit det går Waxholmsbåt från Stockholm." },
    ],
  },
  {
    slug: "vattensport-guide",
    title: "Wakeboard i Stockholm – kabel, klubbar och Cable Park Arlanda",
    excerpt: "Wakeboard i Stockholm: kabel och båt hos Waxholms VSK, vattenskidskola i Nacka och läget för Cable Park Arlanda. Plus regler för vattenskoter och fart.",
    category: "Aktivitet", emoji: "🏄", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.wvsk.se/lager — "Här har vi tilgång till både kabel och båt."; https://www.wvsk.se/information — "Vi erbjuder prova på åk och privata lektioner för alla åldrar, Barn som Vuxna!"; https://nackavsk.se/vattenskidskola — "Vattenskidskolan är öppen för alla från 7 år och uppåt som vill lära sig att åka vattenskidor eller wakeboard."
      { q: "Var kan man åka wakeboard i Stockholm?", a: "Waxholms Vattenskidklubb på Eriksö i Vaxholm har både kabel och båt, prova på-åk och wakeboardläger. Nacka VSK i Järlasjön har en vattenskidskola där man kan lära sig både vattenskidor och wakeboard från sju år." },
      // KÄLLA: http://thecablepark.se/ — "This domain has been successfully registered by nicsell for a customer."
      { q: "Finns Cable Park vid Arlanda kvar?", a: "Vi har inte kunnat bekräfta att The Cable Park vid Arlanda har öppet 2026. Anläggningens tidigare webbadress thecablepark.se leder till en domänmäklare som skriver att domänen har registrerats för en kund. Kontakta anläggningen direkt innan du åker." },
      // KÄLLA: https://svwf.se/ — "HITTA VÅRA KLUBBAR"; https://svwf.se/ — "Sitwake-camp i Fagersta Wake Park den 10–11 september, följt av SM i Sitwake den 12 september"
      { q: "Var hittar man wakeboard i Sverige?", a: "Svenska Vattenskid- & wakeboardförbundet har en klubbsökning på svwf.se där du hittar klubbar i hela landet. I september 2026 hölls till exempel SM i sitwake i Fagersta Wake Park." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/vattenskoter/ — "För att framföra vattenskoter krävs förarbevis för vattenskoter. För att kunna utbilda sig och få köra vattenskoter krävs det även att man har fyllt 15 år. Även en giltig legitimation ska medtas vid framförande av vattenskoter."
      { q: "Behöver man körkort för vattenskoter?", a: "Ja, det krävs förarbevis för vattenskoter. Du måste ha fyllt 15 år för att gå utbildningen och få köra, och du ska ha med dig giltig legitimation." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/samhalle/trafik-och-infrastruktur/motortrafik-i-naturen.html — "Du får bara köra vattenskoter i allmänna farleder och områden som har godkänts av Länsstyrelsen."; https://polisen.se/lagar-och-regler/trafik-och-fordon/vattenskotrar/ — "polisen från den 1 juli 2021 ska kunna ge ordningsböter på plats för störande och onödig vattenskoterkörning"
      { q: "Var får man köra vattenskoter i Stockholm?", a: "Enligt Länsstyrelsen i Stockholm bara i allmänna farleder och i områden som Länsstyrelsen har godkänt. Sjötrafikreglerna gäller alltid, och polisen kan ge ordningsbot för störande körning." },
      // KÄLLA: https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ — "Det finns idag inga krav på körkort om du har ett fritidsfartyg/en fritidsbåt som är kortare än tolv meter och smalare än fyra meter."; https://www.transportstyrelsen.se/sv/sjofart/Sjotrafik-och-hamnar/Regler-gallande-sjofart/Lokala-sjotrafikregler/ — "begränsning i rätten att utnyttja ett vattenområde för båttävling, vattenskidåkning, dykning eller liknande sporter"; https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/pa-sjon/var-nykter-pa-sjon/ — "Den fasta gränsen för sjöfylleri är 0,2 promille."
      { q: "Behövs licens för wakeboard och vattenskidor?", a: "Föraren av dragbåten behöver inget körkort om båten är kortare än tolv meter och smalare än fyra meter. Men Länsstyrelsen kan begränsa vattenskidåkning och liknande sporter i vissa vattenområden, och sjöfyllerigränsen 0,2 promille gäller båtar som går i minst 15 knop." },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/surfa-och-paddla — "Så fort vinden tillåter trivs här både vind-, våg- och kitesurfare, året om!"
      { q: "Var kan man kitesurfa och vindsurfa nära Stockholm?", a: "Nynäshamns kommun pekar ut Torö Stenstrand i naturreservatet Ören som surfstrand, där vind-, våg- och kitesurfare åker så fort vinden tillåter, året om." },
    ],
  },
  {
    slug: "skargard-solo",
    title: "Skärgården som ensamresenär – öar, boende och säkerhet solo",
    excerpt: "Skärgård solo: öar du når med reguljär båt, STF-vandrarhem på Finnhamn och Möja och Sjöräddningssällskapets råd för dig som paddlar eller vandrar ensam.",
    category: "Praktisk", emoji: "🧭", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.sjoraddning.se/artiklar/bli-en-sakrare-paddlare — "Paddlare i grupp är enklare att se än en enskild paddlare."; https://www.sjoraddning.se/artiklar/bli-en-sakrare-paddlare — "Planera din färdväg och undvik att paddla i farleder."; https://www.sjoraddning.se/artiklar/bli-en-sakrare-paddlare — "Ring 112 och beskriv vad som hänt och vart du är så gott du kan."
      { q: "Är det säkert att åka till skärgården ensam?", a: "Ja, om du planerar. Paddlar du ensam syns du sämre än i grupp, så planera färdvägen, undvik farleder, bär flytväst med visselpipa och reflexer och ha mobilen i vattentätt fodral. Är du i fara ringer du 112." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "Trots sitt läge i mellanskärgården är ön lätt att nå med reguljär skärgårdstrafik från Stockholm."; https://www.waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja."; https://www.waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."
      { q: "Vilka öar i Stockholms skärgård passar för en solotur?", a: "Öar med reguljär båt och boende är enklast, till exempel Finnhamn, Möja och Utö. Till Möja och Sandhamn går det båt året runt, och Nämdö är bilfri och promenadvänlig året om." },
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Vandrarhemmet har öppet året runt men under den kallare årstiden endast för större grupper."; https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/ — "Öppet April - December"
      { q: "Kan man bo på vandrarhem i skärgården som ensamresenär?", a: "Ja. STF Finnhamns vandrarhem har gemensamt kök och allt öppet juni–augusti, men resten av året bara för större grupper. STF Möja vandrarhem är öppet april–december." },
      // KÄLLA: https://www.sjoraddning.se/artiklar/bli-en-sakrare-paddlare — "Eftersom att kajaker ligger lågt i vattnet kan de vara svåra att se."; https://www.sjoraddning.se/artiklar/bli-en-sakrare-paddlare — "Tänk även på att klä dig efter vattentemperaturen och inte efter lufttemperaturen."; https://www.sjoraddning.se/artiklar/bli-en-sakrare-paddlare — "Undvik att ge dig ut i väder som du inte behärskar."
      { q: "Kan man paddla kajak ensam i skärgården?", a: "Det går, men Sjöräddningssällskapet påpekar att en ensam kajak är svår att se, särskilt i motljus. Klä dig färgglatt, ha reflexer och klä dig efter vattentemperaturen. Undvik väder du inte behärskar." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/uto — "Till Årsta brygga kommer du med pendeltåg och sedan buss."; https://www.waxholmsbolaget.se/reseplanering/resmal/uto — "sju till åtta gånger om dagen sommartid, lite mer sällan övrig tid på året"
      { q: "Hur tar man sig till Utö utan bil?", a: "Med pendeltåg och buss till Årsta brygga i Haninge och sedan Waxholmsbolagets båt, som går sju till åtta gånger om dagen på sommaren och lite mer sällan resten av året." },
    ],
  },
  {
    slug: "skargard-seniorer",
    title: "Skärgård för seniorer – pensionärsrabatt och tillgängliga båtar",
    excerpt: "Skärgården för seniorer: pensionärsrabatt från 65 år hos Waxholmsbolaget, var SL-biljetten gäller, tillgänglighet ombord och utflyktsmål som är lätta att nå.",
    category: "Praktisk", emoji: "🧓", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris — "Du får också resa till rabatterat pris om du har fyllt 65 år, fyller 65 under biljettens giltighetstid eller om du kan visa upp intyg från Pensionsmyndigheten eller Försäkringskassan (fotolegitimation krävs)."
      { q: "Får pensionärer rabatt på Waxholmsbolagets båtar?", a: "Ja. Du reser till rabatterat pris om du har fyllt 65 år eller fyller 65 under biljettens giltighetstid, eller om du kan visa intyg från Pensionsmyndigheten eller Försäkringskassan tillsammans med fotolegitimation." },
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd."; https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Om din SL-biljett gäller i 30 dagar eller mer kan du resa på den i hela Waxholmsbolagets trafik när det är lågsäsong."
      { q: "Gäller SL-biljetten på Waxholmsbåtarna?", a: "Ja, mellan 44 bryggor från Strömkajen till Vaxholm med omnejd, året runt. Under lågsäsong gäller SL-biljetter på 30 dagar eller mer i hela trafiken. På båtarna mot södra skärgården via Baggensstäket gäller inte SL-biljetter." },
      // KÄLLA: https://www.waxholmsbolaget.se/att-resa-med-oss/tillganglighet — "Den fysiska tillgängligheten när du är ombord varierar beroende på vilket fartyg du reser med."; https://www.waxholmsbolaget.se/att-resa-med-oss/tillganglighet — "kan du ringa kundtjänst på tillgänglighetsnumret 020 120 20 22"
      { q: "Kan man åka Waxholmsbåt med rullstol eller rollator?", a: "Du går på och av via en landgång, som kan bli brant vid lågt vatten, och tillgängligheten ombord beror på fartyget. Ring Waxholmsbolagets tillgänglighetsnummer 020 120 20 22 om du har frågor. Besättningen hjälper till vid på- och avstigning." },
      // KÄLLA: https://www.waxholmsbolaget.se/att-resa-med-oss/tillganglighet — "Om du har ett färdtjänstkort som är utfärdat av Region Stockholm/Stockholms läns landsting reser du och en ledsagare utan kostnad på Waxholmsbolagets linjer."
      { q: "Får en ledsagare följa med gratis på Waxholmsbåten?", a: "Har du färdtjänstkort från Region Stockholm reser både du och en ledsagare utan kostnad på Waxholmsbolagets linjer." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"; https://skargardsstiftelsen.se/omraden/grinda/ — "Grinda är en av skärgårdens mest tillgängliga och uppskattade öar"; https://skargardsstiftelsen.se/omraden/bjorno/ — "Björnö är ett av skärgårdens mest lättillgängliga naturreservat"
      { q: "Vilka öar i Stockholms skärgård är lätta att besöka för seniorer?", a: "Vaxholm ligger en timme med båt från Strömkajen och har SL-buss tillbaka. Skärgårdsstiftelsen kallar Grinda en av skärgårdens mest tillgängliga öar. Björnö och Gålö går att nå med bil eller buss." },
    ],
  },
  {
    slug: "nationalparkerna-havet",
    title: "Marin nationalpark i Sverige – marina nationalparker vid havet",
    excerpt: "Sveriges marina nationalparker är Kosterhavet och Nämdöskärgården. Här är de, plus nationalparker vid havet som Haparanda skärgård och Ängsö, och reglerna.",
    category: "Aktivitet", emoji: "🌊", readTime: "8 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark — "Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark — "Nämdöskärgårdens nationalpark är Sveriges första marina nationalpark i Östersjön i Stockholms skärgård."
      { q: "Vilka marina nationalparker finns i Sverige?", a: "Kosterhavet i Bohuslän, som bildades 2009 och är Sveriges första marina nationalpark, och Nämdöskärgården i Stockholms skärgård, som bildades 2025 och är den första marina nationalparken i Östersjön." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark — "Bildades 2009"; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/kosterhavets-nationalpark.html — "Större delen av nationalparken utgörs av hav, bara ett par procent är landområden."
      { q: "Vilken är Sveriges första marina nationalpark?", a: "Kosterhavets nationalpark i Strömstads och Tanums kommuner. Den bildades 2009 och är till största delen hav – bara ett par procent är land." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/ — "Sveriges 31 nationalparker är öppna årets alla dagar"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/haparanda-skargards-nationalpark — "Haparanda skärgårds nationalpark består av flera öar i Bottenviken"; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark — "Blå Jungfruns nationalpark är en isolerad ö i Kalmarsund"
      { q: "Vilka nationalparker i Sverige ligger vid havet?", a: "Förutom de marina parkerna Kosterhavet och Nämdöskärgården bland annat Haparanda skärgård i Bottenviken, Ängsö i Roslagen, Gotska Sandön, Blå Jungfrun i Kalmarsund, Skuleskogen vid Höga Kusten och Stenshuvud på Österlen. Sverige har totalt 31 nationalparker." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/besok-parken/hitta-hit — "De avgår från Strömstad året runt och resan tar ungefär 45 minuter."; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/besok-parken/hitta-hit — "Huvudentrén till Kosterhavets nationalpark ligger i naturum vid Ekenäs brygga på Sydkoster."
      { q: "Hur tar man sig till Kosterhavets nationalpark?", a: "Med Kosterbåtarna från Strömstad, som går året runt. Resan tar ungefär 45 minuter. Huvudentrén är naturum vid Ekenäs brygga på Sydkoster." },
      // KÄLLA: https://www.luontoon.fi/sv/destinationer/skargardshavets-nationalpark — "Egentliga Finland"; https://www.luontoon.fi/sv/destinationer/skargardshavets-nationalpark — "I Skärgårdshavet är den finländska havsnaturen som mest mångsidig."
      { q: "Är Skärgårdshavets nationalpark svensk?", a: "Nej. Skärgårdshavets nationalpark ligger i Egentliga Finland och sköts av finska Forststyrelsen. De svenska marina nationalparkerna är Kosterhavet och Nämdöskärgården." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/skyddade-omraden/ — "I vissa naturreservat och nationalparker får du inte tälta, eller bara göra det på bestämda platser."; https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Du får tälta upp till två dygn på samma plats i nästan hela nationalparken."
      { q: "Får man tälta i en nationalpark?", a: "Det beror på parken. Allemansrätten kan vara begränsad, och i vissa nationalparker får du inte tälta alls eller bara på bestämda platser. I Nämdöskärgården får du tälta upp till två dygn på samma plats i nästan hela parken." },
    ],
  },
  { slug: "skargard-tillganglighet", title: "Skärgård för rörelsehindrade – tillgängliga öar och anpassade turer", excerpt: "Skärgårdsupplevelsen ska vara tillgänglig för alla. Guide till öar med tillgängliga bryggor, stigar och aktiviteter för dig med rörelsenedsättning.", category: "Praktisk", emoji: "♿", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka öar i Stockholm är tillgängliga för rörelsehindrade?', a: 'Vaxholm har tillgänglighetsanpassad hamn och centrum. Waxholmsbolaget har rullstolsramper på de flesta större båtarna. Kontakta dem i förväg för assistans vid ombordstigning.' }, { q: 'Finns det guidade skärgårdsturer för personer med funktionsnedsättning?', a: 'Ja – Tillgänglighetsresor och Handikapp & Fritid i Stockholm erbjuder anpassade skärgårdsturer. Kolla med respektive Waxholmsbolagets kundservice för assistansmöjligheter.' }] },
  { slug: "batsaerhet-guide", title: "Båtsäkerhet för nybörjare – VHF, sjökort och säker tur", excerpt: "Att ge sig ut på havet kräver grundläggande säkerhetskunskap. Guide till flytvästar, VHF-radio, sjökort och vad du måste kunna innan du lämnar hamnen.", category: "Praktisk", emoji: "⛑️", readTime: "8 min", fullContent: true, faqs: [{ q: 'Vad behöver man ha med sig för säker båttur?', a: 'Flytväst till alla ombord, VHF-radio (kanal 16), sjökort för området, ankare och fendrar, nödraketer, och mobiltelefon med laddning. Berätta för land om din planering.' }, { q: 'Måste man ha sjökortsexamen för att köra båt i Sverige?', a: 'Inget lagkrav för fritidsbåtar. Men att förstå pricksystemet, sjötrafikregler och meteorologi är viktigt för säkerheten. Fritidsskepparexamen rekommenderas för öppet hav.' }] },
  {
    slug: "fiske-host",
    title: "Fångst vid höstfiske – fiska på hösten: arter och regler",
    excerpt: "Fångst vid höstfiske: vilka arter du får behålla och vilka som är fredade när du fiskar på hösten. Havsöring, gädda, sik, torsk och hummer enligt HaV.",
    category: "Aktivitet", emoji: "🎣", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.havochvatten.se/arter-och-livsmiljoer/arter-och-naturtyper/oring.html — "Öring leker på hösten i rinnande vatten"; https://www.havochvatten.se/arter-och-livsmiljoer/arter-och-naturtyper/gadda.html — "I Östersjön, inklusive Bottniska viken, finns gäddan i främst skärgårdsmiljöer."; https://www.lansstyrelsen.se/vastra-gotaland/djur/fiske.html — "Hummerfiske är tillåtet från första måndagen efter den 20 september klockan 07.00 till och med sista november."
      { q: "Vilken fångst kan man få vid höstfiske?", a: "I Östersjöns skärgårdar finns gädda och abborre, och på hösten vandrar havsöringen upp i åar och bäckar för att leka. På västkusten är hösten hummersäsong, och krabba får fiskas året om. Vad du får behålla styrs av minimimått, fångstbegränsningar och fredningsområden." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/oring---minimimatt-fredningstid-och-fangstbegransningar.html — "Generellt gäller 50 centimeter som minimimått i Östersjöns samtliga delområden."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/oring---minimimatt-fredningstid-och-fangstbegransningar.html — "Det är inte tillåtet att fiska öring i Skagerrak och Kattegatt 1 oktober–31 mars"
      { q: "Får man fiska havsöring på hösten?", a: "I Östersjön ja, men fredningstiderna varierar längs kusten och minimimåttet är 50 centimeter. I Skagerrak och Kattegatt är öringfisket förbjudet 1 oktober–31 mars. Många åmynningar har höstfredning, så kolla svenskafiskeregler.se." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/djur/fiske.html — "I havet längs kusten och i de fem stora sjöarna får du fiska fritt med handredskap utan fiskekort."
      { q: "Behöver man fiskekort för att fiska på hösten vid kusten?", a: "Nej, inte med handredskap i havet längs kusten. I åar, bäckar och mindre sjöar behöver du däremot tillstånd från den som har fiskerätten, oftast ett fiskekort." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/gadda---minimimatt-fredningstid-och-fangstbegransningar-i-ostersjon.html — "Vid fiske med handredskap och ryssjor gäller en fångstbegränsning för gös och gädda till sammantaget tre fiskar."; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/gadda---minimimatt-fredningstid-och-fangstbegransningar-i-ostersjon.html — "Minimimått: 40 cm"
      { q: "Hur många gäddor får man behålla?", a: "I Östersjön, utom Bottenviken, får du behålla högst tre gäddor och gösar sammanlagt vid fiske med handredskap, och gäddan måste vara mellan 40 och 75 centimeter." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/torsk---regler-for-fritidsfiskare.html — "En fångad torsk ska omedelbart återutsättas."; https://www.lansstyrelsen.se/vastra-gotaland/djur/fiske.html — "Under perioden från och med 1 oktober till och med 31 mars är det förbjudet att fiska inom samtliga fredningsområden"
      { q: "Får man fiska torsk på hösten?", a: "Inte i Östersjön, där fritidsfiske efter torsk är förbjudet och fångad torsk ska släppas tillbaka. På västkusten är minimimåttet 30 centimeter, och från 1 oktober är fredningsområdena stängda för allt fiske." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/fiskeregler-for-fritidsfiske.html — "Det är förbjudet för fritidsfiskare att sälja fångst från havet. Det krävs en fiskelicens för att få sälja fisk."
      { q: "Får man sälja fångsten från höstfisket?", a: "Nej. Det är förbjudet för fritidsfiskare att sälja fångst från havet. Det krävs en fiskelicens för att få sälja fisk." },
    ],
  },
  {
    slug: "vandring-host-skargard",
    title: "Vandra i höst i skärgården – Stockholm Archipelago Trail",
    excerpt: "Vandra i höst i Stockholms skärgård: hösttidtabeller, vatten och boende längs Stockholm Archipelago Trail, etapperna Grinda, Sandhamn, Utö och reglerna.",
    category: "Aktivitet", emoji: "🥾", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Men om du är väl förberedd är det också en fantastisk tid på året, eftersom du kommer att vara mer eller mindre ensam."
      { q: "Kan man vandra i höst på Stockholm Archipelago Trail?", a: "Ja. Ledens egen webbplats skriver att hösten blir gradvis mer utmanande när verksamheter stänger, men att du blir mer eller mindre ensam om du är väl förberedd. Båtarna går glesare och vatten, toaletter och boenden stänger efter hand." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Hösttidtabell: ca mitten augusti – ca mitten december"; https://kund.printhuset-sthlm.se/wa/h11.pdf — "17 AUGUSTI 2026 – 12 DECEMBER 2026"; https://kund.printhuset-sthlm.se/wa/h16.pdf — "17 AUGUSTI 2026 – 12 DECEMBER 2026"; https://stockholmarchipelagotrail.com/sv/section/etapp-uto/ — "Du åker till Utö från Årsta Brygga året om."
      { q: "Hur tar man sig till vandringslederna i skärgården på hösten?", a: "Med Waxholmsbolagets båtar, som går efter hösttidtabell från ungefär mitten av augusti till mitten av december. Tabell 11 till Grinda och tabell 16 till Sandhamn gäller 17 augusti–12 december 2026. Till Utö går båten året om från Årsta brygga." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Det betyder att vattnet stängs av i slutet av oktober för att undvika att rören fryser när temperaturen sjunker under noll. Alla handpumpar fungerar dock året runt."; https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Vissa torrdass hålls dock öppna året runt."
      { q: "Finns det vatten och toaletter längs leden på hösten?", a: "De flesta allmänna vattenkranar och spoltoaletter stängs i slutet av oktober. Handpumparna fungerar året runt, och vissa torrdass är öppna hela året. Ta med tillräckligt med mat och vatten." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Campingplatserna håller öppet, men med begränsad service (vatten och toaletter) ju längre in på hösten du kommer."; https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Camping är endast tillåten på den markerade campingen strax söder om Grinda Norra brygga."; https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Camping är tillåten på campingen strax söder om gästhamnen."
      { q: "Får man tälta längs leden på hösten?", a: "Campingplatserna håller öppet men med mindre service längre in på hösten. På Grinda får du bara tälta på den markerade campingen söder om Norra bryggan, på Utö på campingen söder om gästhamnen, och på Sandhamn är camping inte tillåten." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-grinda/ — "Du åker till Grinda från Vaxholm och Värmdö året om."; https://stockholmarchipelagotrail.com/sv/section/etapp-sandhamn/ — "Du åker till Sandhamn året runt från Stavsnäs via Runmarö."; https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Restaurangerna Seglarhotellet och Sandhamns Värdshus är öppna året runt."
      { q: "Vilka vandringsleder i skärgården passar att vandra i höst?", a: "Etapperna på Grinda (9,8 km), Sandhamn (8,1 km) och Utö (18,4 km) nås med båt året om. Sandhamn är enligt ledens höstsida det resmål som har öppet året runt, med restauranger och toalett och vatten i gästhamnen." },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/news/lag-sasong-i-stockholms-skargard/ — "Se till att ta med tillräckligt med mat, vatten och kläder för att vara självförsörjande under senhösten och under vintern."; https://stockholmarchipelagotrail.com/sv/news/leden-pa-norra-rano-ar-stangd-t-o-m-2027/ — "Från början av september t o m slutet av 2026 är Stockholm Archipelago Trail stängt på norra Rånö p g a av skogsarbeten."
      { q: "Vad ska man tänka på när man vandrar i höst i skärgården?", a: "Kolla båttidtabellen, boka boende i förväg eftersom många stänger, ta med mat, vatten och kläder, och ha pannlampa. Norra Rånö är avstängt för skogsarbeten till slutet av 2026." },
    ],
  },
  // Jämförelse
  {
    slug: "skargard-vs-fjall",
    title: "Skärgård vs fjäll – resväg, säsong och allemansrätt i sommar",
    excerpt: "Skärgård eller fjäll i sommar? Jämförelse med källor: båt eller tåg dit, när fjällstugorna har öppet, hur du bor och vad allemansrätten säger om att tälta.",
    category: "Praktisk", emoji: "⚖", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.fjallsakerhetsradet.se/forbered-fjallturen/praktiska-tips-for-en-tryggare-fjallvistelse/sex-tips-for-en-trygg-fjalltur-pa-sommaren/ — "Det finns gott om markerade leder, rastskydd och övernattningsstugor, men också stora områden av ren vildmark i varierande terräng."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/hotell-stugor-och-vandrarhem/ — "Många av boendena nås smidigt med Waxholmsbolagets båtar"
      { q: "Vad är skillnaden mellan skärgård och fjäll som semester?", a: "I fjällen finns markerade leder, rastskydd och övernattningsstugor men också stora vildmarksområden, och du tar dig fram till fots eller på skidor. Skärgårdens öar når du med skärgårdsbåt eller egen båt, och många boenden nås med Waxholmsbolagets båtar." },
      // KÄLLA: https://www.fjallsakerhetsradet.se/att-gora-i-fjallen/fjallvandring/ — "Sommarsäsongen på fjället kan räknas från midsommartid till några veckor in i september."; https://www.fjallsakerhetsradet.se/vader-och-prognoser/fjallets-olika-arstider/ — "I slutet av juli och i början av september är det flest vandrare."
      { q: "När är säsongen i fjällen på sommaren?", a: "Från midsommar till några veckor in i september. STF:s fjällstugor har sommarsäsong från midsommar till mitten eller slutet av september, och flest vandrare är det i slutet av juli och början av september." },
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/omraden/kungsleden/ — "STF Abisko Turiststation ligger vid Abisko Turiststation station på Malmbanan"; https://www.svenskaturistforeningen.se/boende/omraden/kungsleden/ — "STF Kebnekaise Fjällstation nås från Nikkaluokta, dit bussen går från Kiruna."
      { q: "Hur tar man sig till fjällen utan bil?", a: "Till Abisko med tåg på Malmbanan – STF Abisko Turiststation ligger vid stationen. Till Kebnekaise åker du buss från Kiruna till Nikkaluokta och går sedan 19 kilometer, eller tar sommarbåten över Láddjujávri." },
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd."; https://www.goteborg.com/guider/ta-dig-till-skargarden — "för resor till öarna i södra skärgården räcker en biljett för zon A"
      { q: "Hur tar man sig ut i skärgården utan bil?", a: "I Stockholm med Waxholmsbolagets båtar från Strömkajen, där SL-biljetten gäller ut till Vaxholm med omnejd. I Göteborg når du de bilfria södra öarna med Styrsöbolagets båtar i Västtrafiks trafik på en biljett för zon A." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "Du får tälta något enstaka dygn i naturen"; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/fjallen/ — "Allemansrätten kan vara begränsad i nationalparker och naturreservat som ligger i fjällen."
      { q: "Får man tälta i fjällen och i skärgården?", a: "Ja, allemansrätten ger rätt att tälta något enstaka dygn med några få tält. I fjällen ska du hålla avstånd till leder, stugor och vattendrag. I nationalparker och naturreservat, både i fjällen och i skärgården, kan särskilda regler gälla." },
    ],
  },
  { slug: "bohuslan-vs-hoga-kusten", title: "Bohuslän vs Höga Kusten – vilken kust är bäst?", excerpt: "Västkustens klippor mot Höga Kustens dramatiska topografi. En jämförelse av Sveriges två vildaste kustlinjer.", category: "Region", emoji: "⚖", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad skiljer Bohuslän och Höga Kusten?', a: 'Bohuslän: fler öar, skaldjursmat, varmare Västerhavet. Höga Kusten: dramatiska höjder (Sverige högst kust), Skuleskogen och ett mycket lugnare turisttryck.' }, { q: 'Vilken kust passar bättre för barnfamilj?', a: 'Bohuslän har fler sandstränder och enkla transporter. Höga Kusten passar familjer som vill vandra och uppleva natur, men är mer avlägset och kräver bil.' }] },
  {
    slug: "gotland-vs-bornholm",
    title: "Bornholm vs Gotland – storlek, invånare och hur man tar sig dit",
    excerpt: "Hur stor är Bornholm och hur många bor där? Bornholm är 588 km² med cirka 38 650 invånare, Gotland nästan 3 000 km². Här är storlek, karta och resväg.",
    category: "Region", emoji: "🗺", readTime: "4 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.dst.dk/da/Statistik/kommunekort/kommunefakta/kommune?kom=400 — "Kvinder 19.705 19.542"
      { q: "Hur många bor på Bornholm?", a: "Enligt Danmarks Statistik bodde 38 651 personer på Bornholm den 1 juli 2026 (19 109 män och 19 542 kvinnor). Bornholms regionskommun räknar med att befolkningen minskar till 36 020 år 2038." },
      // KÄLLA: https://www.scb.se/hitta-statistik/statistik-efter-amne/boende-bebyggelse-och-mark/markanvandning/strandnara-markanvandning/pong/statistiknyhet/kust-strander-och-oar-2013/ — "Sveriges största ö är Gotland, som har en landyta på nästan 300 000 hektar (3 000 km2) och en omkrets på 800 kilometer."
      { q: "Hur stort är Bornholm jämfört med Gotland?", a: "Gotland är ungefär fem gånger så stort. Gotland har en landyta på nästan 3 000 km² enligt SCB, medan Bornholm är 588,3 km² enligt bornholm.info. Gotland har också fler invånare: 60 853 mot Bornholms 38 651." },
      // KÄLLA: https://bornholm.info/fakta-om-bornholm/ — "Areal: 588,3 kvadratkilometer."
      { q: "Hur stor är Bornholm?", a: "Bornholm är 588,3 km² och har 158 km kust. Den längsta sträckan fågelvägen, från Hammeren till Dueodde, är 40 km." },
      // KÄLLA: https://bornholm.info/fakta-om-bornholm/ — "Korteste afstand til Sverige er 37 km."
      { q: "Hur långt är det från Sverige till Bornholm?", a: "Där avståndet är kortast är det 37 km mellan Bornholm och Sverige. Färjan från Ystad till Rønne tar 1 timme och 20 minuter med snabbfärja." },
      // KÄLLA: https://bornholm.info/en/ferry/ — "The crossing on the conventional ferries (ropax ferries) takes 2½ hours."
      { q: "Hur lång tid tar färjan till Gotland jämfört med Bornholm?", a: "Färjan till Gotland tar drygt tre timmar från både Nynäshamn och Oskarshamn. Till Bornholm tar snabbfärjan från Ystad 1 timme och 20 minuter och den konventionella färjan 2½ timmar." },
      // KÄLLA: https://gotland.com/article/gotlands-natur/ — "Gotland är med sin 800 km långa kust Sveriges största ö"
      { q: "Vilken ö är störst, Gotland eller Bornholm?", a: "Gotland. Gotland är Sveriges största ö, har 800 km kust och 60 853 invånare. Bornholm har 158 km kust och 38 651 invånare enligt Danmarks Statistik (1 juli 2026), och den längsta sträckan fågelvägen, från Hammeren till Dueodde, är 40 km." },
      // KÄLLA: https://bornholm.info/en/travel-to-bornholm/ — "Sweden, Denmark and Germany have temporary ID-control at their borders - so remember to bring a valid picture-ID with you (EU drivers license, ID card or passport"
      { q: "Behöver man pass eller ID för att åka till Bornholm från Sverige?", a: "Bornholm hör till Danmark. Enligt bornholm.info har Sverige, Danmark och Tyskland tillfälliga ID-kontroller vid gränserna, så ta med giltig fotolegitimation (EU-körkort, ID-kort eller pass)." },
    ],
  },
  // ── Batch K ────────────────────────────────────────────────────────────────
  // KÄLLA: Värmdö kommun, naturreservat (Ösbyträsk, Hamnskogen-Eriksberg, Brunn, Sången); Länsstyrelsen Stockholm, naturreservat Nämdö (2002) och Långviksskär; Naturvårdsverket, Nämdöskärgårdens nationalpark (2025). "Raksta naturreservat" finns inte (Tyresö kommuns lista) — borttaget 2026-09-14.
  { slug: "varmdo-guide", title: "Värmdö – guide till Stockholms närmaste skärgårdsö", excerpt: "Värmdö är Stockholms närmaste riktiga skärgårdsupplevelse. Öar, badvikar, vandringsleder och restauranger – allt nåbart på under en timme från city.", category: "Region", emoji: "🏝", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Värmdö från Stockholm?', a: 'Med buss 428 eller 429 från Slussen (ca 30–45 min). Med bil: ta Värmdöleden (väg 222) österut från Stockholm – ca 30 min till Gustavsberg. Värmdö är fastlandsört via bro.' }, { q: 'Vad kan man göra på Värmdö?', a: 'Nämdöskärgårdens nationalpark med Långviksskär, naturreservatet Nämdö, badvikar runt Gustavsberg, vandring i Ösbyträsks naturreservat och restauranger längs kusten. Nås lätt för en dagstur från Stockholm.' }] },
  {
    slug: "vinterbastu-isbastu",
    title: "Isbastu och vinterbastu – bastu och isbad vid vattnet",
    excerpt: "Isbastu och vinterbastu med isbad: bastur med vinteröppet i Stockholm, Nacka, Göteborg, Malmö och Luleå skärgård, och råden för säkerhet på isen.",
    category: "Aktivitet", emoji: "🧖", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.bastuflotten.com/bastuflotten-relaxa-aktiviteter/vinterbastu/ — "Självklart har vi då huggit upp en isvak åt er."; https://www.bastuflotten.com/bastuflotten-relaxa-aktiviteter/vinterbastu/ — "Säsong: November-april"; https://www.bastuflotten.com/bastuflotten-relaxa-aktiviteter/vinterbastu/ — "Antal: 1-16 personer"
      { q: "Var finns isbastu i Stockholm?", a: "Bastuflotten ReLaxa ligger på vintern i Stocksunds hamn i Danderyd. När isen ligger hugger de upp en isvak åt gästerna. Vintersäsongen är november–april och flotten bokas för grupper om 1–16 personer." },
      // KÄLLA: https://hellasgarden.se/oppettider-och-pris/ — "Öppet varje dag året om!"; https://hellasgarden.se/aktiviteter/bastu/ — "Som bastubadande gäst kan du svalka dig i Källtorpssjön via vår badbrygga. Här badar våra gäster året om!"
      { q: "Var kan man vinterbada med bastu i Nacka?", a: "På Hellasgården i Nackareservatet. Friluftsgården har öppet varje dag året om, och från bastun går man ut på en badbrygga i Källtorpssjön, där gästerna badar hela året. Besöket bokas på hellasgarden.se." },
      // KÄLLA: https://goteborg.se/wps/portal/enheter/jubileumsparken/aktiviteter-i-parken/basta — "Den är öppen för alla, året om och kostnadsfri."; https://goteborg.se/wps/portal/enheter/jubileumsparken/aktiviteter-i-parken/bada — "Under resterande delar av året är en av saltvattenbassängerna (simbassängen) öppen för bad."; https://ribersborgskallbadhus.se/ — "Fölängda öppettider mån -ons i vinter!"; https://www.lulea.se/uppleva--gora/lulea-skargard.html — "På vintern går skoterleder och isvägar till flera av öarna."
      { q: "Var finns bastu och isbad vid havet på vintern?", a: "Till exempel i Göteborg, där Jubileumsparkens bastu är öppen och gratis året om och en saltvattenbassäng i Hamnbadet är öppen utanför sommaren, och i Malmö, där Ribersborgs Kallbadhus har bastu och kallbad även på vintern. I Luleå skärgård har kommunen tio bastur, och på vintern går isvägar till flera av öarna." },
      // KÄLLA: https://www.sjoraddning.se/artiklar/kroppens-reaktion-pa-kallt-vatten — "Du kommer inte att kunna kontrollera andningen och du kommer inte att kunna hålla andan."; https://svenskalivraddningssallskapet.se/wp-content/uploads/2026/06/Isvett.pdf — "Ha alltid sällskap på och vid isen."; https://svenskalivraddningssallskapet.se/wp-content/uploads/2026/06/Isvett.pdf — "Gå aldrig ut på is om du inte är säker på att den håller."
      { q: "Är det säkert att bada i en isvak?", a: "Det kräver försiktighet. Kallt vatten ger en köldchock så att du inte kan kontrollera andningen. Bada aldrig ensam, gå aldrig ut på is du inte är säker på och ta med räddningsutrustning som isdubbar och räddningslina." },
      // KÄLLA: https://svenskalivraddningssallskapet.se/wp-content/uploads/2026/06/Isvett.pdf — "Kärnis ska vara minst 10 cm tjock."; https://www.sjoraddning.se/artiklar/om-is-och-dess-svagheter — "En 20 cm tjock is kan vara mindre hållbar än en is på 5 cm."; https://www.sjoraddning.se/artiklar/om-is-och-dess-svagheter — "Generellt sett är isen svagare i skärgårdar och hav än de är i insjöar."
      { q: "Hur tjock ska isen vara för att gå på den?", a: "Svenska Livräddningssällskapet säger att kärnisen ska vara minst 10 cm. Sjöräddningssällskapet påpekar att tjockleken inte räcker som mått: en 20 cm tjock is kan vara svagare än en på 5 cm, och isen är generellt svagare i skärgården och till havs än på insjöar." },
    ],
  },
  {
    slug: "fagelskadning-skargarden",
    title: "Fågelskådning i Stockholms skärgård – fåglar i skärgården",
    excerpt: "Fåglar i skärgården och var du ser dem: fågelskådning i Stockholms skärgård på Landsort, Svenska Högarna och i Nämdö, och tillträdesförbuden på fågelskär.",
    category: "Aktivitet", emoji: "🦅", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "sillgrissla, tobisgrissla, tordmule, ejder och svärta"; https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Du ser ofta havsörn"; https://www.landsort-birds.se/pages/skada-pa-landsort.php — "Över 300 fågelarter har setts från ön"
      { q: "Vilka fåglar kan man se i Stockholms skärgård?", a: "Länsstyrelsen nämner bland annat sillgrissla, tobisgrissla, tordmule, ejder och svärta vid Svenska Högarna, och i Nämdöskärgårdens nationalpark ser man ofta havsörn. Från Landsort har över 300 fågelarter setts enligt Landsorts Fågelstation." },
      // KÄLLA: https://www.landsort-birds.se/pages/skada-pa-landsort.php — "Över 300 fågelarter har setts från ön"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "Området utgör också en av länets förnämsta sträcklokaler för flyttfågel."; https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Du ser ofta havsörn"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Kroka är inte bara intressant för alla växter utan är också en fin plats för många fågelarter"
      { q: "Var kan man skåda fågel i Stockholms skärgård?", a: "Landsort har en fågelstation och över 300 arter har setts från ön. Svenska Högarna har några av länets viktigaste sjöfågelkolonier och är en av länets främsta sträcklokaler. I Nämdöskärgårdens nationalpark ser man ofta havsörn, och på Utö är Kroka en plats för flyttande fåglar på hösten." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/stora-nassa.html — "Under tiden 1 februari till 31 augusti är det förbjudet att gå iland"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb"
      { q: "När får man inte gå i land på fågelskär?", a: "Det beror på området. I Stora Nassa gäller förbudet 1 februari–31 augusti, och på Rödkobben och Nollekobb vid Arholma 1 april–31 juli. Kolla det aktuella reservatet på Länsstyrelsens webbplats." },
      // KÄLLA: https://landsort-birds.se/pages/guidningar.php — "I ringmärkningssäsongen (början av april-slutet av juni, mitten av augusti-början av november) har vi normalt öppna guidningar"; "Inget förbokning krävs"; "Guidningen startar utanför fågelstationen"; "Fågelstationen nås via promenad på ca 10 minuter norrut från byn, dit färjan ankommer."
      { q: "Finns det guidad fågelskådning i Stockholms skärgård?", a: "Ja, på Landsort. Under ringmärkningssäsongen, från början av april till slutet av juni och från mitten av augusti till början av november, har Landsorts Fågelstation normalt öppna guidningar utan förbokning. Guidningen startar utanför fågelstationen, ungefär tio minuters promenad norrut från byn." },
      // KÄLLA: https://www.ottenby.se/ — "vid Ottenby är som mest intensiv under april-maj och september-oktober"; https://landsort-birds.se/pages/guidningar.php — "I ringmärkningssäsongen (början av april-slutet av juni, mitten av augusti-början av november)"
      { q: "När är flyttfågelsträcket som störst?", a: "Vid Ottenby på Öland är flyttfågeltrafiken som mest intensiv i april–maj och september–oktober. Landsorts Fågelstation ringmärker från början av april till slutet av juni och från mitten av augusti till början av november." },
    ],
  },
  {
    slug: "snorkling-stockholm",
    title: "Snorkling i Stockholm – snorkla vid Nåttarö och Björnö",
    excerpt: "Snorkling i Stockholm: snorkla längs Skärgårdsstiftelsens skyltade leder på Nåttarö och Björnö eller i Nämdöskärgården – så tar du dig dit och vad som gäller.",
    category: "Aktivitet", emoji: "🤿", readTime: "4 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/snorkelleder/ — "Som till exempel på Björnö och Nåttarö där vi är stolta över våra snorkelleder."; "Snorkelleden på Björnö är öppen för säsongen (2026)."; "Snorkelleden på Nåttarö är öppen för säsongen (2026)." samt https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Här kan du vandra, klättra, bada, snorkla"
      { q: "Var kan man snorkla i Stockholm?", a: "Skärgårdsstiftelsen har skyltade snorkelleder på Nåttarö, vid ångbåtsbryggan, och på Björnö vid Torpesand. Båda är öppna för säsongen 2026 enligt Skärgårdsstiftelsen. Utan skyltad led kan du också snorkla i Nämdöskärgårdens nationalpark." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/snorkelleder/ — "De skyltade undervattenslederna är ca 200 meter långa och går som mest på tre meters djup." samt https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Invid ångbåtsbryggan finns en snorkelled som markeras på vattenytan av gula bojor, under ytan befinns skyltar som berättar om livet i vattnet."
      { q: "Hur djup och lång är snorkelleden på Nåttarö?", a: "Skärgårdsstiftelsens undervattensleder är ungefär 200 meter långa och går som mest på tre meters djup. På Nåttarö är leden markerad med gula bojar och har skyltar under ytan." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/bjorno/ — "Det går även buss från Slussen till hållplats Björnö naturreservat, varifrån det är promenadavstånd till området." samt https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bjorno.html — "Parkeringen är avgiftsbelagd."
      { q: "Hur tar man sig till snorkelleden på Björnö?", a: "Det går buss från Slussen till Björnö naturreservat på Ingarö, och därifrån kan du promenera. Med bil finns avgiftsbelagd parkering vid entrén. Leden ligger vid Torpesand." },
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/snorkelleder/ — "Upptäck spännande arter som havsnålar, tångräkor, sjustråliga smörbultar med flera." samt https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Nåttarö är också ett av länets första marina naturreservat, med grunda vikar och en artrik undervattensvegetation."
      { q: "Vad kan man se när man snorklar i Stockholms skärgård?", a: "Längs Skärgårdsstiftelsens leder berättar skyltar under ytan om arter som havsnålar, tångräkor och sjustråliga smörbultar. Nåttarö är ett av länets första marina naturreservat, med grunda vikar och artrik undervattensvegetation." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/oceanografi/haven-runt-sverige/temperatur-i-havet — "Temperaturen inomskärs och längs grunda stränder är oftast högre än längre ut till havs."; "Från en dag till en annan kan badtemperaturen en sommardag gå från att kännas varm och behaglig till att kännas iskall."
      { q: "Hur kallt är vattnet när man snorklar i skärgården?", a: "Det varierar. SMHI skriver att vattnet inomskärs och längs grunda stränder oftast är varmare än längre ut, men att uppvällning – oftast när det blåser från land – kan göra vattnet iskallt från en dag till nästa. Kolla temperaturen innan du ger dig ut." },
    ],
  },
  {
    slug: "vinter-oland-2026",
    title: "Öland på vintern 2026 – havsörn, alvar och vinterutflykter",
    excerpt: "Öland på vintern: här ser du havsörn vid Ottenby, vandrar i Trollskogen och på alvaret, kallbadar och besöker fornborgar. Så tar du dig dit utan cykelfärja.",
    category: "Säsong", emoji: "❄", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.oland.se/olandstips/vinteraktiviteter — "Spana efter havsörn i Ottenby"; https://www.oland.se/vinterutflykter — "är alltid öppen för besökare"; https://www.oland.se/skridskoakning-pa-alvaret — "På alvaret samlas det vatten här och var vid små"
      { q: "Vad kan man göra på Öland på vintern?", a: "Spana efter havsörn vid Ottenby, vandra i Trollskogen eller på Stora alvaret, besöka Gråborg som alltid är öppen, kallbada i Borgholm eller Färjestaden och åka skridskor på alvarets mossar när det fryser." },
      // KÄLLA: https://naturumottenby.se/besokstips/ — "På vintern är havsörnarna särskilt talrika."; https://naturumottenby.se/aktiviteter/skadarskola-vinterfaglar-pa-udden/ — "Havsörnarna sitter ute på Västrevet och sångsvanar simmar i viken."
      { q: "Var ser man havsörn på Öland?", a: "Vid Ölands södra udde i Ottenby. Naturum Ottenby skriver att havsörnarna är särskilt talrika där på vintern, och i början av december sitter de ute på Västrevet." },
      // KÄLLA: https://www.oland.se/sasong/vinter — "Öland är inte stängt. Bara lite lugnare!"; https://naturumottenby.se/besokstips/ — "Fågeltornet är en bra plats för en utflykt året om."; https://www.ottenby.se/ — "är öppen för besök under vår, sommar och höst"
      { q: "Är Öland öppet på vintern?", a: "Ja. Oland.se skriver att ön inte är stängd utan bara lugnare. Naturen, fornborgarna och fågeltornet i Ottenby lund kan du besöka året runt, men Borgholms slott, naturum Ottenby och Långe Jan har säsongsöppet." },
      // KÄLLA: https://www.oland.se/resa/cykelfarjan — "Från mitten av juni till mitten av augusti"; https://www.oland.se/resa/cykelfarjan — "Eftersom det råder cykel- och gångförbud på Ölandsbron"; https://www.silverlinjen.se/ — "tur och retur året runt"
      { q: "Hur tar man sig till Öland på vintern?", a: "Med bil eller buss över Ölandsbron från Kalmar. Cykelfärjan Dessi går bara från mitten av juni till mitten av augusti, och på bron är det förbjudet att gå och cykla. Direktbuss mellan Stockholm och Öland går året runt." },
      // KÄLLA: https://www.borgholmsslott.se/oppettider/ — "1 oktober – 1 november: Dagligen kl. 10-16"; https://www.oland.se/vinterutflykter — "Passa på att gå runt den ståtliga ruinen och speja ut över Kalmarsund."
      { q: "Är Borgholms slott öppet på vintern?", a: "Nej. Enligt slottets egen sida är säsongen 2026 öppen till och med 1 november. Oland.se tipsar om en vinterpromenad förbi ruinen från Borgholms hamn." },
      // KÄLLA: https://www.oland.se/kallbada-i-vinter — "Sjöstugan i Borgholm."; https://www.oland.se/kallbada-i-vinter — "Färjestadens hamn."; https://www.oland.se/kallbada-i-vinter — "Bada aldrig ensam!"
      { q: "Var kan man kallbada på Öland?", a: "Oland.se tipsar om Sjöstugan och Kallbadhuset i Borgholm, Färjestadens hamn och Kalvhagens badplats. Bada aldrig ensam." },
    ],
  },
  {
    slug: "skridskor-havet",
    title: "Långfärdsskridskor i Nacka och skridskor på havet",
    excerpt: "Långfärdsskridskor i Nacka: kommunens plogade sjöbanor och israpport. Plus skridskor på havet – hur tjock isen ska vara, israpporter och säkerhetsutrustning.",
    category: "Aktivitet", emoji: "⛸", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.nacka.se/uppleva--gora/friluftsliv-motion/trana-i-naturen/skridskoakning-pa-sjoisar-och-israpport/ — "Plogningen sker i samband med våra veckovisa ismätningar och endast när förutsättningarna är bra."; https://www.nacka.se/uppleva--gora/friluftsliv-motion/trana-i-naturen/skridskoakning-pa-sjoisar-och-israpport/ — "Vilka sjöar som har plogats hittar du i listan med aktuell istjocklek"; https://www.nacka.se/uppleva--gora/friluftsliv-motion/trana-i-naturen/skridskoakning-pa-sjoisar-och-israpport/ — "En plogad bana betyder inte att isen är säker överallt."
      { q: "Var kan man åka långfärdsskridskor i Nacka?", a: "Nacka kommun mäter isen varje vecka och plogar skridskobanor på sjöar när isen är tillräckligt tjock. Vilka sjöar som är plogade står i kommunens israpport, till exempel Järlasjön, Sicklasjön och Ältasjön. En plogad bana betyder inte att isen är säker överallt." },
      // KÄLLA: https://www.nacka.se/uppleva--gora/friluftsliv-motion/trana-i-naturen/skridskoakning-pa-sjoisar-och-israpport/ — "För saltvatten ska isen vara minst 15 centimeter tjock."; https://www.sjoraddning.se/artiklar/om-is-och-dess-svagheter — "En fem cm tjock is kan vara starkare än en is som är två dm tjock."; https://www.sjoraddning.se/artiklar/om-is-och-dess-svagheter — "Generellt sett är isen svagare i skärgårdar och hav än de är i insjöar."
      { q: "Hur tjock ska isen vara för skridskor på havet?", a: "Nacka kommun anger minst 15 centimeter för saltvatten och minst 10 centimeter för insjöar. Sjöräddningssällskapet påpekar att kvaliteten spelar lika stor roll som tjockleken, och att isen är svagare i skärgårdar och hav än i insjöar." },
      // KÄLLA: https://www.skridsko.net/ — "För att få tillgång till allt detta behöver du vara medlem i en förening eller klubb ansluten till Skridskonätet."; https://www.nacka.se/uppleva--gora/friluftsliv-motion/trana-i-naturen/skridskoakning-pa-sjoisar-och-israpport/ — "Isen mäts på de sjöar där vi har möjlighet att erbjuda plogade skridskobanor om isen är tillräckligt tjock."
      { q: "Var hittar man israpporter för långfärdsskridskor?", a: "Skridskonätet ger medlemmar i anslutna skridskoklubbar dagsaktuell isinformation och färdrapporter. För Nackas sjöar publicerar kommunen en israpport under säsongen." },
      // KÄLLA: https://www.skridsko.net/sakerhet/ — "Under en skridskotur på naturis ska man vara minst tre personer, inte färre, gärna fler."; https://www.sjoraddning.se/artiklar/ratt-utrustning-pa-isen — "Ryggsäcken ska ha midjerem och grenband för att minska risken att den åker upp utan att lyfta dig."; https://www.sjoraddning.se/artiklar/saker-pa-isen — "I isdubbarna ska det sitta en visselpipa av plast"
      { q: "Vilken utrustning behöver man för långfärdsskridskor på havsis?", a: "Ispik, isdubbar med visselpipa, räddningslina, flythjälp (till exempel ryggsäck med midjerem och grenband), mobiltelefon i vattentätt fodral och ett torrt ombyte. Åk minst tre personer." },
      // KÄLLA: https://www.sjoraddning.se/artiklar/sa-gor-du-om-isen-brister — "Du vill försöka komma upp från det hållet som du kom ifrån."; https://www.sjoraddning.se/artiklar/sa-gor-du-om-isen-brister — "Ropa, använd visselpipan eller ring 112 för att påkalla hjälp"; https://www.sjoraddning.se/artiklar/sa-gor-du-om-isen-brister — "Åla dig istället bort från det svaga området."
      { q: "Vad gör man om man går igenom isen?", a: "Vänd dig mot hållet du kom ifrån, påkalla hjälp med visselpipan eller ring 112, ta loss isdubbarna och åla dig upp. Res dig inte direkt utan åla bort från det svaga området." },
    ],
  },
  {
    slug: "julmarknad-havet",
    title: "Fira jul i skärgården – julmarknader och julbord vid havet",
    excerpt: "Fira jul i skärgården och vid kusten 2026: julmarknader i Marstrand, Vaxholm och Visby med datum från arrangörerna, plus julbord och julafton på öarna.",
    category: "Säsong", emoji: "🎄", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.sandhamn.com/sv/kalender/julafton — "Fira Julafton med oss"; https://www.sandhamn.com/sv/kalender/julafton — "Och dagen därpå fortsätter firandet med vår traditionella kalkonmiddag"; https://www.rokeriet-fjaderholmarna.se/julbord — "Julbordet hålls från 20 november till 20 december 2026"; https://carlsten.se/julbord/ — "Välkommen på Julbord på Carlstens Fästning 2026"
      { q: "Hur kan man fira jul i skärgården?", a: "Sandhamn Seglarhotell har julbord på julafton och kalkonmiddag på juldagen 2026. Flera krogar på öarna har också julbord i november och december, bland annat Rökeriet på Fjäderholmarna och Carlstens fästning på Marstrand." },
      // KÄLLA: https://marstrandsmarknad.com/ — "JULMARKNAD · 28–29 NOVEMBER 2026"; https://marstrandsmarknad.com/ — "Inomhus i Strandverkets varma, historiska miljö"
      { q: "När är Marstrands julmarknad 2026?", a: "Den 28–29 november 2026, inomhus i Strandverket på Marstrandsön. Du tar Marstrandsfärjan från Koön." },
      // KÄLLA: https://www.destinationvaxholm.se/anmalan — "Datum: Lördag 5 dec och söndag 6 dec 2026"; https://www.destinationvaxholm.se/anmalan — "Julmarknaden hålls kring Rådhustorget i den gamla stadskärnan."
      { q: "När är Vaxholms julmarknad 2026?", a: "Lördag 5 och söndag 6 december 2026, kring Rådhustorget i Vaxholms gamla stadskärna. Destination Vaxholm arrangerar." },
      // KÄLLA: https://marstrandsmarknad.com/ — "JULMARKNAD · 28–29 NOVEMBER 2026"; https://www.destinationvaxholm.se/anmalan — "Datum: Lördag 5 dec och söndag 6 dec 2026"; https://www.medeltidsveckan.se/en/medieval-jule-christmas/ — "Welcome to a historic Yule atmosphere in the St. Nicolai ruin 4-6 December 2026."
      { q: "Vilka julmarknader finns vid havet 2026?", a: "Arrangörerna har publicerat datum för Marstrands julmarknad (28–29 november), Vaxholms julmarknad (5–6 december) och Medeltida jul i S:t Nicolai ruin i Visby (4–6 december)." },
      // KÄLLA: https://www.sandhamn.com/sv/jullov-julmarknad — "Program, datum och mer information publiceras här så snart allt är på plats."
      { q: "Finns det julmarknad på Sandhamn 2026?", a: "Sandhamn Seglarhotell planerar en julmarknad, men datumet för 2026 var inte publicerat när vi läste deras sida. Det kommer på hotellets webbplats." },
    ],
  },
  { slug: "fjallalternativet-kust", title: "Skippa skidorna – kust istället för fjäll i vinter", excerpt: "Inte alla gillar skidliftar och pistjackor. Här är vad Sveriges kust erbjuder som vinteralternativ till fjällen – och varför det kan vara ett bättre val.", category: "Praktisk", emoji: "🌊", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad gör kusten till ett bra vinteralternativ till fjällen?', a: 'Havsluft, vinterbastur, ostron (säsong okt–feb i Bohuslän), vintervandring och ett mycket lägre pris än fjällresorten. Bohuslän på vintern är storslaget och nästan tomt på turister.' }, { q: 'Vilken kust passar bäst som vinteralternativ?', a: 'Bohuslän: ostron, vinterbastur och klippor. Gotland: medeltidsatmosfär utan folkliv. Öland: alvarlandskapet i snö. Alla tre är dramatiskt annorlunda från sommarens turistrusch.' }] },
  { slug: "ekologisk-semester-skargard", title: "Hållbar semester i skärgården – eko-tips och råd", excerpt: "Skärgårdsresan kan göras med minimalt klimatavtryck. Kollektivt, tält, lokala producenter och naturskydd – en guide till hållbart skärgårdsresande.", category: "Praktisk", emoji: "🌿", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur gör man en hållbar skärgårdsresa?', a: 'Åk kollektivt (Waxholmsbolaget, SL-buss till kust), tälta med allemansrätt, handla lokalt hos öfiskare och gårdsbutiker, undvik engångsplast och följ båt- och bryggregler.' }, { q: 'Vilka delar av skärgårdslivet belastar miljön mest?', a: 'Motorbåt med bensin är störst. Elskoter och elmotor minskar påverkan. Undvik naturreservat under häckningssäsongen — perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti. Sätt inte upp tält i fågelskyddsområden.' }] },
  {
    slug: "skargard-med-husbil",
    title: "Skärgård med husbil – ställplatser, övernattning och regler",
    excerpt: "Får man övernatta med husbil i skärgården? Om allemansrätten, rastplatser, tömning, vägfärjor och var Bohuslän, Öland, Gotland och Höga Kusten har ställplatser.",
    category: "Praktisk", emoji: "🚐", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/husvagn-husbil-och-taktalt-i-naturen/ — "Du får inte heller parkera eller ställa upp en husbil, husvagn eller en bil med taktält i naturen så som i skog, på stränder, i hagar, parker eller på gräsmattor."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/husvagn-husbil-och-taktalt-i-naturen/ — "Om du övernattar på en rastplats får du i regel stå där i högst 24 timmar på vardagar."; https://www.oland.se/boende/stallplats-och-parkering — "För dig som reser med husbil på Öland finns här ställplatser och parkeringar för både dags- och nattparkering."
      { q: "Får man övernatta med husbil i skärgården?", a: "Ja, på campingar, ställplatser och parkeringar för nattparkering, och i regel högst 24 timmar på en rastplats. Du får däremot inte ställa upp husbilen i naturen, till exempel i skog, på stränder eller på gräsmattor." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/husvagn-husbil-och-taktalt-i-naturen/ — "Att köra motorfordon i naturen ingår inte i allemansrätten."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/husvagn-husbil-och-taktalt-i-naturen/ — "Det betyder att en markägare inte kan ge någon annan tillstånd att köra eller parkera i terrängen."
      { q: "Får man ställa husbilen var man vill med allemansrätten?", a: "Nej. Att köra motorfordon i naturen ingår inte i allemansrätten, och du får inte ställa upp en husbil i skog, på stränder, i hagar, parker eller på gräsmattor. Inte ens markägaren kan ge lov att parkera i terrängen." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/husvagn-husbil-och-taktalt-i-naturen/ — "Om du övernattar på en rastplats får du i regel stå där i högst 24 timmar på vardagar. På helger och helgdagar kan du stanna till nästa vardag, om inget annat anges på en skylt vid platsen."
      { q: "Hur länge får man stå med husbil på en rastplats?", a: "I regel högst 24 timmar på vardagar. På helger och helgdagar får du stanna till nästa vardag, om inte en skylt anger något annat. Kommunen kan ha egna regler." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/vag/rastplatser/ — "De anläggningar som finns är bara avsedda för lösa latriner. På större campingplatser och på en del bensinmackar går det att tömma fasta latriner."; https://www.trafikverket.se/resa-och-trafik/vag/rastplatser/ — "Nej, gråvatten kan du inte tömma alls, det får inte tömmas i dagvattenbrunnar eller blandas med latrintömning."
      { q: "Var kan man tömma toa och gråvatten från husbilen?", a: "Lösa latriner kan tömmas på de rastplatser som har latrintömning. Fasta latriner kan tömmas på större campingplatser och på en del bensinmackar. Gråvatten får inte tömmas på rastplatser eller i dagvattenbrunnar." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/trafiksakerhet/sakerhet-pa-vagfarja/tips-till-dig-som-ska-aka-vagfarja/ — "Tyngre fordon som exempelvis husbilar, husvagnar, bilar med släp och bussar placeras i mittfilerna."; https://www.trafikverket.se/resa-och-trafik/trafiksakerhet/sakerhet-pa-vagfarja/tips-till-dig-som-ska-aka-vagfarja/ — "Att åka med våra vägfärjor är avgiftsfritt med undantag för Ekeröleden och Visingsöleden."
      { q: "Kan man ta husbilen med vägfärjan ut i skärgården?", a: "Ja. Trafikverkets vägfärjor tar husbilar, som placeras i mittfilerna. Resan är avgiftsfri på alla leder utom Ekeröleden och Visingsöleden. På sommaren kan det bli köer." },
      // KÄLLA: https://www.destinationgotland.se/priser-bokningsinfo/biljettyper-och-rabatter/ — "Alla+husbil är ett paketpris för upp till fem personer och en husbil. Paketet betalas vid bokning och kan inte ombokas eller återbetalas."; https://www.destinationgotland.se/allt-om-resan/infor-resan/ — "Gasol får endast medföras i fordon som är besiktigade och godkända för detta."; https://gotland.se/trafik-gator-och-parker/parkera-och-ladda/husbil-stallplatser-terrangkorning — "På dessa platser är det tillåtet att övernatta, men det finns ingen annan service."
      { q: "Kan man ta med husbilen till Gotland?", a: "Ja, med Destination Gotlands färja. Biljetten Alla+husbil gäller upp till fem personer och en husbil och kan inte ombokas eller återbetalas. Gasol får bara följa med i fordon som är besiktigade och godkända för det. I Visby har Region Gotland ställplatser där man får övernatta." },
    ],
  },
  {
    slug: "hundstrand-sverige",
    title: "Hundvänliga badplatser och hundstrand – regler och hundbad",
    excerpt: "Hundvänliga badplatser och hundstrand i Stockholm, Göteborg, Malmö, Skåne, Öland och Gotland: var hunden får bada och när det är hundförbud på stranden.",
    category: "Praktisk", emoji: "🐕", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.halmstad.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserstranderochaventyrsbad/hundarochhastarpastranden.n1185.html — "Hundar är välkomna till alla stränder som inte är officiella badplatser."
      { q: "Vilka stränder får man ha hund på?", a: "Oftast på stränder som inte är kommunala badplatser, och på kommunernas särskilda hundbad. Halmstad skriver till exempel att hundar är välkomna till alla stränder som inte är officiella badplatser. Kolla skyltningen och kommunens regler." },
      // KÄLLA: https://parker.stockholm/hundrastplatser/ — "Det finns undantag, till exempel på Långholmens klippbad är hundar välkomna året runt."; https://www.visitstockholm.com/guides/dog-friendly-stockholm-a-guide-for-you-and-your-dog/ — "designated dog beach where dogs are allowed to swim"
      { q: "Var finns hundbad i Stockholm?", a: "På Långholmens klippbad är hundar välkomna året runt, trots stadens hundförbud på badplatser på sommaren. Söder om stan har Gålö havsbad en särskild hundstrand enligt Visit Stockholm." },
      // KÄLLA: https://parker.stockholm/hundrastplatser/ — "Hundar får inte vistas på badplatser på sommaren, under perioden 1 juni–31 augusti."; https://malmo.se/Bo-och-leva/Stadsmiljo-och-trafik/Regler-pa-offentliga-platser/Hundrastning.html — "Hundar får inte vistas på stränder, badplatser och bassängbad den 15 mars–30 september."; https://www.morbylanga.se/samhallsplanering-trafik/gator-och-kommunala-platser/hundrastgard-och-hundbad/ — "Hundar får inte vistas på kommunens allmänna badplatser under perioden 15 maj – 31 augusti."
      { q: "När är det hundförbud på stranden?", a: "Det bestämmer varje kommun. I Stockholm gäller hundförbud på badplatserna 1 juni–31 augusti, i Malmö 15 mars–30 september och på södra Öland (Mörbylånga) 15 maj–31 augusti." },
      // KÄLLA: https://goteborg.se/wps/portal/start/uppleva-och-gora/parker-och-lekplatser/for-dig-som-ar-hundagare/regler-for-hundagare — "Hunden får gärna bada men ska då vara kopplad."; https://goteborg.se/wps/portal/start/uppleva-och-gora/parker-och-lekplatser/for-dig-som-ar-hundagare/regler-for-hundagare — "På de här badplatserna är det hundförbud mellan 1 maj och 15 september:"
      { q: "Får hunden bada på badplatser i Göteborg?", a: "Ja, på de flesta kommunala badplatser, men hunden ska vara kopplad. På sju badplatser, bland annat Askimsbadet och Hovåsbadet, är det hundförbud 1 maj–15 september." },
      // KÄLLA: https://malmo.se/Bo-och-leva/Stadsmiljo-och-trafik/Regler-pa-offentliga-platser/Hundrastning.html — "Vill du ta med hunden till en strand finns Ribersborgs hundbadplats. Det finns även två hundrastplatser på Ribersborgsstranden (Ribersborg och Hylliekrok) samt en på Lernacken."
      { q: "Finns det hundstrand i Malmö?", a: "Ja. Ribersborgs hundbadplats är till för hundar, och det finns hundrastplatser på Ribersborgsstranden (Ribersborg och Hylliekrok) och på Lernacken." },
      // KÄLLA: https://jordbruksverket.se/djur/hundar-katter-och-smadjur/hundar/sa-skoter-du-din-hund — "Mellan den 1 mars och den 20 augusti får hundar inte springa lösa där det kan finnas vilda djur."; https://gotland.se/bygga-bo-och-miljo/djur-och-husdjur/hund — "Hundar skall alltid hållas kopplade på regionens badplatser - året om."
      { q: "Måste hunden vara kopplad på stranden?", a: "Mellan 1 mars och 20 augusti får hundar inte springa lösa där det kan finnas vilda djur, vilket enligt Naturvårdsverket i de flesta fall betyder koppel. Många kommuner, till exempel Göteborg och Region Gotland, kräver dessutom koppel på badplatserna året om." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "hyra-husbil-gotland",
    title: "Hyra husbil på Gotland och i Visby – färjepris och ställplatser",
    excerpt: "Hyra husbil på Gotland eller ta med egen: pris för husbil på Gotlandsfärjan, uthyrare, ställplatser i Visby och Region Gotlands regler för övernattning.",
    category: "Transport", emoji: "🚐", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.destinationgotland.se/priser-bokningsinfo/biljettyper-och-rabatter/ — "5 personer + personbil/husbil 6-9 m 1350 kr"
      { q: "Vad kostar det att ta husbil på färjan till Gotland?", a: "Enligt Destination Gotlands prislista (läst 2026-09-26) kostar paketet för upp till fem personer och husbil från 1 250 kr (under 6 meter), 1 350 kr (6–9 meter) eller 1 450 kr (över 9 meter) per enkel resa vid bokning på webben. Frånpriserna gäller utvalda avgångar, och priset sätts dynamiskt efter efterfrågan." },
      // KÄLLA: https://www.petesekogard.se/turer-1 — "Välkommen att hyra vår husbil, uthyrs vår, sommar och höst"
      { q: "Kan man hyra husbil i Visby?", a: "Vi har inte hittat någon uthyrare med egen webbplats som hyr ut husbilar från Visby. Petes Ekogård i Hablingbo skriver att gården hyr ut en husbil, men bokningsannonsen var avpublicerad 2026-09-26, så ring gården först. Ett alternativ är att hyra på fastlandet, till exempel hos Bilcenter Oskarshamn, och ta färjan från Oskarshamn." },
      // KÄLLA: https://www.destinationgotland.se/priser-bokningsinfo/biljettyper-och-rabatter/ — "5 personer + personbil under 6 m och husvagn 1500 kr"
      { q: "Kan man hyra husvagn på Gotland?", a: "Vi har inte hittat någon uthyrare med egen webbplats som hyr ut husvagnar på Gotland. Tar du med egen husvagn kostar färjepaketet för upp till fem personer, personbil under 6 meter och husvagn från 1 500 kr per enkel resa vid bokning på webben (läst 2026-09-26)." },
      // KÄLLA: https://gotland.se/trafik-gator-och-parker/parkera-och-ladda/husbil-stallplatser-terrangkorning — "Att parkera en husbil på en parkeringsplats under natten är tillåtet, förutsatt att de specifika reglerna för den aktuella parkeringsplatsen följs."
      { q: "Får man övernatta i husbil var som helst på Gotland?", a: "Nej. Enligt Region Gotlands ordningsföreskrifter får man inte campa i husbil på offentlig plats, till exempel allmänna vägar, gator och parker. Det är däremot tillåtet att parkera husbilen på en parkeringsplats under natten, om platsens regler följs. I Visby och vid vissa badplatser är camping förbjuden." },
      // KÄLLA: https://gotland.se/trafik-gator-och-parker/parkera-och-ladda/husbil-stallplatser-terrangkorning — "Slamtömning och färskvatten finns på Färjeleden vid reningsverket."
      { q: "Var kan man tömma latrin och fylla vatten på Gotland?", a: "Region Gotland har slamtömning och färskvatten vid reningsverket på Färjeleden i Visby. Flera campingar har också latrintömning, till exempel Tofta Camping och Sudersand Resort." },
      // KÄLLA: https://www.destinationgotland.se/priser-bokningsinfo/biljettyper-och-rabatter/ — "5 personer + husbil över 9 m"
      { q: "Hur bokar man husbil på Gotlandsfärjan?", a: "Destination Gotland delar in husbilar efter längd: under 6 meter, 6–9 meter och över 9 meter. Gasol får bara finnas i fordon som är besiktigade och godkända för det, och huvudventilen ska vara avstängd under överfarten." },
    ],
  },
  {
    slug: "aspo-sturko-guide",
    title: "Sturkö och Aspö – Aspöfärjan, bron och öarna utanför Karlskrona",
    excerpt: "Sturkö och Aspö i Karlskronas skärgård: Aspöfärjan är gratis och tar 25 minuter, Sturkö nås via bro. Här är kastellet, bad, cykelleder och båttrafiken.",
    category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Färjeledens längd är 6700 meter och överfartstiden är cirka 25 minuter. Resan med vägfärjan är avgiftsfri."; https://www.visitkarlskrona.se/en/node/1111 — "The archipelago boat also operates in Aspö during the summer."
      { q: "Hur tar man sig till Aspö?", a: "Med Trafikverkets vägfärja Aspöleden från Karlskrona. Överfarten tar cirka 25 minuter och är avgiftsfri. På sommaren trafikerar även skärgårdsbåten Aspö." },
      // KÄLLA: https://www.visitkarlskrona.se/en/experience/karlskrona-archipelago — "If you want to visit the island Aspö, you do it easily with a free road ferry from Handelshamnen."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation."
      { q: "Var går Aspöfärjan från i Karlskrona?", a: "Från Handelshamnen i Karlskrona. Tidtabellen finns på Trafikverkets sida om Aspöleden och i appen Trafikinfo Färjerederiet." },
      // KÄLLA: https://www.visitblekinge.se/en/karlskrona/sturko — "Sturkö sits 15 kilometres south-east of Karlskrona town centre, reached via Sturkövägen – a permanent road bridge running across the islands of Senoren and Skällö."; https://www.blekingetrafiken.se/reseinformation/skargardstrafik/ — "Från Handelshamnen finns båtpendel året runt till Hasslö, Sturkö och Trummenäs."
      { q: "Behöver man ta färja till Sturkö?", a: "Nej. Sturkö ligger 15 km sydost om Karlskrona centrum och nås via Sturkövägen, som går på fasta broar över Senoren och Skällö. Blekingetrafiken kör också båtpendel året runt från Handelshamnen." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Aspöleden går mellan Karlskrona och Aspö i Karlskrona skärgård."; https://www.blekingetrafiken.se/reseinformation/skargardstrafik/ — "Mellan Nogersund och Hanö finns skärgårdstrafik året runt."
      { q: "Vilken ö i Blekinge nås med färja?", a: "Aspö nås med Trafikverkets vägfärja från Karlskrona. Hanö nås med M/F Vitaskär från Nogersund året runt, och flera öar i Karlskronas, Ronnebys och Karlshamns skärgårdar har båttrafik under säsong." },
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/blekinge-lan/drottningskars-kastell/ — "Kastellet är en välbevarad fästning från 1600-talet med fyra bastioner som döpts efter svenska drottningar."; https://www.karlskrona.se/hitta-verksamheter/badplatser/aspo-havsbad/ — "Långgrund sandstrand i skärgårdsmiljö."
      { q: "Vad finns att se på Aspö?", a: "Drottningskärs kastell från 1600-talet, som ingår i världsarvet, Museum för rörligt kustartilleri, Aspö kyrka och Aspö havsbad med långgrund sandstrand." },
      // KÄLLA: https://www.karlskrona.se/hitta-verksamheter/badplatser/sturko/ — "Långgrunt i kustbandet."; https://www.visitkarlskrona.se/en/caferunda-pa-sturko-blekinges-storsta-o — "The beach at Stensvik, however, is maintained by a nonprofit association"
      { q: "Var kan man bada på Sturkö?", a: "Vid Sturkö badplats vid campingen, som är långgrund och har lekplats och grillplats, och vid Stensvik, som sköts av en ideell förening. Övriga stränder i söder städas inte." },
    ],
  },
  { slug: "trysunda-guide", title: "Trysunda – Höga Kustens pärla", excerpt: "Trysunda är en av Höga Kustens mest kända öar med ett av Sveriges bäst bevarade fiskelägen. En guide till ön och hur du tar dig dit.", category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Trysunda?', a: 'Reguljär färja från Barsta eller Docksta sommartid. Privatbåt är vanligt. Ön är bilfri – allt transporteras till hands eller med kärra. Kontrollera Höga Kustens båttidtabell.' }, { q: 'Vad är Trysunda känt för?', a: 'Det unika fiskeläget med röda och gula stugor från 1700–1800-talet, den lilla kapellet och den vilda naturen. En av Höga Kustens mest fotograferade platser.' }] },
  {
    slug: "skafto-guide",
    title: "Skaftö – Fiskebäckskil, Grundsund, karta och vad du kan göra",
    excerpt: "Var ligger Skaftö och vad kan man göra där? Om båten från Lysekil, Fiskebäckskil och Grundsund, besökskartan, Kuststigen, bad och leder på ön.",
    category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto/ — "The idyllic island of Skaftö, part of Lysekil municipality, has a varied coastal landscape"; "There are five villages on Skaftö"; https://www.vastsverige.com/lysekil/produkter/skafto-grundsund/ — "Den charmiga kustpärlan Grundsund ligger längst västerut på Skaftö, mellan Orust och Lysekil i mellersta Bohuslän."
      { q: "Var ligger Skaftö?", a: "Skaftö hör till Lysekils kommun och ligger i ytterkanten av Bohusläns skärgård, strax utanför Lysekil. Grundsund ligger längst västerut på ön, mellan Orust och Lysekil. På ön finns fem samhällen: Fiskebäckskil, Östersidan, Stockevik, Grundsund och Rågårdsvik." },
      // KÄLLA: https://www.vastsverige.com/lysekil/leder/skafto-kuststigen/ — "Västtrafiks personfärja Carl Wilhelmsson (linje 847) från Lysekil lägger till både på Östersidan och Fiskebäckskil."; "Västtrafiks buss (linje 845) kör ut på hela Skaftö med hållplatser längs vägen."
      { q: "Hur tar man sig till Skaftö utan bil?", a: "Västtrafiks passagerarfärja linje 847 går från Lysekil till Östersidan och Fiskebäckskil. På ön kör Västtrafiks buss linje 845 med hållplatser över hela Skaftö." },
      // KÄLLA: https://www.vastsverige.com/skafto/se--gora/upplev-havet/ — "Segeltur, fisketur, hummer- kräft- och sälsafaris, guidade båtturer eller hyra egen båt."; https://www.vastsverige.com/lysekil/produkter/skafto-grundsund/ — "Här finns yrkesfiskare där du kan köpa färsk fisk, räkor och krabbor direkt från båtarna."
      { q: "Vad kan man göra på Skaftö?", a: "Vandra och cykla på Kuststigen och de mindre lederna, bada vid kommunens badplatser, köpa fisk och skaldjur direkt från båtarna i Grundsund, eller åka på segeltur, fisketur eller sälsafari. Destination Skaftö listar arrangörerna." },
      // KÄLLA: https://www.vastsverige.com/skafto/ — "Vår besökskarta med vandringsleder och cykelvägar"
      { q: "Finns det en karta över Skaftö?", a: "Ja. Destination Skaftö har en besökskarta med vandringsleder och cykelvägar, som pdf på sin sida hos Västsverige. Kartan visar samhällena, färjan mot Lysekil, Kuststigen och de mindre lederna." },
      // KÄLLA: https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser.html — "Badplatserna börjar driftsättas i mitten av maj och stängs i slutet av augusti."; https://www.vastsverige.com/lysekil/produkter/skafto-fiskebackskil/ — "Under varma sommardagar är den långgrunda stranden i Bökevik en populär plats för svalkande bad, sand mellan tårna"
      { q: "Var kan man bada på Skaftö?", a: "Lysekils kommun har badplatser på Skaftö, bland annat Rågårdsvik och Bökevik, som har vinterstegar. Badplatserna driftsätts från mitten av maj och stängs i slutet av augusti. Bökevik i Fiskebäckskil är en långgrund sandstrand." },
      // KÄLLA: https://www.vastsverige.com/lysekil/leder/skafto-kuststigen/ — "Fiskebäckskil-Grundsund 6,8 km"; "Vandringsleden Kuststigen  är enhetligt markerad med blå färgmarkering på stolpar."
      { q: "Hur långt är det att gå mellan Fiskebäckskil och Grundsund?", a: "Kuststigens delsträcka Fiskebäckskil–Grundsund är 6,8 km. Leden är markerad med blå färg på stolpar." },
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/skafto-grundsund/ — "Större delen av den omåttligt populära TV-serien Saltön spelades in på Skaftö och då framför allt i Grundsund."
      { q: "Var spelades Saltön in?", a: "Stora delar av TV-serien Saltön spelades in på Skaftö, framför allt i Grundsund." },
    ],
  },
  {
    slug: "holmon-guide",
    title: "Umeå skärgård: Holmön, ön utanför Umeå – färja och tidtabell",
    excerpt: "Holmön är huvudön i Umeå skärgård, en mil ut i Kvarken. Så åker du gratisfärjan från Norrfjärden, hittar tidtabellen för Holmön och vad du gör på ön.",
    category: "Region", emoji: "🏝", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/naturomradenfriluftsomraden/holmon.4.27a2de8b172da059ace20f5.html — "Andra stora öar är Ängesön, Grossgrunden, Holmögadd och Lilla och Stora Fjäderägg."; https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/naturomradenfriluftsomraden/norrbyskar.4.1b4d24fb1752122eb842ae3.html — "Norrbyskär är en ögrupp i Västerbottens skärgård, cirka fyra mil söder om Umeå."
      { q: "Vilka öar finns i Umeå skärgård?", a: "I norr ligger Holmöarna med huvudön Holmön och öarna Ängesön, Grossgrunden, Holmögadd och Lilla och Stora Fjäderägg. Cirka fyra mil söder om Umeå ligger ögruppen Norrbyskär, dit färjan går från Norrbyn." },
      // KÄLLA: https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/naturomradenfriluftsomraden/holmon.4.27a2de8b172da059ace20f5.html — "Holmön är huvudön i ögruppen Holmöarna, belägen en mil ut i havet i norra Kvarken."; https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/naturomradenfriluftsomraden/holmon.4.27a2de8b172da059ace20f5.html — "Idag är Holmön den enda ön i Västerbotten med en året runt-befolkning."
      { q: "Vilken ö ligger utanför Umeå?", a: "Holmön ligger en mil ut i havet i norra Kvarken, norr om Umeå. Det är den enda ön i Västerbotten där det bor folk året runt, och du når den med Trafikverkets gratisfärja från Norrfjärden." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/holmoleden/ — "Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation."; https://www.trafikverket.se/resa-och-trafik/farjetrafik/holmoleden/ — "Tidtabellen kan tillfälligt ändras på grund av väderlek, vattenstånd och korsande sjötrafik."
      { q: "Var hittar jag tidtabell för Holmön?", a: "Tidtabellen för Holmöleden finns på Trafikverkets sida för leden och i appen Trafikinfo Färjerederiet. Vissa turer är kallelseturer som du beställer i appen eller via talsvar. Kolla tidtabellen samma dag, eftersom den kan ändras tillfälligt på grund av väder och vattenstånd." },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/holmoleden/ — "Färjeledens längd är 10000 meter och överfartstiden är 45 minuter. Resan med vägfärjan är avgiftsfri."; https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/naturomradenfriluftsomraden/holmon.4.27a2de8b172da059ace20f5.html — "Busshållplatsen vid färjeläget heter Norrfjärden (Norrfjärden, Umeå)."
      { q: "Hur tar man sig till Holmön?", a: "Med Trafikverkets vägfärja Holmöleden från Norrfjärden till Byviken på Holmön. Överfarten tar 45 minuter och är avgiftsfri. Från centrala Umeå går det buss till hållplatsen Norrfjärden vid färjeläget." },
      // KÄLLA: https://holmonsbatmuseum.se/ta-farjan-hit/ — "Norrfjärden ligger cirka en mil från Sävar, tre mil från Umeå."; https://www.lansstyrelsen.se/vasterbotten/besoksmal/naturreservat/holmoarna.html — "Från Sävar, följ skyltning till Norrfjärdens färjeläge."; https://holmonsbatmuseum.se/ta-farjan-hit/ — "Det finns gratis parkering vid färjeläget i Norrfjärden"
      { q: "Var ligger Norrfjärden i Umeå?", a: "Norrfjärden, där Holmöfärjan går, ligger cirka en mil från Sävar och tre mil från Umeå. Från Sävar följer du skyltningen till Norrfjärdens färjeläge. Parkeringen vid färjeläget är gratis." },
      // KÄLLA: https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/naturomradenfriluftsomraden/holmon.4.27a2de8b172da059ace20f5.html — "För den äventyrslystne finns också fiske­bastus som går att övernatta i helt gratis."; https://visitholmon.com/ — "Här kan du bo på vackra Berguddens fyrplats"; https://www.lansstyrelsen.se/vasterbotten/besoksmal/naturreservat/holmoarna.html — "Tälta eller förtöja båt mer än tre dygn på samma plats"
      { q: "Kan man övernatta på Holmön?", a: "Ja. Det finns flera vandrarhem, bland annat vid Berguddens fyrplats och i Prästgården, och enkla fiskebastur där du kan övernatta gratis. I naturreservatet får du inte tälta mer än tre dygn på samma plats." },
    ],
  },
  {
    slug: "klattring-bohuslan",
    title: "Bouldering i Bohuslän – klättring, klätterklubb och Uddevalla",
    excerpt: "Bouldering och klättring i Bohuslän: över 1000 boulders och 100 klippor, Bohusläns klätterklubbs hallar i Brodalen och Uddevalla, och reglerna för access.",
    category: "Aktivitet", emoji: "🧗", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://bohuskk.se/klattra-utomhus-klippklattring/ — "Det finns mer än 1000 boulders för alla från nybörjare och uppåt."; https://bohuskk.se/klattra-inne/ — "en boulderhall i Brodalen och en rep-vägg samt mindre bouldervägg i Rimnershallen i Uddevalla"
      { q: "Var kan man bouldra i Bohuslän?", a: "Ute finns enligt Bohusläns Klätterklubb mer än 1000 boulders längs kusten och inåt landet, beskrivna i klätterföraren och på Gryttr.com. Inomhus finns klubbens boulderhall Bro Boulder i Brodalen och en bouldervägg i Rimnershallen i Uddevalla." },
      // KÄLLA: https://bohuskk.se/klubben/ — "Bohusläns Klätterklubb bildades 1990 och har idag ca 400+ medlemmar. BKK är ansluten till Svenska Klätterförbundet"; https://bohuskk.se/klubben/ — "Inomhusväggarna Bro Boulder i Brodalen och Rimnershallen i Uddevalla"
      { q: "Vad är Bohusläns klätterklubb?", a: "Bohusläns Klätterklubb (BKK) bildades 1990, har över 400 medlemmar och är ansluten till Svenska Klätterförbundet. Klubben arbetar med access till klipporna, underhåller leder och bultar och driver en klubbstuga och två inomhushallar." },
      // KÄLLA: https://bohuskk.se/rimnershallen/ — "I rephallen finns 11 meter höga klätterväggar där man kan klättra topprep, ledklättring och sprickklättring"; https://bohuskk.se/rimnershallen/ — "Obs: för repklättring krävs alltid grönt/rött kort om man säkrar eller använder autobelayen"
      { q: "Var kan man klättra i Uddevalla?", a: "I Rimnershallen, där Bohusläns Klätterklubb har 11 meter höga repväggar och en bouldervägg. Hallen är obemannad, och för repklättring krävs grönt eller rött kort." },
      // KÄLLA: https://bohuskk.se/boende/ — "Bästa tiden för klippklättring och bouldering är dock maj till september."
      { q: "När är det bäst att klättra i Bohuslän?", a: "Bohusläns Klätterklubb anger maj till september som bästa tiden för klippklättring och bouldering. Lokala klättrare är ute året runt när vädret är bra." },
      // KÄLLA: https://bohuskk.se/boende/ — "I princip alla klippor här är på privat mark."; https://bohuskk.se/access/ — "På några av klipporna vi besöker häckar rovfågel och på dessa gäller ett frivilligt klätterstopp under häckningssäsong."
      { q: "Får man klättra på alla klippor i Bohuslän?", a: "Nästan alla klippor ligger på privat mark, och på några gäller frivilligt klätterstopp när rovfåglar häckar. Kolla accessläget i Svenska Klätterförbundets accessdatabas innan du åker." },
      // KÄLLA: https://bohuskk.se/klattra-inne/ — "Om man vill prova-på att klättra inne kan man lösa dagsinträde till Bro Boulder och prova på egen hand. Klätterskor finns att låna."; https://bohuskk.se/klatterkurser-utomhus/ — "Grundkursen i klippklättring är en bra start"
      { q: "Kan nybörjare klättra i Bohuslän?", a: "Ja. Bouldering passar nybörjare, och på Bro Boulder kan du köpa dagsinträde och låna skor. För klippklättring rekommenderar klubben en grundkurs hos en auktoriserad instruktör." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "strandridning-kust",
    title: "Rida på stranden – regler och strandridning längs kusten",
    excerpt: "Får man rida på stranden? Regler för att rida på stranden i Falkenberg, Halmstad, Vellinge och Simrishamn, i naturreservat, och stall med strandridning.",
    category: "Aktivitet", emoji: "🐴", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/ridning/ — "Att rida i naturen är ett fantastiskt sätt att uppleva landskapet, och allemansrätten ger dig möjlighet att göra det."; https://kommun.falkenberg.se/kultur-och-fritid/idrott-motion-och-friluftsliv/strander-och-badplatser/ordningsregler-for-strander-och-insjobad — "Det är tillåtet att ta med sig hästen och rida på alla kommunala stränder från 16 september till 14 maj."
      { q: "Får man rida på stranden?", a: "Ja, allemansrätten ger rätt att rida i naturen, men kommunernas lokala ordningsföreskrifter förbjuder ofta ridning på badstränderna under sommaren. I Falkenberg är ridning förbjuden på stränderna 15 maj–15 september och tillåten på alla kommunala stränder 16 september–14 maj." },
      // KÄLLA: https://www.halmstad.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserstranderochaventyrsbad/hundarochhastarpastranden.n1185.html — "Övrig tid på året är det tillåtet att ha häst på stranden."; https://vellinge.se/fritid-och-kultur/natur-och-friluftsliv/ridning/ — "Ridning på badstränder och gångbanor till dessa är förbjuden 15 maj till 31 augusti."; https://www.simrishamn.se/gata-park-och-natur/offentlig-plats/for-hast--och-hundagare — "Badplatsområden vid EU-badplatser under perioden 1 juni till 31 augusti"
      { q: "När får man rida på stranden?", a: "Det beror på kommunen. I Halmstad är häst förbjuden på de officiella badplatserna 1 maj–15 september men tillåten på stranden resten av året. I Vellinge är ridning på badstränderna förbjuden 15 maj–31 augusti, och i Simrishamn får hästar inte vara på EU-badplatserna 1 juni–31 augusti." },
      // KÄLLA: https://vellinge.se/fritid-och-kultur/natur-och-friluftsliv/ridning/ — "Med undantag för sommarmånaderna är sandstränderna goda ridvägar"; https://www.olofsboislandshastar.se/turridning-2/ — "både på stranden, i havet och i skogen"; https://www.gotlandriding.com/turridning — "Vi rider till stranden och härliga Ekstakusten i tempo som passar er."
      { q: "Var kan man rida på stranden i Sverige?", a: "Till exempel på de kommunala stränderna i Falkenberg utanför sommarperioden och på Falsterbonäsets sandstränder utom på sommaren. Stall som Olofsbo Islandshästar i Falkenberg och Gotland Riding på Gotland har turer till stranden." },
      // KÄLLA: https://www.lansstyrelsen.se/halland/natur-och-landsbygd/skyddad-natur/vanliga-fragor-och-svar-om-naturreservaten.html — "I vissa reservat är ridning reglerat, så att du bara får rida på vägar. Om det inte finns någon föreskrift om ridning så är det Allemansrätten som gäller, det vill säga, ridning är tillåten men du får inte orsaka skador."
      { q: "Får man rida i naturreservat?", a: "Det beror på reservatets föreskrifter. I vissa reservat får du bara rida på vägar eller anvisade leder. Finns ingen föreskrift om ridning gäller allemansrätten, och då är ridning tillåten så länge du inte orsakar skador." },
      // KÄLLA: https://www.halmstad.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserstranderochaventyrsbad/hundarochhastarpastranden.n1185.html — "Du får dock aldrig rida i sanddynerna längs havsstranden."; https://vellinge.se/fritid-och-kultur/natur-och-friluftsliv/ridning/ — "det är inte tillåtet att rida på klitterna eller strandhedarna eftersom dessa är mycket känsliga för hästarnas tramp"
      { q: "Får man rida i sanddynerna?", a: "Nej, inte i Halmstad, där du aldrig får rida i sanddynerna längs havsstranden, och inte på Falsterbonäset, där klitterna och strandhedarna är för känsliga för hästarnas tramp." },
    ],
  },
  { slug: "vegansk-mat-skargarden", title: "Vegansk mat i skärgården – restauranger och tips", excerpt: "Det veganska utbudet i skärgården har förbättrats markant. Guide till vegetariska och veganska alternativ på öarna och längs kusten.", category: "Mat", emoji: "🌱", readTime: "5 min", fullContent: true, faqs: [{ q: 'Finns vegansk mat på skärgårdsöarna?', a: 'Det veganska utbudet är begränsat men förbättras. Sandhamn, Grinda och Utö har restauranger med veganalternativ. Ta gärna med egna råvaror och laga vid campingkök.' }, { q: 'Vilka skärgårdsrestauranger har bra veganskt?', a: 'Utö Värdshus och Grinda Wärdshus har veganska alternativ på menyn. Längs Bohusläns kust: Smögens restauranger och Lysekil har blivit bättre. Kolla menyer online innan du åker.' }] },
  {
    slug: "restauranger-havsvy-stockholm",
    title: "Restauranger med havsutsikt i Stockholm – krogar vid vattnet",
    excerpt: "Restauranger med havsutsikt i Stockholm: Gondolen, Fjäderholmarnas Krog och varje restaurang vid vattnet ut till Grinda och Sandhamn, med båt och säsong.",
    category: "Mat", emoji: "🍽", readTime: "5 min", fullContent: true,
    faqs: [
      // KÄLLA: https://fjaderholmarnaskrog.se/ppettider-mellanssong — "Vi har nu stängt och öppnar åter för julbord 20 november"; https://fjaderholmarnaskrog.se/ — "FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027."
      { q: "Har Fjäderholmarnas Krog öppet på hösten?", a: "Nej, inte som vanlig restaurang. I september 2026 hade krogen stängt efter sommaren. Den öppnar igen för julbord den 20 november, och sommarsäsongen 2027 börjar enligt krogen den 1 maj 2027." },
      // KÄLLA: https://gondolen.se/ — "njut av en helt unik utsikt av Stockholm"; https://www.waxholmshotell.se/matochdryck — "allt med strålande utsikt över Vaxholmsfjärden"; https://www.sandhamns-vardshus.se/ — "Med en magisk utsikt över hamnen."; https://smadalarogard.se/restauranger/brasserie-branneri/ — "slå dig ner vid ett bord ute på terrassen med utsikt över Hemviken"
      { q: "Vilka restauranger i Stockholm har havsutsikt?", a: "Inne i stan har Gondolen på Södermalm utsikt över Stockholm. Vid vattnet ute i skärgården ligger bland annat Fjäderholmarnas Krog, Waxholms Hotell med utsikt över Vaxholmsfjärden, Grinda Wärdshus vid Saxarfjärden, Sandhamns Värdshus med utsikt över hamnen och Smådalarö Gård med terrass mot Hemviken." },
      // KÄLLA: https://fjaderholmarnaskrog.se/batar-till-och-fran — "FÖR STRÖMMA KANALBOLAG KRÄVS ATT BILJETTEN FÖRBOKAS PÅ NÄTET"; https://fjaderholmarnaskrog.se/hithem-kontakt — "Efter två minuters promenad hittar du Krogen längst ut i Krogviken till vänster."
      { q: "Hur tar man sig till Fjäderholmarnas Krog?", a: "Med båt, antingen med Strömma Kanalbolag (biljetten ska förbokas på nätet) eller med Fjäderholmslinjen. Från bryggan tar du vänster och går ungefär två minuter till krogen längst ut i Krogviken." },
      // KÄLLA: https://grinda.se/hittahit/ — "Från Stockholm tar resan drygt en timme"; https://grinda.se/hittahit/ — "ca 10 -15 min, till Wärdshuset som ligger mitt på Grinda"
      { q: "Hur tar man sig till Grinda Wärdshus?", a: "Med Waxholmsbolaget eller Cinderellabåtarna, som går till Grinda från bland annat Stockholm, Nacka Strand och Vaxholm. Resan från Stockholm tar drygt en timme, och från bryggorna är det ungefär 10–15 minuters promenad till Wärdshuset." },
      // KÄLLA: https://www.sandhamns-vardshus.se/ — "Öppet varje dag från mitten av juni till mitten på september. Annan tid på året är restaurangen främst öppen helger."; https://sandhamn.com/sv/matdryck — "Orangeriet är främst öppet under sommarsäsongen"
      { q: "Har restaurangerna på Sandhamn öppet året runt?", a: "Puben på Sandhamns Värdshus har öppet året runt. Värdshusets restaurang har öppet varje dag från mitten av juni till mitten av september och annars främst på helger. På Sandhamn Seglarhotell har Orangeriet främst öppet på sommaren." },
    ],
  },
  {
    slug: "vandring-var-kust",
    title: "Vandring på våren – kust och skärgård i maj och juni",
    excerpt: "Vandring på våren längs kusten: leder på Ängsö, Sydkoster, i Skuleskogen, på Stora alvaret och till Havstensklippan, med vägen dit och regler för fågelskydd.",
    category: "Aktivitet", emoji: "🥾", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/angso-nationalpark/besok-parken — "Från Hemudden går markerade vandringsstigar över ön."; https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/aktiviteter/sydkosters-vandringsleder — "Blå leden tar dig runt hela Sydkoster."; https://www.sverigesnationalparker.se/upptack-nationalparkerna/skuleskogens-nationalpark/besok-parken — "Våren är en fin tid att besöka parken med färre besökare."; https://www.vastsverige.com/uddevalla/produkter/havstensklippan/ — "Det finns två stycken vandringsleder som leder till toppen."
      { q: "Var kan man vandra längs kusten på våren?", a: "Till exempel på Ängsö i Roslagen, där markerade stigar går från Hemudden, på Sydkoster med Blå leden runt ön, i Skuleskogen där våren enligt förvaltaren är en fin tid med färre besökare, på Stora Alvarleden över Stora alvaret och upp till Havstensklippan på Bokenäset." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/angso-nationalpark/besok-parken — "Ungefär från mitten av maj till i början av juni blommar orkidén Adam och Eva. Då kommer även majviva, ramslök, vårärt och gullviva."; https://www.sverigesnationalparker.se/upptack-nationalparkerna/angso-nationalpark/att-gora-i-parken/sevardheter/orkideer — "En ängsyta strax söder om Norrudden"
      { q: "När blommar Adam och Eva på Ängsö?", a: "Ungefär från mitten av maj till början av juni. Rikligast växer orkidén på en äng strax söder om Norrudden. Samtidigt blommar majviva, ramslök, vårärt och gullviva." },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/aktiviteter/sydkosters-vandringsleder — "Blå leden tar dig runt hela Sydkoster."; "Längd: 13,1 kilometer"; "Längd: 4,8 kilometer"; "Längd: 2,5 kilometer"
      { q: "Hur lång är Blå leden på Sydkoster?", a: "Blå leden är 13,1 kilometer och går runt hela Sydkoster. Kortare alternativ är Gula leden, 4,8 km, och Rörviksslingan, 2,5 km." },
      // KÄLLA: https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/djur--och-vaxtskyddsomraden/ — "Den vanligaste förbudsperioden för fågel är 1 april till 15 juli. I norr 1 maj–31 juli."; "Skyddsperioden bör anpassas efter arten/arternas behov på respektive plats."
      { q: "När gäller fågelskyddet i skärgården?", a: "Det beror på området. Enligt Naturvårdsverket är den vanligaste förbudsperioden för fågel 1 april–15 juli, och i norr 1 maj–31 juli, men perioden anpassas efter arterna på varje plats. Kontrollera föreskrifterna för det område du ska besöka." },
      // KÄLLA: https://www.vastsverige.com/uddevalla/produkter/havstensklippan/ — "Den blåa leden på 3,2 km är utmanande och innehåller delvis klättring. För en medelsvår upplevelse kan du välja den ljusblåa leden på 3,6 km."; "Havstensklippan ligger 119 meter över havet"
      { q: "Hur lång är leden upp till Havstensklippan?", a: "Två leder går till toppen. Blå leden är 3,2 km, utmanande och innehåller delvis klättring. Ljusblå leden är 3,6 km och medelsvår. Klippan ligger 119 meter över havet." },
    ],
  },
  // ── Batch L: SEO-gap-guider – aug–okt säsong ─────────────────────────────
  {
    slug: "host-stockholms-skargard-2026",
    title: "Höst i Stockholms skärgård 2026 – båtar, öar och vad som har öppet",
    excerpt: "Båtarna till Sandhamn, Grinda, Utö och Möja går hela hösten, men mer sällan. Här är vad som har öppet hösten 2026, bastun på Bullerö och regler för hund.",
    category: "Säsong", emoji: "🍂", readTime: "6 min", featured: true, fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"; https://waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja."; https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "övrig tid på året går det flera per dag"; https://www.konsummoja.se/ — "Den stora butiken på Möja och som har öppet året runt."
      { q: "Vilka öar i Stockholms skärgård är öppna på hösten?", a: "Sandhamn, Grinda och Möja har båttrafik året runt, och till Vaxholm går det flera turer per dag även utanför sommaren. Till Utö går båtarna från Årsta brygga, men mer sällan än på sommaren. På Möja har Coop i Berg öppet året runt, och puben på Sandhamns Värdshus har öppet året runt." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"
      { q: "Går Waxholmsbåtarna till skärgården på hösten?", a: "Ja, till de större öarna. Till Sandhamn går det turer året runt från Stavsnäs, Grinda har trafik året om, båtarna till Möja går året runt från Boda brygga och Utö nås från Årsta brygga, men mer sällan än på sommaren." },
      // KÄLLA: https://www.sandhamns-vardshus.se/ — "Öppet varje dag från mitten av juni till mitten på september. Annan tid på året är restaurangen främst öppen helger."
      { q: "Vad har öppet på Sandhamn på hösten?", a: "Puben på Sandhamns Värdshus har öppet året runt. Restaurangen har öppet varje dag från mitten av juni till mitten av september och resten av året främst på helger." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero — "Bastun är öppen för alla och går inte att boka."
      { q: "Kan man bada bastu i skärgården på hösten?", a: "Ja, bland annat på Bullerö i Nämdöskärgårdens nationalpark. Bastun är öppen för alla och går inte att boka, och Bullerölinjen från Stavsnäs vinterhamn går från maj till en bit in i oktober." },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/hitta-hit — "Du kan resa med Bullerölinjen till nationalparkens huvudentré på Bullerö från maj till en bit in i oktober."
      { q: "Hur länge går båten till Bullerö på hösten?", a: "Bullerölinjen till nationalparkens huvudentré på Bullerö går från maj till en bit in i oktober. Alla båtlinjer till Nämdöskärgårdens nationalpark utgår från Stavsnäs vinterhamn." },
    ],
  },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  {
    slug: "hummerpremiar-bohuslan",
    title: "Hummerpremiär 2026 i Bohuslän – datum och regler för hummerfiske",
    excerpt: "Hummerpremiär 2026: hummerfisket startade 21 september kl. 07.00. Regler för hummerfiske 2026 – tinor, märkning, minimimått och fredade områden.",
    category: "Säsong", emoji: "🦞", readTime: "5 min", featured: true, fullContent: true,
    faqs: [
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Premiär för hummerfisket 2026 är den 21 september kl. 07.00."; "Hummerpremiären infaller klockan 07.00 den första måndagen efter 20 september varje år."
      { q: "När är hummerpremiären 2026?", a: "Måndag 21 september 2026 klockan 07.00. Premiären infaller alltid den första måndagen efter 20 september." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Premiär för hummerfisket 2026 är den 21 september kl. 07.00."; "Fritidsfiskare får fiska till och med 30 november."; "Yrkesfiskare får fiska till och med den 31 december."
      { q: "När börjar och slutar hummerfisket 2026?", a: "Hummerfisket 2026 började 21 september klockan 07.00. Fritidsfiskare får fiska till och med 30 november och yrkesfiskare till och med 31 december." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Endast svenska medborgare eller den som är stadigvarande bosatt i Sverige får fiska hummer. Utländska medborgare får endast fiska med handredskap."; "Som fritidsfiskare får du använda högst sex hummertinor samtidigt."; "Sedan 10 januari 2026 gäller nya EU-regler som innebär att alla passiva redskap ska märkas direkt på redskapet."
      { q: "Vilka regler gäller för hummerfiske 2026?", a: "Bara svenska medborgare och den som är stadigvarande bosatt i Sverige får fiska hummer; utländska medborgare får bara fiska med handredskap. Endast hummertina är tillåten, högst sex per fritidsfiskare. Nytt för 2026 är att kontaktuppgifterna också ska sitta på själva tinan, inte bara på kulan." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Som fritidsfiskare får du använda högst sex hummertinor samtidigt."
      { q: "Hur många hummertinor får en fritidsfiskare ha?", a: "Högst sex hummertinor samtidigt. Hummertina är det enda tillåtna redskapet, och tinorna ska ha flyktöppningar och rymningshål." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "För hummer gäller minimimåttet 9 centimeter, mätt från ögonhålans bakkant till huvudsköldens bakkant"
      { q: "Vad är minimimåttet för hummer?", a: "9 centimeter carapaxlängd, mätt från ögonhålans bakkant till huvudsköldens bakkant. Mindre hummer och hummer med rom ska genast släppas tillbaka." },
      // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html — "Nästa år (2027) infaller hummerpremiären istället den 27 september."
      { q: "När är hummerpremiären 2027?", a: "Måndag 27 september 2027, enligt Havs- och vattenmyndigheten." },
    ],
  },
  { slug: "surstrommingspremiar-2026", title: "Surströmmingspremiär 2026 – datum och var du äter", excerpt: "Surströmmingspremiären 2026 är torsdag 20 augusti. Guide till traditionen, var du deltar i premiärfesten och de bästa ätplatserna längs Höga Kusten.", category: "Säsong", emoji: "🐟", readTime: "7 min", fullContent: true, faqs: [{ q: 'När är surströmmingspremiären 2026?', a: 'Surströmmingspremiären 2026 är torsdag 20 augusti. Det är alltid tredje torsdagen i augusti. Konserverna får inte säljas förrän detta datum – det är en officiell tradition sedan 1930-talet.' }, { q: 'Var firar man surströmmingspremiären bäst?', a: 'Höga Kusten kring Ulvön och Kramfors är hjärtat av surströmmingtradition. Ulvöns hotell arrangerar premiärfest. Längs Norrlandskusten hålls hemmafester i stora mängder.' }, { q: 'Hur äter man surströmming?', a: 'Traditionsenligt på tunnbröd med mandelpotatis, lök, gräddfil och gräslök. Öl eller snaps till. Öppna alltid burken utomhus – vätskan som stänker luktar intensivt. Det är en av världens starkast luktande maträtter.' }] },
  {
    slug: "michelin-havet-guide",
    title: "Restaurang vid havet på västkusten – Michelin och havskräftor",
    excerpt: "Restaurang vid havet på västkusten: Sjömagasinet och Fyr i Michelinguiden, skärgårdskrogar i Bohuslän och var du äter havskräftor – med fakta från källorna.",
    category: "Mat", emoji: "⭐", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://guide.michelin.com/en/vastra-gotaland/gothenburg/restaurant/sjomagasinet — "With such lovely views out over the harbour"; https://guide.michelin.com/en/hallands/halmstad_2659154/restaurant/fyr — "fell in love with this fantastic building on the Tylösand headland"; https://guide.michelin.com/en/skane/bastad_2649603/restaurant/pensionat-furuhem — "In the centre of the seaside resort"
      { q: "Vilka restauranger vid havet på västkusten finns i Michelinguiden?", a: "Sjömagasinet vid Göteborgs hamninlopp och Fyr på Tylösand utanför Halmstad finns i Michelinguiden och ligger vid havet. I badorten Båstad finns också Pensionat Furuhem med i guiden." },
      // KÄLLA: https://guide.michelin.com/en/skane/simrishamn_2683288/restaurant/vyn — "Two Stars: Excellent cooking"; https://guide.michelin.com/en/skane/simrishamn_2683288/restaurant/vyn — "its charming landscaped garden stretches down to the coast below"
      { q: "Vilken restaurang vid havet har Michelinstjärnor?", a: "VYN utanför Simrishamn på Österlen har två stjärnor i Michelinguiden. Trädgården sluttar ner mot kusten. Den ligger alltså inte på västkusten." },
      // KÄLLA: https://www.havochvatten.se/arter-och-livsmiljoer/arter-och-naturtyper/havskrafta.html — "Längs Sveriges kust förekommer havskräfta i Kattegatt och Skagerrak."; https://www.havochvatten.se/arter-och-livsmiljoer/arter-och-naturtyper/havskrafta.html — "Den lever på djup mellan 40 och 250 meter."
      { q: "Var finns havskräftor?", a: "Längs Sveriges kust finns havskräfta bara i Kattegatt och Skagerrak, alltså på västkusten. Den lever på lerbotten på 40 till 250 meters djup." },
      // KÄLLA: https://www.vastsverige.com/en/bohuslan/seafood-safaris/crayfish-and-langoustine/ — "In West Sweden we have langoustine, which come from the sea and are available year round"; https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/havskrafta---minimimatt-och-redskapsbegransningar.html — "Det är tillåtet att fritidsfiska havskräfta året runt."
      { q: "När är det säsong för havskräftor?", a: "Havskräftor går att köpa året runt, och fritidsfiske efter havskräfta är tillåtet året runt, i första hand med burar och högst sex redskap samtidigt." },
      // KÄLLA: https://tanumstrand.se/attgora/skaldjur/ — "se hur nyfångade havskräftor blir till salta delikatesser"; https://guide.michelin.com/en/vastra-gotaland/gothenburg/restaurant/sjomagasinet — "shrimp, crab and langoustine on toast"; https://www.vastsverige.com/tanum/se--gora/grebbestad/ — "flera restauranger som serverar färsk fisk, räkor, ostron, hummer, krabba och havskräftor"
      { q: "Var kan man äta havskräftor vid havet på västkusten?", a: "Till exempel på TanumStrand utanför Grebbestad, där nyfångade havskräftor kokas på bryggan i Sjöboden Udden, och på Sjömagasinet i Göteborg, där Michelinguiden nämner toast med havskräfta. I Grebbestad serverar flera restauranger längs bryggpromenaden havskräftor." },
      // KÄLLA: https://guide.michelin.com/en/vastra-gotaland/gothenburg/restaurant/sjomagasinet — "This establishment manages its own bookings."; https://guide.michelin.com/en/hallands/halmstad_2659154/restaurant/fyr — "Please contact the restaurant directly to book a table."
      { q: "Hur bokar man bord på Michelinkrogarna vid havet?", a: "Direkt hos restaurangen. Michelinguiden anger att krogarna sköter sin egen bordsbokning och hänvisar till restaurangens webbplats eller telefon." },
    ],
  },
  { slug: "sandhamn-vaxholm-grinda-host", title: "Sandhamn, Vaxholm och Grinda på hösten – guide till tre klassiker", excerpt: "Stockholms tre mest omtyckta öar är ännu bättre på hösten. Färre folk, lövfärger och öppen service. Vad du gör och hur du tar dig dit i september–oktober.", category: "Säsong", emoji: "🍁", readTime: "9 min", fullContent: true, faqs: [{ q: 'Är Sandhamn, Vaxholm och Grinda öppna på hösten?', a: 'Ja – alla tre håller öppet hela hösten. Vaxholm fungerar som en stad hela året. Sandhamns Värdshus och Grinda Wärdshus har höstöppet med reducerade tider – kolla respektive hemsida.' }, { q: 'Vilken av öarna passar bäst för ett höstbesök?', a: 'Vaxholm är säkraste valet (alltid liv och öppet). Grinda passar dig som vill ha tyst och vacker natur. Sandhamn är lite mer livlig och seglarnas favorit även på hösten.' }, { q: 'Hur tar man sig dit på hösten?', a: 'Waxholmsbolaget kör till alla tre hela hösten. Vaxholm: Waxholmsbåt från Strömkajen, ca 1 tim. Grinda: linje 11, ca 1h 45 min. Sandhamn: via Stavsnäs med buss + Waxholmsbåt, totalt ca 2h.' }] },
  {
    slug: "camping-host-skargard",
    title: "Höstcamping i skärgården – tälta i skärgården på hösten",
    excerpt: "Höstcamping i skärgården: vad allemansrätten säger om att tälta i skärgården, regler i naturreservat, Skärgårdsstiftelsens tältplatser och utrustning.",
    category: "Aktivitet", emoji: "⛺", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "Du får tälta något enstaka dygn i naturen, men tänk på att välja en tältplats långt bort från bostadshus och att visa hänsyn till markägaren."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "I allmänhet är det inte tillåtet att tälta annat än på särskilt angivna platser."
      { q: "Får man tälta i skärgården?", a: "Ja, allemansrätten gäller även i skärgården och på hösten. Du får tälta något enstaka dygn, långt från bostadshus och med hänsyn till markägaren. I naturreservat får du i allmänhet bara tälta på särskilt angivna platser." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ — "Stanna inte för länge, en eller två nätter är en bra tumregel."; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "tälta mer än två dygn i följd på samma plats"
      { q: "Hur länge får man tälta på samma plats?", a: "Allemansrätten gäller något enstaka dygn, och Naturvårdsverket ger en eller två nätter som tumregel. I flera naturreservat, till exempel Björnö och Gällnö, är gränsen två dygn på samma plats." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/bjorno/ — "För den som vill övernatta finns tältplatser på flera platser i området."; https://skargardsstiftelsen.se/omraden/fjardlang/ — "På närliggande ön Myggskären går det att övernatta gratis året runt i våra öppna bodar"; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/talt-och-lagerplatser/ — "På Upptäckskärgården.se går det söka efter tältplatser i hela skärgården."
      { q: "Var kan man tälta i skärgården på hösten?", a: "Skärgårdsstiftelsen har tält- och lägerplatser i sina naturreservat, bland annat på Björnö och Boskapsö. På Myggskären i Fjärdlångs reservat kan du sova gratis året runt i öppna bodar, högst två dygn. Tältplatser i hela skärgården kan du söka på Upptäck Skärgården." },
      // KÄLLA: https://www.svenskaturistforeningen.se/guider-tips/packlistor/fjallvandring-med-talt/ — "Liggunderlag med isolervärde mot markkyla"; https://www.svenskaturistforeningen.se/guider-tips/packlistor/fjallvandring-med-talt/ — "Sovsäck, minst en 3-säsongssäck (komforttemperatur minst 0 °C)"; https://www.svenskaturistforeningen.se/guider-tips/packlistor/fjallvandring-med-talt/ — "Undvik bomull som kyler när den blir fuktig."
      { q: "Vad ska man ha med sig vid höstcamping?", a: "Liggunderlag som isolerar mot markkylan, en sovsäck med komforttemperatur på minst 0 °C, pannlampa, ett torrt sovunderställ i ull, en tunn mössa att sova i och vattentäta packpåsar. Undvik bomull, som kyler när den blir fuktig." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/eldning/ — "Lägereldens knaster är förtrollande men allemansrätten ger dig ingen självklar rätt att elda."; https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/eldning/ — "Om det råder eldningsförbud gäller det även i skyddade områden."
      { q: "Får man elda när man tältar i skärgården?", a: "Allemansrätten ger ingen självklar rätt att elda. Använd en fast grillplats eller ett friluftskök och elda inte på berghällar. I naturreservat är det ofta bara tillåtet på iordningställda eldplatser, och vid eldningsförbud gäller förbudet även där." },
    ],
  },
  // ── Batch M: Höst/planering SEO-artiklar ─────────────────────────────────
  { slug: "havsbastu-guide", title: "Havsbastu – guide till ett av Nordens bästa bad", excerpt: "Havsbastu kombinerar extrem värme med ett dopp i salthav – en skandinavisk upplevelse utan motstycke. Guide till de bästa havsbastuerna i Sverige och hur du planerar ditt besök.", category: "Aktivitet", emoji: "🧖", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vad är havsbastu?', a: 'Havsbastu är en bastu placerad direkt vid havet med brygga för bad. Principen är enkel: svetta i bastun, sedan ett snabbt dopp i salthav. Kontrasten mellan extrem värme (80–100°C i bastun) och kallt hav ger en kraftig välbefinnandeeffekt och är en djupt rotad skandinavisk tradition.' }, { q: 'Var finns de bästa havsbastuerna i Sverige?', a: 'Utö Havsbastu (Stockholms skärgård), Arholma STF (norra skärgården), Smådalarö Gård SPA (södra Stockholms skärgård), och längs Bohusläns kust: Lysekil Havsbadet och Marstrand. På Gotland: Snäcks havsbastu. De flesta STF-anläggningar i skärgården erbjuder bastumöjligheter.' }, { q: 'Behöver man boka havsbastu i förväg?', a: 'Ja – populära bastuer som Utö Havsbastu och Smådalarö Gård tar bokningar och är ofta fullbokade helger september–november. Boka minst 1–2 veckor i förväg. Vardagar är lättare att boka och ger en lugnare upplevelse.' }] },
  { slug: "hostlov-vid-havet-2026", title: "Höstlov 2026 vid havet – guide för höstlovsveckan", excerpt: "Höstlovet 2026 är vecka 44 (26 oktober–1 november). Guide till de bästa kustnära resmålen för hela familjen – och varför havet slår alla andra alternativ.", category: "Säsong", emoji: "🍂", readTime: "6 min", fullContent: true, faqs: [{ q: 'När är höstlovet 2026?', a: 'Höstlovet 2026 är vecka 44: måndag 26 oktober till söndag 1 november. Observera att datum varierar lite mellan kommuner – kolla din kommuns skolkalender. De flesta skolor i Stockholmsregionen har samma datum.' }, { q: 'Vad kan man göra vid havet på höstlovet?', a: 'Vandring längs kustleder, svampplockning, fiskeutflykter, havsbastu, och besök till öar och fiskelägen. Höstlovet sammanfaller med höstfärgernas höjdpunkt i Bohuslän och Stockholms skärgård. Lövfärger och tom natur ger en minnesvärdig upplevelse.' }, { q: 'Vilka kustnära resmål passar barnfamiljer på höstlovet?', a: 'Vaxholm (nära Stockholm, öppet hela hösten), Lysekil och Smögen i Bohuslän, samt Borgholm på Öland. Alla tre är tillgängliga utan komplicerad planering och har aktiviteter och restauranger öppna under höstlovet.' }] },
  { slug: "november-skargard", title: "November i skärgården – kustens stillaste säsong", excerpt: "November är den månad de flesta undviker havet. Det är precis därför du ska åka dit. Guide till november i skärgården – stormar, stillhet och en annan slags skönhet.", category: "Säsong", emoji: "🌫", readTime: "6 min", fullContent: true, faqs: [{ q: 'Är det värt att åka till skärgården i november?', a: 'Absolut – för rätt person. November ger total stillhet, dramatiska stormar mot klippor, och en skärgård som är genuint folktom. Det är inte en semester för sol och bad utan för vandring, havsbastu, och upplevelsen av naturen i sin råaste form.' }, { q: 'Vilka båtar går till skärgården i november?', a: 'Waxholmsbolaget kör ett kraftigt reducerat schema i november. Vaxholm och Möja har daglig trafik. Grinda, Sandhamn och Utö har begränsad trafik – kolla aktuell tidtabell på waxholmsbolaget.se. Yttre skärgården är i princip avstängd.' }, { q: 'Vad ska man göra i skärgården i november?', a: 'Havsbastu är höjdpunkten – kontrasten mellan varm bastu och kallt novemberhav är en upplevelse utöver det vanliga. Vandring längs kustleder utan ett enda mötande fotspår. Birdwatching längs kusten är utmärkt – havsörn och ejdrar syns regelbundet.' }] },
  { slug: "host-blekinge-skargard", title: "Höst i Blekinge skärgård 2026 – Aspö, Sturkö och sydkusten", excerpt: "Blekinges skärgård är liten, tyst och genuint vacker. På hösten är den nästan helt tom – perfekt för den som söker äkta stillhet vid havet. Guide till höstens Blekinge.", category: "Säsong", emoji: "🏝", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Blekinges skärgård på hösten?', a: 'Från Karlskrona kör reguljära passagerarfärjor till Aspö (ca 40 min) och Sturkö (ca 25 min) via Blekinges länstrafik. Höststidtabellen är reducerad – kolla blekinge.se för aktuella tider. Karlskrona nås med tåg från Malmö (1,5 h) eller Stockholm (4 h).' }, { q: 'Vad är unikt med Blekinges skärgård jämfört med Stockholm och Bohuslän?', a: 'Blekinge är mer avsides och genuint touristfri. Skärgården är plattare och med mer granit och sandstränder – och vattnet är klarare än Östersjöns genomsnitt. Det är en välbevarad hemlighet.' }, { q: 'Vad gör man på Aspö och Sturkö på hösten?', a: 'Vandring längs kustleder, fiskeutflykter med lokala fiskare, birdwatching (höstmigration längs sydkusten är intensiv), och cykla runt öarna. Järnavik på Aspö har en av Blekinges vackraste sandstränder – tom på hösten.' }] },
  { slug: "host-skane-kusten", title: "Höst i Skåne kust 2026 – Falsterbo, Kullaberg och Österlen", excerpt: "Skånes kust är vacker hela året – men hösten ger något unikt. Fågelflyttningens höjdpunkt, dramatiska storm och en öppen natur som glöder i gult och rött. Guide till höstens Skåne.", category: "Säsong", emoji: "🌊", readTime: "7 min", fullContent: true, faqs: [{ q: 'Varför är Skåne speciellt på hösten?', a: 'Falsterbo är en av Europas bästa fågelstationer under höstflyttningen (september–november). Kullaberg har dramatisk klippkust bäst utan sommarsäsongens turister. Österlen blommar av bök- och ekskogars lövfärger mot havet. Det är en annan upplevelse än sommaren.' }, { q: 'Vad ska man göra längs Skånes kust på hösten?', a: 'Fågelskådning vid Falsterbo (Falsterbo Fågelstation, september–oktober). Vandring längs Skåneleden vid Kullaberg. Österlenrundan med besök i Simrishamn och Kivik. Havsbad i Mölle eller Torekov – vattnet är fortfarande badbart i september.' }, { q: 'Är Skånes kust tillgänglig utan bil på hösten?', a: 'Delvis – tåg och Skånetrafiken täcker Ystad, Simrishamn och Höganäs. Kullaberg och Falsterbo kräver bil eller cykel. Malmö är perfekt bascamp – pendla ut till kusterna under dagen. Öresundsbron från Köpenhamn är enkel.' }] },
  { slug: "weekendresa-host-havet", title: "Weekendresa höst vid havet – 10 resmål att boka nu", excerpt: "Höstens bästa weekendresor finns vid havet. Lugnare, vackrare och billigare än sommaren. Guide till 10 resmål längs svenska kusten – från Bohuslän till Blekinge.", category: "Praktisk", emoji: "🗺", readTime: "8 min", fullContent: true, faqs: [{ q: 'Varför är en höst-weekendresa vid havet bättre än sommaren?', a: 'Priserna är 30–50% lägre efter högsäsongen. Inga köer, inga fullbokade bryggor och restaurangerna har tid för dig. Naturen är på många sätt vackrare – lövfärger, höststormar och dramatisk ljussättning. Du upplever kusten som lokalbefolkningen gör.' }, { q: 'Vad ska man boka i förväg för en höst-weekendresa?', a: 'Boende (begränsat utbud höst – boka 2–4 veckor i förväg), havsbastu om du vill ha det (populärt, boka tidigt), och restaurangtider om du planerar finmiddagen. Båtbiljetter behöver inte bokas lika långt i förväg som sommartid.' }, { q: 'Vilket av de 10 resmålen ger bäst valuta för pengarna?', a: 'Vaxholm (Stockholm) är billigast och enklast att nå. Lysekil i Bohuslän ger mest "äkta kustliv" för pengarna. Borgholm på Öland är utmärkt för familjerna – lång säsong och bra service till rimliga priser.' }] },
  { slug: "host-roslagen", title: "Höst i Roslagen – skärgård norr om Stockholm i lövfärg", excerpt: "Roslagen är Stockholms skärgårds norra gren – och på hösten är den vackrare än södern. Björkar vid havet, fiskelägen och en skärgård som glömts bort av turisterna.", category: "Säsong", emoji: "🍁", readTime: "7 min", fullContent: true, faqs: [{ q: 'Var ligger Roslagen?', a: 'Roslagen sträcker sig längs Upplands och norra Stockholms kust, från Norrtälje i söder till Tierp i norr. Öarna Arholma, Svartlöga, Blidö och Fejan är kärnan. Norrtälje är porten till Roslagen och nås med buss 676 från Stockholm (ca 1h 20 min).' }, { q: 'Vad är Roslagens bästa höstupplevelse?', a: 'Vandring på Svartlöga och Arholma utan ett enda möte. Havsbastuupplevelsen på Arholma STF (boka i förväg). Höstfiske efter havsöring längs kustremsan. Fiskelägena i Grisslehamn och Singö är pittoreska och nästan folktomma i september–oktober.' }, { q: 'Hur tar man sig till Roslagen utan bil?', a: 'Buss 676 från Stockholm City till Norrtälje, sedan Waxholmsbolagets linjer i Roslagens skärgård. Arholma nås med linje 5, ca 3 tim från Tekniska Högskolan. Svartlöga nås med linje 6. Kontrollera höststidtabellen – avgångarna minskar från september.' }] },
  { slug: "planera-host-resa-havet", title: "Planera höstresa vid havet – checklista och kalendarium 2026", excerpt: "Höstresan vid havet kräver lite mer planering än sommarvarianten. Checklista för boende, transport, utrustning och de viktigaste datumen för hösten 2026.", category: "Praktisk", emoji: "📋", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad är de viktigaste datumen för höst vid havet 2026?', a: 'Surströmmingspremiären 20 aug, hummerpremiären måndag 21 sep kl 07.00 (första måndagen efter 20 september, enligt Havs- och vattenmyndigheten), ostronsäsongens öppning september, höstlov vecka 44 (26 okt–1 nov). Planer du runt dessa datum får du automatiskt med i de lokala traditioner som gör hösten unik vid havet.' }, { q: 'Vad ska man tänka på vid höstbokning?', a: 'Boka boende tidigt – utbudet krymper efter sommarsäsongen. Kolla alltid restaurangers höstöppettider innan du reser – många stänger eller reducerar efter september. Ha alltid en Plan B för vädret: havsbastu, museum eller en god bok om stormen sätter in.' }, { q: 'Vad ska man packa för en höstresa vid havet?', a: 'Regnkläder och vindskydd (obligatoriskt), lager-på-lager-klädsel, vattentäta skor, pannlampa (det mörknar tidigt i oktober), och kamera – höstljuset vid havet är unikt. Ta alltid med reservkläder: du kan bli blöt utan varning.' }] },
  { slug: "ostgota-skargard", title: "Östgöta skärgård – guide till Sankt Anna och Gryt", excerpt: "En av Sveriges mest storslagna och minst kända skärgårdar. Tusentals öar, djupa sund och ett klart Östersjövatten – långt från Stockholms köer.", category: "Region", emoji: "⛵", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Östgöta skärgård?', a: 'Med Skärgårdslinjen (Östgötatrafiken) från Arkösund, Tyrislöt eller Fyrudden till bl.a. Harstena, Ämtö och Gräsmarö. Boka senast kl 18:00 dagen innan på 0771-71 10 20. Trafiken är beställningstrafik och kör sommarsäsong.' }, { q: 'Vad finns att göra på Harstena?', a: 'Harstena är den mest bebodda ön i Östgöta skärgård och har restaurang, bageri, glass, rökt fisk och kajakhyrning. Det finns gästplatser för båt och stugor att hyra. Perfekt startpunkt för att utforska kringliggande öar.' }, { q: 'Behöver man boka Skärgårdslinjen i förväg?', a: 'Ja – boka senast kl 18:00 dagen innan. Ring Östgötatrafiken på 0771-71 10 20. Utan bokning finns ingen garanti att båten går.' }] },
  {
    slug: "nattkryssning-skargarden",
    title: "Kvällskryssning i Stockholms skärgård – middag och sena båtar",
    excerpt: "Kvällskryssning och dagskryssning i Stockholms skärgård: middags- och räkkryssningar hösten 2026, turer som återkommer 2027 och sista båten hem.",
    category: "Aktivitet", emoji: "🌙", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/matkryssningar/middagskryssningar/ss-stockholm/ — "Kliv ombord på klassiska S/S Stockholm och följ med på en 3-timmars middagskryssning i skärgården."; https://www.stromma.com/sv-se/stockholm/matkryssningar/middagskryssningar/rakfrossa/ — "Nybrokajen kl. 19:30"; https://www.stromma.com/sv-se/stockholm/matkryssningar/middagskryssningar/kvallskryssning-i-skargarden-med-buffe/ — "ÅTER 2027"
      { q: "Var kan man åka på kvällskryssning i Stockholm?", a: "Strömma har middagskryssningar från city. Hösten 2026 går S/S Stockholms middagskryssning från Strandvägen och räkkryssningen med M/S Strömma Kanal från Nybrokajen. Kvällskryssningen med buffé på M/S Gustafsberg VII är tillbaka 2027." },
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/julbord/nyarskryssning/ — "5-timmars kryssning i skärgården"; https://www.stromma.com/sv-se/stockholm/cinderellabatarna/ — "Säsongen löper från slutet av april till slutet av september."
      { q: "Finns det nattkryssningar i Stockholms skärgård?", a: "Det närmaste är kvällskryssningarna på två till tre timmar och nyårskryssningen, som är fem timmar och avgår från Strandvägen på nyårsafton. Cinderellabåtarnas säsong är slutet av april till slutet av september, och Strömma anger ingen särskild kvällstrafik för dem." },
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/sightseeing/batsightseeing/lilla-skargardsturen/ — "med dagliga avgångar, året runt"; https://www.stromma.com/sv-se/stockholm/matkryssningar/brunchkryssningar/brunchkryssning/ — "Turen avgår från Strandvägen lördagar och söndagar, året runt."; https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/tusen-oars-kryssning/ — "ÅTER JUNI 2027"
      { q: "Vilka dagskryssningar finns i Stockholms skärgård?", a: "Lilla skärgårdsturen går dagligen året runt från Strandvägen på 1,5, 2,5 eller 3 timmar, och brunchkryssningen med S/S Stockholm går lördagar och söndagar året runt. Heldagsturen Tusen öars kryssning och kanalturen till Sandhamn är tillbaka i juni 2027." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/tidtabeller — "Fartygen kan ändras med kort varsel."; https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "skulle det inte passa med en båt hem, går SL:s bussar från Vaxholm till Tekniska högskolan."
      { q: "Kan man ta sista båten hem efter kvällsmiddag i skärgården?", a: "Ja, men kolla hemresan i Waxholmsbolagets reseplanerare innan du bokar bord. Tidtabellen byts fyra gånger om året och fartygen kan ändras med kort varsel. Från Vaxholm går även SL:s bussar till Tekniska högskolan." },
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/grupper-foretag/ — "Middag på privat båt i Mälaren & Stockholms skärgård"; https://www.stromma.com/sv-se/stockholm/grupper-foretag/ — "Flytande privat festlokal för 60-120 personer"
      { q: "Kan man chartra båt i Stockholm?", a: "Ja. Strömma har paket för middag på privat båt i Mälaren och Stockholms skärgård, bland annat M/S Gustafsberg VII som festlokal för 60–120 personer. Priset ges som offert." },
      // KÄLLA: https://www.waxholmsbolaget.se/nyheter-och-trafikinfo/lagsasongen-igang — "Från den 14 september till den 29 april 2027 kan du som har en SL-biljett som gäller för 30 dagar eller längre resa i hela Waxholmsbolagets trafik."
      { q: "Kan man åka skärgårdsbåt med SL-kort på hösten?", a: "Ja. Från 14 september 2026 till 29 april 2027 gäller SL-biljetter för 30 dagar eller längre i hela Waxholmsbolagets trafik." },
    ],
  },
  // ── Batch N: Gap-analys-guider 2026-08-18 ────────────────────────────────
  {
    slug: "island-hopping-stockholms-skargard",
    title: "Island hopping i Stockholms skärgård – utan båtlicens",
    excerpt: "Island hopping utan båtlicens: åk Waxholmsbolaget till Grinda, Vaxholm, Sandhamn och Utö. Så funkar båtluffarbiljetten, SL-biljetten och tidtabellerna.",
    category: "Praktisk", emoji: "⛵", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser — "Du köper din biljett i SL-appen eller ombord med betalkort."; https://www.transportstyrelsen.se/sv/sjofart/Fritidsbatar/Kunskap-och-kompetens/Utbildning-for-fritidsbat/ — "Om båten är större än 12 gånger 4 meter krävs skepparexamen, kustskepparexamen"
      { q: "Kan man island hoppa i Stockholms skärgård utan båtlicens?", a: "Ja. Med Waxholmsbolagets reguljära båtar behöver du bara en biljett, som du köper i SL-appen eller ombord med betalkort. Kör du egen båt gäller andra regler: för båtar större än 12 gånger 4 meter krävs till exempel skepparexamen eller kustskepparexamen." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Du kan åka till Grinda från Strömkajen, via Vaxholm. Resan från Strömkajen tar ungefär en och en halv timme."; https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om."
      { q: "Hur åker man Waxholmsbolaget till Grinda?", a: "Från Strömkajen via Vaxholm. Resan tar ungefär en och en halv timme. På sommaren går flera turer om dagen, och Grinda har trafik året om. Tiderna finns i tabell 11." },
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser/periodbiljetter/5-dagarsbiljett — "5-dagarsbiljetten kallas också för båtluffarbiljetten."; https://www.waxholmsbolaget.se/biljetter-och-priser/periodbiljetter/5-dagarsbiljett — "Biljetten gäller i fem dagar från första restillfället."
      { q: "Vad är Waxholmsbolagets båtluffarbiljett?", a: "Det är Waxholmsbolagets 5-dagarsbiljett. Du köper den ombord och laddar den på ett SL-kort. Den gäller i fem dagar från första resan, och under den tiden reser du obegränsat med Waxholmsbolagets båtar." },
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd."; https://www.waxholmsbolaget.se/nyheter-och-trafikinfo/lagsasongen-igang — "Från den 14 september till den 29 april 2027 kan du som har en SL-biljett som gäller för 30 dagar eller längre resa i hela Waxholmsbolagets trafik."
      { q: "Gäller SL-biljetten på Waxholmsbolagets båtar?", a: "Alla SL-biljetter gäller året runt mellan Strömkajen och Vaxholm med omnejd. Längre ut kompletterar du med en Waxholmsbolaget-biljett. Från den 14 september till den 29 april 2027 gäller SL-biljetter för 30 dagar eller längre i hela Waxholmsbolagets trafik." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Sommartid går även Nord/Sydlinjen via Sandhamn."; https://www.waxholmsbolaget.se/reseplanering/resmal/uto — "Under sommaren går även Nord/Sydlinjen via Utö."; https://www.waxholmsbolaget.se/reseplanering/resmal/uto — "Nord/Sydlinjens tider hittar du i tabell 40."
      { q: "Vilken rutt passar för en island hop på tre dagar?", a: "Ett förslag är Vaxholm och Grinda första dagen, Sandhamn andra dagen och Utö tredje dagen. På sommaren går Waxholmsbolagets Nord/Sydlinje via både Sandhamn och Utö, med tider i tabell 40. Från Utö tar du dig hem via Årsta brygga." },
    ],
  },
  {
    slug: "hund-skargarden",
    title: "Skärgård med hund – båten, koppel och regler i naturreservat",
    excerpt: "Hunden reser gratis med Waxholmsbolaget men ska vara kopplad. Här är vad som gäller 1 mars–20 augusti, i skärgårdens naturreservat och på badplatserna.",
    category: "Praktisk", emoji: "🐕", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du får ta med hundar och mindre sällskapsdjur gratis."; https://waxholmsbolaget.se/att-resa-med-oss/resevillkor — "Du får bara ta med djur i de delar av fartyget som inte har förbudsskylt. Du får ta med dig som mest två djur om de inte sitter i väska/bur."
      { q: "Får man ta med hund på Waxholmsbolaget?", a: "Ja. Hundar reser gratis men ska vara kopplade ombord, och du får inte ha med djur i delar av fartyget som har förbudsskylt. Du får ha med högst två djur, om de inte sitter i väska eller bur." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/friluftsliv-och-allemansratt.html — "1 mars till 20 augusti ska du alltid ha den kopplad. I många naturreservat ska hunden vara kopplad hela året."; https://jordbruksverket.se/djur/hundar-katter-och-smadjur/hundar/sa-skoter-du-din-hund — "Mellan den 1 mars och den 20 augusti får hundar inte springa lösa där det kan finnas vilda djur."
      { q: "När måste hunden vara kopplad i skärgården?", a: "Mellan 1 mars och 20 augusti får hunden inte springa lös där det kan finnas vilda djur, vilket i praktiken betyder koppel. I många naturreservat ska hunden vara kopplad hela året." },
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/ — "Ha alltid koppel på hunden när ni vistas i nationalparker eller naturreservat."; https://skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/att-besoka-skyddad-natur/ — "Alla Skärgårdsstiftelsens områden är naturreservat"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "medföra okopplad hund"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/stora-nassa.html — "Kopplad hund eller annat tamdjur får dock medföras på Bäckskäret och Stora Bonden"
      { q: "Vad gäller för hund i naturreservat i skärgården?", a: "Naturvårdsverket råder dig att alltid ha hunden kopplad i naturreservat. Alla Skärgårdsstiftelsens områden är naturreservat, och på till exempel Grinda och Finnhamn är det förbjudet att ha med okopplad hund. På Stora Nassa får du inte ta med hund i land, utom kopplad på Bäckskäret och Stora Bonden." },
      // KÄLLA: https://www.varmdo.se/byggabomiljo/boendemiljo/djur/reglergallandehundar.4.18c983316e0536cb18bb92f.html — "hundar får inte vistas på allmänna badplatser, begravningsplatser och allmänna lekparker"; https://www.haninge.se/uppleva-och-gora/natur-parker-och-lekplatser/hundar/ — "Mellan 1 maj–30 september får hundar inte vistas på delar av kommunens badplatser."
      { q: "Får hunden bada på badplatser i skärgården?", a: "Oftast inte på kommunernas allmänna badplatser. I Värmdö får hundar inte vistas på allmänna badplatser alls, och i Haninge är de förbjudna på delar av badplatserna 1 maj–30 september. Låt hunden bada en bit bort från de ordnade baden." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "medföra okopplad hund"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "inom hela reservatet med undantag av Persholmen medföra hund som ej är kopplad"; https://www.varmdo.se/byggabomiljo/boendemiljo/djur/reglergallandehundar.4.18c983316e0536cb18bb92f.html — "Under perioden mellan den 1 mars och den 20 augusti ska hundar i kommunen hållas under sådan tillsyn att de hindras från att springa lösa i marker där det kan finnas vilda djur."; https://www.varmdo.se/barnochutbildning/yngrebarn/alltomforskolaochbarnomsorg/forskolorivarmdo/mojaforskola.4.612ff7261872c3a6ab31b3.html — "Möja förskola är en del av Skärgårdsförskolorna."
      { q: "Vilka öar kan man besöka med hund?", a: "Hunden får följa med till öarna, men reglerna skiljer sig. På Arholma finns naturreservatet Arholma-Idö och på Utö ett reservat där hunden ska vara kopplad hela året. På Möja gäller Värmdö kommuns regler med koppel på offentliga platser och koppel i naturen 1 mars–20 augusti." },
    ],
  },
  {
    slug: "barnfamilj-stockholms-skargard",
    title: "Bästa öarna i Stockholms skärgård med barn? Bad, båt och boende",
    excerpt: "Öarna i Stockholms skärgård med barn: Fjäderholmarna, Vaxholm, Grinda och Arholma, sandstränder nära Stockholm och vad som gäller för barnbiljett och barnvagn.",
    category: "Praktisk", emoji: "👨‍👩‍👧", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/fjaderholmarna — "Badar gör du från klippor med utsikt över Stockholms inlopp och vid de små sandstränderna."; https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."
      { q: "Vilken ö i Stockholms skärgård passar bäst med barn?", a: "Det beror på hur lång resa ni orkar. Fjäderholmarna ligger 20–30 minuter från stan och har klippbad och små sandstränder. Till Vaxholm tar båten en timme och du kan åka på SL-biljett. Grinda, ungefär en och en halv timme bort, har barnvänliga bad vid båda ångbåtsbryggorna och stugor för övernattning." },
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "Det finns gott om barnvänliga, långgrunda sandstränder."; https://skargardsstiftelsen.se/omraden/uto/ — "Rävstavik och Barnens bad erbjuder långgrunda sandstränder som passar barnfamiljer"; https://www.destinationvaxholm.se/sv/badplatser — "Liten barnvänlig sandstrand i Söderläge omkring 15 minuters promenad från Vaxholms centrum."
      { q: "Finns det öar med sandstrand nära Stockholm?", a: "Ja. Nåttarö har flera barnvänliga, långgrunda sandstränder, på Utö finns Rävstavik och Barnens bad, och i Vaxholm finns barnvänliga sandstränder vid Söderläge och Eriksöbadet." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme."; https://www.explorearchipelago.com/sthlm/guides/guide-to-arholma-experience-eat-and-enjoy — "The boat ride to Arholma takes about 15 minutes."
      { q: "Hur långa är båtresorna till öarna med barn?", a: "Till Fjäderholmarna tar båten 20–30 minuter, till Vaxholm en timme och till Grinda ungefär en och en halv timme från Strömkajen. Till Arholma tar båten drygt fyra timmar från Strömkajen, eller ungefär 15 minuter från Simpnäs." },
      // KÄLLA: https://www.waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris — "Barn som är under 7 år gamla reser utan avgift med annan betalande resenär."; https://www.waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "med Waxholmsbolaget-biljett inte ta med dig barn i åldrarna 7–11 år på din biljett"
      { q: "Reser barn gratis på Waxholmsbåten?", a: "Barn under 7 år reser gratis med Waxholmsbolaget tillsammans med en betalande resenär. Med SL-biljett får en vuxen också ta med sex barn i åldern 7–11 år gratis inom SL-området, men det gäller inte på Waxholmsbolaget-biljett." },
      // KÄLLA: https://www.waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med — "Du som reser med barn under 7 år får ta med barnvagn utan kostnad."
      { q: "Får man ta med barnvagn på skärgårdsbåten?", a: "Ja. Reser du med barn under 7 år tar du med barnvagnen gratis på Waxholmsbolagets båtar. Ställ den på barnvagnsplatserna eller där personalen visar." },
    ],
  },
  {
    slug: "romantisk-skargard",
    title: "Romantisk weekend i Stockholms skärgård – övernatta på en ö",
    excerpt: "Romantisk weekend i Stockholms skärgård: ö-hotell, värdshus och pensionat för två, vad som ingår, säsonger och båtarna ut för en weekend i skärgården.",
    category: "Praktisk", emoji: "🌅", readTime: "7 min", fullContent: true,
    faqs: [
      // KÄLLA: https://www.waxholmshotell.se/hotellet — "Waxholms Hotell erbjuder 42 underbara hotellrum och sviter"; https://www.siarofortet.se/våra-rum-2/ — "Vi erbjuder bekväma 43 bäddar fördelade på hela 15 rum"; https://lidovardshus.com/krlekshuset — "Ett romantiskt krypin med dubbelsäng"; https://arholmanord.se/boende — "I alla boenden ingår lakan, handduk, frukostbuffé och slutstädning."; https://www.djuronaset.com/hotell/ — "Ett skärgårdshotell med spa, mat och möten"
      { q: "Var kan man bo på en romantisk weekend i Stockholms skärgård?", a: "På öarna finns bland annat Waxholms Hotell i Vaxholm, pensionatet på Siaröfortet, Lidö Värdshus med Kärlekshuset, Arholma Nord och Djurönäset med spa. Grinda, Utö och Sandhamn har också hotell. Flera av öboendena har bara öppet på sommaren." },
      // KÄLLA: https://www.sandhamn.com/sv/om-oss — "Vi håller öppet året runt"; https://www.djuronaset.com/ — "Mer än ett julbord"; https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "övrig tid på året går det flera per dag"; https://lidovardshus.com/ — "Vi har nu öppet för grupper, konferenser, fester och bröllop."
      { q: "Vilka hotell i skärgården har öppet på hösten och vintern?", a: "Sandhamn Seglarhotell har öppet året runt, och Djurönäset har evenemang och julbord under hösten. Till Vaxholm, där Waxholms Hotell ligger, går båten flera gånger om dagen även utanför sommaren. Siaröfortet, Lidö Värdshus och Arholma Nord har bara sommarsäsong för enskilda gäster." },
      // KÄLLA: https://www.djuronaset.com/erbjudanden/spaweekend-i-stockholm/ — "Sjunk ner i den 37-gradiga infinitypoolen med utsikt över havet"; https://www.djuronaset.com/erbjudanden/spaweekend-i-stockholm/ — "Här ingår entré till vårt spa, en trerättersmiddag, övernattning och frukost"; https://www.sandhamn.com/sv/om-oss — "Här bor du nära havet, med restaurang, spa, gym och pool inom några steg."
      { q: "Finns det spa på en weekend i skärgården?", a: "Ja. Djurönäset har spa med en infinitypool på 37 grader, och i paketet Skärgårdsweekend ingår spaentré, trerättersmiddag, övernattning och frukost. Sandhamn Seglarhotell har spa, gym och pool och hyr ut bastuflottar med vedeldad bastu." },
      // KÄLLA: https://www.waxholmshotell.se/hotellet — "Frukosten som ingår i rumspriset är en komplett klassisk frukostbuffé"; https://www.siarofortet.se/våra-rum-2/ — "I alla våra olika boendealternativ ingår en välsmakande och näringsrik frukost"; https://lidovardshus.com/boende-1 — "Frukostbuffé ingår i allt vårt boende"; https://arholmanord.se/boende — "I alla boenden ingår lakan, handduk, frukostbuffé och slutstädning."
      { q: "Ingår frukost på ö-hotellen?", a: "På de boenden vi har kontrollerat, ja: Waxholms Hotell, Siaröfortet, Lidö Värdshus och Arholma Nord har alla frukost i priset för rummet." },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"; https://www.siarofortet.se/ta-er-hit-3/ — "Med Waxholmsbolaget kan du resa från Stockholm (Strömkajen) och Vaxholm"; https://skargardsstiftelsen.se/omraden/lido/ — "Du kan också resa med SL-buss eller bil till Räfsnäs och fortsätta med skärgårdsbåt."; https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Du kan inte boka plats ombord på våra fartyg"
      { q: "Hur tar man sig ut på weekend i skärgården utan bil?", a: "Med Waxholmsbolaget: till Vaxholm från Strömkajen på ungefär en timme och till Siaröfortet från Strömkajen eller Vaxholm. Till Lidö åker du SL-buss till Räfsnäs och sedan skärgårdsbåt. Plats på Waxholmsbolagets båtar går inte att boka." },
    ],
  },
  {
    slug: "var-stockholms-skargard-2027",
    title: "Vår i Stockholms skärgård 2027 – öarna i april och maj",
    excerpt: "Vår i Stockholms skärgård 2027: öar med båt året om som Vaxholm, Grinda, Utö och Nämdö, vårtidtabellerna och fågelskär där du inte får gå i land.",
    category: "Säsong", emoji: "🌸", readTime: "6 min", fullContent: true,
    faqs: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/bjorno/ — "ett uppskattat utflyktsmål året om"; https://skargardsstiftelsen.se/omraden/arholma/ — "ett uppskattat resmål året om"; https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om"; https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt"; https://skargardsstiftelsen.se/omraden/namdo/ — "hit kan du åka med skärgårdsbåt året om"; https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/fjaderholmarna — "Fjäderholmarna är säsongsöppet mellan april och september."
      { q: "Vilka öar är öppna i Stockholms skärgård på våren?", a: "Flera av Skärgårdsstiftelsens områden, som Björnö och Arholma, är utflyktsmål året om. Vaxholm, Grinda, Utö och Nämdö har båttrafik året om, och Utö Värdshus har öppet året runt. Fjäderholmarna har säsong från april till september." },
      // KÄLLA: https://www.waxholmsbolaget.se/reseplanering/tidtabeller — "Waxholmsbolaget byter tidtabell fyra gånger om året, men vissa linjer går bara delar av en period."; https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "och övrig tid på året går det flera per dag"
      { q: "Går Waxholmsbåtarna på våren?", a: "Ja. Waxholmsbolaget byter tidtabell fyra gånger om året, och vissa linjer går bara under en del av en period. Till Vaxholm går det flera turer om dagen även utanför sommaren." },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/stora-nassa.html — "Under tiden 1 februari till 31 augusti är det förbjudet att gå iland"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "under tiden 1 februari–15 augusti landstiga på följande öar i Nåttaröfladen"; https://www.lansstyrelsen.se/stockholm/natur-och-landsbygd/skyddad-natur.html — "Du kan hitta områden med tillträdesförbud i Naturvårdsverkets kartverktyg"
      { q: "Var får man inte gå i land på våren?", a: "I fågelskyddsområden med tillträdesförbud under häckningstiden. I Stora Nassa gäller förbudet 1 februari–31 augusti och i Nåttaröfladen 1 februari–15 augusti. Områdena finns i Naturvårdsverkets kartverktyg Skyddad natur." },
      // KÄLLA: https://www.smhi.se/kunskapsbanken/oceanografi/haven-runt-sverige/temperatur-i-havet — "När solen här hemma på våren börjar stå högre på himlen värms både land och hav upp av solens strålar."; https://www.sjoraddning.se/artiklar/kroppens-reaktion-pa-kallt-vatten — "När vi hamnar i kallt vatten drabbas vi av en köldchock."
      { q: "Kan man bada i skärgården på våren?", a: "Vattnet är kallt, eftersom havet värms från ytan först när solen står högre på våren. Sjöräddningssällskapet varnar för köldchock i kallt vatten, då man inte kan kontrollera andningen." },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/arholma/ — "För den som vill vandra passerar Stockholm Archipelago Trail över Arholma."; https://skargardsstiftelsen.se/omraden/namdo/ — "För den som vill vandra finns här en etapp av Stockholm Archipelago Trail."; https://www.waxholmsbolaget.se/reseplanering/resmal/uto — "lämpar sig väl för en dagstur året om"; https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Du ser ofta havsörn"
      { q: "Vad kan man göra i skärgården på våren?", a: "Vandra, till exempel på Stockholm Archipelago Trail som passerar Arholma och Nämdö, göra dagstur till Utö eller titta på fåglar. I Nämdöskärgårdens nationalpark ser man ofta havsörn." },
    ],
  },
]
