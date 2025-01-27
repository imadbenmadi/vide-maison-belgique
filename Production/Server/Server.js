const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Contact_informations } = require("./Models/Contact_informations");
const { Demands_types } = require("./Models/Demands_types");
const { About_page } = require("./Models/Content/About_page");
const { Main_page } = require("./Models/Content/Main_page");
const { Faq } = require("./Models/Content/Faq");
const { Services } = require("./Models/Content/Services");
const { Description_page } = require("./Models/Content/Description");
const { Phrase_Call } = require("./Models/Content/Phrase_Call");
const { Phrase_Contact } = require("./Models/Content/Phrase_Contact");

const path = require("path");
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    // "https://scs-tawassolsihi.com/",
    // "https://scs-tawassolsihi.com",
    // "https://www.scs-tawassolsihi.com/",
    // "https://dashboard.scs-tawassolsihi.com",
    // "https://dashboard.scs-tawassolsihi.com/",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS , origin : ${origin}`));
        }
    },
    optionsSuccessStatus: 200,
};
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};
require("dotenv").config();

app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { initializeDirectories } = require("./Helpers/Directory.helper");
initializeDirectories();
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hello from vide-maison-belgique");
});
app.get("/Home", require("./Routes/Home"));
app.use("/Demands", require("./Routes/Demand"));
app.use("/Contact", require("./Routes/Contact"));
const adminMiddleware = require("./Middlewares/Admin_middleware_New");
app.use("/Admin", adminMiddleware, require("./Routes/Admin/Admin"));
app.use("/Admin_Login", require("./Routes/Auth/Admin/Admin_Login"));
app.use("/Add_Admin", require("./Routes/Auth/Admin/Admin_Add"));
// app.use("/Admin_Logout", require("./Routes/Auth/Admin/Admin_Logout"));
app.use("/Logout", require("./Routes/Auth/Logout"));
app.use("/Admin_CheckAuth", require("./Routes/Auth/Admin/Admin_CheckAuth"));
app.get("/Contact_informations", async (req, res) => {
    try {
        const contact_informations = await Contact_informations.findAll({
            where: {},
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ contact_informations });
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get("/Home", async (req, res) => {
    try {
        const contact_informations = await Contact_informations.findOne();
        const about_page = await About_page.findOne();
        const main_page = await Main_page.findOne();
        const faq = await Faq.findAll();
        const services = await Services.findAll();
        const description = await Description_page.findOne();
        const phrase_call = await Phrase_Call.findOne();
        const phrase_contact = await Phrase_Contact.findOne();
        return res.status(200).json({
            contact_informations: contact_informations,
            About_page: about_page,
            Main_page: main_page,
            Faq: faq,
            Services: services,
            Description: description,
            Phrase_Call: phrase_call,
            Phrase_Contact: phrase_contact,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
});
app.listen(3000);

module.exports = app;
