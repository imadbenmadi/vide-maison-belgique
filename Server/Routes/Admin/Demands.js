const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware_New");
const { Demands } = require("../../Models/Demands");
const { Demands_types } = require("../../Models/Demands_types");
const { sequelize } = require("../../config/db_connection");
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const demands = await Demands.findAll({
            where: {},
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ demands });
    } catch (err) {
        console.error("Error fetching Messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/:id", adminMiddleware, async (req, res) => {
    if (!req.params.id || req.params.id < 1 || isNaN(req.params.id)) {
        return res.status(400).json({ message: "invalide id" });
    }
    const messageId = req.params.id;
    if (!messageId)
        return res.status(409).json({ message: "message id is required" });
    try {
        const message = await Demands.findOne({
            where: { id: messageId },
        });
        if (!message)
            return res
                .status(404)
                .json({ message: "message not found in database " });
        await Demands.destroy({ where: { id: messageId } });
        res.status(200).json({ message: "message deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting Messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/types", adminMiddleware, async (req, res) => {
    try {
        const type = req.body.type;
        if (!type) return res.status(400).json({ message: "type is required" });

        const newType = await Demands_types.create({ type });
        return res
            .status(200)
            .json({ message: "type added successfully", type: newType });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/types/:id", adminMiddleware, async (req, res) => {
    try {
        const typeid = req.params.id;
        if (!typeid)
            return res.status(400).json({ message: "type id is required" });
        await Demands_types.destroy({ where: { id: typeid } });
        return res.status(200).json({ message: "type deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
