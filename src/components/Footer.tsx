import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-card via-background to-background/95 border-t border-primary/20 overflow-hidden">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info with Logo */}
          <div className="space-y-6 lg:col-span-2">
            <Link to="/" className="inline-block group relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <img 
                src={logo} 
                alt="IQ Ceilings Logo" 
                className="h-16 w-auto transition-all duration-500 group-hover:scale-110 relative z-10 drop-shadow-[0_0_20px_rgba(var(--primary),0.4)]"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              25 years of excellence in false ceiling solutions. Delivering quality and innovation 
              that transforms spaces into extraordinary experiences.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="relative w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110 hover:rotate-12 group overflow-hidden"
                aria-label="Facebook"
              >
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Facebook size={20} className="relative z-10" />
              </a>
              <a 
                href="#" 
                className="relative w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110 hover:rotate-12 group overflow-hidden"
                aria-label="Instagram"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Instagram size={20} className="relative z-10" />
              </a>
              <a 
                href="#" 
                className="relative w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110 hover:rotate-12 group overflow-hidden"
                aria-label="LinkedIn"
              >
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Linkedin size={20} className="relative z-10" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-bold text-lg text-foreground relative inline-block group">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-3 pt-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/projects", label: "Projects" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bold text-lg text-foreground relative inline-block group">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Call Us</p>
                  <a 
                    href="tel:+923458783923" 
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    +92 345 8783923
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email Us</p>
                  <a 
                    href="mailto:aliishaqsandho@gmail.com" 
                    className="text-foreground hover:text-primary transition-colors font-medium break-all"
                  >
                    aliishaqsandho@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <span className="text-foreground font-medium">Pakistan</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with animation */}
        <div className="border-t border-primary/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-muted-foreground text-sm text-center md:text-left flex items-center gap-2">
              © {currentYear} IQ Ceilings. All rights reserved. 
              <span className="hidden md:inline text-primary">|</span>
              <span className="text-primary font-semibold">25 Years of Excellence</span>
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
