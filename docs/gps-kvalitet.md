# GPS-kvalitet och uppspelning

Sedan 2026-09-06. Syfte: veta *varför* en tur blev fel, och kunna räkna om
en tur genom GPS-kedjan utan nytt fälttest.

## Vad som sparas

- `gps_points.raw_latitude / raw_longitude / device_speed_knots` (migration
  `20260906000001`): telefonens fix som den kom + enhetens Doppler-fart.
  `latitude/longitude/speed_knots` är det utjämnade (Kalman) läget och den
  rensade farten — det som visas.
- `trips.gps_quality` (migration `20260906000002`): jsonb, räknas i
  `src/lib/gpsQuality.ts` vid Spara. Fält (v = 1):

| fält | betydelse |
|---|---|
| `points` | sparade punkter |
| `rejectedAccuracy` / `rejectedAnomaly` / `rejectedPct` | kastade för accuracy > 80 m, kastade av anomaligrinden, andel av alla inkomna |
| `kalmanResets` | omstarter av filtret (lucka > 30 s) |
| `accuracyMeanM` / `accuracyMedianM` / `accuracyP95M` | telefonens accuracy över sparade punkter |
| `gapMaxS` / `gapsOver10s` / `intervalMeanS` / `spanS` | längsta lucka, antal luckor > 10 s, medelintervall, tid första→sista punkt |
| `rawPct` / `rawOffsetMeanM` / `deviceSpeedPct` | andel punkter med rådata, hur långt filtret flyttar punkten i medel, andel med enhetsfart |
| `maxSpeed1pKn` / `maxSpeed10sKn` | toppfart som enskild punkt (det /tur visar) vs bästa 10 s-medel (det Strava/Garmin visar) |
| `distanceSmoothedNM` / `distanceRawNM` | distans längs utjämnat spår vs längs råspåret |

Turer före migrationerna har `gps_quality = null` och `rawPct = 0`.

## Uppspelning

`GET /api/gps-replay/<tripId>` — bara ägaren, inloggad i webbläsaren räcker.

Svar: `trip` (det som sparades), `stored.quality` (kvalitet ur de sparade
punkterna), `replay` (turen körd på nytt från rådatan genom samma kedja som
/spara: accuracy-gräns → anomaligrind → CV-Kalman → fart ur filtret →
medianfilter), `rawAvailable` (antal punkter med rådata).

Parametrar i URL:en, alla valfria — utan dem körs exakt /spara:s inställningar:

```
?maxAccuracyM=80        kasta fixar sämre än så
&anomalyCeilingKn=150   tak för anomaligrinden (återförankring efter 3 avvisade i rad)
&accelSigma=1           Kalman: hur mycket fart får ändras per sekund (m/s²)
&minAccuracyM=3         Kalman: golv för mätbrus
&resetAfterSeconds=30   Kalman: omstart efter lucka
&track=1                ta med det uppspelade spåret [lat, lng, kn]
```

Exempel: "vad hade turen blivit om vi kastat allt över 30 m i stället för 80?"
→ `/api/gps-replay/<id>?maxAccuracyM=30`. Jämför `replay.distanceNM` med
`trip.distance`.

## Känt (mätt 2026-09-06, syntetiskt vitt brus ±5 m, 1 Hz)

| fart | utjämnad distans / sann | rå distans / sann | filterfart |
|---|---|---|---|
| 3 kn | 1,58 | 3,49 | 3,23 kn |
| 6 kn | 1,14 | 1,91 | 6,11 kn |
| 12 kn | 1,03 | 1,24 | 12,05 kn |
| 25 kn | 1,01 | 1,05 | 25,02 kn |

Farten ur filtret håller. Distansen som summa av positioner blåses upp vid
låg fart. Riktigt GPS-brus är korrelerat, så verkliga tal är lägre —
fälttestet avgör. Låst i `gpsReplay.test.ts` ("KÄND SVAGHET") så att en
ändring syns.

