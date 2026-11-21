import { Container, Row, Col } from "react-bootstrap";
import { BannerImg } from "../images";

function StoryBanner() {
  return (
    <section className="story-banner">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="heading">
            <h6>OUR STORY</h6>
            <h1>Rooted in Tradition</h1>
            <p>
              A journey from honest farms to your family table, with
              sweetness that stays close to nature.
            </p>
          </Col>

          <Col lg={6}>
            <img
              src={BannerImg}
              className="img-fluid story-banner-image"
              alt="Traditional jaggery from The Gur Company"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default StoryBanner;
