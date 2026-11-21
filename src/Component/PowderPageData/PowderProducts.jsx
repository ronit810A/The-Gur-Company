
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PowderImage from "../../assets/curated-bg-05.png";

const products = [
  { id: 1, name: "Classic Jaggery Powder", price: "₹199" },
  { id: 2, name: "Organic Jaggery Powder", price: "₹249" },
  { id: 3, name: "Premium Jaggery Powder", price: "₹299" }
];

function PowderProducts() {
  return (
    <section className="powder-products" id="powder-products">
      <Container>
        <div className="heading text-center mb-5">
          <h6>OUR POWDER RANGE</h6>
          <h2>Choose Your Favourite</h2>
        </div>

        <Row className="g-4">
          {products.map((item) => (
            <Col lg={4} md={6} key={item.id}>
              <Card className="product-card h-100 border-0">
                <img src={PowderImage} className="product-img" alt={item.name} />

                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <h5 className="product-price">{item.price}</h5>

                  <Button className="gur-btn">
                    Add To Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default PowderProducts;
