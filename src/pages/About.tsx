import { Link } from "react-router-dom";
import { Award, Target, Heart, Lightbulb, ArrowRight, Users, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamWork1 from "@/assets/team-work-1.jpg";
import teamWork2 from "@/assets/team-work-2.jpg";
import teamWork3 from "@/assets/team-work-3.jpg";
import livingRoomCeiling from "@/assets/living-room-ceiling.jpg";
import officeCeiling from "@/assets/office-ceiling.jpg";
import restaurantCeiling from "@/assets/restaurant-ceiling.jpg";
import teamInstallation from "@/assets/team-installation.jpg";
import workshopMaterials from "@/assets/workshop-materials.jpg";
import qualityCheck from "@/assets/quality-check.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Cinematic Introduction */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={teamWork1} 
            alt="Our Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/60" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-block mb-6 px-6 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full">
              <span className="text-primary font-semibold tracking-wide">EST. 2000</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Crafting Excellence
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-gold-soft to-accent mt-2">
                For 25 Years
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              Where precision meets passion, and every ceiling tells a story of uncompromising craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/portfolio">
                <Button size="lg" className="text-base px-8 py-6 shadow-primary hover:shadow-primary hover:scale-105 transition-all">
                  View Our Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 border-primary/30 hover:bg-primary/10 text-white hover:text-white">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Banner - Impressive Numbers */}
      <section className="py-20 bg-charcoal-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(38 92% 60%) 0px, transparent 1px, transparent 50px, hsl(38 92% 60%) 51px)' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "25+", label: "Years of Mastery", icon: Award },
              { value: "500+", label: "Projects Delivered", icon: CheckCircle2 },
              { value: "100%", label: "Satisfaction Rate", icon: Heart },
              { value: "50+", label: "Expert Craftsmen", icon: Users }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Engaging Narrative */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
                  <span className="text-primary text-sm font-semibold">OUR JOURNEY</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Built on Passion,
                  <span className="block text-primary">Driven by Excellence</span>
                </h2>
              </div>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  What started as a small workshop in 2000 has blossomed into a legacy of architectural excellence. Our founder's vision was simple yet profound: transform ordinary ceilings into extraordinary masterpieces.
                </p>
                <p>
                  Today, we're proud to be the trusted name behind hundreds of stunning spaces across the region. From intimate homes to grand commercial venues, each project carries our signature blend of innovation and tradition.
                </p>
                <p>
                  Our team doesn't just install ceilings—we craft experiences, design atmospheres, and build lasting relationships with every client we serve.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Licensed & Certified</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Fully Insured</span>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                <img 
                  src={teamWork3} 
                  alt="Our Journey" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase 1 - Meet The Experts */}
      <section className="py-24 lg:py-32 bg-charcoal-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary text-sm font-semibold">THE PEOPLE BEHIND THE CRAFT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Meet Our Master Craftsmen
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A dedicated team of experts who bring decades of combined experience to every project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="group relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <img 
                src={teamInstallation} 
                alt="Installation Team" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-1 bg-primary" />
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Installation Specialists</h3>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Our installation team brings precision and care to every project. With years of hands-on experience, they ensure flawless execution from start to finish, treating your space with the respect it deserves.
                </p>
              </div>
            </div>

            <div className="group relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <img 
                src={teamWork2} 
                alt="Design Team" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-1 bg-primary" />
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Design Consultants</h3>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Our design team works closely with you to understand your vision and translate it into reality. They combine creativity with technical expertise to recommend solutions that enhance your space's aesthetics and functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid - What We Stand For */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary text-sm font-semibold">OUR FOUNDATION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Values That Define Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every decision, every project, and every interaction
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { 
                icon: Award, 
                title: "Unmatched Quality", 
                desc: "We never compromise on materials, craftsmanship, or attention to detail. Every project meets our rigorous standards." 
              },
              { 
                icon: Target, 
                title: "Precision First", 
                desc: "Millimeter-perfect installations backed by advanced techniques and decades of expertise in ceiling design." 
              },
              { 
                icon: Heart, 
                title: "Client Partnership", 
                desc: "Your satisfaction drives us. We listen, collaborate, and deliver solutions that exceed expectations every time." 
              },
              { 
                icon: Lightbulb, 
                title: "Innovation", 
                desc: "Staying ahead with cutting-edge materials, modern techniques, and creative solutions for contemporary spaces." 
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-lg bg-charcoal-light border border-border hover:border-primary/50 transition-all hover:shadow-card"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Visualization */}
      <section className="py-24 lg:py-32 bg-charcoal-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary text-sm font-semibold">HOW WE WORK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our Proven Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach that ensures exceptional results every time
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { 
                img: teamInstallation, 
                number: "01", 
                title: "Expert Installation", 
                desc: "Our certified technicians handle every installation with precision, using industry-leading techniques and tools to ensure perfect alignment and durability.",
                highlight: "Professional Team"
              },
              { 
                img: workshopMaterials, 
                number: "02", 
                title: "Premium Materials", 
                desc: "We source only the highest quality materials from trusted suppliers, ensuring your ceiling looks stunning and stands the test of time.",
                highlight: "Quality Guaranteed"
              },
              { 
                img: qualityCheck, 
                number: "03", 
                title: "Rigorous Inspection", 
                desc: "Every project undergoes multiple quality checkpoints. We don't consider a job complete until it meets our exacting standards and yours.",
                highlight: "100% Satisfaction"
              }
            ].map((step, index) => (
              <div key={index} className="group">
                <div className="relative h-80 overflow-hidden rounded-lg mb-6">
                  <img 
                    src={step.img} 
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute top-6 left-6 w-16 h-16 bg-primary flex items-center justify-center shadow-primary">
                    <span className="text-2xl font-bold text-charcoal">{step.number}</span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-primary/90 text-charcoal text-sm font-semibold rounded-full">
                      {step.highlight}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                <img 
                  src={teamWork1} 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
                  <span className="text-primary text-sm font-semibold">OUR CULTURE</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Where Talent
                  <span className="block text-primary">Meets Teamwork</span>
                </h2>
              </div>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Behind every successful project is a team that works in perfect harmony. Our craftsmen, designers, and project managers collaborate seamlessly to deliver results that consistently exceed expectations.
                </p>
                <p>
                  We invest in continuous training and development, ensuring our team stays at the forefront of industry innovations while maintaining the traditional values of quality craftsmanship.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-charcoal-light rounded-lg border border-border">
                  <Sparkles className="w-8 h-8 text-primary mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Expert Team Members</div>
                </div>
                <div className="p-6 bg-charcoal-light rounded-lg border border-border">
                  <Award className="w-8 h-8 text-primary mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Certified Professionals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Grid */}
      <section className="py-0">
        <div className="grid md:grid-cols-3">
          {[
            { img: livingRoomCeiling, title: "Residential Elegance", desc: "Transforming homes into havens" },
            { img: officeCeiling, title: "Commercial Excellence", desc: "Professional spaces reimagined" },
            { img: restaurantCeiling, title: "Hospitality Luxury", desc: "Creating memorable atmospheres" }
          ].map((item, index) => (
            <div key={index} className="relative h-96 overflow-hidden group">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA - Compelling Close */}
      <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle, hsl(38 92% 60%) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary text-sm font-semibold">LET'S START YOUR PROJECT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Transform
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-2">
                Your Space?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the difference that 25 years of expertise, passion, and dedication can make. Let's create something extraordinary together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="text-lg px-10 py-6 shadow-primary hover:shadow-primary hover:scale-105 transition-all">
                  Get Free Consultation
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-primary/30 hover:bg-primary/10">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;