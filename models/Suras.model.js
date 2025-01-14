const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurasSchema = new Schema(
  {
    suraName: { type: String },
    personName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sura", SurasSchema);
