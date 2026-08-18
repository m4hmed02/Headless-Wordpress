import { useState } from "react";
import { Link } from "react-router-dom";
import addToWishlist from "../apis/Wishlist/addToWishlist";

export default function ProductCard({ product, wishlistIds = [] }) {
  const { id, name, price, regular_price, images, category, description } = product;
  const imageSrc =
    images?.[0]?.src ||
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";

  const customerId = localStorage.getItem("customerId");
  const isInWishlist = wishlistIds.includes(Number(id)) || wishlistIds.includes(String(id));

  const [wishlisted, setWishlisted] = useState(isInWishlist);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!customerId) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    if (wishlisted) {
      // Remove from wishlist — to be implemented later
      return;
    }

    try {
      setWishlistLoading(true);
      await addToWishlist(customerId, id);
      setWishlisted(true);
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    } finally {
      setWishlistLoading(false);
    }
  };

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

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 ${
            wishlisted
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/90 backdrop-blur-xs text-gray-400 hover:text-red-500 hover:bg-white"
          } ${wishlistLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {wishlistLoading ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill={wishlisted ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${id}`}>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>

        {description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1">{description}</p>
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
