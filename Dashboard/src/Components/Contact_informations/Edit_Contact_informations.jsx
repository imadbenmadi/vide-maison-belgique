import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // React Icons for edit and delete
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // For form validation

const Contact_informations = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contactInformations, setContactInformations] = useState({});

    // Fetch contact information on load
    useEffect(() => {
        setLoading(true);
        const fetchContactInformations = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Contact_informations`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setContactInformations(response.data.contact_informations);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You have to re-login", "error");
                    Navigate("/Login");
                    setError("Unauthorized");
                } else {
                    setError("Error fetching contact information");
                }
            } catch (error) {
                setError("Error fetching data");
                console.error("Error fetching contact data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContactInformations();
    }, [Navigate]);

    // Formik initial values and validation schema
    const initialValues = contactInformations
        ? {
              phone: contactInformations.phone || "",
              email: contactInformations.email || "",
              instagram: contactInformations.instagram || "",
              facebook: contactInformations.facebook || "",
          }
        : {
              phone: "",
              email: "",
              instagram: "",
              facebook: "",
          };

    const validationSchema = Yup.object({
        phone: Yup.string().required("Phone number is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        instagram: Yup.string(),
        facebook: Yup.string(),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.put(
                "http://localhost:3000/Admin/Contact_informations",
                values,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.status === 200) {
                Swal.fire("Success", "Contact information updated", "success");
                setContactInformations(values); // Update the state with new values
            } else {
                Swal.fire(
                    "Error",
                    "Failed to update contact information",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error", "There was a problem with the server", "error");
            console.error("Error during form submission:", error);
        }
    };

    if (loading)
        return (
            <div className=" w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    if (error)
        return (
            <div className=" w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Contact Information
            </h2>
            <div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-blue-800">
                        تفاصيل المؤسسة
                    </h2>

                    {/* Basic Info */}
                    <div className="mb-6">
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">الاسم:</span>{" "}
                            {company?.Name}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">الموقع:</span>{" "}
                            {company?.Location}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">الولاية:</span>{" "}
                            {company?.Wilaya}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">النوع:</span>{" "}
                            {company?.Type}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">
                                تاريخ الإنشاء:
                            </span>{" "}
                            {dayjs(company?.createdAt).format("DD-MMM-YYYY")}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">آخر تحديث:</span>{" "}
                            {dayjs(company?.updatedAt).format("DD-MMM-YYYY")}
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-semibold text-blue-700">
                                عدد المدونات
                            </p>
                            <p className="text-2xl font-bold text-blue-800">
                                {company?.Blogs?.length || 0}
                            </p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-semibold text-green-700">
                                عدد الأحداث
                            </p>
                            <p className="text-2xl font-bold text-green-800">
                                {company?.Events?.length || 0}
                            </p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-semibold text-yellow-700">
                                عدد الأطباء
                            </p>
                            <p className="text-2xl font-bold text-yellow-800">
                                {company?.Doctors?.length || 0}
                            </p>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-lg text-center">
                            <p className="text-lg font-semibold text-purple-700">
                                عدد الخدمات
                            </p>
                            <p className="text-2xl font-bold text-purple-800">
                                {company?.Services?.length || 0}
                            </p>
                        </div>
                    </div>

                    {/* Follow/Unfollow Button */}
                    <div className="flex space-x-4">
                        {isFollowing ? (
                            <button
                                onClick={handleUnfollow}
                                disabled={followLoading}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                            >
                                {followLoading
                                    ? "إلغاء المتابعة..."
                                    : "إلغاء المتابعة"}
                            </button>
                        ) : (
                            <button
                                onClick={handleFollow}
                                disabled={followLoading}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                {followLoading ? "متابعة..." : "متابعة"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact_informations;
