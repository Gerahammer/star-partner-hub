import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", telegram: "", teams: "", message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: formData });
      if (error) throw error;
      toast({ title: "Message sent!", description: "We'll get back to you as soon as possible." });
      setFormData({ name: "", email: "", company: "", telegram: "", teams: "", message: "" });
      onClose();
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="relative w-full max-w-lg lg:max-w-3xl glass-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={onClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10">
                <X className="w-5 h-5" />
              </button>

              <div className="pt-8 px-6 pb-2 text-center">
                <h2 className="font-display text-2xl md:text-3xl mb-2">
                  <span className="text-liquid-silver">GET IN </span>
                  <span className="text-gradient-gold">TOUCH</span>
                </h2>
                <p className="text-muted-foreground text-sm">Ready to start your partnership? Let's talk.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-muted-foreground text-sm">Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="bg-muted/30 border-border/50 focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-muted-foreground text-sm">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="bg-muted/30 border-border/50 focus:border-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="company" className="text-muted-foreground text-sm">Company</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" className="bg-muted/30 border-border/50 focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="telegram" className="text-muted-foreground text-sm">Telegram</Label>
                    <Input id="telegram" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="@username" className="bg-muted/30 border-border/50 focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="teams" className="text-muted-foreground text-sm">Teams</Label>
                    <Input id="teams" name="teams" value={formData.teams} onChange={handleChange} placeholder="Teams email" className="bg-muted/30 border-border/50 focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="message" className="text-muted-foreground text-sm">Message *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your goals..." rows={3} className="bg-muted/30 border-border/50 focus:border-primary resize-none" />
                </div>

                <Button type="submit" className="w-full btn-gold-gradient rounded-full py-5 font-bold uppercase tracking-wider group" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <>Send Message <Send className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" /></>}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
