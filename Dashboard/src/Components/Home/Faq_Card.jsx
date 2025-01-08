import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Faq_Card({ faq }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-white rounded-lg shadow-lg p-4 break-words
         w-full transition-transform transform hover:scale-105 hover:shadow-xl"
        >
            {/* FAQ Question */}
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-gray-800">
                    {faq?.qst}
                </h3>
                <button className="text-gray-600">
                    {isOpen ? (
                        <FaAngleUp size={20} />
                    ) : (
                        <FaAngleDown size={20} />
                    )}
                </button>
            </div>

            {/* FAQ Answer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 text-gray-700"
                    >
                        <p>{faq?.sol}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Faq_Card;
