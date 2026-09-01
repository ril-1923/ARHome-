
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onViewAR: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({
  product,
  onViewAR,
  onViewDetails,
}: ProductCardProps) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{
          height: '250px',
          objectFit: 'cover',
        }}
      />

      <div className="card-body d-flex flex-column">
        <span className="text-secondary small mb-1">
          {product.category}
        </span>

        <h5 className="card-title">
          {product.name}
        </h5>

        <p className="card-text text-muted">
          {product.description}
        </p>

        <h5 className="mt-auto mb-3">
          ₹{product.price.toLocaleString('en-IN')}
        </h5>

        {/* View Details Button */}
        <button
          className="btn btn-outline-dark w-100 mb-2"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </button>

        {/* View in AR Button */}
        <button
          className="btn btn-dark w-100"
          onClick={() => onViewAR(product)}
        >
          View in AR
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

