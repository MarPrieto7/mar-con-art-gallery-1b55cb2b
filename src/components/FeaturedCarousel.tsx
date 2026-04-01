import { useState, useEffect, useCallback } from "react";
import { paintings } from "@/data/paintings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedCarousel = () => {
  const [current, setCurrent] = useState(0);
  const featured = paintings;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + featured.length) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-16 px-4 bg-sakura-light/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-display text-2xl md:text-3xl text-center text-foreground mb-2">
          Obras Destacadas
        </h2>
        <p className="text-center text-muted-foreground font-body mb-10 text-sm">
          Una selección de mis trabajos más especiales
        </p>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden rounded-xl relative aspect-[16/9] md:aspect-[21/9] bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={featured[current].image}
                  alt={featured[current].title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl text-background drop-shadow-md">
                    {featured[current].title}
                  </h3>
                  <p className="font-body text-sm text-background/80 mt-1 capitalize">
                    {featured[current].technique}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-md"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-md"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
