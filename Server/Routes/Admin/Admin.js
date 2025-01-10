const express = require("express");
const router = express.Router();
const { Admins } = require("../../Models/Admin");
const delete_service = require("./Controllers/service_delete");
const add_service = require("./Controllers/service_add");
const Main_Edit = require("./Controllers/Main_Edit");
const About_Edit = require("./Controllers/About_Edit");
const Description_Edit = require("./Controllers/Description_Edit");
const { Main_page } = require("../../Models/Content/Main_page");
const { About_page } = require("../../Models/Content/About_page");
const { Description_page } = require("../../Models/Content/Description");
const { Phrase_Call } = require("../../Models/Content/Phrase_Call");
const { Phrase_Contact } = require("../../Models/Content/Phrase_Contact");
// const Phrases = require("./Phrases");
// router.use(Phrases);
router.get("/Admins", async (req, res) => {
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
router.get("/About_Page", async (req, res) => {
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
router.get("/Description_Page", async (req, res) => {
    try {
        const description_page = await Description_page.findOne({
            where: {},
        });
        res.status(200).json({ description_page });
    } catch (err) {
        console.error("Error fetching Main_page:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ________________________________________
// Phrases
router.get("/Phrase_Call", async (req, res) => {
    try {
        const phrase_page = await Phrase_Call.findOne({
            where: {},
        });
        res.status(200).json({ phrase_page });
    } catch (err) {
        console.error("Error fetching Main_page:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Phrase_Contact", async (req, res) => {
    try {
        const phrase_page = await Phrase_Contact.findOne({
            where: {},
        });
        res.status(200).json({ phrase_page });
    } catch (err) {
        console.error("Error fetching Main_page:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/Phrase_Contact", async (req, res) => {
    const { Text, button } = req.body;

    try {
        const phrase_in_db = await Phrase_Contact.findOne({});

        let phrase;
        if (!phrase_in_db) {
            phrase = await Phrase_Contact.create({
                Text,
                button,
            });
        } else {
            phrase_in_db.Text = Text ? Text : phrase_in_db.Text;
            phrase_in_db.button = button ? button : phrase_in_db.button;
            await phrase_in_db.save();
        }

        res.status(200).json({
            message: "phrase created successfully",
            phrase,
        });
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ phrase: "Internal Server Error" });
    }
});
router.put("/Phrase_Call", async (req, res) => {
    const { Text, button } = req.body;

    try {
        const phrase_in_db = await Phrase_Call.findOne({});

        let phrase;
        if (!phrase_in_db) {
            phrase = await Phrase_Call.create({
                Text,
                button,
            });
            res.status(200).json({
                message: "phrase created successfully",
                phrase,
            });
        } else {
            phrase_in_db.Text = Text ? Text : phrase_in_db.Text;
            phrase_in_db.button = button ? button : phrase_in_db.button;
            await phrase_in_db.save();
            res.status(200).json({
                message: "phrase updated successfully",
                phrase: phrase_in_db,
            });
        }
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ phrase: "Internal Server Error" });
    }
});
// ________________________________________

router.delete("/Phrase_Contact/:id", async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ phrase: "invalide id" });
    }
    const phraseId = req.params.id;
    if (!phraseId)
        return res.status(409).json({ phrase: "phrase id is required" });
    try {
        const phrase = await Phrase_Contact.findOne({
            where: { id: phraseId },
        });
        if (!phrase)
            return res
                .status(404)
                .json({ phrase: "phrase not found in database " });
        await Phrase_Contact.destroy({ where: { id: phraseId } });
        res.status(200).json({ phrase: "phrase deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting phrases:", err);
        res.status(500).json({ phrase: "Internal Server Error" });
    }
});
router.delete("/Phrase_Call/:id", async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ phrase: "invalide id" });
    }
    const phraseId = req.params.id;
    if (!phraseId)
        return res.status(409).json({ phrase: "phrase id is required" });
    try {
        const phrase = await Phrase_Call.findOne({
            where: { id: phraseId },
        });
        if (!phrase)
            return res
                .status(404)
                .json({ phrase: "phrase not found in database " });
        await Phrase_Call.destroy({ where: { id: phraseId } });
        res.status(200).json({ phrase: "phrase deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting phrases:", err);
        res.status(500).json({ phrase: "Internal Server Error" });
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
    "/About_Page",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    About_Edit
);
router.put(
    "/Description_Page",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Description_Edit
);

module.exports = router;
