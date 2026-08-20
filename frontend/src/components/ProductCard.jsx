import { useState } from "react";
import { Link } from "react-router-dom";
import addToWishlist from "../apis/Wishlist/addToWishlist";
import addToCart from "../apis/Cart/addToCart";

export default function ProductCard({ product, wishlistIds = [] }) {
  const { id, name, price, regular_price, images, category, short_description, description, type } = product;
  const imageSrc =
    images?.[0]?.src ||
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";

  const customerId = localStorage.getItem("customerId");
  const isInWishlist = wishlistIds.includes(Number(id)) || wishlistIds.includes(String(id));

  const [wishlisted, setWishlisted] = useState(isInWishlist);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!customerId) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    if (wishlisted) {
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

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setCartLoading(true);
      await addToCart(id, 1);
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setCartLoading(false);
    }
  };

  const descriptionHtml = short_description || description || "";

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

        {descriptionHtml && (
          <div
            className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1 prose prose-xs max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            {regular_price && regular_price !== price && (
              <span className="text-xs text-gray-400 line-through">${regular_price}</span>
            )}
          </div>

          {type === "grouped" ? (
            <Link
              to={`/product/${id}`}
              className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors"
            >
              View Product
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={cartLoading || cartAdded}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
            >
              {cartLoading ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Adding...
                </>
              ) : cartAdded ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added!
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
