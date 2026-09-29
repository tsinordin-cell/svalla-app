-- 2026-09-23: tio texter med värderande påståenden utan källa ("äkta", "genuint", "oväntat fin mat", "utan turister", "trivsamt").
-- Hittade vid SEO-genomgången (flera har Google-visningar: "utö bykrog" 1 100, "les poissonniers de möja" 961 på 3 mån).
-- Citat kontrollerade i renderad källsida 2026-09-23.
-- bjorkohamn.se: "I hamnen finns affär, fiskaffär med servering, restaurang, glasscafé och pizzeria.", "Fiske- och båthamn på Bohus Björkös västsida"
update restaurants set description = 'Björkö Gästhamn ligger i fiske- och båthamnen på Bohus-Björkö i Göteborgs norra skärgård. I hamnen finns affär, fiskaffär med servering, restaurang, glasscafé och pizzeria.', updated_at = now() where slug = 'bjorko-gasthamn';
-- explorearchipelago.com (Sandhamn): "Café Ankaret", "Sandhamn 310, 130 39 Sandhamn"
update restaurants set description = 'Café Ankaret är ett kafé i Sandhamn, på adressen Sandhamn 310.', updated_at = now() where slug = 'cafe-ankaret';
-- explorearchipelago.com (Sandhamn): "Café Strindbergsgården", "Sandhamn 109, 130 39 Sandhamn"
update restaurants set description = 'Café Strindbergsgården är ett kafé i Sandhamn, på adressen Sandhamn 109.', updated_at = now() where slug = 'cafe-strindbergsgarden';
-- cafetruten.se: "…ön Rödlöga, längst ut i Stockholms skärgård", "Ett sommaröppet café där vårt fokus är hembakat och handgjort",
--   "lantlig svensk kost, gjord för hand med lokala, ekologiska råvaror"
update restaurants set description = 'Café Truten är ett sommaröppet kafé på Rödlöga, längst ut i Stockholms skärgård, med fokus på hembakat och handgjort. Maten är lantlig svensk kost gjord för hand med lokala, ekologiska råvaror.', updated_at = now() where slug = 'cafe-truten-rodloga';
-- explorearchipelago.com (Gällnö): "Affär med kundbrygga finns i Gällnöby ca 1 km från ångbåtsbryggan. Här finns också ett litet kafé och en … bar som serverar enklare rätter"
update restaurants set description = 'Gällnö Handelsbod ligger i Gällnöby på Gällnö, cirka en kilometer från ångbåtsbryggan. Här finns en affär med kundbrygga, ett litet kafé och en bar som serverar enklare rätter.', updated_at = now() where slug = 'gallno-handelsbod-cafe';
-- mojafisk.se: "Les Poissonniers de Möja ligger i hjärtat av Berg By, Möja", "Fiskaffär", "Bistro", "Vi tar enbart drop in i Bistron"
update restaurants set description = 'Les Poissonniers de Möja är en fiskaffär med bistro i Berg By på Möja i Stockholms skärgård. Bistron tar emot gäster utan bordsbokning.', updated_at = now() where slug = 'les-poissonniers-moja';
-- tjocko.se: "Ökrogen ligger vägg i vägg med Öbutiken mitt på Tjockö. Sommarrestaurangen har även öppet för pubkvällar under vår, vinter och höst.",
--   "Tjockö är en … ö belägen i Norrtälje kommun". Gamla texten sa "nära Vaxholm" – fel.
update restaurants set description = 'Ökrogen är en sommarrestaurang mitt på Tjockö i Norrtälje kommun, vägg i vägg med Öbutiken. Under vår, höst och vinter har krogen öppet för pubkvällar.', updated_at = now() where slug = 'okrogen-tjocko';
-- visitstockholm.com/o/svartso-krog/: "The season and available ingredients guide the menu at Svartsö Krog. The … restaurant lies on the island of Svartsö in the central archipelago"
update restaurants set description = 'Svartsö Krog är en restaurang på Svartsö i Stockholms mellanskärgård, där säsongen och tillgängliga råvaror styr menyn.', updated_at = now() where slug = 'svartso-krog';
-- explorearchipelago.com (Utö Bykrog): "This is a restaurant open during the summer in Edesnäs, on the road between Gruvbyn and Ålö.", "EDESNÄS GÅRD 3, 130 56 Utö"
update restaurants set description = 'Utö Bykrog är en sommaröppen restaurang i Edesnäs på Utö, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3.', updated_at = now() where slug = 'uto-bykrog';
-- arholma-hamnkrog: inget "Arholma Hamnkrog" i någon tillåten källa; posten saknade webbplats och telefon och hade avrundad koordinat
--   (59.845, 19.13), import 2026-04-17. Dold, 308 till /o/arholma.
update restaurants set hidden_at = now(), hidden_reason = 'Hittas inte i någon tillåten källa (granskning 2026-09-23); saknade webbplats och telefon, koordinat avrundad (59.845, 19.13)' where slug = 'arholma-hamnkrog' and hidden_at is null;
