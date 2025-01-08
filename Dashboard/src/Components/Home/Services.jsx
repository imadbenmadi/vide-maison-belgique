import React, { useState, useEffect } from "react";

function Services({ data }) {
    if (!data) return null;
    useEffect(() => {
        console.log(data);
    }, [data]);

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
    return (
        <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {service?.image_link && (
                <img
                    loading="lazy"
                    src={`http://localhost:3000${service?.image_link}`}
                    alt={service?.Title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}

            <div className="p-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2  break-words">
                    {service?.Title}
                </h4>
                <p className="text-gray-700 mb-4 break-words">
                    {service?.Description}
                </p>
            </div>
        </div>
    );
}

export default Services;
