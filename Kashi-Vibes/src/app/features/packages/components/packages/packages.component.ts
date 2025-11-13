import { Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { CustompackagesgeneratorComponent } from '../custompackagesgenerator/custompackagesgenerator.component';
import { CalltoactionComponent } from '../calltoaction/calltoaction.component';
import { WhychoosesacredjourneyComponent } from '../whychoosesacredjourney/whychoosesacredjourney.component';
import { TestimonailComponent } from "../testimonail/testimonail.component";
import { FilterData, SelectedFilters } from '../../../../shared/models/interface/packagesfilter';
import { PackageFiltersComponent } from '../../../../shared/components/package-filters/package-filters.component';
import { PackageGridComponent } from '../../../../shared/components/package-grid/package-grid.component';
import { Package } from '../../../../shared/models/interface/package';
import { Filters } from '../../../../shared/models/interface/filters';
import { PackageService } from '../../../../shared/services/package.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, PackageFiltersComponent, PackageGridComponent ,CustompackagesgeneratorComponent, CalltoactionComponent, WhychoosesacredjourneyComponent, TestimonailComponent],
  templateUrl: './packages.component.html'
})
export class PackagesComponent {

 

  @Output() onCustomPackage = new EventEmitter<void>();

  selectedFilters: SelectedFilters = {
    duration: [],
    price: [],
    category: [],
    location: [],
    priceRange: [3000, 50000]
  };

  viewMode: 'grid' | 'list' = 'grid';
  sortBy = 'featured';


  filterData: FilterData = {
    priceRange: {
      min: 3000,
      max: 50000,
      step: 1000
    },
    categories: [
      {
        key: 'duration',
        label: 'Tour Duration',
        items: [
          { id: "1-3", label: "1-3 Days", count: 8 },
          { id: "4-6", label: "4-6 Days", count: 12 },
          { id: "7-10", label: "7-10 Days", count: 6 },
          { id: "10+", label: "10+ Days", count: 4 }
        ]
      },
      {
        key: 'price',
        label: 'Price Category',
        items: [
          { id: "budget", label: "Budget (₹5,000-15,000)", count: 10 },
          { id: "premium", label: "Premium (₹15,000-30,000)", count: 15 },
          { id: "luxury", label: "Luxury (₹30,000+)", count: 5 }
        ]
      },
      {
        key: 'category',
        label: 'Tour Category',
        items: [
          { id: "spiritual", label: "Spiritual Tours", count: 20 },
          { id: "cultural", label: "Cultural Heritage", count: 12 },
          { id: "food", label: "Food & Culture", count: 8 },
          { id: "wellness", label: "Wellness Retreats", count: 5 }
        ]
      },
      {
        key: 'location',
        label: 'Destinations',
        items: [
          { id: "varanasi", label: "Varanasi", count: 15 },
          { id: "ayodhya", label: "Ayodhya", count: 8 },
          { id: "bodhgaya", label: "Bodhgaya", count: 6 },
          { id: "prayagraj", label: "Prayagraj", count: 10 },
          { id: "vindhyachal", label: "Vindhyachal", count: 5 }
        ]
      }
    ]
  };

  

  showCustomGenerator = signal(false);

  constructor(private packageService: PackageService) {
    // Debugging - check signal changes using effect
    effect(() => {
      console.log('Custom Generator Status:', this.showCustomGenerator());
    });
  }

  onFiltersChange(filters: SelectedFilters): void {
    this.selectedFilters = filters;
  }


  openCustomGenerator() {
    console.log('Opening custom generator...');
    this.showCustomGenerator.set(true);
  }

  // Method to close custom generator
  closeCustomGenerator() {
    this.showCustomGenerator.set(false);
  }
  onContactUs() {
    console.log('Contact us clicked');
    // Yahan aap contact us logic add kar sakte hain
    // Example: this.router.navigate(['/contact']);
  }

  onClearFilters() {
    this.selectedFilters = {
      duration: [],
      price: [],
      category: [],
      location: [],
      priceRange: [3000, 50000]
    };
  }

  onWishlistToggle(packageData: Package) {
    this.packageService.toggleWishlist(packageData.id);
    console.log('Wishlist toggled for package:', packageData.title);
  }

  onShareClick(packageData: Package) {
    if (navigator.share) {
      navigator.share({
        title: packageData.title,
        text: packageData.description,
        url: `/packages/${packageData.id}`
      });
    } else {
      console.log('Share package:', packageData);
    }
  }

  onViewDetails(packageData: Package) {
    console.log('View details for package:', packageData);
  }

  onBookNow(packageData: Package) {
    console.log('Book now for package:', packageData);
  }

  onLoadMore() {
    console.log('Load more packages');
  }

}