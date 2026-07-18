'use client'

export default function InlineFeedbackButton() {
  return (
    <button
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent('svalla:openFeedback', { detail: { type: 'fel-info' } }),
        )
      }
      style={{
        color: 'var(--sea)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
        padding: 0,
        textDecoration: 'underline',
      }}
    >
      Berätta för oss
    </button>
  )
}
