const { validationResult, matchedData } = require("express-validator");
const User = require("../models/User");
const Searched = require("../models/Searched");
const RoleType = require("../models/RoleType");
const Itinerarys = require("../models/Itinerarys");
const bcrypt = require("bcryptjs");
const secret = "test";
const logger = require("../config/logger.js");
const jwt = require("jsonwebtoken");
const GenerateToken = require("../middleWare/GenerateToken.js");

const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const testUserAPI = async (req, res) => {
  return res.status(200).send("User API test successfull");
};

const CreateUser = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with Error `);
    return res.status(401).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  if (!data.mobile_no) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with "mobile no required" `);
    return res.status(401).json({ message: "mobile no required" });
  }

  if (!data.password) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with "password required" `);
    return res.status(403).json({ message: "password required" });
  }
  if (!data.email) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with "email required" `);
    return res.status(402).json({ message: "email required" });
  }
  const oldUser = await User.findOne({ email: data.email });

  if (oldUser) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with User already registered! for email: ${data.email} `);
    return res.status(400).json({ message: "User already registered!" });
  }

  const salt = await bcrypt.genSalt(10);
  const securedPass = await bcrypt.hash(data.password, salt);
  const token = GenerateToken();
  console.log("Token: ", token);

  let role = "";
  if (data.role_type) {
    role = data.role_type;
  } else {
    let temp = await RoleType.findOne({ name: "user" });
    role = temp._id;
  }
  console.log("role: ", role);

  await User.create({
    profile: "",
    facebookId: "",
    googleId: "",
    facebookId: "",
    name: data.name,
    role_type: role,
    email: data.email,
    mobile_no: data.mobile_no,
    password: securedPass,
    whatsapp_status: false,
    whatsapp_no: "",
    instagram: "",
    facebook: "",
    otp: "",
    token: token,
  })
    .then((user) => {
      logger.info(`${ip}: API /api/v1/user/add  responnded with Success `);
      return res.status(201).json({ result: user });
    })
    .catch((err) => {
      logger.error(`${ip}: API /api/v1/user/add  responnded with Error `);
      return res.status(500).json({ message: err.message });
    });
};

//@desc Create User API
//@route POST user/add/add-superadmin
//@access Public
const CreateSuperAdmin = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with Error `);
    return res.status(401).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  if (!data.mobile_no) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with "mobile no required" `);
    return res.status(401).json({ message: "mobile no required" });
  }

  if (!data.password) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with "password required" `);
    return res.status(403).json({ message: "password required" });
  }
  if (!data.email) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with "email required" `);
    return res.status(402).json({ message: "email required" });
  }
  const oldUser = await User.findOne({ email: data.email });

  if (oldUser) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with User already registered! for email: ${data.email} `);
    return res.status(400).json({ message: "User already registered!" });
  }

  const salt = await bcrypt.genSalt(10);
  const securedPass = await bcrypt.hash(data.password, salt);
  const token = GenerateToken();
  console.log("Token: ", token);

  let role = await RoleType.findOne({ name: "super_admin" });

  await User.create({
    profile: "",
    facebookId: "",
    googleId: "",
    facebookId: "",
    name: data.name,
    role_type: role._id,
    email: data.email,
    mobile_no: data.mobile_no,
    password: securedPass,
    whatsapp_status: false,
    whatsapp_no: "",
    instagram: "",
    facebook: "",
    otp: "",
    token: token,
  })
    .then((user) => {
      logger.info(`${ip}: API /api/v1/user/add  responnded with Success `);
      return res.status(201).json({ result: user });
    })
    .catch((err) => {
      logger.error(`${ip}: API /api/v1/user/add  responnded with Error `);
      return res.status(500).json({ message: err.message });
    });
};

