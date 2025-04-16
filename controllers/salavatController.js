const Salavat = require("../models/salavat");

// Get all salavats and total count
exports.getAllSalavats = async (req, res) => {
  try {
    const salavats = await Salavat.find();
    const totalCount = salavats.reduce(
      (sum, salavat) => sum + salavat.count,
      0
    );

    res.status(200).json({
      success: true,
      data: salavats,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create a new salavat
exports.createSalavat = async (req, res) => {
  try {
    const { count, personName } = req.body;

    const salavat = await Salavat.create({
      count,
      personName,
    });

    res.status(201).json({
      success: true,
      data: salavat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a salavat
exports.deleteSalavat = async (req, res) => {
  try {
    const salavat = await Salavat.findByIdAndDelete(req.params.id);

    if (!salavat) {
      return res.status(404).json({
        success: false,
        error: "Salavat not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
