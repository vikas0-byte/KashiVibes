// src/app/shared/interfaces/tour.interface.ts
export interface Tour {
  id?: number;
  image: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  people: number;
  badge: string;
  rating: number;
  highlights: string[];
  category?: string;
  slug?: string;
}

export interface TourCardProps {
  tour: Tour;
}