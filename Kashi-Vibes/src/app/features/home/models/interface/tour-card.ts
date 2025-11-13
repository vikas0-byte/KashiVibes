export type TransportIcon = 'hand' | 'motor';

export interface TourCard {
  image: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  transportType: string;
  transportIcon: TransportIcon;
  capacity: string;
  duration: string;
  rating: number;
  reviews: number;
  availableTimes: string[];
  location?: string;
  isPopular?: boolean;
  discount?: string;
}

export type TourFilter = 'all' | 'hand' | 'motor' | 'popular';