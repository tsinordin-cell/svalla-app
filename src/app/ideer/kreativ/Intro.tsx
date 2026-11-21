'use client'
/**
 * INTROT, version 2 (2026-11-21). Rent WebGL2, inga bibliotek.
 * Partiklar ritas som mjuka fläckar till en täthetsbild, suddas, och tröskelvärdet ger en bläckkant.
 * Under bläcket ligger ett vätskefält (128 punkter brett) som krusar kanten; musen och fingret rör om.
 * Kornet i kanten kommer från en förberäknad brustextur i två skalor. Strikt två färger.
 * Båten och texten ligger i egna kanaler och inverterar havet där de korsar det.
 * Sveriges kontur: Natural Earth 1:50m (allmän egendom), avrundad till två decimaler.
 */
import { useEffect, useRef, useState } from 'react'

const BLA = [0.106, 0.341, 0.627] // #1b57a0
const SLUT = 11800
const NAV_KANT = 34 // så att första och sista etiketten inte klipps
const SCENER = [
  { namn: 'Prickar', fran: 0 },
  { namn: 'Sverige', fran: 2600 },
  { namn: 'Båten', fran: 5200 },
  { namn: 'Havet', fran: 7800 },
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
const ARM = { axel: [-0.6, 17.6] as const, hand: [0.5, 14.7] as const, r: 0.42 }
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
  c.beginPath(); c.moveTo(-3, 18.5); c.quadraticCurveTo(9, 20.3, 21, 18.5); c.quadraticCurveTo(20.1, 21.8, 17.4, 22.1); c.lineTo(0.6, 22.1); c.quadraticCurveTo(-2.1, 21.8, -3, 18.5); c.closePath(); c.fill()
  // Två personer som sitter i båten, huvud och axlar över relingen
  c.beginPath(); c.arc(-1.3, 15.75, 1.0, 0, Math.PI * 2); c.fill(); c.fillRect(-2.2, 17.15, 1.8, 2.6)
  c.beginPath(); c.arc(19.7, 15.75, 1.0, 0, Math.PI * 2); c.fill(); c.fillRect(18.8, 17.15, 1.8, 2.6)
  if (medArm) { c.beginPath(); c.moveTo(ARM.axel[0], ARM.axel[1]); c.lineTo(ARM.hand[0], ARM.hand[1]); c.lineWidth = ARM.r * 2; c.stroke() }
  // Vågen (loggan: M2,20 Q6,17.5 9,20 Q12,17.5 17,20), här under skrovet
  c.beginPath(); c.moveTo(-0.5, 24.3); c.quadraticCurveTo(4.25, 21.9, 9, 24.3); c.quadraticCurveTo(13.75, 21.9, 18.5, 24.3); c.lineWidth = 1.2; c.stroke()
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
uniform vec2 stage; uniform float sveS; uniform float batS; uniform vec2 piv; uniform float ang; uniform float by; uniform vec4 arm; uniform float armR;
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
  float niva = hav + (sin(x * 3.1 + t * 1.05) * .011 + sin(x * 7.7 - t * 1.6) * .0055 + (vn(vec2(x * 4., t * .4)) - .5) * .012) * vag;
  float havF = clamp((yd - niva) * 34. + .5, 0., 1.6);
  float th = .5 + (kf - .5) * .13 + (kg - .5) * .1;
  // Formmasken: bläcket sätter sig i Sveriges och båtens skarpa form, men krusas fortfarande av fältet
  vec2 sp = vec2(uv.x + disp.x, 1. - uv.y - disp.y) * stage;
  float m1 = sveS > 0. ? mjuk(sp / stage).r : 0.;
  vec2 qq = sp - vec2(0., by) - piv; float cs = cos(ang), sn = sin(ang);
  vec2 lp = piv + vec2(qq.x * cs + qq.y * sn, -qq.x * sn + qq.y * cs);
  float m2 = 0.;
  if (batS > 0.) { m2 = mjuk(lp / stage).g; m2 = max(m2, clamp((armR - seg(lp, arm.xy, arm.zw)) / 1.6 + .5, 0., 1.)); }
  float fr = mix(d.r, m1, sveS);
  float fb = mix(d.g, m2, batS);
  float a = kant(fr + havF, th);
  float b = kant(fb, th);
  float tx = texture(txt, vec2(uv.x, 1. - uv.y) + disp * .3).a;
  tx = smoothstep(.45, .55, tx + (kf - .5) * .2) * smoothstep(0., .07, txtA * 1.12 - (kg * .7 + kf * .3));
  float ink = a;
  ink = mix(ink, 1. - ink, b);
  ink = mix(ink, 1. - ink, tx);
  float fld = 0.;
  for (int i = 0; i < 7; i++) { vec2 dq = gl_FragCoord.xy - drops[i].xy; fld += drops[i].z * drops[i].z / (dot(dq, dq) + 1.); }
  ink = mix(ink, 1. - ink, smoothstep(.8, 1.25, fld));
  o = vec4(mix(vec3(1.), bla, ink), 1.);
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

/* Ljud: av tills man slår på det. Ett ljust ackord i kvinter, en luftig andning som stiger och en vattendroppe per scen. */
function skapaLjud() {
  const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)
  const ac = new AC()
  const ut = ac.createGain(); ut.gain.value = 0; ut.connect(ac.destination)
  const toner = [587.33, 880, 1318.5].map((f, i) => {
    const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = f
    const g = ac.createGain(); g.gain.value = 0.028 / (i + 1)
    const lfo = ac.createOscillator(); lfo.frequency.value = 0.07 + i * 0.03
    const lg = ac.createGain(); lg.gain.value = 0.012 / (i + 1); lfo.connect(lg); lg.connect(g.gain)
    o.connect(g); g.connect(ut); o.start(); lfo.start(); return o
  })
  const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate)
  const ch = buf.getChannelData(0); for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1
  const brus = ac.createBufferSource(); brus.buffer = buf; brus.loop = true
  const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 0.7
  const andning = ac.createGain(); andning.gain.value = 0
  brus.connect(bp); bp.connect(andning); andning.connect(ut); brus.start()
  ut.gain.setTargetAtTime(0.9, ac.currentTime, 0.8)
  return {
    droppe() {
      const o = ac.createOscillator(); o.type = 'sine'
      const g = ac.createGain(); const n = ac.currentTime
      o.frequency.setValueAtTime(1500, n); o.frequency.exponentialRampToValueAtTime(420, n + 0.14)
      g.gain.setValueAtTime(0.0001, n); g.gain.exponentialRampToValueAtTime(0.09, n + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, n + 0.32)
      o.connect(g); g.connect(ut); o.start(n); o.stop(n + 0.35)
    },
    andas(p: number) { andning.gain.setTargetAtTime(0.004 + p * 0.016, ac.currentTime, 0.3); bp.frequency.setTargetAtTime(700 + p * 900, ac.currentTime, 0.4) },
    stang() { ut.gain.setTargetAtTime(0, ac.currentTime, 0.2); setTimeout(() => { toner.forEach(o => o.stop()); brus.stop(); ac.close() }, 600) },
  }
}

