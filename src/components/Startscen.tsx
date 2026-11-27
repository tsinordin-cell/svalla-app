'use client'
/*
 * Startscenen (heron på startsidan). Flyttad hit från idébanken (src/app/ideer/kreativ/Intro.tsx) 2026-11-24.
 * Bilderna och ljudet ligger i public/kreativ.
 */
/**
 * INTROT, version 2 (2026-11-21). Rent WebGL2, inga bibliotek.
 * Partiklar ritas som mjuka fläckar till en täthetsbild, suddas, och tröskelvärdet ger en bläckkant.
 * Under bläcket ligger ett vätskefält (128 punkter brett) som krusar kanten av sig självt. Musen påverkar inte bilden.
 * Kornet i kanten kommer från en förberäknad brustextur i två skalor. Strikt två färger.
 * Båten och texten ligger i egna kanaler. Texten inverterar havet, båten smälter ihop med det.
 * Sveriges kontur: Natural Earth 1:50m (allmän egendom), avrundad till två decimaler.
 */
import { useEffect, useRef, useState } from 'react'
import SvallaLogo from '@/components/SvallaLogo'

const BLA = [0.106, 0.341, 0.627] // #1b57a0
// Startscenen: mjukare och lite ljusare blå i havet och SVALLA, så att kontrasten mot himlen inte bländar (Max 2026-11-24)
const BLA_VARLD = [0.267, 0.447, 0.671] // #4472ab
const SLUT = 11800
const NAV_KANT = 34 // så att första och sista etiketten inte klipps
const SCENER = [
  { namn: 'Prickar', fran: 0 },
  { namn: 'Sverige', fran: 2600 },
  { namn: 'Havet', fran: 5200 },
  { namn: 'Båten', fran: 7800 },
  { namn: 'In', fran: 10400 },
]

/* Sverige med Gotland, Öland och några större öar (lng, lat). Natural Earth 1:50m, allmän egendom, via AshKyd/geojson-regions. */
const SVERIGE: [number, number][][] = [
  [[11.39,59.04],[11.47,58.91],[11.54,58.89],[11.64,58.93],[11.71,59.02],[11.75,59.16],[11.8,59.29],[11.74,59.43],[11.68,59.56],[11.68,59.59],[11.83,59.7],[11.88,59.78],[11.93,59.86],[11.99,59.89],[12.07,59.9],[12.17,59.91],[12.29,59.97],[12.4,60.04],[12.49,60.11],[12.51,60.24],[12.52,60.31],[12.55,60.35],[12.59,60.45],[12.55,60.55],[12.45,60.69],[12.31,60.89],[12.29,61],[12.35,61.02],[12.47,61.04],[12.68,61.05],[12.71,61.06],[12.73,61.11],[12.78,61.17],[12.83,61.22],[12.86,61.29],[12.88,61.35],[12.76,61.45],[12.6,61.54],[12.49,61.57],[12.29,61.65],[12.16,61.72],[12.23,61.98],[12.29,62.17],[12.3,62.21],[12.3,62.29],[12.11,62.59],[12.12,62.66],[12.14,62.72],[12.12,62.83],[12.11,62.92],[12.14,62.95],[12.22,63],[12.14,63.08],[12.14,63.09],[12,63.29],[12.21,63.49],[12.18,63.6],[12.3,63.67],[12.53,63.84],[12.66,63.94],[12.69,63.96],[12.79,64],[12.99,64.05],[13.2,64.08],[13.3,64.07],[13.67,64.04],[13.96,64.01],[14,64.04],[14.06,64.1],[14.14,64.17],[14.15,64.26],[14.12,64.39],[14.08,64.46],[13.87,64.51],[13.65,64.58],[13.92,64.8],[14.12,64.95],[14.35,65.17],[14.43,65.26],[14.48,65.3],[14.55,65.65],[14.6,65.74],[14.63,65.79],[14.64,65.85],[14.61,65.93],[14.54,66.13],[14.92,66.15],[15.04,66.17],[15.15,66.19],[15.37,66.25],[15.48,66.31],[15.42,66.49],[15.56,66.55],[15.88,66.77],[16.24,66.98],[16.4,67.05],[16.42,67.09],[16.43,67.16],[16.36,67.25],[16.28,67.31],[16.13,67.43],[16.19,67.51],[16.31,67.52],[16.46,67.55],[16.57,67.62],[16.59,67.63],[16.78,67.9],[17.17,68.03],[17.32,68.1],[17.56,68.05],[17.92,67.96],[18.07,68.09],[18.13,68.13],[18.18,68.2],[18.16,68.32],[18.15,68.47],[18.16,68.53],[18.3,68.56],[18.38,68.56],[18.77,68.5],[18.87,68.5],[19.05,68.49],[19.26,68.47],[19.69,68.39],[19.87,68.36],[19.97,68.36],[20.06,68.39],[20.24,68.48],[19.97,68.54],[20.15,68.61],[20.24,68.67],[20.32,68.75],[20.35,68.85],[20.34,68.9],[20.28,68.93],[20.12,69.02],[20.49,69.03],[20.62,69.04],[20.9,68.98],[20.91,68.97],[20.91,68.94],[20.92,68.91],[21.18,68.83],[21.26,68.79],[21.42,68.72],[21.47,68.69],[21.62,68.65],[21.72,68.61],[21.85,68.57],[22,68.52],[22.2,68.48],[22.36,68.46],[22.78,68.39],[22.85,68.37],[22.98,68.32],[23.1,68.26],[23.18,68.14],[23.32,68.13],[23.36,68.09],[23.47,68.02],[23.64,67.95],[23.63,67.93],[23.5,67.88],[23.49,67.8],[23.5,67.7],[23.54,67.61],[23.54,67.59],[23.5,67.56],[23.47,67.52],[23.45,67.48],[23.45,67.46],[23.47,67.45],[23.54,67.45],[23.66,67.44],[23.73,67.42],[23.77,67.33],[23.76,67.31],[23.66,67.27],[23.63,67.23],[23.62,67.18],[23.64,67.13],[23.68,67.07],[23.76,67],[23.87,66.93],[23.94,66.88],[23.98,66.84],[23.99,66.81],[23.94,66.78],[23.89,66.71],[23.89,66.63],[23.87,66.58],[23.77,66.51],[23.7,66.48],[23.68,66.44],[23.67,66.38],[23.69,66.3],[23.7,66.25],[23.72,66.22],[23.75,66.19],[23.91,66.15],[23.99,66.06],[24.05,65.99],[24.16,65.81],[23.89,65.78],[23.69,65.83],[23.59,65.81],[23.42,65.8],[23.22,65.79],[23.15,65.75],[23.1,65.74],[22.92,65.79],[22.75,65.87],[22.62,65.81],[22.54,65.79],[22.47,65.85],[22.4,65.86],[22.37,65.84],[22.34,65.79],[22.29,65.75],[22.27,65.72],[22.27,65.62],[22.25,65.6],[22.09,65.61],[22.1,65.58],[22.13,65.57],[22.15,65.55],[22.09,65.53],[21.92,65.53],[21.9,65.51],[21.95,65.47],[21.91,65.44],[21.88,65.42],[21.68,65.4],[21.57,65.41],[21.53,65.39],[21.52,65.36],[21.55,65.33],[21.6,65.32],[21.61,65.3],[21.61,65.26],[21.57,65.25],[21.45,65.32],[21.41,65.32],[21.44,65.28],[21.51,65.25],[21.55,65.21],[21.58,65.16],[21.57,65.13],[21.42,65.01],[21.29,64.94],[21.2,64.88],[21.14,64.81],[21.2,64.77],[21.28,64.72],[21.33,64.63],[21.39,64.54],[21.52,64.46],[21.49,64.42],[21.47,64.38],[21.26,64.3],[21.02,64.18],[20.76,63.87],[20.68,63.83],[20.45,63.77],[20.37,63.72],[20.2,63.66],[19.91,63.61],[19.78,63.54],[19.72,63.46],[19.66,63.46],[19.59,63.49],[19.5,63.51],[19.49,63.46],[19.49,63.42],[19.35,63.48],[19.29,63.43],[19.24,63.35],[19.03,63.24],[18.82,63.26],[18.79,63.24],[18.85,63.22],[18.86,63.21],[18.82,63.2],[18.76,63.2],[18.67,63.18],[18.61,63.18],[18.58,63.13],[18.53,63.06],[18.41,63.04],[18.34,63.03],[18.31,63],[18.5,62.99],[18.49,62.96],[18.48,62.93],[18.46,62.9],[18.25,62.85],[18.21,62.81],[18.17,62.79],[18.07,62.79],[18.08,62.81],[18.09,62.84],[17.95,62.83],[17.91,62.89],[17.88,62.87],[17.9,62.83],[17.93,62.79],[17.97,62.72],[17.94,62.68],[17.9,62.66],[17.93,62.64],[18.01,62.63],[18.04,62.6],[17.95,62.58],[17.83,62.5],[17.72,62.5],[17.65,62.45],[17.57,62.45],[17.51,62.48],[17.41,62.51],[17.38,62.46],[17.37,62.43],[17.43,62.33],[17.54,62.26],[17.63,62.23],[17.56,62.21],[17.51,62.17],[17.45,62.02],[17.41,61.97],[17.37,61.87],[17.4,61.78],[17.42,61.74],[17.47,61.68],[17.33,61.69],[17.2,61.72],[17.22,61.66],[17.13,61.58],[17.15,61.5],[17.16,61.46],[17.14,61.38],[17.18,61.36],[17.2,61.31],[17.16,61.28],[17.18,61.25],[17.19,61.15],[17.21,60.99],[17.2,60.95],[17.28,60.81],[17.26,60.76],[17.25,60.7],[17.36,60.64],[17.46,60.64],[17.56,60.64],[17.59,60.63],[17.63,60.59],[17.66,60.54],[17.74,60.54],[17.87,60.58],[17.96,60.59],[18.01,60.51],[18.16,60.41],[18.25,60.36],[18.4,60.34],[18.56,60.25],[18.54,60.15],[18.6,60.12],[18.79,60.08],[18.85,60.03],[18.88,59.98],[18.93,59.94],[18.99,59.83],[18.97,59.76],[18.9,59.73],[18.72,59.66],[18.64,59.6],[18.58,59.57],[18.4,59.49],[18.34,59.48],[18.28,59.44],[18.22,59.42],[18.16,59.43],[17.96,59.36],[17.98,59.33],[18.13,59.32],[18.21,59.33],[18.27,59.37],[18.34,59.38],[18.4,59.37],[18.46,59.4],[18.51,59.41],[18.56,59.39],[18.62,59.33],[18.5,59.29],[18.41,59.29],[18.37,59.18],[18.32,59.13],[18.29,59.11],[18.1,59.06],[17.97,59],[17.83,58.95],[17.77,58.97],[17.67,58.92],[17.46,58.86],[17.35,58.78],[17.1,58.71],[16.98,58.65],[16.64,58.65],[16.32,58.66],[16.21,58.64],[16.32,58.63],[16.39,58.6],[16.48,58.61],[16.68,58.6],[16.79,58.59],[16.92,58.49],[16.82,58.46],[16.65,58.43],[16.72,58.3],[16.77,58.21],[16.7,58.16],[16.69,57.92],[16.6,57.91],[16.56,57.81],[16.59,57.76],[16.58,57.64],[16.6,57.57],[16.65,57.5],[16.63,57.43],[16.48,57.27],[16.48,57.19],[16.51,57.14],[16.53,57.07],[16.46,56.93],[16.41,56.81],[16.35,56.71],[16.22,56.59],[16.15,56.5],[16,56.22],[15.92,56.17],[15.83,56.12],[15.72,56.16],[15.63,56.19],[15.51,56.18],[15.33,56.15],[15.05,56.17],[14.78,56.16],[14.71,56.13],[14.75,56.03],[14.66,56.02],[14.56,56.05],[14.47,56.01],[14.4,55.98],[14.26,55.89],[14.22,55.83],[14.2,55.73],[14.28,55.64],[14.34,55.53],[14.17,55.4],[14.08,55.39],[13.81,55.43],[13.32,55.35],[12.89,55.41],[12.94,55.48],[12.94,55.53],[12.96,55.61],[12.98,55.69],[12.97,55.75],[12.94,55.81],[12.83,55.88],[12.59,56.14],[12.52,56.25],[12.47,56.29],[12.51,56.29],[12.71,56.24],[12.75,56.24],[12.8,56.26],[12.74,56.35],[12.69,56.38],[12.66,56.44],[12.77,56.46],[12.86,56.45],[12.92,56.52],[12.88,56.62],[12.79,56.65],[12.72,56.66],[12.57,56.82],[12.42,56.91],[12.15,57.23],[12.05,57.45],[11.96,57.43],[11.92,57.52],[11.89,57.61],[11.88,57.68],[11.73,57.72],[11.73,57.76],[11.7,57.97],[11.55,58],[11.45,58.12],[11.43,58.34],[11.33,58.38],[11.25,58.37],[11.25,58.42],[11.27,58.48],[11.22,58.68],[11.21,58.87],[11.17,58.92],[11.15,58.99],[11.17,59.05],[11.2,59.08],[11.3,59.09],[11.39,59.04]],
  [[19.08,57.84],[18.99,57.81],[18.95,57.74],[18.88,57.73],[18.81,57.71],[18.79,57.48],[18.91,57.4],[18.84,57.39],[18.78,57.36],[18.74,57.32],[18.7,57.24],[18.54,57.2],[18.48,57.16],[18.39,57.09],[18.34,56.98],[18.25,56.93],[18.15,56.92],[18.21,57.01],[18.29,57.08],[18.21,57.13],[18.16,57.21],[18.11,57.27],[18.15,57.34],[18.13,57.45],[18.14,57.56],[18.2,57.61],[18.28,57.66],[18.41,57.76],[18.54,57.83],[18.72,57.86],[18.81,57.83],[18.84,57.9],[18.9,57.92],[18.96,57.9],[19.08,57.84]],
  [[16.53,56.29],[16.48,56.24],[16.43,56.24],[16.4,56.31],[16.39,56.48],[16.41,56.57],[16.63,56.88],[16.73,56.9],[16.86,57.09],[16.9,57.17],[16.96,57.25],[17,57.32],[17.03,57.35],[17.09,57.33],[17.12,57.32],[17.05,57.28],[17.06,57.23],[17.05,57.21],[16.88,56.99],[16.84,56.84],[16.78,56.81],[16.53,56.29]],
  [[18.6,59.47],[18.57,59.44],[18.55,59.48],[18.56,59.49],[18.57,59.53],[18.62,59.55],[18.7,59.53],[18.7,59.52],[18.62,59.49],[18.6,59.47]],
  [[19.16,57.92],[19.14,57.86],[19.09,57.86],[19.04,57.91],[19.13,57.98],[19.28,57.98],[19.33,57.96],[19.16,57.92]],
  [[18.42,59.03],[18.37,59.02],[18.35,59.02],[18.38,59.07],[18.4,59.09],[18.46,59.11],[18.49,59.1],[18.42,59.03]],
]

