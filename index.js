require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const newGalleryRoutes = require("./routes/gallery");
app.use(newGalleryRoutes);

const userGallery = require("./routes/update");
app.use(userGallery);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur ma route update-gallery" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("server started");
});
