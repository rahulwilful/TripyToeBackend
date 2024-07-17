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
const AddDestinations = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

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
    return res.status(500).json(e, " Something went wrong while retriving destinations");
  }
};

module.exports = {
  testDestinations_typeAPI,
  AddDestinations,
};
