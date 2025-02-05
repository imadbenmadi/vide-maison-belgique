import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
import Default from "./Default";
import Login from "./Components/Auth/Login/Login";

import Contact from "./Components/Contact/Contact.jsx";
import Contact_informations from "./Components/Contact_informations/Contact_informations.jsx";
import Edit_Contact_informations from "./Components/Contact_informations/Edit_Contact_informations.jsx";
import Demands from "./Components/Demands/Demands.jsx";

import Faq from "./Components/Faq/Faq.jsx";
import Add_Faq from "./Components/Faq/add_Faq.jsx";
import Services from "./Components/Services/Services.jsx";
import Add_Services from "./Components/Services/Add_Service.jsx";

import EditMainPage from "./Components/Main/Edit_Main.jsx";
import Edit_About from "./Components/About/Edit_About.jsx";

import Home_Demands from "./Components/Home/Demands/Demands.jsx";
import Home_Contact from "./Components/Home/Contact/Contact.jsx";

import Call_Phrase from "./Components/Phrases/Call_Phrase.jsx";
import Description from "./Components/Description/Description.jsx";
import Contact_Phrase from "./Components/Phrases/Contact_Phrase.jsx";

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
            {
                path: "/Home/Demand",
                element: <Home_Demands />,
            },
            {
                path: "/Home/Contact",
                element: <Home_Contact />,
            },
            {
                path: "/Call_Phrase",
                element: <Call_Phrase />,
            },
            {
                path: "/Description",
                element: <Description />,
            },
            {
                path: "/Contact_Phrase",
                element: <Contact_Phrase />,
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
                path: "/Faq",
                element: <Faq />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Faq/add",
                element: <Add_Faq />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Services",
                element: <Services />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Services/add",
                element: <Add_Services />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Edit_main",
                element: <EditMainPage />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Edit_about",
                element: <Edit_About />,
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
