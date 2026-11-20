
import PowderBanner from "../Component/PowderPageData/PowderBanner";
import PowderProducts from "../Component/PowderPageData/PowderProducts";
import PowderBenefits from "../Component/PowderPageData/PowderBenefits";
import PowderReviews from "../Component/PowderPageData/PowderReviews";

import "../Css/home.css"
import "../Css/powder.css"

function Powder() {
    return (
        <main className="powder-page">
            <PowderBanner />
            <PowderProducts />
            <PowderBenefits />
            <PowderReviews />
        </main>
    );
}

export default Powder;
