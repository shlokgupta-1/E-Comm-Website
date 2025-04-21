import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types/product';

// Define the cart item type
export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

// Define the cart state
type CartState = {
  items: CartItem[];
  total: number;
};

// Define actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Define the context type
type CartContextType = {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
        };
      } else {
        // New item, add to cart
        const newItem: CartItem = {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + action.payload.price,
        };
      }
    }

    case 'REMOVE_ITEM': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) return state;

      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total - existingItem.price * existingItem.quantity,
      };
    }

    case 'UPDATE_QUANTITY': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex < 0) return state;

      const item = state.items[existingItemIndex];
      const quantityDiff = action.payload.quantity - item.quantity;

      // Don't allow quantity to go below 1
      if (item.quantity + quantityDiff < 1) return state;

      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...item,
        quantity: action.payload.quantity,
      };

      return {
        ...state,
        items: updatedItems,
        total: state.total + item.price * quantityDiff,
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};

// Provider component
type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  // Actions
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};