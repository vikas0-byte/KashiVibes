export interface FilterItem {
  id: string;
  label: string;
  count: number;
}

export interface FilterCategory {
  key: string;
  label: string;
  items: FilterItem[];
  type?: 'checkbox' | 'slider' | 'radio';
}

export interface FilterData {
  categories: FilterCategory[];
  priceRange?: {
    min: number;
    max: number;
    step: number;
  };
}

export interface SelectedFilters {
  // Known properties
  duration: string[];
  price: string[];
  category: string[];
  location: string[];
  priceRange: [number, number];
  
  // Allow dynamic properties
  [key: string]: string[] | [number, number];
}

export interface PackageFiltersConfig {
  showCustomPackage?: boolean;
  showPopularPackages?: boolean;
  showWhyChooseUs?: boolean;
  showSpecialOffer?: boolean;
  showNeedHelp?: boolean;
  customPackageConfig?: {
    title: string;
    description: string;
    buttonText: string;
  };
}