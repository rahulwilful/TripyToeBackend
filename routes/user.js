const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateToken = require("../middleWare/validateToken.js");
const {
  testUserAPI,
  GoogleSignUp,
  CreateToken,
  FacebookLogin,
  FacebookSignUp,
  CreateUser,
  UpdateToken,
  varifyEmail,
  UnApproveUser,
  ResetPasword,
  VarifyUser,
  LogInUser,
  GoogleLogIn,
  UpdateUser,
  DeleteUser,
  GetNewUsers,
  GetUserById,
  GetUsers,
  GetCurrentUser,
  ApproveUser,
  Searched,
  saveItinerary,
  GetItinerarys,
  GetItineraryById,
  UpdateProfileUrl,
  DeleteItineraryById,
  UpdateItineraryById,
} = require("../controllers/user");

//@desc Update Itineray By Id API
//@route POST /api/v1/user/updateitinerarbyid/:id
//@access Public
router.post("/updateitinerarbyid/:id", [body("itineraryDays", "itineraryDays required").notEmpty()], UpdateItineraryById);

//@desc delete Itineray By Id API
//@route POST /api/v1/user/deleteitinerarbyid/:id
//@access Public
router.post("/deleteitinerarbyid/:id", DeleteItineraryById);

//@desc Get Itinerays API
//@route POST /api/v1/user/getitinerarybyid/:id/:itineraryid
//@access Public
router.post("/updateprofileurl/:id", [body("profile_url", "profile_url required").notEmpty()], UpdateProfileUrl);

//@desc Get Itinerays API
//@route POST /api/v1/user/getitinerarybyid/:id/:itineraryid
//@access Public
router.get("/getitinerarybyid/:id", GetItineraryById);

//@desc Get Itinerays API
//@route POST /api/v1/user/getitinerays/id
//@access Public
router.get("/getitinerarys/:id", GetItinerarys);

//@desc Itinerays API
//@route POST /api/v1/user/itinerays/id
//@access Public
router.post(
  "/saveitinerays",
  /*  [
    body("destination", "destination required").notEmpty(),
    body("no_of_days", "no_of_days required").notEmpty().isNumeric(),
    body("start_date", "start_date required").notEmpty(),
    body("no_of_ppl", "no_of_ppl required").notEmpty(),
    body("preference", "preference required").notEmpty(),
    body("budget", "budget required").notEmpty(),
    body("itineraryDays", "Itinerary required").notEmpty(),
  ], */
  saveItinerary
);

//@desc Searched API
//@route POST /api/v1/user/searched/id
//@access Public
router.post("/searched/:id", [body("destination", "destination required"), body("no_of_days", "no_of_days required"), body("start_date", "start_date required"), body("no_of_ppl", "no_of_ppl required"), body("preference", "preference required"), body("budget", "budget required")], Searched);

//@desc Facebook Sign Up API
//@route POST /api/v1/user/facebooksignup
//@access Public
router.post("/facebooksignup", [body("name"), body("facebookId", "facebookId required")], FacebookSignUp);

//@desc Create Token  API
//@route GET /api/v1/user/createtoken/:id
//@access Public
router.post("/createtoken/:id", CreateToken);

//@desc Email Varifivation  API
//@route GET /api/v1/user/varifyemail/:id/:token
//@access Public
router.post("/varifyemail/:id/:token", varifyEmail);

//@desc Upadte Token  API
//@route GET /api/v1/user/updatetoken/:id
//@access Public
router.post("/updatetoken/:id", [body("token", "Token for email not found").notEmpty()], UpdateToken);

//@desc Google Sign In API
//@route POST /api/v1/user/googlesignin
//@access Public
router.post("/googlesignup", [body("name"), body("email", "Email is not valid").isEmail(), body("googleId", "GoogleId required")], GoogleSignUp);

//@desc Test User API
//@route GET /api/v1/user
//@access Public
router.get("/", testUserAPI);

//@desc Reset Password API
//@route GET /api/v1/resetpassword
//@access Public
router.post(
  "/resetpassword",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Enter New Password").isLength({
      min: 5,
    }),
  ],
  ResetPasword
);
//@desc Varify User  API
//@route GET /api/v1/user/varifyuser
//@access Public
router.post("/varifyuser", [body("email", "Enter Valid Email").isEmail()], VarifyUser);

//@desc Google LogIn API
//@route GET /api/v1/user/googlelogin
//@access Public
router.post("/googlelogin", [body("googleId", "googleId Not Found")], GoogleLogIn);

//@desc Facebook LogIn API
//@route GET /api/v1/user/facebooklogin
//@access Public
router.post("/facebooklogin", [body("facebookId", "FacebookId required")], FacebookLogin);

//@desc Create User API
//@route POST /api/v1/user/add
//@access Public
router.post(
  "/add",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("mobile_no", "Enter a Valid Whatsapp Number").isNumeric(),
    body("password", "Password must have atlest 5 character").isLength({
      min: 5,
    }),
  ],
  CreateUser
);

//@desc LogIn User API
//@route GET /api/v1/user/login
//@access Public
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Is Incorrect").isLength({
      min: 5,
    }),
  ],
  LogInUser
);

//@desc Update User API
//@route GET /api/v1/user/update
//@access Public
router.post(
  "/update/:id",
  [
    body("name", "Enter a valid name").isLength({
      min: 3,
    }),
    body("mobile_no", "Enter a Valid mobile Number").notEmpty().isNumeric(),
    body("whatsapp_no"),
    body("instagram"),
    body("facebook"),
    body("whatsapp_status"),
  ],
  UpdateUser
);

//@desc Delete User API
//@route GET /api/v1/user/delete
//@access Public
router.post("/delete/:id", validateToken, DeleteUser);

//@desc Get User Info API
//@route GET /api/v1/user/get/:id
//@access Public
router.get("/get/:id", GetUserById);

//@desc Get All Users API
//@route GET /api/v1/user/getallusers
//@access Public
router.get("/getallusers", GetUsers);

//@desc Get New Users API
//@route GET /api/v1/user/getnewusers
//@access Public
router.get("/getnewusers", GetNewUsers);

//@desc Get Current User API
//@route GET /api/v1/user
//@access Public
router.get("/getcurrentuser", validateToken, GetCurrentUser);

//@desc Update User API
//@route POST /api/v1/user/updateprofile/:id
//@access Public
//router.post("/updateprofile/:id", [body("newProfile", "Profile picture not found").notEmpty()], UpdateProfile);

//@desc Approve Users API
//@route POST /api/v1/user/approve/:id
//@access Public
router.post("/approveuser/:id", ApproveUser);

//@desc UnApprove Users API
//@route POST /api/v1/user/unapprove/:id
//@access Public
router.post("/unapproveuser/:id", UnApproveUser);

module.exports = router;
