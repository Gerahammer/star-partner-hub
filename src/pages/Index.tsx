import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { TrustBadges } from "@/components/TrustBadges";
import { WhyUsMarquee } from "@/components/WhyUsMarquee";
import { BrandsSection } from "@/components/BrandsSection";
import { DealsSection } from "@/components/DealsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ScrollingStars } from "@/components/ScrollingStars";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollingStars />
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <StatsSection />
        <AboutSection />
        <TrustBadges />
        <BrandsSection />
        <WhyUsMarquee />
        <DealsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
