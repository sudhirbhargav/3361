import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, MessageSquare } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  features: string[];
  comments: Comment[];
}

const product: Product = {
  id: 1,
  name: 'Premium Laptop Stand',
  price: 49.99,
  rating: 4.8,
  reviews: 156,
  description: 'Ergonomic laptop stand perfect for students. Adjustable height and angle for comfortable viewing. Portable and foldable design.',
  images: [
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a47?auto=format&fit=crop&q=80',
  ],
  features: [
    'Adjustable height',
    'Portable design',
    'Anti-slip surface',
    'Heat dissipation',
  ],
  comments: [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Great product! Really helps with posture during long study sessions.',
      date: '2024-03-15',
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Good quality, but a bit pricey.',
      date: '2024-03-14',
    },
  ],
};

export function ProductDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);

  const handleAddToCart = (): void => {
    // Add to cart logic here
    console.log('Added to cart:', product);
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add comment logic here
    console.log('New comment:', { rating: newRating, comment: newComment });
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-semibold">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{product.reviews} reviews</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-600">{feature}</li>
            ))}
          </ul>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          Customer Reviews
        </h2>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setNewRating(rating)}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      rating <= newRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={newComment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              rows={4}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share your thoughts about this product..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {product.comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">{comment.user}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < comment.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
