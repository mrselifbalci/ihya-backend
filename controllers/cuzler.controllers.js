const mongoose = require("mongoose");
const CuzlersModel = require("../models/Cuzlers.model");

exports.createPredefinedCuzlers = async (req, res) => {
  const cuzlersToCreate = Array.from({ length: 30 }, (_, i) => ({
    hatimNumber: 90,
    cuzNumber: i + 1,
    personName: "",
  }));
  try {
    await CuzlersModel.insertMany(cuzlersToCreate);
    res.status(200).json({ message: "30 Cuzlers created successfully" });
  } catch (error) {
    console.error("Error inserting cuzlers:", error);
    res.status(500).json({ message: "Error creating cuzlers", error });
  }
};

exports.getAllCities = async (req, res, next) => {
  const { page = 1, limit = 100000 } = req.query;
  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({ message: "Page and limit must be numbers" });
  }
  const total = await CuzlersModel.find().countDocuments();
  await CuzlersModel.aggregate(
    [
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit * 1 },
      {
        $project: {
          cuzNumber: true,
          personName: true,
          hatimNumber: true,
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
  const newCity = await new CuzlersModel({
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

  await CuzlersModel.aggregate(
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
  await CuzlersModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  )
    .then((data) => res.json({ message: "Successfully updated", data }))
    .catch((err) => res.json({ message: err }));
};

exports.deleteCity = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.json({ message: "Invalid city id" });
    return;
  }
  await CuzlersModel.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

exports.deleteByHatimNumber = async (req, res) => {
  const { hatimNumber } = req.params;
  console.log(hatimNumber);
  if (!hatimNumber || isNaN(hatimNumber)) {
    return res.status(400).json({ message: "Invalid hatimNumber" });
  }

  try {
    const result = await CuzlersModel.deleteMany({
      hatimNumber: Number(hatimNumber),
    });

    res.status(200).json({
      message: `${result.deletedCount} Cuzlers deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting Cuzlers:", error);
    res.status(500).json({ message: "Error deleting Cuzlers", error });
  }
};
