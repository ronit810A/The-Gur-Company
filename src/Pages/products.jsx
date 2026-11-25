import ProductGrid from "../Component/ProductPageData/ProductGrid";
import "../Css/home.css";
import "../Css/powder.css";

function Products() {
  return (
    <main className="powder-page">
      <ProductGrid category="all" sectionId="all-products" eyebrow="OUR COLLECTION" />
    </main>
  );
}

export default Products;
