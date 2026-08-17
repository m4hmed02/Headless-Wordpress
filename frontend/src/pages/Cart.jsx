import { useEffect, useState } from "react"
import getCart from "../apis/Cart/getCart"
import CartItemsList from "../components/CartItemsList"
import CartSummary from "../components/CartSummary"
import LoadingSpinner from "../components/LoadingSpinner"
import removeItemFromCart from '../apis/Cart/removeItemFromCart'
import updateCartItemQuantity from '../apis/Cart/updateCartItemQuantity'

export default function Cart() {
  const [cartData, setCartData] = useState({})
  const [loading, setLoading] = useState(true)
  const [updatingKey, setUpdatingKey] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true)
        const res = await getCart()
        console.log("Cart API data:", res)
        setCartData(res?.cart || res || {})
      } catch (err) {
        console.error('Failed to load cart:', err);
        setError('Failed to fetch cart items.');
      } finally {
        setLoading(false)
      }
    };
    fetchCartItems()
  }, [])

  const handleRemoveItemFromCart = async (key) => {
    const previousCartData = cartData

    try {
      // Show spinner on item first, before any state change
      setUpdatingKey(key)
      const res = await removeItemFromCart(key)
      console.log("Remove response:", res)

      // Try to sync with server response — handle all possible shapes
      const updatedCart = res?.cart || res?.data?.cart || res?.data || null
      if (updatedCart?.items !== undefined) {
        setCartData(updatedCart)
      } else {
        // Fallback: remove item from local state if API shape is unrecognised
        setCartData(prev => ({
          ...prev,
          items: (prev?.items || []).filter(i => (i.key || i.id) !== key)
        }))
      }
    } catch (error) {
      console.error("Error removing item from cart:", error)
      setCartData(previousCartData) // Rollback on error
      setError("Failed to remove item from cart")
    } finally {
      setUpdatingKey(null)
    }
  }

  const handleQuantityChange = async (key, newQuantity) => {
    const item = cartData?.items?.find(i => (i.key || i.id) === key)
    if (!item || newQuantity === "" || newQuantity === item.quantity) return

    try {
      setUpdatingKey(key)
      const response = await updateCartItemQuantity(key, newQuantity)
      console.log("Update quantity response:", response)
      setCartData(response?.cart || response || {})
    } catch (error) {
      console.error("Error updating cart item quantity:", error)
      setError("Failed to update cart item quantity")
    } finally {
      setUpdatingKey(null)
    }
  };

  const handleApplyCoupon = (code) => {
    console.log("Applying coupon code:", code);
  };

  if (loading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }


  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const items = cartData?.items || [];
  const totals = cartData?.totals || {};
  const shippingRates = cartData?.shipping_rates || [];
  const coupons = cartData?.coupons || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Items list & quantity adjustments */}
        <div className="lg:col-span-2">
          <CartItemsList
            items={items}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItemFromCart}
            updatingKey={updatingKey}
          />
        </div>

        {/* Right Side: Bill details, coupon, and checkout button */}
        <div className="lg:col-span-1">
          <CartSummary
            totals={totals}
            shippingRates={shippingRates}
            coupons={coupons}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      </div>
    </div>
  );
}

