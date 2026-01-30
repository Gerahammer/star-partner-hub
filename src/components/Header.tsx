import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import partnerstarLogo from "@/assets/partnerstar-logo-final.png";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Our Brands", href: "#brands" },
  { name: "Deals", href: "#deals" },
  { name: "Why Us", href: "#why-us" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div className="absolute inset-0 bg-background/50 backdrop-blur-md border-b border-border/50" />
      
      <nav className="relative container mx-auto px-4 md:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Logo - overflows below header */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 group cursor-pointer relative z-10"
          >
            <img 
              src={partnerstarLogo} 
              alt="Partnerstar" 
              className="h-16 md:h-24 w-auto transition-transform duration-300 group-hover:scale-105 -mb-4 md:-mb-8" 
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-bold uppercase tracking-wider text-base font-nav"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="heroOutline" size="sm" asChild>
              <Link to="/auth">Log In</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/auth">Register</Link>
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
                    className="text-foreground hover:text-primary transition-colors duration-300 font-bold uppercase tracking-wider text-xl py-2 font-nav"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex gap-3 mt-4">
                  <Button variant="heroOutline" size="lg" className="flex-1" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                  </Button>
                  <Button variant="hero" size="lg" className="flex-1" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Register</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
