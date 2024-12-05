import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // React Icons for edit and delete
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
const Edit_Contact_informations = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contactInformations, setContactInformations] = useState({});
    const [editLoading, setEditLoading] = useState(false);

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
                    setContactInformations(
                        response.data.contact_informations[0]
                    );
                } else if (response.status === 401) {
                    Swal.fire("Error", "Unauthorized access", "error");
                    Navigate("/login");
                } else {
                    Swal.fire(
                        "Error",
                        "Failed to fetch contact information",
                        "error"
                    );
                }
            } catch (err) {
                setError(true);
                Swal.fire("Error", "Network error, please try again", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchContactInformations();
    }, [Navigate]);

    const handleEditSubmit = async (values) => {
        setEditLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:3000/Admin/Contact_informations`,
                values,
                { withCredentials: true }
            );
            console.log("response", response);

            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Contact information updated successfully",
                    "success"
                );
                setContactInformations(values);
            } else {
                Swal.fire(
                    "Error",
                    "Failed to update contact information",
                    "error"
                );
            }
        } catch (err) {
            console.log("Error updating contact information", err);
            
            Swal.fire("Error", "Network error, please try again", "error");
        } finally {
            setEditLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading contact information</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">
                Edit Contact Information
            </h2>
            <Formik
                initialValues={{
                    phone: contactInformations?.phone || "",
                    email: contactInformations?.email || "",
                    instagram: contactInformations?.instagram || "",
                    facebook: contactInformations?.facebook || "",
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.phone) {
                        errors.phone = "Phone or email is required";
                    }
                    if (!values.email) {
                        errors.email = "Phone or email is required";
                    }
                    return errors;
                }}
                onSubmit={handleEditSubmit}
            >
                {({ values }) => (
                    <Form>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-gray-700 font-medium"
                                >
                                    Phone
                                </label>
                                <Field
                                    id="phone"
                                    name="phone"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="text"
                                    placeholder="Enter phone number"
                                />
                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current phone number: " +
                                        contactInformations?.phone}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium"
                                >
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="email"
                                    placeholder="Enter email address"
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current email: " +
                                        contactInformations?.email}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="instagram"
                                    className="block text-gray-700 font-medium"
                                >
                                    Instagram
                                </label>
                                <Field
                                    id="instagram"
                                    name="instagram"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="text"
                                    placeholder="Enter Instagram handle"
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current Instagram: " +
                                        contactInformations?.instagram}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="facebook"
                                    className="block text-gray-700 font-medium"
                                >
                                    Facebook
                                </label>
                                <Field
                                    id="facebook"
                                    name="facebook"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="text"
                                    placeholder="Enter Facebook handle"
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current Facebook: " +
                                        contactInformations?.facebook}
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                                >
                                    {editLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Edit_Contact_informations;
