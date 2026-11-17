import { ImageResponse } from 'next/og'
import { ogTypsnitt } from '@/app/api/og/_typsnitt/typsnitt'

// Standardbild för delning (WhatsApp, Facebook, X). Ritas en gång vid bygget:
// inga cookies, headers eller nätanrop, så Next kan cacha PNG:n som statisk fil.
// Scenen är HeroAnimation variant 1 (klar sommardag), samma palett och former
// som startsidans hjälte. Lager, i den ordningen och inget emellan:
// SKY, ISLAND, WATER_SURFACE, UNDERWATER, UI.
// Vattnet täcker landkanten med 2 till 5 px så ingen mörk glipa syns.
// Kölerna ligger på vågens höjd. Inga träd, tumlare, ankare eller clipart.

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const alt = 'Svalla | Planera din skärgårdsvistelse'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const W = 1200
const H = 630
const WL = H * 0.58
const sceneH = Math.min(H, W * 1.3)

const r = (v: number) => Math.round(v * 10) / 10
const peakY = (hFrac: number) => WL - sceneH * (0.58 - hFrac)

// Lugn fjärd, samma idé som HeroAnimation variant 1. Amplituden är liten men
// synlig. Ön fortsätter under vågdalen så vattnet alltid täcker landkanten
// med några pixlar och ingen mörk glipa öppnas.
function waveY(x: number) {
  return WL - 1 + Math.sin(x * 0.0052) * 4.2 + Math.sin(x * 0.013 + 0.8) * 1.6
}

const ISLAND_BOTTOM = WL + 8

function wavePath(close: boolean) {
  let d = ''
  for (let x = 0; x <= W; x += 8) {
    d += `${x === 0 ? 'M' : 'L'}${r(x)},${r(waveY(x))} `
  }
  if (close) d += `L${W},${H} L0,${H} Z`
  return d
}

function ripplePath(offset: number) {
  let d = ''
  for (let x = 0; x <= W; x += 8) {
    const y = waveY(x) + offset + Math.sin(x * 0.0035 + 0.9) * 1.4
    d += `${x === 0 ? 'M' : 'L'}${r(x)},${r(y)} `
  }
  return d
}

const SUN_X = W * 0.73
const SUN_Y = H * 0.092
const SUN_R = H * 0.034

const farIsland = (parts: string) => (
  <path d={parts} fill="rgba(105,135,155,0.48)" />
)

function sjobod(bx: number, by: number, color: string, key: string) {
  const bw = W * 0.016
  const bh = sceneH * 0.016
  return (
    <g key={key}>
      <rect x={r(bx - bw / 2)} y={r(by)} width={r(bw)} height={r(bh)} fill={color} />
      <path
        d={`M${r(bx - bw / 2 - 1)},${r(by)} L${r(bx + bw / 2 + 1)},${r(by)} L${r(bx)},${r(by - bh * 0.62)} Z`}
        fill="rgba(28,14,8,0.78)"
      />
    </g>
  )
}

function pine(x: number, y: number, h: number, key: string) {
  const w2 = h * 0.28
  return (
    <g key={key}>
      <rect x={r(x - 1.6)} y={r(y)} width={3.2} height={r(h * 0.16)} fill="#4e3018" />
      <path d={`M${r(x)},${r(y - h)} L${r(x + w2)},${r(y)} L${r(x - w2)},${r(y)} Z`} fill="#234a20" />
      <path d={`M${r(x)},${r(y - h * 1.3)} L${r(x + w2 * 0.62)},${r(y - h * 0.38)} L${r(x - w2 * 0.62)},${r(y - h * 0.38)} Z`} fill="#2e5e2a" />
    </g>
  )
}

function fishingNet(x: number, y: number) {
  const nw = W * 0.034
  const nh = sceneH * 0.028
  const top = y - nh
  return (
    <g key="net">
      <line x1={r(x)} y1={r(y)} x2={r(x)} y2={r(top - 6)} stroke="#4a3010" strokeWidth={1.8} />
      <line x1={r(x + nw)} y1={r(y)} x2={r(x + nw)} y2={r(top - 6)} stroke="#4a3010" strokeWidth={1.8} />
      <line x1={r(x)} y1={r(top)} x2={r(x + nw)} y2={r(top)} stroke="rgba(160,125,70,0.9)" strokeWidth={1.3} />
      {[0, 1, 2, 3, 4].map(i => (
        <line key={`nv${i}`} x1={r(x + (nw * i) / 4)} y1={r(top)} x2={r(x + (nw * i) / 4)} y2={r(y)} stroke="rgba(88,65,36,0.55)" strokeWidth={0.7} />
      ))}
      {[0, 1, 2].map(i => (
        <line key={`nh${i}`} x1={r(x)} y1={r(top + (nh * i) / 2)} x2={r(x + nw)} y2={r(top + (nh * i) / 2 + 2)} stroke="rgba(88,65,36,0.5)" strokeWidth={0.7} />
      ))}
    </g>
  )
}

