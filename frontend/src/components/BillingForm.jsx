import { useState } from "react";

const initialAddress = {
  first_name: "",
  last_name: "",
  company: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  email: "",
  phone: "",
};

const countries = [
    { code: "PK", name: "Pakistan" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "IN", name: "India" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "TR", name: "Turkey" },
    { code: "MY", name: "Malaysia" },
    { code: "SG", name: "Singapore" }
];

export default function BillingForm({ 
  onSubmit, 
  loading, 
  shippingRates = [], 
  selectedShippingMethod, 
  onShippingMethodChange,
  selectedPaymentMethod,
  onPaymentMethodChange
}) {
  const [billing, setBilling] = useState(initialAddress);
  const [shipping, setShipping] = useState(initialAddress);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [customerNote, setCustomerNote] = useState("");

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      billingAddress: billing,
      shippingAddress: sameAsBilling ? billing : shipping,
      customerNote,
      paymentMethod: selectedPaymentMethod,
    });
  };

  // Get shipping rates from the first package
  const availableShippingRates = shippingRates?.[0]?.shipping_rates || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Address */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">Billing Address</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" name="first_name" value={billing.first_name} onChange={handleBillingChange} required />
          <Field label="Last Name" name="last_name" value={billing.last_name} onChange={handleBillingChange} required />
          <Field label="Email" name="email" type="email" value={billing.email} onChange={handleBillingChange} required />
          <Field label="Phone" name="phone" type="tel" value={billing.phone} onChange={handleBillingChange} />
          <Field label="Company" name="company" value={billing.company} onChange={handleBillingChange} />
          
          <div>
              <label
                  htmlFor="billing-country"
                  className="block text-sm font-medium text-gray-700 mb-1"
              >
                  Country <span className="text-red-500">*</span>
              </label>

              <select
                  id="billing-country"
                  name="country"
                  value={billing.country}
                  onChange={handleBillingChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
              >
                  <option value="">Select Country</option>

                  {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                          {country.name}
                      </option>
                  ))}
              </select>
          </div>
          
          <Field label="Address Line 1" name="address_1" value={billing.address_1} onChange={handleBillingChange} className="sm:col-span-2" required />
          <Field label="Address Line 2" name="address_2" value={billing.address_2} onChange={handleBillingChange} className="sm:col-span-2" />
          <Field label="City" name="city" value={billing.city} onChange={handleBillingChange} required />
          <Field label="State / Province" name="state" value={billing.state} onChange={handleBillingChange} />
          <Field label="Postcode / ZIP" name="postcode" value={billing.postcode} onChange={handleBillingChange} required />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Shipping Address</h2>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={(e) => setSameAsBilling(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            Same as billing
          </label>
        </div>

        {sameAsBilling ? (
          <p className="text-sm text-gray-400 italic">Using billing address for shipping.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" name="first_name" value={shipping.first_name} onChange={handleShippingChange} required />
            <Field label="Last Name" name="last_name" value={shipping.last_name} onChange={handleShippingChange} required />
            <Field label="Company" name="company" value={shipping.company} onChange={handleShippingChange} />

            <div>
                <label
                    htmlFor="billing-country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Country <span className="text-red-500">*</span>
                </label>

                <select
                    id="billing-country"
                    name="country"
                    value={billing.country}
                    onChange={handleBillingChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
                >
                    <option value="">Select Country</option>

                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <Field label="Address Line 1" name="address_1" value={shipping.address_1} onChange={handleShippingChange} className="sm:col-span-2" required />
            <Field label="Address Line 2" name="address_2" value={shipping.address_2} onChange={handleShippingChange} className="sm:col-span-2" />
            <Field label="City" name="city" value={shipping.city} onChange={handleShippingChange} required />
            <Field label="State / Province" name="state" value={shipping.state} onChange={handleShippingChange} />
            <Field label="Postcode / ZIP" name="postcode" value={shipping.postcode} onChange={handleShippingChange} required />
          </div>
        )}
      </div>

      {/* Shipping Options */}
      {availableShippingRates.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Shipping options</h2>
          <div className="space-y-3">
            {availableShippingRates.map((rate) => {
              // Convert minor units to dollars
              const priceNum = rate.price ? parseFloat(rate.price) : 0;
              const formattedPrice = priceNum === 0 ? "FREE" : `Rs ${priceNum}`; // Using Rs as shown in screenshot

              return (
                <label
                  key={rate.rate_id}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${
                    selectedShippingMethod === rate.rate_id
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_method"
                      value={rate.rate_id}
                      checked={selectedShippingMethod === rate.rate_id}
                      onChange={() => onShippingMethodChange(rate.rate_id)}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm font-medium text-gray-900">{rate.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{formattedPrice}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Payment Options */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">Payment options</h2>
        <div className="space-y-3">
          {[
            {
              id: "bacs",
              title: "Direct bank transfer",
              desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
            },
            { id: "cheque", title: "Check payments", desc: "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode." },
            { id: "cod", title: "Cash on delivery", desc: "Pay with cash upon delivery." },
          ].map((method) => (
            <div
              key={method.id}
              className={`border rounded-xl transition-colors ${
                selectedPaymentMethod === method.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <label className="flex items-center gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id}
                  onChange={() => onPaymentMethodChange(method.id)}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-sm font-medium text-gray-900">{method.title}</span>
              </label>
              {selectedPaymentMethod === method.id && (
                <div className="px-4 pb-4 text-sm text-gray-600">
                  {method.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Notes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">Order Notes</h2>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes about your order (optional)
        </label>
        <textarea
          value={customerNote}
          onChange={(e) => setCustomerNote(e.target.value)}
          rows={3}
          placeholder="e.g. delivery instructions, special requests..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Placing Order...
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </form>
  );
}

// ─── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, name, value, onChange, type = "text", required = false, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
