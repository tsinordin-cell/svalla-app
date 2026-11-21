'use client'
/**
 * INTROT, version 2 (2026-11-21). Rent WebGL2, inga bibliotek.
 * Partiklar ritas som mjuka fläckar till en täthetsbild, suddas, och tröskelvärdet ger en bläckkant.
 * Under bläcket ligger ett vätskefält (128 punkter brett) som krusar kanten; musen och fingret rör om.
 * Kornet i kanten kommer från en förberäknad brustextur i två skalor. Strikt två färger.
 * Båten och texten ligger i egna kanaler och inverterar havet där de korsar det.
 * Sveriges kontur: Natural Earth via world.geo.json (fri att använda), förenklad.
 */
import { useEffect, useRef, useState } from 'react'

const BLA = [0.106, 0.341, 0.627] // #1b57a0
const SLUT = 11800
const SCENER = [
  { namn: 'Prickar', fran: 0 },
  { namn: 'Sverige', fran: 2600 },
  { namn: 'Båten', fran: 5200 },
  { namn: 'Havet', fran: 7800 },
  { namn: 'In', fran: 10400 },
]

/* Sverige, Öland och Gotland (lng, lat). */
const SVERIGE: [number, number][][] = [
  [[22.18,65.72],[21.21,65.03],[21.37,64.41],[19.78,63.61],[17.85,62.75],[17.12,61.34],[17.83,60.64],[18.79,60.08],[17.87,58.95],[16.83,58.72],[16.45,57.04],[15.88,56.10],[14.67,56.20],[14.10,55.41],[12.94,55.36],[12.63,56.31],[11.79,57.44],[11.03,58.86],[11.47,59.43],[12.30,60.12],[12.63,61.29],[11.99,61.80],[11.93,63.13],[12.58,64.07],[13.57,64.05],[13.92,64.45],[13.56,64.79],[15.11,66.19],[16.11,67.30],[16.77,68.01],[17.73,68.01],[17.99,68.57],[19.88,68.41],[20.03,69.07],[20.65,69.11],[21.98,68.62],[23.54,67.94],[23.57,66.40],[23.90,66.01]],
  [[17.06,57.39],[17.21,57.33],[16.43,56.18],[16.36,56.56]],
  [[19.36,57.96],[18.80,57.65],[18.83,57.44],[19.00,57.44],[18.95,57.37],[18.69,57.31],[18.71,57.20],[18.46,57.13],[18.32,56.93],[18.11,56.89],[18.19,57.11],[18.07,57.27],[18.15,57.39],[18.09,57.55],[18.66,57.93],[19.04,57.94],[19.11,57.99],[19.37,58.00]],
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

/* Svallas båt (loggan B: mast, två segel) med skrov och två personer, i en ruta bw × bh med origo uppe till vänster. */
function ritaBat(c: CanvasRenderingContext2D, x: number, y: number, bw: number) {
  const k = bw / 120
  c.save(); c.translate(x, y); c.scale(k, k)
  c.beginPath(); c.rect(57, 4, 3.4, 80); c.fill()
  c.beginPath(); c.moveTo(61, 8); c.lineTo(106, 76); c.lineTo(61, 76); c.closePath(); c.fill()
  c.beginPath(); c.moveTo(56, 26); c.lineTo(13, 74); c.lineTo(56, 74); c.closePath(); c.fill()
  c.beginPath(); c.arc(38, 70, 4.6, 0, Math.PI * 2); c.fill(); c.fillRect(35, 74, 6.4, 10)
  c.beginPath(); c.arc(78, 69, 4.6, 0, Math.PI * 2); c.fill(); c.fillRect(75, 73, 6.4, 11)
  c.beginPath(); c.moveTo(4, 84); c.quadraticCurveTo(60, 95, 116, 84); c.lineTo(102, 103); c.quadraticCurveTo(60, 110, 18, 103); c.closePath(); c.fill()
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
uniform sampler2D den; uniform sampler2D vel; uniform sampler2D korn; uniform sampler2D txt;
uniform vec2 res; uniform float t; uniform float hav; uniform float vag; uniform float txtA; uniform vec3 bla; uniform vec3 drops[7];
in vec2 uv; out vec4 o;
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
  float a = kant(d.r + havF, th);
  float b = kant(d.g, th);
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
    let attr = { droppT: new Float32Array(0), r: new Float32Array(0), size: new Float32Array(0) }
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
      // Prickar: målarstänk med olika storlek och en tid när de landar
      const droppar = Array.from({ length: 28 }, (_, i) => ({ x: 0.08 + r() * 0.84, y: 0.1 + r() * 0.62, rad: (0.018 + r() * r() * 0.07) * Math.min(W, H * 1.6), t: 150 + i * 80 + r() * 60 }))
      const vikter = droppar.map(d => d.rad * d.rad); const summa = vikter.reduce((a, b) => a + b, 0)
      const prick = new Float32Array(N * 2), droppT = new Float32Array(N), rr = new Float32Array(N), size = new Float32Array(N)
      for (let i = 0; i < N; i++) {
        let v = r() * summa, k = 0
        while (k < droppar.length - 1 && v > vikter[k]!) { v -= vikter[k]!; k++ }
        const d = droppar[k]!, a = r() * Math.PI * 2, ra = Math.sqrt(r()) * d.rad
        prick[i * 2] = d.x * W + Math.cos(a) * ra; prick[i * 2 + 1] = d.y * H + Math.sin(a) * ra
        droppT[i] = d.t + r() * 120; rr[i] = r(); size[i] = bas * (0.75 + r() * 0.6)
      }
      // Sverige: kontur från Natural Earth, inpassad i scenen
      const k = Math.cos((62 * Math.PI) / 180)
      const alla = SVERIGE.flat()
      const xs = alla.map(p => p[0] * k), ys = alla.map(p => -p[1])
      const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
      const sk = Math.min((W * 0.5) / (x1 - x0), (H * 0.8) / (y1 - y0))
      const ox = W / 2 - ((x0 + x1) / 2) * sk, oy = H * 0.5 - ((y0 + y1) / 2) * sk
      const sve = provForm(W, H, N, c => { for (const ring of SVERIGE) { c.beginPath(); ring.forEach((p, j) => { const px = p[0] * k * sk + ox, py = -p[1] * sk + oy; if (j) c.lineTo(px, py); else c.moveTo(px, py) }); c.closePath(); c.fill() } }, r)
      // Båten
      const bw = Math.min(W * 0.3, H * 0.46), bh = (bw * 110) / 120
      batRuta = { bw, bh }
      const bat = provForm(W, H, N, c => ritaBat(c, (W - bw) / 2, (H - bh) / 2, bw), r)
      // Dyning under båten och havet
      const dyn = new Float32Array(N * 2), hav = new Float32Array(N * 2)
      for (let i = 0; i < N; i++) {
        dyn[i * 2] = r() * W; dyn[i * 2 + 1] = H * (0.9 + r() * 0.12)
        hav[i * 2] = r() * W; hav[i * 2 + 1] = H * (0.66 + r() * 0.38)
      }
      fran = { prick, sve, bat, dyn, hav }
      attr = { droppT, r: rr, size }
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
      const t = minskad ? SLUT : Math.min(nu - start.current, SLUT + 600000)
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
      const malY = vattenlinje - batRuta.bh * 0.86 - batY
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
        data[o + 2] = A.size[i]! * (0.35 + 0.65 * ease(syns)) * (1 + 0.25 * (1 - syns))
        data[o + 3] = syns
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
      // Tidslinjen som flytande droppar: en aktiv droppe med släpande svans
      const mal = Math.min(SCENER.length - 1, sc + klamp((T - SCENER[sc]!.fran) / ((SCENER[sc + 1]?.fran ?? SLUT) - SCENER[sc]!.fran)))
      const nv = nav.current
      nv.v += (mal - nv.x) * 0.08; nv.v *= 0.72; nv.x += nv.v; nv.svans += (nv.x - nv.svans) * 0.06
      const navB = W < 560 ? W - 32 : W - 32 - 220
      const px = (i: number) => (16 + 10 + (i / (SCENER.length - 1)) * (navB - 20)) * DPR
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
      <div className={navPos.hav < 0.93 ? 'ki-nav ljus' : 'ki-nav'}>
        <div className="ki-namn" style={{ width: navPos.bredd }}>
          {SCENER.map((s, i) => (
            <button key={s.namn} type="button" style={{ left: 10 + (i / (SCENER.length - 1)) * (navPos.bredd - 20) }} className={Math.round(navPos.x) === i ? 'pa' : ''} onClick={() => hoppa(s.fran)}>{s.namn}</button>
          ))}
        </div>
        <button type="button" className="ki-hoppa" onClick={() => hoppa(SLUT)}>Hoppa över</button>
        <button type="button" className="ki-igen" onClick={() => hoppa(0)}>Spela igen</button>
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
.ki-hoppa,.ki-igen{position:absolute;top:8px;border:1.5px solid var(--f);background:none;color:var(--f);font:700 12px/1 Inter,system-ui,sans-serif;border-radius:999px;padding:8px 12px;cursor:pointer;transition:color .6s,border-color .6s}
.ki-hoppa{right:0}
.ki-igen{right:110px}
.ki-reserv{display:flex;align-items:flex-start;justify-content:center}
.ki-reserv-hav{position:absolute;left:0;right:0;bottom:0;height:40%;background:#1b57a0}
.ki-reserv p{margin-top:18%;font:700 13px Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#1b57a0}
@media (max-width:860px){.ki-scen{aspect-ratio:4/5;min-height:0}.ki-in{bottom:96px}}
@media (max-width:560px){.ki-hoppa,.ki-igen{top:-34px}.ki-namn button{font-size:8.5px;letter-spacing:.06em}}
`
