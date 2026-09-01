
import type { Product } from '../types/product';
import CartItem from '../components/CartItem';

interface CartProduct {
  product: Product;
  quantity: number;
}

interface CartProps {
  cart: CartProduct[];
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  onRemove: (product: Product) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart = ({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onContinueShopping,
  onCheckout,
}: CartProps) => {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">
            Shopping Cart
          </h1>

          <p className="text-muted mb-0">
            {totalItems}{' '}
            {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={onContinueShopping}
        >
          ← Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (

        /* Empty Cart */
        <div className="card border-0 shadow-sm text-center py-5">
          <div className="card-body">

            <div className="display-4 mb-3">
              🛒
            </div>

            <h3 className="fw-bold">
              Your cart is empty
            </h3>

            <p className="text-muted">
              Add some furniture to your cart to get started.
            </p>

            <button
              type="button"
              className="btn btn-dark"
              onClick={onContinueShopping}
            >
              Browse Furniture
            </button>

          </div>
        </div>

      ) : (

        /* Cart */
        <div className="row g-4">

          {/* Cart Items */}
          <div className="col-lg-8">

            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}

          </div>

          {/* Order Summary */}
          <div className="col-lg-4">

            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Order Summary
                </h4>

                <div className="d-flex justify-content-between mb-3">
                  <span>
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>
                    Delivery
                  </span>

                  <span className="text-success">
                    Free
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <strong className="fs-5">
                    Total
                  </strong>

                  <strong className="fs-5">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </strong>
                </div>

                <button
                  type="button"
                  className="btn btn-dark btn-lg w-100"
                  onClick={onCheckout}
                >
                  Proceed to Checkout
                </button>

              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;

