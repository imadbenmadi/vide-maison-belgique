import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
import Default from "./Default";
import Login from "./Components/Auth/Login/Login";

import Contact from "./Components/Contact/Contact.jsx";
import Contact_informations from "./Components/Contact_informations/Contact_informations.jsx";
import Edit_Contact_informations from "./Components/Contact_informations/Edit_Contact_informations.jsx";
import Demands from "./Components/Demands/Demands.jsx";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Default />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Home",
                element: <Home />,
                errorElement: <ErrorElement />,
            },

            // {
            //     path: "/Terms",
            //     element: <Terms />,
            //     errorElement: <ErrorElement />,
            // },
            {
                path: "/Contact",
                element: <Contact />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Contact_informations",
                element: <Contact_informations />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Contact_informations/Edit",
                element: <Edit_Contact_informations />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Demands",
                element: <Demands />,
                errorElement: <ErrorElement />,
            },
            {
                path: "*",
                element: <Not_Finished />,
            },
        ],
    },
    {
        path: "/Login",
        element: <Login />,
        errorElement: <ErrorElement />,
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
