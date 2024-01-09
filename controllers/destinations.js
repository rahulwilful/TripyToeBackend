const logger = require("../config/logger.js");
const { validationResult, matchedData } = require("express-validator");
const Searched = require("../models/Searched");
const Destination = require("../models/Destinations");

const testDestinations_typeAPI = async (req, res) => {
  return res.status(200).send("Destination API test successfull");
};

//@desc Get Destinations API
//@route GET /api/v1/destination/getdestinations
//@access Public
const GetDestinations = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/destination/getdestinations  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.params.id;
  const data = matchedData(req);

  console.log("data", data);

  try {
    const response = await Destination.find({});
    if (response) {
      await Searched.create({
        destination: data.destination,
        no_of_days: data.no_of_days,
        start_date: data.start_date,
        no_of_ppl: data.no_of_ppl,
        preference: data.preference,
        budget: data.budget,
        userId: userId,
        search_date: data.search_date,
      });
    }
    logger.info(`${ip}: API /api/v1/destination/getdestinations | responnded with "retrived destinations" `);
    return res.status(201).json({ result: response });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/destination/getdestinations  responnded with Error "while retriving destinations" `);
    return res.status(500).json(e, " Something went wrong while retriving destinations");
  }
};

module.exports = {
  testDestinations_typeAPI,
  GetDestinations,
};
