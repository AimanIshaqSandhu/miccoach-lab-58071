import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
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
  const [selectedMediaType, setSelectedMediaType] = useState<"all" | "image" | "video">("all");
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
  const mediaTypes = ["all", "image", "video"];
  
  const filteredMedia = media.filter(item => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const mediaMatch = selectedMediaType === "all" || item.type === selectedMediaType;
    return categoryMatch && mediaMatch;
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
      <section className="relative py-32 bg-gradient-to-b from-background to-dark-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Our Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Explore our work, team, and craftsmanship
          </p>
        </div>
      </section>

      {/* Category and Media Type Filters */}
      <section className="py-12 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Category</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Media Type</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {mediaTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMediaType(type as "all" | "image" | "video")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      selectedMediaType === type
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}{type !== "all" && "s"}
                  </button>
                ))}
              </div>
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMedia.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => item.type === "image" && handleImageClick(index)}
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      {item.type === "video" ? (
                        <video
                          src={item.url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>
                    {item.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      </div>
                    )}
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
