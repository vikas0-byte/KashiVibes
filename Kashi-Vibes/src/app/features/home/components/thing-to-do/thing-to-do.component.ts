import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Clock, LucideAngularModule, Users } from 'lucide-angular';

@Component({
  selector: 'app-thing-to-do',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './thing-to-do.component.html',
  styleUrl: './thing-to-do.component.css'
})
export class ThingToDoComponent {

  readonly Clock = Clock;
  readonly Users = Users;
  activities = [
    {
      id: 1,
      title: "Kashi Vishwanath Darshan",
      image: "/assets/thingstodo/kashi-vishwanath.jpg",
      duration: "2 hours",
      category: "Temple Visit",
      description: "Divine darshan at the most sacred Shiva temple in Varanasi",
      participants: "2-20 people"
    },
    {
      id: 2,
      title: "Kalbhairav Temple Darshan",
      image: "/assets/thingstodo/kalbhairav-temple.jpg",
      duration: "1.5 hours",
      category: "Temple Visit",
      description: "Visit the mystical temple of Lord Kalbhairav, protector of Kashi",
      participants: "2-15 people"
    },
    {
      id: 3,
      title: "Annapurna Temple Darshan",
      image: "/assets/thingstodo/annapurna-temple.jpg",
      duration: "1 hour",
      category: "Temple Visit",
      description: "Seek blessings from Goddess Annapurna for food and nourishment",
      participants: "2-25 people"
    },
    {
      id: 4,
      title: "Sankat Mochan Darshan",
      image: "/assets/thingstodo/sankat-mochan.jpg",
      duration: "1.5 hours",
      category: "Temple Visit",
      description: "Visit the famous Hanuman temple for removing obstacles",
      participants: "2-20 people"
    },
    {
      id: 5,
      title: "Durgakund Temple Darshan",
      image: "/assets/thingstodo/durgakund-temple.jpg",
      duration: "1 hour",
      category: "Temple Visit",
      description: "Pay respects at the ancient temple dedicated to Goddess Durga",
      participants: "2-15 people"
    },
    {
      id: 6,
      title: "Ganga Aarti at Dashashwamedh Ghat",
      image: "/assets/thingstodo/ganga-aarti.jpg",
      duration: "2 hours",
      category: "Spiritual Ceremony",
      description: "Witness the mesmerizing evening prayer ceremony by the holy Ganges",
      participants: "All"
    },
    {
      id: 7,
      title: "Evening Boat Ride",
      image: "/assets/thingstodo/boat-ride.jpg",
      duration: "1.5 hours",
      category: "River Experience",
      description: "Peaceful boat journey on the sacred Ganges during sunset",
      participants: "2-8 people"
    },
    {
      id: 8,
      title: "Sarnath Tour",
      image: "/assets/thingstodo/sarnath.jpg",
      duration: "3 hours",
      category: "Historical Site",
      description: "Explore the birthplace of Buddhism and ancient Buddhist ruins",
      participants: "2-30 people"
    },
    {
      id: 9,
      title: "Banarasi Saree Shopping",
      image: "/assets/thingstodo/banarasi-saree.jpg",
      duration: "2-3 hours",
      category: "Cultural Shopping",
      description: "Discover exquisite handwoven silk sarees famous worldwide",
      participants: "2-10 people"
    },
    {
      id: 10,
      title: "Ramnagar Fort",
      image: "/assets/thingstodo/ramnagar-fort.jpg",
      duration: "2 hours",
      category: "Historical Site",
      description: "Visit the magnificent 18th century fort and museum",
      participants: "2-25 people"
    }
  ];

  getParticipantCount(participants: string): string {
    return participants.split(' ')[0];
  }

}
