'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const LANDING_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --sea:#1a3a5e; --sea-dark:#0d2440; --sea-mid:#234e78;
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
.nav-cta{display:flex;gap:10px;align-items:center}
.btn{padding:10px 20px;border-radius:var(--r-sm);font-size:13.5px;font-weight:600;cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:.2s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn-ghost{background:rgba(255,255,255,.12);color:var(--white);border:1px solid rgba(255,255,255,.2)}
.btn-ghost:hover{background:rgba(255,255,255,.22)}
.btn-accent{background:var(--accent);color:var(--white)}
.btn-accent:hover{background:var(--accent-light);transform:translateY(-1px)}
.btn-teal{background:var(--teal);color:var(--white)}
.btn-teal:hover{background:var(--teal-light);transform:translateY(-1px)}
.btn-lg{padding:16px 36px;font-size:15px;border-radius:var(--r-sm)}
.btn-xl{padding:18px 44px;font-size:16px;border-radius:var(--r-sm)}
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;}
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
.hero-sub{font-size:clamp(16px,2.2vw,20px);font-weight:300;color:rgba(255,255,255,.72);max-width:600px;margin:0 auto 44px;line-height:1.65;}
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
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:none}
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
.auth-m-sub{font-size:13px;color:#7a9dab;margin-bottom:22px}
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
.auth-m-footer{text-align:center;font-size:12px;color:#7a9dab;margin-top:14px}
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
`

const LANDING_HTML = `
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
    <li><a href="/platser">Krogar</a></li>
    <li><a href="/feed">Feed</a></li>
  </ul>
  <div class="nav-cta">
    <a href="/logga-in" class="btn btn-ghost">Logga in</a>
    <a href="/logga-in" class="btn btn-accent">Kom igång →</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-shimmer"></div>
  <svg class="hero-islands" viewBox="0 0 1400 400" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="200" cy="340" rx="180" ry="55" fill="#0f2e3b" opacity="0.6"/>
    <ellipse cx="750" cy="355" rx="220" ry="50" fill="#0f2e3b" opacity="0.7"/>
    <ellipse cx="1250" cy="345" rx="160" ry="48" fill="#0f2e3b" opacity="0.6"/>
    <ellipse cx="450" cy="375" rx="140" ry="42" fill="#122838" opacity="0.85"/>
    <ellipse cx="980" cy="370" rx="185" ry="45" fill="#122838" opacity="0.85"/>
    <path d="M0,390 Q100,350 200,365 Q320,380 380,400 L0,400 Z" fill="#0d2130"/>
    <path d="M500,395 Q620,360 720,375 Q820,390 900,395 Q980,400 1050,392 Q1150,380 1250,390 Q1330,395 1400,400 L1400,400 L500,400 Z" fill="#0d2130"/>
    <g fill="#1a4a3e" opacity="0.7">
      <polygon points="190,340 200,310 210,340"/><polygon points="215,340 225,315 235,340"/>
      <polygon points="730,355 742,322 754,355"/><polygon points="758,352 768,325 778,352"/>
      <polygon points="1220,345 1232,318 1244,345"/>
    </g>
    <g transform="translate(580,355)" opacity="0.5">
      <path d="M-22,8 L22,8 L16,-2 L-16,-2 Z" fill="#c8d0d8"/>
      <line x1="0" y1="-2" x2="0" y2="-20" stroke="#a0aab0" stroke-width="1.5"/>
      <path d="M0,-20 L-10,-8 L0,-8 Z" fill="#d8e0e8" opacity="0.8"/>
    </g>
    <g transform="translate(1280,330)" opacity="0.6">
      <rect x="-5" y="-25" width="10" height="28" fill="#c8c8c0"/>
      <polygon points="-7,-25 7,-25 4,-32 -4,-32" fill="#e8e8e0"/>
      <circle cx="0" cy="-33" r="3" fill="#f0c060"/>
    </g>
    <path d="M100,385 Q200,378 300,383 Q400,388 500,382" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none"/>
    <path d="M600,380 Q750,374 900,379 Q1050,384 1200,378" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none"/>
  </svg>
  <div class="wave-container">
    <div class="wave wave-1"></div>
    <div class="wave wave-2"></div>
    <div class="wave wave-3"></div>
  </div>
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
    <form class="hero-search" onsubmit="event.preventDefault();const q=this.querySelector('input').value.trim();location.href='/platser'+(q?'?q='+encodeURIComponent(q):'')">
      <input type="text" placeholder="🔍  Sök ö, krog eller hamn..." id="heroSearchInput"/>
      <button type="submit">Utforska</button>
    </form>
    <div class="hero-search-hint">
      Populärt just nu:
      <span onclick="location.href='/platser?q=Sandhamn'">Sandhamn</span>
      <span onclick="location.href='/platser?q=Grinda'">Grinda</span>
      <span onclick="location.href='/platser?q=Utö'">Utö</span>
      <span onclick="location.href='/platser?q=Finnhamn'">Finnhamn</span>
    </div>
    <div class="hero-scroll">
      <div class="hero-scroll-line"></div>
      Scrolla
    </div>
  </div>
</section>

<div class="trust-bar">
  <div class="trust-item"><strong>4</strong> nordiska länder</div>
  <div class="trust-divider"></div>
  <div class="trust-item"><strong>200+</strong> krogar & kajer</div>
  <div class="trust-divider"></div>
  <div class="trust-item"><strong>4 000+</strong> äkta recensioner</div>
  <div class="trust-divider"></div>
  <div class="trust-item"><strong>10 sek</strong> att logga en tur</div>
  <div class="trust-divider"></div>
  <div class="trust-item">🇸🇪 🇳🇴 🇩🇰 🇫🇮</div>
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

<section class="featured-section" id="krogar">
  <div class="section-inner">
    <div class="section-header reveal" style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:20px">
      <div>
        <div class="section-label">Utvalda krogar</div>
        <h2 class="section-title">Veckans favoriter</h2>
      </div>
      <a href="/platser" class="btn btn-teal">Visa alla krogar →</a>
    </div>
    <div class="krog-grid">
      <div class="krog-card reveal reveal-delay-1" onclick="location.href='/platser'">
        <div class="krog-card-img" style="background:linear-gradient(135deg,#1a4a5e,#2d7d8a)">
          <div class="img-inner">🍽️</div>
          <div class="krog-card-badge">⭐ Premium</div>
          <div class="krog-card-open">● Öppen</div>
        </div>
        <div class="krog-card-body">
          <div class="krog-card-name">Utö Värdshus</div>
          <div class="krog-card-loc">📍 Utö, Södra Skärgården</div>
          <div class="krog-card-row">
            <div class="rating"><span class="stars-small">★★★★★</span><span class="rating-num">4.9</span><span class="reviews-count">(186)</span></div>
          </div>
          <div class="krog-card-tags"><span class="chip">Lyxig middag</span><span class="chip">Havsutsikt</span><span class="chip">Hotell</span></div>
        </div>
        <div class="krog-card-footer">
          <span class="krog-card-dist">⛵ 40 km från Sthlm</span>
          <span class="krog-card-price">från 285 kr</span>
        </div>
      </div>
      <div class="krog-card reveal reveal-delay-2" onclick="location.href='/platser'">
        <div class="krog-card-img" style="background:linear-gradient(135deg,#2d4a2e,#4a7a4e)">
          <div class="img-inner">🥂</div>
          <div class="krog-card-badge">⭐ Premium</div>
          <div class="krog-card-open">● Öppen</div>
        </div>
        <div class="krog-card-body">
          <div class="krog-card-name">Sandhamn Seglarhotell</div>
          <div class="krog-card-loc">📍 Sandhamn, Stockholms yttre skärgård</div>
          <div class="krog-card-row">
            <div class="rating"><span class="stars-small">★★★★½</span><span class="rating-num">4.7</span><span class="reviews-count">(203)</span></div>
          </div>
          <div class="krog-card-tags"><span class="chip">Seglarbar</span><span class="chip">Cocktails</span><span class="chip">Ikon</span></div>
        </div>
        <div class="krog-card-footer">
          <span class="krog-card-dist">⛵ 21 km</span>
          <span class="krog-card-price">från 145 kr</span>
        </div>
      </div>
      <div class="krog-card reveal reveal-delay-3" onclick="location.href='/platser'">
        <div class="krog-card-img" style="background:linear-gradient(135deg,#3a2a1a,#6a4a2e)">
          <div class="img-inner">🏡</div>
          <div class="krog-card-open">● Öppen</div>
        </div>
        <div class="krog-card-body">
          <div class="krog-card-name">Grinda Wärdshus</div>
          <div class="krog-card-loc">📍 Grinda, Innerskärgården</div>
          <div class="krog-card-row">
            <div class="rating"><span class="stars-small">★★★★½</span><span class="rating-num">4.6</span><span class="reviews-count">(89)</span></div>
          </div>
          <div class="krog-card-tags"><span class="chip">Husmanskost</span><span class="chip">Historisk</span><span class="chip">Stuga</span></div>
        </div>
        <div class="krog-card-footer">
          <span class="krog-card-dist">⛵ 14 km</span>
          <span class="krog-card-price">från 125 kr</span>
        </div>
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
      <a href="/platser" class="dest-card reveal reveal-delay-1">
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
          <div class="dest-card-islands"><span class="dest-island">Fjäderholmarna</span><span class="dest-island">Vaxholm</span><span class="dest-island">Grinda</span><span class="dest-island">Finnhamn</span><span class="dest-island">Resarö</span></div>
        </div>
      </a>
      <a href="/platser" class="dest-card reveal reveal-delay-2">
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
          <div class="dest-card-islands"><span class="dest-island">Sandhamn</span><span class="dest-island">Möja</span><span class="dest-island">Ljusterö</span><span class="dest-island">Gällnö</span><span class="dest-island">Runmarö</span></div>
        </div>
      </a>
      <a href="/platser" class="dest-card reveal reveal-delay-3">
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
          <div class="dest-card-islands"><span class="dest-island">Utö</span><span class="dest-island">Nåttarö</span><span class="dest-island">Ornö</span><span class="dest-island">Dalarö</span><span class="dest-island">Landsort</span></div>
        </div>
      </a>
      <a href="/platser" class="dest-card reveal reveal-delay-4">
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
          <div class="dest-card-islands"><span class="dest-island">Furusund</span><span class="dest-island">Blidö</span><span class="dest-island">Arholma</span><span class="dest-island">Gräddö</span><span class="dest-island">Norrtälje</span></div>
        </div>
      </a>
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

<section class="nordic-section">
  <div class="section-inner">
    <div class="section-header centered reveal">
      <div class="section-label" style="color:var(--accent)">Hela Norden</div>
      <h2 class="section-title" style="color:var(--white)">Från Stockholms skärgård till Finska öarna</h2>
      <p class="section-sub" style="color:rgba(255,255,255,.55)">Vi expanderar nu till Norge, Danmark och Finland — en plattform för hela det nordiska skärgårdslandskapet.</p>
    </div>
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
    <a href="/logga-in" class="btn btn-teal btn-lg">Kom igång →</a>
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
    <a href="/logga-in" class="btn btn-accent btn-lg">Registrera er krog →</a>
  </div>
</div>

<section class="stats-section">
  <div class="section-inner">
    <div class="stats-grid">
      <div class="stat-box reveal"><span class="stat-num">4</span><div class="stat-label">Nordiska länder</div><div class="stat-sub">Sverige · Norge · Danmark · Finland</div></div>
      <div class="stat-box reveal reveal-delay-1"><span class="stat-num">7 000+</span><div class="stat-label">Mil kustlinje</div><div class="stat-sub">Kartlagt och sökbart</div></div>
      <div class="stat-box reveal reveal-delay-2"><span class="stat-num">1 h</span><div class="stat-label">Att sätta upp en krogprofil</div><div class="stat-sub">Ingen teknisk kunskap krävs</div></div>
      <div class="stat-box reveal reveal-delay-3"><span class="stat-num">0 kr</span><div class="stat-label">Att komma igång</div><div class="stat-sub">Grundprofil är gratis för alltid</div></div>
    </div>
  </div>
</section>

<section class="testimonial-section">
  <div class="section-inner">
    <div class="section-header centered reveal">
      <div class="section-label">Vad folk säger</div>
      <h2 class="section-title">Röster från skärgården</h2>
    </div>
    <div class="testimonials">
      <div class="testimonial reveal reveal-delay-1">
        <div class="testimonial-stars">★★★★★</div>
        <div class="testimonial-text">"Paddlade Stockholm–Sandhamn och hade Svalla som guide hela vägen. Utan den hade jag missat tre av de bästa ställena."</div>
        <div class="testimonial-footer"><div class="testimonial-avatar" style="background:#2d7d8a">SK</div><div><div class="testimonial-name">Sara Karlsson</div><div class="testimonial-role">Kajakpaddlare, Stockholm</div></div></div>
      </div>
      <div class="testimonial reveal reveal-delay-2">
        <div class="testimonial-stars">★★★★★</div>
        <div class="testimonial-text">"Hittade ett litet café på Ljusterö som inte fanns på Google Maps. Svalla visade vägen – och det blev årets bästa fika."</div>
        <div class="testimonial-footer"><div class="testimonial-avatar" style="background:#e8924a">AJ</div><div><div class="testimonial-name">Anna Johansson</div><div class="testimonial-role">Seglare, Nacka</div></div></div>
      </div>
      <div class="testimonial reveal reveal-delay-3">
        <div class="testimonial-stars">★★★★★</div>
        <div class="testimonial-text">"Seglade med familjen i två veckor och loggade varje stopp direkt från båten. Nu har vi ett minne för livet av den turen."</div>
        <div class="testimonial-footer"><div class="testimonial-avatar" style="background:#1a4a5e">PH</div><div><div class="testimonial-name">Peter Holm</div><div class="testimonial-role">Seglare, Göteborg</div></div></div>
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
        <span class="app-badge-icon">⛵</span>
        <div class="app-badge-text"><span class="small">Prova direkt i webbläsaren</span><span class="big">Öppna Svalla</span></div>
      </a>
      <a href="/logga-in" class="app-badge">
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
        <div class="logo">⛵ <span>Svalla</span></div>
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
      <div class="footer-flags">🇸🇪 🇳🇴 🇩🇰 🇫🇮</div>
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

    // Injicera CSS
    const styleEl = document.createElement('style')
    styleEl.id = 'svalla-landing-css'
    styleEl.textContent = LANDING_CSS
    document.head.appendChild(styleEl)

    // Nav scroll-effekt
    const nav = document.getElementById('mainNav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

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
      document.getElementById('svalla-landing-css')?.remove()
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      searchInput?.removeEventListener('focus', onFocus)
      searchInput?.removeEventListener('blur', onBlur)
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
}
