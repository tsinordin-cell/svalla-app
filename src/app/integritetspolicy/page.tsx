import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import PublicFooter from '@/components/PublicFooter'
import { operatorRad } from '@/lib/villkor'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description: 'Hur Svalla hanterar dina personuppgifter i enlighet med GDPR.',
  alternates: { canonical: 'https://svalla.se/integritetspolicy' },
}

export default function IntegritetspolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SidHuvud />
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '60px 20px 32px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Integritetspolicy</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Senast uppdaterad: november 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        <article style={{ background: 'var(--white)', borderRadius: 16, padding: '36px 32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15 }}>

          <h2 style={{ color: 'var(--txt)', fontSize: 18, marginTop: 0 }}>1. Personuppgiftsansvarig</h2>
          <p>Svalla (svalla.se) är personuppgiftsansvarig för behandlingen av dina personuppgifter. Kontakta oss på <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a> vid frågor.</p>
          {operatorRad() && <p>{operatorRad()}</p>}

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>2. Vilka uppgifter vi samlar in</h2>
          <p>Vi samlar in följande uppgifter när du skapar ett konto eller använder Svalla:</p>
          <ul>
            <li><strong>Kontouppgifter:</strong> e-postadress och användarnamn</li>
            <li><strong>Profilinformation:</strong> valfri profilbild och kortbiografi</li>
            <li><strong>Aktivitetsdata:</strong> loggade turer, sparade platser, kommentarer och gillningar</li>
            <li><strong>Tekniska uppgifter:</strong> IP-adress, webbläsartyp och sessionscookies (för säker inloggning)</li>
            <li><strong>Platsdata:</strong> om du aktivt väljer att dela din position för GPS-funktionen</li>
            <li><strong>Nyhetsbrev:</strong> din e-postadress, om du själv har valt att prenumerera på vårt nyhetsbrev, vilket formulär du anmälde dig via och, om du själv svarat på frågan, om du har båt, fritidshus eller åker ut över dagen</li>
          </ul>

          <h3 style={{ color: 'var(--txt)', fontSize: 16 }}>Direktmeddelanden</h3>
          <p>När du skriver till någon i Svalla sparar vi det du skickar: text, bilder, positioner och turer som du delar, när meddelandet skickades och vilka som är med i samtalet. Bara de som är med i samtalet kan läsa meddelandena i appen, med ett undantag: Svallas administratörer ser det som har anmälts, se nedan. De krypteras på vägen och där de lagras, men inte från ände till ände. Vi läser inte dina meddelanden, utom när någon har anmält ett meddelande eller en användare.</p>
          <ul>
            <li><strong>Bilder:</strong> innan en bild skickas tar appen bort platsdata och annan dold information ur filen. Bilderna ligger i en privat lagring som bara de som är med i samtalet kommer åt.</li>
            <li><strong>Position:</strong> delar du din position skickas din exakta plats, och du får bekräfta först. För att visa ett platsnamn i stället för koordinater skickar din enhet koordinaterna till OpenStreetMaps tjänst Nominatim, som då också ser din IP-adress.</li>
            <li><strong>Anmälningar:</strong> anmäler du ett meddelande eller en användare får Svallas administratörer se det anmälda meddelandet och upp till tio meddelanden före det, för att kunna granska ärendet. Underlaget, även en anmäld bild, finns kvar om meddelandet, samtalet eller den anmäldas konto raderas, och raderas sex månader efter att ärendet är avslutat. Raderar den som anmälde sitt konto tas anmälan bort.</li>
          </ul>

          <h3 style={{ color: 'var(--txt)', fontSize: 16 }}>Hantverkare och företag på öarna</h3>
          <p>På ösidorna listar vi hantverkare och sjötjänster som tar uppdrag på öarna. Vi visar bara yrkesuppgifter som företaget självt har publicerat för att få kunder: firmanamn, yrke, var företaget finns, vilka öar det tar uppdrag på, telefonnummer, e-postadress och webbplats. Varje uppgift visas med källa och det datum vi läste den. För enskilda firmor kan uppgifterna vara personuppgifter.</p>
          <p>Syftet är att boende och fritidshusägare på öar utan fast vägförbindelse ska hitta hantverkare, och att hantverkarna ska hittas av dem. Vi behandlar uppgifterna med stöd av berättigat intresse. Företag som listas får besked från oss. Vill du ändra något eller inte vara med alls skriver du till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a>, så tar vi bort uppgifterna utan att fråga varför. Uppgifter som inte kontrollerats på tolv månader kontrolleras igen eller tas bort.</p>
          <h3 style={{ color: 'var(--txt)', fontSize: 16 }}>Krogar, hamnar och andra verksamheter</h3>
          <p>På ösidorna och platssidorna visar vi verksamheters namn, adress, telefonnummer, e-post, webbplats och öppettider, så som verksamheten själv har publicerat dem. Driver du en verksamhet som finns på Svalla och vill ändra eller ta bort något skriver du till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a>, så gör vi det.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>3. Hur vi använder dina uppgifter</h2>
          <p>Dina uppgifter används för att:</p>
          <ul>
            <li>Tillhandahålla och förbättra Svallas tjänster</li>
            <li>Möjliggöra inloggning och kontosäkerhet</li>
            <li>Visa dina loggade turer och sparade platser</li>
            <li>Skicka pushnotiser om du valt att aktivera dessa</li>
            <li>Skicka nyhetsbrevet till dig som har valt att prenumerera. Att ha ett konto räcker inte för att få nyhetsbrevet, du väljer det själv. Varje brev har en länk där du avregistrerar dig</li>
            <li>Skicka julkalenderns påminnelse, ett mejl per dag 1 till 24 december, till dig som själv har kryssat i det på julkalendersidan. Du stänger av den där eller via länken i mejlet</li>
            <li>Analysera anonym användningsstatistik för att förbättra appen</li>
          </ul>
          <p>Vi säljer aldrig dina personuppgifter till tredje part.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>4. Rättslig grund</h2>
          <p>Behandlingen sker med stöd av <strong>avtalsuppfyllelse</strong> (kontouppgifter, aktivitetsdata), <strong>berättigat intresse</strong> (förbättring av tjänsten via anonym statistik, listan över hantverkare och företag på öarna, och granskning av anmälda meddelanden och användare för att hålla Svalla tryggt) och <strong>samtycke</strong> (nyhetsbrevet och julkalenderns påminnelse, som du kan återkalla när som helst genom att avregistrera dig eller stänga av påminnelsen) i enlighet med GDPR artikel 6.</p>

          <h2 style={{ color: 'var(--txt)', fontSize: 18 }}>5. Lagring och säkerhet</h2>
          <p>Dina uppgifter lagras säkert hos Supabase (EU-region) med kryptering i transit och vila. Vi behåller kontouppgifter tills du väljer att radera ditt konto.</p>
          <p>Direktmeddelanden sparas tills du raderar dem. Raderar du ett meddelande försvinner det för alla i samtalet. När både du och den du skriver med har raderat ett samtal tas det bort helt, med alla meddelanden och bilder. Raderar du ditt konto raderas dina meddelanden och bilder. Det som har anmälts sparas som underlag enligt avsnitt 2. Raderade uppgifter kan ligga kvar i våra säkerhetskopior i upp till fem veckor, sedan försvinner de därifrån också.</p>

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
      <PublicFooter />
    </div>
  )
}
