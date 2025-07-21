-- First, let's clean up the description data and convert it to proper JSON array
UPDATE public.experiences 
SET description = CASE 
  WHEN description ~ '^\[.*\]$' THEN description  -- Already JSON array
  ELSE '["' || replace(replace(description, '"', '\"'), E'\n', '","') || '"]'  -- Convert to JSON array
END;

-- Now change the column type to jsonb
ALTER TABLE public.experiences 
ALTER COLUMN description TYPE jsonb USING description::jsonb;