function cottage(x: number, y: number, small: boolean, key: string) {
  const cw = W * (small ? 0.022 : 0.032)
  const ch = sceneH * (small ? 0.026 : 0.034)
  const roof = ch * 0.62
  return (
    <g key={key}>
      <path
        d={`M${r(x - cw / 2 - 3)},${r(y)} L${r(x + cw / 2 + 3)},${r(y)} L${r(x)},${r(y - roof)} Z`}
        fill="#2a1808"
      />
      <rect x={r(x - cw / 2)} y={r(y)} width={r(cw)} height={r(ch)} fill={small ? '#8a2020' : '#952420'} />
      <rect x={r(x - cw / 2)} y={r(y)} width={3} height={r(ch)} fill="#ede8dc" />
      <rect x={r(x + cw / 2 - 3)} y={r(y)} width={3} height={r(ch)} fill="#ede8dc" />
      <rect x={r(x - cw * 0.15)} y={r(y + ch * 0.22)} width={r(cw * 0.3)} height={r(ch * 0.3)} fill="rgba(120,185,218,0.7)" />
    </g>
  )
}

function flagpole(x: number, y: number) {
  const ph = sceneH * 0.07
  const fw = sceneH * 0.03
  const fh = sceneH * 0.02
  const fy = y - ph
  return (
    <g key="flag">
      <line x1={r(x)} y1={r(y)} x2={r(x)} y2={r(fy)} stroke="#d5d5d5" strokeWidth={1.6} />
      <rect x={r(x)} y={r(fy)} width={r(fw)} height={r(fh)} fill="#006AA7" />
      <rect x={r(x)} y={r(fy + fh * 0.38)} width={r(fw)} height={r(fh * 0.24)} fill="#FECC02" />
      <rect x={r(x + fw * 0.28)} y={r(fy)} width={r(fw * 0.2)} height={r(fh)} fill="#FECC02" />
    </g>
  )
}

function dock(x: number, waterY: number, len: number, key: string) {
  const deckH = 6
  const dTop = waterY - 8
  const posts = [0.08, 0.38, 0.7, 0.94]
  return (
    <g key={key}>
      {posts.map((p, i) => (
        <rect key={i} x={r(x + len * p - 2)} y={r(dTop)} width={4} height={18} fill="#382608" />
      ))}
      <rect x={r(x)} y={r(dTop)} width={r(len)} height={deckH} fill="#6e5028" />
      <rect x={r(x)} y={r(dTop)} width={r(len)} height={2} fill="rgba(210,185,145,0.35)" />
    </g>
  )
}

function boathouse(x: number, y: number) {
  const bw = W * 0.034
  const bh = sceneH * 0.04
  return (
    <g key="boathouse">
      <rect x={r(x - bw * 0.28)} y={r(y)} width={3} height={16} fill="#3a2810" />
      <rect x={r(x - 1.5)} y={r(y)} width={3} height={16} fill="#3a2810" />
      <rect x={r(x + bw * 0.28 - 1.5)} y={r(y)} width={3} height={16} fill="#3a2810" />
      <path
        d={`M${r(x - bw / 2 - 4)},${r(y - bh)} L${r(x + bw / 2 + 4)},${r(y - bh)} L${r(x)},${r(y - bh - bh * 0.5)} Z`}
        fill="#2a1808"
      />
      <rect x={r(x - bw / 2)} y={r(y - bh)} width={r(bw)} height={r(bh)} fill="#8a2020" />
      <rect x={r(x - bw / 2)} y={r(y - bh)} width={3} height={r(bh)} fill="#ede8dc" />
      <rect x={r(x + bw / 2 - 3)} y={r(y - bh)} width={3} height={r(bh)} fill="#ede8dc" />
      <rect x={r(x - bw * 0.26)} y={r(y - bh * 0.55)} width={r(bw * 0.52)} height={r(bh * 0.5)} fill="rgba(6,14,28,0.65)" stroke="#ede8dc" strokeWidth={1} />
    </g>
  )
}

