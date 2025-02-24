const express = require("express");
const router = express.Router();

const cuzlerControllers = require("../controllers/cenazecuzler.controllers");

router.get("/cenazecuzlers", cuzlerControllers.getAllCities);
router.get("/cenazecuzlers/:id", cuzlerControllers.getSingleCity);
router.get("/cenazecuzlersdata", cuzlerControllers.createPredefinedCuzlers);
router.patch("/cenazecuzlers/:id", cuzlerControllers.updateCity);
router.delete("/cenazecuzlers/:id", cuzlerControllers.deleteCity);

module.exports = router;
