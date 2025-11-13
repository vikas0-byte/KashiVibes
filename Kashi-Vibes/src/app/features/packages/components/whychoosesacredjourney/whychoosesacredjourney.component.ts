import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LucideAngularModule, Users, Shield, Clock, Star, Heart, MapPin } from 'lucide-angular';

interface Indicator {
  icon: any;
  title: string;
  description: string;
}

@Component({
  selector: 'app-whychoosesacredjourney',
  imports: [CommonModule, MatCardModule, LucideAngularModule],
  templateUrl: './whychoosesacredjourney.component.html',
  styleUrl: './whychoosesacredjourney.component.css'
})
export class WhychoosesacredjourneyComponent {
  readonly usersIcon = Users;
  readonly shieldIcon = Shield;
  readonly clockIcon = Clock;
  readonly starIcon = Star;
  readonly heartIcon = Heart;
  readonly mapPinIcon = MapPin;

  indicators: Indicator[] = [
    {
      icon: this.usersIcon,
      title: 'Expert Guides',
      description: 'Knowledgeable spiritual guides with deep understanding of sacred traditions and rituals.'
    },
    {
      icon: this.shieldIcon,
      title: 'Safe & Secure',
      description: 'Your safety and comfort are our top priority with verified accommodations and transport.'
    },
    {
      icon: this.clockIcon,
      title: 'Flexible Itineraries',
      description: 'Customizable schedules that respect your pace and spiritual needs.'
    },
    {
      icon: this.starIcon,
      title: 'Authentic Experiences',
      description: 'Genuine spiritual encounters beyond tourist attractions.'
    },
    {
      icon: this.heartIcon,
      title: 'Caring Support',
      description: '24/7 customer support to ensure a smooth and meaningful journey.'
    },
    {
      icon: this.mapPinIcon,
      title: 'Sacred Destinations',
      description: 'Carefully curated routes covering the most powerful spiritual sites.'
    }
  ];
}
