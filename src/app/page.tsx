'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import dynamic from 'next/dynamic'

const HeroAnimation = dynamic(() => import('@/components/HeroAnimation'), {
 ssr: false,
 loading: () => null,
})

const LANDING_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
 --sea-dark:#0d2440; --sea-mid:#1a4a5e;
 --teal:#1e5c82; --teal-light:#2d7aaa;
 --sand:#f4ede0; --sand-light:#faf6f0;
 --white:#ffffff; --ink:#1c2b2e; --muted:#6b8087;
 --accent:#e8924a; --accent-light:#f0a866;
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
.nav-links>li>a{color:#fff;text-decoration:none;font-family:'Inter',sans-serif!important;font-size:14.5px!important;font-weight:600!important;letter-spacing:.04em!important;transition:.18s;line-height:1;padding:10px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;position:relative}
.nav-links>li>a::before{content:'';position:absolute;left:16px;right:16px;bottom:6px;height:2px;background:var(--accent);border-radius:2px;transform:scaleX(0);transform-origin:center;transition:transform .22s ease}
.nav-links>li>a:hover{background:rgba(255,255,255,.08)}
.nav-links>li>a:hover::before{transform:scaleX(1)}
.nav-tab-btn{display:inline-flex!important;align-items:center;gap:6px}
.nav-dropdown{position:relative}
.nav-dropdown > a{display:flex;align-items:center;gap:6px}
.nav-dropdown > a::after{content:'▾';font-size:10px;opacity:.5;transition:.2s;line-height:1;font-family:'Inter',sans-serif;font-weight:400}
.nav-dropdown:hover > a::after{opacity:1}
.nav-mega{position:absolute;top:100%;padding-top:12px;left:50%;transform:translateX(-50%);min-width:880px;max-width:calc(100vw - 60px);opacity:0;pointer-events:none;transition:opacity .18s,transform .18s;transform:translateX(-50%) translateY(-4px)}
.nav-mega-inner{background:rgba(10,28,40,.97);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:20px 24px;box-shadow:0 20px 60px rgba(0,0,0,.4)}
.nav-dropdown:hover .nav-mega{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}
.nav-mega-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.nav-mega-col{padding:8px 14px}
.nav-mega-col:not(:last-child){border-right:1px solid rgba(255,255,255,.07)}
.nav-mega-region{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
.nav-mega-region+.nav-mega-region{margin-top:12px}
.nav-mega-link{display:flex;align-items:center;gap:9px;color:rgba(255,255,255,.8);text-decoration:none;font-size:13px;padding:6px 0;transition:.15s;border-bottom:1px solid rgba(255,255,255,.04)}
.nav-mega-link:hover{color:#fff}
.nav-mega-ico{width:14px;height:14px;flex-shrink:0;stroke:currentColor;stroke-width:1.7;fill:none;stroke-linecap:round;stroke-linejoin:round;opacity:.75;transition:opacity .15s}
.nav-mega-link:hover .nav-mega-ico{opacity:1}
.nav-mega-link:last-child{border-bottom:none}
.nav-mega-link:hover{color:#fff;padding-left:4px}
.nav-mega-all{display:inline-block;margin-top:8px;font-size:12px;font-weight:700;color:var(--accent);text-decoration:none;opacity:.8}
.nav-mega-all:hover{opacity:1}
.nav-tabs-bar{display:flex;gap:4px;margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:12px}
.nav-tab-btn{background:none;border:none;color:rgba(255,255,255,.55);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;transition:.15s;letter-spacing:0;white-space:nowrap}
.nav-tab-btn:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.06)}
.nav-tab-btn.active{color:var(--accent);background:rgba(232,146,74,.1)}
.nav-tab-content{display:none}
.nav-tab-content.active{display:block}
.nav-hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:5px;align-items:center;justify-content:center}
.nav-hamburger span{display:block;width:22px;height:2px;background:rgba(255,255,255,.85);border-radius:2px;transition:.25s}
.mob-drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:998;opacity:0;pointer-events:none;transition:opacity .25s}
.mob-drawer-overlay.open{opacity:1;pointer-events:auto}
.mob-drawer{position:fixed;top:0;right:0;width:min(340px,90vw);height:100svh;background:rgba(8,20,30,.98);backdrop-filter:blur(24px);z-index:999;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);overflow-y:auto;padding-bottom:40px}
.mob-drawer.open{transform:translateX(0)}
.mob-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.1)}
.mob-drawer-logo{font-family:'Playfair Display',serif;font-size:16px;color:#fff;letter-spacing:2.5px;font-weight:700}
.mob-drawer-close{background:none;border:none;color:rgba(255,255,255,.55);font-size:28px;cursor:pointer;line-height:1;padding:0 4px}
.mob-acc{border-bottom:1px solid rgba(255,255,255,.07)}
.mob-acc-head{display:flex;align-items:center;justify-content:space-between;padding:15px 20px;color:rgba(255,255,255,.85);font-size:14.5px;font-weight:600;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:'Inter',sans-serif;transition:.15s}
.mob-acc-head:hover{color:#fff;background:rgba(255,255,255,.03)}
.mob-acc-chevron{font-size:15px;color:rgba(255,255,255,.35);transition:transform .2s;display:inline-block}
.mob-acc.open .mob-acc-chevron{transform:rotate(90deg);color:var(--accent)}
.mob-acc-body{display:none;padding:0 20px 14px}
.mob-acc.open .mob-acc-body{display:block}
.mob-acc-link{display:block;padding:9px 0;color:rgba(255,255,255,.58);text-decoration:none;font-size:13.5px;border-bottom:1px solid rgba(255,255,255,.04);transition:.15s}
.mob-acc-link:last-child{border-bottom:none}
.mob-acc-link:hover{color:#fff;padding-left:4px}
.mob-drawer-cta{padding:16px 20px;display:flex;flex-direction:column;gap:10px;margin-top:6px}
.mob-drawer-cta a{text-align:center;justify-content:center}
@media(max-width:600px){.nav-hamburger{display:flex}}
.nav-cta{display:flex;gap:10px;align-items:center}
.btn{padding:10px 20px;border-radius:var(--r-sm);font-size:13.5px;font-weight:600;cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:.2s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn-ghost{background:rgba(255,255,255,.12);color:var(--white);border:1px solid rgba(255,255,255,.2)}
.btn-ghost:hover{background:rgba(255,255,255,.22)}
.btn-accent{background:var(--accent);color:var(--white)}
.btn-accent:hover{background:var(--accent-light);transform:translateY(-1px)}
.btn-accent:active,.btn-teal:active,.btn-ghost:active{transform:scale(0.97);transition:transform 80ms ease}
.btn-teal{background:var(--teal);color:var(--white)}
.btn-teal:hover{background:var(--teal-light);transform:translateY(-1px)}
.btn-lg{padding:16px 36px;font-size:15px;border-radius:var(--r-sm)}
.btn-xl{padding:18px 44px;font-size:16px;border-radius:var(--r-sm)}
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;overflow:hidden;padding-top:clamp(40px,calc(50vh - 350px),240px);}
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
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:30px;padding:7px 16px;font-size:12px;font-weight:600;color:rgba(255,255,255,.85);letter-spacing:.1em;text-transform:uppercase;margin-bottom:28px;backdrop-filter:blur(8px);}
.hero-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(42px,7vw,82px);font-weight:900;line-height:1.06;color:var(--white);margin-bottom:24px;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(5,15,30,.6);}
.hero-title em{font-style:italic;background:linear-gradient(135deg,var(--accent),#f4b06a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.hero-sub{font-size:clamp(16px,2.2vw,20px);font-weight:300;color:rgba(255,255,255,.72);max-width:600px;margin:14px auto 28px;line-height:1.65;text-shadow:0 1px 10px rgba(5,15,30,.55);}
.hero-search{display:flex;max-width:560px;margin:0 auto 20px;background:rgba(255,255,255,.96);border-radius:50px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.3);}
.hero-search input{flex:1;border:none;outline:none;padding:18px 24px;font-size:15px;font-family:'Inter',sans-serif;color:var(--ink);background:transparent;}
.hero-search button{margin:6px 6px 6px 0;padding:12px 28px;border-radius:50px;background:var(--accent);color:var(--white);border:none;font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:.2s;white-space:nowrap;}
.hero-search button:hover{background:var(--accent-light)}
.hero-search-hint{font-size:12.5px;color:rgba(255,255,255,.5);margin-bottom:44px}
.hero-search-hint span{color:rgba(255,255,255,.75);text-decoration:underline;cursor:pointer;margin:0 6px}
.hero-scroll{display:flex;flex-direction:column;align-items:center;gap:8px;color:rgba(255,255,255,.45);font-size:11px;letter-spacing:.1em;text-transform:uppercase;animation:float 3s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
.hero-scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.4))}
.trust-bar{background:var(--sea-dark);padding:20px 40px;display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap;}
.trust-item{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,.65);font-size:13px}
.trust-item strong{color:var(--white);font-size:16px;font-weight:700}
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
.krog-card-img{height:210px;position:relative;overflow:hidden;}
.krog-card-img .img-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;transition:.5s;}
.krog-card:hover .img-inner{transform:scale(1.06)}
.krog-card-badge{position:absolute;top:14px;left:14px;background:var(--accent);color:var(--white);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;border-radius:6px;padding:4px 10px;}
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
.how-section .section-label{color:var(--accent)}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;position:relative;z-index:1}
.step{padding:40px 28px;text-align:center}
.step-num{width:52px;height:52px;border-radius:50%;background:rgba(232,146,74,.18);border:2px solid rgba(232,146,74,.5);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--accent-light);margin:0 auto 20px;}
.step h4{font-size:16px;font-weight:700;color:var(--white);margin-bottom:10px}
.step p{font-size:13.5px;color:rgba(255,255,255,.75);line-height:1.6}
.routes-section{background:var(--sand)}
.routes-scroll{display:flex;gap:20px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none;}
.routes-scroll::-webkit-scrollbar{display:none}
.route-card{flex-shrink:0;width:280px;border-radius:var(--r);overflow:hidden;background:var(--white);box-shadow:var(--shadow);transition:.3s;cursor:pointer;}
.route-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.route-img{height:160px;display:flex;align-items:center;justify-content:center;font-size:40px;position:relative}
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
.split-pane.owner .section-label{color:var(--accent)}
.split-features{display:flex;flex-direction:column;gap:16px;margin:28px 0 36px}
.split-feature{display:flex;align-items:flex-start;gap:12px}
.split-feature-icon{width:36px;height:36px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--teal);}
.split-pane.explorer .split-feature-icon{background:rgba(45,125,138,.1)}
.split-pane.owner .split-feature-icon{background:rgba(255,255,255,.1);color:#fff}
.split-feature-text h5{font-size:14px;font-weight:600;margin-bottom:3px}
.split-feature-text p{font-size:13px;color:var(--muted);line-height:1.5}
.split-pane.owner .split-feature-text h5{color:var(--white)}
.split-pane.owner .split-feature-text p{color:rgba(255,255,255,.55)}
.stats-section{background:linear-gradient(135deg,var(--sea-dark),var(--sea-mid))}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.08)}
.stat-box{padding:52px 32px;text-align:center;background:transparent;}
.stat-num{font-family:'Playfair Display',serif;font-size:clamp(36px,4vw,54px);font-weight:800;background:linear-gradient(135deg,var(--accent),#f4b06a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;margin-bottom:8px;}
.stat-label{font-size:14px;color:rgba(255,255,255,.6);line-height:1.5}
.stat-sub{font-size:11px;color:rgba(255,255,255,.35);margin-top:4px}
.testimonial-section{background:var(--sand)}
.testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.testimonial{background:var(--white);border-radius:var(--r);padding:32px 28px;box-shadow:var(--shadow);position:relative;}
.testimonial::before{content:'"';font-family:'Playfair Display',serif;font-size:72px;color:rgba(45,125,138,.1);position:absolute;top:12px;left:20px;line-height:1;}
.testimonial-text{font-size:15px;color:var(--ink);line-height:1.7;margin-bottom:20px;position:relative}
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
.app-badge-text .small{font-size:10px;opacity:.7;display:block}
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
/* ── Destinations ── */
.destinations-section{background:var(--sand)}
.destinations-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.dest-card{border-radius:var(--r);overflow:hidden;cursor:pointer;transition:.3s;position:relative;min-height:300px;display:flex;flex-direction:column;justify-content:flex-end;text-decoration:none;}
.dest-card:hover .dest-card-bg{transform:scale(1.05)}
.dest-card-bg{position:absolute;inset:0;transition:.5s}
.dest-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,20,32,.9) 0%,rgba(8,20,32,.1) 65%)}
.dest-card-content{position:relative;z-index:1;padding:24px 20px}
.dest-card-region{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
.dest-card-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#fff;margin-bottom:10px;line-height:1.25}
.dest-card-islands{display:flex;flex-wrap:wrap;gap:4px}
.dest-island{font-size:11px;color:rgba(255,255,255,.8);background:rgba(255,255,255,.12);padding:3px 8px;border-radius:10px;backdrop-filter:blur(4px)}
a.dest-island{text-decoration:none;cursor:pointer;transition:background .15s,color .15s}
a.dest-island:hover{background:rgba(255,255,255,.28);color:#fff}
/* ── Activities ── */
.activities-section{background:var(--white)}
.activities-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.activity-card{background:var(--white);border-radius:var(--r);padding:32px 28px;box-shadow:var(--shadow);transition:.3s}
.activity-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.activity-icon{width:48px;height:48px;margin-bottom:16px;color:var(--sea)}
.activity-card h3{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--sea);margin-bottom:10px}
.activity-card p{font-size:13.5px;color:var(--muted);line-height:1.65}
.activity-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:14px}
/* ── Getting there ── */
.getting-there-section{background:var(--sea-mid);color:var(--white)}
.getting-there-section .section-title{color:var(--white)}
.getting-there-section .section-label{color:var(--accent)}
.getting-there-section .section-sub{color:rgba(255,255,255,.6)}
.ferry-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.ferry-card{background:rgba(255,255,255,.07);border-radius:var(--r);padding:28px 24px;border:1px solid rgba(255,255,255,.1)}
.ferry-card h4{font-size:17px;font-weight:700;color:#fff;margin-bottom:6px}
.ferry-card-op{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:14px}
.ferry-routes{list-style:none;display:flex;flex-direction:column;gap:9px}
.ferry-route{font-size:13px;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:8px}
.ferry-route::before{content:'';font-size:13px;flex-shrink:0}
/* ── Accommodation ── */
.boende-section{background:var(--sand)}
.boende-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.boende-card{background:var(--white);border-radius:var(--r);padding:28px 24px;box-shadow:var(--shadow);text-align:center;transition:.3s}
.boende-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.boende-icon{width:44px;height:44px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;color:var(--sea)}
.boende-card h4{font-size:15px;font-weight:700;color:var(--sea);margin-bottom:8px}
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
 section{padding:72px 24px}
 .lp-nav{padding:0 16px;height:60px}
 .nav-links{display:none}
 .nav-cta{gap:7px}
 .btn-ghost{padding:8px 14px;font-size:13px}
 .btn-accent{padding:8px 14px;font-size:13px}
 .trust-bar{gap:16px;padding:14px 16px}
 .trust-item{font-size:12px}
 .trust-divider{display:none}
 .krog-grid{grid-template-columns:1fr}
 .stats-grid{grid-template-columns:1fr 1fr}
 .split-pane{padding:60px 28px}
 .footer-grid{grid-template-columns:1fr}
 .hero-title{font-size:clamp(36px,9vw,56px)}
 .hero-sub{font-size:15px}
 .hero-search{border-radius:16px;flex-direction:column;gap:0;overflow:hidden}
 .hero-search input{padding:14px 18px;font-size:14px}
 .hero-search button{margin:0;border-radius:0;padding:13px 18px;font-size:14px}
 .steps{grid-template-columns:1fr}
}
/* Dark mode: match footer color so no black strip appears below footer */
[data-theme="dark"] body { background: var(--sea-dark) !important; }
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
 <ul class="nav-links">
 <li class="nav-dropdown">
 <a href="#">Utforska</a>
 <div class="nav-mega">
 <div class="nav-mega-inner">
 <div class="nav-tabs-bar">
 <button class="nav-tab-btn active" data-tab="hitta"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.9;flex-shrink:0"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> Hitta en ö</button>
 <button class="nav-tab-btn" data-tab="planera"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.9;flex-shrink:0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Planera resan</button>
 <button class="nav-tab-btn" data-tab="uppleva"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.9;flex-shrink:0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> Uppleva &amp; göra</button>
 <button class="nav-tab-btn" data-tab="populart"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.9;flex-shrink:0"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Populärt</button>
 </div>
 <div class="nav-tab-content active" id="nav-tab-hitta">
 <div class="nav-mega-grid">
 <div class="nav-mega-col">
 <div class="nav-mega-region">Hitta efter typ</div>
 <a href="/bastu-och-bad" class="nav-mega-link">Stränder &amp; bad</a>
 <a href="/hamnar-och-bryggor" class="nav-mega-link">Hamnar &amp; segling</a>
 <a href="/vandring-och-natur" class="nav-mega-link">Natur &amp; vandring</a>
 <a href="/krogar-och-mat" class="nav-mega-link">Mat &amp; restauranger</a>
 <a href="/boende" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg> Boende</a>
 <a href="/resmal" class="nav-mega-all">Se alla kategorier →</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Hitta för dig</div>
 <a href="/oar/barnvanliga" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Barnvänliga öar</a>
 <a href="/oar/romantiska" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Romantiska öar</a>
 <a href="/oar/avskild" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Avskilda pärlor</a>
 <a href="/oar/utan-bil" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg> Öar utan bil</a>
 <a href="/oar/dagstur-stockholm" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> Dagstur från Stockholm</a>
 <a href="/oar" class="nav-mega-all">Alla filter →</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Jämför &amp; utforska</div>
 <a href="/jamfor" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> Jämför två öar</a>
 <a href="/karta" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> Karta över skärgården</a>
 <a href="/o" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Alla 69 öar</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Regioner</div>
 <a href="/stockholms-skargard" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Stockholms skärgård</a>
 <a href="/bohuslan" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Bohuslän</a>
 <a href="/gotland" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Gotland</a>
 <a href="/aland" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Åland</a>
 <a href="/blekinge-skargard" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Blekinges skärgård</a>
 <a href="/vasterhav" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/></svg> Västerhavet</a>
 <a href="/malaren" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/></svg> Mälaren</a>
 <a href="/goteborg-skargard" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Göteborgs skärgård</a>
 </div>
 </div>
 </div>
 <div class="nav-tab-content" id="nav-tab-planera">
 <div class="nav-mega-grid">
 <div class="nav-mega-col">
 <div class="nav-mega-region">Planera turen</div>
 <a href="/utflykt" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Utflyktsplanerare</a>
 <a href="/planera" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> Planera båtrutt</a>
 <a href="/segelrutter" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/></svg> Segelrutter</a>
 <a href="/snabbaste-vagen" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> Snabbaste vägen</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Ta sig dit</div>
 <a href="/farjor" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/></svg> Färjetider</a>
 <a href="/populara-turer" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Populära turer</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Inspiration</div>
 <a href="/blogg" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Bloggen</a>
 <a href="/tips" class="nav-mega-link">Tips &amp; artiklar</a>
 <a href="/nyborjarguider" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg> Nybörjarguider</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Min planering</div>
 <a href="/profil" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> Mina sparade öar</a>
 <a href="/profil" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Min profil</a>
 <a href="/planera" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Mina turer</a>
 </div>
 </div>
 </div>
 <div class="nav-tab-content" id="nav-tab-uppleva">
 <div class="nav-mega-grid">
 <div class="nav-mega-col">
 <div class="nav-mega-region">Aktiviteter</div>
 <a href="/aktivitet/segling" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/></svg> Segling</a>
 <a href="/aktivitet/cykla" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M6 15 9 6h5l3 9"/><circle cx="14" cy="6" r="1"/></svg> Cykling</a>
 <a href="/aktivitet/bada" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/></svg> Bad</a>
 <a href="/aktivitet/vandring" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg> Vandring</a>
 <a href="/bastu-och-bad" class="nav-mega-link">Bastu &amp; spa</a>
 <a href="/aktiviteter" class="nav-mega-all">Se alla →</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Mat &amp; dryck</div>
 <a href="/krogar-och-mat" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><line x1="5" y1="11" x2="5" y2="22"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> Restauranger</a>
 <a href="/aktivitet/mat" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><line x1="5" y1="11" x2="5" y2="22"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> Sjömatskrogar</a>
 <a href="/erbjudanden" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg> Erbjudanden</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Guider &amp; listor</div>
 <a href="/nyborjarguider" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg> Nybörjarguider</a>
 <a href="/topplista" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg> Topplistor</a>
 <a href="/evenemang" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Evenemang</a>
 <a href="/bingo" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> Skärgårdsbingo 2026</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Boende</div>
 <a href="/boende" class="nav-mega-link">Camping &amp; tält</a>
 <a href="/boende" class="nav-mega-link">Stugor &amp; stugbyar</a>
 <a href="/boende" class="nav-mega-link">Hotell &amp; vandrarhem</a>
 <a href="/hamnar-och-bryggor" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 15a7 7 0 0 0 14 0"/><line x1="8" y1="11" x2="16" y2="11"/></svg> Gästhamnar</a>
 </div>
 </div>
 </div>
 <div class="nav-tab-content" id="nav-tab-populart">
 <div class="nav-mega-grid">
 <div class="nav-mega-col">
 <div class="nav-mega-region">Populäraste öarna</div>
 <a href="/o/sandhamn" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg> Sandhamn</a>
 <a href="/o/uto" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Utö</a>
 <a href="/o/vaxholm" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Vaxholm</a>
 <a href="/o/grinda" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Grinda</a>
 <a href="/o/moja" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Möja</a>
 <a href="/o" class="nav-mega-all">Se alla öar →</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Dolda pärlor</div>
 <a href="/o/nattaro" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Nåttarö</a>
 <a href="/o/finnhamn" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Finnhamn</a>
 <a href="/o/galo" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Gålö</a>
 <a href="/o/svartloga" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Svartlöga</a>
 <a href="/o/kymendo" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Kymmendö</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">Hitta mer</div>
 <a href="/topplista" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Trendande just nu</a>
 <a href="/blogg" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Senaste från bloggen</a>
 <a href="/evenemang" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Kommande evenemang</a>
 </div>
 <div class="nav-mega-col">
 <div class="nav-mega-region">För partners</div>
 <a href="/erbjudanden" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg> Erbjudanden</a>
 <a href="/partner" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg> Bli partner</a>
 <a href="/forum" class="nav-mega-link"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.65;flex-shrink:0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Community-forum</a>
 </div>
 </div>
 </div>
 </div>
 </div>
 </li>
 <li><a href="/karta">Karta</a></li>
 <li><a href="/planera">Planera</a></li>
 </ul>
 <div class="nav-cta">
 <button class="nav-hamburger" id="navHamburger" aria-label="Öppna meny">
 <span></span><span></span><span></span>
 </button>
 <a href="/logga-in" class="btn btn-ghost">Logga in</a>
 <a href="/kom-igang" class="btn btn-accent">Kom igång →</a>
 </div>
