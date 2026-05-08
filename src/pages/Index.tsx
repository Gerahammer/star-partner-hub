import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { TrustBadges } from "@/components/TrustBadges";
import { WhyUsSection } from "@/components/WhyUsSection";
import { DashboardMockup } from "@/components/DashboardMockup";
import { BrandsSection } from "@/components/BrandsSection";
import { DealsSection } from "@/components/DealsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { BackgroundFX } from "@/components/BackgroundFX";

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise-bg relative">
      <BackgroundFX />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <Marquee />
        <TrustBadges />
        <WhyUsSection />
        <DashboardMockup />
        <BrandsSection />
        <DealsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
