import { Injectable, signal, computed, inject } from '@angular/core';
import { FoodFilterState, FoodSpot, FoodSpotResponse } from '../models/interface/food-spot.interface';
import { DIFFICULTY_LEVELS, FOOD_TYPES } from '../data/food-spots.data';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodSpotsService {
 
  private jsonUrl = 'https://localhost:7084/data/food-spot.json';

  // STATE MANAGEMENT USING SIGNALS
  private allFoodSpots = signal<FoodSpot[]>([]);
  private filterState = signal<FoodFilterState>({
    priceRange: [20, 200],
    selectedType: 'all',
    selectedDifficulty: 'all',
    searchQuery: '',
    featuredOnly: false
  });

  constructor (private http: HttpClient) {
    this.http.get<FoodSpot[]>(this.jsonUrl).subscribe(data => {
      console.log("loaded data from backend:", data);
      this.allFoodSpots.set(data);
    });
  }




  //COMPUTED VALUES
  filteredFoodSpots = computed(() => {
    let spots = this.allFoodSpots();
    const filters = this.filterState();

    console.log('Service - Total spots:', spots.length);
    console.log('Service - Current filters:', filters);

    // Search Filter
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      spots = spots.filter(spot =>
        spot.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        spot.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        spot.location.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Price Range Filter
    spots = spots.filter(spot =>
      spot.price >= filters.priceRange[0] && spot.price <= filters.priceRange[1]
    );

    //  FIX: Type Filter - empty string ko 'all' treat karo
    if (filters.selectedType && filters.selectedType !== 'all' && filters.selectedType.trim() !== '') {
      spots = spots.filter(spot =>
        spot.type.toLowerCase() === filters.selectedType.toLowerCase()
      );
    }

    //  FIX: Difficulty Filter - empty string ko 'all' treat karo
    if (filters.selectedDifficulty && filters.selectedDifficulty !== 'all' && filters.selectedDifficulty.trim() !== '') {
      spots = spots.filter(spot =>
        spot.difficulty.toLowerCase() === filters.selectedDifficulty.toLowerCase()
      );
    }

    // Featured Filter
    if (filters.featuredOnly) {
      spots = spots.filter(spot => spot.featured);
    }

    console.log('Service - Filtered spots:', spots.length);
    return spots;
  });

  totalFoodSpots = computed(() => this.filteredFoodSpots().length);
  currentFilters = computed(() => this.filterState());

  //  GETTERS FOR CONSTANTS
  getFoodTypes() {
    return FOOD_TYPES;
  }

  getDifficultyLevels() {
    return DIFFICULTY_LEVELS;
  }

  //  FILTER METHODS
  updatePriceRange(priceRange: [number, number]) {
    this.filterState.update(state => ({
      ...state,
      priceRange
    }));
  }

 updateSelectedType(type: string) {
    //  Empty string ko 'all' mein convert karo
    const selectedType = (type && type.trim() !== '') ? type : 'all';
    this.filterState.update(state => ({
      ...state,
      selectedType
    }));
  }

  updateSelectedDifficulty(difficulty: string) {
    //  Empty string ko 'all' mein convert karo
    const selectedDifficulty = (difficulty && difficulty.trim() !== '') ? difficulty : 'all';
    this.filterState.update(state => ({
      ...state,
      selectedDifficulty
    }));
  }

  updateSearchQuery(query: string) {
    this.filterState.update(state => ({
      ...state,
      searchQuery: query
    }));
  }

  toggleFeaturedOnly() {
    this.filterState.update(state => ({
      ...state,
      featuredOnly: !state.featuredOnly
    }));
  }

  resetFilters() {
    this.filterState.set({
      priceRange: [20, 200],
      selectedType: 'all',
      selectedDifficulty: 'all',
      searchQuery: '',
      featuredOnly: false
    });
  }

  //  DATA METHODS
  getAllFoodSpots(): FoodSpot[] {
    return this.allFoodSpots();
  }

  getFoodSpotById(id: number): FoodSpot | undefined {
    return this.allFoodSpots().find(spot => spot.id === id);
  }

  getFeaturedFoodSpots(): FoodSpot[] {
    return this.allFoodSpots().filter(spot => spot.featured);
  }

  getFoodSpotsByType(type: string): FoodSpot[] {
    return this.allFoodSpots().filter(spot => spot.type === type);
  }

  //  PAGINATION METHODS
  getPaginatedFoodSpots(page: number, pageSize: number): FoodSpotResponse {
    const filteredSpots = this.filteredFoodSpots();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedSpots = filteredSpots.slice(startIndex, endIndex);

    return {
      data: paginatedSpots,
      total: filteredSpots.length,
      page,
      totalPages: Math.ceil(filteredSpots.length / pageSize)
    };
  }

  //  UTILITY METHODS
  getPriceRange(): { min: number; max: number } {
    const spots = this.allFoodSpots();
    const prices = spots.map(spot => spot.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  getStats() {
    const spots = this.allFoodSpots();
    return {
      totalSpots: spots.length,
      averageRating: +(spots.reduce((sum, spot) => sum + spot.rating, 0) / spots.length).toFixed(1),
      averagePrice: +(spots.reduce((sum, spot) => sum + spot.price, 0) / spots.length).toFixed(0),
      types: [...new Set(spots.map(spot => spot.type))],
      difficulties: [...new Set(spots.map(spot => spot.difficulty))]
    };
  }

  setAllFoodSpots(spots: FoodSpot[]) {
    this.allFoodSpots.set(spots);
  }
}