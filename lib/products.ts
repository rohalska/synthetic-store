export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  url: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    title: "Monogrammed Italian Calfskin Tote",
    description: "Handcrafted full-grain leather tote featuring gold-finished hardware and structured suede interior.",
    price: 1850.00,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    url: "https://synthetic-store-sandbox.vercel.app/products/prod-001",
  },
  {
    id: "prod-002",
    title: "Double-Breasted Cashmere Trench",
    description: "Tailored luxury winter coat woven from pure Mongolian cashmere with horn buttons and a belted waist.",
    price: 2400.00,
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
    url: "https://synthetic-store-sandbox.vercel.app/products/prod-002",
  },
  {
    id: "prod-003",
    title: "Hand-Rolled Printed Silk Twill Scarf",
    description: "100% Mulberry silk scarf with intricate geometric motifs and hand-stitched edges.",
    price: 495.00,
    imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500",
    url: "https://synthetic-store-sandbox.vercel.app/products/prod-003",
  }
];
