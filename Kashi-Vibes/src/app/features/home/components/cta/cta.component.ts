import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookOpen, LucideAngularModule, Mail, PhoneCall, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-cta',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {

  readonly PhoneCall = PhoneCall;
  readonly Mail = Mail;
  readonly Sparkles = Sparkles;
  readonly Bookopen = BookOpen;

  // Contact information
  contactInfo = {
    phone: '+91 98765 43210',
    email: 'info@varanasispiritual.com',
    phoneLink: 'tel:+919876543210',
    emailLink: 'mailto:info@varanasispiritual.com'
  };

  // Animation states
  isVisible = false;

  ngOnInit() {
    // Trigger animation after component initialization
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  // Method to handle smooth scrolling to contact section
  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
