const express = require("express");
const router = express.Router();

const timeDateController = require("../controllers/timeDate.controllers");

// Route to initialize daily data
router.post("/date/initialize", timeDateController.initializeDay);

// Route to get all data for a specific date
router.get("/date/:date", timeDateController.getDataByDate);

// Route to update a specific name's status for a specific hour
router.put("/date/update/:id", timeDateController.updateStatus);

module.exports = router;
