import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Camera, Clock, LucideAngularModule, Users } from 'lucide-angular';

@Component({
  selector: 'app-services',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  readonly clock = Clock;
  readonly Users = Users;
  readonly Camera = Camera;
  services = [
    {
      id: 1,
      title: 'Spiritual Awakening Tours',
      description: 'Experience the divine energy of Varanasi with our guided spiritual tours. Visit ancient temples, participate in evening aarti, and take a peaceful boat ride at sunrise.',
      image: 'assets/Premiumexpo/spiritual-tour.jpg',
      duration: '3-7 Days',
      groupSize: '2-15 People',
      highlights: ['Ganga Aarti Experience', 'Temple Visits', 'Boat Rides', 'Meditation Sessions'],
      price: 'Starting from ₹15,000'
    },
    {
      id: 2,
      title: 'Cultural Heritage Journeys',
      description: 'Dive deep into India\'s rich cultural heritage with our comprehensive tours covering historical sites, traditional arts, and local customs.',
      image: 'assets/Premiumexpo/heritage-tour.jpg',
      duration: '5-10 Days',
      groupSize: '4-20 People',
      highlights: ['Historical Monuments', 'Art & Craft Tours', 'Local Cuisine', 'Cultural Shows'],
      price: 'Starting from ₹25,000'
    }
  ];
}
