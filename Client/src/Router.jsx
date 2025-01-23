import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home.jsx";
import App from "./App";
import Default from "./Default";
import Home_Demands from "./Components/Demands/Demands.jsx";
import Home_Contact from "./Components/Contact/Contact.jsx";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
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
                path: "/Demand",
                element: <Home_Demands />,
            },
            {
                path: "/Contact",
                element: <Home_Contact />,
            },
            {
                path: "*",
                element: <Not_Found />,
            },
        ],
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
