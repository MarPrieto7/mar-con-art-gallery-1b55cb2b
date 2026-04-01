import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import TherapySection from "@/components/TherapySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="cursor-paintbrush min-h-screen">
    <Header />
    <HeroSection />
    <FeaturedCarousel />
    <GallerySection />
    <AboutSection />
    <TherapySection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