const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const klamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
function slump(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 } }

/* Ritar en form i en dold canvas och plockar slumpade punkter inuti den. */
function provForm(W: number, H: number, n: number, rita: (c: CanvasRenderingContext2D) => void, r: () => number): Float32Array {
  const s = 0.5
  const cw = Math.max(8, Math.round(W * s)), ch = Math.max(8, Math.round(H * s))
  const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch
  const c = cv.getContext('2d')!
  c.scale(s, s); c.fillStyle = '#fff'; rita(c)
  const d = c.getImageData(0, 0, cw, ch).data
  const fyllda: number[] = []
  for (let y = 0; y < ch; y += 1) for (let x = 0; x < cw; x += 1) if (d[(y * cw + x) * 4 + 3]! > 128) fyllda.push(x, y)
  const ut = new Float32Array(n * 2)
  const m = fyllda.length / 2
  for (let i = 0; i < n; i++) {
    const k = m ? Math.floor(r() * m) : 0
    ut[i * 2] = ((fyllda[k * 2] ?? cw / 2) + r()) / s
    ut[i * 2 + 1] = ((fyllda[k * 2 + 1] ?? ch / 2) + r()) / s
  }
  return ut
}

/* Svallas båt. Seglen, masten och vågen har loggan B:s mått (src/components/SvallaLogo.tsx, enheter 0 till 18).
   Lagt till: ett lågt skrov och två personer, en på var sida om seglen. Rutan är 26 × 25 enheter. */
const BAT_B = 26, BAT_H = 25, BAT_DX = 4, BAT_DY = -1
// Den vinkande armen: överarm från axel till armbåge (still), underarm och öppen hand vinkar kring armbågen
/* Målad båt som bildlager (beslut Max 2026-11-21, skiss 2: blått bläck med orange accent). Bilden är 1080 × 900 punkter
   och täcker båtens ruta plus två enheter marginal i sidled, alltså 30 × 25 enheter med 36 punkter per enhet.
   Underarmen är ett eget lager som vinkar kring armbågen. Saknas bilderna ritas den gamla bläckbåten. */
const MALAD = { bat: '/kreativ/intro-bat.webp', arm: '/kreativ/intro-arm.webp', pe: 36, armRuta: [250, 395, 74, 153] as const, armbage: [268.24, 530.28] as const }
/* Startscenen (del 7): Thorkel i stället för killen i randig tröja (Max 2026-11-23). Huvudet är sajtens Thorkel, kroppen båtens egen figur.
   Pipan sitter i vänster hand: en bildremsa med 12 rutor där armen lyfter pipan från relingen till munnen. Koordinater i båtbildens punkter. */
const THORKEL = {
  bat: '/kreativ/thorkel-bat-v.webp', arm: '/kreativ/thorkel-arm-v.webp', pipa: '/kreativ/thorkel-pipa.webp', ruta: [40, 455, 170, 225] as const, n: 12,
  skal: [[96, 638], [97.2, 635.8], [100.4, 629.6], [104.8, 619.4], [109.7, 605.5], [114.5, 588.1], [118.6, 568.3], [121.9, 547.1], [124.1, 526.6], [125.6, 508.9], [126.3, 496.4], [126.5, 491.8]] as const,
  mun: [166, 496] as const,
}
// Pipans rytm i sekunder: vilar, lyfter, blossar, sänker och blåser ut röken
const PIPA = { period: 7.5, lyft: 3.2, upp: 0.6, hall: 1.2, ned: 0.7 }
function pipRuta(s: number): number {
  const c = s % PIPA.period, n = THORKEL.n - 1, e = (p: number) => p * p * (3 - 2 * p)
  if (c < PIPA.lyft) return 0
  if (c < PIPA.lyft + PIPA.upp) return Math.round(n * e((c - PIPA.lyft) / PIPA.upp))
  if (c < PIPA.lyft + PIPA.upp + PIPA.hall) return n
  if (c < PIPA.lyft + PIPA.upp + PIPA.hall + PIPA.ned) return Math.round(n * (1 - e((c - PIPA.lyft - PIPA.upp - PIPA.hall) / PIPA.ned)))
  return 0
}
const ARM = { axel: [-0.39, 16.16] as const, armbage: [1.11, 14.73] as const, hand: [1.24, 12.85] as const, r: 0.375 }
/* En sittande person i Svallas tvåfärgade bläckstil: randig tröja med polokrage, ljust ansikte med öga, näsa och leende.
   Den ena har stickad mössa med tofs, den andra sjömansmössa och hästsvans. Vitt görs genom att skära hål i det blå. */
function ritaPerson(c: CanvasRenderingContext2D, cx: number, sjoman: boolean) {
  const hal = (f: () => void) => { c.globalCompositeOperation = 'destination-out'; c.beginPath(); f(); c.fill(); c.globalCompositeOperation = 'source-over' }
  // Figuren är ritad i grundstorlek och förstoras 1,25 gånger kring sittpunkten
  c.save(); c.translate(cx, 19.6); c.scale(1.25, 1.25); c.translate(-cx, -19.6)
  // Tröjan: blå kontur, vit insida och två blå ränder
  c.beginPath(); c.moveTo(cx - 1.15, 19.6); c.lineTo(cx - 1.15, 17.0); c.quadraticCurveTo(cx - 1.12, 16.28, cx - 0.5, 16.25); c.lineTo(cx + 0.5, 16.25); c.quadraticCurveTo(cx + 1.12, 16.28, cx + 1.15, 17.0); c.lineTo(cx + 1.15, 19.6); c.closePath(); c.fill()
  hal(() => { c.moveTo(cx - 0.98, 18.5); c.lineTo(cx - 0.98, 17.0); c.quadraticCurveTo(cx - 0.96, 16.43, cx - 0.45, 16.42); c.lineTo(cx + 0.45, 16.42); c.quadraticCurveTo(cx + 0.96, 16.43, cx + 0.98, 17.0); c.lineTo(cx + 0.98, 18.5); c.closePath() })
  c.fillRect(cx - 1.0, 17.22, 2.0, 0.26); c.fillRect(cx - 1.0, 17.8, 2.0, 0.26)
  // Polokrage
  c.fillRect(cx - 0.5, 15.7, 1.0, 0.72)
  hal(() => { c.rect(cx - 0.35, 15.86, 0.7, 0.62) })
  // Huvud med ljust ansikte, öga, leende och näsa (båda tittar åt höger)
  c.beginPath(); c.arc(cx, 15.0, 0.85, 0, Math.PI * 2); c.fill()
  hal(() => { c.arc(cx, 15.0, 0.68, 0, Math.PI * 2) })
  c.beginPath(); c.arc(cx + 0.36, 15.13, 0.12, 0, Math.PI * 2); c.fill()
  c.beginPath(); c.arc(cx + 0.26, 15.2, 0.3, Math.PI * 0.12, Math.PI * 0.7); c.lineWidth = 0.13; c.stroke()
  c.beginPath(); c.arc(cx + 0.86, 15.2, 0.15, 0, Math.PI * 2); c.fill()
  if (sjoman) {
    // Hår och hästsvans
    c.beginPath(); c.arc(cx, 15.0, 0.85, Math.PI * 0.72, Math.PI * 1.5); c.lineTo(cx - 0.1, 14.85); c.lineTo(cx - 0.42, 15.5); c.closePath(); c.fill()
    c.beginPath(); c.arc(cx - 1.02, 15.5, 0.36, 0, Math.PI * 2); c.fill()
    // Sjömansmössa: vit kulle, blått band och skärm
    c.beginPath(); c.ellipse(cx - 0.05, 14.32, 0.9, 0.46, 0, 0, Math.PI * 2); c.fill()
    hal(() => { c.ellipse(cx - 0.05, 14.3, 0.72, 0.29, 0, 0, Math.PI * 2) })
    c.fillRect(cx - 0.86, 14.58, 1.72, 0.26)
    c.beginPath(); c.moveTo(cx + 0.5, 14.72); c.lineTo(cx + 1.3, 14.86); c.lineWidth = 0.2; c.stroke()
  } else {
    // Stickad mössa med uppvikt kant och tofs
    c.beginPath(); c.ellipse(cx, 14.72, 0.9, 0.82, 0, Math.PI, Math.PI * 2); c.closePath(); c.fill()
    c.fillRect(cx - 0.94, 14.6, 1.88, 0.3)
    hal(() => { c.rect(cx - 0.8, 14.48, 1.6, 0.11) })
    c.beginPath(); c.arc(cx, 13.84, 0.25, 0, Math.PI * 2); c.fill()
  }
  c.restore()
}
function ritaBat(c: CanvasRenderingContext2D, x: number, y: number, bw: number, medArm = true) {
  const k = bw / BAT_B
  c.save(); c.translate(x, y); c.scale(k, k); c.translate(BAT_DX, BAT_DY)
  c.strokeStyle = c.fillStyle as string; c.lineCap = 'round'; c.lineJoin = 'round'
  // Mast (x 9 i loggan)
  c.beginPath(); c.moveTo(9, 2.6); c.lineTo(9, 19.4); c.lineWidth = 1.3; c.stroke()
  // Storseglet (loggan: M9,4 L18,18 L9,18) och focken (M9,8 L1,17 L9,17), med en smal glipa mot masten
  c.beginPath(); c.moveTo(10.25, 4.3); c.lineTo(18, 18); c.lineTo(10.25, 18); c.closePath(); c.fill()
  c.beginPath(); c.moveTo(7.75, 8.3); c.lineTo(1, 17); c.lineTo(7.75, 17); c.closePath(); c.fill()
  // Skrov med svängd reling (för och akter högre än mitten)
  c.beginPath(); c.moveTo(-3.4, 18.5); c.quadraticCurveTo(9, 20.3, 21.4, 18.5); c.quadraticCurveTo(20.4, 21.8, 17.4, 22.1); c.lineTo(0.6, 22.1); c.quadraticCurveTo(-2.4, 21.8, -3.4, 18.5); c.closePath(); c.fill()
  // Två personer som sitter i båten, huvud och axlar över relingen
  ritaPerson(c, -1.7, false)
  ritaPerson(c, 19.85, true)
  if (medArm) {
    c.beginPath(); c.moveTo(ARM.axel[0], ARM.axel[1]); c.lineTo(ARM.armbage[0], ARM.armbage[1]); c.lineTo(ARM.hand[0], ARM.hand[1]); c.lineWidth = ARM.r * 2; c.stroke()
    c.beginPath(); c.arc(ARM.hand[0], ARM.hand[1], ARM.r * 1.25, 0, Math.PI * 2); c.fill()
  }
  // Inget vågstreck under skrovet (beslut Max 2026-11-21). Havet i scenen är vågen.
  c.restore()
}

