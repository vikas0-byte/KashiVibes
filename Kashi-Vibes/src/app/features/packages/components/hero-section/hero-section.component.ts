import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, MapPin, Package, Star, Users } from 'lucide-angular';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  heroImage = 'assets/packages/herosection/kashi-vishwanath-hero.jpg'; 

  @Output() onCustomPackage = new EventEmitter<void>();
  

  readonly Package = Package;
  readonly MapPin = MapPin;
  readonly Users = Users;
  readonly Star = Star;
}
