import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * IDÉBANKEN (Max 2026-11-21). Intern ingång till allt som inte är byggt eller inte ligger live.
 * Finns bara på grenen "idebank", som aldrig mergas till main. Sidan hör alltså inte till svalla.se.
 * Verksamheter, namn och förmåner på undersidorna är EXEMPEL.
 */
export const metadata: Metadata = {
  title: 'Idébanken (intern)',
  description: 'Intern samling av Svallas idéer och förhandsvisningar.',
  robots: { index: false, follow: false },
}

type Del = { titel: string; text: string; href: string; status: string }

const DELAR: Del[] = [
  { titel: 'Startscenen', text: 'Ett alternativ till startsidans animering i samma stil som introt. Havet stiger, båten seglar in och en skärgård växer fram med knappar till öar, boende, krogar, turplanering, färjor, karta och aktiviteter. Ön, fyren och färjan är påhittade.', href: '/ideer/kreativ#scen', status: 'Ny · Förhandsvisning' },
  { titel: 'Startsidan', text: 'Sexton idéer för startsidans övriga delar, med förebild och motivering vid varje.', href: '/ideer', status: 'Förhandsvisning' },
  { titel: 'Erbjudanden och förmåner', text: 'Tretton sätt att visa förmåner och erbjudanden hos Svallas partner. Allt är exempel.', href: '/ideer/erbjudanden', status: 'Förhandsvisning' },
  { titel: 'Verksamhetssidan', text: 'Allt som kan finnas på en verksamhetssida, att slå av och på med telefonen bredvid. Här finns också Claes idéer om partnerkonto, partnerbrev, Svalla Bas och Premium och en kampanj inför säsongen.', href: '/ideer/verksamhet', status: 'Förhandsvisning' },
  { titel: 'Säljsida till hotell', text: 'Vi vill ha med er på Svalla. Sidan som kan skickas till ett hotell för att visa hur ett samarbete kan se ut.', href: '/samarbete/hotell', status: 'Klar att skicka' },
  { titel: 'Kreativ verkstad', text: 'Introt där stänk blir Sverige, sedan båten och havet, och vidare in i startsidans animering. Dessutom frågan vid dörren, bandet, halsbrickan, partnersida i Svallastil och levande karta.', href: '/ideer/kreativ', status: 'Förhandsvisning' },
]

const EJ_BYGGT: { titel: string; text: string }[] = [
  { titel: 'Sidbyggaren', text: 'Hotellet fyller i sin egen sida direkt i säljlänken och ser en telefon som uppdateras medan de skriver. Förslaget ska läggas fram i text innan något byggs.' },
  { titel: 'Kreativ verkstad, del för del', text: 'Bandet, halsbrickan, partnersidan med målade bilder och kartan med riktiga kustlinjer ska lyftas till samma nivå som introt.' },
  { titel: 'Tre nya filmer', text: 'Filmer med en riktigt intressant historia knuten till ett ställe som finns i dag, som tittaren kan besöka och som Svalla kan kontakta om samarbete.' },
  { titel: 'Sök i mobilen', text: 'En knapp med texten Sök och en pil som rullar ner till sökfältet, som alternativ till dagens lösning.' },
]

export default function Idebanken() {
  return (
    <main className="ib">
      <p className="ib-ovan">Intern sida · inte en del av svalla.se</p>
      <h1>Idébanken</h1>
      <p className="ib-ingress">Här samlas allt som Svalla har tänkt, ritat och provat men inte lagt ut. Öppna en del för att se den i rörelse. Verksamheter, namn och förmåner är exempel.</p>

      <h2>Går att titta på</h2>
      <div className="ib-rad">
        {DELAR.map(d => (
          <Link key={d.href} href={d.href} className="ib-kort">
            <span className="ib-status">{d.status}</span>
            <b>{d.titel}</b>
            <span className="ib-text">{d.text}</span>
            <span className="ib-oppna">Öppna →</span>
          </Link>
        ))}
      </div>

      <h2>Inte byggt än</h2>
      <div className="ib-rad">
        {EJ_BYGGT.map(d => (
          <div key={d.titel} className="ib-kort ib-ej">
            <span className="ib-status">Idé</span>
            <b>{d.titel}</b>
            <span className="ib-text">{d.text}</span>
          </div>
        ))}
      </div>
      <style>{CSS}</style>
    </main>
  )
}

const CSS = `
.ib{min-height:100vh;background:#f3ece0;color:#14202a;padding:110px 20px 80px;font-family:Inter,system-ui,sans-serif}
.ib>*{max-width:1040px;margin-left:auto;margin-right:auto}
.ib-ovan{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b5591a}
.ib h1{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(40px,7vw,72px);line-height:1;margin-top:10px;color:#0d2440}
.ib-ingress{font-size:17px;line-height:1.6;margin-top:16px;color:#3c4d58;max-width:640px;margin-left:auto;margin-right:auto}
.ib>.ib-ingress,.ib>.ib-ovan,.ib>h1,.ib>h2{display:block}
.ib h2{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:26px;margin-top:48px;margin-bottom:16px;color:#0d2440}
.ib-rad{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.ib-kort{display:flex;flex-direction:column;gap:8px;background:#fffdf8;border:1px solid rgba(13,36,64,.1);border-radius:18px;padding:20px;text-decoration:none;color:inherit;box-shadow:0 6px 20px rgba(13,36,64,.06);transition:transform .2s,box-shadow .2s}
a.ib-kort:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(13,36,64,.12)}
.ib-kort b{font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#0d2440}
.ib-status{align-self:flex-start;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1f5f99;background:rgba(31,95,153,.1);border-radius:999px;padding:4px 10px}
.ib-ej .ib-status{color:#8a5a2b;background:rgba(181,89,26,.12)}
.ib-text{font-size:14.5px;line-height:1.55;color:#3c4d58}
.ib-oppna{margin-top:auto;padding-top:6px;font-size:14px;font-weight:700;color:#b5591a}
`
