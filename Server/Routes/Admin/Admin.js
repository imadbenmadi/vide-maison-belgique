const express = require("express");
const router = express.Router();
const { Admins } = require("../../Models/Admin");

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
module.exports = router;
