import type { Metadata } from 'next'
import Link from 'next/link'
import EmailSignup from '@/components/EmailSignup'

export const metadata: Metadata = {
  title: 'Svallanyheter – prenumerera på skärgårdsnyhetsbrevet | Svalla',
  description: 'Varannan tisdag: öppna öar, insidertips och säsongsguider direkt i inkorgen. Gratis, inga annonser.',
  alternates: { canonical: 'https://svalla.se/nyhetsbrev' },
}

const SAMPLE = {
  subject: 'September i skärgården – det ingen pratar om',
  date: 'Tisdag 12 aug 2026',
  body: [
    'Från midsommar till slutet av juli är skärgården fullbokad. Kö till morgonbåten, fullsatta gästhamnar och ett halvt Stockholm på samma brygga.',
    'Sedan händer något.',
    'September är den månaden vi helst hade hållit hemlig. Vattentemperaturen är fortfarande 17–19 grader. Gästhamnarna har plats. Restaurangerna tar emot dig utan 45 minuters väntetid. Ljuset är lägre, varmare och längre än det någonsin är i juli.',
  ],
  island: {
    name: 'Möja',
    slug: 'moja',
    tip: 'Möja i september är svårt att slå. Bilfritt, cykelvänligt och med ett lugn som juli-Möja aldrig kan matcha. Möja Krog håller öppet september ut. Ta morgonbåten från Stavsnäs (09:15) och planera lunch på krogen. Du är tillbaka i Stockholm till kvällen.',
  },
  fact: 'Östersjöns ytvattentemperatur är som varmast i mitten av augusti — men värmen håller kvar ända till slutet av september. Vattnet svalnar långsammare än luften.',
  question: 'Har du någonsin besökt skärgården utanför högsäsong? Svara direkt på mailet — vi läser allt.',
}


export default function NyhetsbrevPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0d3f5a 0%, #1e5c82 50%, #2d7d8a 100%)',
        padding: '72px 20px 56px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
            Svallanyheter
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
            Skärgårdsnyhetsbrevet du faktiskt vill läsa
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', margin: '0 0 36px', lineHeight: 1.6, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Varannan tisdag: vilka öar som är öppna, vad som är värt att besöka och tips du inte hittar någon annanstans. Gratis, inga annonser.
          </p>
          <div style={{ maxWidth: 440, margin: '0 auto' }}>
            <EmailSignup
              variant="inline"
              source="nyhetsbrev-page-hero"
              title=""
              description=""
              buttonLabel="Ja, prenumerera gratis →"
            />
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 12 }}>
            Avregistrera dig när du vill. Inga frågor ställs.
          </p>
        </div>
      </div>

      {/* Vad du får */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '56px 20px 0' }}>
        <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 16px' }}>
          Varje brev handlar om <strong style={{ color: 'var(--txt)' }}>vilka öar som faktiskt är öppna just nu</strong> — inte en generell sommarguide utan vad som stämmer den månaden du läser det. Möja Krog stänger i mitten av september. Finnhamn är fullbokat varje lördag i juli men tomt en tisdag i juni. Det är den typen av saker.
        </p>
        <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 16px' }}>
          Varje utgåva har en specifik ö med ett konkret besökstips — inte "Sandhamn är vackert" utan "ta morgonbåten 08:30 från Stavsnäs, hyr cykel vid bryggan och boka bord på Värdshuset till lunch, annars är det fullt".
        </p>
        <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.8, margin: 0 }}>
          Varannan tisdag. Aldrig mer än det.
        </p>
      </div>

      {/* Smakprov */}
      <div style={{ maxWidth: 640, margin: '56px auto 0', padding: '0 20px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
          Så här ser ett brev ut
        </h2>
        <p style={{ color: 'var(--txt2)', fontSize: 14, marginBottom: 24 }}>Utdrag ur utgåva #1 — skickas 12 aug 2026</p>

        <div style={{
          background: 'var(--white)',
          borderRadius: 16,
          border: '1px solid rgba(30,92,130,0.12)',
          overflow: 'hidden',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        }}>
          {/* Email header */}
          <div style={{ background: '#f7f9fb', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '14px 20px' }}>
            <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 4 }}>Från: Svalla &lt;hej@svalla.se&gt;</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>✉ {SAMPLE.subject}</div>
          </div>

          {/* Email body */}
          <div style={{ padding: '28px 28px 24px', fontFamily: 'Georgia, serif' }}>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 14px' }}>Hej,</p>
            {SAMPLE.body.map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 14px' }}>{para}</p>
            ))}

            <div style={{ borderLeft: '3px solid var(--sea)', paddingLeft: 16, margin: '24px 0' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                Veckans ö: {SAMPLE.island.name}
              </div>
              <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.75, margin: 0 }}>
                {SAMPLE.island.tip}
              </p>
            </div>

            <div style={{ background: 'rgba(30,92,130,0.05)', borderRadius: 10, padding: '14px 16px', margin: '20px 0' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sea)', marginBottom: 6 }}>Visste du att…</div>
              <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>{SAMPLE.fact}</p>
            </div>

            <p style={{ fontSize: 14, color: 'var(--txt)', fontStyle: 'italic', lineHeight: 1.7 }}>
              <strong>En fråga till dig:</strong> {SAMPLE.question}
            </p>

            <p style={{ fontSize: 14, color: 'var(--txt2)', marginTop: 24, lineHeight: 1.7 }}>
              Vi ses därute.
            </p>
          </div>
        </div>
      </div>

      {/* CTA ned */}
      <div style={{ maxWidth: 520, margin: '56px auto 0', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 8 }}>
          Redo att hänga med?
        </h2>
        <p style={{ color: 'var(--txt2)', fontSize: 14, marginBottom: 24 }}>
          Nästa brev skickas {SAMPLE.date}.
        </p>
        <EmailSignup
          variant="card"
          source="nyhetsbrev-page-bottom"
          title="Prenumerera på Svallanyheter"
          description="Gratis. Varannan tisdag. Avregistrera när du vill."
          buttonLabel="Prenumerera nu"
        />
      </div>

      {/* Footer-länk tillbaka */}
      <div style={{ textAlign: 'center', padding: '48px 20px 64px' }}>
        <Link href="/blogg" style={{ color: 'var(--sea)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
          ← Tillbaka till bloggen
        </Link>
        <span style={{ margin: '0 12px', color: 'var(--txt3)' }}>·</span>
        <Link href="/" style={{ color: 'var(--sea)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
          Utforska Svalla
        </Link>
      </div>

    </div>
  )
}
