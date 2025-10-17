const WORDPRESS_API_BASE = "https://iqfalseceilings.site/wp-json/custom/v1";

export interface WordPressProject {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  status: string;
  featured_image: string | null;
  acf: {
    description: string;
    category: string;
    location: string;
    year_completed: string;
    project_images: Array<{
      id: number;
      title: string;
      alt: string | false;
      caption: string | false;
      description: string;
      url: string | false;
      sizes: {
        thumbnail: string | false;
        medium: string | false;
        large: string | false;
        full: string | false;
      };
    }>;
    project_videos: Array<{
      id: number;
      title: string;
      url: string;
      sizes: {
        full: string;
      };
    }>;
  };
}

export interface WordPressService {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  status: string;
  featured_image: string | null;
  acf: {
    slug_url_friendly: string;
    short_description: string;
    full_description: string;
    prices: string;
    service_images: Array<{
      id: number;
      title: string;
      url: string;
      sizes: {
        thumbnail: string;
        medium: string;
        large: string;
        full: string;
      };
    }>;
  };
}

export interface WordPressGallery {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  status: string;
  featured_image: string | null;
  acf: {
    team_working: Array<{
      id: number;
      title: string;
      url: string;
      sizes: {
        thumbnail: string;
        medium: string;
        large: string;
        full: string;
      };
    }>;
  };
}

export const wordpressAPI = {
  // Projects
  async getProjects(): Promise<WordPressProject[]> {
    const response = await fetch(`${WORDPRESS_API_BASE}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  async getProjectById(id: string): Promise<WordPressProject> {
    const response = await fetch(`${WORDPRESS_API_BASE}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },

  async getProjectBySlug(slug: string): Promise<WordPressProject> {
    const response = await fetch(`${WORDPRESS_API_BASE}/projects/slug/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },

  // Services
  async getServices(): Promise<WordPressService[]> {
    const response = await fetch(`${WORDPRESS_API_BASE}/services`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  },

  async getServiceById(id: string): Promise<WordPressService> {
    const response = await fetch(`${WORDPRESS_API_BASE}/services/${id}`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return response.json();
  },

  async getServiceBySlug(slug: string): Promise<WordPressService> {
    const response = await fetch(`${WORDPRESS_API_BASE}/services/slug/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return response.json();
  },

  // Galleries
  async getGalleries(): Promise<WordPressGallery[]> {
    const response = await fetch(`${WORDPRESS_API_BASE}/galleries`);
    if (!response.ok) throw new Error('Failed to fetch galleries');
    return response.json();
  },

  async getGalleryById(id: string): Promise<WordPressGallery> {
    const response = await fetch(`${WORDPRESS_API_BASE}/galleries/${id}`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return response.json();
  },

  async getGalleryBySlug(slug: string): Promise<WordPressGallery> {
    const response = await fetch(`${WORDPRESS_API_BASE}/galleries/slug/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return response.json();
  },
};
