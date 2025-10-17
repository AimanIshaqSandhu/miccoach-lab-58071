import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { wordpressAPI, WordPressProject } from "@/lib/wordpress-api";

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<WordPressProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await wordpressAPI.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.acf.category.toLowerCase() === filter);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-xl">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-medium">Our Work</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Completed <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our portfolio of stunning false ceiling installations. Each project represents our commitment to excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-background sticky top-20 z-40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((f) => (
              <Button
                key={f.id}
                variant={filter === f.id ? "default" : "outline"}
                onClick={() => setFilter(f.id)}
                className="min-w-[120px]"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                // Find first valid image from project_images
                const validImages = project.acf.project_images?.filter(img => img.url && typeof img.url === 'string') || [];
                const primaryImage = validImages[0];
                const imageUrl = primaryImage?.url || primaryImage?.sizes?.large || primaryImage?.sizes?.full || null;
                
                return (
                  <Card 
                    key={project.id}
                    className="group relative overflow-hidden border-border bg-gradient-to-br from-card to-dark-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in cursor-pointer hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                    </div>

                    <div className="relative h-80 overflow-hidden">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <p className="text-muted-foreground">No image</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />
                      
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary-foreground transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        {project.acf.category}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                        {project.acf.location && (
                          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            {project.acf.location}
                          </p>
                        )}
                        {project.acf.year_completed && (
                          <p className="text-sm text-muted-foreground mb-2">{project.acf.year_completed}</p>
                        )}
                        <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 line-clamp-2 leading-relaxed">
                          {project.acf.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                          <span className="text-primary text-sm font-semibold">View Project</span>
                          <ArrowRight className="text-primary h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "25+", label: "Years Experience" },
              { value: "100%", label: "Quality Assured" },
              { value: "50+", label: "Expert Team" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
