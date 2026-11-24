import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredPost } from "./blogPosts";

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
              <img src={featuredPost.image} alt={featuredPost.title} />
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
              <Link to={`/blogs/${featuredPost.slug}`} className="blog-read-link">
                Read Story <ArrowRight size={18} />
              </Link>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default BlogFeatured;
