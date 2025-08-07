import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string | null) => void;
  onPriceFilter: (range: string | null) => void;
  selectedCategory: string | null;
  selectedPriceRange: string | null;
}

const categories = [
  "Fiction",
  "Non-Fiction", 
  "Science Fiction",
  "Romance",
  "Mystery",
  "Business",
  "Self-Help",
  "Biography"
];

const priceRanges = [
  { label: "Under $10", value: "0-10" },
  { label: "$10 - $20", value: "10-20" },
  { label: "$20 - $30", value: "20-30" },
  { label: "Over $30", value: "30+" }
];

export const SearchBar = ({ 
  onSearch, 
  onCategoryFilter, 
  onPriceFilter, 
  selectedCategory, 
  selectedPriceRange 
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearFilters = () => {
    onCategoryFilter(null);
    onPriceFilter(null);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search books, authors, or categories..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-4 h-12 bg-background border-border rounded-lg shadow-elegant-sm focus:shadow-elegant-md transition-shadow duration-300"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-background hover:bg-muted">
              <Filter className="h-4 w-4 mr-2" />
              Category
              {selectedCategory && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {selectedCategory}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => onCategoryFilter(category)}
                className={selectedCategory === category ? "bg-primary/10" : ""}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Price Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-background hover:bg-muted">
              <Filter className="h-4 w-4 mr-2" />
              Price
              {selectedPriceRange && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {priceRanges.find(r => r.value === selectedPriceRange)?.label}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {priceRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => onPriceFilter(range.value)}
                className={selectedPriceRange === range.value ? "bg-primary/10" : ""}
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {(selectedCategory || selectedPriceRange) && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedCategory || selectedPriceRange) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Category: {selectedCategory}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCategoryFilter(null)}
                className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedPriceRange && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Price: {priceRanges.find(r => r.value === selectedPriceRange)?.label}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPriceFilter(null)}
                className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};