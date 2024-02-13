const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToMongo = require("./config/db.js");
const multer = require("multer");
const User = require("./models/User");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome To The Back-End");
});

app.use(express.static("public"));
/* 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profiles/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/user/upload/:id", upload.single("file"), async (req, res) => {
  console.log("req.body: ", req.body);
  const imageName = req.file.filename;
  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        profile: imageName,
      }
    );
    return res.status(201).json({ result: user });
  } catch (err) {
    return res.status(500).json({ error: err, message: "Something went wrong while updating profile" });
  }
}); */

const image = ".public/profiles/1707475824713pexels-cottonbro-studio-4038334.jpg";

cloudinary.config({
  cloud_name: "drp5eeosr",
  api_key: "613279887455942",
  api_secret: "K_RKVzf7sGUeewIns6nIieVUPos",
});

const upload2 = multer({ dest: "uploads/" }); // Destination folder for multer to store temporary files

app.post("/user/updateprofile", upload2.single("image"), (req, res) => {
  const image = req.file.path; // Path to the uploaded file
  console.log("Uploaded image path:", image);

  cloudinary.uploader.upload(image, (error, result) => {
    // Delete the temporary file uploaded by multer
    fs.unlinkSync(image);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message, message: "Something went wrong while uploading image" });
    } else {
      console.log(result);
      return res.status(201).json({ result });
    }
  });
});

app.use("/user", require("./routes/user.js"));
app.use("/config", require("./routes/config.js"));
app.use("/destinations", require("./routes/destinations.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
