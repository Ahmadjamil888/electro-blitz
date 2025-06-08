
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShoppingCart, Plus, Minus, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types/product';
import { products } from '@/data/products/products';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductInspect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock additional images for demo
  const additionalImages = [
    product?.image,
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop"
  ].filter(Boolean);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          <p className="text-sm text-gray-600">
            Home / {product.category} / {product.name}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={additionalImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-600 hover:bg-green-700">New</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-red-600 hover:bg-red-700">Sale</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {additionalImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.brand}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-blue-600">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-red-600 hover:bg-red-700">
                    Save ${(product.originalPrice - product.price).toLocaleString()}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <Badge className="bg-green-600 hover:bg-green-700">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-lg">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-lg">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decrementQuantity}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={incrementQuantity}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart - ${(product.price * quantity).toLocaleString()}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductInspect;
