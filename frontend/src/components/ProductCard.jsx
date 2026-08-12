import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { id, name, price, regular_price, images, category, description } = product;
  const imageSrc = images?.[0]?.src || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full group">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-full text-gray-700 shadow-xs">
            {category}
          </span>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${id}`}>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>
        
        {description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            {regular_price && (
              <span className="text-xs text-gray-400 line-through">${regular_price}</span>
            )}
          </div>

          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

