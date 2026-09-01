
import type { Product } from '../types/product';

interface CartItemProps {
  product: Product;
  quantity: number;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  onRemove: (product: Product) => void;
}

const CartItem = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const itemTotal = product.price * quantity;

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center">

          {/* Product Image */}
          <div className="col-4 col-md-2">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                width: '100%',
                height: '100px',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-8 col-md-4">
            <h5 className="mb-1">
              {product.name}
            </h5>

            <p className="text-muted mb-1">
              {product.category}
            </p>

            <strong>
              ₹{product.price.toLocaleString('en-IN')}
            </strong>
          </div>

          {/* Quantity Controls */}
          <div className="col-7 col-md-3 mt-3 mt-md-0">
            <div className="d-flex align-items-center">

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onDecrease(product)}
                disabled={quantity <= 1}
              >
                −
              </button>

              <span className="px-3 fw-bold">
                {quantity}
              </span>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onIncrease(product)}
              >
                +
              </button>

            </div>
          </div>

          {/* Total */}
          <div className="col-5 col-md-2 text-end mt-3 mt-md-0">
            <strong>
              ₹{itemTotal.toLocaleString('en-IN')}
            </strong>
          </div>

          {/* Remove */}
          <div className="col-12 col-md-1 text-md-end mt-3 mt-md-0">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onRemove(product)}
            >
              Remove
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartItem;

