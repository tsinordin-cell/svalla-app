import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import Link from 'next/link'
import PublicFooter from '@/components/PublicFooter'
import EmailSignup from '@/components/EmailSignup'
import { ogSida } from '@/lib/og-standard'
import { aktuellaDatum, manadsRubrik, type Skargardsdatum } from '@/lib/skargardsdatum'

/**
 * /skargardsdatum: skärgårdens datum på ett ställe
 * (exitplanen, Innehåll & SEO, "sidor som äger återkommande datum", 2026-10-02).
 *
 * VARFÖR: "när är hummerpremiären 2027", "sportlov 2027" och liknande söks varje år.
 * Sidan samlar datumen i tidsordning och länkar till sidan som äger ämnet.
 *
 * 2026-11-27 (Max): listan ligger i src/lib/skargardsdatum.ts och delas med startsidans
 * "Just nu i skärgården". Varje rad har KÄLLA med citat där. Passerade rader visas inte,
 * perioder som pågår visas under "Pågår nu", resten per månad.
 */

// Sidan byggs om varje dygn så att passerade datum försvinner av sig själva.
export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Skärgårdens datum 2026 och 2027: sportlov, julmarknader, tidtabeller, hummer och kräftor | Svalla' },
  description:
    'Julmarknader, vintertidtabeller, sportlov, fredningstider, kräftpremiär och hummerpremiär i skärgården. Varje datum med regel och källa.',
  alternates: { canonical: 'https://svalla.se/skargardsdatum' },
  openGraph: {
    images: ogSida('https://svalla.se/skargardsdatum'),
    title: 'Skärgårdens datum 2026 och 2027',
    description: 'Julmarknader, tidtabellsbyten, lov, fredningstider och premiärer i skärgården, med regel och källa.',
    url: 'https://svalla.se/skargardsdatum',
  },
}

type Grupp = { rubrik: string; rader: Skargardsdatum[] }

function grupper(idag: string): Grupp[] {
  const ut: Grupp[] = []
  for (const d of aktuellaDatum(idag)) {
    const rubrik = d.iso < idag ? 'Pågår nu' : manadsRubrik(d.iso)
    const sista = ut[ut.length - 1]
    if (sista && sista.rubrik === rubrik) sista.rader.push(d)
    else ut.push({ rubrik, rader: [d] })
  }
  return ut
}

export default function SkargardsdatumPage() {
  const idag = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
  const lista = grupper(idag)
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SidHuvud />
      <div style={{ background: 'var(--grad-sea-hero)', padding: '52px 20px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: -0.3 }}>
            Skärgårdens datum 2026 och 2027
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, margin: 0, lineHeight: 1.55 }}>
            Julmarknader, tidtabellsbyten, lov, fredningstider och premiärer i tidsordning. Varje datum har sin regel bredvid och en länk vidare.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 8px' }}>
        {lista.map((g) => (
          <section key={g.rubrik} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>{g.rubrik}</h2>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.rader.map((d) => (
                <li key={d.iso + d.vad} style={{ background: 'var(--white)', borderRadius: 14, padding: '14px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)' }}>{d.nar}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '2px 0 4px' }}>{d.vad}</div>
                  <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5, marginBottom: 6 }}>{d.regel}</div>
                  <Link href={d.lank.href} style={{ fontSize: 14, fontWeight: 600, color: 'var(--sea)' }}>{d.lank.text}</Link>
                </li>
              ))}
            </ol>
          </section>
        ))}

        {/* Båtupptagning saknas i listan med avsikt: det finns inget datum att
            sätta och ingen källa att luta sig mot. Stycket förklarar varför. */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>Båtupptagning</h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.55, margin: 0 }}>
            Båtupptagning har inget gemensamt datum. Varv och båtklubbar sätter sina egna tider, så kontrollera med din hamn.
          </p>
        </section>
        <p style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.55, margin: '0 0 24px' }}>
          Evenemang och tidtabeller kan ändras. Kontrollera hos arrangören eller rederiet innan du åker. Hittar du något som inte stämmer, skriv till info@svalla.se.
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px 48px' }}>
        <EmailSignup
          source="skargardsdatum"
          variant="card"
          title="Få skärgårdens säsongsnytt"
          description="Nya guider och säsongsnytt, när det händer något. Du kan avregistrera dig i varje utskick."
          buttonLabel="Prenumerera"
        />
      </div>

      <PublicFooter />
    </div>
  )
}
