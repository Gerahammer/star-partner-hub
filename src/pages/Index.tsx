import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { BrandsSection } from "@/components/BrandsSection";
import { DealsSection } from "@/components/DealsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <BrandsSection />
        <WhyUsSection />
        <DealsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
