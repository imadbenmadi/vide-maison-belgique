import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Description({ data }) {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);
    if (!data) {
        return null;
    }

    // Fetch data from the backend
    const fetchdata = async () => {
        try {
            const { image_link1, image_link2 } = data || {};

            // Update state with fetched data (only if the data exists)

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

    // Fetch data on component mount
    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-8  rounded-lg ">
            {/* Title */}
            {data?.Title && (
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {data?.Title}
                </h1>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Section - Image 1 */}
                <div className=" flex gap-6 w-full md:w-1/2">
                    {image1 && (
                        <div className="">
                            <img
                                src={image1}
                                alt="Image 1"
                                className="rounded-lg shadow-lg w-[350px] h-[350px] object-cover"
                            />
                        </div>
                    )}
                    {image2 && (
                        <div className="">
                            <img
                                src={image2}
                                alt="Image 2"
                                className="rounded-lg shadow-lg w-[350px] h-[350px] object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Right Section - Description and Image 2 */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    {/* Description */}
                    {data?.Description && (
                        <div className=" p-6 rounded-lg shadow-md">
                            <p className="text-gray-600">{data?.Description}</p>
                        </div>
                    )}

                    {/* Image 2 */}
                </div>
            </div>
        </div>
    );
}

export default Description;
