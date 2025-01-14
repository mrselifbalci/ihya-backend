const express = require("express");
const router = express.Router();

const suraController = require("../controllers/suras.controllers");

router.get("/suras", suraController.getAllCities);
router.get("/suras/:id", suraController.getSingleCity);
router.get("/surasdata", suraController.createPredefinedSuras);
router.patch("/suras/:id", suraController.updateCity);
router.delete("/suras/:id", suraController.deleteCity);

module.exports = router;
