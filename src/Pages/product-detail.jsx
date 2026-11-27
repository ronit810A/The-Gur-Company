import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CartButton from "../Component/CartPageData/CartButton";
import PowderImage from "../assets/curated-bg-05.png";
import JaggeryBlockImage from "../assets/Jaggery Block.png";
import JaggerySyrupImage from "../assets/jaggery-syrup.png";
import WishlistButton from "../Component/WishlistPageData/WishlistButton";
import "../Css/powder.css";
import "../Css/product-detail.css";

const categoryImages = {
  powder: PowderImage,
  block: JaggeryBlockImage,
  syrup: JaggerySyrupImage,
};

const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

function ProductDetail() {
  const { id } = useParams();
  const [productResult, setProductResult] = useState({ id: null, product: null, error: "" });

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/products", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Products could not be loaded.");
        return response.json();
      })
      .then((products) => {
        if (!Array.isArray(products)) throw new Error("Product data is in an unexpected format.");
        const selectedProduct = products.find((item) => String(item.id) === id);
        if (!selectedProduct) throw new Error("This product is no longer available.");
        setProductResult({ id, product: selectedProduct, error: "" });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setProductResult({ id, product: null, error: error.message });
        }
      });

    return () => controller.abort();
  }, [id]);

  const resultIsCurrent = productResult.id === id;
  const product = resultIsCurrent ? productResult.product : null;
  const error = resultIsCurrent ? productResult.error : "";
  const loading = !resultIsCurrent;
  const image = product && (product.image || categoryImages[product.category]);
  const cartItem = product && { ...product, price: Number(product.price), image };

  return (
    <main className="powder-page product-detail-page">
      <Container>
        <Link to="/products" className="product-detail-back">
          &larr; Back to all products
        </Link>

        {loading && (
          <div className="product-detail-message" role="status">
            <Spinner animation="border" size="sm" /> Loading product…
          </div>
        )}

        {error && (
          <Alert className="product-detail-error" variant="danger" role="alert">
            {error}
          </Alert>
        )}

        {product && !loading && (
          <section className="product-detail-content">
            <div className="product-detail-image-wrap">
              <img src={image} alt={product.name} />
            </div>

            <div className="product-detail-info">
              <p className="product-detail-category">{product.category} collection</p>
              <h1>{product.name}</h1>
              <p className="product-detail-price">{formatPrice(product.price)}</p>
              {product.description && (
                <p className="product-detail-description">{product.description}</p>
              )}
              <div className="product-detail-actions">
                <CartButton item={cartItem} />
                <WishlistButton item={cartItem} />
              </div>
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}

export default ProductDetail;
