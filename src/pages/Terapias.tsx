import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TherapySection from "@/components/TherapySection";
import ContactSection from "@/components/ContactSection";

const Terapias = () => (
  <div className="cursor-paintbrush min-h-screen">
    <Header />
    <div className="pt-20">
      {/* Hero banner for therapy page */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Soft gradient background matching site aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-br from-sakura-light via-background to-sky-light" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 50% 80%, hsl(var(--sage) / 0.2) 0%, transparent 50%)`
        }} />
        {/* Decorative floating circles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent/5 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-sage/5 blur-3xl" />

        <div className="relative container mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Talleres y Terapias
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto leading-relaxed">
            El arte como camino de sanación, autoconocimiento y expresión emocional.
            Un espacio seguro donde transformar el dolor en belleza.
          </p>
        </div>
      </section>

      <TherapySection />
      <ContactSection />
    </div>
    <Footer />
  </div>
);

export default Terapias;