//@desc Google Sign In API
//@route POST /api/v1/user/googlesignin
//@access Public
const GoogleSignUp = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with Error `);
    return res.status(401).json({ errors: errors.array() });
  }
  const data = matchedData(req);

  const oldUser = await User.findOne({ email: data.email });

  if (oldUser) {
    logger.error(`${ip}: API /api/v1/user/add  responnded with User already registered! for email: ${data.email} `);
    return res.status(400).json({ message: "User already registered!" });
  }

  let temp = await RoleType.findOne({ name: "user" });
  const role = temp._id;

  await User.create({
    profile: "",
    googleId: data.googleId,
    facebookId: "",
    name: data.name,
    role_type: role,
    email: data.email,
    mobile_no: "",
    email_verified: true,
    password: "",
    whatsapp_status: false,
    whatsapp_no: "",
    instagram: "",
    facebook: "",
    otp: "",
    token: "",
  })
    .then((user) => {
      logger.info(`${ip}: API /api/v1/user/add  responnded with Success `);
      return res.status(201).json({ result: user });
    })
    .catch((err) => {
      logger.error(`${ip}: API /api/v1/user/add  responnded with Error `);
      return res.status(500).json({ message: err.message });
    });
};

//@desc Facbook Sign Up API
//@route POST /api/v1/user/facebooksignup
//@access Public
const FacebookSignUp = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/facebooksignup  responded with Error`);
    return res.status(401).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  console.log("1", data.facebookId);
  const oldUser = await User.findOne({ facebookId: data.facebookId });

  if (oldUser) {
    logger.error(`${ip}: API /api/v1/user/facebooksignup  responnded with User already registered! `);
    return res.status(400).json({ message: "User already registered!" });
  }

  console.log("2", data.facebookId);
  let temp = await RoleType.findOne({ name: "user" });
  const role = temp._id;

  await User.create({
    profile: "",
    googleId: "",
    facebookId: data.facebookId,
    name: data.name,
    role_type: role,
    email: "",
    mobile_no: "",
    email_verified: false,
    password: "",
    whatsapp_status: false,
    whatsapp_no: "",
    instagram: "",
    facebook: "",
    otp: "",
    token: "",
  })
    .then((user) => {
      logger.info(`${ip}: API /api/v1/user/facebooksignup  responnded with Success `);
      return res.status(201).json({ result: user });
    })
    .catch((err) => {
      logger.error(`${ip}: API /api/v1/user/facebooksignup  responnded with Error `);
      return res.status(500).json({ message: err.message });
    });
};

//@desc LogIn User API
//@route GET /api/v1/user/Login
//@access Public
const LogInUser = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/login  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      logger.error(`${ip}: API /api/v1/user/login  responded User does not 
      exist with email:  ${email} `);
      return res.status(404).json({ error: "User Does Not Exist" });
    }

    if (!oldUser.approved) {
      logger.error(`${ip}: API /api/v1/user/login  responded User approval is pending for email:  ${email} `);
      return res.status(400).json({ error: "User approval is still pending" });
    }

    const isPassCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPassCorrect) {
      logger.error(`${ip}: API /api/v1/user/login  responded password incorrect`);
      return res.status(401).json({ error: "invalid password " });
    }
    const token = jwt.sign({ user: oldUser }, secret, { expiresIn: "168h" });

    logger.info(`${ip}: API /api/v1/login | Login Successfull" `);
    return res.status(200).json({ result: oldUser, token });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/login  responnded with Error `);
    return res.status(500).json(e, " Something went wrong");
  }
};

//@desc Update User API
//@route GET /api/v1/user/update
//@access Public
const UpdateUser = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const id = req.params.id;
  const data = matchedData(req);
  console.log(data.email);
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/login  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name: data.name,
        mobile_no: data.mobile_no,
        whatsapp_no: data.whatsapp_no,
        instagram: data.instagram,
        facebook: data.facebook,
        email: data.email,

        whatsapp_status: data.whatsapp_status,
      }
    );
    logger.info(`${ip}: API /api/v1/update | responnded with "User updated successfully" `);
    return res.status(201).json({ result: user });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/update  responnded with Error "while updating user" `);
    return res.status(500).json(e, " Something went wrong while updating data");
  }
};

