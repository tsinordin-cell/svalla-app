/**
 * Utseendet för /julkalender (2026-11-14, Max: "gör sidan 10x bättre, var är vår logga, ge det mer kärlek").
 * Vinternatt i skärgården överst, riktiga kalenderluckor i Svallas färger under.
 * Ren CSS i en <style>-tagg så att sidan fortsatt kan vara en serverkomponent.
 */

/** Luckornas färgtoner, i ett mönster så att grannar aldrig får samma färg. */
export const TONER = ['marin', 'rod', 'gran', 'natt', 'sand', 'hav'] as const
export function tonFor(dag: number): (typeof TONER)[number] {
  // Ett fast mönster som roterar per rad (4 kolumner), så att färgerna sprids jämnt.
  const rad = Math.floor((dag - 1) / 4)
  return TONER[(dag - 1 + rad * 2) % TONER.length] ?? 'marin'
}

/** Små symboler i hörnet av varje lucka (rena SVG-vägar, 24×24). */
const IKONER = [
  // snöflinga
  '<path d="M12 2v20M4.9 6.5l14.2 11M4.9 17.5l14.2-11M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/>',
  // stjärna
  '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
  // fyr
  '<path d="M10 21l1-12h2l1 12M9 9h6M10.5 9V6h3v3M12 3v3M4 7l5 2M20 7l-5 2M7 21h10"/>',
  // gran
  '<path d="M12 3l5 7h-3l4 5h-3l3 4H6l3-4H6l4-5H7zM12 19v2"/>',
  // segelbåt
  '<path d="M12 3v14M12 4l6 11h-6M11 7l-5 8h5M4 18c2.5 1.6 5.5 1.6 8 0s5.5-1.6 8 0"/>',
  // ljus
  '<path d="M9 21h6M10 21V10h4v11M12 10V8M12 3c1.5 1.5 1.5 3 0 4.5-1.5-1.5-1.5-3 0-4.5z"/>',
] as const
export function ikonFor(dag: number): string {
  return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IKONER[(dag - 1) % IKONER.length] ?? ''}</svg>`
}

export const JULKALENDER_CSS = `
.jk{min-height:100vh;background:#f3efe8;padding-bottom:80px}
.jk-hero{position:relative;overflow:hidden;color:#f5f4ef;text-align:center;
  background:radial-gradient(120% 80% at 50% 0%,#1d4c6e 0%,#0d2a44 45%,#071a2c 100%);
  padding:calc(env(safe-area-inset-top,0px) + 22px) 20px 0}
.jk-top{position:relative;z-index:3;max-width:1080px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.jk-top a{color:#f5f4ef;text-decoration:none}
.jk-hem{font-size:13px;font-weight:600;opacity:.8}
.jk-hem:hover{opacity:1}
.jk-stjarnor{position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:radial-gradient(1.4px 1.4px at 12% 18%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 28% 8%,#fff 50%,transparent 51%),
  radial-gradient(1.6px 1.6px at 44% 22%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 63% 12%,#fff 50%,transparent 51%),
  radial-gradient(1.3px 1.3px at 78% 26%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 90% 9%,#fff 50%,transparent 51%),
  radial-gradient(1.2px 1.2px at 6% 38%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 54% 40%,#fff 50%,transparent 51%),
  radial-gradient(1.2px 1.2px at 85% 44%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 36% 34%,#fff 50%,transparent 51%);
  opacity:.75;animation:jkBlink 5s ease-in-out infinite alternate}
@keyframes jkBlink{from{opacity:.45}to{opacity:.85}}
.jk-sno{position:absolute;inset:-40% 0 0;z-index:2;pointer-events:none;
  background-image:radial-gradient(2.5px 2.5px at 10% 10%,rgba(255,255,255,.9) 50%,transparent 51%),radial-gradient(2px 2px at 30% 30%,rgba(255,255,255,.8) 50%,transparent 51%),
  radial-gradient(3px 3px at 50% 15%,rgba(255,255,255,.85) 50%,transparent 51%),radial-gradient(2px 2px at 70% 40%,rgba(255,255,255,.8) 50%,transparent 51%),
  radial-gradient(2.5px 2.5px at 90% 20%,rgba(255,255,255,.9) 50%,transparent 51%),radial-gradient(1.8px 1.8px at 20% 60%,rgba(255,255,255,.7) 50%,transparent 51%),
  radial-gradient(2.2px 2.2px at 60% 70%,rgba(255,255,255,.75) 50%,transparent 51%),radial-gradient(1.8px 1.8px at 85% 75%,rgba(255,255,255,.7) 50%,transparent 51%);
  background-size:320px 320px;animation:jkSno 14s linear infinite}
.jk-sno.b{background-size:210px 210px;opacity:.55;animation-duration:9s}
@keyframes jkSno{from{transform:translateY(0)}to{transform:translateY(320px)}}
@media (prefers-reduced-motion:reduce){.jk-sno,.jk-stjarnor,.jk-idag{animation:none!important}}
.jk-inner{position:relative;z-index:3;max-width:720px;margin:0 auto;padding:34px 0 0}
.jk-eyebrow{font-size:12px;font-weight:700;letter-spacing:.24em;color:#f0b97f}
.jk-h1{font-family:var(--font-display),'Playfair Display',Georgia,serif;font-weight:900;font-size:clamp(38px,7.5vw,68px);line-height:1.02;margin:12px 0 14px;letter-spacing:-.01em}
.jk-h1 em{font-style:italic;font-weight:700;color:#f0b97f}
.jk-ingress{font-size:17px;line-height:1.6;color:rgba(245,244,239,.86);max-width:540px;margin:0 auto}
.jk-cta{display:inline-flex;align-items:center;gap:8px;margin-top:22px;background:#c96e2a;color:#fff;padding:14px 26px;border-radius:999px;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 8px 24px rgba(201,110,42,.35)}
.jk-cta:hover{background:#b5591a}
.jk-nedrakning{display:inline-flex;gap:10px;align-items:baseline;margin-top:22px;padding:10px 18px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);font-size:14px;color:rgba(245,244,239,.9)}
.jk-nedrakning b{font-family:var(--font-display),'Playfair Display',Georgia,serif;font-size:22px;color:#f0b97f}
.jk-landskap{position:relative;z-index:1;display:block;width:calc(100% + 40px);max-width:none;height:auto;margin:26px -20px -1px}
.jk-forhand{background:#0f2f40;color:#fff;text-align:center;font-size:14px;padding:10px 16px}
.jk-wrap{max-width:1080px;margin:0 auto;padding:30px 16px 0}
.jk-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;grid-auto-flow:dense}
@media (max-width:820px){.jk-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:560px){.jk-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}}
.jk-dorr{position:relative;display:flex;flex-direction:column;gap:6px;min-height:150px;border-radius:16px;padding:16px 16px 18px;
  color:#f5f4ef;text-decoration:none;overflow:hidden;isolation:isolate;
  box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 10px 24px rgba(7,26,44,.14);transition:transform .25s ease,box-shadow .25s ease}
.jk-dorr::before{content:"";position:absolute;inset:7px;border:1px solid rgba(255,255,255,.22);border-radius:11px;pointer-events:none;z-index:-1}
.jk-dorr::after{content:"";position:absolute;inset:0;z-index:-2;opacity:.18;pointer-events:none;
  background:radial-gradient(circle at 85% 10%,rgba(255,255,255,.55),transparent 45%),repeating-linear-gradient(135deg,rgba(255,255,255,.05) 0 2px,transparent 2px 9px)}
.jk-dorr[data-ton=marin]{background:linear-gradient(160deg,#16466b,#0a2540)}
.jk-dorr[data-ton=rod]{background:linear-gradient(160deg,#a5372d,#6e1f1a)}
.jk-dorr[data-ton=gran]{background:linear-gradient(160deg,#2f5a49,#173528)}
.jk-dorr[data-ton=natt]{background:linear-gradient(160deg,#24384f,#121e2d)}
.jk-dorr[data-ton=hav]{background:linear-gradient(160deg,#2b7187,#14485a)}
.jk-dorr[data-ton=sand]{background:linear-gradient(160deg,#efe6d4,#dccdb0);color:#0a2540}
.jk-dorr[data-ton=sand]::before{border-color:rgba(10,37,64,.18)}
.jk-nr{font-family:var(--font-display),'Playfair Display',Georgia,serif;font-weight:900;font-size:44px;line-height:.95;color:#f0c27f;letter-spacing:-.02em}
.jk-dorr[data-ton=sand] .jk-nr{color:#a5372d}
.jk-ikon{position:absolute;top:14px;right:14px;opacity:.55}
.jk-titel{font-size:15px;font-weight:700;line-height:1.3}
.jk-teaser{font-size:13px;line-height:1.5;opacity:.85}
.jk-litet{font-size:12px;opacity:.75;line-height:1.45}
.jk-oppna{margin-top:auto;font-size:13px;font-weight:700;color:#f0c27f}
.jk-dorr[data-ton=sand] .jk-oppna{color:#a5372d}
a.jk-dorr:hover,details.jk-dorr:not([open]):hover{transform:translateY(-3px) rotate(-.4deg);box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 16px 30px rgba(7,26,44,.22)}
.jk-last{filter:saturate(.75)}
.jk-last .jk-nr{color:rgba(245,244,239,.92)}
.jk-dorr[data-ton=sand].jk-last .jk-nr{color:#0a2540}
.jk-las{display:inline-flex;align-items:center;gap:6px;margin-top:auto;font-size:12px;font-weight:600;opacity:.8}
.jk-rosett{position:absolute;right:-26px;bottom:18px;width:110px;height:16px;background:rgba(240,194,127,.85);transform:rotate(-38deg);z-index:-1;opacity:.55}
.jk-stor{grid-column:span 2;grid-row:span 2;min-height:314px}
.jk-stor .jk-nr{font-size:88px}
@media (max-width:560px){.jk-stor{grid-row:span 1;min-height:180px}.jk-stor .jk-nr{font-size:64px}}
.jk-idag{outline:3px solid #f0c27f;outline-offset:3px;animation:jkGlod 2.4s ease-in-out infinite}
@keyframes jkGlod{0%,100%{box-shadow:0 0 0 0 rgba(240,194,127,.0),0 10px 24px rgba(7,26,44,.14)}50%{box-shadow:0 0 28px 6px rgba(240,194,127,.45),0 10px 24px rgba(7,26,44,.14)}}
.jk-idag-etikett{position:absolute;top:14px;right:44px;font-size:10px;font-weight:800;letter-spacing:.14em;background:#f0c27f;color:#0a2540;border-radius:999px;padding:3px 8px}
details.jk-dorr summary{list-style:none;cursor:pointer;display:flex;flex-direction:column;gap:6px}
details.jk-dorr summary::-webkit-details-marker{display:none}
details.jk-dorr[open]{grid-column:1 / -1;grid-row:auto;min-height:0;padding:24px 24px 26px}
details.jk-dorr[open] .jk-titel{font-family:var(--font-display),'Playfair Display',Georgia,serif;font-size:26px}
.jk-text{font-size:16px;line-height:1.7;max-width:640px;margin:10px 0 0;opacity:.95}
.jk-lank{display:inline-block;margin-top:10px;font-size:15px;font-weight:700;color:#f0c27f;text-decoration:none}
.jk-dorr[data-ton=sand] .jk-lank{color:#a5372d}
.jk-kallor{font-size:12px;opacity:.8;margin-top:10px;line-height:1.6}
.jk-kallor a{color:inherit;text-decoration:underline}
.jk-dela{align-self:flex-start;margin-top:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:8px 14px;font-size:13px;font-weight:700;color:inherit;cursor:pointer}
.jk-dorr[data-ton=sand] .jk-dela{background:rgba(10,37,64,.06);border-color:rgba(10,37,64,.2)}
.jk-reklam{align-self:flex-start;font-size:11px;font-weight:700;background:#fff3e6;color:#a8501a;border-radius:6px;padding:2px 7px}
.jk-kort{background:#fff;border-radius:18px;padding:18px 20px;margin-bottom:16px;box-shadow:0 6px 20px rgba(7,26,44,.08)}
.jk-fot{max-width:720px;margin:44px auto 0;text-align:center;color:#54737f;font-size:13px;line-height:1.7;padding:0 20px}
.jk-fot a{color:#1e5c82}
.jk-fot-logga{display:inline-flex;margin-bottom:10px}
`

/** Vinterlandskap längst ner i hero: snöiga öar, en röd stuga med tänt fönster och en fyr. */
export const LANDSKAP_SVG = `<svg class="jk-landskap" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
<defs><linearGradient id="jkIs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5778"/><stop offset="1" stop-color="#173a55"/></linearGradient>
<radialGradient id="jkLjus" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>
<path d="M0 150 C160 120 260 128 380 140 C470 148 520 112 620 118 C700 123 760 150 860 146 C980 141 1040 104 1160 110 C1260 115 1340 140 1440 132 L1440 220 L0 220 Z" fill="url(#jkIs)" opacity=".75"/>
<g fill="#0c2236">
<path d="M210 150 l14-34 14 34z M232 150 l10-24 10 24z M1110 118 l16-40 16 40z M1136 118 l11-28 11 28z M1160 120 l9-22 9 22z"/>
<rect x="1040" y="70" width="16" height="48"/><path d="M1036 70 h24 l-4-10 h-16z"/><rect x="1042" y="58" width="12" height="4"/>
</g>
<circle cx="1048" cy="62" r="34" fill="url(#jkLjus)"/>
<path d="M1050 62 L1300 30 L1300 46 Z" fill="#ffd27a" opacity=".16"/>
<g><rect x="300" y="118" width="58" height="34" fill="#9c2f25"/><path d="M294 120 L329 96 L364 120 Z" fill="#f5f4ef"/><rect x="318" y="130" width="12" height="12" fill="#ffd27a"/><circle cx="324" cy="136" r="22" fill="url(#jkLjus)"/></g>
<path d="M0 182 C200 168 380 176 560 184 C760 192 980 170 1180 176 C1300 180 1380 188 1440 186 L1440 220 L0 220 Z" fill="#f3efe8"/>
<path d="M0 194 C240 186 520 196 760 198 C1000 200 1240 190 1440 196 L1440 220 L0 220 Z" fill="#f3efe8"/>
</svg>`
