export interface FoodSpot {
  id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  location: string;
  timings: string;
  mustTry: string[];
  difficulty: string;
  crowd: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
}

export interface FoodPackageGridConfig {
  showFilters?: boolean;
  showSort?: boolean;
  showPriceFilter?: boolean;
  showTypeFilter?: boolean;
  showDifficultyFilter?: boolean;
  itemsPerPage?: number;
  defaultView?: 'grid' | 'list';
  enablePagination?: boolean;
}

export interface FoodFilterState {
  priceRange: [number, number];
  selectedType: string;
  selectedDifficulty: string;
  searchQuery: string;
  featuredOnly: boolean;
}

export interface FoodSpotResponse {
  data: FoodSpot[];
  total: number;
  page: number;
  totalPages: number;
}