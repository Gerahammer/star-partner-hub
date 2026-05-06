import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContactFormModal } from "./ContactFormModal";
import { Send, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import partnerstarLogo from "@/assets/partnerstar-full-logo.png";

const paymentLabels = ["Wire", "BTC", "USDT", "Skrill", "Neteller"];

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "Our Brands", href: "#brands", isRoute: false },
      { name: "Commissions", href: "#deals", isRoute: false },
      { name: "Why Us", href: "#why-us", isRoute: false },
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
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handlePasswordSubmit = async (password: string) => {
    if (!password.trim()) {
      toast({ title: "Error", description: "Please enter a password", variant: "destructive" });
      return;
    }

    setIsValidating(true);
    try {
      // Validate password by fetching testimonials with the password header
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/testimonials`, {
        method: 'GET',
        headers: {
          'X-Admin-Password': password
        }
      });

      // GET /api/testimonials doesn't require auth, but we check if the connection works
      if (!response.ok) {
        toast({ title: "Error", description: "Failed to validate password", variant: "destructive" });
        setIsValidating(false);
        return;
      }

      // Password is accepted - store and dispatch event
      sessionStorage.setItem('adminPassword', password);
      window.dispatchEvent(new CustomEvent('adminPasswordChanged', { detail: { password } }));
      setTempPassword("");
      setIsPasswordDialogOpen(false);
      toast({ title: "Success", description: "Admin access granted" });
    } catch (error: any) {
      console.error('Password validation error:', error);
      toast({ title: "Error", description: "Failed to validate password", variant: "destructive" });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <footer className="border-t border-border/20 relative z-10" style={{ background: 'hsl(225 35% 5%)' }}>
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="mb-4 block group transition-transform hover:scale-105" aria-label="Back to Partnerstar home">
              <img src={partnerstarLogo} alt="Partnerstar" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground/60 text-xs leading-relaxed">
              Premium iGaming affiliate program with industry-leading commission rates.
            </p>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-foreground/80 text-xs uppercase tracking-[0.15em] mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link to={link.href} className="text-muted-foreground/60 hover:text-foreground transition-colors text-sm focus-visible:ring-2 focus-visible:ring-ring/50 rounded px-1 py-0.5 inline-block">{link.name}</Link>
                    ) : (
                      <a href={link.href} className="text-muted-foreground/60 hover:text-foreground transition-colors text-sm focus-visible:ring-2 focus-visible:ring-ring/50 rounded px-1 py-0.5 inline-block">{link.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-medium text-foreground/80 text-xs uppercase tracking-[0.15em] mb-4">Support</h4>
            <a
              href="https://t.me/partnerstar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors text-sm mb-4 focus-visible:ring-2 focus-visible:ring-ring/50 rounded px-1 py-0.5 group"
              aria-label="Telegram support channel"
            >
              <Send className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              Telegram
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

        {/* Payment methods */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {paymentLabels.map((p) => (
            <span key={p} className="text-[10px] text-muted-foreground/30 font-mono tracking-wider uppercase">{p}</span>
          ))}
        </div>
        
        <div className="pt-6 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/40 text-xs">
            © {new Date().getFullYear()} Partnerstar. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground/40 text-xs">
              18+ | Gamble Responsibly
            </p>
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground/60 hover:text-foreground">
                  <Lock className="w-3 h-3 mr-1" strokeWidth={1.5} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border/30">
                <DialogHeader><DialogTitle className="text-sm">Admin Password</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit(tempPassword)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsPasswordDialogOpen(false)} className="border-border/20" disabled={isValidating}>Cancel</Button>
                    <Button type="button" size="sm" className="btn-gold-gradient" onClick={() => handlePasswordSubmit(tempPassword)} disabled={isValidating}>{isValidating ? "Validating..." : "Unlock"}</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};
