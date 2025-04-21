import { Product } from '../types/product';

// Base URL for the API
const BASE_URL = 'https://fakestoreapi.com';

// Function to fetch all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to fetch a single product by ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Function to fetch products by category
export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category: ${category}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching products in category ${category}:`,
      error
    );
    throw error;
  }
};

// Function to fetch all categories
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};