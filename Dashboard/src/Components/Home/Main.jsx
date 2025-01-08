import React, { useState, useEffect } from "react";

function Main({ data }) {
    const [imageSrc, setImageSrc] = useState(""); // Manage the current image source
    const fallbackImage = "/bg.jpg"; // Path to your fallback image (make sure it's correct)

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
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    const handleScroll = () => {
        const element = document.getElementById("ServicesID");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${imageSrc})`,
            }}
            className="relative min-h-screen bg-cover bg-center flex items-end justify-center"
        >
            <div className="absolute inset-0 bg-gradient-to-b 
            from-transparent via-black/30 to-black opacity-1"></div>
            <div className="text-center mb-24 relative z-10">
                {/* Ensure text is above the overlay */}
                <div className="text-3xl mb-1 text-white font-bold">
                    {data?.Title}
                </div>
                <div className="text-white text-lg">{data?.Description}</div>
                <button
                    onClick={handleScroll}
                    className="select-none px-3 py-2 mt-4 bg-yellow-500 text-white rounded-lg font-bold text-2xl"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default Main;
