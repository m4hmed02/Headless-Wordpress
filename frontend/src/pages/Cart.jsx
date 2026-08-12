import { useEffect, useState } from "react"
import getCart from "../apis/Cart/getCart"
import CartItemsList from "../components/CartItemsList"
import CartSummary from "../components/CartSummary"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Cart() {
  const [cartData, setCartData] = useState({})
  const [loading, setLoading] = useState(true)
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

  const handleQuantityChange = (key, newQuantity) => {
    if (!cartData || !cartData.items) return;
    const updatedItems = cartData.items.map(item => {
      if ((item.key || item.id) === key) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartData({
      ...cartData,
      items: updatedItems,
      items_count: updatedItems.reduce((acc, curr) => acc + curr.quantity, 0)
    });
  };

  const handleRemoveItem = (key) => {
    if (!cartData || !cartData.items) return;
    const updatedItems = cartData.items.filter(item => (item.key || item.id) !== key);

    setCartData({
      ...cartData,
      items: updatedItems,
      items_count: updatedItems.reduce((acc, curr) => acc + curr.quantity, 0)
    });
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
            onRemoveItem={handleRemoveItem}
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

