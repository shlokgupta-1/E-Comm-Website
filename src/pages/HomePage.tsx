import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import ProductFilter, { FilterState } from '../components/products/ProductFilter';
import { getProducts, getProductsByCategory } from '../services/api';
import { Product } from '../types/product';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || '';
  const searchParam = queryParams.get('search') || '';
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        let data: Product[];
        
        if (categoryParam) {
          data = await getProductsByCategory(categoryParam);
        } else {
          data = await getProducts();
        }
        
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryParam]);
  
  // Apply initial search filter if present in URL
  useEffect(() => {
    if (searchParam && products.length > 0) {
      handleFilterChange({
        category: categoryParam,
        search: searchParam,
        minPrice: 0,
        maxPrice: 1000,
        sort: '',
      });
    }
  }, [searchParam, products, categoryParam]);
  
  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...products];
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by price
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );
    
    // Sort products
    if (filters.sort) {
      switch (filters.sort) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(filtered);
  };
  
  return (
    <div>
      {/* Hero section for home page */}
      {!categoryParam && !searchParam && (
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="container-custom py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                  Shop Smart, Live Better
                </h1>
                <p className="mt-4 text-lg text-white/90">
                  Discover amazing products at incredible prices. From electronics to fashion, 
                  we've got everything you need in one place.
                </p>
                <div className="mt-8">
                  <a
                    href="#products"
                    className="btn bg-white text-blue-600 hover:bg-gray-100 mr-4"
                  >
                    Shop Now
                  </a>
                  <a
                    href="#featured"
                    className="btn bg-transparent border border-white text-white hover:bg-white/10"
                  >
                    Featured Items
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Shopping"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {categoryParam
            ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`
            : searchParam
            ? `Search Results for "${searchParam}"`
            : 'All Products'}
        </h1>
      </div>
      
      {/* Filters */}
      <ProductFilter 
        onFilterChange={handleFilterChange} 
        initialCategory={categoryParam} 
        initialSearch={searchParam} 
      />
      
      {/* Loading State */}
      {isLoading && (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-8">
          <div className="flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      {!isLoading && !error && (
        <>
          <div id="products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-600">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;