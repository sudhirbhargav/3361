import React, { useState } from 'react';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
    id: "1",
    street: "123 Main St",
    city: "Cambridge",
    state: "MA",
    zipCode: "02142",
    isDefault: true,
  },
  {
    id: "2",
    street: "456 Tech Square",
    city: "Cambridge",
    state: "MA",
    zipCode: "02139",
    isDefault: false,
  },
];

function Cart() {
  const {CartItems}=useAuth()
  // console.log("new",typeof Object.entries(CartItems))
  // const data=Object.entries(CartItems);



  const [cartItems, setCartItems] = useState(() => {
    if (!CartItems || typeof CartItems !== "object") {
      return []; // Start with an empty array if CartItems is null or not an array
    }
    return Array.isArray(CartItems) ? CartItems : Object.values(CartItems);
  });
  
  const [promoCode, setPromoCode] = useState("");
  
  console.log("cartItems",cartItems)
  const [selectedAddress, setSelectedAddress] = useState<string>(
    savedAddresses.find(addr => addr.isDefault)?.id || ""
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  let subtotal;
  let discount;
  let total 
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  console.log("length",typeof cartItems)
if(cartItems===undefined){
  console.log("yoooooo")
  subtotal =0;
   discount = 0;
   total = subtotal - discount;

}
else{
  console.log("hiihih")
   subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
   discount = promoCode === "MIT25" ? subtotal * 0.25 : 0;
   total = subtotal - discount;
}
  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, Number(item.quantity) + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement address addition logic
    setShowNewAddressForm(false);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    console.log("Proceeding to checkout with:", {
      items: cartItems,
      address: savedAddresses.find(addr => addr.id === selectedAddress),
      total,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
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
            {/* Promo Code */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Promo Code</h2>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  {/* <input
                    type="text"
                     <boltAction type="file" filePath="src/pages/Cart.tsx">                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  /> */}
                </div>
                <button
                  onClick={() => {/* Apply promo code logic */}}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
              <div className="space-y-4">
                {savedAddresses.map((address) => (
                  <label key={address.id} className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-gray-900">{address.street}</p>
                      <p className="text-gray-600">
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      {address.isDefault && (
                        <span className="text-sm text-indigo-600">Default address</span>
                      )}
                    </div>
                  </label>
                ))}

                <button
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  + Add new address
                </button>

                {showNewAddressForm && (
                  <form onSubmit={handleAddNewAddress} className="space-y-4 mt-4">
                    <input
                      type="text"
                      placeholder="Street address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="ZIP code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewAddressForm(false)}
                        className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Order Summary */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;