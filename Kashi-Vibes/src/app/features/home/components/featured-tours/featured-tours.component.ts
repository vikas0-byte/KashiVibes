import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourCardComponent } from '../../../../shared/components/tour-card/tour-card.component';
import { Tour } from '../../models/interface/tour';

@Component({
  selector: 'app-featured-tours',
  imports: [CommonModule, RouterModule, TourCardComponent],
  templateUrl: './featured-tours.component.html',
  styleUrl: './featured-tours.component.css'
})
export class FeaturedToursComponent {

  readonly varanasiSpiritual = 'assets/features-tour/ganga-maiya.jpeg';
  readonly bodhgayaBuddhist = 'assets/features-tour/bodhgaya-buddhist.jpg';
  readonly ayodhyaRamTemple = 'assets/features-tour/ramji.webp';

  tours: Tour[] = [
    {
      image: this.varanasiSpiritual,
      title: "Varanasi Spiritual Journey",
      location: "Varanasi, India",
      price: 24999,
      duration: "5 Nights 6 Days",
      people: 15,
      badge: "Popular",
      rating: 4.8,
      highlights: [
        "Morning boat ride on sacred Ganga",
        "Evening Ganga Aarti at Dashashwamedh Ghat",
        "Visit to Kashi Vishwanath Temple",
        "Sarnath Buddhist site exploration",
        "Traditional silk weaving workshop",
        "Authentic Banarasi cuisine experience"
      ]
    },
    {
      image: this.bodhgayaBuddhist,
      title: "Varanasi to Bodhgaya Buddhist Circuit",
      location: "Bodhgaya, India",
      price: 34999,
      duration: "7 Nights 8 Days",
      people: 20,
      badge: "New",
      rating: 5,
      highlights: [
        "Explore the birth city of Buddhism in Sarnath",
        "Visit the sacred Bodhi Tree in Bodhgaya",
        "Meditation sessions at Buddhist monasteries",
        "Nalanda University ruins exploration",
        "Rajgir hot springs visit",
        "Vulture Peak meditation"
      ]
    },
    {
      image: this.ayodhyaRamTemple,
      title: "Varanasi to Ayodhya Spiritual Circuit",
      location: "Ayodhya, India",
      price: 19999,
      duration: "3 Nights 4 Days",
      people: 12,
      badge: "Popular",
      rating: 4.9,
      highlights: [
        "Visit the birthplace of Lord Rama in Ayodhya",
        "Explore newly constructed Ram Temple",
        "Sacred Ganga Aarti in Varanasi",
        "Hanuman Garhi temple visit",
        "Kanak Bhawan darshan"
      ]
    }
  ];

  // Helper method to generate slug from title

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  // Alternative: Dynamic slug generation

  getTourWithSlugs(): Tour[] {
    return this.tours.map((tour, index) => ({
      ...tour,
      id: index +1,
      slug: this.generateSlug(tour.title),
      category: 'spiritual'
    }));
  }

  trackByTourTitle(index: number, tour: Tour): string {
    return tour.title;
  }

}
