/**
 * /press: för journalister och den som skriver om Svalla.
 *
 * Alla siffror räknas ur sajtens egen data vid bygget, så de kan inte bli
 * inaktuella eller påhittade. Inga besökssiffror: de mäts bara för dem som
 * sagt ja till cookies och är därför ett golv, inte ett faktum att publicera.
 * Läggs sådana till senare ska de ha källa och datum.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { KALLOR_PER_O } from '@/app/o/kallor.generated'
import { PUBLICERADE_GUIDER } from '@/app/guider/guides-data'
import { OAR_MED_BILD } from '@/app/o/obilder.generated'

export const metadata: Metadata = {
  title: { absolute: 'Press – Svalla' },
  description: 'Fakta om Svalla för journalister: vad sajten är, hur uppgifterna tas fram och hur du når oss.',
  alternates: { canonical: 'https://svalla.se/press' },
}

const fmt = (n: number) => n.toLocaleString('sv-SE')

function siffror() {
  const listor = Object.values(KALLOR_PER_O)
  const kallor = listor.reduce((n, l) => n + l.length, 0)
  const myndighet = listor.reduce((n, l) => n + l.filter(k => k.myndighet).length, 0)
  const regioner = new Set(ALL_ISLANDS.map(o => o.region)).size
  return {
    oar: ALL_ISLANDS.length,
    regioner,
    guider: PUBLICERADE_GUIDER.length,
    kallor,
    myndighetsandel: kallor ? Math.round((myndighet / kallor) * 100) : 0,
    oarMedBild: OAR_MED_BILD,
  }
}

export default function PressPage() {
  const s = siffror()
  const kort: React.CSSProperties = { background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 14, padding: '18px 16px', textAlign: 'center' }
  const tal: React.CSSProperties = { fontSize: 28, fontWeight: 800, color: 'var(--sea)' }
  const etikett: React.CSSProperties = { fontSize: 13, color: 'var(--txt2)', marginTop: 4 }
  const h2: React.CSSProperties = { fontSize: 22, fontWeight: 800, margin: '36px 0 10px', color: 'var(--txt)' }
  const p: React.CSSProperties = { fontSize: 15, lineHeight: 1.7, color: 'var(--txt2)', margin: '0 0 12px' }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 96px' }}>
      <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 10px', color: 'var(--txt)' }}>Press</h1>
      <p style={p}>
        Svalla är en sajt som samlar uppgifter om Sveriges skärgårdar på ett ställe: hur man tar sig till öarna,
        var man äter och bor, vad som är öppet och när båtarna går. Varje uppgift har en källa, och källorna står
        längst ner på varje ösida.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, margin: '24px 0' }}>
        <div style={kort}><div style={tal}>{fmt(s.oar)}</div><div style={etikett}>öar med egen sida</div></div>
        <div style={kort}><div style={tal}>{fmt(s.guider)}</div><div style={etikett}>guider</div></div>
        <div style={kort}><div style={tal}>{fmt(s.kallor)}</div><div style={etikett}>källor bakom ösidorna</div></div>
        <div style={kort}><div style={tal}>{s.myndighetsandel} %</div><div style={etikett}>av källorna från myndigheter, kommuner och regioner</div></div>
      </div>
      <p style={{ ...p, fontSize: 13, color: 'var(--txt3)' }}>
        Siffrorna räknas ur sajtens egen data och uppdateras automatiskt. {fmt(s.oarMedBild)} av öarna har ett foto
        med fri licens från Wikimedia Commons, med fotografens namn utsatt.
      </p>

      <h2 style={h2}>Hur uppgifterna tas fram</h2>
      <p style={p}>
        Uppgifterna hämtas från rederiernas tidtabeller, kommunernas och Länsstyrelsens sidor och verksamheternas egna
        webbplatser. Varje uppgift sparas med källa och datum då den lästes. Går något inte att belägga står det inte
        på sajten. Läs mer på <Link href="/om" style={{ color: 'var(--sea)' }}>Om Svalla</Link>.
      </p>

      <h2 style={h2}>Thorkel</h2>
      <p style={p}>
        Thorkel är Svallas AI-guide och svarar på frågor om öarna utifrån samma uppgifter som sajten. Han är en
        AI, inte en person, och det står tydligt där han används.
      </p>

      <h2 style={h2}>Kontakt</h2>
      <p style={p}>
        Frågor, intervjuer och rättelser: <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a>.
      </p>
    </div>
  )
}
