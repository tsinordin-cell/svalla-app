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
  'kraftskiva-skargarden-2026':           'stockholm',
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
  'hummerpremiar-bohuslan-2026':        'goteborg',
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
    title: "Komplett packlista för skärgården",
    excerpt: "Kläder, mat & dryck, säkerhet, teknik, barn och segling. Allt samlat i en guide du kan bocka av innan du lämnar bryggan.",
    category: "Praktisk",
    emoji: "🎒",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      { q: 'Behöver man flytväst i skärgården?', a: 'Flytväst är lagkrav för alla ombord på motordrivna fartyg och starkt rekommenderat vid paddling och segling. Barn under 15 år måste ha flytväst på sig när båten är i rörelse. Påföljd för brott mot kravet kan bli böter.' },
      { q: 'Vad är det vanligaste att glömma till skärgården?', a: 'Solskydd (UV-strålning är starkare på öppet vatten), vattentätt telefonfodral, en extra lager (det blir alltid kallare än man tror på kvällen) och kontanter (många skärgårdskrogar har instabil kortläsare).' },
      { q: 'Hur mycket vatten ska man ta med per person?', a: 'Räkna med 1 liter per person och timme i sol och värme, mer om du paddlar eller seglar aktivt. För en typisk dagstur: minst 2–3 liter per person. Sötvatten finns att fylla på vid de flesta gästhamnar men inte i naturhamnar.' },
      { q: 'Kan man hyra utrustning på öarna?', a: 'Ja, de flesta större öar (Utö, Grinda, Sandhamn, Finnhamn) hyr ut cyklar och kajaker. Dykutrustning och snorklingsset finns på ett fåtal platser. Hyra på plats är ofta billigare än att ta med egna saker på båten.' },
      { q: 'Vad ska man tänka på med packning om man åker med egna båt?', a: 'Packa i vattentäta säckar eller drybags. Tyngre saker placeras lågt och centrerat för stabiliteten. Ta med en liten dagryggsäck separat för landutflykter — du vill inte ta med hela packen varje gång du går iland.' },
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
      { q: 'Vad gäller för toalettavfall på båt?', a: 'Det är förbjudet att pumpa ut orenat toalettavfall inom 12 sjömil från land i Sverige. Antingen töms tanken på en pump-out-station i gästhamn, eller används miljövänliga alternativ. Greywaste (disk- och tvättvatten) är i regel tillåtet att tömma.' },
    ],
  },
  {
    slug: "waxholmsbolaget-guide",
    title: "Waxholmsbolaget – komplett guide till båttrafiken",
    excerpt: "Hur fungerar linjerna? Vilka hållplatser gäller? Är SL-kortet giltigt? Allt om Waxholmsbolaget samlat på ett ställe.",
    category: "Transport",
    emoji: "⛴",
    readTime: "9 min",
    fullContent: true,
    faqs: [
      { q: 'Är SL-kortet giltigt på Waxholmsbolaget?', a: 'SL-kortet (månadskort, reskassa) gäller INTE på Waxholmsbolagets båtlinjer. Du behöver köpa separat biljett via Waxholmsbolagets app, hemsida eller ombord. Biljetten är prisvärd men du kan inte använda SL-appen.' },
      { q: 'Hur köper man biljett till Waxholmsbolaget?', a: 'Enklast via Waxholmsbolagets app (iOS/Android) eller på waxholmsbolaget.se. Du kan också köpa biljett ombord på båten — kontant eller kort. Ombordköp är något dyrare för sällsynta linjer.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Kan man ta med cykel på Waxholmsbolaget?', a: 'Ja, cyklar är välkomna på Waxholmsbolagets båtar. Det kostar en liten extra avgift (ca 50–80 kr beroende på linje och säsong). Cyklar lastas i fören — kontrollera kapaciteten för din specifika linje.' },
      { q: 'Hur tidigt bör man vara vid bryggan?', a: 'Räkna med att vara vid bryggan 5–10 minuter före avgång. På populära linjer under högsäsong (juli) kan båtarna bli fulla. Förboka biljett digitalt — det garanterar inte plats på alla linjer men möjliggör smidig ombordstigning.' },
      { q: 'Kör Waxholmsbolaget hela året?', a: 'Ja, men med reducerad tidtabell utanför sommarsäsongen (maj–september). Vissa linjer kör dagligen hela året, andra bara under sommarsäsongen. Kontrollera aktuell tidtabell på waxholmsbolaget.se för din linje.' },
    ],
  },
  {
    slug: "skargard-utan-bat",
    title: "Skärgård utan båt – 10 öar du når utan eget fartyg",
    excerpt: "Bilfärja, Waxholmsbolaget och SL – 10 konkreta förslag rangordnade efter tillgänglighet.",
    category: "Transport",
    emoji: "🚌",
    readTime: "10 min",
    fullContent: true,
    faqs: [
      { q: 'Kan man besöka skärgården utan egen båt?', a: 'Ja, absolut. Waxholmsbolaget trafikerar over 50 destinationer i Stockholms skärgård med reguljär båttrafik. Utö, Grinda, Vaxholm, Fjäderholmarna och Sandhamn nås enkelt utan eget fartyg.' },
      { q: 'Vilken ö är enklast att nå utan bil och båt?', a: 'Fjäderholmarna är enklast – 25 minuter med Strömma från Nybroplan/Slussen, avgångarna är täta och öppen hela sommarsäsongen. Vaxholm är näst enklast: Waxholmsbolaget och SL-buss 670 direkt från Stockholm.' },
      { q: 'Gäller SL-kortet på båtarna i skärgården?', a: 'SL-kortet gäller på Waxholmsbolagets pendelbåtslinjer inom SL-zonen (zon A+B), men INTE på de yttre öarna som Grinda, Sandhamn och Utö. För dessa krävs Waxholmsbolagets egna biljetter.' },
      { q: 'Kan man ta med cykel på Waxholmsbolagets båtar?', a: 'Ja, cykel tillåts på de flesta linjer mot en avgift på ca 60 kr tur/retur. Det är ett utmärkt sätt att utforska öar som Utö, Möja och Ingmarsö utan bil.' },
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
  { slug: "badtemperatur-skargard", title: "Badtemperaturen i skärgården – säsong för säsong", excerpt: "När är vattnet varmt nog att bada? Månadsvis guide till havsbadets säsong.", category: "Aktivitet", emoji: "🌡", readTime: "4 min", fullContent: true, faqs: [{ q: 'När är havet varmt nog att bada i Stockholms skärgård?', a: 'Vanligtvis från midsommar (ca 18°C) till mitten av augusti (22–24°C som varmast). Kalmarsund och Östersjöns grunda vikar värmer snabbare än Västerhavet.' }, { q: 'Var mäter man badtemperaturen i skärgården?', a: 'SMHI publicerar dagliga badtemperaturer för 200+ platser på smhi.se. Lokala badplatser kan avvika – grunda sandstränder är vanligen 2–4°C varmare än öppet hav.' }] },
  {
    slug: "sl-kort-skargarden",
    title: "SL-kortet i skärgården – vad gäller?",
    excerpt: "Var är SL-kortet giltigt, var räcker det inte och vad kostar tilläggsbiljetten?",
    category: "Transport",
    emoji: "🎫",
    readTime: "4 min",
    fullContent: true,
    faqs: [
      { q: 'Gäller SL-kortet till skärgårdsöarna?', a: 'SL-kortet gäller på SL-bussarna till hamnterminaler (t.ex. buss 433 till Stavsnäs, buss 670 till Vaxholm) men INTE på Waxholmsbolagets båtlinjer ut till öarna. Du behöver separat biljett för båtresan.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Hur mycket kostar Waxholmsbolaget utöver SL-kortet?', a: 'Beroende på destination: Vaxholm ca 140 kr enkel resa, Grinda ca 200 kr, Sandhamn ca 220 kr, Utö ca 210 kr. Barn under 7 år åker gratis, 7–19 år betalar halv taxa. Köp biljett via Waxholmsbolagets app.' },
      { q: 'Finns det ett kombinerat kort för SL och Waxholmsbolaget?', a: 'Nej, det finns inget kombinerat kort. SL och Waxholmsbolaget har separata biljettsystem. Waxholmskortet (månadsabonnemang) kan vara lönsamt om du åker ofta, men är inte integrerat med SL-appen.' },
      { q: 'Gäller SL-kortet på Styrsöbolaget i Göteborg?', a: 'Styrsöbolaget i Göteborg är en del av Västtrafik, inte SL. Västtrafik-kortet gäller på Styrsöbolagets båtar till sydskärgården. SL-kortet gäller inte i Göteborg.' },
    ],
  },
  { slug: "dykning-snorkling-skargard", title: "Dykning och snorkling i Stockholms skärgård", excerpt: "Bästa platserna, vad du kan se och hur du hyr utrustning.", category: "Aktivitet", emoji: "🤿", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa platserna för dykning i Stockholms skärgård?', a: 'Landsort, Tjärven och Arholma i yttre skärgård har klarast vatten. Dykförbundet listar lokaler med vrakar och rev. Vrak av intresse: M/S Gustav Eriksson utanför Landsort.' }, { q: 'Behöver man dyklicens för att dyka i Stockholms skärgård?', a: 'Ja – PADI Open Water eller CMAS Stjärna 1 krävs för att hyra utrustning hos de flesta aktörer. Guidade dykturer för nybörjare finns utan licens.' }] },
  { slug: "rakfrukost-skargard", title: "Räkfrukost i skärgården – var och hur", excerpt: "Den klassiska skärgårdsupplevelsen: nyfångad räka, majonnäs och knäckebröd vid bryggan.", category: "Mat", emoji: "🦐", readTime: "5 min", fullContent: true, faqs: [{ q: 'Var kan man köpa färska räkor direkt från fiskare i skärgården?', a: 'Fiskebryggor i Dalarö, Muskö och Nynäshamn säljer direkt från båt. I Bohuslän: Smögen, Grebbestad och Kungshamns hamnar. Sommarsäsong: juni–september.' }, { q: 'Är räkfrukost en skärgårdstradition?', a: 'Ja – skalningsräkor med majonnäs, citron och knäckebröd vid bryggan är en ikon. Smögen och Stockholms yttre skärgård är klassiska ställen. Många restauranger serverar denna frukost sommartid.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "sjomatkrogar-guide", title: "Sjömatskrogar i skärgården – bästa ställena", excerpt: "Från Sandhamn till Smögen: restaurangerna som serverar havets bästa råvaror.", category: "Mat", emoji: "🦞", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa sjömatskrogarna i Stockholms skärgård?', a: 'Fjäderholmarnas Krog, Sandhamns Värdshus och Grinda Wärdshus är topplatser. Utö Värdshus har stark krog med Östersjöfisk. I Bohuslän: Smögen Fisk, Restaurang Käringön.' }, { q: 'Är sjömatskrogarna i skärgården dyra?', a: 'Räkna med 150–350 kr för en förrätt med skaldjur, 250–450 kr för maträtter. Enklare räkbehandling/räkfröst är billigare: ca 100–200 kr. Boka bord i förväg sommartid.' }] },
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
      { q: 'Kan vem som helst delta i hummerfiske?', a: 'Ja, du behöver bara ett sportfiskekort (gratis för fritidsfiske) och rätt utrustning. Max 6 burar per person. Hummern måste vara minst 9 cm från pannhorn till stjärt, annars ska den sättas tillbaka. Fiskelicens krävs inte utöver sportfiskekortet.' },
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
    title: "Skärgården på hösten – varför höst är bäst",
    excerpt: "Tomma öar, lövfärger och svamp – höstens argument för en skärgårdstur.",
    category: "Säsong",
    emoji: "🍂",
    readTime: "5 min",
    fullContent: true,
    faqs: [
      { q: 'Vilka öar är bäst på hösten i skärgården?', a: 'Utö, Ornö och Möja håller öppet längre på hösten än de flesta öar. Arholma och Svartlöga är fantastiska för höstvandring. Vaxholm fungerar hela hösten med stadsliv och öppna restauranger.' },
      { q: 'Kör Waxholmsbolaget på hösten?', a: 'Ja, men med reducerad tidtabell från september. Inneröarna (Vaxholm, Grinda) trafikeras dagligen. Ytterligare avlägsna öar kan ha sällsynta avgångar eller bara helgtrafik. Kontrollera tidtabellen på waxholmsbolaget.se inför varje resa.' },
      { q: 'Är det möjligt att bada i skärgården på hösten?', a: 'Vattnet håller 16–18°C i september och 12–14°C i oktober. Det är möjligt men friskt. Bastur finns på flera öar (Utö har havsbastu) och är en höjdpunkt på höstens skärgårdstur.' },
      { q: 'Vad ska man göra i skärgården på hösten?', a: 'Svampplockning (karl-johan och kantarell är vanliga), vandring utan folkmassor, havsbastu och att se lövfärgerna spegelbilden i havet. Rådjuren syns oftare på hösten. Ta med fiskespö – abborre och havsöring fiskas hela hösten.' },
    ],
  },
  { slug: "midsommar-bohuslan", title: "Midsommar i Bohuslän – 7 alternativ", excerpt: "Klippor, sillmåltider och midsommarstång vid havet på västkusten.", category: "Säsong", emoji: "🌼", readTime: "8 min", fullContent: true, faqs: [{ q: 'Var firar man bäst midsommar i Bohuslän?', a: 'Lysekil, Smögen, Kungshamn och Grebbestad har alla publika midsommarfiranden med stång, sillbuffé och dans. Marstrand är festligare men fullpackat. Boka boende månader i förväg.' }, { q: 'Hur tar man sig till Bohuslän till midsommar?', a: 'Med bil via E6 norrut. Tåg till Uddevalla eller Stenungsund + Västtrafik buss. Boka biljetter tidigt – midsommarhelgen är en av årets mest bokade resedagar.' }] },
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
    title: "Marstrand – komplett guide till fästningsstaden",
    excerpt: "Bilbåt, fästning, regatta och Marstrands bästa restauranger.",
    category: "Region",
    emoji: "🏰",
    readTime: "7 min",
    fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Marstrand?', a: 'Kör till Koön (ca 6 mil norr om Göteborg) och ta bilbåten de sista 5 minuterna till Marstrand. Bilbåten går kontinuerligt och är kostnadsfri. Marstrand är bilfritt på ön.' },
      { q: 'Vad kostar det att besöka Carlstens fästning?', // KÄLLA: carlsten.se/oppettider-och-priser (avläst 2026-08-11)
        a: 'Inträde till Carlstens fästning kostar 120 kr för vuxna och 60 kr för barn 5–15 år. Guidade turer på svenska ingår dagligen under sommarsäsongen.' },
      { q: 'När är Marstrandsregattan?', a: 'Marstrand Race Week hålls varje år i juli – det är en av Skandinaviens största segelregattor. Under regattaveckan är Marstrand extra folkfyllt, boka boende i god tid.' },
      { q: 'Vad är bäst att äta i Marstrand?', a: 'Räksmörgåsen vid kajen är ett måste. Marstrands restauranger lägger stor vikt vid lokalt fångad skaldjur – hummer, ostron och räkor dominerar menyn under säsongen.' },
    ],
  },
  {
    slug: "smogen-guide",
    title: "Smögen – guide till klippornas stad",
    excerpt: "Smögenbryggan, räksmörgåsen och klipporna – allt du behöver veta om Smögen.",
    category: "Region", emoji: "🦐", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Smögen?', a: 'Med Västtrafik buss från Göteborg till Kungshamn (ca 1,5–2 timmar), sedan gångavstånd eller lokal buss till Smögen. Med bil via E6 och rv171, totalt ca 15 mil norr om Göteborg. Smögen nås via en liten bro från Kungshamn.' },
      { q: 'Vad är Smögenbryggan?', a: 'Smögenbryggan är en 600 meter lång brygga med restauranger, fiskbodar och kaféer längs Bohuslän-klipporna. Det är Smögens hjärta och en av Sveriges mest fotograferade platser. Räksmörgåsen vid kajen är ett absolut måste.' },
      { q: 'När är bäst tid att besöka Smögen?', a: 'Juni är lugnt och vackert. Juli–aug är högsäsong – Smögen är då ett av Sveriges mest besökta resmål. September är underskattad: varmt hav, inga köer och restaurangerna fortfarande öppna.' },
      { q: 'Kan man bada vid Smögen?', a: 'Ja – Hällorna naturreservat precis norr om Smögen erbjuder klippbad och naturpooler. Västerhavet är svalt men klart. De bästa klippbadsplatserna är söder och norr om bryggan.' },
    ],
  },
  {
    slug: "naturhamnar-guide",
    title: "Bästa naturhamnarna i Stockholms skärgård",
    excerpt: "Ankringsplatser med svängrum, vindskydd och vacker natur. Vår topplista.",
    category: "Praktisk", emoji: "⚓", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vad är en naturhamn?', a: 'En naturhamn är en skyddad vik eller sund utan kommersiell brygga där båtarna ankrar fritt. De erbjuder vind- och vågskydd, ofta med klippor och skog runtomkring. Populära naturhamnar i Stockholms skärgård inkluderar Kyrkfjärden på Nämdö och vikarna runt Blidö.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Är det gratis att ligga i naturhamn?', a: 'Ja, att ankra i naturhamnar är gratis och täcks av allemansrätten. Privata gästbryggor kostar däremot 150–300 kr/natt. Naturhamnarna ute i ytterskärgården är generellt mer tillgängliga och okrowdade.' },
      { q: 'Vilken är den bästa naturhamnen i Stockholms skärgård?', a: 'Kyrkfjärden på Nämdö anses av många som skärgårdens vackraste naturhamn – djup, skyddad och med storslagen natur. Ornöfjärden och vikarna runt Gällnö är andra klassiker bland seglare och motorbåtsfolk.' },
    ],
  },
  {
    slug: "bohuslan-skargard-guide",
    title: "Bohuslän – guide till västkustens skärgård",
    excerpt: "Från Göteborg till Kosterfjorden: öar, hamnar, mat och transport.",
    category: "Region",
    emoji: "🌊",
    readTime: "10 min",
    fullContent: true,
    faqs: [
      { q: 'Vad är Bohuslän känt för?', a: 'Bohuslän är känt för hav, klippor, skaldjur och pittoreska fisklägen. Höjdpunkterna är Kosteröarna, Grebbestad (ostron och hummer), Smögen, Fjällbacka och Marstrand.' },
      { q: 'Hur tar man sig till Bohuslän utan bil?', a: 'Västtrafik kör bussar och tåg längs kusten. Från Göteborg tar det ca 1–1,5 timme med buss till Lysekil eller Smögen. Kosteröarna nås med färja från Strömstad.' },
      { q: 'Vilken är bästa årstiden för Bohuslän?', a: 'Juli–augusti för sol och bad. September för hummerpremieren (21 sep) och ostronstängning utan folkmassor. Oktober–november för stillhet och höststämning vid klipporna.' },
      { q: 'Är Bohuslän bättre än Stockholms skärgård?', a: 'Det beror på vad du söker. Bohuslän erbjuder vildare klippmiljöer, Västerhavet och Nordens bästa skaldjur. Stockholms skärgård har fler öar (ca 30 000), bättre kollektivtrafik och ett mer varierat landskap.' },
    ],
  },
  {
    slug: "norrtelje-guide",
    title: "Norrtälje – porten till norra skärgården",
    excerpt: "Stad, sommarmarknad och norra skärgårdens fridfulla öar. En helgguide.",
    category: "Region", emoji: "⛵", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Norrtälje?', a: 'Med buss 676 från Tekniska Högskolan (T-bana) eller direktbuss från Stockholm City – ca 1,5 timme. Med bil via E18 tar det ca 70 km norr om Stockholm.' },
      { q: 'Vad finns att göra i Norrtälje?', a: 'Norrtälje har en charmig gammal stadskärna, Pythagoras industrimuseum, sommarteater och en av Upplands bästa matscener. Från Norrtälje nås öar som Arholma, Blidö och Singö med båt eller bilfärja.' },
      { q: 'Vilka öar kan man nå från Norrtälje?', a: 'Med Waxholmsbolaget nås Arholma, Björkö och norra skärgårdens öar. Bilfärjan går till Blidö och Singö direkt från Norrtälje. Det är en perfekt basstad för att utforska norra ytterskärgården.' },
    ],
  },
  {
    slug: "fjaderholmarna-guide",
    title: "Fjäderholmarna – dagstur 25 minuter från stan",
    excerpt: "Hur du tar dig dit, vad du gör och äter. Perfekt introduktion till skärgårdslivet.",
    category: "Region",
    emoji: "⛴",
    readTime: "5 min",
    fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Fjäderholmarna?', a: 'Med Strömma från Nybroplan eller Slussen, tar ca 25 minuter. Avgångarna är täta under sommarsäsongen (maj–september). Waxholmsbolaget trafikerar också Fjäderholmarna från Strömkajen.' },
      { q: 'Kostar det att åka till Fjäderholmarna?', a: 'Biljetten med Strömma kostar ca 120–150 kr tur/retur. Det är inte inkluderat i SL-kortet. Entrén till ön är gratis.' },
      { q: 'Är Fjäderholmarna bra med barn?', a: 'Ja, Fjäderholmarna är ett av Stockholms bästa barnalternativ i skärgården. Närheten till stan, korta båtresan och aktiviteterna (hantverk, akvariet Estrange, glass) gör det till en perfekt familjedagstur.' },
      { q: 'När är Fjäderholmarna öppet?', a: 'Säsongen är maj–september. Under höst och vinter går begränsad trafik och de flesta restauranger och butiker är stängda.' },
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
    title: "De 15 bästa öarna i Stockholms skärgård",
    excerpt: "Från lättillgängliga Fjäderholmarna till avlägsna Svenska Högarna. Rankad lista.",
    category: "Region", emoji: "🏝", readTime: "10 min", fullContent: true,
    faqs: [
      { q: 'Vilken ö är bäst i Stockholms skärgård?', a: 'Det beror på vad du söker. Sandhamn är bäst för seglarliv och restauranger. Utö är bäst för historia och havsbastu. Grinda är bäst för barnfamiljer. Arholma och Landsort är bäst för ytterskärgårdens vildmark.' },
      { q: 'Hur många öar finns i Stockholms skärgård?', a: 'Ca 30 000 öar, kobbar och skär beroende på definition. Ungefär 1 000 är bebodda åtminstone sommartid. Stockholms skärgård sträcker sig från Norrtälje i norr till Nynäshamn i söder.' },
      { q: 'Vilken ö i Stockholms skärgård är lättast att nå?', a: 'Fjäderholmarna är lättast – bara 25 minuter med båt från Nybroplan eller Slussen. Vaxholm tar ca 55 minuter med pendelbåt. Dessa är perfekta för dagsutflykter utan lång restid.' },
      { q: 'Vilka öar i skärgården är bilfria?', a: 'Sandhamn, Grinda, Finnhamn, Utö (för turister), Gällnö och de flesta ytterskärgårdsöar är bilfria eller starkt bilbegränsade. Det är en stor del av charmen – du lämnar bilen på fastlandet.' },
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
      { q: 'Hur tar man sig till Vaxholm?', a: 'Pendelbåt 83/83X från Strömkajen tar ca 55 min. SL-buss 670 från Tekniska Högskolan T-bana tar ca 50 min och ingår i SL-abonnemanget. Med bil via E18 och Vaxholmsvägen tar det ca 40 min.' },
      { q: 'Är SL-kortet giltigt till Vaxholm?', a: 'SL-kortet gäller för bussresan (linje 670), men INTE på Waxholmsbolagets pendelbåt. Pendelbåten kräver separat biljett via Waxholmsbolagets app eller hemsida.' },
      { q: 'Vad gör man i Vaxholm på en dag?', a: 'Besök Vaxholms fästning (museum, guidade turer), promenera längs Hamngatan med sina trävillor, ät lunch på Waxholms Hotell med havsvy och utforska de lokala butikerna. Räkna med 4–6 timmar för en bekväm dagstur.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Är Vaxholms fästning värd ett besök?', a: 'Ja. Fästningen är ett av Stockholms läns bäst bevarade historiska monument från 1500-talet och har fantastisk utsikt över Mysingen. Nås med en liten roddbåt från hamnen (ca 20 kr). Öppen maj–september.' },
      { q: 'Kan man äta gott i Vaxholm?', a: 'Ja. Waxholms Hotell har en av skärgårdens bästa restauranger med havsvy. Hembygdsgårdens café serverar traditionell skärgårdsmat. Det finns även flera bagerier och caféer längs Hamngatan.' },
    ],
  },
  {
    slug: "landsort-guide",
    title: "Landsort – skärgårdens sydligaste utpost",
    excerpt: "Fyren, det unika klimatet och stillheten längst ut i södra ytterskärgården.",
    category: "Region", emoji: "🏮", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Landsort?', a: 'Med Waxholmsbolaget från Nynäshamn – resan tar ca 1,5 timmar. Landsort är den sydligaste punkten i Stockholms skärgård och kräver planering då avgångarna är begränsade, speciellt utanför högsäsong.' },
      { q: 'Vad är Landsort känt för?', a: 'Landsort har ett av Sveriges äldsta fyrtorn (1669), ett unikt mikroklimat med mildare vintrar än fastlandet och en dramatisk ytterskärgårdsnatur. Ön är bilfri och har ett genuint fiskeläge.' },
      { q: 'Kan man övernatta på Landsort?', a: 'Ja, det finns ett vandrarhem på ön och möjlighet att hyra stugor. Tältning är möjlig men ön är liten – planera var du slår upp tältet. Boka boende i god tid under sommaren.' },
      { q: 'Är Landsort värt resan?', a: 'Absolut om du söker verklig ytterskärgård med vildmark och historisk atmosfär. Landsort är inte en turistdestination med utbud – det är en ö för dem som vill ha stillhet, havsöppning och natur utan folkmassor.' },
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
    title: "Pendelbåtar i Stockholm – guide till linjerna",
    excerpt: "Waxholmsbolaget, Strömma och privatlinjer: alla pendelbåtar och när de går.",
    category: "Transport",
    emoji: "⛴",
    readTime: "6 min",
    fullContent: true,
    faqs: [
      { q: 'Vilka pendelbåtslinjer finns i Stockholm?', a: 'Waxholmsbolaget driver flest linjer – till Vaxholm (83/83X), Lidingö, Djurgården, Nacka Strand och ytterskärgården. Strömma trafikerar Djurgården, Fjäderholmarna och turistlinjerna. SL-zonen täcker pendelbåtarna närmast stan.' },
      { q: 'Gäller SL-kortet på Waxholmsbolaget?', a: 'SL-kortet gäller på Waxholmsbolagets linjer inom SL-zonen A+B. Det inkluderar bl.a. trafiken till Vaxholm och närmaste öar. För yttre skärgården (Grinda, Sandhamn, Utö) behövs Waxholmsbolagets egna biljetter.' },
      { q: 'Hur lång tid tar båten till Vaxholm?', a: 'Pendelbåt 83 från Strömkajen i centrala Stockholm tar ca 55 minuter till Vaxholm. Det är den snabbaste vägen och går året om.' },
      { q: 'Hur bokar man biljett till Waxholmsbolaget?', a: 'Biljetter köps i appen Waxholmsbolaget, på waxholmsbolaget.se eller direkt ombord med kort. Årskortet "Skärgårdskortet" är lönsamt om du gör fler resor per säsong.' },
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
    title: "Åland – komplett guide till det svenska Finland",
    excerpt: "Autonomt örike, fri hamn, cykling och skärgård. Färja från Stockholm och allt du behöver veta för ett Ålandsbesök.",
    category: "Region",
    emoji: "🏝",
    readTime: "10 min",
    fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Hur tar man sig till Åland från Stockholm?', a: 'Med Viking Line eller Tallink Silja från Stockholm (Värtahamnen) till Mariehamn. Resan tar ca 10–11 timmar och erbjuds som nattfärja. Priserna börjar på ca 100–200 kr/person för en enkelbiljett.' },
      { q: 'Behöver man pass för att besöka Åland?', a: 'Nej, Åland är en del av Finland och EU. Svenskar behöver inget pass, ett nationellt ID-kort räcker. Åland har dock tullfri status (fri hamn) – cigaretter och alkohol kan köpas billigt ombord.' },
      { q: 'Vad kan man göra på Åland?', a: 'Cykla längs de välskötta cykelvägarna, besöka Kastelholms slott, bada vid sandstränderna i Bomarsund, utforska Ålands unika skärgård med hyrbåt eller kayak.' },
      { q: 'Vilket språk talas på Åland?', a: 'Svenska är det officiella språket på Åland trots att öriket är en del av Finland. Alla skyltar, menyer och service är på svenska.' },
    ],
  },
  {
    slug: "gotland-guide",
    title: "Gotland – komplett guide till Sveriges största ö",
    excerpt: "Visby medeltidsstad, raukar, sandstränder och sommarens hetaste matscen. Allt om Gotland sammanfattat.",
    category: "Region",
    emoji: "🏰",
    readTime: "11 min",
    fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Gotland?', a: 'Med Destination Gotlands färja från Nynäshamn (ca 3 timmar) eller Oskarshamn (ca 3 timmar). Fly från Arlanda med BRA Airlines eller SAS tar ca 45 minuter. Boka färja 2–3 månader i förväg för sommarsäsongen – especiellt om du tar med bil.' },
      { q: 'Behöver man bil på Gotland?', a: 'Bil är praktiskt men inte nödvändigt. Visby är lätt att utforska till fots eller med cykel. Vill du se raukar, Fårö eller södra kusten behöver du bil eller buss. Hyrcyklar finns i Visby och passar utmärkt för dagsturer utanför stadsmuren.' },
      { q: 'När är bäst tid att besöka Gotland?', a: 'Juni och tidigt juli är bäst – varmt, grönt och folkmängden ännu hanterbar. Medeltidsveckan (2–9 aug 2026) är en unik upplevelse men Visby är fullpackat. Maj och september är lugna och vackra alternativ med öppna restauranger.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar en resa till Gotland?', a: 'Färja tur/retur kostar 400–900 kr per person. Hyrbil på plats ca 600–1 200 kr/dag i högsäsong. Boende i Visby: 900–2 500 kr/natt. Räkna med 2 000–4 000 kr per person och dygn allt inräknat i juli.' },
      { q: 'Vad är raukar och var hittar man dem?', a: 'Raukar är naturliga kalkstenspelare formade av havet under miljoner år. De bästa rauk-platserna är Langhammars och Gamla Hamn på Fårö, Holmhällar i söder och Folhammar. Fårös raukar kräver tillstånd att besöka under häckningstid (april–juni).' },
    ],
  },
  {
    slug: "oland-guide",
    title: "Öland – guide till solens och vindarnas ö",
    excerpt: "Alvaret, Borgholm slott, Böda sand och cykelleder. Komplett guide till Öland – broförbindelsen och allt på ön.",
    category: "Region",
    emoji: "🌾",
    readTime: "9 min",
    fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Öland?', a: 'Med bil eller buss via Ölandsbron från Kalmar – bron är gratis. Med tåg till Kalmar (ca 4h från Stockholm) och sedan buss 101 eller taxi till Borgholm. Ingen färja behövs – bron är öppen dygnet runt.' },
      { q: 'Behöver man hyra bil på Öland?', a: 'Bil är starkt rekommenderat. Öland är 137 km lång och kollektivtrafiken täcker inte hela ön. Hyrbil i Kalmar är billigast, alternativt i Borgholm. Cykel fungerar utmärkt i närheten av Borgholm och längs kustleder.' },
      { q: 'Är Ölandsbron gratis?', a: 'Ja, Ölandsbron är helt gratis för alla fordon. Den är 6 km lång och förbinder Kalmar med norra Öland vid Färjestaden.' },
      { q: 'Vad är Alvaret?', a: 'Alvaret är ett flackt kalkstenslandskap som täcker södra Öland och är UNESCO-världsarv sedan 2000. Det är ett unikt ekosystem med orkidéer, lavar och beteslandskap som inte finns någon annanstans i världen. Bäst att besöka maj–juni när blommorna blommar.' },
      { q: 'Vad är bäst att göra på Öland?', a: 'Cykla längs kusten, bada på Böda sand (Sveriges längsta sandstrand, 20 km), besöka Borgholms slottsruin och se Solliden (kungafamiljens sommarslott). Alvaret och fågelsjön Hornborga är höjdpunkter för naturintresserade.' },
    ],
  },
  {
    slug: "kosterarna-guide",
    title: "Kosteröarna – guide till Sverige första marina nationalpark",
    excerpt: "Nordkoster och Sydkoster vid norska gränsen. Dykning, cykling, bilfria öar och Kosterfjordens unika marina liv.",
    category: "Region", emoji: "🌊", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Kosteröarna?', a: 'Med Kosterfjorden Rederi eller Strömstad Havsbuss från Strömstad. Resan tar ca 30–45 minuter. Med kollektivtrafik tar du Västra Götalandståg till Strömstad, sedan färja till öarna.' },
      { q: 'Vad är Kosterhavet?', a: 'Kosterhavets nationalpark är Sveriges enda marina nationalpark och Europas artrikaste hav norr om Portugal. Djupa korallrev, sjöborrar, hummer och hundratals marina arter finns i Kosterfjorden.' },
      { q: 'Är Kosteröarna bilfria?', a: 'Ja, Sydkoster och Nordkoster är bilfria för turister. Du tar dig runt till fots, med cykel (som kan hyras på öarna) eller med de lokala båtarna mellan öarna. Det är en stor del av charmen.' },
      { q: 'Vad är skillnaden på Nord- och Sydkoster?', a: 'Sydkoster är större med mer service, restauranger och boende. Nordkoster är mer vild och ostörd med en liten restaurang och enklare övernattning. De flesta turister börjar på Sydkoster.' },
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
    title: "Båtkörkort i Sverige – guide till sjömansmärket",
    excerpt: "Vad krävs egentligen för att köra båt i Sverige? Sjömansmärket, kustskepparexamen och hur du tar körkortet.",
    category: "Praktisk", emoji: "🎓", readTime: "7 min", fullContent: true, topics: ['hyra-bat'],
    faqs: [
      { q: 'Krävs det körkort för att köra båt i Sverige?', a: 'Det finns inget lagstadgat krav på båtkörkort i Sverige för de flesta fritidsbåtar under 12 meter. Däremot krävs förarintyg (SBF/SSRS) för att hyra de flesta motorbåtar, och kustskepparexamen rekommenderas starkt för havsseglar.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad är skillnaden på förarintyg och kustskepparexamen?', a: 'Förarintyget (SBF Förarintyg) är ett grundläggande körkort för motorbåt i inre vatten och kustnära farleder. Kustskepparexamen är mer avancerat och ger rätt att ta ut båten längre offshore. Priser: förarintyg ca 1 500–2 500 kr, kustskeppar ca 3 500–6 000 kr.' },
      { q: 'Hur lång tid tar det att ta båtkörkort?', a: 'Förarintyg kan genomföras på 1–2 helger (teori + praktik). Kustskepparexamen tar vanligen 2–4 helger eller en veckobaserad kurs. Det finns också online-kurser för teoridelen.' },
      { q: 'Behöver jag båtkörkort för att hyra kajak eller SUP?', a: 'Nej, kajak, SUP och roddbåt kräver inget körkort. Hyra av motorbåt kräver vanligen att du kan visa SBF förarintyg eller liknande behörighet.' },
    ],
  },
  {
    slug: "ingmarso-guide",
    title: "Ingmarsö – guide till det bilfria livet i norra skärgården",
    excerpt: "Ingmarsö är en bilfri ö med vandringsleder, badplatser och ett riktigt skärgårdsliv. Transport, aktiviteter och praktisk info.",
    category: "Region", emoji: "🌿", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Ingmarsö?', a: 'Med Waxholmsbolaget från Strömkajen i Stockholm – resan tar ca 2–2,5 timmar via Vaxholm. Ingmarsö ligger i norra Stockholms skärgård och nås årsrunt, men trafiken är glesare på vintern.' },
      { q: 'Är Ingmarsö bilfri?', a: 'Ingmarsö är bilfri för besökare. Ön nås inte med bilfärja. Du lämnar bilen hemma och tar dig runt till fots eller med cykel. Det är en av anledningarna till att ön känns genuint skärgårdsig och ostörd.' },
      { q: 'Vad kan man göra på Ingmarsö?', a: 'Vandra längs öns leder med havsutsikt, bada i naturhamnarna, fika vid bystugan och uppleva det stilla skärgårdslivet. Ön är inte en turistdestination i vanlig mening – det är en ö med riktiga bofasta och genuint liv.' },
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
    title: "Fjällbacka – guide till klippornas stad",
    excerpt: "Kungsklyftan, Ingrid Bergman och Camilla Läckbergs hemstad. Allt om Fjällbacka på västkusten.",
    category: "Region", emoji: "🪨", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Fjällbacka?', a: 'Med Västtrafik buss från Göteborg (ca 2,5 timmar) eller med bil via E6 mot Strömstad, avfart Fjällbacka. Buss 875 kör direkt från Göteborg under sommarsäsongen.' },
      { q: 'Vad är Kungsklyftan i Fjällbacka?', a: 'Kungsklyftan är en dramatisk klippspricka mitt i Fjällbacka centrum som klyver berget på ett unikt sätt. Den är ett av Bohusläns mest fotograferade naturwonders och kan nås till fots direkt från hamnen.' },
      { q: 'Vad har Fjällbacka med Ingrid Bergman att göra?', a: 'Ingrid Bergman tillbringade många somrar i Fjällbacka och begravdes på kyrkogården i byn. Staden hyllar henne med ett torg uppkallat efter henne och ett monument vid hamnen. Camilla Läckbergs deckare utspelar sig i Fjällbacka.' },
      { q: 'Kan man bada vid Fjällbacka?', a: 'Ja, klipporna utanför Fjällbacka erbjuder fantastiska bad i Västerhavet. Båttur till öarna utanför (Valö, Käringön) ger ännu mer exotisk badupplevelse. Havstemperaturen är 18–22°C i juli.' },
    ],
  },
  {
    slug: "lysekil-guide",
    title: "Lysekil – guide till Havets Hus och klipporna",
    excerpt: "Havets Hus, klippbad, räksmörgåsar och kommunikationer till Lysekil på västkusten.",
    category: "Region", emoji: "🐟", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Lysekil?', a: 'Med Västtrafik buss från Göteborg – ca 1,5–2 timmar. Med bil via E6 och rv161 tar det ca 13 mil norr om Göteborg. Alternativt buss till Fiskebäckskil och färja över sundet till Lysekil (ca 5 minuter).' },
      { q: 'Vad är Havets Hus i Lysekil?', a: 'Havets Hus är Bohusläns främsta akvariemuseum med levande djur från Nordsjön och Kosterfjorden. Hajar, rockor och det unika hummerbassänget är höjdpunkterna. Perfekt vid regnväder eller med barn.' },
      { q: 'Vad är det bästa att göra i Lysekil?', a: 'Klippbad norr om stan, räksmörgås vid Lysekils torget, besök Havets Hus och vandra ut till Stångehuvud naturreservat med panoramautsikt mot Västerhavet. Solnedgång från Stångehuvud är en av Bohusläns vackraste.' },
    ],
  },
  { slug: "bornholm-guide", title: "Bornholm från Sverige – guide till den danska klippön", excerpt: "Rökta sill, runda kyrkor och Hammershus. Hur du tar dig till Bornholm från Sverige och vad du gör när du är där.", category: "Region", emoji: "🇩🇰", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Bornholm från Sverige?', a: 'Färja från Ystad till Rønne med BornholmerFærgen – ca 80 min med snabbfärja. Alternativt flyg från Kastrup (20 min). Färja är billigast och tar fordon.' }, { q: 'Vad är Bornholm känt för?', a: 'Hammershus fästningsruin (Nordens största), runda medeltidskyrkor, Gudhjem rökeriet med rökt sill, och vackra sandstränder i söder. Öns klippor och ljus lockar konstnärer.' }] },
  {
    slug: "dalaro-guide",
    title: "Dalarö – porten till södra Stockholms skärgård",
    excerpt: "Historisk fortstäning, levande hamnmiljö och startpunkt för Ornö- och Utö-turer. Guide till Dalarö.",
    category: "Region", emoji: "⚓", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Dalarö?', a: 'Med buss 834 från Slussen (Waxholmsbolagets linje, ingår i SL-zon). Eller med Waxholmsbolaget båt från Strömkajen. Med bil via Nynäsvägen och Dalarövägen, ca 45 km söder om Stockholm.' },
      { q: 'Vad är Dalarö känt för?', a: 'Dalarö har en av södra skärgårdens bästa hamnmiljöer med gamla trävillor och ett genuint fiskeläge. Dalaröskansen (1600-talets fästningsverk) och det kulturhistoriska centrumet gör Dalarö till ett av södra skärgårdens mest välbevarade samhällen.' },
      { q: 'Kan man ta båt till Utö och Ornö från Dalarö?', a: 'Ja, Dalarö är en av startpunkterna för båttrafik söderut i skärgården. Waxholmsbolaget kör till Ornö och Utö via Dalarö. Bra alternativ till Nynäshamn om du bor i Nacka eller Haninge.' },
    ],
  },
  { slug: "barplockning-skargarden", title: "Bärplockning i skärgården – blåbär, lingon och hallon", excerpt: "Skärgårdens öar är fullspäckade med bär. Säsong, bästa öar och allt om bärplockning med allemansrätten.", category: "Aktivitet", emoji: "🫐", readTime: "5 min", fullContent: true, faqs: [{ q: 'Vilka bär kan man plocka i Stockholms skärgård?', a: 'Blåbär (jul–aug), lingon (aug–sept), hallon (jul–aug) och smultron (jun–jul) finns i rikliga mängder. Hjortron finns i norr (Höga Kusten, norrland). Speciellt Oxelösund och Möja är bärrika.' }, { q: 'Gäller allemansrätten för bärplockning på privata öar?', a: 'Ja – allemansrätten tillåter bärplockning på alla marker inklusive privat mark. Plocka inte direkt vid bostäder och ta inte mer än du kan använda. Inte tillåtet i planterade trädgårdar.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "solnedgang-skargarden", title: "Bästa solnedgångarna i Stockholms skärgård", excerpt: "De vackraste platserna för solnedgång – vilka öar, vilken sida och vid vilken tid. En guide för fotografer och romantiker.", category: "Aktivitet", emoji: "🌅", readTime: "5 min", fullContent: true, faqs: [{ q: 'Vilka öar är bäst för solnedgång i Stockholms skärgård?', a: 'Sandhamns västsida, Möja och Arholmas klipputsikter ger spektakulära solnedgångar i juli. Utblick mot väster behövs – öar öster om Waxholm har ofta fel väderstreck.' }, { q: 'Vilken tid på dygnet är solnedgången i skärgården i juli?', a: 'I juli: solnedgång ca 21:30–22:00. I juni kring midsommar: solnedgång sent, men nästan ingen "mörk" natt. Bäst ljus: 30 min innan solnedgång (golden hour).' }] },
  { slug: "ankra-sova-bat", title: "Ankra och övernatta på båt i skärgården", excerpt: "Bästa naturhamnarna, ankringstekniker, regler och hur du sover gott ute i öarna på din båt.", category: "Praktisk", emoji: "⚓", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa naturhamnarna i Stockholms skärgård?', a: 'Käbblo, Grönskär, Märsgarn (Möja), Sandnäs (Sandhamn) och Ingaröfjärden är populära naturhamnar. Bluechart-appen och Navionics visar djup och vindskydd.' }, { q: 'Vad gäller för ankring i Stockholms skärgård?', a: 'Allemansrätten gäller på vatten – fri ankring utom i naturreservat med förbud. Håll 300 m avstånd från bebodda fastigheter. Ankra ej i sjöfartsleder. Naturhamnar utan brygga är fria att använda.' }] },
  // ── Batch B: ö-guider + tematiska guider ───────────────────────────────────
  {
    slug: "moja-guide",
    title: "Möja – guide till skärgårdens egna stad",
    excerpt: "Möja har butik, krog, cyklar och natur. Så tar du dig dit, vad du gör och varför Möja är mitt i skärgårdslivet.",
    category: "Region", emoji: "🏝", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Möja?', a: 'Med Waxholmsbolaget från Strömkajen – resan tar ca 2–2,5 timmar via Vaxholm. Möja är en av skärgårdens folkrikaste öar med ca 500 bofasta och daglig båtförbindelse. Du kan också ta buss till Stavsnäs och korta resan.' },
      { q: 'Vad kan man göra på Möja?', a: 'Möja är en av de få öar i skärgården med riktig service: Systembolaget (öppet sommartid), matbutik, restaurang och cykelhyra. Cykla runt ön, bada i naturhamnarna och se solnedgången från Möjatorget.' },
      { q: 'Kan man övernatta på Möja?', a: 'Ja, det finns vandrarhem, stugor och gästhamn. Möja är en av de bästa öarna för övernattning i Stockholms skärgård – lagom avlägsen men med ordentlig service. Boka i god tid för juli.' },
      { q: 'Är Möja bilfri?', a: 'Möja är inte helt bilfri – bofasta har bilar, men turister tar sig dit med båt och cyklar på ön. Det finns cykelhyra vid bryggan. Öns vägar lämpar sig utmärkt för cykling.' },
    ],
  },
  {
    slug: "grinda-guide",
    title: "Grinda – komplett guide till familjeön",
    excerpt: "Grinda är skärgårdens barnvänligaste ö. Wärdshuset, sandstranden, kajakarna och kvällsbåten hem.",
    category: "Region",
    emoji: "🌿",
    readTime: "6 min",
    fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Hur lång är resan till Grinda?', a: 'Ca 1h 45min med Waxholmsbolaget linje 11 från Strömkajen. Cinderellabåten tar ca 1h 20min under sommarsäsongen. Biljett kostar ca 200 kr enkel resa med Waxholmsbolaget.' },
      { q: 'Kan man övernatta på Grinda?', a: 'Ja. Grinda Wärdshus erbjuder rum och stugor. Det finns också ett vandrarhem och möjlighet att tälta på södra sidan av ön. Boende bör bokas långt i förväg – Grinda är fullbokat under hela sommarsäsongen.' },
      { q: 'Är Grinda bra för barnfamiljer?', a: 'Grinda är ett av skärgårdens allra bästa val för barnfamiljer. Ön har sandstrand med grunt vatten, kajakhyrning anpassad för barn, ett trevligt värdshus och är liten nog att utforska på en dag. Båtresan är lagom lång för de flesta barn.' },
      { q: 'Kan man bada på Grinda?', a: 'Ja, Grinda har sandstrand med grunt och varmt vatten på södra sidan. Det är en av de bättre badstränderna i Stockholms skärgård. Vattnet brukar hålla 20–22°C i juli och tidigt augusti.' },
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
    title: "Nåttarö – tältarens favorit i södra skärgården",
    excerpt: "Nåttarö är känd för sitt campingområde och långa sandstränder. Guide till transport, boende och naturupplevelser.",
    category: "Region", emoji: "🏕", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Nåttarö?', a: 'Med Waxholmsbolaget från Nynäshamn eller via Ornö. Resan tar ca 1–1,5 timmar från Nynäshamn. Nåttarö är en av södra skärgårdens mest välbesökta öar för campingentusiaster.' },
      { q: 'Vad är Nåttarö känt för?', a: 'Nåttarö har en av Stockholms skärgårds finaste sandstränder och ett etablerat campingområde med toaletter och sophantering. Ön är ett populärt mål för tältare och kajakpaddlare.' },
      { q: 'Kan man hyra stuga på Nåttarö?', a: 'Ja, det finns stugor och enklare boende på ön. Campingplatsen är den vanligaste boendeformen. Boka i god tid för högsommar – Nåttarö är populärt bland familjer och friluftsälskare.' },
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
    title: "Skärgården med hund – regler, öar och tips",
    excerpt: "Vad gäller för hund i skärgården? Var är hund tillåten, var krävs koppel och vilka öar passar bäst?",
    category: "Praktisk", emoji: "🐕", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Får man ta med hund på båten i skärgården?', a: 'Ja, Waxholmsbolaget tillåter hundar ombord men hunden ska hållas i koppel och inte störa andra passagerare. Vissa linjer har begränsningar under högsäsong. Kontrollera alltid aktuella regler på waxholmsbolaget.se.' },
      { q: 'Var är hund tillåten i skärgården?', a: 'Hunden ska vara kopplad i naturreservat och på anvisade bad- och campingplatser. Enligt allemansrätten får hunden följa med på vandring men ska vara under kontroll. Under fåglarnas häckningstid (april–juli) gäller extra restriktioner nära stränder.' },
      { q: 'Vilka öar passar bäst med hund?', a: 'Ornö och Nåttarö med sina stora skogsområden passar utmärkt. Ingmarsö och Ljusterö är bra för längre promenader. Undvik Fjäderholmarna och Sandhamn i högsäsong – för trångt och stressigt för de flesta hundar.' },
    ],
  },
  {
    slug: "romantisk-weekend-skargarden",
    title: "Romantisk weekend i skärgården – bästa alternativen",
    excerpt: "Havsutsikt, värdshus och solnedgång från klippan. De bästa öarna och boendena för en par-weekend i skärgården.",
    category: "Praktisk", emoji: "❤️", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilken ö är bäst för en romantisk weekend i skärgården?', a: 'Sandhamn och Utö toppar listan. Sandhamns Värdshus ger seglarliv och exklusiv stämning. Utö Värdshus har havsbastu och natursköna omgivningar. Grinda passar par som vill ha lite mer stillhet och naturkontakt.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar en romantisk skärgårdsweekend?', a: 'Räkna med 2 500–5 000 kr per person för en hel weekend med transport, boende och restaurang. Dubbelrum på Sandhamns Värdshus kostar 2 000–3 500 kr/natt. Mer budgetvänliga alternativ finns på vandrarhem på Finnhamn (500–900 kr/natt).' },
      { q: 'Vad ska man göra för en romantisk upplevelse i skärgården?', a: 'Havsbastu följt av champagne på klippan. Solnedgång från Utös höjder. Middag på värdshuset med havsvy. Morgondopp och frukost i naturhamnen. Kajakpaddling för två i lugnt väder.' },
    ],
  },
  {
    slug: "svampplockning-skargarden",
    title: "Svampplockning i skärgården – säsong och platser",
    excerpt: "Kantareller, karljohan och trattkantareller väntar i skärgårdens skogar. Bästa öarna och säsongstips.",
    category: "Aktivitet", emoji: "🍄", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'När är bästa tid för svampplockning i skärgården?', a: 'Kantareller dyker upp i juli–aug. Karljohan och trattkantareller är bäst i september–oktober. Höstsvamparna efter regn i september är skärgårdens bästa. Ta med en lokal svampbok eller appen iNaturalist för bestämning.' },
      { q: 'Vilka öar är bäst för svampplockning?', a: 'Öar med lövblandskogar och lite fukt är bäst. Ornö, Nåttarö, Möja och Ljusterö erbjuder goda svampmarker. Undvik öar med enbart klipphäll – svamp växer i skog och fuktiga gränszoner.' },
      { q: 'Vad gäller för svampplockning i naturreservat?', a: 'Plocka svamp för eget bruk är tillåtet enligt allemansrätten, även i naturreservat. Begränsningar gäller för storskalig kommersiell plockning. Följ eventuella lokala reservatsregler.' },
    ],
  },
  {
    slug: "pingst-skargarden",
    title: "Pingst i skärgården – öppna öar och första sol",
    excerpt: "Pingst är startskottet för skärgårdssäsongen. Vilka öar är öppna, var håller de pingstfirande och vad kan du göra?",
    category: "Säsong", emoji: "🌷", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'När infaller pingst 2026?', a: 'Pingstdagen 2026 infaller den 24 maj, med pingstafton den 23 maj och annandag pingst den 25 maj. Det ger en lång helg med tre lediga dagar – perfekt för en skärgårdstur.' },
      { q: 'Vilka öar i skärgården är öppna till pingst?', a: 'De flesta värdshus och restauranger öppnar till pingsthelgen. Fjäderholmarna, Vaxholm och Grinda är säkra kort. Sandhamn och Utö är normalt öppna. Ring i förväg – säsongsstart varierar år från år.' },
      { q: 'Hur kallt är det i skärgården till pingst?', a: 'Lufttemperaturen i Stockholm i maj är ca 10–18°C. Havstemperaturen är 8–12°C – för kallt för de flesta att bada. Ta med lager-på-lager-kläder. Solskydd behövs ändå med det ljusa majljuset.' },
    ],
  },
  {
    slug: "foretagsevent-skargarden",
    title: "Företagsevent i skärgården – guide och inspiration",
    excerpt: "Skärgården är den perfekta scenen för kickoff, AW och teambuilding. Öar, anläggningar och aktiviteter för grupper.",
    category: "Praktisk", emoji: "🏢", readTime: "7 min", fullContent: true, topics: ['teambuilding'],
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar ett företagsevent i skärgården?', a: 'Räkna med 1 500–4 000 kr/person för en dag inklusive transport, aktiviteter och mat. Heldagspaket med segling och restaurang ligger på 2 500–3 500 kr/person. Övernattningspaket kostar 3 500–6 000 kr/person.' },
      { q: 'Vilka aktiviteter fungerar bäst för grupper i skärgården?', a: 'Segeldag, kajakpaddling, matlagning med skärgårdsråvaror och havsbastu är de populäraste teambuilding-aktiviteterna. Segling kräver ingen erfarenhet och ger naturlig teamdynamik ombord.' },
      { q: 'Hur stor grupp fungerar för skärgårdsevent?', a: 'Allt från 10–200 personer fungerar. Mindre grupper (10–30) kan ta en segelbåt eller konferensanläggning på en ö. Stora grupper bokas via charterbåt och öar med större kapacitet som Fjäderholmarna.' },
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
    title: "Grinda vs Finnhamn – vilken ö passar dig?",
    excerpt: "Grinda är familjevänligt med värdshus, Finnhamn är vandrarhem och vildmark. En ärlig jämförelse.",
    category: "Region", emoji: "⚖", readTime: "5 min", fullContent: true,
    faqs: [
      { q: 'Vad är den viktigaste skillnaden mellan Grinda och Finnhamn?', a: 'Grinda är mer polerat med ett värdshus som hanterar många gäster och en mer lättillgänglig känsla. Finnhamn är råare – vandrarhem, naturhamnar och en känsla av verklig ytterskärgård trots att båten tar ca 2 timmar.' },
      { q: 'Vilken ö passar bäst för barnfamiljer?', a: 'Grinda vinner för barnfamiljer. Sandstrand, trampolin, kortare båtresa och ett värdshus som är van vid barn gör Grinda till ett säkrare kort. Finnhamn passar bättre för lite äldre barn som gillar vandring och naturupplevelser.' },
      { q: 'Är prisskillnaden stor mellan Grinda och Finnhamn?', a: 'Ja. Grinda Wärdshus ligger i den övre prisklassen, medan STF:s vandrarhem på Finnhamn är budgetalternativet — se aktuella priser hos respektive. Om du vill ha skärgård utan att tömma plånboken är Finnhamn det självklara valet.' },
    ],
  },
  // ── Batch A: nya fullContent-guider ────────────────────────────────────────
  {
    slug: "stockholm-archipelago-trail",
    title: "Stockholm Archipelago Trail – komplett guide",
    excerpt: "270 km vandringsled över 20 öar från Arholma till Landsort. Utsedd till en av världens bästa upplevelser av TIME Magazine 2025. Etapper, transport och tips.",
    category: "Aktivitet",
    emoji: "🥾",
    readTime: "10 min",
    fullContent: true,
    faqs: [
      { q: 'Hur lång är Stockholm Archipelago Trail?', a: 'Leden är 270 km lång och sträcker sig över 20 öar från Arholma i norr till Landsort i söder. Normalt vandrar man leden på 12–20 dagar.' },
      { q: 'Måste man gå hela leden på en gång?', a: 'Nej, leden är uppdelad i etapper och kan vandras i valfri ordning. Varje ö nås med Waxholmsbolaget, så du kan enkelt kombinera etapper med pendling från Stockholm.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar det att vandra Stockholm Archipelago Trail?', a: 'Vandringen i sig är gratis. Biljetter med Waxholmsbolaget tillkommer. Boende varierar – tälta är tillåtet (allemansrätten), men öarna har också vandrarhem och stugor till ca 300–800 kr/natt.' },
      { q: 'Är leden svår?', a: 'Leden är varierad – från lättgångna stigar till klipphäll. Den kräver grundläggande tältvandringskunskap, bra skor och att man kan navigera med karta och kompass på öar utan markerade leder.' },
    ],
  },
  {
    slug: "sup-paddleboard-skargarden",
    title: "SUP och paddleboard i skärgården – guide för nybörjare",
    excerpt: "Ståndupp-paddling är skärgårdens snabbast växande aktivitet. Var du hyr, bästa platserna och vad du behöver veta för en säker tur.",
    category: "Aktivitet", emoji: "🏄", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Är SUP svårt att lära sig?', a: 'Nej – de flesta klarar att stå upp och paddla efter 10–15 minuter. Börja på knä och res dig försiktigt. Välj ett bredare och längre bräde för stabilitet. SUP i skärgårdens skyddade vikar är perfekt för nybörjare.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Var kan man hyra SUP i skärgården?', a: 'Uthyrning finns på Fjäderholmarna, Vaxholm, Grinda, Utö och de flesta större öar. Priserna är ca 200–400 kr för 2 timmar. Kolla också stränder nära Stockholm som Sickla och Nacka strand.' },
      { q: 'Är det säkert att SUP:a ensam i skärgården?', a: 'Paddla aldrig ensam utan att berätta för någon vart du ska och när du är tillbaka. Bär alltid flytväst. Var medveten om vind och strömmar – medvinden kan snabbt ta dig längre ut än planerat. Håll dig nära land i osäkert väder.' },
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
    title: "20 bastuställen i Stockholms skärgård att boka 2026",
    excerpt: "Vedeldade bastubåtar, Skärgårdsstiftelsens öppna klippbastus, värdshus och privata ö-bastus — alla 20 verifierade platser med bokningsinfo och Swish-nummer.",
    category: "Aktivitet", emoji: "🧖", readTime: "12 min", fullContent: true, featured: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vilka bastun kan man boka i Stockholms skärgård?', a: 'Det finns tre kategorier: bastubåtar (t.ex. Gustafstaxibåtar vid Gällnö, Bastuflottestockholm.se), Skärgårdsstiftelsens öppna bastustugor (50 kr/person via Swish, på Möjaskärgården, Nämdö och Träskö-Storö) och värdshus/lodges med bastu (Utö Värdshus, Grinda Vandrarhem, Lidö Värdshus, Arholma Nord).' },
      // KÄLLA: skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/bastu (avläst 2026-08-11 — uppgiften stämde)
      { q: 'Kostar det att basta i Skärgårdsstiftelsens bastus?', a: 'Ja — 50 kr per vuxen, betalas med Swish. Bastusäsongen öppnar kring Valborg och håller öppet sommartid. Max en timme, ingen förbokning — first come, first served.' },
      { q: 'Hur bokar man bastubåt i Stockholms skärgård?', a: 'Bastubåtar bokas direkt via respektive aktör: Bastuflottestockholm.se, Bastuflotten.com (ReLaxa), Stockholmsbastuflotte.se eller Gustafstaxibåtar. Boka 2–4 veckor i förväg på sommaren — helger i juli är fulltecknade snabbt.' },
      { q: 'Vilken tid på året är bäst för havsbastu?', a: 'Hösten — september och oktober. Luften är kall (kontrast mot bastuvärmen), havet är fortfarande 14–17°C i september och du delar knappt platsen med andra. Sommaren fungerar också, men september ger en annan dimension av skärgårdsbastu.' },
    ],
  },
  {
    slug: "havsbastu-skargarden",
    title: "Havsbastu i skärgården – de bästa platserna och hur du bokar",
    excerpt: "Vedeldad bastu med havsutsikt och kallt dopp efteråt. Bästa havsbastuplatserna i Stockholms skärgård, priser och bokningsinfo.",
    category: "Aktivitet", emoji: "🧖", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka är de bästa havsbastuplatserna i Stockholms skärgård?', a: 'Utö Värdshus har en av skärgårdens mest kända havsbastun med direkt tillgång till havet. Dalarö badhus, Kallbadhusen i Nacka och privata bastubåtar i Vaxholm är andra populära alternativ. De flesta kräver förbokning.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar havsbastu i skärgården?', a: 'Privat bastubåt (2–8 pers) kostar 800–2 500 kr för 2–3 timmar. Anläggningsbastun på Utö och liknande kostar 200–500 kr/person. Bastubåtar med guide och avhämtning från Stockholm kostar mer.' },
      { q: 'Kan man boka havsbastu med sällskap?', a: 'Ja, de flesta havsbastualternativ är perfekta för grupper om 4–8 personer. Bastubåtar och privata bastustugor kan bokas exklusivt. Kontrollera alltid om det krävs minsta antal deltagare.' },
    ],
  },
  {
    slug: "barnfamilj-skargarden",
    title: "Skärgård med barnfamilj – bästa öarna och praktiska tips",
    excerpt: "De bästa öarna för familjer, säkra badplatser, barnvänliga restauranger och hur du planerar resan utan stress.",
    category: "Praktisk",
    emoji: "👨‍👩‍👧",
    readTime: "8 min",
    fullContent: true,
    faqs: [
      { q: 'Vilken ö är bäst för barnfamiljer i Stockholms skärgård?', a: 'Grinda är ett toppval: barnvänligt värdshus, sandstrand, trampolin och korta promenader. Fjäderholmarna är bäst för de minsta (25 min från stan). Nåttarö och Utö passar familjer som vill ha mer naturupplevelse.' },
      { q: 'Är det säkert att åka med barn på Waxholmsbolaget?', a: 'Ja, Waxholmsbolagets båtar är säkra och välskötta. Barn under 7 år reser gratis. Bär alltid flytväst på barn under 12 år vid bryggor och ombord.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar en familjedag i skärgården?', a: 'Räkna med 400–700 kr för en familj om 4 (2 vuxna + 2 barn) i biljetter. Mat och glass tillkommer. Med eget matsäck hålls kostnaden nere.' },
      { q: 'Hur gammal bör barnet vara för att skärgårdsresan ska fungera?', a: 'Redan från 1–2 år funkar dagsutflykter till Fjäderholmarna och Vaxholm. För övernattningsresor och öar med mer vandring rekommenderar vi 4+ år. Stockholm Archipelago Trail kräver minst 10–12 år.' },
    ],
  },
  {
    slug: "uto-komplett-guide",
    title: "Utö – komplett guide till södra skärgårdens kronjuvel",
    excerpt: "Transport, gruvhistoria, Utö Runt-leden, havsbastu, sandstrand och bästa restaurangerna. Allt du behöver för ett perfekt Utö-besök.",
    category: "Region",
    emoji: "🏝",
    readTime: "10 min",
    fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Utö?', a: 'Med Waxholmsbolaget från Årstaberg (buss + båt, ca 2,5 h) eller från Nynäshamn (ca 1 h med båt). Buss 433 till Stavsnäs + båt är ett alternativ söderifrån. Färjan från Nynäshamn är snabbast.' },
      { q: 'Måste man ha bil på Utö?', a: 'Nej – Utö är bilfritt för turister. Ön har cykelhyra, och de flesta sevärdheter nås lätt till fots eller med cykel. Cykeln är faktiskt det bästa sättet att uppleva Utö.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar övernattning på Utö?', a: 'Utö Värdshus kostar 1 500–3 000 kr/natt dubbelrum. Vandrarhem och stugor på ön kostar 400–900 kr/natt. Tältplatser finns från ca 150 kr/natt.' },
      { q: 'Vad är Utö mest känt för?', a: 'Utö är känt för sin havsbastu vid stranden, Utö Runt-cykelled (ca 12 km), jerngruvan (en av Sveriges äldsta), sandstranden Kobbarnsudde och det välrenommerade Utö Värdshus.' },
    ],
  },
  {
    slug: "sandhamn-komplett-guide",
    title: "Sandhamn – komplett guide till seglarnas ö",
    excerpt: "Stranden Trouville, seglarlivet, Cinderellabåten, bästa restaurangerna och vad som gör Sandhamn unikt bland skärgårdsöarna.",
    category: "Region",
    emoji: "⛵",
    readTime: "9 min",
    fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Sandhamn?', a: 'Snabbaste vägen: SL-buss 433 från Slussen till Stavsnäs (ca 55 min) och sedan Waxholmsbolaget linje 444 till Sandhamn (ca 35–45 min). Alternativt Cinderellabåten direkt från Strömkajen (ca 2h). Cinderellabåten kräver bokning under högsäsong.' },
      { q: 'Kan man övernatta på Sandhamn?', a: 'Ja. Sandhamns Värdshus är det mest kända alternativet. Det finns också Seglarhotellet och ett flertal privata stugor att hyra. Boka boende minst 2–3 månader i förväg för sommarsäsongen – Sandhamn är en av skärgårdens mest efterfrågade destinationer.' },
      { q: 'Är Sandhamn lämpligt för barnfamiljer?', a: 'Sandhamn är mer av en vuxendestination med seglarliv och aktiv stämning, men fungerar för familjer. Stranden Trouville är bra för barn. Det är folksamlat i juli – Grinda eller Utö kan passa bättre för barnfamiljer som vill ha lugn.' },
      { q: 'Vad är bäst att göra på Sandhamn?', a: 'Promenera runt byn, bada på Trouville-stranden, äta räkor vid hamnen och titta på seglarna i KSSS-hamnen. Sandhamns museum berättar om öns historia som lotsstation. Vandring runt ön tar ca 2 timmar och ger fin utsikt mot öppet hav.' },
      { q: 'Vad kostar Cinderellabåten till Sandhamn?', a: 'Ca 350–450 kr tur/retur beroende på säsong. Cinderellabåten ingår inte i Waxholmsbolagets ordinarie sortiment och är en separat produkt som drivs av Strömma. Biljett köps via stromma.com.' },
    ],
  },
  {
    slug: "vinter-i-skargarden",
    title: "Skärgården på vintern – öppna öar, skridskor och stillhet",
    excerpt: "Vilka öar är öppna, hur du tar dig dit och varför vintern faktiskt är den bästa årstiden för rätt person. Praktisk guide.",
    category: "Säsong", emoji: "❄️", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Vilka öar är öppna på vintern i skärgården?', a: 'Vaxholm är öppet året om. Utö, Sandhamn och Grinda har vinteröppet med begränsad service. Många ytterskärgårdsöar stänger november–april. Ring alltid och bekräfta öppettider innan du bokar vintervistelse.' },
      { q: 'Kan man åka skridskor i skärgården på vintern?', a: 'Ja, vid kalla vintrar fryser innerskärgårdens vikar och ger fantastiska skridskorutter. Kontrollera alltid israpporter från SMHI och Naturvårdsverket. Torrlänkad is om minst 10 cm krävs för säker skridsko.' },
      { q: 'Är skärgårdsresorna billigare på vintern?', a: 'Ja, Waxholmsbolaget kör med reducerad tidtabell och boende är klart billigare (50–70% rabatt mot högsäsong). Vinterresan ger också tomma öar, ren luft och ett lugn som är omöjligt att hitta i juli.' },
    ],
  },
  {
    slug: "fiske-i-skargarden",
    title: "Fiske i Stockholms skärgård – guide till arter, platser och säsonger",
    excerpt: "Abborre, gädda och havsöring väntar i skären. Fiskeregler, de bästa platserna per art och vilken tid på året som ger mest.",
    category: "Aktivitet", emoji: "🎣", readTime: "9 min", fullContent: true,
    faqs: [
      { q: 'Behöver man fiskelicens i Stockholms skärgård?', a: 'Fiske med handredskap (spö och lina) är gratis och tillåtet utan licens i Stockholms skärgård enligt allemansrätten. Fiske med andra redskap (nät, burar) kräver tillstånd. Kontrollera specifika regler för varje vatten.' },
      { q: 'Vilken fisk kan man fånga i Stockholms skärgård?', a: 'Abborre och mört är vanligast och finns i hela skärgården. Gädda fångas i innerskärgårdens grunda vikar vår och höst. Havsöring är det mest eftertraktade men kräver mer kunskap och lokalkännedom.' },
      { q: 'Var är de bästa fiskeställena i skärgården?', a: 'Innerskärgårdens vikar och vassbälten för abborre och gädda. Sunden och strömstråken vid öarna för havsöring. Dalköpinge fiskestuga och Utö är kända fiskeplatser med bra faciliteter.' },
    ],
  },
  {
    slug: "cykling-skargarden",
    title: "Cykla i skärgården – de bästa öarna och hur du planerar turen",
    excerpt: "Bilfria öar är skapta för cykling. Möja, Gällnö, Utö, Ingmarsö och fler – med cykelhyrningsinfo och konkreta rutter.",
    category: "Aktivitet", emoji: "🚴", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Vilka öar i skärgården är bäst för cykling?', a: 'Utö är nummer ett med sin 12 km cirkelrunda och välmarerade leder. Möja och Gällnö är kompakta och cykelvänliga. Ingmarsö har bra cykelleder i skogsmiljö. Öland och Gotland (utanför skärgården) är bäst för längre cykelturer.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Kan man ta med cykel på Waxholmsbolaget?', a: 'Ja, cyklar är tillåtna ombord på de flesta Waxholmsbolagets linjer. Det tillkommer en avgift om ca 50–80 kr. Under högsäsong kan det vara trångt – kom i god tid till bryggan.' },
      { q: 'Kan man hyra cykel på öarna?', a: 'Cykelhyrning finns på Utö, Möja, Gällnö och Grinda. Priser: ca 100–200 kr/dag. Boka i förväg under juli – cyklarna tar slut tidigt på populära öar.' },
    ],
  },
  // ── Batch D: Kräftskiva-serien 2026 ─────────────────────────────────────────
  {
    slug: "kraftskiva-skargarden-2026",
    title: "Kräftskiva i Stockholms skärgård 2026 – guide till traditionen",
    excerpt: "Kräftpremiären är 5 augusti 2026. Var du håller kräftskiva i skärgården, vad du äter, hur du dekorerar och vilka restauranger som bokar fullt.",
    category: "Säsong", emoji: "🦀", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'När är kräftpremiären 2026?', a: 'Kräftpremiären 2026 är den 5 augusti. Från detta datum är det tillåtet att fiska och sälja kräftor i Sverige. De bästa restaurangerna är fullbokade veckor i förväg – boka tidigt.' },
      { q: 'Var håller man kräftskiva i Stockholms skärgård?', a: 'Sandhamns Värdshus, Grinda Wärdshus och Utö Värdshus är klassiska kräftskivescener. Många håller egna fester på klippor och bryggor med bukökat. Anmäl dig till traditionen: lyktor, snapsar och kräftor under stjärnorna.' },
      { q: 'Hur dekorerar man kräftskiva?', a: 'Traditionellt: lyktor (kikkalykta), pappersservietter med kräftmotiv och kransar i blå och gult. Lägg ett vitt duk på bordet och sätt upp lyktor runtom. Snapsvisor ska finnas tillhands – ladda ner Snapsvisor-appen.' },
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
    title: "Kräftskiva på Gotland 2026 – midsommarnatt med kräftor",
    excerpt: "Kräftskiva på Gotland är en unik upplevelse. Guidade fisketurer, restauranger i Visby och hur du arrangerar din egen traditionsenliga kräftskiva.",
    category: "Säsong", emoji: "🏰", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Var håller man kräftskiva på Gotland?', a: 'Restauranger i Visby och längs kusten ordnar kräftfester i augusti. Många hyr in fiskelag för guidade kräftfisketurer. Det gotländska kräftfisket i Östersjön ger kräftor med lite annan karaktär än Västerhavet.' },
      { q: 'Kan man fiska egna kräftor på Gotland?', a: 'Ja, med tillstånd och rätt utrustning. Kontakta Gotlands sportfiskare eller lokala guider som erbjuder paket med allt inkluderat. Det är en upplevelse utöver det vanliga att laga kräftorna du fiskat själv.' },
    ],
  },
  {
    slug: "kraftskiva-oland-2026",
    title: "Kräftskiva på Öland 2026 – vid bryggan under lyktorna",
    excerpt: "Ölands långa kust och sommarnätter ger perfekta förutsättningar för kräftskiva. Guide till de bästa platserna och restaurangerna.",
    category: "Säsong", emoji: "🌾", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Var håller man kräftskiva på Öland?', a: 'Restaurangerna i Borgholm och längs östra kusten är populärast. Kusthotellet i Borgholm och restauranger vid Böda sand ordnar kräftfester. Ölands långa sommardagar ger kvällar som verkar ta aldrig slut.' },
      { q: 'Hur tar man sig till Öland för kräftskiva?', a: 'Med bil via Ölandsbron från Kalmar (bron är gratis). Tåg till Kalmar och sedan hyrbil eller taxi. Kräftskivesäsongen sammanfaller med högsäsongens slutfas – boka boende tidigt.' },
    ],
  },
  {
    slug: "grebbestad-kraftskiva-2026",
    title: "Grebbestad kräftskiva 2026 – landets kräftcentrum",
    excerpt: "Grebbestad är mer känt för ostron men kräftorna är lika viktiga. Guide till fisket, festerna och kräftsäsongen i Bohuslän.",
    category: "Region", emoji: "🦐", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Varför är Grebbestad känt för kräftor?', a: 'Grebbestad i norra Bohuslän har en av Sveriges bästa kräftfångstplatser. Det klara Västerhavet och det rika djuplivet ger kräftor med exceptionellt kött. Lokala fiskare sätter ut burrarna vid midnatt på premiären.' },
      { q: 'Hur tar man sig till Grebbestad?', a: 'Med Västtrafik buss från Göteborg (ca 2–2,5 timmar) eller med bil via E6 mot Strömstad. Grebbestad ligger precis norr om Fjällbacka längs Bohusläns kust.' },
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
    title: "Juli i Stockholms skärgård 2026 – de bästa öarna att besöka",
    excerpt: "Juli är skärgårdens högsäsong. Vilka öar som är öppna, vilka som är folkliga och vilka som ger lugn och ro. Rankad guide för semestermånaden.",
    category: "Säsong", emoji: "☀️", readTime: "9 min", fullContent: true,
    faqs: [
      { q: 'Vilka öar bör man undvika i juli om man vill ha lugn?', a: 'Sandhamn och Marstrand är fullpackade i juli. Välj istället Svartlöga, Arholma, Landsort eller Ingmarsö för lugn och ro. Öar med bilfärja som Blidö är också ett bra alternativ – färre turister tar den vägen.' },
      { q: 'Vilka öar är öppna med full service i juli?', a: 'Sandhamn, Grinda, Utö, Finnhamn, Möja, Vaxholm och Fjäderholmarna har full service hela juli med restauranger, boende och aktiviteter.' },
      { q: 'Hur bokar man övernattning i skärgården i juli?', a: 'Boka 2–3 månader i förväg för juli. Waxholmsbolaget erbjuder paketresor. Vandrarhemmen (STF) bokas via stfturist.se. Privata stugor via Blocket och Airbnb. De bästa platserna försvinner i maj.' },
    ],
  },
  {
    slug: "juli-skargarden-2026-aktiviteter",
    title: "Juli i skärgården – aktiviteter, upplevelser och äventyr 2026",
    excerpt: "Från kajakpaddling till havsbastu och nattfiske. Allt du kan göra i Stockholms skärgård under juli månads ljusa nätter och värme.",
    category: "Säsong", emoji: "🌊", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Vad är de bästa aktiviteterna i skärgården i juli?', a: 'Kajakpaddling, havsbastu, nattfiske, klipphopp, SUP och segling är höjdpunkterna. Juli är varmast – havstemperaturen når 20–23°C de bästa somrarna.' },
      { q: 'Kan man boka aktiviteter spontant i skärgården på sommaren?', a: 'Populära aktiviteter som segelkurs, kajakguide och bastubåt är fullbokade i juli – boka 2–4 veckor i förväg. Spontana aktiviteter som klipphopp och bad kräver naturligtvis ingen bokning.' },
    ],
  },
  {
    slug: "juli-skargarden-2026-mat",
    title: "Juli i skärgården – mat, krogar och sommarens smaker 2026",
    excerpt: "Räkfrukost vid bryggan, grillade gäddor och glasstruten på klippan. Guide till årets bästa matupplevelser i Stockholms skärgård i juli.",
    category: "Säsong", emoji: "🍤", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka är de bästa restaurangerna i Stockholms skärgård?', a: 'Sandhamns Värdshus, Utö Värdshus, Grinda Wärdshus och Finnhamns vandrarhem (enkel men god mat) toppar listan. Möjas restaurang och Vaxholms Hotell är också klassiker. Boka bord minst 2–3 veckor i förväg för juli.' },
      { q: 'Måste man boka bord i skärgårdsrestaurangerna på sommaren?', a: 'Ja – absolutet för de populäraste. Sandhamns Värdshus, Utö Värdshus och Grinda är fullbokade veckor i förväg i juli. Ring direkt till restaurangen eller boka via hemsidan. Walk-in kan fungera vid lunchtid på vardagar.' },
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
    title: "Sommarlov i skärgården med barn – 14 dagar av äventyr",
    excerpt: "Planering för en hel sommarlovsvecka med barn i skärgården. Öar med sandstränder, aktiviteter för alla åldrar och tips för att undvika köerna.",
    category: "Praktisk", emoji: "👦", readTime: "9 min", fullContent: true,
    faqs: [
      { q: 'Hur håller man barn sysselsatta i skärgården?', a: 'Snorkling, klipphopp, kajak för barn (från ca 7 år), sandslott, naturupptäckter och insektsfångst. Skärgårdens natur är naturens egen aktivitetspark. Barn behöver inga bokade aktiviteter – de skapar sina egna.' },
      { q: 'Vilka öar passar bäst för barn i sommarsemester?', a: 'Grinda (sandstrand och trampolin), Fjäderholmarna (nära, med aktiviteter), Nåttarö (camping med barn) och Utö (cykling, bastu, sandstrand) är de fyra bästa barnvänliga öarna.' },
    ],
  },
  {
    slug: "vad-gora-regn-skargarden",
    title: "Vad göra i skärgården när det regnar – 15 tips",
    excerpt: "Regn behöver inte förstöra skärgårdsdagen. Museer, bastubad, stugor, inomhusaktiviteter och varför regnväder faktiskt kan vara mysigt.",
    category: "Praktisk", emoji: "🌧", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Vad finns det att göra inomhus i skärgården?', a: 'Havsbastu (ännu mysigare i regn), stugeläsning, brädspel på vandrarhemsverandan, stormkök och insidertips om fisk och naturliv. Vaxholm museum, Fjäderholmarnas hantverksateljéer och akvariet Estrange är bra regnalternativ.' },
      { q: 'Är skärgården värd att besöka när det regnar?', a: 'Absolut – och regn ger ibland de bästa upplevelserna. Klipporna lyser, svamparna är bäst dagen efter regn och stämningen på värdshuset med öppen spis och havssusen utanför är oslagbar.' },
    ],
  },
  {
    slug: "juli-bohuslan-2026",
    title: "Juli i Bohuslän 2026 – sommarens bästa klippkust",
    excerpt: "Juli är Bohusläns hetaste månad. Smögen, Marstrand, Lysekil och de bästa insidertipsen för att ta sig dit och uppleva det bästa av västkusten.",
    category: "Säsong", emoji: "🪨", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Hur undviker man trängsel i Bohuslän i juli?', a: 'Smögen och Marstrand är överfulla i juli – besök dem på vardagar tidigt på morgonen. Alternativt välj Grebbestad, Lysekil eller Kosteröarna som är folkligare men inte lika trängda. Kör norrut – ju längre, desto lugnare.' },
      { q: 'Är det värt att besöka Bohuslän i juli trots folkmassor?', a: 'Ja – Bohuslän i juli är Sverige på sitt sommerbästa. Räkna med köer till räksmörgåsen och fullbokade restauranger, men klipporna och havet ger alltid plats. Ta med matsäck och hitta din egen klippa.' },
    ],
  },
  {
    slug: "juli-gotland-2026",
    title: "Juli på Gotland 2026 – allt som händer på sommaron",
    excerpt: "Juli är Gotlands högsäsong. Medeltidsveckan, Visby restaurangscen, de bästa stränderna och hur du undviker folkmassan. Guide för sommaren 2026.",
    category: "Säsong", emoji: "🌻", readTime: "9 min", fullContent: true,
    faqs: [
      { q: 'När är Medeltidsveckan på Gotland 2026?', a: 'Medeltidsveckan 2026 hålls 2–9 augusti. Under denna vecka förvandlas Visby till en medeltida stad med marknader, turneringar och kostymbeklädda besökare. Det är en unik upplevelse men Visby är extremt fullpackat.' },
      { q: 'Hur tar man sig till Gotland i juli?', a: 'Destination Gotlands färja från Nynäshamn (3h) eller Oskarshamn (3,5h), eller flyg med BRA/SAS från Arlanda (45 min). I juli är färjorna fullbokade – boka biljetter i april eller maj. Flyg kan köpas med kortare varsel men priserna stiger kraftigt.' },
      { q: 'Vilka stränder på Gotland är bäst i juli?', a: 'Tofta strand (lång, sandstrand, populär), Ljugarn (sydkusten, lugnt), Sudersand på Fårö (dramatisk, sandstrand) och Herrvik (öster, kristallklart vatten). Alla är tillgängliga med hyrbil.' },
    ],
  },
  // ── Batch E: Barnvänligt-serien ──────────────────────────────────────────────
  {
    slug: "barnvanliga-oar-bohuslan",
    title: "Barnvänliga öar i Bohuslän – 10 bästa alternativen",
    excerpt: "Bohuslän har klippor och stränder som barn älskar. Guide till de tio bästa barnvänliga öarna och platserna längs Bohusläns kust.",
    category: "Praktisk", emoji: "🏖", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Vilka öar i Bohuslän är bäst för barn?', a: 'Kosteröarna är bilfria och trygga med cykling och snorkling. Marstrand har klippbad och fästning som barn älskar. Smögen med Smögenbryggan fascinerar alla åldrar. Grebbestad erbjuder grunda vikar perfekta för de minsta.' },
      { q: 'Är Bohusläns klippor säkra för barn att bada vid?', a: 'Ja, men var uppmärksam. Välj vikar med grunt vatten och naturliga pooler i klipporna. Undvik branta klipphällar med djupt vatten för de minsta. Flytväst rekommenderas alltid för barn under 12 år nära havet.' },
    ],
  },
  {
    slug: "barnfamilj-gotland",
    title: "Gotland med barnfamilj – guide till sommarons bästa",
    excerpt: "Gotland har medeltidsborgar, långa sandstränder och cykelvägar som passar hela familjen. Allt du behöver planera en perfekt barnfamiljesemester.",
    category: "Praktisk", emoji: "🏰", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Gotland med barn?', a: 'Destination Gotlands färja från Nynäshamn (3h) är kul för barn – de kan röra sig fritt ombord. Flyg från Arlanda (45 min) är snabbare men bättre för äldre barn. Boka biljetter tidigt – sommarsäsongen är fullbokad.' },
      { q: 'Vad finns att göra med barn på Gotland?', a: 'Tofta strand (lång sandstrand), Lummelundasgrottan (stalaktiter), Gotlands Museum (medeltida fynd), Krusmyntagården och cykling längs bilfria vägar. Borgeby och Hammershus imponerar på barn som gillar historia.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Behöver man bil med barn på Gotland?', a: 'Ja, bil rekommenderas starkt med barn. Avstånd mellan sevärdheter är för stora för kollektivtrafik. Hyrbil i Visby kostar ca 600–1 200 kr/dag i högsäsong. Boka hyrbil i förväg – det tar slut.' },
    ],
  },
  {
    slug: "barnvanliga-bad-skargarden",
    title: "Barnvänliga badplatser i skärgården – grunt, tryggt och roligt",
    excerpt: "Grunda vikar, sandstränder och badplatser utan strömmar. Guide till de säkraste och roligaste badplatserna för barn i Stockholms skärgård.",
    category: "Praktisk", emoji: "🏊", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka badplatser i skärgården är bäst för de allra minsta barnen?', a: 'Grindas sandstrand med grunt vatten är nummer ett. Fjäderholmarnas barnvänliga bryggor och Vaxholms strandbad passar också de minsta. Välj platser med gradvis inträde i vattnet och utan strömmar.' },
      { q: 'Är det säkert att bada med barn i Stockholms skärgård?', a: 'Ja, inre skärgården har lugnt vatten utan strömmar eller vågor. Var alltid med vid vattnet, bär flytväst på barn under 12 år och välj grunda badplatser. Havstemperaturen i juli är 19–22°C.' },
    ],
  },
  {
    slug: "barnvanliga-batresor-skargarden",
    title: "Barnvänliga båtturer i Stockholms skärgård",
    excerpt: "Vilka båtturer passar barn bäst? Kort restid, underhållning ombord och barnvänliga destinationer. Guide till de bästa båtturerna med barn.",
    category: "Transport", emoji: "⛴", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur lång båtresa klarar små barn?', a: 'Barn under 3 år klarar 20–45 minuter bekvämt. Barn 4–8 år klarar 1–2 timmar med aktiv underhållning (titta ut, äta, leka). Från 9 år och uppåt är 2–3 timmar inga problem. Planera matstoppar och rörelsepaus ombord.' },
      { q: 'Är Waxholmsbolagets båtar bra för barn?', a: 'Ja, Waxholmsbolagets båtar är rymliga och säkra. Barn under 7 år reser gratis. Stora däck och sittplatser utomhus ger utsikt och rörelse. Ta med mellanmål och ett kortspel för tråkiga mellanpassager.' },
    ],
  },
  {
    slug: "barnvanliga-restauranger-skargarden",
    title: "Barnvänliga restauranger i skärgården – mat som hela familjen gillar",
    excerpt: "Restauranger med barnmeny, höga stolar och tålamod. Guide till de bästa barnvänliga matställena i Stockholms skärgård.",
    category: "Mat", emoji: "🍽", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Vilka skärgårdsrestauranger är bäst för barnfamiljer?', a: 'Grinda Wärdshus är känt för att välkomna barnfamiljer med en avslappnad atmosfär. Fjäderholmarnas restauranger är bra för yngre barn tack vare närheten och korta väntetider. Vaxholms caféer är familjevänliga.' },
      { q: 'Har skärgårdsrestauranger barnmeny?', a: 'De flesta värdshus och restauranger har barnmeny med enklare alternativ. Fråga alltid – de kan ofta tillaga enkla rätter utanför menyn. Ta med extra mellanmål för väntetiden.' },
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
    title: "Bästa badplatserna i Bohuslän 2026 – klippor och sandstränder",
    excerpt: "Bohusläns klippkust har Sveriges mest dramatiska badplatser. Från Smögens klippor till Varbergs sandstränder – guide till 15 toppalternativ.",
    category: "Aktivitet", emoji: "🌊", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Vilka är de bästa badplatserna i Bohuslän?', a: 'Hållorna vid Smögen, Ramsvikslandet naturreservat, Fiskebäckskil, Lysekils klippor och Kosteröarnas havsbad är i toppklass. Varbergs kallbadhus och Tylösand (Halland) är sandstrandklassiker söderut.' },
      { q: 'Hur varmt är havet i Bohuslän på sommaren?', a: 'Västerhavet är kallare än Östersjön – ca 16–20°C i juli och aug. Sydkusten (Varberg, Falkenberg) är varmare. Kosteröarnas djupa fjord är svalare än kustnära grunda vikar.' },
    ],
  },
  {
    slug: "basta-badplatser-gotland",
    title: "Bästa badplatserna på Gotland 2026 – sandstränder och kalkstensklippor",
    excerpt: "Gotlands stränder är unika – kalksten, kristallklart vatten och lång säsong. Guide till de 12 bästa badplatserna på Gotland.",
    category: "Aktivitet", emoji: "🏖", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka är de bästa stränderna på Gotland?', a: 'Tofta strand (bred sandstrand med bra service), Sudersand på Fårö (dramatisk, vacker), Ljugarn (sydkusten, lugnt), Herrvik och Kyllaj på östkusten (kristallklart). Alla nås med hyrbil.' },
      { q: 'Hur varmt är havet vid Gotland?', a: 'Östersjön vid Gotland är 18–22°C i juli och tidigt aug – varmare än Västerhavet. Grunda sandstränder som Tofta och Ljugarn värms upp snabbast och ger de bästa badtemperaturerna.' },
    ],
  },
  {
    slug: "klippbad-skargarden",
    title: "Bästa klippbaden i Stockholms skärgård – hoppa, dyk och njut",
    excerpt: "Gneisklipporna i skärgården är gjorda för bad. Guide till de bästa klippbadsplatserna – med rätt djup, fin utsikt och sommarlik stämning.",
    category: "Aktivitet", emoji: "🪨", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka är de bästa klippbadsplatserna i Stockholms skärgård?', a: 'Sandhamns ytterskärgård, klipporna vid Finnhamn, Arholmas ytterspets och Utös västra sida är klassiska klippbadsplatser. Ytterskärgårdens klippor är mer dramatiska än innerskärgårdens.' },
      { q: 'Är klipphopp säkert i skärgården?', a: 'Hoppa alltid från platser du känner till och vet djupet på. Kontrollera att vattnet är fritt från stenar och att djupet är minst 3–4 meter för vanligt klipphopp. Dyk aldrig från klippor om du inte är erfaren dykare.' },
    ],
  },
  {
    slug: "sandstrand-skargarden",
    title: "Sandstränder i skärgården – komplett guide till alla sandstränder",
    excerpt: "Stockholms skärgård är inte känd för sandstränder – men de finns. Guide till alla sandstränder i skärgården och varför de är ovärderliga.",
    category: "Aktivitet", emoji: "🏝", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Finns det sandstränder i Stockholms skärgård?', a: 'Ja, men de är sällsynta. Grindas sandstrand (södra sidan), Nåttarös sandstrand och Utös Kobbarnsudde är de bästa. De flesta öar i Stockholms skärgård har klippstränder – sandstrand är undantaget, inte regeln.' },
      { q: 'Vilken är den bästa sandstranden i Stockholms skärgård?', a: 'Grindas sandstrand på södra sidan är den mest välkända och barnvänligaste med grunt varmt vatten. Utös Kobbarnsudde ger mer vildmarkskaraktär. Nåttarös strand är bäst för tältare.' },
    ],
  },
  {
    slug: "hemliga-badplatser-skargarden",
    title: "Hemliga badplatser i skärgården – undangömda pärlor",
    excerpt: "Bortom turistströmmarna finns badplatser som inte syns på kartan. Guide till de bäst dolda och mest ostörda badplatserna i skärgården.",
    category: "Aktivitet", emoji: "🗺", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Hur hittar man hemliga badplatser i skärgården?', a: 'Använd Lantmäteriets friluftskarta och Skärgårdskartan. Sök på öar utan reguljär båttrafik. Fråga lokala seglare och bofasta. De bästa platserna är alltid de som kräver lite extra tid att nå.' },
      { q: 'Vilka öar har de mest dolda badplatserna?', a: 'Öar utan reguljär turism som Svartlöga, Svenska Högarna, Huvudskär och Grönskär. Dessa nås med privat båt eller chartrar och har aldrig trängsel. Räkna med att ha klipphällarna helt för dig själv.' },
    ],
  },
  {
    slug: "bad-med-bastu-skargarden",
    title: "Bad och bastu i skärgården – den perfekta kombinationen",
    excerpt: "Vedeldad bastu, kallt havsvatten och solnedgången bakom öarna. Guide till de bästa platserna där du kombinerar havsbad och bastu.",
    category: "Aktivitet", emoji: "🧖", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Varför är bastu + havsbad så populärt i Sverige?', a: 'Kombinationen av het bastu (80–100°C) och kallt havsdopp (15–20°C) är en stark fysiologisk upplevelse som frigör endorfiner. Det är en nordisk tradition med djupa rötter – och i skärgården blir det ännu bättre med naturen runtomkring.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Var hittar man bastu med havsbad i Stockholms skärgård?', a: 'Utö Värdshus, Dalarö badhus, Nacka strandbastu och privatbokade bastubåtar på Waxholmsfjärden. Bastubåtar (hyr för kvällen) är trendigt och kostar 1 200–2 500 kr för grupp.' },
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
      { q: 'Vilken ö är bäst för barnfamiljer – Utö eller Sandhamn?', a: 'Utö vinner klart för barnfamiljer. Sandstrand (Kobbarnsudde), cykelleder, havsbastu och ett mer avslappnat tempo. Sandhamn är bättre för vuxna och par som söker seglarliv och restauranger.' },
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
    title: "Inre vs yttre skärgård – vad passar dig?",
    excerpt: "Inre skärgården är grön och lättillgänglig. Yttre skärgården är dramatisk och avlägsen. Guide till vilken del som passar dig och dina förväntningar.",
    category: "Praktisk", emoji: "🧭", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Vad är skillnaden mellan inre och yttre skärgård?', a: 'Inre skärgården (närmast Stockholm) är grönskande med lövträd, lättillgänglig med täta båtförbindelser och mer befolkad. Yttre skärgården är karg, vindpinad klippmiljö med glesare trafik och mer vildmarkskänsla – och mer dramatisk natur.' },
      { q: 'Vilken del av skärgården passar nybörjare bäst?', a: 'Inre skärgården – öarna nära Stockholm (Vaxholm, Fjäderholmarna, Grinda) är lättillgängliga, har god service och korta båttider. Perfekt för första skärgårdsbesöket. Yttre skärgården kräver mer planering och vana vid båtresor.' },
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
    title: "Höst i Bohuslän 2026 – ostron, klippor och havsluft",
    excerpt: "Hösten är Bohusläns bästa säsong. Ostronstangning premiär i september, klipporna i höstljus och lugnet efter sommarens folkmassor.",
    category: "Säsong", emoji: "🦪", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'När öppnar ostronsäsongen i Bohuslän?', a: 'Ostronsäsongen i Bohuslän öppnar i september (månader med R: sep, okt, nov). Grebbestad och Lysekil är ostroncentra. Ostronsafari och smakprovning bokas via lokala arrangörer – populärt så boka tidigt.' },
      { q: 'Vad händer i Bohuslän på hösten?', a: 'Hummerpremieren 21 september, ostronsäsongens öppning, klättringsäsongen i full gång på Bohusläns klippor och den vackraste ljussättningen på klipphällarna. Turisterna är borta men restaurangerna är öppna.' },
    ],
  },
  {
    slug: "host-gotland-2026",
    title: "Höst på Gotland 2026 – raukar, svamp och stillhet",
    excerpt: "Gotland i höst är helt annorlunda mot sommar-Gotland. Raukar i dimman, svampskog och mysiga restauranger utan kö.",
    category: "Säsong", emoji: "🍄", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Varför besöka Gotland på hösten?', a: 'Raukarna (kalkstenspelarna) är vackrast i höstdimma och gyllene ljus. Svampskogen är på topp i sep–okt. Restaurangerna i Visby har inga köer och full meny. Priset för boende och färja sjunker 30–50%.' },
      { q: 'Hur tar man sig till Gotland på hösten?', a: 'Destination Gotlands färja från Nynäshamn (3h) eller Oskarshamn (3,5h) – ingen förbokning behövs lika tidigt som på sommaren. Flyg med BRA/SAS från Arlanda (45 min) är ett bra alternativ i höst.' },
    ],
  },
  // ── Batch F: Regionala djupguider ────────────────────────────────────────────
  {
    slug: "karlskrona-guide",
    title: "Karlskrona guide – UNESCO-världsarvet vid Östersjön",
    excerpt: "Karlskrona är ett av Europas bäst bevarade barockstäder och UNESCO-världsarv. Guide till örlogsstaden, skärgården och sommarsemestern i Blekinge.",
    category: "Region", emoji: "⚓", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Varför är Karlskrona UNESCO-världsarv?', a: 'Karlskrona grundades 1680 som örlogsstad och är ett av Europas bäst bevarade exempel på barockstadsplanering. Marinmuseum, Fredrikskyrkan och det unika mönstret av öar och broar är anledningarna till världsarvsstatusen 1998.' },
      { q: 'Hur tar man sig till Karlskrona?', a: 'Med tåg (Blekinge kustbana eller Krösatågen) från Malmö/Göteborg – ca 2–3 timmar. Med bil via E22 längs sydkusten. Färja till Gdynia (Polen) avgår härifrån.' },
    ],
  },
  {
    slug: "varberg-guide",
    title: "Varberg guide – fästning, surf och Hallandskust",
    excerpt: "Varberg är Hallands stoltaste stad med medeltidsfästning, Sveriges bästa surf och en unik kallbadshusupplevelse. Komplett guide.",
    category: "Region", emoji: "🏄", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Varför är Varberg känt för surfing?', a: 'Varberg har Sveriges bästa och mest konsistenta surfvågor vid Apelviken och Skrea strand. Nordsjövågornas kraft mot den öppna kusten ger rätt vågstorlekar för longboard och shortboard. Varberg Surf Center erbjuder uthyrning och kurser.' },
      { q: 'Vad är Varbergs kallbadhus?', a: 'Varbergs kallbadhus från 1903 är ett av Sveriges vackraste och mest välbevarade. Det pittoreska trähuset på bryggan erbjuder bastubad, utomhusbad i havet och är numera ett turistmärke för hela Halland.' },
    ],
  },
  {
    slug: "borgholm-guide",
    title: "Borgholm guide – Ölands sommarstad",
    excerpt: "Borgholm är Ölands levande sommarstad med slottsruin, marknad och nattliv. Guide till det bästa av Ölands huvudort.",
    category: "Region", emoji: "🏰", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vad finns att göra i Borgholm?', a: 'Besök Borgholms slottsruin (gratis entré till parken), promenera längs hamnpromenaden, shoppa på Storgatan och ät på någon av stadens restauranger. Sollidens slott (kungafamiljen) är öppet för allmänheten sommartid.' },
      { q: 'Hur tar man sig till Borgholm?', a: 'Med bil via Ölandsbron från Kalmar (gratis, 6 km lång). Med tåg till Kalmar och sedan buss 101 till Borgholm – ca 1 timme från Kalmar C.' },
    ],
  },
  {
    slug: "tjorn-guide",
    title: "Tjörn guide – konst, klippor och bilfri skärgård",
    excerpt: "Tjörn är Bohusläns näst största ö med Nordiska Akvarellmuseet, magnifika klippbad och ett aktivt konstliv. Komplett guide.",
    category: "Region", emoji: "🎨", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Tjörn?', a: 'Med bil via bro från Stenungsund (E6, avfart Stenungsund) – Tjörn är direktkopplat till fastlandet via bro. Västtrafik buss från Göteborg (ca 1–1,5 timme). Inga färjor behövs.' },
      { q: 'Vad är Nordiska Akvarellmuseet?', a: 'Nordiska Akvarellmuseet i Skärhamn är ett av Skandinaviens ledande konstmuseer med fokus på akvarell och pappersbaserad konst. Spektakulärt läge vid havet. Öppet hela året med varierande utställningar.' },
    ],
  },
  {
    slug: "visby-sommar-guide",
    title: "Visby sommarguide – mer än medeltidsmuren",
    excerpt: "Visby är Sveriges mest välbevarade medeltidsstad och Gotlands hjärta. Sommarguide till ringmuren, restaurangscenen och de dolda hörnen.",
    category: "Region", emoji: "🏛", readTime: "8 min", fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar det att besöka Visby ringmur?', a: 'Att promenera längs ringmuren är gratis. Gotlands Museum (inne i Visby) kostar ca 120 kr. Guidade turer runt muren kostar 150–250 kr. Medeltidsveckan i aug är i sig gratis att delta i som åskådare.' },
      { q: 'Vilka är de bästa restaurangerna i Visby?', a: 'Gotlands matscen är en av Sveriges bästa. Stjärnrestaurangen Bäckahästen och Clematis i Klostret är finare alternativ. Bolaget, Gustavsvik och Skeppsbron är mer avslappnade. Boka alltid bord i förväg i juli.' },
      { q: 'Hur länge behöver man i Visby?', a: '2–3 dagar räcker för att se ringmuren, Gotlands Museum, restaurangscenen och stränderna närmast stan. Med bil kan du kombinera Visby med Fårö och raukar på 4–5 dagar.' },
    ],
  },
  {
    slug: "camping-gotland",
    title: "Camping på Gotland – de bästa campingarna 2025",
    excerpt: "Gotland har några av Sveriges bästa campingplatser — Tofta Strand, Sudersand på Fårö och Kneippbyn. Guide till campingarna, boknings­tips och vad du behöver veta.",
    category: "Region", emoji: "⛺", readTime: "7 min", fullContent: true,
    topics: ['camping', 'gotland', 'familj'],
    faqs: [
      { q: 'Vilken är den bästa campingen på Gotland?', a: 'Tofta Strand Camping är Gotlands populäraste familjecamping med direktläge vid Tofta strand — en av öns vackraste sandstränder. Sudersands Camping på Fårö är det vackraste läget med fantastiska raukar nära. Kneippbyn Resort söder om Visby passar familjer med höga krav på service och aktiviteter.' },
      { q: 'Kan man tälta fritt på Gotland?', a: 'Allemansrätten gäller på Gotland, men myckt mark är privatägd. Tält 1–2 nätter är möjligt i naturreservat och längs kustens allmänna marker. Kolla alltid Länsstyrelsen Gotlands karta och undvik privatägd mark. Campingförbud finns på delar av ön.' },
      { q: 'När ska man boka camping på Gotland?', a: 'Boka stuga och husvagnsplats senast november–december för juli. Populära campingar är fullbokade månader i förväg inför högsäsongen. Tältplatser är lite lättare att få men också de tar slut tidigt för vecka 28–30.' },
    ],
  },
  {
    slug: "camping-bohuslan",
    title: "Camping i Bohuslän – klippor, fjordar och havsbad",
    excerpt: "Bohusläns kust är ett av Sveriges bästa campingmål — dramatiska klipphällar, varmt Västerhavet och campingplatser från Kosteröarna till Havstenssund. Komplett guide.",
    category: "Region", emoji: "⛺", readTime: "7 min", fullContent: true,
    topics: ['camping', 'bohuslan', 'familj'],
    faqs: [
      { q: 'Vilken är den bästa campingen i Bohuslän?', a: 'Havstenssund Stugby & Camping utanför Fjällbacka har ett av Bohusläns vackraste lägen med utsikt mot öar och klippor. Grebbestads Camping vid fjorden passar den som vill ha genuint fiskesamhällsliv. Kosteröarnas Camping på Sydkoster är unik — bilfri ö, nationalpark och snorkling.' },
      { q: 'Kan man tälta fritt på klipporna i Bohuslän?', a: 'Ja, Allemansrätten tillåter tält 1–2 nätter på de flesta klipphällar längs kusten. Undvik privatägda tomter, bryggor och naturreservat med tältförbud. Elda aldrig direkt på klippan — det missfärgar och är brandfarligt. Ta med allt skräp.' },
      { q: 'Hur varmt är havet i Bohuslän?', a: 'Västerhavet är varmare än Östersjön: 18–22°C i juli–augusti. Strömmar från Nordsjön för in varmt vatten och gör Bohuslän till ett av Sveriges bästa ställen för havsbad.' },
    ],
  },
  {
    slug: "gotland-med-barn",
    title: "10 aktiviteter på Gotland med barn – sommarsemester",
    excerpt: "Gotland är ett av Sveriges bästa barnfamiljeresmål. Lummelundagrottan, Kneippbyn, raukar och cykling på platt terräng — här är tio saker du inte bör missa med barnen.",
    category: "Region", emoji: "👨‍👩‍👧‍👦", readTime: "7 min", fullContent: true,
    topics: ['barn', 'gotland', 'familj'],
    faqs: [
      { q: 'Vad är bäst att göra på Gotland med barn?', a: 'Lummelundagrottan är Gotlands mest populära attraktion för barn. Kneippbyn Resort söder om Visby har vattenpark och aktiviteter. Tofta strand är perfekt för baddag med grunt vatten. Fårö med gratisfärjan och raukarna engagerar barn i alla åldrar.' },
      { q: 'Hur gammal bör barnet vara för Lummelundagrottan?', a: 'Barn från 5 år och uppåt brukar tycka grottan är rolig. Yngre barn kan bli rädda i mörkret. Guidade turer tar ca 50 minuter. Temperaturen inne är alltid ca 8°C — ta med en tröja till alla.' },
      { q: 'Behöver man bil på Gotland med barn?', a: 'Ja, bil är praktiskt taget nödvändigt för att ta sig runt med barn på Gotland. Kollektivtrafiken täcker bara de större orterna. Cykelhyra fungerar utmärkt inom Visby och längs kortare sträckor, men inte för hela ön med yngre barn.' },
    ],
  },
  {
    slug: "camping-stockholm-skargard",
    title: "Camping i Stockholms skärgård – STF, friluft och båtcamping",
    excerpt: "Stockholms skärgård är ett av världens bästa naturcampingmål. Finnhamn, Arholma och Utö via STF, eller fri tältplats längs öarnas klipphällar med Allemansrätten.",
    category: "Aktivitet", emoji: "⛺", readTime: "7 min", fullContent: true,
    topics: ['camping', 'stockholm', 'natur'],
    faqs: [
      { q: 'Var kan man campa i Stockholms skärgård?', a: 'STF driver vandrarhem och campingplatser på Finnhamn, Arholma, Kymmendö och fler öar. Allemansrätten tillåter fria tältövernattningar på naturreservatens mark. Bullerö i Nämdöskärgårdens nationalpark är populärt att nå med kajak — men nationalparkens egna föreskrifter gäller där, inte allemansrätten fullt ut. Utö har kommersiell camping och stuguthyrning.' },
      { q: 'Kan man ta Waxholmsbåten till campingplatsen?', a: 'Finnhamn nås med Waxholmsbåt direkt från Stockholm. Arholma likaså med byte. Bullerö och andra friluftsmål nås enklast med kajak eller egen båt — inga reguljära linjer. Utö nås med pendelbåt från Nynäshamn.' },
      { q: 'Behöver man båt för att campa i skärgården?', a: 'Nej, Finnhamn, Arholma och Utö nås med kollektivtrafik (Waxholmsbolaget). Däremot är fria tältplatser på naturreservatsöar enklast att nå med kajak eller liten motorbåt. Kajak kan hyras i Vaxholm och Stavsnäs.' },
    ],
  },
  {
    slug: "fiskelage-bohuslan",
    title: "Bohusläns bästa fiskelägen – Smögen, Fjällbacka och Grebbestad",
    excerpt: "Bohusläns fiskelägen är mer äkta Sverige än de flesta vet — vita trähus på klippor, räka direkt från båten och genuint kustliv. Guide till de vackraste och mest autentiska lägena.",
    category: "Region", emoji: "🎣", readTime: "7 min", fullContent: true,
    topics: ['bohuslan', 'mat', 'natur'],
    faqs: [
      { q: 'Vilket fiskeläge i Bohuslän är mest värt att besöka?', a: 'Smögen är det mest kända med den långa bryggan och skaldjursbutikernad. Fjällbacka är vackrast och lugnast. Grebbestad är bäst för att köpa färsk räka och ostron direkt från fiskehamnen. Käringön på Orust är mest äkta och orörd av turistindustrin.' },
      { q: 'När kan man köpa färsk räka i Bohuslän?', a: 'Räka är tillgänglig hela sommarsäsongen (maj–sept) och köps bäst tidigt på morgonen direkt från fiskebåtarna vid bryggan i Smögen och Grebbestad. Räka ska ätas samma dag den köps — den håller inte länge.' },
      { q: 'Hur tar man sig till Bohusläns fiskelägen?', a: 'Smögen, Fjällbacka och Grebbestad nås med bil längs E6 och lokala vägar. Västtrafik buss 870/871 kör längs kusten. Käringön på Orust nås med bilfärja från Svanesund. Kosteröarna nås med färja från Strömstad.' },
    ],
  },
  // ── Batch G: Resterande guider – alla serier ──────────────────────────────────
  {
    slug: "jul-skargarden-2026",
    title: "Jul i skärgården 2026 – advent, öppna öar och stämning",
    excerpt: "Skärgården på vintern och i advent är ett helt annat landskap. Guide till öppna öar, julmarknader och vinterbastu under december 2026.",
    category: "Säsong", emoji: "🎄", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka öar i skärgården är öppna i december?', a: 'Vaxholm och Fjäderholmarna har julstämning och öppna restauranger. Sandhamns Värdshus håller öppet under julen. Utö Värdshus är en klassisk julupplevelse. Kontrollera alltid öppettider – de varierar år till år.' },
      { q: 'Är det värt att besöka skärgården i december?', a: 'Absolut – för den som vill ha något annorlunda. Vinterstämningen med lyktor, kylig luft och tomma bryggor är magisk. Bastubad med havsdopp i december är en minnesvärd upplevelse.' },
    ],
  },
  {
    slug: "nyar-skargarden-2026",
    title: "Nyår i skärgården 2026–2027 – fyrverk, öar och stämning",
    excerpt: "Nyårsfirande i skärgården med fyrverkeri reflekterade i havet. Öppna öar, hotell och tips för nyårsnatten ute bland kobbar och klippor.",
    category: "Säsong", emoji: "🎆", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Var firar man nyår i skärgården 2026?', a: 'Sandhamns Värdshus och Vaxholms Hotell är klassiska nyårsmiddagsalternativ – boka månader i förväg. Alternativet är en privatstuga på en ö med utsikt mot himlen och egna fyrverkerier.' },
      { q: 'Hur tar man sig till skärgården på nyårsnatten?', a: 'Waxholmsbolaget kör specialtidtabell kring nyår. Kolla tidtabellen i förväg – sista båten kan gå tidigt på kvällen. Övernattning rekommenderas starkt för nyårsfirande i skärgården.' },
    ],
  },
  {
    slug: "pask-skargarden-2027",
    title: "Påsk i skärgården 2027 – vårens första utflykt",
    excerpt: "Påsken är startskottet för skärgårdens värsäsong. Vilka öar öppnar, hur kylan sitter i havet och varför påskhelgen är underbar i skärgården.",
    category: "Säsong", emoji: "🐣", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Är skärgårdsöarna öppna i påsk?', a: 'Fjäderholmarna, Vaxholm och Grinda öppnar normalt till påsk. Sandhamn och Utö brukar ha påskpaket. Ring och bekräfta – det varierar och öppettiderna bestäms sent.' },
      { q: 'Vad är det för väder i påsk i skärgården?', a: 'Påsk i Sverige faller i mars–april. Förvänta dig 5–12°C, klart men blåsigt. Ta med extra lager – havsklimatet är kallare än i city. Havet är 4–8°C – för kallt att bada men fint att titta på.' },
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
    title: "Kajakpaddling i Bohuslän – guide längs klippkusten",
    excerpt: "Västerhavet med sina klippor och sund är ett kajakparadis. Guide till de bästa paddlingsrutterna, hyrning och säkerhet längs Bohusläns kust.",
    category: "Aktivitet", emoji: "🛶", readTime: "8 min", fullContent: true,
    faqs: [
      { q: 'Är Bohuslän bra för kajakpaddling?', a: 'Ja – Bohusläns skärgård med sina sund, kobbar och klippor är ett av Skandinaviens bästa kajaklandskap. Kosterfjorden (nationalpark) och Gullmaren är höjdpunkter. Hafsten Resort och Kosteröarna erbjuder hyrning och guidade turer.' },
      { q: 'Behöver man erfarenhet för att kajaka i Bohuslän?', a: 'Västerhavet kräver mer respekt än inre skärgård. Nybörjare bör paddla med guide eller välja skyddade sund. Erfarna paddlare kan ta sig längre sträckor. Ta alltid kurs om du är nybörjare – havsströmmar och tidvatten kräver kunskap.' },
    ],
  },
  {
    slug: "vandring-gotland",
    title: "Vandring på Gotland – de bästa lederna och turerna",
    excerpt: "Gotlands platta landskap är perfekt för vandring. Raukleder, kustleder och skogsstigar. Guide till de bästa vandringsupplevelserna på ön.",
    category: "Aktivitet", emoji: "🥾", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Vilka är de bästa vandringslederna på Gotland?', a: 'Gotlandsleden (200 km runt hela ön) är flaggskeppet. Raukleder till Langhammars och Gamla Hamn på Fårö är höjdpunkter. Hoburgen i söder och Lummelundasgrottornas omgivningar ger varierad natur.' },
      { q: 'Hur svåra är vandringslederna på Gotland?', a: 'Gotland är platt – lederna är lätta till medelsvåra. Inga branta stigningar. Perfekt för nybörjarvandring och familjer. Det enda som krävs är bra skor och vätska – det kan vara blåsigt och soligt utan skugga.' },
    ],
  },
  {
    slug: "cykling-gotland",
    title: "Cykla på Gotland – en dag, tre dagar eller en vecka",
    excerpt: "Gotland är en av Sveriges bästa cykelöar. Platt terräng, bilfria vägar och vackra vyer. Guide till rutter för alla ambitionsnivåer.",
    category: "Aktivitet", emoji: "🚴", readTime: "7 min", fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Var hyr man cykel på Gotland?', a: 'Cykeluthyrning finns i Visby (centralt, nära hamnen och flygplatsen) och på flera platser runt ön. Priserna är ca 100–200 kr/dag. Elcyklar tillgängliga för längre turer. Boka i förväg i juli.' },
      { q: 'Vilken cykelrutt på Gotland rekommenderas för nybörjare?', a: 'Visby – Tofta strand – Klintehamn och tillbaka är en klassisk dagstur på ca 50 km i platt terräng. Längs kusten med stopp vid kyrkor och stränder. En hel dag av lagom utmaning.' },
    ],
  },
  {
    slug: "cykling-oland",
    title: "Cykla på Öland – längs kust, alvar och vindmöllor",
    excerpt: "Öland är Sverige plattaste ö och ett av landets bästa cykellandskap. Kustleder, Alvaret och vandrarhem längs vägen. Komplett cykelguide.",
    category: "Aktivitet", emoji: "🚲", readTime: "7 min", fullContent: true,
    faqs: [
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Var hyr man cykel på Öland?', a: 'Cykelhyrning finns i Borgholm och vid Böda (norra Öland). Priserna är ca 100–150 kr/dag. Elcyklar finns för den som vill täcka mer av öns 137 km längd. Ta med lapp och lapp-utrustning – det blåser på Öland.' },
      { q: 'Kan man cykla runt hela Öland?', a: 'Hela Öland är ca 240 km runt – 3–5 dagsturer för normalcyklister. Landsvägar och cykelvägar längs båda kusterna. Böda – Borgholm – Mörbylånga – Ottenby är en klassisk etapptur med vandrarhem längs vägen.' },
    ],
  },
  {
    slug: "snorkling-kosterhavet",
    title: "Snorkling i Kosterhavet – Europas artrikaste marina miljö",
    excerpt: "Kosterhavets nationalpark har Europas artrikaste marina miljö. Sjöborrar, sjöstjärnor och koraller väntar under ytan. Guide till snorkling och dykning.",
    category: "Aktivitet", emoji: "🤿", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Varför är Kosterhavet bäst för snorkling i Sverige?', a: 'Kosterfjorden är unik – det djupa saltiga vattnet från Atlanten når hit och ger Nordeuropas artrikaste marina miljö norr om Portugal. Du kan se sjöborrar, havsanemoner, sjöstjärnor och koraller som annars bara finns i sydligare hav.' },
      { q: 'Hur tar man sig till Kosterhavet för snorkling?', a: 'Ta båt till Sydkoster eller Nordkoster från Strömstad. Lokala arrangörer erbjuder snorklingssafari med utrustning och guide. Vatten temperaturen i Kosterfjorden är 15–18°C på sommaren – våtdräkt rekommenderas.' },
    ],
  },
  {
    slug: "ostronstangning-bohuslan",
    title: "Ostronplockning i Bohuslän – säsong, safari och guide",
    excerpt: "Bohuslän är landets ostronhuvudstad. Säsongen öppnar i september. Guide till ostronsafari, plockning och hur du avnjuter färska Västerhavsostron.",
    category: "Aktivitet", emoji: "🦪", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'När öppnar ostronsäsongen i Bohuslän?', a: 'Bohusläns ostron skördas under månader med R (september–april). September är premiären och de mest eftertraktade ostronensäsongens startskott. Grebbestad och Lysekil är ostronhuvudstäderna.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Kan man plocka egna ostron i Bohuslän?', a: 'Ja, med tillstånd från länsstyrelsen. Det enklaste är att boka ostronsafari med lokal guide som inkluderar utrustning, plockrättigheter och serveringstips. Priset är ca 400–700 kr/person.' },
      { q: 'Hur äter man färska Västerhavsostron?', a: 'Öppna med ostronkniv, lossa muskeln och servera raw på isen med citron och tabasco. Alternativt gratinerade med smör och vitlök. Lokalt är de bästa ostronerna serverade med ett glas Chablis.' },
    ],
  },
  {
    slug: "hyra-stuga-skargarden",
    title: "Hyra stuga i skärgården – guide och prisjämförelse",
    excerpt: "Stugor i skärgården finns i alla prisklasser. Guide till de bästa uthyrningssajterna, vad du bör kräva och hur du hittar de bästa lägena.",
    category: "Praktisk", emoji: "🏡", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Var hittar man stugor att hyra i skärgården?', a: 'Blocket.se (störst utbud), Airbnb (mer service), Skärgårdsidyllen och lokala uthyrares egna hemsidor. För de mest attraktiva lägena med havsutsikt och brygga krävs bokning 3–6 månader i förväg för juli.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Vad kostar en stuga i skärgården?', a: 'En enkel stuga utan el kostar 3 000–6 000 kr/vecka. En välutrustad stuga med brygga och sjöutsikt kostar 8 000–20 000 kr/vecka i högsäsong. Pris beror kraftigt på läge – ju mer åtkomlig med bilfärja, desto högre pris.' },
      { q: 'Vad ska man tänka på när man hyr stuga i skärgården?', a: 'Kolla tillgången till dricksvatten och avlopp (viktigt i ytterskärgård). Kontrollera om det ingår båt/kajak. Fråga om det är mobiltäckning. Läs alla recensioner noga och fråga uthyraren direkt vid tveksamheter.' },
    ],
  },
  {
    slug: "hyra-stuga-gotland",
    title: "Hyra stuga på Gotland 2026 – guide och tips",
    excerpt: "Gotland har massor med stuguthyrning – allt från enkla lantgårdar till lyxvilla vid havet. Guide till bästa sajterna och perioder att boka.",
    category: "Praktisk", emoji: "🏘", readTime: "6 min", fullContent: true,
    faqs: [
      { q: 'Var hittar man stuga att hyra på Gotland?', a: 'Blocket, Airbnb och Gotland.se/boende är de viktigaste kanalerna. Lokala mäklare och uthyrare på Gotland har ofta de bästa lägena med havsutsikt och forna bondgårdar. Boka juli-veckor redan i januari.' },
      // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
      { q: 'Hur mycket kostar stuga på Gotland?', a: 'En enkel stuga 10 km från Visby kostar 5 000–10 000 kr/vecka. Havsnära stuga med brygga kostar 15 000–30 000 kr/vecka i juli. Off-season (maj, sep) halverar priserna.' },
    ],
  },
  {
    slug: "faro-guide",
    title: "Färö guide – Ingmar Bergmans ö och raukarnas landskap",
    excerpt: "Färö norr om Gotland är Ingmar Bergmans ö och hem till några av Nordens mest dramatiska naturformationer. Guide till raukar, stränder och stillheten.",
    category: "Region", emoji: "🎬", readTime: "7 min", fullContent: true,
    faqs: [
      { q: 'Hur tar man sig till Färö?', a: 'Med bilfärja från norra Gotland (Fårösund) – resan tar 10 minuter och avgår kontinuerligt under sommarsäsongen (gratis). Du behöver bil på Gotland för att nå färjekajen och för att köra runt Fårö.' },
      { q: 'Vad är Fårö mest känt för?', a: 'Raukarna vid Langhammars och Gamla Hamn (dramatiska kalkstensformationer), Ingmar Bergmans hemvist och den vilda sandstranden Sudersand. Bergman Center i Fårösund berättar om regissörens liv och filmer.' },
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
  { slug: "grebbestad-guide", title: "Grebbestad guide – kräftor, ostron och Bohusläns hjärta", excerpt: "Grebbestad är det mest genuina fiskesamhället i Bohuslän och hem till landets bästa kräftor och ostron. Komplett guide till Grebbestad.", category: "Region", emoji: "🦞", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Grebbestad?', a: 'Med Västtrafik buss från Göteborg (ca 2,5 timmar) eller bil via E6 avfart Tanumshede. Ca 18 mil norr om Göteborg.' }, { q: 'Varför är Grebbestad känt för skaldjur?', a: 'Grebbestadsfjorden skapar perfekta förhållanden för ostron, kräftor och hummer. Lokala fiskare erbjuder båtsafaris med avsmakningar direkt vid fångstplatsen.' }] },
  { slug: "stromstad-guide", title: "Strömstad guide – nära norska gränsen och Kosterfjorden", excerpt: "Strömstad är Sveriges nordligaste kuststad och porten till Kosterhavets nationalpark och norska Strömstads-arkipelagen.", category: "Region", emoji: "🏴", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Strömstad?', a: 'Med tåg (Bohusbanan) från Göteborg ca 2 timmar, eller bil via E6 ca 17 mil norr om Göteborg. Strömstad är startpunkten för färjan till Kosteröarna.' }, { q: 'Kan man besöka Norge från Strömstad?', a: 'Ja – norska gränsen är 15 km bort. Norska Kosterfjordarkipelagen och Hvaler skärgård nås med båt.' }] },
  { slug: "hano-guide", title: "Hanö guide – Blekinges ytterskärgård och ostindiefararen", excerpt: "Hanö är Blekinges mest dramatiska ö med rik historia kring engelska sjömän och ostindiefararnas tid. Guide till den lilla pärlans hemligheter.", category: "Region", emoji: "⚓", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Hanö?', a: 'Med reguljär båt från Sölvesborg i Blekinge – ca 1 timme. Bilfri ö med sommartrafik.' }, { q: 'Vad är Hanö känt för?', a: 'Brittiska flottan använde Hanö 1810–1814 under Napoleonkrigen. Engelska sjömäns gravstenar, ett gammalt fyrtorn och dramatisk klippmiljö.' }] },
  { slug: "bastad-guide", title: "Båstad guide – tennis, sommareliten och Bjärehalvön", excerpt: "Båstad är Hallands mest exklusiva sommardestination med world-class tennis, vackra klippor och Bjärehalvöns natur.", category: "Region", emoji: "🎾", readTime: "7 min", fullContent: true, faqs: [{ q: 'När är Swedish Open i Båstad?', a: 'Swedish Open (ATP) hålls normalt i juli. Under turneringsveckan är Båstad fullpackat – boka boende månader i förväg.' }, { q: 'Vad kan man göra i Båstad utöver tennis?', a: 'Bjärehalvöns vandringsleder, Norrvikens trädgårdar och klippbad längs kusten.' }] },
  { slug: "skargard-instagramguide", title: "Skärgårdens vackraste platser – guide för fotografer", excerpt: "De bästa platserna för foto och inlägg i Stockholms skärgård. Solnedgångar, klipphällar och utsiktspunkter som fotografer och resenärer älskar.", category: "Aktivitet", emoji: "📸", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka platser är bäst för foto i skärgården?', a: 'Sandhamns ytterskärgård, Arholmas fyrtorn vid solnedgång och Utös klippor mot havet.' }, { q: 'Bästa tid för foto i skärgården?', a: 'Gyllene timmen (timmen efter soluppgång och före solnedgång). I juli går solen ner sent — mot tio på kvällen i Stockholmsområdet — så kvällspasset är långt.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "wellness-retreat-skargarden", title: "Wellness och retreat i skärgården – lugn och återhämtning", excerpt: "Skärgården är den perfekta platsen för wellness och mindful-semestern. Yoga, meditationsleder och stillahavsanläggningar bland öarna.", category: "Praktisk", emoji: "🧘", readTime: "6 min", fullContent: true, faqs: [{ q: 'Finns det wellnessretreat i skärgården?', a: 'Ja – Utö Värdshus, Sommarro Spa och flera privata retreats erbjuder yoga, meditation och detoxpaket bland öarna.' }, { q: 'Vad ingår i ett skärgårdsretreat?', a: 'Yoga morgon och kväll, naturpromenader, ren mat, havsbastu. Pris: 2 000–5 000 kr/natt allt inkl.' }] },
  { slug: "brollop-skargarden", title: "Bröllop i skärgården – guide till drömbröllopet", excerpt: "Skärgården med havsutsikt och klipphällar är en av de vackraste bröllopsplatserna i Sverige. Guide till lokaler, transport och planering.", category: "Praktisk", emoji: "💍", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka lokaler i skärgården är bäst för bröllop?', a: 'Sandhamns Värdshus (50–120 pers), Grinda Wärdshus (40–80 pers) och Utö Värdshus är de mest populära bröllopsdestinationerna.' }, { q: 'Hur tidigt ska man boka bröllop i skärgården?', a: 'Minst 1–2 år i förväg för populäraste lokalerna och lördagar i juni–aug.' }] },
  { slug: "orust-guide", title: "Orust guide – Bohusläns största ö och båtbyggarnas hem", excerpt: "Orust är Bohusläns och Sveriges tredje största ö. Känd för sina varv, kustsamhällen och vackra klipplandskap. Komplett guide.", category: "Region", emoji: "⛵", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Orust?', a: 'Med bil via bro från fastlandet (Stenungsund eller Hjärtum) – ingen färja. Västtrafik buss från Göteborg ca 1,5–2 timmar.' }, { q: 'Vad är Orust känt för?', a: 'Hallberg-Rassy och flera båtvarv. Fisklägen som Mollösund, Käringön och Gullholmen.' }] },
  { slug: "sensommar-bohuslan-2026", title: "Sensommar i Bohuslän 2026 – klippor och ostron i aug–sep", excerpt: "Sensommaren förvandlar Bohuslän. Turisterna försvinner, ostronsäsongen öppnar och klipphällarna är tomma. Guide till aug–sep 2026.", category: "Säsong", emoji: "🍂", readTime: "6 min", fullContent: true, faqs: [{ q: 'Varför är sensommaren bäst i Bohuslän?', a: 'Havet är varmt (18–20°C), turistmassan borta och ostronsäsongen öppnar i september. Priserna sjunker 20–40%.' }, { q: 'Vad händer i Bohuslän i september?', a: 'Hummerpremieren 21 september, ostronsäsongens öppning och klättringsäsong i full gång.' }] },

  // ── Batch H: Transaktionella guider – hög kommersiellt värde ──────────────
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "hyra-bat-utan-korkort-stockholm", title: "Hyra båt utan körkort Stockholm – elmotorbåtar och bobåtar", excerpt: "Du behöver inget körkort för att hyra båt i Stockholm. Guide till elmotorbåtar, bobåtar och RIB:ar du får ta direkt ut i skärgården.", category: "Praktisk", emoji: "⚡", readTime: "7 min", fullContent: true, topics: ['hyra-bat'], faqs: [{ q: 'Vilka båtar kan man hyra utan körkort i Stockholm?', a: 'Elmotorbåtar, bobåtar och RIB:ar upp till en viss motorstyrka kräver inget körkort. Uthyrarna bestämmer själva sina krav – de flesta erbjuder en kort genomgång ombord innan du ger dig iväg.' }, { q: 'Vad kostar det att hyra båt utan körkort i Stockholm?', a: 'Elmotorbåt: 500–900 kr/timme eller 2 000–3 500 kr/heldag. Uthyrning finns vid Djurgårdsbrunnsviken, Nacka och Hammarby Sjöstad.' }] },
  { slug: "aw-pa-bat-stockholm", title: "AW på båt Stockholm – charterbåtar och paket 2026", excerpt: "AW på båt är Stockholms populäraste sätt att fira. Guide till charterbåtar, operatörer, priser och hur du bokar den perfekta after work på vattnet.", category: "Aktivitet", emoji: "🥂", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vad kostar AW på båt i Stockholm?', a: 'Charter av en båt för AW kostar 800–2 500 kr/person beroende på paket. Inkluderar normalt dryck, mat och kapten. Minst 20–30 personer krävs vanligen för charter.' }, { q: 'Hur bokar man AW på båt i Stockholm?', a: 'Kontakta Strömma Charter, Cinderella Event eller lokala charterbåtsbolag. Boka 4–8 veckor i förväg för juni–aug. Fredag eftermiddag är populärast.' }] },
  { slug: "konferens-skargard-stockholm", title: "Konferens i skärgården Stockholm – anläggningar och paket", excerpt: "Skärgårdskonferensen ger ett unikt fokus och rätt stämning. Guide till de bästa konferensanläggningarna i Stockholms skärgård, med priser och transport.", category: "Praktisk", emoji: "🏢", readTime: "7 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka är de bästa konferensanläggningarna i skärgården?', a: 'Utö Värdshus (kapacitet 100+ pers), Sandhamns Värdshus, Djurö Konferens och Finnhamn STF erbjuder konferenspaket med modern teknik och naturmiljö.' }, { q: 'Vad kostar konferens i skärgården?', a: 'Heldagskonferens med lunch: 800–1 500 kr/person. Övernattningskonferens allt inkl: 2 500–4 500 kr/person per natt.' }] },
  { slug: "kajak-vaxholm", title: "Kajak Vaxholm – uthyrning och paddlingsrutter 2026", excerpt: "Vaxholm är startpunkten för skärgårdens bästa kajakrutter. Guide till kajakhyrning i Vaxholm, dagsturer och vad du kan paddla till.", category: "Aktivitet", emoji: "🛶", readTime: "6 min", fullContent: true, topics: ['kajak'], faqs: [{ q: 'Var hyr man kajak i Vaxholm?', a: 'Vaxholm Kajak och Outdoor och lokala uthyrare vid Vaxholms brygga erbjuder kajakhyrning från ca 300–400 kr/halvdag. Enkelbåtar och kanadensare finns.' }, { q: 'Vilka kajakrutter går från Vaxholm?', a: 'Klassisk rutt: Vaxholm – Rindö – Resarö – Vaxholm (ca 15–20 km dagstour). Mer avancerat: Vaxholm norrut mot Blidö och Norrtälje.' }] },
  { slug: "hyra-kajak-stockholm", title: "Hyra kajak Stockholms skärgård – operatörer och priser", excerpt: "Komplett guide till kajakhyrning i Stockholms skärgård. Var du hyr, vad det kostar, vilka rutter som passar och vad du behöver veta om säkerhet.", category: "Aktivitet", emoji: "🚣", readTime: "7 min", fullContent: true, topics: ['kajak'], faqs: [{ q: 'Vad kostar det att hyra kajak i Stockholms skärgård?', a: 'Enkelbåt: 300–500 kr/halvdag, 500–800 kr/heldag. Kanadensare: 400–700 kr/halvdag. Leverans till ö möjlig hos vissa operatörer.' }, { q: 'Behöver man kunna kajaka för att hyra?', a: 'Nybörjare välkomna – uthyrarna ger en grundläggande genomgång (30 min). Välj lugna inre skärgårdsrutter. Yttre skärgård kräver mer erfarenhet.' }] },
  { slug: "hyra-elektrisk-bat-stockholm", title: "Hyra elektrisk båt Stockholm – guide till elbåtar 2026", excerpt: "Elbåtar är tyst, enkel och körkortsfria. Guide till Stockholms elbåtsuthyrare, priser och de bästa ställena att ta en elektrisk båt till.", category: "Praktisk", emoji: "⚡", readTime: "6 min", fullContent: true, topics: ['hyra-bat'], faqs: [{ q: 'Vad är fördelen med elektrisk båt?', a: 'Tyst (inga buller eller avgaser), lätt att köra, körkortsfri och miljövänlig. Perfekt för picknick-utflykter och romantiska kvällar i skärgården. Räckvidd: ca 4–6 timmar.' }, { q: 'Var hyr man elektrisk båt i Stockholm?', a: 'Elmo Boats, Båtbörsen och flera operatörer vid Djurgårdsbrunnsviken och Nacka Strand erbjuder elbåtar. Priserna är ca 600–1 200 kr/timme.' }] },
  { slug: "glamping-skargard", title: "Glamping i skärgården – lyxcamping vid havet 2026", excerpt: "Lyxcamping i skärgården kombinerar naturens stillhet med bekvämlighet. Guide till glamping-anläggningar, glamping-tält och lyxiga utomhusövernattningar.", category: "Praktisk", emoji: "⛺", readTime: "7 min", fullContent: true, faqs: [{ q: 'Var finns glamping i skärgården?', a: 'Utö Värdshus, Grinda och Sandhamn har lyxiga övernattningsalternativ nära naturen. Sök även på "skärgårds-glamping" på Airbnb och Booking.com för privatägda glamping-tält och stugor.' }, { q: 'Vad kostar glamping i skärgården?', a: 'Glamping-tält och lyxstugor vid havet: 1 500–4 000 kr/natt. Inkluderar normalt sängkläder, el och ofta frukost. Boka långt i förväg för juli.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "segeldag-foretag-stockholm", title: "Segeldag för företag Stockholm – paket och operatörer", excerpt: "En segeldag är företagseventets höjdpunkt. Guide till arrangörer, priser, vad som ingår och hur du bokar en minnesvärd segeldag i Stockholms skärgård.", category: "Aktivitet", emoji: "🏆", readTime: "6 min", fullContent: true, topics: ['segelkurs', 'teambuilding'], faqs: [{ q: 'Vad kostar segeldag för företag i Stockholm?', a: 'Räkna med 1 500–3 000 kr/person för en heldag med mat, professionell besättning och tävlingsmoment. Normalt min 10 personer per båt, 2–5 båtar för medelstora grupper.' }, { q: 'Behöver deltagarna kunna segla?', a: 'Nej – professionell besättning sköter seglingen. Deltagarna lär sig grunderna och tävlar mot varandra. Det är teambuilding, inte segelkurs.' }] },
  { slug: "teambuilding-kajak-stockholm", title: "Teambuilding kajak Stockholm – paket och arrangörer", excerpt: "Kajakpaddling som teambuilding ger samarbete, utmaning och skärgårdsupplevelse i ett. Guide till arrangörer, paket och vad du kan förvänta dig.", category: "Aktivitet", emoji: "🤝", readTime: "6 min", fullContent: true, topics: ['teambuilding', 'kajak'], faqs: [{ q: 'Vad kostar teambuilding med kajak i Stockholm?', a: 'Paket med instruktör, utrustning och program kostar 600–1 200 kr/person. Halvdagar är vanligast (3–4 timmar). Möjlighet att kombinera med lunch eller after work.' }, { q: 'Passar kajak för alla som teambuilding?', a: 'Kajak passar de flesta – det kräver ingen tidigare erfarenhet. Säg till arrangören om deltagare har begränsad rörlighet. Kanadensare (tvasitsiga) är lättare för nybörjare.' }] },
  { slug: "cykeluthyrning-gotland", title: "Cykeluthyrning Gotland – priser, operatörer och rutter", excerpt: "Cykel är det bästa sättet att uppleva Gotland. Guide till cykeluthyrning i Visby och runt ön, priser 2026 och de bästa cykeldagsturerna.", category: "Aktivitet", emoji: "🚴", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var hyr man cykel på Gotland?', a: 'Cykelhyrning finns centralt i Visby, nära hamnen och flygplatsen. Populära operatörer: Gotlands Cykeluthyrning och Destinationsbolaget. Pris: ca 100–200 kr/dag, elcyklar ca 300 kr/dag.' }, { q: 'Kan man hämta cykel vid hamnen i Visby?', a: 'Ja, de flesta uthyrare levererar cyklar till hamnområdet när färjan anländer. Boka online i förväg för juli – cyklarna tar slut snabbt.' }] },
  { slug: "kursgard-skargard-stockholm", title: "Kursgård i skärgården Stockholm – konferens och retreat", excerpt: "Kursgårdar i Stockholms skärgård erbjuder avskildhet och fokus. Guide till anläggningar, priser och hur du bokar kursgård för grupp eller företag.", category: "Praktisk", emoji: "🏫", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka kursgårdar finns i Stockholms skärgård?', a: 'Finnhamn STF, Grinda Wärdshus och Utö Värdshus har kursgårdskapacitet med mötesrum och övernattning. Finns även privatdrivna retreat-anläggningar på mindre öar.' }, { q: 'Vad kostar kursgård i skärgården?', a: 'Halvdagspaket: ca 600–900 kr/person. Heldagskonferens med lunch: 1 000–1 500 kr/person. Övernattning tillkommer med 1 000–2 500 kr/person per natt.' }] },
  { slug: "kickoff-ideer-skargard", title: "Kick-off idéer skärgård – aktiviteter och arrangörer", excerpt: "Skärgårds-kick-offen med rätt aktiviteter är årets höjdpunkt. 15 konkreta idéer, från segling och kajak till matlagning och havsbastu.", category: "Aktivitet", emoji: "🎯", readTime: "7 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka aktiviteter passar bäst för kick-off i skärgården?', a: 'Toppaktiviteter: segel-regatta, kajaktävling, havsfiske, matlagning med lokala råvaror, havsbastubad, och kvällsmingel ombord på charterbåt. Kombinera 2–3 aktiviteter för en heldagsupplevelse.' }, { q: 'Hur tidigt bör man boka kick-off i skärgården?', a: 'Boka 3–6 månader i förväg för juni–aug. Populära arrangörer och anläggningar tar slut snabbt. Var ute i januari–februari för sommarkick-off.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "hyra-stuga-marstrand-bohuslan", title: "Hyra stuga Marstrand och Bohuslän – guide 2026", excerpt: "Stugor längs Bohusläns klippkust är hett eftertraktade. Guide till stuguthyrning runt Marstrand, Smögen och Bohuslän med priser och bästa sajterna.", category: "Praktisk", emoji: "🏡", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var hittar man stugor att hyra i Marstrand och Bohuslän?', a: 'Sök på Blocket Bostad, Airbnb och SVIF (stuguthyrare). Lokala mäklare och Marstrand.se har egna uthyrningslistor. Boka tidigt – vecka 27–31 är slutsålda i november.' }, { q: 'Vad kostar en stuga vid havet i Bohuslän?', a: 'Enkelt: 3 000–6 000 kr/vecka. Standard med havsutsikt: 6 000–12 000 kr/vecka. Lyxigt/stort hus vid brygga: 15 000–30 000 kr/vecka. Priser är högst i juli.' }] },
  { slug: "workshop-skargard-stockholm", title: "Workshop i skärgården Stockholm – lokaler och paket", excerpt: "Workshop i skärgård ger fokus, kreativitet och teamkänsla. Guide till lokaler, arrangörer och hur du planerar en effektiv workshop ute på öarna.", category: "Praktisk", emoji: "✏️", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka öar i Stockholms skärgård passar för workshop?', a: 'Grinda, Utö, Finnhamn och Sandhamn har välbyggda lokaler för 10–60 personer. Transport med Waxholmsbolaget ingår i paket hos många arrangörer.' }, { q: 'Behöver man ta med egen teknik till workshop i skärgården?', a: 'De flesta konferensanläggningar har projektor, whiteboard och wifi. Dubbelkolla med anläggningen – mobilt nätverk är ofta svagt i yttre skärgården.' }] },
  { slug: "teambuilding-skargard-stockholm", title: "Teambuilding skärgård Stockholm – aktiviteter och paket", excerpt: "Stockholms skärgård är perfekt för teambuilding. Guide till aktiviteter, arrangörer och paket 2026 – segling, kajak, matlagning och havsbastu.", category: "Aktivitet", emoji: "🤝", readTime: "8 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vad är de populäraste teambuilding-aktiviteterna i Stockholms skärgård?', a: 'Topplistan: segelregatta (lätt att skräddarsy), kajakpaddling, havsfiske, matlagning med skärgårdsmat, och havsbastu-upplevelse. De flesta arrangörer kombinerar aktivitet med middag och övernattning.' }, { q: 'Hur många kan delta i teambuilding i skärgården?', a: 'Aktiviteter passar grupper om 10–200 personer. Stora grupper delas i lag. Populära arrangemang: 20–50 pers för dagsturer, 15–30 pers för övernattning.' }] },
  { slug: "segelkurs-stockholm", title: "Segelkurs Stockholm skärgård – kurser, skolor och priser", excerpt: "Börja segla i Stockholms skärgård. Guide till segelskolor, kurstyper, kustskepparexamen och vad en segelkurs i Stockholm faktiskt kostar 2026.", category: "Aktivitet", emoji: "⛵", readTime: "7 min", fullContent: true, topics: ['segelkurs'], faqs: [{ q: 'Vad kostar segelkurs i Stockholm?', // KÄLLA: stockholmssegelsallskap.se (helgkurs 4 400 kr), gkss.se (5 100–6 600 kr), sngruppen.se (kustskeppare från 2 995 kr) — avlästa 2026-08-11
      a: 'Nybörjarhelgkurs hos Stockholms Segelsällskap: 4 400 kr (2 700 kr för studerande); GKSS motsvarande kurser 5 100–6 600 kr. Kustskepparintygskurs: från 2 995 kr plus litteratur, båtpraktik ingår. Kustskepparexamen krävs för att charterbåtar ska låta dig hyra utan besättning.' }, { q: 'Vilka segelskolor finns i Stockholm?', a: 'KSSS (Kungliga Segel Sällskapet), SXK Stockholm, och privata aktörer som Stockholm Sailing har kurser maj–september. Boka i mars för populära sommarveckor.' }] },
  { slug: "dagstur-marstrand", title: "Dagstur Marstrand – hur du tar dig dit och vad du gör", excerpt: "Marstrand på en dag: hur du tar dig dit från Göteborg, vad som finns att göra, var du äter och varför Carlstens fästning är värd besöket.", category: "Region", emoji: "🏰", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Marstrand från Göteborg?', a: 'Med bil: kör mot Kungälv, ta väg 168 till Koon, sedan Trafikverkets vägfärja (gratis, 5 min) till Marstrand. Inga bilar tillåts på ön – parkera vid färjeläget. Restid: ca 45 min.' }, { q: 'Vad kostar inträdet till Carlstens fästning?', a: 'Inträde: ca 100–150 kr för vuxen. Familjepriser och guidade turer finns. Öppet maj–september. Fantastisk utsikt och historia från 1600-talet.' }] },
  // Batch I – Yttre Gården
  { slug: "yttre-garden-guide", title: "Yttre Gården – kajakparadis och historiska fiskarspår i Nynäshamns skärgård", excerpt: "Yttre Gården är ett naturreservat i Gårdsfjärden öster om Bedarön. Guide till kajak, regler (ADF-förbud), transport och det historiska fiskarstället Gårdsund från 1912.", category: "Region", emoji: "🪨", readTime: "6 min", fullContent: true, topics: ['kajak'] },

  // ── Batch J: SEO-gap-guider ────────────────────────────────────────────────
  // Säsong
  { slug: "juni-skargarden-2026", title: "Juni i skärgården 2026 – den bästa månaden ingen berättar om", excerpt: "Juni är skärgårdens bästa hemlighet: inga folkmassor, naturen på topp och restaurangerna precis öppnade. Guide till vad som gäller och varför juni slår juli.", category: "Säsong", emoji: "🌿", readTime: "7 min", fullContent: true, faqs: [{ q: 'Varför är juni bättre än juli i skärgården?', a: 'I juni är naturen som grönast, havet börjar bli badbart och du slipper julisärsongens köer och fullbokade bryggor. Restaurangerna är öppna men inte överfulla.' }, { q: 'Vad ska man tänka på när man planerar skärgårdsresa i juni?', a: 'Boka boende tidigt – midsommarhelgen är fulltecknad. Vattnet kan vara kylt (15–18°C). Mygg och knott är ett faktum på de flesta öar i mitten av juni.' }] },
  { slug: "folkfria-oar-juli", title: "Folkfria öar i juli – alternativ till Sandhamn och Marstrand", excerpt: "Juli behöver inte innebära köer och fullbokade bryggor. Guide till öar och platser med plats kvar när de kända är överfulla.", category: "Säsong", emoji: "🏝", readTime: "8 min", fullContent: true, faqs: [{ q: 'Vilka öar i Stockholms skärgård är minst besökta i juli?', a: 'Svartlöga, Arholma, Björkö och Möja norra delar är relativt folkfria jämfört med Sandhamn och Grinda. I Bohuslän: välj öar norr om Smögen och söder om Strömstad.' }, { q: 'Hur undviker man folkmassor i skärgården i juli?', a: 'Åk mitt i veckan (tisdag–torsdag), välj inre skärgårdens mindre kända öar, och ge dig iväg tidigt på morgonen. Undvik lördagar och stora Waxholmsbolagets rutter.' }] },
  { slug: "oktober-skargarden", title: "Oktober i skärgården – stillhet och höstfärger vid havet", excerpt: "Oktober är den mest underskattade skärgårdsmånaden. Havet är fortfarande varmt, löven glöder och du har öarna för dig själv.", category: "Säsong", emoji: "🍁", readTime: "6 min", fullContent: true, faqs: [{ q: 'Är det värt att åka till skärgården i oktober?', a: 'Absolut – oktober ger höstfärger vid vattnet, inga köer och ett stillsammare skärgårdsupplevelse. Havet är ofta varmare än luften (ca 14–16°C i Östersjön).' }, { q: 'Vilka öar i Stockholms skärgård är öppna i oktober?', a: 'Vaxholm och Möja har trafik året runt. Sandhamn, Grinda och Utö kör reducerat schema. Ring alltid och kolla öppettider för restauranger och boende.' }] },
  { slug: "host-oland-2026", title: "Höst på Öland 2026 – alvaret och kusten i höstskrud", excerpt: "Öland på hösten är ett helt annat landskap än sommaren. Tystnad, fågelflyttning och alvaret i gulbrunt ljus. Guide till höstens Öland.", category: "Säsong", emoji: "🌾", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad är det bästa med Öland på hösten?', a: 'Alvaret skiftar till gyllengult och brunt, fågelflyttningen är på topp i oktober, och ön är i princip turistfri. Perfekt för vandring, fågelskådning och stillhet.' }, { q: 'Är Öland öppet på hösten?', a: 'Ja – Ölandsbron är öppen året runt. Många restauranger och attraktioner stänger efter sommarens slut. Borgholms slott och Ekoparken är bäst att boka före besök.' }] },
  { slug: "host-hoga-kusten-2026", title: "Höst i Höga Kusten 2026 – UNESCO-världsarvet i höstljus", excerpt: "Höga Kusten är vackrast på hösten. Lövfärger mot havet, inga turister och klipporna för dig själv. Guide till höstens Höga Kusten.", category: "Säsong", emoji: "🏔", readTime: "6 min", fullContent: true, faqs: [{ q: 'När är höstfärgerna på topp i Höga Kusten?', a: 'Mitten av september till mitten av oktober. Skuleskogens blandskog ger en spektakulär blandning av björk, rönn och barrträd mot det grå havet.' }, { q: 'Hur tar man sig till Höga Kusten på hösten?', a: 'Med bil via E4 (ca 5 timmar från Stockholm). Tåg till Kramfors eller Härnösand och sedan buss/taxi. Båttrafik till öarna minskar kraftigt efter sommaren.' }] },
  { slug: "vinter-gotland-2026", title: "Vinter på Gotland 2026 – medeltid och stillhet utan turisterna", excerpt: "Gotland på vintern är en helt annan ö. Visby utan folkmassor, öppna krogar och raukar i vinterdimma. Guide till vinterGotland.", category: "Säsong", emoji: "❄️", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Gotland på vintern?', a: 'Destination Gotland kör färja från Nynäshamn (3 tim) och Oskarshamn (3,5 tim) hela vintern. BRA och SAS flyger från Arlanda (45 min). Flyg är ofta billigare vintertid.' }, { q: 'Vad kan man göra på Gotland på vintern?', a: 'Visby med julstämning, raukar i dimma, mysiga kvartersbarer och adventsmässor i kyrkoruinerna. Vintern är lugn och mysig – helt annorlunda än sommarens folkliv.' }] },
  { slug: "vinter-bohuslan-2026", title: "Vinter i Bohuslän 2026 – klippor, havsluft och vinterstämning", excerpt: "Bohuslän i vinterskrud är dramatiskt och vackert. Ostron, empty klippor och mysiga krogkvällar i fiskebykerna. Guide till vinterBbohuslän.", category: "Säsong", emoji: "🌊", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad är Bohuslän bäst på vintern?', a: 'Ostronsäsongen (okt–feb) är höjdpunkten – restauranger som Smögen Fisk och Grebbestad-krögarna serverar färska ostron. Dramatiska vinterstormar och klippor utan turister.' }, { q: 'Hur tar man sig till Bohuslän på vintern?', a: 'Med bil (E6 norrut) eller tåg (SJ till Strömstad, Uddevalla eller Stenungsund) + Västtrafik buss. Trafikverkets vägfärjor till öarna kör begränsat vinterscema – kolla tider.' }] },
  { slug: "isbad-vinterbad-sverige", title: "Isbad och vinterbad i Sverige – guide till vinterhavet", excerpt: "Vinterbadningen ökar explosivt i Sverige. Guide till bästa platserna för isbad och vinterbad vid havet – Bohuslän, Skåne, skärgården och Höga Kusten.", category: "Aktivitet", emoji: "🧊", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa platserna för vinterbad i Sverige?', a: 'Marstrand (Bohuslän), Tylösand och Skanör (Skåne), Nacka och Lidingö (Stockholm) samt Haparanda skärgård. Många platser har bastu i kombination.' }, { q: 'Är vinterbad farligt?', a: 'Friska personer klarar kortvarig kallbadning bra. Börja med 1–2 minuter, ha bastu eller torra kläder redo. Undvik att bada ensam och kryp aldrig under is.' }] },
  // Öland
  { slug: "badplatser-oland", title: "Bästa badplatserna på Öland – sandstränder och kalkstensklippor", excerpt: "Öland har Sveriges längsta sandstrand och dramatiska kalkstensklippor. Guide till de 10 bästa badplatserna på Öland 2026.", category: "Aktivitet", emoji: "🏖", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilken är den bästa stranden på Öland?', a: 'Böda sand i norr anses ofta som Ölands bästa – bred sandstrand med grunt vatten. Kapelludden i söder har ett unikt kalkstenslandskap. Kristianopel (fast vid fastlandssidan) erbjuder lugnt vatten.' }, { q: 'Är det varm havsbad på Öland?', a: 'Ja – Kalmarsund (västra sidan) är grundare och varmar upp snabbare (19–22°C i juli). Östersjösidan är kylare och mer vågig. Bäst bad: mitten av juli till mitten av augusti.' }] },
  { slug: "barnfamilj-oland", title: "Öland med barnfamilj – sandstränder, borg och cykelvägar", excerpt: "Öland är ett av Sveriges bästa barnfamiljresmål. Böda sand, Borgholms slottsruin och bilfria leder. Komplett guide för familjesemester på Öland.", category: "Praktisk", emoji: "👨‍👩‍👧", readTime: "8 min", fullContent: true, faqs: [{ q: 'Vad passar barn bäst att göra på Öland?', a: 'Böda sand (barnvänliga badviken), Borgholms slottsruin (fantastisk lekplats), Himmelberga (friluftsmuseum) och cykeluthyrning längs kustleden. Ölands djurpark passar de yngsta.' }, { q: 'Är Öland bilfritt?', a: 'Nej – Öland är fastlandsö via Ölandsbron och bil är vanligaste sättet att ta sig runt. Ölandsbron är gratis. Tåg till Kalmar + buss 101/106 kör längs ön utan bil.' }] },
  { slug: "vandring-oland", title: "Vandring på Öland – kustleder, alvar och naturreservat", excerpt: "Öland är platt och perfekt för vandring. Kustleden längs Västkusten, Alvaret och Trollskogen. Guide till de bästa vandringslederna på Öland.", category: "Aktivitet", emoji: "🥾", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka vandringsleder finns på Öland?', a: 'Kustleden Öland sträcker sig längs hela västra kusten (ca 135 km). Trollskogen naturreservat i norr och Alvaret i söder (UNESCO-världsarv) ger helt olika naturupplevelser.' }, { q: 'Är vandring på Öland lämplig för nybörjare?', a: 'Ja – Öland är nästan helt flackt vilket gör det idealiskt för nybörjare och familjer. Alvaret kan vara obegripligt öppet och hett på sommaren – ta med vatten.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "hyra-stuga-oland", title: "Hyra stuga Öland 2026 – guide till bästa lägena och sajterna", excerpt: "Stugor på Öland finns längs hela ön – vid havet, på alvaret och nära Borgholm. Guide till var du hittar de bästa stugorna och vad du bör tänka på.", category: "Praktisk", emoji: "🏡", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var hittar man stugor att hyra på Öland?', a: 'Blocket Bostad, Airbnb och Olandstugor.se. Boka i november–december för juli-veckor. Lägen nära Böda, Borgholm och Mörbylånga är populärast.' }, { q: 'Vad kostar en stuga på Öland i juli?', a: 'Enkelt: 3 000–5 000 kr/vecka. Standard nära havet: 6 000–10 000 kr/vecka. Lyxig villa: 15 000+ kr/vecka. Böda-lägen är dyrast pga narheten till sandstranden.' }] },
  { slug: "hyra-bil-oland", title: "Hyra bil Öland – guide till biluthyrning och hur du tar dig dit", excerpt: "Öland kräver bil för att utforska på riktigt. Guide till biluthyrning på Öland och i Kalmar, priser 2026 och tips för att köra runt ön.", category: "Praktisk", emoji: "🚗", readTime: "5 min", fullContent: true, faqs: [{ q: 'Var hyr man bil till Öland?', a: 'Hyr bil i Kalmar (Arlanda, Hertz, Enterprise finns vid centralstationen och flygplatsen). Ta sedan Ölandsbron (6 km, gratis) till ön. Inga biluthyrare finns på Öland.' }, { q: 'Måste man ha bil på Öland?', a: 'Inte nödvändigt – buss 101 och 106 kör längs Ölands Alvarväg och kustväg. Men för att nå avsides stränder och naturreservat är bil stor fördel.' }] },
  { slug: "camping-oland", title: "Camping Öland – bästa campingplatser vid havet och alvaret", excerpt: "Öland har ett av Sveriges rikaste camping-utbud. Guide till de bästa campingplatserna vid Böda sand, Borgholm och södra Öland.", category: "Praktisk", emoji: "⛺", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilken är den bästa campingplatsen på Öland?', a: 'Böda Sand Camping är Ölands mest kända – direkt vid den långa sandstranden i norr. Kapelludden Camping i söder ger ett unikt läge vid kalkstenshällen med fyrtorn.' }, { q: 'Måste man boka camping på Öland i förväg?', a: 'Ja, definitivt för juli. Böda Sand är fullt i juli till mitten av juni. Boka via campingens hemsida eller Camping.se. Enklare platser i söder är lättare att boka.' }] },
  { slug: "mat-oland", title: "Mat och restauranger på Öland – lokala råvaror och sommarliv", excerpt: "Öland har en stark matidentitet med lamm, potatis och smör i världsklass. Guide till de bästa restaurangerna och matupplevelserna på Öland.", category: "Mat", emoji: "🍽", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa restaurangerna på Öland?', a: 'Hotell Skansen i Borgholm (klassiker), Smörcaféet (smör från Ölands kor), och lokala lantbruk med gårdsförsäljning. Ölands lamm, potatis och krispiga gurkor är regionens flaggskepp.' }, { q: 'Vad är Öland känt för inom mat?', a: 'Öländsk potatis (världens bästa enligt många), smör, lamm från alvarbetande får, och sommartomater. Smör-SM har arrangerats på Öland och lockar hela Sverige.' }] },
  // Höga Kusten
  { slug: "kajak-hoga-kusten", title: "Kajak Höga Kusten – paddling i UNESCO-världsarvet", excerpt: "Höga Kustens djupa fjärdar och dramatiska klippor är ett kajakparadis. Guide till kajakhyrning, bästa rutter och säkerhet längs Höga Kusten.", category: "Aktivitet", emoji: "🛶", readTime: "7 min", fullContent: true, topics: ['kajak'], faqs: [{ q: 'Var hyr man kajak i Höga Kusten?', a: 'Skuleskogen Outdoor och Höga Kusten Kajakuthyrning erbjuder dagshyrning från Docksta och Barsta. Pris: ca 350–500 kr/halvdag. Guidade paddlingsturer finns också.' }, { q: 'Är Höga Kusten lämplig för nybörjarkajak?', a: 'Delvis – de inre fjärdarna är lugnare och passar nybörjare. Kusten mot öppet hav kan ha strömmar och kraftig sjö. Välj alltid vindstilla dagar som nybörjare.' }] },
  // KÄLLA: sverigesnationalparker.se, Skuleskogens nationalpark — Slåttdalsberget ca 280 m ö.h., Slåttdalsskrevan 200 m lång och 30 m djup (läst 2026-08-15)
  { slug: "vandring-skuleskogen", title: "Vandring i Skuleskogen – guide till nationalparken i Höga Kusten", excerpt: "Skuleskogen är en av Sveriges vackraste nationalparker med 300 meter höga klippor och djupa raviner. Guide till stigar, svårighet och transport.", category: "Aktivitet", emoji: "🏔", readTime: "8 min", fullContent: true, faqs: [{ q: 'Vilka leder finns i Skuleskogen?', a: 'Skulestigen (10 km rundtur) är den populäraste med utsikt från Slåttdalsskrevan – en 200 m djup ravin. Höga Kustenleden passerar genom parken (130 km totalt längs kusten).' }, { q: 'Hur svår är vandringen i Skuleskogen?', a: 'Måttlig – branta partier upp till toppen (295 m.ö.h.) men välmarkerade stigar. Kraftig regn gör klipporna hala. Räkna 3–5 timmar för Skulestigen.' }] },
  { slug: "barnfamilj-hoga-kusten", title: "Höga Kusten med barnfamilj – klippor, bad och naturäventyr", excerpt: "Höga Kusten med barn är en naturupplevelse utöver det vanliga. Guide till barnvänliga aktiviteter, badplatser och boende längs Höga Kusten.", category: "Praktisk", emoji: "👦", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vad passar barn att göra i Höga Kusten?', a: 'Bada vid Barstabadet (sandstrand), utforska Skuleskogen med guidning, besök Nordingrå kyrka och Rotsidan naturreservat. Höga Kustenleden på lättare sträckor fungerar för äldre barn.' }, { q: 'Hur tar man sig till Höga Kusten med familj?', a: 'Bil via E4 är smidigast – parkera vid Skuleskogen infartsparkeringen. Tåg till Kramfors och sedan buss/taxi fungerar men är krångligare med barnvagn och packad bil.' }] },
  { slug: "camping-hoga-kusten", title: "Camping Höga Kusten – platser med utsikt mot havet", excerpt: "Camping i Höga Kusten ger en naturupplevelse som är svår att slå. Guide till campingplatser i och runt Skuleskogen och längs kusten.", category: "Praktisk", emoji: "⛺", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka campingplatser finns i Höga Kusten?', a: 'Docksta Camping (nära Skuleskogen), Barsta Camping (vid havet, sandstrand) och Nordingrå Camping är populärast. Boka i förväg för vecka 28–30.' }, { q: 'Kan man tälta fritt i Höga Kusten?', a: 'Ja – allemansrätten gäller. Längs Höga Kustenleden finns teltslagsplatser med eld och latrin. I nationalparken Skuleskogen gäller speciella regler – tält 2 nätter max.' }] },
  // Bohuslän transaktionella
  { slug: "hyra-bat-goteborg", title: "Hyra båt Göteborg – guide till uthyrning i sydskärgården", excerpt: "Göteborg har ett rikt utbud av båtuthyrning. Guide till var du hyr, vad det kostar och vilka rutter som passar från Göteborg ut i skärgården.", category: "Praktisk", emoji: "⛵", readTime: "7 min", fullContent: true, topics: ['hyra-bat'], faqs: [{ q: 'Var hyr man båt i Göteborg?', a: 'Uthyrare finns vid Lilla Bommen, Saltholmen och Långedrag. Härifrån kan du ta dig ut i sydskärgården. Pris: 500–1 500 kr/timme beroende på båttyp.' }, { q: 'Vilka rutter passar från Göteborg med hyrbåt?', a: 'Klassisk dagstur: Göteborg – Styrsö – Brännö – Asperö (ca 20 km). Eller norrut mot Marstrand (ca 35 km). Kräver sjökortskunskap och gärna kustskepparexamen.' }] },
  { slug: "hyra-bat-marstrand", title: "Hyra båt Marstrand – uthyrning och rutter längs Bohusläns kust", excerpt: "Marstrand är ett perfekt nav för båtuthyrning längs Bohusläns norra kust. Guide till uthyrare, priser och de bästa dagstursrutterna.", category: "Praktisk", emoji: "⛵", readTime: "6 min", fullContent: true, topics: ['hyra-bat'], faqs: [{ q: 'Finns det båtuthyrning i Marstrand?', a: 'Ja – lokala uthyrare vid hamnkajen erbjuder RIB och motorbåtar. Marstrand är ett utmärkt nav för att utforska öarna norrut mot Orust och söderut mot Göteborg.' }, { q: 'Vilka öar kan man nå med hyrbåt från Marstrand?', a: 'Dagstur: Koön, Tjörn (Skärhamn), Orust (Henån). Med RIB: Käringön och norra Bohuslän. Bohuslänska vägfärjor (gratis) är ett alternativ för de öar som saknar bryggor.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "hyra-kajak-bohuslan", title: "Hyra kajak Bohuslän – paddling längs klippkusten", excerpt: "Bohusläns klippkust är ett kajakparadis med sund, kobbar och dramatiska vyer. Guide till kajakhyrning, bästa rutter och operatörer.", category: "Aktivitet", emoji: "🛶", readTime: "7 min", fullContent: true, topics: ['kajak'], faqs: [{ q: 'Var hyr man kajak i Bohuslän?', a: 'Uthyrare finns i Grebbestad, Smögen, Lysekil och Marstrand. Pris: ca 350–600 kr/halvdag. Guidade kajakrutter bokas via lokala operatörer och Naturreservaten i Bohuslän.' }, { q: 'Vilka kajakrutter är bäst i Bohuslän?', a: 'Grebbestadsfjorden och Kosterfjorden är klassiker. Kosteröarna och Stångehuvud ger dramatisk klippkustpaddling. Välj lundiga dagar – Västerhavet kan vara nyckfullt.' }] },
  { slug: "segelkurs-goteborg", title: "Segelkurs Göteborg – skolor, kurser och kustskepparexamen", excerpt: "Göteborg är en av Sveriges bästa städer att lära sig segla. Guide till segelskolor, kurstyper och vad en segelkurs i Göteborg kostar 2026.", category: "Aktivitet", emoji: "⛵", readTime: "7 min", fullContent: true, topics: ['segelkurs'], faqs: [{ q: 'Vilka segelskolor finns i Göteborg?', a: 'GKSS (Göteborgs Kungliga Segel Sällskap), Seglarskolan Göteborg och privata aktörer erbjuder kurser från maj–september. Kustskepparexamen är väl etablerad i Göteborg.' }, { q: 'Vad kostar segelkurs i Göteborg?', // KÄLLA: gkss.se vuxenkurser 2026 (Långedrag/Marstrand 5 100–6 600 kr), sngruppen.se (kustskeppare från 2 995 kr, distans) — avlästa 2026-08-11
      a: 'Nybörjarkurs hos GKSS (Långedrag eller Marstrand): 5 100–6 600 kr. Kustskepparintygskurs: från 2 995 kr plus litteratur, kan läsas på distans. Bohuslän är ett idealiskt kustskepparvatten med sin archipelag-karaktär.' }] },
  { slug: "teambuilding-goteborg-skargard", title: "Teambuilding Göteborg skärgård – aktiviteter och arrangörer", excerpt: "Göteborgs sydskärgård och Bohuslän erbjuder utmärkta förutsättningar för teambuilding. Guide till aktiviteter, arrangörer och paket 2026.", category: "Aktivitet", emoji: "🤝", readTime: "7 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka teambuilding-aktiviteter finns nära Göteborg?', a: 'Sydskärgårdens öar (Styrsö, Brännö, Asperö) erbjuder seglatur, kajakpaddling och havsfiske. Marstrand och Tjörn har specialiserade teamevent-arrangörer med hela paket.' }, { q: 'Hur tar sig en grupp ut i skärgården från Göteborg?', a: 'Västtrafik-färja från Saltholmen till Styrsö (ca 30 min). Charterbåt för grupper bokas hos lokala operatörer – de hämtar gruppen vid valfri kaj i Göteborg.' }] },
  { slug: "aw-pa-bat-goteborg", title: "AW på båt Göteborg – charter och paket i sydskärgården", excerpt: "AW på båt i Göteborgs skärgård kombinerar västkustens bästa med en minnesvärd after work. Guide till charterbåtar, operatörer och priser.", category: "Aktivitet", emoji: "🥂", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vad kostar AW på båt i Göteborg?', a: 'Charter för grupp: 700–2 000 kr/person beroende på paket. Inkluderar normalt kapten, dryck och enkla tilltugg. Fredag kväll är populärast – boka 6–8 veckor i förväg.' }, { q: 'Vilka operatörer erbjuder AW-charter i Göteborg?', a: 'Lokala charterbåtsbolag vid Göteborgs kaj, Göteborgs Skärgårdsrederi och Turistbåtar vid Kungsportsplatsen. Sydskärgårdsöarna eller Marstrand är vanliga destinationer.' }] },
  { slug: "konferens-bohuslan", title: "Konferens Bohuslän – anläggningar vid havet och kustmiljö", excerpt: "Bohuslän erbjuder unika konferensmöjligheter vid havet. Guide till konferensanläggningar, hotell med mötesrum och hur du bokar en skärgårdskonferens.", category: "Praktisk", emoji: "🏢", readTime: "6 min", fullContent: true, topics: ['teambuilding'], faqs: [{ q: 'Vilka konferensanläggningar finns i Bohuslän?', a: 'Smögens Hafvsbad, Hotel Havtorn (Grebbestad), Strandhotellet (Lysekil) och Marstrand 1888 erbjuder konferenser med havsmiljö. Kapacitet: 20–150 personer.' }, { q: 'Vad kostar konferens i Bohuslän?', a: 'Heldagskonferens med lunch: 900–1 400 kr/person. Övernattningskonferens allt inkl: 2 500–4 000 kr/person per natt. Tillgång till havet och aktiviteter ingår ofta.' }] },
  // Gotland
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "flyga-till-gotland", title: "Flyga till Gotland – guide till flyg vs färja", excerpt: "Flyg eller färja till Gotland? Guide till flygbolag, flygtider, priser och när det lönar sig att flyga istället för att ta färjan.", category: "Transport", emoji: "✈️", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka flygbolag flyger till Gotland?', a: 'BRA (Braathens) och SAS flyger från Arlanda till Visby – ca 45 min flygtid. BRA flyger även från Göteborg och Malmö. Flyg är snabbare men dyrare och passar sällan familjer med bil.' }, { q: 'Vad är skillnaden mellan flyg och färja till Gotland?', a: 'Flyg: 45 min, inget fordon, ca 600–1 500 kr enkel. Färja: Destination Gotland från Nynäshamn (3 h) eller Oskarshamn (3,5 h), kan ta med bil, 800–2 500 kr beroende på säsong.' }] },
  { slug: "hyra-bil-gotland", title: "Hyra bil Gotland – guide till biluthyrning i Visby 2026", excerpt: "Bil är det bästa sättet att uppleva Gotland utanför Visby. Guide till biluthyrning på Gotland, priser 2026 och var du hämtar bilen.", category: "Praktisk", emoji: "🚗", readTime: "5 min", fullContent: true, faqs: [{ q: 'Var hyr man bil på Gotland?', a: 'Hertz, Europcar och lokala bolag finns vid Visby hamn och flygplats. Pris: ca 500–1 200 kr/dag i sommar. Boka månader i förväg – juli är ofta fullt bokat.' }, { q: 'Behöver man hyra bil på Gotland?', a: 'Beror på. Visby centrum är lätt att gå. Men norra Gotland (Fårö, Slite, raukar) och södra (Hoburgen, Burgsvik) kräver bil eller cykel. Elcyklar är populärt alternativ.' }] },
  // Blekinge
  { slug: "blekinge-skargard-guide", title: "Blekinges skärgård – guide till Aspö, Sturkö och Karlskronas öar", excerpt: "Blekinges skärgård är en av Sveriges minst kända och vackraste. Guide till öarna runt Karlskrona, hur du tar dig dit och vad du hittar.", category: "Region", emoji: "⚓", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Aspö och Sturkö utanför Karlskrona?', a: 'Lokala passagerarfärjor från Karlskrona hamn (Fisktorget). Aspö: ca 40 min. Sturkö: ca 25 min. Trafiken körs av Blekinges länstrafik – biljett ingår i Jojo-kortet.' }, { q: 'Vad finns att göra i Blekinges skärgård?', a: 'Karlskrona världsarvshamn (UNESCO), fiske och bad på Aspö och Tjurkö, kajakleder längs kusten och genuina fiskebyar utan turister. En av Sveriges mest underskattade skärgårdar.' }] },
  // Stockholm nya öar
  { slug: "nacka-skargard-guide", title: "Nacka skärgård – naturreservat och paddling nära Stockholm", excerpt: "Nacka skärgård är Stockholms närmaste vildmark. Naturreservat, kajak, vandring och bad bara 20 minuter från city. Guide till Nacka.", category: "Region", emoji: "🌿", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Nacka skärgård från Stockholm?', a: 'Buss från Slussen eller Sickla direkt till Nacka (10–20 min). Eller med Saltsjöbanan till Igelboda + 20 min promenad. Kajak direkt från Nacka Strand.' }, { q: 'Vad finns att göra i Nacka skärgård?', a: 'Vandring i Nacka naturreservat (400 ha), kajak längs Baggensfjärden, bad vid Järlasjön och Erstaviksbadet, och MTB-leder. Allt nära Stockholm utan att behöva ta färja.' }] },
  { slug: "svartloga-guide", title: "Svartlöga – ytterskärgårdens isolerade pärla", excerpt: "Svartlöga är en av Stockholms skärgårds mest avlägsna öar – bilfri, krogfri och genuint vild. Guide till transport och vad du hittar där.", category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Svartlöga?', a: 'Waxholmsbolaget från Strömkajen eller Vaxholm – ca 3 timmar beroende på avgång. Kolla tidtabellen noga – avgångarna är färre än till inneröarna. Inga bilar tillåts.' }, { q: 'Vad finns på Svartlöga?', a: 'Svartlöga är genuint vild: ingen restaurang, ingen affär. Du behöver ta med allt. Naturhamnarna, kobbar och genuint ytterskärgårdsliv lockar friluftsmänniskor och seglare.' }] },
  { slug: "ljustero-guide", title: "Ljusterö – stora skogen och havet i norra skärgården", excerpt: "Ljusterö är en stor ö med bilfärja, vandringsleder och en unik mix av skärgård och fastlandskaraktär. Guide till Ljusterö i Stockholms skärgård.", category: "Region", emoji: "🌲", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Ljusterö?', a: 'Bilfärja från Östanå (Trafikverket, gratis) – ca 5 min överfart. Med SL buss 676 från Täby/Vallentuna kan du nå Ljusterö utan bil. Ön är stor (15 km lång) och har vägar.' }, { q: 'Vad kan man göra på Ljusterö?', a: 'Vandring i Ljusterö naturreservat, bad vid Svansundets badplatser, fiske och cykling längs övägar. Flera stugor och camping finns. Lugnt och genuint – utan sommarens turisttryck.' }] },
  { slug: "runmaro-guide", title: "Runmarö – lugn och genuint skärgårdsliv i Stockholms ytterskärgård", excerpt: "Runmarö är en av Stockholms skärgårds bäst bevarade hemligheter. Inga turister, genuint liv och vacker natur. Guide till Runmarö.", category: "Region", emoji: "⛵", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Runmarö?', a: 'Waxholmsbolaget via Stavsnäs – ta buss 834 från Slussen till Stavsnäs, sedan Waxholmsbåten. Restid totalt ca 1,5–2 timmar. Inga bilar tillåts på ön.' }, { q: 'Vad är Runmarö känt för?', a: 'En av skärgårdens tystare och mer genuina öar med gott om naturhamnvikar, vandringsstigar och sommarboende utan krögare eller turistshoppar. Perfekt för seglare och friluftsmänniskor.' }] },
  { slug: "blido-guide", title: "Blidö – norra skärgårdens gröna ö med bilfärja", excerpt: "Blidö nås med bilfärja och erbjuder en avkopplande mix av skog, bad och genuint skärgårdsliv. Guide till Blidö i norra Stockholms skärgård.", category: "Region", emoji: "🌿", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Blidö?', a: 'Bilfärja från Simpnäs (Trafikverket, gratis) – ca 5 min överfart. Ta E18 norrut mot Norrtälje, sedan skyltning mot Simpnäs. Passar utmärkt med bil för camping eller stugvistelse.' }, { q: 'Vad kan man göra på Blidö?', a: 'Vandring i Blidöns naturreservat, bad vid Söderhamnsudde, fiske och cykling. August Strindberg bodde på Blidö – hans minne finns bevarat i liten utställning på ön.' }] },
  // Bohuslän nya öar
  { slug: "karingon-guide", title: "Käringön – Bohusläns mysigaste fiskeby", excerpt: "Käringön är en bilfri ö i Bohuslän med tätt packade hus och en av Västkustens bästa restauranger. Guide till transport, mat och upplevelserna.", category: "Region", emoji: "🏘", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Käringön?', a: 'Trafikverkets vägfärja från Tuvesvik (gratis, ca 5 min). Tuvesvik nås med bil via Orust. Inga bilar tillåts på Käringön – parkera vid färjeläget.' }, { q: 'Vad är Käringön känt för?', a: 'En av Bohusläns mest pittoreska fiskebyar med tätt packade röda och vita hus. Restaurang Käringöns Fisk är legendarisk för skaldjur. Bilfri ö med mycket charm.' }] },
  { slug: "gullholmen-guide", title: "Gullholmen – världens minsta stad och Bohusläns pittoreska pärla", excerpt: "Gullholmen har titeln världens minsta stad och ett av Bohusläns vackraste stadslandskap. Guide till transport och vad du hittar på ön.", category: "Region", emoji: "🐚", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Gullholmen?', a: 'Trafikverkets vägfärja från Ellös på Orust (gratis). Ellös nås med bil via Orust. Gullholmen är bilfri – parkera vid Ellös färjeläge och ta ca 10 min överfart.' }, { q: 'Varför kallas Gullholmen "världens minsta stad"?', a: 'Gullholmen fick stadsrättigheter 1585 och täta bebyggelse på en liten ö. Stadstiteln är inofficiell men ett populärt påstående. Idag ca 150 bofasta invånare och unik husbebyggelse.' }] },
  // Tematiska
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "skargard-pa-budget", title: "Skärgård på budget – semester vid havet för under 500 kr/dag", excerpt: "Skärgård behöver inte kosta skjortan. Guide till hur du upplever det bästa av svensk kust och skärgård utan att tömma plånboken.", category: "Praktisk", emoji: "💰", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur gör man en billig skärgårdsresa?', a: 'Åk med SL-biljett till yttre hållplatser (Stavsnäs, Muskö) och Waxholmsbåt. Packa mat hemifrån, tälta med allemansrätt, och välj inre skärgårdens gratis stränder.' }, { q: 'Vad kostar en dag i skärgården utan att bo där?', a: 'Dagstur med Waxholmsbåt: 200–350 kr tur/retur. Medta matsäck. Totalt budget: 200–500 kr/dag beroende på var du åker. Undvik turistrestaurangerna på populäraste öarna.' }] },
  { slug: "camping-kust-sverige", title: "Campingplatser vid havet Sverige – bästa kust-campingen 2026", excerpt: "Sveriges kuststräcka har landets bästa campingplatser. Guide till de finaste campingplatserna vid havet från Bohuslän till Blekinge.", category: "Praktisk", emoji: "⛺", readTime: "9 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa campingplatserna vid havet i Sverige?', a: 'Böda Sand (Öland), Smögen Camping (Bohuslän), Tylösands Havsbad (Halland) och Hammenhögs Camping (Skåne) är topprankade. SCR-godkänd lista finns på camping.se.' }, { q: 'Kostar det mer att campa vid havet?', a: 'Ja, generellt – havsnära platser kostar 300–600 kr/natt för tält + el. Men allemansrätten tillåter fri camping om du är 2+ nätter från bebodd fastighet.' }] },
  { slug: "vattensport-guide", title: "Vattensport i skärgården – SUP, windsurfing, wakeboard och mer", excerpt: "Stockholms skärgård och Bohuslän erbjuder fler vattensporter än de flesta anar. Guide till SUP, windsurfing, kitesurfing och wakeboard.", category: "Aktivitet", emoji: "🏄", readTime: "7 min", fullContent: true, faqs: [{ q: 'Var kan man kitesurfa och windsurfa i Sverige?', a: 'Bäst för kite: Falsterbo (Skåne), Tjörn och Orust (Bohuslän). SUP fungerar i de flesta skyddade vikar. Stockholm: Mälarens utlopp och Tranebergsbadet är SUP-favoriter.' }, { q: 'Behövs licens för vattensport i skärgården?', a: 'Nej – SUP, windsurfing och wakeboard kräver ingen licens. Men du måste följa sjötrafiklagen och hålla avstånd till friluftsbadare. Kite kan kräva utbildning för säker utövning.' }] },
  { slug: "skargard-solo", title: "Skärgården som ensamresenär – tips för soloäventyret", excerpt: "Skärgård solo är en av de bästa upplevelserna du kan ge dig själv. Guide till öar, säkerhet, community och hur du planerar solotur i skärgården.", category: "Praktisk", emoji: "🧭", readTime: "7 min", fullContent: true, faqs: [{ q: 'Är det säkert att åka till skärgården ensam?', a: 'Ja, med rätt förberedelse. Ta med VHF-radio eller satellitkommunikation i yttre skärgård. Berätta för någon var du är. Välj vältrafikerade öar som nybörjare.' }, { q: 'Vilka öar i Stockholm passar solotur?', a: 'Innerskärgård: Möja, Runmarö, Ingmarsö – lugna och genuina. Yttre: Svartlöga och Arholma för det äkta äventyret. STF-stugor på Finnhamn ger möjlighet att träffa folk.' }] },
  { slug: "skargard-seniorer", title: "Skärgård för seniorer – tillgängliga öar och lugna upplevelser", excerpt: "Skärgårdsupplevelsen är inte förbehållen unga. Guide till de mest tillgängliga öarna, båtturer och upplevelserna för seniorer i skärgården.", category: "Praktisk", emoji: "🧓", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka öar i Stockholms skärgård är tillgängliga för seniorer?', a: 'Vaxholm (tillgängligt centrum, rullstolsramp på bryggorna), Grinda (planare terräng), och Sandhamn har relativt tillgängliga hamnar. Waxholmsbolaget har handikappstöd på båtarna.' }, { q: 'Finns det lugna skärgårdsupplevelser utan långa promenader?', a: 'Ja – Waxholmsbolagets tur-returbåt ger skärgårdsupplevelse utan att gå i land. Kryssningar, restaurantbesök i hamn och havsutsikt från hotellet är bra alternativ.' }] },
  { slug: "nationalparkerna-havet", title: "Nationalparker vid havet Sverige – guide till havets skyddade områden", excerpt: "Sverige har flera nationalparker längs havet. Kosterhavet, Ängsö, Haparanda skärgård och fler. Guide till landets vackraste marina nationalparker.", category: "Aktivitet", emoji: "🌊", readTime: "8 min", fullContent: true, faqs: [{ q: 'Vilka nationalparker finns vid havet i Sverige?', a: 'Kosterhavet (Bohuslän, enda marina nationalparken), Ängsö (Stockholms skärgård), Haparanda skärgård (norr), Skuleskogen (Höga Kusten) och Blå Jungfrun (Kalmarsund).' }, { q: 'Vad är speciellt med Kosterhavets nationalpark?', a: 'Sveriges enda marina nationalpark och en av Europas artrikaste havsmiljöer. Snorkling och dykning bland koraller och ovanliga djuphavsarter. Nås via Strömstad.' }] },
  { slug: "skargard-tillganglighet", title: "Skärgård för rörelsehindrade – tillgängliga öar och anpassade turer", excerpt: "Skärgårdsupplevelsen ska vara tillgänglig för alla. Guide till öar med tillgängliga bryggor, stigar och aktiviteter för dig med rörelsenedsättning.", category: "Praktisk", emoji: "♿", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka öar i Stockholm är tillgängliga för rörelsehindrade?', a: 'Vaxholm har tillgänglighetsanpassad hamn och centrum. Waxholmsbolaget har rullstolsramper på de flesta större båtarna. Kontakta dem i förväg för assistans vid ombordstigning.' }, { q: 'Finns det guidade skärgårdsturer för personer med funktionsnedsättning?', a: 'Ja – Tillgänglighetsresor och Handikapp & Fritid i Stockholm erbjuder anpassade skärgårdsturer. Kolla med respektive Waxholmsbolagets kundservice för assistansmöjligheter.' }] },
  { slug: "batsaerhet-guide", title: "Båtsäkerhet för nybörjare – VHF, sjökort och säker tur", excerpt: "Att ge sig ut på havet kräver grundläggande säkerhetskunskap. Guide till flytvästar, VHF-radio, sjökort och vad du måste kunna innan du lämnar hamnen.", category: "Praktisk", emoji: "⛑️", readTime: "8 min", fullContent: true, faqs: [{ q: 'Vad behöver man ha med sig för säker båttur?', a: 'Flytväst till alla ombord, VHF-radio (kanal 16), sjökort för området, ankare och fendrar, nödraketer, och mobiltelefon med laddning. Berätta för land om din planering.' }, { q: 'Måste man ha sjökortsexamen för att köra båt i Sverige?', a: 'Inget lagkrav för fritidsbåtar. Men att förstå pricksystemet, sjötrafikregler och meteorologi är viktigt för säkerheten. Fritidsskepparexamen rekommenderas för öppet hav.' }] },
  { slug: "fiske-host", title: "Fiske på hösten – abborre, havsöring och gädda vid kusten", excerpt: "Hösten är fiskarens bästa säsong vid havet. Guide till höstfiske längs kusten och i skärgården – arter, platser, redskap och regler.", category: "Aktivitet", emoji: "🎣", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilken fisk kan man fånga på hösten i skärgården?', a: 'Havsöring (sept–nov), abborre och gädda i innerskärgårdens grunda vikar, och torsk längs Bohusläns kust. Havsöringen vandrar upp längs kusten på hösten – fiske vid bäckmynningar.' }, { q: 'Behövs fiskelicens för havsfiske i Sverige?', a: 'Nej – saltvattensfiske är fritt i Sverige (utom i vissa reservat). Sötvatten och lax/öring i specifika områden kräver fiskekort. Kolla Havs- och vattenmyndigheten för aktuella regler.' }] },
  { slug: "vandring-host-skargard", title: "Vandring på hösten i skärgården – leder utan folkmassor", excerpt: "Höstvandring i skärgården ger naturen i en annan dager. Guide till de bästa höstvandringslederna längs kusten och ute på öarna.", category: "Aktivitet", emoji: "🥾", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka vandringsleder i skärgården passar hösten bäst?', a: 'Höga Kustenleden (september–oktober ger fantastiska lövfärger), Ölands Kustled, och Stockholms skärgårds öar som Möja och Sandön. Ingen är där – du har naturen för dig själv.' }, { q: 'Vad ska man tänka på vid höstvandring i skärgården?', a: 'Ta med regnkläder och lager – höstvädret är omväxlande. Kolla båttidtabellen noga (reducerat schema). Mörkret kommer tidigt i oktober – ha pannlampa.' }] },
  // Jämförelse
  { slug: "skargard-vs-fjall", title: "Skärgård vs fjäll – vilken sommarsemester vinner?", excerpt: "Två av Sveriges stoltaste semesteralternativ ställs mot varandra. En ärlig jämförelse av skärgård och fjäll för sommar, pris, aktiviteter och stämning.", category: "Praktisk", emoji: "⚖", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vad är skillnaden på skärgård och fjäll som semester?', a: 'Skärgård: badmöjligheter, båt och ö-hopping. Fjäll: vandring, dramatisk natur och svalt klimat. Skärgård passar bäst i juli–aug, fjäll i juni–sept.' }, { q: 'Vilket är billigast – skärgård eller fjäll?', a: 'Ungefär likvärdig kostnad om du campar. Bostad i Stockholms skärgård är dyrare (hög efterfrågan) medan fjällstugor varierar. Transporter är dyrare till fjällen.' }] },
  { slug: "bohuslan-vs-hoga-kusten", title: "Bohuslän vs Höga Kusten – vilken kust är bäst?", excerpt: "Västkustens klippor mot Höga Kustens dramatiska topografi. En jämförelse av Sveriges två vildaste kustlinjer.", category: "Region", emoji: "⚖", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad skiljer Bohuslän och Höga Kusten?', a: 'Bohuslän: fler öar, skaldjursmat, varmare Västerhavet. Höga Kusten: dramatiska höjder (Sverige högst kust), Skuleskogen och ett mycket lugnare turisttryck.' }, { q: 'Vilken kust passar bättre för barnfamilj?', a: 'Bohuslän har fler sandstränder och enkla transporter. Höga Kusten passar familjer som vill vandra och uppleva natur, men är mer avlägset och kräver bil.' }] },
  { slug: "gotland-vs-bornholm", title: "Gotland vs Bornholm – bästa östersjöön för sommaren?", excerpt: "Gotland och Bornholm är Östersjöns två stora semesteröar. En jämförelse av natur, mat, transport och vad du faktiskt får ut av varje ö.", category: "Region", emoji: "🗺", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vad är skillnaden på Gotland och Bornholm?', a: 'Gotland är större (3 140 km²) med medeltida Visby och raukar. Bornholm är danskt, mer nordeuropeiskt med sandstränder och rökeri-traditioner. Båda har sol och kalkstenslandskap.' }, { q: 'Hur reser man till Bornholm från Sverige?', a: 'Färja från Ystad (2 h) till Rønne. BornholmerFærgen kör dagsturer och övernattningsfärjor. Alternativt flyg från Kastrup. Bornholm kan kombineras med Gotland för en östersjörundtur.' }] },
  // ── Batch K ────────────────────────────────────────────────────────────────
  { slug: "varmdo-guide", title: "Värmdö – guide till Stockholms närmaste skärgårdsö", excerpt: "Värmdö är Stockholms närmaste riktiga skärgårdsupplevelse. Öar, badvikar, vandringsleder och restauranger – allt nåbart på under en timme från city.", category: "Region", emoji: "🏝", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Värmdö från Stockholm?', a: 'Med buss 428 eller 429 från Slussen (ca 30–45 min). Med bil: ta Värmdöleden (väg 222) österut från Stockholm – ca 30 min till Gustavsberg. Värmdö är fastlandsört via bro.' }, { q: 'Vad kan man göra på Värmdö?', a: 'Naturreservaten Långviksskär och Nämdö, badvikar runt Gustavsberg, vandring i Raksta naturreservat och restauranger längs kusten. Nås lätt för en dagstur från Stockholm.' }] },
  { slug: "vinterbastu-isbastu", title: "Vinterbastu och isbastu – guide till Sveriges bästa anläggningar", excerpt: "Kombinationen av varm bastu och ett dopp i iskallt hav är en av Sveriges starkaste vintruupplevelser. Här är de bästa anläggningarna längs kusten.", category: "Aktivitet", emoji: "🧖", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var finns de bästa vinterbastuerna vid havet?', a: 'Marstrand (Bohuslän), Fjällbete Saltsjöbaden (Stockholm), Salt & Sill på Tjörn och Smögen Hafvsbad har populära havsbastuer. Boka i förväg – december–februari är fullpackat.' }, { q: 'Är det säkert att bada i havet på vintern?', a: 'Ja, med rätt förberedelse. Kliv aldrig ner ensam och ha alltid tillgång till varm bastu eller varma kläder direkt efteråt. Börja med 1–2 minuter. Kryp inte under is.' }] },
  { slug: "fagelskadning-skargarden", title: "Fågelskådning i skärgården – bästa platser och arter", excerpt: "Stockholms skärgård är ett av Europas rikaste fågellandskap. Ejdrar, havsörnar, tärnor och groddar. En guide för nybörjare och erfarna fågelskådare.", category: "Aktivitet", emoji: "🦅", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka fåglar kan man se i Stockholms skärgård?', a: 'Havsörn (vanlig i yttre skärgård), ejder, gravand, smålom och tärnor. Höst och vår: mängder med vadare och dykänder. Öarna Landsort och Arholma är känt som topplatser.' }, { q: 'Vilken tid på året är bäst för fågelskådning i skärgården?', a: 'Vår (april–maj) för häckningsfåglar och sångare. Höst (aug–okt) för sträckfåglar. Vintern ger isfåglar som havsörn och alfågel. Sommaren är minst spännande.' }] },
  { slug: "snorkling-stockholm", title: "Snorkling i Stockholms skärgård – var och hur", excerpt: "Stockholms skärgård bjuder på förvånansvärt klart vatten och rikt marint liv. De bästa platserna för snorkling och vad du kan förvänta dig att se.", category: "Aktivitet", emoji: "🤿", readTime: "6 min", fullContent: true, faqs: [{ q: 'Är det klart vatten för snorkling i Stockholms skärgård?', a: 'Sikt: 3–8 meter i yttre skärgården (bättre än inre). Bäst sikt i aug–sept när algblomning lagt sig. Inre skärgård (Mälaren-påverkan) har sämre sikt.' }, { q: 'Vad kan man se när man snorklar i Stockholms skärgård?', a: 'Abborre, mört, gädda och gös i grunda vikar. I yttre skärgård: torsk, sjöborrar, blåmusslor och bläckfisk (blåbläckfisk). Sjöstjärnor och krabba är vanliga.' }] },
  { slug: "vinter-oland-2026", title: "Öland på vintern 2026 – stillhet och alvar i vinterskrud", excerpt: "Öland på vintern är en helt annan ö. Alvaret ger ett ödsligt och vackert landskap, priserna halveras och du har hela ön för dig själv.", category: "Säsong", emoji: "❄", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad kan man göra på Öland på vintern?', a: 'Vandring på det öde alvaret, fågelskådning (alfågel och havsörn), besök i Borgholms slottsruin och avkoppling i hustet. Tack vare minskad turism är priserna halva sommarpriserna.' }, { q: 'Är Öland öppet på vintern?', a: 'Ja – Ölandsbron är öppen hela året. Borgholms slott, Sollidens slott och Ekoparken är stängda, men naturen, Alvaret och kusten är alltid tillgängliga.' }] },
  { slug: "skridskor-havet", title: "Skridskor på havet – var och när i Sverige", excerpt: "När Östersjöns inner-vikar fryser till is öppnas ett unikt vinteräventyr. De bästa platserna för havsskridskor och hur du gör det säkert.", category: "Aktivitet", emoji: "⛸", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var kan man åka skridskor på havsis i Sverige?', a: 'Stockholms skärgård (Baggensfjärden, Dalarö), Ölands västra kust, Gotland och Bottenviken (Luleå-området). Förutsätter minst -10°C under minst 2 veckor.' }, { q: 'Hur tjockt is behövs för säker havsskridskor?', a: 'Minst 8–10 cm för en person. Kolla alltid isens tjocklek var 50:e meter med spettstång. Åk aldrig ensam. Svenska Skridskoförbundet publicerar is-rapporter.' }] },
  { slug: "julmarknad-havet", title: "Julmarknader vid havet – kust och skärgård", excerpt: "Sveriges kustnära julmarknader ger en unik stämning – saltig luft, lyktor och lokal mat. De bästa julmarknaderna längs Bohusläns och Stockholms kust.", category: "Säsong", emoji: "🎄", readTime: "5 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa julmarknaderna vid kusten i Sverige?', a: 'Marstrands julmarknad (november), Lysekils julmarknad, Smögen Jul, och Sandhamns julmarknad i Stockholms skärgård är välkända. Lysekil och Smögen har julmarknad med skaldjur i fokus.' }, { q: 'När är julmarknaderna längs kusten?', a: 'Vanligtvis helger i november och december. Kolla respektive orts kalender – de varierar. Marstrand julmarknad brukar vara andra helgen i november.' }] },
  { slug: "fjallalternativet-kust", title: "Skippa skidorna – kust istället för fjäll i vinter", excerpt: "Inte alla gillar skidliftar och pistjackor. Här är vad Sveriges kust erbjuder som vinteralternativ till fjällen – och varför det kan vara ett bättre val.", category: "Praktisk", emoji: "🌊", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad gör kusten till ett bra vinteralternativ till fjällen?', a: 'Havsluft, vinterbastur, ostron (säsong okt–feb i Bohuslän), vintervandring och ett mycket lägre pris än fjällresorten. Bohuslän på vintern är storslaget och nästan tomt på turister.' }, { q: 'Vilken kust passar bäst som vinteralternativ?', a: 'Bohuslän: ostron, vinterbastur och klippor. Gotland: medeltidsatmosfär utan folkliv. Öland: alvarlandskapet i snö. Alla tre är dramatiskt annorlunda från sommarens turistrusch.' }] },
  { slug: "ekologisk-semester-skargard", title: "Hållbar semester i skärgården – eko-tips och råd", excerpt: "Skärgårdsresan kan göras med minimalt klimatavtryck. Kollektivt, tält, lokala producenter och naturskydd – en guide till hållbart skärgårdsresande.", category: "Praktisk", emoji: "🌿", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur gör man en hållbar skärgårdsresa?', a: 'Åk kollektivt (Waxholmsbolaget, SL-buss till kust), tälta med allemansrätt, handla lokalt hos öfiskare och gårdsbutiker, undvik engångsplast och följ båt- och bryggregler.' }, { q: 'Vilka delar av skärgårdslivet belastar miljön mest?', a: 'Motorbåt med bensin är störst. Elskoter och elmotor minskar påverkan. Undvik naturreservat under häckningssäsong (april–juli). Sätt inte upp tält i fågelskyddsområden.' }] },
  { slug: "skargard-med-husbil", title: "Skärgård med husbil – campingplatser och tips längs kusten", excerpt: "Husbil och kust är en perfekt kombination. De bästa kustnära campingplatserna för husbilar längs Bohuslän, Öland och Gotland.", category: "Praktisk", emoji: "🚐", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka campingplatser längs kusten tar emot husbilar?', a: 'Smögen, Grebbestad och Fjällbacka i Bohuslän; Böda Sand och Kapelludden på Öland; samt ett 30-tal platser på Gotland. SCR-anslutna campingar listas på camping.se med filtrering.' }, { q: 'Kan man stå med husbil utan att betala på kusten?', a: 'Ja, på vissa parkeringsplatser nära havet – kolla kommunens regler. Längre stoppningar kräver vanligen camping. Wexflow-appen listar godkända husbilar-parkeringar.' }] },
  { slug: "hundstrand-sverige", title: "Hundvänliga stränder i Sverige – kust och skärgård", excerpt: "Stränder där hunden får följa med. En guide till hundvänliga badplatser och stränder längs Bohusläns, Ölands och Stockholms kust.", category: "Praktisk", emoji: "🐕", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var är det hundvänliga stränder i Sverige?', a: 'Bohusläns kobbar och klippstränder tillåter ofta hund (kolla lokala regler). Ölands norra kust utanför badplatser. Stockholms skärgård: inlandsstränder och kobbarna runt Möja.' }, { q: 'Är hundar förbjudna på svenska stränder sommartid?', a: 'Många kommuner och badplatser har hundstopp juni–aug. Kolla alltid lokala skyltar. Naturreservat med häckande fåglar = hundförbud. Stranden utanför märkt område är ofta ok.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "hyra-husbil-gotland", title: "Hyra husbil på Gotland – guide och operatörer", excerpt: "Husbil är ett av de bästa sätten att uppleva Gotland. Inga hotellbokningar, frihet att stanna var du vill och ön i din takt.", category: "Transport", emoji: "🚐", readTime: "5 min", fullContent: true, faqs: [{ q: 'Var hyr man husbil på Gotland?', a: 'Gotland Husbilsuthyrning och Semesterbil Visby erbjuder uthyrning. Boka i god tid – juli är slutsålt i mars. Pris: ca 1 500–3 500 kr/dag beroende på storlek.' }, { q: 'Kan man ta med husbil på färjan till Gotland?', a: 'Ja – Destination Gotland tar fordon. Boka biljett i förväg (bilvagnsbiljett). Observera att husbilspriset är betydligt högre än personbil. Alternativt: hyr husbil på Gotland direkt.' }] },
  { slug: "aspo-sturko-guide", title: "Aspö och Sturkö – Blekinges vackraste öar", excerpt: "Aspö och Sturkö utanför Karlskrona är Blekinges skärgårds pärlor. Sandstränder, fågelrika stränder och en avslappnad öatmosfär utan trängsel.", category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Aspö och Sturkö?', a: 'Lokala passagerarfärjor från Karlskrona hamn. Aspö: ca 40 min. Sturkö: ca 25 min. Trafiken körs av Blekinges länstrafik. Bilar kan köras till Sturkö via väg – kolla aktuell broöppning.' }, { q: 'Vad ska man göra på Aspö och Sturkö?', a: 'Sandstranden Järnavik (Aspö), cykla runt Sturkö, fiske och kayak i den tystaste av skärgårdar. Bada i klarare vatten än Stockholm. Nästan inga turister – autentisk skärgård.' }] },
  { slug: "trysunda-guide", title: "Trysunda – Höga Kustens pärla", excerpt: "Trysunda är en av Höga Kustens mest kända öar med ett av Sveriges bäst bevarade fiskelägen. En guide till ön och hur du tar dig dit.", category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Trysunda?', a: 'Reguljär färja från Barsta eller Docksta sommartid. Privatbåt är vanligt. Ön är bilfri – allt transporteras till hands eller med kärra. Kontrollera Höga Kustens båttidtabell.' }, { q: 'Vad är Trysunda känt för?', a: 'Det unika fiskeläget med röda och gula stugor från 1700–1800-talet, den lilla kapellet och den vilda naturen. En av Höga Kustens mest fotograferade platser.' }] },
  { slug: "skafto-guide", title: "Skaftö – guide till Fiskebäckskil och Grundsund", excerpt: "Skaftö är en stor Bohuslänsö med dramatisk klippkust, charmiga fiskbyar och ett lugn som sommarstämpeln inte förstör.", category: "Region", emoji: "🏝", readTime: "7 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Skaftö?', a: 'Bilfärja från Fiskebäckskil-sidan via Lysekil eller bron från Orust via väg 162. Med Västtrafik buss från Göteborg via Uddevalla. Skaftö är broförbunden sedan 1997.' }, { q: 'Vad är Skaftö känt för?', a: 'Fiskebäckskilbyns charmiga husgator (Kristineberg marina laboratorium), Grundsunds fiskehamn och klippvandringar längs öns västra kust. Kristineberg Zoo är ett plus med barn.' }] },
  { slug: "holmon-guide", title: "Holmön – guide till Umeås skärgård", excerpt: "Holmön är Bottenhavets bilfria ö utanför Umeå. Norr om den vanliga semesterkartan, men med en natur och stämning som är unik i Sverige.", category: "Region", emoji: "🏝", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Holmön?', a: 'Reguljär passagerarfärja från Norrfjärden (Umeå-sidan) – ca 40 min. Sommartid fler avgångar. Ön är bilfri – ta cykeln med om du kan. Kontrollera UL (Umeå länstrafik) tidtabell.' }, { q: 'Vad gör Holmön unik?', a: 'En av de nordligaste bofasta öarna i Bottenviken, islagd varje vinter (ofta skridskobara). Ljus midnattssol, fågellivet och den genuina fiskartraditionen gör ön unik i Sverige.' }] },
  { slug: "klattring-bohuslan", title: "Klättring och bouldering i Bohuslän – för klättrare", excerpt: "Bohusläns klippor är ett av Skandinaviens främsta klätterområden. Guide till de bästa klätterlokaler och hur du tar sig dit.", category: "Aktivitet", emoji: "🧗", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var är de bästa klätterklipporna i Bohuslän?', a: 'Hunnebo, Brannevik och Hakenäset är topplatser. Gothenburg Boulderers och Klätterförbundets guide listar 50+ lokaler längs kusten. Kustklipporna är granit – perfekt friktion.' }, { q: 'Behöver man utrustning för att klättra i Bohuslän?', a: 'Bouldering kräver bara klipper och krita. Rep-klättring kräver komplett utrustning. Uthyrning finns i Göteborg (Klätterhallen). Guidade klätterturer finns via lokala klätterklubbar.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "strandridning-kust", title: "Strandridning längs kusten – ridrutter och stall", excerpt: "Ridning längs havet är en av de vackraste upplevelserna till sjöss. De bästa strandridningsrutterna och stallen längs svenska kusten.", category: "Aktivitet", emoji: "🐴", readTime: "6 min", fullContent: true, faqs: [{ q: 'Var kan man rida på stranden i Sverige?', a: 'Skånes stränder (Falsterbo, Skanör), Gotlands östkust och Ölands kust är vanliga rutter. Stall längs Bohusläns kust erbjuder klipputritter. Kolla strandridningsregler – varierar per kommun.' }, { q: 'Kostar det att rida på stranden?', a: 'Guidat utritt: 500–1 200 kr/person beroende på längd. Stall erbjuder paket om 2 timmar längs kust. Boka 1–2 veckor i förväg sommartid.' }] },
  { slug: "vegansk-mat-skargarden", title: "Vegansk mat i skärgården – restauranger och tips", excerpt: "Det veganska utbudet i skärgården har förbättrats markant. Guide till vegetariska och veganska alternativ på öarna och längs kusten.", category: "Mat", emoji: "🌱", readTime: "5 min", fullContent: true, faqs: [{ q: 'Finns vegansk mat på skärgårdsöarna?', a: 'Det veganska utbudet är begränsat men förbättras. Sandhamn, Grinda och Utö har restauranger med veganalternativ. Ta gärna med egna råvaror och laga vid campingkök.' }, { q: 'Vilka skärgårdsrestauranger har bra veganskt?', a: 'Utö Värdshus och Grinda Wärdshus har veganska alternativ på menyn. Längs Bohusläns kust: Smögens restauranger och Lysekil har blivit bättre. Kolla menyer online innan du åker.' }] },
  { slug: "restauranger-havsvy-stockholm", title: "Restauranger med havsvy i Stockholm – bästa 2026", excerpt: "De bästa restaurangerna med utsikt över Stockholms vattendrag och skärgård. Från enkla kaféer på bryggor till finrestauranger med panoramafönster.", category: "Mat", emoji: "🍽", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka är de bästa restaurangerna med havsvy i Stockholm?', a: 'Fjäderholmarnas Krog, Waxholms Hotell, Sjöpaviljongen (Ulriksdal) och Gondolen (panorama) är klassiker. Ute i skärgården: Sandhamns Värdshus och Grinda Wärdshus.' }, { q: 'Behöver man boka bord i förväg på skärgårdsrestauranger?', a: 'Absolut för juli–aug och helger. Populäraste platserna som Fjäderholmarna är fullbokade veckor i förväg. Sena middagssittningar är ofta lättare att få bord på.' }] },
  { slug: "vandring-var-kust", title: "Vandring vår – skärgård och kust i maj och juni", excerpt: "Vår är den bästa vandringssäsongen längs kusten. Inga folkmassor, fågellivet på topp och naturen i sin vackraste form. De bästa lederna i maj och juni.", category: "Aktivitet", emoji: "🥾", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilka vandringsleder längs kusten passar bäst på våren?', a: 'Höga Kustenleden (maj–juni: björkar slår ut), Bohusleden längs Västerhavet, och Ölands Kustled. Stockholms skärgårdsöar ger fågellivet i full blom utan sommarens turist-kaos.' }, { q: 'Vad ska man tänka på vid vårtigandring i skärgården?', a: 'Vätskebehov: vårberget är torrt. Frostnätter i maj på höga lägen. Hund-regler i naturreservat under häckningssäsong (1 apr–31 jul i många reservat). Ta med myggmedel i juni.' }] },
  // ── Batch L: SEO-gap-guider – aug–okt säsong ─────────────────────────────
  { slug: "host-stockholms-skargard-2026", title: "Höst i Stockholms skärgård 2026 – de bästa öarna i september och oktober", excerpt: "Hösten är skärgårdens bästa säsong. Lövfärger, lugnare öar, billigare boende och ingen köer. Guide till vad du gör och vart du åker i september–oktober 2026.", category: "Säsong", emoji: "🍂", readTime: "10 min", fullContent: true, featured: true, faqs: [{ q: 'Vilka öar i Stockholms skärgård passar bäst på hösten?', a: 'Sandhamn, Utö, Möja och Vaxholm är utmärkta val. På hösten är de folktomt jämfört med juli – du kan nästan ha ön för dig själv. Waxholmsbolaget kör reducerat schema men fortfarande bra tider.' }, { q: 'Vad kan man göra i Stockholms skärgård på hösten?', a: 'Vandring, svampplockning, bärplockning, höstfiske (havsöring), havsbastu och avkoppling. Höstfärgerna i mitten av oktober är bland de vackraste i Sverige.' }, { q: 'Är båtarna igång till skärgården i september och oktober?', a: 'Ja – Waxholmsbolaget kör hela hösten, om än med färre avgångar än sommaren. Kolla tidtabellen på waxholmsbolaget.se innan du åker. De flesta populära öar nås fortfarande dagligen.' }] },
  // UPPSKATTNING: ungefärliga prisnivåer över flera aktörer, ej hämtat per aktör (2026-08)
  { slug: "hummerpremiar-bohuslan-2026", title: "Hummerpremiär 2026 Bohuslän – datum, regler och hur du firar", excerpt: "Hummerpremiären 2026 är lördag 26 september. Var du fiskar, vad som gäller och de bästa restaurangerna längs Bohusläns kust.", category: "Säsong", emoji: "🦞", readTime: "8 min", fullContent: true, featured: true, faqs: [{ q: 'När är hummerpremiären 2026?', a: 'Hummerpremiären 2026 är lördag 26 september. Det är alltid sista lördagen i september. Fisket öppnar 07:00 och hummerburar får sättas ut från kvällen innan.' }, { q: 'Var fiskar man hummer i Bohuslän?', a: 'Bäst hummer fiskar du på djup av 5–40 meter längs klippiga bottnar i yttre Bohuslän – Kosterfjorden, trakterna kring Smögen, Gullholmen och Lysekil är kända. Hyr lokal fiskeguide för bästa resultat.' }, { q: 'Vad behövs för att fiska hummer i Sverige?', a: 'Du behöver fiskelicens för husbehovsfiske (köps på Havs- och vattenmyndighetens hemsida), max 3 hummerburar per person, och minimimåttet 87 mm karapaxlängd. Hona med rom måste alltid sättas tillbaka.' }] },
  { slug: "surstrommingspremiar-2026", title: "Surströmmingspremiär 2026 – datum och var du äter", excerpt: "Surströmmingspremiären 2026 är torsdag 20 augusti. Guide till traditionen, var du deltar i premiärfesten och de bästa ätplatserna längs Höga Kusten.", category: "Säsong", emoji: "🐟", readTime: "7 min", fullContent: true, faqs: [{ q: 'När är surströmmingspremiären 2026?', a: 'Surströmmingspremiären 2026 är torsdag 20 augusti. Det är alltid tredje torsdagen i augusti. Konserverna får inte säljas förrän detta datum – det är en officiell tradition sedan 1930-talet.' }, { q: 'Var firar man surströmmingspremiären bäst?', a: 'Höga Kusten kring Ulvön och Kramfors är hjärtat av surströmmingtradition. Ulvöns hotell arrangerar premiärfest. Längs Norrlandskusten hålls hemmafester i stora mängder.' }, { q: 'Hur äter man surströmming?', a: 'Traditionsenligt på tunnbröd med mandelpotatis, lök, gräddfil och gräslök. Öl eller snaps till. Öppna alltid burken utomhus – vätskan som stänker luktar intensivt. Det är en av världens starkast luktande maträtter.' }] },
  { slug: "michelin-havet-guide", title: "Finmat vid havet – Sveriges bästa kustrestauranger 2026", excerpt: "Råvaran är bäst direkt från havet. Guide till Sveriges finaste kustrestauranger och skaldjurskrogar från Bohuslän till Skåne – Michelin-belönade och lokala favoriter.", category: "Mat", emoji: "⭐", readTime: "9 min", fullContent: true, faqs: [{ q: 'Vilka topprestauranger finns vid havet i Sverige?', a: 'Bhoga i Göteborg (Michelin-belönad), Sjömagasinet i Göteborg (klassisk sjömat), Salt & Sill på Klädesholmen/Tjörn och Fjäderholmarnas Krog i Stockholms skärgård. Längs Bohusläns kust finns dessutom ett rikt utbud av skaldjurskrogar med exceptionellt färsk råvara.' }, { q: 'Vad gör kustnära finmat speciell?', a: 'Råvarorna – hummer, räkor, ostron, sjötunga och havskräftor – är extremt färska vid kusten. Skillnaden mot innerstadsrestauranger är 24 timmars kortare led. Många kockar bor vid havet av just det skälet.' }, { q: 'Hur bokar man bord på topprestaurangerna vid kusten?', a: 'Boka 2–4 veckor i förväg för sommar, 1 vecka räcker höst/vinter. Sjömagasinet, Bhoga och Salt & Sill tar bokningar online. Kontrollera respektive restaurangs hemsida för aktuella tider.' }] },
  { slug: "sandhamn-vaxholm-grinda-host", title: "Sandhamn, Vaxholm och Grinda på hösten – guide till tre klassiker", excerpt: "Stockholms tre mest omtyckta öar är ännu bättre på hösten. Färre folk, lövfärger och öppen service. Vad du gör och hur du tar dig dit i september–oktober.", category: "Säsong", emoji: "🍁", readTime: "9 min", fullContent: true, faqs: [{ q: 'Är Sandhamn, Vaxholm och Grinda öppna på hösten?', a: 'Ja – alla tre håller öppet hela hösten. Vaxholm fungerar som en stad hela året. Sandhamns Värdshus och Grinda Wärdshus har höstöppet med reducerade tider – kolla respektive hemsida.' }, { q: 'Vilken av öarna passar bäst för ett höstbesök?', a: 'Vaxholm är säkraste valet (alltid liv och öppet). Grinda passar dig som vill ha tyst och vacker natur. Sandhamn är lite mer livlig och seglarnas favorit även på hösten.' }, { q: 'Hur tar man sig dit på hösten?', a: 'Waxholmsbolaget kör till alla tre hela hösten. Vaxholm: pendelbåt 83/83X från Strömkajen, 55 min. Grinda: linje 11, ca 1h 45 min. Sandhamn: via Stavsnäs med buss + Waxholmsbåt, totalt ca 2h.' }] },
  { slug: "camping-host-skargard", title: "Camping på hösten i skärgården – guide för ett höstläger vid havet", excerpt: "Höstcamping i skärgården är en av Skandinaviens bästa naturupplevelser – utan sommarmygg, utan köer, utan folk. Vad du behöver och de bästa platserna.", category: "Aktivitet", emoji: "⛺", readTime: "8 min", fullContent: true, faqs: [{ q: 'Var kan man tälta i Stockholms skärgård på hösten?', a: 'Allemansrätten gäller – du får tälta 1–2 nätter på de flesta ställen. Populära höstplatser: kobbar runt Möja, Sandön naturreservat, och öarna i Norra skärgårdens reservat. Undvik naturreservat med restriktioner.' }, { q: 'Vad ska man ha med för höstcamping i skärgården?', a: '4-säsongstält eller sovpåse till -10°C, isolerande sovmatta, regnkläder, extra lager (temperaturer kan falla till 5–10°C natt i oktober), pannlampa och nödkommunikation om du åker ut till ytterskären.' }, { q: 'Är det kallt att campa i skärgården i september och oktober?', a: 'September är vanligtvis 10–15°C på dagen, 5–10°C på natten. Oktober: 5–10°C dag, ner mot 0°C natt. Med rätt utrustning är det fullt möjligt och extremt vackert.' }] },
  // ── Batch M: Höst/planering SEO-artiklar ─────────────────────────────────
  { slug: "havsbastu-guide", title: "Havsbastu – guide till ett av Nordens bästa bad", excerpt: "Havsbastu kombinerar extrem värme med ett dopp i salthav – en skandinavisk upplevelse utan motstycke. Guide till de bästa havsbastuerna i Sverige och hur du planerar ditt besök.", category: "Aktivitet", emoji: "🧖", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vad är havsbastu?', a: 'Havsbastu är en bastu placerad direkt vid havet med brygga för bad. Principen är enkel: svetta i bastun, sedan ett snabbt dopp i salthav. Kontrasten mellan extrem värme (80–100°C i bastun) och kallt hav ger en kraftig välbefinnandeeffekt och är en djupt rotad skandinavisk tradition.' }, { q: 'Var finns de bästa havsbastuerna i Sverige?', a: 'Utö Havsbastu (Stockholms skärgård), Arholma STF (norra skärgården), Smådalarö Gård SPA (södra Stockholms skärgård), och längs Bohusläns kust: Lysekil Havsbadet och Marstrand. På Gotland: Snäcks havsbastu. De flesta STF-anläggningar i skärgården erbjuder bastumöjligheter.' }, { q: 'Behöver man boka havsbastu i förväg?', a: 'Ja – populära bastuer som Utö Havsbastu och Smådalarö Gård tar bokningar och är ofta fullbokade helger september–november. Boka minst 1–2 veckor i förväg. Vardagar är lättare att boka och ger en lugnare upplevelse.' }] },
  { slug: "hostlov-vid-havet-2026", title: "Höstlov 2026 vid havet – guide för höstlovsveckan", excerpt: "Höstlovet 2026 är vecka 44 (26 oktober–1 november). Guide till de bästa kustnära resmålen för hela familjen – och varför havet slår alla andra alternativ.", category: "Säsong", emoji: "🍂", readTime: "6 min", fullContent: true, faqs: [{ q: 'När är höstlovet 2026?', a: 'Höstlovet 2026 är vecka 44: måndag 26 oktober till söndag 1 november. Observera att datum varierar lite mellan kommuner – kolla din kommuns skolkalender. De flesta skolor i Stockholmsregionen har samma datum.' }, { q: 'Vad kan man göra vid havet på höstlovet?', a: 'Vandring längs kustleder, svampplockning, fiskeutflykter, havsbastu, och besök till öar och fiskelägen. Höstlovet sammanfaller med höstfärgernas höjdpunkt i Bohuslän och Stockholms skärgård. Lövfärger och tom natur ger en minnesvärdig upplevelse.' }, { q: 'Vilka kustnära resmål passar barnfamiljer på höstlovet?', a: 'Vaxholm (nära Stockholm, öppet hela hösten), Lysekil och Smögen i Bohuslän, samt Borgholm på Öland. Alla tre är tillgängliga utan komplicerad planering och har aktiviteter och restauranger öppna under höstlovet.' }] },
  { slug: "november-skargard", title: "November i skärgården – kustens stillaste säsong", excerpt: "November är den månad de flesta undviker havet. Det är precis därför du ska åka dit. Guide till november i skärgården – stormar, stillhet och en annan slags skönhet.", category: "Säsong", emoji: "🌫", readTime: "6 min", fullContent: true, faqs: [{ q: 'Är det värt att åka till skärgården i november?', a: 'Absolut – för rätt person. November ger total stillhet, dramatiska stormar mot klippor, och en skärgård som är genuint folktom. Det är inte en semester för sol och bad utan för vandring, havsbastu, och upplevelsen av naturen i sin råaste form.' }, { q: 'Vilka båtar går till skärgården i november?', a: 'Waxholmsbolaget kör ett kraftigt reducerat schema i november. Vaxholm och Möja har daglig trafik. Grinda, Sandhamn och Utö har begränsad trafik – kolla aktuell tidtabell på waxholmsbolaget.se. Yttre skärgården är i princip avstängd.' }, { q: 'Vad ska man göra i skärgården i november?', a: 'Havsbastu är höjdpunkten – kontrasten mellan varm bastu och kallt novemberhav är en upplevelse utöver det vanliga. Vandring längs kustleder utan ett enda mötande fotspår. Birdwatching längs kusten är utmärkt – havsörn och ejdrar syns regelbundet.' }] },
  { slug: "host-blekinge-skargard", title: "Höst i Blekinge skärgård 2026 – Aspö, Sturkö och sydkusten", excerpt: "Blekinges skärgård är liten, tyst och genuint vacker. På hösten är den nästan helt tom – perfekt för den som söker äkta stillhet vid havet. Guide till höstens Blekinge.", category: "Säsong", emoji: "🏝", readTime: "6 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Blekinges skärgård på hösten?', a: 'Från Karlskrona kör reguljära passagerarfärjor till Aspö (ca 40 min) och Sturkö (ca 25 min) via Blekinges länstrafik. Höststidtabellen är reducerad – kolla blekinge.se för aktuella tider. Karlskrona nås med tåg från Malmö (1,5 h) eller Stockholm (4 h).' }, { q: 'Vad är unikt med Blekinges skärgård jämfört med Stockholm och Bohuslän?', a: 'Blekinge är mer avsides och genuint touristfri. Skärgården är plattare och med mer granit och sandstränder – och vattnet är klarare än Östersjöns genomsnitt. Det är en välbevarad hemlighet.' }, { q: 'Vad gör man på Aspö och Sturkö på hösten?', a: 'Vandring längs kustleder, fiskeutflykter med lokala fiskare, birdwatching (höstmigration längs sydkusten är intensiv), och cykla runt öarna. Järnavik på Aspö har en av Blekinges vackraste sandstränder – tom på hösten.' }] },
  { slug: "host-skane-kusten", title: "Höst i Skåne kust 2026 – Falsterbo, Kullaberg och Österlen", excerpt: "Skånes kust är vacker hela året – men hösten ger något unikt. Fågelflyttningens höjdpunkt, dramatiska storm och en öppen natur som glöder i gult och rött. Guide till höstens Skåne.", category: "Säsong", emoji: "🌊", readTime: "7 min", fullContent: true, faqs: [{ q: 'Varför är Skåne speciellt på hösten?', a: 'Falsterbo är en av Europas bästa fågelstationer under höstflyttningen (september–november). Kullaberg har dramatisk klippkust bäst utan sommarsäsongens turister. Österlen blommar av bök- och ekskogars lövfärger mot havet. Det är en annan upplevelse än sommaren.' }, { q: 'Vad ska man göra längs Skånes kust på hösten?', a: 'Fågelskådning vid Falsterbo (Falsterbo Fågelstation, september–oktober). Vandring längs Skåneleden vid Kullaberg. Österlenrundan med besök i Simrishamn och Kivik. Havsbad i Mölle eller Torekov – vattnet är fortfarande badbart i september.' }, { q: 'Är Skånes kust tillgänglig utan bil på hösten?', a: 'Delvis – tåg och Skånetrafiken täcker Ystad, Simrishamn och Höganäs. Kullaberg och Falsterbo kräver bil eller cykel. Malmö är perfekt bascamp – pendla ut till kusterna under dagen. Öresundsbron från Köpenhamn är enkel.' }] },
  { slug: "weekendresa-host-havet", title: "Weekendresa höst vid havet – 10 resmål att boka nu", excerpt: "Höstens bästa weekendresor finns vid havet. Lugnare, vackrare och billigare än sommaren. Guide till 10 resmål längs svenska kusten – från Bohuslän till Blekinge.", category: "Praktisk", emoji: "🗺", readTime: "8 min", fullContent: true, faqs: [{ q: 'Varför är en höst-weekendresa vid havet bättre än sommaren?', a: 'Priserna är 30–50% lägre efter högsäsongen. Inga köer, inga fullbokade bryggor och restaurangerna har tid för dig. Naturen är på många sätt vackrare – lövfärger, höststormar och dramatisk ljussättning. Du upplever kusten som lokalbefolkningen gör.' }, { q: 'Vad ska man boka i förväg för en höst-weekendresa?', a: 'Boende (begränsat utbud höst – boka 2–4 veckor i förväg), havsbastu om du vill ha det (populärt, boka tidigt), och restaurangtider om du planerar finmiddagen. Båtbiljetter behöver inte bokas lika långt i förväg som sommartid.' }, { q: 'Vilket av de 10 resmålen ger bäst valuta för pengarna?', a: 'Vaxholm (Stockholm) är billigast och enklast att nå. Lysekil i Bohuslän ger mest "äkta kustliv" för pengarna. Borgholm på Öland är utmärkt för familjerna – lång säsong och bra service till rimliga priser.' }] },
  { slug: "host-roslagen", title: "Höst i Roslagen – skärgård norr om Stockholm i lövfärg", excerpt: "Roslagen är Stockholms skärgårds norra gren – och på hösten är den vackrare än södern. Björkar vid havet, fiskelägen och en skärgård som glömts bort av turisterna.", category: "Säsong", emoji: "🍁", readTime: "7 min", fullContent: true, faqs: [{ q: 'Var ligger Roslagen?', a: 'Roslagen sträcker sig längs Upplands och norra Stockholms kust, från Norrtälje i söder till Tierp i norr. Öarna Arholma, Svartlöga, Blidö och Fejan är kärnan. Norrtälje är porten till Roslagen och nås med buss 676 från Stockholm (ca 1h 20 min).' }, { q: 'Vad är Roslagens bästa höstupplevelse?', a: 'Vandring på Svartlöga och Arholma utan ett enda möte. Havsbastuupplevelsen på Arholma STF (boka i förväg). Höstfiske efter havsöring längs kustremsan. Fiskelägena i Grisslehamn och Singö är pittoreska och nästan folktomma i september–oktober.' }, { q: 'Hur tar man sig till Roslagen utan bil?', a: 'Buss 676 från Stockholm City till Norrtälje, sedan Waxholmsbolagets linjer i Roslagens skärgård. Arholma nås med linje 5, ca 3 tim från Tekniska Högskolan. Svartlöga nås med linje 6. Kontrollera höststidtabellen – avgångarna minskar från september.' }] },
  { slug: "planera-host-resa-havet", title: "Planera höstresa vid havet – checklista och kalendarium 2026", excerpt: "Höstresan vid havet kräver lite mer planering än sommarvarianten. Checklista för boende, transport, utrustning och de viktigaste datumen för hösten 2026.", category: "Praktisk", emoji: "📋", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vad är de viktigaste datumen för höst vid havet 2026?', a: 'Surströmmingspremiären 20 aug, hummerpremiären 26 sep, ostronsäsongens öppning september, höstlov vecka 44 (26 okt–1 nov). Planer du runt dessa datum får du automatiskt med i de lokala traditioner som gör hösten unik vid havet.' }, { q: 'Vad ska man tänka på vid höstbokning?', a: 'Boka boende tidigt – utbudet krymper efter sommarsäsongen. Kolla alltid restaurangers höstöppettider innan du reser – många stänger eller reducerar efter september. Ha alltid en Plan B för vädret: havsbastu, museum eller en god bok om stormen sätter in.' }, { q: 'Vad ska man packa för en höstresa vid havet?', a: 'Regnkläder och vindskydd (obligatoriskt), lager-på-lager-klädsel, vattentäta skor, pannlampa (det mörknar tidigt i oktober), och kamera – höstljuset vid havet är unikt. Ta alltid med reservkläder: du kan bli blöt utan varning.' }] },
  { slug: "ostgota-skargard", title: "Östgöta skärgård – guide till Sankt Anna och Gryt", excerpt: "En av Sveriges mest storslagna och minst kända skärgårdar. Tusentals öar, djupa sund och ett klart Östersjövatten – långt från Stockholms köer.", category: "Region", emoji: "⛵", readTime: "8 min", fullContent: true, faqs: [{ q: 'Hur tar man sig till Östgöta skärgård?', a: 'Med Skärgårdslinjen (Östgötatrafiken) från Arkösund, Tyrislöt eller Fyrudden till bl.a. Harstena, Ämtö och Gräsmarö. Boka senast kl 18:00 dagen innan på 0771-71 10 20. Trafiken är beställningstrafik och kör sommarsäsong.' }, { q: 'Vad finns att göra på Harstena?', a: 'Harstena är den mest bebodda ön i Östgöta skärgård och har restaurang, bageri, glass, rökt fisk och kajakhyrning. Det finns gästplatser för båt och stugor att hyra. Perfekt startpunkt för att utforska kringliggande öar.' }, { q: 'Behöver man boka Skärgårdslinjen i förväg?', a: 'Ja – boka senast kl 18:00 dagen innan. Ring Östgötatrafiken på 0771-71 10 20. Utan bokning finns ingen garanti att båten går.' }] },
  { slug: "nattkryssning-skargarden", title: "Nattkryssning i Stockholms skärgård – kvällsturer och sena båtar", excerpt: "Midnattssol, lyktor på bryggan och middag långt ute i skärgården – med sista båten hem sent på kvällen. Guide till kvällsresor i Stockholms skärgård.", category: "Aktivitet", emoji: "🌙", readTime: "5 min", fullContent: true, faqs: [{ q: 'Finns det nattkryssningar i Stockholms skärgård?', a: 'Ja – Cinderellabåten trafikerar skärgården med sena avgångar under sommarsäsongen. Flera aktörer erbjuder dessutom chartrade middagskryssningar från Strömkajen och Strandvägen.' }, { q: 'Kan man ta sista båten hem efter kvällsmiddag i skärgården?', a: 'Ja – under högsäsong avgår sista Waxholmsbolaget sent på kvällen från populära öar. Kontrollera alltid aktuell tidtabell på waxholmsbolaget.se – tiderna varierar per år och linje.' }] },
  // ── Batch N: Gap-analys-guider 2026-08-18 ────────────────────────────────
  { slug: "island-hopping-stockholms-skargard", title: "Island hopping i Stockholms skärgård – hoppa mellan öar med Waxholmsbolaget", excerpt: "Stockholms skärgård med 30 000 öar är skapad för island hopping. Guide till hur du hoppar mellan öarna med Waxholmsbolaget – utan egen båt och utan körkort.", category: "Praktisk", emoji: "⛵", readTime: "8 min", fullContent: true, faqs: [{ q: 'Kan man island hoppa i Stockholms skärgård utan båtlicens?', a: 'Ja – Waxholmsbolagets reguljära linjer förbinder ett dussintal öar utan att du behöver äga eller hyra båt. Du tar Waxholmsbåten från Strömkajen och hoppar av och på på öarna du vill besöka.' }, { q: 'Vilken rutt rekommenderas för en 3-dagars island hop?', a: 'En klassisk rutt: dag 1 Fjäderholmarna (25 min från Stockholm), dag 2 Grinda (ca 1h 45 min), dag 3 Sandhamn (via Stavsnäs, ca 1h 30 min). Alla tre nås med Waxholmsbolaget och har boende och restauranger.' }, { q: 'Vad kostar island hopping med Waxholmsbolaget?', a: 'Waxholmsbolaget ingår i SL och kan betalas med SL Access-kort (zonpriser) eller Waxholmsbolagets egna biljetter för längre sträckor i yttre skärgården. Kolla aktuella priser och zoner på waxholmsbolaget.se.' }] },
  { slug: "hund-skargarden", title: "Skärgård med hund – öar, regler och tips för hundresan", excerpt: "Att ta med hunden till skärgården är fullt möjligt – men kräver lite planering. Guide till hundvänliga öar, vad som gäller på Waxholmsbolaget och reglerna i naturreservaten.", category: "Praktisk", emoji: "🐕", readTime: "7 min", fullContent: true, faqs: [{ q: 'Får man ta med hund på Waxholmsbolaget?', a: 'Ja – hund på koppel är tillåten på Waxholmsbolagets båtar. Hunden behöver inte betala biljett men ska hållas kopplad under hela resan. Stora hundar som tar stor plats kan behöva stå i aktern.' }, { q: 'Vilka öar är bäst att besöka med hund?', a: 'Vaxholm (stad, hundvänlig), Möja (bilfri, lugn), och Arholma (norra skärgården, öppna marker) är populära val med hund. Undvik trängsel på Sandhamn och Fjäderholmarna under högsäsong.' }, { q: 'Vad gäller för hund i naturreservat i skärgården?', a: 'I de flesta naturreservat råder koppeltvång under fåglarnas häckningssäsong. Reglerna varierar per reservat – alltid kolla Länsstyrelsens information för det specifika reservat du planerar att besöka. En lös hund kan störa eller skrämma häckande fåglar allvarligt.' }] },
  { slug: "barnfamilj-stockholms-skargard", title: "De bästa öarna i Stockholms skärgård med barn", excerpt: "Stockholms skärgård med barn behöver inte vara komplicerat. Guide till de barnvänligaste öarna – sandstränder, korta resor och öar där det händer saker.", category: "Praktisk", emoji: "👨‍👩‍👧", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilken ö i Stockholms skärgård passar bäst med barn?', a: 'Fjäderholmarna är det enklaste valet – ca 25 min från Strandvägen, SL-zoner, grunt vatten och hantverksgallerier. Grinda är bäst för familjer som vill stanna ett dygn – sandstrand, Wärdshuset och lugn natur.' }, { q: 'Finns det öar med sandstrand nära Stockholm?', a: 'Grinda har en fin sandig badvik. Sandön (nära Djurö) är känt för sin sandstrand. Arholma i norra skärgården har sandstrand och bekräftad lekplats. Dalarö i söder har grunda och skyddade vikar.' }, { q: 'Hur långa båtresor klarar barn i skärgården?', a: 'De flesta barn klarar 45–60 min bra med mat och dryck ombord. Fjäderholmarna (25 min) och Vaxholm (ca 55 min) är perfekta startalternativ. Sandhamn och Utö kräver 2+ timmar och passar bättre för barn från ca 5 år.' }] },
  { slug: "romantisk-skargard", title: "Romantisk helg i skärgården – de bästa öarna för er två", excerpt: "Stockholms skärgård är en av världens vackraste platser för en romantisk helg. Guide till öarna och boendena som gör en helg för två till något att minnas.", category: "Praktisk", emoji: "🌅", readTime: "7 min", fullContent: true, faqs: [{ q: 'Vilken ö är bäst för en romantisk helg i skärgården?', a: 'Grinda Wärdshus är känt för sin romantiska miljö med havsvy och intim stämning. Utö erbjuder spa, cykling och ett historiskt värdshus. Sandhamn har kvällsatmosfär och seglarliv. Alla tre har boende direkt på ön.' }, { q: 'Finns det spa i Stockholms skärgård?', a: 'Utö Värdshus har spa och havsbastu. Smådalarö Gård i södra skärgården är ett boutique-spa vid havet. Arholma STF i norra skärgården erbjuder enkelt boende med bastu och havsdopp.' }, { q: 'Hur bokar man romantisk övernattning i skärgården?', a: 'Boka direkt via respektive värdshus hemsida – Grinda Wärdshus, Utö Värdshus och Sandhamns Värdshus har alla direktbokning. Boka helger minst 3–4 veckor i förväg under maj–september. Veckodagar är lättare att boka.' }] },
  { slug: "var-stockholms-skargard-2027", title: "Vår i Stockholms skärgård 2027 – öarna i april och maj", excerpt: "Stockholms skärgård på våren är en av naturens bästa hemligeter. Fåglar i full sång, inga turister och en stillhet som sommaren aldrig ger. Guide till vårens skärgård.", category: "Säsong", emoji: "🌸", readTime: "6 min", fullContent: true, faqs: [{ q: 'Vilka öar är öppna i Stockholms skärgård på våren?', a: 'Fjäderholmarna kör från tidig vår. Vaxholm är öppet hela året. Grinda, Sandhamn och Utö öppnar successivt i maj–juni – kolla respektive Waxholmsbolagets tidtabell för vårsäsongen.' }, { q: 'Vad kan man göra i skärgården på våren?', a: 'Fågelskådning är på topp i april–maj – ejdrar, havsörnar och tärnor anländer. Vandring på öar utan sommarträngseln. Tidiga räkfrukoster och öppen havsluft utan mygg. Vårens ljus ger ett unikt fotografiskt perspektiv.' }, { q: 'Är vattnet badbart på våren i skärgården?', a: 'Sällan – vattnet i Stockholms skärgård är typiskt 8–12°C i april–maj. Somliga tar det tidiga dopp, men de flesta väntar till juni när temperaturen stiger mot 15–18°C. Havsbastu med ett snabbt dopp är ett bättre alternativ på våren.' }] },
]
