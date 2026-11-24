import { useState } from "react";
import { Button } from "react-bootstrap";
import { addCartItem } from "./cartData";

function CartButton({ item }) {
  const [notice, setNotice] = useState("");

  const handleAdd = () => {
    try {
      addCartItem(item);
      setNotice(`${item.name} added to cart.`);
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <div className="cart-product-action">
      <Button className="gur-btn" type="button" onClick={handleAdd}>
        Add To Cart
      </Button>
      {notice && <span className="cart-product-notice" role="status">{notice}</span>}
    </div>
  );
}

export default CartButton;
