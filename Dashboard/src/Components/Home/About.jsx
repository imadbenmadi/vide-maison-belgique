import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function About({ data }) {
    const [imageSrc, setImageSrc] = useState(""); // Manage the current image source
    const fallbackImage = "/Image-not-found.png"; // Path to your fallback image (make sure it's correct)

    const ref = useRef(null); // Reference to track the section
    const isInView = useInView(ref, {
        once: true,
        margin: "0px 0px -100px 0px",
    }); // Trigger only once when 100px above the viewport

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        const loadImage = (src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => setImageSrc(src); // If image loads successfully
            img.onerror = () => setImageSrc(fallbackImage); // If an error occurs
        };

        if (data?.image_link) {
            loadImage(`http://localhost:3000${data.image_link}`);
        } else {
            setImageSrc(fallbackImage);
        }
    }, [data]);

    if (!data) {
        return null;
    }

    const handleScroll = () => {
        const element = document.getElementById("ServicesID");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative min-h-[70vh] bg-cover bg-center my-12">
            <div className="text-4xl font-semibold text-gray-700 text-center mb-8 md:mb-16">
                À propos de nous
            </div>
            <div className="flex flex-col md:gap-16 gap-6 md:flex-row items-center justify-center">
                <div className="md:w-1/2 text-center md:text-start" ref={ref}>
                    {/* Animated Text Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-start relative z-10 "
                    >
                        <div className="text-2xl mb-1 text-gray-700 font-bold">
                            {data?.Title}
                        </div>
                        <div className="text-gray-700 text-lg">
                            {data?.Description}
                        </div>
                        <button
                            onClick={handleScroll}
                            className="select-none px-3 py-2 mt-4 bg-yellow-500 text-white rounded-lg font-bold text-2xl"
                        >
                            {data?.button}
                        </button>
                    </motion.div>
                </div>

                <img src={imageSrc} alt="" className="rounded-lg w-[220px]" />
            </div>
        </div>
    );
}

export default About;
