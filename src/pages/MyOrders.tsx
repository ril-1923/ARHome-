
import { useState } from 'react';

interface OrderItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;

  customer: {
    name: string;
    email: string;
    phone: string;
  };

  deliveryAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  paymentMethod: string;

  items: OrderItem[];

  totalItems: number;
  subtotal: number;
  delivery: number;
  total: number;

  status: string;
  createdAt: string;
}

interface MyOrdersProps {
  onBackToProducts: () => void;
}

const MyOrders = ({
  onBackToProducts,
}: MyOrdersProps) => {
  const [orders] = useState<Order[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem('orders') || '[]'
      );
    } catch {
      return [];
    }
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h1 className="fw-bold mb-1">
            My Orders
          </h1>

          <p className="text-muted mb-0">
            View your furniture orders and order details.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onBackToProducts}
        >
          ← Continue Shopping
        </button>

      </div>

      {/* No Orders */}
      {orders.length === 0 ? (

        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">

            <div
              className="display-3 mb-3"
            >
              📦
            </div>

            <h3 className="fw-bold">
              No Orders Yet
            </h3>

            <p className="text-muted">
              Your completed orders will appear here.
            </p>

            <button
              type="button"
              className="btn btn-dark mt-2"
              onClick={onBackToProducts}
            >
              Start Shopping
            </button>

          </div>
        </div>

      ) : (

        <div className="row g-4">

          {orders
            .slice()
            .reverse()
            .map((order) => (

              <div
                className="col-12"
                key={order.id}
              >

                <div className="card border-0 shadow-sm">

                  <div className="card-body p-4">

                    {/* Order Header */}
                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">

                      <div>
                        <div className="text-muted small">
                          ORDER ID
                        </div>

                        <h5 className="fw-bold mb-1">
                          #{order.id}
                        </h5>

                        <small className="text-muted">
                          Placed on {formatDate(order.createdAt)}
                        </small>
                      </div>

                      <div className="text-md-end">

                        <span className="badge bg-success mb-2">
                          {order.status}
                        </span>

                        <div>
                          <strong className="fs-5">
                            ₹{order.total.toLocaleString('en-IN')}
                          </strong>
                        </div>

                      </div>

                    </div>

                    <hr />

                    {/* Products */}
                    <div className="mb-4">

                      {order.items.map((item) => (

                        <div
                          key={item.productId}
                          className="d-flex align-items-center mb-3"
                        >

                          <img
                            src={item.image}
                            alt={item.productName}
                            className="rounded"
                            style={{
                              width: '70px',
                              height: '70px',
                              objectFit: 'cover',
                            }}
                          />

                          <div className="ms-3 flex-grow-1">

                            <h6 className="fw-semibold mb-1">
                              {item.productName}
                            </h6>

                            <small className="text-muted">
                              Qty: {item.quantity}
                            </small>

                          </div>

                          <strong>
                            ₹{(
                              item.price * item.quantity
                            ).toLocaleString('en-IN')}
                          </strong>

                        </div>

                      ))}

                    </div>

                    {/* Order Information */}
                    <div className="row g-4">

                      {/* Payment */}
                      <div className="col-md-6">

                        <div className="border rounded p-3 h-100">

                          <h6 className="fw-bold">
                            Payment
                          </h6>

                          <p className="text-muted mb-0">
                            {order.paymentMethod === 'cod'
                              ? 'Cash on Delivery'
                              : 'Online Payment'}
                          </p>

                        </div>

                      </div>

                      {/* Delivery */}
                      <div className="col-md-6">

                        <div className="border rounded p-3 h-100">

                          <h6 className="fw-bold">
                            Delivery Address
                          </h6>

                          <p className="text-muted mb-0">
                            {order.deliveryAddress.address}
                            <br />
                            {order.deliveryAddress.city},{' '}
                            {order.deliveryAddress.state}
                            <br />
                            {order.deliveryAddress.pincode}
                          </p>

                        </div>

                      </div>

                    </div>

                    <hr />

                    {/* Price Summary */}
                    <div className="d-flex justify-content-end">

                      <div style={{ minWidth: '250px' }}>

                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">
                            Items
                          </span>

                          <span>
                            {order.totalItems}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">
                            Subtotal
                          </span>

                          <span>
                            ₹{order.subtotal.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">
                            Delivery
                          </span>

                          <span className="text-success">
                            {order.delivery === 0
                              ? 'FREE'
                              : `₹${order.delivery.toLocaleString('en-IN')}`}
                          </span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <strong>
                            Total
                          </strong>

                          <strong>
                            ₹{order.total.toLocaleString('en-IN')}
                          </strong>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
};

export default MyOrders;

