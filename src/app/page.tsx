'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  --sea:var(--txt); --sea-dark:#0d2440; --sea-mid:#234e78;
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
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{color:rgba(255,255,255,.75);text-decoration:none;font-size:14px;font-weight:500;transition:.2s}
.nav-links a:hover{color:var(--white)}
.nav-dropdown{position:relative}
.nav-dropdown > a{display:flex;align-items:center;gap:5px}
.nav-dropdown > a::after{content:'▾';font-size:10px;opacity:.6;transition:.2s}
.nav-dropdown:hover > a::after{opacity:1}
.nav-mega{position:absolute;top:100%;padding-top:12px;left:50%;transform:translateX(-50%);min-width:720px;opacity:0;pointer-events:none;transition:opacity .18s,transform .18s;transform:translateX(-50%) translateY(-4px)}
.nav-mega-inner{background:rgba(10,28,40,.97);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:20px 24px;box-shadow:0 20px 60px rgba(0,0,0,.4)}
.nav-dropdown:hover .nav-mega{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}
.nav-mega-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:0}
.nav-mega-col{padding:8px 12px}
.nav-mega-col:not(:last-child){border-right:1px solid rgba(255,255,255,.07)}
.nav-mega-region{font-size:9px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.nav-mega-region+.nav-mega-region{margin-top:12px}
.nav-mega-link{display:block;color:rgba(255,255,255,.75);text-decoration:none;font-size:12px;padding:4px 0;transition:.15s;border-bottom:1px solid rgba(255,255,255,.04)}
.nav-mega-link:last-child{border-bottom:none}
.nav-mega-link:hover{color:#fff;padding-left:4px}
.nav-mega-all{display:inline-block;margin-top:8px;font-size:11px;font-weight:700;color:var(--accent);text-decoration:none;opacity:.75}
.nav-mega-all:hover{opacity:1}
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
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;overflow:hidden;padding-top:clamp(72px,calc(50vh - 190px),380px);}
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
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(42px,7vw,82px);font-weight:900;line-height:1.06;color:var(--white);margin-bottom:24px;letter-spacing:-.02em;}
.hero-title em{font-style:italic;background:linear-gradient(135deg,var(--accent),#f4b06a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.hero-sub{font-size:clamp(16px,2.2vw,20px);font-weight:300;color:rgba(255,255,255,.72);max-width:600px;margin:0 auto 54px;line-height:1.65;}
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
.section-title{font-family:'Playfair Display',serif;font-size:clamp(30px,4vw,48px);font-weight:800;line-height:1.12;color:var(--sea);margin-bottom:16px;letter-spacing:-.02em;}
.section-sub{font-size:17px;font-weight:300;color:var(--muted);line-height:1.65;max-width:560px;}
.section-header{margin-bottom:56px}
.section-header.centered{text-align:center}
.section-header.centered .section-sub{margin:0 auto}
.concept-section{background:var(--white)}
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:8px}
.pillar{padding:52px 40px;background:var(--sand-light);transition:.3s;cursor:default;}
.pillar:hover{background:var(--white);transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.pillar:first-child{border-radius:var(--r) 0 0 var(--r)}
.pillar:last-child{border-radius:0 var(--r) var(--r) 0}
.pillar-icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:24px;}
.pillar-icon.sea{background:rgba(26,74,94,.08)}
.pillar-icon.teal{background:rgba(45,125,138,.1)}
.pillar-icon.accent{background:rgba(232,146,74,.1)}
.pillar h3{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--sea);margin-bottom:12px}
.pillar p{font-size:14.5px;color:var(--muted);line-height:1.65}
.featured-section{background:var(--sand-light)}
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
.how-section{background:var(--sea);color:var(--white);position:relative;overflow:hidden}
.how-section::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 20 30 30 Q45 40 60 30' stroke='%232d7d8a' stroke-width='0.8' fill='none' opacity='0.2'/%3E%3C/svg%3E") repeat;}
.how-section .section-title{color:var(--white)}
.how-section .section-sub{color:rgba(255,255,255,.65)}
.how-section .section-label{color:var(--accent)}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;position:relative;z-index:1}
.step{padding:40px 28px;text-align:center}
.step-num{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--accent);margin:0 auto 20px;}
.step h4{font-size:16px;font-weight:600;color:var(--white);margin-bottom:10px}
.step p{font-size:13.5px;color:rgba(255,255,255,.6);line-height:1.6}
.routes-section{background:var(--white)}
.routes-scroll{display:flex;gap:20px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none;}
.routes-scroll::-webkit-scrollbar{display:none}
.route-card{flex-shrink:0;width:280px;border-radius:var(--r);overflow:hidden;background:var(--sand-light);box-shadow:var(--shadow);transition:.3s;cursor:pointer;}
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
.split-pane.owner{background:var(--sea);color:var(--white)}
.split-pane.owner .section-title{color:var(--white)}
.split-pane.owner .section-sub{color:rgba(255,255,255,.65)}
.split-pane.owner .section-label{color:var(--accent)}
.split-features{display:flex;flex-direction:column;gap:16px;margin:28px 0 36px}
.split-feature{display:flex;align-items:flex-start;gap:12px}
.split-feature-icon{width:36px;height:36px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:16px;}
.split-pane.explorer .split-feature-icon{background:rgba(45,125,138,.1)}
.split-pane.owner .split-feature-icon{background:rgba(255,255,255,.1)}
.split-feature-text h5{font-size:14px;font-weight:600;margin-bottom:3px}
.split-feature-text p{font-size:13px;color:var(--muted);line-height:1.5}
.split-pane.owner .split-feature-text h5{color:var(--white)}
.split-pane.owner .split-feature-text p{color:rgba(255,255,255,.55)}
.stats-section{background:linear-gradient(135deg,var(--sea-dark),var(--sea))}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.08)}
.stat-box{padding:52px 32px;text-align:center;background:transparent;}
.stat-num{font-family:'Playfair Display',serif;font-size:clamp(36px,4vw,54px);font-weight:800;background:linear-gradient(135deg,var(--accent),#f4b06a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;margin-bottom:8px;}
.stat-label{font-size:14px;color:rgba(255,255,255,.6);line-height:1.5}
.stat-sub{font-size:11px;color:rgba(255,255,255,.35);margin-top:4px}
.testimonial-section{background:var(--sand-light)}
.testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.testimonial{background:var(--white);border-radius:var(--r);padding:32px 28px;box-shadow:var(--shadow);position:relative;}
.testimonial::before{content:'"';font-family:'Playfair Display',serif;font-size:72px;color:rgba(45,125,138,.1);position:absolute;top:12px;left:20px;line-height:1;}
.testimonial-text{font-size:15px;color:var(--ink);line-height:1.7;margin-bottom:20px;position:relative}
.testimonial-footer{display:flex;align-items:center;gap:12px}
.testimonial-avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:var(--white);flex-shrink:0;}
.testimonial-name{font-size:14px;font-weight:700;color:var(--ink)}
.testimonial-role{font-size:12px;color:var(--muted)}
.testimonial-stars{color:#f5a623;font-size:13px;margin-bottom:4px}
.nordic-section{background:var(--sea-dark);padding:80px 40px}
.nordic-grid{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:260px 260px;gap:4px;border-radius:var(--r);overflow:hidden;max-width:1160px;margin:48px auto 0;}
.nordic-cell{position:relative;overflow:hidden;cursor:pointer;}
.nordic-cell-bg{position:absolute;inset:0;transition:.5s;}
.nordic-cell:hover .nordic-cell-bg{transform:scale(1.05)}
.nordic-cell-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,25,35,.75),transparent);display:flex;flex-direction:column;justify-content:flex-end;padding:24px;}
.nordic-cell:first-child{grid-row:1/3}
.nordic-cell-label{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:4px;}
.nordic-cell-sub{font-size:12px;color:rgba(255,255,255,.65)}
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
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:56px}
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
.destinations-section{background:var(--white)}
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
.activities-section{background:var(--sand-light)}
.activities-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.activity-card{background:var(--white);border-radius:var(--r);padding:32px 28px;box-shadow:var(--shadow);transition:.3s}
.activity-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.activity-icon{font-size:38px;margin-bottom:16px}
.activity-card h3{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--sea);margin-bottom:10px}
.activity-card p{font-size:13.5px;color:var(--muted);line-height:1.65}
.activity-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:14px}
/* ── Getting there ── */
.getting-there-section{background:var(--sea);color:var(--white)}
.getting-there-section .section-title{color:var(--white)}
.getting-there-section .section-label{color:var(--accent)}
.getting-there-section .section-sub{color:rgba(255,255,255,.6)}
.ferry-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.ferry-card{background:rgba(255,255,255,.07);border-radius:var(--r);padding:28px 24px;border:1px solid rgba(255,255,255,.1)}
.ferry-card h4{font-size:17px;font-weight:700;color:#fff;margin-bottom:6px}
.ferry-card-op{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:14px}
.ferry-routes{list-style:none;display:flex;flex-direction:column;gap:9px}
.ferry-route{font-size:13px;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:8px}
.ferry-route::before{content:'⛴';font-size:13px;flex-shrink:0}
/* ── Accommodation ── */
.boende-section{background:var(--sand)}
.boende-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.boende-card{background:var(--white);border-radius:var(--r);padding:28px 24px;box-shadow:var(--shadow);text-align:center;transition:.3s}
.boende-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.boende-icon{font-size:34px;margin-bottom:12px}
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
  .nordic-grid{grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,200px)}
  .nordic-cell:first-child{grid-row:auto}
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
    <li><a href="/platser">Utforska</a></li>
    <li><a href="/rutter">Rutter</a></li>
    <li><a href="/#aktiviteter">Se & Göra</a></li>
    <li class="nav-dropdown">
      <a href="/#resmål">Resmål</a>
      <div class="nav-mega">
        <div class="nav-mega-inner">
          <div class="nav-mega-grid">

            <!-- Kolumn 1: Innerskärgården + Mellersta del 1 -->
            <div class="nav-mega-col">
              <div class="nav-mega-region">Innerskärgården</div>
              <a href="/o/fjaderholmarna" class="nav-mega-link">Fjäderholmarna</a>
              <a href="/o/vaxholm" class="nav-mega-link">Vaxholm</a>
              <a href="/o/grinda" class="nav-mega-link">Grinda</a>
              <a href="/o/finnhamn" class="nav-mega-link">Finnhamn</a>
              <a href="/o/rindo" class="nav-mega-link">Rindö</a>
              <div class="nav-mega-region">Mellersta skärgården</div>
              <a href="/o/sandhamn" class="nav-mega-link">Sandhamn</a>
              <a href="/o/moja" class="nav-mega-link">Möja</a>
              <a href="/o/ljustero" class="nav-mega-link">Ljusterö</a>
              <a href="/o/gallno" class="nav-mega-link">Gällnö</a>
              <a href="/o/ingmarso" class="nav-mega-link">Ingmarsö</a>
              <a href="/o/namdo" class="nav-mega-link">Nämdö</a>
              <a href="/o/svartso" class="nav-mega-link">Svartsö</a>
            </div>

            <!-- Kolumn 2: Mellersta del 2 + Mälaren -->
            <div class="nav-mega-col">
              <div class="nav-mega-region">Mellersta (forts.)</div>
              <a href="/o/runmaro" class="nav-mega-link">Runmarö</a>
              <a href="/o/resaro" class="nav-mega-link">Resarö</a>
              <a href="/o/husaro" class="nav-mega-link">Husarö</a>
              <a href="/o/vindo" class="nav-mega-link">Vindö</a>
              <a href="/o/ingaro" class="nav-mega-link">Ingarö</a>
              <a href="/o/kanholmen" class="nav-mega-link">Kanholmen</a>
              <a href="/o/kymmendo" class="nav-mega-link">Kymmendö</a>
              <a href="/o/bullero" class="nav-mega-link">Bullerö</a>
              <a href="/o/svenska-hogarna" class="nav-mega-link">Svenska Högarna</a>
              <a href="/o/huvudskar" class="nav-mega-link">Huvudskär</a>
              <div class="nav-mega-region">Mälaren</div>
              <a href="/o/bjorko" class="nav-mega-link">Björkö / Birka</a>
              <a href="/o/adelsjo" class="nav-mega-link">Adelsö</a>
            </div>

            <!-- Kolumn 3: Södra skärgården -->
            <div class="nav-mega-col">
              <div class="nav-mega-region">Södra skärgården</div>
              <a href="/o/uto" class="nav-mega-link">Utö</a>
              <a href="/o/nattaro" class="nav-mega-link">Nåttarö</a>
              <a href="/o/orno" class="nav-mega-link">Ornö</a>
              <a href="/o/dalaro" class="nav-mega-link">Dalarö</a>
              <a href="/o/landsort" class="nav-mega-link">Landsort</a>
              <a href="/o/fjardlang" class="nav-mega-link">Fjärdlång</a>
              <a href="/o/toro" class="nav-mega-link">Torö</a>
              <a href="/o/galo" class="nav-mega-link">Gålö</a>
              <a href="/o/asko" class="nav-mega-link">Askö</a>
              <a href="/o/smaadalaro" class="nav-mega-link">Smådalarö</a>
              <a href="/o/morko" class="nav-mega-link">Mörkö</a>
              <a href="/o/musko" class="nav-mega-link">Muskö</a>
            </div>

            <!-- Kolumn 4: Norra skärgården -->
            <div class="nav-mega-col">
              <div class="nav-mega-region">Norra skärgården</div>
              <a href="/o/furusund" class="nav-mega-link">Furusund</a>
              <a href="/o/blido" class="nav-mega-link">Blidö</a>
              <a href="/o/arholma" class="nav-mega-link">Arholma</a>
              <a href="/o/fejan" class="nav-mega-link">Fejan</a>
              <a href="/o/rodloga" class="nav-mega-link">Rödlöga</a>
              <a href="/o/singo" class="nav-mega-link">Singö</a>
              <a href="/o/lido" class="nav-mega-link">Lidö</a>
              <a href="/o/graddo" class="nav-mega-link">Gräddö</a>
              <a href="/o/vaddo" class="nav-mega-link">Väddö</a>
              <a href="/o/yxlan" class="nav-mega-link">Yxlan</a>
              <a href="/o/ljustero" class="nav-mega-link">Ljusterö</a>
              <a href="/rutter?vy=oar" class="nav-mega-all">Visa alla 69 öar →</a>
            </div>

          </div>
        </div>
      </div>
    </li>
  </ul>
  <div class="nav-cta">
    <a href="/logga-in" class="btn btn-ghost">Logga in</a>
    <a href="/kom-igang" class="btn btn-accent">Kom igång →</a>
  </div>
