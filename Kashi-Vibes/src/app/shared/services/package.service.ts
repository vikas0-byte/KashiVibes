import { Injectable } from '@angular/core';
import { Package } from '../models/interface/package';
import { PACKAGES_DATA } from '../data/packages.data';
import { Filters } from '../models/interface/filters';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packages: Package[] = PACKAGES_DATA;

  constructor() { }

  /**
   * Get all packages
   */
  getAllPackages(): Package[] {
    return this.packages;
  }

  /**
   * Get package by ID
   */
  getPackageById(id: number): Package | undefined {
    return this.packages.find(pkg => pkg.id === id);
  }

  /**
   * Get featured packages
   */
  getFeaturedPackages(): Package[] {
    return this.packages.filter(pkg => pkg.featured);
  }

  /**
   * Get packages by category
   */
  getPackagesByCategory(category: string): Package[] {
    return this.packages.filter(pkg => 
      pkg.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  /**
   * Get packages by location
   */
  getPackagesByLocation(location: string): Package[] {
    return this.packages.filter(pkg => 
      pkg.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  /**
   * Filter packages based on filters
   */
  getFilteredPackages(filters: Filters): Package[] {
    return this.packages.filter(pkg => {
      // Duration filter
      if (filters.duration.length > 0) {
        const durationMatch = filters.duration.some(duration => {
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
      if (filters.price.length > 0) {
        const priceMatch = filters.price.some(price => {
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
      if (filters.category.length > 0) {
        const categoryMatch = filters.category.some(category => {
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
      if (filters.location.length > 0) {
        const locationMatch = filters.location.some(location => 
          pkg.location.toLowerCase().includes(location.toLowerCase())
        );
        if (!locationMatch) return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        if (pkg.price < minPrice || pkg.price > maxPrice) return false;
      }

      return true;
    });
  }

  /**
   * Sort packages
   */
  sortPackages(packages: Package[], sortBy: string): Package[] {
    return [...packages].sort((a, b) => {
      switch (sortBy) {
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

  /**
   * Search packages by title or description
   */
  searchPackages(query: string): Package[] {
    const searchTerm = query.toLowerCase();
    return this.packages.filter(pkg => 
      pkg.title.toLowerCase().includes(searchTerm) ||
      pkg.description.toLowerCase().includes(searchTerm) ||
      pkg.location.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get related packages (same category or location)
   */
  getRelatedPackages(packageId: number, limit: number = 4): Package[] {
    const currentPackage = this.getPackageById(packageId);
    if (!currentPackage) return [];

    return this.packages
      .filter(pkg => 
        pkg.id !== packageId && 
        (pkg.category === currentPackage.category || 
         pkg.location === currentPackage.location)
      )
      .slice(0, limit);
  }

  /**
   * Toggle wishlist status (in a real app, this would be API call)
   */
  toggleWishlist(packageId: number): void {
    // In a real application, this would make an API call
    console.log('Toggling wishlist for package:', packageId);
  }
}