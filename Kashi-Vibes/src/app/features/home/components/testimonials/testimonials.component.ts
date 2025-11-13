import { Component, inject, OnInit } from '@angular/core';
import { Testimonials } from '../../models/interface/testimonials';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Quote, Star } from 'lucide-angular';
import { TestimonialsService } from '../../services/testimonials.service';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit {
  private testimonialsService = inject(TestimonialsService);

  testimonials: Testimonials[] = [];
  readonly starIcon = Star;
  readonly quoteIcon = Quote;

  ngOnInit(): void {
    this.testimonials = this.testimonialsService.getTestimonials();
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0)
  }

  onMouseEnter(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'translateY(-8px)';
    card.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.25)';
  }

  onMouseLeave(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  }
}
