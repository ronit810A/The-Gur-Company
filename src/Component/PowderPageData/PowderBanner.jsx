
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { BannerImg } from "../images";

function PowderBanner() {
    return (
        <section className="powder-banner">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="powder-banner-heading heading">
                        <h6>PURE & NATURAL</h6>
                        <h1>Jaggery Powder</h1>
                        <p>
                            Bring natural sweetness to your everyday life
                            with our traditional jaggery powder.
                        </p>
                        <Link to="/products" className="gur-btn">
                            Shop Now
                        </Link>
                    </Col>

                    <Col lg={6}>
                        <img
                            src={BannerImg}
                            className="img-fluid powder-banner-img"
                            alt="Jaggery Powder"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default PowderBanner;
