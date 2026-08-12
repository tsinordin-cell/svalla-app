import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thorkel – AI-planeraren för skärgården',
  description: 'Planera din perfekta skärgårdsdag med AI. Thorkel hittar rätt ö, rätt båt och rätt restaurang på sekunder — inklusive Waxholmsbolagets tidtabeller. Ingen båt krävs.',
  keywords: [
    'ai planerare skärgård',
    'planera skärgårdsdag ai',
    'thorkel svalla',
    'ai archipelago planner sweden',
    'plan stockholm archipelago ai',
    'chatgpt skärgård',
    'ai guide stockholms skärgård',
    'planera dagstur skärgård',
    'waxholmsbolaget planerare',
  ],
  alternates: { canonical: 'https://svalla.se/ai-guide' },
  openGraph: {
    title: 'Thorkel – AI-planeraren för skärgården',
    description: 'Berätta vad du är sugen på. Thorkel fixar färjor, mat, bad och dolda pärlor. Klar plan på sekunder.',
    url: 'https://svalla.se/ai-guide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thorkel – AI-planeraren för skärgården',
    description: 'Berätta vad du är sugen på. Thorkel fixar färjor, mat, bad och dolda pärlor. Klar plan på sekunder.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vad är Thorkel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thorkel är Svallas AI-planerare för svenska skärgårdsresor. Du berättar vad du vill göra — bad, lunch, bastu, vandring — och Thorkel skapar en komplett dagsplan med rätt ö, rätt båt och rätt restaurang. Inga förkunskaper om skärgården krävs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Behöver man en egen båt för att använda Thorkel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolut inte. Thorkel är byggt för alla — oavsett om du tar Waxholmsbolaget, Cinderellabåten, SL-båt eller har en egen segelbåt. Thorkel hämtar aktuella avgångstider och planerar din resa med kollektivtrafik som standard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur fungerar Thorkel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Berätta vad du är sugen på — "vi är 4 vuxna, vill ha bra lunch och ett dopp, helst inte för lång båtresa" — och Thorkel väljer rätt ö, visar nästa avgång med Waxholmsbolaget och föreslår specifika restauranger med öppettider. Hela planen klar på under 30 sekunder.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vilka öar kan Thorkel planera resor till?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thorkel täcker 120+ öar i hela Sverige — Stockholms skärgård (Sandhamn, Grinda, Utö, Vaxholm, Finnhamn med flera), Bohuslän, Göteborgs södra skärgård, Gotland, Öland och Höga Kusten. Svalla är inte bara för stockholmare.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kostar Thorkel pengar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Grundfunktionerna är gratis. Du kan planera en komplett dagstur med Thorkel utan att betala något. Svalla följer en freemium-modell — som Strava, fast för skärgårdslivet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad skiljer Thorkel från ChatGPT eller Google Maps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT och Google Maps saknar aktuella avgångstider för Waxholmsbolaget, vet inte vilka krogar som faktiskt är öppna just nu, och har inte 200+ kuraterade platser i den svenska skärgården. Thorkel är specialiserad på exakt det.',
      },
    },
  ],
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Thorkel – AI-planeraren för skärgården',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'SEK' },
  description: 'AI-driven planerare för svenska skärgårdsresor. Genererar kompletta dagsplaner med färjetider, restauranger och aktiviteter.',
  url: 'https://svalla.se/planera',
  publisher: { '@type': 'Organization', name: 'Svalla', url: 'https://svalla.se' },
}

