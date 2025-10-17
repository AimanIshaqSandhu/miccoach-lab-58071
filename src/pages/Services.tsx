import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, CheckCircle, Shield, Clock, Users, Award, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { wordpressAPI, WordPressService } from "@/lib/wordpress-api";

const Services = () => {
  const [services, setServices] = useState<WordPressService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await wordpressAPI.getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-muted-foreground">Loading premium services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Enhanced Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold-soft/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-fade-in">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 border border-primary/30 rounded-full mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-primary text-sm font-semibold tracking-wide">PREMIUM CEILING SOLUTIONS</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">Space</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
              Transform ordinary ceilings into extraordinary statements with our bespoke false ceiling solutions. 
              Where elegance meets innovation in every installation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-1">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg border-2 border-primary/30 text-primary hover:bg-primary/10 rounded-full backdrop-blur-sm transition-all duration-300">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-card relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "500+", label: "Projects Completed", icon: <CheckCircle className="w-8 h-8" /> },
              { number: "15+", label: "Years Experience", icon: <Clock className="w-8 h-8" /> },
              { number: "98%", label: "Client Satisfaction", icon: <Star className="w-8 h-8" /> },
              { number: "50+", label: "Expert Craftsmen", icon: <Users className="w-8 h-8" /> }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-card/50 to-dark-card/80 border border-border hover:border-primary/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">Premium</span> Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of false ceiling solutions, each crafted with precision 
              and designed to transform your space into a masterpiece.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium Services Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're crafting exceptional ceiling solutions for you. Stay tuned for our premium service offerings.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => {
                // Find first valid image from service_images (exclude videos)
                const validImages = service.acf.service_images?.filter(img => {
                  if (!img.url || typeof img.url !== 'string') return false;
                  return !img.url.endsWith('.mp4') && !img.url.endsWith('.webm');
                }) || [];
                const primaryImage = validImages[0];
                const imageUrl = primaryImage?.url || primaryImage?.sizes?.large || primaryImage?.sizes?.full || null;

                return (
                  <Card 
                    key={service.id}
                    className="group relative overflow-hidden border-border bg-gradient-to-br from-card via-dark-card to-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 animate-slide-up hover:-translate-y-4 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Premium Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold-soft/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-gold-soft to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-[2px] rounded-lg bg-card"></div>
                    </div>

                    <div className="relative h-80 overflow-hidden rounded-t-lg">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <p className="text-muted-foreground">No image</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                      
                      {/* Premium Badge */}
                      <div className="absolute top-6 right-6">
                        <div className="px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                          Premium
                        </div>
                      </div>

                      {/* Service Title Overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                          {service.title}
                        </h3>
                        <div className="w-12 h-1 bg-primary rounded-full group-hover:w-20 transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    <CardContent className="p-8 relative">
                      <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                        {service.acf.short_description || service.acf.full_description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Link 
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center text-primary hover:text-gold-soft transition-colors font-semibold group/link text-lg"
                        >
                          Explore Service
                          <ArrowRight className="ml-3 h-5 w-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                        </Link>
                        
                        {service.acf.prices && (
                          <span className="text-sm font-semibold text-muted-foreground">
                            From PKR {service.acf.prices}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-20 bg-gradient-to-br from-dark-card via-charcoal to-dark-card relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(38 92% 60%) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-primary mr-2" />
              <span className="text-primary text-sm font-medium">Our Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              The <span className="text-primary">Art of Perfection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every project follows our meticulous 4-step process, ensuring unparalleled quality and attention to detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { 
                step: "01", 
                title: "Vision Consultation", 
                desc: "Deep dive into your aesthetic vision, functional needs, and space requirements",
                icon: <Users className="w-8 h-8" />
              },
              { 
                step: "02", 
                title: "Custom Design", 
                desc: "Create bespoke 3D designs and material selections tailored to your space",
                icon: <Sparkles className="w-8 h-8" />
              },
              { 
                step: "03", 
                title: "Expert Installation", 
                desc: "Precision execution by our certified craftsmen using premium materials",
                icon: <Award className="w-8 h-8" />
              },
              { 
                step: "04", 
                title: "Quality Assurance", 
                desc: "Rigorous inspection and perfection guarantee before project handover",
                icon: <CheckCircle className="w-8 h-8" />
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative group animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border z-0 group-hover:bg-primary/30 transition-colors duration-300">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary animate-pulse transition-colors duration-300"></div>
                  </div>
                )}

                <div className="relative p-8 bg-gradient-to-br from-card/50 to-dark-card/80 border border-border rounded-2xl text-center group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500 backdrop-blur-sm h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/35 transition-all duration-300">
                      {item.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="text-primary mb-6 mt-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Client <span className="text-primary">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what our clients say about our premium ceiling solutions and service excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Homeowner",
                content: "The false ceiling transformation in our living room exceeded all expectations. The attention to detail and craftsmanship is remarkable.",
                rating: 5
              },
              {
                name: "Michael Rodriguez",
                role: "Commercial Client",
                content: "Professional, punctual, and perfectionists. Our office space has been completely transformed with their premium ceiling solutions.",
                rating: 5
              },
              {
                name: "Emily Watson",
                role: "Interior Designer",
                content: "I regularly partner with them for my projects. Their expertise in false ceilings and commitment to quality is unmatched in the industry.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-border bg-gradient-to-br from-card to-dark-card p-8 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-0">
                  {/* Stars */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-primary">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-soft/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold-soft">Transform</span> Your Space?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              Let's discuss your vision and create a ceiling masterpiece that reflects your style and elevates your space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="px-12 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-1">
                Start Your Project
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-12 py-6 text-lg border-2 border-primary/30 text-primary hover:bg-primary/10 rounded-full backdrop-blur-sm transition-all duration-300">
                Call Us Now
              </Button>
            </div>
            
            <p className="text-muted-foreground mt-8 text-sm">
              Free consultation • 24/7 support • 5-year warranty
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
