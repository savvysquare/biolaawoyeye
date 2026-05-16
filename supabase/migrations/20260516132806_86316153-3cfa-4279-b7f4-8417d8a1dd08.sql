
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Roles viewable by self or admin" ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Projects (works/achievements)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  image_url TEXT,
  year INTEGER,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects public read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins write projects" ON public.projects FOR ALL
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Manifesto
CREATE TABLE public.manifesto_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  term TEXT NOT NULL DEFAULT 'current', -- 'current' or 'previous'
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.manifesto_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Manifesto public read" ON public.manifesto_items FOR SELECT USING (true);
CREATE POLICY "Admins write manifesto" ON public.manifesto_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Site content (key/value)
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site content public read" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins write site content" ON public.site_content FOR ALL
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_manifesto_updated BEFORE UPDATE ON public.manifesto_items FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed projects
INSERT INTO public.projects (title, description, category, location, sort_order) VALUES
('Solar-powered boreholes at OAU Junior Staff Quarters', 'Constructed solar-powered boreholes restoring access to potable water for a community that had been without reliable supply for over 20 years. Completed within the first 100 days in office.', 'Water & Sanitation', 'Obafemi Awolowo University, Ile-Ife', 1),
('Borehole renovation at Igbo Agbo Area', 'Renovated boreholes and installed solar-powered systems at Igbo Agbo Area, opposite Oduduwa College.', 'Water & Sanitation', 'Ile-Ife', 2),
('Solar borehole at Oja Titun Iso-Isu', 'Converted the borehole at Odo-Ogbe Market to a solar-powered system, including construction of associated drainage.', 'Water & Sanitation', 'Odo-Ogbe Market, Ile-Ife', 3),
('Motorized borehole at Akarabata Line 1', 'Constructed motorized borehole systems at Akarabata Line 1.', 'Water & Sanitation', 'Ile-Ife', 4),
('Motorized borehole at Olu-Ere Market', 'Constructed a motorized borehole at Iso Epo Pupa, Olu-Ere Market.', 'Water & Sanitation', 'Ile-Ife', 5),
('Solar boreholes in Hausa Community, Sabo', 'Constructed solar-powered boreholes in the Hausa Community.', 'Water & Sanitation', 'Sabo, Ile-Ife', 6),
('8-room public toilet with borehole at Attender', 'Facilitated and commissioned an 8-room public toilet with borehole.', 'Water & Sanitation', 'Attender, Sabo, Ile-Ife', 7),
('Street lights at Abagbooro Elefon', 'Constructed street lights at Abagbooro Elefon Oowa Village within the first 100 days in office.', 'Public Lighting', 'Ile-Ife', 8),
('Three-classroom block at Oba Sijuade Secondary', 'Constructed a block of three classrooms with staff office and toilet at Oba Okunade Sijuade Secondary School.', 'Education', 'Igbologbo Abaiyagani, Opa Area, Ile-Ife', 9),
('Annual donations to NIDSA executives', 'Annual donation of writing materials and financial support to NIDSA executives.', 'Education', 'Ile-Ife', 10),
('NIDSA Summer School cash prizes', 'Awarded cash prizes to outstanding students during the NIDSA Summer School.', 'Education', 'Ile-Ife', 11),
('Scholarships for Ile-Ife students', 'Awarded scholarships to several students across Ile-Ife, including a visually impaired student.', 'Education', 'Ile-Ife', 12),
('Business training for 1,500+ female entrepreneurs', 'Sponsored business training programmes for over 1,500 young female entrepreneurs, with certificates of completion awarded.', 'Education', 'Ile-Ife', 13),
('Digital skills training for Ife indigenes', 'Organised digital skills training programmes for Ife indigenes.', 'Education', 'Ile-Ife', 14),
('Renovation at Oluorogbo High School', 'Renovated a block of three classrooms at Oluorogbo High School, Road 7.', 'Education', 'Ile-Ife', 15),
('Renovation at Saint David''s Secondary School', 'Renovated a block of three classrooms at Saint David''s Secondary School, Lagere.', 'Education', 'Ile-Ife', 16),
('₦1,000,000 transformer support — Modomo Zone 4', 'Donated ₦1,000,000 for electricity transformer support.', 'Electricity', 'Modomo Zone 4', 17),
('₦2,000,000 transformer support — Modomo Zones 7 & 8', 'Donated ₦2,000,000 for transformer installation.', 'Electricity', 'Modomo Zones 7 & 8', 18),
('₦250,000 cable re-installation — Aba-Iyagani Line 13', 'Donated ₦250,000 for cable re-installation.', 'Electricity', 'Aba-Iyagani Line 13', 19),
('₦250,000 cable re-installation — Ibukun-Olu, Fajuyi', 'Donated ₦250,000 for transformer cable re-installation.', 'Electricity', 'Ibukun-Olu Community, Fajuyi', 20),
('33,000/500 KVA transformer — Modomo Zone 2 & 6', 'Donated and installed a 33,000/500 KVA transformer.', 'Electricity', 'Modomo Zone 2 & 6, Ile-Ife', 21),
('500/11,000 KVA transformer — Sabo', 'Installed a 500/11,000 KVA transformer at Sabo, Oduduwa College Road junction, beside Bovas Filling Station.', 'Electricity', 'Sabo, Ile-Ife', 22),
('Electric meter for Oja Tuntun Market Hall', 'Purchased an electric meter for the market hall.', 'Electricity', 'Oja Tuntun Market', 23),
('Akarabata Line Road facilitation', 'Facilitated the Akarabata Line Road in Akarabata Ward.', 'Roads & Infrastructure', 'Akarabata Ward, Ile-Ife', 24),
('Igboya Road facilitation', 'Facilitated Igboya Road at Road 7, Ilare Ward 1.', 'Roads & Infrastructure', 'Ilare Ward 1, Ile-Ife', 25),
('₦1,000,000 security support — Ile-Funfun', 'Donated ₦1,000,000 to strengthen security architecture.', 'Security & Welfare', 'Ile-Funfun Area', 26),
('Legal Aid Programme', 'Established a Legal Aid Programme providing free legal services to indigent residents.', 'Security & Welfare', 'Ife Central', 27),
('Monthly stipends for 100+ youths & elders', 'Provided monthly financial support to over 100 youths and over 100 elderly men and women.', 'Security & Welfare', 'Ife Central', 28),
('Food palliatives for 500+ aged & youths', 'Distributed food palliatives to over 500 aged persons and youths in the constituency.', 'Security & Welfare', 'Ife Central', 29),
('OSHI enrollment for elderly & PWDs', 'Registered over 100 elderly persons and people with disabilities under the Osun State Health Insurance scheme.', 'Security & Welfare', 'Ife Central', 30),
('Wheelchair donation', 'Donated a wheelchair to a physically challenged individual.', 'Security & Welfare', 'Ife Central', 31),
('11 motorcycles for PDP Ward Chairmen', 'Empowered all PDP Ward Chairmen in Ife Central State Constituency with 11 motorcycles.', 'Economic Empowerment', 'Ife Central', 32),
('Appliances & generators for local executives', 'Provided refrigerators, freezers, and large-capacity generators to local party executives.', 'Economic Empowerment', 'Ife Central', 33),
('Poultry farmer support', 'Provided financial assistance, broilers, and feeds to poultry farmers.', 'Economic Empowerment', 'Ife Central', 34),
('Employment for Ife youths', 'Provided employment opportunities to Ife youths, including teaching and lecturing positions.', 'Economic Empowerment', 'Ife Central', 35);

