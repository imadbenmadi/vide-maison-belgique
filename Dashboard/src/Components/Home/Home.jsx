import React, { useEffect, useState } from "react";
import axios from "axios";

import dayjs from "dayjs";
import Main from "./Main";
import About from "./About";
import Services from "./Services";
import Faq from "./Faq";
import Footer from "./Footer";
import Description from "./Description";
import Call_Phrase from "./Call_Phrase";
import Contact_Phrase from "./Contact_Phrase";
function Home() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        console.log(data);
    }, [data]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/Admin/Home",
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className=" min-h-screen">
                    <Main data={data?.Main_page} />
                    <About data={data?.About_page} />
                    <Call_Phrase data={data?.Phrase_Call} />
                    <Description data={data?.Description} />
                    <Contact_Phrase data={data?.Phrase_Contact} />
                    <div id="ServicesID">
                        <Services data={data?.Services} />
                    </div>
                    <Faq data={data?.Faq} />
                </div>

                <Footer data={data?.Contact_informations} />
            </div>
        );
    }
}

export default Home;
