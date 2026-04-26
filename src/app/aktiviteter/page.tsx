import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Vattenaktiviteter i Sverige — Segling, kajak, fiske och bad',
  description: 'Komplett guide till vattenaktiviteter längs hela Svenska kusten. Segling från Bohuslän till Gotland, havskajak, fiske, bad och friluftsliv. Nybörjarvänligt och avancerat.',
  keywords: [
    'vattenaktiviteter sverige',
    'segling sverige',
    'havskajak bohuslän',
    'fiske gotland',
    'kajak stockholms skärgård',
    'segling västra svenska kusten',
    'fiskekort sverige',
    'bad och strandsemester',
    'vandring från båt',
    'vinteraktiviteter skärgård',
    'paddling gotland',
    'vrakdykning sverige',
    'aktiviteter svenska kusten',
    'fjällaktiviteter och fritid',
  ],
  openGraph: {
    title: 'Vattenaktiviteter i Sverige — Segling, kajak, fiske och bad',
    description: 'Din guide till segling, paddling, fiske, bad och friluftsliv längs hela Svenska kusten.',
    url: 'https://svalla.se/aktiviteter',
  },
  alternates: { canonical: 'https://svalla.se/aktiviteter' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⛵',
    title: 'Segling',
    description: 'Från nybörjarkurser i Saltsjön till kappseglingar runt Sandhamn — och charter om du inte har egen båt. Segling är möjligt året runt men maj–september är peak-säsongen.',
    href: '/segelrutter',
    meta: 'Hela säsongen',
  },
  {
    icon: '🛶',
    title: 'Paddling & kajak',
    description: 'Havskajak i ytterskärgården eller stillsam SUP i en naturhamn — från Bohuslän till Gotland är Sverige Europas bästa paddelrevir. Kurserna är långt enkla och billiga.',
    href: '/platser?kategori=paddling',
  },
  {
    icon: '🎣',
    title: 'Fiske',
    description: 'Gädda i vassbrynen, havsöring längs kusten, strömming från bryggan och torsk i djupare vatten. I saltvatten behöva du inget fiskekort, men regler och fredningsperioder gäller.',
    href: '/platser?kategori=fiske',
  },
  {
    icon: '🏊',
    title: 'Bad & simning',
    description: 'Klassiska klippbad på Bohuslän, barnvänliga sandstränder på Gotland och iskalla morgondopp från bryggan — varje månad och varje kust har sin charm och sin temperatur.',
    href: '/bastu-och-bad',
  },
  {
    icon: '🥾',
    title: 'Vandring',
    description: 'Sörmlandsleden, Roslagsleden, Gotlands alvar och kustnära naturreservat — lätta dagsturer eller flera dagar med tält och båt som transportmedel mellan öar.',
    href: '/vandring-och-natur',
  },
  {
    icon: '🚤',
    title: 'Motorbåt & RIB',
    description: 'Dagsturer med egen båt, hyrbåt eller guide. Rekommenderade rutter från Stockholm till Gotland, tankställen och gäststugor för varje sträcka.',
    href: '/populara-turer',
  },
  {
    icon: '🤿',
    title: 'Dykning & snorkling',
    description: 'Vrakdykning i Dalarö och Bålsta, snorkling i Möjas grunda vikar och längs Gotlands östkust — Sverige har över 20 merkilledda vrak och fantastisk skaldjursfauna.',
    href: '/platser?kategori=dyk',
  },
  {
    icon: '🧊',
    title: 'Vinteraktiviteter',
    description: 'Långfärdsskridsko på tjock is, isfiske på allt från skärgårdsvikar till inland, och vedeldade bastur för uppvärmning — skärgården är magisk även i januari och februari.',
    href: '/platser?kategori=vinter',
  },
]

