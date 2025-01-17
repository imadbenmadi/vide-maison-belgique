import Laptop_Nav_Items from "./Laptop_Nav_Items";
import Mobile_Nav from "./Mobile_Nav";
import { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";

function NavBar() {
    const [Active_nav, setActive_nav] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(
            location.pathname.split("/")[2] || location.pathname.split("/")[1]
        );
    }, [location.pathname]);

    return (
        <div
            className={` fixed  h-[60px] m-0  z-30 w-full bg-white  border-b   `}
        >
            <Laptop_Nav_Items Active_nav={Active_nav} />
            <Mobile_Nav Active_nav={Active_nav} />
        </div>
    );
}

export default NavBar;
