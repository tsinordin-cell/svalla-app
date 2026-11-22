/**
 * Startsidans form i mobilen (Max och Thomas 2026-11-22).
 *
 * Bara formen ändras här. Innehåll, länkar och data är desamma som på datorn,
 * och inget av detta gäller över 760 punkters bredd.
 *
 * Tanken: varje del är ett eget blad som lägger sig över det förra med rundade
 * hörn, i växlande färg. Då syns det tydligt var en del slutar och nästa börjar,
 * ungefär som kort i en app. Rubrikerna har samma form i alla delar, och listor
 * med länkar blir knappar man kan trycka på.
 *
 * Ordning och färg på bladen:
 * Tre sätt (vit) · Just nu (sand) · Vad vill du känna (vit) · Välj din del (sand)
 * · Kartan (vit) · Thorkel (mörk) · Vanliga frågor (sand) · Guiden (vit)
 */
const CSS = `
@media (max-width:760px){
  /* Bladen */
  .sd-satt,.sd-nu,.sd-kansla,#resmål,#karta-start,.sd-thorkel,.sd-faq-gardin,.sd-guide{
    position:relative!important;border-radius:28px 28px 0 0;margin-top:-24px!important;
    box-shadow:0 -10px 26px rgba(40,28,10,.09);
  }
  .sd-satt,.sd-kansla,#karta-start,.sd-guide{background:#fffdf8!important}
  .sd-nu,#resmål,.sd-faq-gardin{background:#f3ece0!important}
  .sd-satt{z-index:2!important}.sd-nu{z-index:3!important}.sd-kansla{z-index:4!important}#resmål{z-index:5!important}#karta-start{z-index:6!important}
  .sd-thorkel{z-index:7!important}.sd-faq-gardin{z-index:8!important}.sd-guide{z-index:9!important}
  .sd-satt,.sd-nu,.sd-kansla,.sd-guide{padding:40px 0 48px!important}
  #resmål,#karta-start{padding:40px 0 48px!important}
  .sd-faq-gardin{padding:36px 16px 48px!important}
  .sd-thorkel{padding:40px 0 48px!important}
  .sd-guide{padding-left:12px!important;padding-right:12px!important}
  .sd-inre,#resmål .section-inner,#karta-start .section-inner{padding:0 20px!important}

  /* Rubrikerna: samma form i alla delar */
  .sd-liten,#resmål .section-label,#karta-start .section-label{font-size:11px!important;letter-spacing:.16em;color:#a8501a!important;margin:0 0 6px!important}
  .sd-h2,#resmål .section-title,#karta-start .section-title{font-family:'Playfair Display',Georgia,serif;font-size:28px!important;font-weight:700!important;line-height:1.12!important;letter-spacing:-.01em;color:#0d2440!important;margin:0 0 8px!important}
  #resmål .section-sub,#karta-start .section-sub{font-size:15px!important;font-weight:400!important;line-height:1.55!important;color:#3d5865!important;margin:0!important}
  #resmål .section-header,#karta-start .section-header{margin-bottom:20px!important}
  .sd-satt .sd-h2,.sd-kansla .sd-h2{margin-bottom:18px!important}

  /* Tre sätt: bladet är ytan, så kortet runt raderna behövs inte */
  .sd-satt-rad{background:transparent;border:none;border-radius:0}
  .sd-satt-spalt{padding:18px 0;border-bottom:1px solid rgba(150,110,60,.18)}
  .sd-satt-spalt:first-child{padding-top:4px}
  .sd-satt-spalt:last-child{padding-bottom:0}
  .sd-satt-nr{width:36px;height:36px;border-radius:50%;background:#f3ece0;display:flex;align-items:center;justify-content:center;font-size:19px!important;font-weight:700}
  .sd-satt-spalt i{display:inline-flex;align-items:center;margin-top:4px;font-size:14.5px}

  /* Just nu: vitt kort på sand */
  .sd-nu-kort{border-radius:22px;padding:20px;box-shadow:0 8px 24px rgba(60,40,15,.08)}
  .sd-nu-klocka{display:grid;grid-template-columns:1fr auto;align-items:end;column-gap:12px}
  .sd-nu-klocka .sd-liten{grid-column:1 / -1}
  .sd-nu-tid{font-size:30px;margin:0}
  .sd-nu-klocka a{grid-column:1 / -1;margin-top:6px}
  .sd-nu-lista{gap:2px;border-top:1px solid rgba(150,110,60,.18);padding-top:8px}
  .sd-nu-rad{padding:10px 0;border-radius:0;border-bottom:1px solid rgba(150,110,60,.12)}
  .sd-nu-rad:last-child{border-bottom:none}
  .sd-nu-text{font-size:14px}
  .sd-nu-alla{display:flex;align-items:center;justify-content:center;width:100%;height:46px;border-radius:999px;background:#f3ece0;color:#0d2440!important;font-size:14px!important;margin-top:12px;order:4}

  /* Vad vill du känna: alla känslor på en rad som går att svepa */
  .sd-kansla-rutnat{display:flex!important;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding:0 20px;margin:0 -20px;padding:2px 20px 8px;scrollbar-width:none}
  .sd-kansla-rutnat::-webkit-scrollbar{display:none}
  .sd-kansla-ruta{flex:0 0 68%;aspect-ratio:4/5!important;border-radius:22px!important;scroll-snap-align:start;box-shadow:0 10px 24px rgba(13,36,64,.16)}
  .sd-kansla-ruta:nth-child(n+5){display:flex!important}
  .sd-kansla-ruta span{padding:16px!important}
  .sd-kansla-ruta b{font-size:24px!important}
  .sd-kansla-ruta small{font-size:12.5px!important}

  /* Dagsplaner och guider: knappar i två spalter i stället för textlänkar */
  .sd-mer{margin-top:26px;gap:22px}
  .sd-mer p{display:grid;grid-template-columns:1fr 1fr;gap:8px;line-height:1.25}
  .sd-mer b{grid-column:1 / -1;display:block;font-size:11px;letter-spacing:.16em;color:#a8501a;margin:0 0 4px}
  .sd-mer a{display:flex;align-items:center;min-height:52px;padding:10px 14px;border-radius:16px;margin:0!important;white-space:normal!important;background:#f3ece0;border:1px solid rgba(150,110,60,.18);color:#0d2440!important;font-size:14px;font-weight:600}
  .sd-mer a[href="/resetips"]{background:#1e5c82;border-color:#1e5c82;color:#fff!important}
  .sd-mer a[href="/resetips"]::after{content:' →';white-space:pre}

  /* Välj din del: liten karta överst, flikarna på en rad, innehållet i ett kort */
  .rk{grid-template-columns:minmax(0,1fr)!important;gap:16px!important;margin-top:0!important}
  .rk-text{min-width:0}
  .rk-karta{max-height:250px!important;order:-1;justify-self:center}
  .rk-flikar{flex-wrap:nowrap!important;overflow-x:auto;scrollbar-width:none;margin:0 -20px 14px!important;padding:2px 20px}
  .rk-flikar::-webkit-scrollbar{display:none}
  .rk-flikar button{flex-shrink:0;white-space:nowrap;min-height:40px;padding:0 16px!important;font-size:14px!important}
  .rk-rad{flex-wrap:wrap;justify-content:flex-start;gap:10px!important;background:#fffdf8;border-radius:22px;padding:20px;box-shadow:0 8px 24px rgba(60,40,15,.08)}
  .rk-innehall{order:-1;flex:1 1 100%!important}
  .rk-innehall h3{font-size:28px!important;margin-bottom:8px!important}
  .rk-innehall p{font-size:15px!important;margin-bottom:14px!important}
  .rk-regioner{gap:8px!important;margin-bottom:16px!important}
  .rk-regioner a{display:inline-flex;align-items:center;min-height:38px;padding:0 13px;border-radius:999px;border:1px solid rgba(30,92,130,.25)!important;background:#f5f8fa}
  .rk-knapp{display:flex!important;justify-content:center;width:100%;height:48px!important;font-size:15px!important}
  .rk-pil{width:40px!important;height:40px!important;font-size:18px!important}

  /* Kartan: lagom hög, filterraden tonar ut i kanten så att man ser att den går att svepa */
  .skn-ram{height:470px!important;border-radius:22px!important}
  .skn-lista{-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent);mask-image:linear-gradient(90deg,#000 82%,transparent);padding-right:28px!important}

  /* Thorkel: mörkt blad */
  .sd-thorkel-inre{padding:0 20px!important}
  .sd-thorkel-bild{right:20px!important}
  .sd-thorkel h2{font-size:26px!important;font-weight:700!important;line-height:1.12!important}
  .sd-thorkel-falt{padding:5px 5px 5px 18px!important}
  .sd-thorkel-falt input{font-size:16px!important;padding:9px 0!important}
  .sd-thorkel-falt button{width:44px!important;height:44px!important}
  .sd-thorkel-chips{margin:12px -20px 0!important;padding:0 20px!important;-webkit-mask-image:linear-gradient(90deg,#000 85%,transparent);mask-image:linear-gradient(90deg,#000 85%,transparent)}
  .sd-thorkel-chips a{min-height:40px;display:inline-flex;align-items:center;font-size:13.5px!important;padding:0 14px!important}

  /* Vanliga frågor */
  .sd-faq-gardin summary{border-radius:20px!important;padding:18px 20px!important}
  .sd-faq-gardin summary h2{font-size:21px!important}

  /* Guiden och krogen */
  .sd-guide-yta{border-radius:24px 24px 0 0!important}
  .sd-krog{border-radius:0 0 24px 24px!important}
  .sd-guide .sd-knapp,.sd-krog .sd-knapp{width:100%;justify-content:center}
}
`

export default function StartMobil() {
  return <style>{CSS}</style>
}
