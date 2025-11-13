import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Grid, List, SortAsc, MapPin } from 'lucide-angular';
import { PackageCardComponent } from '../package-card/package-card.component';
import { Filters, Package } from '../../models/interface/package';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button/button.component';


@Component({
  selector: 'app-package-grid',
  standalone: true,
  imports: [CommonModule, PackageCardComponent, BadgeComponent, LucideAngularModule, ButtonComponent],
  templateUrl: './package-grid.component.html'
})
export class PackageGridComponent implements OnInit {
  @Input() filters!: Filters;

  viewMode: 'grid' | 'list' = 'grid';
  sortBy = 'featured';

  // Lucide icons
  readonly gridIcon = Grid;
  readonly listIcon = List;
  readonly sortAscIcon = SortAsc;
  readonly mapPinIcon = MapPin;

  packages: Package[] = [
    {
      id: 1,
      title: "Street Food & Hidden Gems",
      location: "Varanasi",
      duration: "3 Days 2 Nights",
      price: 3200,
      originalPrice: 4500,
      image: "assets/packages/package/street-food-package.jpg",
      rating: 4.8,
      reviews: 156,
      category: "Food & Culture",
      highlights: ["Local street food tours", "Hidden temple visits", "Boat rides at sunrise", "Cultural workshops"],
      includes: ["Accommodation", "All meals", "Local guide", "Transportation"],
      description: "Explore Varanasi's culinary heritage and discover hidden spiritual gems known only to locals.",
      featured: true
    },
    {
      id: 2,
      title: "Varanasi 5N/6D",
      location: "Varanasi",
      duration: "6 Days 5 Nights",
      price: 18500,
      originalPrice: 22000,
      image: "assets/packages/package/varanasi-5n6d.jpg",
      rating: 4.9,
      reviews: 243,
      category: "Spiritual Tours",
      highlights: ["Kashi Vishwanath Temple", "Ganga Aarti ceremonies", "Sarnath Buddhist sites", "Traditional music & dance"],
      includes: ["Hotel accommodation", "All meals", "Expert guide", "Airport transfers", "Boat rides"],
      description: "Complete spiritual immersion in the holy city of Varanasi with expert guidance and authentic experiences.",
      featured: true
    },
    {
      id: 3,
      title: "Varanasi to Bodhgaya",
      location: "Varanasi & Bodhgaya",
      duration: "7 Days 6 Nights",
      price: 22800,
      originalPrice: 28000,
      image: "assets/packages/package/varanasi-bodhgaya.jpg",
      rating: 4.7,
      reviews: 189,
      category: "Spiritual Tours",
      highlights: ["Mahabodhi Temple", "Buddha's enlightenment site", "Meditation sessions", "Monastery visits"],
      includes: ["Premium accommodation", "All meals", "Private transportation", "Spiritual guide", "Meditation classes"],
      description: "Journey through Buddhism's most sacred sites from Varanasi to the place of Buddha's enlightenment.",
      featured: false
    },
    {
      id: 4,
      title: "Varanasi to Ayodhya",
      location: "Varanasi & Ayodhya",
      duration: "5 Days 4 Nights",
      price: 16200,
      originalPrice: 19500,
      image: "assets/packages/package/varanasi-ayodhya.jpg",
      rating: 4.6,
      reviews: 134,
      category: "Cultural Heritage",
      highlights: ["Ram Janmabhoomi Temple", "Hanuman Garhi", "Saryu River Aarti", "Ancient Ram stories"],
      includes: ["Comfortable stay", "Vegetarian meals", "AC transportation", "Religious guide", "Temple visits"],
      description: "Explore the birthplace of Lord Rama and experience the spiritual heritage of ancient India.",
      featured: false
    },
    {
      id: 5,
      title: "Prayagraj Vindhyachal",
      location: "Prayagraj & Vindhyachal",
      duration: "4 Days 3 Nights",
      price: 12800,
      originalPrice: 15500,
      image: "assets/packages/package/prayagraj-vindhyachal.jpg",
      rating: 4.5,
      reviews: 98,
      category: "Spiritual Tours",
      highlights: ["Triveni Sangam", "Vindhyachal Devi Temple", "Holy dip ceremony", "Allahabad Fort"],
      includes: ["Hotel stay", "Meals", "Local transport", "Guide service", "Temple visits"],
      description: "Visit the sacred confluence of three rivers and seek blessings at the powerful Vindhyachal Devi Temple.",
      featured: false
    }
  ];

  ngOnInit() {}

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

  clearAllFilters(): void {
    // This would typically emit an event to parent to clear filters
    console.log('Clear all filters');
  }

  onWishlistToggle(packageId: number): void {
    console.log('Wishlist toggled for package:', packageId);
  }

  onShareClick(packageId: number): void {
    console.log('Share package:', packageId);
  }

  onViewDetails(packageId: number): void {
    console.log('View details for package:', packageId);
  }

  onBookNow(packageId: number): void {
    console.log('Book now package:', packageId);
  }

  loadMorePackages(): void {
    console.log('Load more packages');
  }
}