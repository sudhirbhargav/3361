import React, { useState } from 'react';
import { Minus, Plus, X, CreditCard } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  default: boolean;
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Premium Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80',
    quantity: 1,
  },
  // Add more items...
];

const addresses: Address[] = [
  {
    id: 1,
    name: 'Home',
    street: '123 MIT Drive',
    city: 'Cambridge',
    state: 'MA',
    zip: '02139',
    default: true,
  },
  // Add more addresses...
];

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export function Cart(): JSX.Element {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [selectedAddress, setSelectedAddress] = useState<number>(addresses[0].id);
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');

  const subtotal: number = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount: number = promoCode === 'MIT10' ? subtotal * 0.1 : 0;
  const total: number = subtotal - discount;

  const updateQuantity = (id: number, delta: number): void => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number): void => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePayment = async (): Promise<void> => {
    const options: RazorpayOptions = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: total * 100,
      currency: 'USD',
      name: 'MIT Essentials',
      description: 'Purchase from MIT Essentials',
      handler: function(response: any) {
        console.log('Payment successful:', response);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@mit.edu',
      },
      theme: {
        color: '#2563EB',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center py-6 border-b last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-6">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-lg font-bold text-blue-600 mt-2">${item.price}</p>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="mx-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Delivery Address</h2>
              <button
                onClick={() => setShowAddAddress(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                Add New Address
              </button>
            </div>
            <div className="space-y-4">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500"
                >
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddress === address.id}
                    onChange={() => setSelectedAddress(address.id)}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{address.name}</h3>
                    <p className="text-gray-600">
                      {address.street}, {address.city}, {address.state} {address.zip}
                    </p>
                    {address.default && (
                      <span className="text-sm text-blue-600">Default Address</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter code"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg border-t pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors mt-6"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
