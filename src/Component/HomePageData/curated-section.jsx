
import { useEffect, useRef, useState } from "react";
import SliderModule from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { QualityArow } from "../images";
import PowderImage from "../../assets/curated-bg-05.png";
import JaggeryBlockImage from "../../assets/Jaggery Block.png";
import JaggerySyrupImage from "../../assets/jaggery-syrup.png";

const Slider = SliderModule.default || SliderModule;
const categoryImages = {
    powder: PowderImage,
    block: JaggeryBlockImage,
    syrup: JaggerySyrupImage,
};

function CuratedSection() {

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        fetch("/api/products", { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Products could not be loaded.");
                return response.json();
            })
            .then((products) => {
                if (!Array.isArray(products)) throw new Error("Product data is in an unexpected format.");
                setSlides(products
                    .filter((product) => product.status === "active")
                    .map((product) => ({
                        ...product,
                        img: product.image || categoryImages[product.category],
                    })));
                setLoading(false);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setLoadError(error.message);
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, []);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slidesToShow = viewportWidth <= 768 ? 1 : Math.min(3, slides.length || 3);
    const settings = {
        dots: false,
        infinite: slides.length > slidesToShow,
        speed: 600,
        slidesToShow,
        slidesToScroll: 1,
        autoplay: slides.length > slidesToShow,
        autoplaySpeed: 3000,
        arrows: false,

        centerMode: slides.length > 1,
        centerPadding:
            viewportWidth <= 576
                ? "45px"
                : viewportWidth <= 768
                    ? "220px"
                    : viewportWidth <= 992
                        ? "10px"
                        : viewportWidth <= 1200
                            ? "100px"
                            : viewportWidth <= 1537
                                ? "230px"
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
                        <a href="/products" className="quality-btn">
                            View All Products
                        </a>
                        <img src={QualityArow} alt="" />
                    </button>

                </div>

            </div>

            <div className="curated-slider">

                {loadError && <p className="product-grid-message" role="alert">{loadError}</p>}
                {loading && <p className="product-grid-message">Loading products…</p>}
                {!loading && !loadError && slides.length === 0 && <p className="product-grid-message">No products available yet.</p>}
                {slides.length > 0 && <Slider ref={sliderRef} {...settings}>

                    {slides.map((item) => (

                        <div key={item.id} className="curater-slide">

                            <div className="curater-card is-dynamic">

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
                                        <h6>{item.name}</h6>
                                        <p>{item.description || `Jaggery ${item.category} range`}</p>
                                    </div>

                                    <span className="curater-heart">
                                        ♡
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </Slider>}

                {slides.length > slidesToShow && <div className="curated-controls">

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

                </div>}

            </div>

        </section>
    );
}

export default CuratedSection;
