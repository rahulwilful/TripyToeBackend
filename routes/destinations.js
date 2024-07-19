const express = require("express");
const destinationRouter = express.Router();
const { body } = require("express-validator");

const { testDestinations_typeAPI, AddDestination, GetDestination } = require("../controllers/destinations");

//@desc Test Destiations API
//@route GET /api/v1/destination/test
//@access Public
destinationRouter.get("/test", testDestinations_typeAPI);

//@desc Add Destinations API
//@route POST add-destination
//@access Public
destinationRouter.post(
  "/add-destination",
  [
    body("title", "title required").notEmpty(),
    body("imageUrl", "imageUrl required").notEmpty(),
    body("location", "location required").notEmpty(),
    body("where"),
    body("tags", "tags required").notEmpty(),
    body("category", "category required").notEmpty(),
    body("how_to_reach"),
    body("about", "about required").notEmpty(),
  ],
  AddDestination
);

//@desc Get Destinations API
//@route GET get-destination
//@access Public
destinationRouter.get("/get-destination/:destination", GetDestination);

module.exports = destinationRouter;
