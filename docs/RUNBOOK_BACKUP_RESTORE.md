# Runbook — Supabase Backup & Restore

**Senast verifierad:** _ej verifierad än — fyll i datum efter första testkörning_
**Ansvarig:** Tom (tsinordin@gmail.com)

---

## Bakgrund

Svalla-databasen är hostad i Supabase. Supabase tar **automatiska dagliga backups** av Postgres-databasen för Pro/Team-projekt (retention 7 dagar för Pro). Backups finns inte tillgängliga för Free-tier — om Svalla är på Free, **uppgradera nu**.

En backup som inte är testad är inte en backup. Detta dokument är proceduren för att verifiera att restore fungerar.

## Förkrävt

- Supabase Pro-prenumeration (eller högre)
- Två Supabase-projekt: produktion + staging (för restore-test)
- Service role-nyckel för båda projekt (i 1Password / lösenordsmanagern)
- Tillgång till Supabase Dashboard

## Verifiera att backups skapas (en gång per kvartal)

1. Logga in på [supabase.com/dashboard](https://supabase.com/dashboard)
2. Välj Svalla-prod-projektet
3. Gå till **Database → Backups**
4. Verifiera: minst en backup per dag senaste 7 dagarna
5. Notera: senaste backup-tid + storlek

Om inga backups syns: kontakta Supabase-support direkt — `support@supabase.com`.

## Test-restore-procedur (gör en gång per kvartal)

**Tid:** ~30-45 min
**Konsekvens:** Ingen påverkan på produktion. Stagings DB skrivs över.

### Steg

1. **Skapa staging-projekt om saknas:**
   - Supabase Dashboard → New Project
   - Namn: `svalla-staging`
   - Region: samma som prod (Stockholm/Frankfurt)
   - Anteckna URL + anon key + service-role key

2. **Initiera restore:**
   - Gå till **Svalla-prod → Database → Backups**
   - Välj senaste backup
   - Klicka **Restore** → välj target = staging-projektet
   - Bekräfta

3. **Vänta på completion:** typiskt 5-15 min för Svalla-storlek

4. **Verifiera data efter restore:**
   ```sql
   -- Kör i staging SQL editor:
   select count(*) from users;
   select count(*) from trips;
   select count(*) from forum_threads;
   select count(*) from forum_posts;
   select count(*) from messages;
   select max(created_at) from trips;  -- ska vara ~ samma datum som backup
   ```

5. **Verifiera funktionalitet:**
   - Peka tillfälligt en lokal `.env.local` mot staging:
     ```
     NEXT_PUBLIC_SUPABASE_URL=<staging-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<staging-anon-key>
     SUPABASE_SERVICE_ROLE_KEY=<staging-service-key>
     ```
   - `npm run dev`
   - Logga in med ett test-konto → kolla feed renderar
   - Posta en testtråd i forum → kolla att den funkar

6. **Dokumentera:**
   - Tidstämpel för restore-completion
   - Eventuella fel/avvikelser
   - Uppdatera "Senast verifierad" högst upp i denna fil

7. **Ta ner staging vid behov:** Behåll staging om du tänker återanvända för pre-deploy-tester. Annars: pausa eller ta bort projektet i Supabase Dashboard.

## Om produktion kraschar (incident-flöde)

**OBS:** Restore över produktion är destruktiv — all data efter senaste backup går förlorad.

1. **Stoppa all skrivtrafik:** Pausa Vercel-deployment eller sätt site i maintenance-mode
2. **Snapshot nuvarande state:** `pg_dump` om möjligt — sparar partiell data för forensik
3. **Kontakta Supabase support:** `support@supabase.com` med project-id + incident-id
4. **Restore från senaste backup:**
   - Database → Backups → Restore in place
   - Bekräfta målet är prod-projektet
5. **Verifiera:** kör samma queries som i test-restore-steget
6. **Återstarta trafik:** unpausa Vercel
7. **Postmortem inom 48h:** dokumentera i `docs/incidents/YYYY-MM-DD-incident.md`

## Beräknad återställningstid (RTO)

| Scenario | RTO | RPO (data-förlust) |
|---|---|---|
| Tabell raderad av misstag | 30-60 min | upp till 24h |
| Hela DB borta | 60-90 min | upp till 24h |
| Region-outage (Supabase) | beror på Supabase | beror på Supabase |

## Förbättringar att göra

- [ ] Sätt upp **Point-in-Time Recovery (PITR)** om budget tillåter — minskar RPO till sekunder
- [ ] Schemalägg automatisk daglig sanity-check (cron) som verifierar `select count(*)` mot förväntat range
- [ ] Lägg `Sentry`-alert om DB-uptime drops

## Kontakter

- **Supabase support:** support@supabase.com (svar inom 24h på Pro-tier)
- **Stripe support:** support.stripe.com (om payments-data behöver återskapas via webhook-replay)
- **Vercel support:** vercel.com/support
