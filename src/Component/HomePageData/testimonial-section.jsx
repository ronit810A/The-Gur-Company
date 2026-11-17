
import React, { useRef, useState } from "react";
import SliderModule from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";


import {
    PhilosophyBG,
    Customer01,
    Customer02,
    QualityArow
} from "../images";

const Slider = SliderModule.default || SliderModule;

function TestimonialsSection() {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);


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
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,

        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        }
    };


    return (

        <section
            className="testimonial-section"
            style={{
                backgroundImage: `url(${PhilosophyBG})`
            }}
        >

            <div className="container">

                {/* Heading */}

                <div className="row testimonial-heading  heading align-items-center">

                    <div className="col-lg-6">

                        <h2>
                            What Our<br />
                            Customers Say
                        </h2>

                    </div>

                    <div className="col-lg-6">

                        <div className="testimonial-heading-right heading">

                            <p>
                                At GreenBite, we believe that real wellness
                                begins with mindful<br></br> eating. Food isn't just
                                about satisfying hunger. It's about<br></br>
                                nourishing your body, mind, and soul.
                            </p>

                            <button className="curated-btn  testimonial-btn">
                                <a href="#" className="quality-btn">
                                    Shop Now
                                </a>
                                <img src={QualityArow} alt="" />
                            </button>

                        </div>

                    </div>

                </div>


                {/* Testimonial Slider */}


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
                                                <i className="bi bi-star-fill" key={star}></i>
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

            </div>

        </section>
    );
}

export default TestimonialsSection;
