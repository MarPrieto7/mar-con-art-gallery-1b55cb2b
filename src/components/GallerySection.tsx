import { useState, useEffect, useRef } from "react";
import { paintings, statusLabels, type Technique, type Painting } from "@/data/paintings";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const techniqueFilters: { label: string; value: Technique | "todas" }[] = [
  { label: "Todas", value: "todas" },
  { label: "Acrílico", value: "acrílico" },
  { label: "Acuarela", value: "acuarela" },
  { label: "Pastel", value: "pastel" },
];

const statusColors: Record<string, string> = {
  disponible: "bg-sage/30 text-secondary-foreground",
  reservado: "bg-gold/30 text-foreground",
  "no-disponible": "bg-muted text-muted-foreground",
};

const LightboxModal = ({ painting, onClose }: { painting: Painting; onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-w-4xl max-h-[90vh] w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
        <img
          src={painting.image}
          alt={painting.title}
          className="max-h-[80vh] w-auto rounded-lg shadow-2xl object-contain"
        />
        <div className="bg-background rounded-b-lg p-4 mt-0">
          <h3 className="font-display text-lg font-medium text-foreground">{painting.title}</h3>
          <p className="text-sm text-primary font-body capitalize">{painting.technique}</p>
          {painting.comment && <p className="text-xs text-muted-foreground font-body mt-1 italic">{painting.comment}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PaintingCard = ({ painting, onOpen }: { painting: Painting; onOpen: () => void }) => {
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 max-w-sm w-full cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={painting.image}
          alt={painting.title}
          loading="lazy"
          className="w-full h-full object-contain bg-muted/30 group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-body font-semibold ${statusColors[painting.status]}`}>
          {statusLabels[painting.status]}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-medium text-foreground">{painting.title}</h3>
        <p className="text-sm text-primary font-body font-medium mt-1 capitalize">{painting.technique}</p>
        <p className="text-sm text-muted-foreground font-body mt-2">{painting.description}</p>
        {painting.comment && (
          <p className="text-xs text-muted-foreground font-body mt-2 italic">{painting.comment}</p>
        )}
      </div>
    </motion.div>
  );
};

const GallerySection = () => {
  const [filter, setFilter] = useState<Technique | "todas">("todas");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<Painting | null>(null);

  const filtered = filter === "todas" ? paintings : paintings.filter((p) => p.technique === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 2);

  return (
    <>
      <section id="galeria" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">Galería</h2>
          <p className="text-center text-muted-foreground font-body mb-10">
            Explora mis obras organizadas por técnica
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {techniqueFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => { setFilter(f.value); setShowAll(false); }}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-colors ${
                  filter === f.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-sakura-light hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <AnimatePresence>
              {displayed.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} onOpen={() => setLightbox(painting)} />
              ))}
            </AnimatePresence>
          </div>

          {!showAll && filtered.length > 2 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 rounded-full bg-card text-foreground font-body font-medium border border-border hover:bg-sakura-light hover:border-primary transition-colors"
              >
                Ver más cuadros ({filtered.length - 2} más)
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && <LightboxModal painting={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
