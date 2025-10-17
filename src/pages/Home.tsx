import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Award, Users, CheckCircle, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Testimonials } from "@/components/Testimonials";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ImageLightbox } from "@/components/ImageLightbox";
import Autoplay from "embla-carousel-autoplay";
import { wordpressAPI, WordPressGallery } from "@/lib/wordpress-api";
import type { CarouselApi } from "@/components/ui/carousel";
import livingRoomImage from "@/assets/living-room-ceiling.jpg";
import bedroomImage from "@/assets/bedroom-ceiling.jpg";
import officeImage from "@/assets/office-ceiling.jpg";
import commercialImage from "@/assets/commercial-ceiling.jpg";
import restaurantImage from "@/assets/restaurant-ceiling.jpg";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
}

const Home = () => {
  const [teamImages, setTeamImages] = useState<GalleryImage[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  // Initialize autoplay plugin once with useRef
  const autoplayPlugin = useRef(
    Autoplay({ 
      delay: 5000, 
      stopOnInteraction: false,
      stopOnMouseEnter: true 
    })
  );

  useEffect(() => {
    fetchTeamImages();
  }, []);

  const fetchTeamImages = async () => {
    try {
      const galleries = await wordpressAPI.getGalleries();
      
      // Find team working gallery
      const teamGallery = galleries.find(g => 
        g.slug.includes("team") || g.title.toLowerCase().includes("team")
      );
      
      if (teamGallery && teamGallery.acf.team_working) {
        const images = teamGallery.acf.team_working
          .slice(0, 10)
          .map((item, index) => ({
            id: String(item.id || index),
            image_url: item.url || item.sizes?.large || item.sizes?.full || "",
            title: item.title || null,
          }))
          .filter(img => img.image_url);
        
        setTeamImages(images);
      }
    } catch (error) {
      console.error("Error fetching team images:", error);
    }
  };

  // Enhanced hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Excellence in",
      highlight: "Ceiling Design",
      description: "25 years of transforming spaces through precision craftsmanship",
      buttonText: "Start Your Project",
      link: "/contact",
      background: "http://iqfalseceilings.site/wp-content/uploads/2025/10/5fbcd76d2d8c563938d8cb7639bbef31.jpg",
    },
    {
      id: 2,
      title: "Our Premium",
      highlight: "Projects",
      description: "Discover our portfolio of exceptional ceiling designs",
      buttonText: "View Projects",
      link: "/projects",
      background: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Expert",
      highlight: "Services",
      description: "Comprehensive ceiling solutions for all spaces",
      buttonText: "Our Services",
      link: "/services",
      background: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "About Our",
      highlight: "Journey",
      description: "Learn about our 25-year legacy of excellence",
      buttonText: "Our Story",
      link: "/about",
      background: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    }
  ];

  // Track current slide
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);


  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Carousel Section */}
      <section className="relative w-full h-screen overflow-hidden bg-charcoal">
        <Carousel
          opts={{ 
            loop: true,
            duration: 30,
            align: "start"
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full h-full"
          setApi={setApi}
        >
          <CarouselContent className="h-full ml-0">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id} className="relative h-screen pl-0 basis-full">
                {/* Background Image Container */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${slide.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Enhanced Dark Overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center z-20">
                  <div className="container mx-auto px-6 lg:px-12 max-w-7xl pt-20">
                    <div className="max-w-3xl">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-primary/15 backdrop-blur-md border border-primary/30">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <p className="text-primary text-xs font-bold tracking-widest uppercase">Since 1999</p>
                      </div>

                      {/* Title */}
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                        <span className="text-white drop-shadow-2xl block mb-3">{slide.title}</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-gold-soft to-primary drop-shadow-[0_2px_20px_rgba(255,183,77,0.5)]">
                          {slide.highlight}
                        </span>
                      </h1>

                      {/* Description */}
                      <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-12 font-light max-w-2xl leading-relaxed drop-shadow-lg">
                        {slide.description}
                      </p>

                      {/* Button */}
                      <div>
                        <Link to={slide.link}>
                          <Button 
                            size="lg" 
                            className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary/50 relative overflow-hidden group bg-primary text-charcoal hover:bg-gold-soft border-0 font-semibold"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-gold-soft via-primary to-gold-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center">
                              {slide.buttonText}
                              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-6">
            <CarouselPrevious className="relative static left-0 right-0 transform-none bg-white/10 border-white/30 hover:bg-primary/90 hover:border-primary backdrop-blur-md h-12 w-12 transition-all duration-300 shadow-lg">
              <ChevronLeft className="h-6 w-6 text-white" />
            </CarouselPrevious>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-primary w-8 shadow-[0_0_12px_rgba(255,183,77,0.8)]' 
                      : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <CarouselNext className="relative static left-0 right-0 transform-none bg-white/10 border-white/30 hover:bg-primary/90 hover:border-primary backdrop-blur-md h-12 w-12 transition-all duration-300 shadow-lg">
              <ChevronRight className="h-6 w-6 text-white" />
            </CarouselNext>
          </div>
        </Carousel>
      </section>
      {/* Image Gallery Section - Clean & Professional */}
      <section className="py-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {[
            { img: livingRoomImage, title: "Residential", subtitle: "Living Spaces" },
            { img: officeImage, title: "Commercial", subtitle: "Office Environments" },
            { img: restaurantImage, title: "Hospitality", subtitle: "Dining Experiences" },
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative h-96 overflow-hidden"
            >
              <img 
                src={item.img} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-primary text-sm font-medium mb-1 tracking-wider">{item.subtitle}</p>
                <h3 className="text-3xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats with Team Images Slider */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          {/* Team Images Slider with Lightbox */}
          {teamImages.length > 0 && (
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-center mb-12">Our Expert Team at Work</h3>
              <Carousel
                opts={{ loop: true, align: "start" }}
                plugins={[Autoplay({ delay: 3000 })]}
                className="w-full max-w-6xl mx-auto"
              >
                <CarouselContent className="-ml-4">
                  {teamImages.map((image, idx) => (
                    <CarouselItem key={image.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div 
                        className="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer"
                        onClick={() => {
                          setLightboxIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <img
                          src={image.image_url}
                          alt={image.title || "Team at work"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          {image.title && <h4 className="text-white font-semibold">{image.title}</h4>}
                          <p className="text-white/80 text-sm absolute top-4 right-4">Click to view</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={teamImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* Full Width Image Section */}
      <section className="relative h-screen">
        <img 
          src={commercialImage} 
          alt="Our Expertise" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Crafted to Perfection
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Every ceiling tells a story of precision, dedication, and uncompromising quality
            </p>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-dark">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services - Image Focused */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Specialized ceiling solutions for every space
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { img: livingRoomImage, title: "Residential" },
              { img: bedroomImage, title: "Luxury Living" },
              { img: officeImage, title: "Corporate" }
            ].map((service, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-none animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={service.img} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                    <Link to="/services" className="text-primary flex items-center gap-2 hover:gap-3 transition-all">
                      Explore
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Enhanced Why Choose Us Section */}
      <section className="py-32 bg-charcoal-light relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold tracking-wider text-sm">WHY CHOOSE US</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-ivory to-ivory/80 bg-clip-text text-transparent">
              The Premium Difference
            </h2>
            <p className="text-xl text-ivory/70 font-light leading-relaxed">
              Experience unparalleled excellence with our commitment to quality, craftsmanship, and client satisfaction
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "25+ Years Excellence",
                description: "Quarter century of perfecting ceiling design and installation craftsmanship",
                features: ["Industry Leader", "Proven Track Record", "Continuous Innovation"]
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Craftsmen",
                description: "Highly skilled team dedicated to precision and perfection in every project",
                features: ["Certified Professionals", "Ongoing Training", "Quality Focused"]
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Premium Materials",
                description: "Only the finest materials sourced for lasting quality and durability",
                features: ["Premium Selection", "Quality Assurance", "Sustainable Options"]
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Precision Engineering",
                description: "Meticulous attention to every detail ensuring flawless execution",
                features: ["Technical Excellence", "Detailed Planning", "Perfect Execution"]
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:bg-card/70 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Icon */}
                <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors duration-300">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-ivory mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-ivory/70 mb-6 leading-relaxed font-light">
                  {feature.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {feature.features.map((item, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm text-ivory/60 group-hover:text-ivory/80 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 pt-12 border-t border-border/50">
            <div className="max-w-2xl mx-auto">
              <p className="text-ivory/70 text-lg mb-8 font-light">
                Ready to experience the premium difference in ceiling design?
              </p>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-7 bg-primary text-charcoal hover:bg-gold-soft hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
                >
                  Start Your Premium Project
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Full Width CTA */}
      <section className="relative h-96">
        <img 
          src={restaurantImage} 
          alt="Transform your space" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center px-4 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform Your Space?
            </h2>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-10 py-6">
                Get Started
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
