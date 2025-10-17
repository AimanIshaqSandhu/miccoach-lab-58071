-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  features JSONB DEFAULT '[]',
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service_images table for multiple images per service
CREATE TABLE public.service_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_images ENABLE ROW LEVEL SECURITY;

-- Create policies for services (public read, authenticated write)
CREATE POLICY "Anyone can view active services"
  ON public.services
  FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert services"
  ON public.services
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON public.services
  FOR UPDATE
  USING (true);

CREATE POLICY "Authenticated users can delete services"
  ON public.services
  FOR DELETE
  USING (true);

-- Create policies for service_images
CREATE POLICY "Anyone can view service images"
  ON public.service_images
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert service images"
  ON public.service_images
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update service images"
  ON public.service_images
  FOR UPDATE
  USING (true);

CREATE POLICY "Authenticated users can delete service images"
  ON public.service_images
  FOR DELETE
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for service images
CREATE POLICY "Anyone can view service images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can upload service images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can update service images"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can delete service images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'service-images');