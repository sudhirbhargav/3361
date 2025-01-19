import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, MessageSquare, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CartItem, CartItems } from './../types/index';

const product = {
  id: 1,
  name: "Study Desk Pro",
  price: 199.99,
  rating: 4.8,
  description: "The perfect desk for your dorm room or apartment. Features a spacious work surface, built-in cable management, and a sleek modern design.",
  features: [
    "Spacious 48\" x 24\" work surface",
    "Built-in cable management",
    "Sturdy steel frame",
    "Easy assembly",
    "Includes 2-year warranty",
  ],
  images: [
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1526887520775-4b14b8aed897?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ],
  reviews: [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2024-02-15",
      comment: "Perfect desk for my dorm room! Easy to assemble and very sturdy.",
    },
    {
      id: 2,
      user: "John D.",
      rating: 4,
      date: "2024-02-10",
      comment: "Great desk, but assembly took a bit longer than expected.",
    },
  ],
};

function ProductDetails() {
  const { id } = useParams();
  const {setCartItems}=useAuth()
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleAddToCart = () => {
    const newCartItem :CartItems={
      id: product.id.toString(),
    name: product.name,
    price: product.price.toString(),
    quantity: quantity.toString(),
    image: product.images.toString(),
    }
  setCartItems((prevCartItems) => {
      console.log("prevCartItems=",prevCartItems)
      if(prevCartItems===undefined){
        const items = prevCartItems ?? [];
        return [...items, newCartItem];
      }
      else{
      const items = prevCartItems ?? [];
        console.log("items",items)
      const existingItemIndex = items.findIndex(
        (item) => item.id === newCartItem.id
      );
  
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...items];
        updatedCartItems[existingItemIndex].quantity =Number(updatedCartItems[existingItemIndex].quantity)+ quantity;
        return updatedCartItems;
      }
  
      // Add new item to the cart
      return [...items, newCartItem];
    }
    });
    console.log(`Adding ${quantity} ${product.name}(s) to cart`);
    setQuantity(1)
  };

  
;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement review submission
    console.log("Submitting review:", { rating: newRating, comment: newComment });
    setNewComment("");
    setNewRating(5);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-indigo-600' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews.length} reviews)</span>
              </div>
              <p className="text-3xl font-bold text-indigo-600">${product.price}</p>
              <p className="text-gray-600">{product.description}</p>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              
              {/* Review Form */}
              <form onSubmit={handleSubmitReview} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewRating(rating)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating <= newRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Share your thoughts about this product..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{review.user}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;