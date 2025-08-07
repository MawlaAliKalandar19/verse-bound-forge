import { useState } from "react";
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

interface BookDetailProps {
  book: Book;
  onBack: () => void;
}

export const BookDetail = ({ book, onBack }: BookDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  
  const discount = book.originalPrice ? 
    Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="hover:bg-muted"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:bg-muted"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div className="relative group">
              <Card className="overflow-hidden bg-gradient-card border-0 shadow-elegant-xl">
                <CardContent className="p-0">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full max-w-md h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </CardContent>
              </Card>
              {discount > 0 && (
                <Badge className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground font-bold text-lg px-3 py-1 shadow-elegant-md">
                  -{discount}%
                </Badge>
              )}
              {book.isFeatured && (
                <Badge className="absolute -top-3 -left-3 bg-gradient-secondary text-secondary-foreground font-bold text-lg px-3 py-1 shadow-elegant-md">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4" variant="secondary">
                {book.category}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-3 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                by {book.author}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">
                {book.rating}
              </span>
              <span className="text-muted-foreground">
                ({book.reviewCount} reviews)
              </span>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {book.description}
              </p>
            </div>

            <Separator />

            {/* Price and Purchase */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">
                  ${book.price.toFixed(2)}
                </span>
                {book.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <Badge className="bg-destructive/10 text-destructive font-medium">
                    Save ${(book.originalPrice! - book.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0 hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10 p-0 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-semibold text-lg py-6 shadow-elegant-lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Add to Cart - ${(book.price * quantity).toFixed(2)}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10 font-semibold text-lg py-6"
                >
                  Buy Now
                </Button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $25</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">30-day return policy</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};