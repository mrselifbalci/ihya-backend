const mongoose = require("mongoose");
const TimeDateModel = require("../models/TimeDate.model");
const createTodayData = () => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const defaultData = [
    { hour: "00:00", names: ["Elif", "R.Yasar"] },
    { hour: "01:00", names: ["NURAY"] },
    { hour: "02:00", names: ["Safiye Erbey"] },
    { hour: "03:00", names: ["ŞENGÜL"] },
    { hour: "04:00", names: ["ŞENGÜL"] },
    { hour: "05:00", names: ["inci"] },
    { hour: "06:00", names: ["inci", "Meral"] },
    { hour: "07:00", names: ["inci", "AAyse"] },
    { hour: "08:00", names: ["Mine", "E.Mazma"] },
    { hour: "09:00", names: ["Htc Dem"] },
    { hour: "10:00", names: ["E Aytan"] },
    { hour: "11:00", names: ["Hayriye"] },
    { hour: "12:00", names: ["Mrym Glsm Esm"] },
    { hour: "13:00", names: ["aysegulg"] },
    { hour: "14:00", names: ["F.Kaplan"] },
    { hour: "15:00", names: ["Orby"] },
    { hour: "16:00", names: ["Habibe"] },
    { hour: "17:00", names: ["Faimana"] },
    { hour: "18:00", names: ["Buket"] },
    { hour: "19:00", names: ["H.Kara"] },
    { hour: "20:00", names: ["E.üçok"] },
    { hour: "21:00", names: ["Bahar", "Vuslat"] },
    { hour: "22:00", names: ["Hale"] },
    { hour: "23:00", names: ["AyselA.Çevik"] },
  ];

  const todayData = defaultData.map((entry) => ({
    hour: entry.hour, // Always use "HH:mm" format
    date: today,
    names: entry.names.map((name) => ({
      name,
      status:
        entry.hour === "00:00" ||
        entry.hour === "01:00" ||
        entry.hour === "02:00", // Set status to true for 00:00 and 01:00
    })),
  }));

  return todayData;
};

const createTodayEntries = async () => {
  const todayData = createTodayData();

  try {
    // Check if data for today already exists
    const today = new Date().toISOString().split("T")[0];
    const existing = await TimeDateModel.findOne({ date: today });
    if (existing) {
      console.log("Data for today already exists.");
      return;
    }

    // Insert today's data into the database
    await TimeDateModel.insertMany(todayData);
    console.log("Data for today has been created successfully.");
  } catch (err) {
    console.error("Error creating data for today:", err);
  }
};

// Get all data for a specific date
exports.getDataByDate = async (req, res) => {
  createTodayEntries();
  try {
    const { date } = req.params;

    // Fetch data sorted by 'hour' in ascending order
    const data = await TimeDateModel.find({ date }).sort({ hour: 1 });

    if (!data.length) {
      return res.json({ status: 404, message: "No data found for this date." });
    }

    res.json({ status: 200, data });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

// Initialize daily data
exports.initializeDay = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const existing = await TimeDateModel.findOne({ date: today });
    if (existing) {
      return res.json({
        status: 400,
        message: "Data for today already exists.",
      });
    }

    const defaultData = [
      { hour: "00:00", names: ["Elif", "R.Yasar"] },
      { hour: "1:00", names: ["NURAY"] },
      { hour: "2:00", names: ["Safiye Erbey"] },
      { hour: "3:00", names: ["ŞENGÜL"] },
      { hour: "4:00", names: ["ŞENGÜL"] },
      { hour: "5:00", names: ["inci"] },
      { hour: "6:00", names: ["inci", "Meral"] },
      { hour: "7:00", names: ["inci", "AAyse"] },
      { hour: "8:00", names: ["Mine", "E.Mazma"] },
      { hour: "9:00", names: ["Htc Dem"] },
      { hour: "10:00", names: ["E Aytan"] },
      { hour: "11:00", names: ["Hayriye"] },
      { hour: "12:00", names: ["Mrym Glsm Esm"] },
      { hour: "13:00", names: ["aysegulg"] },
      { hour: "14:00", names: ["F.Kaplan"] },
      { hour: "15:00", names: ["Orby"] },
      { hour: "16:00", names: ["Habibe"] },
      { hour: "17:00", names: ["Faimana"] },
      { hour: "18:00", names: ["Buket"] },
      { hour: "19:00", names: ["H.Kara"] },
      { hour: "20:00", names: ["E.üçok"] },
      { hour: "21:00", names: ["Bahar", "Vuslat"] },
      { hour: "22:00", names: ["Hale"] },
      { hour: "23:00", names: ["AyselA.Çevik"] },
    ];

    const timeDateEntries = defaultData.map((entry) => ({
      hour: entry.hour,
      date: today,
      names: entry.names.map((name) => ({ name, status: false })),
    }));

    await TimeDateModel.insertMany(timeDateEntries);
    res.json({ status: 201, message: "Daily data initialized successfully." });
  } catch (err) {
    res.json({ status: 500, message: err });
  }
};

// Update a specific name's status for a specific hour
exports.updateStatus = async (req, res) => {
  const { hour, name, status } = req.body;
  const today = new Date().toISOString().split("T")[0];

  if (!hour || !name || typeof status !== "boolean") {
    return res.json({
      status: 400,
      message: "Hour, name, and status are required.",
    });
  }

  try {
    const entry = await TimeDateModel.findOne({ hour, date: today });
    if (!entry) {
      return res.json({ status: 404, message: "Entry not found." });
    }

    entry.names = entry.names.map((n) =>
      n.name === name ? { ...n, status } : n
    );

    await entry.save();
    res.json({ status: 200, message: "Status updated successfully.", entry });
  } catch (err) {
    res.json({ status: 500, message: err });
  }
};

// Delete all data for a specific date
exports.deleteDataByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const result = await TimeDateModel.deleteMany({ date });
    if (!result.deletedCount) {
      return res.json({
        status: 404,
        message: "No data found to delete for this date.",
      });
    }
    res.json({ status: 200, message: "Data deleted successfully." });
  } catch (err) {
    res.json({ status: 500, message: err });
  }
};
