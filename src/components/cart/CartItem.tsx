import React from 'react';
import { Link } from 'react-router-dom';
import { Trash, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../context/CartContext';

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
};

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 mr-4 mb-4 sm:mb-0">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
      
      {/* Product Info */}
      <div className="flex-grow mb-4 sm:mb-0 text-center sm:text-left">
        <Link 
          to={`/product/${item.id}`}
          className="text-lg font-medium text-gray-900 hover:text-blue-500 transition-colors"
        >
          {item.title}
        </Link>
        <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={handleDecrement}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="px-4 py-1">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      
      {/* Subtotal */}
      <div className="min-w-24 ml-6 text-right">
        <p className="font-medium text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export default CartItem;