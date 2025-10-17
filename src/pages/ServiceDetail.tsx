import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Sparkles, Clock, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoPlayer } from "@/components/VideoPlayer";
import { wordpressAPI, WordPressService } from "@/lib/wordpress-api";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<WordPressService | null>(null);
  const [media, setMedia] = useState<Array<{ url: string; type: 'image' | 'video' }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [slug]);

  const fetchServiceDetails = async () => {
    if (!slug) return;

    try {
      const data = await wordpressAPI.getServiceBySlug(slug);
      setService(data);

      // Extract media (images and videos)
      const mediaItems = data.acf.service_images
        ?.map(item => {
          const url = item.url || item.sizes?.large || item.sizes?.full;
          if (!url || typeof url !== 'string') return null;
          
          const isVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov');
          return {
            url,
            type: isVideo ? 'video' as const : 'image' as const
          };
        })
        .filter((item): item is { url: string; type: 'image' | 'video' } => item !== null) || [];
      
      setMedia(mediaItems);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-xl">Loading service...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service not found</h1>
          <Button onClick={() => navigate("/services")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {media[0]?.type === 'video' ? (
            <>
              <video 
                src={media[0]?.url || ""} 
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
              />
            </>
          ) : (
            <img 
              src={media[0]?.url || ""} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/services")}
            className="mb-6 hover:bg-primary/10 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
          
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Premium Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {service.acf.full_description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="group">
                  Get Free Quote
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline">
                  View Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {media.length > 0 && (
        <section className="py-20 bg-dark-card">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Service <span className="text-primary">Gallery</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  See our work in action
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {media.map((item, index: number) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border-border bg-gradient-to-br from-card to-dark-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {item.type === 'video' ? (
                        <VideoPlayer 
                          src={item.url} 
                          className="w-full h-full"
                          showBadge
                          badgeText="Service Video"
                        />
                      ) : (
                        <>
                          <img 
                            src={item.url} 
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetail;
