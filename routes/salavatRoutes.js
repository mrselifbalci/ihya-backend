const express = require("express");
const router = express.Router();
const {
  getAllSalavats,
  createSalavat,
  deleteSalavat,
} = require("../controllers/salavatController");

// Get all salavats and total count
router.get("/salavats", getAllSalavats);

// Create a new salavat
router.post("/salavats", createSalavat);

// Delete a salavat
router.delete("/salavats/:id", deleteSalavat);

module.exports = router;
