import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContactFormModal } from "./ContactFormModal";
import { Send } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "#about", isRoute: false },
      { name: "Our Brands", href: "#brands", isRoute: false },
      { name: "Commissions", href: "#deals", isRoute: false },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "/terms", isRoute: true },
      { name: "Privacy Policy", href: "/privacy", isRoute: true },
    ],
  },
];

export const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer className="border-t border-border/30 relative z-10 bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="mb-4 block">
              <span className="font-display text-xl">
                <span className="text-foreground">PARTNER</span>
                <span className="text-gradient-gold">STAR</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Premium iGaming affiliate program with industry-leading commission rates.
            </p>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">{link.name}</Link>
                    ) : (
                      <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">{link.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Support */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Support</h4>
            <a 
              href="https://t.me/partnerstar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-4"
            >
              <Send className="w-4 h-4" />
              Telegram Support
            </a>
            <div className="mt-3">
              <Button 
                className="btn-gold-gradient rounded-full text-xs px-4"
                size="sm"
                onClick={() => setIsContactOpen(true)}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Partnerstar. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            18+ | Gamble Responsibly
          </p>
        </div>
      </div>
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};