</nav>

<section class="hero" style="background:transparent">
  <div class="hero-content">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Nu lanserar vi i Stockholms skärgård
    </div>
    <h1 class="hero-title">
      Hitta din nästa<br>
      <em>skärgårdskrog</em>
    </h1>
    <p class="hero-sub">
      Logga dina turer. Hitta krogar, bastun och bryggor. Dela med ett community av skärgårdsmänniskor.
      Back to nature — enkelt, nordiskt, äkta.
    </p>
    <form class="hero-search" onsubmit="event.preventDefault();location.href='/kom-igang'">
      <input type="text" placeholder="🔍  Sök ö, krog eller hamn..." id="heroSearchInput"/>
      <button type="submit">Utforska</button>
    </form>
    <div class="hero-search-hint">
      Populärt just nu:
      <span onclick="location.href='/kom-igang'">Sandhamn</span>
      <span onclick="location.href='/kom-igang'">Grinda</span>
      <span onclick="location.href='/kom-igang'">Utö</span>
      <span onclick="location.href='/kom-igang'">Finnhamn</span>
    </div>
    <div class="hero-scroll">
      <div class="hero-scroll-line"></div>
      Scrolla
    </div>
  </div>
</section>


<section class="concept-section" id="utforska">
  <div class="section-inner">
    <div class="section-header centered reveal">
      <div class="section-label">Vad är Svalla</div>
      <h2 class="section-title">Skärgårdslivet — samlat på ett ställe</h2>
      <p class="section-sub">Ingen app förstår hur skärgårdslivet faktiskt fungerar. Det gör vi nu. Byggt av skärgårdsmänniskor, för skärgårdsmänniskor.</p>
    </div>
    <div class="pillars">
      <div class="pillar reveal reveal-delay-1">
        <div class="pillar-icon sea">🧭</div>
        <h3>Utforska platser</h3>
        <p>Krogar, bastun, bryggor och dolda pärlor — listade och recenserade av ett community som faktiskt är ute på vattnet. Hitta rätt ställe inför nästa tur.</p>
      </div>
      <div class="pillar reveal reveal-delay-2">
        <div class="pillar-icon teal">📸</div>
        <h3>Logga din tur</h3>
        <p>Foto + plats på 10 sekunder. Din personliga skärgårdsdagbok växer med varje äventyr — se var du varit, och inspirera andra att ge sig ut.</p>
      </div>
      <div class="pillar reveal reveal-delay-3">
        <div class="pillar-icon accent">🌊</div>
        <h3>Community first</h3>
        <p>Feeden fylls av äkta turer från riktiga paddlare och seglare. Inget filter, ingen algoritm — bara skärgårdsliv som det ser ut på riktigt.</p>
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
      <div class="dest-card reveal reveal-delay-1" onclick="location.href='/kom-igang'" style="cursor:pointer">
        <div class="dest-card-bg" style="background:linear-gradient(160deg,#0f2e3b,#1a4a5e,#24697f)">
          <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="120" cy="200" rx="90" ry="45" fill="#0d2030" opacity="0.7"/><ellipse cx="220" cy="240" rx="70" ry="35" fill="#0a1f2b" opacity="0.8"/>
            <path d="M0,280 Q75,265 150,275 Q225,285 300,268 L300,320 L0,320 Z" fill="#071520" opacity="0.9"/>
          </svg>
        </div>
        <div class="dest-card-overlay"></div>
        <div class="dest-card-content">
          <div class="dest-card-region">Innerskärgården</div>
          <div class="dest-card-name">Fjäderholmarna · Vaxholm · Grinda</div>
          <div class="dest-card-islands"><a href="/o/fjaderholmarna" class="dest-island">Fjäderholmarna</a><a href="/o/vaxholm" class="dest-island">Vaxholm</a><a href="/o/grinda" class="dest-island">Grinda</a><a href="/o/finnhamn" class="dest-island">Finnhamn</a><span class="dest-island">Resarö</span></div>
        </div>
      </div>
      <div class="dest-card reveal reveal-delay-2" onclick="location.href='/kom-igang'" style="cursor:pointer">
        <div class="dest-card-bg" style="background:linear-gradient(160deg,#0f3020,#1a5030,#2a7040)">
          <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="210" rx="75" ry="38" fill="#0a1f10" opacity="0.7"/><ellipse cx="210" cy="235" rx="85" ry="42" fill="#081510" opacity="0.8"/>
            <path d="M0,282 Q100,262 200,272 Q260,278 300,265 L300,320 L0,320 Z" fill="#061010" opacity="0.9"/>
          </svg>
        </div>
        <div class="dest-card-overlay"></div>
        <div class="dest-card-content">
          <div class="dest-card-region">Mellersta skärgården</div>
          <div class="dest-card-name">Sandhamn · Möja · Ljusterö</div>
          <div class="dest-card-islands"><a href="/o/sandhamn" class="dest-island">Sandhamn</a><a href="/o/moja" class="dest-island">Möja</a><a href="/o/ljustero" class="dest-island">Ljusterö</a><a href="/o/gallno" class="dest-island">Gällnö</a><span class="dest-island">Runmarö</span></div>
        </div>
      </div>
      <div class="dest-card reveal reveal-delay-3" onclick="location.href='/kom-igang'" style="cursor:pointer">
        <div class="dest-card-bg" style="background:linear-gradient(160deg,#1a2a3a,#1e4060,#2a5875)">
          <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="220" rx="100" ry="50" fill="#0d2030" opacity="0.7"/><ellipse cx="80" cy="255" rx="60" ry="28" fill="#0a1820" opacity="0.8"/>
            <path d="M0,285 Q80,270 160,278 Q230,285 300,270 L300,320 L0,320 Z" fill="#06141a" opacity="0.9"/>
          </svg>
        </div>
        <div class="dest-card-overlay"></div>
        <div class="dest-card-content">
          <div class="dest-card-region">Södra skärgården</div>
          <div class="dest-card-name">Utö · Nåttarö · Landsort</div>
          <div class="dest-card-islands"><a href="/o/uto" class="dest-island">Utö</a><a href="/o/nattaro" class="dest-island">Nåttarö</a><a href="/o/orno" class="dest-island">Ornö</a><a href="/o/dalaro" class="dest-island">Dalarö</a><a href="/o/landsort" class="dest-island">Landsort</a></div>
        </div>
      </div>
      <div class="dest-card reveal reveal-delay-4" onclick="location.href='/kom-igang'" style="cursor:pointer">
        <div class="dest-card-bg" style="background:linear-gradient(160deg,#2a1a3a,#3a2555,#4a356a)">
          <svg width="100%" height="100%" viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="140" cy="215" rx="95" ry="48" fill="#1a0d2a" opacity="0.7"/><ellipse cx="240" cy="250" rx="65" ry="32" fill="#120a20" opacity="0.8"/>
            <path d="M0,282 Q90,265 180,275 Q245,282 300,268 L300,320 L0,320 Z" fill="#0a0615" opacity="0.9"/>
          </svg>
        </div>
        <div class="dest-card-overlay"></div>
        <div class="dest-card-content">
          <div class="dest-card-region">Norra skärgården</div>
          <div class="dest-card-name">Furusund · Blidö · Norrtälje</div>
          <div class="dest-card-islands"><a href="/o/furusund" class="dest-island">Furusund</a><a href="/o/blido" class="dest-island">Blidö</a><a href="/o/arholma" class="dest-island">Arholma</a><span class="dest-island">Gräddö</span><span class="dest-island">Norrtälje</span></div>
        </div>
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
        <p>Bläddra bland andras turer, platser och bilder. Hitta inspiration för din nästa tur — krogar, bastun, dolda bryggor.</p>
      </div>
      <div class="step reveal reveal-delay-2">
        <div class="step-num">2</div>
        <h4>Ge dig ut</h4>
        <p>Kajak, segelbåt, motorbåt eller till fots. Platser längs din rutt väntar — med äkta recensioner från folk som redan paddlat dit.</p>
      </div>
      <div class="step reveal reveal-delay-3">
        <div class="step-num">3</div>
        <h4>Logga på 10 sekunder</h4>
        <p>Tryck "+", välj ett foto, skriv platsen. Klart. Din tur lever för alltid i din loggbok och i communityt.</p>
      </div>
      <div class="step reveal reveal-delay-4">
        <div class="step-num">4</div>
        <h4>Bygg din historia</h4>
        <p>Profilen växer med varje äventyr. Se var du varit, när — och inspirera nästa seglare att kasta loss.</p>
      </div>
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
        <div class="route-img" style="background:linear-gradient(135deg,#1a4a5e,#24697f)">🛶<div class="route-tag">2 dagar</div></div>
        <div class="route-body"><h4>Stockholms innerskärgård</h4><p>Klassisk paddlingsrutt via Vaxholm, Grinda och Finnhamn. 5 krogar längs vägen.</p><div class="route-meta"><span>⛵ 48 km</span><span>🍽 5 krogar</span><span>⭐ 4.8</span></div></div>
      </div>
      <div class="route-card" onclick="location.href='/rutter'">
        <div class="route-img" style="background:linear-gradient(135deg,#2d4a2e,#3a6040)">⛵<div class="route-tag">3 dagar</div></div>
        <div class="route-body"><h4>Yttre skärgården & Sandhamn</h4><p>Seglarturen längs leden till Sandhamn. Ikoniska stopp på vägen.</p><div class="route-meta"><span>⛵ 72 km</span><span>🍽 7 krogar</span><span>⭐ 4.9</span></div></div>
      </div>
      <div class="route-card" onclick="location.href='/rutter'">
        <div class="route-img" style="background:linear-gradient(135deg,#3a1a1a,#6a2a2e)">🏃<div class="route-tag">1 dag</div></div>
        <div class="route-body"><h4>Utö – vandring & mat</h4><p>Dag-tur till Utö med vandring och lunch på värdshuset. Perfekt för nybörjare.</p><div class="route-meta"><span>🚶 8 km</span><span>🍽 2 krogar</span><span>⭐ 4.9</span></div></div>
      </div>
      <div class="route-card" onclick="location.href='/rutter'">
        <div class="route-img" style="background:linear-gradient(135deg,#1a3a4a,#2a5a6a)">🎣<div class="route-tag">Halvdag</div></div>
        <div class="route-body"><h4>Norrskärgårdens pärlor</h4><p>Arholma, Möja och Blidö — den orörda norrskärgården.</p><div class="route-meta"><span>⛵ 55 km</span><span>🍽 4 krogar</span><span>⭐ 4.7</span></div></div>
      </div>
      <div class="route-card" onclick="location.href='/rutter'">
        <div class="route-img" style="background:linear-gradient(135deg,#2a3a1a,#4a5a2a)">🌅<div class="route-tag">Weekend</div></div>
        <div class="route-body"><h4>Sydskärgårdens matkul</h4><p>En mat-fokuserad tur via Landsort och Nynäshamns yttre skärgård.</p><div class="route-meta"><span>⛵ 60 km</span><span>🍽 6 krogar</span><span>⭐ 4.8</span></div></div>
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
      <a href="/blogg/kajak-stockholms-skargard-nybörjare" class="activity-card reveal reveal-delay-1" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
        <div class="activity-icon">🛶</div>
        <h3>Kajak & Paddling</h3>
        <p>Stockholms skärgård är ett av världens bästa paddlingslandskap. Paddla ut till öar utan fast förbindelse och hitta platser som ingen annan ser.</p>
        <div class="activity-tags"><span class="chip">Nybörjarvänligt</span><span class="chip">Uthyrning</span><span class="chip">Guideturer</span></div>
        <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
      </a>
      <a href="/blogg/segling-nybörjare-guide" class="activity-card reveal reveal-delay-2" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
        <div class="activity-icon">⛵</div>
        <h3>Segling & Båtliv</h3>
        <p>Segla längs klassiska leder mot Sandhamn eller ankra i stilla naturhamnar. Svalla visar gästhamnar, bränsle och övernattningsplatser längs vägen.</p>
        <div class="activity-tags"><span class="chip">Gästhamnar</span><span class="chip">Bränsle</span><span class="chip">Sjökortet</span></div>
        <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
      </a>
      <a href="/blogg/basta-badplatserna" class="activity-card reveal reveal-delay-3" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
        <div class="activity-icon">🏊</div>
        <h3>Bad & Klippor</h3>
        <p>Hundratals badplatser på klippor och sandstränder. Hitta dolda badvikar och populära badstugor med GPS-koordinater direkt på kartan.</p>
        <div class="activity-tags"><span class="chip">Klippbad</span><span class="chip">Bastu</span><span class="chip">Sandstrand</span></div>
        <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
      </a>
      <a href="/blogg/vandring-orno-uto" class="activity-card reveal reveal-delay-1" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
        <div class="activity-icon">🥾</div>
        <h3>Vandring & Natur</h3>
        <p>Utö, Möja och Ornö har markerade vandringsleder genom urbergslandskap och gammal skog — korta dagturer och flerdagarsäventyr.</p>
        <div class="activity-tags"><span class="chip">Markerade leder</span><span class="chip">Naturreservat</span><span class="chip">Fågelskådning</span></div>
        <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
      </a>
      <a href="/blogg/fiske-skargard-guide" class="activity-card reveal reveal-delay-2" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
        <div class="activity-icon">🎣</div>
        <h3>Fiske</h3>
        <p>Abborre, gädda och havsöring väntar i skären. Sportfiske längs kusten och i stilla vikar som bara lokalkännedom kan visa.</p>
        <div class="activity-tags"><span class="chip">Havsfiske</span><span class="chip">Medfiske</span><span class="chip">Fritidsfiske</span></div>
        <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
      </a>
      <a href="/blogg/cykling-moja-gallno" class="activity-card reveal reveal-delay-3" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">
        <div class="activity-icon">🚴</div>
        <h3>Cykling</h3>
        <p>Bilfria öar som Möja och Gällnö är perfekta för cykling. Hyr en cykel vid bryggan och utforska hela ön på ett par timmar.</p>
        <div class="activity-tags"><span class="chip">Bilfria öar</span><span class="chip">Uthyrning</span><span class="chip">Familjefärd</span></div>
        <div style="margin-top:14px;font-size:13px;color:#1e5c82;font-weight:700;">Läs guide →</div>
      </a>
    </div>
  </div>
