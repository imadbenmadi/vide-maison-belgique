import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Laptop_Nav_Items({ Active_nav }) {
    return (
        <div
            className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12 
         md:text-md lg:text-lg  font-[500] text-black_text h-full p-2 "
        >
            <div>
                <Link to={"/Home"} className="select-none">
                    <img
                        className="select-none w-[50px] "
                        src={Logo}
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="flex gap-6 lg:gap-14">
                <div
                    className={` ${
                        Active_nav == "Home"
                            ? "text-yallow_v"
                            : "text-black_text"
                    } md:hover:text-yallow_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Home"} className={" select-none"}>
                        Home{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Contact"
                            ? "text-yallow_v"
                            : "text-black_text"
                    } md:hover:text-yallow_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Contact"} className={" select-none"}>
                        Contact{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Demand"
                            ? "text-yallow_v"
                            : "text-black_text"
                    } md:hover:text-yallow_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Demand"} className={" select-none"}>
                        demander un devis{" "}
                    </Link>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Laptop_Nav_Items;