//@desc Delete User API
//@route GET /api/v1/user/delete
//@access Public
const DeleteUser = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  try {
    if (req.user) {
      const user = await User.findOne({ _id: req.params.id });

      await User.findOneAndUpdate({ _id: req.params.id }, { active: !user.active });

      logger.info(`${ip}: API /api/v1/user/delete | responnded with "User deleted successfully" `);
      return res.status(201).json("User deleted successfully");
    } else {
      logger.error(`${ip}: API /api/v1/user/delete  responnded with unauthorized user `);
      return res.status(500).json({ message: "Unauthorized user" });
    }
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/delete  responnded with Error for deleteing user `);
    return res.status(500).json({ e: "Somthing went wrong" });
  }
};

//@desc Get User by ID API
//@route GET /api/v1/user/get/:id
//@access Public
const GetUserById = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const userId = req.params.id;

  if (!userId) {
    logger.error(`${ip}: API /api/v1/user/get/:id  responded UserId required `);
    return res.status(400).json("UserId  requierd");
  }

  console.log(userId);
  try {
    const user = await User.findById({ _id: userId }).populate({ path: "role_type", select: ["name", "value", "active"] });

    if (!user) {
      logger.error(`${ip}: API /api/v1/user/get/:id  responded 'user not found' `);
      return res.status(404).json("user not found");
    }

    logger.info(`${ip}: API /api/v1/user/get/:id | responnded with "Got user by ID succesfully" `);
    return res.status(201).json(user);
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/get/:id  responnded with user not found `);
    return res.status(500).json({ error: "User not found", message: e });
  }
};

//@desc Get Current User API
//@route GET /api/v1/user/getcurrentuser
//@access Public
const GetCurrentUser = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  try {
    if (!req.user) {
      logger.error(`${ip}: API /api/v1/user/getcurrentuser  responnded with Error , "Unautherized user " `);
      return res.status(500).json({ message: "Unauthorized user" });
    }

    const user = await User.findOne({ _id: req.user._id }).populate({ path: "role_type", select: ["name", "value", "active"] });
    console.log("req.user: ", user);

    logger.info(`${ip}: API /api/v1/getcurrentuser | responnded with "Successfully retreived current user" `);
    return res.status(200).json({ data: user, message: "User Retrived" });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/getcurrentuser  responnded with Error, " somthing went wrong"`);
    return res.status(500).json({ message: "Something went wrong current user not found" });
  }
};

//@desc Get Verify Admin API
//@route GET /user/verify-admin
//@access Public
const VerifyAdmin = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  try {
    if (!req.user) {
      logger.error(`${ip}: API /api/v1/user/getcurrentuser  responnded with Error , "Unautherized user " `);
      return res.status(500).json({ message: "Unauthorized user" });
    }

    let role = await RoleType.findById(req.user.role_type);
    if (role.name != "super_admin") {
      console.log("note a super admin");
      logger.info(`${ip}: API /api/v1/getcurrentuser | responnded with "note a super admin" `);
      return res.status(401).json({ data: req.user, message: "note a super admin" });
    }
    console.log("role", role);
    console.log("role", role);

    logger.info(`${ip}: API /api/v1/getcurrentuser | responnded with "Successfully retreived current user" `);
    return res.status(200).json({ data: req.user, message: "User Retrived" });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/getcurrentuser  responnded with Error, " somthing went wrong"`);
    return res.status(500).json({ message: "Something went wrong current user not found" });
  }
};

//@desc Approve User API
//@route GET /api/v1/user/approveuser/:id
//@access Public
const ApproveUser = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const id = req.params.id;
  const data = matchedData(req);
  console.log(data.newProfile);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/updateprofile responded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        approved: true,
      }
    );
    logger.info(`${ip}: API /api/v1/user/approveuser/:id | responded with "New user approved" `);

    return res.status(201).json({ result: user });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/approveuser/:id  responnded with Error "while approving new user" `);
    return res.status(500).json(e, " Something went wrong while updating profile");
  }
};

//@desc UnApprove User API
//@route GET /api/v1/user/unapproveuser/:id
//@access Public
const UnApproveUser = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address ?
  const id = req.params.id;
  const data = matchedData(req);
  console.log(data.newProfile);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/updateprofile responded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        approved: false,
      }
    );
    logger.info(`${ip}: API /api/v1/user/approveuser/:id | responded with "New user approved" `);
    return res.status(201).json({ result: user });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/approveuser/:id  responnded with Error "while approving new user" `);
    return res.status(500).json(e, " Something went wrong while updating profile");
  }
};

