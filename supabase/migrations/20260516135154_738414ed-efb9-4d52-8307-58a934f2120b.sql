
-- Media support on projects
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS media jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Recategorise to match manifesto categories
UPDATE public.projects SET category = 'Electricity' WHERE category = 'Public Lighting';
UPDATE public.projects SET category = 'Security' WHERE title = '₦1,000,000 security support — Ile-Funfun';
UPDATE public.projects SET category = 'Healthcare' WHERE title IN ('OSHI enrollment for elderly & PWDs', 'Wheelchair donation');
UPDATE public.projects SET category = 'Welfare' WHERE category = 'Security & Welfare';

-- Storage bucket for project media
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read; admin write
DROP POLICY IF EXISTS "Project media public read" ON storage.objects;
CREATE POLICY "Project media public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-media');

DROP POLICY IF EXISTS "Admins upload project media" ON storage.objects;
CREATE POLICY "Admins upload project media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update project media" ON storage.objects;
CREATE POLICY "Admins update project media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete project media" ON storage.objects;
CREATE POLICY "Admins delete project media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));
