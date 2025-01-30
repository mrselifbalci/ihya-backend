const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CuzlersSchema = new Schema(
  {
    hatimNumber: { type: Number },
    cuzNumber: { type: Number },
    personName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cuzler", CuzlersSchema);
