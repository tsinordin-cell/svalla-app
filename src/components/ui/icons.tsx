// Svalla icon set — Lucide/Tabler-inspired, stroke 1.75, rounded caps.
// Matches design_handoff_svalla_uplift/icons.jsx (TypeScript version).

import React from 'react'

interface IconProps {
  size?: number
  stroke?: number
  fill?: string
  color?: string
  viewBox?: string
  style?: React.CSSProperties
  className?: string
}

const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 22,
  stroke = 1.75,
  fill = 'none',
  color = 'currentColor',
  children,
  viewBox = '0 0 24 24',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill={fill}
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    {children}
  </svg>
)

// ── Svalla wordmark sailboat silhouette ──────────────────────────
export const SvallaMark: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#162d3a',
}) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 20 23" fill="none">
    <path d="M10 1.2 C 13 5, 15.5 10, 16.2 14.8 L 10 14.8 Z" fill={color} />
    <path
      d="M10 3.8 L 10 14.8 L 4.2 14.8 C 5.5 10.5, 7.5 6.5, 10 3.8 Z"
      fill={color}
      opacity={0.55}
    />
    <path
      d="M1.8 16.8 L 18.2 16.8 C 17.5 19, 15.5 20.8, 13 20.8 L 7 20.8 C 4.5 20.8, 2.5 19, 1.8 16.8 Z"
      fill={color}
    />
  </svg>
)

// ── Nav / utility ────────────────────────────────────────────────
export const IconCompass: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <path
      d="M15.5 8.5 L 13 13 L 8.5 15.5 L 11 11 Z"
      fill={p.color || 'currentColor'}
      opacity={0.18}
    />
    <path d="M15.5 8.5 L 13 13 L 8.5 15.5 L 11 11 Z" />
  </Icon>
)

export const IconRoute: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <circle cx="6" cy="6.5" r="2.3" />
    <circle cx="18" cy="17.5" r="2.3" />
    <path d="M8.3 6.5 H 13.5 A 3.5 3.5 0 0 1 13.5 13.5 H 10.5 A 3.5 3.5 0 0 0 10.5 20.5 H 15.7" />
  </Icon>
)

export const IconHome: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M3.2 10.8 L 12 3.2 L 20.8 10.8 V 20 A 1.2 1.2 0 0 1 19.6 21.2 H 15 V 14.5 H 9 V 21.2 H 4.4 A 1.2 1.2 0 0 1 3.2 20 Z" />
  </Icon>
)

export const IconPlus: React.FC<IconProps> = (p) => (
  <Icon {...p} stroke={p.stroke ?? 2.2}>
    <path d="M12 5 V 19 M 5 12 H 19" />
  </Icon>
)

export const IconSearch: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.8" />
    <path d="M16.2 16.2 L 20.5 20.5" />
  </Icon>
)

export const IconBell: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M6 16.5 V 11 A 6 6 0 0 1 18 11 V 16.5 L 19.5 18.5 A 0.5 0.5 0 0 1 19.1 19.3 H 4.9 A 0.5 0.5 0 0 1 4.5 18.5 Z" />
    <path d="M10 21.3 A 2 2 0 0 0 14 21.3" />
  </Icon>
)

// ── Actions ──────────────────────────────────────────────────────
export const IconHeart: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M12 20.3 C 4 15, 3 9, 6.8 6.5 C 9.3 4.9, 11.3 6.5, 12 8.3 C 12.7 6.5, 14.7 4.9, 17.2 6.5 C 21 9, 20 15, 12 20.3 Z" />
  </Icon>
)

export const IconHeartFill: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 22,
  color = '#ef4444',
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 20.8 C 4 15.3, 2.5 8.8, 6.8 6 C 9.5 4.2, 11.5 6, 12 8 C 12.5 6, 14.5 4.2, 17.2 6 C 21.5 8.8, 20 15.3, 12 20.8 Z" />
  </svg>
)

export const IconComment: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M4 6 A 2 2 0 0 1 6 4 H 18 A 2 2 0 0 1 20 6 V 14 A 2 2 0 0 1 18 16 H 11.5 L 7.5 19.8 A 0.6 0.6 0 0 1 6.5 19.3 V 16 H 6 A 2 2 0 0 1 4 14 Z" />
  </Icon>
)

export const IconShare: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M12 3.2 V 15" />
    <path d="M7.5 7.5 L 12 3 L 16.5 7.5" />
    <path d="M5 13.5 V 19 A 2 2 0 0 0 7 21 H 17 A 2 2 0 0 0 19 19 V 13.5" />
  </Icon>
)

