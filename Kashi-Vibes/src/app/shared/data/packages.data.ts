import { Package } from "../models/interface/package";


export const PACKAGES_DATA: Package[] = [
    {
      id: 1,
      title: "Street Food & Hidden Gems",
      location: "Varanasi",
      duration: "3 Days 2 Nights",
      price: 3200,
      originalPrice: 4500,
      image: "assets/packages/package/street-food-package.jpg",
      rating: 4.8,
      reviews: 156,
      category: "Food & Culture",
      highlights: ["Local street food tours", "Hidden temple visits", "Boat rides at sunrise", "Cultural workshops"],
      includes: ["Accommodation", "All meals", "Local guide", "Transportation"],
      description: "Explore Varanasi's culinary heritage and discover hidden spiritual gems known only to locals.",
      featured: true
    },
    {
      id: 2,
      title: "Varanasi 5N/6D",
      location: "Varanasi",
      duration: "6 Days 5 Nights",
      price: 18500,
      originalPrice: 22000,
      image: "assets/packages/package/varanasi-5n6d.jpg",
      rating: 4.9,
      reviews: 243,
      category: "Spiritual Tours",
      highlights: ["Kashi Vishwanath Temple", "Ganga Aarti ceremonies", "Sarnath Buddhist sites", "Traditional music & dance"],
      includes: ["Hotel accommodation", "All meals", "Expert guide", "Airport transfers", "Boat rides"],
      description: "Complete spiritual immersion in the holy city of Varanasi with expert guidance and authentic experiences.",
      featured: true
    },
    {
      id: 3,
      title: "Varanasi to Bodhgaya",
      location: "Varanasi & Bodhgaya",
      duration: "7 Days 6 Nights",
      price: 22800,
      originalPrice: 28000,
      image: "assets/packages/package/varanasi-bodhgaya.jpg",
      rating: 4.7,
      reviews: 189,
      category: "Spiritual Tours",
      highlights: ["Mahabodhi Temple", "Buddha's enlightenment site", "Meditation sessions", "Monastery visits"],
      includes: ["Premium accommodation", "All meals", "Private transportation", "Spiritual guide", "Meditation classes"],
      description: "Journey through Buddhism's most sacred sites from Varanasi to the place of Buddha's enlightenment.",
      featured: false
    },
    {
      id: 4,
      title: "Varanasi to Ayodhya",
      location: "Varanasi & Ayodhya",
      duration: "5 Days 4 Nights",
      price: 16200,
      originalPrice: 19500,
      image: "assets/packages/package/varanasi-ayodhya.jpg",
      rating: 4.6,
      reviews: 134,
      category: "Cultural Heritage",
      highlights: ["Ram Janmabhoomi Temple", "Hanuman Garhi", "Saryu River Aarti", "Ancient Ram stories"],
      includes: ["Comfortable stay", "Vegetarian meals", "AC transportation", "Religious guide", "Temple visits"],
      description: "Explore the birthplace of Lord Rama and experience the spiritual heritage of ancient India.",
      featured: false
    },
    {
      id: 5,
      title: "Prayagraj Vindhyachal",
      location: "Prayagraj & Vindhyachal",
      duration: "4 Days 3 Nights",
      price: 12800,
      originalPrice: 15500,
      image: "assets/packages/package/prayagraj-vindhyachal.jpg",
      rating: 4.5,
      reviews: 98,
      category: "Spiritual Tours",
      highlights: ["Triveni Sangam", "Vindhyachal Devi Temple", "Holy dip ceremony", "Allahabad Fort"],
      includes: ["Hotel stay", "Meals", "Local transport", "Guide service", "Temple visits"],
      description: "Visit the sacred confluence of three rivers and seek blessings at the powerful Vindhyachal Devi Temple.",
      featured: false
    }
  
]