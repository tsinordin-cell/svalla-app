/**
 * Ösidan är force-dynamic (cookies krävs) och renderas därför vid varje
 * besök. Utan skelett står användaren och tittar på föregående sida tills
 * servern svarat. 824 ösidor — det är den mest besökta dynamiska sidtypen.
 */
const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function OLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ width: '100%', height: 260, background: 'rgba(13,42,62,0.7)' }} className="sk" />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px', paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        {/* Namn + tagline */}
        <div style={{ width: '55%', height: 28, marginBottom: 10, ...sk }} className="sk" />
        <div style={{ width: '75%', height: 14, marginBottom: 24, ...sk }} className="sk" />

        {/* Snabbfakta-pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {[110, 90, 130, 80].map((w, i) => (
            <div key={i} style={{ width: w, height: 32, ...sk, borderRadius: 20 }} className="sk" />
          ))}
        </div>

        {/* Textblock */}
        {[1, 2].map(b => (
          <div key={b} style={{ background: 'var(--white)', borderRadius: 20, padding: 16, marginBottom: 16, boxShadow: '0 1px 8px rgba(0,30,50,0.06)' }}>
            <div style={{ width: '35%', height: 14, marginBottom: 12, ...sk }} className="sk" />
            {[95, 88, 70].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 11, marginBottom: 8, ...sk }} className="sk" />
            ))}
          </div>
        ))}

        {/* Kort-rutnät */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ height: 130, ...sk, borderRadius: 16 }} className="sk" />
          ))}
        </div>
      </div>

      <style>{`
        .sk { animation: sk-pulse 1.6s ease-in-out infinite; }
        @keyframes sk-pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
      `}</style>
    </div>
  )
}
