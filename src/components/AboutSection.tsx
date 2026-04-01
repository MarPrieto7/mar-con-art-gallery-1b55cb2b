import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
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
    <section id="sobre-mi" className="py-20 px-4 bg-sakura-light/30">
      <div
        ref={ref}
        className={`container mx-auto max-w-3xl text-center scroll-fade-in ${visible ? "visible" : ""}`}
      >
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">Sobre Mí</h2>
        <div className="space-y-5 text-muted-foreground font-body leading-relaxed text-base md:text-lg">
          <p>
            Soy una artista apasionada por capturar la serenidad y delicadeza del arte de la vida.
            Trabajo con acrílico, acuarela y pastel, buscando siempre transmitir emociones a través
            de colores suaves y composiciones armoniosas.
          </p>
          <p>
            Cada cuadro es una ventana a un momento de calma, inspirado en los momentos que la vida
            misma y la naturaleza me ofrece o me presenta. Observarás que algunas de las obras tiene
            una estética japonesa y coreana — desde los cerezos en flor hasta los jardines zen y los
            paisajes montañosos... son imágenes que me transportan al silencio y la serenidad.
          </p>
          <p>
            Además, soy terapeuta en <strong className="text-foreground">Terapia con el Arte</strong> y{" "}
            <strong className="text-foreground">acompañante en procesos de duelo y pérdida</strong>,
            ayudando a las personas a encontrar sanación y expresión a través de la creación artística.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
