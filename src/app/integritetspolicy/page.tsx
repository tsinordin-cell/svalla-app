import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import PublicFooter from '@/components/PublicFooter'
import { operatorRad } from '@/lib/villkor'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description: 'Hur Svalla hanterar dina personuppgifter i enlighet med GDPR.',
  alternates: { canonical: 'https://svalla.se/integritetspolicy' },
}

const h2: React.CSSProperties = { color: 'var(--txt)', fontSize: 18 }
const h3: React.CSSProperties = { color: 'var(--txt)', fontSize: 16 }
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

          <h2 style={{ ...h2, marginTop: 0 }}>1. Personuppgiftsansvarig</h2>
          <p>Svalla (svalla.se) är personuppgiftsansvarig för behandlingen av dina personuppgifter. Kontakta oss på <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a> vid frågor.</p>
          {operatorRad() && <p>{operatorRad()}</p>}

          <h2 style={h2}>2. Vilka uppgifter vi samlar in</h2>
          <p>Vi samlar in följande uppgifter när du skapar ett konto eller använder Svalla:</p>
          <ul>
            <li><strong>Kontouppgifter:</strong> e-postadress och användarnamn. Du kan skapa kontot med e-post och lösenord, eller logga in med Google. Inloggning med Apple finns i koden och visas när den är påslagen. Google och Apple sköter då själva inloggningen, och vi får tillbaka en e-postadress som sparas på kontot.</li>
            <li><strong>Profilinformation:</strong> valfri profilbild och kortbiografi</li>
            <li><strong>Aktivitetsdata:</strong> loggade turer, sparade platser, kommentarer och gillningar</li>
            <li><strong>Tekniska uppgifter:</strong> IP-adress när du anropar sajten, webbläsartyp och de kakor som behövs för inloggning och för ditt cookieval</li>
            <li><strong>Platsdata:</strong> om du aktivt väljer att dela din position, till exempel när du loggar en tur eller skickar en position i ett meddelande</li>
            <li><strong>Nyhetsbrev:</strong> din e-postadress, om du själv har valt att prenumerera, vilket formulär du anmälde dig via och, om du själv svarat på frågan, om du har egen båt, fritidshus i skärgården eller åker ut över dagen eller helgen</li>
          </ul>

          <h3 style={h3}>Direktmeddelanden</h3>
          <p>När du skriver till någon i Svalla sparar vi det du skickar: text, bilder, positioner och turer som du delar, när meddelandet skickades och vilka som är med i samtalet. Bara de som är med i samtalet kan läsa meddelandena i appen, med ett undantag: Svallas administratörer ser det som har anmälts, se nedan. Meddelandena lagras hos oss så att deltagarna kan läsa dem. De är inte krypterade från ände till ände. Vi läser inte dina meddelanden, utom när någon har anmält ett meddelande eller en användare.</p>
          <ul>
            <li><strong>Bilder:</strong> innan en bild skickas tar appen bort platsdata och annan dold information ur filen. Bilderna ligger i en privat lagring som bara de som är med i samtalet kommer åt.</li>
            <li><strong>Position:</strong> delar du din position skickas din exakta plats, och du får bekräfta först. För att visa ett platsnamn i stället för koordinater skickar din enhet koordinaterna till OpenStreetMaps tjänst Nominatim, som då också ser din IP-adress. Samma uppslag används när en sparad tur ska få namn på stopp.</li>
            <li><strong>Anmälningar:</strong> anmäler du ett meddelande eller en användare får Svallas administratörer se det anmälda meddelandet och upp till tio meddelanden före det, för att kunna granska ärendet. Underlaget, även en anmäld bild, finns kvar om meddelandet, samtalet eller den anmäldas konto raderas, och raderas sex månader efter att ärendet är avslutat. Raderar den som anmälde sitt konto tas anmälan bort.</li>
          </ul>

          <h3 style={h3}>Hantverkare och företag på öarna</h3>
          <p>På ösidorna listar vi hantverkare och sjötjänster som tar uppdrag på öarna. Vi visar bara yrkesuppgifter som företaget självt har publicerat för att få kunder: firmanamn, yrke, var företaget finns, vilka öar det tar uppdrag på, telefonnummer, e-postadress och webbplats. Varje uppgift visas med källa och det datum vi läste den. För enskilda firmor kan uppgifterna vara personuppgifter.</p>
          <p>Syftet är att boende och fritidshusägare på öar utan fast vägförbindelse ska hitta hantverkare, och att hantverkarna ska hittas av dem. Vi behandlar uppgifterna med stöd av berättigat intresse. Företag som listas får besked från oss. Vill du ändra något eller inte vara med alls skriver du till <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>, så tar vi bort uppgifterna utan att fråga varför. Uppgifter som inte kontrollerats på tolv månader kontrolleras igen eller tas bort.</p>
          <h3 style={h3}>Krogar, hamnar och andra verksamheter</h3>
          <p>På ösidorna och platssidorna visar vi verksamheters namn, adress, telefonnummer, e-post, webbplats och öppettider, så som verksamheten själv har publicerat dem. Driver du en verksamhet som finns på Svalla och vill ändra eller ta bort något skriver du till <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>, så gör vi det.</p>

          <h2 style={h2}>3. Hur vi använder dina uppgifter</h2>
          <p>Dina uppgifter används för att:</p>
          <ul>
            <li>Tillhandahålla och förbättra Svallas tjänster</li>
            <li>Möjliggöra inloggning och kontosäkerhet</li>
            <li>Visa dina loggade turer och sparade platser</li>
            <li>Skicka pushnotiser om du valt att aktivera dessa. Vi sparar den adress webbläsaren ger oss och skickar notisen dit. Vilken leverans som tar emot den beror på din webbläsare</li>
            <li>Skicka nyhetsbrevet till dig som har valt att prenumerera. Att ha ett konto räcker inte för att få nyhetsbrevet, du väljer det själv. Varje brev har en länk där du avregistrerar dig</li>
            <li>Skicka julkalenderns påminnelse, ett mejl per dag 1 till 24 december, till dig som själv har kryssat i det på julkalendersidan. Du stänger av den där eller via länken i mejlet</li>
            <li>Skriva en turberättelse eller svara när du frågar Thorkel, om du är inloggad och själv ber om det</li>
            <li>Ta betalt om du köper Svalla Pro, lyfter en loppisannons eller betalar en partnersida</li>
            <li>Förstå hur sajten används, men bara om du har godkänt analys</li>
            <li>Se hur snabbt sidorna laddas, och fånga fel så att vi kan laga dem</li>
          </ul>
          <p>Vi säljer aldrig dina personuppgifter till tredje part.</p>

          <h2 style={h2}>4. Rättslig grund</h2>
          <p>Behandlingen sker med stöd av <strong>avtalsuppfyllelse</strong> (kontouppgifter, aktivitetsdata och betalning), <strong>berättigat intresse</strong> (att hålla sajten igång och laga fel, listan över hantverkare och företag på öarna, och granskning av anmälda meddelanden och användare för att hålla Svalla tryggt) och <strong>samtycke</strong> (nyhetsbrevet, julkalenderns påminnelse och analysen, som du kan återkalla när som helst) i enlighet med GDPR artikel 6.</p>

          <h2 style={h2}>5. Vilka som tar emot uppgifter</h2>
          <p>Vi anlitar andra för att driva sajten. De får bara det som behövs för deras del. Där koden visar land eller region står det här. Där den inte gör det skriver vi det rakt ut.</p>
          <ul>
            <li><strong>Vercel</strong> är värd för sajten, i regionen arn1 (Stockholm) enligt vår konfiguration. När du öppnar en sida går anropet, med IP-adress och kakor, via Vercel. På varje sida laddas också Vercel Speed Insights, utan att vänta på ditt cookieval. Det skickar hur snabbt sidan laddades och vilken sida det var.</li>
            <li><strong>Supabase</strong> lagrar kontot, inloggningen, databasens innehåll och filer (profilbild, turbilder, forumbilder, chattbilder). Projektet ligger i region eu-north-1 (Stockholm).</li>
            <li><strong>Resend</strong> skickar våra mejl (välkomstbrev, nyhetsbrev, påminnelser och bekräftelse när ett konto raderas). Mottagarens adress och brevets innehåll går till api.resend.com. Vi hämtar också tillbaka om ett brev öppnats, klickats eller studsat. Koden säger inte i vilket land Resend tar emot det.</li>
            <li><strong>Sentry</strong> tar emot felrapporter, till ingest.de.sentry.io. I koden står att det är Sentrys EU-region. Webbläsaren skickar dem via vår egen adress först. Automatisk sändning av kakor och IP-adress är avstängd, inspelning av besöket är av, och kända känsliga delar av sidans adress (till exempel en e-postadress eller en inloggningskod i adressen) tas bort innan rapporten går vidare.</li>
            <li><strong>PostHog</strong> används för anonym sidstatistik, och bara efter att du valt Acceptera alla. Trafiken går via svalla.se/ingest till PostHog i USA (us.i.posthog.com, och us.posthog.com i inställningen). Vi skickar sidans adress, att du lämnar en sida, och klick. Vi skickar inte din e-postadress eller ditt användarnamn, och vi spelar inte in hur du rör dig på sidan. Samma godkända händelser sparas också i vår egen databas hos Supabase. Är du inloggad kan den kopian knytas till kontots id, tillsammans med sidans sökväg, webbläsartyp och landskod som Vercel skickar med anropet.</li>
            <li><strong>Stripe</strong> tar betalt. Kortuppgifterna fyller du i på Stripes sida (checkout.stripe.com). För Pro skickar vi din e-postadress och ditt konto-id. För ett lyft av en loppisannons skickar vi e-postadress och konto-id. För en partnersida skickar vi e-postadress, företagsnamn och telefon om du angett den. Koden säger inte i vilket land Stripe lagrar uppgifterna.</li>
            <li><strong>Google Places</strong> används när en platsbild ska visas. Då frågar vår server places.googleapis.com med bildens referens, inte med ditt konto eller din e-post. Klickar du en länk till Google Maps öppnas Google, och då ser Google det besöket. Koden säger inte i vilket land anropet landar.</li>
            <li><strong>Anthropic</strong> skriver turberättelsen och svarar när du frågar Thorkel. Servern skickar då det du skrivit, och för Thorkel också dina senaste turer (rubrik, platsnamn, distans). Inte din e-postadress. Anropet går till api.anthropic.com. Koden säger inte i vilket land det tas emot.</li>
            <li><strong>Open-Meteo</strong> lämnar vädret på ösidorna. Din webbläsare frågar api.open-meteo.com med öns koordinater, så Open-Meteo ser din IP-adress och de koordinaterna. Det är öns läge, inte din egen position. Koden säger inte i vilket land tjänsten svarar ifrån.</li>
            <li><strong>OpenStreetMap</strong> levererar kartbilderna (tile.openstreetmap.org) och, via Nominatim, platsnamn för koordinater du själv delar. Din webbläsare hämtar kartbilderna, så OpenStreetMap ser din IP-adress och vilket kartutsnitt du tittar på.</li>
            <li><strong>OpenSeaMap</strong> lägger sjömärken ovanpå kartan (tiles.openseamap.org). Samma sak gäller där: din IP-adress och kartutsnittet.</li>
            <li><strong>Wikimedia</strong> står för många öfoton. Bilden hämtas av din webbläsare från thumb.wikimedia.org eller upload.wikimedia.org, så Wikimedia ser din IP-adress och vilken bild det är. Inte ditt konto.</li>
            <li><strong>Upstash</strong> kan användas för att bromsa för många anrop, om de nycklarna är ifyllda. Då lagras en kortlivad räknare vars nyckel kan innehålla en IP-adress eller ett konto-id. Koden säger inte i vilket land Upstash ligger. Utan nycklarna stannar räkningen i serverns minne.</li>
          </ul>

          <h2 style={h2}>6. Lagring och radering</h2>
          <p>Kontot, turerna och filerna lagras hos Supabase i Stockholm, med trafik över HTTPS. Vi behåller kontouppgifterna tills du väljer att radera kontot.</p>
          <p>Du raderar kontot själv under inställningar, via länken Radera mitt konto, när du är inloggad. Du kan också skriva till <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a> så hjälper vi dig. När kontot raderas tar vi bort profilen, turerna, profilbilden, turbilderna, dina forumbilder, dina storybilder och dina chattbilder. Texter du skrivit i forumet byts ut mot texten [Borttaget av användare], så att andras svar fortfarande har ett sammanhang. Din adress tas bort ur mejlloggen och ur nyhetsbrevslistan. En pågående betalning hos Stripe avbryts. Är mejlen igång får du ett sista brev om att kontot är borta.</p>
          <p>Direktmeddelanden sparas tills du raderar dem. Raderar du ett meddelande försvinner det för alla i samtalet. När både du och den du skriver med har raderat ett samtal tas det bort helt, med alla meddelanden och bilder. Raderar du ditt konto raderas dina meddelanden och bilder. Det som har anmälts sparas som underlag enligt avsnitt 2.</p>
          <p>Händelser i vår egen statistik tappar kopplingen till kontot när kontot raderas. Själva händelsen kan ligga kvar, utan konto. PostHog har inte din e-postadress. Säkerhetskopior kan finnas kvar en tid efter att något raderats. Hur länge står inte i koden, så vi lovar ingen exakt tid här.</p>

          <h2 style={h2}>7. Dina rättigheter</h2>
          <p>Du har rätt att:</p>
          <ul>
            <li>Begära ett utdrag av dina personuppgifter</li>
            <li>Rätta felaktiga uppgifter, i profilen eller genom att höra av dig</li>
            <li>Radera ditt konto och de uppgifter som hör till det, själv via Radera mitt konto eller genom att skriva till oss</li>
            <li>Invända mot viss behandling</li>
            <li>Ta tillbaka ett samtycke, till exempel genom att välja Endast nödvändiga i cookierutan, avregistrera nyhetsbrevet eller stänga av julkalenderns påminnelse</li>
            <li>Lämna klagomål till <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" style={lank}>Integritetsskyddsmyndigheten (IMY)</a></li>
          </ul>
          <p>Kontakta <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a> för att utöva dina rättigheter. Skriv gärna vilken rätt det gäller och vilken e-postadress kontot har, så att vi hittar rätt uppgifter.</p>

          <h2 style={h2}>8. Cookies</h2>
          <p>En ruta frågar om kakor tills du valt. Du kan välja Acceptera alla eller Endast nödvändiga. Valet sparas och går att ändra genom att rensa det i webbläsaren, då visas rutan igen.</p>
          <p>Nödvändiga kakor sätts för att sajten ska fungera. De väntar inte på ett ja:</p>
          <ul>
            <li><strong>Inloggning.</strong> Supabase sparar sessionen i en kaka som börjar med sb-, följt av projektnamnet och -auth-token. Är värdet långt delas det i flera kakor. Under inloggning kan en kortlivad kaka för kodkontrollen tillkomma. De håller dig inloggad.</li>
            <li><strong>svalla_cookie_consent.</strong> Ditt val, antingen accepted eller necessary. Samma val ligger också i webbläsarens localStorage. Kakan gäller ett år.</li>
            <li><strong>svalla_har_konto.</strong> Värdet 1, om den här webbläsaren har varit inloggad. Ingen e-post. Den gäller ett år och gör att inloggningssidan visar rätt formulär.</li>
            <li><strong>svalla_van.</strong> Om du kommer till registreringen via en väns länk sparas vännens användarnamn i en timme, så att vi kan föreslå den personen.</li>
            <li><strong>svalla_ny_registrering.</strong> Efter inloggning med Google eller Apple, i högst en timme. Den innehåller vilken inloggning det var och vilken sida du var på väg till, inte din e-post. Den används bara om du har godkänt analys, och tas bort så fort uppgiften skickats.</li>
          </ul>
          <p>Analysen startar bara om du valt Acceptera alla:</p>
          <ul>
            <li>PostHog sätter kakor som börjar på ph_ och sparar också i localStorage. De hör till den anonyma sidstatistiken. Väljer du Endast nödvändiga tas de bort.</li>
            <li>Vi sparar ett slumpat besökarnummer i localStorage (svalla_besokare) och ett sessionsnummer i sessionStorage. De skapas bara när analysen är godkänd, och kopplas inte till din e-post hos PostHog.</li>
          </ul>
          <p>Vi använder inga reklamkakor. Ljust eller mörkt läge minns vi i localStorage (svalla-theme), inte i en kaka.</p>

          <h2 style={h2}>9. Kontakt</h2>
          <p>Frågor om vår integritetspolicy? Hör av dig till <a href="mailto:info@svalla.se" style={lank}>info@svalla.se</a>.</p>

        </article>
      </div>
      <PublicFooter />
    </div>
  )
}
