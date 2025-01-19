import React, { useState } from 'react';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe('your-publishable-key-here');

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const savedAddresses: Address[] = [
  {
    id: '1',
    street: '123 Main St',
    city: 'Cambridge',
    state: 'MA',
    zipCode: '02142',
    isDefault: true,
  },
  {
    id: '2',
    street: '456 Tech Square',
    city: 'Cambridge',
    state: 'MA',
    zipCode: '02139',
    isDefault: false,
  },
];

function Cart() {
  const { CartItems } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    if (!CartItems || typeof CartItems !== 'object') {
      return [];
    }
    return Array.isArray(CartItems) ? CartItems : Object.values(CartItems);
  });

  const [promoCode, setPromoCode] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<string>(
    savedAddresses.find((addr) => addr.isDefault)?.id || ''
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoCode === 'MIT25' ? subtotal * 0.25 : 0;
  const total = subtotal - discount;

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, Number(item.quantity) + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    setShowPaymentForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {cartItems.length > 0 ? (
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-lg font-bold text-indigo-600">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, +1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Payment Form */}
            {showPaymentForm ? (
              <Elements stripe={stripePromise}>
                <PaymentForm total={total} />
              </Elements>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-indigo-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0 || !selectedAddress}
                  className="w-full mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentForm({ total }: { total: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    // Replace this with your backend endpoint for creating payment intents
    const response = await fetch('pk_test_51IVDGEKLo7MPx8RgPX4Hw29XNWpAh5y8QpuIrhQQueF8vAwuFtCfQw1h0MRoZub6Xl5NNxSJRfQauNHdy7Y3YlAR00uV0iJMIQ', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total * 100 }), // Stripe expects amounts in cents
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log('Payment successful:', paymentIntent);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Enter Payment Details</h2>
      <CardElement className="p-4 border rounded" />
      <button
        onClick={handlePayment}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Pay ${total.toFixed(2)}
      </button>
    </div>
  );
}

export default Cart;
