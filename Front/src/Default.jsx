import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";

function Default() {
    const { isAuth, userType, userId } = useAppContext();
    const Navigate = useNavigate();
    useEffect(() => {
        // else if (isAuth && userType == "Director") {
        //     // Navigate(`/Director/${userId}`);
        //     Navigate(`/Director`);
        // } else if (isAuth && userType == "freelancer") {
        //     // Navigate(`/Freelancer/${userId}`);
        //     Navigate(`/Freelancer`);
        // } else Navigate("/Home");

        if (!isAuth || !userType) Navigate("/Home");
        if (isAuth && userType == "Director") {
            Navigate(`/Director`);
        } else if (isAuth && userType == "Malad") {
            Navigate(`/Malad`);
        } else if (isAuth && userType == "Doctor") {
            Navigate(`/Doctor`);
        } else if (isAuth && userType == "Worker") {
            Navigate(`/Worker`);
        } else Navigate(`/Home`);
    }, []);
}
export default Default;
