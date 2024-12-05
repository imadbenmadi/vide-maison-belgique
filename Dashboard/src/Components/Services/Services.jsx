import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
function Services() {
    const { company } = useOutletContext();
    const [services, setservices] = useState([]);
    useEffect(() => {
        setservices(company.services);
    }, [company]);

    if (!services || services.length === 0) {
        return (
            <div className="text-center text-gray-700 mt-10">
                لا توجد مقالات متاحة لهذه الشركة.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">المقالات</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <serviceCard
                        key={service.id}
                        service={service}
                        companyId={company.id}
                    />
                ))}
            </ul>
        </div>
    );
}

function serviceCard({ service, companyId }) {
    return (
        <li className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {/* service Image */}
            {service.image_link && (
                <img
                    loading="lazy"
                    src={`http://localhost:3000/${service.image_link}`}
                    alt={service.Title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}

            <div className="p-4">
                {/* service Title */}
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    {service.Title}
                </h4>

                {/* service Date */}
                <p className="text-sm text-gray-500 mb-2">
                    date: {dayjs(service?.createdAt).format("DD-MMM-YYYY")}
                </p>

                {/* service Description */}
                <p className="text-gray-700 mb-4">
                    {service.Description?.substring(0, 100)}...
                </p>

                {/* Link to service Detail */}
                <Link
                    to={`/Services/${service.id}`}
                    className="inline-block mt-4"
                >
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium text-center">
                        read more
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default Services;
