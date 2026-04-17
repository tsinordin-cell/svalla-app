-- Batch 3: New restaurants with verified coordinates
-- Run in Supabase SQL editor

INSERT INTO restaurants (name, island, type, lat, lng, source_confidence)
VALUES
  ('Bullandö Krog',               'Bullandö',   'restaurant', 59.2887, 18.6795, 'high'),
  ('Hölö Restaurang',             'Hölö',       'restaurant', 59.0256, 17.5403, 'high'),
  ('Harö Krog',                   'Harö',       'restaurant', 58.9632, 18.3288, 'high'),
  ('Södermöja Krog',              'Södermöja',  'restaurant', 59.4102, 18.8794, 'high'),
  ('Gällnö Krog',                 'Gällnö',     'restaurant', 59.4126, 18.6858, 'high'),
  ('Blidö Värdshus',              'Blidö',      'restaurant', 59.6145, 18.9048, 'high'),
  ('Räfsnäs Sjökrog',             'Räfsnäs',    'restaurant', 59.7591, 19.1093, 'high'),
  ('Norröra Krog',                'Norröra',    'restaurant', 59.6412, 19.0375, 'high')
ON CONFLICT (name) DO UPDATE SET
  island = EXCLUDED.island,
  type = EXCLUDED.type,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  source_confidence = EXCLUDED.source_confidence;