export default function AktiviteterPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Aktiviteter"
      title="Gör Svenska kusten och skärgårdarna till ditt äventyr"
      tagline="Segling, paddling, fiske, bad, vandring och dykning — välj aktivitet efter säsong, nivå och kustkvalitet från Bohuslän till Gotland och in i Stockholms skärgård."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 8 12 2 2 8l10 6 10-6Z" />
          <path d="m2 16 10 6 10-6" />
          <path d="m2 12 10 6 10-6" />
        </svg>
      }
      intro={
        <>
          <p>
            Sverige har en unik position för vattenaktiviteter. Med nästan 3 200 kilometer kustlinje, tusentals öar och ett klimat som gör alla årstider möjliga — allt från sommar med 20 graders vatten till vintrar med tjock is — finns det något för alla.
          </p>
          <p>
            Västkusten från Bohuslän erbjuder klassiska klippbad och en bohemisk atmosfär. Gotland är känt för sitt lugna vatten, barnvänliga sandstränder och världsklass för segling. Stockholms skärgård är tätt bebyggd men otroligt tillgänglig — bara 30 minuter från stan ligger du i vild natur.
          </p>
          <p>
            Här listar vi aktiviteter sorterade efter säsong och nivå. Nybörjarvänligt är tydligt märkt, liksom vilka aktiviteter som kräver licens eller försäkring (seglarbevis, fiskekort). Vi listar också vilka aktiviteter som är mest familjevänliga, billiga att börja med och vilka som kräver fysisk träning.
          </p>
          <p>
            Många aktiviteter är helt gratis — allemansrätten gäller i Sverige och du får bygga läger, plocka bär och bada på de flesta ställen. Det enda som kräver tillstånd är fiske i sötvatten (behövs fiskekort) och dykning på vissa fredade vrak.
          </p>
        </>
      }
      itemsTitle="Aktiviteter efter intresse"
      itemsDescription="Säsong, nivå och praktisk info finns på varje aktivitetssida. Alla rekommendationer är från användare som faktiskt gjort det."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Segling — från kurs till kappseglingsbåt
          </h2>
          <p>
            Segling är sporten som helt förändrar hur du förhåller dig till vattnet. En nybörjarkurs tar bara två helger och kostar mellan 1 500 och 2 500 kronor. Många följer upp med en seglarbevis (RYA/SSS-certifikat) som många chartrar och försäkringsbolag kräver.
          </p>
          <p>
            <strong>Stockholms skärgård</strong> har flera kursanordnare vid Saltsjön — Stockholms Seglarskola, KSSS (Kungliga Svenska Segel Sällskapet) och privata instruktörer. <strong>Gotland</strong> är känt för långseglatser i lugnt vatten — perfekt för familjer. <strong>Bohuslän</strong> har mer utmanande väder och är populärt bland erfarna seglare.
          </p>
          <p>
            Charterbåtar finns överallt — från 6-meterare som passar två personer till 45-fots motorbåtar. En vecka charter kostar mellan 8 000 och 25 000 kronor beroende på båtstorlek och säsong. Många nybörjare börjar med charter innan de köper egen båt.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad kostar en seglarkurs?
          </h3>
          <p>
            En nybörjarkurs kostar mellan 1 500 och 3 000 kronor och tar två helger. Seglarbevis (RYA) kostar mellan 3 000 och 5 000 kronor. Charter av en 30-fots båt kostar ungefär 12 000–15 000 kronor per vecka under högsäsong.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Havskajak och paddling
          </h2>
          <p>
            Havskajak är något helt annat än paddling i sjö. Du färdas långre, möter tidvatten och kan hamna långt från land om vädern skiftar. Men det är också otroligt befriande och kräver bara ett par timmar träning för att komma igång.
          </p>
          <p>
            <strong>Bohuslän</strong> är legendärt för havskajak — öarna ligger tätt och vattnet är ofta lugnt. Du kan paddla från Strömstad ner till Göta älv. <strong>Stockholms skärgård</strong> erbjuder allt från lätta dagsturer på grynna vikar till utmanande expeditioner i ytterskärgården. <strong>Gotland</strong> har färre öar men varmare vatten och en annan känsla — längre paddlingar mellan större öar.
          </p>
          <p>
            En kajak kostar mellan 8 000 och 20 000 kronor. Du kan hyra för 200–400 kronor per dag. En introduktionskurs tar några timmar och kostar mellan 500 och 1 000 kronor — det är värt det.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Allemansrätten och havskajak
          </h3>
          <p>
            Du får bygga läger nästan överallt i Sverige, men vissa öar har landstigningsförbud under fågelskyddsperioden (1 april–15 juli). Naturreservat kan ha egna regler. Innan du paddlar långt bort bör du kolla dessa restriktioner på 1177.se eller kontakta räddningstjänsten.
          </p>
          <p>
            Du bör inte paddla ensam långt från land. Använd alltid livväst, ha en väderstation på telefonen och säg till nära vän var du är på väg.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Fiske i skärgården och på kusten
          </h2>
          <p>
            Fiske är en av de mest tillgängliga aktiviteterna längs kusten. Här är det viktiga att förstå: <strong>i saltvatten (havet) behöva du INGET fiskekort</strong>. Men i sjöar och älvar behöver du alltid ett fiskekort — det kostar omkring 100–200 kronor per dag från allemanswebben.
          </p>
          <p>
            <strong>Havsöring</strong> är en premium-fisk som finns längs hela västkusten och Gotland. Den är fredadoch bör släppas tillbaka om du inte har särskild tillåtelse. <strong>Torsk</strong> och <strong>makrill</strong> fiskas från båt i djupare vatten. <strong>Strömming</strong> är gratis och rolig att fiska från brygga eller båt året runt.
          </p>
          <p>
            Från båt kan du även fiska <strong>gädda, abborre och gös</strong> — för dessa behövs fiskekort även i havet om du säljer eller skänker fisken. Många båtägare filar bara på tekniken eller slänger tillbaka fisken.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Regler och fredningsperioder
          </h3>
          <p>
            Havsöring är fredadfrån 1 oktober till 31 mars i de flesta områden — slapp då. Torsk har ibland fiskförbud sommartid för att ge den tid att föröka sig. Kolla fiskeriverkets hemsida före varje säsong.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Bad och strandsemester
          </h2>
          <p>
            Sveriges stränder är så olika att det är omöjligt att välja en favorit. Här är en guide till de mest kända regioner:
          </p>
          <p>
            <strong>Bohuslän</strong> är synonymt med klippbad. De glatta granitkullarna är vackra och det finns klippbad överallt från Strömstad till Göta älv. Vattnet är ofta kallast här — räkna med 12–16 grader även i juli.
          </p>
          <p>
            <strong>Gotland</strong> är känt för vita sandstränder och varmare vatten. Orsa Bad och Tofta strand är perfekta för familjer. Gotlands östra kust är ofta varmast — upp till 18–19 grader i augusti.
          </p>
          <p>
            <strong>Stockholms skärgård</strong> har grynna vikar och klippbad tätt inblandade. Några öar är helt fria från turister om man paddlar lite längre. En klassisk dagatur från Stockholm tar två timmar båt till ett lugnt badställe.
          </p>
          <p>
            <strong>Västra Vänern</strong> och <strong>Västra Götaland</strong> erbjuder också fantastiska badplatser — ofta helt gratis och ofta tomma även i juli.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vattentempraturer året om
          </h3>
          <p>
            Maj: 10–12 °C | Juni: 14–16 °C | Juli: 16–18 °C | Augusti: 16–19 °C | September: 14–16 °C | Oktober: 10–12 °C. I november–april är vattnet under 10 grader — en våtdräkt är nästan obligatorisk.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Vandring från båt
          </h2>
          <p>
            Många av Sveriges bästa vandringsleder ligger på öar eller nås bara från båt. Det öppnar upp helt nya möjligheter för aktivism — du kan kombinera segling, paddling eller motorbåt med promenad.
          </p>
          <p>
            <strong>Sörmlandsleden</strong> (genom Sörmland och öar utanför) är en klassisk multi-day trail — många gör den genom att paddla mellan nattställen. <strong>Roslagsleden</strong> går längs Stockholms skärgård och många avsnitt når du bara från båt. <strong>Gotlands alvar</strong> är ett UNESCO-världsarv där du kan vandra på öppen hedbygd — många kombinerar det med både paddling och bad.
          </p>
          <p>
            <strong>Kosteröarna</strong> har flera utmärkta vandringsleder och ligger nära till hands från Strömstad. Du kan boka en övernattning i stugan eller tälta enligt allemansrätten.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            När är bästa säsongen?
          </h2>
          <p>
            <strong>Maj–juni</strong> är peak för segling, paddling och första baden — då är vattnet kallt (10–16 °C) men dagarna långa och väder ofta stabilt. <strong>Juli–augusti</strong> har varmast vatten (16–19 °C) och flest evenemang, men också trängsel i populära hamnar och högre priser.
          </p>
          <p>
            <strong>September</strong> ger klart vatten, tystare hamnar och ofta det bästa vädret för en längre expedition. <strong>Oktober–april</strong> är för de som gillar tom skärgård, vedeldade bastur och långfärdsskridsko — men väd och mörka dagarna är utmanande.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Allemansrätten i skärgården
          </h2>
          <p>
            Allemansrätten gäller men med lokala variationer — vissa öar har landstigningsförbud under fågelskyddsperioden (1 april–15 juli) och naturreservat kan ha egna regler. Du får bygga läger överallt men du måste hålla minst 150 meter från närmaste bostad och inte lägga tält på samma plats mer än två nätter.
          </p>
          <p>
            Många öar på karlskär och här längs är naturreservat — dessa är ofta helt avstängda för beträdande under våren för att inte störa fågelkolonierna. Kontrollera alltid innan du paddlar långt bort.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Vanliga frågor om vattenaktiviteter
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Behöver man fiskekort för fiske i havet?
          </h3>
          <p>
            <strong>Nej.</strong> I saltvatten (havet längs kusten) behöver du inget fiskekort för att fiska. Du kan fiska gratis från brygga, båt eller strand året runt. Dock gäller fredningsperioder och vissa fiskar är skyddade (som havsöring under vissa perioder). I sjöar och älvar behöver du alltid ett fiskekort — kostnad ca 100–200 kronor per dag.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad är bästa aktiviteten för en barnfamilj?
          </h3>
          <p>
            <strong>Bad och snorkling</strong> är lättast — du behöver bara ett par badkläder och ett barn kan börja från 2–3 år. <strong>Motorbåt</strong> är nästa steg — många hyra för dagen och åker mellan badplatser. <strong>Kajak</strong> passar från 4–5 år (i double-kajak med vuxen) men kräver övning. <strong>Segling</strong> är fantastisk med barn — en 25-fots husbåt med två barn är lagom utmanande.
          </p>
          <p>
            Gotland är överlag mer familjevänligt än Stockholms skärgård — varmaste vattnet, längsta stränderna och många barnaktiviteter på land.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Kan man hyra kajak utan tidigare erfarenhet?
          </h3>
          <p>
            <strong>Ja, helt säkert.</strong> En kajak-hyrkompani kommer alltid att ge dig 15–30 minuter instruktion innan du åker iväg. Du behöver inte kunna något i förväg — bara vilja. Börja med en kortare tur (2–3 timmar) i ett lugnt område. Använd alltid livväst, även om du är simför.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            När är havet varmt nog för simning utan våtdräkt?
          </h3>
          <p>
            Det beror på personlig tålmodstolerans, men de flesta träna sig till att tycka 15–16 °C är okej. Utan träning är 17–18 °C minimun för många. <strong>Juli–augusti</strong> är det enda sättet att bada utan våtdräkt för de flesta — då är det ofta 17–19 °C. I Gotland är det ofta 1–2 grader varmare än övriga kusten.
          </p>
          <p>
            En billig våtdräkt kostar 300–500 kronor och öppnar upp möjligheten att bada året runt — även vinterbadare finns där det finns is.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Praktiska tips innan du åker
          </h2>
          <p>
            <strong>1. Kolla vädret.</strong> Använd SMHI eller Windy.com — båda ger en detaljerad 10-dagars prognos med vind, vågor och temperatur.
          </p>
          <p>
            <strong>2. Informera någon.</strong> Berätta för en vän eller familjemedlem var du är på väg och när du förväntas vara tillbaka. Låt honom/henne veta när du är framme.
          </p>
          <p>
            <strong>3. Använd alltid livväst.</strong> I båt är det lag. I kajak är det överlevnad. I båt är det lag.
          </p>
          <p>
            <strong>4. Börja små.</strong> Om du aldrig seglat förr — ta en kurs. Om du aldrig paddlat — hyra kajak i lugnt vatten innan du åker långt. Många olyckor beror på övermod.
          </p>
          <p>
            <strong>5. Ha en mobil eller VHF med batteri.</strong> Många skärgårdsöar har svag täckning men en VHF radiomottagare kan rädda livet.
          </p>
          <p>
            <strong>6. Respektera allemansrätten och naturreservaten.</strong> Lämna ingen skräp, gräv ned ditt toalettfolk minst 50 meter från vattnet, och läs före du paddlar långt bort.
          </p>
        </>
      }
      related={[
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Bohuslän', href: '/bohuslan' },
        { label: 'Gotland', href: '/gotland' },
      ]}
    />
  )
}
