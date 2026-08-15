---
# PRODUKTREGEL: vårt eget cron-schema, inte en tid vi påstår om omvärlden
trigger: cron torsdagar 09:00 UTC, maj–september, om helgprognos ≥18°C och ≤40% regn och ≤9 m/s vind
layout: enkelt
subject_options:
  - "{{temp}}° i skärgården i helgen"
  - "Skärgårdsväder {{best_day}} — {{temp}}° och lite vind"
  - "Prognosen ser bra ut, {{first_name}}"
preheader: Prognosen ser bra ut. Tre öar att fundera på.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Det blir skärgårdsväder

<!-- KÄLLA: SMHI-prognos via /api/weather, hämtad vid utskicket -->
Hej {{first_name}}. Prognosen för {{best_day}} ser bra ut: **{{temp}}°** och **{{wind}} m/s**. Tre öar att fundera på.

:::ruta
### Grinda
Naturreservat mitt i skärgården. Vandringsleder, klippbad och ett värdshus som lagar riktig mat.

[Grinda-guiden →](https://svalla.se/o/grinda)
:::

:::ruta
### Sandhamn
Seglarnas huvudstad. Bageri, klippor mot öppet hav och Sandhamns Värdshus. Boka bord innan du åker.

[Sandhamn-guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
### Finnhamn
<!-- KÄLLA: Skärgårdsstiftelsen — området förvaltas av stiftelsen, STF driver vandrarhemmet, tältning endast på anvisad plats (Stora Jolpan) -->
Naturreservat med STF-vandrarhem och bra kajakvatten. Tältning går bra på den anvisade lägerplatsen.

[Finnhamn-guiden →](https://svalla.se/o/finnhamn)
:::

Kolla sista turen hem innan du åker — den står på [färjesidan](https://svalla.se/farjor).

:::knapp
[Planera helgturen](https://svalla.se/planera)
:::

:::signatur
Ha en fin helg.
— Team Svalla
*Vi kollade prognosen tre gånger. Den höll sig.*
:::
