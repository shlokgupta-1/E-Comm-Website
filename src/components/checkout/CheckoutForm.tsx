import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

const CheckoutForm = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Personal Information
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Shipping Information
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'ZIP code is invalid';
    }
    
    // Payment Information
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    
    // Remove non-digit characters
    value = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    value = value.substring(0, 19);
    
    setFormData((prev) => ({
      ...prev,
      cardNumber: value,
    }));
  };
  
  const formatExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    
    // Remove non-digit characters
    value = value.replace(/\D/g, '');
    
    // Add slash after 2 digits
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    
    // Limit to 5 characters (MM/YY)
    value = value.substring(0, 5);
    
    setFormData((prev) => ({
      ...prev,
      expiryDate: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
        
        // Redirect to home page after a delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }, 1500);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-md">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Order Placed Successfully!
        </h2>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Thank you for your purchase. Your order has been placed successfully.
          You will receive an email confirmation shortly.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 btn btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`input ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Shipping Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address*
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`input ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`input ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State*
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`input ${errors.state ? 'border-red-500' : ''}`}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code*
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`input ${errors.zipCode ? 'border-red-500' : ''}`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
        <div className="flex items-center mb-4">
          <CreditCard className="w-6 h-6 text-gray-500 mr-2" />
          <span className="text-gray-600">
            We accept all major credit cards
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card*
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              className={`input ${errors.cardName ? 'border-red-500' : ''}`}
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number*
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={formatCardNumber}
              placeholder="1234 5678 9012 3456"
              className={`input ${errors.cardNumber ? 'border-red-500' : ''}`}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (MM/YY)*
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={formatExpiryDate}
              placeholder="MM/YY"
              className={`input ${errors.expiryDate ? 'border-red-500' : ''}`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV*
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              className={`input ${errors.cvv ? 'border-red-500' : ''}`}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
            )}
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        className="btn btn-primary w-full py-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
      
      <p className="text-sm text-gray-500 text-center">
        By placing your order, you agree to our 
        <a href="#" className="text-blue-500 hover:underline"> Terms of Service </a> 
        and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default CheckoutForm;