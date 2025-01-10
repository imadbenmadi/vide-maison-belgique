import React, { useEffect, useState } from "react";

function Phone_Popup({ data }) {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (data) {
            const interval = setInterval(() => {
                setShake(true);
                setTimeout(() => setShake(false), 500); // Shake duration
            }, 1500); // Pause between shakes

            return () => clearInterval(interval);
        }
    }, [data]);

    if (!data) return null;

    return (
        <a
            href={`tel:${data?.phone}`}
            className={`bg-yellow-500 py-4 px-6 rounded-lg shadow-lg font-bold text-xl text-white inline-block ${
                shake ? "animate-shake" : ""
            }`}
        >
            {data?.phone}
            <style>
                {`
                @keyframes shake {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    50% { transform: translateX(8px); }
                    75% { transform: translateX(-8px); }
                    100% { transform: translateX(0,0); }
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                `}
            </style>
        </a>
    );
}

export default Phone_Popup;
