import React from "react";
import Faq_Card from "./Faq_Card";
import { motion } from "framer-motion";

function Faq({ data }) {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="py-12 ">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mt-2">
                    Find answers to common questions below.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 w-[90%] mx-auto">
                {data.map((faq, index) => (
                    <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="w-full"
                    >
                        <Faq_Card faq={faq} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Faq;
