import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { products } from '@/data/products';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Filters from '@/components/Filters';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setPriceRange('All');
    setSortBy('featured');
    setSearchTerm('');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply brand filter
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Apply price range filter
    if (priceRange !== 'All') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        filtered = filtered.filter(product => 
          product.price >= parseInt(min) && product.price <= parseInt(max)
        );
      } else {
        filtered = filtered.filter(product => product.price >= parseInt(min));
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order with new/sale items first
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          if (a.isSale && !b.isSale) return -1;
          if (!a.isSale && b.isSale) return 1;
          return 0;
        });
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <HeroSection />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="mb-8">
            <Filters
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              priceRange={priceRange}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
              onPriceRangeChange={setPriceRange}
              onSortChange={setSortBy}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm ? `Search results for "${searchTerm}"` : 'Featured Products'}
            </h2>
            <p className="text-gray-600">
              {filteredAndSortedProducts.length} products found
            </p>
          </div>

          {/* Product Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>

        <Footer />

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </CartProvider>
  );
};

export default Index;
