import { Injectable } from '@angular/core';
import { Testimonials } from '../models/interface/testimonials';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  private testimonials: Testimonials[] = [
    {
    id: 1,
    name: "Sarah Johnson",
    location: "United States",
    tour: "Ganga Sunrise Boat Ride",
    text: "Absolutely incredible experience! The boat ride during sunrise was magical, and our guide was so knowledgeable about the spiritual significance of each ghat. This trip changed my perspective on spirituality and inner peace.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Raj Patel",
    location: "Mumbai, India", 
    tour: "Varanasi 5N/6D Family Package",
    text: "Perfect family trip to Varanasi. The 5-day tour was well organized, and the hotel was comfortable. My children learned so much about our culture and heritage. Highly recommended for families!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Marco Rossi",
    location: "Italy",
    tour: "Spiritual Heritage Tour",
    text: "The spiritual depth of this place is unmatched. Our guide helped us understand the rituals and significance of each temple. Every moment was filled with wonder and enlightenment.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
  ];
  
  getTestimonials(): Testimonials[] {
    return this.testimonials;
  }
}
