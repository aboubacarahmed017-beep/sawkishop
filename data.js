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
    marque: "SAWKISHOP",
    categorie: "soleil",
    prix: 15000,
    prixPromo: 12000,
    description: "Le classique intemporel. Monture dorée, verres polarisés, protection UV400.",
    couleurs: ["doré/vert", "doré/marron", "argenté/gris"],
    badge: "-20%",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    vedette: true
  },
  {
    id: 2,
    nom: "Wayfarer Elite",
    marque: "SAWKISHOP",
    categorie: "soleil",
    prix: 18000,
    prixPromo: null,
    description: "Style urbain et élégant. Monture acétate noire, verres gradient.",
    couleurs: ["noir", "écaille", "bleu nuit"],
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
    vedette: true
  },
  {
    id: 3,
    nom: "Round Vintage",
    marque: "SAWKISHOP",
    categorie: "vue",
    prix: 35000,
    prixPromo: null,
    description: "Monture ronde au style rétro et raffiné. Parfaite pour les visages carrés.",
    couleurs: ["or rose", "doré", "argenté"],
    badge: "Nouveau",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80",
    vedette: true
  },
  {
    id: 4,
    nom: "Sport Pro X",
    marque: "SAWKISHOP",
    categorie: "sport",
    prix: 20000,
    prixPromo: 16000,
    description: "Lunettes de sport haute performance. Légères, résistantes, UV400.",
    couleurs: ["noir/rouge", "bleu/blanc", "noir/jaune"],
    badge: "-20%",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80",
    vedette: false
  },
  {
    id: 5,
    nom: "Cat-Eye Glamour",
    marque: "SAWKISHOP",
    categorie: "luxe",
    prix: 25000,
    prixPromo: null,
    description: "Élégance et féminité. Monture papillon ornée, verres premium.",
    couleurs: ["or/cristal", "noir/doré", "bordeaux"],
    badge: "Luxe",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80",
    vedette: true
  },
  {
    id: 6,
    nom: "Clubmaster Heritage",
    marque: "SAWKISHOP",
    categorie: "vue",
    prix: 40000,
    prixPromo: 32000,
    description: "Style browline américain des années 50. Sophistiqué et moderne.",
    couleurs: ["noir/doré", "écaille/doré", "gunmetal"],
    badge: "-20%",
    image: "https://images.unsplash.com/photo-1577744486770-020ab432da65?w=600&q=80",
    vedette: true
  },
  {
    id: 7,
    nom: "Verres Correcteurs Pro",
    marque: "SAWKISHOP",
    categorie: "vue",
    prix: 50000,
    prixPromo: null,
    description: "Verres correcteurs haute précision, anti-reflet et anti-lumière bleue. Monture titane ultra-légère.",
    couleurs: ["argent", "or", "noir mat"],
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1625591342274-39f6ddfe7006?w=600&q=80",
    vedette: false
  },
  {
    id: 8,
    nom: "Octagon Street",
    marque: "SAWKISHOP",
    categorie: "soleil",
    prix: 12000,
    prixPromo: null,
    description: "Forme octagonale tendance. Look streetwear assumé.",
    couleurs: ["or/jaune", "argent/gris", "noir/fumé"],
    badge: "Nouveau",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    vedette: false
  },
  {
    id: 9,
    nom: "Luxury Gold Edition",
    marque: "SAWKISHOP",
    categorie: "luxe",
    prix: 45000,
    prixPromo: null,
    description: "Édition limitée. Monture plaquée or 18K, verres saphir anti-reflet.",
    couleurs: ["or 18K/noir", "or 18K/cristal"],
    badge: "Édition Limitée",
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&q=80",
    vedette: true
  },
  {
    id: 10,
    nom: "Trail Runner",
    marque: "SAWKISHOP",
    categorie: "sport",
    prix: 18000,
    prixPromo: 14000,
    description: "Conçue pour le trail et la course. Grip maximal, verres photochromiques.",
    couleurs: ["noir/vert", "gris/orange"],
    badge: "-22%",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80",
    vedette: false
  },
  {
    id: 11,
    nom: "Butterfly Glam",
    marque: "SAWKISHOP",
    categorie: "soleil",
    prix: 22000,
    prixPromo: null,
    description: "Papillon surdimensionné ultra-tendance. Verres gradient miroir.",
    couleurs: ["rose gold", "noir/miroir", "blanc/doré"],
    badge: "Tendance",
    image: "https://images.unsplash.com/photo-1483118714900-540cf339fd46?w=600&q=80",
    vedette: false
  },
  {
    id: 12,
    nom: "Classic Wayfarer Kids",
    marque: "SAWKISHOP",
    categorie: "vue",
    prix: 10000,
    prixPromo: 8000,
    description: "Pour les plus jeunes. Monture flexible, légère et résistante.",
    couleurs: ["rouge", "bleu", "rose", "vert"],
    badge: "-20%",
    image: "https://images.unsplash.com/photo-1625591342274-39f6ddfe7006?w=600&q=80",
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