</section>

<section class="nordic-section" style="display:none">
  <div class="section-inner">
    <div class="nordic-grid">
      <div class="nordic-cell reveal">
        <div class="nordic-cell-bg" style="background:linear-gradient(160deg,#0f2e3b,#1a4a5e,#24697f)">
          <svg width="100%" height="100%" viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="320" rx="160" ry="80" fill="#122838" opacity="0.7"/>
            <ellipse cx="100" cy="380" rx="90" ry="40" fill="#0d2130" opacity="0.8"/>
            <ellipse cx="310" cy="360" rx="110" ry="50" fill="#0d2130" opacity="0.8"/>
            <g fill="#1a4a3e" opacity="0.6"><polygon points="175,315 190,270 205,315"/><polygon points="205,315 220,275 235,315"/><polygon points="235,312 248,272 261,312"/></g>
            <path d="M0,420 Q100,395 200,410 Q300,425 400,405 L400,520 L0,520 Z" fill="#0a1f2b" opacity="0.9"/>
            <g transform="translate(280,300)" opacity="0.5"><path d="M-18,6 L18,6 L12,-2 L-12,-2 Z" fill="#c8d0d8"/><line x1="0" y1="-2" x2="0" y2="-18" stroke="#a0a8b0" stroke-width="1.2"/><path d="M0,-18 L-9,-7 L0,-7 Z" fill="#d8e0e8" opacity="0.8"/></g>
          </svg>
        </div>
        <div class="nordic-cell-overlay">
          <div class="nordic-cell-label">🇸🇪 Stockholms skärgård</div>
          <div class="nordic-cell-sub">Lanseras 2025 · 200+ öar · 7 000 km kustlinje</div>
        </div>
      </div>
      <div class="nordic-cell reveal reveal-delay-1">
        <div class="nordic-cell-bg" style="background:linear-gradient(160deg,#1a3a2a,#2a5a3a)">
          <svg width="100%" height="100%" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="180" rx="120" ry="60" fill="#0f2820" opacity="0.8"/>
            <path d="M0,210 Q75,195 150,205 Q225,215 300,200 L300,260 L0,260 Z" fill="#0a1a10" opacity="0.9"/>
          </svg>
        </div>
        <div class="nordic-cell-overlay">
          <div class="nordic-cell-label">🇳🇴 Norsk Kyst</div>
          <div class="nordic-cell-sub">Kommer 2026</div>
        </div>
      </div>
      <div class="nordic-cell reveal reveal-delay-2">
        <div class="nordic-cell-bg" style="background:linear-gradient(160deg,#1a1a3a,#2a2a5a)">
          <svg width="100%" height="100%" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="185" rx="110" ry="55" fill="#12122e" opacity="0.8"/>
            <path d="M0,215 Q75,200 150,210 Q225,220 300,205 L300,260 L0,260 Z" fill="#080820" opacity="0.9"/>
          </svg>
        </div>
        <div class="nordic-cell-overlay">
          <div class="nordic-cell-label">🇩🇰 Dansk Riviera</div>
          <div class="nordic-cell-sub">Kommer 2026</div>
        </div>
      </div>
      <div class="nordic-cell reveal reveal-delay-3">
        <div class="nordic-cell-bg" style="background:linear-gradient(160deg,#2a1a1a,#4a2a2a)">
          <svg width="100%" height="100%" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="190" rx="100" ry="50" fill="#2a1010" opacity="0.8"/>
            <path d="M0,215 Q75,200 150,210 Q225,220 300,205 L300,260 L0,260 Z" fill="#180808" opacity="0.9"/>
          </svg>
        </div>
        <div class="nordic-cell-overlay">
          <div class="nordic-cell-label">🇫🇮 Finsk Skärgård</div>
          <div class="nordic-cell-sub">Kommer 2026</div>
        </div>
      </div>
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
        <div class="boende-icon">🏨</div>
        <h4>Värdshus & Hotell</h4>
        <p>Klassiska skärgårdsvärdshus med mat och rum. Utö Värdshus, Sandhamns Värdshus och Grinda Wärdshus är legenderna.</p>
      </div>
      <div class="boende-card reveal reveal-delay-2">
        <div class="boende-icon">🛖</div>
        <h4>Stugor & Uthyrning</h4>
        <p>Hyr en stuga på en ö och lev som en lokalbo i en vecka. Finns på de flesta bebodda öar.</p>
      </div>
      <div class="boende-card reveal reveal-delay-3">
        <div class="boende-icon">⛺</div>
        <h4>Camping & Tält</h4>
        <p>Allemansrätten ger rätten att tälta i naturen. Kommunala campingplatser på bl.a. Utö och Arholma.</p>
      </div>
      <div class="boende-card reveal reveal-delay-4">
        <div class="boende-icon">⚓</div>
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
      <div class="split-feature"><div class="split-feature-icon">📸</div><div class="split-feature-text"><h5>Logga turen på 10 sek</h5><p>Foto + plats. Klart. Din dagbok byggs automatiskt.</p></div></div>
      <div class="split-feature"><div class="split-feature-icon">🧭</div><div class="split-feature-text"><h5>Hitta krogar & platser</h5><p>Bastun, bryggor och krogar längs din rutt</p></div></div>
      <div class="split-feature"><div class="split-feature-icon">🌊</div><div class="split-feature-text"><h5>Community-feed</h5><p>Se andras turer. Bli inspirerad. Ge igen.</p></div></div>
    </div>
    <a href="/kom-igang" class="btn btn-teal btn-lg">Kom igång →</a>
  </div>
  <div class="split-pane owner reveal reveal-delay-2">
    <div class="section-label">För krogägaren</div>
    <h2 class="section-title">Sätt er krog på kartan</h2>
    <p class="section-sub">Nå gäster som redan är ute på vattnet. Gratis grundprofil, premium om ni vill synas mer.</p>
    <div class="split-features">
      <div class="split-feature"><div class="split-feature-icon">📍</div><div class="split-feature-text"><h5>GPS-profil på kartan</h5><p>Syns för alla som paddlar eller seglar förbi</p></div></div>
      <div class="split-feature"><div class="split-feature-icon">📊</div><div class="split-feature-text"><h5>Statistik & insikter</h5><p>Se hur gäster hittar er och varifrån de kommer</p></div></div>
      <div class="split-feature"><div class="split-feature-icon">🌟</div><div class="split-feature-text"><h5>Early Bird — 6 månader gratis</h5><p>De första 20 krogarna får Premium gratis</p></div></div>
    </div>
    <a href="/registrera-krog" class="btn btn-accent btn-lg">Registrera er krog →</a>
  </div>
