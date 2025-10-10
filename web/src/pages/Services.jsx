import React, { useEffect } from "react";
import ServicesIcons from "../components2/ServicesIcons";
import Workflow from "../components2/Workflow";
import ServicesInfo from "../components2/ServicesInfo";

export default function Services() {

    useEffect(() => {
        setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        }, 100);
    }, []);


    return (
        <>
        <div className="w-full h-full mt-28 lg:mt-32">
            <div className="max-w-4xl mx-auto h-full lg:h-80">
                <h1 class="text-6xl sujoy font-bold text-center mb-4">
                    Transforming Ideas into Stunning Digital Experiences
                </h1>

                <p class="text-md md:text-lg sujoy3 text-center text-gray-700 max-w-3xl mx-auto">
                    At Revox Studio, we craft modern websites and web applications that help startups, creatives, and businesses shine online. From sleek portfolios and e-commerce platforms to custom solutions for art, culture, and technology, our services combine innovation, design, and performance to bring your vision to life.
                </p>
            </div>
            <Workflow />
            <ServicesInfo />
            <ServicesIcons />
        </div>
        </>
    );
}
