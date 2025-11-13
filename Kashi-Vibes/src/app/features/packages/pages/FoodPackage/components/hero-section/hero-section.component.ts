import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Camera, Clock, Heart, LucideAngularModule, MapPin, Share2, Star, Users, Utensils } from 'lucide-angular';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

    // Icons
  starIcon = Star;
  clockIcon = Clock;
  usersIcon = Users;
  mapPinIcon = MapPin;
  cameraIcon = Camera;
  utensilsIcon = Utensils;
  heartIcon = Heart;
  shareIcon = Share2;

  streetFoodHero = './assets/packages/streetfood/herosection/street-food-hero.jpg';

}
