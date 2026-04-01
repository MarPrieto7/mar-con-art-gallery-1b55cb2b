import { useEffect, useRef, useState } from "react";
import { Heart, Palette } from "lucide-react";

const TherapySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="terapias" className="py-20 px-4 bg-background">
      <div ref={ref} className={`container mx-auto max-w-5xl scroll-fade-in ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">Talleres y Terapias</h2>
        <p className="text-center text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
          El arte como camino de sanación y expresión emocional
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Art Therapy */}
          <div className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-border">
            <div className="w-14 h-14 rounded-full bg-sakura-light flex items-center justify-center mb-5">
              <Palette className="text-primary" size={28} />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-3">Terapia con el Arte</h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Sesiones individuales y grupales donde el proceso creativo se convierte en una
              herramienta de autoconocimiento y bienestar emocional. A través de la pintura,
              exploramos emociones, liberamos tensiones y encontramos nuevas formas de expresión.
            </p>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block mt-5 text-primary font-body font-medium hover:underline"
            >
              Solicitar información →
            </a>
          </div>

          {/* Grief */}
          <div className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-border">
            <div className="w-14 h-14 rounded-full bg-sky-light flex items-center justify-center mb-5">
              <Heart className="text-accent-foreground" size={28} />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-3">
              Acompañamiento en Duelo y Pérdida
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Un espacio seguro y compasivo donde te acompaño en tu proceso de duelo. A través
              del arte y la escucha activa, trabajamos juntos para transitar el dolor,
              honrar los recuerdos y encontrar poco a poco un camino de aceptación y paz interior.
            </p>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block mt-5 text-primary font-body font-medium hover:underline"
            >
              Solicitar información →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapySection;
