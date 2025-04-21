import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { state } = useCart();
  
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Store className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">ShopSmart</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link to="/?category=electronics" className="text-gray-700 hover:text-blue-500 transition-colors">
              Electronics
            </Link>
            <Link to="/?category=jewelery" className="text-gray-700 hover:text-blue-500 transition-colors">
              Jewelry
            </Link>
            <Link to="/?category=men's clothing" className="text-gray-700 hover:text-blue-500 transition-colors">
              Men's Clothing
            </Link>
            <Link to="/?category=women's clothing" className="text-gray-700 hover:text-blue-500 transition-colors">
              Women's Clothing
            </Link>
          </nav>
          
          {/* Right side - Search & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="input pr-10 py-1 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Search size={18} />
              </button>
            </form>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-500 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile - Menu Button & Cart */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="input pr-10 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <Search size={18} />
            </button>
          </form>
          
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/?category=electronics" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link 
              to="/?category=jewelery" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Jewelry
            </Link>
            <Link 
              to="/?category=men's clothing" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Men's Clothing
            </Link>
            <Link 
              to="/?category=women's clothing" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Women's Clothing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;