import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormModal } from "./ContactFormModal";
import partnerstarLogo from "@/assets/partnerstar-logo.png";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Our Brands", href: "#brands" },
  { name: "Deals", href: "#deals" },
  { name: "Why Us", href: "#why-us" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />
      
      <nav className="relative container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <img 
              src={partnerstarLogo} 
              alt="Partnerstar" 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium uppercase tracking-wide text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="lg" onClick={() => setIsContactOpen(true)}>
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium uppercase tracking-wide text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button variant="hero" size="lg" className="mt-4 w-full" onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }}>
                  Contact Us
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  );
};
