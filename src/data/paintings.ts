import calabazas from "@/assets/paintings/calabazas-acuarela.jpg";
import limones from "@/assets/paintings/limones-acuarela.jpg";
import lunaLlena from "@/assets/paintings/luna-llena-acrilico.jpg";
import maryPoppins from "@/assets/paintings/mary-poppins-acrilico.jpg";
import negativo from "@/assets/paintings/negativo-acrilico.jpg";
import paisajePueblo from "@/assets/paintings/paisaje-pueblo-acuarela.jpg";
import picassoMadre from "@/assets/paintings/picasso-madre-hijo-pastel.jpg";
import recogiendoFlores from "@/assets/paintings/recogiendo-flores-acrilico.jpg";
import respiracion from "@/assets/paintings/respiracion-pastel.jpg";
import zen from "@/assets/paintings/zen-acrilico.jpg";
import perfilMujer from "@/assets/paintings/perfil-mujer-acrilico.jpg";
import libelula from "@/assets/paintings/libelula-acrilico.jpg";
import sandia from "@/assets/paintings/sandia-acuarela.jpg";
import mindfulness from "@/assets/paintings/mindfulness-acrilico.jpg";
import nieblaMontanas from "@/assets/paintings/niebla-montanas-pastel.jpg";
import orquideas from "@/assets/paintings/orquideas-acuarela.jpg";
import auroraBoreal from "@/assets/paintings/aurora-boreal-pastel.jpg";
import berenjena from "@/assets/paintings/berenjena-acuarela.jpg";
import espigasVerano from "@/assets/paintings/espigas-verano-pastel.jpg";
import marBravo from "@/assets/paintings/mar-bravo-pastel.jpg";
import ladybug from "@/assets/paintings/ladybug-pastel.jpg";
import lagoInvierno from "@/assets/paintings/lago-invierno-pastel.jpg";
import lagoArboles from "@/assets/paintings/lago-arboles-pastel.jpg";

export type PaintingStatus = "disponible" | "reservado" | "no-disponible" | "vendido";
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
    status: "vendido",
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
  {
    id: "10",
    title: "Zen",
    technique: "acrílico",
    description: "Jarrón con ramas de cerezo en flor, estilo zen japonés",
    image: zen,
    status: "disponible",
    comment: "Acrílico sobre lienzo",
  },
  {
    id: "11",
    title: "Perfil de Mujer",
    technique: "acrílico",
    description: "Mujer con abanico de encaje y flores en el pelo",
    image: perfilMujer,
    status: "disponible",
    comment: "Acrílico sobre lienzo",
  },
  {
    id: "12",
    title: "Libélula",
    technique: "acrílico",
    description: "Libélula con mandalas y tonos púrpura y rosa",
    image: libelula,
    status: "disponible",
    comment: "Acrílico sobre lienzo con relieves",
  },
  {
    id: "13",
    title: "Sandía",
    technique: "acuarela",
    description: "Trozos de sandía frescos y jugosos",
    image: sandia,
    status: "disponible",
    comment: "Acuarela sobre papel",
  },
  {
    id: "14",
    title: "Mindfulness",
    technique: "acrílico",
    description: "Figura contemplando el atardecer desde un embarcadero",
    image: mindfulness,
    status: "disponible",
    comment: "Acrílico sobre lienzo",
  },
  {
    id: "15",
    title: "Niebla entre Montañas",
    technique: "pastel",
    description: "Paisaje de montañas envueltas en niebla con luna y bambú",
    image: nieblaMontanas,
    status: "disponible",
    comment: "Pastel sobre papel",
  },
  {
    id: "16",
    title: "Orquídeas",
    technique: "acuarela",
    description: "Delicadas orquídeas blancas con detalles botánicos",
    image: orquideas,
    status: "disponible",
    comment: "Acuarela sobre papel",
  },
  {
    id: "17",
    title: "Aurora Boreal",
    technique: "pastel",
    description: "Árbol solitario bajo la aurora boreal entre montañas",
    image: auroraBoreal,
    status: "disponible",
    comment: "Pastel sobre papel",
  },
  {
    id: "18",
    title: "Berenjena",
    technique: "acuarela",
    description: "Berenjena con salpicaduras de color, estilo botánico",
    image: berenjena,
    status: "disponible",
    comment: "Acuarela sobre papel",
  },
  {
    id: "19",
    title: "Espigas de Verano",
    technique: "pastel",
    description: "Espigas de trigo iluminadas por la luna en tonos púrpura",
    image: espigasVerano,
    status: "disponible",
    comment: "Pastel sobre papel",
  },
  {
    id: "20",
    title: "La Mar de Bravo",
    technique: "pastel",
    description: "Faro solitario entre olas bravas y vegetación costera",
    image: marBravo,
    status: "vendido",
    comment: "Pastel sobre papel",
  },
  {
    id: "21",
    title: "Ladybug",
    technique: "pastel",
    description: "Mariquita sobre una espiga en un paisaje difuminado",
    image: ladybug,
    status: "disponible",
    comment: "Pastel sobre papel",
  },
  {
    id: "22",
    title: "Lago en Invierno",
    technique: "pastel",
    description: "Árbol desnudo junto al lago con montañas nevadas al atardecer",
    image: lagoInvierno,
    status: "disponible",
    comment: "Pastel sobre papel",
  },
  {
    id: "23",
    title: "Lago y Árboles",
    technique: "pastel",
    description: "Isla de árboles reflejada en un lago al atardecer",
    image: lagoArboles,
    status: "disponible",
    comment: "Pastel sobre papel",
  },
];

export const statusLabels: Record<PaintingStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  "no-disponible": "No disponible",
  vendido: "Vendido",
};
