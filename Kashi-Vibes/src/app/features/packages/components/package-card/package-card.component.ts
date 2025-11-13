import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Package } from '../../models/interface/package';
import { Calendar, CheckCircle, Clock, Heart, LucideAngularModule, MapPin, Share2, Star, Users } from 'lucide-angular';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button/button.component';
@Component({
  selector: 'app-package-card',
  imports: [LucideAngularModule, BadgeComponent, ButtonComponent],
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.css'
})
export class PackageCardComponent {
  @Input() package!: Package;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() wishlistToggle = new EventEmitter<number>();
  @Output() shareClick = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<number>();
  @Output() bookNow = new EventEmitter<number>();

  isWishlisted = false;

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
    return Math.round(((this.package.originalPrice - this.package.price) / this.package.originalPrice) * 100);
  }

  onWishlistToggle(event: Event): void {
    event.stopPropagation();
    this.isWishlisted = !this.isWishlisted;
    this.wishlistToggle.emit(this.package.id);
  }

  onShareClick(event: Event): void {
    event.stopPropagation();
    this.shareClick.emit(this.package.id);
  }

  onViewDetails(event: Event): void {
    event.stopPropagation();
    this.viewDetails.emit(this.package.id);
  }

  onBookNow(event: Event): void {
    event.stopPropagation();
    this.bookNow.emit(this.package.id);
  }
}
