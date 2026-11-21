import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import {
  StoryJourney01,
  StoryJourney02,
  StoryJourney03,
  Recipes02,
  Recipes03,
  Recipes04,
} from "../images";

const posts = [
  {
    category: "KITCHEN NOTES",
    date: "18 November 2026",
    title: "Five Simple Ways to Sweeten Your Morning",
    excerpt: "Easy ideas for starting the day with warm, naturally sweet flavours.",
    image: Recipes02,
  },
  {
    category: "TRADITION",
    date: "12 November 2026",
    title: "The Timeless Craft Behind Every Gur Block",
    excerpt: "A closer look at the tradition, patience and care behind jaggery.",
    image: StoryJourney01,
  },
  {
    category: "RECIPES",
    date: "08 November 2026",
    title: "Comforting Desserts with a Natural Twist",
    excerpt: "Bring deep caramel notes to familiar desserts without refined sugar.",
    image: Recipes03,
  },
  {
    category: "WELLNESS",
    date: "02 November 2026",
    title: "Making Small and Better Everyday Choices",
    excerpt: "Simple swaps that can make your daily cooking feel more intentional.",
    image: StoryJourney02,
  },
  {
    category: "FARM & FAMILY",
    date: "26 October 2026",
    title: "From the Harvest to the Family Table",
    excerpt: "Why knowing the journey of food makes every serving more meaningful.",
    image: StoryJourney03,
  },
  {
    category: "INSPIRATION",
    date: "20 October 2026",
    title: "A Celebration of India’s Traditional Ingredients",
    excerpt: "Rediscover ingredients that have always been part of our homes.",
    image: Recipes04,
  },
];

function BlogGrid() {
  return (
    <section className="blog-grid-section">
      <Container>
        <div className="heading text-center blog-section-heading">
          <h6>LATEST STORIES</h6>
          <h2>Ideas to Savour</h2>
        </div>

        <Row className="g-4">
          {posts.map((post) => (
            <Col lg={4} md={6} key={post.title}>
              <article className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <button type="button" className="blog-read-link">
                    Read Story <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default BlogGrid;
