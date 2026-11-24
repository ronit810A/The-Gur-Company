import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ProfileShortcuts() {
  return (
    <section className="profile-shortcuts">
      <div className="heading profile-section-heading">
        <h6 className="profile-eyebrow">PICK UP WHERE YOU LEFT OFF</h6>
        <h2>Your shortcuts</h2>
      </div>
      <div className="profile-shortcut-list">
        <Link className="profile-shortcut" to="/wishlist">
          <span><Heart size={20} /></span>
          <span><strong>Your wishlist</strong><small>See the products you’ve saved</small></span>
        </Link>
        <Link className="profile-shortcut" to="/cart">
          <span><ShoppingCart size={20} /></span>
          <span><strong>Your cart</strong><small>Review the items in your cart</small></span>
        </Link>
      </div>
    </section>
  );
}

export default ProfileShortcuts;