const VS_PUNKT = `#version 300 es
in vec2 aPos; in float aSize; in float aAlpha; in float aGroup;
uniform vec2 uStage; uniform float uScale; uniform float uBoatMix;
out float vA; out float vB;
void main(){
  vec2 p = aPos / uStage;
  gl_Position = vec4(p.x * 2. - 1., 1. - p.y * 2., 0., 1.);
  gl_PointSize = aSize * uScale;
  vA = aAlpha; vB = aGroup * uBoatMix;
}`
const FS_PUNKT = `#version 300 es
precision highp float;
in float vA; in float vB; out vec4 o;
void main(){
  vec2 c = gl_PointCoord - .5;
  float g = exp(-dot(c, c) * 13.) * vA * .34;
  o = vec4(g * (1. - vB), g * vB, 0., 1.);
}`
const VS_YTA = `#version 300 es
in vec2 aP; out vec2 uv;
void main(){ uv = aP * .5 + .5; gl_Position = vec4(aP, 0., 1.); }`
const FS_SUDD = `#version 300 es
precision highp float;
uniform sampler2D t; uniform vec2 dir; in vec2 uv; out vec4 o;
void main(){
  vec4 s = texture(t, uv) * .227027;
  s += (texture(t, uv + dir * 1.3846) + texture(t, uv - dir * 1.3846)) * .3162162;
  s += (texture(t, uv + dir * 3.2308) + texture(t, uv - dir * 3.2308)) * .0702703;
  o = s;
}`
const FS_FLODE = `#version 300 es
precision highp float;
uniform sampler2D v; uniform vec2 m; uniform vec2 md; uniform float asp; uniform float t; uniform float dt;
in vec2 uv; out vec4 o;
vec2 las(vec2 p){ return (texture(v, p).xy - .5) * 2.; }
void main(){
  vec2 vel = las(uv);
  vel = las(uv - vel * dt * .35) * .982;
  vec2 d = (uv - m) * vec2(asp, 1.);
  vel += md * exp(-dot(d, d) / .0016);
  vel += vec2(sin(uv.y * 8. + t * .5), cos(uv.x * 7. - t * .43)) * .0035;
  o = vec4(clamp(vel * .5 + .5, 0., 1.), 0., 1.);
}`
const FS_BILD = `#version 300 es
precision highp float;
uniform sampler2D den; uniform sampler2D vel; uniform sampler2D korn; uniform sampler2D txt; uniform sampler2D form;
uniform vec2 res; uniform float t; uniform float hav; uniform float vag; uniform float txtA; uniform vec3 bla; uniform vec3 drops[7];
uniform vec2 stage; uniform float sveS; uniform float batS; uniform vec2 piv; uniform float ang; uniform float by; uniform float bxo; uniform sampler2D batT; uniform sampler2D armT; uniform vec4 batR; uniform vec4 armQ; uniform vec2 armE; uniform float armV; uniform float malad; uniform float genom; uniform vec4 arm; uniform vec4 armU; uniform float armR; uniform sampler2D pipT; uniform vec4 pipQ; uniform float pipF; uniform float pipN;
in vec2 uv; out vec4 o;
vec4 mjuk(vec2 p){ vec2 e = 1.1 / vec2(textureSize(form, 0));
  return texture(form, p) * .4 + (texture(form, p + e) + texture(form, p - e) + texture(form, p + vec2(e.x, -e.y)) + texture(form, p - vec2(e.x, -e.y))) * .15; }
float seg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float hh = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * hh); }
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
float kant(float a, float th){ float w = fwidth(a) * .85 + .0015; return smoothstep(th - w, th + w, a); }
void main(){
  float asp = res.x / res.y;
  vec2 v = (texture(vel, uv).xy - .5) * 2.;
  vec2 q = uv * vec2(asp, 1.);
  vec2 brus = vec2(vn(q * 5. + t * .2), vn(q * 5. - t * .17 + 9.)) - .5;
  vec2 disp = v * .022 + brus * .006;
  vec4 d = texture(den, uv + disp);
  float kf = texture(korn, gl_FragCoord.xy / 256.).r, kg = texture(korn, gl_FragCoord.xy / 1800.).g;
  float yd = 1. - (uv.y + disp.y);
  float x = q.x;
  // Startscenen: vågorna gungar i halva takten, lugnt och harmoniskt (Max 2026-11-24). Introt i del 1 som förut.
  float tv = genom > .5 ? t * .5 : t;
  float niva = hav + (sin(x * 3.1 + tv * 1.05) * .011 + sin(x * 7.7 - tv * 1.6) * .0055 + (vn(vec2(x * 4., tv * .4)) - .5) * .012) * vag;
  float havF = clamp((yd - niva) * 34. + .5, 0., 1.6);
  float th = .5 + (kf - .5) * .24 + (kg - .5) * .14;
  // Formmasken: bläcket sätter sig i Sveriges och båtens skarpa form, men krusas fortfarande av fältet
  vec2 sp = vec2(uv.x + disp.x, 1. - uv.y - disp.y) * stage;
  float m1 = sveS > 0. ? mjuk(sp / stage).r : 0.;
  vec2 qq = sp - vec2(bxo, by) - piv; float cs = cos(ang), sn = sin(ang);
  vec2 lp = piv + vec2(qq.x * cs + qq.y * sn, -qq.x * sn + qq.y * cs);
  float m2 = 0.;
  // Målad båt: samma läge som masken men nästan utan vätskefältets krusning, så att ansiktena håller formen
  vec2 sp2 = vec2(uv.x + disp.x * .12, 1. - uv.y - disp.y * .12) * stage;
  vec2 q2 = sp2 - vec2(bxo, by) - piv; vec2 lp2 = piv + vec2(q2.x * cs + q2.y * sn, -q2.x * sn + q2.y * cs);
  vec2 bu = (lp2 - batR.xy) / batR.zw;
  vec4 bc = texture(batT, bu) * step(0., bu.x) * step(bu.x, 1.) * step(0., bu.y) * step(bu.y, 1.);
  vec2 ar = lp2 - armE; float ca = cos(armV), sa = sin(armV);
  vec2 au = (armE + vec2(ar.x * ca + ar.y * sa, -ar.x * sa + ar.y * ca) - armQ.xy) / armQ.zw;
  vec4 ac = texture(armT, au) * step(0., au.x) * step(au.x, 1.) * step(0., au.y) * step(au.y, 1.);
  // Thorkels vänsterarm med pipan (bara i startscenen): rätt ruta ur bildremsan
  vec2 pu = (lp2 - pipQ.xy) / pipQ.zw;
  vec4 pc = pipN > .5 ? texture(pipT, vec2((pipF + clamp(pu.x, 0., 1.)) / pipN, pu.y)) * step(0., pu.x) * step(pu.x, 1.) * step(0., pu.y) * step(pu.y, 1.) : vec4(0.);
  bc = pc + bc * (1. - pc.a);
  bc = (ac + bc * (1. - ac.a)) * malad * batS;
  if (batS > 0. && malad < .5) { m2 = mjuk(lp / stage).g; float u1 = armR / .3; float ad = min(min(seg(lp, armU.xy, armU.zw), seg(lp, arm.xy, arm.zw) + armR * .1), length(lp - arm.zw) - armR * .2);
    vec2 fd = normalize(arm.zw - arm.xy);
    for (int i = 0; i < 4; i++) { float fa = (float(i) - 1.5) * .42; vec2 dd = vec2(fd.x * cos(fa) - fd.y * sin(fa), fd.x * sin(fa) + fd.y * cos(fa)); ad = min(ad, seg(lp, arm.zw + dd * u1 * .3, arm.zw + dd * u1 * .85) + armR * .63); }
    m2 = max(m2, clamp((armR - ad) / 1.6 + .5, 0., 1.));
    // Små vinkstreck ovanför handen
    float mr = u1 * .13 * (.7 + .3 * abs(sin(t * 5.2)));
    float md = min(min(seg(lp, armU.zw + u1 * vec2(-.5, -3.2), armU.zw + u1 * vec2(-.62, -3.65)), seg(lp, armU.zw + u1 * vec2(.2, -3.35), armU.zw + u1 * vec2(.24, -3.85))), seg(lp, armU.zw + u1 * vec2(.85, -3.1), armU.zw + u1 * vec2(1.1, -3.5)));
    m2 = max(m2, clamp((mr - md) / 1.6 + .5, 0., 1.)); }
  float fr = mix(d.r, m1, sveS);
  float fb = mix(d.g, m2 * (1. - malad), batS);
  // Startscenen har varken prickar eller Sverige, bara hav, båt och text
  if (genom > .5) { fr = 0.; fb = 0.; }
  float a = kant(fr + havF, th);
  float b = kant(fb, th);
  // Startscenen: texten samplas utan vätskefältets krusning och utan korn i kanten, så att SVALLA blir skarp (Max 2026-11-23). Introt i del 1 är oförändrat.
  float tx = texture(txt, vec2(uv.x, 1. - uv.y) + disp * (genom > .5 ? 0. : .3)).a;
  // Startscenen: textens egen kantutjämning från duken används rakt av, så att bokstäverna blir lika skarpa som vanlig text (Max 2026-11-24)
  tx = (genom > .5 ? tx : smoothstep(.45, .55, tx + (kf - .5) * .1)) * smoothstep(0., .07, txtA * 1.12 - (kg * .7 + kf * .3));
  float ink = a;
  ink = max(ink, b); // båten smälter ihop med havet, inget vitt under den
  ink = mix(ink, 1. - ink, tx);
  float fld = 0.;
  for (int i = 0; i < 7; i++) { vec2 dq = gl_FragCoord.xy - drops[i].xy; fld += drops[i].z * drops[i].z / (dot(dq, dq) + 1.); }
  ink = mix(ink, 1. - ink, smoothstep(.8, 1.25, fld));
  vec3 farg = mix(vec3(1.), bla, ink);
  // Båten ligger över pappret och bläcket men bakom havet, så att skrovet sjunker ner i vattnet
  float synlig = 1. - kant(havF, th);
  farg = farg * (1. - bc.a * synlig) + bc.rgb * synlig;
  // Startscenen: pappret släpper igenom det som ligger bakom bilden
  float tack = 1. - (1. - ink) * (1. - bc.a * synlig);
  o = genom > .5 ? vec4(farg - (1. - tack), tack) : vec4(farg, 1.);
}`

type GL = WebGL2RenderingContext
function kompilera(gl: GL, vs: string, fs: string) {
  const sk = (typ: number, k: string) => { const s = gl.createShader(typ)!; gl.shaderSource(s, k); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader'); return s }
  const p = gl.createProgram()!
  gl.attachShader(p, sk(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sk(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'link')
  return p
}
function malYta(gl: GL, w: number, h: number) {
  const tex = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  const fb = gl.createFramebuffer()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  return { tex, fb, w, h }
}
function kornTextur(gl: GL) {
  const n = 256, d = new Uint8Array(n * n * 4)
  const gitter = (g: number, r: () => number) => Float32Array.from({ length: g * g }, () => r())
  const lager = (g: number, a: Float32Array, x: number, y: number) => {
    const fx = (x / n) * g, fy = (y / n) * g, x0 = Math.floor(fx), y0 = Math.floor(fy)
    const sx = fx - x0, sy = fy - y0, tx = sx * sx * (3 - 2 * sx), ty = sy * sy * (3 - 2 * sy)
    const at = (i: number, j: number) => a[(((j % g) + g) % g) * g + (((i % g) + g) % g)]!
    const l = (p: number, q: number, s: number) => p + (q - p) * s
    return l(l(at(x0, y0), at(x0 + 1, y0), tx), l(at(x0, y0 + 1), at(x0 + 1, y0 + 1), tx), ty)
  }
  const r = slump(11), fin = gitter(90, r), grov = gitter(12, r)
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = (y * n + x) * 4; d[i] = lager(90, fin, x, y) * 255; d[i + 1] = lager(12, grov, x, y) * 255; d[i + 3] = 255 }
  const tex = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, n, n, 0, gl.RGBA, gl.UNSIGNED_BYTE, d)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  return tex
}

/* Ljud: alltid avstängt tills man själv slår på det, och bara på dator (Max 2026-11-24).
   En riktig inspelning av vågor som kluckar mot en stenstrand (kvgarlic, freesound.org/s/326097, CC0),
   de första 65 sekunderna med mjuk övertoning så att slingan går runt utan skarv. Spelas med Web Audio för att slippa glapp. */
function skapaLjud() {
  const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)
  const ac = new AC()
  const ut = ac.createGain(); ut.gain.value = 0; ut.connect(ac.destination)
  let kalla: AudioBufferSourceNode | null = null, stangd = false
  fetch('/kreativ/hav-ljud.mp3')
    .then(r => r.arrayBuffer())
    .then(b => ac.decodeAudioData(b))
    .then(buf => {
      if (stangd) return
      const k = ac.createBufferSource(); k.buffer = buf; k.loop = true
      // mp3-filen har några millisekunder tystnad i början och slutet, slingan hoppar över dem
      k.loopStart = 0.03; k.loopEnd = Math.max(1, buf.duration - 0.03)
      k.connect(ut); k.start(0, 0.03); kalla = k
      ut.gain.setTargetAtTime(0.85, ac.currentTime, 1.2)
    })
    .catch(() => {})
  return {
    stang() { stangd = true; ut.gain.setTargetAtTime(0, ac.currentTime, 0.3); setTimeout(() => { try { kalla?.stop() } catch {} ac.close() }, 900) },
  }
}

/* Vägarna in från startscenen. Öar, boende, krogar, färjor, karta och aktiviteter finns redan i menyn ovanför,
   så scenen har bara två skyltar, en på var sida om båten (Max 2026-11-23). Båda leder till sidor som finns på Svalla. */
const SKYLTAR = [
  { id: 'samarbete', namn: 'Intresserad av samarbete?', href: '/partner' },
  { id: 'planera', namn: 'Planera din tur', href: '/planera-tur' },
] as const
// Startscenen hoppar över prickarna och Sverige och börjar när havet stiger (beslut Max 2026-11-22)
const VSTART = 6000

