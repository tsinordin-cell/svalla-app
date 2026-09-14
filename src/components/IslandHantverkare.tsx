import Icon from '@/components/Icon'
import { getHantverkareForIsland, YRKE_ETIKETT } from '@/app/o/hantverkare-data'

/**
 * IslandHantverkare — hantverkare och sjötjänster på en ö.
 *
 * Renderar ingenting alls om det inte finns verifierade poster för ön, vilket
 * är normalfallet tills någon ringt igenom registret. En tom rubrik är sämre
 * än ingen rubrik.
 *
 * Filtreringen på verifierade sker i getHantverkareForIsland(), inte här.
 */
export default function IslandHantverkare({ islandSlug }: { islandSlug: string }) {
  const hantverkare = getHantverkareForIsland(islandSlug)
  if (hantverkare.length === 0) return null

  return (
    <section style={{ marginBottom: 52 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          minWidth: 30, height: 30, borderRadius: 9,
          background: 'var(--grad-sea)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="wrench" size={16} stroke={1.9} />
        </div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
          Hantverkare på ön
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {hantverkare.map(h => (
          <div key={h.slug} style={{
            background: 'var(--white)',
            borderRadius: 14,
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{h.namn}</span>
              {h.yrken.map(y => (
                <span key={y} style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--sea)',
                  background: 'rgba(45,125,138,0.1)',
                  padding: '2px 8px', borderRadius: 10,
                }}>{YRKE_ETIKETT[y]}</span>
              ))}
            </div>

            {h.noteringar && (
              <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 10px', lineHeight: 1.6 }}>
                {h.noteringar}
              </p>
            )}

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 13 }}>
              {h.telefon && (
                <a href={`tel:${h.telefon.replace(/\s/g, '')}`}
                   style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>
                  {h.telefon}
                </a>
              )}
              {h.epost && (
                <a href={`mailto:${h.epost}`}
                   style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>
                  E-post
                </a>
              )}
              {h.webb && (
                <a href={h.webb} target="_blank" rel="noopener noreferrer"
                   style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>
                  Webbplats →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 12, lineHeight: 1.6 }}>
        Uppgifterna är hämtade från företagens egna kanaler och kontrollerade av oss.
        Stämmer något inte — <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>hör av dig</a>.
      </p>
    </section>
  )
}
