import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Services({ data }) {
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    if (!data) {
        return null;
    }
    return (
        <div className="py-6 px-4 min-h-screen">
            <div className="text-4xl font-semibold text-gray-800 text-center my-8">
                Services Offered
            </div>
            {!data || data.length === 0 ? (
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="text-md font-semibold text-gray-500 text-center pt-12">
                        No Services yet
                    </div>
                </div>
            ) : (
                <div className="">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((service) => (
                            <Service_card key={service?.id} service={service} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function Service_card({ service }) {
    if (!service) {
        return null;
    }
    const fallbackImage = "/Image-not-found.png"; // Path to your fallback image (make sure it's correct)
    const [imageSrc, setImageSrc] = useState(""); // Manage the current image source
    useEffect(() => {
        const loadImage = (src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => setImageSrc(src); // If image loads successfully
            img.onerror = () => setImageSrc(fallbackImage); // If an error occurs
        };

        if (service?.image_link) {
            loadImage(`http://localhost:3000${service.image_link}`);
        } else {
            setImageSrc(fallbackImage);
        }
    }, [service]);

    return (
        <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {service?.image_link && (
                <img
                    loading="lazy"
                    // src={`http://localhost:3000${service?.image_link}`}
                    alt={service?.Title}
                    src={imageSrc}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}

            <div className="p-4">
                <h4 className="text-lg font-semibold text-yallow_v text-center mb-2  break-words">
                    {service?.Title}
                </h4>
                <p className="text-gray-700 mb-4 break-words">
                    {service?.Description}
                </p>
            </div>
            <Link
                to={`/Home/Demand?type=${service?.type}`}
                className="bg-yallow_v text-md py-2 px-4 text-white font-semibold rounded-b-lg w-full block text-center"
            >
                demande{" "}
            </Link>
        </div>
    );
}

export default Services;