/* varld = startscenen (del 7): samma intro, men pappret är genomskinligt så att en ö, en fyr och en färja kan stiga upp bakom havet. */
type Tid = 'morgon' | 'dag' | 'kvall' | 'natt'
// Tiden i Sverige styr ljuset i startscenen (Max 2026-11-24)
const tidAv = (d: Date): Tid => {
  const t = Number(new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm', hour: 'numeric', hourCycle: 'h23' }).format(d))
  return t >= 5 && t < 10 ? 'morgon' : t >= 10 && t < 17 ? 'dag' : t >= 17 && t < 21 ? 'kvall' : 'natt'
}
export default function Intro({ efter, varld = false, dygn }: { efter?: () => void; varld?: boolean; dygn?: Tid }) {
  const scen = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const rokRef = useRef<HTMLCanvasElement>(null)
  const ejdRef = useRef<HTMLSpanElement>(null)
  const farjaRef = useRef<HTMLDivElement>(null)
  const ekaRef = useRef<HTMLImageElement>(null)
  const tid = useRef(varld ? VSTART : 0)
  const start = useRef(0)
  const [visT, setVisT] = useState(0)
  const [stod, setStod] = useState(true)
  const [ljud, setLjud] = useState(false)
  const [tips, setTips] = useState(true)
  const ljudRef = useRef<ReturnType<typeof skapaLjud> | null>(null)
  const sistaScen = useRef(-1)
  const utRef = useRef(0)
  const efterRef = useRef(efter)
  efterRef.current = efter
  const [gar, setGar] = useState(false)
  const [nuTid, setNuTid] = useState<Tid>('dag')
  useEffect(() => {
    if (!varld) return
    const satt = () => setNuTid(tidAv(new Date()))
    satt(); const iv = window.setInterval(satt, 5 * 60 * 1000)
    return () => window.clearInterval(iv)
  }, [varld])
  const tidNu = dygn ?? nuTid
  const nav = useRef({ x: 0, v: 0, svans: 0 })
  const [navPos, setNavPos] = useState({ x: 0, svans: 0, hav: 1.2, bredd: 600 })

  const hoppa = (ms: number) => { tid.current = ms; start.current = performance.now() - ms }

  useEffect(() => { const k = setTimeout(() => setTips(false), 4900); return () => clearTimeout(k) }, [])

  useEffect(() => {
    const el = scen.current, cv = canvas.current
    if (!el || !cv) return
    const gl = cv.getContext('webgl2', { antialias: false, premultipliedAlpha: varld, alpha: varld })
    if (!gl) { setStod(false); return }
    const minskad = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let pPunkt: WebGLProgram, pSudd: WebGLProgram, pFlode: WebGLProgram, pBild: WebGLProgram
    try {
      pPunkt = kompilera(gl, VS_PUNKT, FS_PUNKT); pSudd = kompilera(gl, VS_YTA, FS_SUDD)
      pFlode = kompilera(gl, VS_YTA, FS_FLODE); pBild = kompilera(gl, VS_YTA, FS_BILD)
    } catch { setStod(false); return }

    const tri = gl.createVertexArray()!; gl.bindVertexArray(tri)
    const tb = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, tb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    for (const p of [pSudd, pFlode, pBild]) { const l = gl.getAttribLocation(p, 'aP'); if (l >= 0) { gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0) } }
    const korn = kornTextur(gl)
    const txtTex = gl.createTexture()!

    let W = 0, H = 0, DPR = 1, N = 0, NB = 0
    const ejdPx = new Uint8Array(4 * 256), ejdY: number[] = []
    let farjaY: number | undefined
    let dens = malYta(gl, 2, 2), sudd1 = malYta(gl, 2, 2), sudd2 = malYta(gl, 2, 2)
    let flA = malYta(gl, 2, 2), flB = malYta(gl, 2, 2)
    let data = new Float32Array(0)
    let pkt: WebGLVertexArrayObject | null = null, pb: WebGLBuffer | null = null
    let fran: Record<'prick' | 'sve' | 'bat' | 'dyn' | 'hav', Float32Array> = { prick: new Float32Array(0), sve: new Float32Array(0), bat: new Float32Array(0), dyn: new Float32Array(0), hav: new Float32Array(0) }
    let attr = { droppT: new Float32Array(0), r: new Float32Array(0), size: new Float32Array(0), size0: new Float32Array(0), vikt: new Float32Array(0) }
    const formTex = gl.createTexture()!
    // Målade bildlager. Tills de är laddade är de en genomskinlig punkt.
    let maladKlar = 0
    const laddaBild = (src: string) => {
      const tex = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4))
      const im = new Image()
      im.onload = () => {
        if (gl.isContextLost()) return
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        maladKlar++
      }
      im.src = src
      return tex
    }
    const batTex = laddaBild(varld ? THORKEL.bat : MALAD.bat), armTex = laddaBild(varld ? THORKEL.arm : MALAD.arm), pipTex = varld ? laddaBild(THORKEL.pipa) : armTex
    // Röken ur pipan och munnen ritas på en egen duk ovanpå, i samma läge som båten
    const rok: { x: number; y: number; vx: number; vy: number; r: number; t0: number; liv: number }[] = []
    let rokSpawn = 0, sistaBlas = -1
    let batRuta = { bw: 0, bh: 0 }

    // Texten: egen mask i full skärpa. Egen funktion så att den kan ritas om när typsnittet har laddats.
    const ritaText = () => {
        const tc = document.createElement('canvas'); tc.width = cv.width; tc.height = cv.height
        const c = tc.getContext('2d')!
        c.scale(DPR, DPR); c.fillStyle = '#000'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'
        // Startscenen: alltid Playfair Display, även på sidor utan .kr-rubrik (Max 2026-11-24). Introt i del 1 som förut.
        const serif = varld ? "'Playfair Display', Georgia, serif" : getComputedStyle(document.querySelector('.kr h2') ?? document.body).fontFamily || 'Georgia, serif'
        const sans = getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif'
        const stor = Math.min(W * 0.11, H * 0.12)
        c.font = `700 ${stor}px ${serif}`
        const ls = c as unknown as { letterSpacing?: string }
        // Startscenen: "Skärgården börjar här" som rubrik i halva SVALLA-storleken, med en rad om vilka Svalla är till för (Max 2026-11-26).
        // Loggan i menyraden visar redan SVALLA. Introt i del 1 är oförändrat.
        // I startscenen ritas rubriken och raden under som HTML (.ki-rubrik) i sajtens typsnittstråd: Playfair 700 i rubrikfärgen, Inter 400 i brödtextfärgen (Max 2026-11-26)
        if (!varld) {
        // SVALLA med optiskt jämn luft (Max 2026-11-25): mellanrum per par S–V, V–A, A–L, L–L och L–A i em,
        // uppmätt mot bläcket i Playfair Display 700 så att alla mellanrum ser lika stora ut. En bokstav i taget.
        if ('letterSpacing' in c) ls.letterSpacing = '0px'
        const LUFT = [-0.01, -0.09, 0.04, 0.05, 0.04]
        const bokst = 'SVALLA'.split('')
        const steg = bokst.map((b, i) => c.measureText(b).width + (i < 5 ? stor * (LUFT[i] ?? 0) : 0))
        let tx = W / 2 - steg.reduce((a, b) => a + b, 0) / 2
        c.textAlign = 'left'
        bokst.forEach((b, i) => { c.fillText(b, tx, H * 0.2); tx += steg[i] ?? 0 })
        c.textAlign = 'center'
        c.font = `700 ${Math.max(10, stor * 0.17)}px ${sans}`
        if ('letterSpacing' in c) ls.letterSpacing = `${stor * 0.05}px`
        c.fillText('SKÄRGÅRDEN BÖRJAR HÄR', W / 2, H * 0.2 + stor * 0.42)
        }
        gl.bindTexture(gl.TEXTURE_2D, txtTex)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    const bygg = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1)
      // aldrig noll: en dold eller ännu inte utlagd scen ger annars en tom duk som kraschar sidan
      W = Math.max(8, el.clientWidth); H = Math.max(8, el.clientHeight)
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR)
      const hw = Math.max(2, Math.round(cv.width / 2)), hh = Math.max(2, Math.round(cv.height / 2))
      dens = malYta(gl, hw, hh); sudd1 = malYta(gl, hw, hh); sudd2 = malYta(gl, hw, hh)
      const fw = 128, fh = Math.max(32, Math.round((128 * H) / W))
      flA = malYta(gl, fw, fh); flB = malYta(gl, fw, fh)
      gl.bindFramebuffer(gl.FRAMEBUFFER, flA.fb); gl.clearColor(0.5, 0.5, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindFramebuffer(gl.FRAMEBUFFER, flB.fb); gl.clear(gl.COLOR_BUFFER_BIT)

      N = W < 700 ? 5200 : 8200
      NB = Math.round(N * 0.3)
      const r = slump(7)
      const ytan = W * H
      const bas = Math.sqrt(ytan / N) * 2.6
      // Prickar: stänk av målarfärg. Några större droppar med små satelliter runt, och fina prickar utspridda.
      const md = Math.min(W, H * 1.6)
      type Dr = { x: number; y: number; rx: number; ry: number; rot: number; t: number }
      const droppar: Dr[] = []
      const huvud = W < 700 ? 6 : 8
      for (let i = 0; i < huvud; i++) {
        const rad = (0.03 + r() * r() * 0.05) * md
        const d: Dr = { x: (0.1 + r() * 0.8) * W, y: (0.14 + r() * 0.54) * H, rx: rad, ry: rad * (0.68 + r() * 0.3), rot: r() * Math.PI, t: 160 + i * 240 + r() * 90 }
        droppar.push(d)
        const sat = 3 + Math.floor(r() * 4)
        for (let s = 0; s < sat; s++) {
          const a = r() * Math.PI * 2, avst = rad * (1.3 + r() * 1.2), sr = rad * (0.1 + r() * r() * 0.26)
          droppar.push({ x: d.x + Math.cos(a) * avst, y: d.y + Math.sin(a) * avst, rx: sr, ry: sr, rot: 0, t: d.t + 50 + r() * 170 })
        }
      }
      const vikter = droppar.map(d => Math.max(d.rx * d.ry, 30)); const summa = vikter.reduce((a, b) => a + b, 0)
      const prick = new Float32Array(N * 2), droppT = new Float32Array(N), rr = new Float32Array(N), size = new Float32Array(N), size0 = new Float32Array(N), vikt = new Float32Array(N)
      const NS = W < 700 ? 50 : 80 // fina prickar, en partikel var
      for (let i = 0; i < N; i++) {
        rr[i] = r(); size[i] = bas * (0.75 + r() * 0.6)
        if (i >= N - NS) {
          prick[i * 2] = (0.05 + r() * 0.9) * W; prick[i * 2 + 1] = (0.08 + r() * 0.7) * H
          droppT[i] = 300 + r() * 2000; size0[i] = bas * (0.2 + r() * 0.22); vikt[i] = 3.2
          continue
        }
        let v = r() * summa, k = 0
        while (k < droppar.length - 1 && v > vikter[k]!) { v -= vikter[k]!; k++ }
        const d = droppar[k]!, a = r() * Math.PI * 2, ra = Math.sqrt(r())
        const lx = Math.cos(a) * ra * d.rx, ly = Math.sin(a) * ra * d.ry, cs = Math.cos(d.rot), sn = Math.sin(d.rot)
        prick[i * 2] = d.x + lx * cs - ly * sn; prick[i * 2 + 1] = d.y + lx * sn + ly * cs
        droppT[i] = d.t + r() * 110; size0[i] = bas * (0.5 + r() * 0.3); vikt[i] = 1
      }
      // Sverige: kontur från Natural Earth, inpassad i scenen
      const k = Math.cos((62 * Math.PI) / 180)
      const alla = SVERIGE.flat()
      const xs = alla.map(p => p[0] * k), ys = alla.map(p => -p[1])
      const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
      const sk = Math.min((W * 0.5) / (x1 - x0), (H * 0.8) / (y1 - y0))
      const ox = W / 2 - ((x0 + x1) / 2) * sk, oy = H * 0.5 - ((y0 + y1) / 2) * sk
      const ritaSverige = (c: CanvasRenderingContext2D) => { for (const ring of SVERIGE) { c.beginPath(); ring.forEach((p, j) => { const px = p[0] * k * sk + ox, py = -p[1] * sk + oy; if (j) c.lineTo(px, py); else c.moveTo(px, py) }); c.closePath(); c.fill() } }
      const sve = provForm(W, H, N, ritaSverige, r)
      // Båten
      // Startscenen i mobilen: båten en tredjedel mindre så att knapparna får plats bredvid seglen (Max 2026-11-23). Introt i del 1 är oförändrat.
      // Startscenen: båten med Thorkel och tjejen högst 42 % av scenhöjden, så att den följer med när heron blir lägre (Max 2026-11-24)
      const bw = Math.min(W * (W < 700 ? (varld ? 0.39 : 0.58) : 0.3), H * (varld ? 0.42 : 0.5)), bh = (bw * BAT_H) / BAT_B
      batRuta = { bw, bh }
      const bat = provForm(W, H, N, c => ritaBat(c, (W - bw) / 2, (H - bh) / 2, bw), r)
      // Formmasken i full upplösning: röd kanal Sverige, grön kanal båten (utan armen, den ritas i shadern)
      {
        const ny = (): [HTMLCanvasElement, CanvasRenderingContext2D] => { const k2 = document.createElement('canvas'); k2.width = cv.width; k2.height = cv.height; const x2 = k2.getContext('2d')!; x2.scale(cv.width / W, cv.height / H); return [k2, x2] }
        const [mc, c] = ny(), [bc, b] = ny()
        c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#000'; c.fillRect(0, 0, mc.width, mc.height); c.restore()
        c.fillStyle = 'rgb(255,0,0)'; ritaSverige(c)
        b.fillStyle = 'rgb(0,255,0)'; ritaBat(b, (W - bw) / 2, (H - bh) / 2, bw, false)
        c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'lighter'; c.drawImage(bc, 0, 0)
        gl.bindTexture(gl.TEXTURE_2D, formTex)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mc)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      }
      // Dyning under båten och havet
      const dyn = new Float32Array(N * 2), hav = new Float32Array(N * 2)
      for (let i = 0; i < N; i++) {
        dyn[i * 2] = r() * W; dyn[i * 2 + 1] = H * (0.9 + r() * 0.12)
        hav[i * 2] = r() * W; hav[i * 2 + 1] = H * (0.66 + r() * 0.38)
      }
      fran = { prick, sve, bat, dyn, hav }
      attr = { droppT, r: rr, size, size0, vikt }
      data = new Float32Array(N * 5)
      if (!pkt) {
        pkt = gl.createVertexArray()!; gl.bindVertexArray(pkt)
        pb = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, pb)
        const st = 5 * 4
        const lk = (n: string, s: number, off: number) => { const l = gl.getAttribLocation(pPunkt, n); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, s, gl.FLOAT, false, st, off * 4) }
        lk('aPos', 2, 0); lk('aSize', 1, 2); lk('aAlpha', 1, 3); lk('aGroup', 1, 4)
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, pb); gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW)

      ritaText()
    }
    bygg()
    let bygger = 0
    // Bygg om först när storleken har slutat ändras. Medan fönstret dras sträcks den gamla duken med CSS,
    // annars byggs alla masker och texturer om varje bildruta och heron hackar (Max 2026-11-25).
    const ro = new ResizeObserver(() => {
      if (Math.max(8, el.clientWidth) === W && Math.max(8, el.clientHeight) === H) return
      clearTimeout(bygger); bygger = window.setTimeout(bygg, 180)
    })
    // Rita om texten när Playfair Display har laddats, annars kan SVALLA hamna i ett reservtypsnitt
    let lever = true
    if (varld && document.fonts) document.fonts.load("700 64px 'Playfair Display'").then(() => { if (lever && W > 8) ritaText() }).catch(() => {})
    ro.observe(el)

    // Bilden reagerar inte på musen (beslut Max 2026-11-21). Vätskefältet rör sig av sig självt.

    const u = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n)
    const pass = (p: WebGLProgram, mal: { fb: WebGLFramebuffer; w: number; h: number } | null) => {
      gl.useProgram(p); gl.bindFramebuffer(gl.FRAMEBUFFER, mal ? mal.fb : null)
      gl.viewport(0, 0, mal ? mal.w : cv.width, mal ? mal.h : cv.height)
      gl.bindVertexArray(tri)
    }

    let raf = 0, forra = performance.now(), klarUt = false
    start.current = performance.now() - tid.current
    if (minskad) { tid.current = SLUT; start.current = performance.now() - SLUT }

    const ruta = (nu: number) => {
      const dt = Math.min(0.05, (nu - forra) / 1000); forra = nu
      // window.__kiFrys = millisekunder låser tiden (bara för test och skärmbilder)
      const frys = (window as unknown as { __kiFrys?: number }).__kiFrys
      const t = typeof frys === 'number' ? frys : minskad ? SLUT : Math.min(nu - start.current, SLUT + 600000)
      tid.current = t
      const T = Math.max(varld ? VSTART : 0, Math.min(t, SLUT))
      const sek = minskad ? 0 : nu / 1000

      // Scenernas förlopp
      const sc = SCENER.reduce((a, s, i) => (T >= s.fran ? i : a), 0)
      if (sc !== sistaScen.current) { sistaScen.current = sc }
      // Gå in på Svalla: havet stiger och fyller hela bilden, sedan lämnar vi över
      const ut = utRef.current ? klamp((nu - utRef.current) / 950) : 0
      if (ut >= 1 && !klarUt) { klarUt = true; efterRef.current?.() }
      // Havet lägger sig först. Sedan seglar båten in från höger och stannar på sin plats (beslut Max 2026-11-21).
      const havNiva = 1.18 - 0.54 * ease((T - 5300) / 2300) - ut * ut * 1.6
      const batNer = 1
      const segl = 1 - klamp((T - 7600) / 2800)
      const batIn = segl * segl * segl * (W / 2 + batRuta.bw / 2 + 60)
      // Båten gungar i samma lugna takt som vågorna i startscenen
      const gs = varld ? sek * 0.55 : sek
      const bob = Math.sin(gs * 1.4) * H * 0.008, vink = Math.sin(gs * 1.1) * 0.045
      const vattenlinje = havNiva * H
      const batY = (H - batRuta.bh) / 2
      const malY = vattenlinje - batRuta.bh * 0.8 - batY
      const pivX = W / 2, pivY = H / 2 + batRuta.bh * 0.3

      const f = fran, A = attr
      for (let i = 0; i < N; i++) {
        const j = i * 2, rnd = A.r[i]!, bat = i < NB
        const syns = klamp((T - A.droppT[i]!) / 380)
        let x = f.prick[j]!, y = f.prick[j + 1]!
        const fordrojd = (fr: number) => ease((T - fr - rnd * 650) / 1500)
        const e1 = fordrojd(2600)
        x += (f.sve[j]! - x) * e1; y += (f.sve[j + 1]! - y) * e1
        const e2 = fordrojd(5200)
        const tx = bat ? f.bat[j]! : f.dyn[j]!, ty = bat ? f.bat[j + 1]! : f.dyn[j + 1]!
        x += (tx - x) * e2; y += (ty - y) * e2
        if (bat) {
          const by = malY * batNer + bob * e2
          const dx = x - pivX, dy = y - pivY, cs = Math.cos(vink * e2), sn = Math.sin(vink * e2)
          x = pivX + dx * cs - dy * sn + batIn * e2; y = pivY + dx * sn + dy * cs + by * e2
        } else {
          const e3 = fordrojd(5600)
          x += (f.hav[j]! - x) * e3; y += (f.hav[j + 1]! * (havNiva / 0.64) - y) * e3
        }
        const bage = Math.sin(e1 * Math.PI) + Math.sin(e2 * Math.PI)
        x += Math.sin(sek * 0.9 + rnd * 40) * 1.4 + (rnd - 0.5) * bage * 38
        y += Math.cos(sek * 0.7 + rnd * 30) * 1.4 + Math.sin(rnd * 9) * bage * 26
        const o = i * 5
        data[o] = x; data[o + 1] = y
        const s0 = A.size0[i]! + (A.size[i]! - A.size0[i]!) * e1
        data[o + 2] = s0 * (0.35 + 0.65 * ease(syns)) * (1 + 0.25 * (1 - syns))
        data[o + 3] = syns * (1 + (A.vikt[i]! - 1) * (1 - e1))
        data[o + 4] = bat ? 1 : 0
      }

      // 1. Vätskefältet
      pass(pFlode, flB)
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, flA.tex); gl.uniform1i(u(pFlode, 'v'), 0)
      gl.uniform2f(u(pFlode, 'm'), 0.5, 0.5); gl.uniform2f(u(pFlode, 'md'), 0, 0)
      gl.uniform1f(u(pFlode, 'asp'), W / H); gl.uniform1f(u(pFlode, 't'), sek); gl.uniform1f(u(pFlode, 'dt'), dt)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      ;[flA, flB] = [flB, flA]

      // 2. Täthet: partiklarna som mjuka fläckar
      gl.useProgram(pPunkt); gl.bindFramebuffer(gl.FRAMEBUFFER, dens.fb); gl.viewport(0, 0, dens.w, dens.h)
      gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE)
      gl.bindVertexArray(pkt); gl.bindBuffer(gl.ARRAY_BUFFER, pb); gl.bufferSubData(gl.ARRAY_BUFFER, 0, data)
      gl.uniform2f(u(pPunkt, 'uStage'), W, H); gl.uniform1f(u(pPunkt, 'uScale'), DPR * 0.5)
      gl.uniform1f(u(pPunkt, 'uBoatMix'), klamp((T - 5500) / 900))
      gl.drawArrays(gl.POINTS, 0, N)
      gl.disable(gl.BLEND)

      // 3. Oskärpa i två riktningar
      pass(pSudd, sudd1); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, dens.tex); gl.uniform1i(u(pSudd, 't'), 0)
      gl.uniform2f(u(pSudd, 'dir'), 1.6 / dens.w, 0); gl.drawArrays(gl.TRIANGLES, 0, 3)
      pass(pSudd, sudd2); gl.bindTexture(gl.TEXTURE_2D, sudd1.tex); gl.uniform2f(u(pSudd, 'dir'), 0, 1.6 / dens.h); gl.drawArrays(gl.TRIANGLES, 0, 3)

      // 4. Bilden: tröskel, korn, hav, båt och text, två färger
      pass(pBild, null)
      const bind = (n: string, enhet: number, tex: WebGLTexture) => { gl.activeTexture(gl.TEXTURE0 + enhet); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(u(pBild, n), enhet) }
      bind('den', 0, sudd2.tex); bind('vel', 1, flA.tex); bind('korn', 2, korn); bind('txt', 3, txtTex)
      gl.uniform2f(u(pBild, 'res'), cv.width, cv.height); gl.uniform1f(u(pBild, 't'), sek)
      gl.uniform1f(u(pBild, 'hav'), havNiva); gl.uniform1f(u(pBild, 'vag'), 0.4 + 0.6 * ease((T - 5800) / 1500))
      gl.uniform1f(u(pBild, 'txtA'), ease((T - 8300) / 1700)); gl.uniform3f(u(pBild, 'bla'), (varld ? BLA_VARLD : BLA)[0]!, (varld ? BLA_VARLD : BLA)[1]!, (varld ? BLA_VARLD : BLA)[2]!)
      // Formmasken och båtens läge (samma rörelse som partiklarna), armen vinkar
      bind('form', 4, formTex)
      gl.uniform2f(u(pBild, 'stage'), W, H)
      gl.uniform1f(u(pBild, 'sveS'), klamp((T - 3700) / 800) * (1 - klamp((T - 5150) / 350)))
      gl.uniform1f(u(pBild, 'batS'), klamp((T - 7300) / 300))
      gl.uniform1f(u(pBild, 'bxo'), batIn)
      const eSen = ease((T - 5200 - 650) / 1500)
      gl.uniform2f(u(pBild, 'piv'), pivX, pivY); gl.uniform1f(u(pBild, 'ang'), vink * eSen); gl.uniform1f(u(pBild, 'by'), malY * batNer + bob * eSen)
      {
        const kk = batRuta.bw / BAT_B, bx = (W - batRuta.bw) / 2, byy = (H - batRuta.bh) / 2
        const P = (uu: number, vv: number) => [bx + (uu + BAT_DX) * kk, byy + (vv + BAT_DY) * kk] as const
        const [ax, ay] = P(ARM.axel[0], ARM.axel[1]), [sx, sy] = P(ARM.armbage[0], ARM.armbage[1]), [hx0, hy0] = P(ARM.hand[0], ARM.hand[1])
        const va = minskad ? 0 : 0.1 + Math.sin(sek * 5.2) * 0.34, dxa = hx0 - sx, dya = hy0 - sy
        gl.uniform4f(u(pBild, 'arm'), sx, sy, sx + dxa * Math.cos(va) - dya * Math.sin(va), sy + dxa * Math.sin(va) + dya * Math.cos(va))
        gl.uniform4f(u(pBild, 'armU'), ax, ay, sx, sy)
        gl.uniform1f(u(pBild, 'armR'), ARM.r * kk)
        // Målad båt: rutan, underarmens ruta, armbågen och vinkningen
        const pk = kk / MALAD.pe, vx = bx - 2 * kk
        bind('batT', 5, batTex); bind('armT', 6, armTex); bind('pipT', 7, pipTex)
        const pf = varld && !minskad ? pipRuta(sek) : 0
        gl.uniform4f(u(pBild, 'pipQ'), vx + THORKEL.ruta[0] * pk, byy + THORKEL.ruta[1] * pk, THORKEL.ruta[2] * pk, THORKEL.ruta[3] * pk)
        gl.uniform1f(u(pBild, 'pipF'), pf); gl.uniform1f(u(pBild, 'pipN'), varld ? THORKEL.n : 0)
        const rc = rokRef.current
        if (varld && rc) {
          if (rc.width !== Math.round(W * DPR) || rc.height !== Math.round(H * DPR)) { rc.width = Math.round(W * DPR); rc.height = Math.round(H * DPR) }
          const cx = rc.getContext('2d')
          if (cx) {
            const an = vink * eSen, cs = Math.cos(an), sn = Math.sin(an), oy = malY * batNer + bob * eSen
            // båtbildens punkt till skärmen (samma omvandling som i skuggningen, baklänges)
            const till = (bx2: number, by2: number) => { const lx = vx + bx2 * pk - pivX, ly = byy + by2 * pk - pivY; return [lx * cs - ly * sn + batIn + pivX, lx * sn + ly * cs + oy + pivY] as const }
            const nuS = nu / 1000, c7 = sek % PIPA.period, blas = PIPA.lyft + PIPA.upp + PIPA.hall + 0.1
            if (!minskad && T > 9000) {
              if (nuS - rokSpawn > 0.22) { rokSpawn = nuS; const [x0, y0] = till(...(THORKEL.skal[pf] as unknown as [number, number])); rok.push({ x: x0, y: y0, vx: 0.15 * kk, vy: -0.75 * kk, r: 0.1 * kk, t0: nuS, liv: 2.6 }) }
              const cyk = Math.floor(sek / PIPA.period)
              if (c7 > blas && c7 < blas + 0.9 && Math.floor(c7 * 14) !== sistaBlas) { sistaBlas = Math.floor(c7 * 14); const [mx, my] = till(THORKEL.mun[0], THORKEL.mun[1]); rok.push({ x: mx, y: my, vx: (0.9 + Math.random() * 0.4) * kk, vy: (-0.35 - Math.random() * 0.3) * kk, r: (0.16 + Math.random() * 0.08) * kk, t0: nuS, liv: 2.2 }) }
              void cyk
            }
            cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.clearRect(0, 0, W, H)
            for (let i = rok.length - 1; i >= 0; i--) {
              const p = rok[i]!, al = (nuS - p.t0) / p.liv
              if (al >= 1) { rok.splice(i, 1); continue }
              p.x += (p.vx + Math.sin((nuS + i) * 2.1) * 0.12 * kk) * dt; p.y += p.vy * dt; p.vx *= 0.995
              const r = p.r * (1 + 2.2 * al), a = 0.6 * (1 - al) * Math.min(1, al * 6)
              cx.beginPath(); cx.arc(p.x, p.y, r, 0, Math.PI * 2)
              cx.fillStyle = `rgba(238,242,248,${a})`; cx.fill(); cx.lineWidth = 1.4; cx.strokeStyle = `rgba(31,90,168,${a * 0.35})`; cx.stroke()
            }
          }
        }
        gl.uniform4f(u(pBild, 'batR'), vx, byy, 30 * kk, 25 * kk)
        gl.uniform4f(u(pBild, 'armQ'), vx + MALAD.armRuta[0] * pk, byy + MALAD.armRuta[1] * pk, MALAD.armRuta[2] * pk, MALAD.armRuta[3] * pk)
        gl.uniform2f(u(pBild, 'armE'), vx + MALAD.armbage[0] * pk, byy + MALAD.armbage[1] * pk)
        gl.uniform1f(u(pBild, 'armV'), minskad ? 0 : 0.06 + Math.sin(sek * 5.2) * 0.3)
        gl.uniform1f(u(pBild, 'malad'), maladKlar >= 2 ? 1 : 0)
        gl.uniform1f(u(pBild, 'genom'), varld ? 1 : 0)
      }
      // Tidslinjen som flytande droppar: en aktiv droppe med släpande svans
      const mal = Math.min(SCENER.length - 1, sc + klamp((T - SCENER[sc]!.fran) / ((SCENER[sc + 1]?.fran ?? SLUT) - SCENER[sc]!.fran)))
      const nv = nav.current
      nv.v += (mal - nv.x) * 0.08; nv.v *= 0.72; nv.x += nv.v; nv.svans += (nv.x - nv.svans) * 0.04
      const navB = W < 560 ? W - 32 : W - 32 - 220
      const px = (i: number) => (16 + NAV_KANT + (i / (SCENER.length - 1)) * (navB - 2 * NAV_KANT)) * DPR
      const py = 38 * DPR
      const dr = new Float32Array(21)
      for (let i = 0; i < 5; i++) { dr[i * 3] = px(i); dr[i * 3 + 1] = py; dr[i * 3 + 2] = (Math.abs(nv.x - i) < 0.6 ? 5 : 3.2) * DPR }
      dr[15] = px(nv.x); dr[16] = py; dr[17] = 7 * DPR
      dr[18] = px(nv.svans); dr[19] = py; dr[20] = (3 + Math.min(6, Math.abs(nv.x - nv.svans) * 9)) * DPR
      if (ut > 0) for (let i = 2; i < 21; i += 3) dr[i] = 0
      if (varld) for (let i = 0; i < dr.length; i++) dr[i] = 0
      gl.uniform3fv(u(pBild, 'drops'), dr)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      // Ejdrarna simmar sakta framåt och ligger alltid på vattenytan (Max 2026-11-24). Vågformeln ger ett första läge,
      // sedan läses den riktiga ytan av ur den nyss ritade bilden (en smal pixelkolumn per fågel), så att de aldrig hamnar under ytan.
      const ejd = ejdRef.current
      if (varld && ejd) {
        const vagA = 0.4 + 0.6 * ease((T - 5800) / 1500), tvv = sek * 0.5
        const yta = (px: number) => { const xq = px / H; return (havNiva + (Math.sin(xq * 3.1 + tvv * 1.05) * 0.011 + Math.sin(xq * 7.7 - tvv * 1.6) * 0.0055) * vagA) * H }
        // Simmar över hela scenen, från strax utanför högerkanten till strax utanför vänsterkanten, så att de
        // tonas in och ut utanför bild och aldrig försvinner mitt i vattnet vid bryggan (Max 2026-11-26)
        const span = W * 1.2, start = W * 1.1, fart = W * 0.0042
        const fonster = Math.min(256, Math.round(36 * DPR)), cw = cv.width, ch = cv.height
        // Läser av var havet faktiskt börjar i en smal pixelkolumn kring x (formeln ger startgissningen)
        const lasYta = (cx: number) => {
          let y = yta(cx)
          const kx = Math.round(cx * DPR)
          if (kx >= 0 && kx < cw) {
            const topp = Math.max(0, Math.round((y * DPR) - fonster / 2)), n = Math.min(fonster, ch - topp)
            if (n > 4) {
              gl.readPixels(kx, ch - topp - n, 1, n, gl.RGBA, gl.UNSIGNED_BYTE, ejdPx)
              // Raderna kommer nerifrån och upp. Leta uppifrån efter första raden som är hav (täckande).
              for (let r = n - 1; r >= 0; r--) { if (ejdPx[r * 4 + 3]! > 140) { y = (topp + (n - 1 - r)) / DPR; break } }
            }
          }
          // Thorkels båt ritas i samma bild. Hamnar avläsningen längre bort än vågorna kan gå har vi träffat båten, då gäller formeln.
          const form = yta(cx)
          return Math.abs(y - form) > H * 0.012 ? form : y
        }
        // Ångbåten gungar mjukt med vågornas rörelse, annars sväljer vågorna skrovet i mobilen där båten är liten (Max 2026-11-24).
        // Bara vågformeln, ingen pixelavläsning: Thorkels båt ligger i samma bild och fick ångbåten att hoppa när den passerade bakom.
        const farja = farjaRef.current
        if (farja && farja.offsetWidth > 0) {
          const fr = farja.getBoundingClientRect(), cr = cv.getBoundingClientRect()
          const cx = (fr.left + fr.right) / 2 - cr.left
          let y = yta(cx)
          farjaY = farjaY === undefined ? y : farjaY + (y - farjaY) * 0.35
          y = farjaY
          const lut = Math.atan2(yta(cx + 6) - yta(cx - 6), 12)
          farja.style.translate = `0 ${(y - havNiva * H).toFixed(1)}px`
          farja.style.rotate = `${lut.toFixed(3)}rad`
        }
        // Ekan vid bryggan gungar med samma vågor, i stället för i en egen takt som ibland lät vågorna svälja den (Oskar 2026-11-24)
        const eka = ekaRef.current
        if (eka && eka.offsetWidth > 0) {
          const er = eka.getBoundingClientRect(), cr = cv.getBoundingClientRect()
          const cx = (er.left + er.right) / 2 - cr.left
          eka.style.translate = `0 ${(yta(cx) - havNiva * H).toFixed(1)}px`
          eka.style.rotate = `${Math.atan2(yta(cx + 6) - yta(cx - 6), 12).toFixed(3)}rad`
        }
        for (let k = 0; k < ejd.children.length; k++) {
          const el = ejd.children[k] as HTMLElement
          const w = el.offsetWidth, h = el.offsetHeight
          const efter = k === 0 ? 0 : W * 0.006 + k * W * 0.017
          const pos = (((sek * fart + W * 0.12 - efter) % span) + span) % span
          const x = start - pos, cx = x + w / 2
          let y = lasYta(cx)
          const fore = ejdY[k]
          y = fore === undefined ? y : fore + (y - fore) * 0.35
          ejdY[k] = y
          const lut = Math.atan2(yta(cx + 4) - yta(cx - 4), 8)
          // Ligger lite högre i vattnet än förut, så att de inte försvinner i vågorna (Oskar 2026-11-24)
          const djup = k === 0 ? 0.66 : 0.68
          el.style.transform = `translate(${x.toFixed(1)}px, ${(y - h * djup).toFixed(1)}px) rotate(${lut.toFixed(3)}rad)`
          el.style.opacity = String(klamp(Math.min(pos, span - pos) / (span * 0.05)))
        }
      }
      if (Math.round(nu / 33) % 2 === 0) { setVisT(T); setNavPos({ x: nv.x, svans: nv.svans, hav: havNiva, bredd: navB }) }
      raf = requestAnimationFrame(ruta)
    }
    raf = requestAnimationFrame(ruta)
    return () => { lever = false; cancelAnimationFrame(raf); clearTimeout(bygger); ro.disconnect(); }
  }, [])

  useEffect(() => () => ljudRef.current?.stang(), [])
  const vaxlaLjud = () => {
    if (ljud) { ljudRef.current?.stang(); ljudRef.current = null; setLjud(false) }
    else { try { ljudRef.current = skapaLjud(); setLjud(true); setTips(false) } catch { setLjud(false) } }
  }

  const visaIn = visT >= SCENER[4]!.fran

  if (!stod) {
    return (
      <div className="ki-scen ki-reserv" ref={scen}>
        <div className="ki-reserv-hav" />
        <p>Svalla · Skärgården börjar här</p>
      </div>
    )
  }

  return (
    <div className={(gar ? 'ki-scen ki-gar' : 'ki-scen') + (varld ? ' ki-scen-varld ki-tid-' + tidNu : '')} ref={scen}>
      {varld && (
        <div className={visT >= 9800 ? 'ki-varld syns' : 'ki-varld'} aria-hidden="true">
          {/* En varm målad sol uppe i vänstra hörnet (Max 2026-11-24) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-v-sol" src="/kreativ/scen-sol.webp" alt="" />
          {/* Ön med midsommarstång och flagga, ångbåten som pustar rök, fyren och bastuflotten (Max 2026-11-22) */}
          {/* Ön med västkusthusen ligger bakom. Bastun står på klippan vid öns högra kant, med en stege ner i vattnet, och ångbåten åker från höger till vänster genom bilden, om och om igen (Max 2026-11-23) */}
          <div className="ki-v ki-v-vastkust">
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-v-bild" src="/kreativ/scen-vastkust.webp" alt="" />
            {/* Kväll och natt: samma bild med tända fönster tonar in (Max 2026-11-24) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-v-bild ki-v-kvall" src="/kreativ/scen-vastkust-kvall.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-tuva ki-tuva-v1" src="/kreativ/scen-tuva.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-tuva ki-tuva-v2" src="/kreativ/scen-tuva.webp" alt="" />
          </div>
          <div className="ki-v ki-v-o">
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-v-bild" src="/kreativ/scen-o.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-v-bild ki-v-kvall" src="/kreativ/scen-o-kvall.webp" alt="" />
            {/* Gräs med prästkragar på en liten tuva vid stugan, så det står på land, och en eka förtöjd vid bryggan (Max 2026-11-24) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-tuva ki-tuva-o1" src="/kreativ/scen-tuva.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-tuva ki-tuva-o2" src="/kreativ/scen-tuva.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-v-eka" ref={ekaRef} src="/kreativ/scen-eka.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-v-stang" src="/kreativ/scen-midsommarstang.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="ki-v-flagga">
            {/* Stången står still och bara duken vajar mjukt (Max 2026-11-24) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-flagga-stang" src="/kreativ/scen-flagga.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-flagga-duk" src="/kreativ/scen-flagga.webp" alt="" />
          </span>
          </div>
          <div className="ki-v ki-v-farja" ref={farjaRef}>
            <span className="ki-rok" aria-hidden="true"><i /><i /><i /><i /></span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-v-bild" src="/kreativ/scen-angbat.webp" alt="" />
          </div>
          <div className="ki-v ki-v-bastu">
            <span className="ki-rok ki-rok-bastu" aria-hidden="true"><i /><i /><i /></span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-v-bild" src="/kreativ/scen-bastu-klippa.webp" alt="" />
          </div>
          <div className="ki-v ki-v-fyr">
          {/* En älg med skovelhorn tittar fram bakom fyren, under det orange bandet ovanför dörren (Max 2026-11-24) */}
          <span className="ki-alg-ram" aria-hidden="true">{/* eslint-disable-next-line @next/next/no-img-element */}<img className="ki-alg" src="/kreativ/scen-alg.webp" alt="" /></span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-v-bild" src="/kreativ/scen-fyr.webp" alt="" /><span className="ki-fyrljus" />
          </div>
          {/* En ejderhona med tre ungar som simmar sakta framåt längs vattenytan och guppar med vågorna, långt från båten (Max 2026-11-24).
              Läget räknas fram varje bildruta ur samma vågformel som havet, så att de alltid ligger på ytan. */}
          <span className="ki-ejdrar" ref={ejdRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-ejder" src="/kreativ/scen-ejder.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-unge" src="/kreativ/scen-ejderunge.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-unge" src="/kreativ/scen-ejderunge.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-unge" src="/kreativ/scen-ejderunge.webp" alt="" />
          </span>
          <svg className="ki-v-masar" viewBox="0 0 120 44" fill="none" stroke="#143c78" strokeWidth="3.4" strokeLinecap="round"><path d="M6 24 Q20 8 32 22 Q44 6 60 20" /><path d="M74 36 Q84 26 92 35 Q100 25 112 34" /></svg>
          <svg className="ki-v-masar tva" viewBox="0 0 60 30" fill="none" stroke="#143c78" strokeWidth="3.4" strokeLinecap="round"><path d="M4 20 Q16 6 28 18 Q40 4 56 16" /></svg>
        </div>
      )}
      <canvas ref={canvas} className="ki-canvas" aria-label={varld ? 'Startscenen: havet stiger, Svallas segelbåt med Thorkel seglar in och en skärgård växer fram.' : 'Introt: blå prickar blir Sverige, sedan Svallas segelbåt och till sist ett hav.'} />
      {varld && <canvas ref={rokRef} className="ki-rokduk" aria-hidden="true" />}
      {varld && (
        <div className={visT >= 9800 ? 'ki-fram syns' : 'ki-fram'} aria-hidden="true">
          {/* Kobben i förgrunden, bara stenen, och en krabba som går fram och tillbaka på den (Max 2026-11-23) */}
          <div className="ki-f-kobbe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ki-f-sten" src="/kreativ/scen-sten.webp" alt="" />
            <span className="ki-krabba">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kreativ/scen-krabba.webp" alt="" />
            </span>
          </div>
        </div>
      )}
      {varld && (
        <div className={visT >= 9800 ? 'ki-djup syns' : 'ki-djup'} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* Späckhuggaren och en mindre unge bakom. Stjärtfenan viftar upp och ned så att de simmar framåt (Max 2026-11-24) */}
          <div className="ki-d ki-d-orca"><img className="ki-orca-kropp" src="/kreativ/scen-spackhuggare.webp" alt="" /><img className="ki-orca-svans" src="/kreativ/scen-spackhuggare.webp" alt="" /></div>
          <div className="ki-d ki-d-orca ki-d-unge"><img className="ki-orca-kropp" src="/kreativ/scen-spackhuggare.webp" alt="" /><img className="ki-orca-svans" src="/kreativ/scen-spackhuggare.webp" alt="" /></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-d ki-d-f1" src="/kreativ/scen-fisk1.webp" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-d ki-d-f2" src="/kreativ/scen-fisk2.webp" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-d ki-d-f3" src="/kreativ/scen-fisk3.webp" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-d ki-d-f4" src="/kreativ/scen-fisk2.webp" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ki-d ki-d-f5" src="/kreativ/scen-fisk1.webp" alt="" />
          <span className="ki-bubbla" /><span className="ki-bubbla b2" /><span className="ki-bubbla b3" />
        </div>
      )}
      {varld && (
        <nav className={visT >= 10900 && !gar ? 'ki-skyltar syns' : 'ki-skyltar'} aria-label="Vägar in i Svalla">
          {SKYLTAR.map((s, i) => (
            <a key={s.id} href={s.href} className={'ki-skylt ki-cta ki-s-' + s.id} style={{ transitionDelay: i * 110 + 'ms' }}><span>{s.namn}</span></a>
          ))}
        </nav>
      )}
      {varld && (
        // Svallas logga i hörnet av startscenen hela tiden, samma komponent som i menyn på svalla.se (Max 2026-11-24)
        <div className="ki-logga"><SvallaLogo height={26} color="currentColor" /></div>
      )}
      {varld && (
        <div className="ki-rubrik">
          <h2>Skärgården börjar här</h2>
          <p>För öbon, företagaren, besökaren och familjen</p>
        </div>
      )}
      <div className="ki-topp">
        <span className={tips ? 'ki-tips syns' : 'ki-tips'}>Bäst med ljud</span>
        <button type="button" className="ki-ljud" onClick={vaxlaLjud} aria-pressed={ljud}>{ljud ? 'Ljud på' : 'Ljud av'}</button>
      </div>
      {visaIn && !gar && !varld && (
        <div className="ki-in">
          <button type="button" className="ki-knapp" onClick={() => { utRef.current = performance.now(); setGar(true) }}>Gå in på Svalla <i>→</i></button>
        </div>
      )}
      <div className={(navPos.hav < 0.91 ? 'ki-nav ljus' : 'ki-nav') + (varld ? ' ki-dold' : '')}>
        <div className="ki-namn" style={{ width: navPos.bredd }}>
          {SCENER.map((s, i) => (
            <button key={s.namn} type="button" style={{ left: NAV_KANT + (i / (SCENER.length - 1)) * (navPos.bredd - 2 * NAV_KANT) }} className={Math.round(navPos.x) === i ? 'pa' : ''} onClick={() => hoppa(s.fran)}>{s.namn}</button>
          ))}
        </div>
      </div>
      <div className={navPos.hav < 0.91 ? 'ki-styr ljus' : 'ki-styr'}>
        <button type="button" onClick={() => hoppa(varld ? VSTART : 0)}>Spela igen</button>
        <button type="button" onClick={() => hoppa(SLUT)}>Hoppa över</button>
      </div>
      <style>{CSS}</style>
    </div>
  )
}

