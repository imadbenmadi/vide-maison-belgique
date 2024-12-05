const express = require("express");
const router = express.Router();
const { Admins } = require("../../Models/Admin");
const delete_service = require("./Controllers/service_delete");
const add_service = require("./Controllers/service_add");
const Main_Edit = require("./Controllers/Main_Edit");
const About_Edit = require("./Controllers/About_Edit");
const { Main_page } = require("../../Models/Content/Main_page");
const { About_page } = require("../../Models/Content/About_page");
const Admin_midllware = require("../../Middlewares/Admin_middleware");
router.get("/Admins", Admin_midllware, async (req, res) => {
    try {
        const admins = await Admins.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(admins);
    } catch (err) {
        console.error("Error fetching Admins:", err);
        res.status(500).json({ message: err });
    }
});
router.use("/Home", require("./Home"));
router.get("/home", (req, res) => {
    res.send("Hello from vide-maison-belgique");
});
// router.use("/Companies", require("./Companies"));

router.use("/Contact", require("./Contact"));
router.use("/Contact_informations", require("./Contact_informations"));
router.use("/Demands", require("./Demands"));
router.use("/Faqs", require("./Faq"));
router.use("/Services", require("./Services"));

router.get("/Main_page", async (req, res) => {
    try {
        const main_page = await Main_page.findOne({
            where: {},
        });
        res.status(200).json({ main_page });
    } catch (err) {
        console.error("Error fetching Main_page:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/About_page", async (req, res) => {
    try {
        const about_page = await About_page.findOne({
            where: {},
        });
        res.status(200).json({ about_page });
    } catch (err) {
        console.error("Error fetching Main_page:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Formidable images
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());

router.delete(
    "/Services/:eventId",
    (req, res, next) => {
        req.body = req.fields;
        req.params = { serviceId: req.params.eventId };
        next();
    },
    delete_service
);

router.post(
    "/Services",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    add_service
);

router.put(
    "/Main_page",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Main_Edit
);
router.put(
    "/About_page",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    About_Edit
);

module.exports = router;
