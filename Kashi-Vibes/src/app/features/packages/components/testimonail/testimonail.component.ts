import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Quote, Star } from 'lucide-angular';

interface Testimonial {
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  package: string;
}

@Component({
  selector: 'app-testimonail',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './testimonail.component.html',
  styleUrl: './testimonail.component.css'
})
export class TestimonailComponent {
  readonly starIcon = Star;
  readonly quoteIcon = Quote;

  testimonials: Testimonial[] = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      image: "",
      rating: 5,
      text: "The Varanasi 5N/6D package was absolutely divine. Our guide Pandit ji explained the significance of each ritual and temple. The Ganga Aarti experience was life-changing. Highly recommended!",
      package: "Varanasi 5N/6D Package"
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      image: "",
      rating: 5,
      text: "Sacred Journeys made our Char Dham Yatra so comfortable and spiritual. The arrangements were perfect, and our guide's knowledge about Hindu scriptures was amazing. Will definitely book again!",
      package: "Char Dham Yatra"
    },
    {
      name: "Amit Patel",
      location: "Ahmedabad",
      image: "",
      rating: 5,
      text: "The street food tour in Varanasi was incredible! We discovered hidden gems and tasted authentic flavors. The guide knew all the best spots that tourists usually miss. Perfect blend of food and culture!",
      package: "Street Food & Hidden Gems"
    },
    {
      name: "Sunita Devi",
      location: "Kolkata",
      image: "",
      rating: 5,
      text: "Visiting Ayodhya and Varanasi together was a dream come true. The spiritual energy at Ram Janmabhoomi was overwhelming. Sacred Journeys handled everything perfectly - transportation, accommodation, everything!",
      package: "Varanasi to Ayodhya Package"
    }
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}
