-- Convert blog content from jsonb to text
-- First, update existing jsonb content to text format
UPDATE public.blogs 
SET content = CASE 
  WHEN content IS NULL THEN NULL
  WHEN jsonb_typeof(content) = 'string' THEN content #>> '{}'
  ELSE content::text
END;

-- Change the column type from jsonb to text
ALTER TABLE public.blogs 
ALTER COLUMN content TYPE text 
USING CASE 
  WHEN content IS NULL THEN NULL
  ELSE content::text
END;