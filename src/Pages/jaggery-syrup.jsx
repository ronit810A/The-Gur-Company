import JaggerySyrupBanner from "../Component/JaggerySyrupPageData/JaggerySyrupBanner";
import JaggerySyrupProducts from "../Component/JaggerySyrupPageData/JaggerySyrupProducts";
import JaggerySyrupBenefits from "../Component/JaggerySyrupPageData/JaggerySyrupBenefits";
import JaggerySyrupReviews from "../Component/JaggerySyrupPageData/JaggerySyrupReviews";

import "../Css/home.css";
import "../Css/powder.css";

function JaggerySyrup() {
    return (
        <main className="powder-page jaggery-syrup-page">
            <JaggerySyrupBanner />
            <JaggerySyrupProducts />
            <JaggerySyrupBenefits />
            <JaggerySyrupReviews />
        </main>
    );
}

export default JaggerySyrup;
