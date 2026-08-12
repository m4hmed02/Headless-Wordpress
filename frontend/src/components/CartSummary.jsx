import React, { useState } from 'react';

export default function CartSummary({ totals = {}, shippingRates = [], coupons = [], onApplyCoupon }) {
  const [couponCode, setCouponCode] = useState('');

  // Format currency from WooCommerce cent/string amounts or direct numbers
  const formatMoney = (amount) => {
    if (amount === undefined || amount === null) return '$0.00';
    if (typeof amount === 'number') return `$${amount.toFixed(2)}`;
    // Check if string contains currency symbol or needs formatting
    const numeric = parseFloat(amount);
    if (isNaN(numeric)) return '$0.00';
    // WooCommerce Store API usually gives price in minor units (cents) or formatted decimal strings
    return `$${(numeric / (amount.length > 5 ? 100 : 1)).toFixed(2)}`;
  };

  const subtotal = totals.total_items ? formatMoney(totals.total_items) : '$0.00';
  const shippingTotal = totals.total_shipping ? formatMoney(totals.total_shipping) : '$0.00';
  const discountTotal = totals.total_discount ? formatMoney(totals.total_discount) : '$0.00';
  const grandTotal = totals.total_price ? formatMoney(totals.total_price) : '$0.00';

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCode.trim() && onApplyCoupon) {
      onApplyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
        Order Summary
      </h2>

      {/* Coupon Form */}
      <form onSubmit={handleCouponSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Apply
        </button>
      </form>

      {/* Applied Coupons List */}
      {coupons.length > 0 && (
        <div className="space-y-1">
          {coupons.map((coupon, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs text-green-600 bg-green-50 p-2 rounded">
              <span>Coupon: <strong>{coupon.code || coupon}</strong></span>
              <span>Applied</span>
            </div>
          ))}
        </div>
      )}

      {/* Bill Details Breakdown */}
      <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">{subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping Charges</span>
          <span className="font-semibold text-gray-900">
            {totals.total_shipping && parseInt(totals.total_shipping) > 0 ? shippingTotal : 'Calculated at checkout'}
          </span>
        </div>

        {totals.total_discount && parseInt(totals.total_discount) > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-semibold">-{discountTotal}</span>
          </div>
        )}

        {totals.total_tax && parseInt(totals.total_tax) > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Estimated Tax</span>
            <span className="font-semibold text-gray-900">{formatMoney(totals.total_tax)}</span>
          </div>
        )}

        <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-3">
          <span>Total Bill</span>
          <span className="text-blue-600">{grandTotal}</span>
        </div>
      </div>

      {/* Proceed to Checkout Button */}
      <button
        onClick={() => alert('Proceeding to checkout...')}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <span>Proceed to Checkout</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}
