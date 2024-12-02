import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // React Icons for edit and delete

const Contact_informations = () => {
    const [editMode, setEditMode] = useState(false);
    const [editContact, setEditContact] = useState({
        id: "",
        link: "",
        type: "",
    });
    const [newLink, setNewLink] = useState("");
    const [newType, setNewType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [Contact_informations, setContact_informations] = useState([]);

    useEffect(() => {
        setLoading(true);
        const FetchContact_informations = async ({
            setContact_informations,
            setLoading,
            setError,
        }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Contact_informations`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const Contact_informations =
                        response.data.contact_informations;
                    setContact_informations(Contact_informations);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you have to re-Login again", "error");
                    Navigate("/Login");
                    setError(response.data);
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        FetchContact_informations({
            setContact_informations,
            setLoading,
            setError,
        });
    }, []);
    // Handle edit form change
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (name === "link") setNewLink(value);
        if (name === "type") setNewType(value);
    };

    // Handle save edited contact information
    const handleSaveEdit = (id) => {
        axios
            .put(`/api/contact/${id}`, { link: newLink, type: newType })
            .then((response) => {
                setContacts(
                    Contact_informations.map((contact) =>
                        contact.id === id ? response.data : contact
                    )
                );
                setEditMode(false);
                setNewLink("");
                setNewType("");
                setError("");
            })
            .catch((error) => {
                setError(
                    "Error updating contact information. Please try again."
                );
                console.error("Error updating contact", error);
            });
    };

    // Handle delete contact
    const handleDelete = (id) => {
        axios
            .delete(`/api/contact/${id}`)
            .then(() => {
                setContacts(
                    Contact_informations.filter((contact) => contact.id !== id)
                );
                setError(""); // Clear error message if deletion was successful
            })
            .catch((error) => {
                setError(
                    "Error deleting contact information. Please try again."
                );
                console.error("Error deleting contact", error);
            });
    };
    if (loading) {
        return (
            <div className=" w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }
    if (error)
        return (
            <div className=" w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.contact_info}
                </div>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Contact Information
            </h2>

            <div className="space-y-4">
                {Contact_informations.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No contact information available
                    </div>
                ) : (
                    Contact_informations.map((contact) => (
                        <div
                            key={contact.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="font-medium text-gray-700">
                                    {contact.type
                                        ? contact.type
                                        : "Not Available"}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {contact.link
                                        ? contact.link
                                        : "Not Available"}
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                {/* Edit Button */}
                                <button
                                    onClick={() => {
                                        setEditMode(true);
                                        setEditContact(contact);
                                        setNewLink(contact.link);
                                        setNewType(contact.type);
                                    }}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaEdit />
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(contact.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {editMode && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Edit Contact
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Link</label>
                            <input
                                type="text"
                                name="link"
                                value={newLink}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Type</label>
                            <input
                                type="text"
                                name="type"
                                value={newType}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={() => handleSaveEdit(editContact.id)}
                                className="bg-blue-500 text-white p-2 rounded-md"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="bg-gray-500 text-white p-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact_informations;
