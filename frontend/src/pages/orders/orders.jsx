import { Link } from "react-router-dom";

function Orders() {
  const savedOrder = localStorage.getItem("lastOrder");
  const order = savedOrder ? JSON.parse(savedOrder) : null;

  // No order yet
  if (!order) {
    return (
      <div className="min-h-screen bg-[#eaeded] py-8">
        <div className="mx-auto max-w-5xl px-4">

          <h1 className="mb-6 text-3xl font-normal text-gray-900">
            Your Orders
          </h1>

          <div className="rounded-lg bg-white p-10 text-center shadow-sm">

            <div className="text-6xl">
              📦
            </div>

            <h2 className="mt-4 text-2xl font-medium text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-600">
              You have not placed an order yet.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-full bg-[#ffd814] px-8 py-3 font-medium hover:bg-[#f7ca00]"
            >
              Start Shopping
            </Link>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="mx-auto max-w-5xl px-4">

        {/* PAGE TITLE */}
        <h1 className="mb-6 text-3xl font-normal text-gray-900">
          Your Orders
        </h1>

        {/* ORDER CARD */}
        <div className="rounded-lg bg-white p-6 shadow-sm">

          {/* ORDER HEADER */}
          <div className="grid gap-4 border-b border-gray-200 pb-5 md:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">
                Order placed
              </p>

              <p className="font-medium text-gray-900">
                {order.date}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order number
              </p>

              <p className="font-medium text-gray-900">
                {order.orderNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="font-medium text-green-700">
                {order.status}
              </p>
            </div>

          </div>

          {/* DELIVERY INFORMATION */}
          <div className="mt-6">

            <h2 className="text-xl font-semibold text-gray-900">
              Delivery Information
            </h2>

            <div className="mt-3 rounded border border-gray-200 bg-gray-50 p-4">

              <p className="font-medium text-gray-900">
                {order.customerName}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {order.address}
              </p>

              <p className="text-sm text-gray-600">
                {order.city}, Ethiopia
              </p>

              <p className="text-sm text-gray-600">
                Phone: {order.phone}
              </p>

            </div>

          </div>

          {/* PAYMENT */}
          <div className="mt-6">

            <h2 className="text-xl font-semibold text-gray-900">
              Payment Method
            </h2>

            <div className="mt-3 rounded border border-gray-200 bg-gray-50 p-4">

              <p className="font-medium text-gray-900">
                {order.paymentMethod}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Payment selected by customer
              </p>

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="mt-6">

            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Items in Your Order
            </h2>

            <div className="space-y-5">

              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row"
                  >

                    {/* IMAGE */}
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />

                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1">

                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 font-bold text-gray-900">
                        ${Number(item.price).toFixed(2)}
                      </p>

                    </div>

                    {/* ITEM TOTAL */}
                    <div className="text-left sm:text-right">

                      <p className="text-sm text-gray-500">
                        Item total
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        $
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  No products found in this order.
                </p>
              )}

            </div>

          </div>

          {/* ORDER SUMMARY */}
          <div className="mt-6 border-t border-gray-200 pt-6">

            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-4 ml-auto max-w-sm space-y-3">

              {/* SUBTOTAL */}
              <div className="flex justify-between text-gray-700">
                <span>
                  Subtotal
                </span>

                <span>
                  ${Number(order.subtotal || 0).toFixed(2)}
                </span>
              </div>

              {/* SHIPPING */}
              <div className="flex justify-between text-gray-700">
                <span>
                  Shipping
                </span>

                <span>
                  {Number(order.shipping || 0) === 0
                    ? "FREE"
                    : `$${Number(order.shipping).toFixed(2)}`}
                </span>
              </div>

              {/* SAVINGS */}
              <div className="flex justify-between text-green-700">
                <span>
                  Savings
                </span>

                <span>
                  -${Number(order.savings || 0).toFixed(2)}
                </span>
              </div>

              {/* TOTAL */}
              <div className="border-t pt-4">

                <div className="flex justify-between text-xl font-bold text-gray-900">

                  <span>
                    Total
                  </span>

                  <span>
                    ${Number(order.total || 0).toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CONTINUE SHOPPING */}
        <div className="mt-6 text-center">

          <Link
            to="/products"
            className="inline-block rounded-full bg-[#ffd814] px-8 py-3 font-medium text-gray-900 hover:bg-[#f7ca00]"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Orders;