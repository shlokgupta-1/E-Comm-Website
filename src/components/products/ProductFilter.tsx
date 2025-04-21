import React, { useState, useEffect } from 'react';
import { X, Filter, Search } from 'lucide-react';
import { getCategories } from '../../services/api';

type ProductFilterProps = {
  onFilterChange: (filters: FilterState) => void;
  initialCategory?: string;
  initialSearch?: string;
};

export type FilterState = {
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  sort: 'price-asc' | 'price-desc' | 'rating' | '';
};

const ProductFilter = ({ 
  onFilterChange, 
  initialCategory = '', 
  initialSearch = '' 
}: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    search: initialSearch,
    minPrice: 0,
    maxPrice: 1000,
    sort: '',
  });
  
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Update filters when initialCategory or initialSearch change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: initialCategory,
      search: initialSearch
    }));
  }, [initialCategory, initialSearch]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setFilters(prev => ({
      ...prev,
      search
    }));
  };
  
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? '' : category
    }));
  };
  
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value);
    
    setFilters(prev => ({
      ...prev,
      [type === 'min' ? 'minPrice' : 'maxPrice']: isNaN(numValue) ? 0 : numValue
    }));
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as FilterState['sort'];
    setFilters(prev => ({
      ...prev,
      sort
    }));
  };
  
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    const resetFilters = {
      category: '',
      search: '',
      minPrice: 0,
      maxPrice: 1000,
      sort: '',
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="mb-6">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-outline flex items-center"
        >
          <Filter size={16} className="mr-2" />
          Filters
        </button>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="input py-1"
            value={filters.search}
            onChange={handleSearchChange}
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Desktop Filter Bar */}
      <div className="hidden md:flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        {/* Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {isLoading ? (
            <div className="text-gray-500">Loading categories...</div>
          ) : (
            <>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                    filters.category === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </>
          )}
        </div>
        
        {/* Search */}
        <div className="relative ml-4 w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="input py-1"
            value={filters.search}
            onChange={handleSearchChange}
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Sort */}
        <div className="ml-4">
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className="input py-1"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
      
      {/* Mobile Filter Panel */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
          <div className="bg-white w-full rounded-t-lg p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.category === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Filter */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="flex items-center">
                <input
                  type="number"
                  className="input py-1 w-24"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
                <span className="mx-2">to</span>
                <input
                  type="number"
                  className="input py-1 w-24"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                />
              </div>
            </div>
            
            {/* Sort */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Sort By</h4>
              <select
                value={filters.sort}
                onChange={handleSortChange}
                className="input py-1 w-full"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleResetFilters}
                className="btn btn-outline flex-1"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="btn btn-primary flex-1"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;