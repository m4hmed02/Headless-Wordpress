import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsById } from "../apis/Products/getProducts";
import ProductSkeleton from "../components/ProductSkeleton";
import addToCart from "../apis/Cart/addToCart";

export default function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProductsById(id);
        setProductData(data);
        console.log("Product by id:", data);
      } catch (err) {
        console.error("Failed to load product by id", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);


  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      setCartError(null);
      setCartSuccess(false);

      const cart = await addToCart(id, quantity);
      console.log("Product added to cart:", cart);
      
      setCartSuccess(true);
      setTimeout(() => {
        setCartSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      setCartError(error.response?.data?.message || error.message || "Failed to add product to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error || !productData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">{error || "Unable to fetch product details."}</p>
        <Link to="/" className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const {
    name,
    price,
    regular_price,
    sale_price,
    on_sale,
    description,
    short_description,
    images = [],
    categories = [],
    tags = [],
    attributes = [],
    dimensions,
    weight,
    sku,
    stock_status,
    stock_quantity,
    type,
    external_url,
    button_text,
    average_rating,
    rating_count,
    reviews_allowed
  } = productData;

  const currentImage = images[selectedImage]?.src || images[0]?.src || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";


  const hasDimensions = dimensions && (dimensions.length || dimensions.width || dimensions.height);
  const hasAdditionalInfo = weight || hasDimensions || (attributes && attributes.length > 0) || (tags && tags.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex text-sm text-gray-500 mb-8 space-x-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        {categories[0] && (
          <>
            <span className="hover:text-blue-600 transition-colors">{categories[0].name}</span>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900 font-medium truncate">{name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
            <img
              src={currentImage}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
            {on_sale && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Sale
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${selectedImage === idx ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                >
                  <img src={img.src} alt={img.name || `${name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Actions */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Categories & Stock Status */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {categories.map((cat) => (
                <span key={cat.id} className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {cat.name}
                </span>
              ))}
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${stock_status === "instock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                {stock_status === "instock" ? (stock_quantity ? `In Stock (${stock_quantity})` : "In Stock") : "Out of Stock"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{name}</h1>

            {/* Ratings & SKU */}
            <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
              {average_rating && parseFloat(average_rating) > 0 && (
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <span>★</span>
                  <span>{average_rating}</span>
                  <span className="text-gray-400">({rating_count} reviews)</span>
                </div>
              )}
              {sku && <span>SKU: <strong className="text-gray-700">{sku}</strong></span>}
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-gray-900">${price}</span>
              {regular_price && regular_price !== price && (
                <span className="text-lg text-gray-400 line-through">${regular_price}</span>
              )}
            </div>

            {/* Product Description */}
            {(description || short_description) && (
              <div
                className="text-sm text-gray-600 leading-relaxed mb-6 border-b border-gray-100 pb-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: description || short_description }}
              />
            )}

            {/* Actions: External Link or Add to Cart */}
            {type === "external" ? (
              <a
                href={external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>{button_text || "Buy External Product"}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 font-bold text-gray-900 text-sm min-w-[2.5rem] text-center bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding || stock_status !== "instock"}
                  className={`flex-1 py-3.5 px-6 font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 ${
                    cartSuccess
                      ? "bg-green-600 text-white"
                      : isAdding
                      ? "bg-blue-400 text-white cursor-not-allowed"
                      : stock_status !== "instock"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>
                    {isAdding ? "Adding..." : cartSuccess ? "Added to Cart!" : "Add to Cart"}
                  </span>
                </button>
              </div>
            )}

            {/* Success & Error Messages */}
            {cartSuccess && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200">
                Product successfully added to your cart!
              </div>
            )}
            {cartError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-200">
                {cartError}
              </div>
            )}

            {/* Tags Badge list */}
            {tags && tags.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span className="font-semibold text-gray-700">Tags:</span>
                {tags.map((tag) => (
                  <span key={tag.id} className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Specifications / Additional Information Section */}
      {hasAdditionalInfo && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h2>
          <div className="max-w-2xl bg-white rounded-xl border border-gray-100 p-6 divide-y divide-gray-100 text-sm shadow-xs">
            {weight && (
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-500">Weight</span>
                <span className="text-gray-900">{weight} kg</span>
              </div>
            )}
            {hasDimensions && (
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-500">Dimensions</span>
                <span className="text-gray-900">
                  {dimensions.length} × {dimensions.width} × {dimensions.height} cm
                </span>
              </div>
            )}
            {attributes && attributes.map((attr, idx) => (
              <div key={idx} className="flex justify-between py-2">
                <span className="font-medium text-gray-500">{attr.name}</span>
                <span className="text-gray-900">{attr.options ? attr.options.join(", ") : ""}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



