'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function TagFollowButton({ tag }: { tag: string }) {
  const [userId,    setUserId]    = useState<string | null>(null)
  const [following, setFollowing] = useState(false)
  const [loading,   setLoading]   = useState(true)
  const [saving,    setSaving]    = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      setUserId(user.id)
      const { count } = await supabase
        .from('tag_follows')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('tag', tag)
      setFollowing((count ?? 0) > 0)
      setLoading(false)
    })
  }, [tag])

  if (loading || !userId) return null

  async function toggle() {
    if (!userId || saving) return
    setSaving(true)
    const supabase = createClient()
    if (following) {
      await supabase.from('tag_follows').delete().eq('user_id', userId).eq('tag', tag)
      setFollowing(false)
    } else {
      await supabase.from('tag_follows').insert({ user_id: userId, tag })
      setFollowing(true)
    }
    setSaving(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={saving}
      aria-label={following ? `Sluta följa #${tag}` : `Följ #${tag}`}
      aria-pressed={following}
      className="press-feedback"
      style={{
        padding: '8px 18px',
        borderRadius: 20,
        border: following ? '1.5px solid rgba(10,123,140,0.3)' : 'none',
        background: following
          ? 'rgba(10,123,140,0.07)'
          : 'var(--grad-sea)',
        color: following ? 'var(--sea)' : '#fff',
        fontSize: 13, fontWeight: 700,
        cursor: saving ? 'default' : 'pointer',
        opacity: saving ? 0.7 : 1,
        transition: 'all 0.15s',
        WebkitTapHighlightColor: 'transparent',
        flexShrink: 0,
      }}
    >
      {following ? 'Följer' : 'Följ'}
    </button>
  )
}
