import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import getWishlist from "../../apis/Wishlist/getWishlist";
import { getMultipleProducts } from "../../apis/Products/getProducts";
import WishlistProductCart from "../WishlistProductCart";


export default function ProfileWishlistTab() {

  const [prodcutIDs, setProductIDs] = useState([])
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    const loadWishlist = async () => {
      const customerId = localStorage.getItem("customerId");

      if (!customerId) {
        setError("Please Login To Add Product to Wishlist")
        return
      }

      setLoading(true)
      try {
        const response = await getWishlist(customerId)
        setProductIDs(response.data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    loadWishlist()
  }, [])

  useEffect(() => {
    if (prodcutIDs.length === 0) {
      setProducts([])
      return
    }

    const loadProducts = async () => {
      try {
        setError(null)
        setLoading(true)

        const response = await getMultipleProducts(prodcutIDs)
        console.log(response)
        setProducts(response.data || response || [])

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()

  }, [prodcutIDs])


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
            Browse products and add to wishlist.
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
        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-2 gap-4 min-w-[600px]">
            {products.map((product) => (
              <WishlistProductCart
                key={product.id}
                product={product}
                onRemove={(id) => {
                  setProducts((prev) => prev.filter((p) => p.id !== id));
                  setProductIDs((prev) => prev.filter((pid) => pid !== id));
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
