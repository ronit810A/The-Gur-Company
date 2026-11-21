import { Container, Row, Col, Card, Button } from "react-bootstrap";
import JaggeryBlockImage from "../../assets/Jaggery Block.png";

const products = [
    {
        id: 1,
        name: "Classic Jaggery Block",
        price: "₹199",
    },
    {
        id: 2,
        name: "Everyday Jaggery Block",
        price: "₹249",
    },
    {
        id: 3,
        name: "Premium Jaggery Block",
        price: "₹299",
    },
];

function JaggeryBlockProducts() {
    return (
        <section className="powder-products jaggery-block-products" id="block-products">
            <Container>
                <div className="heading text-center mb-5">
                    <h6>OUR JAGGERY BLOCK RANGE</h6>
                    <h2>Choose Your Favourite</h2>
                </div>

                <Row className="g-4">
                    {products.map((item) => (
                        <Col lg={4} md={6} key={item.id}>
                            <Card className="product-card h-100 border-0">
                                <img
                                    src={JaggeryBlockImage}
                                    className="product-img"
                                    alt={item.name}
                                />

                                <Card.Body className="text-center">
                                    <Card.Title>{item.name}</Card.Title>
                                    <h5 className="product-price">{item.price}</h5>
                                    <Button className="gur-btn" type="button">
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

export default JaggeryBlockProducts;
