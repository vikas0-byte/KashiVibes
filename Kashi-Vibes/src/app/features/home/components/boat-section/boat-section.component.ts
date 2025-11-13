import { Component, computed, signal } from '@angular/core';
import { TourCard, TourFilter } from '../../models/interface/tour-card';
import { CommonModule } from '@angular/common';
import { BoatRideComponent } from '../boat-ride/boat-ride.component';

@Component({
  selector: 'app-boat-section',
  imports: [CommonModule, BoatRideComponent],
  templateUrl: './boat-section.component.html',
  styleUrl: './boat-section.component.css'
})
export class BoatSectionComponent {

  activeFilter = signal<TourFilter>('all')

  tours: TourCard[] = [
    {
      image: 'assets/boats/boat1.jpeg',
      title: "Traditional Hand Boat - Sacred Sunrise Experience",
      description: "Experience the mystical awakening of Varanasi with our traditional hand-operated wooden boats. Perfect for intimate sunrise tours along the sacred Ganges, offering unobstructed views of the ancient ghats and mesmerizing morning rituals performed by devotees.",
      price: "₹4,000",
      originalPrice: "₹5,200",
      discount: "23%",
      transportType: "Hand Boat",
      transportIcon: "hand",
      capacity: "2-4 people",
      duration: "1.5 hours",
      rating: 4.9,
      reviews: 256,
      availableTimes: ["5:30 AM", "6:00 AM", "6:30 AM"],
      location: "Dashashwamedh Ghat, Varanasi",
      isPopular: true
    },
    {
      image: 'assets/boats/boat2.jpg',
      title: "Motor Boat - Evening Ganga Aarti Special",
      description: "Join our comfortable motor boat for the spectacular evening Ganga Aarti ceremony. With enhanced stability and spacious seating, enjoy the divine experience from the best vantage point on the river while witnessing the spiritual grandeur and floating diyas illuminating the water.",
      price: "₹2,400",
      originalPrice: "₹3,200",
      discount: "25%",
      transportType: "Motor Boat",
      transportIcon: "motor",
      capacity: "6-12 people",
      duration: "2 hours",
      rating: 4.9,
      reviews: 189,
      availableTimes: ["6:00 PM", "6:30 PM", "7:00 PM"],
      location: "Manikarnika Ghat, Varanasi"
    },
    {
      image: 'assets/boats/boat3.jpg',
      title: "Private Sunset Rowing Experience",
      description: "Escape the crowds with our exclusive private sunset boat tour. Navigate the tranquil waters as the golden sun sets behind the ancient temples, creating a perfect romantic ambiance with personalized service and traditional refreshments included.",
      price: "₹6,000",
      transportType: "Private Hand Boat",
      transportIcon: "hand",
      capacity: "2 people",
      duration: "2.5 hours",
      rating: 5.0,
      reviews: 98,
      availableTimes: ["5:00 PM", "5:30 PM", "6:00 PM"],
      location: "Assi Ghat, Varanasi"
    }
  ];

  getTabClasses(filter: TourFilter): string {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all";
  
  if (this.activeFilter() === filter) {
    return `${baseClasses} bg-white text-black shadow-sm`;
  } else {
    return `${baseClasses} text-gray-600 hover:bg-gray-100 hover:text-gray-900`;
  }
}

  // computed filter tours

  filteredTours = computed(() => {
    const filter = this.activeFilter();

    return this.tours.filter(tour => {
      if (filter === 'all') return true;
      if (filter === 'hand') return tour.transportIcon === 'hand';
      if (filter === 'motor') return tour.transportIcon === 'motor';
      if (filter === 'popular') return tour.isPopular;
      return true;
    });
  });

  onFilterChange(value: string) {
    if (value === 'all' || value === 'hand' || value === 'motor' || value === 'popular') {
      this.activeFilter.set(value);
    } else {
      this.activeFilter.set('all');
    }
  }
  
}
