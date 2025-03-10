const express = require("express");
const router = express.Router();

const fetihsControllers = require("../controllers/fetihs.controllers");

router.get("/fetihs", fetihsControllers.getAllCities);
router.get("/fetihs/:id", fetihsControllers.getSingleCity);
router.get("/fetihsdata", fetihsControllers.createPredefinedFetihs);
router.patch("/fetihs/:id", fetihsControllers.updateCity);
router.delete("/fetihs/:id", fetihsControllers.deleteCity);

module.exports = router;
