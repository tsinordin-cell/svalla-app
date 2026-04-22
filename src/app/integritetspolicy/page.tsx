import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'

export const metadata: Metadata = {
  title: 'Integritetspolicy – Svalla',
  description: 'Hur Svalla hanterar dina personuppgifter i enlighet med GDPR.',
}

export default function IntegritetspolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '60px 20px 32px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Integritetspolicy</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Senast uppdaterad: april 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        <article style={{ background: 'var(--white)', borderRadius: 16, padding: '36px 32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15 }}>

          <h2 style={{ color: 'var(--txt)', fontSize: 18, marginTop: 0 }}>1. Personuppgiftsansvarig</h2>
          <p>Svalla (svalla.se) är personuppgiftsansvarig för behandlingen av dina personuppgifter. Kontakta oss på <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a> vid frågor.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>2. Vilka uppgifter vi samlar in</h2>
          <p>Vi samlar in följande uppgifter när du skapar ett konto eller använder Svalla:</p>
          <ul>
            <li><strong>Kontouppgifter:</strong> e-postadress och användarnamn</li>
            <li><strong>Profilinformation:</strong> valfri profilbild och kortbiografi</li>
            <li><strong>Aktivitetsdata:</strong> loggade turer, sparade platser, kommentarer och gillningar</li>
            <li><strong>Tekniska uppgifter:</strong> IP-adress, webbläsartyp och sessionscookies (för säker inloggning)</li>
            <li><strong>Platsdata:</strong> om du aktivt väljer att dela din position för GPS-funktionen</li>
          </ul>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>3. Hur vi använder dina uppgifter</h2>
          <p>Dina uppgifter används för att:</p>
          <ul>
            <li>Tillhandahålla och förbättra Svallas tjänster</li>
            <li>Möjliggöra inloggning och kontosäkerhet</li>
            <li>Visa dina loggade turer och sparade platser</li>
            <li>Skicka push-notiser om du valt att aktivera dessa</li>
            <li>Analysera anonym användningsstatistik för att förbättra appen</li>
          </ul>
          <p>Vi säljer aldrig dina personuppgifter till tredje part.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>4. Rättslig grund</h2>
          <p>Behandlingen sker med stöd av <strong>avtalsuppfyllelse</strong> (kontouppgifter, aktivitetsdata) och <strong>berättigat intresse</strong> (förbättring av tjänsten via anonym statistik) i enlighet med GDPR artikel 6.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>5. Lagring och säkerhet</h2>
          <p>Dina uppgifter lagras säkert hos Supabase (EU-region) med kryptering i transit och vila. Vi behåller kontouppgifter tills du väljer att radera ditt konto.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>6. Dina rättigheter</h2>
          <p>Du har rätt att:</p>
          <ul>
            <li>Begära ett utdrag av dina personuppgifter</li>
            <li>Rätta felaktiga uppgifter</li>
            <li>Radera ditt konto och tillhörande data</li>
            <li>Invända mot viss behandling</li>
            <li>Lämna klagomål till <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>Integritetsskyddsmyndigheten (IMY)</a></li>
          </ul>
          <p>Kontakta <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a> för att utöva dina rättigheter.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>7. Cookies</h2>
          <p>Svalla använder nödvändiga sessionscookies för inloggning. Vi använder inga reklam- eller spårningscookies från tredje part.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>8. Kontakt</h2>
          <p>Frågor om vår integritetspolicy? Hör av dig till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a>.</p>

        </article>
      </div>
    </div>
  )
}
