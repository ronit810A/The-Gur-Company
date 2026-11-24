import { useState } from "react";
import { Heart } from "lucide-react";
import { addWishlistItem, readWishlistItems, removeWishlistItem } from "./wishlistData";

function WishlistButton({ item }) {
  const [status, setStatus] = useState(() => {
    try {
      return {
        isSaved: readWishlistItems().some((savedItem) => savedItem.id === item.id),
        error: "",
      };
    } catch (loadError) {
      return { isSaved: false, error: loadError.message };
    }
  });

  const handleToggle = () => {
    try {
      if (status.isSaved) {
        removeWishlistItem(item.id);
        setStatus({ isSaved: false, error: "" });
      } else {
        addWishlistItem(item);
        setStatus({ isSaved: true, error: "" });
      }
    } catch (saveError) {
      setStatus({ ...status, error: saveError.message });
    }
  };

  return (
    <div className="wishlist-product-action">
      <button
        className={`wishlist-add-button${status.isSaved ? " is-saved" : ""}`}
        type="button"
        aria-pressed={status.isSaved}
        onClick={handleToggle}
      >
        <Heart size={16} fill={status.isSaved ? "currentColor" : "none"} />
        {status.isSaved ? "Saved to Wishlist" : "Add to Wishlist"}
      </button>
      {status.error && <span className="wishlist-product-error" role="alert">{status.error}</span>}
    </div>
  );
}

export default WishlistButton;
