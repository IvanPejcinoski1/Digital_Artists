export interface Product {
  id: string;
  //   user?: (string | null) | User;
  name: string;
  creator: string;
  description?: string | null;
  price: number;
  category: "ui_kits" | "icons" | "images";
  src: string;
  createdAt: string;
  rating: number;
  label: string;
  isRectangular: boolean;
}
