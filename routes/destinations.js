const express = require("express");
const destinationRouter = express.Router();
const { body } = require("express-validator");

const { testDestinations_typeAPI, GetDestinations } = require("../controllers/destinations");

//@desc Test Destiations API
//@route GET /api/v1/destination/test
//@access Public
destinationRouter.get("/test", testDestinations_typeAPI);

//@desc Get Destinations API
//@route GET /api/v1/destination/getdestinations/:id
//@access Public
destinationRouter.post(
  "/getdestinations/:id",
  [body("destination", "destination required").notEmpty(), body("end_date", "end_date required").notEmpty(), body("start_date", "start_date required").notEmpty(), body("no_of_ppl", "no_of_ppl required").notEmpty(), body("preference"), body("budget", "budget required").notEmpty()],
  GetDestinations
);

module.exports = destinationRouter;