</div>

<section class="stats-section">
  <div class="section-inner">
    <div class="stats-grid">
      <div class="stat-box reveal"><span class="stat-num">200+</span><div class="stat-label">Platser & krogar</div><div class="stat-sub">Kartlagda i Stockholms skärgård</div></div>
      <div class="stat-box reveal reveal-delay-1"><span class="stat-num">69</span><div class="stat-label">Öar med guider</div><div class="stat-sub">Kartor, mat och upplevelser</div></div>
      <div class="stat-box reveal reveal-delay-2"><span class="stat-num">1 h</span><div class="stat-label">Att sätta upp en krogprofil</div><div class="stat-sub">Ingen teknisk kunskap krävs</div></div>
      <div class="stat-box reveal reveal-delay-3"><span class="stat-num">0 kr</span><div class="stat-label">Att komma igång</div><div class="stat-sub">Grundprofil är gratis för alltid</div></div>
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
        <span class="app-badge-icon">⛵</span>
        <div class="app-badge-text"><span class="small">Prova direkt i webbläsaren</span><span class="big">Öppna Svalla</span></div>
      </a>
      <a href="/kom-igang" class="app-badge">
        <span class="app-badge-icon">👤</span>
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
          <li><a href="/integritetspolicy">Integritetspolicy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Svalla — Alla rättigheter förbehållna</span>
      <div class="footer-flags">🇸🇪</div>
      <div class="footer-social">
        <a href="#" title="Instagram">📸</a>
        <a href="#" title="TikTok">🎵</a>
        <a href="#" title="Facebook">👤</a>
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

    // Nav scroll-effekt
    const nav = document.getElementById('mainNav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)

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

    // Sök-hints
    document.querySelectorAll('.hero-search-hint span').forEach(s => {
      s.addEventListener('click', () => {
        const input = document.querySelector('.hero-search input') as HTMLInputElement
        if (input) input.value = s.textContent || ''
      })
    })

    // Sök-fokus
    const searchInput = document.querySelector('.hero-search input') as HTMLInputElement
    const onFocus = () => { const el = searchInput?.closest('.hero-search') as HTMLElement; if (el) el.style.boxShadow = '0 8px 50px rgba(232,146,74,.35)' }
    const onBlur = () => { const el = searchInput?.closest('.hero-search') as HTMLElement; if (el) el.style.boxShadow = '0 8px 40px rgba(0,0,0,.3)' }
    searchInput?.addEventListener('focus', onFocus)
    searchInput?.addEventListener('blur', onBlur)

    return () => {
      clearTimeout(fallback)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      searchInput?.removeEventListener('focus', onFocus)
      searchInput?.removeEventListener('blur', onBlur)
    }
  }, [])

  return (
    <div style={{ position: 'relative', background: '#0a1f2b' }}>
      {/* Animated skärgård scene — fills exactly the hero viewport, behind all content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <HeroAnimation />
      </div>
      <style>{`
        /* Hero section sits above canvas layer */
        .hero { position: relative; z-index: 1; background: transparent !important; }
      `}</style>
      <div style={{ position: 'relative', zIndex: 1 }} dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
    </div>
  )
}
