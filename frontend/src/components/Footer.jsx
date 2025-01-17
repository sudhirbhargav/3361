import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-lg font-semibold text-gray-800">MIT Essentials</span>
          </Link>
          <p className="text-gray-500">© 2024 MIT Essentials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}