import JaggeryBlockBanner from "../Component/JaggeryBlockPageData/JaggeryBlockBanner";
import JaggeryBlockProducts from "../Component/JaggeryBlockPageData/JaggeryBlockProducts";
import JaggeryBlockBenefits from "../Component/JaggeryBlockPageData/JaggeryBlockBenefits";
import JaggeryBlockReviews from "../Component/JaggeryBlockPageData/JaggeryBlockReviews";

import "../Css/home.css";
import "../Css/powder.css";

function JaggeryBlock() {
    return (
        <main className="powder-page jaggery-block-page">
            <JaggeryBlockBanner />
            <JaggeryBlockProducts />
            <JaggeryBlockBenefits />
            <JaggeryBlockReviews />
        </main>
    );
}

export default JaggeryBlock;
