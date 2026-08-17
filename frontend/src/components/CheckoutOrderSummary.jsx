import { formatMoney } from "../utils/formatMoney";

export default function CheckoutOrderSummary({ items = [], totals = {}, shippingRates = [] }) {
  const toDollars = (amount) => {
    if (amount === undefined || amount === null) return 0;
    const numeric = parseFloat(amount);
    return isNaN(numeric) ? 0 : numeric;
  };

  const getShippingRate = () => {
    if (!shippingRates || shippingRates.length === 0) return null;
    const rates = shippingRates[0]?.shipping_rates || [];
    return rates.find((r) => r.selected) || rates[0] || null;
  };

  const shippingRate = getShippingRate();
  const shippingPrice = shippingRate ? toDollars(shippingRate.price || 0) : 0;
  const isFreeShipping = !shippingRate || shippingPrice === 0;

  const subtotal = toDollars(totals.total_items);
  const discountAmount = toDollars(totals.total_discount);
  const taxAmount = toDollars(totals.total_tax);
  const grandTotal = subtotal - discountAmount + (isFreeShipping ? 0 : shippingPrice) + taxAmount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6 space-y-5">
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">
        Order Summary
      </h2>

      {/* Items list */}
      {items.length > 0 ? (
        <ul className="divide-y divide-gray-100 -mx-1">
          {items.map((item, index) => {
            const key = item.key || item.id || index;
            const name = item.name || item.title || "Product";
            const imageSrc = item.featured_image || item.images?.[0]?.src || item.image || "";
            const price = item.prices?.price
              ? formatMoney(item.prices.price)
              : item.price || "$0.00";
            const qty = item.quantity || 1;

            return (
              <li key={key} className="flex items-center gap-3 py-3 px-1">
                <div className="w-12 h-12 rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {imageSrc ? (
                    <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-400">?</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                  <p className="text-xs text-gray-500">Qty: {qty}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{price}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 italic">No items in cart.</p>
      )}

      {/* Totals breakdown */}
      <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

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
            <span>Tax</span>
            <span className="font-semibold text-gray-900">${taxAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-3">
          <span>Total</span>
          <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
