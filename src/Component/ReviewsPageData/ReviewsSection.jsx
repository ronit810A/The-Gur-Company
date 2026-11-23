import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Customer01, Customer02 } from "../images";

const reviews = [
  {
    name: "Delphi",
    detail: "Todd’s Bakery",
    image: Customer01,
    title: "A taste that feels like home",
    quote:
      "The taste reminded me of my grandmother’s kitchen. There’s no comparison to what you find in supermarkets.",
  },
  {
    name: "Delphi",
    detail: "Todd’s Bakery",
    image: Customer02,
    title: "A taste that feels like home",
    quote:
      "The taste reminded me of my grandmother’s kitchen. There’s no comparison to what you find in supermarkets.",
  },
];

function ReviewsSection() {
  return (
    <>
      <section className="reviews-hero">
        <div className="container">
          <p className="reviews-eyebrow">KIND WORDS, SHARED WITH US</p>
          <h1>Made with care.<br />Loved at home.</h1>
          <p>
            The sweetest part of what we do is hearing how our jaggery finds a
            place in your kitchens and your everyday moments.
          </p>
          <div className="reviews-rating">
            <span className="reviews-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={19} fill="currentColor" />
              ))}
            </span>
            <span>Real words from our customer stories</span>
          </div>
        </div>
      </section>

      <section className="reviews-collection">
        <div className="container">
          <header className="reviews-section-heading">
            <p className="reviews-eyebrow">THE GUR COMPANY COMMUNITY</p>
            <h2>Sweet words from our table</h2>
          </header>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <article className="review-card" key={`${review.name}-${index}`}>
                <div className="review-card-top">
                  <span className="reviews-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star key={starIndex} size={17} fill="currentColor" />
                    ))}
                  </span>
                  <span className="review-quote-mark" aria-hidden="true">“</span>
                </div>
                <h3>{review.title}</h3>
                <blockquote>{review.quote}</blockquote>
                <div className="review-author">
                  <img src={review.image} alt="" />
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.detail}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="reviews-note">
            Have a story of your own? We’d love to hear from you.
          </p>
          <Link className="reviews-contact-link" to="/contact">
            Get in touch <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default ReviewsSection;
