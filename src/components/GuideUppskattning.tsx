import Icon from '@/components/Icon'
import { UPPSKATTNINGAR_PER_GUIDE } from '@/app/guider/uppskattningar.generated'

/**
 * Säger till läsaren när prisnivåerna i en guide är uppskattade.
 *
 * verify-claims tillåter ett pris utan källa om det är märkt UPPSKATTNING med
 * datum, och kräver i samma andetag att det "sägs rakt ut för besökaren i
 * gränssnittet". Den andra halvan saknades: 124 markörer i 54 guider, noll
 * synliga. Läsaren såg "ca 300–600 kr/pers" som om det kom ur en prislista.
 *
 * Rutan står före innehållet, inte efter. En reservation som läsaren hittar
 * efter att ha budgeterat sin resa är ingen reservation.
 */

const MANADER = [
  'januari', 'februari', 'mars', 'april', 'maj', 'juni',
  'juli', 'augusti', 'september', 'oktober', 'november', 'december',
]

function skrivDatum(datum: string): string {
  const delar = datum.split('-')
  const ar = delar[0]
  const man = Number(delar[1])
  const namn = Number.isFinite(man) ? MANADER[man - 1] : undefined
  return namn && ar ? `${namn} ${ar}` : datum
}

export default function GuideUppskattning({ slug }: { slug: string }) {
  const u = UPPSKATTNINGAR_PER_GUIDE[slug]
  if (!u) return null

  return (
    <div
      role="note"
      style={{
        display: 'flex',
        gap: 11,
        alignItems: 'flex-start',
        background: 'var(--surface-2)',
        border: '1px solid var(--surface-3)',
        borderRadius: 12,
        padding: '13px 16px',
        marginBottom: 20,
      }}
    >
      <span aria-hidden style={{ flexShrink: 0, color: 'var(--txt3)', display: 'flex', marginTop: 1 }}>
        <Icon name="info" size={16} stroke={2} />
      </span>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--txt2)' }}>
        <strong style={{ color: 'var(--txt)' }}>
          {u.antal === 1
            ? 'En prisnivå i den här guiden är uppskattad'
            : `${u.antal} prisnivåer i den här guiden är uppskattade`}
        </strong>{' '}
        — {u.antal === 1 ? 'den bygger' : 'de bygger'} på{' '}
        {u.vad || 'en översikt över flera aktörer'}, senast gjord {skrivDatum(u.datum)}.{' '}
        {u.antal === 1 ? 'Den är' : 'De är'} alltså inte {u.antal === 1 ? 'hämtad' : 'hämtade'} ur
        någons prislista. Kontrollera hos operatören innan du bokar eller budgeterar.
      </p>
    </div>
  )
}
