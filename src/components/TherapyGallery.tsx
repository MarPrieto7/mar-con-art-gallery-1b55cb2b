import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import kintsugi1 from "@/assets/therapy/kintsugi-1.jpg";
import artTherapy from "@/assets/therapy/art-therapy.jpg";
import meditacion from "@/assets/therapy/meditacion.jpg";
import dueloArte from "@/assets/therapy/duelo-arte.jpg";
import dueloLiberacion from "@/assets/therapy/duelo-liberacion.jpg";
import dueloRenacer from "@/assets/therapy/duelo-renacer.jpg";

interface GalleryItem {
  image: string;
  title: string;
  description: string;
}

const items: GalleryItem[] = [
  { image: kintsugi1, title: "Kintsugi — El arte de reparar", description: "La belleza de lo imperfecto: las grietas reparadas con oro nos enseñan que nuestras heridas son parte de nuestra historia" },
  { image: artTherapy, title: "Terapia con el Arte", description: "El proceso creativo como herramienta de autoconocimiento y bienestar emocional" },
  { image: meditacion, title: "Meditación y Mindfulness", description: "Conectar con el momento presente a través de la calma, la contemplación y el acompañamiento en procesos de duelo y pérdida" },
  { image: dueloArte, title: "Expresión Emocional", description: "Transformar el dolor del duelo y la pérdida en belleza a través del color, el arte y la creación artística" },
  { image: dueloLiberacion, title: "Soltar y Dejar Ir", description: "El proceso de liberación emocional en el duelo — honrar lo vivido y encontrar paz a través de la expresión artística" },
  { image: dueloRenacer, title: "Renacer tras la Pérdida", description: "Sembrar nuevos comienzos después del dolor — la esperanza como camino de sanación y transformación interior" },
];

const TherapyGallery = () => {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  return (
    <>
      <section className="py-20 px-4 bg-sakura-light/20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">
            Inspiración y Técnicas
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
            Kintsugi, meditación, duelo y expresión artística — herramientas para la sanación emocional
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer w-full max-w-sm"
                onClick={() => setLightbox(item)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-3xl max-h-[90vh] w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <div className="bg-background rounded-b-lg p-4">
                <h3 className="font-display text-lg font-medium text-foreground">{lightbox.title}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1">{lightbox.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TherapyGallery;
