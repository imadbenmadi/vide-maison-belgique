import React, { useState, useEffect } from "react";
import axios from "axios";

function Services() {
    const [Services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const FetchServices = async ({ setServices, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Services`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    const Services = response.data.Service;
                    setServices(Services);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you have to re-Login again", "error");
                    Navigate("/Login");
                    setError(response.data);
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        FetchServices({ setServices, setLoading, setError });
    }, []);

    if (loading) {
        return (
            <div className=" w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    Services Offered
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white p-4 rounded-lg shadow-md"
                        >
                            {service.image_link && (
                                <img
                                    src={service.image_link}
                                    alt={service.Title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}
                            <h4 className="text-lg font-semibold text-gray-800">
                                {service.Title}
                            </h4>
                            {service.Description && (
                                <p className="text-gray-600 mt-2">
                                    {service.Description}
                                </p>
                            )}
                            {service.type && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Type: {service.type}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
}

export default Services;
