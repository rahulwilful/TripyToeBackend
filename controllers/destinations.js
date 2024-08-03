const logger = require("../config/logger.js");
const { validationResult, matchedData } = require("express-validator");
const Searched = require("../models/Searched");
const Destination = require("../models/Destinations");

const testDestinations_typeAPI = async (req, res) => {
  return res.status(200).send("Destination API test successfull");
};

//@desc Get Destinations API
//@route GET destination/add-destination
//@access Public
const AddDestination = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //whats remote address?

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API  destinations/add-destination |  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);

  console.log("data", data);

  try {
    const response = await Destination.create({
      title: data.title,
      imageUrl: data.imageUrl,
      location: data.location,
      where: data.where || "",
      tags: data.tags,
      category: data.category,
      how_to_reach: data.how_to_reach || "",
      about: data.about,
    });

    logger.info(` API  | destinations/add-destination | responnded with "created new destination" `);
    return res.status(201).json({ result: response });
  } catch (e) {
    logger.error(` API | destinations/add-destination |  responnded with Error "while adding destinations" `);
    return res.status(500).json(e, " Something went wrong while while adding destinations");
  }
};

//@desc Get Destinations API
//@route GET get-destination
//@access Public
const GetDestination = async (req, res) => {
  const destination = req.params.destination;

  console.log("destination: ", destination);

  try {
    const response = await Destination.find({
      title: { $regex: new RegExp(destination, "i") },
    });

    if (response) {
      return res.status(200).json({ result: response[0] });
    } else {
      return res.status(200).json({ result: {} });
    }
  } catch (err) {
    console.log("error: ", err);
    return res.status(500).json(err, "Something went wrong while geting destinations");
  }
};

module.exports = {
  testDestinations_typeAPI,
  AddDestination,
  GetDestination,
};
