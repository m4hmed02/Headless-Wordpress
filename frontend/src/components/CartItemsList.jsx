import React from 'react';

export default function CartItemsList({ items = [], onQuantityChange, onRemoveItem }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Your Cart is Empty</h3>
        <p className="text-gray-500 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
      <div className="p-4 sm:p-6 pb-4">
        <h2 className="text-lg font-bold text-gray-900">Cart Items ({items.length})</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item, index) => {
          const imageSrc = item.featured_image || item.images?.[0]?.src || item.image || '';
          const name = item.name || item.title || 'Product';
          const price = item.prices?.price ? `$${(parseInt(item.prices.price) / 100).toFixed(2)}` : (item.price || '$0.00');
          const quantity = item.quantity || 1;
          const key = item.key || item.id || index;

          return (
            <div key={key} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center">
                  {imageSrc ? (
                    <img src={imageSrc} alt={name} className="w-full h-full object-cover object-center" />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {name}
                  </h3>
                  <p className="text-sm font-medium text-gray-900 mt-1">{price}</p>
                </div>
              </div>

              {/* Actions: Quantity & Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 mt-2 sm:mt-0">
                {/* Quantity Controller */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => onQuantityChange && onQuantityChange(key, Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition-colors font-semibold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-semibold text-gray-800 min-w-[2rem] text-center bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onQuantityChange && onQuantityChange(key, quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition-colors font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <button
                    onClick={() => onRemoveItem && onRemoveItem(key)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
