import { Container } from "react-bootstrap";
import { Mail } from "lucide-react";

function BlogNewsletter() {
  return (
    <section className="blog-newsletter">
      <Container>
        <div className="blog-newsletter-card">
          <div className="blog-newsletter-icon">
            <Mail size={28} />
          </div>
          <div className="blog-newsletter-copy heading">
            <h6>A NOTE FROM THE GUR COMPANY</h6>
            <h2>Good Stories, Delivered</h2>
          </div>
          <form className="blog-newsletter-form" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Enter your email address" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default BlogNewsletter;
