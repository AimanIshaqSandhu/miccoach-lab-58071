import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Sparkles, Clock, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import livingRoomImage from "@/assets/living-room-ceiling.jpg";

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  features: any;
  icon: string | null;
};

type ServiceVideo = {
  id: string;
  video_url: string;
  title: string | null;
  display_order: number;
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<ServiceVideo[]>([]);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [slug]);

  const fetchServiceDetails = async () => {
    if (!slug) return;

    // Fetch service details
    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (serviceError) {
      console.error("Error fetching service:", serviceError);
      setLoading(false);
      return;
    }

    setService(serviceData);

    // Fetch all images for this service
    const { data: imagesData, error: imagesError } = await supabase
      .from("service_images")
      .select("*")
      .eq("service_id", serviceData.id)
      .order("display_order", { ascending: true });

    if (!imagesError && imagesData) {
      const imageUrls = imagesData.map((img) => {
        const { data } = supabase.storage
          .from("service-images")
          .getPublicUrl(img.image_url);
        return data.publicUrl;
      });
      setImages(imageUrls);
    }

    // Fetch all videos for this service
    const { data: videosData, error: videosError } = await supabase
      .from("service_videos")
      .select("*")
      .eq("service_id", serviceData.id)
      .order("display_order", { ascending: true });

    if (!videosError && videosData) {
      setVideos(videosData);
    }

    setLoading(false);
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

  const features = Array.isArray(service.features) 
    ? service.features 
    : service.features?.features || [];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={images[0] || livingRoomImage} 
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/70" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
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
              {service.description}
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

      {/* Stats Section */}
      <section className="py-16 bg-dark-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Clock, value: "24/7", label: "Support" },
              { icon: Award, value: "25+", label: "Years Experience" },
              { icon: Shield, value: "100%", label: "Quality Assured" },
              { icon: Sparkles, value: "500+", label: "Projects Done" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-scale-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Key <span className="text-primary">Features</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Everything you need for a perfect ceiling solution
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature: string, index: number) => (
                  <Card
                    key={index}
                    className="group p-6 border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-slide-in-left hover:-translate-y-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed pt-2">{feature}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {(images.length > 0 || videos.length > 0) && (
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

              {/* Tabs */}
              <div className="flex justify-center gap-4 mb-12">
                {images.length > 0 && (
                  <button
                    onClick={() => setActiveTab("images")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "images"
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Images ({images.length})
                  </button>
                )}
                {videos.length > 0 && (
                  <button
                    onClick={() => setActiveTab("videos")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "videos"
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Videos ({videos.length})
                  </button>
                )}
              </div>

              {activeTab === "images" && images.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image: string, index: number) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border-border bg-gradient-to-br from-card to-dark-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "videos" && videos.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {videos.map((video, index) => (
                    <Card
                      key={video.id}
                      className="overflow-hidden border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <video
                          src={video.video_url}
                          controls
                          className="w-full h-full"
                        />
                      </div>
                      {video.title && (
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg">{video.title}</h3>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 relative">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-slide-in-right" />
            <CardContent className="p-12 text-center relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                Ready to <span className="text-primary">Transform</span> Your Space?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Contact us today for a free consultation and quote for your {service.title.toLowerCase()}.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="group">
                    Get Free Quote
                    <ArrowLeft className="ml-2 h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outline">
                    View More Projects
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
