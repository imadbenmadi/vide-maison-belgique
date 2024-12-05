const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware");
const { Contact_informations } = require("../../Models/Contact_informations");

router.get("/", adminMiddleware, async (req, res) => {
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

router.put("/", adminMiddleware, async (req, res) => {
    const { phone, email, instagram, facebook } = req.body;

    try {
        const contact_info = await Contact_informations.findOne({
            where: {}, // Be more specific here if you have unique constraints
        });

        if (!contact_info) {
            await Contact_informations.create({
                phone,
                email,
                instagram,
                facebook,
            });
        } else {
            // await Contact_informations.update(
            //     {
            //         phone: phone ? phone : contact_info.phone,
            //         email: email ? email : contact_info.email,
            //         instagram: instagram ? instagram : contact_info.instagram,
            //         facebook: facebook ? facebook : contact_info.facebook,
            //     },
            //     { where: {} } // Again, refine this to select a specific record
            // );
            contact_info.phone = phone ? phone : contact_info.phone;
            contact_info.email = email ? email : contact_info.email;
            contact_info.instagram = instagram ? instagram : contact_info.instagram;
            contact_info.facebook = facebook ? facebook : contact_info.facebook;
            await contact_info.save();
            
        }

        res.status(200).json({ contact_info: "contact_info updated" });
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
