import PowderImage from "../../assets/curated-bg-05.png";
import JaggeryBlockImage from "../../assets/Jaggery Block.png";
import JaggerySyrupImage from "../../assets/jaggery-syrup.png";

export const WISHLIST_STORAGE_KEY = "gurcompany-wishlist";

const suggestedWishlistItems = [
  {
    id: "powder-1",
    name: "Classic Jaggery Powder",
    price: "₹199",
    image: PowderImage,
  },
  {
    id: "block-1",
    name: "Classic Jaggery Block",
    price: "₹199",
    image: JaggeryBlockImage,
  },
  {
    id: "syrup-1",
    name: "Classic Jaggery Syrup",
    price: "₹199",
    image: JaggerySyrupImage,
  },
];

export function readWishlistItems() {
  const savedItems = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

  if (!savedItems) {
    return suggestedWishlistItems;
  }

  const items = JSON.parse(savedItems);

  if (!Array.isArray(items)) {
    throw new Error("Your saved wishlist data is not in the expected format.");
  }

  const isValidItem = (item) =>
    item &&
    (typeof item.id === "string" || typeof item.id === "number") &&
    typeof item.name === "string" &&
    (item.price === undefined || typeof item.price === "string" || typeof item.price === "number") &&
    (item.image === undefined || typeof item.image === "string");

  if (!items.every(isValidItem)) {
    throw new Error("Your saved wishlist contains an invalid item.");
  }

  return items;
}

export function removeWishlistItem(itemId) {
  const updatedItems = readWishlistItems().filter((item) => item.id !== itemId);
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedItems));
  return updatedItems;
}

export function addWishlistItem(item) {
  const items = readWishlistItems();
  const alreadySaved = items.some((savedItem) => savedItem.id === item.id);
  const updatedItems = alreadySaved ? items : [...items, item];

  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedItems));
  return updatedItems;
}
