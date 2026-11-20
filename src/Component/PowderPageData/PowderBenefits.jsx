
import { Container, Row, Col } from "react-bootstrap";
import { Leaf, Heart, Sprout } from "lucide-react";

const benefits = [
  {
    icon: <Leaf size={38} />,
    title: "Natural Sweetness",
    text: "A traditional alternative to refined sugar."
  },
  {
    icon: <Heart size={38} />,
    title: "Traditional Goodness",
    text: "Made with traditional jaggery-making methods."
  },
  {
    icon: <Sprout size={38} />,
    title: "Versatile Usage",
    text: "Perfect for tea, desserts and everyday recipes."
  }
];

function PowderBenefits() {
  return (
    <section className="powder-benefits">
      <Container>
        <div className="heading text-center mb-5">
          <p className="section-subtitle">WHY CHOOSE US</p>
          <h2>Goodness In Every Spoon</h2>
        </div>

        <Row className="g-4">
          {benefits.map((item, index) => (
            <Col md={4} key={index}>
              <div className="powder-benefit-card">
                <div className="powder-benefit-icon">
                  {item.icon}
                </div>

                <h4>
                  {item.title}
                </h4>

                <p>{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default PowderBenefits;
