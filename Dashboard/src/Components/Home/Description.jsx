import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Description({ data }) {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    useEffect(() => {
        if (!data) return;

        const fetchData = async () => {
            try {
                const { image_link1, image_link2 } = data;

                // Update state with fetched data
                setImage1(
                    image_link1 ? `http://localhost:3000${image_link1}` : null
                );
                setImage2(
                    image_link2 ? `http://localhost:3000${image_link2}` : null
                );
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load description page data.",
                });
            }
        };

        fetchData();
    }, [data]);

    if (!data) return null;

    return (
        <div className="flex flex-col md:flex-row gap-8 mx-auto p-8  w-full">
            {/* Left Section - Images */}
            <div className="flex flex-col  items-center justify-center gap-6 w-full md:w-1/3 shrink-0 order-2 md:order-1">
                {image1 && (
                    <div>
                        <img
                            src={image1}
                            alt="Image 1"
                            className="rounded-lg shadow-lg w-[350px] h-[200px] object-cover"
                        />
                    </div>
                )}
                {image2 && (
                    <div>
                        <img
                            src={image2}
                            alt="Image 2"
                            className="rounded-lg shadow-lg w-[350px] h-[200px] object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Right Section - Description */}
            <div className="w-full md:w-2/3 flex flex-col order-1 md:order-2">
                {data.Title && (
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {data.Title}
                    </h1>
                )}
                {data.Description && (
                    <div className="p-2 ">
                        <p className="text-gray-600">{data.Description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Description;
