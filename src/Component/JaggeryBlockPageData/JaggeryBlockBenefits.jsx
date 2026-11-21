import { Container, Row, Col } from "react-bootstrap";
import { Leaf, Heart, Sprout } from "lucide-react";

const benefits = [
    {
        icon: <Leaf size={38} />,
        title: "Naturally Sweet",
        text: "A simple way to bring jaggery sweetness to everyday meals.",
    },
    {
        icon: <Heart size={38} />,
        title: "Traditional Goodness",
        text: "Enjoy the familiar taste of a traditional jaggery block.",
    },
    {
        icon: <Sprout size={38} />,
        title: "Versatile Use",
        text: "Use it in drinks, desserts, sauces, and favourite recipes.",
    },
];

function JaggeryBlockBenefits() {
    return (
        <section className="powder-benefits jaggery-block-benefits">
            <Container>
                <div className="heading text-center mb-5">
                    <h6>WHY CHOOSE JAGGERY BLOCK</h6>
                    <h2>Goodness In Every Spoon</h2>
                </div>

                <Row className="g-4">
                    {benefits.map((item) => (
                        <Col md={4} key={item.title}>
                            <div className="powder-benefit-card">
                                <div className="powder-benefit-icon">{item.icon}</div>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default JaggeryBlockBenefits;
