import { useState, useEffect, useRef, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, ExternalLink, ChevronLeft, ChevronRight, Upload, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface Testimonial {
  id: string;
  site_name: string;
  content: string;
  site_url: string | null;
  logo_url: string | null;
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ site_name: "", content: "", site_url: "", logo_url: "" });
  const { toast } = useToast();

  const itemsToShow = isMobile ? 1 : 3;
  const showCarousel = testimonials.length > itemsToShow;

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/testimonials`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({ title: "Error", description: "Failed to load testimonials", variant: "destructive" });
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (!password.trim()) {
      toast({ title: "Error", description: "Please enter a password", variant: "destructive" });
      return;
    }
    setAdminPassword(password);
    setTempPassword("");
    setIsPasswordDialogOpen(false);
    toast({ title: "Success", description: "Admin access granted" });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminPassword) return;

    setUploadingLogo(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/testimonials/upload`, {
        method: 'POST',
        headers: {
          'X-Admin-Password': adminPassword
        },
        body: formDataObj
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      setFormData({ ...formData, logo_url: data.url });
      toast({ title: "Success", description: "Logo uploaded" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        site_name: formData.site_name,
        content: formData.content,
        site_url: formData.site_url || null,
        logo_url: formData.logo_url || null
      };

      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': adminPassword
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save testimonial');
      }

      toast({ title: editingId ? "Updated" : "Added", description: "Testimonial saved successfully" });
      resetForm();
      fetchTestimonials();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (t: Testimonial) => {
    setFormData({ site_name: t.site_name, content: t.content, site_url: t.site_url || "", logo_url: t.logo_url || "" });
    setEditingId(t.id); setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!adminPassword) {
      toast({ title: "Error", description: "Admin password required", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Password': adminPassword
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete testimonial');
      }

      toast({ title: "Deleted", description: "Testimonial removed" });
      fetchTestimonials();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const resetForm = () => { setFormData({ site_name: "", content: "", site_url: "", logo_url: "" }); setEditingId(null); setIsDialogOpen(false); };

  const nextSlide = () => { setSlideDirection(1); setCurrentSlide((p) => (p + 1) % testimonials.length); };
  const prevSlide = () => { setSlideDirection(-1); setCurrentSlide((p) => (p - 1 + testimonials.length) % testimonials.length); };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    const result: Testimonial[] = [];
    for (let i = 0; i < itemsToShow; i++) { result.push(testimonials[(currentSlide + i) % testimonials.length]); }
    return result;
  };

  const handleTouchStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    touchStartX.current = null; touchEndX.current = null;
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-primary/80 font-medium uppercase tracking-[0.2em] text-xs mb-5 block">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">What Partners </span>
            <span className="text-gradient-gold">Say</span>
          </h2>
        </motion.div>

        <div className="flex justify-end mb-8 gap-2">
          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full text-xs border-border/20" onClick={() => setIsPasswordDialogOpen(true)}>
                <Lock className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> {adminPassword ? "Change Password" : "Unlock Admin"}
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
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsPasswordDialogOpen(false)} className="border-border/20">Cancel</Button>
                  <Button type="button" size="sm" className="btn-gold-gradient" onClick={() => handlePasswordSubmit(tempPassword)}>Unlock</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {adminPassword && (
            <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsDialogOpen(open); }}>
              <DialogTrigger asChild>
                <Button className="btn-gold-gradient rounded-full text-xs" onClick={() => resetForm()}>
                  <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border/30">
                <DialogHeader><DialogTitle className="text-sm">{editingId ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Site Name" value={formData.site_name} onChange={(e) => setFormData({ ...formData, site_name: e.target.value })} required />
                  <Textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required rows={4} />
                  <Input placeholder="Site URL" value={formData.site_url} onChange={(e) => setFormData({ ...formData, site_url: e.target.value })} />
                  <div>
                    <label className="text-xs text-muted-foreground/60 mb-2 block">Logo</label>
                    <div className="flex gap-2 items-center">
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingLogo} className="flex-1 border-border/20">
                        <Upload className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />{uploadingLogo ? "Uploading..." : "Upload"}
                      </Button>
                      {formData.logo_url && <img src={formData.logo_url} alt="Logo" className="w-8 h-8 object-contain rounded border border-border/20" />}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={resetForm} className="border-border/20" disabled={isSubmitting}>Cancel</Button>
                    <Button type="submit" size="sm" className="btn-gold-gradient" disabled={isSubmitting}>{isSubmitting ? "Saving..." : editingId ? "Update" : "Add"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-16"><p className="text-muted-foreground/50 text-sm">No testimonials yet.</p></div>
        ) : (
          <div className="relative">
            {showCarousel && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-10 rounded-full h-9 w-9 border-border/15 hover:border-border/30 transition-colors"
                style={{ background: 'hsl(224 28% 10%)' }}
                onClick={prevSlide}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4 text-muted-foreground/50" strokeWidth={1.5} />
              </Button>
            )}

            <div className={`flex gap-5 px-8 md:px-0 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}
              onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="popLayout" initial={false}>
                {getVisibleTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${currentSlide}-${index}`}
                    initial={{ opacity: 0, x: slideDirection * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideDirection * 50 }}
                    transition={{ duration: 0.3 }}
                    className={isMobile ? 'w-full' : 'flex-1 max-w-[320px]'}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl p-6 h-full flex flex-col min-h-[200px] border border-border/15"
                      style={{ background: 'hsl(224 28% 10%)' }}
                    >
                      {adminPassword && (
                        <div className="flex justify-end gap-1.5 mb-3">
                          <motion.button
                            onClick={() => handleEdit(testimonial)}
                            className="p-1 rounded-full hover:bg-muted/30 transition-colors focus-visible:ring-2 focus-visible:ring-ring/50"
                            whileHover={{ scale: 1.15 }}
                            aria-label={`Edit testimonial from ${testimonial.site_name}`}
                          >
                            <Edit2 className="w-3.5 h-3.5 text-muted-foreground/40" strokeWidth={1.5} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(testimonial.id)}
                            className="p-1 rounded-full hover:bg-destructive/10 transition-colors focus-visible:ring-2 focus-visible:ring-ring/50"
                            whileHover={{ scale: 1.15 }}
                            aria-label={`Delete testimonial from ${testimonial.site_name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-muted-foreground/40" strokeWidth={1.5} />
                          </motion.button>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        {testimonial.logo_url ? (
                          <img src={testimonial.logo_url} alt={`${testimonial.site_name} logo`} className="w-9 h-9 object-contain rounded-lg border border-border/20 p-1" style={{ background: 'hsl(224 28% 13%)' }} />
                        ) : (
                          <div className="w-9 h-9 rounded-lg border border-border/20 flex items-center justify-center" style={{ background: 'hsl(224 28% 13%)' }}>
                            <span className="text-muted-foreground/60 font-mono text-xs">{testimonial.site_name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-foreground/80 text-sm">{testimonial.site_name}</p>
                          {testimonial.site_url && (
                            <a href={testimonial.site_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground/40 hover:text-muted-foreground/60 flex items-center gap-1">
                              Visit <ExternalLink className="w-2.5 h-2.5" strokeWidth={1.5} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground/60 leading-relaxed line-clamp-4 text-sm flex-1">"{testimonial.content}"</p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {showCarousel && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-10 rounded-full h-9 w-9 border-border/15 hover:border-border/30 transition-colors"
                  style={{ background: 'hsl(224 28% 10%)' }}
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" strokeWidth={1.5} />
                </Button>
                <div className="flex justify-center gap-1.5 mt-8">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={index}
                      onClick={() => { setSlideDirection(index > currentSlide ? 1 : -1); setCurrentSlide(index); }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 ${index === currentSlide ? "bg-primary/60" : "bg-muted-foreground/15"}`}
                      aria-label={`Go to testimonial from ${testimonial.site_name}`}
                      aria-current={index === currentSlide ? "true" : "false"}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
