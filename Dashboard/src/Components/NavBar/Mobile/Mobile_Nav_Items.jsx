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
import Item from "./Item";
import { MdContacts } from "react-icons/md";
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
                <div className="flex flex-col gap-4 text-sm text-black_text pl-8 py-4 h-screen overflow-auto">
                    <div className="flex flex-col gap-2  mt-6">
                        <Item
                            Link="Home"
                            name="Home"
                            Active_nav={Active_nav}
                            Icon={GoHome}
                            onClick={Toogle_Menu_Bar}
                        />
                    </div>

                    <div>
                        <div className="font-semibold pb-4 flex gap-2 items-center">
                            <FaRegEdit className="text-lg" /> Edit Content
                        </div>
                        <div className="flex flex-col gap-2 pl-2">
                            <Item
                                Link="Edit_Main"
                                name="Main Section"
                                Active_nav={Active_nav}
                                Icon={null}
                                onClick={Toogle_Menu_Bar}
                            />
                            <Item
                                Link="Edit_About"
                                name="About Section"
                                Active_nav={Active_nav}
                                Icon={null}
                                onClick={Toogle_Menu_Bar}
                            />
                            <Item
                                Link="Edit_Services"
                                name="Services Section"
                                Active_nav={Active_nav}
                                Icon={null}
                                onClick={Toogle_Menu_Bar}
                            />
                            <Item
                                Link="Edit_FAQ"
                                name="FAQ Section"
                                Active_nav={Active_nav}
                                Icon={null}
                                onClick={Toogle_Menu_Bar}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold flex gap-2 items-center">
                            <Item
                                Link="Demands"
                                name="Demands"
                                Active_nav={Active_nav}
                                Icon={MdOutlineWork}
                                onClick={Toogle_Menu_Bar}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold  flex gap-2 items-center">
                            <Item
                                Link="Contact"
                                name="Contact Messages"
                                Active_nav={Active_nav}
                                Icon={RiContactsLine}
                                onClick={Toogle_Menu_Bar}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold pb-4 flex gap-2 items-center">
                            <Item
                                Link="Contact_informations"
                                name="Contact informations"
                                Active_nav={Active_nav}
                                Icon={MdContacts}
                                onClick={Toogle_Menu_Bar}
                            />
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
