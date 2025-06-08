
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <ShoppingBag className="h-16 w-16 mb-4" />
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="text-sm">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cart Items */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
              <p className="text-blue-600 font-bold">${item.product.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Badge variant="secondary" className="px-2">
                  {item.quantity}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.product.id)}
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Cart Summary */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Items:</span>
          <Badge variant="secondary">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </Badge>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span className="text-blue-600">${getTotalPrice().toLocaleString()}</span>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
