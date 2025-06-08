
import React, { useState, useMemo } from 'react';
import { deals } from '@/data/deals';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Footer from '@/components/Footer';

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const dealsProducts = useMemo(() => {
    const activeDeals = deals.filter(deal => deal.isActive);
    return activeDeals.map(deal => {
      const product = products.find(p => p.id === deal.productId);
      if (product) {
        const discountedPrice = product.price * (1 - deal.discountPercentage / 100);
        return {
          ...product,
          originalPrice: product.price,
          price: discountedPrice,
          discountPercentage: deal.discountPercentage,
          dealEndDate: deal.endDate,
          isSale: true
        };
      }
      return null;
    }).filter(Boolean) as Product[];
  }, []);

  const filteredDeals = useMemo(() => {
    if (!searchTerm) return dealsProducts;
    
    return dealsProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, dealsProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Special Deals</h1>
          <p className="text-gray-600">Don't miss out on these amazing offers!</p>
        </div>

        {filteredDeals.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm ? `Search results for "${searchTerm}"` : 'Active Deals'}
              </h2>
              <p className="text-gray-600">
                {filteredDeals.length} deals available
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDeals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No deals found matching your search.' : 'No active deals at the moment.'}
            </p>
            <p className="text-gray-400 mt-2">Check back soon for new offers!</p>
          </div>
        )}
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Deals;
