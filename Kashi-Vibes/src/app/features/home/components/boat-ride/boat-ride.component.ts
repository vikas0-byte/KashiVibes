import { Component, Input, signal } from '@angular/core';
import { TourCard } from '../../models/interface/tour-card';
import { cn } from '../../../../shared/utils/cn';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/ui/card/card.component';
import { CardContent, CardHeader, CardTitle } from '../../../../shared/components/ui/card';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';
import { Calendar, Clock, Heart, LucideAngularModule, MapPin, Star, Users } from 'lucide-angular';


@Component({
  selector: 'app-boat-ride',
  imports: [CommonModule, CardComponent, CardTitle, CardHeader, BadgeComponent, LucideAngularModule, CardContent],
  templateUrl: './boat-ride.component.html',
  styleUrl: './boat-ride.component.css'
})
export class BoatRideComponent {

  @Input({ required: true}) tour!: TourCard;

  readonly heart = Heart;
  readonly map = MapPin;
  readonly Users = Users;
  readonly Clock = Clock;
  readonly Star = Star;
  readonly Calendar = Calendar;

  //signal for use state
  isLiked = signal(false);
  isHovered = signal(false);

  // computed propertiese for dynamic class

  getcomputedCardClasses() {
    return cn(
      "group overflow-hidden transition-all duration-500 bg-gradient-to-br from-card to-muted/20",
      "hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2",
      "border border-border/50 hover:border-primary/30",
      this.tour.isPopular && "ring-2 ring-primary/30 shadow-lg"
    )
  }

  getcomputedImageClasses() {
    return cn(
      "w-full h-72 bg-cover bg-center transition-transform duration-700",
      this.isHovered() && "scale-110"
    )
  }

  getBadgeVariant(badgeText: string): 'default' | 'secondary' | 'destructive' {
    switch (badgeText.toLowerCase()) {
      case 'popular': return 'default'
      case 'featured': return 'secondary';
      case 'sale': return 'destructive';
      default: return 'secondary';
    }
  }

  get computedLikeButtonClasses() {
    return cn(
      "absolute bottom-4 right-4 p-2 rounded-full transition-all duration-300",
      "bg-white/80 backdrop-blur-sm hover:bg-white",
      this.isLiked() ? "text-red-500 scale-110" : "text-muted-foreground hover:text-red-500"
    );
  }

  get computedHeartIconClasses() {
    return cn("w-5 h-5", this.isLiked() && "fill-current");
  }

  getTransportIcon(): string {
    return this.tour.transportIcon === 'hand' ? '🛶' : '🚤';
  }

  toggleLike() {
    this.isLiked.update(value => !value);
  }

  getStarClasses(starNumber: number): string {
    return cn(
      "w-4 h-4",
      starNumber <= Math.floor(this.tour.rating) 
        ? "fill-accent text-accent" 
        : "text-muted-foreground/30"
    );
  }

}
