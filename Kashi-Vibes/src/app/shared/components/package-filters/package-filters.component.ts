import { Component, Input, Output, EventEmitter, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterData, SelectedFilters, PackageFiltersConfig, FilterCategory, FilterItem } from '../../models/interface/packagesfilter';
import { BadgeComponent } from '../ui/badge/badge.component';
import { SliderComponent } from '../ui/slider/slider.component';
import { SeparatorComponent } from '../ui/separator/separator.component';
import { CheckboxComponent } from '../ui/checkbox';
import { Filter, LucideAngularModule, Sparkles, Star } from 'lucide-angular';

@Component({
  selector: 'app-package-filters',
  standalone: true,
  imports: [ 
    CommonModule, 
    LucideAngularModule,
    CheckboxComponent, 
    SeparatorComponent, 
    SliderComponent, 
    BadgeComponent 
  ],
  templateUrl: './package-filters.component.html',
  styleUrls: ['./package-filters.component.css']
})
export class PackageFiltersComponent {
  // Required Inputs
  @Input({ required: true }) selectedFilters: SelectedFilters = {
    duration: [],
    price: [],
    category: [],
    location: [],
    priceRange: [3000, 50000]
  };
  
  @Input({ required: true }) filterData!: FilterData;
  
  // Optional Configuration
  @Input() config: PackageFiltersConfig = {
    showCustomPackage: true,
    showPopularPackages: true,
    showWhyChooseUs: true,
    showSpecialOffer: true,
    showNeedHelp: true,
    customPackageConfig: {
      title: 'Create Custom Package',
      description: 'Design your perfect spiritual journey',
      buttonText: 'Get Started'
    }
  };

  // Output Events
  @Output() selectedFiltersChange = new EventEmitter<SelectedFilters>();
  @Output() onCustomPackage = new EventEmitter<void>();
  @Output() onContactUs = new EventEmitter<void>();

  // Local State
  sliderValue = signal<number[]>([3000, 50000]);

  // Lucide icons
  readonly sparklesIcon = Sparkles;
  readonly filterIcon = Filter;
  readonly starIcon = Star;

  // Default price range
  private defaultPriceRange = {
    min: 3000,
    max: 50000,
    step: 1000
  };

  ngOnInit() {
    this.initializePriceRange();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFilters'] || changes['filterData']) {
      this.initializePriceRange();
    }
  }

  private initializePriceRange(): void {
    const priceConfig = this.filterData.priceRange || this.defaultPriceRange;
    
    if (this.selectedFilters?.priceRange) {
      this.sliderValue.set([...this.selectedFilters.priceRange]);
    } else {
      this.sliderValue.set([priceConfig.min, priceConfig.max]);
    }
  }

  getPriceRangeConfig() {
    return this.filterData.priceRange || this.defaultPriceRange;
  }

  getPriceRangeDisplay(): [number, number] {
    return this.selectedFilters?.priceRange || [3000, 50000];
  }

  
  getFilterArray(categoryKey: string): string[] {
    const value = this.selectedFilters[categoryKey];
    return Array.isArray(value) && value.every(item => typeof item === 'string') 
      ? value as string[] 
      : [];
  }

  handleFilterChange(categoryKey: string, value: string, checked: boolean) {
    const currentArray = this.getFilterArray(categoryKey);
    
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    this.selectedFiltersChange.emit({
      ...this.selectedFilters,
      [categoryKey]: newArray
    });
  }

  handlePriceRangeChange(values: number[]) {
    const newRange: [number, number] = [values[0], values[1]];
    this.sliderValue.set([...newRange]);
    
    this.selectedFiltersChange.emit({
      ...this.selectedFilters,
      priceRange: newRange
    });
  }

  clearAllFilters() {
    const priceConfig = this.getPriceRangeConfig();
    const defaultPriceRange: [number, number] = [priceConfig.min, priceConfig.max];
    
    this.sliderValue.set([priceConfig.min, priceConfig.max]);
    
    const emptyFilters: SelectedFilters = {
      duration: [],
      price: [],
      category: [],
      location: [],
      priceRange: defaultPriceRange
    };
    
    this.selectedFiltersChange.emit(emptyFilters);
  }

  getActiveFilterCount(): number {
    if (!this.selectedFilters) return 0;
    
    return Object.entries(this.selectedFilters)
      .filter(([key, value]) => key !== 'priceRange' && Array.isArray(value))
      .reduce((count, [_, array]) => count + (array as string[]).length, 0);
  }

  trackByFilterItem(index: number, item: FilterItem): string {
    return item.id;
  }

  trackByCategory(index: number, category: FilterCategory): string {
    return category.key;
  }
}