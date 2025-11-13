import { Component, Input, OnInit, inject, signal, computed, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Star, Clock, MapPin, Heart, Share2, Calendar, Search } from 'lucide-angular';

import { BadgeComponent } from '../../../../../../shared/components/ui/badge/badge.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button/button.component';
import { SliderComponent } from '../../../../../../shared/components/ui/slider/slider.component';
import { SeparatorComponent } from '../../../../../../shared/components/ui/separator/separator.component';
import { SelectComponent, SelectContentComponent, SelectItemComponent, SelectTriggerComponent, SelectValueComponent } from '../../../../../../shared/components/ui/select';
import { FoodSpotsService } from '../../../../../../shared/services/food-spots.service';
import { FoodPackageGridConfig, FoodSpot } from '../../../../../../shared/models/interface/food-spot.interface';

@Component({
  selector: 'app-food-package-grid',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    SliderComponent,
    SeparatorComponent,
    SelectComponent,
    SelectTriggerComponent,
    SelectValueComponent,
    SelectContentComponent,
    SelectItemComponent
  ],
  templateUrl: './food-package-grid.component.html'
})
export class FoodPackageGridComponent implements OnInit {
  private foodSpotsService = inject(FoodSpotsService);

  // @Input() foodSpots: FoodSpot[] = [];
  @Input() config: FoodPackageGridConfig = {
    showFilters: true,
    showSort: true,
    showPriceFilter: true,
    showTypeFilter: true,
    showDifficultyFilter: true,
    itemsPerPage: 6,
    defaultView: 'grid',
    enablePagination: true
  };

  currentPage = signal<number>(1);
  searchQuery = signal<string>('');

  //  SERVICE SE DIRECT DATA
  filteredSpots = computed(() => {
    const spots = this.foodSpotsService.filteredFoodSpots();
    console.log('Component - Filtered spots:', spots.length);
    return spots;
  });
  
  totalSpots = computed(() => this.foodSpotsService.totalFoodSpots());
  currentFilters = computed(() => this.foodSpotsService.currentFilters());

  pagesArray = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  priceRangeDisplay = computed(() => {
    const range = this.currentFilters().priceRange;
    return `₹${range[0]} - ₹${range[1]}`;
  });

  displayedSpots = computed(() => {
    const spots = this.filteredSpots();
    const pageSize = this.config.itemsPerPage || 6;
    const startIndex = (this.currentPage() - 1) * pageSize;
    const result = spots.slice(startIndex, startIndex + pageSize);
    console.log('Component - Displayed spots:', result.length);
    return result;
  });

  totalPages = computed(() => {
    const total = this.totalSpots();
    const pageSize = this.config.itemsPerPage || 6;
    return Math.ceil(total / pageSize);
  });

  readonly filterIcon = Filter;
  readonly starIcon = Star;
  readonly clockIcon = Clock;
  readonly mapPinIcon = MapPin;
  readonly heartIcon = Heart;
  readonly shareIcon = Share2;
  readonly calendarIcon = Calendar;
  readonly searchIcon = Search;

  foodTypes = this.foodSpotsService.getFoodTypes();
  difficultyLevels = this.foodSpotsService.getDifficultyLevels();

  ngOnInit() {
    console.log('Component - Initializing...');
    
    // this.foodSpotsService.setAllFoodSpots(this.foodSpots);

    //  SERVICE KO RESET KARO TAKI INITIAL DATA SHOW HO
    this.foodSpotsService.resetFilters();
    
    // Debugging
    console.log('Component - All spots in service:', this.foodSpotsService.getAllFoodSpots().length);
    console.log('Component - Filtered spots on init:', this.filteredSpots().length);
    console.log('Component - Current filters:', this.currentFilters());
    console.log('Component - Displayed spots on init:', this.displayedSpots().length);
  }

  handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onSearchChange(input.value || '');
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.foodSpotsService.updateSearchQuery(query);
    this.resetPagination();
  }

  onPriceRangeChange(values: number[]) {
    this.foodSpotsService.updatePriceRange([values[0], values[1]] as [number, number]);
    this.resetPagination();
  }

  onTypeChange(type: string | null) {
    const selectedType = (type && type.trim() !== '') ? type : 'all';
    this.foodSpotsService.updateSelectedType(selectedType);
    this.resetPagination();
  }

  onDifficultyChange(difficulty: string | null) {
    const selectedDifficulty = (difficulty && difficulty.trim() !== '') ? difficulty : 'all';
    this.foodSpotsService.updateSelectedDifficulty(selectedDifficulty);
    this.resetPagination();
  }

  onFeaturedToggle() {
    this.foodSpotsService.toggleFeaturedOnly();
    this.resetPagination();
  }

  resetFilters() {
    this.foodSpotsService.resetFilters();
    this.searchQuery.set('');
    this.resetPagination();
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  private resetPagination() {
    this.currentPage.set(1);
  }

  trackByFoodSpotId(index: number, spot: FoodSpot): number {
    return spot.id;
  }

  trackByMustTry(index: number, item: string): string {
    return item;
  }

  trackByPage(index: number, page: number): number {
    return page;
  }

  getDifficultyBadgeClass(difficulty: string): string {
    switch (difficulty) {
      case 'Easy': return 'border-green-500 text-green-600';
      case 'Medium': return 'border-yellow-500 text-yellow-600';
      case 'Hard': return 'border-red-500 text-red-600';
      default: return 'border-gray-500 text-gray-600';
    }
  }

  getCrowdBadgeClass(crowd: string): string {
    switch (crowd) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}