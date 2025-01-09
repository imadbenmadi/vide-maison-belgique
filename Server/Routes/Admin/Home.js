const express = require("express");
const router = express.Router();
const { Contact_informations } = require("../../Models/Contact_informations");
const { About_page } = require("../../Models/Content/About_page");
const { Main_page } = require("../../Models/Content/Main_page");
const { Faq } = require("../../Models/Content/Faq");
const { Services } = require("../../Models/Content/Services");
const { Description_page } = require("../../Models/Content/Description");
const { Phrase_Call } = require("../../Models/Content/Phrase_Call");
const { Phrase_Contact } = require("../../Models/Content/Phrase_Contact");

const handle_get_home_data = async (req, res) => {
    try {
        const contact_informations = await Contact_informations.findOne();
        const about_page = await About_page.findOne();
        const main_page = await Main_page.findOne();
        const faq = await Faq.findAll();
        const services = await Services.findAll();
        // const description = await Description_page.findOne();
        const phrase_call = await Phrase_Call.findOne();
        const phrase_contact = await Phrase_Contact.findOne();
        return res.status(200).json({
            contact_informations: contact_informations,
            About_page: about_page,
            Main_page: main_page,
            Faq: faq,
            Services: services,
            // Description: description,
            Phrase_Call: phrase_call,
            Phrase_Contact: phrase_contact,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

router.get("/", handle_get_home_data);

module.exports = router;
