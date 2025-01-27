const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware_New");
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

module.exports = router;
