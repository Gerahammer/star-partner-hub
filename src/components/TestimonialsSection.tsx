import { useState, useEffect, useRef, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, ExternalLink, ChevronLeft, ChevronRight, Upload } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState<string | null>(() => sessionStorage.getItem('adminPassword'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const submissionInProgressRef = useRef(false);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ site_name: "", content: "", site_url: "", logo_url: "" });
  const { toast } = useToast();

  const itemsToShow = isMobile ? 1 : 3;
  const maxSlide = Math.max(0, testimonials.length - itemsToShow);
  const showCarousel = testimonials.length > itemsToShow;
  const totalPages = showCarousel ? maxSlide + 1 : 1;

  useEffect(() => {
    fetchTestimonials();
    const handlePasswordChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setAdminPassword(customEvent.detail.password);
    };
    window.addEventListener('adminPasswordChanged', handlePasswordChange);
    return () => window.removeEventListener('adminPasswordChanged', handlePasswordChange);
  }, []);

  // Clamp currentSlide if testimonials change (e.g., after delete)
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [maxSlide, currentSlide]);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/testimonials`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({ title: "Error", description: "Failed to load testimonials", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
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
    if (!adminPassword || isSubmitting || submissionInProgressRef.current) {
      return;
    }

    submissionInProgressRef.current = true;
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
      submissionInProgressRef.current = false;
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

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((p) => (p >= maxSlide ? 0 : p + 1));
  };
  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((p) => (p <= 0 ? maxSlide : p - 1));
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    return testimonials.slice(currentSlide, currentSlide + itemsToShow);
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
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-5 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="text-foreground">What Partners </span>
            <span style={{ background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Say
            </span>
          </h2>
        </motion.div>

        {adminPassword && (
          <div className="flex justify-end mb-8">
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
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-16"><p className="text-muted-foreground/50 text-sm">Loading testimonials...</p></div>
        ) : testimonials.length === 0 ? (
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
                {getVisibleTestimonials().map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: slideDirection * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideDirection * 50 }}
                    transition={{ duration: 0.3 }}
                    className={isMobile ? 'w-full' : 'flex-1 max-w-[320px]'}
                  >
                    <motion.div
                      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)' }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-xl h-full flex flex-col min-h-[280px] border border-primary/20 backdrop-blur-sm overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, hsl(224 28% 12%) 0%, hsl(224 28% 10%) 100%)',
                        boxShadow: '0 4px 6px rgba(212, 175, 55, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {/* Decorative gradient accent */}
                      <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Header: logo top-left, admin buttons top-right */}
                      <div className="relative z-10 flex items-start justify-between p-4 pb-0">
                        {testimonial.logo_url ? (
                          <img src={testimonial.logo_url} alt={`${testimonial.site_name} logo`} loading="lazy" className="w-12 h-12 object-contain rounded-lg border border-primary/20 p-1.5 flex-shrink-0" style={{ background: 'hsl(224 28% 15%)' }} />
                        ) : (
                          <div className="w-12 h-12 rounded-lg border border-primary/20 flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(224 28% 15%)' }}>
                            <span className="text-primary/60 font-medium text-base">{testimonial.site_name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}

                        {adminPassword && (
                          <div className="flex gap-1.5">
                            <motion.button
                              onClick={() => handleEdit(testimonial)}
                              className="p-2 rounded-lg hover:bg-primary/10 transition-all focus-visible:ring-2 focus-visible:ring-ring/50"
                              whileHover={{ scale: 1.1 }}
                              aria-label={`Edit testimonial from ${testimonial.site_name}`}
                            >
                              <Edit2 className="w-4 h-4 text-muted-foreground/60 hover:text-primary" strokeWidth={1.5} />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDelete(testimonial.id)}
                              className="p-2 rounded-lg hover:bg-destructive/10 transition-all focus-visible:ring-2 focus-visible:ring-ring/50"
                              whileHover={{ scale: 1.1 }}
                              aria-label={`Delete testimonial from ${testimonial.site_name}`}
                            >
                              <Trash2 className="w-4 h-4 text-muted-foreground/60 hover:text-destructive" strokeWidth={1.5} />
                            </motion.button>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
                        {/* Quote text */}
                        <p className="text-muted-foreground/70 leading-relaxed text-sm flex-1 italic mb-6">"{testimonial.content}"</p>

                        {/* Author info - centered */}
                        <div className="flex items-center justify-center pt-4 border-t border-border/20">
                          {testimonial.site_url ? (
                            <a
                              href={testimonial.site_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-foreground text-sm hover:text-primary transition-colors inline-flex items-center gap-1.5"
                              aria-label={`Visit ${testimonial.site_name}`}
                            >
                              {testimonial.site_name}
                              <ExternalLink className="w-3.5 h-3.5 text-primary/70" strokeWidth={2} />
                            </a>
                          ) : (
                            <p className="font-semibold text-foreground text-sm">{testimonial.site_name}</p>
                          )}
                        </div>
                      </div>
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
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => { setSlideDirection(index > currentSlide ? 1 : -1); setCurrentSlide(index); }}
                      className={`h-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-ring/50 ${index === currentSlide ? "bg-primary/60 w-4" : "bg-muted-foreground/15 w-1.5"}`}
                      aria-label={`Go to page ${index + 1}`}
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
