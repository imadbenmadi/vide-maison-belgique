const express = require("express");
const router = express.Router();
const Admin_midllware = require("../../Middlewares/Admin_middleware");

router.get("/", Admin_midllware, async (req, res) => {
    res.send("Hello from Admin Home");
});

module.exports = router;
