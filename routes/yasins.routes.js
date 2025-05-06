const express = require("express");
const router = express.Router();

const yasinsControllers = require("../controllers/yasins.controllers");

router.get("/yasins", yasinsControllers.getAllCities);
router.get("/yasins/:id", yasinsControllers.getSingleCity);
router.get("/yasinsdata", yasinsControllers.createPredefinedFetihs);
router.patch("/yasins/:id", yasinsControllers.updateCity);
router.delete("/yasins/:id", yasinsControllers.deleteCity);

module.exports = router;
