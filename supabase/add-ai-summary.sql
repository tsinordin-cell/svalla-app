-- Add AI summary column to trips table
ALTER TABLE trips ADD COLUMN IF NOT EXISTS ai_summary TEXT;
COMMENT ON COLUMN trips.ai_summary IS 'AI-genererad turberättelse från Claude';
