const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin_middleware");
const { Phrase_Call } = require("../../Models/Content/Phrase_Call");
const { Phrase_Contact } = require("../../Models/Content/Phrase_Contact");

router.get("/Phrase_Call", adminMiddleware, async (req, res) => {
    try {
        const phrase = await Phrase_Call.findOne({});
        res.status(200).json({ phrase });
    } catch (err) {
        console.error("Error fetching phrases:", err);
        res.status(500).json({ phrase: "Internal Server Error" });
    }
});

router.delete("/Phrase_Call/:id", adminMiddleware, async (req, res) => {
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
router.put("/Phrase_Call", adminMiddleware, async (req, res) => {
    const { Text, button } = req.body;
    if (!Text || !button)
        return res.status(400).json({ phrase: "Missing Data" });
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
router.get("/Phrase_Contact", adminMiddleware, async (req, res) => {
    try {
        const phrase = await Phrase_Contact.findOne({});
        res.status(200).json({ phrase });
    } catch (err) {
        console.error("Error fetching phrases:", err);
        res.status(500).json({ phrase: "Internal Server Error" });
    }
});

router.delete("/Phrase_Contact/:id", adminMiddleware, async (req, res) => {
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
router.put("/Phrase_Contact", adminMiddleware, async (req, res) => {
    const { Text, button } = req.body;
    if (!Text || !button)
        return res.status(400).json({ phrase: "Missing Data" });
    try {
        const phrase_in_db = await Phrase_Contact.findOne({});
        let phrase;
        if (!phrase_in_db) {
            phrase = await Phrase_Contact.create({
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
module.exports = router;
