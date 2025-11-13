import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DollarSign, Headphones, LucideAngularModule, Shield, Users } from 'lucide-angular';

@Component({
  selector: 'app-why-choose-section',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './why-choose-section.component.html',
  styleUrl: './why-choose-section.component.css'
})
export class WhyChooseSectionComponent {

  readonly Shield = Shield;
  readonly Users = Users;
  readonly Headphones = Headphones;
  readonly DollarSign = DollarSign
  features = [
  {
    icon: Shield,
    title: 'Licensed & Trusted',
    description: 'Government licensed tour operator with 10+ years of experience in spiritual tourism.',
  },
  {
    icon: Users,
    title: 'Expert Local Guides',
    description: "Experienced guides with deep knowledge of Varanasi's history, culture, and spirituality.",
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to ensure your journey is smooth and memorable.',
  },
  {
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description: 'Competitive pricing with transparent costs and no hidden charges.',
  },
];

}