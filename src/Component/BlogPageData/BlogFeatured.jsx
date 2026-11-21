import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import { Recipes010 } from "../images";

const featuredPost = {
  category: "NATURAL SWEETNESS",
  date: "21 November 2026",
  title: "Why Jaggery Belongs in Every Modern Kitchen",
  excerpt:
    "Discover how traditional jaggery brings rich flavour, comforting warmth and natural goodness to the recipes you make every day.",
};

function BlogFeatured() {
  return (
    <section className="blog-featured">
      <Container>
        <div className="heading blog-section-heading">
          <h6>FEATURED STORY</h6>
          <h2>Worth Reading</h2>
        </div>

        <Row className="align-items-stretch g-0">
          <Col lg={7}>
            <div className="blog-featured-image">
              <img src={Recipes010} alt={featuredPost.title} />
            </div>
          </Col>

          <Col lg={5}>
            <article className="blog-featured-card">
              <div className="blog-meta">
                <span>{featuredPost.category}</span>
                <span>{featuredPost.date}</span>
              </div>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <button type="button" className="blog-read-link">
                Read Story <ArrowRight size={18} />
              </button>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default BlogFeatured;
