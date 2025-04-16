const mongoose = require("mongoose");

const salavatSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
    personName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Salavat", salavatSchema);