</nav>
<div class="mob-drawer-overlay" id="mobOverlay"></div>
<div class="mob-drawer" id="mobDrawer">
 <div class="mob-drawer-head">
 <span class="mob-drawer-logo">SVALLA</span>
 <button class="mob-drawer-close" id="mobDrawerClose">×</button>
 </div>
 <div class="mob-acc">
 <button class="mob-acc-head"> Hitta en ö <span class="mob-acc-chevron">›</span></button>
 <div class="mob-acc-body">
 <a href="/resmal" class="mob-acc-link">Alla resmål</a>
 <a href="/karta" class="mob-acc-link">Karta över skärgården</a>
 <a href="/o" class="mob-acc-link">Alla 69 öar</a>
 <a href="/jamfor" class="mob-acc-link">Jämför öar</a>
 <a href="/oar/barnvanliga" class="mob-acc-link">Barnvänliga öar</a>
 <a href="/oar/romantiska" class="mob-acc-link">Romantiska öar</a>
 <a href="/oar/avskild" class="mob-acc-link">Avskilda pärlor</a>
 <a href="/oar/utan-bil" class="mob-acc-link">Öar utan bil</a>
 <a href="/oar/dagstur-stockholm" class="mob-acc-link">Dagstur från Stockholm</a>
 <a href="/stockholms-skargard" class="mob-acc-link">Stockholms skärgård</a>
 <a href="/bohuslan" class="mob-acc-link">Bohuslän</a>
 <a href="/gotland" class="mob-acc-link">Gotland</a>
 </div>
 </div>
 <div class="mob-acc">
 <button class="mob-acc-head">Planera resan <span class="mob-acc-chevron">›</span></button>
 <div class="mob-acc-body">
 <a href="/utflykt" class="mob-acc-link">Utflyktsplanerare</a>
 <a href="/planera" class="mob-acc-link">Planera båtrutt</a>
 <a href="/farjor" class="mob-acc-link">Färjetider</a>
 <a href="/segelrutter" class="mob-acc-link">Segelrutter</a>
 <a href="/snabbaste-vagen" class="mob-acc-link">Snabbaste vägen</a>
 <a href="/blogg" class="mob-acc-link">Blogg &amp; inspiration</a>
 <a href="/nyborjarguider" class="mob-acc-link">Nybörjarguider</a>
 </div>
 </div>
 <div class="mob-acc">
 <button class="mob-acc-head">Uppleva &amp; göra <span class="mob-acc-chevron">›</span></button>
 <div class="mob-acc-body">
 <a href="/aktiviteter" class="mob-acc-link">Alla aktiviteter</a>
 <a href="/krogar-och-mat" class="mob-acc-link">Mat &amp; restauranger</a>
 <a href="/bastu-och-bad" class="mob-acc-link">Bastu &amp; bad</a>
 <a href="/boende" class="mob-acc-link">Boende</a>
 <a href="/topplista" class="mob-acc-link">Topplistor</a>
 <a href="/evenemang" class="mob-acc-link">Evenemang</a>
 <a href="/bingo" class="mob-acc-link">Skärgårdsbingo 2026</a>
 </div>
 </div>
 <div class="mob-acc">
 <button class="mob-acc-head"> Populärt <span class="mob-acc-chevron">›</span></button>
 <div class="mob-acc-body">
 <a href="/o/sandhamn" class="mob-acc-link">Sandhamn</a>
 <a href="/o/uto" class="mob-acc-link">Utö</a>
 <a href="/o/vaxholm" class="mob-acc-link">Vaxholm</a>
 <a href="/o/grinda" class="mob-acc-link">Grinda</a>
 <a href="/o/moja" class="mob-acc-link">Möja</a>
 <a href="/o/nattaro" class="mob-acc-link">Nåttarö</a>
 <a href="/o/finnhamn" class="mob-acc-link">Finnhamn</a>
 <a href="/o" class="mob-acc-link">Se alla öar →</a>
 </div>
 </div>
 <div class="mob-drawer-cta">
 <a href="/logga-in" class="btn btn-ghost" style="width:100%;text-align:center;justify-content:center">Logga in</a>
 <a href="/kom-igang" class="btn btn-accent" style="width:100%;text-align:center;justify-content:center">Kom igång →</a>
 </div>
