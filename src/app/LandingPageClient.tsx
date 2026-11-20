'use client'
import { useEffect, useState, Suspense } from 'react'
import { createPortal } from 'react-dom'
import RegionKarta from '@/components/RegionKarta'
import { menyHtmlDator, mittSvallaHtmlDator, menyHtmlMobil } from '@/lib/meny'
import JulkalenderSkylt from '@/components/JulkalenderSkylt'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import dynamic from 'next/dynamic'
// island-data importeras INTE här (revision 2026-10-02): den drog med hela
// ödatan till varje besökare bara för att visa antalet öar — en chunk på
// 787 kB (235 kB gzip, drygt 40 % av startsidans JS), mätt på svalla.se
// 2026-10-02. Talet räknas på servern (page.tsx) och skickas in.

const HeroAnimation = dynamic(() => import('@/components/HeroAnimation'), {
 ssr: false,
 loading: () => null,
})

// Startsidans säsong (2026-11-12): vintermotiv (variant 6) 1 december till sista februari,
// annars sommarmotivet (variant 1) precis som förut. ?sasong=vinter eller ?sasong=sommar
// tvingar fram ett av dem, för att kunna titta i förväg.
const startsidansVariant = (): 1 | 6 => {
 if (typeof window === 'undefined') return 1
 const val = new URLSearchParams(window.location.search).get('sasong')
 if (val === 'vinter') return 6
 if (val === 'sommar') return 1
 // Vinter 13 november till och med februari (Max 2026-11-13: starta vintern direkt, julkalendern visas redan nu)
 const nu = new Date(), m = nu.getMonth()
 return m === 11 || m <= 1 || (m === 10 && nu.getDate() >= 13) ? 6 : 1
}

