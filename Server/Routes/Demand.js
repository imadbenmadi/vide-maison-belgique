const express = require("express");
const router = express.Router();
const { Demands } = require("../Models/Demands");
const { Demands_types } = require("../Models/Demands_types");

const handle_create_demand = async (req, res) => {
    try {
        const { firstName, lastName, email, description, telephone, type } =
            req.body;

        // Check for missing fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !description ||
            !telephone ||
            !type
        ) {
            return res.status(409).json({ message: "Missing Data" });
        }

        // Validate email format
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return res.status(409).json({ message: "Invalid email" });
        }

        // Create the demand in the database
        await Demands.create({
            firstName,
            lastName,
            email,
            description,
            telephone,
            type,
        });

        return res.status(200).json({
            message: "Demand Created Successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const get_demands_types = async (req, res) => {
    try {
        const types = await Demands_types.findAll({
            attributes: ["type"],
        });
        return res.status(200).json({ types });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
// Define the POST route
router.post("/", handle_create_demand, get_demands_types);
router.get("/types", get_demands_types);
module.exports = router;
