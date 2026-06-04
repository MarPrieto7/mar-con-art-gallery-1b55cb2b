import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TherapySection from "@/components/TherapySection";
import TherapyGallery from "@/components/TherapyGallery";
import therapyHero from "@/assets/therapy-hero.jpg";

const Terapias = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
  <div className="cursor-paintbrush min-h-screen">
    <Header />
    <div className="pt-20">
      {/* Hero with image */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={therapyHero}
          alt="Talleres y Terapias - Kintsugi y meditación"
          className="w-full h-full object-cover"
          width={1920}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3 drop-shadow-sm">
              Talleres y Terapias
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto leading-relaxed">
              El arte como camino de sanación, autoconocimiento y expresión emocional
            </p>
          </div>
        </div>
      </section>

      <TherapySection />
      <TherapyGallery />
    </div>
    <Footer />
  </div>
);

export default Terapias;
