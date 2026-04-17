import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Skärgårdsbloggen – Svalla',
  description: 'Tips, guider och inspiration för Stockholms skärgård. Bästa restaurangerna, dolda pärlor, ruttguider och säsongsuppdateringar.',
  keywords: ['stockholms skärgård guide', 'skärgård restaurang tips', 'bästa öarna stockholm', 'skärgård kajak', 'segla stockholms skärgård'],
  openGraph: {
    title: 'Skärgårdsbloggen – Svalla',
    description: 'Tips, guider och inspiration för Stockholms skärgård.',
    url: 'https://svalla.se/blogg',
  },
}

export const POSTS = [
  {
    slug: 'basta-restaurangerna-sandhamn',
    title: 'De 5 bästa restaurangerna på Sandhamn 2026',
    excerpt: 'Sandhamn är seglingscentrum och skärgårdsklassiker. Men vilka ställen är verkligen värda ett besök? Vi har testat allt från bryggserveringar till seglarhotellets kök.',
    category: 'Mat & dryck',
    date: '2026-04-10',
    readTime: '5 min',
    emoji: '🍽',
  },
  {
    slug: 'kajak-stockholms-skargard-nybörjare',
    title: 'Kajak i skärgården – guide för nybörjaren',
    excerpt: 'Aldrig paddlat men vill prova? Här är allt du behöver veta: utrustning, säkerhet, bra startsträckor och vad du inte får missa längs vägen.',
    category: 'Aktiviteter',
    date: '2026-03-28',
    readTime: '8 min',
    emoji: '🛶',
  },
  {
    slug: 'dolda-parlor-moja',
    title: 'Möjas dolda pärlor – bilfri ö med äkta skärgårdsstämning',
    excerpt: 'Möja är en av skärgårdens bäst bevarade hemligheter. Bilfri, lugn och genuint vacker. Vi visar dig vad som gör ön unik – och var du ska äta.',
    category: 'Öguide',
    date: '2026-03-15',
    readTime: '6 min',
    emoji: '🏝',
  },
  {
    slug: 'bransle-ankring-skargard',
    title: 'Bränsle och ankringsplatser i ytterskärgården',
    excerpt: 'Planerar du en längre tur mot Landsort eller Sandhamn? Här är en komplett genomgång av bränslehamnar, naturhamnar och tjänstehamnar längs vägen.',
    category: 'Praktiskt',
    date: '2026-03-01',
    readTime: '7 min',
    emoji: '⛽',
  },
  {
    slug: 'sommar-skargard-tips',
    title: '10 saker du måste göra i skärgården i sommar',
    excerpt: 'Från gryningsfika vid en klippa till kvällsseglingen med solnedgång. Vår lista över årets bästa skärgårdsupplevelser.',
    category: 'Inspiration',
    date: '2026-02-14',
    readTime: '4 min',
    emoji: '☀️',
  },
  {
    slug: 'fjaderholmarna-dagstur',
    title: 'Fjäderholmarna – perfekt dagstur från Stockholm',
    excerpt: 'Bara 25 minuter från Strandvägen och du är i skärgården. Fjäderholmarna är den perfekta introduktionen – krogen, hantverksgallerierna och det blå vattnet.',
    category: 'Öguide',
    date: '2026-01-30',
    readTime: '5 min',
    emoji: '⛴',
  },
  {
    slug: 'vaxholm-guide',
    title: 'Vaxholm – skärgårdsstadens kompletta guide',
    excerpt: 'Vaxholm är porten till skärgården. En stad med fästning, historia, fantastiska restauranger och direktbåt från Strömkajen. Allt du behöver veta.',
    category: 'Öguide',
    date: '2026-04-05',
    readTime: '6 min',
    emoji: '🏰',
  },
  {
    slug: 'uto-guide',
    title: 'Utö – södra skärgårdens kronjuvel',
    excerpt: 'Utö har allt: cykelleder, gruvhistoria, havsbastu, topprestaurang och fantastiska naturhamnar. Så här planerar du din tur dit.',
    category: 'Öguide',
    date: '2026-03-22',
    readTime: '7 min',
    emoji: '🚲',
  },
  {
    slug: 'segling-nybörjare-guide',
    title: 'Segla för första gången – allt du behöver veta',
    excerpt: 'Drömmer du om att ta ut en segelbåt i skärgården? Här är en ärlig guide för den som aldrig seglat: kurser, hyrbåtar, leder och de vanligaste misstagen.',
    category: 'Aktiviteter',
    date: '2026-03-18',
    readTime: '9 min',
    emoji: '⛵',
  },
  {
    slug: 'basta-badplatserna',
    title: 'De 12 bästa badplatserna i Stockholms skärgård',
    excerpt: 'Klippbad, sandstrand eller bastu vid vattnet? Vi har listat de absolut bästa badplatserna – från lättillgängliga dagsturmål till dolda pärlor ute i ytterskärgården.',
    category: 'Aktiviteter',
    date: '2026-04-08',
    readTime: '6 min',
    emoji: '🏊',
  },
  {
    slug: 'vandring-orno-uto',
    title: 'Vandring i skärgården – bästa lederna på Ornö och Utö',
    excerpt: 'Stockholms skärgård är inte bara vatten. Ornö och Utö har markerade leder genom urbergslandskap och gammal skog som är värda varje steg.',
    category: 'Aktiviteter',
    date: '2026-02-28',
    readTime: '7 min',
    emoji: '🥾',
  },
  {
    slug: 'cykling-moja-gallno',
    title: 'Cykla i skärgården – guide för Möja och Gällnö',
    excerpt: 'Bilfria öar är perfekta för cykling. Hyr en cykel vid bryggan, packa en matsäck och utforska hela ön på ett par timmar. Här är de bästa öarna.',
    category: 'Aktiviteter',
    date: '2026-02-20',
    readTime: '5 min',
    emoji: '🚴',
  },
  {
    slug: 'fiske-skargard-guide',
    title: 'Fiske i skärgården – leder, arter och bästa säsonger',
    excerpt: 'Abborre, gädda och havsöring väntar i skären. En komplett guide till sportfiske i Stockholms skärgård – var du fiskar, när och vad du behöver.',
    category: 'Aktiviteter',
    date: '2026-02-10',
    readTime: '8 min',
    emoji: '🎣',
  },
  {
    slug: 'gasthamnar-guide',
    title: 'Bästa gästhamnarna i Stockholms skärgård 2026',
    excerpt: 'Vi har besökt och betygsatt de 10 bästa gästhamnarna. Service, läge, faciliteter och pris – allt samlat i en guide för dig som planerar sommarens båttur.',
    category: 'Praktiskt',
    date: '2026-01-25',
    readTime: '8 min',
    emoji: '⚓',
  },
  {
    slug: 'vinter-skargard',
    title: 'Skärgård på vintern – upplev islugnet',
    excerpt: 'De flesta undviker skärgården på vintern. Det är ett misstag. Stillheten, isfiskarna, vinterhamnarna och de tomma bryggorna är en helt annan och fantastisk upplevelse.',
    category: 'Inspiration',
    date: '2025-12-15',
    readTime: '5 min',
    emoji: '❄️',
  },
  {
    slug: 'barnfamilj-skargard',
    title: 'Skärgård med barnfamilj – 8 tips för en lyckad tur',
    excerpt: 'Att ta ut hela familjen i skärgården kräver lite planering. Här är de bästa öarna, säkraste badplatserna och restaurangerna som faktiskt fungerar med barn.',
    category: 'Familj',
    date: '2026-01-15',
    readTime: '6 min',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    slug: 'svenska-hoar-sandhamn',
    title: 'Svenska Högarna – den yttersta förposten',
    excerpt: 'Längst ut i ytterskärgården ligger Svenska Högarna. Inget elförsörjning, ingen fast befolkning – bara klippor, hav och en av skärgårdens absolut finaste naturupplevelser.',
    category: 'Öguide',
    date: '2026-03-05',
    readTime: '5 min',
    emoji: '🪨',
  },
  {
    slug: 'grilla-naturhamn',
    title: 'Grilla i naturhamnen – regler, tips och bästa platser',
    excerpt: 'Vad gäller egentligen vid eldning i skärgården? Vi reder ut allemansrätten, när eldningsförbud gäller och de bästa platserna att grilla när reglerna tillåter.',
    category: 'Praktiskt',
    date: '2026-02-05',
    readTime: '5 min',
    emoji: '🔥',
  },
  {
    slug: 'norrtelje-norra-skargard',
    title: 'Norra skärgården – Norrtelje och Singö',
    excerpt: 'Norrtäljes skärgård är mer rå och orörd än Stockholms. Singö, Väddö och Räfsnäs är ett annat tempo – lugnt, genuint och fortfarande inte turistifierat.',
    category: 'Öguide',
    date: '2026-01-20',
    readTime: '6 min',
    emoji: '🌊',
  },
  {
    slug: 'packlista-bat',
    title: 'Packlista för båtturen – det du inte får glömma',
    excerpt: 'Oavsett om du tar ut en dagsbåt eller planerar en vecka i skärgården finns det saker du alltid behöver ha med. Vår kompletta packlista sparar dig från en dålig tur.',
    category: 'Praktiskt',
    date: '2026-04-01',
    readTime: '4 min',
    emoji: '🎒',
  },
  {
    slug: 'havsbastu-guide',
    title: 'Havsbastu i skärgården – de bästa platserna 2026',
    excerpt: 'Ingenting slår en rykande bastu vid havet med ett dopp efteråt. Vi har listat de bästa havsbastuplatserna i Stockholms skärgård – tillgängliga per båt eller färja.',
    category: 'Aktiviteter',
    date: '2026-03-10',
    readTime: '5 min',
    emoji: '🧖',
  },
  {
    slug: 'segling-klassiska-leder',
    title: 'Klassiska seglarleder i Stockholms skärgård',
    excerpt: 'Stockholmsleder, Furusundsleder och Sandhamnsleden är ryggraden i skärgårdssegling. En guide till ledernas historia, svårighetsgrad och bästa hamnarna längs vägen.',
    category: 'Segling',
    date: '2026-02-25',
    readTime: '9 min',
    emoji: '🗺',
  },
]

