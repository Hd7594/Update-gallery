const mongoose = require("mongoose");
const User = mongoose.model("User", {
  pictureAuthor: String,
  numberDownloads: Number,
  views: Number,
  shootingDate: String,
  publicationDate: String,
  camera: String,
  software: String,
  dimensions: String,
  picture: Object,
  account: {
    password: String,
    username: String,
    email: String,
  },
});

module.exports = User;
