import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // React Icons for edit and delete

const Contact_informations = () => {
    const [contacts, setContacts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editContact, setEditContact] = useState({
        id: "",
        link: "",
        type: "",
    });
    const [newLink, setNewLink] = useState("");
    const [newType, setNewType] = useState("");

    // Fetch contact information on load
    useEffect(() => {
        axios
            .get("/api/contact")
            .then((response) => {
                setContacts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching contact data", error);
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
                    contacts.map((contact) =>
                        contact.id === id ? response.data : contact
                    )
                );
                setEditMode(false);
                setNewLink("");
                setNewType("");
            })
            .catch((error) => {
                console.error("Error updating contact", error);
            });
    };

    // Handle delete contact
    const handleDelete = (id) => {
        axios
            .delete(`/api/contact/${id}`)
            .then(() => {
                setContacts(contacts.filter((contact) => contact.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting contact", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Contact Information
            </h2>

            <div className="space-y-4">
                {contacts.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No contact information available
                    </div>
                ) : (
                    contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="font-medium text-gray-700">
                                    {contact.type}
                                </span>
                                <span className="text-gray-500">
                                    {contact.link || "Not available"}
                                </span>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setEditMode(true);
                                        setEditContact(contact);
                                        setNewLink(contact.link);
                                        setNewType(contact.type);
                                    }}
                                    className="text-blue-500 hover:text-blue-700 p-2"
                                >
                                    <FaEdit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(contact.id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <FaTrashAlt size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {editMode && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Edit Contact Information
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-gray-600"
                            >
                                Type
                            </label>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={newType}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="link"
                                className="block text-gray-600"
                            >
                                Link
                            </label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={newLink}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setEditMode(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSaveEdit(editContact.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact_informations;
