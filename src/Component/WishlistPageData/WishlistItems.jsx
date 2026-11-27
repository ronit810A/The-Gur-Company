import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { removeWishlistItem } from "./wishlistData";

function WishlistItems({ items, onItemsChange, onError }) {
  const handleRemove = (itemId) => {
    try {
      const updatedItems = removeWishlistItem(itemId);
      onItemsChange(updatedItems);
    } catch (error) {
      onError(error.message);
    }
  };

  if (items.length === 0) {
    return (
      <section className="wishlist-content">
        <div className="container">
          <div className="wishlist-empty heading">
            <span className="wishlist-empty-icon"><Heart size={28} /></span>
            <p className="wishlist-eyebrow">A LITTLE ROOM FOR LOVE</p>
            <h2>Your wishlist is waiting.</h2>
            <p>
              Save your favourite Gur Company products and they’ll be right
              here whenever you need them.
            </p>
            <Link className="wishlist-button" to="/products">
              Explore our collection <ShoppingBag size={17} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-content">
      <div className="container">
        <div className="wishlist-section-heading heading">
          <div>
            <h6>SAVED WITH LOVE</h6>
            <h2>Your favourites</h2>
          </div>
          <span>{items.length} {items.length === 1 ? "item" : "items"}</span>
        </div>

        <div className="wishlist-grid">
          {items.map((item) => (
            <article className="wishlist-card" key={item.id}>
              <div className="wishlist-card-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <span><Heart size={30} /></span>
                )}
              </div>
              <div className="wishlist-card-info">
                <div>
                  <h3>{item.name}</h3>
                  {item.price && <p>{item.price}</p>}
                </div>
                <button
                  type="button"
                  className="wishlist-remove"
                  aria-label={`Remove ${item.name} from wishlist`}
                  onClick={() => handleRemove(item.id)}
                >
                  <Trash2 size={17} />
                  <span>Remove</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WishlistItems;
