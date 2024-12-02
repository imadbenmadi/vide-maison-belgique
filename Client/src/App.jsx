import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Logo from "../public/Logo.png";
import { useAppContext } from "./AppContext";
function App() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // const [userType, setUserType] = useState(null);
    const { set_Auth, store_login } = useAppContext();
    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [Logo];
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve();
                    };
                    img.onerror = () => {
                        resolve();
                    };
                    img.src = imageSrc;
                });
            });
        };

        const fetch_fonts = () => {
            return new Promise((resolve) => {
                const fontURL =
                    "https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap";
                const link = document.createElement("link");
                link.href = fontURL;
                link.rel = "stylesheet";
                link.onload = () => {
                    document.getElementById("root").style.fontFamily =
                        "Poppins, sans-serif";
                    resolve();
                };
                link.onerror = () => {
                    document.getElementById("root").style.fontFamily =
                        "sans-serif";
                    resolve();
                };
                document.head.appendChild(link);
            });
        };

        Promise.all([fetch_fonts(), fetch_images()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    } else
        return (
            <div className=" text-right">
                <Outlet />
            </div>
        );
}

export default App;
