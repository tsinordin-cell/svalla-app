'use client'
import React from 'react'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number
  children: React.ReactNode
  /** Extra style on the button container */
  style?: React.CSSProperties
}

/**
 * 40×40 circular icon button with teal hover.
 * Minimum touch target: 44px (via padding trick on the parent grid/flex).
 */
const IconButton: React.FC<IconButtonProps> = ({
  size = 40,
  children,
  style,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={['icon-btn-ui', className].filter(Boolean).join(' ')}
      style={{
        width: size,
        height: size,
        minWidth: 44,
        minHeight: 44,
        borderRadius: 999,
        border: 'none',
        background: 'rgba(10,123,140,0.08)',
        color: 'var(--teal, #0a7b8c)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.15s',
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export default IconButton
