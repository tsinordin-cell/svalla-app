import Icon from '@/components/Icon'
import { SCB_OAR, SCB_OAR_KALLA } from '@/app/o/scb-oar.generated'

/**
 * Faktaruta per ö med officiell statistik från SCB (kort 80106ebb, 2026-09-29).
 *
 * Kortet bad om en "Wikipedia-liknande infobox". Den bedömdes 2026-09-21 som
 * omöjlig att bygga ärligt: area och befolkning fanns för 18 öar men utan
 * källa. SCB publicerar befolkning och byggnader per ö för öar utan bro till
 * fastlandet, och det är den enda källan rutan använder. Rutan visar alltså
 * bara det som går att kontrollera, med källan direkt under.
 *
 * Öar som SCB inte redovisar (öar med bro, orter på fastlandet) får ingen
 * ruta. Hellre ingen ruta än en med gissade fält.
 *
 * Data: src/app/o/scb-oar.generated.ts, från scripts/hamta-scb-oar.mjs.
 */

const fmt = (n: number) => n.toLocaleString('sv-SE')
const kommunText = (k: string) => (k === 'Gotland' ? 'Region Gotland' : `${k} kommun`)

export default function IslandFakta({ slug, islandName }: { slug: string; islandName: string }) {
  const s = SCB_OAR[slug]
  if (!s) return null

  const rader: Array<{ etikett: string; varde: string }> = [
    { etikett: 'Kommun', varde: kommunText(s.kommun) },
  ]
  if (s.folkbokforda !== null) {
    rader.push({ etikett: 'Folkbokförda', varde: `${fmt(s.folkbokforda)} personer` })
  }
  if (s.byggnader !== null) {
    rader.push({
      etikett: 'Byggnader',
      varde: s.bostadsbyggnader !== null
        ? `${fmt(s.byggnader)}, varav ${fmt(s.bostadsbyggnader)} bostadsbyggnader`
        : fmt(s.byggnader),
    })
  }
  const utanSiffror = s.folkbokforda === null && s.byggnader === null
  const annatNamn = s.scbNamn !== islandName

  return (
    <section aria-labelledby={`fakta-${slug}`} style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
        <span aria-hidden style={{ color: 'var(--sea)', display: 'flex' }}>
          <Icon name="compass" size={18} stroke={2} />
        </span>
        <h2 id={`fakta-${slug}`} style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
          Fakta om {islandName}
        </h2>
      </div>

      <dl style={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        columnGap: 18,
        rowGap: 8,
        margin: 0,
        padding: '14px 16px',
        borderRadius: 12,
        border: '1px solid var(--surface-3)',
        background: 'var(--white)',
        fontSize: 14,
      }}>
        {rader.map(r => (
          <div key={r.etikett} style={{ display: 'contents' }}>
            <dt style={{ color: 'var(--txt2)', fontWeight: 600 }}>{r.etikett}</dt>
            <dd style={{ margin: 0, color: 'var(--txt)', fontVariantNumeric: 'tabular-nums' }}>{r.varde}</dd>
          </div>
        ))}
      </dl>

      <p style={{ fontSize: 12.5, color: 'var(--txt2)', lineHeight: 1.5, margin: '8px 0 0' }}>
        {annatNamn && <>SCB redovisar ön som {s.scbNamn}. </>}
        {utanSiffror && <>SCB redovisar inga siffror för befolkning och byggnader här. </>}
        Källa:{' '}
        <a href={SCB_OAR_KALLA.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>
          SCB, {SCB_OAR_KALLA.tabell.charAt(0).toLowerCase() + SCB_OAR_KALLA.tabell.slice(1)}
        </a>
        , läget den {SCB_OAR_KALLA.referens}. Det är det senaste året i SCB:s tabell.
      </p>
    </section>
  )
}
