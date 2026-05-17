-- Reorder manifesto items to strictly follow the desired pillar sequence
-- 1. Education
-- 2. Healthcare
-- 3. Infrastructure
-- 4. Security
-- 5. SME Support

WITH OrderedItems AS (
    SELECT id, 
           category,
           ROW_NUMBER() OVER (
               PARTITION BY term
               ORDER BY 
                   CASE category 
                       WHEN 'Education' THEN 1
                       WHEN 'Healthcare' THEN 2
                       WHEN 'Infrastructure' THEN 3
                       WHEN 'Security' THEN 4
                       WHEN 'SME Support' THEN 5
                       ELSE 6
                   END,
                   sort_order
           ) as new_sort
    FROM public.manifesto_items
)
UPDATE public.manifesto_items
SET sort_order = OrderedItems.new_sort
FROM OrderedItems
WHERE public.manifesto_items.id = OrderedItems.id;
