const mongoose = require("mongoose");
const SurasModal = require("../models/Suras.model");

exports.createPredefinedSuras = async (req, res) => {
  const suraNames = [
    "YASİN",
    "FETİH",
    "CUMA",
    "MÜLK",
    "NEBE",
    "INSIRAH",
    "KADİR",
    "ASR",
    "HÜMEZE",
    "Elif, Lam, Mim",
    "FİL",
    "KUREYŞ",
    "MAUN",
    "KEVSER",
  ];

  const surasToCreate = suraNames.flatMap((suraName, index) =>
    Array.from({ length: 5 }, (_, i) => ({
      suraName,
      personNames: [],
      order: index + 1, // Increment order by the sura's position in the array
    }))
  );

  try {
    await SurasModal.insertMany(surasToCreate);
    res.status(200).json({ message: "Suras created successfully" });
  } catch (error) {
    console.error("Error inserting suras:", error);
    res.status(500).json({ message: "Error creating suras", error });
  }
};

exports.getAllCities = async (req, res, next) => {
  const { page = 1, limit = 1000 } = req.query;
  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({ message: "Page and limit must be numbers" });
  }
  const total = await SurasModal.find().countDocuments();
  await SurasModal.aggregate(
    [
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit * 1 },
      {
        $project: {
          suraName: true,
          personName: true,
        },
      },
    ],
    (err, response) => {
      if (err) res.json(err);
      const pages = limit === undefined ? 1 : Math.ceil(total / limit);
      res.json({
        total,
        totalPages: pages,
        currentPage: +page,
        status: 200,
        response,
      });
    }
  );
};

exports.create = async (req, res) => {
  const newCity = await new SurasModal({
    suraName: req.body.suraName,
    personName: req.body.suraName,
  });

  newCity.save((err, data) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({
        message: "new city created",
        data,
      });
    }
  });
};

exports.getSingleCity = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.json({ message: "Invalid city id" });
    return;
  }

  await SurasModal.aggregate(
    [
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "properties",
          localField: "_id",
          foreignField: "city_id",
          as: "property_count",
        },
      },
      {
        $addFields: { property_count: { $size: "$property_count" } },
      },
      {
        $project: {
          name: true,
          universities: true,
          student_life: true,
          image_url: true,
          property_count: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    ],
    (err, data) => {
      if (err) res.json(err);
      res.json({ data });
    }
  );
};

exports.updateCity = async (req, res) => {
  // if (!ObjectId.isValid(req.params.id)) {
  //   res.json({ message: "Invalid city id" });
  //   return;
  // }
  await SurasModal.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => res.json({ message: "Successfully updated", data }))
    .catch((err) => res.json({ message: err }));
};

exports.deleteCity = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.json({ message: "Invalid city id" });
    return;
  }
  await SurasModal.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};
