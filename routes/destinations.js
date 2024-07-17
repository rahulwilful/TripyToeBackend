const express = require("express");
const destinationRouter = express.Router();
const { body } = require("express-validator");

const { testDestinations_typeAPI, AddDestinations } = require("../controllers/destinations");

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
    body("where", "where required").notEmpty(),
    body("tags", "tags required").notEmpty(),
    body("category", "category required").notEmpty(),
    body("about", "about required").notEmpty(),
  ],
  AddDestinations
);

module.exports = destinationRouter;