//@desc Get New Users API
//@route GET /api/v1/user/getnewusers
//@access Public
const GetNewUsers = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const allUsers = await User.find({ approved: false });
    logger.info(`${ip}: API /api/v1/user/getallusers | responnded with "Fetchd all the users" `);
    return res.status(200).json(allUsers);
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/getallusers  responnded with Error  " somethung went wrong" `);
    return res.status(500).json({ e: "Something went wrong" });
  }
};

//@desc Google LogIn API
//@route POST /api/v1/user/googlelogin
//@access Public
const GoogleLogIn = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/googlelogin  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  const googleId = req.body.googleId;
  const email = req.body.email;

  try {
    const oldUser = await User.findOne({ googleId: googleId });
    if (!oldUser) {
      logger.error(`${ip}: API /api/v1/user/googlelogin  responded User does not exist with email:  ${email} `); /* Ive given email coz giving googleId might be risky*/
      return res.status(404).json({ error: "User Does Not Exist" });
    }

    if (!oldUser.approved) {
      logger.error(`${ip}: API /api/v1/user/googlelogin  responded User approval is pending for email:  ${email} `);
      return res.status(400).json({ error: "User approval is still pending" });
    }

    const token = jwt.sign({ user: oldUser }, secret, { expiresIn: "1h" });

    logger.info(`${ip}: API /api/v1/login | Login Successfull" `);
    return res.status(200).json({ result: oldUser, token });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/login  responnded with Error `);
    return res.status(500).json(e, " Something went wrong");
  }
};

//@desc FacebookLogin LogIn API
//@route POST /api/v1/user/facebooklogin
//@access Public
const FacebookLogin = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/facebooklogin  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  const facebookId = data.facebookId;
  console.log(facebookId);

  try {
    const oldUser = await User.findOne({ facebookId: facebookId });

    if (!oldUser) {
      logger.error(`${ip}: API /api/v1/user/facebooklogin  responded User does not 
      exist  `);
      return res.status(404).json({ error: "User Does Not Exist" });
    }

    if (!oldUser.approved) {
      logger.error(`${ip}: API /api/v1/user/facebooklogin  responded User approval is pending  `);
      return res.status(400).json({ error: "User approval is still pending" });
    }

    const token = jwt.sign({ user: oldUser }, secret, { expiresIn: "1h" });

    logger.info(`${ip}: API /api/v1/user/facebooklogin | Login Successfull" `);
    return res.status(200).json({ result: oldUser, token });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/facebooklogin  responnded with Error `);
    return res.status(500).json(e, " Something went wrong");
  }
};

//@desc Varify User API
//@route POST /api/v1/user/varifyuser
//@access Public
const VarifyUser = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  //if error return
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/login  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  console.log(email);

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      logger.error(`${ip}: API /api/v1/user/login  responded ' Email does not exist :  ${email}' `);
      return res.status(404).json({ error: "User Does Not Exist" });
    }

    logger.info(`${ip}: API /api/v1/login | Login Successfull" `);
    return res.status(200).json({ result: oldUser.email });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/login  responnded with Error `);
    return res.status(500).json(e, " Something went wrong");
  }
};

//@desc Reset Password API
//@route GET /api/v1/user/resetpassword
//@access Public
const ResetPasword = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const data = matchedData(req);
  //console.log(data.email);
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/login  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(data.password, salt);
    const user = await User.findOneAndUpdate(
      {
        email: data.email,
      },
      {
        password: securedPass,
      }
    );
    logger.info(`${ip}: API /api/v1/update | responnded with "User updated successfully" `);
    return res.status(201).json({ result: user });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/update  responnded with Error "while updating user" `);
    return res.status(500).json(e, " Something went wrong while updating data");
  }
};

