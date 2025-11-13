import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star, MessageCircle, Calendar, Phone } from 'lucide-angular';
import { BadgeComponent } from '../../../../../../shared/components/ui/badge/badge.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button/button.component';

interface WhyChooseItem {
  icon: string;
  title: string;
  desc: string;
}

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

interface FeatureCard {
  icon: any;
  title: string;
  subtitle: string;
  detail: string;
}

interface TrustBadge {
  icon: string;
  text: string;
}


@Component({
  selector: 'app-street-food-content',
  imports: [CommonModule, LucideAngularModule, BadgeComponent, ButtonComponent],
  templateUrl: './street-food-content.component.html',
  styleUrl: './street-food-content.component.css'
})
export class StreetFoodContentComponent {
   readonly starIcon = Star;
  readonly messageCircleIcon = MessageCircle;
  readonly calendarIcon = Calendar;
  readonly phoneIcon = Phone;

  // ✅ WHY CHOOSE US DATA
  whyChooseItems: WhyChooseItem[] = [
    { icon: "🏆", title: "Award Winning", desc: "Best food tour 2024" },
    { icon: "👨‍🍳", title: "Expert Guides", desc: "Local food experts" },
    { icon: "🎯", title: "Authentic", desc: "100% genuine spots" },
    { icon: "❤️", title: "500+ Reviews", desc: "5-star rated" }
  ];

  // ✅ TESTIMONIALS DATA
  testimonials: Testimonial[] = [
    { name: "Priya Sharma", rating: 5, text: "Best food experience in Varanasi! The guide knew every hidden gem. Absolutely worth it!", avatar: "👩" },
    { name: "Rahul Verma", rating: 5, text: "Amazing flavors and cultural insights. The lassi shop was incredible. Highly recommended!", avatar: "👨" },
    { name: "Anjali Singh", rating: 5, text: "Perfect introduction to Kashi's food culture. Professional guide, authentic spots, unforgettable taste!", avatar: "👩‍🦰" }
  ];

  // ✅ FEATURE CARDS DATA
  featureCards: FeatureCard[] = [
    { icon: this.calendarIcon, title: "Available Daily", subtitle: "Morning & Evening Slots", detail: "Flexible timings for you" },
    { icon: this.phoneIcon, title: "Instant Confirmation", subtitle: "Quick & Easy Booking", detail: "Confirmed within minutes" },
    { icon: this.messageCircleIcon, title: "24/7 Support", subtitle: "Always Here to Help", detail: "Expert assistance anytime" }
  ];

  // ✅ TRUST BADGES DATA
  trustBadges: TrustBadge[] = [
    { icon: "✓", text: "100% Safe & Hygienic" },
    { icon: "✓", text: "Expert Local Guides" },
    { icon: "✓", text: "Free Cancellation" },
    { icon: "✓", text: "Best Price Guaranteed" }
  ];

  // ✅ TRACK BY FUNCTIONS
  trackByWhyChoose(index: number, item: WhyChooseItem): string {
    return item.title;
  }

  trackByTestimonial(index: number, item: Testimonial): string {
    return item.name;
  }

  trackByFeature(index: number, item: FeatureCard): string {
    return item.title;
  }

  trackByTrustBadge(index: number, item: TrustBadge): string {
    return item.text;
  }

  // ✅ STAR ARRAY FOR RATING
  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
