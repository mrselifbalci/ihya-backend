const express = require("express");
const router = express.Router();

const cuzlerControllers = require("../controllers/cenazecuzler.controllers");

router.get("/cenazecuzler", cuzlerControllers.getAllCities);
router.get("/cenazecuzler/:id", cuzlerControllers.getSingleCity);
router.get("/cenazecuzlerdata", cuzlerControllers.createPredefinedCuzlers);
router.patch("/cenazecuzler/:id", cuzlerControllers.updateCity);
router.delete("/cenazecuzler/:id", cuzlerControllers.deleteCity);

module.exports = router;
