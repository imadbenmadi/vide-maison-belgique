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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Edit Contact Information
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <Field
                                type="text"
                                name="phone"
                                id="phone"
                                className={`mt-1 p-2 w-full border border-gray-300 rounded-md ${
                                    errors.phone && touched.phone
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            {errors.phone && touched.phone && (
                                <div className="text-red-500 text-sm">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className={`mt-1 p-2 w-full border border-gray-300 rounded-md ${
                                    errors.email && touched.email
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            {errors.email && touched.email && (
                                <div className="text-red-500 text-sm">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="instagram"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Instagram
                            </label>
                            <Field
                                type="text"
                                name="instagram"
                                id="instagram"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="facebook"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Facebook
                            </label>
                            <Field
                                type="text"
                                name="facebook"
                                id="facebook"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Contact_informations;