//@desc Upadte Token  API
//@route GET /api/v1/user/updatetoken/:id
//@access Public
const UpdateToken = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const id = req.params.id;
  const data = matchedData(req);
  console.log("token: ", data.token);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/updatetoken/:id responded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        token: data.token,
      }
    );
    logger.info(`${ip}: API /api/v1/user/updatetoken/:id| responded with "token updated" `);

    return res.status(201).json({ result: user });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/updatetoken/:id  responnded with Error "token update faild" `);
    return res.status(500).json(e, " Something went wrong while updating token");
  }
};

//@desc Email Varifivation  API
//@route GET /api/v1/user/varifyemail/:id/:token
//@access Public
const varifyEmail = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const id = req.params.id;
  const token = req.params.token;
  const data = matchedData(req);
  console.log(data.newProfile);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/updateprofile responded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      _id: id,
    });
    if (user.token == "") {
      logger.error(`${ip}: API /api/v1/user/updateprofile responded with 'varification expired' `);
      return res.status(400).json({ errors: "varification expired" });
    }

    if (user.token !== token) {
      logger.error(`${ip}: API /api/v1/user/updateprofile responded with 'varification expired' `);
      return res.status(404).json({ errors: "varification expired" });
    }
    await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        email_verified: true,
        token: "",
      }
    );
    const updatedUser = await User.findOne({
      _id: id,
    });
    logger.info(`${ip}: API /api/v1/user/approveuser/:id | responded with "varified email" `);
    return res.status(201).json({ result: updatedUser });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/approveuser/:id  responnded with Error "unable to varify email" `);
    return res.status(500).json(e, " Something went wrong while varifying email");
  }
};

//@desc Email Varifivation  API
//@route GET /api/v1/user/varifyemail/:id/:token
//@access Public
const CreateToken = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  const id = req.params.id;
  const data = matchedData(req);
  console.log(data.newProfile);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/updateprofile responded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }
  const token = GenerateToken();
  try {
    await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        token: token,
      }
    );

    const user = await User.findOne({
      _id: id,
    });

    logger.info(`${ip}: API /api/v1/user/approveuser/:id | responded with "varified email" `);
    return res.status(201).json({ result: user });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/approveuser/:id  responnded with Error "unable to varify email" `);
    return res.status(500).json(e, " Something went wrong while varifying email");
  }
};

//@desc saveItinerarys API
//@route POST /api/v1/user/itinerarys/:id
//@access Public
const saveItinerary = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = req.body;
  /*  const data = matchedData(req); */

  console.log("data", data.itineraryDays);
  console.log("data", data);
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/itinerays/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const itinerary = await Itinerarys.create(
      {
        userId: data.id,
        destination: data.destination,
        end_date: data.end_date,
        start_date: data.start_date,
        no_of_ppl: data.no_of_ppl,
        preference: data.preference,
        budget: data.budget,
        itineraryDays: data.itineraryDays,
        about_destination: data.about_destination || "",
        currency_destination: data.currency_destination || "",
        language_destination: data.language_destination || "",
        weather_destination: data.weather_destination || "",
      }

      /*   {
        $push: {
          itinerarys: {
            destination: data.destination,
            no_of_days: data.no_of_days,
            start_date: data.start_date,
            no_of_ppl: data.no_of_ppl,
            preference: data.preference,
            budget: data.budget,
            itineraryDays: data.itineraryDays,
          },
        },
      }, */
      //{ new: true }  This option returns the modified document instead of the original
    );

    logger.info(`${ip}: API /api/v1/user/itinerays/:id responded with "itineray saved"`);
    return res.status(201).json({ result: itinerary });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/itinerays/:id responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while saving itineray" });
  }
};

//@desc Update Profile Url API
//@route POST /api/v1/user/updateprofileurl/:id
//@access Public
const UpdateProfileUrl = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/updateprofileurl/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("id: ", id);
  console.log("data: ", data);
  try {
    const updatedProfile = await User.findOneAndUpdate({ _id: id }, { profile: data.profile_url }, { new: true });

    logger.info(`${ip}: API /api/v1/user/updateprofileurl/:id responded with "profile Url Updated"`);
    return res.status(201).json({ result: updatedProfile });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/updateprofileurl/:id responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while updating profile Url" });
  }
};

//@desc Upadate Role Type  API
//@route POST user/update_roletype/:id
//@access Admin
const UpdateRoleType = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /user/update_roletype/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("id: ", id);
  console.log("data: ", data);
  try {
    const updatedProfile = await User.findOneAndUpdate({ _id: id }, { role_type: data.role_type }, { new: true });

    logger.info(`${ip}: API /user/update_roletype/:id responded with "role_type  Updated"`);
    return res.status(201).json({ result: updatedProfile });
  } catch (e) {
    logger.error(`${ip}: API /user/update_roletype/:id responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while updating role_type" });
  }
};

