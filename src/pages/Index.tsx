import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { DashboardMockup } from "@/components/DashboardMockup";
import { DealsSection } from "@/components/DealsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const frame = requestAnimationFrame(() =>
        document
          .getElementById(window.location.hash.slice(1))
          ?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(frame);
    }
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <div className="editorial-site">
        <Header />
        <main id="main-content">
          <HeroSection />
          <WhyUsSection />
          <DealsSection />
          <DashboardMockup />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};
export default Index;
