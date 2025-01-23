import React, { useEffect, useState } from "react";

function Phone_Popup({ data }) {
    const [rotate, setRotate] = useState(false);

    useEffect(() => {
        if (data) {
            const interval = setInterval(() => {
                setRotate(true);
                setTimeout(() => setRotate(false), 500); // Rotation duration
            }, 1500); // Pause between animations

            return () => clearInterval(interval);
        }
    }, [data]);

    if (!data) return null;

    return (
        <a
            href={`tel:${data?.phone}`}
            className={`bg-yallow_v py-3 px-6 rounded-lg shadow-xl 
                font-bold text-xl text-white inline-block ${
                rotate ? "animate-rotate" : ""
            }`}
        >
            {data?.phone}
            <style>
                {`
                @keyframes rotate2D {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(6deg); }
                    50% { transform: rotate(-6deg); }
                    75% { transform: rotate(6deg); }
                    100% { transform: rotate(0deg); }
                }

                .animate-rotate {
                    animation: rotate2D 0.5s ease-in-out;
                }
                `}
            </style>
        </a>
    );
}

export default Phone_Popup;
