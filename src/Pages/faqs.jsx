import { Link } from "react-router-dom";
import CuratedSection from "../Component/HomePageData/curated-section";
import "../Css/home.css";
import "../Css/faqs.css";

const faqItems = [
  {
    question: "Which jaggery products can I shop?",
    answer: "The collection includes jaggery powder, jaggery block, and jaggery syrup. Browse all currently available products on the All Products page.",
  },
  {
    question: "How do I find a product?",
    answer: "Use the search bar in the header to search active products by name, category, or description. Select a result to open its product details.",
  },
  {
    question: "Where can I see product details?",
    answer: "Select a product image, name, or View product details link to open its individual page, where you can see its image, price, and description.",
  },
  {
    question: "How do I add products to my cart?",
    answer: "Use the Add To Cart button on a product card or its detail page. On the cart page, you can adjust quantities or remove products.",
  },
  {
    question: "How does the wishlist work?",
    answer: "Select Add to Wishlist on a product. Sign in to open and manage your wishlist.",
  },
  {
    question: "What can I find on the Gift Sets page?",
    answer: "The page showcases products from the current collection as gift options. It does not list pre-built bundles.",
  },
];

function FAQs() {
  return (
    <main className="faqs-page">
      <section className="faq-hero">
        <div className="container">
          <p className="faq-eyebrow">HERE TO HELP</p>
          <h1>Frequently asked questions</h1>
          <p>Helpful answers about exploring and saving your Gur Company favourites.</p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>

          <p className="faq-contact">
            Still need help? <Link to="/contact">Contact us</Link>.
          </p>
        </div>
      </section>

      <CuratedSection
        heading="Find a new favourite"
        description="Browse our jaggery powder, block, and syrup products to find something you love."
      />
    </main>
  );
}

export default FAQs;
