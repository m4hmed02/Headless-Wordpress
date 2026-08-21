import { useEffect, useState } from "react";
import { getCustomerOrders, getGuestOrders } from "../apis/Checkout/getOrder";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. useEffect ke andar alag se async function banaya
    const fetchOrders = async () => {
      const customerId = localStorage.getItem("customerId");
      const cartToken = localStorage.getItem("cartToken");

      try {
        setLoading(true);
        setError("");

        if (customerId) {
          //for logged in users
          const response = await getCustomerOrders(customerId);
          setOrders(response.data || []);
          console.log(response.data)
        } else {
          // 2. For the guest users
          const response = await getGuestOrders();
          setOrders(response.data || []);
        }

      } catch (err) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <div className="space-y-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse ring-1 ring-black/5">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between">
                 <div className="flex gap-6">
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                      <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                      <div className="h-5 w-24 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                      <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    </div>
                 </div>
                 <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="px-6 py-4 flex flex-col md:flex-row gap-6">
                 <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                 </div>
                 <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-36 bg-gray-200 rounded"></div>
                 </div>
                 <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.order_id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}