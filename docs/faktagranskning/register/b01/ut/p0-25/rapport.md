# P0 25: Bromskär på Blidö (granskat 2026-11-17 mot origin/main 8b0e39f)

- **Felet, MÄTT.** I tabell 28 (h28.pdf, avsnittet "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026") har 28A rubriken "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA" utan Bromskär. Raden "Bromskär (Blidö) r)" saknar turer, och not r lyder "Bryggan är avstängd till juni 2027 på grund av renoveringsarbeten." Detsamma gäller 28B. 28A-citatet med BROMSKÄR finns bara i avsnittet 2 april–30 september 2026.
- **Waxholmsbolagets sida för Blidö finns inte, MÄTT.** /reseplanering/resmal/blido visar "Sidan kunde inte hittas" i Chromium, och resmålslistan har tolv resmål men inget för Blidö.
- **Till Blidö i dag, MÄTT.** SL-buss 634 Norrtälje–Blidö ("Giltig 17 augusti–12 december 2026") stannar bland annat vid Furusunds färjeläge, Norrsund (Blidö färjeläge), Stämmarsund och Bromskärs brygga. Bil med Trafikverkets två färjor står redan i posten. Den läste jag inte om.
- **edits.json, 2 ändringar.** island-data.ts:2697–2698 är nu en busspost (Buss, från Norrtälje busstation) som också säger att bryggan enligt tabell 28 är avstängd till juni 2027. Posten heter inte längre "Waxholmsbåt från Furusund", eftersom komma-dit-FAQ:n listade den som ett sätt att ta sig till Blidö. guide-content.ts:17217–17220 (Svartlöga): Bromskär är struken ur uppräkningen, och en mening om avstängningen är tillagd. Båda har nya KÄLLA-rader, en URL per rad, läst 2026-11-17. Inga klockslag eller priser, inga tankstreck i texten, och ingen text har blivit kortare.
- **Kontroller.** Torrkörningen gav 2 ok och 0 fel. I den egna kopian p0-25/torr gick generera-kallor och --kontroll igenom (101 öar, 1522 källor). tsc gav 0 fel och vitest src/lib 732/732. Alla 32 citat står ordagrant i kallor/ (citatkontroll.txt). Blanktecken är normaliserade, och notens radbrutna mening hittas i pdftotext utan -layout.
- **Övriga träffar på Bromskär i src/, inte ändrade:**
  - guide-content.ts:14534 med KÄLLA på 14524 säger redan att bryggan är avstängd till juni 2027.
  - guide-content.ts:14826 är en KÄLLA-kommentar med linjens namn.
  - island-data.ts:2661–2662 nämner adressen Bromskärsvägen.
  - island-data.ts:2504, 2610, 2872, 2890, 2917, 3998, 5772, 5789 och guides-data.ts:4129 är KÄLLA-rader som citerar vårens 28A-rubrik. Texterna under dem nämner inte Bromskär.
  - kallor.generated.ts:2064, 2206, 2241, 2413 och 3334 innehåller samma citat. Rad 2241 försvinner när filen genereras om.
  - osm-waypoints.json:60968 är ett OSM-namn.
- **Ska granskas, kan vara P0:** transit-stops.ts:150. Avgångswidgeten för Blidö har målet "Blidö Bromskär brygga" (stop-ID 740001021). Jag har inte kontrollerat om det ID:t är båtbryggan eller busshållplatsen. Ett nytt ID måste i så fall beläggas mot ResRobot.
- **Utanför P0 25, RESONERAT:** h24 och h26 gäller fortfarande bara till 1 november 2026. Det gäller island-data.ts:2696 ("gäller till 1 november 2026"), guide-content.ts:17215 och 17219 ("Två linjer stannar vid Svartlöga", linje 26) och guides-data.ts:4130. Jag har inte sökt efter någon nyare tabell för linje 26.
- **Databasen** (inte ändrad): raden restaurants.bromskar (Bromskärs hamn, samfällighet) tas inte upp av sökningen i src/.
- **Källor i p0-25/kallor/:** h28 (layout och raw), sl/h634, wa/h24, wa/h26, Waxholmsbolagets resmålslista och 404-anteckningen. Ingenting är commitat, och repot och databasen är orörda.
