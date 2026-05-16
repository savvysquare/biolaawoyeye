
-- Map all existing projects and manifesto items to the five pillars of the original manifesto
-- 1. Education
-- 2. Healthcare
-- 3. Infrastructure (Social & Welfare Infrastructure)
-- 4. Security
-- 5. SME Support (Small & Medium Scale Business Support)

-- Update Projects
UPDATE public.projects 
SET category = 'Infrastructure' 
WHERE category IN ('Water & Sanitation', 'Electricity', 'Roads & Infrastructure', 'Welfare', 'Public Lighting', 'Social & Welfare Infrastructure');

UPDATE public.projects 
SET category = 'SME Support' 
WHERE category IN ('Economic Empowerment', 'Economic', 'Small & Medium Scale Business Support', 'Youth, Sports & Special Needs');

UPDATE public.projects SET category = 'Healthcare' WHERE title ILIKE '%OSHI%' OR title ILIKE '%health%' OR title ILIKE '%medical%' OR title ILIKE '%wheelchair%';
UPDATE public.projects SET category = 'Education' WHERE title ILIKE '%school%' OR title ILIKE '%classroom%' OR title ILIKE '%scholarship%' OR title ILIKE '%student%';
UPDATE public.projects SET category = 'Infrastructure' WHERE title ILIKE '%borehole%' OR title ILIKE '%road%' OR title ILIKE '%transformer%' OR title ILIKE '%water%';
UPDATE public.projects SET category = 'Security' WHERE title ILIKE '%police%' OR title ILIKE '%vigilante%' OR title ILIKE '%security%';
UPDATE public.projects SET category = 'SME Support' WHERE title ILIKE '%grant%' OR title ILIKE '%artisan%' OR title ILIKE '%vocational%' OR title ILIKE '%equipment%';

-- Update Manifesto Items
UPDATE public.manifesto_items 
SET category = 'Infrastructure' 
WHERE category IN ('Water & Sanitation', 'Electricity', 'Roads & Infrastructure', 'Welfare', 'Social & Welfare Infrastructure');

UPDATE public.manifesto_items 
SET category = 'SME Support' 
WHERE category IN ('Economic Empowerment', 'Economic', 'Small & Medium Scale Business Support', 'Youth, Sports & Special Needs');

UPDATE public.manifesto_items SET category = 'Healthcare' WHERE title ILIKE '%health%' OR title ILIKE '%medical%' OR title ILIKE '%oshi%';
UPDATE public.manifesto_items SET category = 'Education' WHERE title ILIKE '%school%' OR title ILIKE '%education%' OR title ILIKE '%learning%';
UPDATE public.manifesto_items SET category = 'Security' WHERE title ILIKE '%police%' OR title ILIKE '%security%';
UPDATE public.manifesto_items SET category = 'Infrastructure' WHERE title ILIKE '%water%' OR title ILIKE '%road%' OR title ILIKE '%infrastructure%';
UPDATE public.manifesto_items SET category = 'SME Support' WHERE title ILIKE '%grant%' OR title ILIKE '%business%' OR title ILIKE '%artisan%';
