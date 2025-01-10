import React from "react";

function Call_Phrase({ data, phone_number }) {
    if (!data) {
        return null;
    }
    return (
        <div className=" w-[90vw] bg-yallow_v px-12 py-6 rounded-xl shadow-lg">
            <div className=" text-white text-2xl font-semibold">
                {data?.Text}
            </div>
            <a
                className="mx-auto py-2 px-4 rounded bg-blue-500 text-white cursor-pointer font-semibold text-sm"
                href={`tel:${phone_number}`}
            >
                {phone_number}
            </a>
        </div>
    );
}

export default Call_Phrase;
