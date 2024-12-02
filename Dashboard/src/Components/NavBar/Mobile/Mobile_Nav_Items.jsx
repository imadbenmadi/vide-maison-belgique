import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useAppContext } from "../../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiContactsLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";

function Mobile_Nav_Items({ MobileNav_Open, Toogle_Menu_Bar }) {
    const Navigate = useNavigate();
    const { set_Auth } = useAppContext();
    const [Active_nav, setActive_nav] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);

    const [LogoutClicked, setLogoutClicked] = useState(false);
    const handleLogout = async () => {
        setLogoutClicked(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/logout",
                {},
                { withCredentials: true, validateStatus: () => true }
            );
            if (response.status === 204) {
                set_Auth(false);
                Swal.fire("Success!", `Logged Out Successfully`, "success");
                Navigate("/Login");
            } else {
                Swal.fire("Error!", "", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "", "error");
        }
        setLogoutClicked(false);
    };

    return (
        <div className="flex md:hidden">
            <div
                className={`${
                    MobileNav_Open ? "translate-x-[0vw]" : "translate-x-[200vh]"
                } absolute transition-transform duration-300 select-none w-[100vw] z-50 text-black_text bg-white`}
            >
                <div className="flex flex-col gap-8 text-sm text-black_text pl-8 py-4 h-screen overflow-auto">
                    <div>
                        <div className="flex flex-col gap-2 my-6">
                            <Link
                                to="/Home"
                                onClick={Toogle_Menu_Bar}
                                className={`${
                                    Active_nav === "Home"
                                        ? "bg-yallow_v text-white px-4"
                                        : "bg-white hover:text-yallow_v"
                                } transition-all duration-150 cursor-pointer py-1 w-[150px] rounded-full flex gap-2`}
                            >
                                <GoHome className="text-lg" /> Home
                            </Link>
                        </div>
                        <div>
                            <div className="font-semibold pb-4 flex gap-2 items-center">
                                <FaRegEdit className="text-lg" /> Edit Content
                            </div>
                            <div className="flex flex-col gap-2 pl-2">
                                <Link
                                    to="/Edit_Main"
                                    onClick={Toogle_Menu_Bar}
                                    className={`${
                                        Active_nav === "Edit_Main"
                                            ? "bg-yallow_v text-white px-4"
                                            : "bg-white hover:text-yallow_v"
                                    } transition-all duration-150 cursor-pointer py-1 w-[150px] rounded-full`}
                                >
                                    Main Page
                                </Link>
                                <Link
                                    to="/Edit_About"
                                    onClick={Toogle_Menu_Bar}
                                    className={`${
                                        Active_nav === "Edit_About"
                                            ? "bg-yallow_v text-white px-4"
                                            : "bg-white hover:text-yallow_v"
                                    } transition-all duration-150 cursor-pointer py-1 w-[150px] rounded-full`}
                                >
                                    About
                                </Link>
                                <Link
                                    to="/Edit_FAQ"
                                    onClick={Toogle_Menu_Bar}
                                    className={`${
                                        Active_nav === "Edit_FAQ"
                                            ? "bg-yallow_v text-white px-4"
                                            : "bg-white hover:text-yallow_v"
                                    } transition-all  duration-150 cursor-pointer py-1 w-[150px] rounded-full`}
                                >
                                    FAQ
                                </Link>
                                <Link
                                    to="/Edit_Services"
                                    onClick={Toogle_Menu_Bar}
                                    className={`${
                                        Active_nav === "Edit_Services"
                                            ? "bg-yallow_v text-white px-4"
                                            : "bg-white hover:text-yallow_v"
                                    } transition-all duration-150 cursor-pointer py-1 w-[150px] rounded-full`}
                                >
                                    Services
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold flex gap-2 items-center">
                            <Link
                                to="/Demands"
                                onClick={Toogle_Menu_Bar}
                                className={`${
                                    Active_nav === "Demands"
                                        ? "bg-yallow_v text-white px-4"
                                        : "bg-white hover:text-yallow_v"
                                } transition-all duration-150 cursor-pointer py-1 w-[150px] rounded-full flex gap-2`}
                            >
                                <MdOutlineWork className="text-lg" /> Demands
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold pb-4 flex gap-2 items-center">
                            <Link
                                to="/Contact"
                                onClick={Toogle_Menu_Bar}
                                className={`${
                                    Active_nav === "Contact"
                                        ? "bg-yallow_v text-white px-4"
                                        : "bg-white hover:text-yallow_v"
                                } transition-all duration-150 cursor-pointer py-1  w-fit rounded-full flex gap-2`}
                            >
                                <RiContactsLine className="text-lg" /> Contact
                                Messages
                            </Link>
                        </div>
                    </div>
                    <div className="pb-20">
                        {LogoutClicked ? (
                            <div className="w-full">
                                <span className="small-loader font-bold w-full m-auto"></span>
                            </div>
                        ) : (
                            <div
                                className="cursor-pointer w-full flex items-center gap-3 text-red-500"
                                onClick={handleLogout}
                            >
                                <TbLogout2 className="text-xl" />
                                Logout
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
