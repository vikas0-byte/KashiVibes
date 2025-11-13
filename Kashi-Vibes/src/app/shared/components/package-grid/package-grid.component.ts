import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Grid, List, SortAsc, MapPin } from 'lucide-angular';
import { PackageCardComponent } from '../package-card/package-card.component';
import { BadgeComponent } from '../ui/badge/badge.component';
import { ButtonComponent } from '../button/button/button.component';
import { Package } from '../../models/interface/package';
import { Filters } from '../../models/interface/filters';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-package-grid',
  standalone: true,
  imports: [
    CommonModule, 
    PackageCardComponent, 
    BadgeComponent, 
    LucideAngularModule, 
    ButtonComponent
  ],
  templateUrl: './package-grid.component.html'
})
export class PackageGridComponent {

  @Input() filters: Filters = {
    duration: [],
    price: [],
    category: [],
    location: []
  };


  // @Input() viewMode: 'grid' | 'list' = 'grid';
  // @Input() sortBy: string = 'featured';
  
  // @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
  // @Output() sortChange = new EventEmitter<string>();
  @Output() clearFilters = new EventEmitter<void>();
  @Output() wishlistToggle = new EventEmitter<Package>();
  @Output() shareClick = new EventEmitter<Package>();
  @Output() viewDetails = new EventEmitter<Package>();
  @Output() bookNow = new EventEmitter<Package>();
  @Output() loadMore = new EventEmitter<void>();

  packages : Package[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  sortBy = 'featured';

  // Lucide icons
  readonly gridIcon = Grid;
  readonly listIcon = List;
  readonly sortAscIcon = SortAsc;
  readonly mapPinIcon = MapPin;

  constructor(private packageService: PackageService) {}

  ngOnInit() {
    this.loadPackages();
  }

  private loadPackages(): void {
    this.packages = this.packageService.getAllPackages();
  }

  // Helper method to get filter values by category
  getFilterValues(category: string): string[] {
    return this.filters[category] || [];
  }

  // Get active filters as array for display
  get activeFiltersArray(): { category: string, value: string }[] {
    const activeFilters: { category: string, value: string }[] = [];
    
    Object.keys(this.filters).forEach(category => {
      if (Array.isArray(this.filters[category])) {
        (this.filters[category] as string[]).forEach(value => {
          if (value) {
            activeFilters.push({ category, value });
          }
        });
      }
    });
    
    return activeFilters;
  }

  get filteredPackages(): Package[] {
    return this.packages.filter(pkg => {
      // Duration filter
      if (this.filters.duration.length > 0) {
        const durationMatch = this.filters.duration.some(duration => {
          const days = parseInt(pkg.duration);
          switch (duration) {
            case '1-3': return days >= 1 && days <= 3;
            case '4-6': return days >= 4 && days <= 6;
            case '7-10': return days >= 7 && days <= 10;
            case '10+': return days > 10;
            default: return false;
          }
        });
        if (!durationMatch) return false;
      }

      // Price filter
      if (this.filters.price.length > 0) {
        const priceMatch = this.filters.price.some(price => {
          switch (price) {
            case 'budget': return pkg.price >= 5000 && pkg.price <= 15000;
            case 'premium': return pkg.price > 15000 && pkg.price <= 30000;
            case 'luxury': return pkg.price > 30000;
            default: return false;
          }
        });
        if (!priceMatch) return false;
      }

      // Category filter
      if (this.filters.category.length > 0) {
        const categoryMatch = this.filters.category.some(category => {
          switch (category) {
            case 'spiritual': return pkg.category.includes('Spiritual');
            case 'cultural': return pkg.category.includes('Cultural');
            case 'food': return pkg.category.includes('Food');
            case 'wellness': return pkg.category.includes('Wellness');
            default: return false;
          }
        });
        if (!categoryMatch) return false;
      }

      // Location filter
      if (this.filters.location.length > 0) {
        const locationMatch = this.filters.location.some(location => 
          pkg.location.toLowerCase().includes(location.toLowerCase())
        );
        if (!locationMatch) return false;
      }

      // Price range filter
      if (this.filters.priceRange) {
        const [minPrice, maxPrice] = this.filters.priceRange;
        if (pkg.price < minPrice || pkg.price > maxPrice) return false;
      }

      return true;
    });
  }

  get sortedPackages(): Package[] {
    return [...this.filteredPackages].sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'duration': return parseInt(a.duration) - parseInt(b.duration);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
      }
    });
  }

  get activeFiltersCount(): number {
    return Object.values(this.filters).flat().length;
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value;
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  onClearAllFilters(): void {
    this.clearFilters.emit();
  }

  onWishlistToggle(packageData: Package): void {
    this.wishlistToggle.emit(packageData);
  }

  onShareClick(packageData: Package): void {
    this.shareClick.emit(packageData);
  }

  onViewDetails(packageData: Package): void {
    this.viewDetails.emit(packageData);
  }

  onBookNow(packageData: Package): void {
    this.bookNow.emit(packageData);
  }

  onLoadMore(): void {
    this.loadMore.emit();
  }
}