</div>

<section class="hero" style="background:transparent">
 <div class="hero-content">
 <div class="hero-eyebrow">
 <span class="hero-eyebrow-dot"></span>
 200+ platser kartlagda i Stockholms skärgård
 </div>
 <h1 class="hero-title">
 Din guide till<br>
 <em>Stockholms skärgård</em>
 </h1>
 <p class="hero-sub">
 Planera nästa tur. Hitta krogar, hamnar och dolda öar.
 Logga dina äventyr och bygg din egen skärgård.
 </p>
 <form class="hero-search" onsubmit="event.preventDefault();var q=document.getElementById('heroSearchInput').value.trim();location.href='/sok'+(q?'?q='+encodeURIComponent(q):'')">
 <input type="text" placeholder="Sök ö, krog eller hamn..." id="heroSearchInput"/>
 <button type="submit">Sök</button>
 </form>
 <div style="text-align:center;margin-bottom:16px">
 <a href="/planera" style="color:rgba(255,255,255,.88);font-size:13px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:7px;padding:8px 18px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:24px;backdrop-filter:blur(8px);transition:.2s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> Planera din tur med Thorkel →</a>
 </div>
 <div class="hero-search-hint">
 Populärt just nu:
 <span onclick="location.href='/sok?q=Sandhamn'">Sandhamn</span>
 <span onclick="location.href='/sok?q=Grinda'">Grinda</span>
 <span onclick="location.href='/sok?q=Utö'">Utö</span>
 <span onclick="location.href='/sok?q=Finnhamn'">Finnhamn</span>
 </div>
 <div class="hero-scroll">
 <div class="hero-scroll-line"></div>
 Scrolla
 </div>
 </div>
