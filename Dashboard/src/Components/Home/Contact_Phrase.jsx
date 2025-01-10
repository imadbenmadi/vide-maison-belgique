import React from "react";
import { Link } from "react-router-dom";
function Call_Phrase({ data }) {
    if (!data) {
        return null;
    }
    return (
        <div className=" w-[90vw] bg-yallow_v px-12 py-6 rounded-xl shadow-lg">
            <div className=" text-white text-2xl font-semibold">
                {data?.Text}
            </div>
            <Link
                className="mx-auto py-2 px-4 rounded bg-blue-500 text-white cursor-pointer font-semibold text-sm"
                to={"/home/Contact"}
            >
                {data?.button}
            </Link>
        </div>
    );
}

export default Call_Phrase;
