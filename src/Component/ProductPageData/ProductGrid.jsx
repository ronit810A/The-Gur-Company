import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import PowderImage from "../../assets/curated-bg-05.png";
import JaggeryBlockImage from "../../assets/Jaggery Block.png";
import JaggerySyrupImage from "../../assets/jaggery-syrup.png";
import WishlistButton from "../WishlistPageData/WishlistButton";
import CartButton from "../CartPageData/CartButton";

const categoryImages = {
  powder: PowderImage,
  block: JaggeryBlockImage,
  syrup: JaggerySyrupImage,
};

const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

function ProductGrid({ category, sectionId, eyebrow, title = "Choose Your Favourite" }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/products", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Products could not be loaded.");
        return response.json();
      })
      .then((items) => {
        if (!Array.isArray(items)) throw new Error("Product data is in an unexpected format.");
        setProducts(items.filter((item) =>
          (category === "all" || item.category === category) && item.status === "active"
        ));
        setStatus({ loading: false, error: "" });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setStatus({ loading: false, error: error.message });
        }
      });

    return () => controller.abort();
  }, [category]);

  const filteredProducts = products.filter((item) =>
    !searchQuery || [item.name, item.description, item.category]
      .some((value) => String(value || "").toLowerCase().includes(searchQuery))
  );

  return (
    <section className={`powder-products ${category === "block" ? "jaggery-block-products" : ""} ${category === "syrup" ? "jaggery-syrup-products" : ""} our-products`} id={sectionId}>
      <Container>
        <div className="heading text-center mb-5">
          <h6>{eyebrow}</h6>
          <h2>{title}</h2>
        </div>

        {status.loading && (
          <div className="product-grid-message" role="status">
            <Spinner animation="border" size="sm" /> Loading products…
          </div>
        )}
        {status.error && <Alert variant="danger" role="alert">{status.error}</Alert>}
        {!status.loading && !status.error && filteredProducts.length === 0 && (
          <p className="product-grid-message" role="status">
            {searchQuery
              ? `No products match “${searchParams.get("search").trim()}”.`
              : "No products are available in this category yet."}
          </p>
        )}

        <Row className="g-4">
          {filteredProducts.map((item) => {
            const image = item.image || categoryImages[item.category];
            const cartItem = { ...item, price: Number(item.price), image };
            const productPath = `/products/${encodeURIComponent(String(item.id))}`;
            return (
              <Col lg={4} md={6} key={item.id}>
                <Card className="product-card h-100 border-0">
                  <Link
                    to={productPath}
                    className="product-card-image-link"
                    aria-label={`View ${item.name}`}
                  >
                    <img src={image} className="product-img" alt={item.name} />
                  </Link>
                  <Card.Body className="text-center">
                    <Link to={productPath} className="product-card-title-link">
                      <Card.Title>{item.name}</Card.Title>
                    </Link>
                    {item.description && <p className="product-description">{item.description}</p>}
                    <h5 className="product-price">{formatPrice(item.price)}</h5>
                    <Link to={productPath} className="product-card-view-link">
                      View product details
                    </Link>
                    <CartButton item={cartItem} />
                    <WishlistButton item={cartItem} />
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default ProductGrid;
