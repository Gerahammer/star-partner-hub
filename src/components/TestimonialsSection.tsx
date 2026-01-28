import { useState, useEffect, useRef, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, ExternalLink, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { GlowCard } from "./GlowCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import topoWavesBg from "@/assets/topo-waves-bg.png";

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
  const [formData, setFormData] = useState({
    site_name: "",
    content: "",
    site_url: "",
    logo_url: "",
  });
  const { toast } = useToast();

  // On mobile show 1 item, on desktop show 3
  const itemsToShow = isMobile ? 1 : 3;
  const showCarousel = testimonials.length > itemsToShow;

  useEffect(() => {
    fetchTestimonials();
    checkAdminStatus();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error);
      return;
    }
    setTestimonials(data || []);
  };

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data && !error);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('testimonial-logos')
      .upload(fileName, file);

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      setUploadingLogo(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('testimonial-logos')
      .getPublicUrl(fileName);

    setFormData({ ...formData, logo_url: publicUrl });
    setUploadingLogo(false);
    toast({
      title: "Logo uploaded",
      description: "The logo has been uploaded successfully.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      site_name: formData.site_name,
      content: formData.content,
      site_url: formData.site_url || null,
      logo_url: formData.logo_url || null,
    };

    let error;
    if (editingId) {
      const { error: updateError } = await supabase
        .from("testimonials")
        .update(payload)
        .eq("id", editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("testimonials")
        .insert(payload);
      error = insertError;
    }

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: editingId ? "Testimonial updated" : "Testimonial added",
      description: "The testimonial has been saved successfully.",
    });

    resetForm();
    fetchTestimonials();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      site_name: testimonial.site_name,
      content: testimonial.content,
      site_url: testimonial.site_url || "",
      logo_url: testimonial.logo_url || "",
    });
    setEditingId(testimonial.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Testimonial deleted",
      description: "The testimonial has been removed.",
    });
    fetchTestimonials();
  };

  const resetForm = () => {
    setFormData({
      site_name: "",
      content: "",
      site_url: "",
      logo_url: "",
    });
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials with circular wrapping
  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    const result: Testimonial[] = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentSlide + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  // Touch handlers for swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 bg-transparent relative overflow-hidden">
      {/* Topo waves background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${topoWavesBg})` }}
      />
      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-2">
            What Our <span className="text-primary">Partners</span> Say
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Hear from successful affiliates who have grown their business with us
          </p>
        </motion.div>

        {isAdmin && (
          <div className="flex justify-end mb-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="gold"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border/50">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Site Name"
                      value={formData.site_name}
                      onChange={(e) =>
                        setFormData({ ...formData, site_name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Testimonial content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                      rows={4}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Site URL (e.g., https://example.com)"
                      value={formData.site_url}
                      onChange={(e) =>
                        setFormData({ ...formData, site_url: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Site Logo
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingLogo}
                        className="flex-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingLogo ? "Uploading..." : "Upload Logo"}
                      </Button>
                      {formData.logo_url && (
                        <img
                          src={formData.logo_url}
                          alt="Logo preview"
                          className="w-10 h-10 object-contain rounded border border-border"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="gold">
                      {editingId ? "Update" : "Add"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No testimonials yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="relative">
            {showCarousel && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-2 sm:left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-background/80 backdrop-blur-sm"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            <div 
              className={`grid gap-4 sm:gap-6 md:gap-8 px-8 sm:px-12 md:px-0 ${
              isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="popLayout" initial={false}>
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentSlide}-${index}`}
                  initial={{ opacity: 0, x: slideDirection * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <GlowCard className="p-4 sm:p-5 md:p-6 h-full flex flex-col min-h-[220px] sm:min-h-[260px] md:min-h-[280px] bg-card border-border/50" glowColor="gold">
                    {/* Admin actions */}
                    {isAdmin && (
                      <div className="flex justify-end gap-2 mb-4">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-1.5 rounded-full hover:bg-muted transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    )}

                    {/* Logo */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {testimonial.logo_url ? (
                        <img
                          src={testimonial.logo_url}
                          alt={`${testimonial.site_name} logo`}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg border border-border/50 bg-muted/50 p-1"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-border bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-base sm:text-lg">
                            {testimonial.site_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground text-sm sm:text-base">
                          {testimonial.site_name}
                        </p>
                        {testimonial.site_url && (
                          <a
                            href={testimonial.site_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            Visit site
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-foreground/90 leading-relaxed line-clamp-4 sm:line-clamp-5 text-sm sm:text-base">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>

            {showCarousel && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-2 sm:right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-background/80 backdrop-blur-sm"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {/* Pagination dots */}
            {showCarousel && (
              <div className="flex justify-center gap-2 mt-6 md:mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSlideDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
