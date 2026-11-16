
import { BannerArow, Line, Vector, BannerCard, BannerImg, BannerImg2 } from "../images";

import { MdOutlineShoppingBag } from "react-icons/md";


function BannerSection() {
    return (
        <section className="baner-section">
            <div className="row">
                <div className="col-lg-6">
                    <div className="baner-content">

                        <div className="baner-heading heading">
                            <h6> <img src={Line} alt="" />Because integrity belongs in your meals too.</h6>
                            <h1>Sweetness, Redefined</h1>
                            <p>
                                Artisanal jaggery crafted with intention. Pure, unrefined, and sourced <br></br> directly from India's finest sugarcane farms.
                            </p>
                        </div>

                        <div className="baner-btn">
                            <button>Explore Colloection </button>
                            <button>Shop Now </button>
                            <img src={BannerArow} alt="" />
                        </div>

                        <div className="baner-box">
                            <h6 className="baner-box-h6"><img src={Vector} alt="" /> Our Highlight Menu</h6>
                            <div className="row">

                                <div className="col-lg-6">
                                    <div className="baner-card">
                                        <h6>Classic Jaggery Cubes</h6>
                                        <p>Hand-cut cubes<br></br> perfect for your daily<br></br>chai ritual</p>
                                        <button>Add to Cart <MdOutlineShoppingBag /></button>
                                        <img src={BannerCard} alt="" />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="baner-card">
                                        <h6>Classic Jaggery Cubes</h6>
                                        <p>Hand-cut cubes<br></br> perfect for your daily<br></br> chai ritual</p>
                                        <button>Add to Cart <MdOutlineShoppingBag /></button>
                                        <img src={BannerCard} alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="banner-img">
                        <img src={BannerImg} alt="" className="banner-img-1" />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default BannerSection;