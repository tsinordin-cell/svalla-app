'use client'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase'

/**
 * Besökarens tillstånd i en forumtråd — hämtat i klienten, i EN batch.
 *
 * VARFÖR (2026-08-02): trådsidan bakade tidigare in per-besökare-data i
 * server-HTML:en på sju ställen (liked_by_user per inlägg, isSubscribed,
 * isSaved, ägarstatistik, isThreadOwner, login-CTA). Serverns auth.getUser()
 * läser cookies → sidan blev dynamisk och `revalidate = 30` var verkningslös:
 * varje besökare fick en full omrendering (uppmätt 619–683 ms, MISS varje
 * gång). Trådar är dessutom sajtens indexerade innehåll — de ska serveras
 * från CDN.
 *
 * Regeln (CLAUDE.md p27): servern får inte fråga vem som tittar för att
 * bestämma vad som SYNS. Därför hämtas allt betraktarberoende här:
 *   - EN fråga för besökarens likes på trådens alla inlägg
 *     (inte en per like-knapp — en tråd kan ha 30+ inlägg)
 *   - EN fråga för bevakning, EN för loppis-sparning (bara vid behov)
 * Allt körs parallellt efter mount. Servern renderar neutral HTML
 * (räknare och innehåll är samma för alla), knapparna får sitt tillstånd
 * när svaret kommer — samma mönster som DmButton/ViewerGate på /u och /tur.
 */

type ViewerState = {
  /** undefined = svar ej klart än, null = utloggad */
  viewerId: string | null | undefined
  isThreadOwner: boolean
  likedPostIds: Set<string>
  isSubscribed: boolean
  isSaved: boolean
  setIsSubscribed: (v: boolean) => void
  setIsSaved: (v: boolean) => void
}

const Ctx = createContext<ViewerState>({
  viewerId: undefined,
  isThreadOwner: false,
  likedPostIds: new Set(),
  isSubscribed: false,
  isSaved: false,
  setIsSubscribed: () => {},
  setIsSaved: () => {},
})

export function useForumViewer() {
  return useContext(Ctx)
}

export function ForumViewerProvider({
  threadId,
  threadOwnerId,
  postIds,
  isLoppis,
  children,
}: {
  threadId: string
  threadOwnerId: string
  postIds: string[]
  isLoppis: boolean
  children: ReactNode
}) {
  const supabase = useRef(createClient()).current
  const [viewerId, setViewerId] = useState<string | null | undefined>(undefined)
  const [likedPostIds, setLiked] = useState<Set<string>>(new Set())
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    let avbruten = false
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (avbruten) return
      if (!user) { setViewerId(null); return }
      setViewerId(user.id)
      const [likesRes, subRes, saveRes] = await Promise.all([
        postIds.length
          ? supabase.from('forum_post_likes').select('post_id').eq('user_id', user.id).in('post_id', postIds)
          : Promise.resolve({ data: [] as { post_id: string }[] }),
        supabase.from('forum_subscriptions').select('user_id').eq('user_id', user.id).eq('thread_id', threadId).maybeSingle(),
        isLoppis
          ? supabase.from('loppis_saves').select('user_id').eq('user_id', user.id).eq('thread_id', threadId).maybeSingle()
          : Promise.resolve({ data: null }),
      ])
      if (avbruten) return
      setLiked(new Set((likesRes.data ?? []).map((r: { post_id: string }) => r.post_id)))
      setIsSubscribed(!!subRes.data)
      setIsSaved(!!saveRes.data)
    })()
    return () => { avbruten = true }
    // postIds är stabil per server-rendering av tråden
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId])

  return (
    <Ctx.Provider value={{
      viewerId,
      isThreadOwner: viewerId === threadOwnerId,
      likedPostIds,
      isSubscribed,
      isSaved,
      setIsSubscribed,
      setIsSaved,
    }}>
      {children}
    </Ctx.Provider>
  )
}
