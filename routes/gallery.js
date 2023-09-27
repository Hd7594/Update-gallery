const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Gallery = require("../models/Gallery");
const convertToBase64 = require("../utils/convertToBase64");

const fileUpload = require("express-fileupload");

router.post("/arcade/add", fileUpload(), async (req, res) => {
  try {
    const { name, author, views, year, camera, authorization } = req.body;

    const picture = req.files.picture;
    const pictureArcade = await cloudinary.uploader.upload(
      convertToBase64(picture)
    );
    const newArcade = new Gallery({
      name: name,
      author: author,
      views: views,
      year: year,
      camera: camera,
      authorization: authorization,
      picture: pictureArcade,
    });
    console.log(newArcade);
    await newArcade.save();
    res.json(newArcade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
