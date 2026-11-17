
import "../Css/home.css"

import BannerSection from "../Component/HomePageData/banner"
import QualitySection from "../Component/HomePageData/quality-section";
import CuratedSection from "../Component/HomePageData/curated-section";

function Home() {
    return (
        <>
            <BannerSection />
            <QualitySection/>
            <CuratedSection/>
        </>
    );
}

export default Home;