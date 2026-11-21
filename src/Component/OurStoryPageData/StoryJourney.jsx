import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const journey = [
  {
    number: "01",
    title: "Our Roots",
    text: "We look back to traditional jaggery-making and the communities that preserve it.",
  },
  {
    number: "02",
    title: "Thoughtful Craft",
    text: "Every step is guided by care, quality and respect for natural ingredients.",
  },
  {
    number: "03",
    title: "Shared Goodness",
    text: "We bring honest, naturally sweet goodness to kitchens across the country.",
  },
];

function StoryJourney() {
  return (
    <section className="story-journey">
      <Container>
        <div className="heading text-center story-section-heading">
          <h6>THE JOURNEY AHEAD</h6>
          <h2>From Heritage to Home</h2>
        </div>

        <Row className="g-4 justify-content-center">
          {journey.map((item) => (
            <Col lg={4} md={6} key={item.number}>
              <article className="story-journey-card">
                <span>{item.number}</span>
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
      </Container>
    </section>
  );
}

export default StoryJourney;
