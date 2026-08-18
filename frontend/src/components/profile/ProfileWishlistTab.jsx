import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getWishlist from "../../apis/Wishlist/getWishlist";
import { getProductsById } from "../../apis/Products/getProducts";
import removeFromWishlist from "../../apis/Wishlist/removeFromWishlist";

export default function ProfileWishlistTab() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleRemove = async (productId) => {
    try {
      const customerId = localStorage.getItem("customerId");
      if (!customerId) return;
      
      await removeFromWishlist(customerId, productId);
      
      setProducts(products.filter(p => p.id !== productId));
    } catch (err) {
      console.error("Failed to remove product from wishlist:", err);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const customerId = localStorage.getItem("customerId");
        if (!customerId) {
          setProducts([]);
          return;
        }

        const wishlistData = await getWishlist(customerId);
        // wishlistData might be { success: true, data: [...] } or just an array
        const actualData = wishlistData?.data || wishlistData;
        const productIds = Array.isArray(actualData)
          ? actualData.map((item) =>
              typeof item === "object" ? item.product_id ?? item.id : item
            )
          : [];

        if (productIds.length === 0) {
          setProducts([]);
          return;
        }

        const productDetails = await Promise.all(
          productIds.map((pid) => getProductsById(pid).catch(() => null))
        );

        setProducts(productDetails.filter(Boolean));
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        setError("Failed to load wishlist. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl animate-pulse"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm text-center">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm font-medium">Your wishlist is empty.</p>
          <p className="text-gray-400 text-xs mt-1">
            Browse products and click the ♡ button to save them here.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}

      {/* Wishlist Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => {
            const imageSrc =
              product.images?.[0]?.src ||
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80";
            return (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100"
                >
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">
                    ${product.price}
                    {product.regular_price && product.regular_price !== product.price && (
                      <span className="ml-1.5 text-xs text-gray-400 font-normal line-through">
                        ${product.regular_price}
                      </span>
                    )}
                  </p>
                  <span
                    className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      product.stock_status === "instock"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View
                  </Link>
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id)}
                    className="text-xs text-center border border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors"
                    title="Remove from wishlist"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