</section>

<div class="trust-bar">
 <div class="trust-item"><strong data-stat="islands">84</strong> Öar med guider</div>
 <div class="trust-divider"></div>
 <div class="trust-item"><strong data-stat="places">200+</strong> Krogar &amp; hamnar kartlagda</div>
 <div class="trust-divider"></div>
 <div class="trust-item"><strong>Arholma → Marstrand</strong> Stockholm + Bohuslän</div>
 <div class="trust-divider"></div>
 <div class="trust-item"><strong>0 kr</strong> Att komma igång</div>
</div>

<section class="concept-section" id="utforska">
 <div class="section-inner">
 <div class="section-header centered reveal">
 <div class="section-label">Vad är Svalla</div>
 <h2 class="section-title">Skärgårdslivet — samlat på ett ställe</h2>
 <p class="section-sub">Ingen app förstår hur skärgårdslivet faktiskt fungerar. Det gör vi nu. Byggt av skärgårdsmänniskor, för skärgårdsmänniskor.</p>
 </div>
 <div class="pillars">
 <div class="pillar reveal reveal-delay-1">
 <div class="pillar-icon sea"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div>
 <h3>Utforska platser</h3>
 <p>Krogar, bastun, bryggor och dolda pärlor — listade och recenserade av ett community som faktiskt är ute på vattnet. Hitta rätt ställe innan du ger dig ut.</p>
 </div>
 <div class="pillar reveal reveal-delay-2">
 <div class="pillar-icon teal"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>
 <h3>Logga din tur</h3>
 <p>Foto + plats på 10 sekunder. Din personliga skärgårdsdagbok växer med varje äventyr — se var du varit och inspirera andra att kasta loss.</p>
 </div>
 <div class="pillar reveal reveal-delay-3">
 <div class="pillar-icon accent"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
 <h3>Äkta community</h3>
 <p>Feeden fylls av riktiga turer från paddlare och seglare. Inga reklamannonser, ingen algoritm — bara skärgårdsliv som det ser ut på riktigt.</p>
 </div>
 </div>
 </div>
