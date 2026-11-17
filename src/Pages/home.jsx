
import "../Css/home.css"

import BannerSection from "../Component/HomePageData/banner"
import QualitySection from "../Component/HomePageData/quality-section";
import CuratedSection from "../Component/HomePageData/curated-section";
import PhilosophySection from "../Component/HomePageData/philosophy-section";
import RecipesSection from "../Component/HomePageData/recipes-section";
import TestimonialsSection from "../Component/HomePageData/testimonial-section";
import MediaCoverageSlider from "../Component/HomePageData/media-coverage-section";

function Home() {
    return (
        <>
            <BannerSection />
            <QualitySection />
            <CuratedSection />
            <PhilosophySection />
            <RecipesSection/>
            <TestimonialsSection/>
            <MediaCoverageSlider/>
        </>
    );
}

export default Home;