const LANDING_CSS = `
/* 2026-09-21: @import av Google Fonts borttagen. CSP:n (style-src 'self') blockerade den på varje
   sidvisning — den laddade aldrig, gav bara ett konsolfel. Playfair Display kommer från next/font i layout.tsx. */

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
 --sea-dark:#0d2440; --sea-mid:#1a4a5e;
 --teal:#1e5c82; --teal-light:#2d7aaa;
 --sand:#f4ede0; --sand-light:#faf6f0;
 --white:#ffffff; --ink:#1c2b2e; --muted:#5c6f76; /* var #6b8087: 4,1:1 på vitt, 3,6 på sand */
 --accent:#e8924a; --accent-light:#f0a866; --accent-strong:#b5591a; /* vit text på orange: 4,8:1 (revision P2-4) */ --accent-pale:#f7c08a; /* orange text på de mörka sektionerna: 4,8:1 på --sea-mid */
 --green:#2a9d5c; --green-light:#3ab870;
 --r:16px; --r-sm:8px;
 --shadow: 0 4px 24px rgba(26,74,94,.12);
 --shadow-lg: 0 12px 48px rgba(26,74,94,.18);
}
body{font-family:'Inter',sans-serif;background:var(--sand-light);color:var(--ink);overflow-x:hidden}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-thumb{background:var(--teal);border-radius:3px}
.lp-nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:0 40px;height:68px;display:flex;align-items:center;justify-content:space-between;transition:all .4s ease;}
.lp-nav.scrolled{background:rgba(15,46,59,.92);backdrop-filter:blur(16px);box-shadow:0 2px 20px rgba(0,0,0,.25);}
.nav-logo{font-family:'Playfair Display',serif;font-size:20px;color:var(--white);text-decoration:none;display:flex;align-items:center;gap:8px;letter-spacing:-.01em;}
.nav-logo .dot{color:var(--accent)}
.nav-links{display:flex;gap:4px;list-style:none;align-items:center}
.nav-links>li>a{color:#fff;text-decoration:none;font-family:'Inter',sans-serif!important;font-size:13.5px!important;font-weight:600!important;letter-spacing:.02em!important;transition:.18s;line-height:1;padding:9px 12px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;position:relative;white-space:nowrap}
.nav-links>li>a::before{content:'';position:absolute;left:16px;right:16px;bottom:6px;height:2px;background:var(--accent);border-radius:2px;transform:scaleX(0);transform-origin:center;transition:transform .22s ease}
.nav-links>li>a:hover{background:rgba(255,255,255,.08)}
.nav-links>li>a:hover::before{transform:scaleX(1)}
.nav-hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:5px;align-items:center;justify-content:center}
.nav-hamburger span{display:block;width:22px;height:2px;background:rgba(255,255,255,.85);border-radius:2px;transition:.25s}
.mob-drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:998;opacity:0;pointer-events:none;transition:opacity .25s}
.mob-drawer-overlay.open{opacity:1;pointer-events:auto}
.mob-drawer{position:fixed;top:0;right:0;width:min(340px,90vw);height:100svh;background:rgba(8,20,30,.98);backdrop-filter:blur(24px);z-index:999;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);overflow-y:auto;padding-bottom:40px}
.mob-drawer.open{transform:translateX(0)}
.mob-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.1)}
.mob-drawer-logo{font-family:'Playfair Display',serif;font-size:16px;color:#fff;letter-spacing:2.5px;font-weight:700}
.mob-drawer-close{background:none;border:none;color:rgba(255,255,255,.55);font-size:28px;cursor:pointer;line-height:1;padding:0 4px}
.mob-flat-nav{display:flex;flex-direction:column;padding:6px 0 0}
.mob-drawer-cta{padding:18px 22px;display:flex;flex-direction:column;gap:10px;margin-top:10px;border-top:1px solid rgba(255,255,255,.07)}
.mob-drawer-cta a{text-align:center;justify-content:center}
/* Dropdown per top-nav-item */
.nav-dropdown{position:relative}
.nav-dropdown > a::after{content:'\\25BE';font-size:9px;margin-left:6px;opacity:.55;transition:.18s;display:inline-block;line-height:1}
.nav-dropdown:hover > a::after{opacity:1;transform:translateY(1px)}
.nav-dd-panel{position:absolute;top:100%;left:50%;transform:translateX(-50%) translateY(-4px);padding-top:14px;min-width:240px;opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease;z-index:50}
.nav-dd-inner{background:rgba(10,28,40,.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:10px;box-shadow:0 18px 50px rgba(0,0,0,.45);max-height:calc(100vh - 100px);overflow-y:auto;overscroll-behavior:contain}
.nav-dropdown:hover .nav-dd-panel,.nav-dropdown:focus-within .nav-dd-panel{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}
.nav-dd-link{display:block;color:rgba(255,255,255,.82);text-decoration:none;font-family:'Inter',sans-serif;font-size:13.5px;font-weight:500;letter-spacing:.01em;padding:9px 14px;border-radius:8px;transition:.14s;white-space:nowrap}
.nav-dd-link:hover{color:#fff;background:rgba(255,255,255,.07)}
.nav-dd-divider{height:1px;background:rgba(255,255,255,.08);margin:6px 8px}
.nav-dd-section{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);padding:10px 14px 4px}
.nav-dd-mega{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:10px;width:540px}
.nav-dd-kurs{display:flex;gap:10px;align-items:center;white-space:normal}
.nav-dd-kurs small{display:block;font-size:11.5px;font-weight:400;color:rgba(255,255,255,.55);margin-top:2px}
.nav-dd-partner{display:flex;gap:10px;align-items:center;border:1px solid var(--accent);border-radius:10px;padding:10px 12px;margin:4px 6px;color:#fff;text-decoration:none;white-space:normal;transition:.14s}
.nav-dd-partner:hover{background:rgba(255,255,255,.07)}
.nav-dd-partner small{display:block;font-size:11.5px;color:rgba(255,255,255,.6);margin-top:2px}
.nav-dd-partner-ikon{width:32px;height:32px;flex:0 0 32px;border-radius:8px;background:rgba(201,106,43,.18);display:flex;align-items:center;justify-content:center;color:var(--accent)}
@media(max-width:900px){.nav-dd-panel{display:none}}
/* Mobile-drawer accordion */
.mob-acc{border-bottom:1px solid rgba(255,255,255,.06)}
.mob-acc-head{display:flex;align-items:center;justify-content:space-between;padding:16px 22px;color:rgba(255,255,255,.92);font-size:16px;font-weight:600;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:'Inter',sans-serif;transition:.15s}
.mob-acc-head:hover{color:#fff;background:rgba(255,255,255,.04)}
.mob-acc-chev{font-size:18px;color:rgba(255,255,255,.4);transition:transform .2s ease;display:inline-block;line-height:1}
.mob-acc.open .mob-acc-chev{transform:rotate(90deg);color:var(--accent)}
.mob-acc-body{display:none;padding:0 14px 12px;background:rgba(255,255,255,.025)}
.mob-acc.open .mob-acc-body{display:block}
.mob-acc-link{display:block;padding:11px 14px;color:rgba(255,255,255,.7);text-decoration:none;font-size:14px;border-radius:7px;transition:.14s}
.mob-acc-link:hover,.mob-acc-link:active{color:#fff;background:rgba(255,255,255,.06)}
.mob-acc-section{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);padding:12px 14px 4px}
/* Trång desktop (1100–1440): krymp font + padding så allt får plats även på MacBook 13"
   eller bredare skärm med browser-zoom > 100% / fönster ej maxat */
@media(max-width:1440px){
.nav-links{gap:2px}
.nav-links>li>a{font-size:13px!important;padding:8px 10px!important;letter-spacing:0!important}
.nav-cta .btn{padding:8px 14px;font-size:12.5px}
.nav-cta{gap:6px}
}
@media(max-width:1240px){
.nav-links>li>a{font-size:12.5px!important;padding:7px 9px!important}
.nav-cta .btn{padding:7px 12px;font-size:12px}
.nav-logo svg{height:24px}
}
/* Under 1100px: switcha till hamburger så Dagsplaner+Forum+CTA inte trängs */
@media(max-width:1100px){
.nav-links{display:none}
.nav-hamburger{display:flex}
}
@media(max-width:600px){.nav-hamburger{display:flex}}
.nav-cta{display:flex;gap:10px;align-items:center}
.btn{padding:10px 20px;border-radius:var(--r-sm);font-size:13.5px;font-weight:600;cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:.2s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn-ghost{background:rgba(255,255,255,.12);color:var(--white);border:1px solid rgba(255,255,255,.2)}
.btn-ghost:hover{background:rgba(255,255,255,.22)}
.btn-accent{background:var(--accent-strong);color:var(--white)}
.btn-accent:hover{background:#9e4c14;transform:translateY(-1px)}
.btn-accent:active,.btn-teal:active,.btn-ghost:active{transform:scale(0.97);transition:transform 80ms ease}
.btn-teal{background:var(--teal);color:var(--white)}
.btn-teal:hover{background:var(--teal-light);transform:translateY(-1px)}
.btn-lg{padding:16px 36px;font-size:15px;border-radius:var(--r-sm)}
.btn-xl{padding:18px 44px;font-size:16px;border-radius:var(--r-sm)}
.hero{position:relative;min-height:100vh;overflow:hidden;}
.hero-top{position:absolute;top:0;left:0;right:0;padding:80px 24px 0;display:flex;flex-direction:column;align-items:center;text-align:center;z-index:10;}
.hero-bottom{position:absolute;top:62vh;left:0;right:0;display:flex;flex-direction:column;align-items:center;padding:0 24px;z-index:10;}
.hero-bg{position:absolute;inset:0;background:linear-gradient(165deg,#0a1f2b 0%,#0f2e3b 25%,#1a4a5e 55%,#1e5c72 75%,#24697f 100%);}
.hero-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 40% at 50% 110%, rgba(45,125,138,.35) 0%, transparent 60%),radial-gradient(ellipse 60% 30% at 20% 80%, rgba(26,74,94,.4) 0%, transparent 50%),radial-gradient(ellipse 40% 20% at 80% 70%, rgba(36,105,127,.3) 0%, transparent 40%);}
.hero-islands{position:absolute;bottom:0;left:0;right:0;height:45%;pointer-events:none;}
.hero-shimmer{position:absolute;inset:0;background-image:radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px),radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px);background-size:80px 80px, 50px 50px;background-position:0 0, 40px 40px;animation:shimmer 20s linear infinite;}
@keyframes shimmer{to{background-position:80px 80px, 120px 120px}}
.wave-container{position:absolute;bottom:0;left:0;right:0;height:180px;overflow:hidden}
.wave{position:absolute;bottom:0;left:-100%;width:300%;height:100%;animation:wave linear infinite}
.wave-1{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z' fill='rgba(244,237,224,0.06)'/%3E%3C/svg%3E") repeat-x bottom;background-size:600px 100%;animation-duration:12s;height:60px;bottom:20px;}
.wave-2{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,40 C300,80 600,10 900,50 C1050,70 1150,30 1200,40 L1200,120 L0,120 Z' fill='rgba(244,237,224,0.04)'/%3E%3C/svg%3E") repeat-x bottom;background-size:800px 100%;animation-duration:18s;animation-delay:-5s;height:80px;bottom:0;}
.wave-3{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,80 C150,30 350,90 600,70 C850,50 1050,90 1200,60 L1200,120 L0,120 Z' fill='rgba(26,74,94,0.5)'/%3E%3C/svg%3E") repeat-x bottom;background-size:1000px 100%;animation-duration:25s;animation-delay:-10s;height:100px;bottom:-10px;}
@keyframes wave{from{transform:translateX(0)}to{transform:translateX(33.33%)}}
.hero-content{position:relative;z-index:10;text-align:center;padding:0 24px;max-width:860px;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:30px;padding:7px 16px;font-size:12px;font-weight:600;color:rgba(255,255,255,.85);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px;backdrop-filter:blur(8px);}
.hero-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(36px,5vw,66px);font-weight:900;line-height:1.06;color:var(--white);margin-bottom:14px;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(5,15,30,.6);}
.hero-title em{font-style:italic;background:linear-gradient(135deg,var(--accent),#f4b06a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:none;}
.hero-sub{font-size:clamp(14px,1.8vw,16px);font-weight:300;color:rgba(255,255,255,.72);max-width:600px;margin:8px auto 18px;line-height:1.6;text-shadow:0 1px 10px rgba(5,15,30,.55);}
/* Fast vit yta med mörk kant. Det genomskinliga fältet (78 % vitt, vit kant) försvann mot vinterisen och platshållaren låg på 3,8:1. Text #1c2b2e är 14,6:1 på vitt, platshållare #3e5160 är 8,2:1. Fokusringen är vit + marin så den syns både på is och på blått vatten. */
.hero-search{display:flex;align-items:center;max-width:480px;width:100%;margin:0 auto 14px;background:#ffffff;border:1.5px solid #1a3348;border-radius:50px;overflow:hidden;box-shadow:0 2px 6px rgba(8,20,36,.18),0 14px 32px rgba(8,20,36,.28);}
.hero-search:focus-within{border-color:#0d2440;box-shadow:0 2px 6px rgba(8,20,36,.18),0 14px 32px rgba(8,20,36,.28),0 0 0 2px #ffffff,0 0 0 5px #0d2440;}
.hero-search input{flex:1;min-width:0;border:none;outline:none;padding:16px 22px;font-size:15px;font-family:'Inter',sans-serif;color:#1c2b2e;background:transparent;caret-color:#1c2b2e;-webkit-appearance:none;appearance:none;}
.hero-search input::placeholder{color:#3e5160;opacity:1;}
.hero-search input::-webkit-search-decoration,.hero-search input::-webkit-search-cancel-button,.hero-search input::-webkit-search-results-button,.hero-search input::-webkit-search-results-decoration{-webkit-appearance:none;appearance:none;display:none;}
.hero-search input:focus{outline:none;box-shadow:none;}
.hero-search button{margin:6px 6px 6px 0;padding:12px 28px;border-radius:50px;background:var(--accent-strong);color:var(--white);border:none;font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:.2s;white-space:nowrap;}
.hero-search button:hover{background:#9e4c14}
.hero-search button:focus{outline:none;}
/* Mörkt läge (20 till 06, auto) sätter färg på alla input med !important. Utan det här blev hjältsöket ljusblå text och en blek platshållare på den ljusa isen. */
[data-theme="dark"] .hero-search{background:#ffffff !important;border-color:#1a3348 !important;}
[data-theme="dark"] .hero-search input{background:transparent !important;color:#1c2b2e !important;-webkit-text-fill-color:#1c2b2e;border-color:transparent !important;}
[data-theme="dark"] .hero-search input::placeholder{color:#3e5160 !important;-webkit-text-fill-color:#3e5160;opacity:1 !important;}
.hero-search-hint{font-size:12.5px;color:rgba(255,255,255,.5);margin-bottom:24px}
.hero-search-hint span{color:rgba(255,255,255,.75);text-decoration:underline;cursor:pointer;margin:0 6px}
.hero-scroll{display:flex;flex-direction:column;align-items:center;gap:8px;color:rgba(255,255,255,.45);font-size:11px;letter-spacing:.1em;text-transform:uppercase;animation:float 3s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
.hero-scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.4))}
.trust-bar{background:var(--sea-dark);padding:20px 40px;display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap;}
.trust-item{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.65);font-size:12px;white-space:nowrap}
.trust-item strong{color:var(--white);font-size:14px;font-weight:700}
.trust-divider{width:1px;height:28px;background:rgba(255,255,255,.12)}
section{padding:100px 40px}
.section-inner{max-width:1160px;margin:0 auto}
.section-label{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);margin-bottom:12px;}
.section-title{font-family:'Playfair Display',serif;font-size:clamp(30px,4vw,48px);font-weight:800;line-height:1.12;color:var(--sea-mid);margin-bottom:16px;letter-spacing:-.02em;}
.section-sub{font-size:17px;font-weight:300;color:var(--muted);line-height:1.65;max-width:560px;}
.section-header{margin-bottom:56px}
.section-header.centered{text-align:center}
.section-header.centered .section-sub{margin:0 auto}
.concept-section{background:var(--sand)}
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:8px}
.pillar{padding:52px 40px;background:var(--white);transition:.3s;cursor:default;}
.pillar:hover{background:var(--white);transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.pillar:first-child{border-radius:var(--r) 0 0 var(--r)}
.pillar:last-child{border-radius:0 var(--r) var(--r) 0}
.pillar-icon{width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:26px;color:#fff;box-shadow:0 6px 18px rgba(10,31,43,.12);}
.pillar-icon.sea{background:linear-gradient(135deg,#1a4a5e 0%,#24697f 100%)}
.pillar-icon.teal{background:linear-gradient(135deg,#2d7d8a 0%,#3a9aa8 100%)}
.pillar-icon.accent{background:linear-gradient(135deg,#c96e2a 0%,#e8924a 100%)}
.pillar h3{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--sea);margin-bottom:12px}
.pillar p{font-size:14.5px;color:var(--muted);line-height:1.65}
.featured-section{background:var(--sand)}
.krog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.krog-card{background:var(--white);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);transition:.3s;cursor:pointer;}
.krog-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
.krog-card-img{height:180px;position:relative;overflow:hidden;}
.krog-card-img .img-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;transition:.5s;}
.krog-card:hover .img-inner{transform:scale(1.06)}
.krog-card-badge{position:absolute;top:14px;left:14px;background:var(--accent-strong);color:var(--white);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;border-radius:6px;padding:4px 10px;}
.krog-card-open{position:absolute;top:14px;right:14px;background:rgba(42,157,92,.9);color:var(--white);font-size:10px;font-weight:700;border-radius:6px;padding:4px 10px;backdrop-filter:blur(4px);}
.krog-card-body{padding:20px}
.krog-card-name{font-size:17px;font-weight:700;color:var(--ink);margin-bottom:4px}
.krog-card-loc{font-size:12.5px;color:var(--muted);margin-bottom:10px;display:flex;align-items:center;gap:5px}
.krog-card-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.rating{display:flex;align-items:center;gap:5px}
.stars-small{color:#f5a623;font-size:12px;letter-spacing:.5px}
.rating-num{font-size:13px;font-weight:700;color:var(--ink)}
.reviews-count{font-size:11.5px;color:var(--muted)}
.krog-card-tags{display:flex;gap:5px;flex-wrap:wrap}
.chip{background:rgba(45,125,138,.09);color:var(--teal);font-size:11px;font-weight:500;border-radius:20px;padding:3px 10px}
.krog-card-footer{padding:14px 20px;border-top:1px solid rgba(0,0,0,.06);display:flex;align-items:center;justify-content:space-between;}
.krog-card-dist{font-size:12px;color:var(--muted)}
.krog-card-price{font-size:12px;color:var(--teal);font-weight:600}
.how-section{background:var(--sea-mid);color:var(--white);position:relative;overflow:hidden}
.how-section::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 20 30 30 Q45 40 60 30' stroke='%232d7d8a' stroke-width='0.8' fill='none' opacity='0.2'/%3E%3C/svg%3E") repeat;}
.how-section .section-title{color:var(--white)}
.how-section .section-sub{color:rgba(255,255,255,.72)}
.how-section .section-label{color:var(--accent-pale)}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;position:relative;z-index:1}
.step{padding:40px 28px;text-align:center}
.step-num{width:52px;height:52px;border-radius:50%;background:rgba(232,146,74,.18);border:2px solid rgba(232,146,74,.5);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--accent-light);margin:0 auto 20px;}
.step h4{font-size:16px;font-weight:700;color:var(--white);margin-bottom:10px}
.step p{font-size:13.5px;color:rgba(255,255,255,.75);line-height:1.6}
.routes-section{background:var(--sand);padding:100px 40px}
.routes-scroll{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.route-card{border-radius:var(--r);overflow:hidden;background:var(--white);box-shadow:var(--shadow);transition:.3s;cursor:pointer;}
.route-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.route-img{height:180px;display:flex;align-items:center;justify-content:center;font-size:40px;position:relative;border-radius:var(--r) var(--r) 0 0;background-size:cover;background-position:center}
.route-tag{position:absolute;bottom:12px;left:12px;background:rgba(26,74,94,.85);color:var(--white);font-size:10px;font-weight:700;border-radius:5px;padding:3px 9px;backdrop-filter:blur(4px);}
.route-body{padding:16px}
.route-body h4{font-size:15px;font-weight:700;color:var(--ink);margin-bottom:5px}
.route-body p{font-size:12.5px;color:var(--muted);line-height:1.55;margin-bottom:10px}
.route-meta{display:flex;gap:12px}
.route-meta span{font-size:11px;color:var(--teal);font-weight:600;display:flex;align-items:center;gap:3px}
.split-section{display:grid;grid-template-columns:1fr 1fr;min-height:520px}
.split-pane{padding:80px 60px;display:flex;flex-direction:column;justify-content:center;}
.split-pane.explorer{background:var(--sand)}
.split-pane.owner{background:var(--sea-mid);color:var(--white)}
.split-pane.owner .section-title{color:var(--white)}
.split-pane.owner .section-sub{color:rgba(255,255,255,.72)}
.split-pane.owner .section-label{color:var(--accent-pale)}
.split-features{display:flex;flex-direction:column;gap:16px;margin:28px 0 36px}
.split-feature{display:flex;align-items:flex-start;gap:12px}
.split-feature-icon{width:36px;height:36px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--teal);}
.split-pane.explorer .split-feature-icon{background:rgba(45,125,138,.1)}
.split-pane.owner .split-feature-icon{background:rgba(255,255,255,.1);color:#fff}
.split-feature-text h5{font-size:14px;font-weight:600;margin-bottom:3px}
.split-feature-text p{font-size:13px;color:var(--muted);line-height:1.5}
.split-pane.owner .split-feature-text h5{color:var(--white)}
.split-pane.owner .split-feature-text p{color:rgba(255,255,255,.75)}
.stats-section{background:linear-gradient(135deg,var(--sea-dark),var(--sea-mid))}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.08)}
.stat-box{padding:52px 32px;text-align:center;background:transparent;}
.stat-num{font-family:'Playfair Display',serif;font-size:clamp(36px,4vw,54px);font-weight:800;background:linear-gradient(135deg,var(--accent),#f4b06a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;margin-bottom:8px;}
.stat-label{font-size:14px;color:rgba(255,255,255,.6);line-height:1.5}
.stat-sub{font-size:11px;color:rgba(255,255,255,.35);margin-top:4px}
.testimonial-section{background:var(--sand)}
.testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.testimonial{background:var(--white);border-radius:var(--r);padding:32px 28px;box-shadow:var(--shadow);position:relative;}
.testimonial-text{font-size:15px;color:var(--ink);line-height:1.7;margin:0;position:relative}
.testimonial-footer{display:flex;align-items:center;gap:12px}
.testimonial-avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:var(--white);flex-shrink:0;}
.testimonial-name{font-size:14px;font-weight:700;color:var(--ink)}
.testimonial-role{font-size:12px;color:var(--muted)}
.testimonial-stars{color:#f5a623;font-size:13px;margin-bottom:4px}
.testimonial-section{background:var(--white);padding:100px 40px}
.app-section{background:var(--sand);padding:100px 40px}
.app-inner{max-width:700px;margin:0 auto;text-align:center;}
.app-inner .section-title{margin-bottom:12px}
.app-inner .section-sub{margin:0 auto 36px;max-width:480px}
.app-badges{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
.app-badge{display:flex;align-items:center;gap:10px;background:var(--ink);color:var(--white);border-radius:var(--r-sm);padding:12px 20px;text-decoration:none;transition:.2s;}
.app-badge:hover{background:var(--sea);transform:translateY(-2px)}
.app-badge-icon{font-size:22px}
.app-badge-text .small{font-size:10px;font-weight:500;display:block}
.app-badge-text .big{font-size:14px;font-weight:700;display:block}
footer{background:var(--sea-dark);color:rgba(255,255,255,.5);padding:64px 40px 32px}
.footer-inner{max-width:1160px;margin:0 auto}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:40px;margin-bottom:56px}
.footer-brand .logo{font-family:'Playfair Display',serif;font-size:22px;color:var(--white);margin-bottom:12px;display:flex;align-items:center;gap:6px}
.footer-brand .logo span{color:var(--accent)}
.footer-brand p{font-size:13.5px;line-height:1.65;max-width:280px}
.footer-col h5{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.8);margin-bottom:16px}
.footer-col ul{list-style:none}
.footer-col ul li{margin-bottom:10px}
.footer-col ul li a{color:rgba(255,255,255,.5);text-decoration:none;font-size:13.5px;transition:.2s}
.footer-col ul li a:hover{color:var(--white)}
.footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:24px;display:flex;align-items:center;justify-content:space-between;font-size:12px;flex-wrap:wrap;gap:12px}
.footer-flags{display:flex;gap:8px;font-size:18px}
.footer-social{display:flex;gap:14px}
.footer-social a{color:rgba(255,255,255,.4);text-decoration:none;font-size:18px;transition:.2s}
.footer-social a:hover{color:var(--white)}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
.reveal.visible{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none}}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}
.reveal-delay-4{transition-delay:.4s}
.auth-close{position:absolute;top:14px;right:14px;width:34px;height:34px;background:rgba(10,123,140,.08);border:none;border-radius:50%;cursor:pointer;font-size:16px;line-height:1;color:#5a7a88;display:flex;align-items:center;justify-content:center;transition:background .15s;flex-shrink:0}
.auth-close:hover{background:rgba(10,123,140,.18);color:#0a7b8c}
.auth-m-tabs{display:flex;background:rgba(10,123,140,.07);border-radius:10px;padding:4px;margin-bottom:22px}
.auth-m-tab{flex:1;padding:9px;border-radius:7px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:700;color:#5a7a88;transition:all .15s;font-family:inherit}
.auth-m-tab.active{background:#fff;color:#0a7b8c;box-shadow:0 1px 6px rgba(0,45,60,.1)}
.auth-m-title{font-size:20px;font-weight:800;color:#192830;margin-bottom:4px}
.auth-m-sub{font-size:13px;color:var(--txt3);margin-bottom:22px}
.auth-m-field{margin-bottom:14px}
.auth-m-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#3d5865;margin-bottom:5px;display:block}
.auth-m-input{width:100%;padding:12px 14px;border:1.5px solid rgba(10,123,140,.2);border-radius:10px;font-size:14px;color:#192830;background:rgba(255,255,255,.7);outline:none;transition:all .2s;font-family:inherit}
.auth-m-input:focus{border-color:#0a7b8c;background:#fff;box-shadow:0 0 0 3px rgba(10,123,140,.1)}
.auth-m-input::placeholder{color:#a8bec5}
.auth-m-btn{width:100%;padding:14px;background:linear-gradient(135deg,#0a7b8c,#2a9a9a);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:all .15s;box-shadow:0 4px 16px rgba(10,123,140,.3);font-family:inherit;margin-top:4px}
.auth-m-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(10,123,140,.4)}
.auth-m-divider{display:flex;align-items:center;gap:10px;color:#a8bec5;font-size:12px;margin:14px 0}
.auth-m-divider::before,.auth-m-divider::after{content:'';flex:1;height:1px;background:rgba(10,123,140,.12)}
.auth-m-google{width:100%;padding:11px 14px;border:1.5px solid rgba(10,123,140,.2);border-radius:10px;background:#fff;cursor:pointer;font-size:13px;font-weight:600;color:#3d5865;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .15s;font-family:inherit}
.auth-m-google:hover{border-color:#0a7b8c;color:#0a7b8c}
.auth-m-footer{text-align:center;font-size:12px;color:var(--txt3);margin-top:14px}
.auth-m-footer a{color:#0a7b8c;font-weight:600;cursor:pointer;text-decoration:none}
.auth-m-footer a:hover{text-decoration:underline}
.auth-m-forgot{text-align:right;font-size:12px;color:#0a7b8c;font-weight:600;cursor:pointer;margin-top:-8px;margin-bottom:4px;display:block}
@keyframes authIn{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}
/* -- Destinations -- */
.destinations-section{background:var(--sand);padding:100px 40px}
.destinations-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.dest-card{border-radius:var(--r);overflow:hidden;cursor:pointer;transition:.3s;position:relative;min-height:300px;display:flex;flex-direction:column;justify-content:flex-end;text-decoration:none;}
.dest-card:hover .dest-card-bg{transform:scale(1.05)}
.dest-card-bg{position:absolute;inset:0;transition:.5s}
.dest-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,20,32,.9) 0%,rgba(8,20,32,.1) 65%)}
.dest-card-content{position:relative;z-index:1;padding:24px 20px}
.dest-card-region{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
.dest-card-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#fff;margin-bottom:10px;line-height:1.25}
.dest-card-islands{display:flex;flex-wrap:wrap;gap:4px}
.dest-island{font-size:11px;color:rgba(255,255,255,.88);font-weight:500;padding:2px 0;}
a.dest-island{text-decoration:none;cursor:pointer;transition:background .15s,color .15s}
a.dest-island:hover{background:rgba(255,255,255,.28);color:#fff}
.regions-section{background:var(--white);padding:100px 40px}
.regions-scroll{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.region-card{border-radius:var(--r);overflow:hidden;cursor:pointer;transition:.3s;position:relative;min-height:300px;display:flex;flex-direction:column;justify-content:flex-end;text-decoration:none;}
.region-card:hover .region-card-bg{transform:scale(1.06)}
.region-card-bg{position:absolute;inset:0;transition:.5s;background-size:cover;background-position:center}
.region-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,20,32,.88) 0%,rgba(8,20,32,.05) 60%)}
.region-card-content{position:relative;z-index:1;padding:20px 18px}
.region-card-label{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:5px}
.region-card-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#fff;margin-bottom:8px;line-height:1.25}
.region-card-sub{font-size:11.5px;color:rgba(255,255,255,.72);line-height:1.45}
.region-card-tag{display:inline-block;margin-top:8px;font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;background:rgba(232,146,74,.22);color:var(--accent-light);border:1px solid rgba(232,146,74,.3)}
/* -- Activities -- */
.activities-section{background:var(--white)}
.activities-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.activity-card{background:var(--white);border-radius:var(--r);padding:32px 28px;box-shadow:var(--shadow);transition:.3s}
.activity-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.activity-icon{width:48px;height:48px;margin-bottom:16px;color:var(--sea)}
.activity-card h3{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--teal);margin-bottom:10px}
.activity-card p{font-size:13.5px;color:var(--muted);line-height:1.65}
.activity-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:14px}
.kurser-section{background:var(--white);padding-top:0}
.kurser-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.kurs-ruta{display:block;background:var(--white);border:1px solid rgba(30,92,130,.15);border-radius:var(--r);padding:16px 18px;text-decoration:none;color:inherit;transition:.2s}
.kurs-ruta:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.kurs-ruta b{display:block;font-family:'Playfair Display',serif;font-size:17px;color:var(--teal);margin-bottom:3px}
.kurs-ruta span{font-size:13px;color:var(--muted)}
.kurs-ruta.kurs-partner{border:2px solid var(--accent)}
.kurs-ruta.kurs-partner span{color:var(--accent-strong);font-weight:600}
.gallery-section{background:var(--sea-dark);padding:72px 0;overflow:hidden}
.gallery-section .section-inner{padding:0 40px;margin-bottom:32px}
.gallery-section .section-label{color:var(--accent-pale)}
.gallery-section .section-title{color:var(--white)}
.gallery-scroll{display:flex;gap:12px;overflow-x:auto;padding:0 40px 16px;scrollbar-width:none;cursor:grab;user-select:none}
.gallery-scroll::-webkit-scrollbar{display:none}
.gallery-scroll.dragging{cursor:grabbing}
.gallery-item{flex-shrink:0;width:320px;height:220px;border-radius:var(--r);overflow:hidden;position:relative;cursor:pointer;transition:.3s}
.gallery-item:hover{transform:scale(1.02);box-shadow:0 16px 48px rgba(0,0,0,.45)}
.gallery-item-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:.5s;background-color:#1a3a5e}
.gallery-item:hover .gallery-item-bg{transform:scale(1.06)}
.gallery-item-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,15,25,.75) 0%,transparent 55%)}
.gallery-item-label{position:absolute;bottom:16px;left:16px;right:16px}
.gallery-item-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:3px}
.gallery-item-sub{font-size:11.5px;color:rgba(255,255,255,.65)}
@media(max-width:600px){.gallery-item{width:240px;height:170px}.gallery-scroll{padding:0 20px 12px}.gallery-section .section-inner{padding:0 20px}}
/* -- Getting there -- */
.getting-there-section{background:var(--sea-mid);color:var(--white)}
.getting-there-section .section-title{color:var(--white)}
.getting-there-section .section-label{color:var(--accent-pale)}
.getting-there-section .section-sub{color:rgba(255,255,255,.6)}
.ferry-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.ferry-card{background:rgba(255,255,255,.07);border-radius:var(--r);padding:28px 24px;border:1px solid rgba(255,255,255,.1)}
.ferry-card h4{font-size:17px;font-weight:700;color:#fff;margin-bottom:6px}
.ferry-card-op{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--accent-pale);margin-bottom:14px}
.ferry-routes{list-style:none;display:flex;flex-direction:column;gap:9px}
.ferry-route{font-size:13px;color:rgba(255,255,255,.9);display:flex;align-items:center;gap:8px}
.ferry-route::before{content:'';font-size:13px;flex-shrink:0}
@media(max-width:860px){.ferry-routes{flex-direction:row;flex-wrap:wrap;gap:6px}.ferry-route{background:rgba(255,255,255,.08);border-radius:20px;padding:4px 10px;font-size:12px}.ferry-route::before{display:none}}
/* -- Accommodation -- */
.boende-section{background:var(--sand)}
.boende-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.boende-card{background:var(--white);border-radius:var(--r);padding:28px 24px;box-shadow:var(--shadow);text-align:center;transition:.3s}
.boende-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.boende-icon{width:44px;height:44px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;color:var(--sea)}
.boende-card h4{font-size:15px;font-weight:700;color:var(--teal);margin-bottom:8px}
.boende-card p{font-size:13px;color:var(--muted);line-height:1.6}
@media(max-width:900px){
 .krog-grid{grid-template-columns:1fr 1fr}
 .steps{grid-template-columns:1fr 1fr}
 .split-section{grid-template-columns:1fr}
 .stats-grid{grid-template-columns:1fr 1fr}
 .footer-grid{grid-template-columns:1fr 1fr}
 .pillars{grid-template-columns:1fr}
 .pillar:first-child,.pillar:last-child{border-radius:0}
 .testimonials{grid-template-columns:1fr}
.destinations-grid{grid-template-columns:1fr 1fr}
 .activities-grid{grid-template-columns:1fr 1fr}
 .ferry-grid{grid-template-columns:1fr}
 .boende-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:600px){
 section{padding:48px 20px}
 .section-sub{font-size:15px;max-width:100%}
 .section-title{font-size:clamp(22px,6vw,30px)}
 .pillar{padding:28px 20px}
 .pillar p{font-size:14px}
 .step{padding:24px 20px}
 .destination-card img,.activity-card img{height:120px;object-fit:cover}
 body .lp-nav{padding:0 16px;height:60px}
 .nav-links{display:none}
 .nav-cta{gap:7px}
 .btn-ghost{padding:8px 14px;font-size:13px}
 .btn-accent{padding:8px 14px;font-size:13px}
 .trust-bar{gap:6px 20px;padding:10px 16px}
 .trust-item{font-size:11px}
 .trust-item strong{font-size:14px}
 .trust-divider{display:none}
 .krog-grid{grid-template-columns:1fr}
 .stats-grid{grid-template-columns:1fr 1fr}
 .split-pane{padding:40px 20px}
 .split-pane .btn-accent{padding:12px 28px;font-size:13.5px}
 footer{padding:32px 20px 24px}
 .footer-grid{grid-template-columns:1fr 1fr;gap:28px 20px;margin-bottom:28px;align-items:start}
 .footer-brand{grid-column:1/-1}
 .footer-brand p{display:none}
 .footer-brand .logo{margin-bottom:0}
 .footer-col h5{font-size:11px;margin-bottom:8px}
 .footer-col ul li{margin-bottom:5px}
 .footer-col ul li a{font-size:12.5px}
 /* Solen ritas på H*0.092 med radie H*0.034 (se HeroAnimation) — på mobil
    hamnade rubriken rakt ovanpå den. vh-baserad padding följer solen på
    alla skärmhöjder. */
 .hero-top{padding-top:22vh}
 .hero-bottom{top:auto;bottom:4vh}
 .hero-eyebrow{margin-bottom:18px;font-size:11px;padding:5px 12px;margin-top:8px}
 .hero-title{font-size:clamp(28px,8.5vw,40px);margin-bottom:14px}
 .hero-sub{font-size:13.5px;margin:10px auto 18px}
 .hero-search{flex-direction:row;border-radius:50px;max-width:92%;margin:0 auto 12px;overflow:hidden;gap:0}
 .hero-search input{padding:10px 14px;font-size:13px}
 .hero-search button{margin:4px 4px 4px 0;padding:8px 18px;border-radius:50px;font-size:12.5px;white-space:nowrap}
 .hero-search-hint{margin-bottom:14px;font-size:11.5px}
 .hero-scroll{display:none}
 .steps{grid-template-columns:1fr}
 .testimonial-card{align-self:start}
}
/* Dark mode: match footer color so no black strip appears below footer */
/* -- Resetips / Dagsplaner -- */
.resetips-section{background:var(--white);padding:100px 40px}
.resetips-section .section-header{margin-bottom:56px}
.resetips-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
@media(max-width:1100px){.resetips-grid{grid-template-columns:1fr 1fr}}
.resetips-card{border-radius:var(--r);overflow:hidden;background:var(--white);box-shadow:var(--shadow);transition:.3s;text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid rgba(26,74,94,.07)}
.resetips-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
.resetips-card-img{height:180px;display:flex;align-items:center;justify-content:center;font-size:44px;position:relative;overflow:hidden}
.resetips-card-badge{position:absolute;top:12px;left:12px;background:var(--accent-strong);color:var(--white);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;border-radius:6px;padding:4px 10px}
.resetips-card-season{position:absolute;top:12px;right:12px;background:rgba(13,36,64,.8);color:rgba(255,255,255,.9);font-size:10px;font-weight:600;border-radius:6px;padding:4px 10px;backdrop-filter:blur(4px)}
.resetips-card-body{padding:20px;flex:1;display:flex;flex-direction:column}
.resetips-card-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--ink);margin-bottom:6px;line-height:1.3}
.resetips-card-tagline{font-size:13px;color:var(--muted);line-height:1.55;flex:1;margin-bottom:14px}
.resetips-card-meta{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}
.resetips-card-meta span{font-size:11px;color:var(--teal);font-weight:600}
.resetips-card-cta{font-size:13px;color:var(--accent-strong);font-weight:700;text-align:right}

/* -- Populära guider -- */
.guides-section{background:var(--sand);padding:100px 40px}
.guides-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.guide-card{background:var(--white);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);transition:.3s;text-decoration:none;color:inherit;display:flex;flex-direction:column}
.guide-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.guide-card-img{height:180px;display:flex;align-items:center;justify-content:center;font-size:38px;position:relative}
.guide-card-cat{position:absolute;bottom:10px;left:10px;background:rgba(13,36,64,.82);color:rgba(255,255,255,.9);font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:4px;padding:3px 8px}
.guide-card-body{padding:16px;flex:1;display:flex;flex-direction:column}
.guide-card-title{font-size:14px;font-weight:700;color:var(--ink);line-height:1.4;margin-bottom:auto}
.guide-card-read{font-size:12px;color:var(--teal);font-weight:700;margin-top:12px}

/* -- Thorkel AI -- */
.thorkel-section{background:linear-gradient(135deg,var(--sea-dark) 0%,var(--sea-mid) 100%);color:var(--white);padding:100px 40px;position:relative;overflow:hidden}
.thorkel-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(232,146,74,.12) 0%,transparent 60%)}
.thorkel-inner{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;position:relative;z-index:1}
.thorkel-label{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
.thorkel-section .section-title{color:var(--white);margin-bottom:14px}
.thorkel-section .section-sub{color:rgba(255,255,255,.7);margin-bottom:28px}
.thorkel-chat{display:flex;flex-direction:column;gap:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:var(--r);padding:28px;backdrop-filter:blur(8px)}
.thorkel-msg{display:flex;gap:10px;align-items:flex-start}
.thorkel-msg.user{flex-direction:row-reverse}
.thorkel-bubble{padding:11px 15px;border-radius:14px;font-size:13px;line-height:1.55;max-width:86%}
.thorkel-msg.user .thorkel-bubble{background:rgba(255,255,255,.12);color:rgba(255,255,255,.88);border-radius:14px 4px 14px 14px}
.thorkel-msg.ai .thorkel-bubble{background:rgba(232,146,74,.13);color:rgba(255,255,255,.88);border-radius:4px 14px 14px 14px;border:1px solid rgba(232,146,74,.2)}
.thorkel-av{width:30px;height:30px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}
.thorkel-av.u{background:rgba(255,255,255,.14);color:rgba(255,255,255,.7)}
.thorkel-av.a{background:rgba(232,146,74,.22);color:var(--accent-light);font-size:14px}.thorkel-av-img{width:30px;height:30px;border-radius:50%;flex-shrink:0;object-fit:cover;border:2px solid rgba(232,146,74,.5)}

/* -- FAQ -- */
.faq-section{background:var(--sand-light);padding:100px 40px}
.faq-list{display:flex;flex-direction:column;gap:4px;max-width:800px;margin:0 auto}
.faq-item{background:var(--white);border-radius:var(--r-sm);overflow:hidden;box-shadow:0 1px 6px rgba(26,74,94,.07)}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border:none;background:none;cursor:pointer;text-align:left;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;color:var(--ink);gap:12px;transition:.15s}
.faq-q:hover{background:rgba(45,122,170,.04)}
.faq-icon{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:rgba(30,92,130,.1);display:flex;align-items:center;justify-content:center;color:var(--teal);font-size:16px;font-weight:300;line-height:1;transition:transform .25s ease}
.faq-item.open .faq-icon{transform:rotate(45deg);background:var(--teal);color:#fff}
.faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease}
.faq-item.open .faq-a{max-height:200px}
.faq-a-inner{padding:0 22px 18px;font-size:14px;color:var(--muted);line-height:1.7;border-top:1px solid rgba(45,122,170,.08);padding-top:12px}

@media(max-width:900px){
.resetips-grid{grid-template-columns:1fr 1fr}
.guides-grid{grid-template-columns:1fr 1fr}
.routes-scroll{grid-template-columns:1fr 1fr}
.regions-scroll{grid-template-columns:1fr 1fr}
.thorkel-inner{grid-template-columns:1fr}
}
@media(max-width:600px){
.resetips-section,.guides-section,.thorkel-section,.faq-section{padding:56px 20px}
.routes-section{padding:56px 20px}
.kurser-section{padding:0 20px 56px}
.resetips-grid{grid-template-columns:1fr}
.routes-scroll{grid-template-columns:1fr 1fr}
.regions-scroll{grid-template-columns:1fr 1fr}
.guides-grid{grid-template-columns:1fr 1fr}
/* 2026-10-28: korten är två i bredd på mobil, så rubrikytan blir bara
   70–116 px. MÄTT i Playwright: "Fjäderholmarna" (137 px) klipptes på alla
   telefoner, likaså etiketterna INNERSKÄRGÅRDEN och NORRLANDSKUSTEN. Nu
   ryms allt utan att något ord bryts mitt i från 360 px och uppåt. */
.dest-card-content,.region-card-content{padding:18px 14px}
.dest-card-name{font-size:16px}
.dest-card-region,.region-card-label{font-size:9px;letter-spacing:.05em}
.dest-card-name,.region-card-name,.route-body h4{overflow-wrap:break-word}
}
/* Under 360 px (t.ex. första iPhone SE) ryms inte enordsetiketterna ens så.
   Där får de brytas hellre än klippas. */
@media(max-width:359px){.dest-card-region,.region-card-label{overflow-wrap:break-word}}

[data-theme="dark"] body { background: var(--sea-dark) !important; }
/* Tätare startsida (2026-11-16): mindre luft mellan delarna. */
.resetips-section,.destinations-section,.activities-section,.thorkel-section,.faq-section{padding-top:64px;padding-bottom:64px}
.section-header{margin-bottom:36px}
.split-section{min-height:0}
.split-pane{padding:56px 60px}
@media(max-width:600px){.resetips-section,.destinations-section,.activities-section,.thorkel-section,.faq-section{padding-top:44px;padding-bottom:44px}.split-pane{padding:36px 20px}}
`

