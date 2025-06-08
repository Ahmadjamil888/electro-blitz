
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import { categories, brands } from '@/data/products';

interface FiltersProps {
  selectedCategory: string;
  selectedBrand: string;
  priceRange: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  selectedBrand,
  priceRange,
  sortBy,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters
}) => {
  const hasActiveFilters = selectedCategory !== 'All' || selectedBrand !== 'All' || priceRange !== 'All' || sortBy !== 'featured';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Brand</label>
          <Select value={selectedBrand} onValueChange={onBrandChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Prices</SelectItem>
              <SelectItem value="0-500">Under $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
              <SelectItem value="2000+">Over $2,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {selectedCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onCategoryChange('All')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedBrand !== 'All' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Brand: {selectedBrand}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onBrandChange('All')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {priceRange !== 'All' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Price: {priceRange === '2000+' ? 'Over $2,000' : `$${priceRange.replace('-', ' - $')}`}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onPriceRangeChange('All')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
