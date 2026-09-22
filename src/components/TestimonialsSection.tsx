import { Reveal } from "./Reveal";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { Plus, Trash2, Edit2, ChevronLeft, ChevronRight, Upload, ExternalLink } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submissionInProgressRef = useRef(false);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ site_name: "", content: "", site_url: "", logo_url: "" });
  const { toast } = useToast();

  // Sliding-track carousel geometry
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const x = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const GAP = 20; // matches gap-5

  const itemsToShow = isMobile ? 1 : 3;
  const maxSlide = Math.max(0, testimonials.length - itemsToShow);
  const showCarousel = testimonials.length > itemsToShow;
  const cardWidth = viewportWidth > 0 ? (viewportWidth - GAP * (itemsToShow - 1)) / itemsToShow : 0;
  const step = cardWidth + GAP;

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

  // Measure the viewport so the track knows how wide each card should be.
  // useLayoutEffect measures before paint to avoid a width flash.
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isLoading, testimonials.length]);

  // Glide the track to the active slide with a spring for a flowing feel.
  useEffect(() => {
    const target = showCarousel ? -currentSlide * step : 0;
    const controls = animate(x, target, prefersReducedMotion
      ? { duration: 0 }
      : { type: "spring", stiffness: 260, damping: 34, mass: 0.9 });
    return controls.stop;
  }, [currentSlide, step, showCarousel, prefersReducedMotion, x]);

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

  const goToSlide = (index: number) => setCurrentSlide(Math.max(0, Math.min(maxSlide, index)));
  const nextSlide = () => setCurrentSlide((p) => (p >= maxSlide ? 0 : p + 1));
  const prevSlide = () => setCurrentSlide((p) => (p <= 0 ? maxSlide : p - 1));

  // Snap to the nearest slide after a drag, honouring flick velocity.
  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (!step) return;
    let moved = Math.round(-info.offset.x / step);
    if (moved === 0) {
      if (info.velocity.x < -400) moved = 1;
      else if (info.velocity.x > 400) moved = -1;
    }
    goToSlide(currentSlide + moved);
  };

  return (
    <section className="testimonials-section section-space">
      <div className="shell">
        <Reveal className="section-heading"><span className="eyebrow">04 / In good company</span><h2>Word gets around.</h2><p>Meet the people building their next chapter with us.</p></Reveal>
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
          <div className="text-center py-16"><p className="text-muted-foreground text-sm">Loading testimonials...</p></div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16"><p className="text-muted-foreground text-sm">No testimonials yet.</p></div>
        ) : (
          <div className={`relative ${showCarousel ? "mb-16" : ""}`}>
            {showCarousel && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 -bottom-16 z-10 rounded-none h-11 w-11 border-border hover:bg-muted transition-colors"
                style={{ background: '#f5f2eb' }}
                onClick={prevSlide}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </Button>
            )}

            <div ref={viewportRef} className="overflow-hidden">
              <motion.div
                className="flex gap-5"
                style={{
                  x,
                  cursor: showCarousel ? 'grab' : 'default',
                  justifyContent: showCarousel ? 'flex-start' : 'center',
                }}
                drag={showCarousel ? 'x' : false}
                dragConstraints={{ left: -(maxSlide * step), right: 0 }}
                dragElastic={0.12}
                dragDirectionLock
                onDragEnd={handleDragEnd}
                whileTap={showCarousel ? { cursor: 'grabbing' } : undefined}
              >
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    aria-hidden={i < currentSlide || i >= currentSlide + itemsToShow}
                    {...(i < currentSlide || i >= currentSlide + itemsToShow ? { inert: "" } : {})}
                    className="flex-shrink-0"
                    style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: Math.min(i, itemsToShow - 1) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="testimonial-card relative h-full flex flex-col min-h-[320px] group select-none"
                      style={{
                        background: 'transparent',
                        border: '1px solid #d7d2c6',
                      }}
                    >
                      {/* Admin buttons - absolute top-right */}
                      {adminPassword && (
                        <div className="absolute top-3 right-3 flex gap-1 z-10">
                          <motion.button
                            onClick={() => handleEdit(testimonial)}
                            className="p-1.5 rounded-md hover:bg-primary/10 transition-all focus-visible:ring-2 focus-visible:ring-ring/50"
                            whileHover={{ scale: 1.1 }}
                            aria-label={`Edit testimonial from ${testimonial.site_name}`}
                          >
                            <Edit2 className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-primary" strokeWidth={1.5} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(testimonial.id)}
                            className="p-1.5 rounded-md hover:bg-destructive/10 transition-all focus-visible:ring-2 focus-visible:ring-ring/50"
                            whileHover={{ scale: 1.1 }}
                            aria-label={`Delete testimonial from ${testimonial.site_name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-destructive" strokeWidth={1.5} />
                          </motion.button>
                        </div>
                      )}

                      {/* Top: site name centered, bigger and bold */}
                      <div className="px-7 pt-7 pb-4">
                        <h3
                          className="testimonial-name text-base font-semibold leading-tight"

                        >
                          {testimonial.site_name}
                        </h3>
                      </div>

                      {/* Center: content */}
                      <div className="flex-1 px-7 pb-8 flex items-center">
                        <p className="testimonial-quote text-foreground leading-relaxed w-full">
                          {testimonial.content}
                        </p>
                      </div>

                      {/* Footer: visit site (left) + logo (right) */}
                      <div className="testimonial-footer px-5 py-4 border-t border-primary/15 flex items-center justify-between gap-3">
                        {testimonial.site_url ? (
                          <a
                            href={testimonial.site_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold hover:underline transition-colors min-w-0"
                            aria-label={`Visit ${testimonial.site_name}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                            <span className="truncate">
                              Visit {(() => {
                                try {
                                  return new URL(testimonial.site_url).hostname.replace(/^www\./, '');
                                } catch {
                                  return 'site';
                                }
                              })()}
                            </span>
                          </a>
                        ) : (
                          <span className="text-xs font-medium text-white/60">No link</span>
                        )}

                        {testimonial.logo_url ? (
                          <img
                            src={testimonial.logo_url}
                            alt={`${testimonial.site_name} logo`}
                            loading="lazy"
                            className="h-9 w-auto max-w-[100px] object-contain flex-shrink-0"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-md border border-white/20 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-sm">
                              {testimonial.site_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {showCarousel && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 -bottom-16 z-10 rounded-none h-11 w-11 border-border hover:bg-muted transition-colors"
                  style={{ background: '#f5f2eb' }}
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                </Button>
                <p className="absolute inset-x-14 -bottom-16 h-11 flex items-center justify-center text-xs text-muted-foreground" role="status" aria-live="polite">{String(currentSlide + 1).padStart(2,"0")}–{String(Math.min(currentSlide + itemsToShow, testimonials.length)).padStart(2,"0")} <span className="mx-3">/</span> {testimonials.length} partners</p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
