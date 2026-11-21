
import { Container, Row, Col, Card } from "react-bootstrap";

import React, { useEffect, useRef, useState } from "react";
import SliderModule from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoIosArrowForward, IoIosArrowBack, IoIosStar } from "react-icons/io";

import {
    Customer01,
    Customer02
} from "../images";

const Slider = SliderModule.default || SliderModule;


function PowderReviews() {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isNarrowViewport, setIsNarrowViewport] = useState(() =>
        window.matchMedia("(max-width: 991px)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 991px)");
        const handleViewportChange = (event) => {
            setIsNarrowViewport(event.matches);
        };

        mediaQuery.addEventListener("change", handleViewportChange);
        return () => mediaQuery.removeEventListener("change", handleViewportChange);
    }, []);


    const testimonials = [
        {
            img: Customer01,
            title: "Variety of flavors",
            review:
                <>
                    The taste reminded me of my grandmother's kitchen. There's no <br></br>comparison to what you find in supermarkets.The taste reminded <br></br>me of my grandmother's kitchen.  "
                </>,
            name: "Delphi, Todd's Bakery"
        },
        {
            img: Customer02,
            title: "Variety of flavors",
            review:
                <>
                    The taste reminded me of my grandmother's kitchen. There's no <br></br>comparison to what you find in supermarkets.The taste reminded <br></br>me of my grandmother's kitchen.  "
                </>,
            name: "Delphi, Todd's Bakery"
        },
        {
            img: Customer01,
            title: "Variety of flavors",
            review:
                <>
                    The taste reminded me of my grandmother's kitchen. There's no <br></br>comparison to what you find in supermarkets.The taste reminded <br></br>me of my grandmother's kitchen.  "
                </>,
            name: "Delphi, Todd's Bakery"
        },
        {
            img: Customer02,
            title: "Variety of flavors",
            review:
                <>
                    The taste reminded me of my grandmother's kitchen. There's no <br></br>comparison to what you find in supermarkets.The taste reminded <br></br>me of my grandmother's kitchen.  "
                </>,
            name: "Delphi, Todd's Bakery"
        }
    ];



    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: isNarrowViewport ? 1 : 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false
    };
    return (
        <section className="powder-reviews">
            <Container>
                <div className="heading text-center mb-5">
                    <h6>CUSTOMER LOVE</h6>
                    <h2>What Our Customers Say</h2>
                </div>

                <div className="testimonial-slider">

                    <Slider ref={sliderRef} {...settings}>

                        {testimonials.map((item, index) => (

                            <div key={index} className="testimonial-slide">

                                <div className="testimonial-card">

                                    <div className="testimonial-image">
                                        <img src={item.img} alt="Customer" />
                                    </div>

                                    <div className="testimonial-content ">

                                        <div className="testimonial-stars">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <IoIosStar key={star} />
                                            ))}
                                        </div>

                                        <h5>{item.title}</h5>

                                        <p>{item.review}</p>

                                        <h6>{item.name}</h6>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </Slider>

                    <div className="testimonial-navigation">

                        <button
                            className="testimonial-arrow"
                            onClick={() => sliderRef.current.slickPrev()}
                        >
                            <IoIosArrowBack />
                        </button>

                        <span className="testimonial-number">
                            {String(currentSlide + 1).padStart(2, "0")}
                        </span>

                        <button
                            className="testimonial-arrow"
                            onClick={() => sliderRef.current.slickNext()}
                        >
                            <IoIosArrowForward />
                        </button>

                    </div>

                </div>

            </Container>
        </section>
    );
}

export default PowderReviews;
