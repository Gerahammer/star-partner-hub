-- Update testimonials table structure for site-based testimonials
ALTER TABLE public.testimonials 
  DROP COLUMN IF EXISTS role,
  DROP COLUMN IF EXISTS company,
  DROP COLUMN IF EXISTS avatar_url,
  DROP COLUMN IF EXISTS rating;

-- Rename name to site_name for clarity
ALTER TABLE public.testimonials RENAME COLUMN name TO site_name;

-- Add new columns
ALTER TABLE public.testimonials 
  ADD COLUMN site_url TEXT,
  ADD COLUMN logo_url TEXT;

-- Create storage bucket for testimonial logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('testimonial-logos', 'testimonial-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to logos
CREATE POLICY "Anyone can view testimonial logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonial-logos');

-- Allow admins to upload logos
CREATE POLICY "Admins can upload testimonial logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'testimonial-logos' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update logos
CREATE POLICY "Admins can update testimonial logos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'testimonial-logos' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete logos
CREATE POLICY "Admins can delete testimonial logos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'testimonial-logos' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Clear old sample data (structure changed)
DELETE FROM public.testimonials;