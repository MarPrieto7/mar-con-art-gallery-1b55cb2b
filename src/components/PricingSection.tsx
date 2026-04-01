import { useEffect, useRef, useState } from "react";

const pricingData = [
  {
    technique: "Acrílico",
    description: "Colores vibrantes y textura rica sobre lienzo o tabla",
    sizes: [
      { size: "30×40 cm", price: "150 – 250 €" },
      { size: "50×70 cm", price: "300 – 500 €" },
      { size: "60×80 cm", price: "450 – 700 €" },
      { size: "70×90 cm", price: "600 – 900 €" },
    ],
  },
  {
    technique: "Acuarela",
    description: "Delicadeza y transparencia sobre papel de algodón",
    sizes: [
      { size: "24×32 cm", price: "80 – 150 €" },
      { size: "30×40 cm", price: "120 – 220 €" },
      { size: "40×50 cm", price: "200 – 350 €" },
      { size: "50×70 cm", price: "300 – 500 €" },
    ],
  },
  {
    technique: "Pastel",
    description: "Suavidad y luminosidad en cada trazo sobre papel o tabla",
    sizes: [
      { size: "24×32 cm", price: "90 – 160 €" },
      { size: "30×40 cm", price: "130 – 230 €" },
      { size: "45×60 cm", price: "250 – 400 €" },
      { size: "50×70 cm", price: "350 – 550 €" },
    ],
  },
];

const PricingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="precios" className="py-20 px-4 bg-sage-light/30">
      <div ref={ref} className={`container mx-auto max-w-5xl scroll-fade-in ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">Precios Orientativos</h2>
        <p className="text-center text-muted-foreground font-body mb-12">
          Los precios varían según la complejidad y el tamaño de la obra
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingData.map((item) => (
            <div
              key={item.technique}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <h3 className="font-display text-xl font-medium text-foreground mb-2">{item.technique}</h3>
              <p className="text-sm text-muted-foreground font-body mb-5">{item.description}</p>
              <div className="space-y-3">
                {item.sizes.map((s) => (
                  <div key={s.size} className="flex justify-between items-center font-body text-sm">
                    <span className="text-muted-foreground">{s.size}</span>
                    <span className="font-semibold text-foreground">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground font-body mt-8">
          * Precios orientativos. Para obras personalizadas o por encargo, contacta conmigo.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
