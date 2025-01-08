import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function Card({ faq }) {
    const [isOpen, setIsOpen] = useState(false); // To toggle FAQ visibility (question/answer)

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-lg  ">
            {/* FAQ Question */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                    {faq?.qst}
                </h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-blue-500 focus:outline-none"
                >
                    {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                </button>
            </div>

            {/* FAQ Answer */}
            {isOpen && (
                <div className="mt-4 text-gray-700">
                    <p>{faq?.sol}</p>
                </div>
            )}
        </div>
    );
}

export default Card;
