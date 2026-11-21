import { Container, Row, Col } from "react-bootstrap";
import { BannerImg } from "../images";

function JaggerySyrupBanner() {
    return (
        <section className="powder-banner jaggery-syrup-banner">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="heading">
                        <h6>PURE & NATURAL</h6>
                        <h1>Jaggery Syrup</h1>
                        <p>
                            Bring the rich, natural sweetness of jaggery syrup
                            to your favourite drinks and recipes.
                        </p>
                        <a href="#syrup-products" className="gur-btn">
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

export default JaggerySyrupBanner;