function sauna(x: number, y: number) {
  const sw = W * 0.04
  const sh = sceneH * 0.03
  return (
    <g key="sauna">
      <path
        d={`M${r(x - sw / 2 - 4)},${r(y - sh)} L${r(x + sw / 2 + 4)},${r(y - sh)} L${r(x)},${r(y - sh - sh * 0.38)} Z`}
        fill="#2a1808"
      />
      <rect x={r(x - sw / 2)} y={r(y - sh)} width={r(sw)} height={r(sh)} fill="#5a1818" />
      <rect x={r(x - sw / 2)} y={r(y - sh)} width={4} height={r(sh)} fill="#3e1010" />
      <rect x={r(x + sw / 2 - 4)} y={r(y - sh)} width={4} height={r(sh)} fill="#3e1010" />
      <rect x={r(x + sw * 0.18)} y={r(y - sh - sh * 0.7)} width={6} height={r(sh * 0.55)} fill="#3a2a20" />
    </g>
  )
}

function sailboat(x: number, scale: number) {
  const keel = waveY(x)
  const w = 78 * scale
  const h = 70 * scale
  return (
    <svg
      key={`sail-${x}`}
      width={r(w)}
      height={r(h)}
      viewBox="0 0 78 70"
      style={{ position: 'absolute', left: r(x - w / 2), top: r(keel - h) }}
    >
      <path d="M8,66 C2,67 -8,68 -18,66" stroke="rgba(255,255,255,0.35)" strokeWidth={1.4} fill="none" />
      <path d="M14,70 L64,70 L58,60 L20,60 Z" fill="#e0d0a0" />
      <path d="M20,60 L58,60 C56,54 22,54 20,60 Z" fill="#c8aa60" />
      <line x1={39} y1={60} x2={39} y2={8} stroke="#6e4420" strokeWidth={1.6} />
      <path d="M39,10 L64,58 L39,58 Z" fill="rgba(248,244,232,0.96)" />
      <path d="M39,28 L16,56 L39,56 Z" fill="rgba(248,244,232,0.62)" />
      <path d="M39,8 L50,14 L39,20 Z" fill="#d83838" />
    </svg>
  )
}

function ferry(x: number) {
  const keel = waveY(x)
  const w = 168
  const h = 78
  return (
    <svg
      key="ferry"
      width={w}
      height={h}
      viewBox="0 0 168 78"
      style={{ position: 'absolute', left: r(x - w / 2), top: r(keel - h) }}
    >
      <path d="M20,78 L148,78 L140,64 L28,64 Z" fill="rgba(244,244,240,0.96)" />
      <rect x={30} y={72} width={108} height={4} fill="rgba(22,65,130,0.85)" />
      <rect x={36} y={50} width={96} height={14} fill="rgba(244,244,240,0.94)" />
      <rect x={50} y={40} width={68} height={10} fill="rgba(242,242,238,0.92)" />
      <rect x={44} y={54} width={7} height={6} fill="rgba(110,168,210,0.7)" />
      <rect x={58} y={54} width={7} height={6} fill="rgba(110,168,210,0.7)" />
      <rect x={72} y={54} width={7} height={6} fill="rgba(110,168,210,0.7)" />
      <rect x={100} y={54} width={7} height={6} fill="rgba(110,168,210,0.7)" />
      <rect x={114} y={54} width={7} height={6} fill="rgba(110,168,210,0.7)" />
      <path d="M76,40 L74,22 L94,22 L92,40 Z" fill="rgba(238,192,28,0.96)" />
      <rect x={74} y={30} width={20} height={4} fill="rgba(185,28,28,0.9)" />
    </svg>
  )
}

