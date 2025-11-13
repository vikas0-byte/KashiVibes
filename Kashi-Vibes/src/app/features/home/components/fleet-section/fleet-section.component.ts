import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarIcon, ClockIcon, LucideAngularModule, ShieldIcon, UsersIcon } from 'lucide-angular';

@Component({
  selector: 'app-fleet-section',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './fleet-section.component.html',
  styleUrl: './fleet-section.component.css'
})
export class FleetSectionComponent {
  readonly CarIcon = CarIcon;
  readonly UsersIcon = UsersIcon;
  readonly ShieldIcon = ShieldIcon;
  readonly ClockIcon = ClockIcon;


  vehicles = [
  {
      name: "INNOVA CRYSTA",
      image: "/assets/cab/innova-crysta.jpg",
      capacity: "7 Seater",
      description: "Premium SUV for comfortable family travel",
    },
    {
      name: "SWIFT DZIRE",
      image: "/assets/cab/swift-dzire.jpg",
      capacity: "4 Seater",
      description: "Compact sedan perfect for small groups",
    },
    {
      name: "TEMPO TRAVELLER",
      image: "/assets/cab/tempo-traveller.jpg",
      capacity: "12-17 Seater",
      description: "Ideal for group pilgrimages and tours",
    },
    {
      name: "MARUTI SUZUKI ERTIGA",
      image: "/assets/cab/maruti-ertiga.jpg",
      capacity: "6-7 Seater",
      description: "Spacious MPV for comfortable journeys",
    },
    {
      name: "VOLVO BUS",
      image: "/assets/cab/volvo-bus.jpg",
      capacity: "40+ Seater",
      description: "Luxury coach for large group travel",
    },
  ];

  features = [
    { label: "Well Maintained Fleet" },
    { label: "Experienced Drivers" },
    { label: "Safe & Secure" },
    { label: "24/7 Service" },
  ];
}
