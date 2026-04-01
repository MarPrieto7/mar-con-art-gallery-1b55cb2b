import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-cherry-blossoms.jpg";

const SakuraPetal = ({ delay, left, duration }: { delay: number; left: number; duration: number }) => (
  <div
    className="sakura-petal absolute text-sakura opacity-0"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      fontSize: `${10 + Math.random() * 14}px`,
    }}
  >
    🌸
  </div>
);

const HeroSection = () => {
  const [petals, setPetals] = useState<{ id: number; delay: number; left: number; duration: number }[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 6,
    }));
    setPetals(p);
  }, []);

  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <div
        className="parallax-hero absolute inset-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/20" />
      
      {/* Falling petals */}
      <div className="absolute inset-0 pointer-events-none">
        {petals.map((p) => (
          <SakuraPetal key={p.id} delay={p.delay} left={p.left} duration={p.duration} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-background drop-shadow-lg animate-fade-up">
          Mar con Art
        </h1>
        <p className="mt-4 font-body text-lg md:text-xl text-background/90 max-w-xl drop-shadow-md animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Arte que transmite serenidad y emoción
        </p>
        <a
          href="#galeria"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#galeria")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-8 px-8 py-3 rounded-full bg-primary/90 text-primary-foreground font-body font-medium hover:bg-primary transition-colors animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          Ver Galería
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