-- Seed previous manifesto (from PDP campaign)
INSERT INTO public.manifesto_items (title, description, category, term, sort_order) VALUES
('School Enrollment Reform', 'Propose state bills to revamp and reform the educational sector through enrollment reform.', 'Education', 'previous', 1),
('Technical and Vocational Training Reform', 'Drive legislation focused on technical and vocational training to equip youth with practical skills.', 'Education', 'previous', 2),
('Education Infrastructure', 'Advocate for improved educational infrastructure across the constituency.', 'Education', 'previous', 3),
('Primary Healthcare in Every Ward', 'Present legislation for the state Government to provide an additional PHC in every ward and allocate constituency projects to this.', 'Healthcare', 'previous', 4),
('Modern Youth Centres', 'Construct modern youth centres in Iremo, Ilare and Moore — the three areas that make up Ife Central state constituency.', 'Social/Welfare', 'previous', 5),
('Local Security Employment', 'Work with federal representatives to ensure employment of local Ife Central citizens into security agencies and mandate legislation for community policing.', 'Security', 'previous', 6),
('Access to Grants and Credit', 'Create alternatives to collateral-based lending criteria for small and medium scale businesses.', 'SME Support', 'previous', 7),
('Simplified Business Permits', 'Simplify the process for obtaining a business residence permit from the State authorities.', 'SME Support', 'previous', 8),
('End Multiple Local Taxation', 'Push reforms to address multiple local taxation that burdens small businesses.', 'SME Support', 'previous', 9);

-- Seed current manifesto placeholders (admin can edit)
INSERT INTO public.manifesto_items (title, description, category, term, sort_order) VALUES
('Expand Water Access', 'Scale the solar-borehole programme to cover every ward in Ife Central within the next term.', 'Water & Sanitation', 'current', 1),
('Constituency-Wide Road Rehabilitation', 'Advance legislation and constituency projects to rehabilitate failed roads across Iremo, Ilare and Moore.', 'Roads & Infrastructure', 'current', 2),
('Youth Skills & Tech Hubs', 'Establish digital and vocational hubs to train 5,000+ youths annually for the digital economy.', 'Education', 'current', 3),
('Healthcare for Every Ward', 'Continue advocacy for a fully equipped PHC in every ward and expand OSHI enrollment for vulnerable groups.', 'Healthcare', 'current', 4),
('Power & Transformer Programme', 'Sustain support for transformer installation and community electrification across Ife Central.', 'Electricity', 'current', 5),
('SME Grants & Empowerment', 'Push legislative reforms and direct grants to small and medium businesses in the constituency.', 'Economic Empowerment', 'current', 6),
('Community Policing Bill', 'Champion legislation for community policing and recruitment of locals into security agencies.', 'Security', 'current', 7),
('Social Safety Net', 'Institutionalise monthly support for elderly residents, PWDs and indigent youths.', 'Welfare', 'current', 8);

-- Seed editable site content
INSERT INTO public.site_content (key, value) VALUES
('hero_eyebrow', 'Accord Party · Ife Central'),
('hero_title', 'Power restored to the people.'),
('hero_subtitle', 'Hon. Engr. Abiola Jeremiah Awoyeye — Member, Osun State House of Assembly representing Ife Central. Two years in. 35 completed projects. One promise kept: service.'),
('about_body', 'Sworn in on 6 June 2023 after a decisive victory at the 2023 general elections, Hon. Engr. Abiola Jeremiah Awoyeye has spent his first term turning manifesto into concrete: solar boreholes where water had not flowed in twenty years, classrooms rebuilt, transformers installed, scholarships awarded, roads opened. Now contesting on the platform of the Accord Party, he is asking Ife Central to renew a mandate that is already working.'),
('stat_projects', '35'),
('stat_wards', '11'),
('stat_years', '2'),
('stat_communities', '20+');
