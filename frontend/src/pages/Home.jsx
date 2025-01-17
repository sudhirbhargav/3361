import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ShoppingBag, Star } from 'lucide-react';

const sliderImages = [
  {
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80',
    title: 'Study Essentials',
    description: 'Everything you need for a productive semester'
  },
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    title: 'Dorm Living',
    description: 'Make your dorm feel like home'
  },
  {
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
    title: 'Tech Gadgets',
    description: 'Stay connected with the latest technology'
  }
];

const topSellingProducts = [
  {
    id: 1,
    name: 'Premium Laptop Stand',
    price: 49.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80',
    reviews: 156
  },
  {
    id: 2,
    name: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80',
    reviews: 342
  },
  {
    id: 3,
    name: 'Smart LED Desk Lamp',
    price: 39.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80',
    reviews: 89
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    price: 299.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505843490578-d3186c8e4560?auto=format&fit=crop&q=80',
    reviews: 267
  }
];

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-xl">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">${product.price}</span>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Home() {
  return (
    <div>
      {/* Hero Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[500px]"
      >
        {sliderImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl">{slide.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Top Selling Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Top Selling Products</h2>
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
          >
            View All
            <ShoppingBag className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}