
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryProductCount = (category: string) => {
    if (category === 'All') return products.length;
    return products.filter(product => product.category === category).length;
  };

  const getCategoryImage = (category: string) => {
    const categoryProduct = products.find(product => product.category === category);
    return categoryProduct?.image || '/placeholder.svg';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-gray-600">Browse our wide selection of electronics by category</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.filter(category => category !== 'All').map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={getCategoryImage(category)}
                  alt={category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category}</h3>
                <p className="text-gray-600">
                  {getCategoryProductCount(category)} products available
                </p>
                <div className="mt-4">
                  <span className="text-blue-600 font-medium group-hover:text-blue-700">
                    Shop now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