export default function AIGuidePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 80px) 24px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 999, padding: '6px 16px', marginBottom: 24,
            fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            AI-planeraren för skärgården
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.08, margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}>
            Thorkel planerar din<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #f0a866, #e8924a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              perfekta skärgårdsdag
            </em>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, margin: '0 auto 32px', maxWidth: 560 }}>
            Berätta vad du är sugen på. Thorkel väljer rätt ö, hittar rätt båt och bokar rätt restaurang — på sekunder. Ingen båt krävs. Alltid gratis att börja.
          </p>

          <Link href="/planera" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#e8924a', color: '#fff',
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
            padding: '16px 40px', borderRadius: 50,
            boxShadow: '0 8px 30px rgba(232,146,74,0.45)',
          }}>
            Planera med Thorkel →
          </Link>

          <p style={{ marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            Gratis · Ingen registrering krävs · Fungerar offline
          </p>
        </div>
      </div>

      {/* Chatexempel */}
      <div style={{ maxWidth: 760, margin: '-32px auto 0', padding: '0 20px 60px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ background: 'linear-gradient(90deg, #1a4a6b, #0d6e6e)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚓</div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Thorkel</span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>AI-planerare för skärgården</span>
          </div>

          <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
            {[
              { from: 'user', text: 'Vi är 4 vuxna, vill ha bad, bra lunch och inte för lång båtresa. Helst idag.' },
              // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
              { from: 'thorkel', text: 'Perfekt val: Grinda. Waxholmsbåten (linjebåt — ingen båt krävs) från Strömkajen kl 10:15, framme 11:45. Lunch på Grinda Wärdshus (boka nu — fullt på helger). Bad vid naturhamnen på östra sidan, klippor med klart vatten. Båt hem kl 17:20.' },
              { from: 'user', text: 'Finns det en bastu också?' },
              { from: 'thorkel', text: 'Grinda har ingen bastu, men Finnhamn (nästa ö) har en fantastisk havsbastu öppen 14–19. Det är 20 min med lokalbåten — vill du att jag lägger till det i planen?' },
            ].map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', gap: 10, alignItems: 'flex-start' }}>
                {msg.from === 'thorkel' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #1a4a6b, #0d6e6e)', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff' }}>⚓</div>
                )}
                <div style={{
                  maxWidth: '78%',
                  background: msg.from === 'user' ? '#e8924a' : '#f3f4f6',
                  color: msg.from === 'user' ? '#fff' : '#1c2b2e',
                  borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '12px 16px', fontSize: 14, lineHeight: 1.6,
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 20px 20px', textAlign: 'center' }}>
            <Link href="/planera" style={{
              display: 'inline-block', background: '#1a4a6b', color: '#fff',
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
              padding: '12px 32px', borderRadius: 50,
            }}>
              Prova Thorkel gratis →
            </Link>
          </div>
        </div>
      </div>

      {/* Vad Thorkel gör */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 20px 60px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800,
          color: '#1a4a6b', textAlign: 'center', marginBottom: 8,
        }}>
          Vad gör Thorkel som Google Maps inte gör?
        </h2>
        <p style={{ textAlign: 'center', color: '#6b8087', fontSize: 16, marginBottom: 48, maxWidth: 540, margin: '0 auto 48px' }}>
          Google Maps vet var Sandhamn ligger. Thorkel vet vilket bord du ska boka, vilken båt du ska ta och var bastun håller öppet.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {[
            {
              icon: '⛴',
              title: 'Aktuella avgångstider',
              desc: 'Thorkel hämtar tidtabellen för Waxholmsbolaget, Cinderellabåten och Pendelbåten och visar nästa avgång från din hållplats.',
            },
            {
              icon: '🍽',
              title: 'Rätt restaurang, rätt dag',
              desc: 'Öppettider varierar i skärgården. Thorkel vet vilka krogar som faktiskt är öppna idag och om det är kö eller inte.',
            },
            {
              icon: '🏊',
              title: 'Dolda badplatser',
              desc: 'Inte bara strandlistan — Thorkel vet vilken klippa som är skyddad mot vinden, var barnfamiljer badar och var seglarna ankar.',
            },
            {
              icon: '🗺',
              title: 'Helhetsplan på sekunder',
              desc: 'Ingen flik-surfing. Thorkel paketerar hela dagen: avgång, aktivitet, lunch, bad, hemfärd — i ett svar.',
            },
            {
              icon: '👨‍👩‍👧',
              title: 'Anpassad för dig',
              desc: 'Barnfamilj? Seglare? Budget-resenär? Thorkel anpassar planen efter dina förutsättningar — inga generiska listor.',
            },
            {
              icon: '🧭',
              title: '120+ öar, 6 regioner',
              desc: 'Från Fjäderholmarna (20 min från Stockholm) till Göteborgs södra skärgård, Gotland och Höga Kusten. Thorkel kan hela Sverige.',
            },
          ].map((f, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '24px 22px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(26,74,107,0.07)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a4a6b', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6b8087', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exempelplaner */}
      <div style={{ background: '#f0f7f4', padding: '60px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800,
            color: '#1a4a6b', textAlign: 'center', marginBottom: 40,
          }}>
            Exempel: vad kan jag be Thorkel om?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {[
              '"Vi är barnfamilj med 2 barn under 10. Vill ha sandstrand, mjukt vatten och en ok krog. Ingen lång båtresa."',
              '"Jag paddlar kajak och söker en ö att övernatta på med naturhamn och bastu. Budget: låg."',
              '"Vi är 6 seglare som ankrar vid Sandhamn. Bästa krogar för kvällen?"',
              '"Ensam dagstur med tåg från Göteborg — vad kan man se i Bohuslän på en dag?"',
              '"Vad ska man göra på Gotland i september utan eget fordon?"',
              // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
              '"Snabbaste vägen till Utö från Södermalm med SL, med hemfärd senast 18:00."',
            ].map((q, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 14, padding: '18px 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: '1px solid rgba(26,74,107,0.08)',
                fontSize: 14, color: '#1c2b2e', lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                {q}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800,
          color: '#1a4a6b', marginBottom: 32,
        }}>
          Vanliga frågor om Thorkel
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
          {faqSchema.mainEntity.map((faq, i) => (
            <details key={i} style={{
              background: '#fff', borderRadius: 12,
              border: '1px solid rgba(26,74,107,0.08)',
              overflow: 'hidden',
            }}>
              <summary style={{
                padding: '18px 20px', fontWeight: 700, fontSize: 15,
                color: '#1a4a6b', cursor: 'pointer', listStyle: 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {faq.name}
                <span style={{ fontSize: 18, color: '#6b8087', flexShrink: 0 }}>+</span>
              </summary>
              <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#6b8087', lineHeight: 1.7 }}>
                {faq.acceptedAnswer.text}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900,
          color: '#fff', marginBottom: 16,
        }}>
          Redo att prova?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, marginBottom: 32, maxWidth: 420, marginInline: 'auto' }}>
          Thorkel planerar din dag gratis — ingen registrering, ingen app att ladda ner.
        </p>
        <Link href="/planera" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: '#e8924a', color: '#fff',
          fontSize: 16, fontWeight: 700, textDecoration: 'none',
          padding: '16px 44px', borderRadius: 50,
          boxShadow: '0 8px 30px rgba(232,146,74,0.4)',
        }}>
          Planera med Thorkel →
        </Link>
        <p style={{ marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          Eller läs mer om <Link href="/guider" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>våra guider</Link> och <Link href="/o" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>alla öar</Link>
        </p>
      </div>
    </div>
  )
}
