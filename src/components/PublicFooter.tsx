import Link from 'next/link'
import SvallaLogo from './SvallaLogo'

/**
 * Global footer för publika sidor — visas på /utflykt, /bingo, /aktivitet/*,
 * /oar/*, /partner, /jamfor och andra SEO-sidor. Inkluderas inte i app-feed
 * (den har egen Nav).
 *
 * Designprinciper:
 * - 4 kolumner med tydlig hierarki: Verktyg / Hitta öar / Aktiviteter / Företag
 * - Mörk bakgrund (var --txt) för kontrast mot ljusa innehållssidor
 * - Logotyp + sammanfattning högst upp
 * - Liten copyright + integritetspolicy längst ned
 */
export default function PublicFooter() {
  return (
    <footer style={{
      background: 'var(--txt, #1a2530)',
      color: 'rgba(255,255,255,0.78)',
      padding: '56px 24px 32px',
      marginTop: 60,
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* Brand-rad */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start',
          paddingBottom: 28, marginBottom: 32,
          borderBottom: '1px solid rgba(255,255,255,0.10)',
        }}>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}>
              <SvallaLogo height={26} color="rgba(255,255,255,0.95)" />
            </Link>
            <p style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 360,
            }}>
              Skärgårdens guide. 84 öar, 200+ krogar och hamnar, färjetider i realtid.
              Ingen reklam, inga trick — bara skärgården.
            </p>
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <Link
              href="/kom-igang"
              style={{
                display: 'inline-block',
                padding: '10px 22px',
                borderRadius: 999,
                background: 'var(--acc, #c96e2a)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Kom igång gratis →
            </Link>
          </div>
        </div>

        {/* 4 kolumner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32,
          marginBottom: 36,
        }}>
          <FooterColumn
            title="Verktyg"
            links={[
              { href: '/utflykt', label: 'Utflyktsplanerare' },
              { href: '/planera', label: 'Båtruttplanerare' },
              { href: '/jamfor', label: 'Jämför öar' },
              { href: '/farjor', label: 'Färjetider' },
              { href: '/bingo', label: 'Skärgårdsbingo' },
              { href: '/karta', label: 'Karta' },
            ]}
          />
          <FooterColumn
            title="Hitta din ö"
            links={[
              { href: '/oar/barnvanliga', label: 'Barnvänliga' },
              { href: '/oar/dagstur-stockholm', label: 'Dagstur från Stockholm' },
              { href: '/oar/romantiska', label: 'Romantiska weekends' },
              { href: '/oar/avskild', label: 'Avskilda pärlor' },
              { href: '/oar/utan-bil', label: 'Utan bil' },
              { href: '/oar', label: 'Alla kategorier →' },
            ]}
          />
          <FooterColumn
            title="Aktiviteter"
            links={[
              { href: '/aktivitet/segling', label: 'Segling' },
              { href: '/aktivitet/cykla', label: 'Cykling' },
              { href: '/aktivitet/bada', label: 'Bad' },
              { href: '/aktivitet/vandring', label: 'Vandring' },
              { href: '/aktivitet/mat', label: 'Mat & krogar' },
              { href: '/aktivitet', label: 'Se alla →' },
            ]}
          />
          <FooterColumn
            title="Svalla"
            links={[
              { href: '/om', label: 'Om oss' },
              { href: '/partner', label: 'För partners' },
              { href: '/forum', label: 'Forum' },
              { href: '/tips', label: 'Tips & artiklar' },
              { href: '/blogg', label: 'Bloggen' },
              { href: '/integritetspolicy', label: 'Integritetspolicy' },
            ]}
          />
        </div>

        {/* Bottenrad */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12,
          alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.40)',
        }}>
          <span>© {new Date().getFullYear()} Svalla. Stockholms skärgård + Bohuslän.</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
            <a
              href="https://www.instagram.com/svalla.app/"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Svalla på Instagram"
              style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              {/* Instagram-glyph i SVG (egen, ingen lib-beroende) */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>@svalla.app</span>
            </a>
            <Link href="/integritetspolicy" style={{ color: 'inherit', textDecoration: 'none' }}>
              Integritet
            </Link>
            <Link href="/faq" style={{ color: 'inherit', textDecoration: 'none' }}>
              FAQ
            </Link>
            <Link href="/kontakt" style={{ color: 'inherit', textDecoration: 'none' }}>
              Kontakt
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h3 style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: 'rgba(255,255,255,0.92)',
        margin: '0 0 14px',
      }}>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 9 }}>
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.65)',
                textDecoration: 'none',
                transition: 'color .15s',
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
