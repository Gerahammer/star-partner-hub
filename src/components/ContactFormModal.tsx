import { useRef, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ContactFormModal = ({
  isOpen,
  onClose,
}: ContactFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgressRef = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    telegram: "",
    teams: "",
    message: "",
  });
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionInProgressRef.current || isSubmitting) return;
    submissionInProgressRef.current = true;
    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        telegram: "",
        teams: "",
        message: "",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      submissionInProgressRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="contact-dialog sm:max-w-xl">
        <DialogHeader className="text-left">
          <span className="eyebrow mb-3">Start a conversation</span>
          <DialogTitle>Let's talk partnership.</DialogTitle>
          <DialogDescription>
            Tell us a little about your business and what you have in mind.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Your name *</Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email address *</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-company">Company</Label>
              <Input
                id="contact-company"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company or website"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-telegram">Telegram</Label>
              <Input
                id="contact-telegram"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="@username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">What do you have in mind? *</Label>
            <Textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your traffic, your markets, your goals…"
            />
          </div>
          <button
            type="submit"
            className="button w-full disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <ArrowUpRight size={18} />
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
