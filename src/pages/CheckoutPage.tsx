import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { state } = useCart();
  const { items, total } = state;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Calculate additional costs
  const shipping = 10;
  const tax = total * 0.1; // 10% tax
  const orderTotal = total + shipping + tax;
  
  // Redirect to cart if it's empty
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          You need to add some items to your cart before checking out.
        </p>
        <Link to="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link
          to="/cart"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Cart
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            {/* Order Items */}
            <div className="max-h-64 overflow-auto mb-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 mr-2 bg-white border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Cost Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-lg">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Secure checkout message */}
            <div className="mt-4 text-sm text-center text-gray-500">
              <p>
                Your information is secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;