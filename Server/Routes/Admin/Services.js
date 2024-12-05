const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware");
const { Services } = require("../../Models/Content/Services");

router.get("/", adminMiddleware, async (req, res) => {
    try {
        const service = await Services.findAll({
            where: {},
            // order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ service });
    } catch (err) {
        console.error("Error fetching services:", err);
        res.status(500).json({ service: "Internal Server Error" });
    }
});

router.delete("/:id", adminMiddleware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ service: "invalide id" });
    }
    const serviceId = req.params.id;
    if (!serviceId) return res.status(409).json({ service: "service id is required" });
    try {
        const service = await Services.findOne({
            where: { id: serviceId },
        });
        if (!service)
            return res.status(404).json({ service: "service not found in database " });
        await Services.destroy({ where: { id: serviceId } });
        res.status(200).json({ service: "service deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting services:", err);
        res.status(500).json({ service: "Internal Server Error" });
    }
});
router.post("/", adminMiddleware, async (req, res) => {
    const { qst, sol } = req.body;

    try {
        const service = await Services.create({
            qst,
            sol,
        });

        res.status(200).json({ message: "service created successfully", service });
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ service: "Internal Server Error" });
    }
});
module.exports = router;
