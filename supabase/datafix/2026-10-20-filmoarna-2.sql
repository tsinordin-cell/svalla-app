-- 2026-10-20: andra omgången rättelser i platsdatabasen (körd i Supabase av Claude 2026-10-20 på Max uppdrag).
-- KÄLLA https://gotland.com/companies/creperie-tati-pa-kutens-bensin/ — "Restaurang • Norra Gotland";
--   "Normalt öppet dagligen från slutet av maj till Fårönatta i mitten av september, därefter helger till slutet av oktober."
-- lilla-haket-ninas-bod: hemsidan pekade på Båtshaket på Ålö, som inte nämner stället (granskning 2026-10-20). Länken bort.
begin;
update restaurants set type = 'restaurant', island = 'Fårö', seasonality = 'summer_autumn', updated_at = now() where slug = 'creperie-tati-gotland';
update restaurants set website = null, updated_at = now() where slug = 'lilla-haket-ninas-bod';
commit;