//@desc delete Itineray By Id API
//@route POST /api/v1/user/deleteitinerarbyid/:id
//@access Public
const DeleteItineraryById = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/deleteitinerarbyid/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("id: ", id);
  try {
    const itinerary = await Itinerarys.findOneAndUpdate({ _id: id }, { active: false });
    if (!itinerary) {
      logger.error(`${ip}: API /api/v1/user/deleteitinerarbyid/:id responded with "itinerary not found"`);
      return res.status(404).json({ error: "itinerary not found" });
    }
    logger.info(`${ip}: API /api/v1/user/deleteitinerarbyid/:id responded with "found itineray by id"`);
    return res.status(201).json({ result: "Itinerary Deleted Successfully" });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/deleteitinerarbyid/:id responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while deleting itineray by id" });
  }
};

//@desc Update Itineray By Id API
//@route POST /api/v1/user/updateitinerarbyid/:id
//@access Public
const UpdateItineraryById = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = matchedData(req);
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/updateitinerarbyid/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("id: ", id, " data : ", data);

  try {
    const itinerary = await Itinerarys.findOneAndUpdate({ _id: id }, { itineraryDays: data.itineraryDays }, { new: true });
    if (!itinerary) {
      logger.error(`${ip}: API /api/v1/user/updateitinerarbyid/:id responded with "itinerary not found"`);
      return res.status(404).json({ error: "itinerary not found" });
    }
    logger.info(`${ip}: API /api/v1/user/updateitinerarbyid/:id responded with "updated itineray "`);
    return res.status(201).json({ result: "Itinerary Deleted Successfully" });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/updateitinerarbyid/:id responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while updating itineray by id" });
  }
};

//@desc Get GetItinerarys API
//@route POST /api/v1/user/getitinerays/:id
//@access Public
const GetItineraryById = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/getitinerarybyid/:id/:itineraryid responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("id: ", id);
  try {
    const itinerary = await Itinerarys.findOne({ _id: id });

    if (!itinerary) {
      logger.error(`${ip}: API /api/v1/user/getitinerarybyid/:id/:itineraryid responded with "itinerary not found"`);
      return res.status(404).json({ error: "User does not exist" });
    }
    logger.info(`${ip}: API /api/v1/user/getitinerarybyid/:id/:itineraryid responded with "found itineray by id"`);
    return res.status(201).json({ result: itinerary });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/getitinerarybyid/:id/:itineraryid responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while geting itineray by id" });
  }
};

//@desc Get GetItinerarys API
//@route POST /api/v1/user/getitinerays/:id
//@access Public
const GetItinerarys = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = matchedData(req);
  console.log("data", data);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/getitinerays/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("data", data);
  try {
    const itinerarys = await Itinerarys.find({
      userId: id,
      active: true,
    });

    if (!itinerarys) {
      logger.error(`${ip}: API /api/v1/user/getitinerays/:id responded with "itinerarys not found"`);
      return res.status(404).json({ error: "itinerarys not found" });
    }

    logger.info(`${ip}: API /api/v1/user/getitinerays/:id responded with "itinerays"`);
    return res.status(201).json({ result: itinerarys });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/getitinerays/:id responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while geting itinerays" });
  }
};

