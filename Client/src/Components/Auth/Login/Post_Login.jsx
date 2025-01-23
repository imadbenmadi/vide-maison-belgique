import Swal from "sweetalert2";
import Axios from "axios";

async function handleLogin(values, { setSubmitting }) {
    try {
        let response = await Axios.post(
            "http://localhost:3000/Admin_Login",
            values,
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );

        if (response.status == 200) {
            window.location.href = `/`;
        } else if (response.status == 401) {
            setSubmitting(false);
            Swal.fire("Erreur", "Email ou mot de passe incorrect", "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("Erreur", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("Erreur", "Erreur interne du serveur", "error");
        } else if (response.status == 429) {
            setSubmitting(false);
            Swal.fire(
                "Erreur",
                `Trop de requêtes, veuillez réessayer plus tard`,
                "error"
            );
        } else {
            setSubmitting(false);
            Swal.fire(
                "Erreur",
                "Une erreur s'est produite, veuillez réessayer",
                "error"
            );
        }
    } catch (error) {
        setSubmitting(false);
        Swal.fire(
            "Erreur",
            "Une erreur s'est produite, veuillez réessayer",
            "error"
        );
    }

    // setSubmitting(false);
}

export default handleLogin;
