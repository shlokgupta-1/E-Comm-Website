import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Star, 
  ArrowLeft, 
  TruckIcon, 
  ShieldCheck, 
  RotateCcw, 
  Loader 
} from 'lucide-react';
import { getProductById, getProductsByCategory } from '../services/api';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        const data = await getProductById(parseInt(id));
        setProduct(data);
        
        // Fetch related products
        const related = await getProductsByCategory(data.category);
        setRelatedProducts(
          related.filter((item) => item.id !== data.id).slice(0, 4)
        );
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <Loader className="inline-block animate-spin h-8 w-8 text-blue-500" />
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="py-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Product Not Found
          </h2>
          <p className="text-red-600 mb-4">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Products
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-white p-8 rounded-lg">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain mix-blend-multiply"
            />
          </div>
          
          {/* Product Information */}
          <div className="flex flex-col">
            <div>
              <div className="flex items-center">
                <span className="badge bg-blue-100 text-blue-800">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mt-2">
                {product.title}
              </h1>
              
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary w-full py-3 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>
            
            {/* Product Benefits */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <TruckIcon className="h-6 w-6 text-blue-500 mb-2" />
                <h4 className="font-medium text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-500">On orders over $50</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-blue-500 mb-2" />
                <h4 className="font-medium text-gray-900">Secure Payment</h4>
                <p className="text-sm text-gray-500">100% secure checkout</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <RotateCcw className="h-6 w-6 text-blue-500 mb-2" />
                <h4 className="font-medium text-gray-900">Easy Returns</h4>
                <p className="text-sm text-gray-500">30 day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;