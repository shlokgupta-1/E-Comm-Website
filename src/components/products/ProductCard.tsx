import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pt-4 px-4 pb-2">
          {/* Category Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span className="badge bg-gray-100 text-gray-800">
              {product.category}
            </span>
          </div>
          
          {/* Image */}
          <div className="h-48 flex items-center justify-center p-4 bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Product Info */}
          <div className="mt-4">
            <h3 className="text-sm font-medium line-clamp-2 h-10">
              {product.title}
            </h3>
            
            <div className="mt-2 flex items-center justify-between">
              <p className="text-lg font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline text-sm flex-grow mr-2"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary text-sm"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;