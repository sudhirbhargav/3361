import React from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const orders = [
  {
    id: "ORD001",
    date: "2024-03-01",
    total: 249.98,
    status: "completed",
    items: [
      {
        id: 1,
        name: "Study Desk Pro",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 2,
        name: "LED Desk Lamp",
        price: 49.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      },
    ],
    address: {
      street: "123 Main St",
      city: "Cambridge",
      state: "MA",
      zipCode: "02142",
    },
  },
  // Add more orders as needed
];

const statusIcons = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  completed: <CheckCircle className="h-5 w-5 text-green-500" />,
  cancelled: <XCircle className="h-5 w-5 text-red-500" />,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function OrderHistory() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Package className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="border-b p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusColors[order.status as keyof typeof statusColors]}`}>
                      {statusIcons[order.status as keyof typeof statusIcons]}
                      <span className="capitalize">{order.status}</span>
                    </div>
                    <p className="text-lg font-bold text-indigo-600">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-indigo-600 font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h4>
                  <p className="text-gray-600">
                    {order.address.street}<br />
                    {order.address.city}, {order.address.state} {order.address.zipCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;