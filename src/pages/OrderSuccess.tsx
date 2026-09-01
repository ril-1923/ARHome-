
interface OrderSuccessProps {
  onContinueShopping: () => void;
}

const OrderSuccess = ({
  onContinueShopping,
}: OrderSuccessProps) => {
  const order = JSON.parse(
    localStorage.getItem('latestOrder') || 'null'
  );

  if (!order) {
    return (
      <div className="text-center py-5">
        <h2 className="fw-bold mb-3">
          No Order Found
        </h2>

        <button
          type="button"
          className="btn btn-dark"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">

        <div className="card border-0 shadow-sm">
          <div className="card-body p-5 text-center">

            <div
              className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-4"
              style={{
                width: '80px',
                height: '80px',
                fontSize: '40px',
              }}
            >
              ✓
            </div>

            <h1 className="fw-bold mb-3">
              Order Placed Successfully!
            </h1>

            <p className="text-muted mb-4">
              Thank you for your order, {order.customer.name}.
            </p>

            <div className="border rounded p-4 text-start mb-4">

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  Order ID
                </span>

                <strong>
                  #{order.id}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  Items
                </span>

                <strong>
                  {order.totalItems}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  Payment
                </span>

                <strong>
                  {order.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : 'Online Payment'}
                </strong>
              </div>

              <div className="d-flex justify-content-between">
                <span className="text-muted">
                  Total
                </span>

                <strong>
                  ₹{order.total.toLocaleString('en-IN')}
                </strong>
              </div>

            </div>

            <div className="alert alert-light border text-start">
              <strong>Delivery Address</strong>

              <div className="text-muted mt-2">
                {order.deliveryAddress.address}
                <br />
                {order.deliveryAddress.city},{' '}
                {order.deliveryAddress.state}
                <br />
                Pincode: {order.deliveryAddress.pincode}
              </div>
            </div>

            <p className="text-muted small mb-4">
              Your order has been confirmed and will be processed shortly.
            </p>

            <button
              type="button"
              className="btn btn-dark btn-lg px-5"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;

