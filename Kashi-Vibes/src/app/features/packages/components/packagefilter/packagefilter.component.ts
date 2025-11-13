import { Component, Input, Output, EventEmitter, signal, computed, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filter, LucideAngularModule, Sparkles, Star } from 'lucide-angular';
import { FilterData, SelectedFilters } from '../../models/interface/packagesfilter';
import { CheckboxComponent } from '../../../../shared/components/ui/checkbox';
import { SeparatorComponent } from '../../../../shared/components/ui/separator/separator.component';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';
import { SliderComponent } from '../../../../shared/components/ui/slider/slider.component';


@Component({
  selector: 'app-package-filters',
  standalone: true,
  imports: [ CommonModule, LucideAngularModule, CheckboxComponent, SeparatorComponent, SliderComponent, BadgeComponent],
  templateUrl: 'packagefilter.component.html',
  styleUrls: ['packagefilter.component.css']
})
export class PackageFiltersComponent {
  @Input() selectedFilters!: SelectedFilters;
  @Output() selectedFiltersChange = new EventEmitter<SelectedFilters>();
  @Output() onCustomPackage = new EventEmitter<void>();

  priceRange: [number, number] = [3000, 50000];
  sliderValue: number[] = [3000, 50000];


  // Lucide icons
  readonly sparklesIcon = Sparkles;
  readonly filterIcon = Filter;
  readonly starIcon = Star;

  filterData: FilterData = {
    duration: [
      { id: "1-3", label: "1-3 Days", count: 8 },
      { id: "4-6", label: "4-6 Days", count: 12 },
      { id: "7-10", label: "7-10 Days", count: 6 },
      { id: "10+", label: "10+ Days", count: 4 }
    ],
    price: [
      { id: "budget", label: "Budget (₹5,000-15,000)", count: 10 },
      { id: "premium", label: "Premium (₹15,000-30,000)", count: 15 },
      { id: "luxury", label: "Luxury (₹30,000+)", count: 5 }
    ],
    category: [
      { id: "spiritual", label: "Spiritual Tours", count: 20 },
      { id: "cultural", label: "Cultural Heritage", count: 12 },
      { id: "food", label: "Food & Culture", count: 8 },
      { id: "wellness", label: "Wellness Retreats", count: 5 }
    ],
    location: [
      { id: "varanasi", label: "Varanasi", count: 15 },
      { id: "ayodhya", label: "Ayodhya", count: 8 },
      { id: "bodhgaya", label: "Bodhgaya", count: 6 },
      { id: "prayagraj", label: "Prayagraj", count: 10 },
      { id: "vindhyachal", label: "Vindhyachal", count: 5 }
    ]
  };

  ngOnInit() {
    this.initializePriceRange();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFilters'] && changes['selectedFilters'].currentValue) {
      this.initializePriceRange();
    }
  }

  private initializePriceRange(): void {
    // Safely initialize priceRange with fallback values
    if (this.selectedFilters && this.selectedFilters.priceRange) {
      this.priceRange = [...this.selectedFilters.priceRange];
      this.sliderValue = [...this.selectedFilters.priceRange];
    } else {
      // Fallback to default values
      this.priceRange = [3000, 50000];
      this.sliderValue = [3000, 50000];
    }
  }

  getPriceRangeDisplay(): [number, number] {
    return this.priceRange || [3000, 50000];
  }


  handleFilterChange(category: string, value: string, checked: boolean) {
    const newFilters = { ...this.selectedFilters };
    
    if (category === 'duration') {
      if (checked) {
        newFilters.duration = [...newFilters.duration, value];
      } else {
        newFilters.duration = newFilters.duration.filter(item => item !== value);
      }
    } else if (category === 'price') {
      if (checked) {
        newFilters.price = [...newFilters.price, value];
      } else {
        newFilters.price = newFilters.price.filter(item => item !== value);
      }
    } else if (category === 'category') {
      if (checked) {
        newFilters.category = [...newFilters.category, value];
      } else {
        newFilters.category = newFilters.category.filter(item => item !== value);
      }
    } else if (category === 'location') {
      if (checked) {
        newFilters.location = [...newFilters.location, value];
      } else {
        newFilters.location = newFilters.location.filter(item => item !== value);
      }
    }
    
    this.selectedFiltersChange.emit(newFilters);
  }

  handlePriceRangeChange(values: number[]) {
    const newRange: [number, number] = [values[0], values[1]];
    this.priceRange = newRange;
    this.sliderValue = [...newRange];
    this.selectedFiltersChange.emit({
      ...this.selectedFilters,
      priceRange: newRange
    });
  }

  clearAllFilters() {
    const defaultPriceRange: [number, number] = [3000, 50000];
    this.priceRange = defaultPriceRange;
    this.sliderValue = [3000, 50000];
    this.selectedFiltersChange.emit({
      duration: [],
      price: [],
      category: [],
      location: [],
      priceRange: defaultPriceRange
    });
  }

  getActiveFilterCount(): number {
    if (!this.selectedFilters) return 0;
    
    return Object.values(this.selectedFilters)
      .filter(value => Array.isArray(value))
      .reduce((count, array) => count + (array as any[]).length, 0);
  }

}