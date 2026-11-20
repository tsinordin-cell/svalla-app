'use client'
/**
 * Tillbaka-rad under Svallas meny (Max 2026-11-20: "vill vi inte lägga till tillbakaknappen också?").
 * Används av Sidtopp och av sidor som hade en egen tillbakaknapp innan menyn kom (Partner, Bingo).
 *
 * Kom man från en annan Svalla-sida går knappen tillbaka dit, som webbläsarens bakåtknapp.
 * Kom man direkt utifrån (till exempel från Google) leder den till sidan ovanför: sökvägen utan
 * sista ledet, eller det som står i FORALDER. Länken har alltid en riktig adress, så den fungerar
 * även utan JavaScript.
 */
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

// Sidor där sidan ovanför inte är sökvägen utan sista ledet (ingen sådan än).
const FORALDER: Record<string, string> = {}

export default function TillbakaRad() {
  const router = useRouter()
  const path = usePathname() ?? '/'
  const upp = FORALDER[path] ?? (path.replace(/\/+$/, '').replace(/\/[^/]*$/, '') || '/')
  return (
    <div className="st-tillbaka">
      <style>{ST_CSS}</style>
      <Link
        href={upp}
        onClick={e => {
          let franSvalla = false
          try { franSvalla = !!document.referrer && new URL(document.referrer).origin === window.location.origin } catch {}
          if (franSvalla && window.history.length > 1) { e.preventDefault(); router.back() }
        }}
      >
        <span aria-hidden="true">‹</span> Tillbaka
      </Link>
    </div>
  )
}

const ST_CSS = `
.st-tillbaka{background:var(--bg,#faf6ef)}
.st-tillbaka>a{display:inline-flex;align-items:center;gap:6px;margin:10px 0 10px 40px;font-size:14px;font-weight:600;color:var(--sea,#1e5c82);text-decoration:none;padding:6px 12px 6px 9px;border-radius:999px;background:rgba(30,92,130,.07)}
.st-tillbaka>a span{font-size:18px;line-height:1;margin-top:-2px}
.st-tillbaka>a:hover{background:rgba(30,92,130,.13)}
@media (max-width:1100px){.st-tillbaka>a{margin-left:16px}}
`
