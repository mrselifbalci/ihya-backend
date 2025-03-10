const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FetihsSchema = new Schema(
  {
    hatimNumber: { type: Number },
    fetihNumber: { type: Number },
    personName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fetih", FetihsSchema);
