import { useEffect, useState } from "react";
import WishlistHero from "../Component/WishlistPageData/WishlistHero";
import WishlistItems from "../Component/WishlistPageData/WishlistItems";
import { readWishlistItems } from "../Component/WishlistPageData/wishlistData";
import "../Css/home.css";
import "../Css/wishlist.css";

function Wishlist() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = () => {
      try {
        setItems(readWishlistItems());
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
    <main className="wishlist-page">
      <WishlistHero />
      {error ? (
        <section className="wishlist-content">
          <div className="container">
            <p className="wishlist-error" role="alert">
              We couldn’t load your wishlist. Please check your saved wishlist data.
            </p>
          </div>
        </section>
      ) : (
        <WishlistItems
          items={items}
          onItemsChange={setItems}
          onError={setError}
        />
      )}
    </main>
  );
}

export default Wishlist;
