import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Call_Phrase() {
    const [formData, setFormData] = useState({
        Title: "",
        button: "",
    });

    useEffect(() => {
        // Fetch the existing Phrase_Page page data
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/Admin/Phrase_Page",
                    {
                        withCredentials: true,
                    }
                );
                console.log(response.data);

                const { Title, button } = response.data.phrase_page; // Access Phrase_page object correctly

                setFormData({
                    Title: Title || "", // Ensure default empty string
                    button: button || "",
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Phrase page data.",
                });
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("Title", formData.Title);
        data.append("button", formData.button);

        try {
            const response = await axios.put(
                "http://localhost:3000/Admin/Phrase_Page",
                data,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Call Phrase page updated successfully!",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update Phrase page.",
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-yallow_v mb-6">
                Edit Call Phrase Page
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        button
                    </label>
                    <textarea
                        name="button"
                        value={formData.button}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default Call_Phrase;
