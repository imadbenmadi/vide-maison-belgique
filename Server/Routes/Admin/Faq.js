const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware");
const { Faq } = require("../../Models/Content/Faq");

router.get("/", adminMiddleware, async (req, res) => {
    try {
        const faq = await Faq.findAll({
            where: {},
            // order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ faq });
    } catch (err) {
        console.error("Error fetching faqs:", err);
        res.status(500).json({ faq: "Internal Server Error" });
    }
});

router.delete("/:id", adminMiddleware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ faq: "invalide id" });
    }
    const faqId = req.params.id;
    if (!faqId) return res.status(409).json({ faq: "faq id is required" });
    try {
        const faq = await Faq.findOne({
            where: { id: faqId },
        });
        if (!faq)
            return res.status(404).json({ faq: "faq not found in database " });
        await Faq.destroy({ where: { id: faqId } });
        res.status(200).json({ faq: "faq deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting faqs:", err);
        res.status(500).json({ faq: "Internal Server Error" });
    }
});
router.post("/", adminMiddleware, async (req, res) => {
    const { qst, sol } = req.body;
    if (!qst || !sol) return res.status(400).json({ faq: "Missing Data" });
    try {
        const faq = await Faq.create({
            qst,
            sol,
        });

        res.status(200).json({ message: "faq created successfully", faq });
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ faq: "Internal Server Error" });
    }
});
module.exports = router;
