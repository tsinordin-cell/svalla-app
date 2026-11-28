import type { Metadata } from 'next'
import Link from 'next/link'
import SidHuvud from '@/components/SidHuvud'
import PublicFooter from '@/components/PublicFooter'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description: 'Hur Svalla hanterar dina personuppgifter i enlighet med GDPR.',
  alternates: { canonical: 'https://svalla.se/integritetspolicy' },
}

const h2: React.CSSProperties = { color: 'var(--txt)', fontSize: 18 }
const lank: React.CSSProperties = { color: 'var(--sea)' }

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
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Senast uppdaterad: 2026-11-27</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        <article style={{ background: 'var(--white)', borderRadius: 16, padding: '32px 22px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15, overflowWrap: 'anywhere' }}>

          <h2 style={{ ...h2, marginTop: 0 }}>1. Vem som ansvarar</h2>
          <p>Thomas Nordin och Max Bornehed, som driver Svalla (svalla.se) som privatpersoner, är personuppgiftsansvariga. Kontakta oss på <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>.</p>

          <h2 style={h2}>2. Vad vi använder uppgifterna till</h2>
          <p>E-postadress och ett sätt att logga in behövs för att skapa ett konto. Utan dem kan vi inte skapa kontot. Profilbild, biografi, position, pushnotiser, nyhetsbrev och analys är valfria.</p>
          <ul>
            <li><strong>Konto, inloggning, turer, sparade platser, forum och meddelanden.</strong> Avtal. Du kan logga in med e-post och lösenord eller med Google. Apple finns när den knappen visas. Då sköter Google eller Apple inloggningen, och vi sparar e-postadressen på kontot.</li>
            <li><strong>Position.</strong> Bara om du själv delar den, för att spara en tur eller skicka en plats i ett meddelande. Avtal om den funktionen. Webbläsaren slår upp ett platsnamn hos OpenStreetMap, som då också ser din IP-adress.</li>
            <li><strong>Pushnotiser.</strong> Bara om du slår på dem. Samtycke. Vi sparar den adress webbläsaren ger oss.</li>
            <li><strong>Nyhetsbrev och julkalenderns påminnelse.</strong> Samtycke. Ett konto räcker inte. Julkalendern är ett mejl per dag 1 till 24 december, om du själv kryssat i det. Varje brev har en länk där du avregistrerar dig.</li>
            <li><strong>Analys.</strong> Samtycke, om du väljer Acceptera alla. Vi skickar sidans adress, att du lämnar en sida, och klick. Inte din e-post eller ditt användarnamn, och ingen inspelning av besöket. Samma godkända händelser sparas hos oss. Är du inloggad kan de knytas till kontot, tillsammans med sidans sökväg, webbläsartyp och land utifrån var du ansluter.</li>
            <li><strong>Betalning.</strong> Avtal, om du köper Svalla Pro, lyfter en loppisannons eller betalar en partnersida. Kortuppgifterna fyller du i på Stripes sida. Vi skickar e-postadress och konto. För en partnersida även företagsnamn och telefon om du angett den.</li>
            <li><strong>Turberättelse och Thorkel.</strong> Avtal, bara när du själv ber om det. Vi skickar det du skrivit. För Thorkel även dina senaste turer: rubrik, platsnamn och distans. Inte din e-post.</li>
            <li><strong>Fel och att sidan ska ladda.</strong> Berättigat intresse: att sajten ska fungera. Felrapporter går till Sentry. Hur snabbt sidan laddades, och vilken sida det var, går till Vercel på varje sida, utan att vänta på ditt val om kakor.</li>
            <li><strong>Anmälningar.</strong> Berättigat intresse: att hålla Svalla tryggt. En människa hos oss läser det anmälda meddelandet och upp till tio meddelanden före det. Vi fattar inga beslut om dig som enbart bygger på automatisk behandling.</li>
            <li><strong>Verksamheter och hantverkare.</strong> Berättigat intresse: att det ska gå att hitta en verksamhet som själv har publicerat namn, adress, telefon, e-post, webbplats, öppettider eller, för hantverkare, yrke och vilka öar de tar uppdrag på. Källan är det de själva lagt ut. För en enskild firma kan det vara personuppgifter. Skriv till oss om något ska ändras eller tas bort.</li>
          </ul>
          <p>Vi säljer inte dina uppgifter.</p>

          <h2 style={h2}>3. Vilka som tar emot dem</h2>
          <ul>
            <li><strong>Vercel</strong> är värd för sajten, i Stockholm. När du öppnar en sida går anropet, med IP-adress och kakor, via Vercel.</li>
            <li><strong>Supabase</strong> lagrar kontot, inloggningen och filerna, i Stockholm.</li>
            <li><strong>Resend</strong> skickar mejlen: din adress och brevets innehåll. De ser också om ett brev öppnats, klickats eller studsat. Behandlingen sker i USA. Överföringen stöds av EU-US Data Privacy Framework och EU:s standardavtalsklausuler, enligt <a href="https://resend.com/legal/dpa" target="_blank" rel="noopener noreferrer" style={lank}>Resends databehandlaravtal</a>.</li>
            <li><strong>Sentry</strong> tar emot felrapporter, i EU. Besöket spelas inte in, och kakor och IP-adress skickas inte med automatiskt.</li>
            <li><strong>PostHog</strong> i USA tar emot den anonyma statistiken, bara efter samtycke. Överföringen stöds av EU-US Data Privacy Framework och EU:s standardavtalsklausuler, enligt <a href="https://posthog.com/dpa" target="_blank" rel="noopener noreferrer" style={lank}>PostHogs databehandlaravtal</a>.</li>
            <li><strong>Stripe</strong> tar emot betalningen hos Stripe i USA. Överföringen stöds av EU-US Data Privacy Framework och EU:s standardavtalsklausuler, enligt <a href="https://stripe.com/legal/dta" target="_blank" rel="noopener noreferrer" style={lank}>Stripes överföringsvillkor</a>.</li>
            <li><strong>Google</strong> lämnar vissa platsbilder. Vi skickar inte ditt konto dit. En länk till Google Maps öppnas först när du klickar.</li>
            <li><strong>Anthropic</strong> skriver turberättelsen och Thorkels svar, på servrar i USA. Enligt deras integritetspolicy används standardavtalsklausuler, eller ett beslut om adekvat skyddsnivå, när uppgifter lämnar EU. <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" style={lank}>Anthropics integritetspolicy</a>.</li>
            <li><strong>Open-Meteo</strong>, i Schweiz, lämnar vädret. Webbläsaren skickar öns koordinater, så de ser din IP-adress och de koordinaterna. Det är öns läge, inte din position. Enligt <a href="https://open-meteo.com/en/terms" target="_blank" rel="noopener noreferrer" style={lank}>leverantörens villkor</a>.</li>
            <li><strong>OpenStreetMap, OpenSeaMap och Wikimedia.</strong> När kartan eller en öbild visas hämtar webbläsaren den därifrån. De ser din IP-adress och vilken bild det är.</li>
            <li><strong>Upstash</strong> kan spara en kortlivad räknare, som kan innehålla din IP-adress eller ditt konto, i datacenter i olika länder. Bolaget finns i USA. Överföringen stöds av EU-US Data Privacy Framework eller standardavtalsklausuler, enligt <a href="https://upstash.com/trust/privacy" target="_blank" rel="noopener noreferrer" style={lank}>Upstashs integritetspolicy</a>.</li>
          </ul>

          <h2 style={h2}>4. Hur länge vi sparar</h2>
          <p>Det som inte rensas av sig själv står här. Säkerhetskopior kan finnas kvar en tid efter en radering. Vi kan inte ange en fast tid för dem.</p>
          <ul>
            <li><strong>Kontot och det som hör till det</strong> (profil, turer, profilbild, turbilder, forumbilder, storybilder, chattbilder, push, mejllogg och nyhetsbrevsraden): så länge kontot finns. Tas bort när du raderar kontot under inställningar, länken Radera mitt konto, eller när du ber oss. Forumtexten byts till [Borttaget av användare] och får ligga kvar, så att andras svar har ett sammanhang. En pågående betalning hos Stripe avbryts. Vi tar inte bort kunduppgiften hos Stripe.</li>
            <li><strong>En tur du själv tar bort</strong> försvinner direkt och raderas på riktigt efter 30 dagar.</li>
            <li><strong>Meddelanden</strong> ligger kvar tills du raderar dem. Raderar du ett meddelande försvinner det för alla i samtalet. De är inte krypterade från ände till ände. En anmäld kopia, även en bild, raderas sex månader efter att ärendet avslutats. Raderar den som anmälde sitt konto tas anmälan bort.</li>
            <li><strong>Avregistrering.</strong> Adressen sparas i en spärrlista, med tidpunkt, IP-adress och webbläsare, så att vi inte mejlar igen. Listan rensas inte av sig själv, och den tas inte bort när kontot raderas.</li>
            <li><strong>Vår statistik</strong> rensas inte av sig själv. Kopplingen till kontot försvinner när kontot raderas. Själva händelsen kan ligga kvar utan konto. Vi har inte satt en egen tid för hur länge PostHog sparar statistiken.</li>
          </ul>

          <h2 style={h2}>5. Dina rättigheter</h2>
          <p>Du kan begära tillgång, rättelse, radering, begränsning och dataportabilitet, och du kan invända mot behandling som stöds av berättigat intresse. Samtycke tar du tillbaka när du vill: välj Endast nödvändiga, avregistrera nyhetsbrevet eller stäng av julkalenderns påminnelse. Det påverkar inte sådant vi redan gjort.</p>
          <p>Du kan också klaga hos <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" style={lank}>Integritetsskyddsmyndigheten (IMY)</a>.</p>
          <p>Skriv till <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>. Säg vilken rätt det gäller och vilken e-postadress kontot har. Radering kan du också göra själv via Radera mitt konto.</p>

          <h2 style={h2}>6. Barn</h2>
          <p>I <Link href="/anvandarvillkor" style={lank}>användarvillkoren</Link> står att du måste vara minst 13 år för att skapa ett konto.</p>

          <h2 style={h2}>7. Kakor</h2>
          <p>En ruta frågar tills du valt Acceptera alla eller Endast nödvändiga. Valet sparas i kakan svalla_cookie_consent och i webbläsaren, i ett år. Rensar du båda visas rutan igen.</p>
          <p>Nödvändiga, utan att vänta på ett ja:</p>
          <ul>
            <li><strong>Inloggning.</strong> En kaka som håller dig inloggad. Den tas bort när du loggar ut. Vi har inte satt en egen sluttid. Under inloggning kan en kort kaka för kontrollen tillkomma.</li>
            <li><strong>svalla_har_konto.</strong> Visar att den här webbläsaren har varit inloggad. Ingen e-post. Ett år. Gör att inloggningen visar rätt formulär.</li>
            <li><strong>svalla_van.</strong> En väns användarnamn i en timme, om du kommer till registreringen via hens länk.</li>
            <li><strong>svalla_ny_registrering.</strong> Högst en timme efter inloggning med Google eller Apple. Vilken inloggning det var och vilken sida du var på väg till, inte din e-post. Används bara om du godkänt analys, och tas bort när uppgiften skickats.</li>
          </ul>
          <p>Bara efter Acceptera alla sätter PostHog egna kakor. Väljer du Endast nödvändiga tas de bort. Vi har inte satt en egen sluttid. Ett slumpat nummer i webbläsaren skapas då också, och kopplas inte till din e-post hos PostHog.</p>
          <p>Inga reklamkakor. Ljust eller mörkt läge minns vi i webbläsaren, inte i en kaka.</p>

          <h2 style={h2}>8. Kontakta oss</h2>
          <p>Frågor om den här policyn, eller om du vill använda en rättighet: <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>.</p>

        </article>
      </div>
      <PublicFooter />
    </div>
  )
}
