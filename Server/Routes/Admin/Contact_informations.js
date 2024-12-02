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
router.delete("/:id", adminMiddleware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ contact_info: "invalide id" });
    }
    const contact_infoId = req.params.id;
    if (!contact_infoId)
        return res
            .status(409)
            .json({ contact_info: "contact_info id is required" });
    try {
        const contact_info = await Contact_informations.findOne({
            where: { id: contact_infoId },
        });
        if (!contact_info)
            return res
                .status(404)
                .json({ contact_info: "contact_info not found in database " });
        await Contact_informations.destroy({ where: { id: contact_infoId } });
        res.status(200).json({
            contact_info: "contact_info deleted successfully",
        });
    } catch (err) {
        console.error("Error fetching deleting Messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
