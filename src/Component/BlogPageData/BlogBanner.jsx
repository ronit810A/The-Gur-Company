import { Container } from "react-bootstrap";
import { BlogBaner01 } from "../images";

function BlogBanner() {
  return (
    <section className="blog-banner">
      <Container>
        <div className="blog-banner-content heading">
          <h6>FROM OUR JOURNAL</h6>
          <h1>Stories for a Sweeter Life</h1>
          <p>
            Traditional wisdom, everyday recipes and thoughtful ideas
            for a more natural way of living.
          </p>
        </div>

        <img
          src={BlogBaner01}
          className="blog-banner-image"
          alt="The Gur Company journal"
        />
      </Container>
    </section>
  );
}

export default BlogBanner;