export default function Intro({ efter }: { efter?: () => void }) {
  const scen = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const tid = useRef(0)
  const start = useRef(0)
  const [visT, setVisT] = useState(0)
  const [stod, setStod] = useState(true)
  const [ljud, setLjud] = useState(false)
  const [tips, setTips] = useState(true)
  const ljudRef = useRef<ReturnType<typeof skapaLjud> | null>(null)
  const sistaScen = useRef(-1)
  const nav = useRef({ x: 0, v: 0, svans: 0 })
  const [navPos, setNavPos] = useState({ x: 0, svans: 0, hav: 1.2, bredd: 600 })

  const hoppa = (ms: number) => { tid.current = ms; start.current = performance.now() - ms }

  useEffect(() => { const k = setTimeout(() => setTips(false), 4900); return () => clearTimeout(k) }, [])

  useEffect(() => {
    const el = scen.current, cv = canvas.current
    if (!el || !cv) return
    const gl = cv.getContext('webgl2', { antialias: false, premultipliedAlpha: false, alpha: false })
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
    let dens = malYta(gl, 2, 2), sudd1 = malYta(gl, 2, 2), sudd2 = malYta(gl, 2, 2)
    let flA = malYta(gl, 2, 2), flB = malYta(gl, 2, 2)
    let data = new Float32Array(0)
    let pkt: WebGLVertexArrayObject | null = null, pb: WebGLBuffer | null = null
    let fran: Record<'prick' | 'sve' | 'bat' | 'dyn' | 'hav', Float32Array> = { prick: new Float32Array(0), sve: new Float32Array(0), bat: new Float32Array(0), dyn: new Float32Array(0), hav: new Float32Array(0) }
    let attr = { droppT: new Float32Array(0), r: new Float32Array(0), size: new Float32Array(0), size0: new Float32Array(0), vikt: new Float32Array(0) }
    const formTex = gl.createTexture()!
    let batRuta = { bw: 0, bh: 0 }

    const bygg = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1)
      W = el.clientWidth; H = el.clientHeight
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
      const bw = Math.min(W * (W < 700 ? 0.58 : 0.3), H * 0.5), bh = (bw * BAT_H) / BAT_B
      batRuta = { bw, bh }
      const bat = provForm(W, H, N, c => ritaBat(c, (W - bw) / 2, (H - bh) / 2, bw), r)
      // Formmasken i halv upplösning: röd kanal Sverige, grön kanal båten (utan armen, den ritas i shadern)
      {
        const mc = document.createElement('canvas'); mc.width = hw; mc.height = hh
        const c = mc.getContext('2d')!
        c.fillStyle = '#000'; c.fillRect(0, 0, hw, hh); c.scale(hw / W, hh / H)
        c.fillStyle = 'rgb(255,0,0)'; ritaSverige(c)
        c.globalCompositeOperation = 'lighter'; c.fillStyle = 'rgb(0,255,0)'; ritaBat(c, (W - bw) / 2, (H - bh) / 2, bw, false)
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

      // Texten: egen mask i full skärpa
      const tc = document.createElement('canvas'); tc.width = cv.width; tc.height = cv.height
      const c = tc.getContext('2d')!
      c.scale(DPR, DPR); c.fillStyle = '#000'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'
      const serif = getComputedStyle(document.querySelector('.kr h2') ?? document.body).fontFamily || 'Georgia, serif'
      const sans = getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif'
      const stor = Math.min(W * 0.11, H * 0.12)
      c.font = `700 ${stor}px ${serif}`
      const ls = c as unknown as { letterSpacing?: string }
      if ('letterSpacing' in c) ls.letterSpacing = `${stor * 0.16}px`
      c.fillText('SVALLA', W / 2 + stor * 0.08, H * 0.2)
      c.font = `700 ${Math.max(10, stor * 0.17)}px ${sans}`
      if ('letterSpacing' in c) ls.letterSpacing = `${stor * 0.05}px`
      c.fillText('SVERIGES SAMLADE SKÄRGÅRDSSIDA', W / 2, H * 0.2 + stor * 0.42)
      gl.bindTexture(gl.TEXTURE_2D, txtTex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }
    bygg()
    let bygger = 0
    const ro = new ResizeObserver(() => { cancelAnimationFrame(bygger); bygger = requestAnimationFrame(bygg) })
    ro.observe(el)

    // Musen och fingret
    const mus = { x: 0.5, y: 0.5, dx: 0, dy: 0, aktiv: false }
    const flytta = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height
      if (mus.aktiv) { mus.dx += (x - mus.x) * 9; mus.dy += (y - mus.y) * 9 }
      mus.x = x; mus.y = y; mus.aktiv = true
    }
    const lamna = () => { mus.aktiv = false }
    cv.addEventListener('pointermove', flytta); cv.addEventListener('pointerleave', lamna)

    const u = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n)
    const pass = (p: WebGLProgram, mal: { fb: WebGLFramebuffer; w: number; h: number } | null) => {
      gl.useProgram(p); gl.bindFramebuffer(gl.FRAMEBUFFER, mal ? mal.fb : null)
      gl.viewport(0, 0, mal ? mal.w : cv.width, mal ? mal.h : cv.height)
      gl.bindVertexArray(tri)
    }

    let raf = 0, forra = performance.now()
    start.current = performance.now() - tid.current
    if (minskad) { tid.current = SLUT; start.current = performance.now() - SLUT }

    const ruta = (nu: number) => {
      const dt = Math.min(0.05, (nu - forra) / 1000); forra = nu
      // window.__kiFrys = millisekunder låser tiden (bara för test och skärmbilder)
      const frys = (window as unknown as { __kiFrys?: number }).__kiFrys
      const t = typeof frys === 'number' ? frys : minskad ? SLUT : Math.min(nu - start.current, SLUT + 600000)
      tid.current = t
      const T = Math.min(t, SLUT)
      const sek = minskad ? 0 : nu / 1000

      // Scenernas förlopp
      const sc = SCENER.reduce((a, s, i) => (T >= s.fran ? i : a), 0)
      if (sc !== sistaScen.current) { if (sistaScen.current >= 0 && sc > sistaScen.current) ljudRef.current?.droppe(); sistaScen.current = sc }
      ljudRef.current?.andas(T / SLUT)
      const havNiva = 1.18 - 0.28 * ease((T - 5600) / 2400) - 0.26 * ease((T - 7800) / 2200)
      const batNer = ease((T - 7800) / 2000)
      const bob = Math.sin(sek * 1.4) * H * 0.008, vink = Math.sin(sek * 1.1) * 0.045
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
          x = pivX + dx * cs - dy * sn; y = pivY + dx * sn + dy * cs + by
        } else {
          const e3 = fordrojd(7800)
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
      gl.uniform2f(u(pFlode, 'm'), mus.x, mus.y); gl.uniform2f(u(pFlode, 'md'), mus.dx, mus.dy)
      gl.uniform1f(u(pFlode, 'asp'), W / H); gl.uniform1f(u(pFlode, 't'), sek); gl.uniform1f(u(pFlode, 'dt'), dt)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      ;[flA, flB] = [flB, flA]
      mus.dx *= 0.82; mus.dy *= 0.82

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
      gl.uniform1f(u(pBild, 'hav'), havNiva); gl.uniform1f(u(pBild, 'vag'), 0.4 + 0.6 * ease((T - 7800) / 1500))
      gl.uniform1f(u(pBild, 'txtA'), ease((T - 8300) / 1700)); gl.uniform3f(u(pBild, 'bla'), BLA[0]!, BLA[1]!, BLA[2]!)
      // Formmasken och båtens läge (samma rörelse som partiklarna), armen vinkar
      bind('form', 4, formTex)
      gl.uniform2f(u(pBild, 'stage'), W, H)
      gl.uniform1f(u(pBild, 'sveS'), klamp((T - 3700) / 800) * (1 - klamp((T - 5150) / 350)))
      gl.uniform1f(u(pBild, 'batS'), klamp((T - 6500) / 800))
      const eSen = ease((T - 5200 - 650) / 1500)
      gl.uniform2f(u(pBild, 'piv'), pivX, pivY); gl.uniform1f(u(pBild, 'ang'), vink * eSen); gl.uniform1f(u(pBild, 'by'), malY * batNer + bob * eSen)
      {
        const kk = batRuta.bw / BAT_B, bx = (W - batRuta.bw) / 2, byy = (H - batRuta.bh) / 2
        const P = (uu: number, vv: number) => [bx + (uu + BAT_DX) * kk, byy + (vv + BAT_DY) * kk] as const
        const [sx, sy] = P(ARM.axel[0], ARM.axel[1]), [hx0, hy0] = P(ARM.hand[0], ARM.hand[1])
        const va = minskad ? 0 : Math.sin(sek * 5.2) * 0.34, dxa = hx0 - sx, dya = hy0 - sy
        gl.uniform4f(u(pBild, 'arm'), sx, sy, sx + dxa * Math.cos(va) - dya * Math.sin(va), sy + dxa * Math.sin(va) + dya * Math.cos(va))
        gl.uniform1f(u(pBild, 'armR'), ARM.r * kk)
      }
      // Tidslinjen som flytande droppar: en aktiv droppe med släpande svans
      const mal = Math.min(SCENER.length - 1, sc + klamp((T - SCENER[sc]!.fran) / ((SCENER[sc + 1]?.fran ?? SLUT) - SCENER[sc]!.fran)))
      const nv = nav.current
      nv.v += (mal - nv.x) * 0.08; nv.v *= 0.72; nv.x += nv.v; nv.svans += (nv.x - nv.svans) * 0.06
      const navB = W < 560 ? W - 32 : W - 32 - 220
      const px = (i: number) => (16 + NAV_KANT + (i / (SCENER.length - 1)) * (navB - 2 * NAV_KANT)) * DPR
      const py = 38 * DPR
      const dr = new Float32Array(21)
      for (let i = 0; i < 5; i++) { dr[i * 3] = px(i); dr[i * 3 + 1] = py; dr[i * 3 + 2] = (Math.abs(nv.x - i) < 0.6 ? 5 : 3.2) * DPR }
      dr[15] = px(nv.x); dr[16] = py; dr[17] = 7 * DPR
      dr[18] = px(nv.svans); dr[19] = py; dr[20] = (2.4 + Math.min(4, Math.abs(nv.x - nv.svans) * 6)) * DPR
      gl.uniform3fv(u(pBild, 'drops'), dr)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (Math.round(nu / 33) % 2 === 0) { setVisT(T); setNavPos({ x: nv.x, svans: nv.svans, hav: havNiva, bredd: navB }) }
      raf = requestAnimationFrame(ruta)
    }
    raf = requestAnimationFrame(ruta)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); cv.removeEventListener('pointermove', flytta); cv.removeEventListener('pointerleave', lamna) }
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
        <p>Svalla · Sveriges samlade skärgårdssida</p>
      </div>
    )
  }

  return (
    <div className="ki-scen" ref={scen}>
      <canvas ref={canvas} className="ki-canvas" aria-label="Introt: blå prickar blir Sverige, sedan Svallas segelbåt och till sist ett hav." />
      <div className="ki-topp">
        <span className={tips ? 'ki-tips syns' : 'ki-tips'}>Bäst med ljud</span>
        <button type="button" className="ki-ljud" onClick={vaxlaLjud} aria-pressed={ljud}>{ljud ? 'Ljud på' : 'Ljud av'}</button>
      </div>
      {visaIn && (
        <div className="ki-in">
          <button type="button" className="ki-knapp" onClick={() => efter?.()}>Gå in på Svalla <i>→</i></button>
        </div>
      )}
      <div className={navPos.hav < 0.91 ? 'ki-nav ljus' : 'ki-nav'}>
        <div className="ki-namn" style={{ width: navPos.bredd }}>
          {SCENER.map((s, i) => (
            <button key={s.namn} type="button" style={{ left: NAV_KANT + (i / (SCENER.length - 1)) * (navPos.bredd - 2 * NAV_KANT) }} className={Math.round(navPos.x) === i ? 'pa' : ''} onClick={() => hoppa(s.fran)}>{s.namn}</button>
          ))}
        </div>
      </div>
      <div className={navPos.hav < 0.91 ? 'ki-styr ljus' : 'ki-styr'}>
        <button type="button" onClick={() => hoppa(0)}>Spela igen</button>
        <button type="button" onClick={() => hoppa(SLUT)}>Hoppa över</button>
      </div>
      <style>{CSS}</style>
    </div>
  )
}

