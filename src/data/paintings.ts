import painting1 from "@/assets/paintings/painting1.jpg";
import painting2 from "@/assets/paintings/painting2.jpg";
import painting3 from "@/assets/paintings/painting3.jpg";
import painting4 from "@/assets/paintings/painting4.jpg";
import painting5 from "@/assets/paintings/painting5.jpg";

export type PaintingStatus = "disponible" | "reservado" | "no-disponible";
export type Technique = "acrílico" | "acuarela" | "pastel";

export interface Painting {
  id: string;
  title: string;
  technique: Technique;
  description: string;
  image: string;
  status: PaintingStatus;
  comment?: string;
}

export const paintings: Painting[] = [
  {
    id: "1",
    title: "Jardín de Koi",
    technique: "acrílico",
    description: "Jardín zen japonés con estanque de peces koi y cerezos en flor",
    image: painting1,
    status: "disponible",
    comment: "Acrílico sobre lienzo, 60x80cm",
  },
  {
    id: "2",
    title: "Amanecer en las Montañas",
    technique: "pastel",
    description: "Paisaje montañoso coreano al amanecer con ramas de cerezo",
    image: painting2,
    status: "reservado",
    comment: "Pastel sobre tabla, 50x70cm",
  },
  {
    id: "3",
    title: "Grullas al Atardecer",
    technique: "acuarela",
    description: "Grullas japonesas volando sobre un lago al atardecer",
    image: painting3,
    status: "disponible",
    comment: "Acuarela sobre papel, 40x50cm",
  },
  {
    id: "4",
    title: "Sendero de Bambú",
    technique: "acrílico",
    description: "Camino sereno a través de un bosque de bambú iluminado",
    image: painting4,
    status: "no-disponible",
    comment: "Acrílico sobre lienzo, 70x90cm",
  },
  {
    id: "5",
    title: "Glicinas del Puente",
    technique: "pastel",
    description: "Cascada de glicinas sobre un puente de piedra ancestral",
    image: painting5,
    status: "disponible",
    comment: "Pastel, 45x60cm",
  },
];

export const statusLabels: Record<PaintingStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  "no-disponible": "No disponible",
};
