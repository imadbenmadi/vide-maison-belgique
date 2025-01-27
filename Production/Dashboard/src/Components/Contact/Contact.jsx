import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "./Card";
import { BiMessage } from "react-icons/bi";

function Contact() {
    const Navigate = useNavigate();

    const [Messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        const FetchMessages = async ({ setMessages, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.vide-maisonbelgique.org/Admin/Contact`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const Messages = response.data.Messages;
                    setMessages(Messages);
                } else if (response.status == 401) {
                    Swal.fire(
                        "Error",
                        "vous devez vous reconnecter à nouveau",
                        "error"
                    );
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                // setLoading(false);
            }
        };

        FetchMessages({ setMessages, setLoading, setError }).then(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className=" w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div className=" py-6 px-4">
                <div className=" text-xl font-semibold text-yallow_v">
                    {" "}
                    Contact Messages
                </div>

                {!Messages || Messages?.length == 0 ? (
                    <div className="text-md font-semibold text-gray_v text-center pt-12">
                        Pas des Messages
                    </div>
                ) : (
                    <div>
                        <div className=" w-full flex justify-center py-4">
                            <div className="max-w-[300px] overflow-auto border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                                <div className=" text-xs font-semibold pb-5 text-gray_v w-full">
                                    Nombre total de messages :{" "}
                                </div>
                                <div className=" flex justify-between gap-2 mx-2 w-full">
                                    <div className="  font-semibold text-2xl">
                                        {Messages?.length}
                                    </div>
                                    <div className=" shrink-0 text-yallow_v border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                        <BiMessage className=" shrink-0 text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {Messages &&
                            Messages?.map((message) => {
                                return (
                                    <Card
                                        key={message.id}
                                        Message={message}
                                        setMessages={setMessages}
                                        Messages={Messages}
                                        // handle_Delete_message={handle_Delete_message}
                                    />
                                );
                            })}
                    </div>
                )}
            </div>
        );
}

export default Contact;
