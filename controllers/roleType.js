const logger = require("../config/logger.js");
const { validationResult, matchedData } = require("express-validator");
const RoleType = require("../models/RoleType.js");

const testRoleTypeAPI = async (req, res) => {
  return res.status(200).send("Role_type API test successfull");
};

//@desc Get All RoleType API
//@route GET role_type/getall
//@access Public
const GetAllRoleTypes = async (req, res) => {
  try {
    const allRoles = await RoleType.find({ active: true });
    console.log(allRoles);
    logger.info(`: API role_type/getalldepts | responded with "Fetched all the Role_types" `);
    return res.status(200).json({ result: allRoles });
  } catch (err) {
    console.log("error: ", err);
    logger.error(` API role_type/getalldepts | responded with Error  " something went wrong" `);
    return res.status(500).json({ error: err, message: "Something went wrong" });
  }
};

//@desc Get RoleType By Name API
//@route GET role_type/getrole_typebyname
//@access Public
const GetRoleTypeByName = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API role_type/login  responded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);

  try {
    const deptName = await RoleType.findOne({ name: data.name });
    /* console.log(allDepts); */
    logger.info(`${ip}: API role_type/getalldepts | responded with "Fetched all the Role_types" `);
    return res.status(200).json({ result: deptName });
  } catch (err) {
    logger.error(`${ip}: API role_type/getalldepts responded with Error  " somethung went wrong" `);
    return res.status(500).json({ error: err, message: "Something went wrong" });
  }
};

module.exports = {
  testRoleTypeAPI,
  GetAllRoleTypes,
  GetRoleTypeByName,
};