export default function BloggPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7fbfc', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '60px 20px 40px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textDecoration: 'none' }}>← Svalla</Link>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '12px 0 6px' }}>Skärgårdsbloggen</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Tips, guider och inspiration för Stockholms skärgård</p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blogg/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                transition: 'transform .2s, box-shadow .2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 100%)',
                  padding: '28px 24px',
                  fontSize: 40,
                  textAlign: 'center',
                }}>
                  {post.emoji}
                </div>
                <div style={{ padding: '20px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#1e5c82',
                      background: 'rgba(30,92,130,0.08)',
                      padding: '3px 9px',
                      borderRadius: 20,
                    }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: '#a0b8c4', paddingTop: 3 }}>{post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 800, color: '#162d3a', margin: '0 0 10px', lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 13, color: '#5a8090', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 11, color: '#a0b8c4' }}>
                      {new Date(post.date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <span style={{ fontSize: 12, color: '#1e5c82', fontWeight: 700 }}>Läs mer →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div style={{
          marginTop: 48,
          padding: '28px',
          background: 'rgba(30,92,130,0.06)',
          borderRadius: 16,
          textAlign: 'center',
          border: '1px dashed rgba(30,92,130,0.2)',
        }}>
          <p style={{ fontSize: 14, color: '#4a6a7a', margin: '0 0 8px' }}>Fler artiklar är på väg.</p>
          <p style={{ fontSize: 13, color: '#7a9dab', margin: 0 }}>
            Tips på ämnen? Maila oss på{' '}
            <a href="mailto:hej@svalla.se" style={{ color: '#1e5c82', fontWeight: 700 }}>hej@svalla.se</a>
          </p>
        </div>
      </div>
    </div>
  )
}
