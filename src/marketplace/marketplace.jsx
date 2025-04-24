import React from 'react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Vintage Camera',
    category: 'Vintage Camera',
    price: 1500000,
    image: 'https://i.pinimg.com/736x/fb/09/72/fb0972cf103d7fb81c9be254a63db108.jpg',
  },
  {
    id: 2,
    name: 'SnapBack',
    category: 'SnapBack',
    price: 30000,
    image: 'https://i.pinimg.com/736x/ad/af/f5/adaff59d4764550a54883f9c4b965eae.jpg',
  },
  {
    id: 3,
    name: 'Apple AirPods Pro',
    category: 'Apple AirPods Pro',
    price: 45000,
    image: 'https://i.pinimg.com/736x/8d/6d/f8/8d6df8d9ffe7036181c420711ae7fc5f.jpg',
  },
  {
    id: 4,
    name: 'Ceramic Mug Set',
    category: 'iphone Cases',
    price: 15000,
    image: 'https://i.pinimg.com/736x/4d/cc/88/4dcc8842ff27e0a0ba390e1cedd922ed.jpg',
  },
];

export default function MarketplaceSection() {
  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.category}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    mwk{product.price.toFixed(2)}
                  </span>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a href="https://snapbacks.netlify.app/">
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200">
            Explore Market
          </button>
        </div>
        
        </a>
       
      </div>
    </section>
  );
}
