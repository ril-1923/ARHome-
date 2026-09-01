
import type { Product } from '../types/product';

interface ProductDetailProps {
  product: Product;
  onViewAR: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const ProductDetail = ({
  product,
  onViewAR,
  onAddToCart,
  onBack,
}: ProductDetailProps) => {
  return (
    <div className="container py-5">

      {/* Back Button */}
      <button
        type="button"
        className="btn btn-outline-secondary mb-4"
        onClick={onBack}
      >
        ← Back to Products
      </button>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="row g-0">

          {/* Product Image */}
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid w-100 h-100"
              style={{
                minHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <div className="card-body p-4 p-lg-5">

              <span className="text-secondary small">
                {product.category}
              </span>

              <h1 className="display-6 fw-bold mt-2">
                {product.name}
              </h1>

              <h2 className="fw-bold mt-4">
                ₹{product.price.toLocaleString('en-IN')}
              </h2>

              <hr className="my-4" />

              <h5 className="fw-bold">
                Description
              </h5>

              <p className="text-muted fs-5">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="d-grid gap-2 mt-4">

                {/* View in AR */}
                <button
                  type="button"
                  className="btn btn-dark btn-lg"
                  onClick={() => onViewAR(product)}
                >
                  View in AR
                </button>

                {/* Add to Cart */}
                <button
                  type="button"
                  className="btn btn-outline-dark btn-lg"
                  onClick={() => onAddToCart(product)}
                >
                  🛒 Add to Cart
                </button>

              </div>

              {/* AR Information */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="fw-bold">
                  📱 Try it in your space
                </h6>

                <p className="text-muted mb-0 small">
                  Use AR to preview this furniture in your room
                  before making a purchase.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDetail;


