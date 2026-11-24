export const CART_STORAGE_KEY = "gurcompany-cart";

export function readCartItems() {
  const savedItems = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!savedItems) {
    return [];
  }

  const items = JSON.parse(savedItems);

  if (!Array.isArray(items)) {
    throw new Error("Your saved cart data is not in the expected format.");
  }

  const isValidItem = (item) =>
    item &&
    (typeof item.id === "string" || typeof item.id === "number") &&
    typeof item.name === "string" &&
    (typeof item.price === "string" || typeof item.price === "number") &&
    Number.isFinite(
      typeof item.price === "number"
        ? item.price
        : Number(item.price.replace(/[^\d.]/g, ""))
    ) &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    (item.image === undefined || typeof item.image === "string");

  if (!items.every(isValidItem)) {
    throw new Error("Your saved cart contains an invalid item.");
  }

  return items;
}

function saveCartItems(items) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  return items;
}

export function addCartItem(item) {
  const items = readCartItems();
  const existingItem = items.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    return saveCartItems(
      items.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }

  return saveCartItems([...items, { ...item, quantity: 1 }]);
}

export function removeCartItem(itemId) {
  return saveCartItems(readCartItems().filter((item) => item.id !== itemId));
}

export function updateCartQuantity(itemId, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Cart quantity must be at least one.");
  }

  return saveCartItems(
    readCartItems().map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    )
  );
}

export function getCartSubtotal(items) {
  return items.reduce((subtotal, item) => {
    const price = typeof item.price === "number"
      ? item.price
      : Number(item.price.replace(/[^\d.]/g, ""));

    if (!Number.isFinite(price)) {
      throw new Error(`The price for ${item.name} is invalid.`);
    }

    return subtotal + price * item.quantity;
  }, 0);
}

export function formatCartPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}
