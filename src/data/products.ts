export interface Product {
  id: number;
  slug: string;
  name: string;
  cat: string;
  price: number;
  originalPrice?: number;
  img: string;
  imgs: string[];
  rating: number;
  reviews: number;
  tag?: string;
  tagColor?: string;
  desc: string;
  details: string[];
  stock: number;
}

export const products: Product[] = [
  {
    id: 1, slug: "linen-journal-a5",
    name: "Linen Journal — A5", cat: "Stationery", price: 48, originalPrice: 60,
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=800&q=80",
      "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80",
    ],
    rating: 4.9, reviews: 412, tag: "Bestseller", tagColor: "#B8860B",
    desc: "Handbound in natural linen with acid-free cream pages. Perfect for journaling, sketching, or daily notes.",
    details: ["A5 size (148 × 210mm)", "200 acid-free cream pages", "Lay-flat binding", "Ribbon bookmark", "Linen cover — natural"],
    stock: 42,
  },
  {
    id: 2, slug: "ceramic-pour-over-set",
    name: "Ceramic Pour-Over Set", cat: "Kitchen", price: 94,
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    ],
    rating: 4.8, reviews: 287, tag: "New", tagColor: "#059669",
    desc: "Hand-thrown ceramic pour-over dripper and carafe. Matte white glaze with sage green accent. Brews 2–4 cups.",
    details: ["Stoneware ceramic", "Dishwasher safe", "Includes dripper + carafe", "2–4 cup capacity", "Matte white & sage"],
    stock: 18,
  },
  {
    id: 3, slug: "botanica-soy-candle",
    name: "Botanica Soy Candle", cat: "Home", price: 36,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      "https://images.unsplash.com/photo-1603905098651-a8bd3e1d545e?w=800&q=80",
    ],
    rating: 5.0, reviews: 631, tag: "Fan Fav", tagColor: "#7C3AED",
    desc: "Hand-poured 100% soy wax with dried botanicals and cotton wick. Scent: cedar, fig & warm amber. 50hr burn.",
    details: ["100% natural soy wax", "Cotton wick", "50-hour burn time", "8oz amber glass jar", "Cedar, fig & amber scent"],
    stock: 97,
  },
  {
    id: 4, slug: "leather-desk-tray",
    name: "Full-Grain Leather Tray", cat: "Desk", price: 72,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
    rating: 4.9, reviews: 194,
    desc: "Vegetable-tanned full-grain leather desk tray. Holds keys, cards, and small accessories. Ages beautifully.",
    details: ["Full-grain leather", "Vegetable tanned", "21cm × 14cm", "Hand-stitched edges", "Tan — develops patina"],
    stock: 23,
  },
  {
    id: 5, slug: "rattan-woven-tote",
    name: "Rattan Woven Tote", cat: "Lifestyle", price: 58,
    img: "https://images.unsplash.com/photo-1584917865442-de89be371f01?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1584917865442-de89be371f01?w=800&q=80"],
    rating: 4.7, reviews: 143,
    desc: "Handwoven rattan tote with leather handles. Light, durable, and the perfect market or beach bag.",
    details: ["Natural rattan weave", "Leather handles", "Interior cotton lining", "38cm × 30cm × 18cm", "Handmade in Indonesia"],
    stock: 35,
  },
  {
    id: 6, slug: "botanical-print-set",
    name: "Botanical Print Set", cat: "Home", price: 42,
    img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80"],
    rating: 4.8, reviews: 321, tag: "New", tagColor: "#059669",
    desc: "Set of 3 archival botanical prints. Printed on 300gsm cotton rag paper. Ready to frame.",
    details: ["Set of 3 prints", "A4 size (210×297mm)", "300gsm cotton rag paper", "Archival pigment ink", "Unframed"],
    stock: 56,
  },
  {
    id: 7, slug: "beeswax-taper-candles",
    name: "Beeswax Taper Candles (4pk)", cat: "Home", price: 28,
    img: "https://images.unsplash.com/photo-1637943906637-e11e8c0d2af2?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1637943906637-e11e8c0d2af2?w=800&q=80"],
    rating: 4.9, reviews: 208,
    desc: "Pure beeswax taper candles in natural ivory. Burns clean with a subtle honey scent. 10 inch, 7hr burn each.",
    details: ["100% pure beeswax", "Set of 4 tapers", "25cm tall", "7-hour burn each", "Natural ivory color"],
    stock: 88,
  },
  {
    id: 8, slug: "leather-journal-cover",
    name: "Leather Journal Cover", cat: "Stationery", price: 88, originalPrice: 110,
    img: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=800&q=80"],
    rating: 5.0, reviews: 97, tag: "Limited", tagColor: "#DC2626",
    desc: "Hand-stitched full-grain leather cover for A5 journals. Fits standard A5 notebooks. Name engraving available.",
    details: ["Full-grain leather", "Fits A5 notebooks", "Hand-stitched in saddle tan", "Pen loop included", "Custom engraving available"],
    stock: 7,
  },
  {
    id: 9, slug: "stoneware-mug-set",
    name: "Stoneware Mug Set (2pc)", cat: "Kitchen", price: 54,
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80"],
    rating: 4.8, reviews: 356,
    desc: "Chunky hand-thrown stoneware mugs in speckled cream. Each one unique. Microwave and dishwasher safe. 350ml.",
    details: ["Stoneware ceramic", "Set of 2", "350ml capacity", "Dishwasher & microwave safe", "Each piece unique"],
    stock: 29,
  },
  {
    id: 10, slug: "bamboo-desk-organiser",
    name: "Bamboo Desk Organiser", cat: "Desk", price: 64,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
    rating: 4.6, reviews: 112,
    desc: "5-compartment desk organiser in solid bamboo. Holds pens, cards, phone, and small items. No glue, no screws.",
    details: ["Solid bamboo construction", "5 compartments", "32cm × 18cm × 10cm", "No glue or screws", "Sanded & oiled finish"],
    stock: 40,
  },
  {
    id: 11, slug: "linen-cushion-cover",
    name: "Linen Cushion Cover 50x50", cat: "Lifestyle", price: 38,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"],
    rating: 4.7, reviews: 189,
    desc: "100% stone-washed linen cushion cover. Natural, textured, and gets softer with every wash. Hidden zip closure.",
    details: ["100% stonewashed linen", "50cm × 50cm", "Hidden zip closure", "Available in natural, sage, dusk", "Machine washable"],
    stock: 61,
  },
  {
    id: 12, slug: "artisan-gift-box",
    name: "The Artisan Gift Box", cat: "Lifestyle", price: 124, originalPrice: 142,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"],
    rating: 5.0, reviews: 67, tag: "Bestseller", tagColor: "#B8860B",
    desc: "Curated gift set: Linen Journal + Botanica Candle + Beeswax Tapers (2pk). Beautifully packaged in a linen box.",
    details: ["Linen Journal A5", "Botanica Soy Candle", "2 Beeswax Tapers", "Linen gift box + ribbon", "Gift message card included"],
    stock: 15,
  },
];

export const CATS = ["All", "Home", "Stationery", "Kitchen", "Desk", "Lifestyle"];
