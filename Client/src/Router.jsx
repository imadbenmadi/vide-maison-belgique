import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
// import Login from "./Components/Auth/Login/Login";
// import Register from "./Components/Auth/Register/Register";
import Default from "./Default";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";

// import Malad from "./Components/Profiles/Malad/Malad.jsx";
// import Doctor from "./Components/Profiles/Doctor/Doctor.jsx";
// import Director from "./Components/Profiles/Director/Director.jsx";
// import Worker from "./Components/Profiles/Worker/Worker.jsx";

// import Worker_Profile from "./Components/Profiles/Worker/Profile/Profile.jsx";
// import Malad_Profile from "./Components/Profiles/Malad/Profile/Profile.jsx";

// // import Malad from "./Components/Profiles/Director/Director.jsx";
// import Director_default from "./Components/Profiles/Director/Director_Default.jsx";
// import Malad_default from "./Components/Profiles/Malad/Malad_Default.jsx";
// import Doctor_default from "./Components/Profiles/Doctor/Doctor_Default.jsx";
// import Worker_default from "./Components/Profiles/Worker/Worker_Default.jsx";

// import Director_workers from "./Components/Profiles/Director/Workers/Director_workers.jsx";
// import Director_worker from "./Components/Profiles/Director/Workers/Wroker.jsx";
// import Director_Add_Worker from "./Components/Profiles/Director/Workers/Director_Add_workers.jsx";
// import Director_Edit_Worker from "./Components/Profiles/Director/Workers/Director_Edit_workers.jsx";

// import Director_Services from "./Components/Profiles/Director/Services/Director_Services.jsx";
// import Director_Services_add from "./Components/Profiles/Director/Services/Director_Add_service.jsx";
// import Director_Services_edit from "./Components/Profiles/Director/Services/Edit_Service.jsx";

// import Director_Doctors from "./Components/Profiles/Director/Doctors/Director_Doctors.jsx";
// import Director_Doctors_add from "./Components/Profiles/Director/Doctors/Add_doctor.jsx";
// import Director_doctor from "./Components/Profiles/Director/Doctors/Doctor.jsx";
// import Director_Edit_doctor from "./Components/Profiles/Director/Doctors/Edit_doctor.jsx";

// import Director_Blogs from "./Components/Profiles/Director/Blogs/Director_Blogs.jsx";
// import Director_Blog from "./Components/Profiles/Director/Blogs/Blog.jsx";
// import Director_Add_Blogs from "./Components/Profiles/Director/Blogs/Director_Add_Blogs.jsx";
// import Director_Edit_Blogs from "./Components/Profiles/Director/Blogs/Director_Edit_Blogs.jsx";

// import Director_Events from "./Components/Profiles/Director/Events/Director_Events.jsx";
// import Director_Event from "./Components/Profiles/Director/Events/Event.jsx";
// import Director_Add_Events from "./Components/Profiles/Director/Events/Director_Add_Event.jsx";
// import Director_Edit_Events from "./Components/Profiles/Director/Events/Director_Edit_Events.jsx";
// // ______________________________________________________

// import Worker_blog from "./Components/Profiles/Worker/Blogs/Blog.jsx";
// import Worker_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Blogs.jsx";
// import Worker_Add_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Add_Blogs.jsx";
// import Worker_Edit_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Edit_Blogs.jsx";

// import Worker_event from "./Components/Profiles/Worker/Events/Event.jsx";
// import Worker_Events from "./Components/Profiles/Worker/Events/Worker_Events.jsx";
// import Worker_Add_Events from "./Components/Profiles/Worker/Events/Worker_Add_Event.jsx";
// import Worker_Edit_Events from "./Components/Profiles/Worker/Events/Worker_Edit_Events.jsx";
// // ______________________________________________________
// import Malad_Edit_Profile from "./Components/Profiles/Malad/Profile/Edit_Profile.jsx";
// import Malad_Companies from "./Components/Profiles/Malad/Companies/Companies.jsx";
// import Malad_Companiy from "./Components/Profiles/Malad/Companies/Company.jsx";
// import Malad_Companiy_doctors from "./Components/Profiles/Malad/Companies/Company_Components/DoctorsSection.jsx";
// import Malad_Companiy_blogs from "./Components/Profiles/Malad/Companies/Company_Components/Blogs/BlogsSection.jsx";
// import Malad_Companiy_blog from "./Components/Profiles/Malad/Companies/Company_Components/Blogs/Blog.jsx";
// import Malad_Companiy_events from "./Components/Profiles/Malad/Companies/Company_Components/Events/EventsSection.jsx";
// import Malad_Companiy_event from "./Components/Profiles/Malad/Companies/Company_Components/Events/Event.jsx";
// import Malad_Companiy_informations from "./Components/Profiles/Malad/Companies/Company_Components/info.jsx";
// import Default_Malad_company from "./Components/Profiles/Malad/Companies/Company_Components/Default.jsx";

// import Malad_Events from "./Components/Profiles/Malad/Events/Events.jsx";
// import Malad_Event from "./Components/Profiles/Malad/Events/Event.jsx";
// import Malad_Blogs from "./Components/Profiles/Malad/Blogs/Blogs.jsx";
// import Malad_Blog from "./Components/Profiles/Malad/Blogs/Blog.jsx";

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
