import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContactFormModal } from "./ContactFormModal";
import partnerstarLogo from "@/assets/partnerstar-logo-final.png";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "#about", isRoute: false },
      { name: "Our Brands", href: "#brands", isRoute: false },
      { name: "Deals", href: "#deals", isRoute: false },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "FAQs", href: "#", isRoute: false },
      { name: "Terms & Conditions", href: "/terms", isRoute: true },
      { name: "Privacy Policy", href: "/privacy", isRoute: true },
    ],
  },
];

export const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer className="bg-[hsl(220,15%,12%)] border-t border-border relative z-10">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="mb-3 md:mb-4 block">
              <img src={partnerstarLogo} alt="Partnerstar" className="h-12 md:h-16 w-auto" />
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Premium iGaming affiliate program with industry-leading commission rates and dedicated support.
            </p>
          </div>
          
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-base md:text-lg text-foreground mb-2 md:mb-4">{section.title}</h4>
              <ul className="space-y-2 md:space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm break-all"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Section */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-base md:text-lg text-foreground mb-2 md:mb-4">Get In Touch</h4>
            <p className="text-muted-foreground text-xs sm:text-sm mb-4">
              Ready to start your partnership journey? We're here to help.
            </p>
            <Button variant="hero" size="sm" onClick={() => setIsContactOpen(true)}>
              Contact Us
            </Button>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Partnerstar. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm">
            18+ | Gamble Responsibly
          </p>
        </div>
      </div>
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};
