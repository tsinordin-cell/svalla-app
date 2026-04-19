import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'

export const metadata: Metadata = {
  title: 'Om Svalla – Stockholms skärgårdsapp',
  description: 'Svalla är byggt för dig som älskar Stockholms skärgård. Hitta krogar, planera turer och logga dina äventyr på öarna.',
  openGraph: {
    title: 'Om Svalla',
    description: 'Byggt av skärgårdsälskare, för skärgårdsälskare.',
    url: 'https://svalla.se/om',
  },
}

export default function OmPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f7fbfc)', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '60px 20px 40px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>Om Svalla</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Byggt av skärgårdsälskare, för skärgårdsälskare</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: 'var(--white, #fff)', borderRadius: 16, padding: '36px 32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', lineHeight: 1.75, color: 'var(--txt2, #2a4a5a)', fontSize: 15 }}>
          <h2 style={{ color: 'var(--txt, #162d3a)', fontSize: 20, marginTop: 0 }}>Vad är Svalla?</h2>
          <p>
            Svalla är en web-app för Stockholms skärgård – byggd för dig som tar dig ut med kajak, segelbåt, motorbåt eller färja och vill ha koll på vad som finns längs vägen.
          </p>
          <p>
            Kartan täcker hela Stockholms skärgård: från Fjäderholmarna i innerskärgården till Landsort i söder. Restauranger, caféer, gästhamnar, bränsleställen, vandrarhem och naturhamnar – allt på ett ställe.
          </p>

          <h2 style={{ color: 'var(--txt, #162d3a)', fontSize: 20 }}>Varför vi byggde det</h2>
          <p>
            Vi tröttnade på att söka i fem olika appar för att hitta en öppen krog på Möja ett sommarkvällat. Google Maps saknar hälften, Tripadvisor har gamla data och sjökorten säger ingenting om mat.
          </p>
          <p>
            Svalla samlar det som faktiskt spelar roll för den som är ute i skärgården – med öppettider, insidertips och äkta koordinater på rätt ö.
          </p>

          <h2 style={{ color: 'var(--txt, #162d3a)', fontSize: 20 }}>Kontakt</h2>
          <p>
            Frågor, platstips eller samarbeten?{' '}
            <a href="mailto:info@svalla.se" style={{ color: '#1e5c82', fontWeight: 700 }}>info@svalla.se</a>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Link href="/platser" style={{
            padding: '12px 24px', background: '#1e5c82', color: '#fff',
            borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>Utforska kartan</Link>
          <Link href="/faq" style={{
            padding: '12px 24px', background: 'var(--white, #fff)', color: '#1e5c82',
            borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            border: '1.5px solid #1e5c82',
          }}>Vanliga frågor</Link>
        </div>
      </div>
    </div>
  )
}
