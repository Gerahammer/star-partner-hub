import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Plus, Trash2, Edit2, X, Check } from "lucide-react";
import { GlowCard } from "./GlowCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  content: string;
  avatar_url: string | null;
  rating: number;
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    avatar_url: "",
    rating: 5,
  });
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      role: formData.role,
      company: formData.company || null,
      content: formData.content,
      avatar_url: formData.avatar_url || null,
      rating: formData.rating,
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
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || "",
      content: testimonial.content,
      avatar_url: testimonial.avatar_url || "",
      rating: testimonial.rating,
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
      name: "",
      role: "",
      company: "",
      content: "",
      avatar_url: "",
      rating: 5,
    });
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Partners</span> Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Role (e.g., Affiliate Manager)"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
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
                      placeholder="Avatar URL (optional)"
                      value={formData.avatar_url}
                      onChange={(e) =>
                        setFormData({ ...formData, avatar_url: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, rating: star })
                          }
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlowCard className="p-6 h-full flex flex-col min-h-[320px]">
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

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content - fixed height with overflow */}
                  <div className="flex-1 mb-6">
                    <p className="text-foreground/90 leading-relaxed line-clamp-5">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Author info - always at bottom */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={testimonial.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
