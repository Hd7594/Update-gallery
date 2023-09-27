const mongoose = require("mongoose");

const Gallery = mongoose.model("Update", {
  name: String,
  author: String,
  views: Number,
  year: Number,
  camera: String,
  authorization: Boolean,
  filePicture: Object,
});

module.exports = Gallery;