export default async function OGImage() {
  const fonts = await ogTypsnitt()
  const leftIsland = [
    `M-8,${r(ISLAND_BOTTOM)}`,
    `C${r(W * 0.01)},${r(peakY(0.448))} ${r(W * 0.058)},${r(peakY(0.428))} ${r(W * 0.138)},${r(peakY(0.44))}`,
    `C${r(W * 0.195)},${r(peakY(0.455))} ${r(W * 0.24)},${r(peakY(0.48))} ${r(W * 0.268)},${r(ISLAND_BOTTOM)}`,
    `L-8,${r(ISLAND_BOTTOM)} Z`,
  ].join(' ')
  const rock = [
    `M-8,${r(ISLAND_BOTTOM)}`,
    `L-8,${r(peakY(0.465))}`,
    `C${r(W * 0.012)},${r(peakY(0.428))} ${r(W * 0.04)},${r(peakY(0.418))} ${r(W * 0.062)},${r(peakY(0.445))}`,
    `L${r(W * 0.075)},${r(ISLAND_BOTTOM)} Z`,
  ].join(' ')
  const rightIsland = [
    `M${r(W * 0.508)},${r(ISLAND_BOTTOM)}`,
    `C${r(W * 0.528)},${r(peakY(0.4))} ${r(W * 0.595)},${r(peakY(0.378))} ${r(W * 0.682)},${r(peakY(0.398))}`,
    `C${r(W * 0.74)},${r(peakY(0.425))} ${r(W * 0.78)},${r(peakY(0.47))} ${r(W * 0.796)},${r(ISLAND_BOTTOM)}`,
    `L${r(W * 0.508)},${r(ISLAND_BOTTOM)} Z`,
  ].join(' ')
  const farA = [
    `M0,${r(peakY(0.445))}`,
    `C${r(W * 0.04)},${r(peakY(0.4))} ${r(W * 0.11)},${r(peakY(0.382))} ${r(W * 0.185)},${r(peakY(0.4))}`,
    `C${r(W * 0.23)},${r(peakY(0.415))} ${r(W * 0.265)},${r(peakY(0.435))} ${r(W * 0.295)},${r(peakY(0.445))}`,
    `L0,${r(peakY(0.445))} Z`,
  ].join(' ')
  const farB = [
    `M${r(W * 0.365)},${r(peakY(0.445))}`,
    `C${r(W * 0.395)},${r(peakY(0.388))} ${r(W * 0.495)},${r(peakY(0.368))} ${r(W * 0.608)},${r(peakY(0.386))}`,
    `C${r(W * 0.672)},${r(peakY(0.4))} ${r(W * 0.722)},${r(peakY(0.428))} ${r(W * 0.752)},${r(peakY(0.445))}`,
    `L${r(W * 0.365)},${r(peakY(0.445))} Z`,
  ].join(' ')
  const farC = [
    `M${r(W * 0.825)},${r(peakY(0.445))}`,
    `C${r(W * 0.862)},${r(peakY(0.382))} ${r(W * 0.93)},${r(peakY(0.372))} ${W},${r(peakY(0.39))}`,
    `L${W},${r(peakY(0.445))} Z`,
  ].join(' ')

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#3d94d4',
        }}
      >
        {/* SKY */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: W,
            height: r(WL + 8),
            display: 'flex',
            background: 'linear-gradient(to bottom, #3d94d4 0%, #60aee0 35%, #92c8f0 75%, #b0dcf2 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: r(SUN_X - SUN_R * 7),
            top: r(SUN_Y - SUN_R * 7),
            width: r(SUN_R * 14),
            height: r(SUN_R * 14),
            borderRadius: '50%',
            display: 'flex',
            background: 'radial-gradient(circle, rgba(255,225,90,0.48) 0%, rgba(255,225,90,0.18) 40%, rgba(255,225,90,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: r(SUN_X - SUN_R),
            top: r(SUN_Y - SUN_R),
            width: r(SUN_R * 2),
            height: r(SUN_R * 2),
            borderRadius: '50%',
            display: 'flex',
            background: 'radial-gradient(circle, #fffee0 0%, #ffe070 100%)',
          }}
        />
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
          {farIsland(farA)}
          {farIsland(farB)}
          {farIsland(farC)}
          {sjobod(W * 0.08, peakY(0.411), 'rgba(192,40,28,0.92)', 'b1')}
          {sjobod(W * 0.099, peakY(0.411), 'rgba(200,162,22,0.92)', 'b2')}
          {sjobod(W * 0.118, peakY(0.411), 'rgba(28,76,168,0.92)', 'b3')}
          {sjobod(W * 0.474, peakY(0.4), 'rgba(192,40,28,0.92)', 'b4')}
          {sjobod(W * 0.493, peakY(0.4), 'rgba(200,162,22,0.92)', 'b5')}
          {sjobod(W * 0.512, peakY(0.4), 'rgba(28,76,168,0.92)', 'b6')}
          {sjobod(W * 0.531, peakY(0.4), 'rgba(236,232,224,0.92)', 'b7')}
          {sjobod(W * 0.888, peakY(0.396), 'rgba(200,162,22,0.92)', 'b8')}
          <path d="M300,72 Q286,62 272,72" stroke="rgba(48,70,88,0.8)" strokeWidth={2.2} fill="none" strokeLinecap="round" />
          <path d="M300,72 Q314,62 328,72" stroke="rgba(48,70,88,0.8)" strokeWidth={2.2} fill="none" strokeLinecap="round" />
          <path d="M980,58 Q968,48 956,58" stroke="rgba(48,70,88,0.72)" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M980,58 Q992,48 1004,58" stroke="rgba(48,70,88,0.72)" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M1088,108 Q1078,100 1068,108" stroke="rgba(48,70,88,0.65)" strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <path d="M1088,108 Q1098,100 1108,108" stroke="rgba(48,70,88,0.65)" strokeWidth={1.8} fill="none" strokeLinecap="round" />
        </svg>

        {/* ISLAND */}
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d={leftIsland} fill="#4e7845" />
          <path d={rock} fill="#6e7462" />
          <path d={rightIsland} fill="#4e7845" />
          {pine(W * 0.058, WL * 0.964, sceneH * 0.05, 'p1')}
          {pine(W * 0.1, WL * 0.942, sceneH * 0.056, 'p2')}
          {pine(W * 0.158, WL * 0.938, sceneH * 0.05, 'p3')}
          {pine(W * 0.6, WL * 0.93, sceneH * 0.048, 'p4')}
          {pine(W * 0.66, WL * 0.918, sceneH * 0.054, 'p5')}
          {cottage(W * 0.098, WL - 28, true, 'c1')}
          {cottage(W * 0.15, WL - 36, false, 'c2')}
          {flagpole(W * 0.122, WL - 46)}
          {fishingNet(W * 0.188, WL - 2)}
          {dock(W * 0.222, WL, W * 0.05, 'dock-l')}
          {boathouse(W * 0.56, WL - 4)}
          {sauna(W * 0.72, WL - 18)}
          {dock(W * 0.755, WL, W * 0.032, 'dock-r')}
        </svg>

        {/* WATER_SURFACE */}
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d={wavePath(true)} fill="#2488c0" />
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: r(WL + 28),
            width: W,
            height: r(H - WL),
            display: 'flex',
            background: 'linear-gradient(to bottom, rgba(36,136,192,0) 0%, #186aa8 22%, #104e84 55%, #0a2e5a 100%)',
          }}
        />
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d={wavePath(false)} stroke="rgba(255,255,255,0.62)" strokeWidth={2.2} fill="none" />
          <path d={ripplePath(8)} stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} fill="none" />
          <path d={ripplePath(16)} stroke="rgba(255,255,255,0.10)" strokeWidth={1.2} fill="none" />
          <ellipse cx={r(SUN_X)} cy={r(WL + 18)} rx={28} ry={36} fill="rgba(255,255,255,0.08)" />
          <ellipse cx={r(SUN_X - 6)} cy={r(WL + 6)} rx={9} ry={2} fill="rgba(255,255,255,0.6)" />
          <ellipse cx={r(SUN_X + 12)} cy={r(WL + 16)} rx={12} ry={2.1} fill="rgba(255,255,255,0.38)" />
          <ellipse cx={r(SUN_X - 2)} cy={r(WL + 30)} rx={14} ry={2} fill="rgba(255,255,255,0.24)" />
        </svg>
        {ferry(430)}
        {sailboat(575, 1)}
        {sailboat(1040, 0.82)}

        {/* UNDERWATER */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: r(WL + 8),
            width: W,
            height: r(H - WL - 8),
            display: 'flex',
            background: 'linear-gradient(to bottom, rgba(4,18,48,0) 0%, rgba(4,18,48,0.05) 40%, rgba(4,18,48,0.10) 100%)',
          }}
        />
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d={`M${r(W * 0.28)},${r(WL + 6)} L${r(W * 0.28 + 8)},${r(WL + 6)} L${r(W * 0.28 + 22)},${r(WL + 150)} L${r(W * 0.28 - 14)},${r(WL + 150)} Z`} fill="rgba(100,180,230,0.05)" />
          <path d={`M${r(W * 0.68)},${r(WL + 6)} L${r(W * 0.68 + 8)},${r(WL + 6)} L${r(W * 0.68 + 18)},${r(WL + 140)} L${r(W * 0.68 - 12)},${r(WL + 140)} Z`} fill="rgba(100,180,230,0.045)" />
          <g transform="translate(160,455)">
            <path d="M22,0 C14,-7 -8,-7 -16,0 C-8,7 14,7 22,0 Z" fill="hsla(110,30%,32%,0.88)" />
            <path d="M-14,0 L-30,-9 L-30,9 Z" fill="hsla(110,25%,24%,0.86)" />
            <circle cx={14} cy={-2} r={1.7} fill="#d0b830" />
            <circle cx={14} cy={-2} r={0.8} fill="#050a10" />
          </g>
          <g transform="translate(420,530) scale(-1,1)">
            <path d="M18,0 C12,-8 -6,-8 -14,0 C-6,8 12,8 18,0 Z" fill="hsla(95,40%,34%,0.9)" />
            <path d="M-12,0 L-24,-8 L-24,8 Z" fill="hsla(95,32%,26%,0.86)" />
            <path d="M-2,-7 L3,-13 L7,-7 Z" fill="hsla(18,72%,50%,0.75)" />
            <rect x={2} y={-6} width={2} height={12} fill="hsla(95,20%,16%,0.35)" />
            <rect x={-4} y={-6} width={2} height={12} fill="hsla(95,20%,16%,0.35)" />
            <circle cx={10} cy={-1} r={1.5} fill="#050a10" />
          </g>
          <g transform="translate(980,490)">
            <ellipse cx={0} cy={0} rx={14} ry={5} fill="hsla(200,28%,58%,0.82)" />
            <path d="M-12,0 L-22,-6 L-22,6 Z" fill="hsla(200,22%,42%,0.8)" />
            <circle cx={8} cy={-1} r={1.3} fill="#050a10" />
          </g>
          <g transform="translate(700,575) scale(-1,1)">
            <ellipse cx={0} cy={0} rx={18} ry={7} fill="hsla(38,32%,48%,0.78)" />
            <path d="M-16,0 L-28,-8 L-28,8 Z" fill="hsla(38,28%,38%,0.78)" />
            <circle cx={10} cy={-1} r={1.4} fill="#050a10" />
          </g>
          <g transform="translate(250,590)">
            <path d="M16,0 C10,-5 -8,-5 -14,0 C-8,6 10,6 16,0 Z" fill="hsla(170,22%,30%,0.8)" />
            <path d="M-12,0 L-22,-6 L-22,6 Z" fill="hsla(170,18%,22%,0.8)" />
          </g>
        </svg>

        {/* UI */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: W,
            height: r(WL + 24),
            display: 'flex',
            background: 'linear-gradient(to bottom, rgba(5,20,40,0.10) 0%, rgba(5,20,40,0.18) 28%, rgba(5,20,40,0.08) 62%, rgba(5,20,40,0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 44,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <svg width={46} height={46} viewBox="0 0 32 32">
            <line x1={12} y1={26} x2={12} y2={4} stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" />
            <path d="M12,5 L24,22 L12,22 Z" fill="#ffffff" opacity={0.95} />
            <path d="M12,10 L2,21 L12,21 Z" fill="#ffffff" opacity={0.55} />
            <path d="M3,26 Q8,23 12,26 Q16,23 22,26" stroke="#ffffff" strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={0.8} />
          </svg>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Playfair Display',
              fontSize: 40,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: 4,
              lineHeight: 1,
              textShadow: '0 2px 10px rgba(5,15,30,0.55)',
            }}
          >
            SVALLA
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 86,
            left: 0,
            width: W,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Playfair Display',
              fontSize: 58,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: -1,
              lineHeight: 1.02,
              textShadow: '0 2px 14px rgba(5,15,30,0.78)',
            }}
          >
            Planera din
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Playfair Display',
              fontSize: 58,
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#f6c27a',
              letterSpacing: -1,
              lineHeight: 1.02,
              marginTop: 4,
              textShadow: '0 2px 14px rgba(5,15,30,0.78)',
            }}
          >
            skärgårdsvistelse
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 12,
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.95)',
              letterSpacing: 0.2,
              textShadow: '0 1px 8px rgba(5,15,30,0.75)',
            }}
          >
            Öar, krogar, badplatser och båttider, samlat på ett ställe.
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: 26,
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: 20,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.78)',
            letterSpacing: 0.6,
          }}
        >
          svalla.se
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
