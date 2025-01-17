import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Laptop_Nav_Items({ Active_nav, handleLogout, LogoutClicked }) {
    return (
        <div className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12  md:text-md lg:text-lg  font-[500] text-black_text h-full p-2 ">
            <div>
                <Link to={"/Home"} className="select-none">
                    <img
                        src={Logo}
                        alt="Logo"
                        className=" w-[100px] lg:w-[135px] "
                    />
                </Link>
            </div>
            <div className="flex gap-6 lg:gap-14">
                <div
                    className={` ${
                        Active_nav == "Contact"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Home/Contact"} className={" select-none"}>
                        Contact{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Profile"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Home/Profile"} className={" select-none"}>
                        Profile{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Courses"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Home/Courses"} className={" select-none"}>
                        Courses{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Summaries"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Home/Summaries"} className={" select-none"}>
                        Summaries{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Purchased"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Home/Purchased"} className={" select-none"}>
                        Purchased{" "}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Laptop_Nav_Items;
