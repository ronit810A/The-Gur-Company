
import React, { useEffect, useState } from "react";
import SliderModule from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {MediaCoverage01,
    MediaCoverage02,
    MediaCoverage03,
    MediaCoverage04,
    MediaCoverage05} from "../images"

const Slider = SliderModule.default || SliderModule;

function MediaCoverageSlider() {
    const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logos = [
        MediaCoverage01,
    MediaCoverage02,
    MediaCoverage05,
    MediaCoverage04,
    MediaCoverage03,
    MediaCoverage01,
    MediaCoverage02,
    MediaCoverage05,
    MediaCoverage04,
    MediaCoverage03
    ];

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 5000,
        slidesToShow: viewportWidth <= 576 ? 2 : viewportWidth <= 992 ? 3 : 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        swipe: false
    };

    return (
        <section className="media-coverage-section">
            <div className="container-fluid">
                <Slider {...settings}>
                    {logos.map((logo, index) => (
                        <div className="media-slide" key={index}>
                            <div className="media-logo">
                                <img src={logo} alt="Media publication" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default MediaCoverageSlider;
