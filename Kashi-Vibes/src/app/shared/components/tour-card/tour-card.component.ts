import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Calendar, Check, LucideAngularModule, MapPin, Star, Users } from 'lucide-angular';
import { Tour, TourCardProps  } from '../../../features/home/models/interface/tour';
import { BadgeComponent } from '../ui/badge/badge.component';
import { cn } from '../../utils/cn';


@Component({
  selector: 'app-tour-card',
  imports: [CommonModule, LucideAngularModule,BadgeComponent],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent {

  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly Users = Users;
  readonly Star = Star;
  readonly Check = Check;

  @Input({ required: true }) tour!: Tour;

  // Output events for parent Component
  @Output() viewDetails = new EventEmitter<Tour>();
  @Output() bookNow = new EventEmitter<Tour>();

  constructor(
    private elementRef: ElementRef
  ) {}

  getBadgeVariant(badgeText: string): 'default' | 'secondary' | 'destructive' {
    switch (badgeText.toLowerCase()) {
      case 'popular': return 'default'
      case 'f': return 'secondary';
      case 'sale': return 'destructive';
      default: return 'secondary';
    }
  }

  // FormatPrice

  formatPrice(price: number): string {
    return price.toLocaleString('en-IN')
  }

  // Event Handlers

  onViewDetails(event: Event): void {
    event.stopPropagation();
    this.viewDetails.emit(this.tour);
  }

  onBookNow(event: Event): void {
    event.stopPropagation();
    this.bookNow.emit(this.tour);
  }

  // Utility method for conditional classes
  cn = cn;
}
