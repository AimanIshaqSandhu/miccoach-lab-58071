import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-2xl border-b border-primary/20"
            : "bg-background/95 backdrop-blur-xl shadow-2xl border-b border-primary/20"
        }`}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-700" />
        
        {/* Spotlight effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container px-4 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <Link to="/" className="relative z-10 group">
              <div className="flex items-center gap-3">
                {/* Animated glow container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 scale-150" />
                  <div className="relative from-primary/20 to-accent/20 rounded-xl transition-all duration-300 group-hover:scale-110">
                    <img
                      src={logo}
                      alt="IQ Ceilings"
                      className="h-16 w-auto relative z-10 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group px-4 py-2"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span
                    className={`relative z-10 text-sm font-medium tracking-wide transition-all duration-300 ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-foreground/80 group-hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </span>
                  
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 ${
                      isActive(link.path)
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                  
                  {/* Hover background effect */}
                  <span className="absolute inset-0 bg-primary/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                  
                  {/* Active indicator */}
                  {isActive(link.path) && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse" />
                  )}
                </Link>
              ))}

              {/* CTA Button with advanced effects */}
              <Link to="/contact" className="ml-4">
                <Button
                  className="relative overflow-hidden group bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-105 border border-primary/20"
                >
                  {/* Animated background gradient */}
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shine effect */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Quote
                  </span>
                  
                  {/* Glow effect */}
                  <span className="absolute inset-0 rounded-xl blur-xl bg-primary/30 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-10 p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                >
                  <Menu className="w-6 h-6 text-primary" />
                </span>
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  }`}
                >
                  <X className="w-6 h-6 text-primary" />
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 pb-6">
            {/* Decorative line */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />
            
            <div className="space-y-2">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`group relative block px-6 py-4 rounded-xl transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-primary/10 border-l-4 border-primary"
                      : "bg-card/30 backdrop-blur-sm hover:bg-primary/5 border-l-4 border-transparent hover:border-primary/50"
                  }`}
                  style={{
                    animation: isOpen ? `slideIn 0.3s ease-out ${idx * 50}ms both` : "none"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? "text-primary"
                          : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </span>
                    {isActive(link.path) && (
                      <span className="w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block mt-6"
                style={{
                  animation: isOpen ? `slideIn 0.3s ease-out ${navLinks.length * 50}ms both` : "none"
                }}
              >
                <Button className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Get Your Free Quote
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;