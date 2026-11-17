
import React from "react";
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
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
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