## Delad kod och facit

Sedan 2026-09-10 kör /spara och `replayTrack` samma klass, `GpsPipeline`
(`src/lib/gpsPipeline.ts`). Toms biltest samma dag ligger som fixtur i
`src/lib/__fixtures__/trip-15b47ab2.txt` (887 råa fixar), och
`gpsPipeline.test.ts` låser kedjan mot det som sparades: 15,03 NM, 49,1 kn
snitt, 75,6 kn topp (bästa 10 s; 76,7 som ensam punkt). Ändras kedjan så
att siffrorna flyttar sig, faller testet — inget nytt fälttest behövs för
att upptäcka det.

Toppfart som sparas och visas är sedan samma dag bästa rullande
10-sekundersmedel (`topSpeedKnots`), inte max av enskilda punkter.

## Det synliga på /tur (2026-09-10)

`src/lib/tripSplits.ts` räknar ur sparade punkter: fartserie (medel per
5 s, luckor > 60 s bryter kurvan), delsträckor per NM (sträcka/tid, tiden
interpoleras linjärt inom det segment som korsar NM-gränsen — ett segment
som spänner flera NM, t.ex. en lucka, ger flera delsträckor) och
rörelsetid (fart > 0,5 kn). `SpeedChart` ritar serien utan bibliotek.
Låst mot fixturen: 15 delsträckor, snabbaste ~71 kn, luckan bryter en gång.

**Tid i sekunder.** `trips.duration_seconds` (migration
20260910000001) skrivs från /spara. Fynd i samma veva: `elapsed` räknades
med `setInterval(e + 1)`, som Safari stoppar i bakgrunden — tur 15b47ab2
sparades som 15 min men var 17 min 51 s (`ended_at − started_at`). Nu
räknas elapsed från klockan. Äldre turer: `resolveDurationSeconds` tar
klockspannet när det stämmer med minuten ±90 s, annars minuten × 60.

## Distans = ∫ Doppler-fart (beslut 2026-09-11)

Facit: Toms bil, trippmätaren nollställd vid start (foto före och efter).
Fyra sätt att räkna, tre turer:

| Tur | Bil | Σ utjämnade pos. | Σ råa pos. | ∫ filterfart | ∫ Doppler |
|---|---|---|---|---|---|
| 5fa4cf65 (2,7 mi) | 2,30–2,39 NM | 2,415 | 2,380 | 2,370 | **2,341** |
| 828d8cbc (12 NM) | ogiltigt foto | 12,41 | 12,30 | 12,20 | 12,14 |
| 15b47ab2 (10/9) | — | 15,03 | 14,93 | 14,92* | 14,81* |
| 06c13078 (20,5 mi, 1 305 fixar) | 17,77–17,86 NM | 17,77 | 17,61 | — | 17,45 |

\* luckorna (158 s) räknade som sträcka mellan fixar.

Samma ordning på alla fyra; 2–3 % mellan ytterligheterna. På 2,7 mi-turen
träffar bara ∫Doppler bilens intervall; på 20,5 mi-turen träffar bara
positionssumman (∫Doppler −2,0 %, råa −1,1 %). Det ser motsägelsefullt ut
tills man tar med att bilens vägmätare har ett eget, okänt men konstant fel
k = bil/sant. En metod som mäter rätt måste ge samma k på båda turerna:

| Metod | k på 2,7 mi | k på 20,5 mi | Överlapp |
|---|---|---|---|
| ∫ Doppler | 0,982–1,021 | 1,018–1,023 | **ja, k ≈ 1,02** |
| Σ råa pos. | 0,966–1,004 | 1,009–1,014 | nej |
| Σ utjämnade pos. | 0,952–0,989 | 1,000–1,005 | nej |

