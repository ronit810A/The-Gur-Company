
import React from "react";

import { PhilosophyBG,PhilosophyPhone,Philosophybottom } from "../images";

function PhilosophySection() {
    return (
        <section className="philosophy-section">

            <img
                src={PhilosophyBG}
                className="philosophy-bg"
                alt=""
            />

            <div className="philosophy-container">

                <div className="philosophy-heading heading text-center">

                    <h6>OUR PHILOSOPHY</h6>

                    <h2>FROM FIELD TO FAMILY</h2>

                    <p>
                        One egg, many benefits. Each Truelay egg is naturally loaded
                        with protein, vitamins, and essential nutrients – giving  your<br></br>
                        body the strength and energy it deserves.
                    </p>

                </div>

                <div className="philosophy-image">

                    <img
                        src={PhilosophyPhone}
                        alt="Pancakes on phone"
                    />

                </div>

            </div>

            <div className="philosophy-bottom">
                <img
                    src={Philosophybottom}
                    alt="Farm illustration"
                />
            </div>

        </section>
    );
}

export default PhilosophySection;