</section>

<section class="how-section">
 <div class="section-inner">
 <div class="section-header centered reveal">
 <div class="section-label">Hur det fungerar</div>
 <h2 class="section-title">Enkelt som skärgårdslivet självt</h2>
 <p class="section-sub">Inget krångel. Inga konton som måste fyllas i. Bara du, havet och appen.</p>
 </div>
 <div class="steps">
 <div class="step reveal reveal-delay-1">
 <div class="step-num">1</div>
 <h4>Utforska feeden</h4>
 <p>Bläddra bland andras turer, platser och bilder. Hitta inspiration till din nästa tur — krogar, bastun och dolda bryggor.</p>
 </div>
 <div class="step reveal reveal-delay-2">
 <div class="step-num">2</div>
 <h4>Ge dig ut</h4>
 <p>Kajak, segelbåt, motorbåt eller till fots. Platser längs din rutt väntar med äkta recensioner från folk som redan paddlat dit.</p>
 </div>
 <div class="step reveal reveal-delay-3">
 <div class="step-num">3</div>
 <h4>Logga på 10 sekunder</h4>
 <p>Tryck "+", välj ett foto, skriv platsen. Klart. Din tur lever för alltid i din loggbok och i communityt.</p>
 </div>
 <div class="step reveal reveal-delay-4">
 <div class="step-num">4</div>
 <h4>Bygg din historia</h4>
 <p>Profilen växer med varje äventyr. Se var du varit och när — och inspirera nästa seglare att kasta loss.</p>
 </div>
 </div>
 </div>
</section>

<section class="destinations-section" id="resmål">
 <div class="section-inner">
 <div class="section-header centered reveal">
 <div class="section-label">Utforska skärgården</div>
 <h2 class="section-title">Välj din del av skärgården</h2>
 <p class="section-sub">Stockholms skärgård sträcker sig 80 mil från norr till söder — varje region har sin karaktär och sina gömda skatter.</p>
 </div>
 <div class="destinations-grid">
 <a href="/o/vaxholm" class="dest-card reveal reveal-delay-1">
 <div class="dest-card-bg" style="background:linear-gradient(160deg,#0a1e2e,#1a4a5e,#2272a0)">
 <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
 <ellipse cx="120" cy="195" rx="95" ry="48" fill="#071520" opacity="0.6"/><ellipse cx="230" cy="240" rx="70" ry="35" fill="#050e18" opacity="0.7"/>
 <path d="M0,278 Q60,258 130,268 Q200,278 300,262 L300,320 L0,320 Z" fill="#040c15" opacity="0.9"/>
 </svg>
 </div>
 <div class="dest-card-overlay"></div>
 <div class="dest-card-content">
 <div class="dest-card-region"> Innerskärgården</div>
 <div class="dest-card-name">Fjäderholmarna · Vaxholm · Grinda</div>
 <div class="dest-card-islands"><span class="dest-island">Fjäderholmarna</span><span class="dest-island">Vaxholm</span><span class="dest-island">Grinda</span><span class="dest-island">Finnhamn</span><span class="dest-island">Resarö</span></div>
 </div>
 </a>
 <a href="/o/sandhamn" class="dest-card reveal reveal-delay-2">
 <div class="dest-card-bg" style="background:linear-gradient(160deg,#0c2218,#1a5032,#228048)">
 <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
 <ellipse cx="100" cy="205" rx="80" ry="40" fill="#061510" opacity="0.65"/><ellipse cx="215" cy="238" rx="88" ry="44" fill="#040e0a" opacity="0.75"/>
 <path d="M0,280 Q90,260 195,270 Q258,276 300,263 L300,320 L0,320 Z" fill="#030a06" opacity="0.9"/>
 </svg>
 </div>
 <div class="dest-card-overlay"></div>
 <div class="dest-card-content">
 <div class="dest-card-region"> Mellersta skärgården</div>
 <div class="dest-card-name">Sandhamn · Möja · Ljusterö</div>
 <div class="dest-card-islands"><span class="dest-island">Sandhamn</span><span class="dest-island">Möja</span><span class="dest-island">Ljusterö</span><span class="dest-island">Gällnö</span><span class="dest-island">Runmarö</span></div>
 </div>
 </a>
 <a href="/o/uto" class="dest-card reveal reveal-delay-3">
 <div class="dest-card-bg" style="background:linear-gradient(160deg,#261408,#4a2c14,#7a4a22)">
 <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
 <ellipse cx="150" cy="215" rx="105" ry="52" fill="#180d04" opacity="0.65"/><ellipse cx="75" cy="255" rx="62" ry="30" fill="#100808" opacity="0.75"/>
 <path d="M0,282 Q75,266 162,275 Q232,282 300,268 L300,320 L0,320 Z" fill="#0c0604" opacity="0.9"/>
 </svg>
 </div>
 <div class="dest-card-overlay"></div>
 <div class="dest-card-content">
 <div class="dest-card-region">Södra skärgården</div>
 <div class="dest-card-name">Utö · Nåttarö · Landsort</div>
 <div class="dest-card-islands"><span class="dest-island">Utö</span><span class="dest-island">Nåttarö</span><span class="dest-island">Ornö</span><span class="dest-island">Dalarö</span><span class="dest-island">Landsort</span></div>
 </div>
 </a>
 <a href="/o/furusund" class="dest-card reveal reveal-delay-4">
 <div class="dest-card-bg" style="background:linear-gradient(160deg,#1e1038,#2e1a55,#40286e)">
 <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
 <ellipse cx="140" cy="210" rx="98" ry="50" fill="#120a25" opacity="0.65"/><ellipse cx="245" cy="248" rx="66" ry="33" fill="#0d071a" opacity="0.75"/>
 <path d="M0,280 Q85,262 182,273 Q248,280 300,266 L300,320 L0,320 Z" fill="#08050f" opacity="0.9"/>
 </svg>
 </div>
 <div class="dest-card-overlay"></div>
 <div class="dest-card-content">
 <div class="dest-card-region">Norra skärgården</div>
 <div class="dest-card-name">Furusund · Blidö · Norrtälje</div>
 <div class="dest-card-islands"><span class="dest-island">Furusund</span><span class="dest-island">Blidö</span><span class="dest-island">Arholma</span><span class="dest-island">Gräddö</span><span class="dest-island">Norrtälje</span></div>
 </div>
 </a>
 </div>
 </div>
</section>

