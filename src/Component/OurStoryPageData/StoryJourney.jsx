import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoryJourney01, StoryJourney02, StoryJourney03 } from "../images";

const journey = [
  {
    title: "Our Roots",
    text: "We look back to traditional jaggery-making and the communities that preserve it.",
    image: StoryJourney01,
  },
  {
    title: "Thoughtful Craft",
    text: "Every step is guided by care, quality and respect for natural ingredients.",
    image: StoryJourney02,
  },
  {
    title: "Shared Goodness",
    text: "We bring honest, naturally sweet goodness to kitchens across the country.",
    image: StoryJourney03,
  },
];

function StoryJourney() {
  return (
    <section className="story-journey">
      <Container>
        <div className="story-journey-container">
          <div className="heading text-center story-section-heading">
            <h6>THE JOURNEY AHEAD</h6>
            <h2>From Heritage to Home</h2>
          </div>

          <Row className="g-4 justify-content-center">
            {journey.map((item) => (
              <Col lg={4} md={6} key={item.title}>
                <article className="story-journey-card">
                  <img
                    className="story-journey-image"
                    src={item.image}
                    alt={item.title}
                  />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Col>
            ))}
          </Row>

          <div className="story-journey-cta">
            <p>One tradition. Many ways to enjoy it.</p>
            <Link to="/powder" className="story-button">Explore Our Collection</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StoryJourney;
