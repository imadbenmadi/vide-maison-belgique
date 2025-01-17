import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

function Mobile_Nav_Items({ MobileNav_Open, Toogle_Menu_Bar, Active_nav }) {
    return (
        <div className="flex md:hidden">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]
                  z-50    text-black_text  bg-white `}
            >
                <div className="  h-screen text-xl  pt-8 overflow-y-auto ">
                    <div className=" flex flex-col justify-start items-center h-[80%]  ">
                        <div className="text-center flex flex-col gap-8 my-8 ">
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Home"}
                                className={`${
                                    Active_nav == "Home"
                                        ? "text-perpol_v"
                                        : "text-black_text"
                                } select-none   `}
                            >
                                Home
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Home/Contact"}
                                className={`${
                                    Active_nav == "Contact"
                                        ? "text-perpol_v"
                                        : "text-black_text"
                                } select-none   `}
                            >
                                Contact
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Home/Demand"}
                                className={`${
                                    Active_nav == "Demand"
                                        ? "text-perpol_v"
                                        : "text-black_text"
                                } select-none   `}
                            >
                                Demandes
                            </Link>
                        </div>
                        <div className=" w-screen h-[2px] bg-gray_white "></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
