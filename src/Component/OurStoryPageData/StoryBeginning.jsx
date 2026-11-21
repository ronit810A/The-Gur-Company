import { Container, Row, Col } from "react-bootstrap";
import { PhilosophyPhone } from "../images";

const beginning = {
  subtitle: "HOW IT BEGAN",
  title: "A Simple Wish to Bring Pure Sweetness Home",
  text:
    "The Gur Company began with a simple belief: everyday food should be honest, nourishing and rooted in tradition. Inspired by the time-tested craft of jaggery making, we set out to celebrate an ingredient that has been part of Indian homes for generations.",
  note: "No shortcuts. No unnecessary additions. Just a thoughtful return to real food.",
};

function StoryBeginning() {
  return (
    <section className="story-beginning">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="story-beginning-image">
              <img src={PhilosophyPhone} alt="Jaggery made for everyday recipes" />
            </div>
          </Col>

          <Col lg={6} className="heading">
            <h6>{beginning.subtitle}</h6>
            <h2>{beginning.title}</h2>
            <p>{beginning.text}</p>
            <div className="story-beginning-note">{beginning.note}</div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default StoryBeginning;
