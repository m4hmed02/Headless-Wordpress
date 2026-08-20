import { useState } from "react";
import { Link } from "react-router-dom";

import removeFromWishlist from "../apis/Wishlist/removeFromWishlist";


export default function WishlistProductCart({ product, onRemove }) {
  const imageSrc = product?.images?.[0]?.src || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80";

  const [error, setError] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleRemoveFromWishlist = async () => {
    const customerId = localStorage.getItem("customerId");
    const productID = product?.id;
    if (!customerId) {
      setError("Please Login To Remove Product from Wishlist")
      return
    }

    try {
      setWishlistLoading(true)
      const response = await removeFromWishlist(customerId, productID)
      console.log(response)
      if (response.success && onRemove) {
        onRemove(productID);
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setWishlistLoading(false)
    }
  }


  return (
    <div
      to={`/product/${product.id}`}
      className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:shadow-sm hover:border-gray-200 transition-all bg-white group">

      <Link
        to={`/product/${product.id}`}
        className="flex flex-1 items-center gap-3 min-w-0"
      >
        {/* Product Image */}
        <div
          className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100"
        >
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div>
            <h3 className="text-xs font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="text-xs font-bold text-gray-800 mt-1">
            ${product.price}
            {product.regular_price && product.regular_price !== product.price && (
              <span className="ml-1 text-[10px] text-gray-400 font-normal line-through">
                ${product.regular_price}
              </span>
            )}
          </p>
        </div>
      </Link>

      {/* Action Button */}
      <div className="flex-shrink-0">
        <button
          onClick={handleRemoveFromWishlist}
          disabled={wishlistLoading}
          className="text-[10px] bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {wishlistLoading ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
