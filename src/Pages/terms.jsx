import { Link } from "react-router-dom";
import "../Css/terms.css";

function Terms() {
  return (
    <main className="terms-page">
      <section className="terms-hero">
        <div className="container">
          <p className="terms-eyebrow">THE IMPORTANT DETAILS</p>
          <h1>Terms &amp; Conditions</h1>
          <p>
            These terms describe the website and shopping features currently
            available from The Gur Company.
          </p>
        </div>
      </section>

      <section className="terms-content">
        <div className="container">
          <p className="terms-intro">
            By browsing this website, you agree to use it responsibly and in
            accordance with these terms.
          </p>

          <section className="terms-section">
            <h2>Using this website</h2>
            <p>
              You may browse the product catalogue, search for products, and
              view product details for personal use. Do not misuse the website,
              interfere with its operation, or attempt to access restricted
              admin features without authorisation.
            </p>
          </section>

          <section className="terms-section">
            <h2>Product information</h2>
            <p>
              Product names, descriptions, images, and prices are provided from
              the current catalogue and may change. If information appears
              incorrect, please contact us before relying on it.
            </p>
          </section>

          <section className="terms-section">
            <h2>Cart and wishlist features</h2>
            <p>
              Cart and wishlist items are saved in your browser to support the
              site’s current shopping experience. Adding an item to your cart
              does not submit an order or guarantee product availability.
            </p>
            <p>
              The website currently does not provide checkout or payment
              processing. No purchase is completed through the cart.
            </p>
          </section>

          <section className="terms-section">
            <h2>Accounts and saved information</h2>
            <p>
              The current account and profile features save demo session and
              profile information in your browser. You are responsible for
              access to the browser and device where that information is saved.
              See our <Link to="/privacy-policy">Privacy Policy</Link> for more
              about browser storage.
            </p>
          </section>

          <section className="terms-section">
            <h2>Updates to the website and these terms</h2>
            <p>
              Website features, catalogue information, and these terms may be
              updated as the site changes. The current version will be available
              on this page.
            </p>
          </section>

          <section className="terms-section">
            <h2>Questions</h2>
            <p>
              If you have questions about these terms, email{" "}
              <a href="mailto:ronit810a@gmail.com">ronit810a@gmail.com</a>{" "}
              or use our <Link to="/contact">Contact Us</Link> page.
            </p>
          </section>

          <Link className="terms-back" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Terms;
