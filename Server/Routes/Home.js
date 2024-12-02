const express = require("express");
const router = express.Router();
const { Contact_Messages } = require("../Models/Contact_Messages");

const handle_get_home_data = async (req, res) => {
    try {
        const contact_messages = await Contact_Messages.findAll({
            order: [["createdAt", "DESC"]],
        });
        return res.status(200).json(contact_messages);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

router.get("/", handle_get_home_data);

module.exports = router;
