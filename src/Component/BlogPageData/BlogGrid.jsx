import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "./blogPosts";

function BlogGrid() {
  return (
    <section className="blog-grid-section">
      <Container>
        <div className="heading text-center blog-section-heading">
          <h6>LATEST STORIES</h6>
          <h2>Ideas to Savour</h2>
        </div>

        <Row className="g-4">
          {blogPosts.map((post) => (
            <Col lg={4} md={6} key={post.slug}>
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
                  <Link to={`/blogs/${post.slug}`} className="blog-read-link">
                    Read Story <ArrowRight size={18} />
                  </Link>
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
