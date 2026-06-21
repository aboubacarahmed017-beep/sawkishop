/**
 * =============================================
 *  OptiVision – Catalogue des produits
 *  Modifiez ce fichier pour ajouter/modifier
 *  vos produits facilement.
 * =============================================
 *
 *  Structure d'un produit :
 *  {
 *    id: number (unique),
 *    nom: "Nom du produit",
 *    marque: "Marque",
 *    categorie: "soleil" | "vue" | "sport" | "luxe",
 *    prix: number (prix normal en FCFA),
 *    prixPromo: number | null (prix réduit, null si pas de promo),
 *    description: "Description courte",
 *    couleurs: ["noir", "doré", ...],
 *    badge: "Nouveau" | "Bestseller" | "-20%" | null,
 *    image: "url ou chemin vers l'image" (laissez "" pour l'icône par défaut),
 *    vedette: true | false (pour afficher sur la page d'accueil)
 *  }
 */

const products = [
  {
    id: 1,
    nom: "Aviateur Classique",
    marque: "OptiVision",
    categorie: "soleil",
    prix: 35000,
    prixPromo: 28000,
    description: "Le classique intemporel. Monture dorée, verres polarisés, protection UV400.",
    couleurs: ["doré/vert", "doré/marron", "argenté/gris"],
    badge: "-20%",
    image: "",
    vedette: true
  },
  {
    id: 2,
    nom: "Wayfarer Elite",
    marque: "OptiVision",
    categorie: "soleil",
    prix: 42000,
    prixPromo: null,
    description: "Style urbain et élégant. Monture acétate noire, verres gradient.",
    couleurs: ["noir", "écaille", "bleu nuit"],
    badge: "Bestseller",
    image: "",
    vedette: true
  },
  {
    id: 3,
    nom: "Round Vintage",
    marque: "OptiVision",
    categorie: "vue",
    prix: 38000,
    prixPromo: null,
    description: "Monture ronde au style rétro et raffiné. Parfaite pour les visages carrés.",
    couleurs: ["or rose", "doré", "argenté"],
    badge: "Nouveau",
    image: "",
    vedette: true
  },
  {
    id: 4,
    nom: "Sport Pro X",
    marque: "OptiVision",
    categorie: "sport",
    prix: 55000,
    prixPromo: 45000,
    description: "Lunettes de sport haute performance. Légères, résistantes, UV400.",
    couleurs: ["noir/rouge", "bleu/blanc", "noir/jaune"],
    badge: "-18%",
    image: "",
    vedette: false
  },
  {
    id: 5,
    nom: "Cat-Eye Glamour",
    marque: "OptiVision",
    categorie: "luxe",
    prix: 75000,
    prixPromo: null,
    description: "Élégance et féminité. Monture papillon ornée, verres premium.",
    couleurs: ["or/cristal", "noir/doré", "bordeaux"],
    badge: "Luxe",
    image: "",
    vedette: true
  },
  {
    id: 6,
    nom: "Clubmaster Heritage",
    marque: "OptiVision",
    categorie: "vue",
    prix: 48000,
    prixPromo: 38000,
    description: "Style browline américain des années 50. Sophistiqué et moderne.",
    couleurs: ["noir/doré", "écaille/doré", "gunmetal"],
    badge: "-21%",
    image: "",
    vedette: true
  },
  {
    id: 7,
    nom: "Titanium Square",
    marque: "OptiVision",
    categorie: "vue",
    prix: 62000,
    prixPromo: null,
    description: "Monture titane ultra-légère. Résistante et hypoallergénique.",
    couleurs: ["argent", "or", "noir mat"],
    badge: "Premium",
    image: "",
    vedette: false
  },
  {
    id: 8,
    nom: "Octagon Street",
    marque: "OptiVision",
    categorie: "soleil",
    prix: 32000,
    prixPromo: null,
    description: "Forme octagonale tendance. Look streetwear assumé.",
    couleurs: ["or/jaune", "argent/gris", "noir/fumé"],
    badge: "Nouveau",
    image: "",
    vedette: false
  },
  {
    id: 9,
    nom: "Luxury Gold Edition",
    marque: "OptiVision",
    categorie: "luxe",
    prix: 120000,
    prixPromo: null,
    description: "Édition limitée. Monture plaquée or 18K, verres saphir anti-reflet.",
    couleurs: ["or 18K/noir", "or 18K/cristal"],
    badge: "Édition Limitée",
    image: "",
    vedette: true
  },
  {
    id: 10,
    nom: "Trail Runner",
    marque: "OptiVision",
    categorie: "sport",
    prix: 45000,
    prixPromo: 36000,
    description: "Conçue pour le trail et la course. Grip maximal, verres photochromiques.",
    couleurs: ["noir/vert", "gris/orange"],
    badge: "-20%",
    image: "",
    vedette: false
  },
  {
    id: 11,
    nom: "Butterfly Glam",
    marque: "OptiVision",
    categorie: "soleil",
    prix: 58000,
    prixPromo: null,
    description: "Papillon surdimensionné ultra-tendance. Verres gradient miroir.",
    couleurs: ["rose gold", "noir/miroir", "blanc/doré"],
    badge: "Tendance",
    image: "",
    vedette: false
  },
  {
    id: 12,
    nom: "Classic Wayfarer Kids",
    marque: "OptiVision",
    categorie: "vue",
    prix: 22000,
    prixPromo: 18000,
    description: "Pour les plus jeunes. Monture flexible, légère et résistante.",
    couleurs: ["rouge", "bleu", "rose", "vert"],
    badge: "-18%",
    image: "",
    vedette: false
  }
];

// =============================================
// CODES PROMO (modifiables)
// =============================================
const promoCodes = {
  "OPTIVISION10": { type: "percent", value: 10, label: "10% de réduction" },
  "BIENVENUE": { type: "percent", value: 15, label: "15% de réduction" },
  "SOLEIL2025": { type: "fixed", value: 5000, label: "5 000 FCFA de réduction" },
  "VIP20": { type: "percent", value: 20, label: "20% de réduction VIP" }
};
