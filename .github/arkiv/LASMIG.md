# .github/arkiv

Pensionerade workflows. GitHub laser bara `.github/workflows/`, sa filer har
koers inte — men de ar kvar att lasa och kan flyttas tillbaka.

## deploy.yml.inaktiv (arkiverad 2026-08-23)

Koerde `npx vercel --prod` vid varje push till `main`. Vercels
GitHub-integration gor redan samma sak, sa den var en dubblett.

Den var ofarlig sa lange GitHub-kontot var last av en misslyckad
kortverifiering — varje Actions-jobb dog pa 3–7 sekunder. Nar kortet loestes
23 augusti och Actions borjade koera igen skulle den ha borjat dubbeldeploya
parallellt med integrationen.

Kontrollerat innan arkiveringen:

- Produktionen deployades hela tiden utan den. Actions var dott 19–23 augusti
  (koerning 1–20: 3–7 sekunder var, alla roda), och anda gick #182, #183,
  #184 och #173 live.
- Den var inte en required check. Pa bade PR #173 och PR #185 var Vercel den
  enda check markt Required.

Kvar att stada nar nagon vill: hemligheterna `VERCEL_TOKEN` och
`VERCEL_PROJECT_ID` anvands inte langre av nagon workflow.
