import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar/NavBar";
const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    message: Yup.string()
        .required("Le message est requis")
        .min(10, "Le message doit contenir au moins 10 caractères"),
});

const ContactPage = () => {
    const [contactInformations, setContactInformations] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchContactInformations = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/Admin/Contact_informations",
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setContactInformations(
                        response.data.contact_informations[0] || {}
                    );
                } else if (response.status === 401) {
                    Swal.fire("Erreur", "Veuillez vous reconnecter", "error");
                    Navigate("/Login");
                } else {
                    setError("Échec de la récupération des informations.");
                }
            } catch (err) {
                setError(
                    "Une erreur s'est produite lors de la récupération des données."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchContactInformations();
    }, [Navigate]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch("http://localhost:3000/Contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                resetForm();
                setIsMessageSent(true);
            } else {
                throw new Error("Échec de l'envoi du message.");
            }
        } catch (err) {
            Swal.fire(
                "Erreur",
                "Une erreur s'est produite. Veuillez réessayer.",
                "error"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }

    const email = contactInformations?.email || "";
    const phone = contactInformations?.phone || "";

    return (
        <div>
            <div className="min-h-screen relative overflow-x-hidden border">
                <NavBar />
                <div className="  flex items-center justify-center pt-24">
                    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border">
                        <div className="md:flex">
                            <div className="md:w-1/2 bg-gray-900 text-white p-8 relative">
                                <h2 className="text-3xl font-bold mb-6">
                                    Contactez-nous
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <FaEnvelope className="text-blue-500" />
                                        <span>{email}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <FaPhone className="text-green-500" />
                                        <span>{phone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8">
                                <h3 className="text-2xl font-bold mb-6">
                                    Envoyez-nous un message
                                </h3>
                                {isMessageSent ? (
                                    <div className="text-center py-16">
                                        <FaPaperPlane className="text-6xl text-green-500 mx-auto mb-4" />
                                        <h4 className="text-2xl font-bold mb-2">
                                            Message envoyé !
                                        </h4>
                                        <p>Nous vous répondrons bientôt.</p>
                                        <button
                                            onClick={() =>
                                                setIsMessageSent(false)
                                            }
                                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                        >
                                            Envoyer un autre message
                                        </button>
                                    </div>
                                ) : (
                                    <Formik
                                        initialValues={{
                                            firstName: "",
                                            lastName: "",
                                            email: "",
                                            message: "",
                                        }}
                                        validationSchema={ContactSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form className="space-y-6">
                                                <Field
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="Votre prénom"
                                                    className="w-full px-4 py-2 rounded-full border"
                                                />
                                                <ErrorMessage
                                                    name="firstName"
                                                    component="div"
                                                    className="text-red-600 text-sm"
                                                />
                                                <Field
                                                    name="lastName"
                                                    type="text"
                                                    placeholder="Votre nom"
                                                    className="w-full px-4 py-2 rounded-full border"
                                                />
                                                <ErrorMessage
                                                    name="lastName"
                                                    component="div"
                                                    className="text-red-600 text-sm"
                                                />
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    placeholder="Votre email"
                                                    className="w-full px-4 py-2 rounded-full border"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-red-600 text-sm"
                                                />
                                                <Field
                                                    name="message"
                                                    as="textarea"
                                                    rows="4"
                                                    placeholder="Votre message"
                                                    className="w-full px-4 py-2 rounded-2xl border"
                                                />
                                                <ErrorMessage
                                                    name="message"
                                                    component="div"
                                                    className="text-red-600 text-sm"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                                                >
                                                    {isSubmitting
                                                        ? "Envoi en cours..."
                                                        : "Envoyer le message"}
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer data={contactInformations} />
        </div>
    );
};

export default ContactPage;
