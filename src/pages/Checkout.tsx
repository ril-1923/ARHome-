
import { useState } from 'react';
import type { Product } from '../types/product';

interface CartProduct {
  product: Product;
  quantity: number;
}

interface CheckoutProps {
  cart: CartProduct[];
  onBackToCart: () => void;
  onOrderComplete: () => void;
}

const Checkout = ({
  cart,
  onBackToCart,
  onOrderComplete,
}: CheckoutProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const delivery = 0;
  const total = subtotal + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Prevent double-clicking the button
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Create unique order ID
    const orderId = `ARF-${Date.now()}`;

    // Create order object
    const order = {
      id: orderId,

      customer: {
        name,
        email,
        phone,
      },

      deliveryAddress: {
        address,
        city,
        state,
        pincode,
      },

      paymentMethod,

      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),

      totalItems,
      subtotal,
      delivery,
      total,

      status: 'Order Placed',

      createdAt: new Date().toISOString(),
    };

    // Save latest order
    localStorage.setItem(
      'latestOrder',
      JSON.stringify(order)
    );

    // Get existing orders
    const existingOrders = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );

    // Add new order
    existingOrders.push(order);

    // Save all orders
    localStorage.setItem(
      'orders',
      JSON.stringify(existingOrders)
    );

    // Complete checkout
    onOrderComplete();
  };

  return (
    <div className="container py-5">

      {/* Page Header */}
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={onBackToCart}
        >
          ← Back to Cart
        </button>

        <h1 className="fw-bold mb-1">
          Checkout
        </h1>

        <p className="text-muted">
          Complete your details and place your order.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-lg-7">

            {/* Contact Information */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Contact Information
                </h4>

                <div className="row g-3">

                  {/* Name */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      required
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Delivery Address
                </h4>

                <div className="row g-3">

                  {/* Address */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Street Address
                    </label>

                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="House / Flat number, street, area"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      City
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      State
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      value={state}
                      onChange={(e) =>
                        setState(e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Pincode */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Pincode
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="600001"
                      value={pincode}
                      onChange={(e) =>
                        setPincode(e.target.value)
                      }
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Payment Method
                </h4>

                {/* Cash on Delivery */}
                <div
                  className={`border rounded p-3 mb-3 ${
                    paymentMethod === 'cod'
                      ? 'border-dark'
                      : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setPaymentMethod('cod')
                  }
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="cod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="cod"
                    >
                      Cash on Delivery
                    </label>

                    <div className="text-muted small ms-4">
                      Pay when your furniture is delivered.
                    </div>
                  </div>
                </div>

                {/* Online Payment */}
                <div
                  className={`border rounded p-3 ${
                    paymentMethod === 'online'
                      ? 'border-dark'
                      : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setPaymentMethod('online')
                  }
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="online"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="online"
                    >
                      Online Payment
                    </label>

                    <div className="text-muted small ms-4">
                      UPI, cards and other online payment methods.
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-5">

            <div
              className="card border-0 shadow-sm sticky-top"
              style={{ top: '20px' }}
            >
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Order Summary
                </h4>

                {/* Products */}
                <div className="mb-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="d-flex align-items-center mb-3"
                    >

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="rounded"
                        style={{
                          width: '65px',
                          height: '65px',
                          objectFit: 'cover',
                        }}
                      />

                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">
                          {item.product.name}
                        </h6>

                        <small className="text-muted">
                          Qty: {item.quantity}
                        </small>
                      </div>

                      <strong>
                        ₹{(
                          item.product.price *
                          item.quantity
                        ).toLocaleString('en-IN')}
                      </strong>

                    </div>
                  ))}
                </div>

                <hr />

                {/* Items */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>
                </div>

                {/* Subtotal */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">
                    Subtotal
                  </span>

                  <span>
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Delivery */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">
                    Delivery
                  </span>

                  <span className="text-success fw-semibold">
                    FREE
                  </span>
                </div>

                <hr />

                {/* Total */}
                <div className="d-flex justify-content-between mb-4">
                  <strong className="fs-5">
                    Total
                  </strong>

                  <strong className="fs-5">
                    ₹{total.toLocaleString('en-IN')}
                  </strong>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Placing Order...'
                    : 'Place Order'}
                </button>

                <p className="text-muted text-center small mt-3 mb-0">
                  🔒 Your information is secure.
                </p>

              </div>
            </div>

          </div>

        </div>
      </form>

    </div>
  );
};

export default Checkout;

