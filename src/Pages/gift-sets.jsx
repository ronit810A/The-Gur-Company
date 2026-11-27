import ProductGrid from "../Component/ProductPageData/ProductGrid";
import "../Css/home.css";
import "../Css/powder.css";
import "../Css/gift-sets.css";

function GiftSets() {
  return (
    <main className="powder-page gift-sets-page">
      <section className="gift-sets-hero">
        <div className="container">
          <p className="gift-sets-eyebrow">THOUGHTFUL GIFTING</p>
          <h1>Share a little sweetness</h1>
          <p>
            Explore our jaggery favourites and choose the products that will make
            a thoughtful gift.
          </p>
          <a className="gift-sets-cta" href="#gift-set-options">
            Explore gift options
          </a>
        </div>
      </section>

      <ProductGrid
        category="all"
        sectionId="gift-set-options"
        eyebrow="GIFTABLE FAVOURITES"
        title="Choose their favourite"
      />
    </main>
  );
}

export default GiftSets;
