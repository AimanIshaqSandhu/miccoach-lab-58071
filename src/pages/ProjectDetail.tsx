import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { VideoPlayer } from "@/components/VideoPlayer";
import { wordpressAPI, WordPressProject } from "@/lib/wordpress-api";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<WordPressProject | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<{ id: number; title: string; url: string }[]>([]);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    if (!id) return;

    try {
      const data = await wordpressAPI.getProjectById(id);
      setProject(data);

      // Extract images
      const imageUrls = data.acf.project_images
        ?.map(img => img.url || img.sizes?.large || img.sizes?.full)
        .filter(Boolean) as string[];
      setImages(imageUrls || []);

      // Extract videos
      const videoData = data.acf.project_videos
        ?.map(video => ({
          id: video.id,
          title: video.title,
          url: video.url || video.sizes?.full
        }))
        .filter(v => v.url) || [];
      setVideos(videoData);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-xl">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {images.length > 0 ? (
            <img 
              src={images[0]} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dark-card to-dark" />
          )}
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
            onClick={() => navigate("/projects")}
            className="mb-6 hover:bg-primary/10 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          
          <div className="max-w-4xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-primary text-sm font-medium">{project.acf.category}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{project.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
              {project.acf.location && (
                <div className="flex items-center gap-2 px-4 py-2 bg-dark/50 rounded-full backdrop-blur-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{project.acf.location}</span>
                </div>
              )}
              {project.acf.year_completed && (
                <div className="flex items-center gap-2 px-4 py-2 bg-dark/50 rounded-full backdrop-blur-sm">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{project.acf.year_completed}</span>
                </div>
              )}
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.acf.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {(images.length > 0 || videos.length > 0) && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Project <span className="text-primary">Gallery</span>
            </h2>
            
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
              <>
                {/* Main Carousel */}
                <div className="max-w-5xl mx-auto mb-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-shadow duration-500">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                  <CarouselPrevious className="left-4 bg-dark-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:border-primary" />
                  <CarouselNext className="right-4 bg-dark-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:border-primary" />
                </Carousel>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {images.map((image, index) => (
                <Card 
                  key={index}
                  className="group overflow-hidden border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in cursor-pointer hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Card>
                ))}
              </div>
              </>
            )}

            {activeTab === "videos" && videos.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {videos.map((video, index) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <VideoPlayer 
                        src={video.url} 
                        className="w-full h-full"
                        showBadge
                        badgeText={video.title || "Project Video"}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Project Details Section */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Project <span className="text-primary">Details</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="group p-6 border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4 text-primary group-hover:scale-105 transition-transform">Category</h3>
                <p className="text-muted-foreground text-lg">{project.acf.category}</p>
              </Card>
              
              {project.acf.location && (
                <Card className="group p-6 border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-4 text-primary group-hover:scale-105 transition-transform">Location</h3>
                  <p className="text-muted-foreground text-lg">{project.acf.location}</p>
                </Card>
              )}
              
              {project.acf.year_completed && (
                <Card className="group p-6 border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-4 text-primary group-hover:scale-105 transition-transform">Completed</h3>
                  <p className="text-muted-foreground text-lg">{project.acf.year_completed}</p>
                </Card>
              )}
              
              <Card className="group p-6 border-border bg-gradient-to-br from-card to-dark-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 md:col-span-2">
                <h3 className="text-xl font-bold mb-4 text-primary group-hover:scale-105 transition-transform">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{project.acf.description}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 relative">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-slide-in-right" />
            <CardContent className="p-12 text-center relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Start Your <span className="text-primary">Project?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Let us transform your space with our expert ceiling solutions. Get a free consultation today!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/contact")} className="group">
                  Get a Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/projects")}>
                  View More Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
