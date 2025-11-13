export interface FilterData {
  duration: FilterItem[];
  price: FilterItem[];
  category: FilterItem[];
  location: FilterItem[];
}

export interface FilterItem {
  id: string;
  label: string;
  count: number;
}

export interface SelectedFilters {
  duration: string[];
  price: string[];
  category: string[];
  location: string[];
  priceRange: [number, number];
}