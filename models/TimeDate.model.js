const mongoose = require("mongoose");

const TimeDateSchema = new mongoose.Schema({
  hour: { type: String, required: true }, // Format: "HH:mm"
  date: { type: String, required: true },
  names: [
    {
      name: { type: String, required: true },
      status: { type: Boolean, default: false },
    },
  ],
});

TimeDateSchema.index({ date: 1, hour: 1 }); // Ensure combined index for sorting

module.exports = mongoose.model("TimeDate", TimeDateSchema);
