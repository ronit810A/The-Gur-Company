import { Container, Row, Col } from "react-bootstrap";
import { Leaf, HeartHandshake, Wheat } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Purity",
    text: "Carefully made ingredients that keep nature at the heart of every recipe.",
  },
  {
    icon: Wheat,
    title: "Tradition",
    text: "Honouring the knowledge and time-tested practices passed down through generations.",
  },
  {
    icon: HeartHandshake,
    title: "Trust",
    text: "Building lasting relationships through transparency and consistent goodness.",
  },
];

function StoryValues() {
  return (
    <section className="story-values">
      <Container>
        <div className="heading text-center story-section-heading">
          <h6>WHAT WE BELIEVE</h6>
          <h2>Goodness in Every Choice</h2>
        </div>

        <Row className="g-4">
          {values.map(({ icon: Icon, title, text }) => (
            <Col md={4} key={title}>
              <article className="story-value-card">
                <div className="story-value-icon">
                  <Icon size={34} strokeWidth={1.7} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default StoryValues;
