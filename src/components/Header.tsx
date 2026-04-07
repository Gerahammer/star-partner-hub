import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import partnerstarLogo from "@/assets/partnerstar-full-logo.png";

const navLinks = [
  { name: "Brands", href: "#brands" },
  { name: "Commissions", href: "#deals" },
  { name: "Why Us", href: "#why-us" },
  { name: "FAQ", href: "#faq" },
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
      <div className="absolute inset-0 border-b border-border/20"
        style={{
          background: 'linear-gradient(180deg, hsl(225 35% 6% / 0.92) 0%, hsl(225 35% 6% / 0.85) 100%)',
          backdropFilter: 'blur(16px) saturate(1.2)',
        }}
      />
      
      <nav className="relative container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer"
          >
            <img 
              src={partnerstarLogo} 
              alt="Partnerstar" 
              className="h-9 md:h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110" 
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-[13px] font-medium tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground text-[13px]"
              asChild
            >
              <Link to="/auth">Log In</Link>
            </Button>
            <Button 
              className="btn-gold-gradient rounded-full px-6 text-[13px] font-bold uppercase tracking-wider"
              size="sm"
              asChild
            >
              <Link to="/auth">Join Now</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

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
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-lg font-medium uppercase tracking-wide py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-3 mt-4">
                  <Button variant="ghost" size="lg" className="flex-1 text-muted-foreground" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                  </Button>
                  <Button 
                    className="flex-1 btn-gold-gradient rounded-full font-bold uppercase tracking-wider"
                    size="lg"
                    asChild
                  >
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Join Now</Link>
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
