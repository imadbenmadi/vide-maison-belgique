import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
// import Login from "./Components/Auth/Login/Login";
// import Register from "./Components/Auth/Register/Register";
import Default from "./Default";

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
                path: "/",
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
