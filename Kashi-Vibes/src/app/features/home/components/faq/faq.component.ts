import { Component } from '@angular/core';
import { Faq } from '../../models/interface/faq';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Minus, Plus } from 'lucide-angular';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  openItems: number[] = [];

  readonly minusIcon = Minus;
  readonly plusIcon = Plus;

  faqData: Faq[] = [
    {
      question: "What is the best time to visit Varanasi?",
      answer: "The best time to visit Varanasi is from October to March when the weather is pleasant and comfortable for sightseeing. Winter months (December-February) are ideal with temperatures ranging from 10-25°C. Avoid monsoon season (July-September) due to heavy rainfall."
    },
    {
      question: "Do you provide pickup and drop services?",
      answer: "Yes, we provide convenient pickup and drop services from your hotel, railway station, or airport in Varanasi. Our comfortable, air-conditioned vehicles ensure a hassle-free journey. Pickup times are coordinated based on your tour schedule and location."
    },
    {
      question: "Are the boat rides safe for children and elderly?",
      answer: "Absolutely! Safety is our top priority. All our boats are equipped with life jackets and safety equipment. Our experienced boatmen are trained in water safety. We use stable, traditional wooden boats and avoid rough weather conditions. Children must be accompanied by adults."
    },
    {
      question: "Can I customize my tour package?",
      answer: "Yes, we offer flexible tour customization to match your interests and schedule. You can add or remove destinations, adjust timing, include special ceremonies, or request private guides. Contact our team 48 hours in advance for customization requests."
    },
    {
      question: "What should I wear when visiting temples?",
      answer: "Dress modestly when visiting temples. Wear full-length pants or long skirts, and shirts with sleeves. Remove shoes before entering temple premises. Avoid leather items in some temples. We recommend comfortable walking shoes and carrying a shawl for covering shoulders if needed."
    },
    {
      question: "Do you offer vegetarian meal options?",
      answer: "Yes, we exclusively offer delicious vegetarian meal options prepared with fresh, local ingredients. Our meals include traditional Banarasi cuisine, pure vegetarian thalis, and special dietary requirements can be accommodated with advance notice. All food is prepared maintaining high hygiene standards."
    }
  ];
  
  toggleItem(index: number): void {
    if (this.openItems.includes(index)) {
      this.openItems = this.openItems.filter(i => i != index);
    } else {
      this.openItems = [...this.openItems, index];
    }
  }

  isItemOpen(index: number): boolean {
    return this.openItems.includes(index);
  }
}
