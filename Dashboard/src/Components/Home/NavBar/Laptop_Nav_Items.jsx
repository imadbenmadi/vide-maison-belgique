import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
function Laptop_Nav_Items() {
    return (
        <div
            className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12
          md:text-md lg:text-lg  font-[500]  text-black_text h-full p-2 "
        >
            <div>
                <img src={Logo} alt="Logo" className=" w-[50px]  " />
            </div>
            <div className="flex gap-6 lg:gap-12">
                <div className=" md:hover:text-yallow_v transition-all duration-150  cursor-pointer">
                    <a
                        href={"/Home#Features"}
                        className={
                            " md:hover:text-yallow_v transition-all duration-150 select-none"
                        }
                    >
                        ميزاتنا
                    </a>
                </div>
                <div className=" md:hover:text-yallow_v transition-all duration-150  cursor-pointer">
                    <a
                        href={"/Home#How_we_work"}
                        className={
                            " md:hover:text-yallow_v transition-all duration-150 select-none"
                        }
                    >
                        كيف نعمل
                    </a>
                </div>

                <div className=" md:hover:text-yallow_v transition-all duration-150  cursor-pointer">
                    <a
                        href={"/Home#Contact"}
                        className=" md:hover:text-yallow_v transition-all duration-150 select-none"
                    >
                        Contact
                    </a>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Laptop_Nav_Items;
