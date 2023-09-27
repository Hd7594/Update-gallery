//MISE A JOUR DES PHOTOS AJOUTÉES SUR CLOUDINARY PAR UNE AUTHENTIFICATION
//USAGE DE L'OBJET DATE AVEC LES DATES CORRESPONDANTES

const express = require("express");
const router = express.Router();

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const convertToBase64 = require("../utils/convertToBase64");

const updateGallery = require("../models/Update");

router.post("/arcade/user", fileUpload(), async (req, res) => {
  try {
    const {
      pictureAuthor,
      numberDownloads,
      views,
      camera,
      software,
      dimensions,
      shootingDate,
      publicationDate,
      password,
      username,
      email,
    } = req.body;

    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    const picture = req.files.picture;
    const finalPicture = await cloudinary.uploader.upload(
      convertToBase64(picture)
    );

    const updatePublication = new updateGallery({
      name: pictureAuthor,
      downloads: numberDownloads,
      views: views,
      camera: camera,
      software: software,
      dimensions: dimensions,
      shootingDate: shootingDate,
      publicationDate: publicationDate,
      account: {
        password: password,
        username: username,
        email: email,
        token: token,
        hash: hash,
      },
      picture: finalPicture,
    });
    // console.log(updatePublication);
    await updatePublication.save();
    res.json(updatePublication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/arcade/delete", async (req, res) => {
  try {
    await updateGallery.findByIdAndDelete(req.body.id);
    if (!req.body.id) {
      res.json({ message: "missing id" });
    } else {
      res.json({ message: "picture deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

/* Concernant les clés shooting et publication date
      shootingDate: new Date(2020, 8, 27), METHODE QUI NE FONCTIONNE PAS
      publicationDate: new Date(2020, 9, 9), METHODE QUI NE FONCTIONNE PAS

      Pour afficher les dates exactes , il a fallu que je change la nature des 2 clés en mode "String" pour ensuite ajouter ces dates avec des tirets 
      */
