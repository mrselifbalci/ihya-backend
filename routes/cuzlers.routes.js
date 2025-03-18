const express = require("express");
const router = express.Router();

const cuzlerControllers = require("../controllers/cuzler.controllers");

router.get("/cuzlers", cuzlerControllers.getAllCities);
router.get("/cuzlers/:id", cuzlerControllers.getSingleCity);
router.get("/cuzlersdata", cuzlerControllers.createPredefinedCuzlers);
router.patch("/cuzlers/:id", cuzlerControllers.updateCity);
router.delete("/cuzlers/:id", cuzlerControllers.deleteCity);
router.delete(
  "/cuzlers/hatim/:hatimNumber",
  cuzlerControllers.deleteByHatimNumber
);

module.exports = router;