const LANDING_HTML = `
<style>${LANDING_CSS}</style>
<nav class="lp-nav" id="mainNav">
 <a href="/" class="nav-logo">
 <svg viewBox="0 0 120 28" height="28" xmlns="http://www.w3.org/2000/svg" aria-label="Svalla">
 <g transform="translate(0,2)">
 <line x1="9" y1="20" x2="9" y2="3" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round"/>
 <path d="M9,4 L18,18 L9,18 Z" fill="#ffffff" opacity="0.9"/>
 <path d="M9,8 L1,17 L9,17 Z" fill="#ffffff" opacity="0.5"/>
 <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke="#ffffff" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.7"/>
 </g>
 <text x="23" y="20" font-family="'Georgia','Times New Roman',serif" font-size="15" font-weight="700" letter-spacing="2.5" fill="#ffffff">SVALLA</text>
 </svg>
 </a>
 <style>.nav-sok input::placeholder{color:rgba(255,255,255,.7)}@media (max-width:1100px){.nav-sok{display:none!important}}@media (min-width:1101px){.hero-search{display:none!important}}</style>
 <!-- FÖRHANDSVISNING 2026-11-18: ny menyrad (Regioner, Se & göra, Mat & boende, Planera, Guider) och sökfält. Inte för main. -->
 <ul class="nav-links">
__NAV_LINKS__ </ul>
 <div class="nav-cta">
 <form action="/sok" method="get" role="search" class="nav-sok" style="display:flex;align-items:center;margin-right:6px"><input type="search" name="q" placeholder="Sök ö, hamn eller krog" aria-label="Sök på Svalla" style="width:190px;padding:8px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.14);color:#fff;font:inherit;font-size:13px;outline:none"></form>
 <button class="nav-hamburger" id="navHamburger" aria-label="Öppna meny">
 <span></span><span></span><span></span>
 </button>
 <div class="nav-dropdown" style="position:relative;list-style:none">
 <a href="/kom-igang" class="btn btn-accent">Mitt Svalla</a>
 <div class="nav-dd-panel" style="left:auto;right:0;transform:none"><div class="nav-dd-inner">
__MITT_SVALLA__ </div></div>
 </div>
 </div>
</nav>
<div class="mob-drawer-overlay" id="mobOverlay"></div>
<div class="mob-drawer" id="mobDrawer">
 <div class="mob-drawer-head">
 <span class="mob-drawer-logo">SVALLA</span>
 <button class="mob-drawer-close" id="mobDrawerClose">×</button>
 </div>
 <nav class="mob-flat-nav">
__MOB_NAV__ </nav>
 
</div>

<section class="hero" style="background:transparent">
 <div class="hero-top">
<h1 class="hero-title">
 Planera din<br>
 <em>skärgårdsvistelse</em>
 </h1>
 <p class="hero-sub">
 Öar, krogar, badplatser och båttider, samlat på ett ställe.
 </p>
 </div>
 <div class="hero-bottom">
 <form class="hero-search" role="search" action="/sok" method="get" onsubmit="event.preventDefault();var q=document.getElementById('heroSearchInput').value.trim();location.href='/sok'+(q?'?q='+encodeURIComponent(q):'')">
 <input type="search" name="q" enterkeyhint="search" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Sök ö, krog eller hamn" placeholder="Sök ö, krog eller hamn…" id="heroSearchInput"/>
 <button type="submit">Sök</button>
 </form>
 <div style="text-align:center;margin-bottom:12px;display:flex;flex-direction:column;align-items:center;gap:10px">
 <a href="/utflykt" style="color:rgba(255,255,255,.88);font-size:13px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:7px;padding:8px 18px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:24px;backdrop-filter:blur(8px);transition:.2s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> Planera din tur &rarr;</a>
 <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
  <a href="/farjor" style="color:#fff;font-size:12.5px;font-weight:600;text-decoration:none;padding:6px 14px;border-radius:20px;background:rgba(13,36,64,.35);border:1px solid rgba(255,255,255,.18)">Utan egen båt: färjor och dagsturer</a>
  <a href="/hamnar-och-bryggor" style="color:#fff;font-size:12.5px;font-weight:600;text-decoration:none;padding:6px 14px;border-radius:20px;background:rgba(13,36,64,.35);border:1px solid rgba(255,255,255,.18)">Med egen båt: hamnar och rutter</a>
 </div>
 <div style="font-size:12.5px;color:rgba(255,255,255,.8)">Gratis konto: spara öar, planera turer och logga dina besök. <a href="/kom-igang" style="color:#fff;font-weight:700">Kom igång &rarr;</a></div>
 </div>
 <div class="hero-search-hint">
 Populärt just nu:
 <span onclick="location.href='/o/gallno'">Gällnö</span>
 <span onclick="location.href='/o/ulvon'">Ulvön</span>
 <span onclick="location.href='/o/marstrand'">Marstrand</span>
 <span onclick="location.href='/o/sandhamn'">Sandhamn</span>
 </div>
 <div class="hero-scroll">
 <div class="hero-scroll-line"></div>
 Scrolla
 </div>
 </div>
</section>

<div class="trust-bar">
 <div class="trust-item"><strong data-stat="islands">__ANTAL_OAR__</strong> Öar med guider</div>
 <div class="trust-divider"></div>
 <div class="trust-item"><strong data-stat="places">200+</strong> Platser på kartan</div>
 <div class="trust-divider"></div>
 <div class="trust-item"><strong>Hela Sverige</strong> Skärgård, kust och öar</div>
 <div class="trust-divider"></div>
 <div class="trust-item"><strong>Ingen båt krävs</strong> Kollektivt ända ut</div>
 <div class="trust-divider"></div>
 <!-- PRODUKTREGEL: vårt eget pris (gratis att komma igång) — vi är källan. -->
 <div class="trust-item"><strong>Gratis</strong> Att komma igång</div>
</div>

<section class="resetips-section" id="resetips">
 <div class="section-inner">
  <div class="section-header reveal">
   <div class="section-label">Dagsplaner & Resetips</div>
   <h2 class="section-title">Utvalda turer i skärgården</h2>
   <p class="section-sub">Kuraterade dagsplaner med allt du behöver: färja, mat, bad och dolda pärlor längs vägen.</p>
  </div>
  <div class="resetips-grid">
   <a href="/resetips/djuro-grinda-dagstur" class="resetips-card reveal reveal-delay-1">
    <div class="resetips-card-img" data-lp-photo="grinda" style="background:linear-gradient(160deg,#0c1e10,#1a4a2a,#2a7a40)">
     <span class="resetips-card-badge">Populär</span>
     <span class="resetips-card-season">Maj till sep</span>
    </div>
    <div class="resetips-card-body">
     <div class="resetips-card-title">Bil, glass och båt: Djurö till Grinda</div>
     <div class="resetips-card-tagline">Bil till Djurö, båt över till Grinda och lunch på Grinda Wärdshus.</div>
     <div class="resetips-card-meta">
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Heldag</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>Bil + båt</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Lätt</span>
     </div>
     <div class="resetips-card-cta">Läs dagsplanen →</div>
    </div>
   </a>
   <a href="/resetips/sandhamn-ytterskargard" class="resetips-card reveal reveal-delay-2">
    <div class="resetips-card-img" data-lp-photo="sandhamn" style="background:linear-gradient(160deg,#0a1e2e,#1a4a5e,#2272a0)">
     <span class="resetips-card-badge">Klassiker</span>
     <span class="resetips-card-season">Maj till sep</span>
    </div>
    <div class="resetips-card-body">
     <div class="resetips-card-title">Sandhamn med Cinderellabåten</div>
     <!-- KÄLLA: Strömma, Cinderellabåtarna 2026, https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — 30/4–27/9, Strandvägen 10:00 → Sandhamn 12:30. Länsstyrelsen Stockholm, Utö, https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "I Gruvbyn kan du strosa mellan gamla vackra byggnader"; "långa sandstränder och badvänliga klippor" (lästa 2026-09-21) -->
     <div class="resetips-card-tagline">Två och en halv timme ut från Strandvägen, med sandstränder och KSSS-hamnen full av segelbåtar.</div>
     <div class="resetips-card-meta">
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Heldag</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/></svg>Cinderellabåten (linjebåt, ingen egen båt krävs)</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Lätt</span>
     </div>
     <div class="resetips-card-cta">Läs dagsplanen →</div>
    </div>
   </a>
   <a href="/resetips/uto-cykeldag" class="resetips-card reveal reveal-delay-3">
    <div class="resetips-card-img" data-lp-photo="uto" style="background:linear-gradient(160deg,#261408,#4a2c14,#7a4a22)">
     <span class="resetips-card-badge">Naturupplevelse</span>
     <span class="resetips-card-season">Maj till sep</span>
    </div>
    <div class="resetips-card-body">
     <div class="resetips-card-title">Utö på cykel</div>
     <div class="resetips-card-tagline">Gruvbyns gamla hus, långa sandstränder och badvänliga klippor, med cykeln från Gruvbryggan.</div>
     <div class="resetips-card-meta">
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Heldag</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>Tåg + färja</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Medel</span>
     </div>
     <div class="resetips-card-cta">Läs dagsplanen →</div>
    </div>
   </a>
   <!-- KÄLLA: dagsplanen marstrand-fastning-och-klippor i src/app/resetips/trips-data.ts (källor lästa 2026-11-16) -->
   <a href="/resetips/marstrand-fastning-och-klippor" class="resetips-card reveal reveal-delay-4">
    <div class="resetips-card-img" data-lp-photo="marstrand" style="background:linear-gradient(160deg,#0a1e2e,#1a4a5e,#2272a0)">
     <span class="resetips-card-badge">Västkusten</span>
     <span class="resetips-card-season">Jun till aug</span>
    </div>
    <div class="resetips-card-body">
     <div class="resetips-card-title">Marstrand: fästning och klippbad</div>
     <div class="resetips-card-tagline">Buss från Göteborg, två minuter med färjan och en bilfri ö med fästning, vandringsled och bad.</div>
     <div class="resetips-card-meta">
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Heldag</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/></svg>Buss + färja</span>
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Lätt</span>
     </div>
     <div class="resetips-card-cta">Läs dagsplanen →</div>
    </div>
   </a>
  </div>
  <div style="text-align:center;margin-top:40px">
   <a href="/resetips" class="btn btn-teal">Alla dagsplaner &rarr;</a>
  </div>
 </div>
</section>


<section class="destinations-section" id="resmål">
 <div class="section-inner">
 <div class="section-header reveal">
 <div class="section-label">Utforska skärgården</div>
 <h2 class="section-title">Välj din del av skärgården</h2>
 <p class="section-sub">Fyra kuster och de stora sjöarna. Välj en del, så ser du regionerna där.</p>
 </div>
 <div id="sv-regionkarta" class="sv-regionkarta-mal"><style>.sv-karta-reserv{display:flex;flex-wrap:wrap;gap:8px 18px;list-style:none;padding:0;margin:24px 0 0}.sv-karta-reserv a{color:var(--sea);font-weight:600}.sv-regionkarta-mal.klar .sv-karta-reserv{display:none}</style><ul class="sv-karta-reserv"><li><a href="/stockholms-skargard">Stockholms skärgård</a></li><li><a href="/gotland">Gotland</a></li><li><a href="/oland">Öland</a></li><li><a href="/aland">Åland</a></li><li><a href="/bohuslan">Bohuslän</a></li><li><a href="/goteborg-skargard">Göteborgs skärgård</a></li><li><a href="/halland">Halland</a></li><li><a href="/vasterhav">Västerhavet</a></li><li><a href="/blekinge-skargard">Blekinge skärgård</a></li><li><a href="/hoga-kusten">Höga Kusten</a></li><li><a href="/malaren">Mälaren</a></li><li><a href="/regioner">Alla regioner</a></li></ul></div>
 </div>
</section>




<section class="activities-section" id="aktiviteter">
 <div class="section-inner">
 <div class="section-header reveal">
 <div class="section-label">Se & Göra</div>
 <h2 class="section-title">Skärgårdslivet är mer än mat</h2>
 <p class="section-sub">Från klippbad och kajakpaddling till vandring och fiske, skärgården erbjuder aktiviteter för alla smaker och alla säsonger.</p>
 </div>
 <div class="activities-grid">
 <a href="/blogg/kajak-stockholms-skargard-nyborjare" class="activity-card reveal reveal-delay-1" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 14.5 Q12 12 22.5 14.5 Q12 17 1.5 14.5 Z"/><ellipse cx="11.5" cy="14.5" rx="3.5" ry="1.1"/><line x1="3.5" y1="9.5" x2="20.5" y2="19.5"/><path d="M3.5 9.5 Q1.5 8 2 11 Q2.5 12 3.5 9.5"/><path d="M20.5 19.5 Q22.5 21 22 18 Q21.5 17 20.5 19.5"/><circle cx="11.5" cy="12.5" r="1.6"/></svg>
 <h3>Kajak & Paddling</h3>
 <p>Stockholms skärgård är ett fint landskap att paddla i. Paddla ut till öar utan fast förbindelse och hitta platser som ingen annan ser.</p>
 <div class="activity-tags"><span class="chip">Nybörjarvänligt</span><span class="chip">Uthyrning</span><span class="chip">Guideturer</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide &rarr;</div>
 </a>
 <a href="/blogg/segling-nyborjare-guide" class="activity-card reveal reveal-delay-2" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="10.5" y1="2" x2="11.5" y2="16.5"/><line x1="11.5" y1="16.5" x2="19" y2="15.5" stroke-width="1.2"/><path d="M10.5 2 L19 15.5 L11.5 16.5 Z"/><path d="M10.5 6 L3 16.5 L11.5 16.5"/><line x1="2.5" y1="16.5" x2="21.5" y2="16.5"/><path d="M2.5 16.5 Q7 19 12 20 Q17 19 21.5 16.5"/><path d="M12 20 L11.5 22.5 L12.5 22.5" stroke-width="1.6"/></svg>
 <h3>Segling & Båtliv</h3>
 <p>Segla längs klassiska leder mot Sandhamn eller ankra i stilla naturhamnar. Svalla visar gästhamnar, bränsle och övernattningsplatser längs vägen.</p>
 <div class="activity-tags"><span class="chip">Gästhamnar</span><span class="chip">Bränsle</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide &rarr;</div>
 </a>
 <a href="/blogg/basta-badplatserna" class="activity-card reveal reveal-delay-3" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17 L5 14 L7 15.5 L9 11 L12 13 L14 9.5 L17 13 L19 12 L22 17 Z"/><line x1="1" y1="17" x2="23" y2="17"/><path d="M2 19.5 C3.5 17.5 6 18.5 7.5 19.5 C9 20.5 11 20.5 12.5 19.5 C14 18.5 16 18.5 17.5 19.5 C19 20.5 21 20.5 22 19.5" stroke-width="1.1"/><circle cx="17" cy="6" r="2.5"/><path d="M17 8.5 L17 11" stroke-width="1.4"/><path d="M14 10 L20 10" stroke-width="1.1"/></svg>
 <h3>Bad & Klippor</h3>
 <p>Hundratals badplatser på klippor och sandstränder. Hitta dolda badvikar och populära bastur med GPS-koordinater direkt på kartan.</p>
 <div class="activity-tags"><span class="chip">Klippbad</span><span class="chip">Bastu</span><span class="chip">Sandstrand</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide &rarr;</div>
 </a>
 <a href="/blogg/vandring-orno-uto" class="activity-card reveal reveal-delay-1" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>
 <h3>Vandring & Natur</h3>
 <p>Utö, Möja och Ornö har markerade vandringsleder genom urbergslandskap och gammal skog, korta dagsturer och flerdagarsäventyr.</p>
 <div class="activity-tags"><span class="chip">Markerade leder</span><span class="chip">Naturreservat</span><span class="chip">Fågelskådning</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide &rarr;</div>
 </a>
 <a href="/blogg/fiske-skargard-guide" class="activity-card reveal reveal-delay-2" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12 Q9 7.5 16 9.5 Q19.5 10.5 21 12 Q19.5 13.5 16 14.5 Q9 16.5 6 12 Z"/><path d="M6 12 L2.5 9 M6 12 L2.5 15"/><path d="M12 9.5 Q13.5 7 15 9" stroke-width="1.3"/><circle cx="18" cy="11.5" r="1"/><circle cx="18.2" cy="11.3" r="0.4" fill="currentColor" stroke="none"/><path d="M11 10.5 Q12.5 12 11 13.5" stroke-width="1" opacity="0.6"/><path d="M13.5 10 Q15 12 13.5 14" stroke-width="1" opacity="0.6"/></svg>
 <h3>Fiske</h3>
 <p>Abborre, gädda och havsöring väntar i skären. Sportfiske längs kusten och i stilla vikar som bara lokalkännedom kan visa.</p>
 <div class="activity-tags"><span class="chip">Havsfiske</span><span class="chip">Medfiske</span><span class="chip">Fritidsfiske</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide &rarr;</div>
 </a>
 <a href="/blogg/cykling-moja-gallno" class="activity-card reveal reveal-delay-3" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M6 15 L9 6 L14 6 L18 15"/><path d="M9 6 L11 10 L6 15"/><circle cx="14" cy="6" r="1" fill="currentColor" stroke="none"/></svg>
 <h3>Cykling</h3>
 <p>Bilfria öar som Möja och Gällnö är perfekta för cykling. Hyr en cykel vid bryggan och utforska hela ön på ett par timmar.</p>
 <div class="activity-tags"><span class="chip">Bilfria öar</span><span class="chip">Uthyrning</span><span class="chip">Familjefärd</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide &rarr;</div>
 </a>
 </div>
 </div>
</section>




<section class="thorkel-section" id="thorkel">
 <div class="thorkel-inner">
  <div class="reveal">
   <div class="thorkel-label">AI-planeraren</div>
   <h2 class="section-title">Thorkel planerar din perfekta skärgårdsdag</h2>
   <p class="section-sub">Berätta vad du är sugen på: Thorkel föreslår öar, båtar, krogar och bad utifrån Svallas ösidor. Gratis, men kräver ett konto.</p>
   <!-- 2026-09-28: knapparna gick till /planera (båtruttplaneraren, kräver inloggning). Thorkel bor på /guide; dagsplaneraren /utflykt är öppen för alla. -->
   <div style="display:flex;flex-wrap:wrap;gap:10px">
    <a href="/guide" class="btn btn-accent btn-lg">Prata med Thorkel &rarr;</a>
    <a href="/utflykt" class="btn btn-ghost btn-lg">Planera utan konto &rarr;</a>
   </div>
  </div>
  <div class="thorkel-chat reveal reveal-delay-2">
   <div class="thorkel-msg user">
    <div class="thorkel-av u">Du</div>
    <div class="thorkel-bubble">Vi är 4 vuxna, vill ha bad, bra lunch och inte för lång båtresa. Helst idag.</div>
   </div>
   <div class="thorkel-msg ai">
    <img src="/thorkel-avatar.svg" alt="Thorkel" class="thorkel-av-img" />
    <!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
    <!-- KÄLLA: samma som Grinda i guide-content.ts: waxholmsbolaget.se (Strömkajen via Vaxholm), lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html ("fina barnvänliga bad både vid den södra och norra ångbåtsbryggan"). Thorkel bokar inget, han hämtar avgångar via get_transit_to_island. Omskrivet 2026-11-16. -->
    <div class="thorkel-bubble">Då föreslår jag <b>Grinda</b>. Waxholmsbolagets båt från Strömkajen via Vaxholm tar ungefär en och en halv timme, och ön har trafik året om. På ön ligger Grinda Wärdshus, och det finns bad vid både den södra och den norra ångbåtsbryggan. Vill du se dagens avgångar?</div>
   </div>
   <div class="thorkel-msg user">
    <div class="thorkel-av u">Du</div>
    <div class="thorkel-bubble">Ja tack!</div>
   </div>
   <div class="thorkel-msg ai">
    <img src="/thorkel-avatar.svg" alt="Thorkel" class="thorkel-av-img" />
    <div class="thorkel-bubble">Här är de närmaste avgångarna till Grinda, hämtade från Trafiklab just nu. Kolla gärna när sista båten går hem innan ni åker.</div>
   </div>
  </div>
 </div>
</section>



<section class="faq-section" id="faq">
 <div class="section-inner">
  <div class="section-header reveal">
   <div class="section-label">Vanliga frågor</div>
   <h2 class="section-title">Allt du undrar om skärgården</h2>
   <p class="section-sub">Svar på de vanligaste frågorna, från vilken ö som passar bäst till hur du tar dig dit.</p>
  </div>
  <div class="faq-list">
   <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Vilken ö passar barnfamiljer bäst?<span class="faq-icon">+</span></button>
    <div class="faq-a"><div class="faq-a-inner">Grinda och Vaxholm är toppalternativen: sandstränder, lugnt vatten och bra restauranger. Fjäderholmarna är perfekt för de allra minsta, bara 25 minuter med båt från Strandvägen. Utö i söder har en lång sandstrand och cykelleder som passar hela familjen.</div></div>
   </div>
   <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Hur lång tid tar båten till Sandhamn?<span class="faq-icon">+</span></button>
    <div class="faq-a"><div class="faq-a-inner">Cinderellabåten går från Strandvägen kajplats 14, inte Strömkajen, som är Waxholmsbolagets kaj, och tar 2 timmar 30 minuter till Sandhamn under säsongen 30 april till 27 september. Snabbast året runt: buss 433 eller 434 från Slussen till Stavsnäs vinterhamn (48 till 59 minuter) och sedan Sandhamnslinjen på 30 minuter. Totalt drygt 1 timme 20 minuter med bra anslutning.</div></div>
   </div>
   <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Kan man tälta i skärgården?<span class="faq-icon">+</span></button>
    <div class="faq-a"><div class="faq-a-inner">Ja, allemansrätten ger rätt att tälta i naturen i upp till 1 till 2 nätter på samma plats. Håll minst 150 meter avstånd från närmaste bostad och lämna naturen som du fann den. Under torrperioder kan eldningsförbud gälla. Kontrollera alltid MSB:s webbplats innan.</div></div>
   </div>
   <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Vad är det bästa alternativet till Sandhamn?<span class="faq-icon">+</span></button>
    <div class="faq-a"><div class="faq-a-inner">Grinda är det populäraste alternativet: kortare båttid (1,5 timmar), lika vacker och utan turisttrycket. Utö i söder är perfekt för de som vill ha mer natur och cykling. Möja är ett dolt alternativ för den som söker äkta skärgårdsstämning utan bryggrestauranger.</div></div>
   </div>
   <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Vilken månad är bäst att besöka skärgården?<span class="faq-icon">+</span></button>
    <div class="faq-a"><div class="faq-a-inner">Juli är peak-säsong med varmast vatten (runt 20°C) men också mest folk. Juni och tidig augusti är lika vackra men lugnare. September till oktober rekommenderas för vandrare: höstfärger, inga köer och öppna krogar. Maj till juni har de längsta dagarna och det klaraste vattnet.</div></div>
   </div>
   <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Hur mycket kostar en dagstur till Fjäderholmarna?<span class="faq-icon">+</span></button>
    <!-- KÄLLA: operatörernas namn och avgångsplatser verifierade 2026-08-12. Priserna borttagna — Strömmas sida är en JS-app som inte gick att avläsa, och tredjepartssiffror duger inte. Tidigare påstods 175–220 kr ENKEL; tredjepartskällor anger ~185 kr TUR OCH RETUR, så vårt påstående var sannolikt dubbelt för dyrt. Det gamla rådet "ta SL-buss 80 till Lidingö och fika billigare på ön" var nonsens — Fjäderholmarna nås inte via Lidingö. -->
<div class="faq-a"><div class="faq-a-inner">Två rederier kör: Strömma från Nybrokajen och Fjäderholmslinjen från Slussen, se aktuellt biljettpris hos respektive. Överfarten är skärgårdens kortaste, runt 25 minuter. Vad dagen kostar styrs mest av restaurangvalet: medhavd matsäck gör den billig, lunch på krogen gör den till en riktig utflykt.</div></div>
   </div>
   <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Måste man ha egen båt för att använda Svalla?<span class="faq-icon">+</span></button>
    <div class="faq-a"><div class="faq-a-inner">Absolut inte. Svalla är byggt för alla: oavsett om du reser med Waxholmsbåten, Cinderellabåten, pendeltåg + färja eller bil. <a href="/utflykt">Dagsplaneraren</a> visar öar som nås med kollektivtrafik från din startpunkt, med restid och båttider för dagen. Ingen båt krävs, någonsin.</div></div>
   </div>
  </div>
 </div>
</section>


<div class="split-section">
 <div class="split-pane explorer reveal">
 <div class="section-label">För utforskaren</div>
 <h2 class="section-title">Din guide ute på vattnet</h2>
 <p class="section-sub">Allt du behöver för att planera och logga dina turer, utan kostnad.</p>
 <div class="split-features">
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div><div class="split-feature-text"><h5>Logga turen på 10 sek</h5><p>Foto + plats. Klart. Din dagbok byggs automatiskt.</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div><div class="split-feature-text"><h5>Hitta krogar & platser</h5><p>Bastun, bryggor och krogar längs din rutt</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><div class="split-feature-text"><h5>Community-feed</h5><p>Se andras turer. Bli inspirerad. Ge igen.</p></div></div>
 </div>
 <a href="/kom-igang" class="btn btn-teal btn-lg">Kom igång &rarr;</a>
 </div>
 <div class="split-pane owner reveal reveal-delay-2">
 <div class="section-label">För krogägaren</div>
 <h2 class="section-title">Sätt er krog på kartan</h2>
 <p class="section-sub">Nå gäster som planerar att åka ut. Det kostar ingenting att finnas med.</p>
 <div class="split-features">
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div class="split-feature-text"><h5>Er plats på kartan</h5><p>Med adress, kontakt och länk till er webbplats</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div><div class="split-feature-text"><h5>Syns på ösidan</h5><p>Där gästerna läser på innan de åker ut</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg></div><div class="split-feature-text"><h5>Kostar ingenting</h5><p>Ni bestämmer vad som står, och kan be oss ändra när som helst</p></div></div>
 </div>
 <a href="/registrera-krog" class="btn btn-accent btn-lg">Registrera er krog &rarr;</a>
 </div>
</div>





<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"Vilken ö passar barnfamiljer bäst?","acceptedAnswer":{"@type":"Answer","text":"Grinda och Vaxholm är toppalternativen: sandstränder, lugnt vatten och bra restauranger. Fjäderholmarna är perfekt för de allra minsta, bara 25 minuter med båt från Strandvägen."}},
    {"@type":"Question","name":"Hur lång tid tar båten till Sandhamn?","acceptedAnswer":{"@type":"Answer","text":"Cinderellabåten går från Strandvägen kajplats 14, inte Strömkajen, och tar 2 timmar 30 minuter till Sandhamn under säsongen 30 april-27 september. Snabbast året runt: buss 433 eller 434 från Slussen till Stavsnäs vinterhamn, 48 till 59 min beroende på tid på dygnetuter, och sedan Sandhamnslinjen på 30 minuter."}},
    {"@type":"Question","name":"Kan man tälta i skärgården?","acceptedAnswer":{"@type":"Answer","text":"Ja, allemansrätten ger rätt att tälta i naturen i upp till 1 till 2 nätter. Håll minst 150 meter avstånd från närmaste bostad."}},
    {"@type":"Question","name":"Vad är det bästa alternativet till Sandhamn?","acceptedAnswer":{"@type":"Answer","text":"Grinda är det populäraste alternativet: kortare båttid, lika vacker och utan turisttrycket. Utö i söder är perfekt för mer natur och cykling."}},
    {"@type":"Question","name":"Vilken månad är bäst att besöka skärgården?","acceptedAnswer":{"@type":"Answer","text":"Juli är peak-säsong med varmast vatten men mest folk. September till oktober är bäst för vandrare, höstfärger och inga köer."}},
    {"@type":"Question","name":"Hur mycket kostar en dagstur till Fjäderholmarna?","acceptedAnswer":{"@type":"Answer","text":"Överfarten är skärgårdens kortaste och biljetten bokas hos rederiet, se deras aktuella pris. Vad dagen kostar styrs mest av restaurangvalet: med medhavd matsäck blir det billigt, med lunch på krogen blir det en riktig utflykt."}}
  ]
}
</script>
<script>
function toggleFaq(btn){
  var item=btn.parentElement;
  var isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el){el.classList.remove('open')});
  if(!isOpen) item.classList.add('open');
}
</script>

<footer>
 <div class="footer-inner">
 <div class="footer-grid">
 <div class="footer-brand">
 <div class="logo"><svg viewBox="0 0 120 28" height="28" xmlns="http://www.w3.org/2000/svg" aria-label="Svalla" style="display:block"><g transform="translate(0,2)"><line x1="9" y1="20" x2="9" y2="3" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round"/><path d="M9,4 L18,18 L9,18 Z" fill="#ffffff" opacity="0.9"/><path d="M9,8 L1,17 L9,17 Z" fill="#ffffff" opacity="0.5"/><path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke="#ffffff" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.7"/></g><text x="23" y="20" fill="#ffffff" font-family="'Georgia','Times New Roman',serif" font-size="15" font-weight="700" letter-spacing="2.5">SVALLA</text></svg></div>
 <p>Den nordiska plattformen för krogar, kajer och upplevelser i skärgården. Byggt av skärgårdsälskare, för skärgårdsälskare.</p>
 </div>
 <div class="footer-col">
 <h5>Utforska</h5>
 <ul>
 <li><a href="/upptack">Platser & krogar</a></li>
 <li><a href="/rutter">Rutter</a></li>
 <li><a href="/feed">Community-feed</a></li>
 <li><a href="/spara">Sparade</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h5>Konto</h5>
 <ul>
 <li><a href="/logga-in">Logga in</a></li>
 <li><a href="/logga-in">Skapa konto</a></li>
 <li><a href="/profil">Min profil</a></li>
 <li><a href="/logga">Logga tur</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h5>Om oss</h5>
 <ul>
 <li><a href="/om">Om Svalla</a></li>
 <li><a href="/faq">Vanliga frågor</a></li>
 <li><a href="/blogg">Skärgårdsbloggen</a></li>
 <li><a href="/partner">För partners</a></li>
 <li><a href="/integritetspolicy">Integritetspolicy</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h5>Regioner</h5>
 <ul>
 <li><a href="/stockholms-skargard">Stockholms skärgård</a></li>
 <li><a href="/bohuslan">Bohuslän</a></li>
 <li><a href="/gotland">Gotland</a></li>
 <li><a href="/aland">Åland</a></li>
 <li><a href="/oland">Öland</a></li>
 <li><a href="/blekinge-skargard">Blekinges skärgård</a></li>
 <li><a href="/vasterhav">Västerhavet</a></li>
 <li><a href="/malaren">Mälaren</a></li>
 <li><a href="/goteborg-skargard">Göteborgs skärgård</a></li>
 </ul>
 </div>
 </div>
 <div class="footer-bottom">
 <span>© 2026 Svalla | Alla rättigheter förbehållna</span>
 <div class="footer-flags"><svg viewBox="0 0 20 14" width="22" height="15" xmlns="http://www.w3.org/2000/svg" style="border-radius:2px"><rect width="20" height="14" fill="#006AA7"/><rect x="6" width="2" height="14" fill="#FECC02"/><rect y="6" width="20" height="2" fill="#FECC02"/></svg></div>
 <div class="footer-social">
 <a href="https://www.instagram.com/svalla.app/" target="_blank" rel="me noopener noreferrer" title="Svalla på Instagram" aria-label="Svalla på Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
 </div>
 </div>
 </div>

<script>
/* applyLpPhotos moved to React useEffect — runs on all navigation types */

// Gallery drag-to-scroll
(function(){
  var s=document.getElementById('galleryScroll');
  if(!s)return;
  var down=false,startX,scrollLeft;
  s.addEventListener('mousedown',function(e){down=true;s.classList.add('dragging');startX=e.pageX-s.offsetLeft;scrollLeft=s.scrollLeft});
  document.addEventListener('mouseup',function(){down=false;s.classList.remove('dragging')});
  s.addEventListener('mousemove',function(e){if(!down)return;e.preventDefault();var x=e.pageX-s.offsetLeft;s.scrollLeft=scrollLeft-(x-startX)*1.2});
})();
</script>
</footer>

`

