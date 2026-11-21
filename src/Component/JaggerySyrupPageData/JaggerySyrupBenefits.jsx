import { Container, Row, Col } from "react-bootstrap";
import { Leaf, Heart, Sprout } from "lucide-react";

const benefits = [
    {
        icon: <Leaf size={38} />,
        title: "Naturally Sweet",
        text: "Enjoy the rich sweetness of jaggery in an easy-to-use syrup.",
    },
    {
        icon: <Heart size={38} />,
        title: "Traditional Goodness",
        text: "Bring the familiar taste of jaggery to your everyday recipes.",
    },
    {
        icon: <Sprout size={38} />,
        title: "Easy to Enjoy",
        text: "Add it to drinks, desserts, breakfasts, and favourite recipes.",
    },
];

function JaggerySyrupBenefits() {
    return (
        <section className="powder-benefits jaggery-syrup-benefits">
            <Container>
                <div className="heading text-center mb-5">
                    <h6>WHY CHOOSE JAGGERY SYRUP</h6>
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

export default JaggerySyrupBenefits;
