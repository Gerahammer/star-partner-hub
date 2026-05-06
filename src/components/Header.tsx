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
      <div className="absolute inset-0 border-b border-border/10"
        style={{
          background: 'hsl(225 35% 6% / 0.95)',
          backdropFilter: 'blur(12px)',
        }}
      />
      
      <nav className="relative container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="/" onClick={handleLogoClick} className="flex items-center cursor-pointer group transition-transform hover:scale-105" aria-label="Partnerstar home">
            <img src={partnerstarLogo} alt="Partnerstar" className="h-8 md:h-10 w-auto" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground/60 hover:text-foreground transition-colors duration-300 text-[12px] font-medium tracking-[0.1em] uppercase focus-visible:ring-2 focus-visible:ring-ring/50 rounded px-2 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground/50 hover:text-foreground text-[12px]" asChild>
              <a href="https://ro-affiliate.partnerstar.com/login" target="_blank" rel="noopener noreferrer">Log In</a>
            </Button>
            <Button className="btn-gold-gradient rounded-full px-5 text-[11px] font-bold uppercase tracking-wider" size="sm" asChild>
              <a href="https://ro-affiliate.partnerstar.com/registration" target="_blank" rel="noopener noreferrer">Register</a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
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
                    className="text-muted-foreground/60 hover:text-foreground transition-colors text-base font-medium uppercase tracking-wide py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-3 mt-4">
                  <Button variant="ghost" size="lg" className="flex-1 text-muted-foreground/50" asChild>
                    <a href="https://ro-affiliate.partnerstar.com/login" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Log In</a>
                  </Button>
                  <Button className="flex-1 btn-gold-gradient rounded-full font-bold uppercase tracking-wider" size="lg" asChild>
                    <a href="https://ro-affiliate.partnerstar.com/registration" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Register</a>
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
