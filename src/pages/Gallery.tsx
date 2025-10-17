import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { VideoPlayer } from "@/components/VideoPlayer";
import { wordpressAPI, WordPressGallery } from "@/lib/wordpress-api";

interface GalleryMedia {
  id: number;
  title: string;
  url: string;
  type: "image" | "video";
  category: string;
}

const Gallery = () => {
  const [media, setMedia] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchGalleryMedia();
  }, []);

  const fetchGalleryMedia = async () => {
    try {
      const galleries = await wordpressAPI.getGalleries();
      const allMedia: GalleryMedia[] = [];

      galleries.forEach((gallery) => {
        const category = gallery.slug;
        
        // Process team_working items
        gallery.acf.team_working?.forEach((item) => {
          const isVideo = item.url.endsWith('.mp4') || item.url.endsWith('.webm');
          allMedia.push({
            id: item.id,
            title: item.title || gallery.title,
            url: item.url,
            type: isVideo ? "video" : "image",
            category: category,
          });
        });
      });

      setMedia(allMedia);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...Array.from(new Set(media.map(m => m.category)))];
  
  const filteredMedia = media.filter(item => {
    return selectedCategory === "all" || item.category === selectedCategory;
  });

  const imageUrls = filteredMedia
    .filter(item => item.type === "image")
    .map(item => ({
      id: String(item.id),
      image_url: item.url,
      title: item.title
    }));

  const handleImageClick = (index: number) => {
    const filteredIndex = filteredMedia
      .slice(0, index + 1)
      .filter(item => item.type === "image").length - 1;
    setLightboxIndex(filteredIndex);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary text-sm font-medium">OUR WORK</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Explore our craftsmanship through stunning visuals of our team at work and completed projects
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-dark-card border-y border-border">
        <div className="container mx-auto px-4">
          <h3 className="text-sm font-semibold text-foreground mb-4 text-center">Filter by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-card text-foreground hover:bg-card/80 border border-border"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-xl">No media found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedia.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group relative overflow-hidden rounded-xl animate-fade-in border border-border hover:border-primary/30 transition-all duration-500 ${
                      item.type === "image" ? "cursor-pointer hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1" : ""
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => item.type === "image" && handleImageClick(index)}
                  >
                    <div className="aspect-square overflow-hidden bg-dark-card">
                      {item.type === "video" ? (
                        <VideoPlayer 
                          src={item.url} 
                          className="w-full h-full"
                          showBadge
                          badgeText={item.title || "Video"}
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      
                      {/* Overlay for images only */}
                      {item.type === "image" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          {item.title && (
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          )}
                          <p className="text-sm text-primary">Click to view full size</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {lightboxOpen && (
                <ImageLightbox
                  images={imageUrls}
                  currentIndex={lightboxIndex}
                  onClose={() => setLightboxOpen(false)}
                  onNavigate={setLightboxIndex}
                />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
