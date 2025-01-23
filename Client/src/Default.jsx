import React from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/");
    }, []);
    return null;
}

export default Default;
