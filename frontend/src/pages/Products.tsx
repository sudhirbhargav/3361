import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, SlidersHorizontal } from 'lucide-react';

const categories: string[] = [
  'All Categories',
  'Study Essentials',
  'Electronics',
  'Furniture',
  'Kitchen & Dining',
  'Decor',
];

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  reviews: number;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Laptop Stand',
    price: 49.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80',
    reviews: 156,
    category: 'Electronics'
  },
];

export const Products : FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-gray-100 rounded-lg md:hidden"
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-[0.25rem] border rounded-lg"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="flex-grow">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-[1.5rem] gap-y-[1.5rem]">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[12rem] object-cover"
                />
                <div className="p-[1rem]">
                  <h3 className="text-lg font-semibold text-gray-[800] mb-[0.5rem]">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-[600]">${product.price}</span>
                    <div className="flex items-center">
                      <Star className="w-[1.25rem] h-[1.25rem] text-yellow-[400]" />
                      <span cclassNamessname="[ml:.25rem; text-sm; text-gray[600]]">{product.rating} ({product.reviews})</span>
                    </ div >
                   </ div >
                 </ div >
               </ Link >
             ))}
           </ div >
         </ div > 
       </ div > 
     </ div > 
   ); 
};