export type Bildkalla = { namn: string; fotograf: string; licens: string; licensUrl: string | null; kalla: string }

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Fotograf och licens för Commons-fotona. CC BY/BY-SA kräver att de anges. */
function bildkallorHtml(k: Bildkalla[]): string {
  if (!k.length) return ''
  const rader = k.map(b =>
    `${esc(b.namn)}: <a href="${esc(b.kalla)}" rel="noopener noreferrer" target="_blank">${esc(b.fotograf)}</a>, ` +
    (b.licensUrl ? `<a href="${esc(b.licensUrl)}" rel="noopener noreferrer license" target="_blank">${esc(b.licens)}</a>` : esc(b.licens))
  ).join(' · ')
  return `<section aria-label="Bildkällor" style="max-width:1160px;margin:0 auto;padding:28px 24px 36px;font-size:12px;line-height:1.7;color:var(--txt3)"><strong style="font-weight:600">Bildkällor</strong> (Wikimedia Commons): ${rader}</section>`
}

export default function LandingPageClient({ photoMap, bildkallor = [], antalOar }: { photoMap?: Record<string, string>; bildkallor?: Bildkalla[]; antalOar: number }) {
 const router = useRouter()
 // FÖRHANDSVISNING 2026-11-20: Sverigekartan (RegionKarta) renderas in i platsen #sv-regionkarta i LANDING_HTML.
 const [kartMal, setKartMal] = useState<HTMLElement | null>(null)
 // Startsidans HTML kan bytas ut efter att sidan laddats (då försvinner platsen kartan ritats i).
 // Därför bevakas sidan och kartan flyttas till den nya platsen när den dyker upp.
 useEffect(() => {
   const hitta = () => { const el = document.getElementById('sv-regionkarta'); setKartMal(prev => (prev === el ? prev : el)) }
   hitta()
   const mo = new MutationObserver(hitta)
   mo.observe(document.body, { childList: true, subtree: true })
   return () => mo.disconnect()
 }, [])
 useEffect(() => {
 // Auto-redirect till feed borttagen — inloggade användare ska kunna besöka startsidan
 // och navigera tillbaka till appen därifrån.
 // Om inloggad: byt "Logga in"-knapparna i nav-cta till "Till appen →"
 const supabase = createClient()
 supabase.auth.getSession().then(({ data: { session } }) => {
   if (session) {
     document.querySelectorAll<HTMLAnchorElement>('a[href="/logga-in"].btn-ghost').forEach(el => {
       el.href = '/feed'
       el.textContent = 'Till appen →'
     })
   }
 })

 // -- Soft-navigation för interna länkar i den dangerouslySetInnerHTML-renderade
 // landningssidan. <a href="/oar"> blir router.push('/oar') &rarr; ingen full page-reload.
 // Påverkar bara same-origin-länkar utan modifier-tangenter eller target=_blank.
 const onLinkClick = (e: MouseEvent) => {
 const a = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null
 if (!a) return
 if (a.target === '_blank' || a.hasAttribute('download')) return
 if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
 const href = a.getAttribute('href')
 if (!href || !href.startsWith('/')) return
 if (href.startsWith('//')) return
 e.preventDefault()
 router.push(href)
 }
 // Hover-prefetch: när musen rör en intern länk, varma upp routen.
 // Touch-devices triggar pointerover vid första tap &rarr; samma vinst.
 const seen = new WeakSet<HTMLAnchorElement>()
 const onLinkHover = (e: PointerEvent) => {
 const a = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null
 if (!a || seen.has(a)) return
 const href = a.getAttribute('href')
 if (!href || !href.startsWith('/') || href.startsWith('//')) return
 seen.add(a)
 router.prefetch(href)
 }
 document.addEventListener('click', onLinkClick)
 document.addEventListener('pointerover', onLinkHover, { passive: true })


 // Nav-styling sköts via CSS — inga inline-overrides

 // Nav scroll-effekt
 const nav = document.getElementById('mainNav')
 const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 60)
 window.addEventListener('scroll', handleScroll)

 // Mobil hamburger drawer
 const hamburger = document.getElementById('navHamburger')
 const mobDrawer = document.getElementById('mobDrawer')
 const mobOverlay = document.getElementById('mobOverlay')
 const mobClose = document.getElementById('mobDrawerClose')
 const openMobDrawer = () => {
 mobDrawer?.classList.add('open')
 mobOverlay?.classList.add('open')
 document.body.style.overflow = 'hidden'
 }
 const closeMobDrawer = () => {
 mobDrawer?.classList.remove('open')
 mobOverlay?.classList.remove('open')
 document.body.style.overflow = ''
 }
 hamburger?.addEventListener('click', openMobDrawer)
 mobOverlay?.addEventListener('click', closeMobDrawer)
 mobClose?.addEventListener('click', closeMobDrawer)

 // Accordion-toggle i mobile-drawer
 document.querySelectorAll('.mob-acc-head').forEach(head => {
 head.addEventListener('click', () => {
 head.closest('.mob-acc')?.classList.toggle('open')
 })
 })

 // Stäng drawer när länk klickas
 document.querySelectorAll('.mob-drawer a').forEach(a => {
 a.addEventListener('click', closeMobDrawer)
 })

 // Scroll reveal
 const revealEls = document.querySelectorAll('.reveal')
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(e => {
 if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
 })
 }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })
 revealEls.forEach(el => observer.observe(el))
 // Fallback: om JS laddar långsamt, visa allt efter 1.5s
 const fallback = setTimeout(() => revealEls.forEach(el => el.classList.add('visible')), 1500)

 // ── Applicera Google-foton på alla data-lp-photo-element ──────────────────
 // Scripts inuti dangerouslySetInnerHTML körs INTE vid client-side navigation
 // (browsers kör aldrig scripts injektade via innerHTML). Logiken lever
 // därför här i useEffect så att den alltid körs, oavsett navigationssätt.
 // Bilderna är CSS-bakgrunder och kan därför inte lazy-laddas av webbläsaren
 // själv. Uppmätt med Lighthouse (mobil, 2026-09-29): startsidan hämtade 15
 // Commons-bilder à 960 px = 3,3 MB direkt vid sidladdning, varav ingen syns
 // ovanför vecket (hjälten är en canvas). Därför sätts bakgrunden först när
 // kortet närmar sig vyn (600 px marginal). Utan IntersectionObserver
 // (gamla webbläsare) sätts allt direkt som förut.
 const sattBild = (el: HTMLElement, url: string) => {
     if (
       el.classList.contains('dest-card-bg') ||
       el.classList.contains('region-card-bg') ||
       el.classList.contains('gallery-item-bg')
     ) {
       el.style.backgroundImage = `url(${url})`
       el.style.backgroundSize = 'cover'
       el.style.backgroundPosition = 'center'
     } else if (el.classList.contains('route-img')) {
       el.style.backgroundImage = `linear-gradient(180deg,rgba(13,36,64,0)0%,rgba(13,36,64,0.55)100%),url(${url})`
       el.style.backgroundSize = 'cover'
       el.style.backgroundPosition = 'center'
     } else if (
       el.classList.contains('resetips-card-img') ||
       el.classList.contains('guide-card-img')
     ) {
       el.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.15)),url(${url})`
       el.style.backgroundSize = 'cover'
       el.style.backgroundPosition = 'center'
     }
 }
 let bildObserver: IntersectionObserver | null = null
 function applyLpPhotos(map: Record<string, string> | null) {
   if (!map || !Object.keys(map).length) return
   if ('IntersectionObserver' in window && !bildObserver) {
     bildObserver = new IntersectionObserver(entries => {
       for (const e of entries) {
         if (!e.isIntersecting) continue
         const el = e.target as HTMLElement
         // En karusell observeras som helhet: korten till höger är klippta av
         // karusellens overflow och skulle annars aldrig räknas som synliga
         // förrän man sveper — då syns en tom ruta innan bilden kommer.
         // Uppmätt i Playwright 2026-09-29: 3 av 4 galleribilder saknades.
         const mal = el.dataset.lpUrl ? [el] : [...el.querySelectorAll<HTMLElement>('[data-lp-url]')]
         for (const m of mal) if (m.dataset.lpUrl) sattBild(m, m.dataset.lpUrl)
         bildObserver?.unobserve(el)
       }
     }, { rootMargin: '600px 0px' })
   }
   const karuseller = new Set<HTMLElement>()
   document.querySelectorAll<HTMLElement>('[data-lp-photo]').forEach(el => {
     const key = el.getAttribute('data-lp-photo')
     const url = key ? map[key] : undefined
     if (!url) return
     if (bildObserver) {
       el.dataset.lpUrl = url
       const karusell = el.closest<HTMLElement>('.gallery-scroll, .regions-scroll')
       if (karusell) karuseller.add(karusell)
       else bildObserver.observe(el)
       return
     }
     sattBild(el, url)
   })
   karuseller.forEach(k => bildObserver?.observe(k))
 }
 if (photoMap && Object.keys(photoMap).length > 0) {
   applyLpPhotos(photoMap)
 } else {
   fetch('/api/landing-photos')
     .then(r => r.ok ? r.json() : null)
     .catch(() => null)
     .then(applyLpPhotos)
 }

 // Dynamiska trust-bar-siffror — hämta från /api/stats och uppdatera DOM
 fetch('/api/stats', { cache: 'force-cache' })
 .then(r => r.ok ? r.json() : null)
 .then(stats => {
 if (!stats) return
 const fmt = (n: number) => n.toLocaleString('sv-SE')
 document.querySelectorAll<HTMLElement>('[data-stat="islands"]').forEach(el => {
 if (typeof stats.islands === 'number') el.textContent = String(stats.islands)
 })
 document.querySelectorAll<HTMLElement>('[data-stat="places"]').forEach(el => {
 const total = (stats.places ?? 0) + (stats.harbors ?? 0)
 if (total > 0) el.textContent = `${fmt(total)}`
 })
 document.querySelectorAll<HTMLElement>('[data-stat="users"]').forEach(el => {
 if (typeof stats.users === 'number' && stats.users > 0) el.textContent = fmt(stats.users)
 })
 document.querySelectorAll<HTMLElement>('[data-stat="trips"]').forEach(el => {
 if (typeof stats.trips === 'number' && stats.trips > 0) el.textContent = fmt(stats.trips)
 })
 document.querySelectorAll<HTMLElement>('[data-stat="visits"]').forEach(el => {
 if (typeof stats.islandVisits === 'number' && stats.islandVisits > 0) el.textContent = fmt(stats.islandVisits)
 })
 })
 .catch(() => {})

 return () => {
 clearTimeout(fallback)
 window.removeEventListener('scroll', handleScroll)
 document.removeEventListener('click', onLinkClick)
 document.removeEventListener('pointerover', onLinkHover)
 observer.disconnect()
 bildObserver?.disconnect()
 hamburger?.removeEventListener('click', openMobDrawer)
 mobOverlay?.removeEventListener('click', closeMobDrawer)
 mobClose?.removeEventListener('click', closeMobDrawer)
 document.body.style.overflow = ''
 }
 }, [router, photoMap])

 // Startsidans HTML.
 const landingHtml = LANDING_HTML.split('__ANTAL_OAR__').join(String(antalOar)).split('__NAV_LINKS__').join(menyHtmlDator()).split('__MITT_SVALLA__').join(mittSvallaHtmlDator()).split('__MOB_NAV__').join(menyHtmlMobil()).replace('<footer>', bildkallorHtml(bildkallor) + '<footer>')

 return (
 <>
 {photoMap && Object.keys(photoMap).length > 0 && <script dangerouslySetInnerHTML={{ __html: `window.__LP_PHOTOS__=${JSON.stringify(photoMap)}` }} />}
 <div style={{ position: 'relative' }}>
 {/* Animated skärgård scene — fills exactly the hero viewport, behind all content */}
 <div style={{
 position: 'absolute', top: 0, left: 0, right: 0,
 /* Exakt 100vh — canvas matchar viewport, vattenlinje vid 58% = 42% hav synligt */
 height: '100vh',
 zIndex: 0,
 overflow: 'hidden',
 pointerEvents: 'none',
 /* Platshållare tills canvasen målat: samma färgstopp som dagtemat (variant 1)
    i HeroAnimation — himmel #3d94d4→#b0dcf2 ned till vattenlinjen på 58 %,
    vatten #2488c0→#0a2e5a under. Var tidigare en mörkblå gradient, vilket gav
    en mörk blixt första sekunden innan animationen tog över (kort 1780a7c6). */
 background: 'linear-gradient(to bottom, #3d94d4 0%, #60aee0 20%, #92c8f0 44%, #b0dcf2 58%, #2488c0 58%, #186aa8 72%, #104e84 86%, #0a2e5a 100%)',
 } as React.CSSProperties}>
 {/* Wrapping HeroAnimation i Suspense förhindrar att Next.js stämplar
     BAILOUT_TO_CLIENT_SIDE_RENDERING på resten av sidan när komponenten
     är dynamic({ssr:false}). Resten av landing-sidan SSR:as då normalt
     och Googlebot ser hela LANDING_HTML i initial HTML — kritiskt för
     indexering. */}
 <Suspense fallback={null}>
   <HeroAnimation variant={startsidansVariant()} />
 </Suspense>
 </div>
 <style>{`
 /* Hero section — transparent shows canvas through, no dark bg that would cover animation */
 .hero { position: relative; z-index: 1; background: transparent !important; }
 `}</style>
 <div style={{ position: 'relative', zIndex: 1 }} dangerouslySetInnerHTML={{ __html: landingHtml }} />
 {kartMal && createPortal(<RegionKarta />, kartMal)}
 {/* Julkalendern: litet paket med skylt uppe till vänster i himlen, 1–24 december */}
 <JulkalenderSkylt />
 </div>
 </>
 )
}
