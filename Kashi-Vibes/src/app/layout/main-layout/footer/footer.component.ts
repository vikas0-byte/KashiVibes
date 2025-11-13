import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapPin, Phone, Mail } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  kashiChaloLogo = 'assets/icons/logo.png';

  socialLinks = [
    { name: 'Facebook', href: '#', icon: 'fa-facebook-f' },
    { name: 'Instagram', href: '#', icon: 'fa-instagram' },
    { name: 'Twitter', href: '#', icon: 'fa-twitter' },
    { name: 'Youtube', href: '#', icon: 'fa-youtube' }
  ];

  quickLinks = [
    { name: 'About', href: '/', icon: 'fa-arrow-right' },
    { name: 'Our Service', href: '/about', icon: 'fa-arrow-right' },
    { name: 'Contact', href: '/contact', icon: 'fa-arrow-right' },
    { name: 'Privacy Policy', href: '/privacy', icon: 'fa-arrow-right' },
    { name: 'Terms & Conditions', href: '/terms', icon: 'fa-arrow-right'},
    { name: 'Disclaimer', href: '/disclaimer', icon: 'fa-arrow-right' }

  ];

  services = [
    { name: 'Spiritual', href: '/services/spiritual', icon: 'fa-hands-praying'},
    { name: 'Boat Rides', href: '/services/boat', icon: 'fa-ship'},
    { name: 'Temple Transfer', href:'/Services/temple', icon: 'fa-shuttle-van' },
    { name: 'Puja Arrangements', href: '/services/puja', icon: 'fa-gopuram' },
    { name: 'Accommodation', href: '/services/heritage', icon: 'fa-hotel'},
  ];

  popularTours = [
    'Street Food & Hidden Gems',
    'Varanasi 5N/6D',
    'Varanasi to Bodhgaya',
    'Varanasi to Ayodhya',
    'Prayagraj Vindhyachal'
  ];

  badges = [
    { text: 'Licensed Tour Operator', icon: 'fa-id-card' },
    { text: '24/7 Customer Support Payments', icon: 'fa-headset' },
    { text: 'Secure Booking', icon: 'fa-lock' },
    { text: '100% Happy Travelers', icon: 'fa-smile' }
  ];
}