//@desc Get Users API
//@route GET user/getallusers
//@access Public

const GetUsers = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!req.user) {
      logger.error(`${ip}: API /user/getallusers  responnded with Error , "Unautherized user " `);
      return res.status(500).json({ message: "Unauthorized user" });
    }

    const user = await User.findOne({ _id: req.user._id }).populate({ path: "role_type", select: ["name", "value", "active"] });
    console.log("req.user: ", user);

    if (user.role_type.name != "super_admin") {
      logger.error(`${ip}: API /user/getallusers  responnded with Error , "Unautherized user " `);
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const allUsers = await User.find();
    logger.info(`${ip}: API /user/getallusers | responnded with "Fetchd all the users" `);
    return res.status(200).json(allUsers);
  } catch (e) {
    logger.error(`${ip}: API /user/getallusers  responnded with Error  " somethung went wrong" `);
    return res.status(500).json({ e: "Something went wrong" });
  }
};

//@desc Update User API
//@route GET user/search-byname
//@access Super Admin
const SearchByName = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = matchedData(req);
  console.log("data", data);

  try {
    if (!req.user) {
      logger.error(`${ip}: API /user/getallusers  responnded with Error , "Unautherized user " `);
      return res.status(500).json({ message: "Unauthorized user" });
    }

    const user = await User.findOne({ _id: req.user._id }).populate({ path: "role_type", select: ["name", "value", "active"] });

    if (user.role_type.name != "super_admin") {
      logger.error(`${ip}: API /user/getallusers  responnded with Error , "Unautherized user " `);
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const response = await User.find({
      name: { $regex: new RegExp(data.name, "i") },
    });

    console.log(response);

    if (response) {
      return res.status(200).json({ result: response });
    } else {
      return res.status(200).json({ result: "" });
    }
  } catch (err) {
    console.log("error: ", err);
    return res.status(500).json(err, "Something went wrong while geting destinations");
  }
};

//@desc SaveSearched API
//@route POST /api/v1/user/searched/:id
//@access Public
const SaveSearched = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/searched/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("data", data);

  try {
    const searched = await Searched.create({
      destination: data.destination,
      end_date: data.end_date,
      start_date: data.start_date,
      no_of_ppl: data.no_of_ppl,
      preference: data.preference,
      userId: data.id,
      preference: data.preference,
      budget: data.budget,
    });

    logger.info(`${ip}: API /api/v1/user/searched responded with "saved search querys"`);
    return res.status(201).json({ result: searched });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/searched responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while saving search" });
  }
};

//@desc Get Searched API
//@route POST /api/v1/user/get-searched/:id
//@access admin
const GetSearched = async (req, res) => {
  const errors = validationResult(req); // checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const id = req.params.id;
  const data = matchedData(req);
  console.log("id: ", id);
  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/searched/:id responded with Error`);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const searched = await Searched.find({ userId: id });
    /*   console.log("searched: ", searched); */
    logger.info(`${ip}: API /api/v1/user/searched responded with "saved search querys"`);
    return res.status(201).json({ result: searched });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/searched responded with Error - ${e.message}`);
    return res.status(500).json({ error: "Something went wrong while saving search" });
  }
};

module.exports = {
  SearchByName,
  UpdateItineraryById,
  DeleteItineraryById,
  UpdateProfileUrl,
  SaveSearched,
  GetSearched,
  saveItinerary,
  testUserAPI,
  CreateUser,
  CreateSuperAdmin,
  LogInUser,
  UpdateUser,
  DeleteUser,
  GetUserById,
  GetCurrentUser,
  VerifyAdmin,
  ApproveUser,
  UnApproveUser,
  GetNewUsers,
  GoogleLogIn,
  VarifyUser,
  ResetPasword,
  GoogleSignUp,
  UpdateToken,
  varifyEmail,
  CreateToken,
  FacebookSignUp,
  FacebookLogin,
  GetItineraryById,
  GetItinerarys,
  GetUsers,
  UpdateRoleType,
};
