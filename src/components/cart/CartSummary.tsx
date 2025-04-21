import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

type CartSummaryProps = {
  subtotal: number;
  itemCount: number;
};

const CartSummary = ({ subtotal, itemCount }: CartSummaryProps) => {
  // Calculate additional costs
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {subtotal > 0 ? `$${shipping.toFixed(2)}` : 'Free'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Link
        to={itemCount > 0 ? "/checkout" : "#"}
        className={`btn w-full ${
          itemCount > 0 
            ? 'btn-primary flex items-center justify-center' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={(e) => {
          if (itemCount === 0) e.preventDefault();
        }}
      >
        <ShoppingBag size={18} className="mr-2" />
        {itemCount > 0 ? 'Proceed to Checkout' : 'Cart is Empty'}
      </Link>
      
      {itemCount > 0 && (
        <p className="text-sm text-gray-500 mt-4">
          Secure checkout powered by Stripe. Your personal and payment information is always protected.
        </p>
      )}
    </div>
  );
};

export default CartSummary;