const CSS = `
.ki-scen{position:relative;border-radius:26px;overflow:hidden;background:#fff;box-shadow:0 18px 50px rgba(13,36,64,.14);aspect-ratio:16/9;min-height:380px;touch-action:pan-y}
.ki-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:crosshair}
.ki-topp{position:absolute;top:14px;right:14px;display:flex;align-items:center;gap:10px;z-index:3}
.ki-tips{font:700 10.5px/1 Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#1b57a0;background:#fff;border:1.5px solid #1b57a0;border-radius:999px;padding:7px 11px;opacity:0;transform:translateY(-4px);transition:opacity 1.1s,transform 1.1s}
.ki-tips.syns{opacity:1;transform:none}
.ki-ljud{font:700 11px/1 Inter,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:#1b57a0;border:none;border-radius:999px;padding:8px 13px;cursor:pointer}
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
.ki-styr{position:absolute;right:16px;bottom:18px;display:flex;gap:8px;z-index:3;--f:#1b57a0}
.ki-styr.ljus{--f:#fff}
.ki-styr button{border:1.5px solid var(--f);background:none;color:var(--f);font:700 12px/1 Inter,system-ui,sans-serif;border-radius:999px;padding:8px 12px;cursor:pointer;transition:color .6s,border-color .6s}
.ki-reserv{display:flex;align-items:flex-start;justify-content:center}
.ki-reserv-hav{position:absolute;left:0;right:0;bottom:0;height:40%;background:#1b57a0}
.ki-reserv p{margin-top:18%;font:700 13px Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#1b57a0}
@media (max-width:860px){.ki-scen{aspect-ratio:4/5;min-height:0}.ki-in{bottom:96px}}
@media (max-width:560px){.ki-topp{flex-direction:column-reverse;align-items:flex-end;gap:6px}.ki-styr,.ki-styr.ljus{top:14px;left:14px;right:auto;bottom:auto;--f:#1b57a0}.ki-styr button{font-size:11px;padding:7px 10px}.ki-namn button{font-size:8.5px;letter-spacing:.06em}}
`
