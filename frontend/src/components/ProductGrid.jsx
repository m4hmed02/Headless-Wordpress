import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../apis/Products/getProducts';
import getWishlist from '../apis/Wishlist/getWishlist';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        if (!customerId) return;
        const wishlistData = await getWishlist(customerId);
        const ids = Array.isArray(wishlistData)
          ? wishlistData.map((item) =>
              typeof item === 'object' ? item.product_id ?? item.id : item
            )
          : [];
        setWishlistIds(ids);
      } catch (err) {
        // Silently ignore wishlist errors — don't block the product grid
        console.error('Failed to load wishlist:', err);
      }
    };

    fetchProducts();
    fetchWishlist();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500 mt-1">Explore our latest selection of items</p>
        </div>
        <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full">
          Showing{' '}
          {products.length > 0
            ? `${startIndex + 1}-${Math.min(startIndex + itemsPerPage, products.length)} of ${products.length}`
            : '0'}{' '}
          products
        </span>
      </div>

      {/* Loading Skeleton Grid */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center text-sm">
          {error}
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} wishlistIds={wishlistIds} />
            ))}
          </div>

          {/* Pagination Controls */}
          {products.length > itemsPerPage && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
              >
                &larr; Previous
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
