import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarIcon, HotelIcon, LucideAngularModule, MapIcon, PlaneIcon, ShipIcon, SparklesIcon } from 'lucide-angular';

@Component({
  selector: 'app-serviceprovider',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './serviceprovider.component.html',
  styleUrl: './serviceprovider.component.css'
})
export class ServiceproviderComponent {
readonly CarIcon = CarIcon;
readonly ShipIcon = ShipIcon;
readonly HotelIcon = HotelIcon;
readonly SparklesIcon = SparklesIcon;
readonly MapIcon = MapIcon;
readonly PlaneIcon = PlaneIcon;

services = [
    { 
      label: "CAB", 
      gradient: "from-orange-400 to-orange-600",
      iconComponent: CarIcon 
    },
    { 
      label: "BOAT RIDE", 
      gradient: "from-blue-400 to-blue-600",
      iconComponent: ShipIcon 
    },
    { 
      label: "HOTELS", 
      gradient: "from-amber-400 to-amber-600",
      iconComponent: HotelIcon 
    },
    { 
      label: "DARSHAN", 
      gradient: "from-rose-400 to-rose-600",
      iconComponent: SparklesIcon 
    },
    { 
      label: "SIGHTSEEING", 
      gradient: "from-teal-400 to-teal-600",
      iconComponent: MapIcon 
    },
    { 
      label: "AIRPORT PICK & DROP", 
      gradient: "from-indigo-400 to-indigo-600",
      iconComponent: PlaneIcon 
    }
  ];
}
