export default function OrderCard({ order, onCancelOrder }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ring-1 ring-black/5">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Order Number</p>
            <p className="font-medium text-gray-900">#{order.order_number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Date Placed</p>
            <p className="font-medium text-gray-900">
              {new Date(order.date_created.replace(' ', 'T')).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Amount</p>
            <p className="font-medium text-gray-900 flex items-center">
              <span dangerouslySetInnerHTML={{ __html: order.currency_symbol }}></span>
              {order.total}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {['processing', 'pending', 'on-hold'].includes(order.status) && (
            <button
              onClick={() => onCancelOrder && onCancelOrder(order.order_id)}
              className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-100"
            >
              Cancel Order
            </button>
          )}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'completed' ? 'bg-green-100 text-green-800' :
            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {order.status_label}
          </span>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Billing & Shipping</h3>
          <div className="text-sm text-gray-600">
            <p>{order.billing.first_name} {order.billing.last_name}</p>
            <p>{order.billing.email}</p>
            <p>{order.billing.phone}</p>
            <p className="mt-1">{order.billing.address_1}</p>
            {order.shipping.city && <p>{order.shipping.city}</p>}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Details</h3>
          <div className="text-sm text-gray-600">
            <p>Method: {order.payment_method_title}</p>
            <p className="flex items-center gap-1">
              Subtotal: <span dangerouslySetInnerHTML={{ __html: order.currency_symbol }}></span>{order.subtotal}
            </p>
            <p className="flex items-center gap-1">
              Shipping: <span dangerouslySetInnerHTML={{ __html: order.currency_symbol }}></span>{order.shipping_total}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Items Summary</h3>
          <div className="text-sm text-gray-600">
            <p>{order.items?.length || 0} item(s) in this order.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
