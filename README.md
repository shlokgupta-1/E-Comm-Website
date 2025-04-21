# ShopSmart E-commerce Platform

A modern, fully-featured e-commerce platform built with React, TypeScript, and Tailwind CSS. This project demonstrates best practices in frontend development and user experience design.

![ShopSmart Screenshot](https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- **Product Browsing**
  - Browse products by category
  - Search functionality
  - Advanced filtering (price range, ratings)
  - Sorting options (price, rating)

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Real-time total calculation
  - Persistent cart state

- **Checkout Process**
  - Multi-step form validation
  - Address information
  - Payment details
  - Order summary

- **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimized
  - Adaptive navigation

## Tech Stack Used

- Frontend Framework : React 18
- Language: TypeScript
- Styling: Tailwind CSS
- Routing: React Router v6
- State Management: React Context API
- Icons: Lucide React
- API Integration: Fake Store API
- Build Tool: Vite

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopsmart-ecommerce.git
   cd shopsmart-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── cart/          # Cart-related components
│   ├── checkout/      # Checkout form components
│   ├── layout/        # Layout components (Header, Footer)
│   └── products/      # Product-related components
├── context/           # React Context providers
├── pages/             # Route components
├── services/          # API service layer
├── types/             # TypeScript type definitions
└── main.tsx          # Application entry point
```

## Key Components

### Pages
- `HomePage`: Product listing with filters
- `ProductPage`: Detailed product view
- `CartPage`: Shopping cart management
- `CheckoutPage`: Order completion flow

### Features
- `ProductFilter`: Advanced filtering system
- `CartContext`: Global cart state management
- `CheckoutForm`: Multi-step form with validation

## State Management

The application uses React's Context API for global state management, particularly for the shopping cart functionality. The `CartContext` provides:

- Cart items array
- Total price calculation
- Add/remove/update operations
- Cart persistence

## API Integration

The project integrates with the Fake Store API for product data:

- Product listings
- Category filters
- Individual product details
- Rating and review data

## Styling

Tailwind CSS is used for styling with:

- Custom utility classes
- Responsive design patterns
- Component-specific styles
- Dark/light mode support

## Best Practices

- TypeScript for type safety
- Component modularity
- Proper error handling
- Loading states
- Form validation
- Responsive images
- SEO considerations

## Performance Considerations

- Lazy loading of routes
- Image optimization
- State management optimization
- Bundle size optimization
- Code splitting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for product data
- [Lucide React](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for routing