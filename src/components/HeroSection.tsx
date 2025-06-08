
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap, Shield, Truck } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Next-Gen
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Electronics
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Discover the latest in technology with unbeatable prices, fast shipping, and premium quality products.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Deals
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Truck className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Star className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Top Rated</p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop"
                    alt="iPhone"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold">Latest iPhone</h3>
                  <p className="text-blue-100 text-sm">Starting at $1,199</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop"
                    alt="Headphones"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold">Premium Audio</h3>
                  <p className="text-blue-100 text-sm">Starting at $349</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop"
                    alt="MacBook"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold">MacBook Pro</h3>
                  <p className="text-blue-100 text-sm">Starting at $2,499</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=200&fit=crop"
                    alt="Gaming"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold">Gaming Setup</h3>
                  <p className="text-blue-100 text-sm">Starting at $499</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
