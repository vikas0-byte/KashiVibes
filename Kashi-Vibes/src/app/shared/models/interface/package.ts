export interface Package {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  highlights: string[];
  includes: string[];
  description: string;
  featured: boolean;
}