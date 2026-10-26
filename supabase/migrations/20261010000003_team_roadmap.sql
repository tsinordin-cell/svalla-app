-- 2026-10-10 — Roadmap för Tom + Max (fliken "Roadmap" på /team)
--
-- Milstolpar per steg i värdetrappan (samma trappa som exit-briefen och
-- /admin/malet: 1 → 3 → 5 MSEK). Siffrorna (användare, prenumeranter,
-- partners …) lagras INTE här — de räknas live i src/app/team/page.tsx.
-- Här ligger bara det som inte går att räkna: händelser och beslut.
--
-- stage: 0 = Grunden (det som redan är byggt), 1 = Bevis (1 MSEK),
--        2 = Fäste (3 MSEK), 3 = Marknadsledare (5 MSEK → exit).
-- Samma behörighet som övriga team_-tabeller: bara is_team_admin().
-- Idempotent: säker att köra flera gånger.

CREATE TABLE IF NOT EXISTS public.team_milestones (
  id          uuid primary key default gen_random_uuid(),
  stage       smallint not null default 1 check (stage between 0 and 3),
  title       text not null check (char_length(title) between 1 and 200),
  detail      text check (detail is null or char_length(detail) <= 1000),
  status      text not null default 'todo' check (status in ('todo','doing','done')),
  owner       text check (owner is null or owner in ('tom','max','bada')),
  done_at     date,
  sort        integer not null default 0,
  created_by  uuid references public.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

DROP TRIGGER IF EXISTS team_milestones_touch_updated_at ON public.team_milestones;
CREATE TRIGGER team_milestones_touch_updated_at
  BEFORE UPDATE ON public.team_milestones
  FOR EACH ROW EXECUTE FUNCTION public.touch_team_updated_at();

ALTER TABLE public.team_milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team admins can read milestones"   ON public.team_milestones;
DROP POLICY IF EXISTS "team admins can write milestones"  ON public.team_milestones;
DROP POLICY IF EXISTS "team admins can update milestones" ON public.team_milestones;
DROP POLICY IF EXISTS "team admins can delete milestones" ON public.team_milestones;

CREATE POLICY "team admins can read milestones"   ON public.team_milestones FOR SELECT TO authenticated USING (public.is_team_admin());
CREATE POLICY "team admins can write milestones"  ON public.team_milestones FOR INSERT TO authenticated WITH CHECK (public.is_team_admin());
CREATE POLICY "team admins can update milestones" ON public.team_milestones FOR UPDATE TO authenticated USING (public.is_team_admin()) WITH CHECK (public.is_team_admin());
CREATE POLICY "team admins can delete milestones" ON public.team_milestones FOR DELETE TO authenticated USING (public.is_team_admin());

REVOKE ALL ON public.team_milestones FROM anon;

-- Realtime — Tom och Max ser varandras avbockningar direkt.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='team_milestones'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.team_milestones;
  END IF;
END $$;

-- ── Startinnehåll ────────────────────────────────────────────────────────────
-- Bara om tabellen är tom, så en omkörning aldrig skriver över era ändringar.
-- Datumen kommer ur git-historiken och användartabellen.
INSERT INTO public.team_milestones (stage, title, detail, status, done_at, sort)
SELECT * FROM (VALUES
  (0, 'Svalla föds',                               'Första commit och första registrerade användaren samma dag.',                                           'done', date '2026-04-16', 10),
  (0, 'GPS-loggning och appgrund för iOS/Android',   'Turer loggas i bakgrunden, Capacitor på plats.',                                                         'done', date '2026-04-21', 20),
  (0, 'Thorkel lanseras',                           'Skärgårdens egen AI-guide, med verktyg mot ruttplaneraren.',                                             'done', date '2026-04-23', 30),
  (0, 'Forumet öppnar',                             NULL,                                                                                                       'done', date '2026-04-26', 40),
  (0, 'Första säkerhetsrevisionen klar',            'Alla fynd i pass 1–3 åtgärdade.',                                                                          'done', date '2026-05-06', 50),
  (0, 'Delad arbetsyta för Tom och Max',            '/team: tavla, rutiner, promptbibliotek.',                                                                  'done', date '2026-07-29', 60),
  (0, '100 registrerade användare',                 NULL,                                                                                                       'done', date '2026-07-30', 70),
  (0, 'Stora faktagranskningen',                    'Cirka 239 källbelagda rättelser live, bara myndigheter och operatörer som källa.',                        'done', date '2026-08-26', 80),
  (0, '20 öguider källgranskade',                   'Sandhamn, Utö, Vaxholm, Grinda, Möja med flera.',                                                          'done', date '2026-09-02', 90),
  (0, '168 guider omskrivna med källa och SEO',     'Sju omgångar à 24 guider.',                                                                                'done', date '2026-09-27', 100),
  (0, 'Revisionen: alla P0/P1 stängda',             'Tre säkerhetshål stängda, 0 kontrastfel, statistik först efter samtycke.',                                'done', date '2026-10-10', 110),

  (1, 'Kontakta de 10 första verksamheterna',       'Listan i 02_Strategi/DE-10-FORSTA-VERKSAMHETERNA. Gratis egen sida först, betalt sedan.',                'doing', NULL, 10),
  (1, 'Första betalande partnern',                  'Den enskilt viktigaste händelsen i hela trappan.',                                                         'todo',  NULL, 20),
  (1, 'Nyhetsbrevet går ut varje månad',            'Med signerade avregistreringslänkar.',                                                                      'todo',  NULL, 30),
  (1, 'Veckorapporterna rullar igen',               'Fakta, pris, länkar, rankning — har saknats sedan 28/9.',                                                  'doing', NULL, 40),
  (1, 'Första intäktskronan bokförd',               NULL,                                                                                                       'todo',  NULL, 50),

  (2, 'Dokumenterad trafiktillväxt år mot år',      'Bevis ur Search Console — köparen frågar efter det först.',                                                'todo',  NULL, 10),
  (2, 'Svalla nämns i media',                       NULL,                                                                                                       'todo',  NULL, 20),
  (2, 'Första förmedlade bokningen',                'Teambuilding, konferens eller båtcharter — löser säsongsberoendet.',                                       'todo',  NULL, 30),

  (3, 'Engelska och tyska besökare',                'Internationell räckvidd, annan säsong.',                                                                   'todo',  NULL, 10),
  (3, 'Thorkel branschens skärgårds-AI',            NULL,                                                                                                       'todo',  NULL, 20),
  (3, 'Exit: samtal med köpare',                    'Turistorganisation, nordiskt mediehus eller privat köpare. Mål 2028–2029.',                               'todo',  NULL, 30)
) AS v(stage, title, detail, status, done_at, sort)
WHERE NOT EXISTS (SELECT 1 FROM public.team_milestones);
