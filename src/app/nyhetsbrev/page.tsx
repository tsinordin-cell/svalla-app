import type { Metadata } from 'next'
import Link from 'next/link'
import EmailSignup from '@/components/EmailSignup'

// OMSKRIVEN 2026-09-21. Sidan lovade "varannan tisdag" och visade ett "utdrag ur
// utgåva #1 — skickas 12 aug 2026" samt "Nästa brev skickas Tisdag 12 aug 2026".
// MÄTT: email_log innehåller bara välkomst- och påminnelsemejl; inget nyhetsbrev
// har skickats. Smakprovet innehöll dessutom obelagda uppgifter (vattentemperatur,
// stängningsdatum, en avgångstid från Stavsnäs). Sidan lovar nu bara det som
// stämmer: vad brevet handlar om, inga annonser, avregistrering när man vill.

export const metadata: Metadata = {
  title: 'Svallanyheter – nyhetsbrevet om skärgården',
  description: 'Nya guider, säsongsstarter och ändringar som påverkar turen ut – när det händer något. Gratis, inga annonser.',
  alternates: { canonical: 'https://svalla.se/nyhetsbrev' },
}

const INNEHALL = [
  { t: 'Säsongen drar igång', d: 'När krogar, gästhamnar och sommarlinjer öppnar – med länk till den som driver dem.' },
  { t: 'Nya och uppdaterade guider', d: 'Öar, badplatser och färdvägar, med källan angiven för varje uppgift.' },
  { t: 'Ändringar som påverkar resan', d: 'Nya tidtabeller och linjer som flyttas, så att du inte står på fel brygga.' },
]

export default function NyhetsbrevPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <div style={{ background: 'linear-gradient(160deg, #0d3f5a 0%, #1e5c82 50%, #2d7d8a 100%)', padding: '72px 20px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
            Svallanyheter
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', lineHeight: 1.2, textWrap: 'balance' }}>
            Skärgården i inkorgen – när det händer något
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', margin: '0 auto 36px', lineHeight: 1.6, maxWidth: 480 }}>
            Nya guider, säsongsstarter och ändringar som påverkar turen ut. Gratis och utan annonser.
          </p>
          <div style={{ maxWidth: 440, margin: '0 auto' }}>
            <EmailSignup variant="inline" source="nyhetsbrev-page-hero" title="" description="" buttonLabel="Prenumerera" />
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 12 }}>
            Avregistrera dig när du vill.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '56px 20px 0' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 20px' }}>Det här skriver vi om</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          {INNEHALL.map(({ t, d }) => (
            <div key={t} style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid rgba(30,92,130,0.12)', padding: '18px 20px' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>{t}</div>
              <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.75, margin: '24px 0 0' }}>
          Svallanyheter är nytt. Vi skickar när vi har något som är värt din tid, inte för att fylla ett schema.
        </p>
      </div>

      <div style={{ maxWidth: 520, margin: '56px auto 0', padding: '0 20px' }}>
        <EmailSignup
          variant="card"
          source="nyhetsbrev-page-bottom"
          title="Prenumerera på Svallanyheter"
          description="Gratis, inga annonser. Avregistrera när du vill."
          buttonLabel="Prenumerera"
        />
      </div>

      <div style={{ textAlign: 'center', padding: '48px 20px 64px' }}>
        <Link href="/guider" style={{ color: 'var(--sea)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
          Läs guiderna
        </Link>
        <span style={{ margin: '0 12px', color: 'var(--txt3)' }}>·</span>
        <Link href="/" style={{ color: 'var(--sea)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
          Utforska Svalla
        </Link>
      </div>
    </div>
  )
}
