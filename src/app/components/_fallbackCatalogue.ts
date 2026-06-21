// Shared fallback catalogue — used by both the collection grid and the
// product preview page when NEXT_PUBLIC_API_URL is not configured.
// Once the real API is wired up, this is bypassed entirely.

export const FALLBACK_CATALOGUE = [
  {
    id: 1,
    name: "The Signature",
    description:
      "Our flagship nitro cold brew — classic body, smooth cascade, balanced finish. The cup that started it all.",
    shortDescription: "Nitro cold brew · classic body",
    price: 999,
    discountedPrice: 899,
    img: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&q=85&auto=format&fit=crop",
    tag: "Best Seller",
    notes: ["Dark Chocolate", "Roasted Almond", "Light Caramel"],
    origin: "Karnataka, India",
    roast: "Medium-dark · 11 min batch",
  },
  {
    id: 2,
    name: "Midnight Reserve",
    description:
      "A bolder expression — deep roast, full body, and a long finish. For the moments that ask for more.",
    shortDescription: "Bold extract · deep roast",
    price: 1299,
    discountedPrice: 1199,
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&q=85&auto=format&fit=crop",
    tag: "Limited",
    notes: ["Dark Cocoa", "Black Cherry", "Smoked Oak"],
    origin: "Kerala, India",
    roast: "Dark · 13 min batch",
  },
  {
    id: 3,
    name: "Morning Whisper",
    description:
      "Light, lifted, and gently floral. A daybreak in a glass — for slow mornings and quiet starts.",
    shortDescription: "Light bodied · floral notes",
    price: 849,
    discountedPrice: 749,
    img: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1200&q=85&auto=format&fit=crop",
    tag: "New",
    notes: ["Jasmine", "Honey", "Bergamot"],
    origin: "Tamil Nadu, India",
    roast: "Light · 9 min batch",
  },
  {
    id: 4,
    name: "Atelier No. 4",
    description:
      "Single-origin cold brew, sourced from one farm. Distinct character, intentional restraint.",
    shortDescription: "Cold brew · single origin",
    price: 1049,
    discountedPrice: 949,
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=85&auto=format&fit=crop",
    tag: "Editor's Pick",
    notes: ["Hazelnut", "Brown Sugar", "Vanilla"],
    origin: "Karnataka, India",
    roast: "Medium · 10 min batch",
  },
  {
    id: 5,
    name: "Slow Sunday",
    description:
      "Pour-over honey roast. Gentle sweetness, soft acidity, room to breathe. Take your time.",
    shortDescription: "Pour-over · honey roast",
    price: 899,
    discountedPrice: 829,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=85&auto=format&fit=crop",
    tag: "Classic",
    notes: ["Honey", "Apricot", "Toasted Grain"],
    origin: "Kerala, India",
    roast: "Medium · 10 min batch",
  },
  {
    id: 6,
    name: "The Carry-On",
    description:
      "Four cartridges, one travel pack. Pocket-sized rituals for hotel rooms, red-eyes, and quiet airports.",
    shortDescription: "Travel pack · 4 cartridges",
    price: 2799,
    discountedPrice: 2499,
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1200&q=85&auto=format&fit=crop",
    tag: "Bundle",
    notes: ["Mixed Selection", "Travel Sized", "Pocketable"],
    origin: "India",
    roast: "Varied",
  },
];

export type FallbackProduct = (typeof FALLBACK_CATALOGUE)[number];
