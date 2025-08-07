import digitalMindCover from "@/assets/book-digital-mind.jpg";
import oceanWhisperCover from "@/assets/book-ocean-whisper.jpg";
import startupMindsetCover from "@/assets/book-startup-mindset.jpg";
import realmShadowsCover from "@/assets/book-realm-shadows.jpg";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  cover: string;
  category: string;
  description: string;
  isFeatured?: boolean;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Digital Mind",
    author: "Dr. Sarah Chen",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 342,
    cover: digitalMindCover,
    category: "Science Fiction",
    description: "A thought-provoking exploration of artificial intelligence and human consciousness in the digital age. Dr. Chen masterfully weaves together cutting-edge science with compelling storytelling.",
    isFeatured: true
  },
  {
    id: "2", 
    title: "Ocean's Whisper",
    author: "Elena Rodriguez",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.6,
    reviewCount: 89,
    cover: oceanWhisperCover,
    category: "Romance",
    description: "A breathtaking romance set against the backdrop of the Pacific coast. When marine biologist Maya meets mysterious artist David, their worlds collide in unexpected ways.",
    isFeatured: true
  },
  {
    id: "3",
    title: "The Startup Mindset",
    author: "Marcus Johnson",
    price: 29.99,
    rating: 4.7,
    reviewCount: 156,
    cover: startupMindsetCover,
    category: "Business",
    description: "Essential strategies and mindset shifts for building successful startups in today's competitive landscape. Based on interviews with 50+ successful entrepreneurs.",
    isFeatured: true
  },
  {
    id: "4",
    title: "Realm of Shadows",
    author: "Lydia Blackthorne",
    price: 21.99,
    originalPrice: 26.99,
    rating: 4.9,
    reviewCount: 234,
    cover: realmShadowsCover,
    category: "Fantasy",
    description: "In a world where shadows hold ancient magic, young Aria must master her dark powers to save her kingdom from an otherworldly threat. Epic fantasy at its finest.",
    isFeatured: false
  },
  {
    id: "5",
    title: "Mindful Leadership",
    author: "Dr. James Thompson",
    price: 27.99,
    rating: 4.5,
    reviewCount: 78,
    cover: digitalMindCover, // Using same cover for demo
    category: "Self-Help",
    description: "Transform your leadership style through mindfulness practices. A practical guide for executives and managers looking to lead with presence and authenticity."
  },
  {
    id: "6",
    title: "The Time Traveler's Guide",
    author: "Professor Alan Mills",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.4,
    reviewCount: 112,
    cover: oceanWhisperCover, // Using same cover for demo
    category: "Science Fiction",
    description: "A comprehensive manual for navigating the complexities of time travel, written by the foremost expert in temporal mechanics."
  },
  {
    id: "7",
    title: "Cooking with Heart",
    author: "Isabella Martinez",
    price: 32.99,
    rating: 4.8,
    reviewCount: 203,
    cover: startupMindsetCover, // Using same cover for demo
    category: "Non-Fiction",
    description: "More than just recipes - this is a journey through flavors, family traditions, and the love that goes into every dish."
  },
  {
    id: "8",
    title: "The Mystery of Blackwood Manor",
    author: "Detective Sarah Holmes",
    price: 16.99,
    originalPrice: 19.99,
    rating: 4.3,
    reviewCount: 145,
    cover: realmShadowsCover, // Using same cover for demo
    category: "Mystery",
    description: "When investigator Sarah Holmes arrives at the supposedly haunted Blackwood Manor, she discovers that some mysteries run deeper than ghost stories."
  }
];