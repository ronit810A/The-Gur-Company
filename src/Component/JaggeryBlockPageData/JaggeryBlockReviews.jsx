import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import SliderModule from "react-slick";
import { IoIosArrowForward, IoIosArrowBack, IoIosStar } from "react-icons/io";
import { Customer01, Customer02 } from "../images";

const Slider = SliderModule.default || SliderModule;

const testimonials = [
    {
        img: Customer01,
        title: "A taste of tradition",
        review:
            "The taste reminded me of my grandmother's kitchen. There's no comparison to what you find in supermarkets.",
        name: "Delphi, Todd's Bakery",
    },
    {
        img: Customer02,
        title: "Rich, familiar sweetness",
        review:
            "The taste reminded me of my grandmother's kitchen. There's no comparison to what you find in supermarkets.",
        name: "Delphi, Todd's Bakery",
    },
    {
        img: Customer01,
        title: "A taste of tradition",
        review:
            "The taste reminded me of my grandmother's kitchen. There's no comparison to what you find in supermarkets.",
        name: "Delphi, Todd's Bakery",
    },
    {
        img: Customer02,
        title: "Rich, familiar sweetness",
        review:
            "The taste reminded me of my grandmother's kitchen. There's no comparison to what you find in supermarkets.",
        name: "Delphi, Todd's Bakery",
    },
];

function JaggeryBlockReviews() {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(2);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 991px)");
        const updateSlidesToShow = () => setSlidesToShow(mediaQuery.matches ? 1 : 2);

        updateSlidesToShow();
        mediaQuery.addEventListener("change", updateSlidesToShow);
        return () => mediaQuery.removeEventListener("change", updateSlidesToShow);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false,
        afterChange: setCurrentSlide,
    };

    return (
        <section className="powder-reviews jaggery-block-reviews">
            <Container>
                <div className="heading text-center mb-5">
                    <h6>CUSTOMER LOVE</h6>
                    <h2>What Our Customers Say</h2>
                </div>

                <div className="testimonial-slider">
                    <Slider ref={sliderRef} {...settings}>
                        {testimonials.map((item, index) => (
                            <div key={`${item.title}-${index}`} className="testimonial-slide">
                                <div className="testimonial-card">
                                    <div className="testimonial-image">
                                        <img src={item.img} alt="Customer" />
                                    </div>
                                    <div className="testimonial-content">
                                        <div className="testimonial-stars">
                                            {[1, 2, 3, 4, 5].map((star) => (
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
                            type="button"
                            aria-label="Previous reviews"
                            onClick={() => sliderRef.current?.slickPrev()}
                        >
                            <IoIosArrowBack />
                        </button>
                        <span className="testimonial-number">
                            {String(currentSlide + 1).padStart(2, "0")}
                        </span>
                        <button
                            className="testimonial-arrow"
                            type="button"
                            aria-label="Next reviews"
                            onClick={() => sliderRef.current?.slickNext()}
                        >
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default JaggeryBlockReviews;
