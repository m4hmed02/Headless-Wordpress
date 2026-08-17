import { useState, useEffect } from "react";
import CheckoutSkeleton from "../components/CheckoutSkeleton";
import BillingForm from "../components/BillingForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import getCart from "../apis/Cart/getCart";
import placeOrder from "../apis/Checkout/placeOrder";

export default function Checkout() {
  const [cartData, setCartData] = useState({});
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);
        const res = await getCart();
        setCartData(res?.cart || res || {});
      } catch (err) {
        console.error("Failed to load cart:", err);
        setCartError("Failed to load cart details.");
      } finally {
        setCartLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async ({ billingAddress, shippingAddress, customerNote }) => {
    try {
      setSubmitting(true);
      setOrderError(null);
      const result = await placeOrder({
        billingAddress,
        shippingAddress,
        customerNote,
        paymentMethod: "cod", // default; extend as needed
      });
      console.log("Order placed:", result);
      setOrderSuccess(result);
    } catch (err) {
      console.error("Order failed:", err);
      setOrderError(
        err?.response?.data?.message || "Failed to place order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (cartLoading) return <CheckoutSkeleton />;

  if (cartError) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Unable to load checkout</h2>
        <p className="text-gray-500 text-sm">Please refresh the page or go back to your cart.</p>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="max-w-lg mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 text-sm">
          Thank you for your purchase. You'll receive a confirmation shortly.
        </p>
        {orderSuccess?.order_id && (
          <p className="mt-3 text-sm text-gray-700">
            Order #{orderSuccess.order_id}
          </p>
        )}
      </div>
    );
  }

  const items = cartData?.items || [];
  const totals = cartData?.totals || {};
  const shippingRates = cartData?.shipping_rates || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      {orderError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {orderError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Billing form */}
        <div className="lg:col-span-2">
          <BillingForm onSubmit={handlePlaceOrder} loading={submitting} />
        </div>

        {/* Right: Order summary */}
        <div className="lg:col-span-1">
          <CheckoutOrderSummary
            items={items}
            totals={totals}
            shippingRates={shippingRates}
          />
        </div>
      </div>
    </div>
  );
}
