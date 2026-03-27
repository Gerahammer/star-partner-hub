import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { StatsSection } from "@/components/StatsSection";
import { DashboardMockup } from "@/components/DashboardMockup";
import { AboutSection } from "@/components/AboutSection";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustBadges } from "@/components/TrustBadges";
import { BrandsSection } from "@/components/BrandsSection";
import { DealsSection } from "@/components/DealsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <StatsSection />
        <DashboardMockup />
        <AboutSection />
        <BenefitsGrid />
        <TrustBadges />
        <BrandsSection />
        <DealsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
