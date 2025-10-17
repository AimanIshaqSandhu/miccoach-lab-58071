import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { wordpressAPI, WordPressProject } from "@/lib/wordpress-api";

export const FeaturedProjects = () => {
  const [projects, setProjects] = useState<WordPressProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const data = await wordpressAPI.getProjects();
      // Get the 3 most recent projects
      setProjects(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-dark-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our latest ceiling transformations and see the quality of our work
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => {
            const primaryImage = project.acf.project_images?.find(() => true);
            const imageUrl = primaryImage?.url || primaryImage?.sizes?.full || null;
            
            return (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <Card
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-border bg-card animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <p className="text-muted-foreground">No image</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-3">
                        <span className="text-primary text-xs font-medium">
                          {project.acf.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.acf.description}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/projects">
            <Button variant="outline" size="lg">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
