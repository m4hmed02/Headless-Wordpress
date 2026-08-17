import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartSummary({ totals = {}, shippingRates = [], coupons = [], onApplyCoupon }) {
  const [couponCode, setCouponCode] = useState('');

  // Totals come back as plain dollar strings, e.g. "155" = $155.00
  const toDollars = (amount) => {
    if (amount === undefined || amount === null) return 0;
    const numeric = parseFloat(amount);
    return isNaN(numeric) ? 0 : numeric;
  };

  // Extract the first available shipping rate from the shippingRates array.
  // WooCommerce returns: shippingRates = [{ shipping_rates: [{ price, name, ... }] }]
  const getShippingRate = () => {
    if (!shippingRates || shippingRates.length === 0) return null;
    const firstPackage = shippingRates[0];
    const rates = firstPackage?.shipping_rates || [];
    // Find the selected rate, or fall back to the first one
    const selected = rates.find((r) => r.selected) || rates[0];
    return selected || null;
  };

  const shippingRate = getShippingRate();
  const shippingPrice = shippingRate ? toDollars(shippingRate.price || 0) : 0;
  const isFreeShipping = !shippingRate || shippingPrice === 0;

  const subtotal = toDollars(totals.total_items);
  const discountAmount = toDollars(totals.total_discount);
  const taxAmount = toDollars(totals.total_tax);

  // Recalculate grand total using shipping from shippingRates so it's always accurate
  const grandTotal = subtotal - discountAmount + (isFreeShipping ? 0 : shippingPrice) + taxAmount;

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
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping — always shown */}
        <div className="flex justify-between text-gray-600">
          <span>
            Shipping
            {shippingRate?.name && (
              <span className="ml-1 text-xs text-gray-400">({shippingRate.name})</span>
            )}
          </span>
          {isFreeShipping ? (
            <span className="font-semibold text-green-600">Free</span>
          ) : (
            <span className="font-semibold text-gray-900">${shippingPrice.toFixed(2)}</span>
          )}
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        {taxAmount > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Estimated Tax</span>
            <span className="font-semibold text-gray-900">${taxAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-3">
          <span>Total Bill</span>
          <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Proceed to Checkout Button */}
      <Link to='/checkout' className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
        Proceed to Checkout
      </Link>
    </div>
  );
}
