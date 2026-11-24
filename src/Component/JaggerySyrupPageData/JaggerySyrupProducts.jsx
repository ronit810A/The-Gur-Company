import { Container, Row, Col, Card } from "react-bootstrap";
import JaggerySyrupImage from "../../assets/jaggery-syrup.png";
import WishlistButton from "../WishlistPageData/WishlistButton";
import CartButton from "../CartPageData/CartButton";

const products = [
    { id: 1, name: "Classic Jaggery Syrup", price: "₹199" },
    { id: 2, name: "Everyday Jaggery Syrup", price: "₹249" },
    { id: 3, name: "Premium Jaggery Syrup", price: "₹299" },
];

function JaggerySyrupProducts() {
    return (
        <section className="powder-products jaggery-syrup-products" id="syrup-products">
            <Container>
                <div className="heading text-center mb-5">
                    <h6>OUR JAGGERY SYRUP RANGE</h6>
                    <h2>Choose Your Favourite</h2>
                </div>

                <Row className="g-4">
                    {products.map((item) => (
                        <Col lg={4} md={6} key={item.id}>
                            <Card className="product-card h-100 border-0">
                                <img
                                    src={JaggerySyrupImage}
                                    className="product-img"
                                    alt={item.name}
                                />

                                <Card.Body className="text-center">
                                    <Card.Title>{item.name}</Card.Title>
                                    <h5 className="product-price">{item.price}</h5>
                                    <CartButton item={{ ...item, id: `syrup-${item.id}`, image: JaggerySyrupImage }} />
                                    <WishlistButton item={{ ...item, id: `syrup-${item.id}`, image: JaggerySyrupImage }} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default JaggerySyrupProducts;
