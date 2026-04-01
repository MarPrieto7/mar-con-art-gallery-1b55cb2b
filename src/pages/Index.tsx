import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import TherapySection from "@/components/TherapySection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="cursor-paintbrush min-h-screen">
    <Header />
    <HeroSection />
    <GallerySection />
    <AboutSection />
    <TherapySection />
    <PricingSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
