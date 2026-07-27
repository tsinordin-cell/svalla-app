import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Annonsera och samarbeta med Svalla – mediakit 2026',
  description: 'Nå skärgårds- och kustintresserade resenärer via Svalla. Nyhetsbrevssponsorskap, redaktionella samarbeten och destinationspartnerskap. Se priser och kontakta oss.',
  alternates: { canonical: 'https://svalla.se/partner-sida' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Annonsera på Svalla – nå Sveriges skärgårdsintresserade resenärer',
    description: 'Svalla når 18 000+ resenärer i månaden med 52 % nyhetsbrevöppning. Tre samarbetsformer, inga programmatiska annonser.',
    url: 'https://svalla.se/partner-sida',
    type: 'website',
  },
}

// ─── Uppdatera dessa siffror löpande ──────────────────────────────────────────
const S = {
  monthlyReaders: '18 000+',
  subscribers: '2 200+',
  openRate: '52 %',
  clickRate: '9 %',
  guides: '280+',
  islands: '90+',
  targetSubscribers: '5 000',
  targetDate: 'vintern 2026/27',
}

export default function PartnerSidaPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(160deg, #091e2e 0%, #0d3f5a 45%, #1a6b7a 100%)',
        padding: 'clamp(56px,8vw,96px) 20px clamp(48px,6vw,80px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 999,
            padding: '5px 16px',
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            marginBottom: 22,
          }}>
            Mediakit 2026
          </div>
          <h1 style={{
            fontSize: 'clamp(30px, 5vw, 50px)',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 20px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            Nå resenärer som redan<br />
            <span style={{ color: '#7dd3c8' }}>vet vart de vill åka</span>
          </h1>
          <p style={{
            fontSize: 'clamp(15px,2vw,18px)',
            color: 'rgba(255,255,255,0.72)',
            margin: '0 0 40px',
            lineHeight: 1.7,
            maxWidth: 540,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Svallos läsare är inte på väg att planera en skärgårdsresa — de håller just på med det nu. {S.monthlyReaders} aktiva planerare besöker sajten i månaden. {S.subscribers} prenumeranter öppnar nyhetsbrevet med {S.openRate} frekvens.
          </p>

          {/* Hero-stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
            {[
              { v: S.monthlyReaders, l: 'månatliga läsare' },
              { v: S.subscribers,    l: 'prenumeranter' },
              { v: S.openRate,       l: 'öppningsgrad NB' },
              { v: S.clickRate,      l: 'klickfrekvens NB' },
              { v: S.islands,        l: 'öprofiler' },
              { v: S.guides,         l: 'guider' },
            ].map(({ v, l }) => (
              <div key={l} style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 12,
                padding: '12px 20px',
                textAlign: 'center',
                minWidth: 100,
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{v}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.52)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          <a
            href="mailto:hej@svalla.se?subject=Partnerförfrågan%20Svalla"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#fff',
              color: '#0d3f5a',
              borderRadius: 12,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '-0.01em',
            }}
          >
            Kontakta oss om samarbete →
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 20px' }}>

        {/* ── Varför Svalla — intentbaserad räckvidd ── */}
        <section style={{ padding: '60px 0 52px' }}>
          <div style={{ maxWidth: 680 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 14px' }}>
              Det är stor skillnad på räckvidd och intention
            </h2>
            <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.75, margin: '0 0 14px' }}>
              Sociala medier säljer räckvidd. Svalla säljer intention. Vår läsare befinner sig mitt i en aktiv planeringsprocess — hon har redan bestämt sig för att åka till skärgården i sommar, hon vet bara inte exakt till vilken ö, vilket värdshus eller vilken aktivitet.
            </p>
            <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.75, margin: 0 }}>
              Det är en av de dyraste positionerna att köpa via Google Ads. Via Svalla är det en av de billigaste — med ett naturligt sammanhang ingen annons kan replikera.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, marginTop: 36 }}>
            {[
              {
                emoji: '🎯',
                title: 'Djup nisch, noll spill',
                text: 'Alla {S.monthlyReaders} läsare är aktivt intresserade av hav och kust. Du betalar inte för irrelevanta visningar.'.replace('{S.monthlyReaders}', S.monthlyReaders),
              },
              {
                emoji: '📊',
                title: `${S.openRate} öppningsgrad`,
                text: `Branschsnittet för resenyheter är 22 %. Svallanyheter levererar ${S.openRate}. Ditt meddelande läses faktiskt.`,
              },
              {
                emoji: '🔒',
                title: 'Inga programmatiska annonser',
                text: 'Aldrig. Varje samarbete är manuellt paketerat och kontextuellt placerat. Inga reklambannrar, inga pop-ups.',
              },
              {
                emoji: '📈',
                title: 'Tidigt partnerskap lönar sig',
                text: `Vi är på väg mot ${S.targetSubscribers} prenumeranter till ${S.targetDate}. Partners som kommer in tidigt låser in priset och bygger kännedom med oss.`,
              },
            ].map(({ emoji, title, text }) => (
              <div key={title} style={{
                background: 'var(--white)',
                borderRadius: 14,
                padding: '20px 20px 18px',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)', marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Målgrupp ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>Vår läsare</h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 600 }}>
            Inte en bred "outdoor"-publik. En specifik person: bosatt i Stockholm eller Göteborg, 28–55 år, har bestämt sig för att skärgård är årets semester, och är nu i aktiv research-fas.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{
              background: 'var(--white)',
              borderRadius: 16,
              padding: '24px',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              gridColumn: 'span 2',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
                {[
                  { label: 'Ålder', value: '28–55 år', sub: 'Etablerade med ekonomisk frihet' },
                  { label: 'Hemort', value: 'Stockholm 68 %', sub: 'Göteborg, Malmö, Uppsala' },
                  { label: 'Kön', value: '54 % kvinnor', sub: 'Ovanligt jämn för nisch' },
                  { label: 'Planeringstid', value: '4–8 veckor', sub: 'Före planerad resa' },
                  { label: 'Enhet', value: '71 % mobil', sub: 'Läser morgon + kväll' },
                  { label: 'Återbesök', value: '3,4×/säsong', sub: 'Per aktiv sommarsäsong' },
                ].map(({ label, value, sub }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--sea)', marginBottom: 3 }}>{value}</div>
                    <div style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.4 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Säsongskalender */}
          <div style={{ marginTop: 14 }}>
            <div style={{
              background: 'var(--white)',
              borderRadius: 16,
              padding: '22px 24px',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--txt)', marginBottom: 14 }}>Trafikprofil per månad — när dina pengar arbetar hårdast</div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 56 }}>
                {[
                  { m: 'Jan', h: 18, hot: false },
                  { m: 'Feb', h: 20, hot: false },
                  { m: 'Mar', h: 30, hot: false },
                  { m: 'Apr', h: 52, hot: false },
                  { m: 'Maj', h: 78, hot: false },
                  { m: 'Jun', h: 95, hot: true },
                  { m: 'Jul', h: 100, hot: true },
                  { m: 'Aug', h: 92, hot: true },
                  { m: 'Sep', h: 74, hot: true },
                  { m: 'Okt', h: 44, hot: false },
                  { m: 'Nov', h: 22, hot: false },
                  { m: 'Dec', h: 16, hot: false },
                ].map(({ m, h, hot }) => (
                  <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: '100%',
                      height: `${(h / 100) * 48}px`,
                      background: hot
                        ? 'linear-gradient(180deg, #0a7b8c, #1e5c82)'
                        : 'rgba(0,0,0,0.08)',
                      borderRadius: 4,
                    }} />
                    <div style={{ fontSize: 9, color: hot ? 'var(--sea)' : 'var(--txt3)', fontWeight: hot ? 700 : 400 }}>{m}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--txt3)' }}>
                <span style={{ display: 'inline-block', width: 10, height: 10, background: 'linear-gradient(135deg,#0a7b8c,#1e5c82)', borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }} />
                Högtrafik (juni–september) — optimalt fönster för annonsering
              </div>
            </div>
          </div>
        </section>

        {/* ── Samarbetsformer ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 6px' }}>Samarbetsformer</h2>
          <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 32px' }}>Alla priser exkl. moms. Rabatt vid återkommande bokningar.</p>

          {/* Paket */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 20 }}>
            {[
              {
                emoji: '📬',
                name: 'Nyhetsbrevssponsor',
                tagline: 'Exklusiv plats i Svallanyheter varannan tisdag',
                price: 'från 2 500 kr',
                period: 'per utskick',
                highlight: false,
                badge: null,
                bullets: [
                  'Max 1 sponsor per utskick — aldrig konkurrens',
                  'Dedikerat avsnitt med din text + bild + länk',
                  'UTM-tracking på alla klick',
                  'Redaktionen kvalitetsgranskar texten',
                  'Rapport med öppningar, klick och konvertering',
                ],
                note: 'Bäst för: värdshus, aktörer och upplevelsebolag som vill driva bokningar under högsäsong.',
              },
              {
                emoji: '✏️',
                name: 'Redaktionellt samarbete',
                tagline: 'Djupguide eller destinationsartikel skriven av Svalla',
                price: 'från 5 500 kr',
                period: 'per artikel',
                highlight: true,
                badge: 'Mest populärt',
                bullets: [
                  'Skriven av Svallas redaktion — inte av en copywriter',
                  'SEO-optimerad och permanent på svalla.se',
                  'Distribution i Svallanyheter + sociala kanaler',
                  'Märkt som "redaktionellt samarbete"',
                  'Uppdateras löpande om fakta förändras',
                ],
                note: 'Bäst för: destinationer, aktörer med en komplex produkt och varumärken som vill bygga förtroende.',
              },
              {
                emoji: '🏝',
                name: 'Destinationspartner',
                tagline: 'Löpande synlighet under hela säsongen',
                price: 'från 12 000 kr',
                period: 'per kvartal',
                highlight: false,
                badge: null,
                bullets: [
                  'Exponering i relevanta öprofiler + guider i 3 månader',
                  'Inkl. 2 nyhetsbrevsfönster per kvartal',
                  'Löpande uppdatering av öppettider och erbjudanden',
                  'Logotyp i partnersektion på svalla.se',
                  'Månatlig klick- och räckviddsrapport',
                ],
                note: 'Bäst för: värdshus, hotell, destinationsbolag och regionala aktörer som vill synas hela säsongen.',
              },
            ].map(pkg => (
              <div key={pkg.name} style={{
                background: pkg.highlight ? 'linear-gradient(155deg, #0d3f5a 0%, #1e5c82 60%, #1a6b7a 100%)' : 'var(--white)',
                borderRadius: 20,
                padding: '26px 24px 22px',
                border: pkg.highlight ? 'none' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: pkg.highlight ? '0 12px 40px rgba(13,63,90,0.28)' : '0 2px 14px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>
                {pkg.badge && (
                  <div style={{
                    position: 'absolute',
                    top: -11,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#f5a623',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 800,
                    padding: '3px 14px',
                    borderRadius: 999,
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>{pkg.badge}</div>
                )}
                <div style={{ fontSize: 26, marginBottom: 12 }}>{pkg.emoji}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: pkg.highlight ? '#fff' : 'var(--txt)', marginBottom: 5 }}>{pkg.name}</div>
                <p style={{ fontSize: 13, color: pkg.highlight ? 'rgba(255,255,255,0.65)' : 'var(--txt3)', margin: '0 0 18px', lineHeight: 1.55 }}>{pkg.tagline}</p>

                <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
                  {pkg.bullets.map((b, i) => (
                    <li key={i} style={{
                      fontSize: 13,
                      color: pkg.highlight ? 'rgba(255,255,255,0.82)' : 'var(--txt2)',
                      lineHeight: 1.6,
                      marginBottom: 7,
                      paddingLeft: 18,
                      position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: pkg.highlight ? '#7dd3c8' : '#0a7b8c', fontWeight: 700 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <p style={{ fontSize: 12, color: pkg.highlight ? 'rgba(255,255,255,0.45)' : 'var(--txt3)', fontStyle: 'italic', margin: '0 0 20px', lineHeight: 1.5, marginTop: 'auto' }}>
                  {pkg.note}
                </p>

                <div style={{ borderTop: `1px solid ${pkg.highlight ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`, paddingTop: 18 }}>
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: pkg.highlight ? '#fff' : 'var(--sea)' }}>{pkg.price}</span>
                    <span style={{ fontSize: 13, color: pkg.highlight ? 'rgba(255,255,255,0.45)' : 'var(--txt3)', marginLeft: 6 }}>{pkg.period}</span>
                  </div>
                  <a
                    href={`mailto:hej@svalla.se?subject=${encodeURIComponent(`Partnerförfrågan: ${pkg.name}`)}&body=${encodeURIComponent(`Hej!\n\nJag är intresserad av "${pkg.name}" på Svalla.\n\nVår verksamhet:\n\nVad vi vill uppnå:\n\n`)}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '12px 20px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 700,
                      background: pkg.highlight ? 'rgba(255,255,255,0.13)' : 'rgba(10,123,140,0.07)',
                      color: pkg.highlight ? '#fff' : '#0a7b8c',
                      border: `1px solid ${pkg.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(10,123,140,0.16)'}`,
                    }}
                  >
                    Skicka förfrågan →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: 'var(--txt3)', textAlign: 'center' }}>
            Behöver du ett skräddarsytt upplägg? Maila oss — vi löser det.
          </p>
        </section>

        {/* ── Så här fungerar det ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>Så här fungerar ett samarbete</h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 560 }}>
            Vi vill att processen ska vara enkel och transparent — inga långa avtal, ingen jakt på godkännanden.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, position: 'relative' }}>
            {[
              { step: '01', title: 'Kontakta oss', text: 'Maila hej@svalla.se med en kort beskrivning av din verksamhet och vad du vill uppnå. Vi svarar inom 48 timmar.' },
              { step: '02', title: 'Vi tar ett samtal', text: 'En kort genomgång (30 min, video eller telefon) där vi förstår din publik och diskuterar vilket upplägg som passar bäst.' },
              { step: '03', title: 'Vi levererar', text: 'Du godkänner innehållet innan det publiceras. Vi levererar rapport med klick och räckvidd efteråt.' },
            ].map(({ step, title, text }, i) => (
              <div key={step} style={{
                background: 'var(--white)',
                borderRadius: i === 0 ? '14px 0 0 14px' : i === 2 ? '0 14px 14px 0' : 0,
                padding: '24px 22px',
                border: '1px solid rgba(0,0,0,0.08)',
                borderLeft: i > 0 ? 'none' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0a7b8c', letterSpacing: '1px', marginBottom: 10 }}>STEG {step}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--txt)', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Nyhetsbrevsmock ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>Vad ett nyhetsbrevssponsrat avsnitt ser ut som</h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 560 }}>
            Sponsorblocket ser ut som redaktionellt innehåll — för att det är det. Vi skriver texten, du godkänner den.
          </p>

          {/* Mock email card */}
          <div style={{
            background: 'var(--white)',
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.09)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            maxWidth: 560,
          }}>
            {/* Email header */}
            <div style={{
              background: 'linear-gradient(135deg, #0d3a5c, #1e5c82, #0a7b8c)',
              padding: '20px 24px 16px',
            }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 3 }}>Svallanyheter</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Tisdag 12 aug 2026 · {S.subscribers} prenumeranter</div>
            </div>

            {/* Email body */}
            <div style={{ padding: '22px 24px' }}>
              {/* Redaktionellt avsnitt */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt3)', marginBottom: 8 }}>Veckans ö — Utö</div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: '0 0 8px' }}>
                  September är Utös bästa månad. Havet är fortfarande 19°C, restaurangen är öppen och du kan faktiskt gå iland utan att köa...
                </p>
                <a href="#" style={{ fontSize: 13, fontWeight: 700, color: '#0a7b8c', textDecoration: 'none' }}>Läs Utö-guiden →</a>
              </div>

              {/* Sponsorblocket */}
              <div style={{
                background: 'rgba(10,123,140,0.04)',
                border: '1px solid rgba(10,123,140,0.12)',
                borderRadius: 10,
                padding: '16px 18px',
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
                  I samarbete med Utö Värdshus
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #0d3f5a, #1a6b7a)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}>🏝</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 5 }}>Sensommar på Utö — 20 % rabatt i september</div>
                    <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 8px' }}>
                      Utö Värdshus tar emot gäster till och med 5 oktober. Boka september-vistelse och få 20 % rabatt på boende, exkl. midsommarhelgen.
                    </p>
                    <a href="#" style={{ fontSize: 13, fontWeight: 700, color: '#0a7b8c', textDecoration: 'none' }}>Se erbjudandet →</a>
                  </div>
                </div>
              </div>

              {/* Redaktionellt fortsätter */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt3)', marginBottom: 8 }}>Veckans faktum</div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>
                  Östersjöns ytvattentemperatur toppar i mitten av augusti, men håller kvar värmen till slutet av september...
                </p>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.025)', padding: '12px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 11, color: 'var(--txt3)' }}>Avregistrera · Om nyhetsbrevet · svalla.se</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 12 }}>
            Exempelmock — det faktiska innehållet skräddarsys till din verksamhet.
          </p>
        </section>

        {/* ── Redaktionell integritet ── */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(10,123,140,0.05), rgba(30,92,130,0.05))',
          border: '1px solid rgba(10,123,140,0.13)',
          borderRadius: 18,
          padding: '28px 32px',
          marginBottom: 60,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--sea)', margin: '0 0 12px' }}>
            Vår redaktionella integritet — det är därför din annons fungerar
          </h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.75, margin: '0 0 14px', maxWidth: 680 }}>
            Svalla har aldrig haft programmatiska annonser. Vi har inga planer på det. Läsarnas förtroende är det enda vi egentligen säljer, och det tar år att bygga och sekunder att förstöra.
          </p>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.75, margin: 0, maxWidth: 680 }}>
            Det innebär att kommersiella samarbeten alltid märks tydligt. Det innebär att vi aldrig tar emot betalning för att påverka redaktionell bedömning. Och det innebär att om ett samarbete inte funkar ihop med vår publik — tackar vi nej. Det är inte en risk för dig som väljer att arbeta med oss. Det är en garanti.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 28px' }}>Vanliga frågor</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              {
                q: 'Hur lång framförhållning behövs?',
                a: 'För nyhetsbrevssponsor: minst 10 arbetsdagar. För redaktionellt samarbete: 3–4 veckor. Destinationspartnerskap planeras kvartalsvis — boka gärna i januari–februari för sommarsäsongen.',
              },
              {
                q: 'Kan jag se texten innan den publiceras?',
                a: 'Alltid. Du och vi granskar texten gemensamt, och du kan begära justeringar av fakta. Tonen och redaktionella omdömet behåller vi — det är det som gör att det fungerar.',
              },
              {
                q: 'Vad mäter ni och hur rapporterar ni?',
                a: 'Nyhetsbrev: öppningar, klick, klickfrekvens och (vid GA4-integration) konverteringar. Artikel: sidvisningar, genomsnittlig lästid, klick på externa länkar. Rapport levereras inom 7 dagar efter publicering.',
              },
              {
                q: 'Tar ni kategoriserade samarbeten — t.ex. bara ett värdshus per kvartal?',
                a: 'Vi undviker direkta konkurrenter i samma utskick. Det innebär att vi aldrig kan ha Utö Värdshus och Grinda Wärdshus i samma nyhetsbrev. Däremot kan ett värdshus och ett kajaksällskap samexistera utan problem.',
              },
              {
                q: 'Fungerar annonsering på Svalla om vi inte är i Stockholms skärgård?',
                a: `Ja — 32 % av vår publik är utanför Stockholm. Vi har starka läsarsegment för Bohuslän, Gotland och Öland. Om du är aktör i Bohuslän, t.ex. en kräftskive-restaurang i Grebbestad, kan vi rikta nyhetsbrevet mot den publiken.`,
              },
              {
                q: 'Kan man köpa enstaka artiklar utan abonnemang?',
                a: 'Ja — redaktionellt samarbete och nyhetsbrevssponsor säljs per styck. Destinationspartner är kvartalsbundet men kan sägas upp efter ett kvartal.',
              },
            ].map(({ q, a }, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                borderRadius: 12,
                padding: '20px 22px',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 8 }}>{q}</div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          textAlign: 'center',
          background: 'linear-gradient(155deg, #091e2e, #0d3f5a)',
          borderRadius: 22,
          padding: '48px 32px 44px',
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', lineHeight: 1.25 }}>
            Redo att nå Sveriges mest<br />engagerade skärgårdsläsare?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', margin: '0 0 32px', lineHeight: 1.65 }}>
            Berätta om din verksamhet och vad du vill uppnå. Vi svarar normalt inom 48 timmar.
          </p>
          <a
            href="mailto:hej@svalla.se?subject=Partnerförfrågan%20Svalla&body=Hej!%0A%0AJag%20är%20intresserad%20av%20ett%20samarbete%20med%20Svalla.%0A%0AVår%20verksamhet%3A%0A%0AVad%20vi%20vill%20uppnå%3A%0A%0A"
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              background: '#fff',
              color: '#0d3f5a',
              borderRadius: 12,
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 800,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              letterSpacing: '-0.01em',
            }}
          >
            Maila hej@svalla.se →
          </a>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 16 }}>
            Vi svarar normalt inom 48 timmar på vardagar.
          </p>
        </section>

        {/* Fotnot */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
            Vill du se vad Svallanyheter innehåller innan du bestämmer dig?{' '}
            <Link href="/nyhetsbrev" style={{ color: 'var(--sea)', textDecoration: 'underline' }}>
              Prenumerera gratis →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
