
import React, { useEffect, useRef, useState } from "react";
import SliderModule from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";

import {
    QualityArow,
    Curatedbg01,
    Curatedbg02,
    Curatedbg03
} from "../images";

const Slider = SliderModule.default || SliderModule;

function CuratedSection() {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slides = [
        {
            img: Curatedbg01,
            title: "Golden Jaggery Syrup",
            description: "Operations & Manager",
            className: "curater-card-01"
        },
        {
            img: Curatedbg02,
            title: "Organic Jaggery Powder",
            description: "Lead Nutrition Specialist",
            className: "curater-card-02"
        },
        {
            img: Curatedbg03,
            title: "Classic Jaggery Cubes",
            description: "Head Culinary Designer",
            className: "curater-card-03"
        },
        {
            img: Curatedbg01,
            title: "Golden Jaggery Syrup",
            description: "Operations & Manager",
            className: "curater-card-01"
        },
        {
            img: Curatedbg02,
            title: "Organic Jaggery Powder",
            description: "Lead Nutrition Specialist",
            className: "curater-card-02"
        },
        {
            img: Curatedbg03,
            title: "Classic Jaggery Cubes",
            description: "Head Culinary Designer",
            className: "curater-card-03"
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: viewportWidth <= 768 ? 1 : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,

        centerMode: true,
        centerPadding:
            viewportWidth <= 576
                ? "45px"
                : viewportWidth <= 768
                    ? "100px"
                    : viewportWidth <= 992
                        ? "80px"
                        : viewportWidth <= 1200
                            ? "130px"
                            : "300px",
        focusOnSelect: true,

        pauseOnHover: false,
        pauseOnFocus: false,

        beforeChange: (_oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        }
    };

    return (
        <section className="curated-section">

            <div className="container">

                <div className="curated-heading heading text-center">

                    <h2>Curated for Discerning Palates</h2>

                    <p>
                        At GreenBite, every meal is a result of teamwork. Our chefs, nutritionists, and wellness specialists collaborate to bring you food that’s not only<br></br> delicious but also deeply nourishing. We believe in combining creativity, science, and compassion — so you can enjoy food that fits  fuels<br></br> happiness.
                    </p>

                    <button className="curated-btn">
                        <a href="#" className="quality-btn">
                            View All Products
                        </a>
                        <img src={QualityArow} alt="" />
                    </button>

                </div>

            </div>

            <div className="curated-slider">

                <Slider ref={sliderRef} {...settings}>

                    {slides.map((item, index) => (

                        <div key={index} className="curater-slide">

                            <div className={`curater-card ${item.className}`}>

                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="curater-img"
                                />

                                <div className="curater-arrow">
                                    ↗
                                </div>

                                <div className="curater-card-text heading">

                                    <div>
                                        <h6>{item.title}</h6>
                                        <p>{item.description}</p>
                                    </div>

                                    <span className="curater-heart">
                                        ♡
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </Slider>

                <div className="curated-controls">

                    <button
                        className="curated-prev"
                        onClick={() => sliderRef.current.slickPrev()}
                    >
                        <IoIosArrowBack />
                    </button>

                    <span className="curated-number">
                        {String(currentSlide + 1).padStart(2, "0")}
                    </span>

                    <button
                        className="curated-next"
                        onClick={() => sliderRef.current.slickNext()}
                    >
                       <IoIosArrowForward />
                    </button>

                </div>

            </div>

        </section>
    );
}

export default CuratedSection;
