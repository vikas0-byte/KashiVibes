export interface Filters {
  duration: string[];
  price: string[];
  category: string[];
  location: string[];
  priceRange?: [number, number];
  [key: string]: any;
}