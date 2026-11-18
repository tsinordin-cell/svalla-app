'use client'
/**
 * SidHuvud: samma blå sidhuvud på alla publika undersidor (Claes 2026-11-15).
 * FÖRHANDSVISNING 2026-11-18: ny menyrad med rullgardiner (Regioner, Se & göra,
 * Mat & boende, Planera, Guider) och sökfält. Inte för main.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'

const MENY: { href: string; text: string; aktivFor: string[]; grupper: [string, [string, string][]][] }[] = [
 {
  "href": "/resmal",
  "text": "Regioner",
  "aktivFor": [
   "/resmal",
   "/stockholms-skargard",
   "/bohuslan",
   "/gotland",
   "/aland",
   "/oland",
   "/blekinge-skargard",
   "/vasterhav",
   "/hoga-kusten",
   "/halland",
   "/goteborg-skargard",
   "/malaren",
   "/karta",
   "/oar",
   "/o/"
  ],
  "grupper": [
   [
    "Ostkusten",
    [
     [
      "/stockholms-skargard",
      "Stockholms skärgård"
     ],
     [
      "/aland",
      "Åland"
     ],
     [
      "/gotland",
      "Gotland"
     ],
     [
      "/oland",
      "Öland"
     ],
     [
      "/malaren",
      "Mälaren"
     ]
    ]
   ],
   [
    "Syd och väst",
    [
     [
      "/blekinge-skargard",
      "Blekinge skärgård"
     ],
     [
      "/halland",
      "Halland"
     ],
     [
      "/goteborg-skargard",
      "Göteborgs skärgård"
     ],
     [
      "/bohuslan",
      "Bohuslän"
     ],
     [
      "/vasterhav",
      "Västerhavet"
     ]
    ]
   ],
   [
    "Norr och mer",
    [
     [
      "/hoga-kusten",
      "Höga Kusten"
     ],
     [
      "/oar",
      "Alla öar"
     ],
     [
      "/karta",
      "Karta över skärgården"
     ],
     [
      "/jamfor",
      "Jämför öar"
     ]
    ]
   ]
  ]
 },
 {
  "href": "/aktiviteter",
  "text": "Se & göra",
  "aktivFor": [
   "/aktiviteter",
   "/aktivitet",
   "/bastu-och-bad",
   "/vandring-och-natur",
   "/segelkurs",
   "/vinter"
  ],
  "grupper": [
   [
    "",
    [
     [
      "/aktiviteter",
      "Alla aktiviteter"
     ],
     [
      "/bastu-och-bad",
      "Bad och bastu"
     ],
     [
      "/vandring-och-natur",
      "Vandring och natur"
     ],
     [
      "/aktivitet/segling",
      "Segling"
     ],
     [
      "/aktivitet/kajak",
      "Kajak"
     ],
     [
      "/segelkurs",
      "Kurser"
     ],
     [
      "/vinter",
      "Skärgården på vintern"
     ]
    ]
   ]
  ]
 },
 {
  "href": "/krogar-och-mat",
  "text": "Mat & boende",
  "aktivFor": [
   "/krogar-och-mat",
   "/boende",
   "/hamnar-och-bryggor",
   "/farjor"
  ],
  "grupper": [
   [
    "",
    [
     [
      "/krogar-och-mat",
      "Krogar, kaféer och bryggserveringar"
     ],
     [
      "/boende",
      "Boende"
     ],
     [
      "/hamnar-och-bryggor",
      "Gästhamnar och naturhamnar"
     ],
     [
      "/farjor",
      "Färjetider"
     ]
    ]
   ]
  ]
 },
 {
  "href": "/utflykt",
  "text": "Planera",
  "aktivFor": [
   "/utflykt",
   "/resetips",
   "/planera",
   "/dag"
  ],
  "grupper": [
   [
    "",
    [
     [
      "/utflykt",
      "Dagsutflykt, utan konto"
     ],
     [
      "/resetips",
      "Dagsplaner och resetips"
     ],
     [
      "/planera",
      "Egen tur med Thorkel (gratis konto)"
     ]
    ]
   ]
  ]
 },
 {
  "href": "/guider",
  "text": "Guider",
  "aktivFor": [
   "/guider",
   "/forum"
  ],
  "grupper": [
   [
    "",
    [
     [
      "/guider",
      "Alla guider"
     ],
     [
      "/guider/midsommar-skargarden",
      "Midsommar i skärgården"
     ],
     [
      "/guider/packlista-skargarden",
      "Packlista för skärgården"
     ],
     [
      "/guider/allemansratten-pa-sjon",
      "Allemansrätten på sjön"
     ],
     [
      "/forum",
      "Forum: fråga andra"
     ]
    ]
   ]
  ]
 }
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
            <div key={m.href} className="sidhuvud-punkt">
              <Link href={m.href} className={aktiv(m) ? 'aktiv' : undefined} aria-current={aktiv(m) ? 'page' : undefined}>{m.text}</Link>
              <div className="sidhuvud-panel">
                <div className={m.grupper.length > 1 ? 'sidhuvud-panel-inre flera' : 'sidhuvud-panel-inre'}>
                  {m.grupper.map(([rubrik, lankar]) => (
                    <div key={rubrik || m.href}>
                      {rubrik && <div className="sidhuvud-panel-rubrik">{rubrik}</div>}
                      {lankar.map(([href, text]) => <Link key={href} href={href}>{text}</Link>)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <form action="/sok" method="get" role="search" className="sidhuvud-sok">
          <input type="search" name="q" placeholder="Sök ö, hamn eller krog" aria-label="Sök på Svalla" />
        </form>
        <div className="sidhuvud-konto">
          <Link href="/logga-in" className="sidhuvud-logga-in">Logga in</Link>
          <Link href="/kom-igang" className="sidhuvud-knapp">Kom igång →</Link>
        </div>
      </div>
      <style>{`
        .sidhuvud{background:linear-gradient(90deg,#0d2440 0%,#164a6b 100%);border-bottom:1px solid rgba(255,255,255,.08);position:relative;z-index:40}
        .sidhuvud-rad{display:flex;align-items:center;gap:16px;min-height:64px;padding:0 40px}
        .sidhuvud-logga{display:inline-flex;align-items:center;flex-shrink:0;text-decoration:none}
        .sidhuvud-meny{display:flex;align-items:center;gap:2px;flex:1}
        .sidhuvud-punkt{position:relative}
        .sidhuvud-punkt>a{display:block;color:rgba(255,255,255,.85);text-decoration:none;font-size:14px;font-weight:600;padding:8px 13px;border-radius:999px;white-space:nowrap}
        .sidhuvud-punkt>a:hover,.sidhuvud-punkt:focus-within>a{color:#fff;background:rgba(255,255,255,.08)}
        .sidhuvud-punkt>a.aktiv{color:#fff;background:rgba(255,255,255,.14)}
        .sidhuvud-panel{position:absolute;top:100%;left:0;padding-top:8px;display:none;z-index:50}
        .sidhuvud-punkt:hover .sidhuvud-panel,.sidhuvud-punkt:focus-within .sidhuvud-panel{display:block}
        .sidhuvud-panel-inre{background:#fff;border-radius:14px;box-shadow:0 16px 40px rgba(13,36,64,.22);padding:12px;min-width:230px}
        .sidhuvud-panel-inre.flera{display:grid;grid-template-columns:repeat(3,minmax(170px,1fr));gap:4px 18px;min-width:600px}
        .sidhuvud-panel-rubrik{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#6b7c85;padding:6px 10px 4px}
        .sidhuvud-panel-inre a{display:block;color:#192830;text-decoration:none;font-size:14px;padding:7px 10px;border-radius:8px;white-space:nowrap}
        .sidhuvud-panel-inre a:hover{background:#f2f8fa;color:#1e5c82}
        .sidhuvud-sok input{width:200px;padding:8px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;font:inherit;font-size:13px;outline:none}
        .sidhuvud-sok input::placeholder{color:rgba(255,255,255,.7)}
        .sidhuvud-sok input:focus{background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.5)}
        .sidhuvud-konto{display:flex;align-items:center;gap:6px;flex-shrink:0}
        .sidhuvud-logga-in{color:rgba(255,255,255,.85);text-decoration:none;font-size:13px;font-weight:600;padding:8px 10px}
        .sidhuvud-knapp{background:#c96e2a;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:9px 16px;border-radius:999px;white-space:nowrap}
        @media (max-width:1100px){
          .sidhuvud-rad{flex-wrap:wrap;padding:10px 16px 0;gap:10px;min-height:0}
          .sidhuvud-konto{margin-left:auto}
          .sidhuvud-sok{order:3;flex-basis:100%}
          .sidhuvud-sok input{width:100%}
          .sidhuvud-meny{order:4;flex-basis:100%;overflow-x:auto;scrollbar-width:none;padding-bottom:8px;margin:0 -16px;padding-left:10px;padding-right:10px}
          .sidhuvud-panel{display:none!important}
        }
      `}</style>
    </header>
  )
}
