import Icon from '@/components/Icon'
import {
  synligaYrken, YRKE_ETIKETT,
  type Hantverkare, type Kallniva,
} from '@/app/o/hantverkare-data'

/**
 * HantverkarKort — en företagspost, med sin källa synlig.
 *
 * Den bärande regeln: kortet påstår aldrig mer än vi vet. Varje post visar
 * varifrån uppgiften kommer och vilket datum vi läste den, och ingen post får
 * en grön markering utan att en människa faktiskt pratat med företaget.
 *
 * Bakgrund: kontrollen av Möjas tretton företag mot deras egna webbplatser
 * 2026-09-22 gav sju fel — fem placerade på fel ö, ett med två olika
 * telefonnummer på sin egen sida, en död länk och en sida från 2014. Utan
 * källraden hade besökaren inte haft en chans att bedöma något av det.
 */

const KALL_TEXT: Record<Kallniva, string> = {
  'egen-sajt': 'Enligt företagets egen webbplats',
  forening: 'Enligt öns företagarförening',
  register: 'Enligt kommunens näringslivsregister',
}

function skrivDatum(iso: string): string {
  const [ar, man, dag] = iso.split('-')
  const manader = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
    'juli', 'augusti', 'september', 'oktober', 'november', 'december']
  const m = manader[Number(man) - 1]
  return m ? `${Number(dag)} ${m} ${ar}` : iso
}

export default function HantverkarKort({ h, oSlug }: { h: Hantverkare; oSlug?: string }) {
  const yrken = synligaYrken(h)
  const uppringd = h.verifierad !== false

  // Sitter de på den ö besökaren tittar på, eller kör de hit? Skillnaden finns
  // bara för att vi kontrollerat den — registret hade dem alla som lokala.
  const basAnnanstans = Boolean(
    oSlug && h.bas && !h.bas.toLowerCase().includes(oSlug.toLowerCase())
  )

  return (
    <li style={{
      background: 'var(--white)', border: '1px solid var(--hairline)',
      borderRadius: 16, padding: '15px 17px', listStyle: 'none',
      boxShadow: 'var(--shadow-soft)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)' }}>{h.namn}</span>

        {uppringd && (
          <span style={{
            fontSize: 11, padding: '2px 9px', borderRadius: 999,
            background: 'rgba(34,197,94,0.12)', color: '#15803d',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <Icon name="check" size={12} stroke={2.4} />
            Bekräftad av Svalla
          </span>
        )}

        {h.behorighet === 'bekraftad' && h.behorighetKalla && (
          <a
            href={h.behorighetKalla}
            target="_blank"
            rel="nofollow noopener"
            style={{
              fontSize: 11, padding: '2px 9px', borderRadius: 999,
              background: 'var(--sea-08)', color: 'var(--sea)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
            }}
          >
            <Icon name="award" size={12} stroke={2} />
            Registrerad hos Elsäkerhetsverket
          </a>
        )}

        {h.sakerVatten && (
          <span style={{
            fontSize: 11, padding: '2px 9px', borderRadius: 999,
            background: 'var(--sea-08)', color: 'var(--sea)',
          }}>
            Auktoriserat VVS-företag, Säker Vatten
          </span>
        )}
      </div>

      {yrken.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '7px 0 0' }}>
          {yrken.map(y => (
            <span key={y} style={{
              fontSize: 11, fontWeight: 600, color: 'var(--sea)',
              background: 'var(--sea-08)', padding: '2px 8px', borderRadius: 10,
            }}>{YRKE_ETIKETT[y]}</span>
          ))}
        </div>
      )}

      {basAnnanstans && (
        <p style={{ margin: '9px 0 0', fontSize: 13, color: 'var(--txt2)' }}>
          <Icon name="ship" size={14} stroke={2} /> Baserade i {h.bas} — kör hit med båt
        </p>
      )}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 9, fontSize: 14 }}>
        {h.telefon && (
          <a href={`tel:${h.telefon.replace(/\s/g, '')}`} style={{ color: 'var(--acc-d)', textDecoration: 'none' }}>
            {h.telefon}
          </a>
        )}
        {h.epost && (
          <a href={`mailto:${h.epost}`} style={{ color: 'var(--acc-d)', textDecoration: 'none' }}>
            {h.epost}
          </a>
        )}
        {h.webb && (
          <a href={h.webb} target="_blank" rel="nofollow noopener" style={{ color: 'var(--acc-d)', textDecoration: 'none' }}>
            {h.webb.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
          </a>
        )}
      </div>

      {/* kalla.reservation visas INTE för besökaren (Max 2026-09-23).
          Fältet är vår interna anteckning om varför en uppgift utelämnats —
          motstridiga telefonnummer, en sida som inte uppdaterats på år. Att
          skriva ut det gör tvivlet till besökarens problem i stället för
          vårt. Konsekvensen tas i datat: håller uppgiften inte, tar vi bort
          den. Håller hela posten inte, tar vi bort posten. */}

      <p style={{
        margin: '10px 0 0', paddingTop: 8, fontSize: 11.5, color: 'var(--txt3)',
        borderTop: '1px solid var(--hairline)',
      }}>
        {KALL_TEXT[h.kalla.niva]}
        {h.kalla.niva === 'egen-sajt' ? ' ' : ', '}
        {h.kalla.niva === 'egen-sajt' && (
          <a href={h.kalla.url} target="_blank" rel="nofollow noopener" style={{ color: 'var(--txt3)' }}>
            ({h.kalla.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]})
          </a>
        )}
        {h.kalla.niva === 'egen-sajt' ? ', ' : ''}
        läst {skrivDatum(h.kalla.last)}
      </p>
    </li>
  )
}
