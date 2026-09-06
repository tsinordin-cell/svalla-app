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
&anomalyCeilingKn=60    tak för anomaligrinden
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

## Vad som INTE är delad kod

`replayTrack` speglar /spara:s GPS-callback steg för steg men är inte samma
kod (beslut: /spara rörs inte före fälttestet). Efter fälttestet: bryt ut
kedjan till en `GpsPipeline` som båda använder.
