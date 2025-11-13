export interface TourPackage {
  id: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  maxGuests: number;
  badge: string;
  images: string[];
  highlights: string[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
}

export interface DayItinerary {
  day: number;
  title: string;
  activities: string;
}