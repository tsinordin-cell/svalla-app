-- 2026-07-29 — Team-dashboard för Tom + Max (#team-dashboard)
--
-- Delad arbetsyta internt i Svalla-appen: projektöversikt, uppgifter,
-- prompt-bibliotek och aktivitetsflöde. Gatead på users.is_admin (samma
-- flagga som resten av /admin-verktygen) — bara Tom och Max kommer åt den.
--
-- Idempotent: säker att köra flera gånger.

-- ── 0. Hjälpfunktion: är inloggad user admin? ──────────────────────────────
-- Används av alla RLS-policies nedan i stället för att upprepa subquery.

CREATE OR REPLACE FUNCTION public.is_team_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true
  );
$$;

-- ── 1. PROJECTS ─────────────────────────────────────────────────────────────
-- Grupperar uppgifter/prompts. Färdig-seedad med de projekt som redan
-- finns i minnet (routing safety layer, transit intelligence osv) så
-- dashboarden inte startar tom.

CREATE TABLE IF NOT EXISTS public.team_projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  description text,
  color       text not null default '#1e5c82',
  status      text not null default 'active' check (status in ('active','paused','done')),
  created_by  uuid references public.users(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

CREATE OR REPLACE FUNCTION public.touch_team_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS team_projects_touch_updated_at ON public.team_projects;
CREATE TRIGGER team_projects_touch_updated_at
  BEFORE UPDATE ON public.team_projects
  FOR EACH ROW EXECUTE FUNCTION public.touch_team_updated_at();

ALTER TABLE public.team_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team admins can read projects"   ON public.team_projects;
DROP POLICY IF EXISTS "team admins can write projects"  ON public.team_projects;
DROP POLICY IF EXISTS "team admins can update projects" ON public.team_projects;
DROP POLICY IF EXISTS "team admins can delete projects" ON public.team_projects;

CREATE POLICY "team admins can read projects"   ON public.team_projects FOR SELECT USING (public.is_team_admin());
CREATE POLICY "team admins can write projects"  ON public.team_projects FOR INSERT WITH CHECK (public.is_team_admin());
CREATE POLICY "team admins can update projects" ON public.team_projects FOR UPDATE USING (public.is_team_admin());
CREATE POLICY "team admins can delete projects" ON public.team_projects FOR DELETE USING (public.is_team_admin());

-- ── 2. TASKS ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.team_tasks (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.team_projects(id) on delete set null,
  title       text not null,
  description text,
  status      text not null default 'todo' check (status in ('todo','in_progress','done')),
  priority    text not null default 'normal' check (priority in ('low','normal','high')),
  assignee_id uuid references public.users(id) on delete set null,
  created_by  uuid references public.users(id),
  due_date    date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

DROP TRIGGER IF EXISTS team_tasks_touch_updated_at ON public.team_tasks;
CREATE TRIGGER team_tasks_touch_updated_at
  BEFORE UPDATE ON public.team_tasks
  FOR EACH ROW EXECUTE FUNCTION public.touch_team_updated_at();

CREATE INDEX IF NOT EXISTS team_tasks_project_idx  ON public.team_tasks(project_id);
CREATE INDEX IF NOT EXISTS team_tasks_assignee_idx  ON public.team_tasks(assignee_id);
CREATE INDEX IF NOT EXISTS team_tasks_status_idx    ON public.team_tasks(status);

ALTER TABLE public.team_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team admins can read tasks"   ON public.team_tasks;
DROP POLICY IF EXISTS "team admins can write tasks"  ON public.team_tasks;
DROP POLICY IF EXISTS "team admins can update tasks" ON public.team_tasks;
DROP POLICY IF EXISTS "team admins can delete tasks" ON public.team_tasks;

CREATE POLICY "team admins can read tasks"   ON public.team_tasks FOR SELECT USING (public.is_team_admin());
CREATE POLICY "team admins can write tasks"  ON public.team_tasks FOR INSERT WITH CHECK (public.is_team_admin());
CREATE POLICY "team admins can update tasks" ON public.team_tasks FOR UPDATE USING (public.is_team_admin());
CREATE POLICY "team admins can delete tasks" ON public.team_tasks FOR DELETE USING (public.is_team_admin());

-- ── 3. PROMPTS ────────────────────────────────────────────────────────────────
-- Delat bibliotek för promptar ni använder mot Claude/andra verktyg.

CREATE TABLE IF NOT EXISTS public.team_prompts (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.team_projects(id) on delete set null,
  title       text not null,
  content     text not null,
  tags        text[] not null default '{}',
  created_by  uuid references public.users(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

DROP TRIGGER IF EXISTS team_prompts_touch_updated_at ON public.team_prompts;
CREATE TRIGGER team_prompts_touch_updated_at
  BEFORE UPDATE ON public.team_prompts
  FOR EACH ROW EXECUTE FUNCTION public.touch_team_updated_at();

CREATE INDEX IF NOT EXISTS team_prompts_project_idx ON public.team_prompts(project_id);
CREATE INDEX IF NOT EXISTS team_prompts_tags_idx     ON public.team_prompts USING gin(tags);

ALTER TABLE public.team_prompts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team admins can read prompts"   ON public.team_prompts;
DROP POLICY IF EXISTS "team admins can write prompts"  ON public.team_prompts;
DROP POLICY IF EXISTS "team admins can update prompts" ON public.team_prompts;
DROP POLICY IF EXISTS "team admins can delete prompts" ON public.team_prompts;

CREATE POLICY "team admins can read prompts"   ON public.team_prompts FOR SELECT USING (public.is_team_admin());
CREATE POLICY "team admins can write prompts"  ON public.team_prompts FOR INSERT WITH CHECK (public.is_team_admin());
CREATE POLICY "team admins can update prompts" ON public.team_prompts FOR UPDATE USING (public.is_team_admin());
CREATE POLICY "team admins can delete prompts" ON public.team_prompts FOR DELETE USING (public.is_team_admin());

-- ── 4. ACTIVITY FEED ──────────────────────────────────────────────────────────
-- Snabba uppdateringar/kommentarer, ev. kopplade till en task/prompt/projekt.
-- Skrivs både manuellt (fritext-post) och automatiskt (triggers nedan vid
-- task-statusändring) så flödet fylls på utan extra klick.

CREATE TABLE IF NOT EXISTS public.team_activity (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null default 'note' check (kind in ('note','task','prompt','project')),
  message     text not null,
  task_id     uuid references public.team_tasks(id) on delete cascade,
  prompt_id   uuid references public.team_prompts(id) on delete cascade,
  project_id  uuid references public.team_projects(id) on delete cascade,
  created_by  uuid references public.users(id),
  created_at  timestamptz not null default now()
);

CREATE INDEX IF NOT EXISTS team_activity_created_at_idx ON public.team_activity(created_at desc);

ALTER TABLE public.team_activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team admins can read activity"  ON public.team_activity;
DROP POLICY IF EXISTS "team admins can write activity" ON public.team_activity;
DROP POLICY IF EXISTS "team admins can delete activity" ON public.team_activity;

CREATE POLICY "team admins can read activity"  ON public.team_activity FOR SELECT USING (public.is_team_admin());
CREATE POLICY "team admins can write activity" ON public.team_activity FOR INSERT WITH CHECK (public.is_team_admin());
CREATE POLICY "team admins can delete activity" ON public.team_activity FOR DELETE USING (public.is_team_admin());

-- Auto-logga i aktivitetsflödet när en task byter status eller tilldelas om.
CREATE OR REPLACE FUNCTION public.log_team_task_activity()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.team_activity (kind, message, task_id, project_id, created_by)
    VALUES ('task', 'Ny uppgift: ' || NEW.title, NEW.id, NEW.project_id, NEW.created_by);
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.team_activity (kind, message, task_id, project_id, created_by)
    VALUES ('task', '"' || NEW.title || '" → ' || NEW.status, NEW.id, NEW.project_id, NEW.assignee_id);
  ELSIF TG_OP = 'UPDATE' AND NEW.assignee_id IS DISTINCT FROM OLD.assignee_id THEN
    INSERT INTO public.team_activity (kind, message, task_id, project_id, created_by)
    VALUES ('task', '"' || NEW.title || '" tilldelad om', NEW.id, NEW.project_id, NEW.assignee_id);
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS team_tasks_log_activity ON public.team_tasks;
CREATE TRIGGER team_tasks_log_activity
  AFTER INSERT OR UPDATE ON public.team_tasks
  FOR EACH ROW EXECUTE FUNCTION public.log_team_task_activity();

-- ── 5. Seed: projekt som redan pågår (från minnesfilerna) ────────────────────
-- ON CONFLICT DO NOTHING så seedningen är säker att köra om.

INSERT INTO public.team_projects (name, slug, description, color, status)
VALUES
  ('Routing safety layer', 'routing-safety-layer', 'Sjörutter ska aldrig visas som räta linjer över land — alltid returnera en väg, aldrig "unavailable".', '#0369a1', 'active'),
  ('Transit Intelligence',  'transit-intelligence',  'Trafiklab-integration i tre steg — det som saknas för att produkten ska vara "bra nog".', '#7c3aed', 'active'),
  ('Innehåll & fakta',      'innehall-fakta',        'Redaktörsarbete på guider/artiklar — faktagranskat, inte sub-agent-gissat.', '#9d174d', 'active')
ON CONFLICT (slug) DO NOTHING;

-- ── 6. Realtime ──────────────────────────────────────────────────────────────
-- Tom och Max ska se varandras ändringar direkt utan att ladda om sidan.
-- Lägg till tabellerna i supabase_realtime-publikationen (idempotent).

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='team_tasks'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.team_tasks;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='team_projects'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.team_projects;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='team_prompts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.team_prompts;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='team_activity'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.team_activity;
  END IF;
END $$;
