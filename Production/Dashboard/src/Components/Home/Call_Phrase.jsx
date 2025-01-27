import React from "react";

function Call_Phrase({ data, phone_number }) {
    if (!data) {
        return null;
    }
    return (
        <div
            className="w-[90%] mx-auto px-12 py-6 rounded-xl shadow-lg flex flex-col items-center justify-center gap-6 my-8"
            style={{
                background: "linear-gradient(to right, #f5cd73, #f7797d)", // Replace with your gradient colors
            }}
        >
            <div className="text-white text-2xl font-semibold text-center">
                {data?.Text}
            </div>
            <a
                className="mx-auto py-2 px-4 rounded bg-yellow-500 text-black cursor-pointer font-semibold text-xl"
                href={`tel:${phone_number}`}
            >
                {data?.button}
            </a>
        </div>
    );
}

export default Call_Phrase;
