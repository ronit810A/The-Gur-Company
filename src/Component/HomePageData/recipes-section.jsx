
import React, { useRef, useState } from "react";

import {
    Recipes01,
    Recipes02,
    Recipes03,
    Recipes04,
    Recipes010,
    QualityArow
} from "../images";

import { FaPlay, FaPause } from "react-icons/fa";

function RecipesSection() {

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = () => {
        const video = videoRef.current;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const recipes = [
        { video: Recipes01, title: "Golden Jaggery Syrup" },
        { img: Recipes02, title: "Golden Jaggery Syrup" },
        { img: Recipes03, title: "Golden Jaggery Syrup" },
        { img: Recipes04, title: "Golden Jaggery Syrup" }
    ];

    return (
        <section className="recipes-section">

            <div className="container">

                <div className="recipes-heading heading text-center">

                    <h6>RECIPES</h6>

                    <h2>Crack. Cook. Create</h2>

                    <p>
                        At GreenBite, every meal is a result of teamwork.
                        Our chefs, nutritionists, and wellness specialists
                        collaborate to bring you food that’s not only<br></br>
                        delicious but also deeply nourishing. We believe
                        in combining creativity, science, and compassion
                        so you can enjoy food that fits and fuels<br></br> happiness.
                    </p>

                    <button className="curated-btn  recipes-btn">
                        <a href="#" className="quality-btn">
                           Explore More Recipes
                        </a>
                        <img src={QualityArow} alt="" />
                    </button>

                </div>

                <div className="row recipes-row">

                    {recipes.map((item, index) => (

                        <div className="col-lg-3 col-md-6 col-6" key={index}>

                            <div className="recipes-card">

                                {item.video ? (
                                    <div className="recipes-video">

                                        <video
                                            ref={videoRef}
                                            src={item.video}
                                            poster={Recipes010}
                                            muted
                                            loop
                                            playsInline
                                            controls={false}
                                            onClick={handleVideoClick}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                        />

                                        <button
                                            className="video-play-btn"
                                            type="button"
                                            onClick={handleVideoClick}
                                        >
                                            {isPlaying ? <FaPause /> : <FaPlay />}
                                        </button>

                                    </div>
                                ) : (
                                    <img src={item.img} alt={item.title} />
                                )}

                                <div className="recipes-card-title">
                                    {item.title}
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default RecipesSection;
