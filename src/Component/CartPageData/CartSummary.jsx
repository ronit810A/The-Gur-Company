import { formatCartPrice } from "./cartData";

function CartSummary({ subtotal }) {
  return (
    <aside className="cart-summary">
      <div className="heading">
        <h6 className="cart-eyebrow">YOUR ORDER</h6>
        <h2>Order summary</h2>
      </div>
      <div className="cart-summary-row">
        <span>Subtotal</span>
        <strong>{formatCartPrice(subtotal)}</strong>
      </div>
      <div className="cart-summary-row">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="cart-summary-total">
        <strong>Total</strong>
        <strong>{formatCartPrice(subtotal)}</strong>
      </div>
      <p className="cart-summary-note">
        Shipping charges will be confirmed when checkout is available.
      </p>
    </aside>
  );
}

export default CartSummary;
