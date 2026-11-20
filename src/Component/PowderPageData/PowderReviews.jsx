
import { Container, Row, Col, Card } from "react-bootstrap";

const reviews = [
    {
        name: "Rahul Sharma",
        review: "Great taste and natural sweetness."
    },
    {
        name: "Priya Verma",
        review: "Very good quality and packaging."
    },
    {
        name: "Amit Kumar",
        review: "Loved the traditional taste."
    }
];

function PowderReviews() {
    return (
        <section className="powder-reviews">
            <Container>
                <div className="text-center mb-5">
                    <p className="section-subtitle">CUSTOMER LOVE</p>
                    <h2>What Our Customers Say</h2>
                </div>

                <Row className="g-4">
                    {reviews.map((item, index) => (
                        <Col md={4} key={index}>
                            <Card className="powder-review-card h-100">
                                <Card.Body>
                                    <div className="powder-review-stars">
                                        ★★★★★
                                    </div>

                                    <Card.Text className="my-3">
                                        "{item.review}"
                                    </Card.Text>

                                    <h6>
                                        {item.name}
                                    </h6>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default PowderReviews;
