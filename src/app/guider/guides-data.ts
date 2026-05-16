export type GuideCategory = "Praktisk" | "Transport" | "Aktivitet" | "Mat" | "Säsong" | "Region"

export type GuideMeta = {
  slug: string
  title: string
  excerpt: string
  category: GuideCategory
  emoji: string
  readTime: string
  featured?: boolean
  fullContent?: boolean
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
  },
  {
    slug: "packlista-skargarden",
    title: "Komplett packlista för skärgården",
    excerpt: "Kläder, mat & dryck, säkerhet, teknik, barn och segling. Allt samlat i en guide du kan bocka av innan du lämnar bryggan.",
    category: "Praktisk",
    emoji: "🎒",
    readTime: "8 min",
    fullContent: true,
  },
  {
    slug: "allemansratten-pa-sjon",
    title: "Allemansrätten på sjön – vad som gäller på vattnet",
    excerpt: "Var får du ankra, tälta och elda? Vad gäller om toalettavfall? Enkla svar på de vanligaste frågorna om allemansrätten till sjöss.",
    category: "Praktisk",
    emoji: "⚓",
    readTime: "7 min",
    fullContent: true,
  },
  {
    slug: "waxholmsbolaget-guide",
    title: "Waxholmsbolaget – komplett guide till båttrafiken",
    excerpt: "Hur fungerar linjerna? Vilka hållplatser gäller? Är SL-kortet giltigt? Allt om Waxholmsbolaget samlat på ett ställe.",
    category: "Transport",
    emoji: "⛴",
    readTime: "9 min",
    fullContent: true,
  },
  {
    slug: "skargard-utan-bat",
    title: "Skärgård utan båt – 10 öar du når utan eget fartyg",
    excerpt: "Bilfärja, Waxholmsbolaget och SL – 10 konkreta förslag rangordnade efter tillgänglighet.",
    category: "Transport",
    emoji: "🚌",
    readTime: "10 min",
    fullContent: true,
  },
  { slug: "vad-kostar-skargarden",       title: "Vad kostar en dag i skärgården?",                excerpt: "Biljetter, mat, boende – en realistisk budget för olika restyper.",                          category: "Praktisk",  emoji: "💰", readTime: "5 min" },
  { slug: "badtemperatur-skargard",      title: "Badtemperaturen i skärgården – säsong för säsong", excerpt: "När är vattnet varmt nog att bada? Månadsvis guide till havsbadets säsong.",              category: "Aktivitet", emoji: "🌡", readTime: "4 min" },
  { slug: "sl-kort-skargarden",          title: "SL-kortet i skärgården – vad gäller?",           excerpt: "Var är SL-kortet giltigt, var räcker det inte och vad kostar tilläggsbiljetten?",          category: "Transport", emoji: "🎫", readTime: "4 min" },
  { slug: "dykning-snorkling-skargard",  title: "Dykning och snorkling i Stockholms skärgård",    excerpt: "Bästa platserna, vad du kan se och hur du hyr utrustning.",                                category: "Aktivitet", emoji: "🤿", readTime: "6 min" },
  { slug: "rakfrukost-skargard",         title: "Räkfrukost i skärgården – var och hur",           excerpt: "Den klassiska skärgårdsupplevelsen: nyfångad räka, majonnäs och knäckebröd vid bryggan.",  category: "Mat",       emoji: "🦐", readTime: "5 min" },
  { slug: "sjomatkrogar-guide",          title: "Sjömatskrogar i skärgården – bästa ställena",    excerpt: "Från Sandhamn till Smögen: restaurangerna som serverar havets bästa råvaror.",             category: "Mat",       emoji: "🦞", readTime: "7 min" },
  { slug: "hummersafari-bohuslan",       title: "Hummersafari i Bohuslän – guide och säsonger",   excerpt: "När öppnar hummerpremiären, var fiskar du och hur bokar du en guidad safari?",            category: "Aktivitet", emoji: "🦀", readTime: "6 min" },
  { slug: "surstrommning-guide",         title: "Surströmming – guide till den svenska traditionen", excerpt: "Historia, smakupplevelsen, hur du beställer och var du avnjuter den.",                  category: "Mat",       emoji: "🐟", readTime: "5 min" },
  { slug: "skargard-host",               title: "Skärgården på hösten – varför höst är bäst",     excerpt: "Tomma öar, lövfärger och svamp – höstens argument för en skärgårdstur.",                  category: "Säsong",    emoji: "🍂", readTime: "5 min" },
  { slug: "midsommar-bohuslan",          title: "Midsommar i Bohuslän – 7 alternativ",             excerpt: "Klippor, sillmåltider och midsommarstång vid havet på västkusten.",                       category: "Säsong",    emoji: "🌼", readTime: "8 min" },
  { slug: "sandhamn-vs-grinda",          title: "Sandhamn vs Grinda – vilken ö passar dig?",       excerpt: "Två skärgårdsklassiker med helt olika karaktär. En ärlig jämförelse.",                    category: "Region",    emoji: "⚖", readTime: "5 min" },
  { slug: "gotland-vs-oland",            title: "Gotland vs Öland – stor semesterguide",            excerpt: "Kalkstenraukar mot Alvaret, rosévin mot glasbruken. Vilken ö är rätt för dig?",           category: "Region",    emoji: "🗺", readTime: "8 min" },
  { slug: "marstrand-guide",             title: "Marstrand – komplett guide till fästningsstaden", excerpt: "Bilbåt, fästning, regatta och Marstrands bästa restauranger.",                            category: "Region",    emoji: "🏰", readTime: "7 min" },
  { slug: "smogen-guide",                title: "Smögen – guide till klippornas stad",              excerpt: "Smögenbryggan, räksmörgåsen och klipporna – allt du behöver veta om Smögen.",             category: "Region",    emoji: "🦐", readTime: "6 min" },
  { slug: "naturhamnar-guide",           title: "Bästa naturhamnarna i Stockholms skärgård",       excerpt: "Ankringsplatser med svängrum, vindskydd och vacker natur. Vår topplista.",                 category: "Praktisk",  emoji: "⚓", readTime: "7 min" },
  { slug: "bohuslan-skargard-guide",     title: "Bohuslän – guide till västkustens skärgård",      excerpt: "Från Göteborg till Kosterfjorden: öar, hamnar, mat och transport.",                      category: "Region",    emoji: "🌊", readTime: "10 min" },
  { slug: "norrtelje-guide",             title: "Norrtälje – porten till norra skärgården",        excerpt: "Stad, sommarmarknad och norra skärgårdens fridfulla öar. En helgguide.",                  category: "Region",    emoji: "⛵", readTime: "6 min" },
  { slug: "fjaderholmarna-guide",        title: "Fjäderholmarna – dagstur 25 minuter från stan",   excerpt: "Hur du tar dig dit, vad du gör och äter. Perfekt introduktion till skärgårdslivet.",      category: "Region",    emoji: "⛴", readTime: "5 min" },
  { slug: "weekend-i-skargarden",        title: "En hel weekend i skärgården – så planerar du",    excerpt: "Vad packar du, var bor du och hur strukturerar du dagarna för maximal upplevelse?",       category: "Praktisk",  emoji: "🏕", readTime: "9 min" },
  { slug: "basta-oar-stockholms-skargard", title: "De 15 bästa öarna i Stockholms skärgård",      excerpt: "Från lättillgängliga Fjäderholmarna till avlägsna Svenska Högarna. Rankad lista.",         category: "Region",    emoji: "🏝", readTime: "10 min" },
  { slug: "vaxholm-guide-komplett",      title: "Vaxholm – den kompletta guiden",                  excerpt: "Fästning, restauranger, shopping och hur du tar dig dit med Waxholmsbolaget.",            category: "Region",    emoji: "🏰", readTime: "8 min" },
  { slug: "landsort-guide",              title: "Landsort – skärgårdens sydligaste utpost",        excerpt: "Fyren, det unika klimatet och stillheten längst ut i södra ytterskärgården.",             category: "Region",    emoji: "🏮", readTime: "6 min" },
  { slug: "hyrbat-guide",                title: "Hyra båt i skärgården – allt du behöver veta",    excerpt: "Licenskrav, priser, bästa hyrbåtsbolagen och vad du bör fråga innan du bokar.",           category: "Praktisk",  emoji: "⛵", readTime: "8 min" },
  { slug: "pendelbat-guide",             title: "Pendelbåtar i Stockholm – guide till linjerna",   excerpt: "Waxholmsbolaget, Strömma och privatlinjer: alla pendelbåtar och när de går.",             category: "Transport", emoji: "⛴", readTime: "6 min" },
  { slug: "seglingsklubbar-guide",       title: "Seglingsklubbar i Stockholm och skärgården",      excerpt: "Hitta rätt klubb, kurser och community för dig som vill börja segla.",                    category: "Aktivitet", emoji: "⛵", readTime: "5 min" },
]
