import calabazas from "@/assets/paintings/calabazas-acuarela.jpg";
import limones from "@/assets/paintings/limones-acuarela.jpg";
import lunaLlena from "@/assets/paintings/luna-llena-acrilico.jpg";
import maryPoppins from "@/assets/paintings/mary-poppins-acrilico.jpg";
import negativo from "@/assets/paintings/negativo-acrilico.jpg";
import paisajePueblo from "@/assets/paintings/paisaje-pueblo-acuarela.jpg";
import picassoMadre from "@/assets/paintings/picasso-madre-hijo-pastel.jpg";
import recogiendoFlores from "@/assets/paintings/recogiendo-flores-acrilico.jpg";
import respiracion from "@/assets/paintings/respiracion-pastel.jpg";

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
    title: "Calabazas",
    technique: "acuarela",
    description: "Bodegón de calabazas con tonos cálidos otoñales",
    image: calabazas,
    status: "disponible",
    comment: "Acuarela sobre papel",
  },
  {
    id: "2",
    title: "Limones de Verano",
    technique: "acuarela",
    description: "Limones frescos colgando de la rama con hojas verdes",
    image: limones,
    status: "disponible",
    comment: "Acuarela sobre papel",
  },
  {
    id: "3",
    title: "Luna Llena",
    technique: "acrílico",
    description: "Velero navegando bajo la luna llena en negativo",
    image: lunaLlena,
    status: "disponible",
    comment: "Acrílico sobre lienzo, técnica en negativo",
  },
  {
    id: "4",
    title: "Mary Poppins",
    technique: "acrílico",
    description: "Mary Poppins volando sobre los tejados de la ciudad",
    image: maryPoppins,
    status: "disponible",
    comment: "Acrílico sobre lienzo",
  },
  {
    id: "5",
    title: "Perfil en Negativo",
    technique: "acrílico",
    description: "Retrato femenino en blanco y negro con técnica en negativo",
    image: negativo,
    status: "disponible",
    comment: "Acrílico sobre lienzo",
  },
  {
    id: "6",
    title: "Paisaje del Pueblo",
    technique: "acuarela",
    description: "Pueblo pintoresco junto al río con montañas al fondo",
    image: paisajePueblo,
    status: "disponible",
    comment: "Acuarela sobre papel",
  },
  {
    id: "7",
    title: "Madre e Hijo (Picasso 1901)",
    technique: "pastel",
    description: "Reproducción de la obra de Picasso, período azul",
    image: picassoMadre,
    status: "reservado",
    comment: "Pastel sobre tabla",
  },
  {
    id: "8",
    title: "Recogiendo Flores",
    technique: "acrílico",
    description: "Campesinas recogiendo flores en campos de colores vibrantes",
    image: recogiendoFlores,
    status: "disponible",
    comment: "Acrílico sobre lienzo",
  },
  {
    id: "9",
    title: "Respiración",
    technique: "pastel",
    description: "Figura solitaria con paraguas en la orilla del mar",
    image: respiracion,
    status: "disponible",
    comment: "Pastel en blanco y negro",
  },
];

export const statusLabels: Record<PaintingStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  "no-disponible": "No disponible",
};
