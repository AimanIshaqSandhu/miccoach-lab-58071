-- Add video support to gallery table
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video'));

-- Create project_videos table
CREATE TABLE IF NOT EXISTS public.project_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on project_videos
ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for project_videos
CREATE POLICY "Anyone can view project videos"
  ON public.project_videos
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert project videos"
  ON public.project_videos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update project videos"
  ON public.project_videos
  FOR UPDATE
  USING (true);

CREATE POLICY "Authenticated users can delete project videos"
  ON public.project_videos
  FOR DELETE
  USING (true);

-- Create service_videos table
CREATE TABLE IF NOT EXISTS public.service_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on service_videos
ALTER TABLE public.service_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for service_videos
CREATE POLICY "Anyone can view service videos"
  ON public.service_videos
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert service videos"
  ON public.service_videos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update service videos"
  ON public.service_videos
  FOR UPDATE
  USING (true);

CREATE POLICY "Authenticated users can delete service videos"
  ON public.service_videos
  FOR DELETE
  USING (true);