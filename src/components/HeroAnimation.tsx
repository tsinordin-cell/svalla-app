'use client'

// Speed constants — tweak here to adjust all animation timing
const S = {
  islandFar:  60,   // far island parallax loop (s)
  islandMid:  40,   // mid island parallax loop (s)
  wave1:      8,    // front wave (s)
  wave2:      11,   // mid wave (s)
  wave3:      15,   // back wave (s)
  boatSail:   18,   // boat horizontal traverse (s)
  boatBob:    3.2,  // boat vertical bob (s)
  fish1:      14,   // fish school 1 (s)
  fish2:      19,   // fish school 2 (s)
  fishBig:    28,   // lone big fish (s)
  seaweed:    2.8,  // seaweed sway (s)
  seal:       12,   // seal bob cycle (s)
  bird1:      22,   // bird 1 traverse (s)
  bird2:      17,   // bird 2 traverse (s)
  sunRay:     5,    // sun ray pulse (s)
}

export default function HeroAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        isolation: 'isolate',
        zIndex: 0,
      }}
    >
      <style>{`
        /* ── Islands ── */
        @keyframes ha-island-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Waves ── */
        @keyframes ha-wave {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Boat ── */
        @keyframes ha-boat-sail {
          0%   { transform: translateX(-20%); }
          100% { transform: translateX(120%); }
        }
        @keyframes ha-boat-bob {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-5px) rotate(1deg); }
        }

        /* ── Fish ── */
        @keyframes ha-fish1 {
          0%   { transform: translateX(110vw); }
          100% { transform: translateX(-20vw); }
        }
        @keyframes ha-fish2 {
          0%   { transform: translateX(-20vw) scaleX(-1); }
          100% { transform: translateX(110vw) scaleX(-1); }
        }
        @keyframes ha-fish-big {
          0%   { transform: translateX(110vw) scaleX(-1); }
          100% { transform: translateX(-15vw) scaleX(-1); }
        }

        /* ── Seaweed ── */
        @keyframes ha-seaweed {
          0%, 100% { transform: rotate(-12deg) scaleY(1); }
          50%       { transform: rotate(12deg)  scaleY(1.04); }
        }
        @keyframes ha-seaweed2 {
          0%, 100% { transform: rotate(10deg) scaleY(1); }
          50%       { transform: rotate(-10deg) scaleY(1.04); }
        }

        /* ── Seal ── */
        @keyframes ha-seal {
          0%,  8% { opacity: 0; transform: translateY(8px); }
          10%, 45% { opacity: 1; transform: translateY(0px); }
          50%, 55% { opacity: 1; transform: translateY(-3px); }
          60%, 65% { opacity: 1; transform: translateY(0px); }
          70%, 100% { opacity: 0; transform: translateY(8px); }
        }

        /* ── Birds ── */
        @keyframes ha-bird1 {
          0%   { transform: translateX(-10vw) translateY(0px); }
          40%  { transform: translateX(60vw)  translateY(-12px); }
          100% { transform: translateX(115vw) translateY(5px); }
        }
        @keyframes ha-bird2 {
          0%   { transform: translateX(115vw) translateY(0px); }
          50%  { transform: translateX(40vw)  translateY(-8px); }
          100% { transform: translateX(-10vw) translateY(4px); }
        }
        @keyframes ha-bird-wing {
          0%, 100% { d: path("M0,4 Q4,0 8,4"); }
          50%       { d: path("M0,4 Q4,8 8,4"); }
        }

        /* ── Sun rays ── */
        @keyframes ha-sun-ray {
          0%, 100% { opacity: 0.12; transform: scaleY(1); }
          50%       { opacity: 0.22; transform: scaleY(1.06); }
        }

        /* ── Water shimmer ── */
        @keyframes ha-shimmer {
          0%   { opacity: 0.3; transform: translateX(-5px); }
          50%  { opacity: 0.6; transform: translateX(5px); }
          100% { opacity: 0.3; transform: translateX(-5px); }
        }
      `}</style>

      {/* ─── 1. SKY GRADIENT ─── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #c8e8f8 0%, #e8f4fa 45%, #b8d8e8 100%)',
      }} />

      {/* ─── 2. SUN RAYS ─── */}
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: '-10%',
          left: `${28 + i * 6}%`,
          width: 2,
          height: '55%',
          background: 'linear-gradient(180deg, rgba(255,240,180,0.9) 0%, rgba(255,240,180,0) 100%)',
          transformOrigin: 'top center',
          transform: `rotate(${-18 + i * 6}deg)`,
          animation: `ha-sun-ray ${S.sunRay + i * 0.4}s ease-in-out ${i * 0.7}s infinite`,
        }} />
      ))}

      {/* Sun disc */}
      <div style={{
        position: 'absolute',
        top: '4%', left: '52%',
        width: 48, height: 48,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #fffde0 30%, #ffe87a 70%, rgba(255,220,80,0) 100%)',
        boxShadow: '0 0 32px 12px rgba(255,220,80,0.25)',
        transform: 'translateX(-50%)',
      }} />

      {/* ─── 3. FAR ISLANDS (parallax) ─── */}
      <div style={{
        position: 'absolute',
        bottom: '32%',
        left: 0,
        width: '200%',
        height: 80,
        animation: `ha-island-scroll ${S.islandFar}s linear infinite`,
      }}>
        <svg viewBox="0 0 2400 80" preserveAspectRatio="none" width="100%" height="80"
          style={{ display: 'block' }}>
          {/* First half */}
          <path d="M0,80 L0,55 Q60,30 120,48 Q180,25 260,40 Q340,20 420,38 Q480,15 560,32 Q640,45 720,28 Q800,10 880,30 Q940,42 1000,20 Q1060,5 1140,22 Q1200,35 1200,80 Z"
            fill="#a8c8b8" opacity="0.5"/>
          {/* Second half — identical for seamless loop */}
          <path d="M1200,80 L1200,55 Q1260,30 1320,48 Q1380,25 1460,40 Q1540,20 1620,38 Q1680,15 1760,32 Q1840,45 1920,28 Q2000,10 2080,30 Q2140,42 2200,20 Q2260,5 2340,22 Q2400,35 2400,80 Z"
            fill="#a8c8b8" opacity="0.5"/>
        </svg>
      </div>

      {/* ─── 4. MID ISLANDS (parallax, with trees / cottages) ─── */}
      <div style={{
        position: 'absolute',
        bottom: '31%',
        left: 0,
        width: '200%',
        height: 110,
        animation: `ha-island-scroll ${S.islandMid}s linear infinite`,
      }}>
        <svg viewBox="0 0 2400 110" preserveAspectRatio="none" width="100%" height="110"
          style={{ display: 'block' }}>
          {/* Island bodies — first half */}
          <path d="M0,110 L0,70 Q80,40 180,55 Q280,30 400,50 Q500,20 620,42 Q720,55 850,35 Q950,18 1100,38 Q1160,48 1200,110 Z"
            fill="#7aaa8a"/>
          {/* Trees — first half */}
          {[80,130,200,260,450,510,660,730,860,960,1040].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${i % 3 === 0 ? 28 : i % 3 === 1 ? 22 : 32})`}>
              <polygon points="0,-18 6,0 -6,0" fill="#2d6e4e" opacity="0.85"/>
              <polygon points="0,-26 5,-10 -5,-10" fill="#3a8060" opacity="0.9"/>
              <rect x="-1.5" y="0" width="3" height="6" fill="#5c3d1e" opacity="0.7"/>
            </g>
          ))}
          {/* Cottage — first half */}
          <g transform="translate(320, 36)">
            <rect x="0" y="0" width="16" height="10" fill="#f5e0c0" opacity="0.9"/>
            <polygon points="-2,0 18,0 8,-8" fill="#c0504a" opacity="0.9"/>
          </g>
          <g transform="translate(780, 24)">
            <rect x="0" y="0" width="14" height="9" fill="#f5e0c0" opacity="0.9"/>
            <polygon points="-2,0 16,0 7,-7" fill="#c0504a" opacity="0.9"/>
          </g>
          {/* Dock — first half */}
          <line x1="420" y1="55" x2="420" y2="72" stroke="#8b6040" strokeWidth="3" opacity="0.7"/>
          <rect x="412" y="68" width="16" height="4" fill="#8b6040" opacity="0.6" rx="1"/>

          {/* Second half — identical */}
          <path d="M1200,110 L1200,70 Q1280,40 1380,55 Q1480,30 1600,50 Q1700,20 1820,42 Q1920,55 2050,35 Q2150,18 2300,38 Q2360,48 2400,110 Z"
            fill="#7aaa8a"/>
          {[1280,1330,1400,1460,1650,1710,1860,1930,2060,2160,2240].map((x, i) => (
            <g key={i+20} transform={`translate(${x}, ${i % 3 === 0 ? 28 : i % 3 === 1 ? 22 : 32})`}>
              <polygon points="0,-18 6,0 -6,0" fill="#2d6e4e" opacity="0.85"/>
              <polygon points="0,-26 5,-10 -5,-10" fill="#3a8060" opacity="0.9"/>
              <rect x="-1.5" y="0" width="3" height="6" fill="#5c3d1e" opacity="0.7"/>
            </g>
          ))}
          <g transform="translate(1520, 36)">
            <rect x="0" y="0" width="16" height="10" fill="#f5e0c0" opacity="0.9"/>
            <polygon points="-2,0 18,0 8,-8" fill="#c0504a" opacity="0.9"/>
          </g>
          <g transform="translate(1980, 24)">
            <rect x="0" y="0" width="14" height="9" fill="#f5e0c0" opacity="0.9"/>
            <polygon points="-2,0 16,0 7,-7" fill="#c0504a" opacity="0.9"/>
          </g>
          <line x1="1620" y1="55" x2="1620" y2="72" stroke="#8b6040" strokeWidth="3" opacity="0.7"/>
          <rect x="1612" y="68" width="16" height="4" fill="#8b6040" opacity="0.6" rx="1"/>
        </svg>
      </div>

      {/* ─── 5. WATER BACKGROUND ─── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '33%',
        background: 'linear-gradient(180deg, #4a9ab8 0%, #2a6a88 40%, #1a4a68 100%)',
      }} />

      {/* Water shimmer */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '33%',
        background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 28px, rgba(255,255,255,0.04) 28px, rgba(255,255,255,0.04) 30px)',
        animation: `ha-shimmer 4s ease-in-out infinite`,
      }} />

      {/* ─── 6. WAVE LAYERS ─── */}
      {/* Back wave */}
      <div style={{
        position: 'absolute',
        bottom: '28%',
        left: 0,
        width: '200%',
        height: 28,
        animation: `ha-wave ${S.wave3}s linear infinite`,
        opacity: 0.45,
      }}>
        <svg viewBox="0 0 2400 28" preserveAspectRatio="none" width="100%" height="28">
          <path d="M0,14 Q100,0 200,14 Q300,28 400,14 Q500,0 600,14 Q700,28 800,14 Q900,0 1000,14 Q1100,28 1200,14 L1200,28 L0,28 Z"
            fill="#3a8aa8" opacity="0.6"/>
          <path d="M1200,14 Q1300,0 1400,14 Q1500,28 1600,14 Q1700,0 1800,14 Q1900,28 2000,14 Q2100,0 2200,14 Q2300,28 2400,14 L2400,28 L1200,28 Z"
            fill="#3a8aa8" opacity="0.6"/>
        </svg>
      </div>

      {/* Mid wave */}
      <div style={{
        position: 'absolute',
        bottom: '26%',
        left: 0,
        width: '200%',
        height: 35,
        animation: `ha-wave ${S.wave2}s linear infinite`,
        opacity: 0.6,
      }}>
        <svg viewBox="0 0 2400 35" preserveAspectRatio="none" width="100%" height="35">
          <path d="M0,18 Q120,2 240,18 Q360,34 480,18 Q600,2 720,18 Q840,34 960,18 Q1080,2 1200,18 L1200,35 L0,35 Z"
            fill="#2a7898" opacity="0.65"/>
          <path d="M1200,18 Q1320,2 1440,18 Q1560,34 1680,18 Q1800,2 1920,18 Q2040,34 2160,18 Q2280,2 2400,18 L2400,35 L1200,35 Z"
            fill="#2a7898" opacity="0.65"/>
        </svg>
      </div>

      {/* Front wave */}
      <div style={{
        position: 'absolute',
        bottom: '24%',
        left: 0,
        width: '200%',
        height: 42,
        animation: `ha-wave ${S.wave1}s linear infinite`,
      }}>
        <svg viewBox="0 0 2400 42" preserveAspectRatio="none" width="100%" height="42">
          <path d="M0,22 Q80,4 160,22 Q240,40 320,22 Q400,4 480,22 Q560,40 640,22 Q720,4 800,22 Q880,40 960,22 Q1040,4 1120,22 Q1160,32 1200,22 L1200,42 L0,42 Z"
            fill="#1e6888" opacity="0.8"/>
          <path d="M1200,22 Q1280,4 1360,22 Q1440,40 1520,22 Q1600,4 1680,22 Q1760,40 1840,22 Q1920,4 2000,22 Q2080,40 2160,22 Q2240,4 2320,22 Q2360,32 2400,22 L2400,42 L1200,42 Z"
            fill="#1e6888" opacity="0.8"/>
        </svg>
      </div>

      {/* ─── 7. SAILBOAT ─── */}
      <div style={{
        position: 'absolute',
        bottom: '27%',
        left: 0,
        width: '100%',
        height: 70,
        animation: `ha-boat-sail ${S.boatSail}s linear infinite`,
      }}>
        {/* Bob wrapper — positioned so boat starts at left */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          animation: `ha-boat-bob ${S.boatBob}s ease-in-out infinite`,
        }}>
          <svg viewBox="0 0 72 64" width="72" height="64">
            {/* Wake */}
            <path d="M36,58 Q20,60 4,58" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M36,61 Q18,64 2,61" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeLinecap="round"/>
            {/* Hull */}
            <path d="M12,50 Q20,56 36,54 Q52,56 60,50 Q54,58 36,60 Q18,58 12,50 Z" fill="#e8d5b0"/>
            <path d="M12,50 L18,42 L54,42 L60,50 Z" fill="#d4b870"/>
            {/* Mast */}
            <line x1="36" y1="42" x2="36" y2="8" stroke="#8b6040" strokeWidth="2" strokeLinecap="round"/>
            {/* Main sail */}
            <path d="M36,10 L58,40 L36,40 Z" fill="white" opacity="0.95"/>
            {/* Jib */}
            <path d="M36,16 L18,38 L36,38 Z" fill="white" opacity="0.6"/>
            {/* Flag */}
            <path d="M36,8 L44,11 L36,14 Z" fill="#e05050" opacity="0.9"/>
            {/* Cabin */}
            <rect x="30" y="38" width="12" height="6" rx="2" fill="#c8a050" opacity="0.9"/>
          </svg>
        </div>
      </div>

      {/* ─── 8. UNDERWATER ZONE ─── */}
      {/* Light rays into water */}
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: '67%',
          left: `${20 + i * 18}%`,
          width: 3,
          height: '25%',
          background: 'linear-gradient(180deg, rgba(120,200,240,0.18) 0%, rgba(120,200,240,0) 100%)',
          transformOrigin: 'top center',
          transform: `rotate(${-8 + i * 5}deg)`,
          animation: `ha-sun-ray ${S.sunRay + i * 0.5}s ease-in-out ${i * 1.1}s infinite`,
        }} />
      ))}

      {/* Fish school 1 (right → left) */}
      <div style={{
        position: 'absolute',
        top: '72%',
        left: 0,
        width: '100%',
        animation: `ha-fish1 ${S.fish1}s linear 2s infinite`,
      }}>
        <svg viewBox="0 0 110 22" width="110" height="22">
          {[
            [0,8],[14,4],[14,14],[28,8],[28,0],[28,16],[42,6],[42,12],
          ].map(([x,y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <ellipse cx="5" cy="3" rx="5" ry="2.5" fill="#5ba8c0" opacity="0.8"/>
              <path d="M0,3 L-4,0 L-4,6 Z" fill="#4a98b0" opacity="0.8"/>
              <circle cx="7" cy="2" r="0.8" fill="#1a3a48" opacity="0.9"/>
            </g>
          ))}
        </svg>
      </div>

      {/* Fish school 2 (left → right) */}
      <div style={{
        position: 'absolute',
        top: '80%',
        left: 0,
        width: '100%',
        animation: `ha-fish2 ${S.fish2}s linear 5s infinite`,
      }}>
        <svg viewBox="0 0 90 18" width="90" height="18">
          {[
            [0,6],[12,2],[12,12],[24,6],[36,4],[36,10],
          ].map(([x,y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <ellipse cx="5" cy="3" rx="4.5" ry="2" fill="#7bbca8" opacity="0.75"/>
              <path d="M0,3 L-3.5,0.5 L-3.5,5.5 Z" fill="#6aac98" opacity="0.75"/>
              <circle cx="7" cy="2.2" r="0.7" fill="#1a3a48" opacity="0.9"/>
            </g>
          ))}
        </svg>
      </div>

      {/* Big lone fish (abborre) */}
      <div style={{
        position: 'absolute',
        top: '76%',
        left: 0,
        width: '100%',
        animation: `ha-fish-big ${S.fishBig}s linear 8s infinite`,
      }}>
        <svg viewBox="0 0 60 28" width="60" height="28">
          <ellipse cx="28" cy="14" rx="22" ry="9" fill="#7b9a5c" opacity="0.85"/>
          {/* Stripes */}
          {[14,20,26].map(x => (
            <line key={x} x1={x} y1="7" x2={x} y2="21" stroke="#4a6a38" strokeWidth="2" opacity="0.5"/>
          ))}
          {/* Tail */}
          <path d="M6,14 L0,6 L0,22 Z" fill="#6a8a4c" opacity="0.85"/>
          {/* Fin (dorsal) */}
          <path d="M20,6 Q28,0 36,5 L36,6" fill="#6a8a4c" opacity="0.7"/>
          {/* Eye */}
          <circle cx="44" cy="12" r="3" fill="#f0e8c0" opacity="0.9"/>
          <circle cx="45" cy="11.5" r="1.5" fill="#1a2a18" opacity="0.95"/>
          {/* Mouth */}
          <path d="M50,14 Q52,16 50,17" stroke="#5a4a28" strokeWidth="1" fill="none" opacity="0.7"/>
        </svg>
      </div>

      {/* ─── SEAWEED (18 stalks) ─── */}
      {[...Array(18)].map((_, i) => {
        const x = 3 + i * 5.4  // spread across width (%)
        const h = 28 + (i % 5) * 8  // vary heights 28–60px
        const hue = 120 + (i % 4) * 10
        const delay = (i * 0.31) % S.seaweed
        const anim = i % 2 === 0 ? 'ha-seaweed' : 'ha-seaweed2'
        return (
          <div key={i} style={{
            position: 'absolute',
            bottom: '0%',
            left: `${x}%`,
            width: 8,
            height: h,
            transformOrigin: 'bottom center',
            animation: `${anim} ${S.seaweed + (i % 3) * 0.4}s ease-in-out ${delay}s infinite`,
          }}>
            <svg viewBox={`0 0 8 ${h}`} width="8" height={h} style={{ display: 'block' }}>
              <path
                d={`M4,${h} Q6,${h*0.75} 3,${h*0.5} Q6,${h*0.28} 4,0`}
                stroke={`hsl(${hue},55%,38%)`}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.75"
              />
            </svg>
          </div>
        )
      })}

      {/* ─── ROCKS (bottom) ─── */}
      <svg
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 40, display: 'block' }}
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
      >
        {[
          [80, 40, 28, 12],
          [160, 40, 20, 9],
          [280, 40, 35, 14],
          [420, 40, 24, 10],
          [550, 40, 32, 13],
          [680, 40, 22, 9],
          [780, 40, 38, 16],
          [880, 40, 26, 11],
          [960, 40, 20, 8],
        ].map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
            fill={i % 2 === 0 ? '#4a5a68' : '#3a4a58'} opacity="0.7"/>
        ))}
      </svg>

      {/* ─── SEAL ─── */}
      <div style={{
        position: 'absolute',
        bottom: '26%',
        right: '15%',
        animation: `ha-seal ${S.seal}s ease-in-out 3s infinite`,
        opacity: 0,
      }}>
        <svg viewBox="0 0 36 22" width="36" height="22">
          {/* Body */}
          <ellipse cx="16" cy="14" rx="14" ry="7" fill="#7a6a5a" opacity="0.9"/>
          {/* Head */}
          <circle cx="28" cy="10" r="7" fill="#8a7a6a" opacity="0.9"/>
          {/* Eye */}
          <circle cx="31" cy="9" r="1.5" fill="#1a1a1a" opacity="0.95"/>
          <circle cx="31.5" cy="8.5" r="0.5" fill="white" opacity="0.8"/>
          {/* Whiskers */}
          <line x1="34" y1="10" x2="38" y2="9"  stroke="#c0b0a0" strokeWidth="0.8" opacity="0.7"/>
          <line x1="34" y1="11" x2="38" y2="11" stroke="#c0b0a0" strokeWidth="0.8" opacity="0.7"/>
          <line x1="34" y1="12" x2="38" y2="13" stroke="#c0b0a0" strokeWidth="0.8" opacity="0.7"/>
          {/* Flipper */}
          <path d="M4,16 Q0,22 6,20 Q8,22 10,18" fill="#6a5a4a" opacity="0.8"/>
          {/* Tail flippers */}
          <path d="M2,12 Q-4,8 0,6" fill="#6a5a4a" opacity="0.75"/>
          <path d="M2,14 Q-4,18 0,20" fill="#6a5a4a" opacity="0.75"/>
        </svg>
      </div>

      {/* ─── BIRDS ─── */}
      {/* Bird 1 */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: 0,
        animation: `ha-bird1 ${S.bird1}s ease-in-out 1s infinite`,
      }}>
        <svg viewBox="0 0 20 10" width="20" height="10">
          <path d="M0,5 Q5,0 10,5" stroke="#4a6a80" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M10,5 Q15,0 20,5" stroke="#4a6a80" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Bird 1 companion */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: 0,
        animation: `ha-bird1 ${S.bird1}s ease-in-out 1.8s infinite`,
        opacity: 0.7,
      }}>
        <svg viewBox="0 0 14 8" width="14" height="8">
          <path d="M0,4 Q3.5,0 7,4" stroke="#4a6a80" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M7,4 Q10.5,0 14,4" stroke="#4a6a80" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Bird 2 */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: 0,
        animation: `ha-bird2 ${S.bird2}s ease-in-out 4s infinite`,
      }}>
        <svg viewBox="0 0 20 10" width="20" height="10">
          <path d="M0,5 Q5,0 10,5" stroke="#5a7a90" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M10,5 Q15,0 20,5" stroke="#5a7a90" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* ─── CONTENT READABILITY OVERLAY ─── */}
      {/* Deep navy gradient so hero white text remains readable against the light scene */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(8,22,40,0.55) 0%, rgba(10,28,48,0.38) 40%, rgba(15,38,60,0.50) 75%, rgba(10,25,42,0.72) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ─── VIGNETTE OVERLAY ─── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,18,32,0.45) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
