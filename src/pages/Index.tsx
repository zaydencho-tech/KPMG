import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HeroStats from "@/components/HeroStats";
import AdvisorySection from "@/components/AdvisorySection";
import AboutSection from "@/components/AboutSection";
import CasesSection from "@/components/CasesSection";
import DealsSection from "@/components/DealsSection";
import ProfessionalsIntro from "@/components/ProfessionalsIntro";
import InsightsSection from "@/components/InsightsSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <HeroStats />
      <AdvisorySection />
      <AboutSection />
      <CasesSection />
      <DealsSection />
      <InsightsSection />
      <ProfessionalsIntro />
      <GlobalNetworkSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
