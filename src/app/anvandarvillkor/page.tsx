import type { Metadata } from 'next'
import Link from 'next/link'
import SidHuvud from '@/components/SidHuvud'
import PublicFooter from '@/components/PublicFooter'
import { VILLKOR_VERSION } from '@/lib/villkor'

export const metadata: Metadata = {
  title: 'Användarvillkor',
  description: 'Villkoren för att använda Svalla: konto, innehåll du publicerar, loppis, meddelanden och hur vi modererar.',
  alternates: { canonical: 'https://svalla.se/anvandarvillkor' },
}

const h2: React.CSSProperties = { color: 'var(--txt)', fontSize: 18 }
const lank: React.CSSProperties = { color: 'var(--sea)' }

/**
 * Användarvillkor (2026-11-22). Skrivna utifrån hur Svalla faktiskt fungerar
 * i koden: konto och radering (/profil/installningar/radera,
 * api/account/delete), anmälan och blockering (api/report, api/block,
 * lib/moderation.ts med ordfilter), forum, loppis, meddelanden, AI-guiden.
 * Ändras något väsentligt: höj VILLKOR_VERSION i lib/villkor.ts.
 */
export default function AnvandarvillkorPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SidHuvud />
      <div style={{ background: 'var(--grad-sea-hero)', padding: '60px 20px 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Användarvillkor</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Gäller från {VILLKOR_VERSION}</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        <article style={{ background: 'var(--white)', borderRadius: 16, padding: '36px 32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15 }}>

          <h2 style={{ ...h2, marginTop: 0 }}>1. Om villkoren</h2>
          <p>Svalla (svalla.se och Svalla-appen) är en tjänst om svensk skärgård: öar, hamnar, krogar, båttider, rutter och en gemenskap där du kan logga turer, skriva i forumet, annonsera på loppis och skicka meddelanden. Villkoren gäller när du använder Svalla med ett konto. När du skapar ett konto godkänner du dem.</p>
          <p>Hur vi hanterar dina personuppgifter står i vår <Link href="/integritetspolicy" style={lank}>integritetspolicy</Link>.</p>

          <h2 style={h2}>2. Ditt konto</h2>
          <ul>
            <li>Du måste vara minst 13 år för att skapa ett konto.</li>
            <li>Kontot är personligt. Du ansvarar för det som görs från det och för att hålla ditt lösenord för dig själv.</li>
            <li>Användarnamnet får inte utge sig för att vara någon annan, och får inte vara stötande.</li>
            <li>Du kan radera ditt konto när du vill under Profil, Inställningar, Radera konto. Då tas dina turer, bilder, sparade platser och profil bort. Texten i dina foruminlägg ersätts med ”[Borttaget av användare]” så att andras svar finns kvar.</li>
          </ul>

          <h2 style={h2}>3. Det du publicerar</h2>
          <p>Du ansvarar för det du publicerar på Svalla: turer, bilder, kommentarer, recensioner, incheckningar, foruminlägg, loppisannonser och meddelanden. Du behåller rätten till ditt innehåll. Du ger Svalla rätt att visa, lagra och anpassa det (till exempel förminska en bild) så länge det behövs för att tjänsten ska fungera. Turer och inlägg du gör synliga för alla kan ses av alla som besöker Svalla.</p>

          <h2 style={h2}>4. Det här får du inte göra</h2>
          <p>Vi har nolltolerans mot stötande innehåll och mot användare som beter sig illa. Du får inte publicera eller skicka något som:</p>
          <ul>
            <li>trakasserar, hotar, kränker eller hetsar mot någon</li>
            <li>är sexuellt, våldsamt eller annars olämpligt</li>
            <li>är olagligt, eller uppmanar till brott eller till farligt beteende till sjöss</li>
            <li>är spam, reklam som ingen bett om eller bedrägeri</li>
            <li>innehåller andras personuppgifter, bilder eller texter utan lov</li>
            <li>medvetet är fel, till exempel påhittade öppettider eller falska annonser</li>
          </ul>
          <p>Du får inte heller försöka ta dig in i andras konton, störa tjänsten eller samla in uppgifter från den automatiskt.</p>

          <h2 style={h2}>5. Anmälan, blockering och moderering</h2>
          <ul>
            <li>Du kan anmäla innehåll och användare med Anmäl-knappen. Anmälningar går till oss och vi går igenom dem så snart vi kan, normalt inom 24 timmar.</li>
            <li>Du kan blockera en användare. Då kan ni inte skicka meddelanden till varandra, kommentera, gilla eller följa varandra.</li>
            <li>Nya användares första foruminlägg granskas innan de syns för andra.</li>
            <li>Bryter innehåll mot villkoren tar vi bort det. Användare som bryter mot villkoren kan stängas av, tillfälligt eller för gott.</li>
          </ul>

          <h2 style={h2}>6. Loppis</h2>
          <p>På loppis säljer och köper användare saker av varandra. Köpet är en överenskommelse mellan köparen och säljaren, och Svalla är inte part i den. Svalla tar inte emot betalningar mellan användare och ansvarar inte för varorna. Annonsera bara sådant du själv får sälja, och beskriv det som det är.</p>

          <h2 style={h2}>7. Meddelanden</h2>
          <p>Meddelanden mellan användare är privata, men samma regler gäller där som i resten av Svalla. Ett meddelande som anmäls kan läsas av oss för att vi ska kunna bedöma anmälan.</p>

          <h2 style={h2}>8. Information på Svalla och säkerhet till sjöss</h2>
          <ul>
            <li>Båttider, väder, öppettider och annan information hämtar vi från operatörer, myndigheter och verksamheterna själva. Den kan ändras utan att vi hinner uppdatera. Kontrollera alltid hos operatören innan du reser.</li>
            <li>Svalla är inget navigationshjälpmedel. Kartor och rutter i Svalla ersätter inte sjökort, och du ansvarar själv för att planera och genomföra din tur säkert.</li>
            <li>Svar från AI-guiden skapas automatiskt och kan vara fel. Lita inte på dem i frågor som rör säkerhet.</li>
          </ul>

          <h2 style={h2}>9. Ansvar</h2>
          <p>Vi gör vårt bästa för att Svalla ska fungera och vara korrekt, men kan inte lova att tjänsten alltid är tillgänglig eller felfri. I den utsträckning lagen tillåter ansvarar Svalla inte för skador som uppstår av att du använder tjänsten, eller av innehåll som andra användare publicerar. Det påverkar inte de rättigheter du har enligt tvingande lag.</p>

          <h2 style={h2}>10. Ändringar</h2>
          <p>Vi kan ändra villkoren. Väsentliga ändringar meddelar vi i tjänsten eller via e-post innan de börjar gälla. Använder du Svalla efter det gäller de nya villkoren.</p>

          <h2 style={h2}>11. Lag</h2>
          <p>Svensk lag gäller för villkoren.</p>

          <h2 style={h2} id="kontakt">12. Kontakt</h2>
          <p>Frågor om villkoren, eller något du vill anmäla direkt till oss? Skriv till <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>.</p>

        </article>
      </div>
      <PublicFooter />
    </div>
  )
}
