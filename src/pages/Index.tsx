import { useState, useMemo } from "react";
import { BookOpen, Users, Award, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { BookCard } from "@/components/BookCard";
import { BookDetail } from "@/components/BookDetail";
import { books, Book } from "@/data/books";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === null || book.category === selectedCategory;

      // Price filter
      const matchesPrice = selectedPriceRange === null || (() => {
        if (selectedPriceRange === "0-10") return book.price <= 10;
        if (selectedPriceRange === "10-20") return book.price > 10 && book.price <= 20;
        if (selectedPriceRange === "20-30") return book.price > 20 && book.price <= 30;
        if (selectedPriceRange === "30+") return book.price > 30;
        return true;
      })();

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  if (selectedBook) {
    return (
      <BookDetail 
        book={selectedBook} 
        onBack={() => setSelectedBook(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="h-10 w-10" />
              <h1 className="text-4xl font-bold">BookVerse Pro</h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover your next great read from our curated collection of books across all genres
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">10,000+ Books</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">50,000+ Readers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="font-medium">Award Winners</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">New Releases</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <SearchBar
            onSearch={setSearchQuery}
            onCategoryFilter={setSelectedCategory}
            onPriceFilter={setSelectedPriceRange}
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
          />
        </div>

        {/* Featured Carousel */}
        {!searchQuery && !selectedCategory && !selectedPriceRange && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-foreground">Featured Books</h2>
              <Badge className="bg-gradient-secondary text-secondary-foreground">
                Handpicked
              </Badge>
            </div>
            <FeaturedCarousel 
              books={books} 
              onBookClick={setSelectedBook}
            />
          </section>
        )}

        {/* Books Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery || selectedCategory || selectedPriceRange ? 'Search Results' : 'All Books'}
            </h2>
            <span className="text-muted-foreground">
              {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find more books
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBookClick={setSelectedBook}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">BookVerse Pro</span>
            </div>
            <p className="text-muted-foreground">
              Your premium destination for discovering and purchasing exceptional books
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
