import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Tags, 
  MousePointerClick, 
  Shield, 
  Users,
} from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Your Campus Essentials,
              <span className="text-blue-600"> Simplified</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Everything MIT students need to set up their campus life, curated and delivered with care.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-gray-600">Designed specifically for MIT students' needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={ShoppingBag}
            title="Curated Essentials"
            description="Predefined categories and bundled packages tailored to students' cultural and regional needs."
          />
          <FeatureCard
            icon={Sparkles}
            title="Smart Recommendations"
            description="Intelligent suggestions based on your preferences, region, and past selections."
          />
          <FeatureCard
            icon={Tags}
            title="Exclusive Discounts"
            description="Special bulk-buy deals and partnerships with local vendors for better prices."
          />
          <FeatureCard
            icon={MousePointerClick}
            title="Seamless Experience"
            description="One-click checkout and integrated student reviews for informed decisions."
          />
          <FeatureCard
            icon={Shield}
            title="Secure Access"
            description="Authentication via MIT credentials ensuring exclusive access for students."
          />
          <FeatureCard
            icon={Users}
            title="Community Driven"
            description="Built on student feedback and reviews to create a better shopping experience."
          />
        </div>
      </div>
    </>
  );
}