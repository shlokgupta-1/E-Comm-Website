import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const { items, total } = state;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold">
                  Cart Items ({itemCount})
                </h2>
              </div>
              
              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6 flex justify-between items-center">
                <Link
                  to="/"
                  className="text-blue-500 hover:text-blue-700 transition-colors flex items-center"
                >
                  <ArrowRight size={16} className="mr-1 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary subtotal={total} itemCount={itemCount} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;