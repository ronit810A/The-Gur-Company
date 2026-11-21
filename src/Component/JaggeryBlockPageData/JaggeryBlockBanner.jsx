import { Container, Row, Col } from "react-bootstrap";
import { BannerImg } from "../images";

function JaggeryBlockBanner() {
    return (
        <section className="powder-banner jaggery-block-banner">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="heading">
                        <h6>PURE & NATURAL</h6>
                        <h1>Jaggery Block</h1>
                        <p>
                            Bring the rich, traditional sweetness of jaggery to
                            your everyday recipes.
                        </p>
                        <a href="#block-products" className="gur-btn">
                            Shop Now
                        </a>
                    </Col>

                    <Col lg={6}>
                        <img
                            src={BannerImg}
                            className="img-fluid powder-banner-img"
                            alt="The Gur Company jaggery products"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default JaggeryBlockBanner;
