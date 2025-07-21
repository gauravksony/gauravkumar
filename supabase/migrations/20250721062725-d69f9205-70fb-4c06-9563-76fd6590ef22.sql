-- Update experiences table to store description as JSON array
ALTER TABLE public.experiences 
ALTER COLUMN description TYPE jsonb USING description::jsonb;