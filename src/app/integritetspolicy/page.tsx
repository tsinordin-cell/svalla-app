import type { Metadata } from 'next'
import Link from 'next/link'
import SidHuvud from '@/components/SidHuvud'
import PublicFooter from '@/components/PublicFooter'
import { operatorRad } from '@/lib/villkor'

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
          <p>Svalla (svalla.se) är personuppgiftsansvarig för behandlingen av dina personuppgifter. Kontakta oss på <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a> vid frågor.</p>
          {operatorRad() && <p>{operatorRad()}</p>}

          <h2 style={h2}>2. Vad vi använder uppgifterna till</h2>
          <p>E-postadress och ett sätt att logga in behövs för att skapa ett konto. Utan dem kan vi inte skapa kontot. Profilbild, biografi, position, pushnotiser, nyhetsbrev och analys är valfria.</p>
          <ul>
            <li><strong>Konto, inloggning, turer, sparade platser, forum och meddelanden.</strong> Avtal. Du kan logga in med e-post och lösenord, eller med Google. Apple visas när den inloggningen är påslagen. Då sköter Google eller Apple inloggningen, och vi sparar e-postadressen på kontot.</li>
            <li><strong>Position.</strong> Bara om du själv delar den, för att spara en tur eller skicka en plats i ett meddelande. Avtal om den funktionen. Webbläsaren slår upp ett platsnamn hos OpenStreetMaps tjänst Nominatim, som då också ser din IP-adress.</li>
            <li><strong>Pushnotiser.</strong> Bara om du slår på dem. Samtycke. Vi sparar den adress webbläsaren ger oss.</li>
            <li><strong>Nyhetsbrev och julkalenderns påminnelse.</strong> Samtycke. Ett konto räcker inte. Julkalendern är ett mejl per dag 1 till 24 december, om du själv kryssat i det. Varje brev har en länk där du avregistrerar dig.</li>
            <li><strong>Analys.</strong> Samtycke, om du väljer Acceptera alla. Vi skickar sidans adress, att du lämnar en sida, och klick. Inte din e-post eller ditt användarnamn, och ingen inspelning av besöket. Samma godkända händelser sparas i vår databas. Är du inloggad kan den kopian knytas till kontots id, tillsammans med sidans sökväg, webbläsartyp och den landskod Vercel skickar med anropet.</li>
            <li><strong>Betalning.</strong> Avtal, om du köper Svalla Pro, lyfter en loppisannons eller betalar en partnersida. Kortuppgifterna fyller du i på Stripes sida. Vi skickar e-postadress och konto-id. För en partnersida även företagsnamn och telefon om du angett den.</li>
            <li><strong>Turberättelse och Thorkel.</strong> Avtal, bara när du själv ber om det. Vi skickar det du skrivit. För Thorkel även dina senaste turer: rubrik, platsnamn och distans. Inte din e-post.</li>
            <li><strong>Fel och att sidan ska ladda.</strong> Berättigat intresse: att sajten ska fungera. Felrapporter går till Sentry. Hur snabbt sidan laddades, och vilken sida det var, går till Vercel på varje sida, utan att vänta på cookievalet.</li>
            <li><strong>Anmälningar.</strong> Berättigat intresse: att hålla Svalla tryggt. En människa hos oss läser det anmälda meddelandet och upp till tio meddelanden före det. Vi fattar inga beslut om dig som enbart bygger på automatisk behandling.</li>
            <li><strong>Verksamheter och hantverkare.</strong> Berättigat intresse: att det ska gå att hitta en verksamhet som själv har publicerat namn, adress, telefon, e-post, webbplats, öppettider eller, för hantverkare, yrke och vilka öar de tar uppdrag på. Källan är det de själva lagt ut. För en enskild firma kan det vara personuppgifter. Skriv till oss om något ska ändras eller tas bort.</li>
          </ul>
          <p>Vi säljer inte dina uppgifter.</p>

          <h2 style={h2}>3. Vilka som tar emot dem</h2>
          <ul>
            <li><strong>Vercel</strong> är värd för sajten, region arn1 (Stockholm). Anropet, med IP-adress och kakor, går via Vercel.</li>
            <li><strong>Supabase</strong> lagrar kontot, inloggningen och filerna, region eu-north-1 (Stockholm).</li>
            <li><strong>Resend</strong> skickar mejlen (api.resend.com): adress och innehåll. Vi hämtar tillbaka om ett brev öppnats, klickats eller studsat. Koden visar inte landet.</li>
            <li><strong>Sentry</strong> tar emot felrapporter på ingest.de.sentry.io (EU i vår konfiguration). Webbläsaren skickar dem via vår egen adress. Kakor och IP skickas inte med automatiskt, och besöket spelas inte in.</li>
            <li><strong>PostHog</strong> i USA (us.i.posthog.com och us.posthog.com), bara efter samtycke, via svalla.se/ingest. Överföringen sker enligt PostHogs databehandlaravtal. Där står att de deltar i EU-US Data Privacy Framework och att EU:s standardavtalsklausuler också gäller. <a href="https://posthog.com/dpa" target="_blank" rel="noopener noreferrer" style={lank}>posthog.com/dpa</a></li>
            <li><strong>Stripe</strong> tar betalt (checkout.stripe.com). Koden visar inte landet.</li>
            <li><strong>Google Places</strong> lämnar vissa platsbilder. Vår server frågar places.googleapis.com med bildens referens, inte med ditt konto. En länk till Google Maps öppnar Google först när du klickar.</li>
            <li><strong>Anthropic</strong> skriver turberättelsen och Thorkels svar (api.anthropic.com). Koden visar inte landet.</li>
            <li><strong>Open-Meteo</strong> lämnar vädret. Webbläsaren frågar api.open-meteo.com med öns koordinater, så de ser din IP-adress och de koordinaterna. Det är öns läge, inte din position.</li>
            <li><strong>OpenStreetMap, OpenSeaMap och Wikimedia.</strong> Webbläsaren hämtar kartbilder (tile.openstreetmap.org och tiles.openseamap.org) och öfoton (thumb.wikimedia.org eller upload.wikimedia.org). De ser din IP-adress och vilken bild det är.</li>
            <li><strong>Upstash</strong> kan räkna för många anrop, om nycklarna är ifyllda. Räknaren kan innehålla en IP-adress eller ett konto-id och lever bara under det korta tidsfönstret. Utan nycklarna stannar räkningen i serverns minne. Koden visar inte landet.</li>
          </ul>
          <p>För de leverantörer där koden inte visar landet påstår vi inget särskilt skydd för en överföring utanför EU.</p>

          <h2 style={h2}>4. Hur länge vi sparar</h2>
          <p>Där koden inte raderar av sig själv står det här. Säkerhetskopior kan finnas kvar en tid efter en radering. Koden anger ingen tid för dem.</p>
          <ul>
            <li><strong>Kontot och det som hör till det</strong> (profil, turer, profilbild, turbilder, forumbilder, storybilder, chattbilder, push, mejllogg och nyhetsbrevsraden): så länge kontot finns. Tas bort när du raderar kontot under inställningar, länken Radera mitt konto, eller när du ber oss. Forumtexten byts till [Borttaget av användare] och får ligga kvar, så att andras svar har ett sammanhang. En pågående betalning hos Stripe avbryts. Kunduppgiften hos Stripe tar koden inte bort.</li>
            <li><strong>En tur du själv tar bort</strong> försvinner direkt och raderas på riktigt efter 30 dagar. Det gör ett nattjobb.</li>
            <li><strong>Meddelanden</strong> ligger kvar tills du raderar dem. Raderar du ett meddelande försvinner det för alla i samtalet. De är inte krypterade från ände till ände. En anmäld kopia, även en bild, raderas sex månader efter att ärendet avslutats. Raderar den som anmälde sitt konto tas anmälan bort.</li>
            <li><strong>Avregistrering.</strong> Adressen sparas i en spärrlista, med tidpunkt, IP-adress och webbläsare, så att vi inte mejlar igen. Listan rensas inte automatiskt, och den tas inte bort när kontot raderas.</li>
            <li><strong>Vår statistik</strong> rensas inte automatiskt. Kopplingen till kontot försvinner när kontot raderas. Själva händelsen kan ligga kvar utan konto. Vi sätter ingen lagringstid för PostHog i koden.</li>
          </ul>

          <h2 style={h2}>5. Dina rättigheter</h2>
          <p>Du kan begära tillgång, rättelse, radering, begränsning och dataportabilitet, och du kan invända mot behandling som stöds av berättigat intresse. Samtycke tar du tillbaka när du vill: välj Endast nödvändiga, avregistrera nyhetsbrevet eller stäng av julkalenderns påminnelse. Det påverkar inte sådant vi redan gjort.</p>
          <p>Du kan också klaga hos <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" style={lank}>Integritetsskyddsmyndigheten (IMY)</a>.</p>
          <p>Skriv till <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>. Säg vilken rätt det gäller och vilken e-postadress kontot har. Radering kan du också göra själv via Radera mitt konto.</p>

          <h2 style={h2}>6. Barn</h2>
          <p>I <Link href="/anvandarvillkor" style={lank}>användarvillkoren</Link> står att du måste vara minst 13 år för att skapa ett konto.</p>

          <h2 style={h2}>7. Kakor</h2>
          <p>En ruta frågar tills du valt Acceptera alla eller Endast nödvändiga. Valet ligger i kakan svalla_cookie_consent och i localStorage, i ett år. Rensa båda, så visas rutan igen.</p>
          <p>Nödvändiga, utan att vänta på ett ja:</p>
          <ul>
            <li><strong>Inloggning.</strong> En kaka som börjar med sb-, sedan projektnamnet och -auth-token. Ett långt värde delas i flera kakor, och under inloggning kan en kort kodkontrollkaka tillkomma. De håller dig inloggad och tas bort när du loggar ut. Koden sätter ingen egen livslängd.</li>
            <li><strong>svalla_har_konto.</strong> Värdet 1 om webbläsaren har varit inloggad. Ingen e-post. Ett år. Gör att inloggningen visar rätt formulär.</li>
            <li><strong>svalla_van.</strong> En väns användarnamn i en timme, om du kommer till registreringen via hens länk.</li>
            <li><strong>svalla_ny_registrering.</strong> Högst en timme efter inloggning med Google eller Apple. Vilken inloggning det var och vilken sida du var på väg till, inte din e-post. Används bara om du godkänt analys, och tas bort när uppgiften skickats.</li>
          </ul>
          <p>Bara efter Acceptera alla: PostHog sätter kakor som börjar på ph_ och sparar också i localStorage. Väljer du Endast nödvändiga tas de bort. Vi sätter ingen egen livslängd i koden. Ett slumpat besökarnummer (svalla_besokare) och ett sessionsnummer skapas då också, och kopplas inte till din e-post hos PostHog.</p>
          <p>Inga reklamkakor. Ljust eller mörkt läge minns vi i localStorage (svalla-theme), inte i en kaka.</p>

          <h2 style={h2}>8. Kontakta oss</h2>
          <p>Frågor om den här policyn, eller om du vill använda en rättighet: <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>.</p>

        </article>
      </div>
      <PublicFooter />
    </div>
  )
}