<section class="routes-section" id="rutter">
 <div class="section-inner">
 <div class="section-header reveal" style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:20px">
 <div>
 <div class="section-label">Populära rutter</div>
 <h2 class="section-title">Utforska på din tur</h2>
 </div>
 <a href="/rutter" class="btn btn-teal">Alla rutter →</a>
 </div>
 <div class="routes-scroll reveal">
 <div class="route-card" onclick="location.href='/rutter'">
 <div class="route-img" style="background-image:linear-gradient(180deg,rgba(13,36,64,0)0%,rgba(13,36,64,0.55)100%),url('https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=720&q=80&auto=format&fit=crop'),linear-gradient(135deg,#1a4a5e,#24697f);background-size:cover,cover,cover;background-position:center,center,center;background-repeat:no-repeat"> <div class="route-tag">2 dagar</div></div>
 <div class="route-body"><h4>Stockholms innerskärgård</h4><p>Klassisk paddlingsrutt via Vaxholm, Grinda och Finnhamn. 5 krogar längs vägen.</p><div class="route-meta"><span> 48 km</span><span> 5 krogar</span><span> 4.8</span></div></div>
 </div>
 <div class="route-card" onclick="location.href='/rutter'">
 <div class="route-img" style="background-image:linear-gradient(180deg,rgba(13,36,64,0)0%,rgba(13,36,64,0.55)100%),url('https://images.unsplash.com/photo-1571051180813-b94b09ddc2d6?w=720&q=80&auto=format&fit=crop'),linear-gradient(135deg,#2d4a2e,#3a6040);background-size:cover,cover,cover;background-position:center,center,center;background-repeat:no-repeat"> <div class="route-tag">3 dagar</div></div>
 <div class="route-body"><h4>Yttre skärgården & Sandhamn</h4><p>Seglarturen längs leden till Sandhamn. Ikoniska stopp på vägen.</p><div class="route-meta"><span> 72 km</span><span> 7 krogar</span><span> 4.9</span></div></div>
 </div>
 <div class="route-card" onclick="location.href='/rutter'">
 <div class="route-img" style="background-image:linear-gradient(180deg,rgba(13,36,64,0)0%,rgba(13,36,64,0.55)100%),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=720&q=80&auto=format&fit=crop'),linear-gradient(135deg,#3a1a1a,#6a2a2e);background-size:cover,cover,cover;background-position:center,center,center;background-repeat:no-repeat"><div class="route-tag">1 dag</div></div>
 <div class="route-body"><h4>Utö – vandring & mat</h4><p>Dag-tur till Utö med vandring och lunch på värdshuset. Perfekt för nybörjare.</p><div class="route-meta"><span>8 km</span><span>2 krogar</span><span>★ 4.9</span></div></div>
 </div>
 <div class="route-card" onclick="location.href='/rutter'">
 <div class="route-img" style="background-image:linear-gradient(180deg,rgba(13,36,64,0)0%,rgba(13,36,64,0.55)100%),url('https://images.unsplash.com/photo-1502780402662-acc01917174e?w=720&q=80&auto=format&fit=crop'),linear-gradient(135deg,#1a3a4a,#2a5a6a);background-size:cover,cover,cover;background-position:center,center,center;background-repeat:no-repeat"> <div class="route-tag">Halvdag</div></div>
 <div class="route-body"><h4>Norrskärgårdens pärlor</h4><p>Arholma, Möja och Blidö — den orörda norrskärgården.</p><div class="route-meta"><span> 55 km</span><span> 4 krogar</span><span> 4.7</span></div></div>
 </div>
 <div class="route-card" onclick="location.href='/rutter'">
 <div class="route-img" style="background-image:linear-gradient(180deg,rgba(13,36,64,0)0%,rgba(13,36,64,0.55)100%),url('https://images.unsplash.com/photo-1519181258491-c4c61cd8e2a4?w=720&q=80&auto=format&fit=crop'),linear-gradient(135deg,#2a3a1a,#4a5a2a);background-size:cover,cover,cover;background-position:center,center,center;background-repeat:no-repeat"> <div class="route-tag">Weekend</div></div>
 <div class="route-body"><h4>Sydskärgårdens matkul</h4><p>En mat-fokuserad tur via Landsort och Nynäshamns yttre skärgård.</p><div class="route-meta"><span> 60 km</span><span> 6 krogar</span><span> 4.8</span></div></div>
 </div>
 </div>
 </div>
</section>

<section class="activities-section" id="aktiviteter">
 <div class="section-inner">
 <div class="section-header centered reveal">
 <div class="section-label">Se & Göra</div>
 <h2 class="section-title">Skärgårdslivet är mer än mat</h2>
 <p class="section-sub">Från klippbad och kajakpaddling till vandring och fiske — skärgården erbjuder aktiviteter för alla smaker och alla säsonger.</p>
 </div>
 <div class="activities-grid">
 <a href="/blogg/kajak-stockholms-skargard-nyborjare" class="activity-card reveal reveal-delay-1" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 14.5 Q12 12 22.5 14.5 Q12 17 1.5 14.5 Z"/><ellipse cx="11.5" cy="14.5" rx="3.5" ry="1.1"/><line x1="3.5" y1="9.5" x2="20.5" y2="19.5"/><path d="M3.5 9.5 Q1.5 8 2 11 Q2.5 12 3.5 9.5"/><path d="M20.5 19.5 Q22.5 21 22 18 Q21.5 17 20.5 19.5"/><circle cx="11.5" cy="12.5" r="1.6"/></svg>
 <h3>Kajak & Paddling</h3>
 <p>Stockholms skärgård är ett av världens bästa paddlingslandskap. Paddla ut till öar utan fast förbindelse och hitta platser som ingen annan ser.</p>
 <div class="activity-tags"><span class="chip">Nybörjarvänligt</span><span class="chip">Uthyrning</span><span class="chip">Guideturer</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
 </a>
 <a href="/blogg/segling-nyborjare-guide" class="activity-card reveal reveal-delay-2" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="10.5" y1="2" x2="11.5" y2="16.5"/><line x1="11.5" y1="16.5" x2="19" y2="15.5" stroke-width="1.2"/><path d="M10.5 2 L19 15.5 L11.5 16.5 Z"/><path d="M10.5 6 L3 16.5 L11.5 16.5"/><line x1="2.5" y1="16.5" x2="21.5" y2="16.5"/><path d="M2.5 16.5 Q7 19 12 20 Q17 19 21.5 16.5"/><path d="M12 20 L11.5 22.5 L12.5 22.5" stroke-width="1.6"/></svg>
 <h3>Segling & Båtliv</h3>
 <p>Segla längs klassiska leder mot Sandhamn eller ankra i stilla naturhamnar. Svalla visar gästhamnar, bränsle och övernattningsplatser längs vägen.</p>
 <div class="activity-tags"><span class="chip">Gästhamnar</span><span class="chip">Bränsle</span><span class="chip">Sjökortet</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
 </a>
 <a href="/blogg/basta-badplatserna" class="activity-card reveal reveal-delay-3" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17 L5 14 L7 15.5 L9 11 L12 13 L14 9.5 L17 13 L19 12 L22 17 Z"/><line x1="1" y1="17" x2="23" y2="17"/><path d="M2 19.5 C3.5 17.5 6 18.5 7.5 19.5 C9 20.5 11 20.5 12.5 19.5 C14 18.5 16 18.5 17.5 19.5 C19 20.5 21 20.5 22 19.5" stroke-width="1.1"/><circle cx="17" cy="6" r="2.5"/><path d="M17 8.5 L17 11" stroke-width="1.4"/><path d="M14 10 L20 10" stroke-width="1.1"/></svg>
 <h3>Bad & Klippor</h3>
 <p>Hundratals badplatser på klippor och sandstränder. Hitta dolda badvikar och populära badstugor med GPS-koordinater direkt på kartan.</p>
 <div class="activity-tags"><span class="chip">Klippbad</span><span class="chip">Bastu</span><span class="chip">Sandstrand</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
 </a>
 <a href="/blogg/vandring-orno-uto" class="activity-card reveal reveal-delay-1" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>
 <h3>Vandring & Natur</h3>
 <p>Utö, Möja och Ornö har markerade vandringsleder genom urbergslandskap och gammal skog — korta dagturer och flerdagarsäventyr.</p>
 <div class="activity-tags"><span class="chip">Markerade leder</span><span class="chip">Naturreservat</span><span class="chip">Fågelskådning</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
 </a>
 <a href="/blogg/fiske-skargard-guide" class="activity-card reveal reveal-delay-2" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12 Q9 7.5 16 9.5 Q19.5 10.5 21 12 Q19.5 13.5 16 14.5 Q9 16.5 6 12 Z"/><path d="M6 12 L2.5 9 M6 12 L2.5 15"/><path d="M12 9.5 Q13.5 7 15 9" stroke-width="1.3"/><circle cx="18" cy="11.5" r="1"/><circle cx="18.2" cy="11.3" r="0.4" fill="currentColor" stroke="none"/><path d="M11 10.5 Q12.5 12 11 13.5" stroke-width="1" opacity="0.6"/><path d="M13.5 10 Q15 12 13.5 14" stroke-width="1" opacity="0.6"/></svg>
 <h3>Fiske</h3>
 <p>Abborre, gädda och havsöring väntar i skären. Sportfiske längs kusten och i stilla vikar som bara lokalkännedom kan visa.</p>
 <div class="activity-tags"><span class="chip">Havsfiske</span><span class="chip">Medfiske</span><span class="chip">Fritidsfiske</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
 </a>
 <a href="/blogg/cykling-moja-gallno" class="activity-card reveal reveal-delay-3" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
 <svg class="activity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M6 15 L9 6 L14 6 L18 15"/><path d="M9 6 L11 10 L6 15"/><circle cx="14" cy="6" r="1" fill="currentColor" stroke="none"/></svg>
 <h3>Cykling</h3>
 <p>Bilfria öar som Möja och Gällnö är perfekta för cykling. Hyr en cykel vid bryggan och utforska hela ön på ett par timmar.</p>
 <div class="activity-tags"><span class="chip">Bilfria öar</span><span class="chip">Uthyrning</span><span class="chip">Familjefärd</span></div>
 <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
 </a>
 </div>
 </div>
