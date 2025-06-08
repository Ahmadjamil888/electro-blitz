
import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types/product';
import { products } from '@/data/products/products';

export const useSearch = (searchTerm: string) => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate AJAX delay
    const searchTimeout = setTimeout(() => {
      setSearchResults(filteredProducts);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [filteredProducts, searchTerm]);

  return {
    searchResults,
    isSearching,
    hasResults: searchResults.length > 0,
    totalResults: searchResults.length
  };
};
