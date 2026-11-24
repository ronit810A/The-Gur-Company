import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import CartSummary from "./CartSummary";
import {
  getCartSubtotal,
  removeCartItem,
  updateCartQuantity,
} from "./cartData";

function CartItems({ items, onItemsChange, onError }) {
  const handleRemove = (itemId) => {
    try {
      onItemsChange(removeCartItem(itemId));
    } catch (error) {
      onError(error.message);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    try {
      onItemsChange(updateCartQuantity(itemId, quantity));
    } catch (error) {
      onError(error.message);
    }
  };

  if (items.length === 0) {
    return (
      <section className="cart-content">
        <div className="container">
          <div className="cart-empty heading">
            <span className="cart-empty-icon"><ShoppingBag size={28} /></span>
            <h6 className="cart-eyebrow">GOOD THINGS ARE WAITING</h6>
            <h2>Your cart is empty.</h2>
            <p>
              Explore our jaggery collection and add your favourites to your cart.
            </p>
            <Link className="cart-button" to="/powder">
              Explore our collection <ShoppingBag size={17} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  let subtotal;

  try {
    subtotal = getCartSubtotal(items);
  } catch (error) {
    return (
      <section className="cart-content">
        <div className="container">
          <p className="cart-error" role="alert">{error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-content">
      <div className="container">
        <div className="cart-section-heading heading">
          <div>
            <h6 className="cart-eyebrow">SAVED FOR YOUR PANTRY</h6>
            <h2>Your cart</h2>
          </div>
          <span>{items.length} {items.length === 1 ? "item" : "items"}</span>
        </div>

        <div className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  {item.image && <img src={item.image} alt={item.name} />}
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-remove"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                <strong className="cart-item-total">
                  ₹{(Number(String(item.price).replace(/[^\d.]/g, "")) * item.quantity).toLocaleString("en-IN")}
                </strong>
              </article>
            ))}
          </div>
          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </section>
  );
}

export default CartItems;
