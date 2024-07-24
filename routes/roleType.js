const express = require("express");

const roleTypeRouter = express.Router();

const { body } = require("express-validator");
const ValidateToken = require("../middleWare/validateToken");
const { testRoleTypeAPI, GetAllRoleTypes, GetRoleTypeByName } = require("../controllers/roleType.js");

//@desc Test Role_type API
//@route GET /api/v1/role_type
//@access Public
roleTypeRouter.get("/", testRoleTypeAPI);

//@desc Get All RoleType API
//@route GET role_type/getall
//@access Public
roleTypeRouter.get("/get_all_role_types", /*  ValidateToken, */ GetAllRoleTypes);

//@desc Get RoleType By Name API
//@route GET role_type/getrole_typebyname
//@access Publicc
roleTypeRouter.get("/get_role_type_by_name", [body("name", "Enter Valid Name").notEmpty()], GetRoleTypeByName);

module.exports = roleTypeRouter;
