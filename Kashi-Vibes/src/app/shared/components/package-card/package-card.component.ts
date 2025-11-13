import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Calendar, CheckCircle, Clock, Heart, LucideAngularModule, MapPin, Share2, Star, Users } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../ui/badge/badge.component';
import { ButtonComponent } from '../button/button/button.component';
import { Package } from '../../models/interface/package';



@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, BadgeComponent, ButtonComponent],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css']
})
export class PackageCardComponent {
  @Input() package!: Package;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Input() isWishlisted: boolean = false;
  @Output() wishlistToggle = new EventEmitter<Package>();
  @Output() shareClick = new EventEmitter<Package>();
  @Output() viewDetails = new EventEmitter<Package>();
  @Output() bookNow = new EventEmitter<Package>();

  // Lucide icons
  readonly mapPinIcon = MapPin;
  readonly calendarIcon = Calendar;
  readonly starIcon = Star;
  readonly usersIcon = Users;
  readonly heartIcon = Heart;
  readonly shareIcon = Share2;
  readonly clockIcon = Clock;
  readonly checkCircleIcon = CheckCircle;

  get discountPercentage(): number {
    if (!this.package.originalPrice || this.package.originalPrice <= this.package.price) {
      return 0;
    }
    return Math.round(((this.package.originalPrice - this.package.price) / this.package.originalPrice) * 100);
  }

  onWishlistToggle(event: Event): void {
    event.stopPropagation();
    this.wishlistToggle.emit(this.package);
  }

  onShareClick(event: Event): void {
    event.stopPropagation();
    this.shareClick.emit(this.package);
  }

  onViewDetails(event: Event): void {
    event.stopPropagation();
    this.viewDetails.emit(this.package);
  }

  onBookNow(event: Event): void {
    event.stopPropagation();
    this.bookNow.emit(this.package);
  }
}