/**
 * Toppen på /guider och /resetips (FÖRHANDSVISNING 2026-11-20, guider och dagsplaner ihop).
 * Samma uttryck som resetips-sidans topp, så att de två sidorna ser ut som en och samma.
 */
import Link from 'next/link'

export default function GuideHero({ etikett, titel, text, lankar }: {
  etikett: string
  titel: string
  text: string
  lankar?: { href: string; text: string; aktiv?: boolean }[]
}) {
  return (
    <section className="gh">
      <style>{GH_CSS}</style>
      <p className="gh-etikett">{etikett}</p>
      <h1>{titel}</h1>
      <p className="gh-text">{text}</p>
      {lankar && (
        <nav className="gh-flikar" aria-label="Guider och dagsplaner">
          {lankar.map(l => (
            <Link key={l.href} href={l.href} aria-current={l.aktiv ? 'page' : undefined} className={l.aktiv ? 'pa' : undefined}>{l.text}</Link>
          ))}
        </nav>
      )}
    </section>
  )
}

const GH_CSS = `
.gh{background:linear-gradient(170deg,#0d2440 0%,#1e5c82 50%,#2d7d8a 100%);padding:64px 24px 48px;text-align:center}
.gh-etikett{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin:0 0 12px}
.gh h1{font-family:var(--font-playfair,'Playfair Display'),Georgia,serif;font-size:clamp(28px,5vw,48px);font-weight:700;color:#fff;margin:0 0 16px;line-height:1.2}
.gh-text{font-size:17px;color:rgba(255,255,255,.8);max-width:600px;margin:0 auto;line-height:1.6}
.gh-flikar{display:inline-flex;gap:6px;margin-top:22px;padding:4px;border-radius:999px;background:rgba(255,255,255,.12)}
.gh-flikar a{font-size:14px;font-weight:700;color:#fff;text-decoration:none;padding:8px 18px;border-radius:999px}
.gh-flikar a.pa{background:#fff;color:#0d2440}
@media (max-width:640px){.gh{padding:44px 18px 36px}.gh-text{font-size:15px}}
`
