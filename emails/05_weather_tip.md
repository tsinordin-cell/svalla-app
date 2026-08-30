---
trigger: cron torsdagar morgon (UTC), maj–september, om helgprognos ≥18°C och ≤40% regn och ≤9 m/s vind
layout: fullt
subject_options:
  - "☀️ {{temp}}° på {{best_day}} — det här är inte en övning"
  - "Skärgårdsväder i helgen: {{temp}}° och nästan ingen vind"
  - "Prognosen du väntat på, {{first_name}}"
preheader: Sånt här väder kommer inte på beställning. Tre öar, tre humör.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Släpp vad du har för händer, {{first_name}}.

Prognosen för **{{best_day}}**: **{{temp}}°** och bara **{{wind}} m/s**. Det är inte väder — det är en inbjudan. Soffan finns kvar på söndag kväll, det här vädret gör det inte. Tre öar, tre olika humör:

:::ruta
### Grinda — den enkla
<!-- KÄLLA: src/app/o/island-data.ts (grinda) — Waxholmsbolagets tabell 11, snabbast 1 tim 35, de flesta ~2 h -->
Naturreservat mitt i skärgården: vandringsleder, klippbad och ett av skärgårdens bästa värdshus. Cirka 2 timmar med Waxholmsbåten från Strömkajen (snabbast 1 tim 35) — och den ingår i SL-kortet. Lägre tröskel finns inte.

[Grinda-guiden →](https://svalla.se/o/grinda)
:::

:::ruta
### Sandhamn — den klassiska
Seglarcentrum med bageri, klippor mot öppet hav och Sandhamns Värdshus. Vill du äta lunch ute: boka bordet innan du kliver på båten, inte efter.

[Sandhamn-guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
### Finnhamn — den lugna
STF:s vandrarhem och krog i ett naturreservat, med bra kajaktillgång. Lugnt, välskött och sällan trångt — även när prognosen ser ut så här.

[Finnhamn-guiden →](https://svalla.se/o/finnhamn)
:::

:::knapp
[Planera helgturen](https://svalla.se/planera)
:::

:::signatur
Passa på — såna här helger går att räkna på ena handens fingrar.
— Team Svalla
*Osäker på sista båten hem? Fråga Thorkel innan du åker, inte från bryggan.*
:::
