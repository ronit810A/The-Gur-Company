import { useEffect, useState } from "react";
import CartHero from "../Component/CartPageData/CartHero";
import CartItems from "../Component/CartPageData/CartItems";
import { readCartItems } from "../Component/CartPageData/cartData";
import "../Css/home.css";
import "../Css/cart.css";

function Cart() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = () => {
      try {
        setItems(readCartItems());
        setError("");
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    loadItems();
    window.addEventListener("storage", loadItems);
    return () => window.removeEventListener("storage", loadItems);
  }, []);

  return (
    <main className="cart-page">
      <CartHero />
      {error ? (
        <section className="cart-content">
          <div className="container">
            <p className="cart-error" role="alert">
              We couldn’t load your cart. Please check your saved cart data.
            </p>
          </div>
        </section>
      ) : (
        <CartItems
          items={items}
          onItemsChange={setItems}
          onError={setError}
        />
      )}
    </main>
  );
}

export default Cart;
