import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Footer from "../Footer";
import NavBar from "../NavBar/NavBar";

// Schema for validation
const DemandSchema = Yup.object().shape({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    telephone: Yup.string().required("Le téléphone est requis"),
    description: Yup.string()
        .required("La description est requise")
        .min(10, "La description doit contenir au moins 10 caractères"),
    type: Yup.string().required("Le type de demande est requis"),
});

const Demands_Page = () => {
    const [contactInformations, setContactInformations] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showCustomTypeInput, setShowCustomTypeInput] = useState(false);
    const [typeOptions, setTypeOptions] = useState([]); // State for dynamic type options
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the type from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const demandType = queryParams.get("type") || "";

    // Fetch types from the server
    useEffect(() => {
        const fetchTypes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://api.vide-maisonbelgique.org/Demands/types",
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (
                    response.status === 200 &&
                    response.data?.types?.length > 0
                ) {
                    const types = response.data.types.map((type) => ({
                        value: type.type,
                        label: type.type,
                    }));
                    setTypeOptions([
                        ...types,
                        { value: "Others", label: "Autres" },
                    ]); // Add "Others" option
                } else {
                    setTypeOptions([]); // If no types, set to empty array
                }
            } catch (err) {
                setTypeOptions([]); // On error, set to empty array
            } finally {
                setLoading(false);
            }
        };

        const fetchContactInformations = async () => {
            try {
                const response = await axios.get(
                    "https://api.vide-maisonbelgique.org/Contact_informations",
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
                    navigate("/Login");
                } else {
                    setError("Échec de la récupération des informations.");
                }
            } catch (err) {
                setError(
                    "Une erreur s'est produite lors de la récupération des données."
                );
            }
        };

        fetchContactInformations();
        fetchTypes();
    }, [navigate]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // If "Others" is selected, use the custom input value
            if (values.type === "Others" && values.customType) {
                values.type = values.customType;
            }

            const response = await axios.post(
                "https://api.vide-maisonbelgique.org/Demands",
                values,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                resetForm();
                setIsMessageSent(true);
            } else if (response.status === 401) {
                Swal.fire("Erreur", "Veuillez vous reconnecter", "error");
                navigate("/Login");
            } else {
                Swal.fire(
                    "Erreur",
                    "Une erreur s'est produite. Veuillez réessayer.",
                    "error"
                );
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

    return (
        <div>
            <div className="min-h-screen relative bg-gray-50">
                <NavBar />
                <div className="flex items-center justify-center py-24 px-4">
                    <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Envoyez une demande
                        </h3>
                        {isMessageSent ? (
                            <div className="text-center py-12">
                                <FaPaperPlane className="text-5xl text-green-500 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">
                                    Demande envoyée !
                                </h4>
                                <p className="text-gray-600">
                                    Nous vous contacterons bientôt.
                                </p>
                                <button
                                    onClick={() => setIsMessageSent(false)}
                                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Envoyer une autre demande
                                </button>
                            </div>
                        ) : (
                            <Formik
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    telephone: "",
                                    description: "",
                                    type: demandType,
                                    customType: "",
                                }}
                                validationSchema={DemandSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, values, setFieldValue }) => (
                                    <Form className="space-y-4">
                                        <Field
                                            name="firstName"
                                            type="text"
                                            placeholder="Prénom"
                                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                                        />
                                        <ErrorMessage
                                            name="firstName"
                                            component="div"
                                            className="text-red-600 text-sm"
                                        />
                                        <Field
                                            name="lastName"
                                            type="text"
                                            placeholder="Nom"
                                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                                        />
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            className="text-red-600 text-sm"
                                        />
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-600 text-sm"
                                        />
                                        <Field
                                            name="telephone"
                                            type="text"
                                            placeholder="Téléphone"
                                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                                        />
                                        <ErrorMessage
                                            name="telephone"
                                            component="div"
                                            className="text-red-600 text-sm"
                                        />
                                        <Field
                                            name="description"
                                            as="textarea"
                                            rows="4"
                                            placeholder="Description"
                                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                                        />
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="text-red-600 text-sm"
                                        />
                                        {typeOptions.length > 0 ? (
                                            <>
                                                <Field
                                                    name="type"
                                                    as="select"
                                                    className="w-full px-4 py-2 rounded-lg border bg-white focus:ring focus:ring-blue-300"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "type",
                                                            e.target.value
                                                        );
                                                        setShowCustomTypeInput(
                                                            e.target.value ===
                                                                "Others"
                                                        );
                                                    }}
                                                >
                                                    <option value="" disabled>
                                                        Sélectionnez un type
                                                    </option>
                                                    {typeOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        )
                                                    )}
                                                </Field>
                                                {showCustomTypeInput && (
                                                    <Field
                                                        name="customType"
                                                        type="text"
                                                        placeholder="Veuillez spécifier le type"
                                                        className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <Field
                                                name="type"
                                                type="text"
                                                placeholder="Type de demande"
                                                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                                            />
                                        )}
                                        <ErrorMessage
                                            name="type"
                                            component="div"
                                            className="text-red-600 text-sm"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            {isSubmitting
                                                ? "Envoi en cours..."
                                                : "Envoyer la demande"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>
            </div>
            <Footer data={contactInformations} />
        </div>
    );
};

export default Demands_Page;
