import type { Metadata } from 'next'
import Link from 'next/link'
import { ISLANDS } from './island-data'

export const metadata: Metadata = {
  title: 'Alla öar – Stockholms skärgård | Svalla',
  description: 'Utforska alla öar i Stockholms skärgård. Hitta guider, aktiviteter, restauranger och praktisk info om 69 öar.',
}

const regions = [
  { key: 'norra', label: 'Norra skärgården', desc: 'Vilda och orörda öar längre ut i skärgården' },
  { key: 'mellersta', label: 'Mellersta skärgården', desc: 'Det klassiska skärgårdslivet — Sandhamn, Möja och öarna däremellan' },
  { key: 'södra', label: 'Södra skärgården', desc: 'Bilfria naturreservat och lugna vikar söder om Stockholm' },
]

export default function OarPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f7f9fb;color:#1a2a35}
        .oar-hero{background:linear-gradient(135deg,#0a4a5e 0%,#1a3a4a 100%);padding:80px 40px 60px;text-align:center}
        .oar-hero h1{font-size:42px;font-weight:800;color:#fff;margin-bottom:12px;letter-spacing:-.02em}
        .oar-hero p{font-size:18px;color:rgba(255,255,255,.7);max-width:520px;margin:0 auto}
        .oar-nav{background:#fff;border-bottom:1px solid #e8eef2;padding:0 40px;display:flex;gap:32px;overflow-x:auto}
        .oar-nav a{padding:16px 0;font-size:13px;font-weight:600;color:#5a7080;text-decoration:none;white-space:nowrap;border-bottom:2px solid transparent;transition:.2s}
        .oar-nav a:hover{color:#0a4a5e;border-bottom-color:#0a7b8c}
        .oar-content{max-width:1160px;margin:0 auto;padding:60px 40px}
        .region-section{margin-bottom:64px}
        .region-header{margin-bottom:8px}
        .region-title{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#0a7b8c;margin-bottom:6px}
        .region-name{font-size:28px;font-weight:800;color:#0a1f2e;margin-bottom:6px}
        .region-desc{font-size:14px;color:#5a7080;margin-bottom:28px}
        .island-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
        .island-card{background:#fff;border-radius:14px;border:1px solid #e4ecf0;padding:20px;text-decoration:none;display:flex;align-items:flex-start;gap:14px;transition:.18s;box-shadow:0 1px 4px rgba(0,0,0,.04)}
        .island-card:hover{border-color:#0a7b8c;box-shadow:0 4px 20px rgba(10,123,140,.12);transform:translateY(-2px)}
        .island-emoji{font-size:28px;flex-shrink:0;line-height:1}
        .island-name{font-size:15px;font-weight:700;color:#0a1f2e;margin-bottom:4px}
        .island-tagline{font-size:12px;color:#5a7080;line-height:1.5}
        .back-link{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.7);text-decoration:none;font-size:13px;font-weight:500;margin-bottom:24px;transition:.15s}
        .back-link:hover{color:#fff}
        @media(max-width:600px){
          .oar-hero{padding:60px 20px 40px}
          .oar-hero h1{font-size:30px}
          .oar-content{padding:40px 20px}
          .island-grid{grid-template-columns:1fr 1fr}
        }
      `}</style>

      <div className="oar-hero">
        <a href="/" className="back-link">← Tillbaka till Svalla</a>
        <h1>Alla öar</h1>
        <p>Utforska {ISLANDS.length} öar i Stockholms skärgård — från Vaxholm till ytterskärgårdens vildaste klippor.</p>
      </div>

      <nav className="oar-nav">
        {regions.map(r => (
          <a key={r.key} href={`#${r.key}`}>{r.label}</a>
        ))}
      </nav>

      <div className="oar-content">
        {regions.map(region => {
          const islands = ISLANDS.filter(i => i.region === region.key)
          return (
            <section key={region.key} id={region.key} className="region-section">
              <div className="region-header">
                <div className="region-title">{islands.length} öar</div>
                <div className="region-name">{region.label}</div>
                <div className="region-desc">{region.desc}</div>
              </div>
              <div className="island-grid">
                {islands.map(island => (
                  <Link key={island.slug} href={`/o/${island.slug}`} className="island-card">
                    <span className="island-emoji">{island.emoji}</span>
                    <div>
                      <div className="island-name">{island.name}</div>
                      <div className="island-tagline">{island.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