export const IconBookmark: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M6.5 3.5 H 17.5 A 0.8 0.8 0 0 1 18.3 4.3 V 20.5 L 12 16.5 L 5.7 20.5 V 4.3 A 0.8 0.8 0 0 1 6.5 3.5 Z" />
  </Icon>
)

export const IconDots: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <circle cx="5.5" cy="12" r="1.5" fill={p.color || 'currentColor'} />
    <circle cx="12" cy="12" r="1.5" fill={p.color || 'currentColor'} />
    <circle cx="18.5" cy="12" r="1.5" fill={p.color || 'currentColor'} />
  </Icon>
)

// ── Contextual ────────────────────────────────────────────────────
export const IconAnchor: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7 V 21" />
    <path d="M8 10.5 H 16" />
    <path d="M3.5 14 C 4.5 19, 8.5 21, 12 21 C 15.5 21, 19.5 19, 20.5 14" />
    <path d="M3.5 14 L 5 12.5 M 3.5 14 L 5 15.5" />
    <path d="M20.5 14 L 19 12.5 M 20.5 14 L 19 15.5" />
  </Icon>
)

export const IconUser: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4 21 C 5 16, 9 14, 12 14 C 15 14, 19 16, 20 21" />
  </Icon>
)

export const IconLocation: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M12 21.3 C 7 14.5, 4.8 11, 4.8 7.8 A 7.2 7.2 0 0 1 19.2 7.8 C 19.2 11, 17 14.5, 12 21.3 Z" />
    <circle cx="12" cy="8" r="2.4" />
  </Icon>
)

export const IconBoat: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M3 14.5 L 21 14.5 L 18.5 19.5 A 1.5 1.5 0 0 1 17.2 20.3 H 6.8 A 1.5 1.5 0 0 1 5.5 19.5 Z" />
    <path d="M5 14.5 V 10 A 1 1 0 0 1 6 9 H 18 A 1 1 0 0 1 19 10 V 14.5" />
    <path d="M12 9 V 3.5 L 17 9" />
  </Icon>
)

export const IconWind: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M3 9 H 13.5 A 2.5 2.5 0 1 0 11 6.5" />
    <path d="M3 13 H 17 A 2.5 2.5 0 1 1 14.5 15.5" />
    <path d="M3 17 H 10.5" />
  </Icon>
)

export const IconSun: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5 V 4.5 M 12 19.5 V 21.5 M 2.5 12 H 4.5 M 19.5 12 H 21.5 M 5.3 5.3 L 6.7 6.7 M 17.3 17.3 L 18.7 18.7 M 5.3 18.7 L 6.7 17.3 M 17.3 6.7 L 18.7 5.3" />
  </Icon>
)

export const IconChevronRight: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M9 5.5 L 15.5 12 L 9 18.5" />
  </Icon>
)

export const IconChevronLeft: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M15 5.5 L 8.5 12 L 15 18.5" />
  </Icon>
)

export const IconSparkle: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path
      d="M12 3 L 13.2 9.8 L 20 11 L 13.2 12.2 L 12 19 L 10.8 12.2 L 4 11 L 10.8 9.8 Z"
      fill={p.color || 'currentColor'}
    />
    <path
      d="M19 3.5 L 19.6 5.4 L 21.5 6 L 19.6 6.6 L 19 8.5 L 18.4 6.6 L 16.5 6 L 18.4 5.4 Z"
      fill={p.color || 'currentColor'}
    />
  </Icon>
)

export const IconTrophy: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M7 4 H 17 V 9 A 5 5 0 0 1 7 9 Z" />
    <path d="M7 5.5 H 4 V 7.5 A 3 3 0 0 0 7 10.5" />
    <path d="M17 5.5 H 20 V 7.5 A 3 3 0 0 1 17 10.5" />
    <path d="M9.5 14 H 14.5 L 15.5 20 H 8.5 Z" />
  </Icon>
)

export const IconMap: React.FC<IconProps> = (p) => (
  <Icon {...p}>
    <path d="M3.5 6.5 L 9 4.5 L 15 6.5 L 20.5 4.5 V 17.5 L 15 19.5 L 9 17.5 L 3.5 19.5 Z" />
    <path d="M9 4.5 V 17.5" />
    <path d="M15 6.5 V 19.5" />
  </Icon>
)