const CSS = `
.ki-scen{position:relative;border-radius:26px;overflow:hidden;background:#fff;box-shadow:0 18px 50px rgba(13,36,64,.14);aspect-ratio:16/9;min-height:380px;touch-action:pan-y}
/* Startscenen: varm krämvit himmel i stället för kritvit, så att den inte bländar mot det mörkblå havet (Max 2026-11-24) */
.ki-scen-varld{background:#efe7d6}
/* Tid på dygnet (Max 2026-11-24): himlen, solen, fönstren och fyren följer klockan i Sverige. Morgon 5 till 10, dag 10 till 17, kväll 17 till 21, ljus sommarnatt 21 till 5 */
.ki-scen-varld.ki-tid-morgon{background:linear-gradient(180deg,#e6ebe6 0%,#f0e9d8 70%)}
.ki-scen-varld.ki-tid-kvall{background:linear-gradient(180deg,#eed7c6 0%,#f2dbc1 55%,#ecc4a3 100%)}
.ki-scen-varld.ki-tid-natt{background:linear-gradient(180deg,#cbd0e1 0%,#dad6df 55%,#e8d8c8 100%)}
.ki-tid-morgon .ki-varld .ki-v-sol{left:7%;top:17%}
.ki-tid-kvall .ki-varld .ki-v-sol{left:8%;top:27%;filter:hue-rotate(-14deg) saturate(.95) brightness(.95)}
.ki-tid-natt .ki-varld.syns .ki-v-sol{opacity:0}
.ki-v-kvall{position:absolute;left:0;top:0;opacity:0;transition:opacity 2s}
.ki-tid-kvall .ki-v-kvall{opacity:.55}
.ki-tid-natt .ki-v-kvall{opacity:1}
.ki-tid-natt .ki-v-fyr .ki-v-bild,.ki-tid-natt .ki-v-farja,.ki-tid-natt .ki-v-bastu,.ki-tid-natt .ki-v-eka,.ki-tid-natt .ki-tuva,.ki-tid-natt .ki-ejdrar,.ki-tid-natt .ki-v-fyr::after,.ki-tid-natt .ki-v-o::after,.ki-tid-natt .ki-v-vastkust::after{filter:brightness(.82) saturate(.9)}
.ki-tid-kvall .ki-v-o::after,.ki-tid-kvall .ki-v-vastkust::after{filter:brightness(.9)}
/* Klipporna fortsätter ner under vattnet (spegling av klippans nederkant), så det ljusa bakom inte syns när vågorna sjunker (Max 2026-11-24) */
.ki-v-o::after,.ki-v-vastkust::after,.ki-v-fyr::after,.ki-v-bastu::after{content:'';position:absolute;left:0;right:0;top:calc(100% - 1px);height:30%;background-repeat:no-repeat;background-size:100% auto;background-position:center bottom;transform:scaleY(-1);pointer-events:none}
.ki-v-o::after{background-image:url(/kreativ/scen-o.webp)}
.ki-v-vastkust::after{background-image:url(/kreativ/scen-vastkust.webp)}
.ki-v-fyr::after{background-image:url(/kreativ/scen-fyr.webp)}
.ki-v-bastu::after{background-image:url(/kreativ/scen-bastu-klippa.webp)}
.ki-fyrljus{position:absolute;left:50%;top:18%;width:70%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,216,122,.8) 0%,rgba(255,200,105,.28) 32%,rgba(255,200,105,0) 68%);opacity:0;transition:opacity 2s;pointer-events:none}
.ki-tid-kvall .ki-fyrljus{opacity:.45}
.ki-tid-natt .ki-fyrljus{opacity:1;animation:kiFyr 7s ease-in-out infinite}
@keyframes kiFyr{0%,100%{opacity:.7}50%{opacity:1}}
/* Grönskan (på tuvor), ekan och ejdrarna */
.ki-tuva{position:absolute;height:auto;pointer-events:none}
.ki-tuva-o1{left:30%;bottom:27%;width:12%}
.ki-tuva-o2{left:56.5%;bottom:22.5%;width:11%;transform:scaleX(-1)}
.ki-tuva-v1{left:19%;bottom:38.5%;width:10%}
.ki-tuva-v2{left:50%;bottom:39%;width:9%;transform:scaleX(-1)}
.ki-ejdrar{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 1.5s 1s}
.ki-varld.syns .ki-ejdrar{opacity:1}
.ki-ejdrar img{position:absolute;left:0;top:0;height:auto;opacity:0;transform-origin:50% 80%;will-change:transform}
.ki-ejder{width:3.4%}.ki-unge{width:1.7%}
.ki-v-eka{position:absolute;left:70%;bottom:7.5%;width:13%;height:auto;transform-origin:50% 80%}
@keyframes kiEka{from{transform:translateY(0) rotate(-1.4deg)}to{transform:translateY(5%) rotate(1.2deg)}}
.ki-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;}
.ki-rokduk{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
.ki-fram{position:absolute;inset:0;pointer-events:none;z-index:3;opacity:0;transition:opacity 1s .8s}
.ki-fram.syns{opacity:1}
.ki-f-kobbe{position:absolute;left:1.5%;bottom:0;width:20%;aspect-ratio:520/140;transform:translateY(60%);transition:transform 1.5s cubic-bezier(.2,.8,.2,1) .8s}
.ki-fram.syns .ki-f-kobbe{transform:translateY(0)}
.ki-f-sten{position:absolute;inset:0;width:100%;height:100%}
/* Krabban följer stenens rundade ovansida och lutar med den. Fötterna är punkten den vrids kring. */
.ki-krabba{position:absolute;left:50%;top:16%;width:12%;transform:translate(-50%,-94%);transform-origin:50% 100%;animation:kiKrabba 18s ease-in-out infinite alternate}
.ki-krabba img{display:block;width:100%;height:auto;animation:kiTrippa .32s steps(2) infinite}
@keyframes kiKrabba{0%,6%{left:24%;top:35%;transform:translate(-50%,-94%) rotate(-15deg)}25%{left:37%;top:22%;transform:translate(-50%,-94%) rotate(-9deg)}45%,55%{left:50%;top:16%;transform:translate(-50%,-94%) rotate(0)}75%{left:63%;top:21%;transform:translate(-50%,-94%) rotate(9deg)}94%,100%{left:76%;top:33%;transform:translate(-50%,-94%) rotate(15deg)}}
@keyframes kiTrippa{0%{transform:translateY(0)}100%{transform:translateY(-4%)}}
.ki-v-vastkust{left:61%;width:20%}
.ki-varld.syns .ki-v-vastkust{transform:translateY(9%);transition-delay:.15s}
.ki-topp{position:absolute;top:14px;right:14px;display:flex;align-items:center;gap:10px;z-index:3}
.ki-tips{font:700 10.5px/1 Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#1b57a0;background:#fff;border:1.5px solid #1b57a0;border-radius:999px;padding:7px 11px;opacity:0;transform:translateY(-4px);transition:opacity 1.1s,transform 1.1s}
.ki-tips.syns{opacity:1;transform:none}
.ki-gar .ki-nav,.ki-gar .ki-styr,.ki-gar .ki-topp{opacity:0;pointer-events:none;transition:opacity .25s}
.ki-ljud{font:700 11px/1 Inter,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:#1b57a0;border:none;border-radius:999px;padding:8px 13px;cursor:pointer}
/* Ingen ljudknapp och inget tips om ljud på mobilen (Max 2026-11-24) */
@media (max-width:860px){.ki-ljud,.ki-tips,.ki-styr{display:none}}
.ki-in{position:absolute;left:0;right:0;bottom:88px;display:flex;justify-content:center;z-index:3;animation:kiUpp .7s cubic-bezier(.2,.8,.2,1) both}
@keyframes kiUpp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.ki-knapp{font:400 19px/1 'Playfair Display',Georgia,serif;color:#1b57a0;background:#fff;border:none;border-radius:999px;padding:15px 30px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.18);transition:transform .25s}
.ki-knapp:hover{transform:translateY(-2px)}
.ki-knapp i{font-style:normal;margin-left:8px}
.ki-nav{position:absolute;left:16px;right:16px;bottom:10px;height:56px;z-index:3;pointer-events:none;--f:#1b57a0}
.ki-nav.ljus{--f:#fff}
.ki-nav button{pointer-events:auto}
.ki-namn{position:absolute;left:0;bottom:2px;height:14px}
.ki-namn button{position:absolute;transform:translateX(-50%);border:none;background:none;padding:2px 0;cursor:pointer;font:700 10px/1 Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--f);opacity:.55;transition:opacity .3s,color .6s}
.ki-namn button.pa{opacity:1}
/* Uppe till vänster, mitt emot ljudknappen, så att knapparna inte krockar med Tipsa oss nere till höger */
.ki-styr,.ki-styr.ljus{position:absolute;left:16px;top:14px;display:flex;gap:8px;z-index:3;--f:#1b57a0}
.ki-styr button{border:1.5px solid var(--f);background:none;color:var(--f);font:700 12px/1 Inter,system-ui,sans-serif;border-radius:999px;padding:8px 12px;cursor:pointer;transition:color .6s,border-color .6s}
.ki-reserv{display:flex;align-items:flex-start;justify-content:center}
.ki-reserv-hav{position:absolute;left:0;right:0;bottom:0;height:40%;background:#1b57a0}
.ki-reserv p{margin-top:18%;font:700 13px Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#1b57a0}
.ki-varld{position:absolute;inset:0;pointer-events:none}
.ki-varld .ki-v-sol{position:absolute;left:4.5%;top:9%;width:7%;opacity:0;transform:translateY(40%);transition:opacity 1.4s,transform 2.4s cubic-bezier(.2,.8,.2,1);filter:saturate(.78) brightness(.97)}
.ki-varld.syns .ki-v-sol{opacity:.92;transform:none}
@keyframes kiSol{to{rotate:360deg}}
.ki-varld .ki-v{position:absolute;bottom:36%;opacity:0;transform:translateY(75%);transition:transform 1.6s cubic-bezier(.2,.8,.2,1),opacity .5s}
.ki-varld.syns .ki-v{opacity:1}
.ki-v-bild{display:block;width:100%;height:auto}
.ki-v-stang{position:absolute;left:60.9%;bottom:23.3%;width:13.7%;height:auto;transform-origin:50% 100%;animation:kiVaj 8s ease-in-out infinite alternate}
/* Flaggan: samma bild två gånger, stången klipps ut och står still, duken vajar mjukt från stången */
.ki-v-flagga{position:absolute;left:38.5%;bottom:28%;width:9.5%;aspect-ratio:330/777}
.ki-v-flagga img{position:absolute;left:0;top:0;width:100%;height:auto;display:block}
.ki-flagga-stang{clip-path:inset(0 90% 0 0)}
.ki-flagga-duk{clip-path:inset(0 0 58% 9%);transform-origin:9% 20%;animation:kiFlagg 5s ease-in-out infinite alternate}
@keyframes kiFlagg{0%{transform:skewY(3deg) scaleX(.95)}50%{transform:skewY(-1deg) scaleX(1)}100%{transform:skewY(-3.5deg) scaleX(.97)}}
@keyframes kiVaj{from{rotate:-1.2deg}to{rotate:1.2deg}}
.ki-v-bastu{left:74.5%;width:8.5%}
.ki-varld.syns .ki-v-bastu{transform:translateY(10%);transition-delay:.45s}
.ki-rok{position:absolute;left:40%;top:1%;width:24%;height:60%;pointer-events:none}
.ki-rok-bastu{left:52%;top:-3%;width:16%}
.ki-rok i{position:absolute;left:0;bottom:0;width:100%;aspect-ratio:1;border-radius:50%;background:#e9eef6;opacity:0;animation:kiRok 4.2s ease-out infinite}
.ki-rok i:nth-child(2){animation-delay:1.05s}.ki-rok i:nth-child(3){animation-delay:2.1s}.ki-rok i:nth-child(4){animation-delay:3.15s}
.ki-rok-bastu i{background:#f2efe8;animation-duration:5s}
@keyframes kiRok{0%{opacity:0;transform:translate(0,0) scale(.35)}15%{opacity:.85}100%{opacity:0;transform:translate(-140%,-260%) scale(1.6)}}
.ki-djup{position:absolute;left:0;right:0;top:66%;bottom:0;z-index:2;pointer-events:none;overflow:hidden;opacity:0;transition:opacity 1.2s .9s}
.ki-djup.syns{opacity:1}
.ki-d{position:absolute;height:auto;animation:kiSimHo linear infinite}
/* Fiskarna och späckhuggaren simmar i ungefär halva farten (Max 2026-11-24) */
.ki-d-orca{width:15%;top:30%;animation:kiSimVa 62s linear infinite;animation-delay:-11s}
.ki-d-orca img{display:block;width:100%;height:auto}
.ki-orca-kropp{clip-path:inset(0 11% 0 0)}
.ki-orca-svans{position:absolute;left:0;top:0;clip-path:inset(0 0 0 87.5%);transform-origin:88.5% 65%;animation:kiSvans 1.5s ease-in-out infinite alternate}
.ki-d-unge{width:8.5%;top:46%;margin-left:15.5%}
.ki-d-unge .ki-orca-svans{animation-duration:1.05s;animation-delay:-.4s}
@keyframes kiSvans{from{transform:rotate(-13deg)}to{transform:rotate(13deg)}}
/* Älgen: ramen slutar vid tornets högra kant, så att bara huvudet och hornen syns när den tittar fram till vänster */
.ki-alg-ram{position:absolute;left:14%;width:48%;top:60%;height:40%;overflow:hidden;z-index:-1;pointer-events:none}
.ki-alg{position:absolute;left:22%;top:16%;width:75%;height:auto;animation:kiAlg 17s ease-in-out infinite;animation-delay:4s;transform:translateX(62%)}
@keyframes kiAlg{0%,22%{transform:translateX(62%)}32%,66%{transform:translateX(0) rotate(0deg)}44%{transform:translateX(0) rotate(-3deg)}54%{transform:translateX(0) rotate(1.5deg)}76%,100%{transform:translateX(62%)}}
.ki-d-f1{width:6.5%;top:12%;animation-duration:40s;animation-delay:-5s}
.ki-d-f2{width:6%;top:44%;animation-duration:32s;animation-delay:-20s}
.ki-d-f3{width:5.5%;top:66%;animation-duration:46s;animation-delay:-32s}
.ki-d-f4{width:4.2%;top:22%;animation-duration:28s;animation-delay:-13s;opacity:.8}
.ki-d-f5{width:4.8%;top:78%;animation-duration:36s;animation-delay:-25s;opacity:.85}
@keyframes kiSimHo{from{left:-12%;translate:0 0}50%{translate:0 -10px}to{left:108%;translate:0 0}}
@keyframes kiSimVa{from{left:105%;translate:0 0}50%{translate:0 12px}to{left:-20%;translate:0 0}}
.ki-bubbla{position:absolute;left:30%;bottom:-10px;width:8px;height:8px;border-radius:50%;border:1.5px solid rgba(233,238,246,.7);animation:kiBubbla 11s ease-in infinite}
.ki-bubbla.b2{left:58%;animation-delay:-4s;width:6px;height:6px}.ki-bubbla.b3{left:81%;animation-delay:-7.5s}
@keyframes kiBubbla{from{transform:translateY(0);opacity:0}15%{opacity:1}to{transform:translateY(-260px);opacity:0}}
.ki-v-o{left:1.5%;width:27%}
.ki-varld.syns .ki-v-o{transform:translateY(11.8%)}
.ki-v-fyr{right:3.5%;width:13.5%}
.ki-varld.syns .ki-v-fyr{transform:translateY(10.4%);transition-delay:.3s}
.ki-v-farja{left:60%;width:8.5%}
/* Ångbåten åker bara från höger till vänster: ut ur bilden till vänster och in igen från höger. Halva farten mot förut, ett varv tar 58 s (Max 2026-11-23) */
.ki-varld.syns .ki-v-farja{transform:translateY(13.5%);transition-delay:.6s;scale:-1 1;animation:kiFarja 100s linear 2.4s infinite}
/* Ångbåten är osynlig den tiondels sekund den flyttas från vänster kant till höger, annars syns den flyga över skärmen (Oskar 2026-11-24) */
@keyframes kiFarja{0%{left:60%}61.55%{opacity:1}61.6%{left:-14%;opacity:0}61.7%{left:106%;opacity:0}61.75%{opacity:1}100%{left:60%}}
/* Fiskmåsarna flyger över himlen från vänster till höger och slår med vingarna (Max 2026-11-24) */
.ki-v-masar{position:absolute;left:10%;top:17%;width:9%;opacity:0;transition:opacity 1.2s .8s;animation:kiMasFlyg 72s linear -13.7s infinite,kiSvav 6s ease-in-out infinite alternate}
.ki-v-masar.tva{top:27%;width:6%;animation:kiMasFlyg 86s linear -64s infinite,kiSvav 7.4s ease-in-out infinite alternate}
.ki-v-masar path{transform-box:fill-box;transform-origin:50% 100%;animation:kiFlax .9s ease-in-out infinite alternate}
.ki-v-masar path:nth-child(2){animation-delay:-.45s;animation-duration:1.05s}
@keyframes kiMasFlyg{from{left:-12%}to{left:104%}}
@keyframes kiFlax{to{transform:scaleY(.4)}}
.ki-varld.syns .ki-v-masar{opacity:1}
@keyframes kiSvav{to{translate:14px -8px}}
.ki-skyltar{position:absolute;inset:0;z-index:3;pointer-events:none}
.ki-skylt{position:absolute;display:inline-flex;align-items:center;gap:8px;font:400 16px/1 'Playfair Display',Georgia,serif;color:#143c78 !important;background:#fbf7ee;border:2px solid #143c78;border-radius:15px 18px 14px 17px/17px 14px 18px 15px;padding:8px 15px 8px 10px;text-decoration:none !important;white-space:nowrap;box-shadow:3px 3px 0 #143c78;opacity:0;visibility:hidden;transform:translate(var(--x,0),8px) rotate(var(--r,0deg));transition:opacity .5s,transform .45s cubic-bezier(.2,1.4,.4,1),box-shadow .25s,background-color .25s,visibility 0s .5s}
.ki-skylt::before{content:'';position:absolute;left:20px;bottom:-7px;width:11px;height:11px;background:inherit;border-right:2px solid #143c78;border-bottom:2px solid #143c78;border-radius:0 0 3px 0;transform:rotate(45deg)}
.ki-skylt span{position:relative}
.ki-ik{width:20px;height:20px;flex:none;fill:none;stroke:#c8642a;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;transform-origin:50% 80%}
.ki-skyltar.syns .ki-skylt{opacity:1;visibility:visible;pointer-events:auto;transform:translate(var(--x,0),0) rotate(var(--r,0deg));transition:opacity .5s,transform .5s cubic-bezier(.2,1.4,.4,1),box-shadow .3s,visibility 0s}
.ki-skyltar.syns .ki-skylt:hover,.ki-skyltar.syns .ki-skylt:focus-visible{transform:translate(var(--x,0),-4px) rotate(0deg);box-shadow:5px 6px 0 #143c78;background-color:#fff;transition-delay:0s !important}
.ki-skylt:hover .ki-ik,.ki-skylt:focus-visible .ki-ik{animation:kiVick .5s ease-in-out}
@keyframes kiVick{25%{transform:rotate(-12deg)}60%{transform:rotate(9deg)}100%{transform:rotate(0)}}
.ki-skylt:focus-visible{outline:3px solid #f2c27a;outline-offset:3px}
@keyframes kiPuls{0%{box-shadow:0 0 0 0 rgba(200,100,42,.55)}70%,100%{box-shadow:0 0 0 9px rgba(200,100,42,0)}}
.ki-s-oar{left:6.5%;top:37%;--r:-3deg}
.ki-s-boende{left:14.5%;top:45%;--r:2deg}
.ki-s-krogar{left:21%;top:55%;--r:-2deg}
.ki-cta{font-size:18px;padding:11px 18px 11px 17px;background:#c8642a;color:#fbf7ee !important}
.ki-skyltar.syns .ki-cta:hover,.ki-skyltar.syns .ki-cta:focus-visible{background-color:#d5733a}
.ki-cta::after{content:'→';margin-left:3px;transition:transform .3s cubic-bezier(.2,1.4,.4,1)}
.ki-cta:hover::after{transform:translateX(4px)}
.ki-s-planera{left:56.5%;top:35%;--r:2deg}
.ki-s-samarbete{left:auto;right:56.5%;top:35%;--r:-2deg}
.ki-s-samarbete::before{left:auto;right:20px}
.ki-s-gora{left:19.5%;top:19%;--r:2deg}
.ki-dold{display:none}
.ki-s-farjor{left:68.5%;top:47.5%;--r:-2deg}
.ki-s-karta{left:86%;top:34%;--r:3deg}
@media (prefers-reduced-motion:reduce){.ki-orca-svans,.ki-alg,.ki-varld.syns .ki-v-sol,.ki-krabba,.ki-krabba img,.ki-skylt:hover .ki-ik,.ki-v-masar,.ki-v-masar path,.ki-varld.syns .ki-v-farja,.ki-v-stang,.ki-flagga-duk,.ki-v-eka,.ki-fyrljus,.ki-rok i,.ki-d,.ki-bubbla{animation:none}.ki-rok,.ki-bubbla{display:none}}
@media (max-width:860px){.ki-scen{aspect-ratio:4/5;min-height:0}.ki-in{bottom:96px}}
@media (max-width:560px){.ki-topp{flex-direction:column-reverse;align-items:flex-end;gap:6px}.ki-styr,.ki-styr.ljus{top:14px;left:14px;right:auto;bottom:auto;--f:#1b57a0}.ki-styr button{font-size:11px;padding:7px 10px}.ki-in{bottom:78px}.ki-namn button{font-size:8.5px;letter-spacing:.06em}}
/* Mobilen: allt som på datorn utom bastun, som blir trång bredvid västkusthusen. Ångbåten mindre, långt bort (Max 2026-11-24). */
@media (max-width:860px){.ki-v-vastkust{left:66%;width:22%}.ki-f-kobbe{width:36%;left:-3%}.ki-v-o{left:0;width:37%}.ki-v-fyr{right:-7%;width:26%}.ki-v-farja{width:13%}.ki-v-bastu{left:80%;width:9.5%;z-index:1}.ki-djup{top:68%}.ki-d-orca{width:30%}.ki-d-unge{width:17%;top:46%;margin-left:31%}.ki-d-f1{width:12%}.ki-d-f2{width:11%}.ki-d-f3{width:10%}.ki-d-f4,.ki-d-f5{display:none}.ki-v-masar{left:6%;top:30%;width:14%}.ki-varld .ki-v-sol{left:4%;top:15%;width:12%}.ki-v-masar.tva{display:none}.ki-v-bastu{display:none}.ki-v-bastu::after{display:none}.ki-styr,.ki-styr.ljus{display:none}.ki-ejder{width:6.4%}.ki-unge{width:3.2%}
.ki-skylt{font-size:13px;padding:6px 11px 6px 8px;gap:6px;box-shadow:2px 2px 0 #143c78}.ki-ik{width:16px;height:16px}.ki-skylt::before{width:8px;height:8px;bottom:-5px;left:14px}
.ki-s-oar{left:3%;top:41%}.ki-s-karta{left:auto;right:3%;top:38%}
.ki-cta{font-size:12px;padding:6px 10px 6px 9px;box-shadow:2px 2px 0 #143c78}.ki-cta::after{margin-left:1px}
/* Mobilen: knapparna på var sin sida om seglen som på datorn, men mindre (Max 2026-11-23) */
.ki-s-planera{left:52%;right:auto;top:45%;--r:2deg}.ki-s-samarbete{left:auto;right:52%;top:45%;--r:-2deg}.ki-s-samarbete::before{left:auto;right:14px}
.ki-s-boende,.ki-s-krogar,.ki-s-farjor,.ki-s-gora{top:84%;--r:0deg}
.ki-s-boende{left:4%}.ki-s-krogar{left:27%}.ki-s-farjor{left:49.5%}.ki-s-gora{left:auto;right:4%}}
@media (max-width:560px){.ki-skylt{font-size:12px;padding:5px 9px 5px 7px;gap:5px}.ki-ik{width:14px;height:14px}.ki-cta{font-size:10.5px;padding:5px 8px 5px 7px}
.ki-skyltar .ki-s-planera,.ki-skyltar .ki-s-samarbete{top:42.5%}.ki-skyltar .ki-s-boende,.ki-skyltar .ki-s-farjor{left:7%;right:auto}.ki-skyltar .ki-s-krogar,.ki-skyltar .ki-s-gora{left:auto;right:7%}.ki-skyltar .ki-s-boende,.ki-skyltar .ki-s-krogar{top:79%}.ki-skyltar .ki-s-farjor,.ki-skyltar .ki-s-gora{top:89%}}
/* Späckhuggarna får aldrig simma under bildens nederkant (Max 2026-11-25). Storleken följer djupets höjd, inte bara bredden,
   så att de på breda skärmar inte blir för stora för vattnet. 132cqh - 26px = 62 % av djupet minus 12 px gupp, omräknat till bredd. */
.ki-djup{container-type:size}
.ki-d-orca{width:min(15%,calc(132cqh - 26px))}
.ki-d-unge{width:min(8.5%,calc(100cqh - 26px));margin-left:calc(min(15%,calc(132cqh - 26px)) * 1.033)}
@media (max-width:860px){.ki-d-orca{top:22%;width:min(30%,calc(132cqh - 26px))}.ki-d-unge{top:38%;width:min(17%,calc(100cqh - 26px));margin-left:calc(min(30%,calc(132cqh - 26px)) * 1.033)}}
/* Loggan: uppe till vänster på himlen, i mobilen nere till vänster på havet där knapparna inte sitter */
.ki-logga{position:absolute;left:22px;top:20px;z-index:4;display:flex;align-items:center;gap:8px;color:#0a2540;pointer-events:none}
.ki-logga svg{height:26px;width:auto}
/* Startscenens rubrik i sajtens typsnittstråd: Playfair Display 700, -0.01em, och Inter 400 under. Färgen är havets blå (BLA_VARLD #4472ab); raden under en nyans mörkare (#375e96) så att den klarar kontrastkravet 4,5:1 i liten storlek (Max 2026-11-26) */
.ki-rubrik{position:absolute;left:0;right:0;top:12%;z-index:3;text-align:center;pointer-events:none;padding:0 18px;animation:kiRubrik .9s .3s both}
.ki-rubrik h2{margin:0;font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(28px,5vw,52px);line-height:1.1;letter-spacing:-0.01em;color:#4472ab}
.ki-rubrik p{margin:8px 0 0;font-family:Inter,system-ui,sans-serif;font-weight:400;font-size:clamp(13px,4vw,19px);line-height:1.45;color:#375e96;white-space:nowrap}
/* Startsidan låser alla h2 till 28/24 px (rubrikskalan). Heron är ett steg större så att den blir sidans tydligaste rubrik (Max 2026-11-26) */
.lp-start .ki-rubrik h2:not(.lp-dold){font-size:clamp(28px,5vw,52px)!important}
.ki-tid-natt .ki-rubrik h2{color:#f5f4ef}.ki-tid-natt .ki-rubrik p{color:#c9d6e2}
/* Dator och platta: heron är bara 380 px hög på en vanlig laptop och skyltarna sitter på 35 %. Rubriken börjar högre så att raden under får luft ovanför skyltarna (Max 2026-11-27). Mobilen (≤560 px) är oförändrad. */
@media (min-width:561px){.ki-rubrik{top:5%}.ki-rubrik p{margin-top:6px;font-size:clamp(15px,1.6vw,18px)}}
@keyframes kiRubrik{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (max-width:560px){.ki-logga{top:auto;bottom:14px;left:14px;color:#f5f4ef}.ki-logga svg{height:20px}}
`