Mätt: de fyra bilavläsningarna och GPS-siffrorna. Resonerat: att bilens fel
är konstant (samma bil, samma däck) och att ~2 % för hög vägmätare är
normalt. Slutsats: ∫Doppler står kvar; positionssumman kan inte vara rätt
på båda turerna. `tripDistance.test.ts` låser överlappstestet så att en
ändrad metod måste klara samma prövning. Doppler-farten mäts på satellitsignalens
frekvensskift och påverkas inte av positionsbrus — det är därför
positionssumman blåses upp vid låg fart (synteset: 1,4–1,8× vid 3 kn,
∫Doppler 1,00×). `trips.distance` sparas nu som `tripDistanceNM`
(`src/lib/gps.ts`): ∫Doppler över par ≤ 10 s, annars sträcka mellan råa
fixar. Turer sparade före 11/9 räknas inte om. `gps_quality` bär alla tre
(`distanceSmoothedNM`, `distanceRawNM`, `distanceIntegratedNM`) så att
jämförelsen kan göras igen på varje ny tur. Fixturer för alla fyra turer
ligger i `src/lib/__fixtures__/` (rådata ur gps_points, kan spelas upp
igen med `replayTrack`); `tripDistance.test.ts` låser
2,30 ≤ ∫Doppler ≤ 2,39 på 2,7 mi-turen och de tre värdena på 20,5 mi-turen.

Sett i samma fixtur (06c13078), inte åtgärdat än: den filtrerade farten
släpar vid stopp. Vid inbromsningen 1 177–1 182 s går enhetens Doppler
18,8 → 0 kn på 5 s; den visade farten ligger kvar på 15,6 kn när Doppler
redan är 0, når under 1 kn först 5 s senare och stiger sedan till 1,5 kn
i 4 s medan bilen står stilla. Vid slutstoppet planar den ut på 0,19 kn i
stället för 0. Doppler säger 0 hela tiden. Det är Kalmanfiltrets
hastighetstillstånd (konstant fart-modell) som ger eftersläpningen —
nästa steg i GPS-listan ("fart vid stillastående").

## 1 000-radersgränsen (fynd 2026-09-11)

PostgREST svarar med högst 1 000 rader per fråga, utan fel. Alla läsningar
av gps_points saknade sidindelning, så turer längre än ~17 minuter vid 1 Hz
stympades tyst: tursidan (kurva, delsträckor, rörelsetid), GPX-exporten
(som dessutom hade `.limit(5000)`), uppspelningen, route_points-backfillen
och — värst — kraschåterställningen i /spara, som då räknade distansen på
ett stympat spår. Upptäckt på tur 828d8cbc: 1 081 punkter i databasen,
1 000 på sidan. Nu går alla läsningar via `fetchAllGpsPoints`
(`src/lib/gpsRows.ts`): sida för sida, ordnat på recorded_at + id, hård
gräns 100 000 rader (≈ 28 h). Testad med 1 081, 1 000, 14 400 och 0 rader
samt databasfel mitt i.

## Snittfart, rörelsetid och fartfärg (2026-09-11)

**Snittfart = distans / rörelsetid** (`avgSpeedKnots`), som Strava och
Garmin. Före: medel av punktfarter över 0,3 kn — gav 30,3 där delsträckorna
sa 29,5 på samma tur. Rörelsetid (`movingSeconds`, nu i gps.ts) räknar
sekunder med fart > 0,5 kn; en lucka > 60 s räknas som rörelse om sträckan
mellan fixarna ger fart över tröskeln. Därmed: sträcka som räknas har alltid
tid som räknas. 10/9-turen: 14,81 NM / 1 054 s = 50,6 kn (sparat: 49,1).

**Fartfärg** delas av tursidan och live-kartan (`src/lib/speedColor.ts`).
`speedRuns` slår ihop punkter med samma färg till ett segment — tursidan
ritade förut ett Leaflet-lager per punkt (14 400 för fyra timmar), och
live-kartan läckte ett lager per ny punkt. Live-kartan har nu fartfärg och
startmarkör som den färdiga turen.
