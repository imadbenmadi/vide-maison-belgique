import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Main({ data }) {
    const [Data, setData] = useState(data);
    useEffect(() => {
        console.log(Data);
    }, [Data]);
    if (!Data) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div
            style={{
                backgroundImage: `url(http://localhost:3000${Data?.image_link})`,
            }}
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
        >
            <div>
                <div className=" text-3xl ">{Data?.Title}</div>
                <div>{Data?.Description}</div>
                <Link className></Link>
            </div>
        </div>
    );
}

export default Main;
