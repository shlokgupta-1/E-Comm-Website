import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Instagram, Twitter, Facebook, Github as GitHub } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <Store className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">ShopSmart</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Your one-stop shop for quality products at affordable prices.
              Browse our collection and shop smart!
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/?category=electronics" className="text-gray-400 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/?category=jewelery" className="text-gray-400 hover:text-white transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/?category=men's clothing" className="text-gray-400 hover:text-white transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/?category=women's clothing" className="text-gray-400 hover:text-white transition-colors">
                  Women's Clothing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Sec 73, Noida, Uttar Pradesh, India
            </p>
            <p className="text-gray-400 mb-2">
              Email: support@shopsmart.com
            </p>
            <p className="text-gray-400 mb-2">
              Phone: +91 63784 01926
            </p>
            <form className="mt-4">
              <label htmlFor="newsletter" className="text-sm text-gray-400">
                Subscribe to our newsletter
              </label>
              <div className="flex mt-1">
                <input
                  type="email"
                  id="newsletter"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 text-gray-900 rounded-l-md focus:outline-none"
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
          <p className="mt-1">
            This is a demo project created for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;