</section>

<section class="getting-there-section" id="ta-sig-dit">
 <div class="section-inner">
 <div class="section-header centered reveal">
 <div class="section-label">Ta sig dit</div>
 <h2 class="section-title">Hur du tar dig ut i skärgården</h2>
 <p class="section-sub">Från Stockholm finns flera avgångspunkter. Välj rätt beroende på destination och färdmedel.</p>
 </div>
 <div class="ferry-grid">
 <div class="ferry-card reveal reveal-delay-1">
 <div class="ferry-card-op">Waxholmsbolaget</div>
 <h4>Strömkajen, Stockholm</h4>
 <ul class="ferry-routes">
 <li class="ferry-route">Djurgården · Vaxholm · Grinda</li>
 <li class="ferry-route">Finnhamn · Möja · Blidö</li>
 <li class="ferry-route">Sandhamn · Gällnö · Nämdö</li>
 <li class="ferry-route">Utö · Nåttarö (via Dalarö)</li>
 </ul>
 <div style="margin-top:16px;font-size:11px;color:rgba(255,255,255,.4)">Tidtabeller: waxholmsbolaget.se</div>
 </div>
 <div class="ferry-card reveal reveal-delay-2">
 <div class="ferry-card-op">Pendelbåten</div>
 <h4>Stavsnäs Brygga</h4>
 <ul class="ferry-routes">
 <li class="ferry-route">Sandhamn (30 min)</li>
 <li class="ferry-route">Bullerö · Gällnö · Runmarö</li>
 <li class="ferry-route">Djurö · Ingarö</li>
 <li class="ferry-route">Buss 428 från Slussen</li>
 </ul>
 <div style="margin-top:16px;font-size:11px;color:rgba(255,255,255,.4)">pendelbaten.se</div>
 </div>
 <div class="ferry-card reveal reveal-delay-3">
 <div class="ferry-card-op">SL + Båt</div>
 <h4>Nynäshamn</h4>
 <ul class="ferry-routes">
 <li class="ferry-route">Utö (1h 45 min)</li>
 <li class="ferry-route">Landsort · Öja</li>
 <li class="ferry-route">Nåttarö · Ornö</li>
 <li class="ferry-route">Pendeltåg J43 från Stockholm</li>
 </ul>
 <div style="margin-top:16px;font-size:11px;color:rgba(255,255,255,.4)">sl.se · uto.se</div>
 </div>
 </div>
 <div style="text-align:center;margin-top:40px">
 <a href="/rutter" class="btn btn-accent">Se alla rutter →</a>
 </div>
 </div>
</section>

<section class="boende-section" id="boende">
 <div class="section-inner">
 <div class="section-header centered reveal">
 <div class="section-label">Boende</div>
 <h2 class="section-title">Övernatta i skärgården</h2>
 <p class="section-sub">Från lyxvärdshus med havsutsikt till enkla campingplatser och gästhamnar för den som sover ombord.</p>
 </div>
 <div class="boende-grid">
 <div class="boende-card reveal reveal-delay-1">
 <div class="boende-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="36" height="36"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg></div>
 <h4>Värdshus & Hotell</h4>
 <p>Klassiska skärgårdsvärdshus med mat och rum. Utö Värdshus, Sandhamns Värdshus och Grinda Wärdshus är legenderna.</p>
 </div>
 <div class="boende-card reveal reveal-delay-2">
 <div class="boende-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="36" height="36"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
 <h4>Stugor & Uthyrning</h4>
 <p>Hyr en stuga på en ö och lev som en lokalbo i en vecka. Finns på de flesta bebodda öar.</p>
 </div>
 <div class="boende-card reveal reveal-delay-3">
 <div class="boende-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="36" height="36"><path d="M3.5 21 12 5l8.5 16"/><path d="M8.5 21 12 14l3.5 7"/><line x1="2" y1="21" x2="22" y2="21"/></svg></div>
 <h4>Camping & Tält</h4>
 <p>Allemansrätten ger rätten att tälta i naturen. Kommunala campingplatser på bl.a. Utö och Arholma.</p>
 </div>
 <div class="boende-card reveal reveal-delay-4">
 <div class="boende-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="36" height="36"><circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 15a7 7 0 0 0 14 0"/><line x1="8" y1="11" x2="16" y2="11"/></svg></div>
 <h4>Gästhamnar</h4>
 <p>Hundratals gästhamnar i skärgården. Svalla visar var du kan angöra, tanka och äta längs vägen.</p>
 </div>
 </div>
 </div>
</section>

<div class="split-section">
 <div class="split-pane explorer reveal">
 <div class="section-label">För utforskaren</div>
 <h2 class="section-title">Din guide ute på vattnet</h2>
 <p class="section-sub">Grundfunktionerna är gratis — för alltid. Premium öppnar upp mer, precis som Strava.</p>
 <div class="split-features">
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div><div class="split-feature-text"><h5>Logga turen på 10 sek</h5><p>Foto + plats. Klart. Din dagbok byggs automatiskt.</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div><div class="split-feature-text"><h5>Hitta krogar & platser</h5><p>Bastun, bryggor och krogar längs din rutt</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><div class="split-feature-text"><h5>Community-feed</h5><p>Se andras turer. Bli inspirerad. Ge igen.</p></div></div>
 </div>
 <a href="/kom-igang" class="btn btn-teal btn-lg">Kom igång →</a>
 </div>
 <div class="split-pane owner reveal reveal-delay-2">
 <div class="section-label">För krogägaren</div>
 <h2 class="section-title">Sätt er krog på kartan</h2>
 <p class="section-sub">Nå gäster som redan är ute på vattnet. Gratis grundprofil, premium om ni vill synas mer.</p>
 <div class="split-features">
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div class="split-feature-text"><h5>GPS-profil på kartan</h5><p>Syns för alla som paddlar eller seglar förbi</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div><div class="split-feature-text"><h5>Statistik & insikter</h5><p>Se hur gäster hittar er och varifrån de kommer</p></div></div>
 <div class="split-feature"><div class="split-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg></div><div class="split-feature-text"><h5>Early Bird — 6 månader gratis</h5><p>De första 20 krogarna får Premium gratis</p></div></div>
 </div>
 <a href="/registrera-krog" class="btn btn-accent btn-lg">Registrera er krog →</a>
 </div>
</div>

