import { Link } from "react-router-dom";
import starIcon from "@/assets/star-icon.png";

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
  {
    title: "Contact",
    links: [
      { name: "partners@partnerstar.com", href: "mailto:partners@partnerstar.com", isRoute: false },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={starIcon} alt="Partnerstar" className="w-10 h-10" />
              <span className="font-display text-2xl text-gradient-gold">PARTNERSTAR</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Premium iGaming affiliate program with industry-leading commission rates and dedicated support.
            </p>
          </div>
          
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-lg text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Partnerstar. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            18+ | Gamble Responsibly
          </p>
        </div>
      </div>
    </footer>
  );
};
