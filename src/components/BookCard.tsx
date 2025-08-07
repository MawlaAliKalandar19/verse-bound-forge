import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  isFeatured?: boolean;
  description: string;
}

interface BookCardProps {
  book: Book;
  onBookClick: (book: Book) => void;
}

export const BookCard = ({ book, onBookClick }: BookCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = book.originalPrice ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-card border-0 shadow-elegant-md hover:shadow-elegant-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onBookClick(book)}
    >
      <CardContent className="p-0">
        {/* Book Cover */}
        <div className="relative overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay with actions */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0 rounded-full shadow-elegant-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
            
            <div className="absolute bottom-3 left-3 right-3">
              <Button
                className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-elegant-md"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {book.isFeatured && (
              <Badge className="bg-gradient-secondary text-secondary-foreground font-medium shadow-elegant-sm">
                Featured
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground font-medium shadow-elegant-sm">
                -{discount}%
              </Badge>
            )}
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4 space-y-3">
          <div>
            <Badge variant="secondary" className="text-xs mb-2">
              {book.category}
            </Badge>
            <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
              {book.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              by {book.author}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {book.rating} ({book.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};