<section class="stats-section">
 <div class="section-inner">
 <div class="stats-grid">
 <div class="stat-box reveal"><span class="stat-num" data-stat="places">200+</span><div class="stat-label">Platser &amp; krogar</div><div class="stat-sub">Kartlagda i Stockholms skärgård + Bohuslän</div></div>
 <div class="stat-box reveal reveal-delay-1"><span class="stat-num" data-stat="islands">84</span><div class="stat-label">Öar med guider</div><div class="stat-sub">Kartor, krogar och upplevelser per ö</div></div>
 <div class="stat-box reveal reveal-delay-2"><img src="/thorkel-avatar.svg" alt="Thorkel" style="width:72px;height:72px;border-radius:50%;display:block;margin:0 auto 10px;box-shadow:0 0 0 3px rgba(244,176,106,0.4),0 4px 16px rgba(0,0,0,0.25);" /><div class="stat-label">Ruttplaneraren Thorkel</div><div class="stat-sub">Berätta vad du vill — AI:n fixar stoppen</div></div>
 <div class="stat-box reveal reveal-delay-3"><span class="stat-num">0 kr</span><div class="stat-label">Att komma igång</div><div class="stat-sub">Grundfunktioner gratis för alltid</div></div>
 </div>
 </div>
</section>


<section class="testimonial-section">
 <div class="section-inner">
 <div class="section-header centered reveal">
 <div class="section-label">Vad folk säger</div>
 <h2 class="section-title">Skärgårdsälskare gillar Svalla</h2>
 </div>
 <div class="testimonials">
 <div class="testimonial reveal reveal-delay-1">
 <div class="testimonial-stars">★★★★★</div>
 <p class="testimonial-text">Planerade hela sommarens segling med Thorkel på 10 minuter. Fick förslag på krogar och bastun längs hela rutten — inga överraskningar när man väl är ute.</p>
 <div class="testimonial-footer">
 <div class="testimonial-avatar" style="background:var(--teal)">MK</div>
 <div><div class="testimonial-name">Marcus K.</div><div class="testimonial-role">Seglare · Segelbåt 36 fot · Nacka</div></div>
 </div>
 </div>
 <div class="testimonial reveal reveal-delay-2">
 <div class="testimonial-stars">★★★★★</div>
 <p class="testimonial-text">Äntligen en app som förstår att vi är ute på vattnet, inte på stan. Feeden är full av äkta turer och hitta nya ställen har blivit en del av varje tur.</p>
 <div class="testimonial-footer">
 <div class="testimonial-avatar" style="background:var(--accent)">SL</div>
 <div><div class="testimonial-name">Sofia L.</div><div class="testimonial-role">Kajakpaddlare · Värmdö</div></div>
 </div>
 </div>
 <div class="testimonial reveal reveal-delay-3">
 <div class="testimonial-stars">★★★★★</div>
 <p class="testimonial-text">Vi registrerade bastun på Svalla i somras — fler och fler båtfolk hittar hit direkt via appen. Bättre marknadsföring än vi kunde köpa oss till.</p>
 <div class="testimonial-footer">
 <div class="testimonial-avatar" style="background:var(--green)">AH</div>
 <div><div class="testimonial-name">Anders H.</div><div class="testimonial-role">Ägare, Gräddö Sjösauna · Norrtälje</div></div>
 </div>
 </div>
 </div>
 </div>
</section>

<section class="app-section" id="om">
 <div class="app-inner">
 <div class="section-label" style="text-align:center">Webbapp · Fungerar som en app</div>
 <h2 class="section-title reveal">Svalla i fickan</h2>
 <p class="section-sub reveal">Inga nedladdningar. Öppna svalla.se i din mobil och tryck "Lägg till på hemskärmen". Fungerar offline, har push-notiser och känns som en native app.</p>
 <div class="app-badges reveal">
 <a href="/feed" class="app-badge" style="background:var(--accent)">
 <span class="app-badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/></svg></span>
 <div class="app-badge-text"><span class="small">Prova direkt i webbläsaren</span><span class="big">Öppna Svalla</span></div>
 </a>
 <a href="/kom-igang" class="app-badge">
 <span class="app-badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
 <div class="app-badge-text"><span class="small">Skapa konto gratis</span><span class="big">Kom igång</span></div>
 </a>
 </div>
 <p style="font-size:12px;color:var(--muted);margin-top:16px">iOS: Safari → Dela → Lägg till på hemskärmen &nbsp;·&nbsp; Android: Chrome → ⋮ → Installera app</p>
 </div>
</section>

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
 <li><a href="/platser">Platser & krogar</a></li>
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
 <li><a href="/blekinge-skargard">Blekinges skärgård</a></li>
 <li><a href="/vasterhav">Västerhavet</a></li>
 <li><a href="/malaren">Mälaren</a></li>
 <li><a href="/goteborg-skargard">Göteborgs skärgård</a></li>
 </ul>
 </div>
 </div>
 <div class="footer-bottom">
 <span>© 2026 Svalla — Alla rättigheter förbehållna</span>
 <div class="footer-flags"><svg viewBox="0 0 20 14" width="22" height="15" xmlns="http://www.w3.org/2000/svg" style="border-radius:2px"><rect width="20" height="14" fill="#006AA7"/><rect x="6" width="2" height="14" fill="#FECC02"/><rect y="6" width="20" height="2" fill="#FECC02"/></svg></div>
 <div class="footer-social">
 <a href="#" title="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
 <a href="#" title="TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></a>
 <a href="#" title="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></a>
 </div>
 </div>
 </div>
</footer>

`

export default function LandingPage() {
 useEffect(() => {
 // Om redan inloggad → skicka direkt till feed
 const supabase = createClient()
 supabase.auth.getSession().then(({ data: { session } }) => {
 if (session) window.location.replace('/feed')
 })


 // Nav-styling sköts via CSS — inga inline-overrides

 // Nav scroll-effekt
 const nav = document.getElementById('mainNav')
 const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 60)
 window.addEventListener('scroll', handleScroll)

 // Tabbaserad megameny — tab-switching
 document.querySelectorAll('.nav-tab-btn').forEach(btn => {
 btn.addEventListener('click', (e) => {
 e.stopPropagation()
 const tab = (btn as HTMLElement).getAttribute('data-tab')
 document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'))
 document.querySelectorAll('.nav-tab-content').forEach(c => c.classList.remove('active'))
 btn.classList.add('active')
 if (tab) document.getElementById('nav-tab-' + tab)?.classList.add('active')
 })
 })

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

 // Accordion i mobil drawer
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

 // Sök-fokus
 const searchInput = document.querySelector('.hero-search input') as HTMLInputElement
 const onFocus = () => { const el = searchInput?.closest('.hero-search') as HTMLElement; if (el) el.style.boxShadow = '0 8px 50px rgba(232,146,74,.35)' }
 const onBlur = () => { const el = searchInput?.closest('.hero-search') as HTMLElement; if (el) el.style.boxShadow = '0 8px 40px rgba(0,0,0,.3)' }
 searchInput?.addEventListener('focus', onFocus)
 searchInput?.addEventListener('blur', onBlur)

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
 observer.disconnect()
 searchInput?.removeEventListener('focus', onFocus)
 searchInput?.removeEventListener('blur', onBlur)
 hamburger?.removeEventListener('click', openMobDrawer)
 mobOverlay?.removeEventListener('click', closeMobDrawer)
 mobClose?.removeEventListener('click', closeMobDrawer)
 document.body.style.overflow = ''
 }
 }, [])

 return (
 <div style={{ position: 'relative' }}>
 {/* Animated skärgård scene — fills exactly the hero viewport, behind all content */}
 <div style={{
 position: 'absolute', top: 0, left: 0, right: 0,
 /* Exakt 100vh — canvas matchar viewport, vattenlinje vid 58% = 42% hav synligt */
 height: '100vh',
 zIndex: 0,
 overflow: 'hidden',
 pointerEvents: 'none',
 background: 'linear-gradient(to bottom, #0a1f2b 0%, #0d2440 100%)',
 } as React.CSSProperties}>
 <HeroAnimation />
 </div>
 <style>{`
 /* Hero section — transparent shows canvas through, no dark bg that would cover animation */
 .hero { position: relative; z-index: 1; background: transparent !important; }
 `}</style>
 <div style={{ position: 'relative', zIndex: 1 }} dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
 </div>
 )
}
