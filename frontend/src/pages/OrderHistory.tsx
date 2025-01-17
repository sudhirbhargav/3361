import React from 'react';
import { Package, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

const orders: Order[] = [
  {
    id: 'ORD123456',
    date: '2024-03-15',
    total: 149.97,
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Premium Laptop Stand',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80',
      },
      // Add more items...
    ],
  },
  // Add more orders...
];

export function OrderHistory(): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Package className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="border-b p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    ${order.total.toFixed(2)}
                  </p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">
                      Quantity: {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-700">
                    <Star className="w-5 h-5" />
                    Review
                  </button>
                </div>
              ))}
            </div>

            {/* Order Actions */}
            <div className="bg-gray-50 px-6 py-4">
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View Invoice
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
