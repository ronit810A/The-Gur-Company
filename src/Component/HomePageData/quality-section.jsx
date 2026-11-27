import { Quality01, QualityArow } from "../images";


import { FiShoppingBag, FiHeart } from "react-icons/fi";
import { LuSalad, LuSoup } from "react-icons/lu";
import { Link } from "react-router-dom";

function QualitySection() {

    const features = [
        {
            icon: <FiShoppingBag />,
            title: "Single-Origin Sourcing",
            description:
                <>
                    We source only the freshest, locally grown
                    <br></br>
                    produce to ensure every dish is packed with
                    <br></br>
                    natural flavor.
                </>
        },
        {
            icon: <LuSalad />,
            title: "Balanced Nutrition for a Better You",
            description:
                <>
                    Every recipe is carefully crafted by nutrition
                    <br></br>
                    experts to give you the perfect balance --of
                    <br></br> 
                    protein, fiber"
                </>
        },
        {
            icon: <FiHeart />,
            title: "Delicious Flavors That Redefine Healthy Eating",
            description: "Our chefs combine creativity and care to make every bite satisfying."
        },
        {
            icon: <LuSoup />,
            title: "Convenient Choices, Zero Compromise on Health",
            description: "Enjoy fresh, ready-to-eat meals delivered to your door or prepared in minutes."
        }
    ];

    return (
        <section className="quality-section">
            <div className="container">
                <div className="quality-container">
                    <div className="row ">

                        <div className="col-lg-6">
                            <div className="quality-left">
                                <div className="quality-heading heading">
                                    <h2>Quality Without Compromise</h2>
                                </div>
                                <div className="quality-img">
                                    <img src={Quality01} alt="" />
                                    <div className="quality-divider"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="quality-content">

                                <div className="quality-top-content heading">
                                    <p>
                                        At GreenBite, we believe that real wellness
                                        begins with mindful eating. Food isn't just
                                        about satisfying hunger — it's about nourishing
                                        your body, mind, and soul.
                                    </p>

                                    <button>
                                        <Link to="/products" className="quality-btn">
                                            Shop Now
                                        </Link>
                                        <Link to="/products" aria-label="Shop Now">
                                            <img src={QualityArow} alt="" />
                                        </Link>
                                    </button>

                                </div>

                                <div className="quality-features">
                                    {features.map((item, index) => (
                                        <div className="quality-feature-item" key={index}>

                                            <div className={`quality-feature-icon ${index === 0 ? "active" : ""}`}>
                                                {item.icon}
                                            </div>

                                            <div className="quality-feature-info heading">
                                                <h5>{item.title}</h5>
                                                <p>{item.description}</p>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default QualitySection;