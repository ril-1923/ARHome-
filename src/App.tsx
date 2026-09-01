
import { useEffect, useState } from 'react';
import type { Product } from './types/product';
import { products } from './data/products';

import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ARViewer from './components/ARViewer';

import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';

interface CartProduct {
  product: Product;
  quantity: number;
}

function App() {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [showProductDetail, setShowProductDetail] =
    useState(false);

  const [showCart, setShowCart] =
    useState(false);

  const [showCheckout, setShowCheckout] =
    useState(false);

  const [showOrderSuccess, setShowOrderSuccess] =
    useState(false);

  const [showMyOrders, setShowMyOrders] =
    useState(false);

  // -----------------------------
  // Load Cart From Local Storage
  // -----------------------------
  const [cart, setCart] = useState<CartProduct[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart;
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  });

  // -----------------------------
  // Save Cart To Local Storage
  // -----------------------------
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cart]);

  // -----------------------------
  // View AR
  // -----------------------------
  const handleViewAR = (product: Product) => {
    setSelectedProduct(product);
  };

  // -----------------------------
  // View Product Details
  // -----------------------------
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);

    setShowProductDetail(true);
    setShowCart(false);
    setShowCheckout(false);
    setShowOrderSuccess(false);
    setShowMyOrders(false);
  };

  // -----------------------------
  // Add To Cart
  // -----------------------------
  const handleAddToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          product,
          quantity: 1,
        },
      ];
    });

    alert(`${product.name} added to cart!`);
  };

  // -----------------------------
  // Increase Quantity
  // -----------------------------
  const handleIncrease = (product: Product) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // -----------------------------
  // Decrease Quantity
  // -----------------------------
  const handleDecrease = (product: Product) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === product.id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  // -----------------------------
  // Remove Product
  // -----------------------------
  const handleRemove = (product: Product) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.product.id !== product.id
      )
    );
  };

  // -----------------------------
  // Open Cart
  // -----------------------------
  const handleOpenCart = () => {
    setShowCart(true);

    setShowProductDetail(false);
    setShowCheckout(false);
    setShowOrderSuccess(false);
    setShowMyOrders(false);

    setSelectedProduct(null);
  };

  // -----------------------------
  // Open My Orders
  // -----------------------------
  const handleOpenMyOrders = () => {
    setShowMyOrders(true);

    setShowOrderSuccess(false);
    setShowCheckout(false);
    setShowCart(false);
    setShowProductDetail(false);

    setSelectedProduct(null);
  };

  // -----------------------------
  // Checkout
  // -----------------------------
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setShowCheckout(true);

    setShowCart(false);
    setShowProductDetail(false);
    setShowOrderSuccess(false);
    setShowMyOrders(false);

    setSelectedProduct(null);
  };

  // -----------------------------
  // Back To Cart
  // -----------------------------
  const handleBackToCart = () => {
    setShowCheckout(false);
    setShowCart(true);

    setShowOrderSuccess(false);
    setShowMyOrders(false);
  };

  // -----------------------------
  // Order Complete
  // -----------------------------
  const handleOrderComplete = () => {
    // Clear React cart
    setCart([]);

    // Checkout already saves the order
    // in localStorage.

    setShowCheckout(false);
    setShowCart(false);
    setShowProductDetail(false);
    setShowMyOrders(false);

    setShowOrderSuccess(true);

    setSelectedProduct(null);
  };

  // -----------------------------
  // Back To Products
  // -----------------------------
  const handleBackToProducts = () => {
    setShowProductDetail(false);
    setShowCart(false);
    setShowCheckout(false);
    setShowOrderSuccess(false);
    setShowMyOrders(false);

    setSelectedProduct(null);
  };

  // -----------------------------
  // Continue Shopping
  // -----------------------------
  const handleContinueShopping = () => {
    handleBackToProducts();
  };

  // -----------------------------
  // Close AR
  // -----------------------------
  const handleCloseAR = () => {
    setSelectedProduct(null);
  };

  // -----------------------------
  // Cart Count
  // -----------------------------
  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">

          {/* Logo */}
          <button
            type="button"
            className="navbar-brand fw-bold border-0 bg-transparent text-white"
            onClick={handleBackToProducts}
          >
            ARHome
          </button>

          <div className="d-flex align-items-center gap-2">

            {/* Tagline */}
            <span className="text-white d-none d-lg-inline me-2">
              Augmented Reality Furniture
            </span>

            {/* My Orders */}
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleOpenMyOrders}
            >
              📦 My Orders
            </button>

            {/* Cart */}
            <button
              type="button"
              className="btn btn-light"
              onClick={handleOpenCart}
            >
              🛒 Cart ({cartItemCount})
            </button>

          </div>

        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-5">

        {/* My Orders */}
        {showMyOrders ? (

          <MyOrders
            onBackToProducts={handleBackToProducts}
          />

        ) : showOrderSuccess ? (

          /* Order Success */
          <OrderSuccess
            onContinueShopping={handleContinueShopping}
          />

        ) : showCheckout ? (

          /* Checkout */
          <Checkout
            cart={cart}
            onBackToCart={handleBackToCart}
            onOrderComplete={handleOrderComplete}
          />

        ) : showCart ? (

          /* Cart */
          <Cart
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onContinueShopping={handleContinueShopping}
            onCheckout={handleCheckout}
          />

        ) : showProductDetail ? (

          /* Product Detail */
          selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onViewAR={handleViewAR}
              onAddToCart={handleAddToCart}
              onBack={handleBackToProducts}
            />
          )

        ) : (

          /* Product Grid */
          <>
            <div className="text-center mb-5">

              <h1 className="fw-bold">
                Furniture for Your Home
              </h1>

              <p className="text-muted">
                View furniture in 3D and place it in your room using AR.
              </p>

            </div>

            <div className="row g-4">

              {products.map((product) => (
                <div
                  className="col-12 col-sm-6 col-lg-4"
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                    onViewAR={handleViewAR}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}

            </div>
          </>

        )}

      </main>

      {/* AR Viewer Modal */}
      {selectedProduct &&
        !showProductDetail &&
        !showCart &&
        !showCheckout &&
        !showOrderSuccess &&
        !showMyOrders && (

          <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >

            <div className="modal-dialog modal-lg modal-dialog-centered">

              <div className="modal-content">

                {/* Modal Header */}
                <div className="modal-header">

                  <h5 className="modal-title">
                    View {selectedProduct.name} in AR
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseAR}
                    aria-label="Close"
                  />

                </div>

                {/* Modal Body */}
                <div className="modal-body">

                  <ARViewer
                    modelGlb={selectedProduct.modelGlb}
                    onClose={handleCloseAR}
                  />

                </div>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

export default App;

