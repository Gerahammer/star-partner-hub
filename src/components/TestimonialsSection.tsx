import { useState, useEffect, useRef, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, ExternalLink, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { supabase } from "@/integrations/supabase/client";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ site_name: "", content: "", site_url: "", logo_url: "" });
  const { toast } = useToast();

  const itemsToShow = isMobile ? 1 : 3;
  const showCarousel = testimonials.length > itemsToShow;

  useEffect(() => { fetchTestimonials(); checkAdminStatus(); }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (!error) setTestimonials(data || []);
  };

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setIsAdmin(false); return; }
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data && !error);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
    const { error: uploadError } = await supabase.storage.from('testimonial-logos').upload(fileName, file);
    if (uploadError) { toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" }); setUploadingLogo(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('testimonial-logos').getPublicUrl(fileName);
    setFormData({ ...formData, logo_url: publicUrl });
    setUploadingLogo(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { site_name: formData.site_name, content: formData.content, site_url: formData.site_url || null, logo_url: formData.logo_url || null };
    let error;
    if (editingId) { const { error: e } = await supabase.from("testimonials").update(payload).eq("id", editingId); error = e; }
    else { const { error: e } = await supabase.from("testimonials").insert(payload); error = e; }
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: editingId ? "Updated" : "Added" });
    resetForm(); fetchTestimonials();
  };

  const handleEdit = (t: Testimonial) => {
    setFormData({ site_name: t.site_name, content: t.content, site_url: t.site_url || "", logo_url: t.logo_url || "" });
    setEditingId(t.id); setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    fetchTestimonials();
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
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-liquid-silver">What Our </span>
            <span className="text-gradient-gold">Partners</span>
            <span className="text-liquid-silver"> Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from successful affiliates who have grown their business with us
          </p>
        </motion.div>

        {isAdmin && (
          <div className="flex justify-end mb-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-gold-gradient rounded-full" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                  <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border/50">
                <DialogHeader><DialogTitle>{editingId ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Site Name" value={formData.site_name} onChange={(e) => setFormData({ ...formData, site_name: e.target.value })} required />
                  <Textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required rows={4} />
                  <Input placeholder="Site URL" value={formData.site_url} onChange={(e) => setFormData({ ...formData, site_url: e.target.value })} />
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Logo</label>
                    <div className="flex gap-2 items-center">
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploadingLogo} className="flex-1">
                        <Upload className="w-4 h-4 mr-2" />{uploadingLogo ? "Uploading..." : "Upload Logo"}
                      </Button>
                      {formData.logo_url && <img src={formData.logo_url} alt="Logo" className="w-10 h-10 object-contain rounded border border-border" />}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                    <Button type="submit" className="btn-gold-gradient">{editingId ? "Update" : "Add"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {testimonials.length === 0 ? (
          <div className="text-center py-16"><p className="text-muted-foreground text-lg">No testimonials yet.</p></div>
        ) : (
          <div className="relative">
            {showCarousel && (
              <Button variant="outline" size="icon" className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background/80 border-border/50" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            <div className={`flex gap-6 px-8 md:px-0 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}
              onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="popLayout" initial={false}>
                {getVisibleTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${currentSlide}-${index}`}
                    initial={{ opacity: 0, x: slideDirection * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideDirection * 50 }}
                    transition={{ duration: 0.3 }}
                    className={isMobile ? 'w-full' : 'flex-1 max-w-[340px]'}
                  >
                    <div className="glass-card rounded-2xl p-6 h-full flex flex-col min-h-[240px]">
                      {isAdmin && (
                        <div className="flex justify-end gap-2 mb-3">
                          <button onClick={() => handleEdit(testimonial)} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </button>
                          <button onClick={() => handleDelete(testimonial.id)} className="p-1.5 rounded-full hover:bg-destructive/10 transition-colors">
                            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        {testimonial.logo_url ? (
                          <img src={testimonial.logo_url} alt={`${testimonial.site_name} logo`} className="w-10 h-10 object-contain rounded-lg border border-border/50 bg-muted/50 p-1" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg border border-primary/20 bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold">{testimonial.site_name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground text-sm">{testimonial.site_name}</p>
                          {testimonial.site_url && (
                            <a href={testimonial.site_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                              Visit <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-foreground/80 leading-relaxed line-clamp-4 text-sm flex-1">"{testimonial.content}"</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {showCarousel && (
              <>
                <Button variant="outline" size="icon" className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background/80 border-border/50" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button key={index} onClick={() => { setSlideDirection(index > currentSlide ? 1 : -1); setCurrentSlide(index); }}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-muted-foreground/30"}`}
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
