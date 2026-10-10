-- Stäng de öppna insert-policyerna (rester efter revisionen, 2026-10-10).
--
-- Varför: fem tabeller tog emot skrivningar direkt från webbläsaren med den
-- publika nyckeln. Valideringen och rate-limiten i API-routerna gick därför
-- att kringgå. Från och med samma PR skriver koden till de här tabellerna
-- bara via servern (tjänsteklienten), så policyerna behövs inte längre.
--
--   notifications      – inloggade kunde skapa valfri notis till vem som helst
--   business_leads     – /registrera-krog  → /api/registrera-krog
--   partner_inquiries  – /partner          → /api/partner-inquiry
--   route_feedback     – /planera          → /api/route-feedback
--   site_feedback      – feedbackknappen   → /api/feedback
--
-- Läsning, uppdatering och övriga policyer rörs inte.
-- Körs EFTER att koden är ute (annars slutar de gamla klientanropen fungera
-- under minuterna mellan körning och deploy). Idempotent.

drop policy if exists "notifications_insert"            on public.notifications;
drop policy if exists "business_leads: anon insert"     on public.business_leads;
drop policy if exists "partner_inquiries_insert_anyone" on public.partner_inquiries;
drop policy if exists "route_feedback_insert"           on public.route_feedback;
drop policy if exists "site_feedback_insert_anon"       on public.site_feedback;
