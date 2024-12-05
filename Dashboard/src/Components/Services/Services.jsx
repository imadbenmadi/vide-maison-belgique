import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Services() {
    const [Services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
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
            <div className="py-6 px-4">
                <div className="text-xl font-semibold text-yallow_v">
                    Services Offered
                </div>
                {!Services || Services?.length === 0 ? (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="text-md font-semibold text-gray-500 text-center pt-12">
                            No Services yet
                        </div>
                        <Link
                            to="/Services/Add"
                            className="mx-auto py-2 px-4 rounded bg-blue-500 text-white cursor-pointer font-semibold text-sm"
                        >
                            Add Service
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="my-6 flex flex-col gap-6">
                            <Link
                                to="/Services/Add"
                                className="mx-auto py-2 px-4 rounded bg-blue-500 text-white cursor-pointer font-semibold text-sm"
                            >
                                Add Service
                            </Link>
                            <div>
                                {Services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="bg-white p-4 rounded-lg shadow-md"
                                    >
                                        {service.image_link && (
                                            <img
                                                src={service.image_link}
                                                alt={service.name}
                                                className="w-full h-auto rounded"
                                            />
                                        )}
                                        <div className="mt-4">
                                            <div className="text-lg font-semibold">
                                                {service.name}
                                            </div>
                                            <p className="text-gray-600">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
}

export default Services;
