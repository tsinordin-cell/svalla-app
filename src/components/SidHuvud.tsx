'use client'
/**
 * SidHuvud: samma blå sidhuvud på alla publika undersidor (Claes 2026-11-15:
 * "loggan hoppar in olika långt", "ingen hemknapp", "orange på Krogar").
 * Samma meny och samma loggplacering som startsidan: loggan 40 px från vänsterkanten
 * på dator, menyn till höger. Startsidan och forumet har egna sidhuvuden.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'

const MENY = [
  { href: '/resmal', text: 'Skärgården', aktivFor: ['/resmal', '/stockholms-skargard', '/bohuslan', '/gotland', '/aland', '/oland', '/blekinge-skargard', '/vasterhav', '/hoga-kusten', '/halland', '/goteborg-skargard', '/malaren', '/karta', '/oar', '/o/'] },
  { href: '/resetips', text: 'Dagsplaner & Resetips', aktivFor: ['/resetips', '/dag'] },
  { href: '/aktiviteter', text: 'Aktiviteter', aktivFor: ['/aktiviteter', '/aktivitet'] },
  { href: '/segelkurs', text: 'Kurser', aktivFor: ['/segelkurs', '/nyborjare-segling'] },
  { href: '/boende', text: 'Boende', aktivFor: ['/boende'] },
  { href: '/krogar-och-mat', text: 'Mat & dryck', aktivFor: ['/krogar-och-mat'] },
  { href: '/forum', text: 'Forum', aktivFor: ['/forum'] },
]

export default function SidHuvud() {
  const path = usePathname() ?? ''
  const aktiv = (m: (typeof MENY)[number]) => m.aktivFor.some(p => p.endsWith('/') ? path.startsWith(p) : path === p || path.startsWith(p + '/'))
  return (
    <header className="sidhuvud mork-yta">
      <div className="sidhuvud-rad">
        <Link href="/" className="sidhuvud-logga" aria-label="Svalla, till startsidan">
          <SvallaLogo height={24} color="#ffffff" />
        </Link>
        <nav className="sidhuvud-meny" aria-label="Huvudmeny">
          {MENY.map(m => (
            <Link key={m.href} href={m.href} className={aktiv(m) ? 'aktiv' : undefined} aria-current={aktiv(m) ? 'page' : undefined}>{m.text}</Link>
          ))}
        </nav>
        <div className="sidhuvud-konto">
          <Link href="/logga-in" className="sidhuvud-logga-in">Logga in</Link>
          <Link href="/kom-igang" className="sidhuvud-knapp">Kom igång →</Link>
        </div>
      </div>
      <style>{`
        .sidhuvud{background:linear-gradient(90deg,#0d2440 0%,#164a6b 100%);border-bottom:1px solid rgba(255,255,255,.08);position:relative;z-index:20}
        .sidhuvud-rad{display:flex;align-items:center;gap:20px;min-height:64px;padding:0 40px}
        .sidhuvud-logga{display:inline-flex;align-items:center;flex-shrink:0;text-decoration:none}
        .sidhuvud-meny{display:flex;align-items:center;gap:2px;flex:1;overflow-x:auto;scrollbar-width:none}
        .sidhuvud-meny::-webkit-scrollbar{display:none}
        .sidhuvud-meny a{color:rgba(255,255,255,.82);text-decoration:none;font-size:13px;font-weight:600;padding:8px 12px;border-radius:999px;white-space:nowrap}
        .sidhuvud-meny a:hover{color:#fff;background:rgba(255,255,255,.08)}
        .sidhuvud-meny a.aktiv{color:#fff;background:rgba(255,255,255,.14)}
        .sidhuvud-konto{display:flex;align-items:center;gap:6px;flex-shrink:0}
        .sidhuvud-logga-in{color:rgba(255,255,255,.85);text-decoration:none;font-size:13px;font-weight:600;padding:8px 10px}
        .sidhuvud-knapp{background:#c96e2a;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:9px 16px;border-radius:999px;white-space:nowrap}
        @media (max-width:1000px){
          .sidhuvud-rad{flex-wrap:wrap;padding:10px 16px 0;gap:10px;min-height:0}
          .sidhuvud-konto{margin-left:auto}
          .sidhuvud-meny{order:3;flex-basis:100%;padding-bottom:8px;margin:0 -16px;padding-left:10px;padding-right:10px}
        }
      `}</style>
    </header>
  )
}
