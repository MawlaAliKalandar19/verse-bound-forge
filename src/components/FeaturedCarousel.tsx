import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Book {
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

interface FeaturedCarouselProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

export const FeaturedCarousel = ({ books, onBookClick }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredBooks = books.filter(book => book.isFeatured);

  useEffect(() => {
    if (featuredBooks.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredBooks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredBooks.length]);

  if (featuredBooks.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex(currentIndex === featuredBooks.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? featuredBooks.length - 1 : currentIndex - 1);
  };

  const currentBook = featuredBooks[currentIndex];
  const discount = currentBook.originalPrice ? 
    Math.round(((currentBook.originalPrice - currentBook.price) / currentBook.originalPrice) * 100) : 0;

  return (
    <Card className="relative overflow-hidden bg-gradient-hero border-0 shadow-elegant-xl">
      <CardContent className="p-0">
        <div className="relative h-80 md:h-96">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
          
          {/* Book Cover Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${currentBook.cover})`,
              filter: 'blur(8px) brightness(0.7)',
              transform: 'scale(1.1)'
            }}
          />

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Book Cover */}
                <div className="flex justify-center md:justify-end">
                  <div className="relative group cursor-pointer" onClick={() => onBookClick(currentBook)}>
                    <img
                      src={currentBook.cover}
                      alt={currentBook.title}
                      className="w-48 md:w-56 h-auto rounded-lg shadow-elegant-xl transition-transform duration-500 group-hover:scale-105 animate-float"
                    />
                    {discount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground font-bold shadow-elegant-md">
                        -{discount}%
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Book Info */}
                <div className="text-white space-y-4 animate-slide-up">
                  <div>
                    <Badge className="bg-secondary/90 text-secondary-foreground mb-3">
                      {currentBook.category}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                      {currentBook.title}
                    </h2>
                    <p className="text-xl text-white/90 mb-4">
                      by {currentBook.author}
                    </p>
                  </div>

                  <p className="text-white/80 text-lg leading-relaxed max-w-md">
                    {currentBook.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(currentBook.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/40'}`}
                        />
                      ))}
                    </div>
                    <span className="text-white/90">
                      {currentBook.rating} ({currentBook.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-white">
                        ${currentBook.price.toFixed(2)}
                      </span>
                      {currentBook.originalPrice && (
                        <span className="text-lg text-white/60 line-through">
                          ${currentBook.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="lg"
                      className="bg-gradient-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold shadow-elegant-lg"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full h-12 w-12 p-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full h-12 w-12 p-0"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
            {featuredBooks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};