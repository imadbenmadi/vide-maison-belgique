import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdCategory } from "react-icons/md";

function Card({ Faq, Faqs, setFaqs }) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [show_more, setShow_more] = useState(false);
    const Toogle_Show_More = () => {
        setShow_more(!show_more);
    };
    const handle_Delete_Faq = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Admin/Faqs/${Faq?.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                const newFaqs = Faqs.filter((item) => item?.id !== Faq?.id);
                setFaqs(newFaqs);
                Swal.fire("Success", "Deleted Successfully", "success");
            } else if (response.status === 401) {
                Swal.fire(
                    "UnAuthorised",
                    "you have to re-Login again",
                    "error"
                );
                Navigate("/Login");
            } else
                Swal.fire(
                    "Error",
                    "An Error Occured , Please Try Again",
                    "error"
                );
        } catch (err) {
            Swal.fire("Error", "An Error Occured , Please Try Again", "error");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        // <div></div>
        <div
            key={Faq?.id}
            className="flex flex-col md;flex-row justify-between py-4 px-7  border-2 
                         border-yallow_v rounded-lg  mt-6 text-gray_v"
        >
            <div className="w-full md:w-full shrink-0">
                <div className="flex flex-col gap-4  text-gray_v font-semibold text-sm ">
                    <div className=" flex items-center gap-2">
                        <FiUser className=" text-xl" />
                        {Faq?.firstName + " " + Faq?.lastName}
                    </div>
                    <div className=" flex items-center gap-2 ">
                        <MdOutlineMailOutline className=" text-xl" />

                        <a
                            href={`mailto:${Faq?.email}`}
                            className="text-yallow_v"
                        >
                            {Faq?.email}
                        </a>
                    </div>
                    <div className=" flex items-center gap-2 ">
                        <MdCategory className=" text-xl" />
                        <div className="text-yallow_v">{Faq?.type}</div>
                    </div>
                </div>
                <div className=" font-semibold text-gray_v py-6 md:px-4 break-all">
                    {show_more ? (
                        <div className=" flex flex-col ">
                            {Faq?.message}
                            <span
                                onClick={Toogle_Show_More}
                                className=" text-yallow_v cursor-pointer flex items-center gap-1  "
                            >
                                {" "}
                                Show Less <FaAngleUp />
                            </span>
                        </div>
                    ) : (
                        <div className=" flex flex-col ">
                            <div>{Faq?.message.slice(0, 500)}</div>
                            {Faq?.message.length > 500 && (
                                <div
                                    onClick={Toogle_Show_More}
                                    className=" text-yallow_v cursor-pointer flex items-center gap-1  "
                                >
                                    {" "}
                                    Show More <FaAngleDown />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className=" flex mx-auto text-center flex-col md:flex-row gap-3 w-fit pt-4 md:pt-0 md:w-fit shrink-0 ">
                {deleteLoading ? (
                    <div className=" small-loader mt-2 mr-10"></div>
                ) : (
                    <div
                        className=" cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg font-semibold"
                        onClick={() => {
                            handle_Delete_Faq();
                        }}
                    >
                        Delete
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
